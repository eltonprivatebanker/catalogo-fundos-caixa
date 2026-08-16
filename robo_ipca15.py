#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Coletor independente do IPCA-15 para o Catálogo de Fundos CAIXA.

Fonte principal:
IBGE - API de Agregados / SIDRA
Tabela 7062 (IPCA-15, a partir de fev/2020)
Variáveis:
  355  - variação mensal
  356  - acumulado no ano
  1120 - acumulado em 12 meses

O arquivo ipca15.json só é regravado quando o CONTEÚDO ESTATÍSTICO muda.
Assim, um workflow diário não cria commit sem necessidade.
"""

from __future__ import annotations

import argparse
import json
import math
import sys
from copy import deepcopy
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

import requests

OUTPUT_DEFAULT = Path(__file__).with_name("ipca15.json")

ENDPOINTS = [
    # Recorte explícito: Brasil / Índice geral.
    (
        "7062_indice_geral",
        "https://servicodados.ibge.gov.br/api/v3/agregados/"
        "7062/periodos/-36/variaveis/355|356|1120"
        "?localidades=N1[all]&classificacao=315[7169]"
    ),
    # Fallback: a API pode já retornar o total quando a classificação é omitida.
    (
        "7062_total",
        "https://servicodados.ibge.gov.br/api/v3/agregados/"
        "7062/periodos/-36/variaveis/355|356|1120"
        "?localidades=N1[all]"
    ),
    # Fallback histórico do IPCA-15 nacional.
    (
        "3065_serie_historica",
        "https://servicodados.ibge.gov.br/api/v3/agregados/"
        "3065/periodos/-36/variaveis/355|356|1120"
        "?localidades=N1[all]"
    ),
]

VAR_TO_FIELD = {
    "355": "mensal",
    "356": "acumulado_ano",
    "1120": "acumulado_12m",
}

SPECIAL_VALUES = {"", "-", "..", "...", "X", "x", None}


def numero(v: Any) -> float | None:
    if v in SPECIAL_VALUES:
        return None
    try:
        n = float(str(v).replace(",", "."))
    except (TypeError, ValueError):
        return None
    return n if math.isfinite(n) else None


def extrair_series(payload: Any) -> dict[str, dict[str, float | None]]:
    """
    Converte o retorno da API de Agregados em:
      {
        "202607": {"mensal": ..., "acumulado_ano": ..., "acumulado_12m": ...}
      }
    """
    if not isinstance(payload, list):
        raise ValueError("Resposta do IBGE não é uma lista.")

    periodos: dict[str, dict[str, float | None]] = {}

    for bloco in payload:
        var_id = str(bloco.get("id", "")).strip()
        campo = VAR_TO_FIELD.get(var_id)
        if not campo:
            continue

        resultados = bloco.get("resultados") or []
        for resultado in resultados:
            series = resultado.get("series") or []
            for serie in series:
                valores = serie.get("serie") or {}
                if not isinstance(valores, dict):
                    continue

                for competencia, valor in valores.items():
                    comp = str(competencia)
                    if not (len(comp) == 6 and comp.isdigit()):
                        continue
                    periodos.setdefault(comp, {})[campo] = numero(valor)

    return periodos


def montar_documento(periodos: dict[str, dict[str, float | None]], endpoint_nome: str) -> dict[str, Any]:
    validos = []
    for competencia in sorted(periodos):
        item = periodos[competencia]
        # O mês só é considerado publicado quando há ao menos a variação mensal.
        if item.get("mensal") is None:
            continue
        validos.append({
            "competencia": competencia,
            "mensal": item.get("mensal"),
            "acumulado_ano": item.get("acumulado_ano"),
            "acumulado_12m": item.get("acumulado_12m"),
        })

    if not validos:
        raise ValueError("Nenhum período publicado foi encontrado na resposta do IBGE.")

    atual = validos[-1]
    anterior = validos[-2] if len(validos) >= 2 else None

    return {
        "schema": "ipca15-v1",
        "status": "ok",
        "fonte": {
            "instituicao": "IBGE",
            "sistema": "API de Agregados / SIDRA",
            "tabela": 7062 if endpoint_nome.startswith("7062") else 3065,
            "endpoint_usado": endpoint_nome,
            "variaveis": {
                "355": "IPCA15 - Variação mensal (%)",
                "356": "IPCA15 - Variação acumulada no ano (%)",
                "1120": "IPCA15 - Variação acumulada em 12 meses (%)",
            },
        },
        "atual": atual,
        "anterior": anterior,
        "historico": validos[-24:],
    }


def sem_timestamp(doc: dict[str, Any]) -> dict[str, Any]:
    x = deepcopy(doc)
    x.pop("gerado_em_utc", None)
    return x


def carregar_existente(path: Path) -> dict[str, Any] | None:
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except Exception:
        return None


def consultar_ibge(timeout: int = 30) -> tuple[dict[str, Any], str]:
    erros = []

    headers = {
        "User-Agent": "catalogo-fundos-caixa-ipca15/1.0",
        "Accept": "application/json",
    }

    for nome, url in ENDPOINTS:
        try:
            r = requests.get(url, headers=headers, timeout=timeout)
            r.raise_for_status()
            payload = r.json()
            periodos = extrair_series(payload)
            doc = montar_documento(periodos, nome)
            return doc, url
        except Exception as exc:
            erros.append(f"{nome}: {exc}")

    raise RuntimeError("Falha em todas as fontes do IBGE: " + " | ".join(erros))


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--output", default=str(OUTPUT_DEFAULT))
    parser.add_argument("--timeout", type=int, default=30)
    parser.add_argument(
        "--force",
        action="store_true",
        help="Regrava o JSON mesmo sem mudança estatística.",
    )
    args = parser.parse_args()

    output = Path(args.output)
    novo, url = consultar_ibge(timeout=args.timeout)
    anterior = carregar_existente(output)

    mudou = (
        args.force
        or anterior is None
        or sem_timestamp(anterior) != sem_timestamp(novo)
    )

    if not mudou:
        atual = novo.get("atual") or {}
        print(
            "[IPCA-15] Sem nova divulgação. "
            f"Competência atual: {atual.get('competencia', '—')}."
        )
        return 0

    novo["gerado_em_utc"] = datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")
    output.write_text(
        json.dumps(novo, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )

    atual = novo["atual"]
    print(
        "[IPCA-15] Atualizado: "
        f"{atual['competencia']} | mês={atual['mensal']}% | "
        f"ano={atual.get('acumulado_ano')}% | "
        f"12m={atual.get('acumulado_12m')}%"
    )
    print(f"[IPCA-15] Fonte consultada: {url}")
    return 0


if __name__ == "__main__":
    sys.exit(main())

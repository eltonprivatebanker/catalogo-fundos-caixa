Aqui está o código completo do script `robo_sipii_simples.py`, atualizado na **versão 13**. Juntei as correções de Regex para limpar as notas de rodapé, o tratamento de valores nulos com strings vazias e o salvamento em CSV com as aspas protetoras (`quoting=csv.QUOTE_MINIMAL`) nos lugares exatos dentro do fluxo de execução.

Pode copiar o bloco abaixo e substituir o conteúdo integral do seu arquivo:

```python
"""
ROBÔ SIPII CAIXA — v13 (Edição GitHub Repository)
Estratégia de URLs em duas camadas:
  1. Dicionário estático: 116 URLs validadas manualmente
  2. Scraping dinâmico: captura URLs de novos fundos nas páginas da CAIXA

  v12 — IPCA com base histórica local (ipca_historico_base.json)
  v13 — Boletim Focus do BCB (IPCA, Selic, PIB, Câmbio, IGP-M)
        Integração com fundos.json da CAIXA Asset (Extração de Metadados Ricos: CNPJ, Risco, Taxas e Liquidez)
        Correção: visitos → vistos em raspar_urls_caixa()
        Correção Focus: Montagem de URL manual para evitar o Erro OData 400
        Integração Front-End: Leitura local do histórico Selic e Metas de Inflação
        Correção de Bug: Restauração da variável global DEBUG_COLUNAS
        Ajuste de Sanetização: Remoção de notas de rodapé e blindagem de vírgulas no CSV (quoting)
"""

import json
import csv
from pathlib import Path
from datetime import datetime
import time, unicodedata, traceback, re, requests
from bs4 import BeautifulSoup
import pandas as pd

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import (
    NoSuchElementException, InvalidSessionIdException, WebDriverException,
)

# ---------------------------------------------------------------------------
# Configurações Globais
# ---------------------------------------------------------------------------

URL_SIPII = "https://www.fundos.caixa.gov.br/sipii/pages/public/listar-fundos-internet.jsf"

PERFIS = [
    {"segmento": "PESSOA FÍSICA",   "sigla": "PF"},
    {"segmento": "PESSOA JURÍDICA", "sigla": "PJ"},
    {"segmento": "GOVERNO",         "sigla": "GOV"},
    {"segmento": "RPPS",            "sigla": "RPPS"},
    {"segmento": "TODOS",           "sigla": "TODOS"},
]

CATEGORIAS_FIXAS = [
    {"csv": "RENDA FIXA SIMPLES",           "texto_tela": "RENDA FIXA SIMPLES"},
    {"csv": "RENDA FIXA",                   "texto_tela": "RENDA FIXA"},
    {"csv": "RENDA FIXA REFERENCIADO",      "texto_tela": "RENDA FIXA REFERENCIADO"},
    {"csv": "RENDA FIXA CURTO PRAZO",       "texto_tela": "RENDA FIXA CURTO PRAZO"},
    {"csv": "MULTIMERCADO",                 "texto_tela": "MULTIMERCADO"},
    {"csv": "CAMBIAL",                      "texto_tela": "CAMBIAL"},
    {"csv": "ACOES",                        "texto_tela": "AÇÕES"},
    {"csv": "FUNDO DE INDICE",              "texto_tela": "FUNDO DE ÍNDICE"},
    {"csv": "FUNDOS MUTUOS DE PRIVATIZACAO","texto_tela": "FUNDOS MÚTUOS DE PRIVATIZAÇÃO"},
]

CAIXA_LISTING_PAGES = [
    "https://www.caixa.gov.br/fundos-investimento/renda-fixa/Paginas/default.aspx",
    "https://www.caixa.gov.br/fundos-investimento/referenciados/Paginas/default.aspx",
    "https://www.caixa.gov.br/fundos-investimento/fundo-simples/Paginas/default.aspx",
    "https://www.caixa.gov.br/fundos-investimento/curto-prazo/Paginas/default.aspx",
    "https://www.caixa.gov.br/fundos-investimento/multimercado/Paginas/default.aspx",
    "https://www.caixa.gov.br/fundos-investimento/cambiais/Paginas/default.aspx",
    "https://www.caixa.gov.br/fundos-investimento/fundos-de-acoes/Paginas/default.aspx",
    "https://www.caixa.gov.br/fundos-investimento/fundos-de-indices/Paginas/default.aspx",
    "https://www.caixa.gov.br/fundos-investimento/voce/renda-fixa/Paginas/default.aspx",
    "https://www.caixa.gov.br/fundos-investimento/empresa/Paginas/default.aspx",
    "https://www.caixa.gov.br/fundos-investimento/fmp-fgts/Paginas/default.aspx",
    "https://www.caixa.gov.br/fundos-investimento/rpps/Paginas/default.aspx",
]

MESES_PT = ["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"]

# Variável de Debug restaurada para evitar NameError nas tabelas do SIPII
DEBUG_COLUNAS = False

# ---------------------------------------------------------------------------
# Dicionário estático — 116 URLs validadas manualmente
# ---------------------------------------------------------------------------
URL_ESTATICO = {
    "CAIXA BRASIL INFLACAO ATIVA FIF RF CRED PRIV": "https://www.caixa.gov.br/fundos-investimento/renda-fixa/brasil-IPCA",
    "CAIXA CAPITAL PROTEGIDO IBOVESPA CICLICO I FIC FIF MM": "https://www.caixa.gov.br/fundos-investimento/multimercado/fic-capital-protegido-ibovespa-ciclico-1-multimercado",
    "CAIXA ETF IBOVESPA FUNDO DE INDICE": "https://www.caixa.gov.br/fundos-investimento/fundos-de-indices/etf-ibovespa-fundo-de-indice/",
    "CAIXA EXPERT CLARITAS VALOR FIC FIF ACOES -": "https://www.caixa.gov.br/fundos-investimento/fundos-de-acoes/caixa-expert-claritas-valor-fic-acoes/Paginas/default.aspx",
    "CAIXA EXPERT GIANT ZARATHUSTRA FIC MULTIMERCADO -": "https://www.caixa.gov.br/fundos-investimento/multimercado/expert-giant-zarathustra-fic-multimercado",
    "CAIXA FI BRASIL IMA-B TP RF LP": "https://www.caixa.gov.br/fundos-investimento/renda-fixa/fi-brasil-ima-b-titulos-rf-longo-prazo",
    "CAIXA FI BRASIL IRF-M 1 TP RF": "https://www.caixa.gov.br/fundos-investimento/renda-fixa/fi-brasil-irfm-1-titulos-publicos-rf",
    "CAIXA FI BRASIL IRF-M 1+ TP RF LP": "https://www.caixa.gov.br/fundos-investimento/renda-fixa/fi-brasil-irfm-1-titulos-publicos-rf-longo-prazo/",
    "CAIXA FIC ACOES EXPERT VERDE AM LONG BIAS -": "https://www.caixa.gov.br/fundos-investimento/fundos-de-acoes/CAIXA-Expert-Verde-Am-Long-Bias-FIC-Acoes/Paginas/default.aspx",
    "CAIXA FIC ACOES EXPERT VINCI VALOR DIVIDENDOS RPPS": "https://www.caixa.gov.br/fundos-investimento/rpps/caixa-fic-acoes-vinci-valor-dividendos-rpps",
    "CAIXA FIC ACOES EXPERT VINCI VALOR RPPS": "https://www.caixa.gov.br/fundos-investimento/rpps/caixa-fic-acoes-vinci-valor-rpps",
    "CAIXA FIC FIF ABSOLUTO PRE RF LP": "https://www.caixa.gov.br/fundos-investimento/renda-fixa/fic-absoluto-pre-rf-longo-prazo",
    "CAIXA FIC FIF ACOES IBOVESPA": "https://www.caixa.gov.br/fundos-investimento/fundos-de-acoes/fi-acoes-ibovespa",
    "CAIXA FIC FIF ACOES MULTIGESTOR": "https://www.caixa.gov.br/fundos-investimento/fundos-de-acoes/fic-fia-multigestor/Paginas/default.aspx",
    "CAIXA FIC FIF ALOCACAO MACRO MM LONGO PRAZO": "https://www.caixa.gov.br/fundos-investimento/multimercado/fic-alocacao-macro-multimercado-longo-prazo/",
    "CAIXA FIC FIF BETA RF REF DI LP": "https://www.caixa.gov.br/fundos-investimento/referenciados/fic-beta-ref-di-lp",
    "CAIXA FIC FIF BRASIL DISPONIBILIDADES SIMPLES RF": "https://www.caixa.gov.br/fundos-investimento/renda-fixa/brasil-disponibilidades",
    "CAIXA FIC FIF BRASIL GESTAO ESTRATEGICA RF": "https://www.caixa.gov.br/fundos-investimento/renda-fixa/caixa-fic-brasil-gestao-estrategica-rf",
    "CAIXA FIC FIF BRASIL RF REFER DI LONGO PRAZO": "https://www.caixa.gov.br/fundos-investimento/referenciados/fi-brasil-ref-di-longo-prazo",
    "CAIXA CAPITAL PROTEGIDO CESTA AGRO MM": "https://www.caixa.gov.br/fundos-investimento/multimercado/caixa_fic_fim_cap_protegido_cesta_agro/Paginas/default.aspx",
    "CAIXA FIC FIF CAPITAL IND PRECOS RF LP": "https://www.caixa.gov.br/fundos-investimento/renda-fixa/fic-capital-indice-de-precos-rf-longo-prazo",
    "CAIXA FIC FIF CLASSICO RF LP": "https://www.caixa.gov.br/fundos-investimento/renda-fixa/fic-classico-rf-longo-prazo",
    "CAIXA FIC FIF DESENVOLVER RF LP": "https://www.caixa.gov.br/fundos-investimento/renda-fixa/fic-desenvolver-rf-longo-prazo/",
    "CAIXA FIC FIF E-FUNDO RF LP": "https://www.caixa.gov.br/fundos-investimento/e-fundos/renda-fixa-longo-prazo",
    "CAIXA FIC FIF EMPREENDER RF LP": "https://www.caixa.gov.br/fundos-investimento/renda-fixa/fic-empreender-rf-longo-prazo/",
    "CAIXA FIC FIF EQUILIBRIO MPE RF LP": "https://www.caixa.gov.br/fundos-investimento/renda-fixa/caixa-equilibrio-mpe-rf-lp/",
    "CAIXA FIC FIF ESTRATEGIA LIVRE MULTIMERCADO LP": "https://www.caixa.gov.br/fundos-investimento/multimercado/estrategia-livre-mm-lp",
    "CAIXA FIC FIF ESTRATEGICO MULTIMERCADO LP": "https://www.caixa.gov.br/fundos-investimento/multimercado/fic-estrategico-multimercado-longo-prazo",
    "CAIXA FIC FIF EXECUTIVO RF LP": "https://www.caixa.gov.br/fundos-investimento/renda-fixa/fic-executivo-rf-longo-prazo",
    "CAIXA FIC FIF EXPERTISE RF CRED PRIV LP": "https://www.caixa.gov.br/fundos-investimento/renda-fixa/fic-expertise-rf-credito-privado-longo-prazo",
    "CAIXA FIC FIF FACIL RF SIMPLES": "https://www.caixa.gov.br/fundos-investimento/fundo-simples/fic-facil-rf-simples",
    "CAIXA FIC FIF FOCO IND PRECOS RF LP": "https://www.caixa.gov.br/fundos-investimento/renda-fixa/fic-foco-indice-precos-rf-longo-prazo",
    "CAIXA FIC FIF FOF SMART MULTIESTRATEGIA MM": "https://www.caixa.gov.br/fundos-investimento/multimercado/fic-multigestor",
    "CAIXA FIC FIF GERACAO JOVEM CRED PRIV RF LP": "https://www.caixa.gov.br/fundos-investimento/renda-fixa/fic-geracao-jovem-rf-credito-privado-longo-prazo",
    "CAIXA FIC FIF GIRO IMEDIATO RF REF DI LP": "https://www.caixa.gov.br/fundos-investimento/referenciados/fic-giro-imediato-ref-di-longo-prazo",
    "CAIXA FIC FIF HEDGE MULTIMERCADO LONGO PRAZO": "https://www.caixa.gov.br/fundos-investimento/multimercado/caixa-fic-hedge-multimercado-lp/Paginas/default.aspx",
    "CAIXA FIC FIF IDEAL RF LP": "https://www.caixa.gov.br/fundos-investimento/renda-fixa/fic-ideal-rf-longo-prazo",
    "CAIXA FIC FIF INDEXA DOLAR CAMBIAL": "https://www.caixa.gov.br/fundos-investimento/cambiais/fic-cambial-dolar/Paginas/default.aspx",
    "CAIXA FIC FIF JUROS E MOEDAS MM LP": "https://www.caixa.gov.br/fundos-investimento/multimercado/fi-juros-moedas-multimercado-longo-prazo",
    "CAIXA FIC FIF JUROS E MOEDAS MM PLUS LP": "https://www.caixa.gov.br/fundos-investimento/multimercado/caixa-fic-juros-e-moedas-multimercado-plus-lp/",
    "CAIXA FIC FIF NOVO BRASIL RF IMA-B LP": "https://www.caixa.gov.br/fundos-investimento/renda-fixa/fic-novo-brasil-ima-b-rf-longo-prazo",
    "CAIXA FIC FIF OAB RF CRED PRIV LP": "https://www.caixa.gov.br/fundos-investimento/renda-fixa/fic-oab-rf-credito-privado-longo-prazo",
    "CAIXA FIC FIF PATRIMONIO IND.DE PRECOS RF LP": "https://www.caixa.gov.br/fundos-investimento/renda-fixa/fic-patrimonio-indice-precos-rf-longo-prazo",
    "CAIXA FIC FIF PERSONAL RF LP": "https://www.caixa.gov.br/fundos-investimento/renda-fixa/fic-personal-rf-longo-prazo",
    "CAIXA FIC FIF PLENO REF DI LP": "https://www.caixa.gov.br/fundos-investimento/referenciados/fic-pleno-ref-di-longo-prazo",
    "CAIXA FIC FIF PRATICO RF CURTO PRAZO": "https://www.caixa.gov.br/fundos-investimento/curto-prazo/fic-pratico-curto-prazo",
    "CAIXA FIC FIF PREFERENCIAL REF DI LP": "https://www.caixa.gov.br/fundos-investimento/referenciados/fic-preferencial-ref-di-longo-prazo",
    "CAIXA FIC FIF RELACIONAMENTO PERSONAL RF LP": "https://www.caixa.gov.br/fundos-investimento/renda-fixa/fic-relacionamento-personal-rf-longo-prazo",
    "CAIXA FIC FIF RUBI RF REF DI LP": "https://www.caixa.gov.br/fundos-investimento/referenciados/fic-rubi-ref-di-longo-prazo/Paginas/default.aspx",
    "CAIXA FIC FIF SELECAO RF": "https://www.caixa.gov.br/fundos-investimento/renda-fixa/fic-selecao-rf-longo-prazo",
    "CAIXA FIC FIF SIGMA RF REF DI LP": "https://www.caixa.gov.br/fundos-investimento/referenciados/fic-sigma-ref-di-longo-prazo",
    "CAIXA FIC FIF SOBERANO RF LP": "https://www.caixa.gov.br/fundos-investimento/renda-fixa/fic-soberano-rf-longo-prazo",
    "CAIXA FIC FIF SUPREMO RF LP": "https://www.caixa.gov.br/fundos-investimento/renda-fixa/fic-supremo-rf-longo-prazo",
    "CAIXA FIC FIF TITULO PUBLICO MPE RF LP": "https://www.caixa.gov.br/fundos-investimento/renda-fixa/caixa-fic-tp-mpe-rf-lp/",
    "CAIXA FIC FIF TRANSFERENCIA VOLUNTARIA RF CP": "https://www.caixa.gov.br/fundos-investimento/curto-prazo/fic-transferencias-voluntarias-curto-prazo",
    "CAIXA FIC FIF TURQUESA CORPORATIVO RF CP": "https://www.caixa.gov.br/fundos-investimento/voce/renda-fixa/fic-turquesa-corporativo-curto-prazo",
    "CAIXA FIC FIFONLINE RF LP": "https://www.caixa.gov.br/fundos-investimento/renda-fixa/fic-investidor-rf-longo-prazo",
    "CAIXA FIC INVESTIDOR RF LP": "https://www.caixa.gov.br/fundos-investimento/renda-fixa/fic-investidor-rf-longo-prazo",
    "CAIXA FIC MULTIGESTOR GLOBAL EQUITIES IE": "https://www.caixa.gov.br/fundos-investimento/multimercado/caixa-multigestor-global-equities-invest-ext/Paginas/default.aspx",
    "CAIXA FIC RELACIONAMENTO IDEAL RF LP": "https://www.caixa.gov.br/fundos-investimento/renda-fixa/fic-relacionamento-ideal-rf-longo-prazo",
    "CAIXA FIF ACOES BDR NIVEL I": "https://www.caixa.gov.br/fundos-investimento/fundos-de-acoes/fi-acoes-bdr-nivel-1",
    "CAIXA FIF ACOES BRASIL ETF IBOVESPA": "https://www.caixa.gov.br/fundos-investimento/fundos-de-acoes/fi-acoes-brasil-etf-bovespa",
    "CAIXA FIF ACOES BRASIL IBOVESPA": "https://www.caixa.gov.br/fundos-investimento/fundos-de-acoes/fi-acoes-brasil-ibovespa/Paginas/default.aspx",
    "CAIXA FIF ACOES BRASIL IBX-50": "https://www.caixa.gov.br/fundos-investimento/fundos-de-acoes/fi-acoes-brasil-ibx-50",
    "CAIXA FIF ACOES CONSTRUCAO CIVIL": "https://www.caixa.gov.br/fundos-investimento/fundos-de-acoes/fi-acoes-construcao-civil",
    "CAIXA FIF ACOES CONSUMO": "https://www.caixa.gov.br/fundos-investimento/fundos-de-acoes/fi-acoes-consumo",
    "CAIXA FIF ACOES DIVIDENDOS": "https://www.caixa.gov.br/fundos-investimento/fundos-de-acoes/fi-acoes-dividendos",
    "CAIXA FIF ACOES IBOVESPA ATIVO": "https://www.caixa.gov.br/fundos-investimento/fundos-de-acoes/fi-acoes-ibovespa-ativo",
    "CAIXA FIF ACOES IBRX ATIVO": "https://www.caixa.gov.br/fundos-investimento/fundos-de-acoes/fi-acoes-ibrx-ativo",
    "CAIXA FIF ACOES INDEXA PIBB IBRX 50": "https://www.caixa.gov.br/fundos-investimento/fundos-de-acoes/fi-acoes-pibb-sem-opcao-de-venda",
    "CAIXA FIF ACOES INDEXA SETOR FINANCEIRO": "https://www.caixa.gov.br/fundos-investimento/fundos-de-acoes/caixa-fia-indexa-setor-financeiro/Paginas/default.aspx",
    "CAIXA FIF ACOES INFRAESTRUTURA": "https://www.caixa.gov.br/fundos-investimento/fundos-de-acoes/fi-acoes-infraestrutura",
    "CAIXA FIF ACOES INSTITUCIONAL BDR NIVEL I": "https://www.caixa.gov.br/fundos-investimento/fundos-de-acoes/FIA-Institucional-BDR-nivel-I/Paginas/default.aspx",
    "CAIXA FIF ACOES PETROBRAS": "https://www.caixa.gov.br/fundos-investimento/fundos-de-acoes/fi-acoes-petrobras",
    "CAIXA FIF ACOES PETROBRAS PLUS": "https://www.caixa.gov.br/fundos-investimento/fundos-de-acoes/fia-caixa-petrobras-plus/Paginas/default.aspx",
    "CAIXA FIF ACOES PETROBRAS PRE-SAL": "https://www.caixa.gov.br/fundos-investimento/fundos-de-acoes/fi-acoes-petrobras-pre-sal",
    "CAIXA FIF ACOES SMALL CAPS ATIVO": "https://www.caixa.gov.br/fundos-investimento/fundos-de-acoes/fi-acoes-small-caps-ativo",
    "CAIXA FIF ACOES SUSTENTABILIDADE EMPRESARIAL ISE - IS": "https://www.caixa.gov.br/fundos-investimento/fundos-de-acoes/fi-acoes-ise",
    "CAIXA FIF ACOES VALE DO RIO DOCE": "https://www.caixa.gov.br/fundos-investimento/fundos-de-acoes/fi-acoes-vale-rio-doce",
    "CAIXA FIF ALIANCA TP RF CURTO PRAZO -": "https://www.caixa.gov.br/fundos-investimento/renda-fixa/fic-alianca-rf",
    "CAIXA FIF BRASIL IDKA IPCA 2A TIT PUB RF LP": "https://www.caixa.gov.br/fundos-investimento/renda-fixa/fi-brasil-idka-ipca-2a-rf-longo-prazo",
    "CAIXA FIF BRASIL IMA GERAL TP RF LP -": "https://www.caixa.gov.br/fundos-investimento/renda-fixa/fi-brasil-ima-geral-tp-rf-longo-prazo",
    "CAIXA FIF BRASIL IMA-B 5 TP RF LP -": "https://www.caixa.gov.br/fundos-investimento/renda-fixa/fi-brasil-ima-b-5-titulos-publicos-rf-longo-prazo",
    "CAIXA FIF BRASIL IMA-B 5+ TP RF LP -": "https://www.caixa.gov.br/fundos-investimento/renda-fixa/fi-brasil-ima-b-5_mais-titulos-publicos-rf-lp/Paginas/default.aspx",
    "CAIXA FIF BRASIL IRF-M TP RF LP -": "https://www.caixa.gov.br/fundos-investimento/renda-fixa/brasil-irf-m-titulos-publicos-renda-fixa-longo-prazo",
    "CAIXA FIF BRASIL TITULOS PUBLICOS RF LP -": "https://www.caixa.gov.br/fundos-investimento/renda-fixa/fi-brasil-titulos-publicos-rf-longo-prazo",
    "CAIXA FIF DIAMANTE CORP RF CRED PRIV LP -": "https://www.caixa.gov.br/fundos-investimento/empresa/renda-fixa/credito-privado/caixa-fi-diamante-corporativo-rf-cred-priv-lp",
    "CAIXA FIF E-SIMPLES RENDA FIXA LP": "https://www.caixa.gov.br/fundos-investimento/renda-fixa/fi-renda-fixa-simples-lp/",
    "CAIXA FIF INDEXA BOLSA AMERICANA MM LP": "https://www.caixa.gov.br/fundos-investimento/multimercado/fi-bolsa-americana-multimercado-lp",
    "CAIXA FIF INDEXA OURO MULTIMERCADO LP": "https://www.caixa.gov.br/fundos-investimento/multimercado/fi-ouro-multimercado-longo-prazo",
    "CAIXA FIF MULTIMERCADO RV 30 LP": "https://www.caixa.gov.br/fundos-investimento/multimercado/fi-multimercado-rv30-longo-prazo",
    "CAIXA FIF RS TITULOS PUBLICOS RF LP -": "https://www.caixa.gov.br/fundos-investimento/renda-fixa/fi-rs-titulos-publicos-rf-longo-prazo",
    "CAIXA FIF SAUDE SUPLEMENTAR ANS II RF LP -": "https://www.caixa.gov.br/fundos-investimento/renda-fixa/fi-saude-suplementar-ans-ii-rf-longo-prazo",
    "CAIXA FIF SAUDE SUPLEMENTAR ANS RF LP -": "https://www.caixa.gov.br/fundos-investimento/renda-fixa/fi-saude-suplementar-anf-rf",
    "FIC FIF CAIXA EXPERT BTG PACTUAL X10 MM LP": "https://www.caixa.gov.br/fundos-investimento/multimercado/btg-pactual-x10-multimercado-longo-prazo/",
    "CAIXA FIC FIF OBJETIVO PRE RF LP": "https://www.caixa.gov.br/fundos-investimento/renda-fixa/fic-objetivo-pre-rf-longo-prazo/Paginas/default.aspx",
    "CAIXA FIC FIF PERFORMANCE IMA-B RF LP": "https://www.caixa.gov.br/fundos-investimento/renda-fixa/fic-performance-ima-b-renda-fixa-longo-prazo/Paginas/default.aspx",
    "CAIXA FIC FIF PLUS QUALI RF CREDI PRIV LP": "https://www.caixa.gov.br/fundos-investimento/renda-fixa/fic-plus-qualificado-rf-credito-privado-longo-prazo/Paginas/default.aspx",
    "CAIXA FIC FIF ESPECIAL RF LP": "https://www.caixa.gov.br/fundos-investimento/renda-fixa/fic-especial-rf-longo-prazo/Paginas/default.aspx",
    "CAIXA FIF FIDELIDADE PRIVATE RF LP -": "https://www.caixa.gov.br/fundos-investimento/renda-fixa/fi-fidelidade-private-rf-longo-prazo/Paginas/default.aspx",
    "CAIXA FIC FIF MAXI RENDA FIXA CRED PRIV LP -": "https://www.caixa.gov.br/fundos-investimento/renda-fixa/fic-maxi-rf-credito-privado-longo-prazo/Paginas/default.aspx",
    "CAIXA FIF FIDELIDADE II RF CRED PRIV LP": "https://www.caixa.gov.br/fundos-investimento/renda-fixa/fi-fidelidade-ii-rf-credito-privado-longo-prazo/Paginas/default.aspx",
    "CAIXA FIC OMEGA REF DI RF LONGO PRAZO": "https://www.caixa.gov.br/fundos-investimento/referenciados/fic-omega-ref-di-longo-prazo/Paginas/default.aspx",
    "CAIXA FIC FIF MEGA RF REFERENC DI LONGO PRAZO -": "https://www.caixa.gov.br/fundos-investimento/referenciados/fic-mega-ref-di-longo-prazo/Paginas/default.aspx",
    "CAIXA FIC FIF TOP PRIVATE RF REF DI LP": "https://www.caixa.gov.br/fundos-investimento/referenciados/fic-top-private-ref-di-longo-prazo/Paginas/default.aspx",
    "CAIXA FIC FIF FOF SMART CRED PRIV MM LP": "https://www.caixa.gov.br/fundos-investimento/multimercado/fic-fof-smart-credito-privado-multimercado-longo-prazo/Paginas/default.aspx",
    "CAIXA FIF INDEXA EURO MM LONGO PRAZO": "https://www.caixa.gov.br/fundos-investimento/multimercado/fi-euro-multimercado-longo-prazo/Paginas/default.aspx",
    "CAIXA CAPITAL PROTEGIDO CICLICO III FIC FIF MM LP -": "https://www.caixa.gov.br/fundos-investimento/multimercado/fic-capital-protegido-ciclico-iii-multimercado-lp/Paginas/default.aspx",
    "CAIXA FIC FIM CAPITAL PROTEGIDO CICLICO II LP - RL": "https://www.caixa.gov.br/fundos-investimento/multimercado/fic-capital-protegido-ciclico-ii-multimercado-lp/Paginas/default.aspx",
    "CAIXA FIC FIF EXPERT PIMCO INCOME IE MM LP": "https://www.caixa.gov.br/fundos-investimento/multimercado/caixa-expert-pimco-income-ie-fic-multimercado/Paginas/default.aspx",
    "CAIXA FIF EXTRAMERCADO COMUM IRFM-1 RF": "https://www.caixa.gov.br/fundos-investimento/renda-fixa/fi-extramercado-comum-irfm-1-rf/Paginas/default.aspx",
    "CAIXA FIC FIF AMETISTA CORP RF SIMPLES": "https://www.caixa.gov.br/fundos-investimento/fundo-simples/fic-ametista-corporativo-rf-simples/Paginas/default.aspx",
    "CAIXA GIRO EMPRESAS FIC FIF RF REF DI LP": "https://www.caixa.gov.br/fundos-investimento/referenciados/fic-giro-empresas-ref-di-longo-prazo/Paginas/default.aspx",
    "CAIXA FIF CNI RF LP -": "https://www.caixa.gov.br/fundos-investimento/empresa/renda-fixa/fi-cni-rf-longo-prazo/Paginas/default.aspx",
    "CAIXA FIF SEBRAE RF LP": "https://www.caixa.gov.br/fundos-investimento/empresa/renda-fixa/fi-sebrae-rf-longo-prazo/Paginas/default.aspx",
    "CAIXA FIC FIF GIRO MPE REF DI LP": "https://www.caixa.gov.br/fundos-investimento/referenciados/fic-giro-mpe-ref-di-longo-prazo/Paginas/default.aspx",
    "CAIXA FIF TOPAZIO CORP RF REFERENC DI -": "https://www.caixa.gov.br/fundos-investimento/renda-fixa/referenciados/fic-topazio-rf-ref-di-lp/Paginas/default.aspx",
    "CAIXA FIC ESMERALDA CORP RF REF DI CRED PRIV LP -": "https://www.caixa.gov.br/fundos-investimento/referenciados/fic-esmeralda-corp-ref-di/Paginas/default.aspx",
}

# ---------------------------------------------------------------------------
# Caminhos de arquivo
# ---------------------------------------------------------------------------
BASE_DIR       = Path.cwd()
LOG_PATH       = BASE_DIR / "execucao.log"
IPCA_BASE_PATH = BASE_DIR / "ipca_historico_base.json"

# Mapeamento das bases históricas estáticas locais na raiz
SELIC_BASE_PATH   = BASE_DIR / "historico da selic do BC.json"
META_INFLACAO_PATH = BASE_DIR / "meta-vs-inflacao-efetiva.json"

# ---------------------------------------------------------------------------
# Utilidades gerais
# ---------------------------------------------------------------------------
def log(msg):
    linha = f"[{datetime.now().strftime('%H:%M:%S')}] {msg}"
    print(linha)
    with open(LOG_PATH, "a", encoding="utf-8") as f:
        f.write(linha + "\n")

def normalizar(txt):
    txt = txt or ""
    txt = unicodedata.normalize("NFKD", txt)
    txt = "".join(c for c in txt if not unicodedata.combining(c))
    return " ".join(txt.upper().split())

def chave_estatica(nome):
    n = normalizar(nome)
    n = re.sub(r'\s*RESP\s*LTDA.*$', '', n)
    n = re.sub(r'\s*-\s*RL$', '', n)
    n = re.sub(r'\s*\(\d+\).*$', '', n)
    return n.strip()

TEXTO_PARA_CSV = {normalizar(c["texto_tela"]): c["csv"] for c in CATEGORIAS_FIXAS}

# ---------------------------------------------------------------------------
# Camada 2 — Scraping dinâmico de URLs da CAIXA
# ---------------------------------------------------------------------------
STOPWORDS = {
    "CAIXA","FIC","FIF","FI","RF","LP","MM","IE","RL","IS",
    "RESP","LTDA","DE","DO","DA","DOS","DAS","E","A","O","EM",
    "FUNDO","FUNDOS","RENDA","FIXA","LONGO","PRAZO","CREDITO",
    "PRIVADO","TITULOS","PUBLICOS","TP","REFERENCIADO","SIMPLES",
}

def palavras_chave(texto):
    n = normalizar(texto)
    n = re.sub(r'\s*RESP\s*LTDA.*$', '', n)
    n = re.sub(r'\s*\(\d+\).*$', '', n)
    n = n.replace('-', ' ')
    tokens = set(n.split())
    return tokens - STOPWORDS - {t for t in tokens if len(t) <= 2}

def palavras_slug(url):
    try:
        path = url.rstrip('/').split('?')[0]
        parte = path.split('/')[-1]
        if parte.lower() in ('default.aspx', ''):
            parte = path.split('/')[-2]
        parte = re.sub(r'\.aspx$', '', parte).replace('-', ' ').replace('_', ' ')
        tokens = set(normalizar(parte).split())
        return tokens - STOPWORDS - {t for t in tokens if len(t) <= 2}
    except:
        return set()

HEADERS_HTTP = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/123.0.0.0 Safari/537.36",
    "Accept-Language": "pt-BR,pt;q=0.9",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Referer": "https://www.caixa.gov.br/",
}

def raspar_urls_caixa():
    registros, vistos = [], set()
    base = "https://www.caixa.gov.br"
    session = requests.Session()
    session.headers.update(HEADERS_HTTP)
    for page_url in CAIXA_LISTING_PAGES:
        try:
            resp = session.get(page_url, timeout=20)
            if resp.status_code != 200:
                log(f"  [CAIXA] {page_url.split('/')[-3]} → HTTP {resp.status_code}")
                return registros
            soup = BeautifulSoup(resp.text, "html.parser")
            novos = 0
            for a in soup.find_all("a", href=True):
                href = a["href"].strip()
                texto = a.get_text(separator=" ", strip=True)
                if href.startswith("/"): href = base + href
                if not href.startswith("http"): continue
                if "/fundos-investimento/" not in href: continue
                if len(href.rstrip('/').split('/')) < 7: continue
                if href in vistos: continue
                vistos.add(href)
                registros.append({
                    "texto": normalizar(texto),
                    "url": href,
                    "palavras_texto": palavras_chave(texto),
                    "palavras_slug":  palavras_slug(href),
                })
                novos += 1
            log(f"  [CAIXA] {page_url.split('/')[-3]} → +{novos} links ({len(registros)} total)")
            time.sleep(1)
        except Exception as e:
            log(f"  [CAIXA] Erro ao raspar {page_url}: {e}")
    log(f"[CAIXA] Total URLs dinâmicas: {len(registros)}")
    return registros

def encontrar_url_dinamica(nome, registros):
    pf = palavras_chave(nome)
    if not pf: return ""
    melhor_url, melhor_score = "", 0.0
    for reg in registros:
        s = max(
            len(pf & reg["palavras_texto"]) / len(pf),
            len(pf & reg["palavras_slug"])  / len(pf),
        )
        if s > melhor_score:
            melhor_score, melhor_url = s, reg["url"]
    return melhor_url if melhor_score >= 0.70 else ""

def encontrar_url(nome, registros_dinamicos):
    chave = chave_estatica(nome)
    if chave in URL_ESTATICO:
        return URL_ESTATICO[chave]
    chave_curta = re.sub(r'\s+-\s*$', '', chave).strip()
    if chave_curta in URL_ESTATICO:
        return URL_ESTATICO[chave_curta]
    return encontrar_url_dinamica(nome, registros_dinamicos)

# ---------------------------------------------------------------------------
# NOVO v13 — Boletim Focus (BCB) — MONTAGEM MANUAL CONTRA ERRO ODATA 400
# ---------------------------------------------------------------------------
FOCUS_BASE = (
    "https://olinda.bcb.gov.br/olinda/servico/"
    "Expectativas/versao/v1/odata/"
)

INDICADORES_FOCUS = [
    "IPCA",
    "Selic",
    "PIB Total",
    "Câmbio",
    "IGP-M",
]

def _buscar_focus_indicador(indicador: str, anos: list, headers: dict) -> dict:
    """Busca as expectativas Focus anuais. Monta a URL travando o caractere '$'."""
    usa_base_calculo = indicador == "IPCA"
    if usa_base_calculo:
        filtro = f"Indicador eq '{indicador}' and baseCalculo eq 0"
    else:
        filtro = f"Indicador eq '{indicador}'"

    filtro_codificado = requests.utils.quote(filtro)

    url = (
        f"{FOCUS_BASE}ExpectativasMarketAnuais" if indicador == 'Câmbio' else f"{FOCUS_BASE}ExpectativasMercadoAnuais"
    )
    url_completa = (
        f"{url}"
        f"?$filter={filtro_codificado}"
        f"&$format=json"
        f"&$orderby=Data%20desc"
        f"&$top=50"
    )
    
    resultado = {}
    try:
        res = requests.get(url_completa, headers=headers, timeout=20)
        if res.status_code != 200:
            log(f"  [Focus] {indicador} → HTTP {res.status_code}")
            return resultado
            
        registros = res.json().get("value", [])
        vistos_anos = set()
        
        for reg in registros:
            ano_str = str(reg.get("DataReferencia", ""))[:4]
            if not ano_str:
                continue
            try:
                ano = int(ano_str)
            except ValueError:
                continue
                
            if ano not in anos or ano in vistos_anos:
                continue
                
            vistos_anos.add(ano)
            resultado[ano] = {
                "mediana": reg.get("Mediana"),
                "media":   reg.get("Media"),
                "minimo":  reg.get("Minimo"),
                "maximo":  reg.get("Maximo"),
                "data_ref": reg.get("Data"),
            }
            if len(vistos_anos) == len(anos):
                break
    except Exception as e:
        log(f"  [Focus] Erro ao buscar {indicador}: {e}")
        
    return resultado

def buscar_focus(headers: dict) -> dict:
    """Coleta todas as expectativas do Boletim Focus para os próximos 4 anos."""
    anos_alvo = [2026, 2027, 2028, 2029]
    log("[Focus] Coletando expectativas do Banco Central...")
    focus = {"data_coleta": datetime.now().strftime("%d/%m/%Y %H:%M")}
    
    for indicador in INDICADORES_FOCUS:
        log(f"  [Focus] → {indicador}")
        focus[indicador] = _buscar_focus_indicador(indicador, anos_alvo, headers)
        time.sleep(0.5)
        
    if "Câmbio" in focus:
        focus["Cambio"] = focus["Câmbio"]
        
    if "PIB Total" in focus:
        focus["PIB"] = focus["PIB Total"]
        
    log(f"[Focus] Coleta concluída: {len(INDICADORES_FOCUS)} indicadores processados.")
    return focus

# ---------------------------------------------------------------------------
# NOVO v13 — fundos.json da CAIXA Asset (Extração Mapeada Completa)
# ---------------------------------------------------------------------------
FUNDOS_JSON_URL = "https://www.caixa.gov.br/CAIXA-Asset/Documents/data/fundos.json"

def _normalizar_nome_fundo(nome: str) -> str:
    n = unicodedata.normalize("NFD", nome.upper())
    n = "".join(c for c in n if unicodedata.category(c) != "Mn")
    n = re.sub(r"[^A-Z0-9 ]", " ", n)
    return re.sub(r"\s+", " ", n).strip()

def buscar_fundos_json(headers: dict) -> dict:
    """Baixa o fundos.json e mapeia metadados ricos indexados pelo nome normalizado."""
    log("[Fundos.json] Baixando catálogo integral da CAIXA Asset...")
    try:
        res = requests.get(FUNDOS_JSON_URL, headers=headers, timeout=25)
        if res.status_code != 200:
            log(f"[Fundos.json] HTTP {res.status_code} — ignorando.")
            return {}
        raw = res.json()
    except Exception as e:
        log(f"[Fundos.json] Falha ao coletar: {e}")
        return {}

    if isinstance(raw, list):
        lista = raw
    elif isinstance(raw, dict):
        lista = raw.get("fundos") or raw.get("data") or raw.get("items") or []
    else:
        lista = []

    indice_rico = {}
    for f in lista:
        try:
            nome = (f.get("nome") or f.get("nomeFundo") or f.get("NomeFundo") or "").strip()
            url = (f.get("url") or f.get("URL") or "").strip()
            if nome:
                norm_key = _normalizar_nome_fundo(nome)
                indice_rico[norm_key] = {
                    "url": url if (url and "caixa.gov.br" in url) else "",
                    "cnpj": f.get("nu_cnpj"),
                    "perfil_risco": f.get("no_perfil_risco"),
                    "taxa_adm": f.get("pc_taxa_adm_cliente"),
                    "aplicacao_minima": f.get("vr_aplicacao_inicial"),
                    "conversao_resgate": f.get("de_conversao_resgate"),
                    "pagamento_resgate": f.get("de_pagamento_resgate")
                }
        except Exception:
            continue

    log(f"[Fundos.json] {len(indice_rico)} produtos indexados com metadados comerciais.")
    return indice_rico

def enriquecer_dados_com_fundos_json(df: pd.DataFrame, indice_json: dict) -> pd.DataFrame:
    """Preenche URLs ausentes e acopla metadados comerciais ricos ao DataFrame."""
    colunas_novas = ["CNPJ", "Perfil de Risco", "Taxa Adm (%)", "Aplicacao Minima (R$)", "Conversao Resgate", "Pagamento Resgate"]
    for col in colunas_novas:
        if col not in df.columns:
            df[col] = None

    if not indice_json:
        return df

    def _processar_linha(row):
        url_atual = str(row.get("URL", "")).strip()
        chave = _normalizar_nome_fundo(str(row.get("Fundo", "")))
        
        meta = indice_json.get(chave)
        if meta:
            if not (url_atual and url_atual.startswith("http") and "caixa.gov.br" in url_atual):
                row["URL"] = meta["url"]
            
            row["CNPJ"] = meta["cnpj"]
            row["Perfil de Risco"] = meta["perfil_risco"]
            row["Taxa Adm (%)"] = meta["taxa_adm"]
            row["Aplicacao Minima (R$)"] = meta["aplicacao_minima"]
            row["Conversao Resgate"] = meta["conversao_resgate"]
            row["Pagamento Resgate"] = meta["pagamento_resgate"]
        return row

    df = df.apply(_processar_linha, axis=1)
    preenchidas = (df["URL"].str.startswith("http") & df["URL"].str.contains("caixa.gov.br") if df["URL"].notna().any() else 0).sum()
    log(f"[Fundos.json] Cruzamento finalizado: Novas propriedades vinculadas. Mapeamento de URLs: {preenchidas}/{len(df)}")
    return df

# ---------------------------------------------------------------------------
# SIPII scraping
# ---------------------------------------------------------------------------
def configurar_driver(headless=True):
    opt = webdriver.ChromeOptions()
    if headless: opt.add_argument("--headless=new")
    for arg in ["--start-maximized","--window-size=1600,1200","--no-sandbox","--disable-dev-shm-usage","--disable-gpu"]:
        opt.add_argument(arg)
    opt.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/123.0.0.0 Safari/537.36")
    return webdriver.Chrome(options=opt)

def esperar_ajax(driver, timeout=20):
    try:
        WebDriverWait(driver, timeout).until(lambda d: d.execute_script("return (window.jQuery ? jQuery.active === 0 : true);"))
    except: time.sleep(2)

def finalizar_driver(driver):
    try:
        if driver: driver.quit()
    except: pass

def clicar_elemento(driver, el):
    driver.execute_script("arguments[0].scrollIntoView({block:'center'});", el)
    time.sleep(0.5)
    try: el.click()
    except: driver.execute_script("arguments[0].click();", el)

def clicar_por_texto(driver, texto_alvo):
    alvo = normalizar(texto_alvo)
    for a in driver.find_elements(By.TAG_NAME, "a"):
        if a.is_displayed() and normalizar(a.text.strip()) == alvo:
            clicar_elemento(driver, a); return
    raise NoSuchElementException(f"Link não encontrado: {texto_alvo}")

def abrir_site_e_preparar(driver, sigla, segmento):
    log(f"[{sigla}] Abrindo SIPII...")
    driver.get(URL_SIPII); time.sleep(3)
    clicar_por_texto(driver, segmento); esperar_ajax(driver)
    consultar = WebDriverWait(driver, 20).until(EC.presence_of_element_located((By.ID, "btn-consultar")))
    clicar_elemento(driver, consultar); esperar_ajax(driver); time.sleep(3)

def descobrir_categorias(driver):
    cats = []
    for aba in driver.find_elements(By.CSS_SELECTOR, "ul.ui-tabs-nav li a"):
        texto = aba.text.strip()
        if texto:
            norm = normalizar(texto)
            cats.append({"texto_tela": texto, "csv": TEXTO_PARA_CSV.get(norm) or norm.replace(" ","_")[:31]})
    return cats

def localizar_tabela_ativa(driver):
    for p in driver.find_elements(By.CSS_SELECTOR, "div.ui-tabs-panel"):
        if p.is_displayed(): return p.find_element(By.CSS_SELECTOR, "table")
    raise Exception("Tabela ativa não encontrada")

def extrair_dados_tabela(driver, nome_csv, sigla):
    tabela = localizar_tabela_ativa(driver)
    linhas = tabela.find_elements(By.CSS_SELECTOR, "tbody tr")
    dados = []
    for i, tr in enumerate(linhas):
        tds = tr.find_elements(By.XPATH, "./td")
        if DEBUG_COLUNAS and i == 0:
            print("\n" + "="*60)
            for idx, td in enumerate(tds): print(f"  [{idx}] → '{td.text.strip()}'")
            print("="*60); return []
        if len(tds) >= 10:
            nome = tds[0].text.strip()
            if nome:
                dados.append({
                    "Categoria": nome_csv, "Fundo": nome,
                    "Fundo_norm": normalizar(nome),
                    "Data Inicio": tds[1].text.strip(),
                    "Cota (R$)": tds[3].text.strip(),
                    "Variacao Dia (%)": tds[4].text.strip(),
                    "Acum. Mes (%)": tds[5].text.strip(),
                    "Acum. Ano (%)": tds[6].text.strip(),
                    "Acum. 12M (%)": tds[7].text.strip(),
                    "PL (milhoes R$)": tds[8].text.strip(),
                    "Perfil": sigla,
                })
    return dados

def coletar_aba(driver, sigla, segmento, cat, dados):
    try:
        clicar_por_texto(driver, cat["texto_tela"]); esperar_ajax(driver); time.sleep(1.5)
        res = extrair_dados_tabela(driver, cat["csv"], sigla)
        dados.extend(res)
        log(f"  [{sigla}] {cat['csv']}: {len(res)} fundos.")
    except (InvalidSessionIdException, WebDriverException):
        log(f"  [{sigla}] Sessão perdida em '{cat['csv']}'. Reiniciando...")
        finalizar_driver(driver)
        driver = configurar_driver(headless=True)
        try:
            abrir_site_e_preparar(driver, sigla, segmento)
            clicar_por_texto(driver, cat["texto_tela"]); esperar_ajax(driver); time.sleep(1.5)
            res = extrair_dados_tabela(driver, cat["csv"], sigla)
            dados.extend(res); log(f"  [{sigla}] {cat['csv']} (recuperado): {len(res)} fundos.")
        except Exception as e2:
            log(f"  [{sigla}] Falha ao recuperar '{cat['csv']}': {e2}")
    except Exception as e:
        log(f"  [{sigla}] Erro em '{cat['csv']}': {e}")
    return driver

def processar_perfil(perfil, headless=True):
    sigla, segmento = perfil["sigla"], perfil["segmento"]
    driver, dados = None, []
    try:
        driver = configurar_driver(headless=headless)
        abrir_site_e_preparar(driver, sigla, segmento)
        for cat in descobrir_categorias(driver):
            driver = coletar_aba(driver, sigla, segmento, cat, dados)
    except Exception as e:
        log(f"[{sigla}] Erro geral: {e}"); traceback.print_exc()
    finally:
        finalizar_driver(driver)
    return dados

def consolidar(todos):
    if not todos: return pd.DataFrame()
    df = pd.DataFrame(todos)
    consolidado = []
    for (fn, cat), group in df.groupby(["Fundo_norm","Categoria"], sort=False):
        reg = group.iloc[0].to_dict()
        reg["Perfis"] = " | ".join(sorted(group["Perfil"].unique()))
        consolidado.append(reg)
    return pd.DataFrame(consolidado)

def salvar_excel(df, caminho):
    try:
        import openpyxl
        from openpyxl.styles import PatternFill, Font, Alignment, Border, Side
        from openpyxl.utils import get_column_letter
        wb = openpyxl.Workbook(); ws = wb.active; ws.title = "Fundos CAIXA"
        cols = [c for c in df.columns if c not in ("Fundo_norm","Perfil")]
        hf=PatternFill("solid",fgColor="0A1628"); hfont=Font(bold=True,color="C9A84C",size=10)
        ha=Alignment(horizontal="center",vertical="center",wrap_text=True)
        hb=Border(bottom=Side(style="medium",color="C9A84C"))
        ws.append(cols)
        for ci,cn in enumerate(cols,1):
            c=ws.cell(1,ci); c.fill=hf; c.font=hfont; c.alignment=ha; c.border=hb
        gf=Font(color="2EC27E",size=9); rf=Font(color="E05555",size=9); nf=Font(size=9)
        af=PatternFill("solid",fgColor="0F2040"); mf=PatternFill("solid",fgColor="0A1628")
        pc={"Variacao Dia (%)","Acum. Mes (%)","Acum. Ano (%)","Acum. 12M (%)"}
        for ri,row in enumerate(df[cols].itertuples(index=False),2):
            fill=af if ri%2==0 else mf
            for ci,(cn,val) in enumerate(zip(cols,row),1):
                vs=str(val) if val is not None else ""
                cell=ws.cell(ri,ci,vs); cell.fill=fill; cell.alignment=Alignment(vertical="center")
                if cn in pc and vs not in("-","—",""):
                    try:
                        n=float(vs.replace("%","").replace(" ","").replace(".","").replace(",","."))
                        cell.font=gf if n>0 else(rf if n<0 else nf)
                    except: cell.font=nf
                else: cell.font=nf
                
        widths={"Categoria":18,"Fundo":55,"Data Inicio":13,"Cota (R$)":16,
                "Variacao Dia (%)":14,"Acum. Mes (%)":13,"Acum. Ano (%)":13,
                "Acum. 12M (%)":13,"PL (milhoes R$)":18,"Perfis":30,"URL":60,
                "CNPJ":18, "Perfil de Risco":15, "Taxa Adm (%)":14, "Aplicacao Minima (R$)":22,
                "Conversao Resgate":18, "Pagamento Resgate":18}
                
        for ci,cn in enumerate(cols,1):
            ws.column_dimensions[get_column_letter(ci)].width=widths.get(cn,15)
        ws.row_dimensions[1].height=30; ws.freeze_panes="A2"; wb.save(caminho)
        log(f"Excel salvo: {caminho}")
    except ImportError: log("AVISO: pip install openpyxl")
    except Exception as e: log(f"Erro Excel: {e}"); traceback.print_exc()

# ---------------------------------------------------------------------------
# KPIs do Dashboard
# ---------------------------------------------------------------------------
def limpar_dados_para_calculo(df_consolidado):
    df = df_consolidado.copy()
    def converte_num(val):
        if pd.isna(val) or str(val).strip() in ['-', '—', '', 'None']:
            return None
        val = str(val).replace('"', '').strip()
        if ',' in val:
            if '.' in val and val.find('.') < val.find(','):
                val = val.replace('.', '')
            val = val.replace(',', '.')
        try:
            return float(val)
        except ValueError:
            return None
    cols_numericas = ['Cota (R$)', 'Variacao Dia (%)', 'Acum. Mes (%)', 'Acum. Ano (%)', 'Acum. 12M (%)', 'PL (milhoes R$)']
    for col in cols_numericas:
        if col in df.columns:
            df[col] = df[col].apply(converte_num)
    return df

def gerar_json_kpis_dashboard(df_consolidado, caminho_saida):
    df_calculo = limpar_dados_para_calculo(df_consolidado)
    pl_total_casa = df_calculo['PL (milhoes R$)'].sum()
    def w_avg(group):
        vals = group['Acum. 12M (%)']
        pesos = group['PL (milhoes R$)']
        mask = vals.notna() & pesos.notna() & (pesos > 0)
        if mask.sum() == 0: return None
        return (vals[mask] * pesos[mask]).sum() / pesos[mask].sum()
    categorias_kpi = {}
    for cat, group in df_calculo.groupby('Categoria'):
        wa = w_avg(group)
        categorias_kpi[cat] = {
            "qtd_ativos": int(group['Acum. 12M (%)'].notna().sum()),
            "pl_total": round(group['PL (milhoes R$)'].sum(), 2),
            "rent_12m_ponderada": round(wa, 2) if wa is not None else None
        }
    perfil_kpi = {}
    for perf, group in df_calculo.groupby('Perfil'):
        pl_perf = group['PL (milhoes R$)'].sum()
        perfil_kpi[perf] = {
            "qtd_fundos": int(group['Fundo'].count()),
            "pl_total": round(pl_perf, 2),
            "share_percent": round((pl_perf / pl_total_casa) * 100, 2) if pl_total_casa > 0 else 0
        }
    top_5 = df_calculo.nlargest(5, 'PL (milhoes R$)')
    pl_top_5 = top_5['PL (milhoes R$)'].sum()
    kpis_finais = {
        "resumo_geral": {
            "pl_total_consolidado": round(pl_total_casa, 2),
            "concentracao_top5_percent": round((pl_top_5 / pl_total_casa) * 100, 2) if pl_total_casa > 0 else 0,
            "pipeline_novos_fundos": int(df_calculo['Cota (R$)'].isna().sum())
        },
        "categorias": categorias_kpi,
        "perfis_comerciais": perfil_kpi
    }
    with open(caminho_saida, "w", encoding="utf-8") as f:
        json.dump(kpis_finais, f, indent=4, ensure_ascii=False)
    log(f"[KPIs] JSON exportado: {caminho_saida.name}")

# ---------------------------------------------------------------------------
# Coletor de Indicadores de Mercado Macro
# ---------------------------------------------------------------------------
class ColetorMercado:
    def __init__(self):
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
        }

    def _buscar_bcb(self, codigo_serie):
        try:
            url = f"https://api.bcb.gov.br/dados/serie/bcdata.sgs.{codigo_serie}/dados/ultimos/1?formato=json"
            res = requests.get(url, headers=self.headers, timeout=10)
            if res.status_code == 200:
                return float(res.json()[0]['valor'])
        except Exception:
            pass
        return None

    def _carregar_base_ipca(self):
        if IPCA_BASE_PATH.exists():
            try:
                dados = json.loads(IPCA_BASE_PATH.read_text(encoding="utf-8"))
                if dados:
                    log(f"[IPCA] Base local: {len(dados)} meses carregados.")
                    return dados
            except Exception as e:
                log(f"[IPCA] Erro ao ler base local: {e}")
        log("[IPCA] Base local ausente — downloading SGS 433...")
        for tentativa in range(3):
            try:
                url = "https://api.bcb.gov.br/dados/serie/bcdata.sgs.433/dados?formato=json"
                res = requests.get(url, headers=self.headers, timeout=60)
                if res.status_code == 200:
                    raw = res.json()
                    if raw:
                        historico = []
                        for item in raw:
                            d, m, y = item["data"].split("/")
                            historico.append({
                                "data":  item["data"],
                                "label": f"{MESES_PT[int(m)-1]}/{y}",
                                "valor": round(float(item["valor"]), 4),
                            })
                        log(f"[IPCA] Série completa obtida: {len(historico)} meses.")
                        return historico
            except Exception as e:
                log(f"[IPCA] Tentativa {tentativa + 1} falhou: {e}")
                time.sleep(10 * (tentativa + 1))
        log("[IPCA] Não foi possível baixar a série histórica completa.")
        return []

    def _buscar_ipca_delta(self, meses=3):
        for tentativa in range(3):
            try:
                url = (f"https://api.bcb.gov.br/dados/serie/bcdata.sgs.433"
                       f"/dados/ultimos/{meses}?formato=json")
                res = requests.get(url, headers=self.headers, timeout=20)
                if res.status_code == 200:
                    dados = res.json()
                    if dados:
                        log(f"[IPCA] Delta BCB: {len(dados)} meses recebidos.")
                        return dados
            except Exception as e:
                log(f"[IPCA] Delta tentativa {tentativa + 1} falhou: {e}")
                time.sleep(5 * (tentativa + 1))
        log("[IPCA] Delta indisponível — usando apenas a base local.")
        return []

    def _merge_ipca(self, base, delta):
        index = {item["data"]: item for item in base}
        for item in delta:
            d, m, y = item["data"].split("/")
            index[item["data"]] = {
                "data":  item["data"],
                "label": f"{MESES_PT[int(m)-1]}/{y}",
                "valor": round(float(item["valor"]), 4),
            }
        return sorted(
            index.values(),
            key=lambda x: (x["data"].split("/")[2], x["data"].split("/")[1])
        )

    def _salvar_base_ipca(self, historico):
        try:
            IPCA_BASE_PATH.write_text(
                json.dumps(historico, ensure_ascii=False, indent=2),
                encoding="utf-8"
            )
            log(f"[IPCA] Base salva: {len(historico)} meses → {IPCA_BASE_PATH.name}")
        except Exception as e:
            log(f"[IPCA] Erro ao salvar base: {e}")

    def _acumular(self, serie, n_meses):
        acc = 1.0
        for item in serie[-n_meses:]:
            try:
                acc *= (1 + float(item["valor"]) / 100)
            except (ValueError, KeyError):
                pass
        return round((acc - 1) * 100, 4)

    def _acumular_ano(self, serie):
        if not serie: return None
        ultimo_ano = serie[-1]["data"].split("/")[2]
        acc = 1.0
        for item in reversed(serie):
            if item["data"].split("/")[2] != ultimo_ano: break
            try:
                acc *= (1 + float(item["valor"]) / 100)
            except (ValueError, KeyError):
                pass
        return round((acc - 1) * 100, 4)

    def _buscar_yahoo(self, ticker):
        try:
            url = f"https://query1.finance.yahoo.com/v8/finance/chart/{ticker}?range=2mo&interval=1d"
            res = requests.get(url, headers=self.headers, timeout=10)
            if res.status_code == 200:
                quotes = res.json()['chart']['result'][0]['indicators']['quote'][0]['close']
                quotes = [q for q in quotes if q is not None]
                if quotes:
                    return {
                        "atual":    quotes[-1],
                        "anterior": quotes[-22] if len(quotes) >= 22 else quotes[0],
                    }
        except Exception:
            pass
        return {"atual": None, "anterior": None}

    def _carregar_base_selic(self):
        """Lê e mapeia o arquivo 'historico da selic do BC.json' do repositório raiz."""
        if SELIC_BASE_PATH.exists():
            try:
                raw_data = json.loads(SELIC_BASE_PATH.read_text(encoding="utf-8"))
                lista_reunioes = raw_data.get("conteudo", [])
                
                historico_formatado = []
                for item in lista_reunioes:
                    data_iso = item.get("DataReuniaoCopom", "").split("T")[0]
                    if data_iso:
                        dt = datetime.strptime(data_iso, "%Y-%m-%d")
                        data_br = dt.strftime("%d/%m/%Y")
                    else:
                        data_br = "-"
                    
                    historico_formatado.append({
                        "data": data_br,
                        "valor": item.get("MetaSelic"),
                        "numero_reuniao": item.get("NumeroReuniaoCopom"),
                        "DataReuniaoCopom": item.get("DataReuniaoCopom"),
                        "MetaSelic": item.get("MetaSelic")
                    })
                return historico_formatado
            except Exception as e:
                print(f"[SELIC] Erro ao ler histórico local: {e}")
        return []

    def _carregar_base_meta_inflacao(self):
        """Lê e repassa o arquivo 'meta-vs-inflacao-efetiva.json' da raiz do repositório."""
        if META_INFLACAO_PATH.exists():
            try:
                raw_data = json.loads(META_INFLACAO_PATH.read_text(encoding="utf-8"))
                return raw_data.get("conteudo", [])
            except Exception as e:
                print(f"[META INFLAÇÃO] Erro ao ler base de metas: {e}")
        return []

    def coletar_todos(self):
        log("[MERCADO] Coletando indicadores macro e índices internacionais...")

        selic_meta    = self._buscar_bcb(432)
        cdi_hoje      = self._buscar_bcb(12)
        poupanca_nova = self._buscar_bcb(196)

        selic_historico = self._carregar_base_selic()
        inflacao_meta_efetiva = self._carregar_base_meta_inflacao()

        base_ipca  = self._carregar_base_ipca()
        delta_ipca = self._buscar_ipca_delta(meses=3)
        ipca_serie = self._merge_ipca(base_ipca, delta_ipca)

        if ipca_serie:
            self._salvar_base_ipca(ipca_serie)

        ipca_ultimo_mes = ipca_label_mes = ipca_acum_ano = ipca_acum_12m = None
        ipca_historico = []

        if ipca_serie:
            ultimo          = ipca_serie[-1]
            ipca_ultimo_mes = ultimo["valor"]
            ipca_label_mes  = ultimo["label"]
            ipca_acum_ano   = self._acumular_ano(ipca_serie)
            ipca_acum_12m   = self._acumular(ipca_serie, 12)
            ipca_historico  = [{"label": i["label"], "valor": i["valor"]} for i in ipca_serie]

        dolar     = self._buscar_yahoo("BRL=X")
        ibov      = self._buscar_yahoo("^BVSP")
        sp500     = self._buscar_yahoo("^GSPC")
        dow_jones = self._buscar_yahoo("^DJI")
        nasdaq    = self._buscar_yahoo("^IXIC")

        focus_data = buscar_focus(self.headers)

        return {
            "atualizado_em": datetime.now().strftime("%d/%m/%Y %H:%M:%S"),
            "cards": {
                "selic_meta": {
                    "valor": selic_meta, 
                    "unidade": "% a.a.",
                    "historico": selic_historico
                },
                "cdi": {
                    "valor":    round(selic_meta - 0.10, 4) if selic_meta else None,
                    "unidade": "% a.a.",
                },
                "cdi_dia":      {"valor": cdi_hoje, "unidade": "%"},
                "ipca": {
                    "ultimo_mes":    ipca_ultimo_mes,
                    "label_mes":     ipca_label_mes,
                    "acum_ano":      ipca_acum_ano,
                    "acum_12m":      ipca_acum_12m,
                    "historico":     ipca_historico,
                    "meta_central":  3.0,
                    "meta_superior": 4.5,
                    "meta_inferior": 1.5,
                    "unidade":       "%",
                },
                "ipca_mes_anterior": {"valor": ipca_ultimo_mes, "unidade": "%"},
                "poupanca_nova":     {"valor": poupanca_nova, "unidade": "% m.m."},
                "ibovespa": {
                    "atual":    ibov["atual"],
                    "anterior": ibov["anterior"],
                    "variacao_mensal": round(((ibov["atual"] / ibov["anterior"]) - 1) * 100, 2)
                                       if ibov["atual"] and ibov["anterior"] else None,
                },
                "dolar": {
                    "atual":    dolar["atual"],
                    "anterior": dolar["anterior"],
                    "variacao_mensal": round(((dolar["atual"] / dolar["anterior"]) - 1) * 100, 2)
                                       if dolar["atual"] and dolar["anterior"] else None,
                },
            },
            "indices_internacionais": {
                "sp500_usd": sp500["atual"],
                "sp500_brl": round(sp500["atual"] * dolar["atual"], 2)
                             if sp500["atual"] and dolar["atual"] else None,
                "dow_jones": dow_jones["atual"],
                "nasdaq":    nasdaq["atual"],
            },
            "focus": focus_data,
            "historico_selic": selic_historico,
            "meta_vs_inflacao_efetiva": inflacao_meta_efetiva
        }

# ---------------------------------------------------------------------------
# Ponto de entrada
# ---------------------------------------------------------------------------
def executar():
    log("⚡ [INÍCIO] Executando pipeline integrado do Robô SIPII v13...")

    # 1. Scraping de URLs do portal institucional CAIXA
    links_dinamicos = raspar_urls_caixa()

    # 2. Baixa e monta o catálogo de propriedades estruturadas do fundos.json
    headers_http = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    }
    indice_fundos_json = buscar_fundos_json(headers_http)

    # 3. Extração de dados brutos do SIPII por segmento
    todos_dados = []
    for perf in PERFIS:
        log(f"Iniciando raspagem do segmento: {perf['segmento']}...")
        dados_perfil = processar_perfil(perf, headless=True)
        todos_dados.extend(dados_perfil)
        time.sleep(2)

    if not todos_dados:
        log("[ERRO] Falha crítica: Nenhum dado capturado no SIPII. Pipeline interrompido.")
        return

    # 4. Consolidação multicruzamento de perfis comerciais
    log("Deduplicando e injetando cruzamento de perfis...")
    df_consolidado = consolidar(todos_dados)

    # 5. Inteligência de Enriquecimento de Dados Cruzados
    df_consolidado["URL"] = df_consolidado["Fundo"].apply(
        lambda x: encontrar_url(x, links_dinamicos)
    )
    df_consolidado = enriquecer_dados_com_fundos_json(df_consolidado, indice_fundos_json)

    # ---------------------------------------------------------------------------
    # TRATAMENTO DE SEGURANÇA: Limpeza e Fallback do fundos.json
    # ---------------------------------------------------------------------------
    log("[Ajuste SIPII] Sanetizando nomes dos fundos e aplicando regras de quoting...")
    
    # 1. Remove notas residuais tipo (1) (2) que quebram o casamento de strings e o CSV
    df_consolidado['Fundo'] = df_consolidado['Fundo'].astype(str).apply(
        lambda x: re.sub(r'\s*\(\d+\)', '', x).strip()
    )
    df_consolidado['Fundo_norm'] = df_consolidado['Fundo_norm'].astype(str).apply(
        lambda x: re.sub(r'\s*\(\d+\)', '', x).strip()
    )
    
    # 2. Garante string vazia nas colunas do JSON para evitar termos nulos textuais
    colunas_validar = ["CNPJ", "Perfil de Risco", "Taxa Adm (%)", "Aplicacao Minima (R$)", "Conversao Resgate", "Pagamento Resgate"]
    for col in colunas_validar:
        if col in df_consolidado.columns:
            df_consolidado[col] = df_consolidado[col].fillna("")

    # ---------------------------------------------------------------------------
    # 6. Exportação CSV e Excel estruturados (Com Quoting Ativado)
    # ---------------------------------------------------------------------------
    caminho_csv  = BASE_DIR / "dados_atuais.csv"
    caminho_xlsx = BASE_DIR / "dados_atuais.xlsx"
    
    # SALVAMENTO BLINDADO: quoting=csv.QUOTE_MINIMAL força aspas onde houver vírgulas internas
    df_consolidado.to_csv(caminho_csv, index=False, encoding="utf-8", quoting=csv.QUOTE_MINIMAL)
    salvar_excel(df_consolidado, caminho_xlsx)

    # 7. KPIs do dashboard
    caminho_kpis = BASE_DIR / "kpis_dashboard.json"
    gerar_json_kpis_dashboard(df_consolidado, caminho_kpis)

    # 8. Unificação de Macros de Mercado + Focus → mercado_atual.json
    try:
        coletor    = ColetorMercado()
        indicadores = coletor.coletar_todos()

        caminho_json = BASE_DIR / "mercado_atual.json"
        with open(caminho_json, "w", encoding="utf-8") as f:
            json.dump(indicadores, f, indent=4, ensure_ascii=False)

        n_hist   = len(indicadores["cards"]["ipca"]["historico"])
        n_focus  = len(indicadores.get("focus", {})) - 1
        log(f"[SUCESSO] JSON unificado exportado: {caminho_json.name} | Histórico IPCA: {n_hist} m | Focus: {n_focus} ind")

    except Exception as e:
        log(f"[ERRO] Falha ao processar dados macroeconômicos: {e}")
        traceback.print_exc()

    log("Ações concluídas com sucesso. Processo de arquitetura de dados finalizado. Bases preparadas.")


if __name__ == "__main__":
    executar()

```

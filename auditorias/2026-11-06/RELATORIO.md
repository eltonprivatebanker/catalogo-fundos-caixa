# Auditoria preliminar — Catálogo de Fundos CAIXA

**Fotografia auditada:** 06/11/2026; referência operacional de rentabilidades: **05/11/2026**. Ramo: `Testes-da-versão-01`.

> **Uso interno / experimental.** Os indicadores são médias de rentabilidades de fundos ponderadas pelo patrimônio informado em uma fotografia. Não equivalem ao retorno de uma carteira efetivamente investida, nem ao PL econômico sem sobreposição.

## Universo e diagnóstico

- **225 fundos no catálogo** = 183 do CSV + 42 adicionados de `fundos.json` (cadastro de 209 registros).
- **170 fundos** têm simultaneamente PL positivo e retorno de 12 meses numérico no CSV.
- **141 fundos** passam no filtro conservador de identidade, referência e tempo de existência.
- **350,76 bilhões de reais**: PL somado dos 170 fundos com retorno.
- **300,21 bilhões de reais**: PL da amostra conservadora (85,59% de cobertura do PL operacional com retorno).
- **21 registros** envolvidos em **9 CNPJs repetidos**; também há 21 registros com códigos repetidos.
- **6 registros** têm 12M numérico sem 12 meses completos desde o início (esses casos trazem retorno 0,00% no CSV).
- **5 registros operacionais** não têm nem CNPJ nem código; alguns estão sem cota.
- **101 fundos** com 'FIC' no nome somam R$ 230,85 bi — alerta estrutural, não prova de dupla contagem.

## Rentabilidade ponderada — cenário conservador

| Categoria | Fundos com dados | Elegíveis | PL bruto (R$ bi) | PL elegível (R$ bi) | Cobertura | 12M ponderado filtrado |
|---|---:|---:|---:|---:|---:|---:|
| RENDA FIXA | 68 | 55 | 137,23 | 110,14 | 80,26% | 13,94% |
| RENDA FIXA REFERENCIADO | 15 | 13 | 134,41 | 112,85 | 83,96% | 13,88% |
| RENDA FIXA CURTO PRAZO | 5 | 5 | 50,93 | 50,93 | 100,00% | 11,78% |
| ACOES | 36 | 33 | 9,31 | 8,75 | 94,01% | 8,93% |
| RENDA FIXA SIMPLES | 5 | 5 | 7,96 | 7,96 | 100,00% | 12,09% |
| MULTIMERCADO | 30 | 22 | 6,26 | 5,88 | 93,87% | 13,32% |
| FUNDOS MUTUOS DE PRIVATIZACAO | 9 | 7 | 4,54 | 3,61 | 79,43% | 41,68% |
| CAMBIAL | 1 | 1 | 0,09 | 0,09 | 100,00% | 6,85% |
| FUNDO DE INDICE | 1 | 0 | 0,02 | 0,00 | 0,00% | — |
| INVESTIMENTO IMOBILIARIO | 0 | 0 | 0,00 | 0,00 | —% | — |

**Atenção:** a diferença entre o ponderado bruto e o filtrado decorre das exclusões por qualidade dos dados; NÃO deve ser interpretada como alteração de desempenho dos fundos. A categoria sem fundos elegíveis não recebe rendimento imputado.

## Os nove grupos de CNPJ repetido

- CNPJ `09548729000171` (2 registros): CAIXA FIC FIF CAPITAL IND PREÇOS RF LP RESP LTDA / CAIXA FIC FIF FOCO IND PREÇOS RF LP RESP LTDA.
- CNPJ `10646888000198` (2 registros): CAIXA FIF FIC EXPERT SULAMERICA RF CRED PRIV LP - RESP LTDA / CAIXA FIC FIF EXPERTISE RF CRED PRIV LP RESP LTDA.
- CNPJ `34660333000169` (2 registros): CAIXA FIC FIF ESTRATÉGIA LIVRE MULTIMERCADO LP RESP LTDA / CAIXA FIC FIF FUNCIONARIOS ESTRATEGIA LIVRE MULTIMERCADO LP RESP LTDA.
- CNPJ `44683343000173` (3 registros): CAIXA FIC FIM CAPITAL PROTEGIDO CICLICO II LP - RL / CAIXA CAPITAL PROTEGIDO CÍCLICO III FIC FIF MM LP - RESP LTDA / CAIXA CAPITAL PROTEGIDO IBOVESPA CÍCLICO I FIC FIF MM.
- CNPJ `59815671000153` (2 registros): CAIXA FIF ACOES SEGURIDADE RESP LTDA / CAIXA SEGURIDADE II FIF ACOES - RESP LTDA.
- CNPJ `15154236000150` (2 registros): CAIXA ETF IBOVESPA FUNDO DE ÍNDICE RESP LTDA / CAIXA FIF AÇÕES BRASIL ETF IBOVESPA RESP LTDA.
- CNPJ `04885818000190` (2 registros): CAIXA FMP-FGTS VALE RIO DOCE II RESP LTDA / CAIXA FMP-FGTS VALE RIO DOCE I RESP LTDA.
- CNPJ `10740670000106` (3 registros): CAIXA FI BRASIL IRF-M 1 TP RF / CAIXA FIF BRASIL IRF-M TP RF LP - RESP LTDA / CAIXA FI BRASIL IRF-M 1+ TP RF LP.
- CNPJ `11060913000110` (3 registros): CAIXA FI BRASIL IMA-B TP RF LP / CAIXA FIF BRASIL IMA-B 5 TP RF LP - RESP LTDA / CAIXA FIF BRASIL IMA-B 5+ TP RF LP - RESP LTDA.

## Padrões necessários antes da publicação

1. **Identificadores:** reconciliar cada CNPJ/código com a lista oficial, por nome do fundo e documentação, eliminando associações apenas aproximadas.
2. **Retornos:** 12 meses completos, conferir zeros que na prática indicam indisponibilidade.
3. **PL e datas:** adicionar ao robô campo independente para data de patrimônio e manter referências históricas coerentes.
4. **Camadas FI/FIC:** obter posição nos fundos investidos antes de chamar a soma de patrimônio econômico consolidado.
5. **Cobertura:** exibir PL e número elegível no painel; evitar classificar automaticamente todos os 55 sem 12M como 'pipeline'.

## Evidências e reprodução

- `dados_atuais.csv` SHA: `daa1d74cde37428f8606281aeeb001410f575df9`
- `fundos.json` SHA: `38cea38c541658c5600e4ce65656200d08f19123`
- `kpis_dashboard.json` SHA: `fb34aae17886d295f2cdf6c4720c3cf087908dac`
- Arquivos deste relatório: `diagnostico_225_fundos.csv`, `inconsistencias_fundos.csv`, `categorias_preliminares.csv`, `resumo_auditoria.json`.
- O cenário conservador é um **ensaio analítico**, não substitui o indicador operacional atual.

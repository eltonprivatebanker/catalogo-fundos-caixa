# Como executar a auditoria no seu computador

Essa auditoria é **independente** do robô SIPII e não altera dados do catálogo.

## Requisitos

- Python 3.10 ou mais recente.
- Os arquivos `dados_atuais.csv` e `fundos.json` na raiz do repositório.
- Não requer instalação de bibliotecas adicionais.

## Execução no Windows / PowerShell

Abra um terminal na pasta `catalogo-fundos-caixa` e execute:

```powershell
py -3 scripts/auditar_catalogo_caixa.py --base . --saida auditorias/gerado
```

Alternativa para instalações que usam o executável `python`:

```powershell
python scripts/auditar_catalogo_caixa.py --base . --saida auditorias/gerado
```

O programa grava na pasta `auditorias/gerado` os quatro arquivos:
- `diagnostico_225_fundos.csv`: uma linha por fundo, incluindo motivos de exclusão;
- `inconsistencias_fundos.csv`: somente fundos com alertas;
- `categorias_preliminares.csv`: média simples, mediana e média ponderada por categoria;
- `resumo_auditoria.json`: totais e quantitativos de alertas.

**Atenção:** a quantidade de fundos mudará quando as bases originais forem atualizadas; o nome `diagnostico_225_fundos.csv` reflete a fotografia atual e poderá continuar com esse nome em futuras execuções mesmo que o universo mude.

## Fotografia de conferência de 06/11/2026

- 183 fundos no CSV operacional;
- 209 registros em `fundos.json`, dos quais 42 são adicionados;
- 225 fundos exibidos;
- 141 elegíveis no filtro conservador;
- 84 registros com pelo menos um alerta.

Os números acima não são garantidos para versões futuras das bases.

## Critérios de elegibilidade

Apenas fundos do CSV com PL positivo, retorno de 12 meses numérico, data de rentabilidade alinhada à fotografia, 12 meses completos desde o início e sem CNPJ/código ambíguo são incluídos na média filtrada.

O PL é um peso de fotografia, não uma posição histórica. O script não verifica estruturas FI/FIC, participações cruzadas nem a data independente do PL. Uma média ponderada calculada dessa forma **não é** a rentabilidade efetiva de uma carteira ou do patrimônio total sob gestão.

## O que fazer com os alertas

Conferir CNPJ e código diretamente nos documentos ou cadastro oficial antes de substituir qualquer dado. Em particular, não transformar um match aproximado por nome em identidade confirmada. Após validação, corrigir **a origem do vínculo no processamento**, e não somente um valor exibido na página.

## Segurança

Este script não altera o site, o robô, o CSV de origem nem o cadastro; gera apenas arquivos na pasta `--saida`.

## Fontes da fotografia original

- `dados_atuais.csv`: blob `daa1d74cde37428f8606281aeeb001410f575df9`
- `fundos.json`: blob `38cea38c541658c5600e4ce65656200d08f19123`
- `kpis_dashboard.json`: blob `fb34aae17886d295f2cdf6c4720c3cf087908dac`

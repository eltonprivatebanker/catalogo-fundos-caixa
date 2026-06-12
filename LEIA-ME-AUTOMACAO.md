# Automação integral do catálogo

## Arquivos que precisam ser substituídos

1. Na branch `Testes-da-versão-01`, substitua `robo_sipii_simples.py`.
2. Na branch padrão `main`, substitua `.github/workflows/main.yml`.

O workflow precisa permanecer na branch padrão porque os agendamentos (`schedule`) do GitHub Actions são disparados somente a partir dela. O workflow atualizado faz checkout da branch publicada `Testes-da-versão-01`, executa o robô e grava os resultados nessa branch.

## O que passa a ser automático

Em cada execução, o robô:

- baixa o catálogo integral oficial e atualiza `fundos.json`;
- gera `fundos_caixa.json` por CNPJ;
- enriquece `dados_atuais.csv` e `dados_atuais.xlsx`;
- inclui benchmark, estratégia, captação, tributação, horários, adiantamento, mínimos, público-alvo, carência, ASG e documentos;
- gera `auditoria_fundos.json` com a cobertura da integração;
- mantém os demais arquivos de mercado, Focus, KPIs e históricos;
- valida os arquivos antes do commit;
- publica tudo automaticamente na branch `Testes-da-versão-01`.

## Horário

O agendamento atual ocorre de segunda a sexta-feira às 10:00 UTC, equivalente a 07:00 no horário de Brasília.

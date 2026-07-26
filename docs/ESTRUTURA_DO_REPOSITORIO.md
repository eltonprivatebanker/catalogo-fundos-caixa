# Estrutura do repositório

Esta reorganização foi feita em uma etapa segura: os arquivos consumidos diretamente pelo site continuam na raiz, enquanto documentação, legado e snapshots foram movidos para pastas próprias.

```text
/
├── .github/workflows/main.yml
├── archive/legacy/
├── data/historico/sipii/
├── docs/
│   ├── historico-versoes/
│   └── robo/
├── index.html
├── app.js
├── style.css
├── tokens-caixa.css
├── robo_sipii_simples.py
├── requirements.txt
└── dados correntes (.json, .csv e .xlsx)
```

## Por que os dados correntes permanecem na raiz?

O `app.js` utiliza caminhos como `dados_atuais.csv`, `fundos.json`, `fundos_caixa.json`, `mercado_atual.json` e `kpis_dashboard.json`. Mantê-los na raiz evita uma migração simultânea de dezenas de referências e reduz o risco de indisponibilidade no GitHub Pages.

## Workflow

O workflow deixou de usar `git add .`. Agora adiciona apenas os arquivos produzidos pelo robô e a pasta de histórico, evitando que logs, caches ou arquivos locais entrem acidentalmente no repositório.

# Catálogo de Fundos CAIXA — v323

Arquivos atualizados:
- index.html
- style.css
- app.js

## Ajuste aplicado

Corrigido o KPI/card “CDI 12 meses”, que estava aparecendo sem valor.

## Motivo provável

O valor `acum_12m` existia nos dados, mas não estava sendo aplicado no elemento:

- `#cdiLast12mValueV296`

## Correção

A v323 preenche o 12M usando:

1. `cards.cdi.acum_12m`, quando disponível;
2. fallback calculado com os últimos 12 meses do histórico mensal.

## Como subir

Substitua:
- index.html
- style.css
- app.js

Depois atualize forçado no navegador.

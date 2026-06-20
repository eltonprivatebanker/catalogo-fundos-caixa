# Catálogo de Fundos CAIXA — v310

Arquivos atualizados:
- index.html
- style.css
- app.js

## O que foi corrigido

O card Resumo executivo estava com dois ícones porque existiam dois elementos:

1. `span.mobile-kpi-emoji` — ícone antigo do layout mobile.
2. `span.section-title-icon-v302` — ícone novo padronizado no H2.

A v310 oculta o ícone antigo no mobile e mantém apenas o ícone novo do título.

## Também ajustado

O normalizador v303 deixa de interferir nos títulos hero discretos:
- Resumo executivo
- Indicadores de mercado

## Como subir

Substitua:
- index.html
- style.css
- app.js

Depois atualize forçado no navegador.

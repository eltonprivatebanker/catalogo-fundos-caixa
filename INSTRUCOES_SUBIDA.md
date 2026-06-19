# Catálogo de Fundos CAIXA — v292

Arquivos atualizados:
- index.html
- style.css
- app.js

## Foco

Aplicação de uma classe utilitária única para os valores/percentuais de rentabilidade dos rankings.

## O que foi aplicado

- criada a classe `.ranking-value-standard`;
- aplicada no JS aos valores gerados em:
  - cards-resumo: `.ranking-exec-card > strong`;
  - cards “Melhores por categoria”: `.ranking-cat-mini > strong`;
  - lista Top 10: `.ranking-return`;
- unificação de:
  - font-size;
  - font-weight;
  - line-height;
  - letter-spacing;
  - alinhamento à direita;
  - font-variant-numeric: tabular-nums;
- mantidas as cores `.pos`, `.neg` e `.zero`;
- regra scoped em `#rankingsSection` para evitar afetar outras áreas.

## Como subir

Substitua:
- index.html
- style.css
- app.js

Depois atualize forçado no celular.

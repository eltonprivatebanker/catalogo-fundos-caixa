# Catálogo de Fundos CAIXA — v298

Arquivos atualizados:
- index.html
- style.css
- app.js

## Ajuste aplicado

Refino semântico da seção CDI no mobile.

## O que mudou

- Desktop preservado.
- No mobile, a legenda do gráfico foi removida porque o gráfico agora tem apenas uma série: CDI mensal.
- O título no mobile passou para “CDI — resumo 2026”.
- Os acumulados continuam nos cards/KPIs:
  - mês atual/parcial;
  - último mês fechado;
  - ano;
  - 12 meses.
- O gráfico ficou mais próximo dos cards, com menos área sobrando embaixo.
- Reduzi a altura visual do bloco no mobile.

## Por que ficou melhor semanticamente

Como a linha do CDI acumulado saiu do gráfico mobile, a legenda “CDI mensal” ficou redundante. A informação acumulada permanece nos cards, onde é mais clara no celular.

## Como subir

Substitua:
- index.html
- style.css
- app.js

Depois atualize forçado no celular.

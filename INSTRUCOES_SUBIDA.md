# Catálogo de Fundos CAIXA — v288

Arquivos atualizados:
- index.html
- style.css
- app.js

## Diagnóstico

No card “Maior PL”, o console mostrou:
- altura do card: 118px;
- conteúdo real + padding + gaps: cerca de 97px;
- sobra aproximada: 21px.

O principal causador era `min-height: 118px`, não apenas padding.

## Correção aplicada

- card “Maior PL” recebeu regra especial;
- `min-height` reduzido;
- padding interno reduzido;
- row-gap menor;
- valor mantido no topo direito;
- nome/metadado em 1 linha, pois esse card é resumo de categoria e não fundo.

## Como subir

Substitua:
- index.html
- style.css
- app.js

Depois atualize forçado no celular.

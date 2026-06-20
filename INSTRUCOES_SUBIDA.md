# Catálogo de Fundos CAIXA — v308

Arquivos atualizados:
- index.html
- style.css
- app.js

## O que foi corrigido

A v307 ocultava o `#gfb-inner`, mas o container pai `#gfb` ainda existia e continuava reservando área/estrutura no topo.

A v308 remove visualmente o container completo no mobile:

- `#gfb`
- `#gfb-inner`
- `#gfbSearch`
- `#gfb-chips`

## Importante

A busca e os filtros próprios da seção Fundos continuam preservados.

## Escopo

- Mobile: `#gfb` inteiro sai do fluxo.
- Desktop: preservado.

## Como subir

Substitua:
- index.html
- style.css
- app.js

Depois atualize forçado no navegador.

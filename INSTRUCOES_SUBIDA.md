# Catálogo de Fundos CAIXA — v299

Arquivos atualizados:
- index.html
- style.css
- app.js

## Diagnóstico

O console mostrou:
- o canvas existe e está visível;
- o canvas tinha 265x94;
- o wrapper do gráfico ainda estava com `min-height: 178px`, mesmo com `max-height: 108px`;
- o canvas estava `display: inline` e sem atributos width/height, sinal de renderização instável.

## Correção aplicada

- zerei o `min-height` antigo do wrapper no mobile;
- forcei canvas como `display: block`;
- estabilizei altura do wrapper, inner e canvas;
- mantive legenda e rodapé ocultos no mobile;
- adicionei uma proteção no JS para garantir que `isMobile` exista antes de qualquer uso dentro de `renderCdiYearHistory`.

## Como subir

Substitua:
- index.html
- style.css
- app.js

Depois atualize forçado no celular.

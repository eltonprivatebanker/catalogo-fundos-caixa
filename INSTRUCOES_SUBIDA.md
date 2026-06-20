# Catálogo de Fundos CAIXA — v340

Arquivos atualizados:
- index.html
- style.css
- app.js

## Problema identificado

O console confirmou um loop de mutações em `#sec-graficos`.

A causa principal estava na v339:
- um `MutationObserver` observava `#sec-graficos`;
- a função `apply()` alterava estilos/atributos;
- essas alterações disparavam o observer novamente;
- o observer chamava `apply()` outra vez;
- isso gerava piscadas, pulos e muitas mutações.

Também havia erro do Chart.js:
- `can't access property "ownerDocument", t is null`
- causado por `resize()` em gráfico/canvas que não estava conectado ao DOM.

## Correções v340

1. Removido o MutationObserver contínuo da v339.
2. Adicionado resize seguro para os gráficos.
3. O eixo X continua horizontal.
4. As abas continuam compactas.
5. Redução de piscada/pulo na área de Inflação e Juros.

## Como subir

Substitua:
- index.html
- style.css
- app.js

Depois atualize forçado no navegador.

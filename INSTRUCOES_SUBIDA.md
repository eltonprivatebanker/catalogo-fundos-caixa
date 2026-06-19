# Catálogo de Fundos CAIXA — v303

Arquivos atualizados:
- index.html
- style.css
- app.js

## Diagnóstico

A v302 estruturou corretamente os títulos, mas o console mostrou que regras antigas com `!important` ainda venciam o CSS em alguns H2:
- Fundos disponíveis
- Rankings dos fundos
- Indicadores de mercado

## Correção

A v303 adiciona um normalizador final em JavaScript que aplica a regra visual diretamente nos títulos com `style.setProperty(..., 'important')`.

Isso vence os estilos legados mais agressivos.

## Resultado esperado

Todos os títulos principais devem ficar com:
- `fontWeight: 800`
- mesma cor `rgb(248, 250, 252)`
- tamanhos coerentes e padronizados
- `iconsV302: 1`
- `display: flex`

## Como subir

Substitua:
- index.html
- style.css
- app.js

Depois atualize forçado no navegador.

# Catálogo de Fundos CAIXA — v286

Arquivos atualizados:
- index.html
- style.css
- app.js

## Diagnóstico do segundo console

O retorno mostrou que o problema não era largura horizontal:
- isOverflowingX = false nos valores;
- o problema era vertical:
  - scrollHeight maior que clientHeight nos campos de rentabilidade.

Isso indica que a fonte numérica estava com line-height/altura muito apertados.

## Correção aplicada

- aumentei o line-height dos valores;
- removi padding superior que apertava a altura;
- forcei altura automática nos valores;
- reduzi levemente a escala dos percentuais;
- mantive rentabilidade no lado direito;
- mantive nomes com quebra limpa e mais proporcional;
- deixei cards um pouco mais compactos.

## Como subir

Substitua:
- index.html
- style.css
- app.js

Depois limpe o cache/atualize forçado no celular.

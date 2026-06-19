# Catálogo de Fundos CAIXA — v301

Arquivos atualizados:
- index.html
- style.css
- app.js

## Diagnóstico

A v300 subiu corretamente, mas regras antigas e mais específicas de cada seção ainda estavam vencendo a regra dos títulos.

Exemplos encontrados no console:
- Fundos disponíveis: 15.68px
- Rankings: 26.4px
- Indicadores: dourado e font-weight 900

## Correção

A v301 adiciona uma regra final mais forte no CSS, no final do arquivo, para forçar o mesmo padrão em todos os H2 principais com `.section-title-v300`.

## Resultado esperado

Os quatro títulos principais devem ficar com:
- mesma cor;
- mesmo peso;
- mesmo tamanho;
- mesmo espaçamento;
- mesmo padrão de ícone.

## Como subir

Substitua:
- index.html
- style.css
- app.js

Depois atualize forçado no navegador.

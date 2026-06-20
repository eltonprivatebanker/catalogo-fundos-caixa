# Catálogo de Fundos CAIXA — v335

Arquivos atualizados:
- index.html
- style.css
- app.js

## Correção aplicada

Corrigido o eixo X do gráfico Dólar PTAX no mobile.

## O que mudou

- Rótulos do eixo X não ficam mais inclinados.
- `maxRotation: 0`
- `minRotation: 0`
- máximo de 5 rótulos visíveis no mobile.
- datas intermediárias ficam ocultas no eixo.
- a data completa permanece no tooltip ao tocar no gráfico.

## Motivo

Em períodos longos, como 24M e 36M, havia excesso de datas no eixo X e o Chart.js inclinava os textos automaticamente.

## Como subir

Substitua:
- index.html
- style.css
- app.js

Depois atualize forçado no navegador.

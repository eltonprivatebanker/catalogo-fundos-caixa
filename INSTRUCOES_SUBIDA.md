# Catálogo de Fundos CAIXA — v290

Arquivos atualizados:
- index.html
- style.css
- app.js

## Diagnóstico

A v289 carregou corretamente, mas o diagnóstico mostrou:
- cards ainda com min-height fixo;
- cards por categoria ainda com espaço sobrando;
- valores dos cards com overflowY residual;
- visual ainda pouco uniforme.

## Correção aplicada

- removido min-height inflado dos cards de ranking;
- altura passa a ser definida pelo conteúdo;
- régua única de label, valor, nome e meta;
- valores com line-height maior e sem overflow vertical;
- cards por categoria mais compactos;
- Top 10 mais enxuto;
- espaçamento entre cards reduzido.

## Como subir

Substitua:
- index.html
- style.css
- app.js

Depois atualize forçado no celular.

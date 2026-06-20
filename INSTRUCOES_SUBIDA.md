# Catálogo de Fundos CAIXA — v344

Arquivos atualizados:
- index.html
- style.css
- app.js

## Correções aplicadas

### 1. Botão 2A removido definitivamente
O botão Selic 2A estava voltando por renderização dinâmica.
Agora ele é removido pelo JS e também ocultado por CSS forte.

### 2. Botão Histórico
Continua como “Completo”, mais curto e adequado ao mobile.

### 3. Estabilidade
Mantido o eixo X horizontal e removida a lógica com observer contínuo.
As correções são aplicadas apenas em eventos pontuais para evitar pisca/pulo.

## Como subir

Substitua:
- index.html
- style.css
- app.js

Depois atualize forçado no navegador.

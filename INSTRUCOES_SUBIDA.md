# Catálogo de Fundos CAIXA — v342

Arquivos atualizados:
- index.html
- style.css
- app.js

## Correções aplicadas

### 1. Remoção do botão 12M
Removido o botão 12M dos gráficos de Inflação/Juros.

Motivo:
- No IPCA mensal, o 12M não estava funcionando corretamente.
- Na Selic, ele era redundante em relação ao 1A.

### 2. Impedir reinserção do 12M
A função que tentava criar o 12M dinamicamente foi desativada.

### 3. Eixo X horizontal
Foi aplicado um patch no Chart.js para manter:
- maxRotation: 0
- minRotation: 0
- no máximo 5 labels visíveis no mobile

Isso impede que as datas fiquem inclinadas após o gráfico renderizar ou atualizar.

## Como subir

Substitua:
- index.html
- style.css
- app.js

Depois atualize forçado no navegador.

# Catálogo de Fundos CAIXA — v276

Arquivos atualizados:
- index.html
- style.css
- app.js

## Correção principal
O gráfico do CDI agora usa eixos lineares com limites e degraus explícitos:

- eixo esquerdo, CDI mensal: 0% a 2%, com passos de 0,5 p.p.;
- eixo direito, CDI acumulado: 0% a 8% enquanto o acumulado couber nesse intervalo, com passos de 2 p.p.;
- quando o acumulado anual passar de 8%, o eixo direito sobe para 12%, 16%, etc., mantendo 4 degraus proporcionais;
- removidos os limites automáticos que podiam gerar marcações irregulares, como 0/2/4/7;
- barras e linha ficam matematicamente proporcionais às escalas.

## Como subir
Substitua no GitHub:
- index.html
- style.css
- app.js

Depois faça atualização forçada no navegador/celular para limpar cache.

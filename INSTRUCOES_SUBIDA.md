# Catálogo de Fundos CAIXA — v332

Arquivos atualizados:
- index.html
- style.css
- app.js

## Correção aplicada

A v329 carregava, mas alguns textos do Painel Consolidado eram recriados pelo JavaScript depois do carregamento. Por isso, visualmente a limpeza não aparecia.

A v332 força a limpeza depois da renderização e observa mudanças no bloco de mercado.

## Ajustes forçados

1. CDI
- “Acumulado no mês · Dados disponíveis até 18/06”
- vira “Parcial até 18/06”

2. Tag nominal
- Dólar: “Atual” vira “Cotação”
- Ibovespa, S&P 500, Dow Jones e Nasdaq: “Atual” vira “Pontos”

3. Grid de variação
- “Atual” vira “Mês atual”

## Como subir

Substitua:
- index.html
- style.css
- app.js

Depois atualize forçado no navegador.

# Catálogo de Fundos CAIXA — v275

Arquivos atualizados:
- index.html
- style.css
- app.js

## Correção
O botão "Tabela analítica" do bloco de CDI agora:
- alterna o painel de indicadores para o modo "Tabela analítica";
- rola a página até o painel analítico;
- não tenta mais clicar nele mesmo.

## Motivo do problema
O botão do CDI tinha o mesmo texto da aba "Tabela analítica" e não possuía ID próprio. A função procurava por um botão com esse texto e acabava encontrando o próprio botão do CDI, sem acionar a aba correta.

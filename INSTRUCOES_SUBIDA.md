# Catálogo de Fundos CAIXA — v293

Arquivos atualizados:
- index.html
- style.css
- app.js

## Foco

Estabilizar o bloco “Leitura rápida” no Ranking mobile.

## Problema

O texto muda conforme categoria, período e filtros. Quando o texto fica maior ou menor:
- a tela pode pular;
- o card pode sobrar espaço;
- a navegação perde sensação de estabilidade.

## Solução aplicada

- Mantive a seção, mas compacta no mobile.
- Defini altura mínima e máxima controlada.
- Apliquei `line-clamp` em 3 linhas.
- O conteúdo maior é cortado com reticências.
- Desktop continua preservado.
- Incluí no CSS um bloco comentado caso você queira ocultar totalmente essa seção no mobile no futuro.

## Como subir

Substitua:
- index.html
- style.css
- app.js

Depois atualize forçado no celular.

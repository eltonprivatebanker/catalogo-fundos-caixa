# Atualização v252 — Correção das competências do IPCA mensal

Substitua na branch publicada os arquivos:

- `index.html`
- `style.css`
- `app.js`

## O que foi corrigido

1. O card **Último IPCA** passa a usar a mesma competência oficial do painel principal.
2. O resumo não mostra mais `jan/2026` quando o último resultado oficial é `mai/2026`.
3. Os cards **Maior mês** e **Menor mês** agora usam o mesmo `label` exibido no gráfico/tooltip.
4. Isso corrige divergências como tooltip em `fev/2025` e resumo em `jan/2025`.
5. Não alterei o robô nem a base de dados, apenas a leitura/rotulagem do gráfico.

## Depois da subida

- Faça `Ctrl + F5` no desktop.
- No celular, feche a aba e abra novamente.

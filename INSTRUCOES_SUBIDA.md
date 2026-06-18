# Atualização v245 — Polimento do gráfico da Selic no mobile

Substitua na branch publicada os arquivos:

- `index.html`
- `style.css`
- `app.js`

## O que mudou

1. Removi os textos fixos **Máx / Mín / Hoje** de dentro do gráfico, porque eles estavam ficando espremidos e invadindo o layout.
2. Mantive os pontos de **máxima**, **mínima** e **vigente** destacados visualmente no gráfico por cor e tamanho.
3. Os cards de resumo acima do gráfico continuam informando claramente Máxima, Mínima e Vigente.
4. Reduzi a quantidade de pontos visíveis em séries longas para melhorar a qualidade visual do gráfico no mobile.
5. Ajustei os rótulos do eixo X para não ficarem tão embolados.
6. Compactei os cards de Máxima / Mínima / Vigente para evitar texto estourado.

## Depois da subida

- Faça `Ctrl + F5` no desktop.
- No celular, feche a aba e abra novamente.

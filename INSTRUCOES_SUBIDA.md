# Atualização v250 — IPCA mensal com resumo executivo

Substitua na branch publicada os arquivos:

- `index.html`
- `style.css`
- `app.js`

## O que mudou

1. O gráfico **IPCA mensal** permanece com os períodos:
   - `24M`
   - `5A`
   - `10A`
2. O título e o subtítulo mudam conforme o período selecionado.
3. Foi adicionado um resumo executivo com:
   - **Último IPCA**
   - **Maior mês**
   - **Menor mês**
4. O gráfico ficou mais legível para 5A e 10A:
   - menos rótulos no eixo X;
   - barras mais finas em períodos longos;
   - melhor leitura no mobile.
5. Mantive a lógica atual de carregamento dos dados.

## Depois da subida

- Faça `Ctrl + F5` no desktop.
- No celular, feche a aba e abra novamente.

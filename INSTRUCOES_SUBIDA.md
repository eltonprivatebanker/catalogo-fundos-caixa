# Atualização v233 — contexto do CDI acumulado no mês

Substitua na mesma branch publicada os arquivos:

- `index.html`
- `style.css`
- `app.js`

Não é necessário substituir o robô Python nem o workflow nesta atualização visual.

Depois do commit:

1. Aguarde a publicação do GitHub Pages.
2. No computador, use `Ctrl + F5`.
3. No celular, feche a aba e abra novamente.

## Resultado esperado

O bloco do CDI passa a mostrar:

- o valor, por exemplo `+0,64%`;
- `Acumulado no mês`;
- `Dados disponíveis até DD/MM`, quando a data for recente;
- `Última referência disponível: DD/MM`, quando a referência estiver defasada;
- `Atualização parcial de jun/2026`, quando a fonte mensal usar o primeiro dia apenas como marcador da competência.

A data exibida nunca é substituída pela data atual do aparelho: ela continua representando a referência realmente recebida na base.

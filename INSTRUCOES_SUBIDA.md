# Atualização v248 — Sincronização da Selic vigente

Substitua na branch publicada os arquivos:

- `index.html`
- `style.css`
- `app.js`

## O que mudou

1. Corrigida a divergência no bloco **Trajetória da Selic meta**.
2. O card **Vigente** agora usa a taxa vigente oficial do painel (`cards.selic_meta.valor`).
3. O gráfico passa a reconciliar o histórico com a taxa vigente quando o histórico ainda estiver terminando na decisão anterior.
4. Assim, o bloco deixa de mostrar **14,50% a.a.** quando o painel já informa **14,25% a.a.**.
5. Mantive a máxima e a mínima calculadas pelo período selecionado.

## Depois da subida

- Faça `Ctrl + F5` no desktop.
- No celular, feche a aba e abra novamente.

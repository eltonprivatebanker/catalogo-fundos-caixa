# Atualização v251 — Correção do gráfico IPCA mensal

Substitua na branch publicada os arquivos:

- `index.html`
- `style.css`
- `app.js`

## O que foi corrigido

1. Corrigido o erro que impedia o gráfico **IPCA mensal** de redesenhar.
2. O resumo executivo do IPCA agora usa um formatador próprio, sem depender da função `pct()` de outros blocos.
3. A mensagem `Não consegui redesenhar este período agora` deve desaparecer.
4. Os cards **Último IPCA**, **Maior mês** e **Menor mês** passam a carregar normalmente.
5. O tooltip do gráfico também foi ajustado para usar o mesmo formatador seguro.

## Depois da subida

- Faça `Ctrl + F5` no desktop.
- No celular, feche a aba e abra novamente.

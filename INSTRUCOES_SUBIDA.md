# Atualização v238 — CNPJ copiável no mobile

## Arquivos para substituir no GitHub

Substitua na branch publicada da plataforma:

- `index.html`
- `style.css`
- `app.js`

Não é necessário alterar o robô Python nem o workflow nesta versão.

## O que foi alterado

- Adicionado o CNPJ no bloco mobile **Dados do fundo**.
- O CNPJ aparece de forma compacta, sem poluir a listagem principal.
- Incluído botão **Copiar** ao lado do CNPJ.
- O botão mostra retorno visual: **Copiado** quando a cópia funciona.
- Mantida a leitura consultiva separada, sem misturar dado cadastral com interpretação.
- Ajustes de estilo para telas menores, incluindo quebra segura em celulares estreitos.

## Depois de subir

1. Faça o commit no GitHub.
2. Aguarde a publicação do GitHub Pages.
3. No computador, atualize com `Ctrl + F5`.
4. No celular, feche a aba e abra novamente.

## Conferência rápida

Abra um fundo no mobile e toque em **Mais detalhes**. O bloco **Dados do fundo** deve mostrar:

- CNPJ
- botão **Copiar**
- Aplicação
- Resgate
- Referência
- Estratégia
- Tributação
- Novas aplicações

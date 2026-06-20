# Catálogo de Fundos CAIXA — v319

Arquivos atualizados:
- index.html
- style.css
- app.js

## Diagnóstico

A v318 carregou corretamente, mas o console mostrou que as regras antigas ainda venciam:

- `gridTemplateColumns`: 1 coluna.
- Cards com largura total.
- Cards ainda com padding antigo `14px 16px`.
- Selic, CDI e Próxima reunião continuavam empilhados.

## Correção aplicada

A v319 força com seletor mais específico e complemento JS:

- Selic e CDI lado a lado.
- Próxima reunião em largura total compacta.
- Cards com padding menor.
- Botão BCB oculto no mobile.

## Como subir

Substitua:
- index.html
- style.css
- app.js

Depois atualize forçado no navegador.

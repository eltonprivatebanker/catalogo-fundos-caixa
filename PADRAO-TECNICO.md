# Padrão técnico do projeto — estabilidade de rolagem

## V838 — regra obrigatória no desktop

A partir da V838, a estabilidade de rolagem durante o primeiro carregamento passa a ser tratada como um requisito de regressão do projeto.

### Implementação preservada

```js
if (window.matchMedia && window.matchMedia('(min-width:769px)').matches) {
  history.scrollRestoration = 'manual';
  document.documentElement.classList.add('desktop-scroll-stable-v838');
}
```

```css
@media (min-width:769px) {
  html.desktop-scroll-stable-v838,
  html.desktop-scroll-stable-v838 body {
    overflow-anchor: none !important;
    scroll-behavior: auto !important;
  }

  html.desktop-scroll-stable-v838 #topo,
  html.desktop-scroll-stable-v838 #sec-fundos,
  html.desktop-scroll-stable-v838 #sec-fundos .table-wrap,
  html.desktop-scroll-stable-v838 #comparWorkspaceV723 {
    overflow-anchor: none !important;
  }
}
```

### Motivo

No Microsoft Edge/Chromium foi observado movimento vertical perceptível na região da tabela do Catálogo durante o boot. Os diagnósticos mostraram alteração da viewport sem chamada JavaScript explícita de rolagem. Desativar a restauração automática e o scroll anchoring no desktop eliminou o comportamento no teste aprovado.

### Regras para novas versões

- Preservar a V838 ao criar novas versões.
- Não usar `scroll-behavior: smooth` global no desktop.
- Alterações em `history.scrollRestoration`, `overflow-anchor`, `scroll-behavior` ou geometria inicial do Catálogo devem ser retestadas no Edge.
- Novas funcionalidades devem ser adicionadas sobre a base V838, sem substituir essa proteção.


## V842 — regra obrigatória para rolagem horizontal do Comparador

A comparação deve iniciar à esquerda quando for aberta, mas nenhuma atualização interna do modal deve disputar a rolagem horizontal com o usuário.

### Regras

- `scrollLeft = 0` somente na transição real de fechado → aberto.
- `MutationObserver` com `subtree:true` não pode tratar mudança de classe de descendentes como mudança de estado do overlay.
- Alterações de conteúdo, classe, destaques, tooltips ou linhas/colunas internas não podem reposicionar horizontalmente a comparação.
- Resize da viewport preserva a posição horizontal escolhida pelo usuário.
- Retestar no Edge com 5–6 fundos sempre que o código do overlay/comparador for alterado.

## V843 — Comparador: geometria por estado
- O workspace do Comparador não deve reservar uma grande área vazia quando não há resultados para listar.
- Sem busca/filtros ativos: 0 selecionados = vazio compacto; 1 = compacto; 2–6 = "Seleção pronta" compacta.
- Ao iniciar busca ou aplicar Categoria/Perfil, remover o modo compacto e permitir a geometria normal da lista.
- Não usar scroll automático para implementar essa compactação.
- Preservar V838 (Edge), V841 (barra do Catálogo) e V842 (scroll horizontal do overlay).

## V844 — Comparador: estado ocioso deve orientar, não parecer vazio
- Compactação não pode remover a orientação de primeiro uso.
- Com 0 selecionados e sem descoberta ativa, exibir CTA curto "Monte sua comparação" com acesso ao Catálogo.
- Com 1 selecionado e sem descoberta ativa, informar que falta apenas mais 1 fundo.
- Com 2–6 selecionados, preservar o estado compacto "Seleção pronta" da V843.
- Busca, Categoria, Perfil ou resultados ativos removem o CTA ocioso e devolvem a área à lista normal.
- Links internos acionados pelo usuário usam `behavior:auto`; não reintroduzir smooth scroll global.

## V845 — detalhe operacional do Catálogo
- O detalhe expandido deve permanecer informativo, mas compacto no desktop.
- Aplicação e Resgate devem ser apresentados como blocos irmãos, sem ampliar desnecessariamente a altura da linha.
- A V845 é uma camada progressiva: não altera os dados do fundo nem a lógica de abertura/fechamento.
- O botão "Copiar" no Catálogo deve ser descrito como "Copiar CNPJ".
- O popover de documentos deve manter todos os documentos, em layout compacto, com contagem explícita.


## V846 — cabeçalho da seleção no Catálogo
- A coluna do checkbox permanece estreita; não ampliar sua largura apenas para acomodar texto.
- O cabeçalho da coluna de comparação usa somente o ícone ⚖️, centralizado sobre os checkboxes.
- A explicação da função permanece disponível por `title` e `aria-label`: "Selecione de 2 a 6 fundos para comparar".
- Preservar a classe `.v841-compare-label`, pois a V841 a utiliza para reconhecer que o cabeçalho já foi instalado.
- Não reintroduzir texto longo nessa coluna nem alterar a geometria das colunas FUNDO, CONV/PAG, rentabilidades e DOCUMENTOS.

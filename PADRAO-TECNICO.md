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

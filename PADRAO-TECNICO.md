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

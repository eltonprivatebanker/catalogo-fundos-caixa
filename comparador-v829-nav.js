/* ============================================================
   V829 — Navegação direta para o workspace do comparador
   - Ao clicar no item lateral "Comparador", torna o workspace
     visível antes da navegação por âncora.
   - Reposiciona a tela com behavior:auto para não reintroduzir
     o tremor observado no Microsoft Edge.
   ============================================================ */
(() => {
  'use strict';

  const WORKSPACE_ID = 'comparWorkspaceV723';
  const HASH = `#${WORKSPACE_ID}`;

  function getWorkspace() {
    return document.getElementById(WORKSPACE_ID);
  }

  function revealWorkspace(workspace) {
    if (!workspace) return false;
    if (workspace.hidden) workspace.hidden = false;
    workspace.removeAttribute('hidden');
    return true;
  }

  function scrollWorkspaceIntoView(workspace) {
    if (!workspace) return;

    workspace.scrollIntoView({
      behavior: 'auto',
      block: 'start',
      inline: 'nearest'
    });
  }

  function revealAndPosition() {
    const workspace = getWorkspace();
    if (!revealWorkspace(workspace)) return;

    /*
      Duas animações de frame dão tempo para o layout recalcular
      depois da remoção do atributo hidden. O ajuste final só roda
      se a URL ainda estiver apontando para o comparador.
    */
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        scrollWorkspaceIntoView(workspace);

        window.setTimeout(() => {
          if (location.hash === HASH) {
            const top = workspace.getBoundingClientRect().top;
            if (Math.abs(top) > 28) {
              scrollWorkspaceIntoView(workspace);
            }
          }
        }, 80);
      });
    });
  }

  /*
    Captura o clique antes da navegação nativa por hash. Assim o
    elemento deixa de estar hidden antes de o navegador procurar
    o destino da âncora. Não bloqueia os handlers já existentes.
  */
  document.addEventListener('click', (event) => {
    const link = event.target.closest(
      'a[data-compar-workspace="1"], a[data-anchor-target="comparWorkspaceV723"], a[href="#comparWorkspaceV723"]'
    );

    if (!link) return;

    const workspace = getWorkspace();
    revealWorkspace(workspace);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => scrollWorkspaceIntoView(workspace));
    });
  }, true);

  window.addEventListener('hashchange', () => {
    if (location.hash === HASH) revealAndPosition();
  });

  /* Também corrige acesso/reload direto com #comparWorkspaceV723. */
  if (location.hash === HASH) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', revealAndPosition, { once: true });
    } else {
      revealAndPosition();
    }
  }
})();

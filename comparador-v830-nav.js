/* ============================================================
   V830 — Comparador permanente no fluxo da página
   - O workspace deixa de depender do clique no menu para aparecer.
   - O menu lateral "Comparador" funciona apenas como navegação.
   - Mantém behavior:auto para preservar a correção do Edge (V828).
   - Se algum código legado tentar recolocar hidden, o workspace é
     restaurado como seção visível.
   ============================================================ */
(() => {
  'use strict';

  const WORKSPACE_ID = 'comparWorkspaceV723';
  const HASH = `#${WORKSPACE_ID}`;

  function getWorkspace() {
    return document.getElementById(WORKSPACE_ID);
  }

  function keepWorkspaceVisible() {
    const workspace = getWorkspace();
    if (!workspace) return null;

    if (workspace.hidden) workspace.hidden = false;
    if (workspace.hasAttribute('hidden')) workspace.removeAttribute('hidden');

    return workspace;
  }

  function goToWorkspace({ updateHash = false } = {}) {
    const workspace = keepWorkspaceVisible();
    if (!workspace) return;

    if (updateHash && location.hash !== HASH) {
      history.replaceState(null, '', HASH);
    }

    requestAnimationFrame(() => {
      workspace.scrollIntoView({
        behavior: 'auto',
        block: 'start',
        inline: 'nearest'
      });
    });
  }

  function installVisibilityGuard() {
    const workspace = keepWorkspaceVisible();
    if (!workspace || !('MutationObserver' in window)) return;

    const observer = new MutationObserver(() => {
      if (workspace.hidden || workspace.hasAttribute('hidden')) {
        workspace.hidden = false;
        workspace.removeAttribute('hidden');
      }
    });

    observer.observe(workspace, {
      attributes: true,
      attributeFilter: ['hidden']
    });
  }

  /*
    O item lateral agora é só um atalho de navegação. Interceptamos
    o hash para garantir posicionamento imediato e sem smooth scroll.
  */
  document.addEventListener('click', (event) => {
    const link = event.target.closest(
      'a[data-compar-workspace="1"], a[data-anchor-target="comparWorkspaceV723"], a[href="#comparWorkspaceV723"]'
    );

    if (!link) return;

    event.preventDefault();
    if (location.hash !== HASH) history.pushState(null, '', HASH);
    goToWorkspace();
  }, true);

  window.addEventListener('hashchange', () => {
    if (location.hash === HASH) goToWorkspace();
  });

  function init() {
    keepWorkspaceVisible();
    installVisibilityGuard();

    if (location.hash === HASH) {
      goToWorkspace();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }

  window.addEventListener('pageshow', keepWorkspaceVisible);
})();

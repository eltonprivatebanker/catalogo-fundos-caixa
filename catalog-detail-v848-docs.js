/* ============================================================
   V848 — DOCUMENTOS OFICIAIS · HIERARQUIA SEM REDUNDÂNCIA
   Camada progressiva sobre a V845.
   Não altera URLs, quantidade de documentos ou lógica do Catálogo.
   ============================================================ */
(() => {
  'use strict';

  if (window.__CATALOG_DETAIL_V848_DOCS__) return;
  window.__CATALOG_DETAIL_V848_DOCS__ = true;

  const desktop = () => window.matchMedia?.('(min-width:769px)').matches;
  const norm = value => String(value || '').replace(/\s+/g, ' ').trim();
  const upper = value => norm(value).toLocaleUpperCase('pt-BR');

  function leafElements(root){
    return [...root.querySelectorAll('span,strong,small,div,p,h2,h3,h4,h5')]
      .filter(el => !el.children.length && norm(el.textContent));
  }

  function enhance(pop){
    if (!desktop() || !pop || pop.dataset.v848Docs === '1') return;

    const items = [...pop.querySelectorAll('a.v845-doc-item, a')]
      .filter(a => norm(a.textContent));
    if (items.length < 1) return;

    pop.dataset.v848Docs = '1';
    pop.classList.add('v848-doc-popover');

    const leaves = leafElements(pop);
    const title = leaves.find(el =>
      ['DOCUMENTOS DO FUNDO','DOCUMENTOS OFICIAIS'].includes(upper(el.textContent))
    );

    if (title) {
      title.textContent = 'Documentos oficiais';
      title.classList.add('v848-doc-title');
    }

    const subtitle = leaves.find(el =>
      upper(el.textContent) === 'DOCUMENTOS OFICIAIS DISPONÍVEIS'
    );
    subtitle?.classList.add('v848-doc-subtitle');

    // A lista já comunica a quantidade; a contagem visual é redundante.
    pop.querySelectorAll('.v845-doc-count').forEach(el => el.remove());

    items.forEach(link => {
      link.classList.add('v845-doc-item');
      const label = norm(link.textContent);
      if (!label) return;
      link.title = `Abrir ${label} em nova aba`;
      link.setAttribute('aria-label', `Abrir ${label} em nova aba`);
    });
  }

  function scan(){
    if (!desktop()) return;
    document.querySelectorAll('.v845-doc-popover').forEach(enhance);
  }

  let queued = false;
  function schedule(){
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      scan();
    });
  }

  const observer = new MutationObserver(schedule);
  observer.observe(document.documentElement, {childList:true, subtree:true});

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scan, {once:true});
  } else {
    scan();
  }

  window.addEventListener('pageshow', schedule);
})();

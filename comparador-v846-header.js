/* ============================================================
   V846 — CATÁLOGO · CABEÇALHO DE COMPARAÇÃO POR ÍCONE
   ------------------------------------------------------------
   A V841 identifica a coluna do checkbox e cria
   .v841-compare-label. A V846 mantém essa classe — para não
   disputar com o MutationObserver da V841 — e reduz o conteúdo
   do cabeçalho a um único ícone acessível.
   ============================================================ */
(() => {
  'use strict';

  const TABLE_ID = 'mainTable';
  const LABEL_SELECTOR = '#mainTable .v841-compare-label';
  const DESKTOP_QUERY = '(min-width:769px)';
  const TITLE = 'Selecione de 2 a 6 fundos para comparar';

  let queued = false;

  function isDesktop(){
    return window.matchMedia(DESKTOP_QUERY).matches;
  }

  function applyHeader(){
    if(!isDesktop()) return;

    const label = document.querySelector(LABEL_SELECTOR);
    if(!label) return;

    if(label.classList.contains('v846-compare-icon-only') &&
       label.dataset.v846Header === '1'){
      return;
    }

    // Mantém .v841-compare-label para a V841 considerar o header instalado.
    label.textContent = '⚖️';
    label.classList.add('v846-compare-icon-only');
    label.dataset.v846Header = '1';
    label.title = TITLE;
    label.setAttribute('aria-label', TITLE);
  }

  function schedule(){
    if(queued) return;
    queued = true;

    requestAnimationFrame(() => {
      queued = false;
      applyHeader();
    });
  }

  function init(){
    applyHeader();

    const table = document.getElementById(TABLE_ID);
    if(table && 'MutationObserver' in window){
      const observer = new MutationObserver(schedule);
      observer.observe(table, {
        childList:true,
        subtree:true
      });
    }

    window.addEventListener('pageshow', schedule);
    window.addEventListener('resize', schedule, {passive:true});

    // Cobre a renderização assíncrona inicial do catálogo.
    setTimeout(schedule, 250);
    setTimeout(schedule, 900);
    setTimeout(schedule, 1600);
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init, {once:true});
  }else{
    init();
  }
})();

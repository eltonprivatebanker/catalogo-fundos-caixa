/* ============================================================
   V849 — COMPARADOR · CTA FLUTUANTE SOMENTE NO CATÁLOGO
   ------------------------------------------------------------
   Evita duplicidade entre a barra flutuante da V841 e o CTA nativo
   do workspace quando o usuário já chegou ao Comparador.

   Regra aprovada em teste:
   - mantém a barra enquanto o usuário está essencialmente no Catálogo;
   - oculta quando uma parte relevante do Comparador ocupa a viewport;
   - restaura ao voltar para cima;
   - sem rolagem automática e sem alterar V838/V842.
   ============================================================ */
(() => {
  'use strict';

  if (window.__COMPARADOR_V849_BAR_VISIBILITY__) return;
  window.__COMPARADOR_V849_BAR_VISIBILITY__ = true;

  const DESKTOP_QUERY = '(min-width:769px)';
  const WORKSPACE_ID = 'comparWorkspaceV723';
  const ROOT_CLASS = 'v849-comparator-primary';

  let frame = 0;

  function isDesktop(){
    return window.matchMedia(DESKTOP_QUERY).matches;
  }

  function workspace(){
    return document.getElementById(WORKSPACE_ID);
  }

  function comparatorIsPrimary(){
    if (!isDesktop()) return false;

    const target = workspace();
    if (!target) return false;

    const rect = target.getBoundingClientRect();

    /*
      Mesmo critério validado no teste de Console:
      o Comparador é considerado "principal" quando já entrou
      suficientemente na viewport, mas continua efetivamente visível.
    */
    return (
      rect.top < window.innerHeight * 0.72 &&
      rect.bottom > 120
    );
  }

  function update(){
    document.documentElement.classList.toggle(
      ROOT_CLASS,
      comparatorIsPrimary()
    );
  }

  function schedule(){
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      update();
    });
  }

  function init(){
    update();

    window.addEventListener('scroll', schedule, {passive:true});
    window.addEventListener('resize', schedule, {passive:true});
    window.addEventListener('pageshow', schedule);

    if ('MutationObserver' in window) {
      const target = workspace();
      if (target) {
        const observer = new MutationObserver(schedule);
        observer.observe(target, {
          childList:true,
          subtree:true,
          attributes:true,
          attributeFilter:['hidden','class']
        });
        window.__COMPARADOR_V849_OBSERVER__ = observer;
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, {once:true});
  } else {
    init();
  }
})();

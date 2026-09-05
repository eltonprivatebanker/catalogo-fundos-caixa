/* ============================================================
   V844 — COMPARADOR · ORIENTAÇÃO INTUITIVA NOS ESTADOS OCIOSOS
   ------------------------------------------------------------
   Complementa a geometria V843 com conteúdo útil quando a lista
   não tem resultados para mostrar.
   ============================================================ */
(() => {
  'use strict';

  const DESKTOP_QUERY = '(min-width:769px)';
  const WORKSPACE_ID = 'comparWorkspaceV723';
  const LIST_ID = 'comparWorkspaceListV723';
  const COUNT_ID = 'comparWorkspaceAsideCountV758';
  const SEARCH_ID = 'comparWorkspaceSearchV723';
  const CATEGORY_ID = 'comparWorkspaceCategoryV723';
  const RISK_ID = 'comparWorkspaceRiskV723';
  const GUIDANCE_ID = 'v844IdleGuidance';
  const ACTIVE_CLASS = 'v844-guidance-active';

  const byId = id => document.getElementById(id);
  let updateQueued = false;
  let observer = null;

  function isDesktop(){
    return window.matchMedia(DESKTOP_QUERY).matches;
  }

  function selectedCount(){
    const counter = byId(COUNT_ID);
    if(!counter) return 0;

    const raw = String(counter.textContent || '').trim();
    const value = Number.parseInt(raw.split('/')[0], 10);
    return Number.isFinite(value) ? value : 0;
  }

  function discoveryActive(){
    const search = byId(SEARCH_ID);
    const category = byId(CATEGORY_ID);
    const risk = byId(RISK_ID);
    const list = byId(LIST_ID);

    const resultCount = Number.parseInt(list?.dataset?.resultCount || '0', 10) || 0;

    return Boolean(
      search?.value.trim() ||
      category?.value ||
      risk?.value ||
      resultCount > 0
    );
  }

  function createGuidance(){
    const node = document.createElement('div');
    node.id = GUIDANCE_ID;
    node.setAttribute('role', 'status');
    node.innerHTML = `
      <div class="v844-guidance-icon" aria-hidden="true">⚖️</div>
      <strong></strong>
      <p></p>
      <a class="v844-guidance-link" href="#sec-fundos"></a>
    `;

    node.querySelector('.v844-guidance-link')?.addEventListener('click', event => {
      event.preventDefault();
      const catalog = byId('sec-fundos');
      if(!catalog) return;

      if(location.hash !== '#sec-fundos'){
        history.pushState(null, '', '#sec-fundos');
      }

      catalog.scrollIntoView({
        behavior:'auto',
        block:'start',
        inline:'nearest'
      });
    });

    return node;
  }

  function ensureGuidance(list){
    let node = byId(GUIDANCE_ID);
    if(node && node.parentElement === list) return node;

    node?.remove();
    node = createGuidance();
    list.appendChild(node);
    return node;
  }

  function removeGuidance(workspace){
    workspace?.classList.remove(ACTIVE_CLASS);
    byId(GUIDANCE_ID)?.remove();
  }

  function render(){
    const workspace = byId(WORKSPACE_ID);
    const list = byId(LIST_ID);
    if(!workspace || !list) return;

    if(!isDesktop() || discoveryActive()){
      removeGuidance(workspace);
      return;
    }

    const selected = selectedCount();

    /* A partir de 2 fundos, V841/V843 já exibem "Seleção pronta"
       e o botão principal; não duplicamos orientação. */
    if(selected >= 2){
      removeGuidance(workspace);
      return;
    }

    workspace.classList.add(ACTIVE_CLASS);
    const node = ensureGuidance(list);
    const title = node.querySelector('strong');
    const desc = node.querySelector('p');
    const link = node.querySelector('.v844-guidance-link');

    if(selected === 1){
      title.textContent = 'Falta só 1 fundo';
      desc.textContent = 'Escolha mais um fundo no Catálogo ou utilize a busca e os filtros acima.';
      link.textContent = 'Selecionar outro no Catálogo →';
    }else{
      title.textContent = 'Monte sua comparação';
      desc.textContent = 'Escolha fundos no Catálogo ou utilize a busca e os filtros acima.';
      link.textContent = 'Selecionar fundos no Catálogo →';
    }
  }

  function update(){
    if(updateQueued) return;
    updateQueued = true;

    requestAnimationFrame(() => {
      updateQueued = false;
      render();
    });
  }

  function bind(){
    [SEARCH_ID, CATEGORY_ID, RISK_ID]
      .map(byId)
      .filter(Boolean)
      .forEach(el => {
        el.addEventListener('input', update, {passive:true});
        el.addEventListener('change', update, {passive:true});
      });

    if('MutationObserver' in window){
      observer = new MutationObserver(update);

      const counter = byId(COUNT_ID);
      const list = byId(LIST_ID);

      if(counter){
        observer.observe(counter, {
          childList:true,
          subtree:true,
          characterData:true
        });
      }

      if(list){
        observer.observe(list, {
          childList:true,
          attributes:true,
          attributeFilter:['data-result-count']
        });
      }
    }

    window.addEventListener('pageshow', update);
    window.addEventListener('resize', update, {passive:true});
  }

  function init(){
    bind();
    update();
    setTimeout(update, 250);
    setTimeout(update, 900);
    setTimeout(update, 1600);
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init, {once:true});
  }else{
    init();
  }
})();

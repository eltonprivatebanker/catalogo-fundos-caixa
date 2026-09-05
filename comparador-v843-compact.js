/* ============================================================
   V843 — COMPARADOR · ESTADOS OCIOSOS MAIS COMPACTOS
   ------------------------------------------------------------
   Alterna classes de estado no workspace sem tocar em scroll.
   Expande automaticamente durante busca/filtros/resultados.
   ============================================================ */
(() => {
  'use strict';

  const WORKSPACE_ID = 'comparWorkspaceV723';
  const COUNT_ID = 'comparWorkspaceAsideCountV758';
  const LIST_ID = 'comparWorkspaceListV723';
  const SEARCH_ID = 'comparWorkspaceSearchV723';
  const CATEGORY_ID = 'comparWorkspaceCategoryV723';
  const RISK_ID = 'comparWorkspaceRiskV723';

  const STATE_CLASSES = [
    'v843-idle-empty',
    'v843-idle-one',
    'v843-selection-ready'
  ];

  const byId = id => document.getElementById(id);
  let updateQueued = false;

  function selectedCount(){
    const counter = byId(COUNT_ID);
    if(!counter) return 0;

    const raw = String(counter.textContent || '').trim();
    const first = raw.split('/')[0];
    const value = Number.parseInt(first, 10);
    return Number.isFinite(value) ? value : 0;
  }

  function discoveryActive(){
    const search = byId(SEARCH_ID);
    const category = byId(CATEGORY_ID);
    const risk = byId(RISK_ID);
    const list = byId(LIST_ID);

    const searchActive = Boolean(search && search.value.trim());
    const categoryActive = Boolean(category && category.value);
    const riskActive = Boolean(risk && risk.value);
    const resultCount = Number.parseInt(list?.dataset?.resultCount || '0', 10) || 0;

    return searchActive || categoryActive || riskActive || resultCount > 0;
  }

  function clearState(workspace){
    STATE_CLASSES.forEach(cls => workspace.classList.remove(cls));
  }

  function applyState(){
    const workspace = byId(WORKSPACE_ID);
    if(!workspace) return;

    clearState(workspace);

    /* Durante descoberta, preserva integralmente a geometria normal. */
    if(discoveryActive()) return;

    const selected = selectedCount();

    if(selected <= 0){
      workspace.classList.add('v843-idle-empty');
    }else if(selected === 1){
      workspace.classList.add('v843-idle-one');
    }else{
      workspace.classList.add('v843-selection-ready');
    }
  }

  function update(){
    if(updateQueued) return;
    updateQueued = true;

    requestAnimationFrame(() => {
      updateQueued = false;
      applyState();
    });
  }

  function bindEvents(){
    [SEARCH_ID, CATEGORY_ID, RISK_ID].forEach(id => {
      const el = byId(id);
      if(!el) return;
      el.addEventListener('input', update, {passive:true});
      el.addEventListener('change', update, {passive:true});
    });

    const workspace = byId(WORKSPACE_ID);
    const counter = byId(COUNT_ID);
    const list = byId(LIST_ID);

    if('MutationObserver' in window){
      const observer = new MutationObserver(update);

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
          subtree:true,
          attributes:true,
          attributeFilter:['data-result-count', 'class']
        });
      }

      if(workspace){
        observer.observe(workspace, {
          childList:true,
          subtree:true
        });
      }
    }

    window.addEventListener('pageshow', update);
  }

  function init(){
    bindEvents();
    update();

    /* cobre preenchimentos assíncronos sem interferir na rolagem */
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


/* =========================================================
   ELTAUM_DUAL_LAYOUT_DASHBOARD_20260611_v156
   Mantém o Clássico e adiciona opção Dashboard no desktop.
   ========================================================= */
(function(){
  'use strict';

  var BUILD = 'ELTAUM_DUAL_LAYOUT_DASHBOARD_20260611_v156';
  var STORAGE_KEY = 'eltaumLayoutModeV156';

  function qs(sel, root){ return (root || document).querySelector(sel); }
  function qsa(sel, root){ return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function isDesktop(){
    return window.matchMedia && window.matchMedia('(min-width: 1024px)').matches;
  }

  function setMode(mode){
    var finalMode = mode === 'dashboard' ? 'dashboard' : 'classico';
    document.body.dataset.layoutModeV156 = finalMode;
    try{ localStorage.setItem(STORAGE_KEY, finalMode); }catch(e){}

    qsa('.layout-mode-btn-v156').forEach(function(btn){
      btn.setAttribute('aria-pressed', btn.dataset.mode === finalMode ? 'true' : 'false');
    });

    if(finalMode === 'dashboard') arrangeDashboardShell();
    else restoreClassicShell();

    document.dispatchEvent(new CustomEvent('eltaum:layout-mode-v156', { detail:{ mode: finalMode }}));
  }

  function getInitialMode(){
    try{
      var saved = localStorage.getItem(STORAGE_KEY);
      if(saved === 'dashboard' || saved === 'classico') return saved;
    }catch(e){}
    return 'classico';
  }

  function ensureSwitch(){
    if(qs('#layoutModeSwitchV156')) return;

    var header = qs('.site-header-clean') || qs('header');
    if(!header) return;

    var wrap = document.createElement('div');
    wrap.className = 'layout-mode-switch-v156';
    wrap.id = 'layoutModeSwitchV156';
    wrap.setAttribute('aria-label', 'Escolher ambiente de navegação');
    wrap.innerHTML = [
      '<button type="button" class="layout-mode-btn-v156" data-mode="classico" aria-pressed="true">Clássico</button>',
      '<button type="button" class="layout-mode-btn-v156" data-mode="dashboard" aria-pressed="false">Dashboard</button>'
    ].join('');

    header.appendChild(wrap);

    wrap.addEventListener('click', function(ev){
      var btn = ev.target && ev.target.closest ? ev.target.closest('.layout-mode-btn-v156') : null;
      if(!btn) return;
      setMode(btn.dataset.mode || 'classico');
    });
  }

  function ensureDashboardShell(){
    if(qs('.dashboard-grid-v156')) return;

    var fundos = qs('#sec-fundos');
    var rankings = qs('#rankingsSection');
    if(!fundos || !rankings) return;

    var grid = document.createElement('div');
    grid.className = 'dashboard-grid-v156';
    grid.id = 'dashboardGridV156';

    var main = document.createElement('div');
    main.className = 'dashboard-main-v156';

    var side = document.createElement('aside');
    side.className = 'dashboard-side-v156';
    side.setAttribute('aria-label', 'Painel lateral do dashboard');

    fundos.parentNode.insertBefore(grid, fundos);
    grid.appendChild(main);
    grid.appendChild(side);

    main.appendChild(fundos);
    side.appendChild(rankings);

    var mercado = qs('#sec-mercado');
    if(mercado) side.appendChild(mercado);
  }

  function arrangeDashboardShell(){
    if(!isDesktop()) return;
    ensureDashboardShell();
  }

  function restoreClassicShell(){
    var grid = qs('#dashboardGridV156');
    if(!grid) return;

    var page = qs('.page') || document.body;
    var main = qs('.dashboard-main-v156', grid);
    var side = qs('.dashboard-side-v156', grid);

    var fundos = qs('#sec-fundos', main);
    var rankings = qs('#rankingsSection', side);
    var mercado = qs('#sec-mercado', side);

    if(fundos) page.insertBefore(fundos, grid);
    if(rankings) page.insertBefore(rankings, grid.nextSibling);
    if(mercado) page.insertBefore(mercado, rankings ? rankings.nextSibling : grid.nextSibling);

    grid.remove();
  }

  function bindSearchFocus(){
    document.addEventListener('click', function(ev){
      var searchAnchor = ev.target && ev.target.closest ? ev.target.closest('[data-search-focus="1"]') : null;
      if(!searchAnchor) return;
      setTimeout(function(){
        var input = qs('#searchInput');
        if(input){
          try{ input.focus({preventScroll:true}); }catch(e){ input.focus(); }
        }
      }, 180);
    }, true);
  }

  function init(){
    try{
      var meta = qs('meta[name="app-build"]');
      if(meta) meta.content = BUILD;
    }catch(e){}

    ensureSwitch();
    bindSearchFocus();

    var mode = getInitialMode();
    setMode(mode);

    window.addEventListener('resize', function(){
      if(!isDesktop()){
        restoreClassicShell();
        return;
      }
      if(document.body.dataset.layoutModeV156 === 'dashboard'){
        arrangeDashboardShell();
      }
    }, { passive:true });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init, { once:true });
  }else{
    init();
  }

  window.__ELTAUM_DUAL_LAYOUT_DASHBOARD_V156__ = {
    setMode:setMode,
    arrangeDashboardShell:arrangeDashboardShell,
    restoreClassicShell:restoreClassicShell
  };
})();

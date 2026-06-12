/* =========================================================
   ELTAUM_DASHBOARD_SAFE_20260612_v159
   Sem MutationObserver. Sem interval infinito. Sem loop.
   ========================================================= */
(function(){
  'use strict';
  const BUILD = 'ELTAUM_DASHBOARD_SAFE_20260612_v159';
  const KEY = 'eltaumLayoutModeV159';
  let arranged = false;
  let restored = false;

  const $ = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));
  const desktop = () => window.matchMedia && window.matchMedia('(min-width:1024px)').matches;

  function safe(fn){ try { return fn(); } catch(e){ console.warn('[Dashboard v159]', e); return null; } }

  function ensureControls(){
    const header = $('header.site-header-clean') || $('header');
    if(!header || $('#layoutModeSwitchV159')) return;

    const search = document.createElement('div');
    search.className = 'dashboard-top-search-v159';
    search.innerHTML = '<input type="search" placeholder="Buscar fundo, benchmark, categoria..." aria-label="Busca rápida do dashboard">';

    const sw = document.createElement('div');
    sw.className = 'layout-mode-switch-v159';
    sw.id = 'layoutModeSwitchV159';
    sw.innerHTML = '<button type="button" class="layout-mode-btn-v159" data-mode="classico" aria-pressed="true">Clássico</button><button type="button" class="layout-mode-btn-v159" data-mode="dashboard" aria-pressed="false">Dashboard</button>';

    header.appendChild(search);
    header.appendChild(sw);

    const topInput = $('input', search);
    const mainInput = $('#searchInput');
    if(topInput && mainInput){
      topInput.addEventListener('input', function(){
        mainInput.value = topInput.value;
        mainInput.dispatchEvent(new Event('input', {bubbles:true}));
      });
    }

    sw.addEventListener('click', function(ev){
      const btn = ev.target.closest('.layout-mode-btn-v159');
      if(!btn) return;
      setMode(btn.dataset.mode || 'classico');
    });
  }

  function setPressed(mode){
    $$('.layout-mode-btn-v159').forEach(btn => btn.setAttribute('aria-pressed', btn.dataset.mode === mode ? 'true' : 'false'));
  }

  function setMode(mode){
    const finalMode = mode === 'dashboard' ? 'dashboard' : 'classico';
    document.body.dataset.layoutModeV159 = finalMode;
    setPressed(finalMode);
    safe(() => localStorage.setItem(KEY, finalMode));
    if(finalMode === 'dashboard') arrangeOnce();
    else restoreClassic();
  }

  function getInitialMode(){
    const saved = safe(() => localStorage.getItem(KEY));
    if(saved === 'dashboard' || saved === 'classico') return saved;
    // Começa clássico para evitar travamento em cache. O usuário aciona Dashboard quando quiser.
    return 'classico';
  }

  function createShell(){
    if($('.dashboard-shell-v159')) return $('.dashboard-shell-v159');
    const secFundos = $('#sec-fundos');
    const rankings = $('#rankingsSection');
    if(!secFundos || !rankings) return null;

    const shell = document.createElement('div');
    shell.className = 'dashboard-shell-v159';
    shell.id = 'dashboardShellV159';
    shell.dataset.createdBy = BUILD;

    const main = document.createElement('main');
    main.className = 'dashboard-main-v159';
    const side = document.createElement('aside');
    side.className = 'dashboard-side-v159';
    side.setAttribute('aria-label','Painel lateral do dashboard');

    secFundos.parentNode.insertBefore(shell, secFundos);
    shell.appendChild(main);
    shell.appendChild(side);
    main.appendChild(secFundos);
    side.appendChild(rankings);
    addMiniCards(side);
    return shell;
  }

  function addMiniCards(side){
    if($('#dashboardMiniMercadoV159')) return;
    const card = document.createElement('section');
    card.className = 'dashboard-mini-card-v159';
    card.id = 'dashboardMiniMercadoV159';
    card.innerHTML = '<h3>📊 Mercado hoje</h3><p>Resumo rápido para contextualizar a análise dos fundos.</p><div class="dashboard-mini-grid-v159"><div class="dashboard-mini-metric-v159"><span>CDI</span><strong id="dashMiniCdiV159">—</strong></div><div class="dashboard-mini-metric-v159"><span>Selic</span><strong id="dashMiniSelicV159">—</strong></div><div class="dashboard-mini-metric-v159"><span>Dólar</span><strong id="dashMiniDolarV159">—</strong></div><div class="dashboard-mini-metric-v159"><span>IPCA</span><strong id="dashMiniIpcaV159">—</strong></div></div>';
    side.appendChild(card);
    setTimeout(syncMiniCards, 600);
    setTimeout(syncMiniCards, 1800);
  }

  function txt(sel){ const el=$(sel); return el ? (el.textContent||'').trim() : '—'; }
  function syncMiniCards(){
    safe(() => {
      const cdi = txt('#mc-cdi') || txt('#closedMiniCdi');
      const selic = txt('#mc-selic');
      const dolar = txt('#dolar-cur-cot') || txt('#closedMiniDolar');
      const ipca = txt('#closedMiniIpca') || txt('#ipca-mes-ant');
      const a = $('#dashMiniCdiV159'), b=$('#dashMiniSelicV159'), c=$('#dashMiniDolarV159'), d=$('#dashMiniIpcaV159');
      if(a) a.textContent = cdi || '—';
      if(b) b.textContent = selic || '—';
      if(c) c.textContent = dolar || '—';
      if(d) d.textContent = ipca || '—';
    });
  }

  function arrangeOnce(){
    if(!desktop()) return;
    if(arranged) return;
    const shell = createShell();
    if(!shell) return;
    arranged = true;
    restored = false;
    syncMiniCards();
    document.documentElement.classList.add('dashboard-safe-v159');
    document.body.classList.add('dashboard-safe-active-v159');
  }

  function restoreClassic(){
    if(restored) return;
    const shell = $('.dashboard-shell-v159');
    if(!shell){ arranged=false; restored=true; return; }
    const page = $('.page') || document.body;
    const secFundos = $('#sec-fundos');
    const rankings = $('#rankingsSection');
    const mini = $('#dashboardMiniMercadoV159');
    if(secFundos) page.insertBefore(secFundos, shell);
    if(rankings) page.insertBefore(rankings, shell.nextSibling);
    if(mini) mini.remove();
    shell.remove();
    arranged = false;
    restored = true;
    document.body.classList.remove('dashboard-safe-active-v159');
  }

  function init(){
    safe(() => { const meta=$('meta[name="app-build"]'); if(meta) meta.content = BUILD; });
    ensureControls();
    setMode(getInitialMode());
    // Se o usuário já estava em Dashboard, reaplica uma vez depois do app principal renderizar.
    if(document.body.dataset.layoutModeV159 === 'dashboard') setTimeout(arrangeOnce, 1200);
    window.addEventListener('resize', function(){
      if(!desktop() && document.body.dataset.layoutModeV159 === 'dashboard') restoreClassic();
      else if(desktop() && document.body.dataset.layoutModeV159 === 'dashboard') arrangeOnce();
    }, {passive:true});
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true});
  else init();

  window.ELTAUM_DASHBOARD_V159 = { setMode, arrangeOnce, restoreClassic, syncMiniCards };
})();

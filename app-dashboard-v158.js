/* ELTAUM_DASHBOARD_REFINO_20260612_v158 */
(function(){
  'use strict';
  const STORAGE_KEY='eltaumLayoutModeV158';
  const DESKTOP='(min-width:1024px)';
  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
  const isDesktop=()=>window.matchMedia && window.matchMedia(DESKTOP).matches;

  function savedMode(){try{return localStorage.getItem(STORAGE_KEY)||localStorage.getItem('eltaumLayoutModeV157')||'classico'}catch(e){return 'classico'}}
  function saveMode(m){try{localStorage.setItem(STORAGE_KEY,m);localStorage.setItem('eltaumLayoutModeV157',m)}catch(e){}}

  function ensureSwitch(){
    const header=$('.site-header-clean')||$('header');
    if(!header) return;
    $$('#layoutModeSwitchV157,#layoutModeSwitchV158').forEach((el,i)=>{ if(i>0) el.remove(); });
    let wrap=$('#layoutModeSwitchV158') || $('#layoutModeSwitchV157');
    if(!wrap){
      wrap=document.createElement('div');
      header.appendChild(wrap);
    }
    wrap.className='layout-mode-switch-v158';
    wrap.id='layoutModeSwitchV158';
    wrap.setAttribute('aria-label','Modo de visualização');
    wrap.innerHTML='<button type="button" class="layout-mode-btn-v158" data-mode="classico" aria-pressed="true">Clássico</button><button type="button" class="layout-mode-btn-v158" data-mode="dashboard" aria-pressed="false">Dashboard</button>';
    wrap.onclick=function(ev){const b=ev.target.closest('.layout-mode-btn-v158'); if(!b) return; setMode(b.dataset.mode||'classico');};
  }

  function syncHeaderDate(){
    const out=$('#dashboardTopDateV158'); if(!out) return;
    const lu=$('#lastUpdate'); const txt=lu ? lu.textContent.trim().replace(/^[^0-9]*/,'') : '';
    out.innerHTML=(txt||'Atualizando...')+'<small>Dados atualizados</small>';
  }

  function ensureHeaderTools(){
    const header=$('.site-header-clean')||$('header'); if(!header) return;
    if(!$('#dashboardTopSearchV158')){
      const search=document.createElement('div');
      search.className='dashboard-top-search-v158';
      search.id='dashboardTopSearchV158';
      search.innerHTML='<input type="search" placeholder="Buscar fundo, benchmark, categoria..." aria-label="Buscar fundo no dashboard">';
      const brand=$('.brand',header);
      if(brand && brand.nextSibling) header.insertBefore(search,brand.nextSibling); else header.appendChild(search);
      const input=$('input',search);
      input.addEventListener('input',()=>{
        const target=$('#searchInput'); if(!target) return;
        target.value=input.value;
        target.dispatchEvent(new Event('input',{bubbles:true}));
      });
      input.addEventListener('keydown',ev=>{
        if(ev.key==='Enter'){
          const sec=$('#sec-fundos'); if(sec) sec.scrollIntoView({behavior:'smooth',block:'start'});
          const target=$('#searchInput'); if(target) target.focus();
        }
      });
    }
    if(!$('#dashboardTopDateV158')){
      const d=document.createElement('div');
      d.className='dashboard-top-date-v158';
      d.id='dashboardTopDateV158';
      header.appendChild(d);
    }
    syncHeaderDate();
  }

  function ensureWorkspace(){
    if($('#dashboardShellV158')) return;
    const fundos=$('#sec-fundos');
    const rankings=$('#rankingsSection');
    if(!fundos || !rankings) return;

    const shell=document.createElement('div');
    shell.className='dashboard-shell-v158';
    shell.id='dashboardShellV158';
    const main=document.createElement('main');
    main.className='dashboard-main-v158';
    main.id='dashboardMainV158';
    const side=document.createElement('aside');
    side.className='dashboard-side-v158';
    side.id='dashboardSideV158';
    side.setAttribute('aria-label','Painel lateral do dashboard');

    fundos.parentNode.insertBefore(shell,fundos);
    shell.appendChild(main);
    shell.appendChild(side);
    main.appendChild(fundos);
    side.appendChild(rankings);
    ensureMarketMini(side);
  }

  function restoreWorkspace(){
    const shell=$('#dashboardShellV158') || $('#dashboardWorkspaceV157');
    if(!shell) return;
    const page=$('.page')||document.body;
    const fundos=$('#sec-fundos');
    const rankings=$('#rankingsSection');
    const mini=$('#dashboardMarketMiniV158');
    if(fundos) page.insertBefore(fundos,shell);
    if(rankings) page.insertBefore(rankings,shell.nextSibling);
    if(mini) mini.remove();
    shell.remove();
  }

  function ensureMarketMini(side){
    if($('#dashboardMarketMiniV158')) return;
    const box=document.createElement('section');
    box.id='dashboardMarketMiniV158';
    box.className='dashboard-market-mini-v158';
    box.innerHTML=`
      <div class="dash-mini-head-v158"><h3>📊 Mercado hoje</h3><a href="#sec-mercado">Ver completo →</a></div>
      <div class="dash-market-grid-v158">
        <a href="#sec-mercado" class="dash-market-card-v158"><span>CDI</span><strong id="dashMiniCdiV158">—</strong><small>a.a.</small></a>
        <a href="#sec-mercado" class="dash-market-card-v158"><span>Selic</span><strong id="dashMiniSelicV158">—</strong><small>a.a.</small></a>
        <a href="#sec-mercado" class="dash-market-card-v158"><span>IPCA</span><strong id="dashMiniIpcaV158">—</strong><small>mês</small></a>
        <a href="#sec-dolar" class="dash-market-card-v158"><span>Dólar</span><strong id="dashMiniDolarV158">—</strong><small>PTAX</small></a>
      </div>
      <div class="dash-mini-links-v158">
        <a href="#sec-dolar">Dólar PTAX</a>
        <a href="#sec-focus">Boletim Focus</a>
        <a href="#sec-graficos">Gráficos</a>
      </div>`;
    side.appendChild(box);
    syncMarketMini();
  }

  function pickText(sel){const el=$(sel); return el ? el.textContent.trim() : '—';}
  function syncMarketMini(){
    const pairs=[
      ['#dashMiniCdiV158','#mc-cdi'],
      ['#dashMiniSelicV158','#mc-selic'],
      ['#dashMiniIpcaV158','#closedMiniIpca'],
      ['#dashMiniDolarV158','#mc-dolar,#dolar-cur-cot,#dolar-ant-cot']
    ];
    pairs.forEach(([outSel,inSel])=>{
      const out=$(outSel); if(!out) return;
      const ins=inSel.split(',').map(s=>$(s.trim())).find(Boolean);
      if(ins && ins.textContent.trim()) out.textContent=ins.textContent.trim();
    });
  }

  function compactRanking(){
    const r=$('#rankingsSection'); if(!r) return;
    r.classList.add('dashboard-ranking-compact-v158');
    const title=$('.ranking-title-group h2',r); if(title) title.textContent='🏆 Rankings';
    const sub=$('.ranking-section-subtitle-v136',r); if(sub) sub.textContent='Melhores, piores e alertas da base.';
  }

  function setMode(mode){
    const m=mode==='dashboard'?'dashboard':'classico';
    document.body.dataset.layoutModeV158=m;
    document.body.dataset.layoutModeV157=m;
    saveMode(m);
    $$('.layout-mode-btn-v158').forEach(b=>b.setAttribute('aria-pressed',b.dataset.mode===m?'true':'false'));
    if(m==='dashboard' && isDesktop()){
      ensureHeaderTools();
      ensureWorkspace();
      compactRanking();
      syncHeaderDate();
      syncMarketMini();
    }else{
      restoreWorkspace();
    }
  }

  function init(){
    try{
      document.documentElement.classList.add('dashboard-refino-v158');
      const meta=$('meta[name="app-build"]'); if(meta) meta.content='ELTAUM_DASHBOARD_REFINO_20260612_v158';
    }catch(e){}
    ensureSwitch();
    setMode(savedMode());
    const lu=$('#lastUpdate'); if(lu && 'MutationObserver' in window){new MutationObserver(syncHeaderDate).observe(lu,{childList:true,characterData:true,subtree:true});}
    if('MutationObserver' in window){new MutationObserver(syncMarketMini).observe(document.body,{childList:true,characterData:true,subtree:true});}
    window.addEventListener('resize',()=>{if(!isDesktop()) restoreWorkspace(); else if(document.body.dataset.layoutModeV158==='dashboard') setMode('dashboard');},{passive:true});
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true}); else init();
  window.__ELTAUM_DASHBOARD_REFINO_V158__={setMode, syncMarketMini};
})();

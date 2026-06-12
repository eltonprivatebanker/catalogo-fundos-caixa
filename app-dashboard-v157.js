/* ELTAUM_DASHBOARD_DARK_20260612_v157 */
(function(){
  'use strict';
  const STORAGE_KEY='eltaumLayoutModeV157';
  const DESKTOP='(min-width:1024px)';
  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
  const isDesktop=()=>window.matchMedia && window.matchMedia(DESKTOP).matches;

  function getSaved(){try{return localStorage.getItem(STORAGE_KEY)||'classico'}catch(e){return 'classico'}}
  function save(mode){try{localStorage.setItem(STORAGE_KEY,mode)}catch(e){}}

  function ensureSwitch(){
    const header=$('.site-header-clean')||$('header'); if(!header || $('#layoutModeSwitchV157')) return;
    const wrap=document.createElement('div');
    wrap.className='layout-mode-switch-v157'; wrap.id='layoutModeSwitchV157'; wrap.setAttribute('aria-label','Modo de visualização');
    wrap.innerHTML='<button type="button" class="layout-mode-btn-v157" data-mode="classico" aria-pressed="true">Clássico</button><button type="button" class="layout-mode-btn-v157" data-mode="dashboard" aria-pressed="false">Dashboard</button>';
    header.appendChild(wrap);
    wrap.addEventListener('click',ev=>{const b=ev.target.closest('.layout-mode-btn-v157'); if(!b) return; setMode(b.dataset.mode||'classico');});
  }

  function ensureTopTools(){
    const header=$('.site-header-clean')||$('header'); if(!header) return;
    if(!$('#dashboardTopSearchV157')){
      const search=document.createElement('div'); search.className='dashboard-top-search-v157'; search.id='dashboardTopSearchV157';
      search.innerHTML='<input type="search" placeholder="Buscar fundo, benchmark, categoria..." aria-label="Buscar fundo no dashboard">';
      const brand=$('.brand',header); if(brand && brand.nextSibling) header.insertBefore(search,brand.nextSibling); else header.appendChild(search);
      const input=$('input',search); input.addEventListener('input',()=>{const target=$('#searchInput'); if(!target) return; target.value=input.value; target.dispatchEvent(new Event('input',{bubbles:true}));});
      input.addEventListener('keydown',e=>{if(e.key==='Enter'){const sec=$('#sec-fundos'); if(sec) sec.scrollIntoView({behavior:'smooth',block:'start'}); const target=$('#searchInput'); if(target) target.focus();}});
    }
    if(!$('#dashboardTopDateV157')){
      const d=document.createElement('div'); d.className='dashboard-top-date-v157'; d.id='dashboardTopDateV157'; d.innerHTML='Dados atualizados<small>sincronizando...</small>'; header.appendChild(d);
    }
    syncDate();
  }

  function syncDate(){
    const out=$('#dashboardTopDateV157'); if(!out) return;
    const lu=$('#lastUpdate'); const txt=lu ? lu.textContent.trim() : '';
    if(txt){out.innerHTML=txt.replace(/^[^0-9]*/,'')+'<small>Dados atualizados</small>';}
  }

  function ensureWorkspace(){
    if($('#dashboardWorkspaceV157')) return;
    const kpi=$('#sec-kpi'); const fundos=$('#sec-fundos'); const rankings=$('#rankingsSection');
    if(!fundos || !rankings) return;
    const ws=document.createElement('div'); ws.className='dashboard-workspace-v157'; ws.id='dashboardWorkspaceV157';
    const left=document.createElement('main'); left.className='dashboard-left-v157'; left.id='dashboardLeftV157';
    const right=document.createElement('aside'); right.className='dashboard-right-v157'; right.id='dashboardRightV157'; right.setAttribute('aria-label','Painel lateral do dashboard');
    fundos.parentNode.insertBefore(ws,fundos);
    ws.appendChild(left); ws.appendChild(right); left.appendChild(fundos); right.appendChild(rankings);
    ensureSideWidgets(right);
  }

  function restoreWorkspace(){
    const ws=$('#dashboardWorkspaceV157'); if(!ws) return;
    const page=$('.page')||document.body;
    const fundos=$('#sec-fundos'); const rankings=$('#rankingsSection');
    if(fundos) page.insertBefore(fundos,ws);
    if(rankings) page.insertBefore(rankings,ws.nextSibling);
    ws.remove();
  }

  function ensureSideWidgets(right){
    if($('#dashboardWidgetsV157')) return;
    const box=document.createElement('section'); box.className='dashboard-widget-v157'; box.id='dashboardWidgetsV157';
    box.innerHTML=`
      <h3>📊 Painel rápido</h3>
      <p>Atalhos para indicadores sem sobrecarregar o catálogo.</p>
      <div class="dashboard-widget-grid-v157">
        <a class="dashboard-mini-v157" href="#sec-mercado"><span>Mercado</span><strong>Indicadores</strong><small>CDI, IPCA, Selic e IBOV</small></a>
        <a class="dashboard-mini-v157" href="#sec-dolar"><span>Dólar</span><strong>PTAX</strong><small>Histórico e fechamento</small></a>
        <a class="dashboard-mini-v157" href="#sec-focus"><span>Focus</span><strong>Expectativas</strong><small>Boletim e projeções</small></a>
        <a class="dashboard-mini-v157" href="#sec-graficos"><span>Gráficos</span><strong>Evolução</strong><small>Leitura histórica</small></a>
      </div>
      <a class="dashboard-panel-link-v157" href="#sec-mercado">Ver painel completo <span>→</span></a>`;
    right.appendChild(box);
  }

  function setMode(mode){
    const m=mode==='dashboard'?'dashboard':'classico';
    document.body.dataset.layoutModeV157=m;
    save(m);
    $$('.layout-mode-btn-v157').forEach(b=>b.setAttribute('aria-pressed',b.dataset.mode===m?'true':'false'));
    if(m==='dashboard' && isDesktop()){ensureTopTools(); ensureWorkspace(); syncDate();}
    if(m==='classico'){restoreWorkspace();}
  }

  function bindSearchAnchor(){
    document.addEventListener('click',ev=>{
      const a=ev.target.closest('[data-search-focus="1"], .dashboard-panel-link-v157, .dashboard-mini-v157'); if(!a) return;
      if(a.matches('[data-search-focus="1"]')) setTimeout(()=>{const s=$('#dashboardTopSearchV157 input')||$('#searchInput'); if(s) s.focus();},120);
    },true);
  }

  function init(){
    try{document.documentElement.classList.add('dashboard-dark-v157'); const meta=$('meta[name="app-build"]'); if(meta) meta.content='ELTAUM_DASHBOARD_DARK_20260612_v157';}catch(e){}
    ensureSwitch(); bindSearchAnchor(); setMode(getSaved());
    const lu=$('#lastUpdate'); if(lu && 'MutationObserver' in window){new MutationObserver(syncDate).observe(lu,{childList:true,characterData:true,subtree:true});}
    window.addEventListener('resize',()=>{const m=document.body.dataset.layoutModeV157; if(m==='dashboard' && isDesktop()){ensureTopTools(); ensureWorkspace();} if(!isDesktop()){restoreWorkspace();}}, {passive:true});
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true}); else init();
  window.__ELTAUM_DASHBOARD_DARK_V157__={setMode};
})();

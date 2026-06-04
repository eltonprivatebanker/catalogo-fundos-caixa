/* ==========================================================
   ELTAUM — FUNIL PF + FILTROS ATIVOS FIXO
   Colar no FINAL do app.js
   Versão: 20260604-funil-pf-final-01
========================================================== */
(function(){
  const BUILD = '20260604-funil-pf-final-01';

  const PRESET_MAP = {
    all: { type: 'all', label: 'Todos' },

    pf: { type: 'perfil', value: 'PF', label: 'Pessoa Física' },

    cdi: { type: 'benchmark', value: 'CDI', label: 'CDI' },
    ipca: { type: 'benchmark', value: 'IPCA', label: 'IPCA' },

    conservador: { type: 'risco', value: 'Conservador', label: 'Conservador' },

    'renda-fixa-simples': { type: 'cat', value: 'RENDA FIXA SIMPLES', label: 'RF Simples' },
    'renda-fixa': { type: 'cat', value: 'RENDA FIXA', label: 'Renda Fixa' },
    'renda-fixa-referenciado': { type: 'cat', value: 'RENDA FIXA REFERENCIADO', label: 'RF Referenciado' },
    'renda-fixa-curto-prazo': { type: 'cat', value: 'RENDA FIXA CURTO PRAZO', label: 'RF Curto Prazo' },
    multimercado: { type: 'cat', value: 'MULTIMERCADO', label: 'Multimercado' },
    cambial: { type: 'cat', value: 'CAMBIAL', label: 'Cambial' },
    acoes: { type: 'cat', value: 'ACOES', label: 'Ações' },
    'fundo-de-indice': { type: 'cat', value: 'FUNDO DE INDICE', label: 'Fundo de Índice' },
    fmp: { type: 'cat', value: 'FUNDOS MUTUOS DE PRIVATIZACAO', label: 'FMP' }
  };

  function ensurePessoaFisicaButton(){
    const allBtn = document.querySelector('.shortcut-preset[data-preset="all"]');
    if(!allBtn) return;

    if(!document.querySelector('.shortcut-preset[data-preset="pf"]')){
      allBtn.insertAdjacentHTML(
        'afterend',
        '<button type="button" class="filter-preset-chip shortcut-preset" data-preset="pf" aria-pressed="false">Pessoa Física</button>'
      );
    }
  }

  function getActiveState(){
    return {
      cat: typeof activeCat !== 'undefined' ? activeCat : '',
      benchmark: typeof activeBenchmark !== 'undefined' ? activeBenchmark : '',
      perfil: typeof activePerfil !== 'undefined' ? activePerfil : '',
      risco: typeof activeRisco !== 'undefined' ? activeRisco : '',
      hideSemDados: typeof hideSemDados !== 'undefined' ? hideSemDados : false
    };
  }

  function hasAnyFilter(){
    const s = getActiveState();
    return !!(s.cat || s.benchmark || s.perfil || s.risco || s.hideSemDados);
  }

  function forceActiveFilterStrip(){
    const strip = document.getElementById('activeFilterStrip');
    if(!strip) return;

    strip.hidden = false;
    strip.style.display = 'flex';
    strip.style.visibility = 'visible';
    strip.style.opacity = '1';

    if(!hasAnyFilter()){
      strip.innerHTML = `
        <span class="active-filter-label">Filtros ativos</span>
        <span class="active-filter-empty">Nenhum filtro aplicado</span>
      `;
    }
  }

  function updateShortcutButtons(){
    const s = getActiveState();

    document.querySelectorAll('.shortcut-preset[data-preset], .filter-preset-chip[data-preset]').forEach(btn => {
      const p = btn.dataset.preset;
      let on = false;

      if(p === 'all') on = !hasAnyFilter();

      if(p === 'pf') on = s.perfil === 'PF';

      if(p === 'cdi') on = s.benchmark === 'CDI';
      if(p === 'ipca') on = s.benchmark === 'IPCA';

      if(p === 'conservador') on = s.risco === 'Conservador';

      if(p === 'renda-fixa-simples') on = s.cat === 'RENDA FIXA SIMPLES';
      if(p === 'renda-fixa') on = s.cat === 'RENDA FIXA';
      if(p === 'renda-fixa-referenciado') on = s.cat === 'RENDA FIXA REFERENCIADO';
      if(p === 'renda-fixa-curto-prazo') on = s.cat === 'RENDA FIXA CURTO PRAZO';
      if(p === 'multimercado') on = s.cat === 'MULTIMERCADO';
      if(p === 'cambial') on = s.cat === 'CAMBIAL';
      if(p === 'acoes') on = s.cat === 'ACOES';
      if(p === 'fundo-de-indice') on = s.cat === 'FUNDO DE INDICE';
      if(p === 'fmp') on = s.cat === 'FUNDOS MUTUOS DE PRIVATIZACAO';

      btn.classList.toggle('active', on);
      btn.setAttribute('aria-pressed', String(on));
    });
  }

  function aplicarFunilPreset(preset){
    const cfg = PRESET_MAP[preset];
    if(!cfg) return;

    try{ window.__favListMode = false; }catch(e){}

    if(cfg.type === 'all'){
      try{
        if(typeof clearAllFilters === 'function'){
          clearAllFilters();
        }else{
          activeCat = '';
          activeBenchmark = '';
          activePerfil = '';
          activeRisco = '';
          hideSemDados = false;
          if(typeof applyFilter === 'function') applyFilter();
        }
      }catch(e){}
    }else{
      if(cfg.type === 'perfil') activePerfil = cfg.value;
      if(cfg.type === 'cat') activeCat = cfg.value;
      if(cfg.type === 'benchmark') activeBenchmark = cfg.value;
      if(cfg.type === 'risco') activeRisco = cfg.value;

      try{ if(typeof syncFilterControls === 'function') syncFilterControls(); }catch(e){}
      try{ if(typeof applyFilter === 'function') applyFilter(); }catch(e){}
    }

    setTimeout(() => {
      try{ if(typeof syncFilterControls === 'function') syncFilterControls(); }catch(e){}
      updateShortcutButtons();
      forceActiveFilterStrip();
    }, 20);

    setTimeout(() => {
      updateShortcutButtons();
      forceActiveFilterStrip();
    }, 160);
  }

  // Sobrescreve a função antiga, se ela existir.
  window.applyFilterPreset = aplicarFunilPreset;

  // Captura clique dos atalhos e impede a lógica antiga de limpar o funil.
  if(window.__ELTAUM_FUNIL_PF_CLICK_HANDLER__){
    document.removeEventListener('click', window.__ELTAUM_FUNIL_PF_CLICK_HANDLER__, true);
  }

  window.__ELTAUM_FUNIL_PF_CLICK_HANDLER__ = function(ev){
    const btn = ev.target.closest('.shortcut-preset[data-preset], .filter-preset-chip[data-preset]');
    if(!btn) return;

    const preset = btn.dataset.preset;
    if(!PRESET_MAP[preset]) return;

    ev.preventDefault();
    ev.stopPropagation();
    ev.stopImmediatePropagation();

    aplicarFunilPreset(preset);
  };

  document.addEventListener('click', window.__ELTAUM_FUNIL_PF_CLICK_HANDLER__, true);

  // Mantém a faixa "Filtros ativos" fixa mesmo quando o app redesenha.
  if(window.__ELTAUM_ACTIVE_FILTER_OBSERVER__){
    window.__ELTAUM_ACTIVE_FILTER_OBSERVER__.disconnect();
  }

  const installObserver = () => {
    const strip = document.getElementById('activeFilterStrip');
    if(!strip) return;

    window.__ELTAUM_ACTIVE_FILTER_OBSERVER__ = new MutationObserver(() => {
      setTimeout(() => {
        updateShortcutButtons();
        forceActiveFilterStrip();
      }, 20);
    });

    window.__ELTAUM_ACTIVE_FILTER_OBSERVER__.observe(strip, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true
    });
  };

  ensurePessoaFisicaButton();
  updateShortcutButtons();
  forceActiveFilterStrip();
  installObserver();

  window.__diagnosticarFunilPF = function(){
    const s = getActiveState();
    return {
      build: BUILD,
      activePerfil: s.perfil,
      activeCat: s.cat,
      activeBenchmark: s.benchmark,
      activeRisco: s.risco,
      hideSemDados: s.hideSemDados,
      filtrosAtivos: document.getElementById('activeFilterStrip')?.textContent.trim(),
      atalhosAtivos: [...document.querySelectorAll('.shortcut-preset.active, .filter-preset-chip.active')]
        .map(b => ({ texto: b.textContent.trim(), preset: b.dataset.preset }))
    };
  };

  console.log('[ELTAUM] Funil PF instalado:', BUILD);
})();

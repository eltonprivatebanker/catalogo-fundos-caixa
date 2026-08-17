/* =========================================================
   MOBILE V2 TESTE · Indicadores de mercado
   Somente layout/semântica visual mobile.
   Nenhuma alteração de dados ou desktop.
   ========================================================= */
(function mobileV2Teste(){
  'use strict';

  const BREAKPOINT = '(max-width: 768px)';
  let observer = null;
  let scheduled = false;
  let applying = false;

  const SUMMARY = [
    ['monthlySummaryCdiV445', 'CDI'],
    ['monthlySummaryIpcaV445', 'IPCA'],
    ['monthlySummaryIbovV445', 'Ibovespa'],
    ['monthlySummaryDolarV445', 'Dólar'],
    ['monthlySummarySp500V576', 'S&P 500', true],
    ['monthlySummaryNasdaqV576', 'Nasdaq', true],
    ['monthlySummaryDowV576', 'Dow', true]
  ];

  function isMobile(){
    return !window.matchMedia || window.matchMedia(BREAKPOINT).matches;
  }

  function root(){
    return document.getElementById('monthlyIndicatorsV445');
  }

  function currency(r){
    const active = r?.querySelector('[data-monthly-us-currency-v578].active');
    return (active?.dataset?.monthlyUsCurrencyV578 || r?.dataset?.monthlyUsCurrencyV632 || 'usd').toUpperCase();
  }

  function isTwelveMonths(r){
    return !!r?.querySelector('[data-monthly-indicators-range-v445="12m"].active');
  }

  function ensureHeading(r){
    const summary = r?.querySelector('#monthlyIndicatorsSummaryV445');
    if(!summary) return;

    let heading = r.querySelector('.monthly-summary-heading-mobile-v2');
    if(!heading){
      heading = document.createElement('div');
      heading.className = 'monthly-summary-heading-mobile-v2';
      heading.innerHTML = '<span>Desempenho no ano</span><small>acumulado</small>';
      summary.parentNode.insertBefore(heading, summary);
    }

    const span = heading.querySelector('span');
    if(span){
      const next = isTwelveMonths(r) ? 'Desempenho em 12 meses' : 'Desempenho no ano';
      if(span.textContent !== next) span.textContent = next;
    }
  }

  function normalizeSummaryLabels(r){
    const usdBrl = currency(r);

    SUMMARY.forEach(([id, label, us]) => {
      const value = document.getElementById(id);
      const card = value?.closest('article');
      const caption = card?.querySelector('span');
      if(!caption) return;

      const next = us ? `${label} ${usdBrl}` : label;
      if(caption.textContent.trim() !== next) caption.textContent = next;
    });
  }

  function clarifyUsCurrency(r){
    const label = r?.querySelector('.monthly-us-currency-toggle-v578 > span');
    if(!label) return;

    const desired = 'Bolsas EUA<small>moeda</small>';
    if(label.innerHTML.replace(/\s+/g,'') !== desired.replace(/\s+/g,'')){
      label.innerHTML = desired;
    }

    const group = r.querySelector('.monthly-us-currency-toggle-v578');
    if(group){
      group.setAttribute('aria-label', 'Moeda usada somente para os índices das bolsas dos EUA');
      group.setAttribute('title', 'USD/BRL altera apenas S&P 500, Nasdaq e Dow');
    }
  }

  function normalizeMonths(r){
    r?.querySelectorAll('.monthly-mobile-month-v633,.monthly-mobile-month-v634').forEach(cell => {
      const raw = String(cell.textContent || '').trim();
      if(!raw) return;
      const next = raw.toUpperCase();
      if(cell.textContent.trim() !== next) cell.textContent = next;
    });
  }

  function addMobileClass(){
    if(isMobile()){
      document.documentElement.classList.add('mobile-v2-teste');
    }else{
      document.documentElement.classList.remove('mobile-v2-teste');
    }
  }

  function apply(){
    scheduled = false;
    if(applying) return;

    addMobileClass();
    if(!isMobile()) return;

    const r = root();
    if(!r) return;

    applying = true;
    try{
      r.dataset.mobileV2Teste = '2.0.0';
      clarifyUsCurrency(r);
      ensureHeading(r);
      normalizeSummaryLabels(r);
      normalizeMonths(r);
    }finally{
      applying = false;
    }
  }

  function schedule(){
    if(scheduled) return;
    scheduled = true;
    setTimeout(apply, 0);
  }

  function bind(){
    apply();

    const r = root();
    if(r && window.MutationObserver && !observer){
      observer = new MutationObserver(() => {
        if(!applying) schedule();
      });
      observer.observe(r, {
        subtree:true,
        childList:true,
        characterData:true,
        attributes:true,
        attributeFilter:['class','aria-pressed','data-monthly-us-currency-v632']
      });
    }

    document.addEventListener('click', event => {
      if(event.target?.closest?.('#monthlyIndicatorsV445')){
        setTimeout(apply, 40);
        setTimeout(apply, 160);
      }
    }, true);

    document.addEventListener('elton:market-data-refresh', () => {
      setTimeout(apply, 40);
      setTimeout(apply, 250);
    });

    if(window.matchMedia){
      const mq = window.matchMedia(BREAKPOINT);
      if(mq.addEventListener) mq.addEventListener('change', apply);
    }
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', bind, {once:true});
  }else{
    bind();
  }

  window.addEventListener('load', () => {
    setTimeout(apply, 40);
    setTimeout(apply, 300);
  }, {once:true});

  window.__ELTAUM_MOBILE_V2_TESTE__ = {
    build:'ELTAUM_MOBILE_V2_TESTE_2_0_0',
    apply
  };

  console.info('[Catálogo CAIXA] Mobile V2 teste ativo');
})();

/* V807 — simplifica o painel consolidado de indicadores */
(function marketSimplifyV807(){
  function apply(){
    var panel = document.getElementById('sec-mercado-painel');
    var body = document.getElementById('sec-painel-body');
    var comparisonHead = document.querySelector('#sec-mercado-painel .monthly-comparison-head-v580');
    if(!panel || !body || !comparisonHead) return;

    panel.classList.add('market-panel-flat-v807');
    body.classList.add('market-body-flat-v807');
    body.hidden = false;
    body.removeAttribute('hidden');

    var toolbar = panel.querySelector(':scope > .market-table-toolbar');
    var periodBar = toolbar && toolbar.querySelector('.market-period-tabs');

    if(periodBar && !comparisonHead.querySelector('.monthly-comparison-period-v807')){
      var holder = document.createElement('div');
      holder.className = 'monthly-comparison-period-v807';
      holder.appendChild(periodBar);
      comparisonHead.appendChild(holder);
    }

    if(toolbar){
      toolbar.remove();
    }

    body.hidden = false;
    body.removeAttribute('hidden');
    body.setAttribute('aria-hidden','false');
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', apply, {once:true});
  }else{
    apply();
  }
  window.addEventListener('load', apply, {once:true});

  var marketSection = document.getElementById('sec-mercado-painel');
  if(marketSection && window.MutationObserver){
    new MutationObserver(function(){ apply(); }).observe(marketSection, {
      childList:true,
      subtree:true
    });
  }
})();

/* V808 — refinamento do comparativo de indicadores */
(function marketRefineV808(){
  function apply(){
    var panel = document.getElementById('sec-mercado-painel');
    var body = document.getElementById('sec-painel-body');
    if(!panel || !body) return;

    panel.classList.add('market-panel-flat-v808');
    body.classList.add('market-body-flat-v808');
    body.hidden = false;
    body.removeAttribute('hidden');
    body.setAttribute('aria-hidden','false');

    /* Remove qualquer seletor de período que a V807 tenha movido para o comparativo. */
    panel.querySelectorAll('.monthly-comparison-period-v807,.monthly-comparison-period-v808').forEach(function(el){
      el.remove();
    });

    /*
      Estado inicial mais leve: CDI, IPCA e Ibovespa.
      Preserva a lógica existente dos chips ao simular clique apenas nos que
      estavam ativos a mais. Faz isso uma única vez por sessão da página.
    */
    var chips = document.getElementById('monthlyComparisonChipsV580');
    if(chips && !chips.dataset.v808DefaultApplied){
      chips.dataset.v808DefaultApplied = '1';
      chips.querySelectorAll('[data-monthly-chart-indicator-v580]').forEach(function(btn){
        var key = btn.getAttribute('data-monthly-chart-indicator-v580');
        var keep = key === 'cdi' || key === 'ipca' || key === 'ibov';
        var active = btn.classList.contains('active') || btn.getAttribute('aria-pressed') === 'true';
        if(!keep && active){
          btn.click();
        }
      });
    }
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', apply, {once:true});
  }else{
    apply();
  }
  window.addEventListener('load', apply, {once:true});

  var section = document.getElementById('sec-mercado-painel');
  if(section && window.MutationObserver){
    new MutationObserver(function(){ apply(); }).observe(section, {
      childList:true,
      subtree:true
    });
  }
})();

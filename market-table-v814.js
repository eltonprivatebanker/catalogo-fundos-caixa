/* ============================================================
   V814 — INDICADORES DE MERCADO · TABELA MENSAL ANALÍTICA
   Apenas classificação visual das células já renderizadas.
   Não altera dados, valores, ordenação ou cálculos.
   ============================================================ */
(function marketTableV814(){
  function parsePercent(text){
    var raw = String(text || '').replace(/\s+/g,' ').trim();
    if(!raw || raw === '—' || raw === '-') return null;
    var match = raw.match(/[-+]?\d+(?:[.,]\d+)?/);
    if(!match) return null;
    var n = Number(match[0].replace(',','.'));
    return Number.isFinite(n) ? n : null;
  }

  function heatFor(value){
    var abs = Math.abs(value);
    if(abs >= 10) return '.11';
    if(abs >= 5) return '.085';
    if(abs >= 2) return '.060';
    if(abs >= .5) return '.045';
    return '.030';
  }

  function decorate(){
    var tbody = document.getElementById('monthlyIndicatorsRowsV445');
    if(!tbody) return;

    tbody.querySelectorAll('tr').forEach(function(row){
      Array.from(row.cells || []).slice(1).forEach(function(td){
        td.classList.remove('v814-pos','v814-neg','v814-neutral');
        td.style.removeProperty('--v814-heat');
        var v = parsePercent(td.textContent);
        if(v === null || v === 0){
          td.classList.add('v814-neutral');
          return;
        }
        td.classList.add(v > 0 ? 'v814-pos' : 'v814-neg');
        td.style.setProperty('--v814-heat', heatFor(v));
      });
    });
  }

  function start(){
    decorate();
    var tbody = document.getElementById('monthlyIndicatorsRowsV445');
    if(tbody && window.MutationObserver){
      new MutationObserver(decorate).observe(tbody,{childList:true,subtree:true,characterData:true});
    }
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded',start,{once:true});
  }else{
    start();
  }
  window.addEventListener('load',decorate,{once:true});
})();

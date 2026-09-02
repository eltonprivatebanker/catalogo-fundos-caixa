/* ============================================================
   V816 — INDICADORES · MÊS DA TABELA CONTROLA O GRÁFICO PRINCIPAL
   - não cria um segundo gráfico abaixo da tabela
   - clique no mês troca o Comparativo para retorno daquele mês
   - clique novamente, Limpar ou troca de visão volta ao período
   - respeita moeda EUA e chips de indicadores já selecionados
   ============================================================ */
(function marketMonthFocusV816(){
  var selectedMonthKey = null;
  var selectedRow = null;
  var chartSection = null;
  var canvasWrap = null;
  var overlay = null;
  var badge = null;
  var titleEl = null;
  var subtitleEl = null;
  var kickerEl = null;
  var originalTitle = '';
  var originalSubtitle = '';
  var originalKicker = '';
  var viewReturnButton = null;
  var originalReturnText = '';

  var monthNames = {
    jan:'Janeiro', fev:'Fevereiro', mar:'Março', abr:'Abril', mai:'Maio', jun:'Junho',
    jul:'Julho', ago:'Agosto', set:'Setembro', out:'Outubro', nov:'Novembro', dez:'Dezembro'
  };

  var meta = [
    {key:'cdi', label:'CDI', cell:1},
    {key:'ipca', label:'IPCA', cell:2},
    {key:'ibov', label:'Ibovespa', cell:3},
    {key:'dolar', label:'Dólar', cell:4},
    {key:'sp500', label:'S&P 500', cell:5, us:true},
    {key:'nasdaq', label:'Nasdaq', cell:6, us:true},
    {key:'dow', label:'Dow Jones', cell:7, us:true}
  ];

  function parseNumber(text){
    var raw = String(text || '').replace(/\s+/g,' ').trim();
    if(!raw || raw === '—' || raw === '-' || raw === '–') return null;
    var match = raw.match(/[+-]?\d+(?:[.,]\d+)?/);
    if(!match) return null;
    var n = Number(match[0].replace(/\./g,'').replace(',','.'));
    return Number.isFinite(n) ? n : null;
  }

  function monthKey(row){
    return row && row.cells && row.cells[0]
      ? String(row.cells[0].textContent || '').replace(/\s+/g,' ').trim().toLowerCase()
      : '';
  }

  function longMonth(raw){
    var value = String(raw || '').trim().toLowerCase();
    var m = value.match(/^([a-zç]{3})\/(\d{2})$/i);
    if(!m) return raw;
    return (monthNames[m[1]] || m[1]) + '/20' + m[2];
  }

  function currentCurrency(){
    var active = document.querySelector('#monthlyIndicatorsV445 [data-monthly-us-currency-v578].active, #monthlyIndicatorsV445 [data-monthly-us-currency-v578][aria-pressed="true"]');
    var value = active ? String(active.getAttribute('data-monthly-us-currency-v578') || '').toLowerCase() : 'usd';
    return value === 'brl' ? 'BRL' : 'USD';
  }

  function activeIndicatorKeys(){
    var buttons = Array.from(document.querySelectorAll('#monthlyComparisonChipsV580 [data-monthly-chart-indicator-v580]'));
    var active = buttons.filter(function(btn){
      return btn.classList.contains('active') || btn.getAttribute('aria-pressed') === 'true';
    }).map(function(btn){
      return String(btn.getAttribute('data-monthly-chart-indicator-v580') || '').toLowerCase();
    });
    return active.length ? active : meta.map(function(item){ return item.key; });
  }

  function ensureBase(){
    chartSection = document.getElementById('monthlyComparisonChartV580');
    if(!chartSection) return false;
    canvasWrap = chartSection.querySelector('.monthly-comparison-canvas-wrap-v580');
    titleEl = document.getElementById('monthlyComparisonTitleV580');
    subtitleEl = titleEl && titleEl.parentElement ? titleEl.parentElement.querySelector('p') : null;
    kickerEl = titleEl && titleEl.parentElement ? titleEl.parentElement.querySelector('.monthly-comparison-kicker-v580') : null;

    if(titleEl && !originalTitle) originalTitle = titleEl.textContent.trim();
    if(subtitleEl && !originalSubtitle) originalSubtitle = subtitleEl.textContent.trim();
    if(kickerEl && !originalKicker) originalKicker = kickerEl.textContent.trim();

    var candidate = Array.from(chartSection.querySelectorAll('button')).find(function(btn){
      return /retorno\s+no\s+per[ií]odo/i.test(btn.textContent || '') || /retorno\s+do\s+m[eê]s/i.test(btn.textContent || '');
    });
    if(candidate){
      viewReturnButton = candidate;
      if(!originalReturnText) originalReturnText = candidate.textContent.trim();
    }

    if(canvasWrap && !overlay){
      overlay = document.createElement('div');
      overlay.className = 'monthly-selected-chart-v816';
      overlay.id = 'monthlySelectedChartV816';
      overlay.hidden = true;
      overlay.innerHTML = '<div class="monthly-selected-bars-v816"></div>' +
        '<div class="monthly-selected-axis-v816"><span></span><div class="monthly-selected-axis-track-v816"><span>Negativo</span><span>0%</span><span>Positivo</span></div><span></span></div>';
      canvasWrap.appendChild(overlay);
    }
    return !!canvasWrap;
  }

  function ensureBadge(){
    if(!titleEl || !titleEl.parentElement) return null;
    if(badge && badge.isConnected) return badge;
    badge = document.createElement('button');
    badge.type = 'button';
    badge.className = 'monthly-month-badge-v816';
    badge.setAttribute('aria-label','Limpar mês selecionado');
    badge.addEventListener('click', function(ev){
      ev.preventDefault();
      ev.stopPropagation();
      clearMonth();
    });
    titleEl.parentElement.appendChild(badge);
    return badge;
  }

  function cellDisplay(td){
    return String(td && td.textContent || '').replace(/\s+/g,' ').trim() || '—';
  }

  function buildDataset(row){
    var cells = Array.from(row.cells || []);
    if(cells.length < 8) return [];
    var active = activeIndicatorKeys();
    var currency = currentCurrency();

    return meta.filter(function(item){ return active.indexOf(item.key) !== -1; }).map(function(item){
      var td = cells[item.cell];
      return {
        key:item.key,
        label:item.label + (item.us ? ' ' + currency : ''),
        value:parseNumber(td && td.textContent),
        display:cellDisplay(td)
      };
    }).sort(function(a,b){
      if(a.value == null && b.value == null) return 0;
      if(a.value == null) return 1;
      if(b.value == null) return -1;
      return b.value - a.value;
    });
  }

  function renderBars(row){
    if(!ensureBase() || !overlay) return;
    var data = buildDataset(row);
    var valid = data.filter(function(item){ return item.value != null; });
    var maxAbs = valid.length ? Math.max.apply(null, valid.map(function(item){ return Math.abs(item.value); })) : 1;
    if(maxAbs <= 0) maxAbs = 1;

    var host = overlay.querySelector('.monthly-selected-bars-v816');
    host.innerHTML = '';

    data.forEach(function(item){
      var rowEl = document.createElement('div');
      rowEl.className = 'monthly-selected-row-v816';

      var label = document.createElement('span');
      label.className = 'monthly-selected-label-v816';
      label.textContent = item.label;

      var track = document.createElement('div');
      track.className = 'monthly-selected-track-v816';
      track.innerHTML = '<span class="monthly-selected-zero-v816"></span>';

      var value = document.createElement('strong');
      value.className = 'monthly-selected-value-v816';
      value.textContent = item.display;

      if(item.value == null){
        value.classList.add('is-na-v816');
      }else{
        var fill = document.createElement('span');
        fill.className = 'monthly-selected-fill-v816 ' + (item.value >= 0 ? 'is-pos-v816' : 'is-neg-v816');
        var width = Math.min(50, Math.max(1.2, Math.abs(item.value) / maxAbs * 50));
        fill.style.setProperty('--v816-width', width.toFixed(2) + '%');
        track.appendChild(fill);
        value.classList.add(item.value >= 0 ? 'is-pos-v816' : 'is-neg-v816');
      }

      rowEl.appendChild(label);
      rowEl.appendChild(track);
      rowEl.appendChild(value);
      host.appendChild(rowEl);
    });

    overlay.hidden = false;
  }

  function paintSelectedRow(row){
    if(selectedRow && selectedRow !== row) selectedRow.classList.remove('is-selected-v816');
    selectedRow = row;
    if(selectedRow) selectedRow.classList.add('is-selected-v816');
  }

  function setMonth(row){
    if(!row || !row.cells || row.cells.length < 8) return;
    var key = monthKey(row);
    if(selectedMonthKey && selectedMonthKey === key){
      clearMonth();
      return;
    }

    selectedMonthKey = key;
    paintSelectedRow(row);
    ensureBase();
    chartSection.classList.add('is-month-selected-v816');

    var pretty = longMonth(row.cells[0].textContent);
    var currency = currentCurrency();
    if(kickerEl) kickerEl.textContent = 'Mês selecionado';
    if(titleEl) titleEl.textContent = 'Comparativo de desempenho';
    if(subtitleEl) subtitleEl.textContent = 'Retorno mensal · ' + pretty + ' · índices dos EUA em ' + currency + '.';

    var b = ensureBadge();
    if(b){
      b.textContent = String(row.cells[0].textContent || '').trim() + '  × Limpar';
      b.hidden = false;
    }

    if(viewReturnButton){
      viewReturnButton.textContent = 'Retorno do mês';
      viewReturnButton.classList.add('active');
      viewReturnButton.setAttribute('aria-pressed','true');
    }

    renderBars(row);
  }

  function restoreCopy(){
    if(kickerEl && originalKicker) kickerEl.textContent = originalKicker;
    if(titleEl && originalTitle) titleEl.textContent = originalTitle;
    if(subtitleEl && originalSubtitle) subtitleEl.textContent = originalSubtitle;
    if(viewReturnButton && originalReturnText) viewReturnButton.textContent = originalReturnText;
    if(badge) badge.hidden = true;
  }

  function clearMonth(){
    if(selectedRow) selectedRow.classList.remove('is-selected-v816');
    selectedRow = null;
    selectedMonthKey = null;
    if(chartSection) chartSection.classList.remove('is-month-selected-v816');
    if(overlay) overlay.hidden = true;
    restoreCopy();
  }

  function findRowByMonth(key){
    if(!key) return null;
    return Array.from(document.querySelectorAll('#monthlyIndicatorsRowsV445 tr')).find(function(row){
      return row.cells && row.cells.length >= 8 && monthKey(row) === key;
    }) || null;
  }

  function reattachSelected(){
    if(!selectedMonthKey) return;
    var row = findRowByMonth(selectedMonthKey);
    if(!row){
      clearMonth();
      return;
    }
    paintSelectedRow(row);
    renderBars(row);
    var pretty = longMonth(row.cells[0].textContent);
    if(subtitleEl) subtitleEl.textContent = 'Retorno mensal · ' + pretty + ' · índices dos EUA em ' + currentCurrency() + '.';
  }

  function bindRows(){
    Array.from(document.querySelectorAll('#monthlyIndicatorsRowsV445 tr')).forEach(function(row){
      if(!row.cells || row.cells.length < 8) return;
      if(row.dataset.monthV816 === '1') return;
      row.dataset.monthV816 = '1';
      row.setAttribute('tabindex','0');
      row.setAttribute('role','button');
      row.setAttribute('aria-label','Mostrar retorno do mês ' + String(row.cells[0].textContent || '').trim() + ' no gráfico comparativo');
      row.addEventListener('click', function(ev){
        if(ev.target && ev.target.closest('button,a,input,select')) return;
        setMonth(row);
      });
      row.addEventListener('keydown', function(ev){
        if(ev.key === 'Enter' || ev.key === ' '){
          ev.preventDefault();
          setMonth(row);
        }
      });
    });
  }

  function bindControls(){
    document.querySelectorAll('#monthlyComparisonChipsV580 [data-monthly-chart-indicator-v580]').forEach(function(btn){
      if(btn.dataset.v816Bound === '1') return;
      btn.dataset.v816Bound = '1';
      btn.addEventListener('click', function(){
        if(selectedMonthKey) setTimeout(reattachSelected,0);
      });
    });

    document.querySelectorAll('#monthlyIndicatorsV445 [data-monthly-us-currency-v578]').forEach(function(btn){
      if(btn.dataset.v816Bound === '1') return;
      btn.dataset.v816Bound = '1';
      btn.addEventListener('click', function(){
        if(selectedMonthKey) setTimeout(reattachSelected,0);
      });
    });

    document.querySelectorAll('#monthlyIndicatorsV445 [data-monthly-indicators-range-v445]').forEach(function(btn){
      if(btn.dataset.v816Bound === '1') return;
      btn.dataset.v816Bound = '1';
      btn.addEventListener('click', function(){
        if(selectedMonthKey) clearMonth();
      });
    });

    if(chartSection){
      Array.from(chartSection.querySelectorAll('button')).forEach(function(btn){
        var text = String(btn.textContent || '').trim();
        if(!/evolu[cç][aã]o|retorno\s+no\s+per[ií]odo/i.test(text)) return;
        if(btn.dataset.v816ViewBound === '1') return;
        btn.dataset.v816ViewBound = '1';
        btn.addEventListener('click', function(){
          if(selectedMonthKey && /evolu[cç][aã]o/i.test(text)) clearMonth();
        });
      });
    }
  }

  function removeLegacyV815Panel(){
    var old = document.getElementById('monthlyMonthDetailV815');
    if(old) old.remove();
  }

  function init(){
    if(window.matchMedia && window.matchMedia('(max-width:768px)').matches) return;
    removeLegacyV815Panel();
    ensureBase();
    bindRows();
    bindControls();

    var tbody = document.getElementById('monthlyIndicatorsRowsV445');
    if(tbody && window.MutationObserver){
      new MutationObserver(function(){
        bindRows();
        bindControls();
        if(selectedMonthKey) setTimeout(reattachSelected,0);
      }).observe(tbody,{childList:true,subtree:true});
    }
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();

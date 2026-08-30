/* ============================================================
   V815 — INDICADORES · DETALHE DO MÊS POR CLIQUE
   Usa os valores já renderizados na tabela. Não recalcula séries.
   ============================================================ */
(function marketMonthDetailV815(){
  var selectedRow = null;
  var panel = null;

  function parseNumber(text){
    var raw = String(text || '').trim();
    if(!raw || raw === '—' || raw === '-' || raw === '–') return null;
    var match = raw.match(/[+-]?\d+(?:[.,]\d+)?/);
    if(!match) return null;
    var n = Number(match[0].replace('.', '').replace(',', '.'));
    return Number.isFinite(n) ? n : null;
  }

  function currentCurrency(){
    var active = document.querySelector('#monthlyIndicatorsV445 [data-monthly-us-currency-v578].active, #monthlyIndicatorsV445 [data-monthly-us-currency-v578][aria-pressed="true"]');
    return active && String(active.getAttribute('data-monthly-us-currency-v578') || '').toLowerCase() === 'brl' ? 'BRL' : 'USD';
  }

  function ensurePanel(){
    if(panel && panel.isConnected) return panel;
    var shell = document.querySelector('#monthlyIndicatorsV445 .monthly-indicators-table-shell-v445');
    if(!shell || !shell.parentNode) return null;

    panel = document.createElement('section');
    panel.className = 'monthly-month-detail-v815';
    panel.id = 'monthlyMonthDetailV815';
    panel.setAttribute('aria-live','polite');
    panel.innerHTML = '' +
      '<header class="monthly-month-detail-head-v815">' +
        '<div class="monthly-month-detail-copy-v815">' +
          '<span class="monthly-month-detail-kicker-v815">Leitura do mês</span>' +
          '<h5 class="monthly-month-detail-title-v815">—</h5>' +
          '<span class="monthly-month-detail-sub-v815">Retornos mensais dos indicadores exibidos na tabela.</span>' +
        '</div>' +
        '<button type="button" class="monthly-month-detail-close-v815" aria-label="Fechar detalhe do mês">Fechar ×</button>' +
      '</header>' +
      '<div class="monthly-month-detail-groups-v815"></div>' +
      '<div class="monthly-month-detail-scale-v815" aria-hidden="true"><span>Negativo</span><span>0%</span><span>Positivo</span></div>';

    shell.insertAdjacentElement('afterend', panel);
    panel.querySelector('.monthly-month-detail-close-v815').addEventListener('click', closePanel);
    return panel;
  }

  function monthLabel(raw){
    var months = {jan:'Janeiro',fev:'Fevereiro',mar:'Março',abr:'Abril',mai:'Maio',jun:'Junho',jul:'Julho',ago:'Agosto',set:'Setembro',out:'Outubro',nov:'Novembro',dez:'Dezembro'};
    var m = String(raw || '').trim().toLowerCase().match(/^([a-zç]{3})\/(\d{2})$/i);
    if(!m) return String(raw || '').trim();
    return (months[m[1]] || m[1]) + '/20' + m[2];
  }

  function barRow(label, value, displayValue, maxAbs){
    var row = document.createElement('div');
    row.className = 'month-bar-row-v815';

    var lbl = document.createElement('span');
    lbl.className = 'month-bar-label-v815';
    lbl.textContent = label;
    lbl.title = label;

    var track = document.createElement('div');
    track.className = 'month-bar-track-v815';
    track.innerHTML = '<span class="month-bar-zero-v815"></span>';

    var val = document.createElement('strong');
    val.className = 'month-bar-value-v815';
    val.textContent = displayValue || '—';

    if(value == null){
      row.classList.add('is-na-v815');
      val.classList.add('is-na-v815');
    }else{
      var fill = document.createElement('span');
      fill.className = 'month-bar-fill-v815 ' + (value >= 0 ? 'is-pos-v815' : 'is-neg-v815');
      var pct = maxAbs > 0 ? Math.min(50, Math.max(1.5, Math.abs(value) / maxAbs * 50)) : 0;
      fill.style.setProperty('--month-bar-width-v815', pct.toFixed(2) + '%');
      track.appendChild(fill);
      val.classList.add(value >= 0 ? 'is-pos-v815' : 'is-neg-v815');
    }

    row.appendChild(lbl);
    row.appendChild(track);
    row.appendChild(val);
    return row;
  }

  function renderRow(row){
    var cells = Array.from(row.cells || []);
    if(cells.length < 8) return;
    var p = ensurePanel();
    if(!p) return;

    var labels = ['CDI','IPCA','Ibovespa','Dólar','S&P 500','Nasdaq','Dow Jones'];
    var values = cells.slice(1,8).map(function(td){ return parseNumber(td.textContent); });
    var display = cells.slice(1,8).map(function(td){ return String(td.textContent || '').replace(/\s+/g,' ').trim() || '—'; });
    var valid = values.filter(function(v){ return v != null; });
    var maxAbs = valid.length ? Math.max.apply(null, valid.map(function(v){ return Math.abs(v); })) : 1;
    var currency = currentCurrency();

    p.querySelector('.monthly-month-detail-title-v815').textContent = monthLabel(cells[0].textContent) + ' · retorno no mês';
    p.querySelector('.monthly-month-detail-sub-v815').textContent = 'Comparação do mês selecionado · índices dos EUA em ' + currency + '.';

    var groups = p.querySelector('.monthly-month-detail-groups-v815');
    groups.innerHTML = '';

    var brasil = document.createElement('div');
    brasil.className = 'monthly-month-detail-group-v815';
    brasil.innerHTML = '<div class="monthly-month-detail-group-title-v815">Brasil</div>';
    for(var i=0;i<4;i++) brasil.appendChild(barRow(labels[i], values[i], display[i], maxAbs));

    var eua = document.createElement('div');
    eua.className = 'monthly-month-detail-group-v815';
    eua.innerHTML = '<div class="monthly-month-detail-group-title-v815">EUA <small>'+currency+'</small></div>';
    for(var j=4;j<7;j++) eua.appendChild(barRow(labels[j], values[j], display[j], maxAbs));

    groups.appendChild(brasil);
    groups.appendChild(eua);
    p.classList.add('is-open-v815');
  }

  function selectRow(row){
    if(selectedRow === row){ closePanel(); return; }
    if(selectedRow) selectedRow.classList.remove('is-selected-v815');
    selectedRow = row;
    selectedRow.classList.add('is-selected-v815');
    renderRow(row);
  }

  function closePanel(){
    if(selectedRow) selectedRow.classList.remove('is-selected-v815');
    selectedRow = null;
    if(panel) panel.classList.remove('is-open-v815');
  }

  function bindRows(){
    if(window.matchMedia && window.matchMedia('(max-width: 768px)').matches) return;
    var rows = document.querySelectorAll('#monthlyIndicatorsRowsV445 tr');
    rows.forEach(function(row){
      if(row.dataset.monthDetailV815 === '1') return;
      if(!row.cells || row.cells.length < 8) return;
      row.dataset.monthDetailV815 = '1';
      row.setAttribute('tabindex','0');
      row.setAttribute('role','button');
      row.setAttribute('aria-label','Abrir gráfico do mês ' + String(row.cells[0].textContent || '').trim());
      row.addEventListener('click', function(ev){
        if(ev.target && ev.target.closest('button,a,input,select')) return;
        selectRow(row);
      });
      row.addEventListener('keydown', function(ev){
        if(ev.key === 'Enter' || ev.key === ' '){ ev.preventDefault(); selectRow(row); }
      });
    });
  }

  function refreshSelected(){
    bindRows();
    if(selectedRow && selectedRow.isConnected && panel && panel.classList.contains('is-open-v815')) renderRow(selectedRow);
  }

  function init(){
    ensurePanel();
    bindRows();
    var tbody = document.getElementById('monthlyIndicatorsRowsV445');
    if(tbody && window.MutationObserver){
      new MutationObserver(function(){
        if(selectedRow && !selectedRow.isConnected) closePanel();
        bindRows();
      }).observe(tbody,{childList:true,subtree:true});
    }
    document.querySelectorAll('#monthlyIndicatorsV445 [data-monthly-us-currency-v578]').forEach(function(btn){
      btn.addEventListener('click', function(){ setTimeout(refreshSelected,0); });
    });
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();

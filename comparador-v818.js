/* ============================================================
   V818 — COMPARADOR · WORKSPACE FOCADO + EXPORTAÇÕES
   - portal do comparador para o body (viewport real)
   - Esc fecha o comparador
   - largura dinâmica conforme 2–6 fundos
   - PDF via impressão otimizada / Salvar como PDF
   - Excel .xlsx sob demanda (SheetJS) com fallback CSV
   ============================================================ */
(function comparadorV818(){
  'use strict';

  var overlay = null;
  var table = null;
  var insights = null;
  var lastFocused = null;
  var observer = null;
  var tableObserver = null;
  var xlsxPromise = null;

  function cleanText(value){
    return String(value == null ? '' : value)
      .replace(/\s+/g, ' ')
      .replace(/\s*×\s*$/g, '')
      .trim();
  }

  function isOpen(){
    return !!(overlay && overlay.classList.contains('open'));
  }

  function fundCount(){
    if(!table) return 0;
    var row = table.querySelector('thead tr') || table.querySelector('tr');
    if(!row) return 0;
    return Math.max(0, row.children.length - 1);
  }

  function syncFundCount(){
    if(!overlay) return;
    var count = fundCount();
    if(!count){
      var modalCount = document.getElementById('comparModalCountV724');
      count = modalCount ? Number(cleanText(modalCount.textContent)) || 0 : 0;
    }
    overlay.setAttribute('data-fund-count', String(Math.max(0, Math.min(6, count))));
  }

  function setBodyState(open){
    document.documentElement.classList.toggle('compar-v818-open', open);
    document.body.classList.toggle('compar-v818-open', open);
  }

  function syncOpenState(){
    if(!overlay) return;
    var open = isOpen();
    setBodyState(open);
    if(open){
      syncFundCount();
      if(document.activeElement && !overlay.contains(document.activeElement)){
        lastFocused = document.activeElement;
      }
      requestAnimationFrame(function(){
        var close = document.getElementById('comparClose');
        if(close && !overlay.contains(document.activeElement)) close.focus({preventScroll:true});
      });
    }else if(lastFocused && lastFocused.isConnected){
      try{ lastFocused.focus({preventScroll:true}); }catch(_e){}
      lastFocused = null;
    }
  }

  function closeComparator(){
    if(typeof window.fecharComparador === 'function'){
      window.fecharComparador();
    }else if(overlay){
      overlay.classList.remove('open');
      overlay.setAttribute('aria-hidden','true');
      setBodyState(false);
    }
  }

  function injectExportButtons(){
    if(!overlay) return;
    var actions = overlay.querySelector('.compar-header-actions-v724');
    var close = document.getElementById('comparClose');
    if(!actions || !close || actions.querySelector('.compar-export-actions-v818')) return;

    var group = document.createElement('div');
    group.className = 'compar-export-actions-v818';
    group.setAttribute('role','group');
    group.setAttribute('aria-label','Exportar comparação');

    var pdf = document.createElement('button');
    pdf.type = 'button';
    pdf.className = 'compar-export-btn-v818';
    pdf.title = 'Imprimir ou salvar a comparação em PDF';
    pdf.setAttribute('aria-label','Gerar PDF da comparação');
    pdf.innerHTML = '<span aria-hidden="true">↓</span> PDF';
    pdf.addEventListener('click', exportPDF);

    var excel = document.createElement('button');
    excel.type = 'button';
    excel.className = 'compar-export-btn-v818';
    excel.title = 'Baixar a comparação em Excel';
    excel.setAttribute('aria-label','Gerar Excel da comparação');
    excel.innerHTML = '<span aria-hidden="true">↓</span> Excel';
    excel.addEventListener('click', function(){ exportExcel(excel); });

    group.appendChild(pdf);
    group.appendChild(excel);
    actions.insertBefore(group, close);
  }

  function injectPrintNote(){
    if(!overlay) return;
    var panel = overlay.querySelector('.compar-panel');
    if(!panel || document.getElementById('comparExportNoteV818')) return;
    var note = document.createElement('div');
    note.id = 'comparExportNoteV818';
    note.className = 'compar-export-note-v818';
    note.innerHTML = '<strong>Comparativo de fundos</strong><span>Dados para fins informativos e comparativos. Consulte os documentos oficiais do fundo antes da contratação.</span><small id="comparExportTimeV818"></small>';
    panel.appendChild(note);
  }

  function updatePrintTime(){
    var el = document.getElementById('comparExportTimeV818');
    if(!el) return;
    el.textContent = 'Gerado em ' + new Intl.DateTimeFormat('pt-BR', {
      dateStyle:'short', timeStyle:'short'
    }).format(new Date());
  }

  function exportPDF(){
    if(!overlay || !isOpen()) return;
    updatePrintTime();
    document.documentElement.classList.add('compar-v818-printing');
    document.body.classList.add('compar-v818-printing');
    setTimeout(function(){ window.print(); }, 60);
  }

  function clearPrintState(){
    document.documentElement.classList.remove('compar-v818-printing');
    document.body.classList.remove('compar-v818-printing');
  }

  function cellText(cell){
    if(!cell) return '';
    var clone = cell.cloneNode(true);
    clone.querySelectorAll('button,svg,[aria-hidden="true"].compar-remove,[data-remove]').forEach(function(el){ el.remove(); });
    return cleanText(clone.textContent);
  }

  function comparisonRows(){
    var rows = [];
    rows.push(['Comparativo de fundos']);
    rows.push(['Gerado em', new Intl.DateTimeFormat('pt-BR', {dateStyle:'short',timeStyle:'short'}).format(new Date())]);

    if(insights && !insights.hidden){
      var cards = Array.from(insights.querySelectorAll('.compar-kpi-v731'));
      cards.forEach(function(card){
        var label = cellText(card.querySelector('span'));
        var value = cellText(card.querySelector('strong'));
        var detail = cellText(card.querySelector('small'));
        if(label || value || detail) rows.push([label, value, detail]);
      });
    }

    rows.push([]);
    if(table){
      Array.from(table.querySelectorAll('tr')).forEach(function(tr){
        var cells = Array.from(tr.children).map(cellText);
        if(cells.some(Boolean)) rows.push(cells);
      });
    }
    rows.push([]);
    rows.push(['Observação','Dados para fins informativos e comparativos. Consulte os documentos oficiais do fundo antes da contratação.']);
    return rows;
  }

  function fileStamp(){
    var d = new Date();
    function p(n){ return String(n).padStart(2,'0'); }
    return d.getFullYear() + p(d.getMonth()+1) + p(d.getDate()) + '-' + p(d.getHours()) + p(d.getMinutes());
  }

  function loadSheetJS(){
    if(window.XLSX) return Promise.resolve(window.XLSX);
    if(xlsxPromise) return xlsxPromise;
    xlsxPromise = new Promise(function(resolve, reject){
      var s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js';
      s.async = true;
      s.onload = function(){ window.XLSX ? resolve(window.XLSX) : reject(new Error('XLSX indisponível')); };
      s.onerror = reject;
      document.head.appendChild(s);
    });
    return xlsxPromise;
  }

  function fallbackCSV(rows){
    var csv = '\ufeff' + rows.map(function(row){
      return row.map(function(value){
        return '"' + String(value == null ? '' : value).replace(/"/g,'""') + '"';
      }).join(';');
    }).join('\r\n');
    var blob = new Blob([csv], {type:'text/csv;charset=utf-8;'});
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'comparativo-fundos-' + fileStamp() + '.csv';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function(){ URL.revokeObjectURL(url); }, 1200);
  }

  function exportExcel(button){
    if(!table) return;
    var rows = comparisonRows();
    var original = button.innerHTML;
    button.disabled = true;
    button.textContent = 'Gerando…';

    loadSheetJS().then(function(XLSX){
      var ws = XLSX.utils.aoa_to_sheet(rows);
      var maxCols = rows.reduce(function(m,r){ return Math.max(m,r.length); }, 1);
      ws['!cols'] = Array.from({length:maxCols}, function(_x,i){
        return {wch: i === 0 ? 30 : 28};
      });
      var wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Comparação');
      XLSX.writeFile(wb, 'comparativo-fundos-' + fileStamp() + '.xlsx');
    }).catch(function(){
      fallbackCSV(rows);
    }).finally(function(){
      button.disabled = false;
      button.innerHTML = original;
    });
  }

  function onKeydown(ev){
    if(ev.key !== 'Escape' || !isOpen()) return;
    var quick = document.getElementById('comparQuickAddV724');
    if(quick && !quick.hidden){
      var quickClose = document.getElementById('comparQuickAddCloseV724');
      if(quickClose){
        ev.preventDefault();
        quickClose.click();
        return;
      }
    }
    ev.preventDefault();
    closeComparator();
  }

  function portalOverlay(){
    if(!overlay || overlay.parentElement === document.body) return;
    document.body.appendChild(overlay);
  }

  function bindObservers(){
    if(!overlay) return;
    observer = new MutationObserver(function(mutations){
      var classChanged = mutations.some(function(m){ return m.type === 'attributes' && m.attributeName === 'class'; });
      if(classChanged) syncOpenState();
      syncFundCount();
    });
    observer.observe(overlay, {attributes:true, attributeFilter:['class'], childList:true, subtree:true});

    if(table){
      tableObserver = new MutationObserver(syncFundCount);
      tableObserver.observe(table, {childList:true, subtree:true, characterData:true});
    }
  }

  function init(){
    if(window.matchMedia && window.matchMedia('(max-width:768px)').matches) return;
    overlay = document.getElementById('comparOverlay');
    table = document.getElementById('comparTable');
    insights = document.getElementById('comparInsightsV728');
    if(!overlay || overlay.dataset.v818Bound === '1') return;
    overlay.dataset.v818Bound = '1';

    portalOverlay();
    injectExportButtons();
    injectPrintNote();
    syncFundCount();
    syncOpenState();
    bindObservers();

    document.addEventListener('keydown', onKeydown, true);
    window.addEventListener('afterprint', clearPrintState);
    window.addEventListener('beforeprint', updatePrintTime);
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true});
  else init();
})();

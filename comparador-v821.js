/* ============================================================
   V821 — COMPARADOR · ACABAMENTO FINAL / WORKSPACE EXECUTIVO
   - move o overlay diretamente para <body> e reforça o portal ao abrir
   - Esc fecha o comparador (ou fecha primeiro a busca rápida)
   - PDF usa uma janela de impressão dedicada, independente do CSS da página
   - Excel usa ExcelJS: abas Resumo e Comparação, estilos e impressão paisagem
   - fallback para XLSX simples/CSV se a biblioteca externa não estiver disponível
   ============================================================ */
(function comparadorV821(){
  'use strict';

  var overlay = null;
  var table = null;
  var insights = null;
  var lastFocused = null;
  var overlayObserver = null;
  var tableObserver = null;
  var excelPromise = null;
  var xlsxPromise = null;
  var pdfPromise = null;
  var autoTablePromise = null;
  var refreshQueued = false;
  var portalObserver = null;

  function cleanText(value){
    return String(value == null ? '' : value)
      .replace(/[ⓘ↗↘]/g,'')
      .replace(/\s*×\s*$/g,'')
      .replace(/\s+/g,' ')
      .trim();
  }

  function stripDecorative(value){
    return cleanText(value)
      .replace(/[🏆🏅🥇]/g,'')
      .replace(/\s*↓\s*/g,' ')
      .replace(/\s+/g,' ')
      .trim();
  }

  function esc(value){
    return String(value == null ? '' : value)
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;').replace(/'/g,'&#039;');
  }

  function isOpen(){
    return !!(overlay && overlay.classList.contains('open'));
  }

  function portalOverlay(){
    if(!overlay) return;
    if(overlay.parentElement !== document.body) document.body.appendChild(overlay);
  }

  function fundCount(){
    if(!table) return 0;
    var row = table.querySelector('thead tr') || table.querySelector('tr');
    return row ? Math.max(0,row.children.length - 1) : 0;
  }

  function syncFundCount(){
    if(!overlay) return;
    var count = fundCount();
    if(!count){
      var el = document.getElementById('comparModalCountV724');
      count = el ? Number(cleanText(el.textContent)) || 0 : 0;
    }
    overlay.setAttribute('data-fund-count',String(Math.max(0,Math.min(6,count))));
  }

  function setBodyState(open){
    document.documentElement.classList.toggle('compar-v820-open',open);
    document.body.classList.toggle('compar-v820-open',open);
    document.documentElement.classList.remove('compar-v818-open');
    document.body.classList.remove('compar-v818-open');
  }

  function closeComparator(){
    if(typeof window.fecharComparador === 'function') window.fecharComparador();
    else if(overlay){
      overlay.classList.remove('open');
      overlay.setAttribute('aria-hidden','true');
      setBodyState(false);
    }
  }

  function syncOpenState(){
    if(!overlay) return;
    if(isOpen()){
      portalOverlay();
      setBodyState(true);
      syncFundCount();
      if(document.activeElement && !overlay.contains(document.activeElement)) lastFocused=document.activeElement;
    }else{
      setBodyState(false);
      if(lastFocused && lastFocused.isConnected){
        try{ lastFocused.focus({preventScroll:true}); }catch(_e){}
      }
      lastFocused=null;
    }
  }

  function removeOldExportUI(){
    if(!overlay) return;
    overlay.querySelectorAll('.compar-export-actions-v818,.compar-export-note-v818').forEach(function(el){ el.remove(); });
  }

  function injectExportButtons(){
    if(!overlay) return;
    var actions=overlay.querySelector('.compar-header-actions-v724');
    var close=document.getElementById('comparClose');
    if(!actions || !close || actions.querySelector('.compar-export-actions-v820')) return;

    var group=document.createElement('div');
    group.className='compar-export-actions-v820';
    group.setAttribute('role','group');
    group.setAttribute('aria-label','Exportar comparação');

    var pdf=document.createElement('button');
    pdf.type='button';
    pdf.className='compar-export-btn-v820';
    pdf.title='Imprimir ou salvar a comparação em PDF';
    pdf.setAttribute('aria-label','Gerar PDF da comparação');
    pdf.innerHTML='<svg aria-hidden="true" viewBox="0 0 20 20" width="13" height="13"><path fill="currentColor" d="M5 2h7l4 4v12H5z" opacity=".32"/><path fill="none" stroke="currentColor" stroke-width="1.5" d="M12 2v5h4M8 11h5M8 14h5"/></svg><span>PDF</span>';
    pdf.addEventListener('click',exportPDF);

    var excel=document.createElement('button');
    excel.type='button';
    excel.className='compar-export-btn-v820';
    excel.title='Baixar a comparação em Excel';
    excel.setAttribute('aria-label','Gerar Excel da comparação');
    excel.innerHTML='<svg aria-hidden="true" viewBox="0 0 20 20" width="13" height="13"><rect x="3" y="2" width="14" height="16" rx="1.5" fill="currentColor" opacity=".20"/><path fill="none" stroke="currentColor" stroke-width="1.5" d="M7 6l6 8M13 6l-6 8M4 5h12"/></svg><span>Excel</span>';
    excel.addEventListener('click',function(){ exportExcel(excel); });

    group.appendChild(pdf); group.appendChild(excel);
    actions.insertBefore(group,close);
  }

  function getSection(raw){
    var txt=String(raw||'').toUpperCase();
    var sections=['CUSTOS E ACESSO','RENTABILIDADE','LIQUIDEZ','FUNDO'];
    for(var i=0;i<sections.length;i++) if(txt.indexOf(sections[i])!==-1) return sections[i];
    return '';
  }

  function cleanIndicator(raw){
    var txt=stripDecorative(raw);
    ['CUSTOS E ACESSO','RENTABILIDADE','LIQUIDEZ','FUNDO'].forEach(function(s){
      txt=txt.replace(new RegExp('^'+s.replace(/ /g,'\\s*'),'i'),'');
    });
    return txt.replace(/\s+/g,' ').trim();
  }

  function fundNameFromCell(cell,index){
    if(!cell) return 'Fundo '+index;
    var preferred=cell.querySelector('.compar-fund-name,.fund-name,h3,h4,strong');
    var txt=preferred ? stripDecorative(preferred.textContent) : stripDecorative(cell.innerText || cell.textContent);
    txt=txt.replace(/\s+(RF\s*REF\.|RF|MM)\s+C[ÓO]D\.\s*\d+.*$/i,'').trim();
    txt=txt.replace(/\s+C[ÓO]D\.\s*\d+.*$/i,'').trim();
    return txt || ('Fundo '+index);
  }

  function cellValue(cell){
    if(!cell) return '';
    var clone=cell.cloneNode(true);
    clone.querySelectorAll('button,svg,sup,.tooltip,.compar-remove,[data-remove]').forEach(function(el){el.remove();});
    return stripDecorative(clone.innerText || clone.textContent);
  }

  function parseMetricNumber(value){
    var raw=String(value||'').replace(/\s+/g,' ').trim();
    var m=raw.match(/[+-]?\d[\d.]*?(?:,\d+)?(?=\s*%|\s|$)/);
    if(!m) return null;
    var n=Number(m[0].replace(/\./g,'').replace(',','.'));
    return Number.isFinite(n)?n:null;
  }

  function normalizeMetricDisplay(value){
    return stripDecorative(value).replace(/\s+%/g,'%').replace(/\+\s+/g,'+').replace(/-\s+/g,'-').trim();
  }

  function findModelRow(model,rx){
    return model.rows.find(function(row){return rx.test(String(row.label||''));}) || null;
  }

  function metricWinner(model,row,mode,label){
    if(!row) return {label:label,value:'—',fund:'Sem histórico',fundIndex:-1,rowLabel:''};
    var bestIndex=-1,bestNumber=null;
    row.values.forEach(function(value,index){
      var n=parseMetricNumber(value);
      if(n==null) return;
      if(bestNumber==null || (mode==='min'?n<bestNumber:n>bestNumber)){bestNumber=n;bestIndex=index;}
    });
    if(bestIndex<0) return {label:label,value:'—',fund:'Sem histórico',fundIndex:-1,rowLabel:row.label};
    return {
      label:label,
      value:normalizeMetricDisplay(row.values[bestIndex]),
      fund:model.funds[bestIndex] || ('Fundo '+(bestIndex+1)),
      fundIndex:bestIndex,
      rowLabel:row.label
    };
  }

  function fixedSummary(model){
    return [
      metricWinner(model,findModelRow(model,/^retorno em 12 meses$/i),'max','MAIOR RETORNO · 12M'),
      metricWinner(model,findModelRow(model,/^taxa de administra[cç][aã]o$/i),'min','MENOR TAXA ADM.'),
      metricWinner(model,findModelRow(model,/^% do CDI em 12 meses$/i),'max','MAIOR % DO CDI · 12M')
    ];
  }

  function premiumSignature(model){
    return JSON.stringify({funds:model.funds,summary:model.summary,rows:model.rows.map(function(r){return [r.label].concat(r.values);})});
  }

  function renderPremiumInsights(model){
    if(!insights) return;
    var sig=premiumSignature(model);
    if(insights.dataset.v820Signature===sig && insights.querySelector('.compar-kpi-grid-v820')) return;
    insights.dataset.v820Signature=sig;
    insights.hidden=false;
    insights.innerHTML='';
    var wrap=document.createElement('div');
    wrap.className='compar-insights-v731 compar-insights-v820';
    var title=document.createElement('div');
    title.className='compar-insights-title-v731';
    title.innerHTML='<strong>Destaques do comparativo</strong><span class="compar-kpi-info-v820" tabindex="0" role="img" aria-label="Destaques calculados apenas entre os fundos selecionados." title="Destaques calculados apenas entre os fundos selecionados.">ⓘ</span>';
    var grid=document.createElement('div');
    grid.className='compar-kpi-grid-v731 compar-kpi-grid-v820';
    model.summary.forEach(function(item){
      var card=document.createElement('div');
      card.className='compar-kpi-v731 compar-kpi-no-detail-v783 compar-kpi-v820';
      card.innerHTML='<span>'+esc(item.label)+'</span><strong>'+esc(item.value)+'</strong><small>'+esc(item.fund)+'</small>';
      grid.appendChild(card);
    });
    wrap.appendChild(title);wrap.appendChild(grid);insights.appendChild(wrap);
  }

  function stripLegacyWinnerDecorations(){
    if(!table) return;
    Array.from(table.querySelectorAll('td,th')).forEach(function(cell){
      cell.classList.remove('compar-winner-soft-v820','compar-winner-valid-v821');
      if(cell.title==='Melhor valor entre os fundos selecionados') cell.removeAttribute('title');

      Array.from(cell.querySelectorAll('*')).forEach(function(el){
        var before=String(el.textContent||'');
        if(/[🏆🏅🥇]/.test(before) && stripDecorative(before)==='') el.remove();
      });

      var walker=document.createTreeWalker(cell,NodeFilter.SHOW_TEXT);
      var nodes=[]; while(walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach(function(node){
        if(/[🏆🏅🥇]/.test(node.nodeValue||'')){
          node.nodeValue=(node.nodeValue||'').replace(/[🏆🏅🥇]/g,'').replace(/^\s+/, '');
        }
      });
    });
  }

  function comparableWinnerMap(model){
    var specs=[
      [/^taxa de administra[cç][aã]o$/i,'min'],
      [/^retorno no m[eê]s$/i,'max'],
      [/^retorno no ano$/i,'max'],
      [/^retorno em 12 meses$/i,'max'],
      [/^% do CDI em 12 meses$/i,'max']
    ];
    var map={};
    specs.forEach(function(spec){
      var row=findModelRow(model,spec[0]);
      if(!row) return;
      var best=-1,bestNumber=null;
      row.values.forEach(function(value,index){
        var n=parseMetricNumber(value);
        if(n==null) return;
        if(bestNumber==null || (spec[1]==='min'?n<bestNumber:n>bestNumber)){bestNumber=n;best=index;}
      });
      if(best>=0) map[String(row.label||'').toLowerCase()]={fundIndex:best,rowLabel:row.label};
    });
    return map;
  }

  function applyComparableWinners(model){
    if(!table) return;
    var winners=comparableWinnerMap(model);
    Array.from(table.querySelectorAll('tr')).forEach(function(tr){
      var cells=Array.from(tr.children||[]);
      if(cells.length<2) return;
      var label=cleanIndicator(cellValue(cells[0]));
      var winner=winners[String(label||'').toLowerCase()];
      if(!winner) return;
      var cell=cells[winner.fundIndex+1];
      if(!cell) return;
      cell.classList.add('compar-winner-valid-v821');
      cell.title='Melhor valor nesta métrica entre os fundos selecionados';
    });
  }

  function markSectionRows(){
    if(!table) return;
    Array.from(table.querySelectorAll('tr')).forEach(function(tr){
      var first=tr.children && tr.children[0];
      if(!first) return;
      var sec=getSection(cellValue(first));
      tr.classList.toggle('compar-section-row-v820',!!sec && cleanIndicator(cellValue(first))==='');
    });
  }

  function refreshPremiumPresentation(){
    if(!table || !isOpen()) return;
    stripLegacyWinnerDecorations();
    markSectionRows();
    var model=exportModel();
    renderPremiumInsights(model);
    applyComparableWinners(model);
  }

  function queueRefresh(){
    if(refreshQueued) return;
    refreshQueued=true;
    requestAnimationFrame(function(){refreshQueued=false;refreshPremiumPresentation();});
  }

  function exportModel(){
    var model={generated:new Date(),funds:[],summary:[],rows:[]};
    if(!table) return model;
    var header=table.querySelector('thead tr') || table.querySelector('tr');
    if(header){
      Array.from(header.children).slice(1).forEach(function(cell,i){ model.funds.push(fundNameFromCell(cell,i+1)); });
    }
    var trs=Array.from(table.querySelectorAll('tr'));
    trs.forEach(function(tr,rowIndex){
      if(rowIndex===0) return;
      var cells=Array.from(tr.children);
      if(!cells.length) return;
      var raw=cellValue(cells[0]);
      var label=cleanIndicator(raw);
      if(!label || /^INDICADOR$/i.test(label)) return;
      model.rows.push({section:getSection(raw),label:label,values:cells.slice(1).map(cellValue)});
    });
    model.summary=fixedSummary(model);
    return model;
  }

  function printableValueClass(value){
    var t=String(value||'').trim();
    if(/^\+/.test(t)) return 'pos';
    if(/^-/.test(t)) return 'neg';
    return '';
  }

  function buildPrintHTML(model){
    var sections='';
    var current='';
    model.rows.forEach(function(row){
      if(row.section && row.section!==current){
        current=row.section;
        sections+='<tr class="section"><td colspan="'+(model.funds.length+1)+'">'+esc(current)+'</td></tr>';
      }
      sections+='<tr><th>'+esc(row.label)+'</th>'+row.values.map(function(v){return '<td class="'+printableValueClass(v)+'">'+esc(v)+'</td>';}).join('')+'</tr>';
    });
    var cards=model.summary.map(function(x){
      return '<div class="card"><span>'+esc(x.label)+'</span><strong>'+esc(x.value)+'</strong><small>'+esc(x.fund)+'</small></div>';
    }).join('');
    var generated=new Intl.DateTimeFormat('pt-BR',{dateStyle:'short',timeStyle:'short'}).format(model.generated);
    return '<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Comparativo de fundos</title><style>'+ 
      '@page{size:A4 landscape;margin:8mm}*{box-sizing:border-box}body{margin:0;color:#172033;font:9pt Arial,sans-serif;background:#fff}'+
      'header{display:flex;justify-content:space-between;align-items:flex-end;padding-bottom:4mm;border-bottom:1.4px solid #b9c1cf}h1{margin:0;font-size:18pt;color:#111827}header p{margin:1mm 0 0;color:#667085}'+
      '.summary{display:grid;grid-template-columns:repeat(3,1fr);gap:3mm;margin:4mm 0}.card{border:1px solid #d7dce5;border-radius:2mm;padding:3mm;background:#f8fafc;break-inside:avoid}.card span{display:block;color:#667085;font-size:7.5pt;font-weight:700;text-transform:uppercase}.card strong{display:inline-block;margin-top:1mm;font-size:13pt;color:#111827}.card small{margin-left:2mm;color:#475467}'+
      'table{width:100%;border-collapse:collapse;table-layout:fixed;font-size:7.6pt}thead{display:table-header-group}tr{break-inside:avoid}th,td{border:1px solid #d7dce5;padding:1.8mm 1.7mm;vertical-align:middle;overflow-wrap:anywhere}thead th{background:#172033;color:#fff;font-weight:700}thead th:first-child{width:20%}tbody th{text-align:left;background:#f6f7f9;color:#344054}.section td{padding:1.2mm 1.7mm;background:#ece8df;color:#8a641c;font-weight:700;font-size:7pt;letter-spacing:.06em}.pos{color:#047857;font-weight:700}.neg{color:#be123c;font-weight:700}'+
      'footer{margin-top:4mm;padding-top:2.5mm;border-top:1px solid #d7dce5;color:#667085;font-size:7pt;line-height:1.35}'+
      '</style></head><body><header><div><h1>Comparativo de fundos</h1><p>Catálogo de Fundos CAIXA</p></div><div>Gerado em '+esc(generated)+'</div></header>'+
      (cards?'<section class="summary">'+cards+'</section>':'')+
      '<table><thead><tr><th>Indicador</th>'+model.funds.map(function(f){return '<th>'+esc(f)+'</th>';}).join('')+'</tr></thead><tbody>'+sections+'</tbody></table>'+
      '<footer>Dados para fins informativos e comparativos. Consulte os documentos oficiais do fundo antes da contratação.</footer></body></html>';
  }

  function loadJsPDF(){
    if(window.jspdf && window.jspdf.jsPDF) return Promise.resolve(window.jspdf.jsPDF);
    if(pdfPromise) return pdfPromise;
    pdfPromise=new Promise(function(resolve,reject){
      var s=document.createElement('script');
      s.src='https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js';
      s.async=true;
      s.onload=function(){window.jspdf&&window.jspdf.jsPDF?resolve(window.jspdf.jsPDF):reject(new Error('jsPDF indisponível'));};
      s.onerror=reject;document.head.appendChild(s);
    });
    return pdfPromise;
  }

  function loadAutoTable(){
    if(window.jspdf && window.jspdf.jsPDF && window.jspdf.jsPDF.API && window.jspdf.jsPDF.API.autoTable) return Promise.resolve(true);
    if(autoTablePromise) return autoTablePromise;
    autoTablePromise=new Promise(function(resolve,reject){
      var s=document.createElement('script');
      s.src='https://cdn.jsdelivr.net/npm/jspdf-autotable@3.8.2/dist/jspdf.plugin.autotable.min.js';
      s.async=true;
      s.onload=function(){resolve(true);};s.onerror=reject;document.head.appendChild(s);
    });
    return autoTablePromise;
  }

  function directPDF(model,JsPDF){
    var doc=new JsPDF({orientation:'landscape',unit:'mm',format:'a4',compress:true});
    doc.setProperties({title:'Comparativo de fundos',subject:'Comparação de fundos selecionados',creator:'Catálogo de Fundos CAIXA'});
    var W=doc.internal.pageSize.getWidth(),H=doc.internal.pageSize.getHeight(),margin=10;
    var generated=new Intl.DateTimeFormat('pt-BR',{dateStyle:'short',timeStyle:'short'}).format(model.generated);
    doc.setTextColor(23,32,51);doc.setFont('helvetica','bold');doc.setFontSize(18);doc.text('Comparativo de fundos',margin,13);
    doc.setFont('helvetica','normal');doc.setFontSize(8);doc.setTextColor(102,112,133);doc.text('Catálogo de Fundos CAIXA',margin,18);doc.text('Gerado em '+generated,W-margin,18,{align:'right'});
    doc.setDrawColor(201,151,58);doc.line(margin,21,W-margin,21);

    var cardGap=4,cardY=25,cardH=17,cardW=(W-margin*2-cardGap*2)/3;
    model.summary.forEach(function(item,i){
      var x=margin+i*(cardW+cardGap);doc.setFillColor(248,250,252);doc.setDrawColor(215,220,229);doc.roundedRect(x,cardY,cardW,cardH,2,2,'FD');
      doc.setFont('helvetica','bold');doc.setFontSize(7);doc.setTextColor(102,112,133);doc.text(item.label,x+3,cardY+4.5);
      doc.setFontSize(12);doc.setTextColor(17,24,39);doc.text(item.value,x+3,cardY+10.5);
      doc.setFontSize(6.4);doc.setTextColor(71,84,103);var fund=doc.splitTextToSize(item.fund,cardW-25);doc.text(fund,x+24,cardY+10.2);
    });

    var body=[],sectionRows={};
    var current='';
    model.rows.forEach(function(row){
      if(row.section && row.section!==current){current=row.section;sectionRows[body.length]=true;body.push([current].concat(model.funds.map(function(){return '';})));}
      body.push([row.label].concat(row.values.map(normalizeMetricDisplay)));
    });
    var usable=W-margin*2,indicatorW=42,fundW=Math.max(27,(usable-indicatorW)/Math.max(1,model.funds.length));
    var colStyles={0:{cellWidth:indicatorW}};for(var c=1;c<=model.funds.length;c++) colStyles[c]={cellWidth:fundW};
    var fontSize=model.funds.length>=5?6.1:(model.funds.length===4?6.6:7.2);
    doc.autoTable({
      startY:46,margin:{left:margin,right:margin,bottom:14},
      head:[['Indicador'].concat(model.funds)],body:body,
      theme:'grid',styles:{font:'helvetica',fontSize:fontSize,cellPadding:1.65,valign:'middle',lineColor:[222,226,234],lineWidth:.18,textColor:[52,64,84],overflow:'linebreak'},
      headStyles:{fillColor:[15,23,42],textColor:[255,255,255],fontStyle:'bold',halign:'center',cellPadding:2.2},
      columnStyles:colStyles,
      didParseCell:function(data){
        if(data.section!=='body') return;
        if(sectionRows[data.row.index]){
          data.cell.styles.fillColor=[245,239,226];data.cell.styles.textColor=[126,91,25];data.cell.styles.fontStyle='bold';
          if(data.column.index>0) data.cell.text=[''];
          return;
        }
        if(data.column.index===0){data.cell.styles.fillColor=[248,250,252];data.cell.styles.fontStyle='bold';}
        var txt=String(data.cell.raw||'').trim();if(/^\+/.test(txt)) data.cell.styles.textColor=[4,120,87];if(/^-/.test(txt)) data.cell.styles.textColor=[190,18,60];
      },
      didDrawPage:function(data){
        doc.setDrawColor(220,224,232);doc.line(margin,H-10,W-margin,H-10);doc.setFont('helvetica','normal');doc.setFontSize(6.3);doc.setTextColor(102,112,133);
        doc.text('Dados para fins informativos e comparativos. Consulte os documentos oficiais do fundo antes da contratação.',margin,H-6);
        doc.text('Gerado pelo Catálogo de Fundos CAIXA · Página '+doc.internal.getNumberOfPages(),W-margin,H-6,{align:'right'});
      }
    });
    doc.save('comparativo-fundos-'+fileStamp()+'.pdf');
  }

  function fallbackPrint(model){
    var win=window.open('','_blank','width=1280,height=800');
    if(!win){alert('O navegador bloqueou a janela de impressão. Permita pop-ups para gerar o PDF.');return;}
    win.document.open();win.document.write(buildPrintHTML(model));win.document.close();win.focus();setTimeout(function(){try{win.print();}catch(_e){}},250);
  }

  function exportPDF(ev){
    if(!table) return;
    var button=ev && ev.currentTarget,original=button?button.innerHTML:'';
    if(button){button.disabled=true;button.textContent='Gerando…';}
    var model=exportModel();
    loadJsPDF().then(function(JsPDF){return loadAutoTable().then(function(){directPDF(model,JsPDF);});})
      .catch(function(){fallbackPrint(model);})
      .finally(function(){if(button){button.disabled=false;button.innerHTML=original;}});
  }

  function fileStamp(){
    var d=new Date(); function p(n){return String(n).padStart(2,'0');}
    return d.getFullYear()+p(d.getMonth()+1)+p(d.getDate())+'-'+p(d.getHours())+p(d.getMinutes());
  }

  function loadExcelJS(){
    if(window.ExcelJS) return Promise.resolve(window.ExcelJS);
    if(excelPromise) return excelPromise;
    excelPromise=new Promise(function(resolve,reject){
      var s=document.createElement('script');
      s.src='https://cdn.jsdelivr.net/npm/exceljs@4.4.0/dist/exceljs.min.js';
      s.async=true;
      s.onload=function(){window.ExcelJS?resolve(window.ExcelJS):reject(new Error('ExcelJS indisponível'));};
      s.onerror=reject;
      document.head.appendChild(s);
    });
    return excelPromise;
  }

  function loadSheetJS(){
    if(window.XLSX) return Promise.resolve(window.XLSX);
    if(xlsxPromise) return xlsxPromise;
    xlsxPromise=new Promise(function(resolve,reject){
      var s=document.createElement('script');
      s.src='https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js';
      s.async=true;
      s.onload=function(){window.XLSX?resolve(window.XLSX):reject(new Error('XLSX indisponível'));};
      s.onerror=reject;
      document.head.appendChild(s);
    });
    return xlsxPromise;
  }

  function parsePercent(value){
    var t=String(value||'').replace(/\s/g,'');
    if(!/%$/.test(t)) return null;
    var n=Number(t.replace('%','').replace(/\./g,'').replace(',','.'));
    return Number.isFinite(n)?n/100:null;
  }

  function parseBRL(value){
    var t=String(value||'').trim();
    if(!/^R\$/.test(t)) return null;
    var n=Number(t.replace(/^R\$\s*/,'').replace(/\./g,'').replace(',','.'));
    return Number.isFinite(n)?n:null;
  }

  function excelCellValue(label,value){
    var pct=parsePercent(value);
    if(pct!=null && /(retorno|taxa|% do cdi)/i.test(label)) return {value:pct,numFmt:/% do cdi/i.test(label)?'0%':'+0.00%;-0.00%;0.00%'};
    var brl=parseBRL(value);
    if(brl!=null) return {value:brl,numFmt:'"R$" #,##0.00'};
    return {value:String(value||'')};
  }

  function downloadBlob(blob,name){
    var url=URL.createObjectURL(blob),a=document.createElement('a');
    a.href=url; a.download=name; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function(){URL.revokeObjectURL(url);},1500);
  }

  function buildExcelProfessional(ExcelJS,model){
    var wb=new ExcelJS.Workbook();
    wb.creator='Catálogo de Fundos CAIXA';wb.created=model.generated;wb.subject='Comparativo de fundos';
    var navy='172033',navy2='0F172A',gold='C9973A',goldLight='F5EDDC',light='F7F9FC',grid='D6DBE5',green='047857',red='BE123C',gray='667085',white='FFFFFF';

    var sum=wb.addWorksheet('Resumo',{views:[{showGridLines:false}]});
    ['A','B','C','D','E','F'].forEach(function(col){sum.getColumn(col).width=20;});
    sum.mergeCells('A1:F1');sum.getCell('A1').value='Comparativo de fundos';sum.getCell('A1').font={bold:true,size:18,color:{argb:'FF'+white}};sum.getCell('A1').fill={type:'pattern',pattern:'solid',fgColor:{argb:'FF'+navy}};sum.getCell('A1').alignment={vertical:'middle'};sum.getRow(1).height=29;
    sum.mergeCells('A2:F2');sum.getCell('A2').value='Catálogo de Fundos CAIXA  ·  Gerado em '+new Intl.DateTimeFormat('pt-BR',{dateStyle:'short',timeStyle:'short'}).format(model.generated);sum.getCell('A2').font={color:{argb:'FF'+gray},size:9};sum.getRow(2).height=18;
    var cardPairs=[[1,2],[3,4],[5,6]];
    model.summary.forEach(function(item,i){
      var a=cardPairs[i][0],b=cardPairs[i][1];sum.mergeCells(4,a,4,b);sum.mergeCells(5,a,5,b);sum.mergeCells(6,a,6,b);
      var c1=sum.getCell(4,a),c2=sum.getCell(5,a),c3=sum.getCell(6,a);
      c1.value=item.label;c2.value=item.value;c3.value=item.fund;
      [c1,c2,c3].forEach(function(c){c.fill={type:'pattern',pattern:'solid',fgColor:{argb:'FF'+light}};c.border={left:{style:'thin',color:{argb:'FF'+grid}},right:{style:'thin',color:{argb:'FF'+grid}}};});
      c1.border.top={style:'thin',color:{argb:'FF'+grid}};c3.border.bottom={style:'thin',color:{argb:'FF'+grid}};
      c1.font={bold:true,size:8,color:{argb:'FF'+gray}};c2.font={bold:true,size:14,color:{argb:'FF'+navy2}};c3.font={bold:true,size:8,color:{argb:'FF475467'}};
      c1.alignment={vertical:'middle'};c2.alignment={vertical:'middle'};c3.alignment={vertical:'top',wrapText:true};
    });
    sum.getRow(4).height=18;sum.getRow(5).height=24;sum.getRow(6).height=26;
    sum.mergeCells('A8:F8');sum.getCell('A8').value='Gerado pelo Catálogo de Fundos CAIXA · Dados para fins informativos e comparativos. Consulte os documentos oficiais do fundo antes da contratação.';sum.getCell('A8').font={italic:true,color:{argb:'FF'+gray},size:9};sum.getCell('A8').alignment={wrapText:true};
    sum.mergeCells('A10:F10');sum.getCell('A10').value='Observações do atendimento';sum.getCell('A10').font={bold:true,color:{argb:'FF'+navy2}};
    sum.mergeCells('A11:F14');sum.getCell('A11').value='';sum.getCell('A11').alignment={vertical:'top',wrapText:true};sum.getCell('A11').border={top:{style:'thin',color:{argb:'FF'+grid}},bottom:{style:'thin',color:{argb:'FF'+grid}},left:{style:'thin',color:{argb:'FF'+grid}},right:{style:'thin',color:{argb:'FF'+grid}}};
    sum.pageSetup={orientation:'landscape',paperSize:9,fitToPage:true,fitToWidth:1,fitToHeight:1,margins:{left:.3,right:.3,top:.45,bottom:.45,header:.2,footer:.2}};
    sum.headerFooter={oddFooter:'&LComparativo de fundos&C&P de &N&R'+new Intl.DateTimeFormat('pt-BR').format(model.generated)};

    var ws=wb.addWorksheet('Comparação',{views:[{state:'frozen',xSplit:1,ySplit:4,showGridLines:false}]});
    var comparableWinners=comparableWinnerMap(model);
    ws.mergeCells(1,1,1,model.funds.length+1);ws.getCell(1,1).value='Comparativo de fundos';ws.getCell(1,1).font={bold:true,size:16,color:{argb:'FF'+white}};ws.getCell(1,1).fill={type:'pattern',pattern:'solid',fgColor:{argb:'FF'+navy}};ws.getCell(1,1).alignment={vertical:'middle'};ws.getRow(1).height=27;
    ws.mergeCells(2,1,2,model.funds.length+1);ws.getCell(2,1).value='Gerado em '+new Intl.DateTimeFormat('pt-BR',{dateStyle:'short',timeStyle:'short'}).format(model.generated);ws.getCell(2,1).font={color:{argb:'FF'+gray},size:9};
    var head=ws.addRow([]); // row 3 spacer
    var headerRow=ws.addRow(['Indicador'].concat(model.funds));headerRow.height=27;
    headerRow.eachCell(function(cell){cell.font={bold:true,color:{argb:'FF'+white}};cell.fill={type:'pattern',pattern:'solid',fgColor:{argb:'FF'+navy2}};cell.alignment={vertical:'middle',wrapText:true};cell.border={bottom:{style:'medium',color:{argb:'FF'+gold}}};});
    var current='';
    model.rows.forEach(function(row){
      if(row.section && row.section!==current){current=row.section;var sr=ws.addRow([current]);ws.mergeCells(sr.number,1,sr.number,model.funds.length+1);sr.getCell(1).font={bold:true,color:{argb:'FF8A641C'},size:9};sr.getCell(1).fill={type:'pattern',pattern:'solid',fgColor:{argb:'FF'+goldLight}};sr.height=18;}
      var values=[row.label],formats=[null];row.values.forEach(function(v){var x=excelCellValue(row.label,v);values.push(x.value);formats.push(x.numFmt||null);});
      var er=ws.addRow(values);er.getCell(1).font={bold:true,color:{argb:'FF344054'}};er.getCell(1).fill={type:'pattern',pattern:'solid',fgColor:{argb:'FF'+light}};
      er.eachCell(function(cell,c){cell.border={bottom:{style:'thin',color:{argb:'FF'+grid}}};cell.alignment={vertical:'middle',wrapText:true};if(formats[c-1])cell.numFmt=formats[c-1];if(c>1&&typeof cell.value==='number')cell.font={bold:true,color:{argb:'FF'+(cell.value<0?red:(cell.value>0?green:'344054'))}};});
      var win=comparableWinners[String(row.label||'').toLowerCase()];
      if(win && win.fundIndex>=0){
        var wc=er.getCell(win.fundIndex+2);
        wc.fill={type:'pattern',pattern:'solid',fgColor:{argb:'FFF9F5EC'}};
        wc.border={left:{style:'medium',color:{argb:'FF'+gold}},bottom:{style:'thin',color:{argb:'FF'+grid}}};
        wc.font=Object.assign({},wc.font||{},{bold:true});
      }
    });
    ws.getColumn(1).width=27;for(var c=2;c<=model.funds.length+1;c++)ws.getColumn(c).width=Math.max(23,Math.min(35,(model.funds[c-2]||'').length+7));
    ws.autoFilter={from:{row:4,column:1},to:{row:4,column:model.funds.length+1}};ws.pageSetup={orientation:'landscape',paperSize:9,fitToPage:true,fitToWidth:1,fitToHeight:0,margins:{left:.25,right:.25,top:.4,bottom:.4,header:.2,footer:.2},printTitlesRow:'1:4'};
    ws.headerFooter={oddFooter:'&LComparativo de fundos&C&P de &N&R'+new Intl.DateTimeFormat('pt-BR').format(model.generated)};ws.properties.defaultRowHeight=19;
    return wb.xlsx.writeBuffer().then(function(buf){downloadBlob(new Blob([buf],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}),'comparativo-fundos-'+fileStamp()+'.xlsx');});
  }

  function fallbackSimpleExcel(model){
    return loadSheetJS().then(function(XLSX){
      var rows=[['Indicador'].concat(model.funds)];
      var current='';
      model.rows.forEach(function(r){
        if(r.section && r.section!==current){current=r.section;rows.push([current]);}
        rows.push([r.label].concat(r.values));
      });
      var ws=XLSX.utils.aoa_to_sheet(rows); ws['!cols']=[{wch:30}].concat(model.funds.map(function(){return {wch:28};}));
      var wb=XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb,ws,'Comparação'); XLSX.writeFile(wb,'comparativo-fundos-'+fileStamp()+'.xlsx');
    });
  }

  function fallbackCSV(model){
    var rows=[['Indicador'].concat(model.funds)];
    model.rows.forEach(function(r){rows.push([r.label].concat(r.values));});
    var csv='\ufeff'+rows.map(function(row){return row.map(function(v){return '"'+String(v||'').replace(/"/g,'""')+'"';}).join(';');}).join('\r\n');
    downloadBlob(new Blob([csv],{type:'text/csv;charset=utf-8;'}),'comparativo-fundos-'+fileStamp()+'.csv');
  }

  function exportExcel(button){
    if(!table) return;
    var model=exportModel(),original=button.innerHTML;
    button.disabled=true; button.textContent='Gerando…';
    loadExcelJS().then(function(ExcelJS){return buildExcelProfessional(ExcelJS,model);})
      .catch(function(){return fallbackSimpleExcel(model).catch(function(){fallbackCSV(model);});})
      .finally(function(){button.disabled=false;button.innerHTML=original;});
  }

  function onKeydown(ev){
    if(ev.key!=='Escape' || !isOpen()) return;
    var quick=document.getElementById('comparQuickAddV724');
    if(quick && !quick.hidden){
      var b=document.getElementById('comparQuickAddCloseV724');
      if(b){ev.preventDefault();b.click();return;}
    }
    ev.preventDefault(); closeComparator();
  }

  function bindObservers(){
    if(!overlay) return;
    overlayObserver=new MutationObserver(function(mutations){
      if(mutations.some(function(m){return m.type==='attributes'&&m.attributeName==='class';})) syncOpenState();
      syncFundCount();
      queueRefresh();
    });
    overlayObserver.observe(overlay,{attributes:true,attributeFilter:['class'],childList:true,subtree:true});
    if(table){tableObserver=new MutationObserver(function(){syncFundCount();queueRefresh();});tableObserver.observe(table,{childList:true,subtree:true,characterData:true});}
  }

  function wrapLegacyOpen(){
    if(typeof window.abrirComparador==='function' && !window.abrirComparador.__v820Wrapped){
      var originalOpen=window.abrirComparador;
      var wrapped=function(){
        portalOverlay();
        var result=originalOpen.apply(this,arguments);
        portalOverlay();
        requestAnimationFrame(function(){portalOverlay();syncOpenState();queueRefresh();});
        setTimeout(function(){portalOverlay();syncOpenState();queueRefresh();},30);
        return result;
      };
      wrapped.__v820Wrapped=true;window.abrirComparador=wrapped;
    }
  }

  function bindPortalObserver(){
    if(portalObserver || !document.body) return;
    portalObserver=new MutationObserver(function(){if(overlay && overlay.parentElement!==document.body) portalOverlay();});
    portalObserver.observe(document.body,{childList:true,subtree:true});
  }

  function init(){
    if(window.matchMedia && window.matchMedia('(max-width:768px)').matches) return;
    overlay=document.getElementById('comparOverlay'); table=document.getElementById('comparTable'); insights=document.getElementById('comparInsightsV728');
    if(!overlay) return;
    portalOverlay();
    requestAnimationFrame(portalOverlay);
    setTimeout(portalOverlay,30);
    setTimeout(portalOverlay,120);
    if(overlay.dataset.v820Bound==='1') return;
    overlay.dataset.v820Bound='1';
    removeOldExportUI(); injectExportButtons(); wrapLegacyOpen(); bindPortalObserver(); syncFundCount(); syncOpenState(); bindObservers(); queueRefresh();
    document.addEventListener('keydown',onKeydown,true);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true}); else init();
})();

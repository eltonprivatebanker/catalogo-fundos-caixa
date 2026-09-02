/* ============================================================
   V819 — COMPARADOR · MODO FOCO REAL + PDF/EXCEL PROFISSIONAIS
   - move o overlay diretamente para <body> e reforça o portal ao abrir
   - Esc fecha o comparador (ou fecha primeiro a busca rápida)
   - PDF usa uma janela de impressão dedicada, independente do CSS da página
   - Excel usa ExcelJS: abas Resumo e Comparação, estilos e impressão paisagem
   - fallback para XLSX simples/CSV se a biblioteca externa não estiver disponível
   ============================================================ */
(function comparadorV819(){
  'use strict';

  var overlay = null;
  var table = null;
  var insights = null;
  var lastFocused = null;
  var overlayObserver = null;
  var tableObserver = null;
  var excelPromise = null;
  var xlsxPromise = null;

  function cleanText(value){
    return String(value == null ? '' : value)
      .replace(/[ⓘ↗]/g,'')
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
    document.documentElement.classList.toggle('compar-v819-open',open);
    document.body.classList.toggle('compar-v819-open',open);
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
    if(!actions || !close || actions.querySelector('.compar-export-actions-v819')) return;

    var group=document.createElement('div');
    group.className='compar-export-actions-v819';
    group.setAttribute('role','group');
    group.setAttribute('aria-label','Exportar comparação');

    var pdf=document.createElement('button');
    pdf.type='button';
    pdf.className='compar-export-btn-v819';
    pdf.title='Imprimir ou salvar a comparação em PDF';
    pdf.setAttribute('aria-label','Gerar PDF da comparação');
    pdf.innerHTML='<span aria-hidden="true">↓</span> PDF';
    pdf.addEventListener('click',exportPDF);

    var excel=document.createElement('button');
    excel.type='button';
    excel.className='compar-export-btn-v819';
    excel.title='Baixar a comparação em Excel';
    excel.setAttribute('aria-label','Gerar Excel da comparação');
    excel.innerHTML='<span aria-hidden="true">↓</span> Excel';
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

  function exportModel(){
    var model={generated:new Date(),funds:[],summary:[],rows:[]};
    if(!table) return model;
    var header=table.querySelector('thead tr') || table.querySelector('tr');
    if(header){
      Array.from(header.children).slice(1).forEach(function(cell,i){ model.funds.push(fundNameFromCell(cell,i+1)); });
    }
    if(insights && !insights.hidden){
      Array.from(insights.querySelectorAll('.compar-kpi-v731')).forEach(function(card){
        model.summary.push({
          label:stripDecorative(card.querySelector('span') && card.querySelector('span').textContent),
          value:stripDecorative(card.querySelector('strong') && card.querySelector('strong').textContent),
          fund:stripDecorative(card.querySelector('small') && card.querySelector('small').textContent)
        });
      });
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

  function exportPDF(){
    if(!table) return;
    var win=window.open('','_blank','width=1280,height=800');
    if(!win){ alert('O navegador bloqueou a janela de impressão. Permita pop-ups para gerar o PDF.'); return; }
    var model=exportModel();
    win.document.open();
    win.document.write(buildPrintHTML(model));
    win.document.close();
    win.focus();
    setTimeout(function(){ try{ win.print(); }catch(_e){} },250);
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
    wb.creator='Catálogo de Fundos CAIXA';
    wb.created=model.generated;
    var navy='172033', navy2='0F172A', gold='C9973A', light='F5F7FA', grid='D6DBE5', green='047857', red='BE123C', gray='667085';

    var sum=wb.addWorksheet('Resumo',{views:[{showGridLines:false}]});
    sum.mergeCells('A1:D1'); sum.getCell('A1').value='Comparativo de fundos';
    sum.getCell('A1').font={bold:true,size:18,color:{argb:'FFFFFFFF'}}; sum.getCell('A1').fill={type:'pattern',pattern:'solid',fgColor:{argb:'FF'+navy}}; sum.getCell('A1').alignment={vertical:'middle'}; sum.getRow(1).height=28;
    sum.getCell('A2').value='Gerado em'; sum.getCell('B2').value=model.generated; sum.getCell('B2').numFmt='dd/mm/yyyy hh:mm';
    sum.getCell('A4').value='Destaque'; sum.getCell('B4').value='Valor'; sum.getCell('C4').value='Fundo';
    ['A4','B4','C4'].forEach(function(a){sum.getCell(a).font={bold:true,color:{argb:'FFFFFFFF'}};sum.getCell(a).fill={type:'pattern',pattern:'solid',fgColor:{argb:'FF'+navy2}};});
    model.summary.forEach(function(x,i){
      var r=5+i; sum.getCell(r,1).value=x.label; sum.getCell(r,2).value=x.value; sum.getCell(r,3).value=x.fund;
      [1,2,3].forEach(function(c){sum.getCell(r,c).border={bottom:{style:'thin',color:{argb:'FF'+grid}}};});
    });
    var noteRow=6+model.summary.length;
    sum.mergeCells(noteRow,1,noteRow,4); sum.getCell(noteRow,1).value='Dados para fins informativos e comparativos. Consulte os documentos oficiais do fundo antes da contratação.'; sum.getCell(noteRow,1).font={italic:true,color:{argb:'FF'+gray},size:9}; sum.getCell(noteRow,1).alignment={wrapText:true};
    sum.columns=[{width:28},{width:18},{width:42},{width:4}];
    sum.pageSetup={orientation:'landscape',paperSize:9,fitToPage:true,fitToWidth:1,fitToHeight:1,margins:{left:.3,right:.3,top:.5,bottom:.5,header:.2,footer:.2}};

    var ws=wb.addWorksheet('Comparação',{views:[{state:'frozen',xSplit:1,ySplit:1,showGridLines:false}]});
    var head=ws.addRow(['Indicador'].concat(model.funds));
    head.height=25;
    head.eachCell(function(cell){cell.font={bold:true,color:{argb:'FFFFFFFF'}};cell.fill={type:'pattern',pattern:'solid',fgColor:{argb:'FF'+navy}};cell.alignment={vertical:'middle',wrapText:true};cell.border={bottom:{style:'medium',color:{argb:'FF'+gold}}};});
    var current='';
    model.rows.forEach(function(row){
      if(row.section && row.section!==current){
        current=row.section;
        var sr=ws.addRow([current]);
        ws.mergeCells(sr.number,1,sr.number,model.funds.length+1);
        sr.getCell(1).font={bold:true,color:{argb:'FF8A641C'},size:9};
        sr.getCell(1).fill={type:'pattern',pattern:'solid',fgColor:{argb:'FFF1EBDD'}};
        sr.height=18;
      }
      var values=[row.label];
      var formats=[null];
      row.values.forEach(function(v){var x=excelCellValue(row.label,v);values.push(x.value);formats.push(x.numFmt||null);});
      var er=ws.addRow(values);
      er.getCell(1).font={bold:true,color:{argb:'FF344054'}};
      er.getCell(1).fill={type:'pattern',pattern:'solid',fgColor:{argb:'FF'+light}};
      er.eachCell(function(cell,c){
        cell.border={bottom:{style:'thin',color:{argb:'FF'+grid}}};
        cell.alignment={vertical:'middle',wrapText:true};
        if(formats[c-1]) cell.numFmt=formats[c-1];
        if(c>1 && typeof cell.value==='number') cell.font={bold:true,color:{argb:'FF'+(cell.value<0?red:(cell.value>0?green:'344054'))}};
      });
    });
    ws.getColumn(1).width=31;
    for(var c=2;c<=model.funds.length+1;c++) ws.getColumn(c).width=Math.max(24,Math.min(36,(model.funds[c-2]||'').length+8));
    ws.autoFilter={from:{row:1,column:1},to:{row:1,column:model.funds.length+1}};
    ws.pageSetup={orientation:'landscape',paperSize:9,fitToPage:true,fitToWidth:1,fitToHeight:0,margins:{left:.25,right:.25,top:.45,bottom:.45,header:.2,footer:.2}};
    ws.headerFooter={oddFooter:'&LComparativo de fundos&C&P de &N&R'+new Intl.DateTimeFormat('pt-BR').format(model.generated)};
    ws.properties.defaultRowHeight=20;
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
    });
    overlayObserver.observe(overlay,{attributes:true,attributeFilter:['class'],childList:true,subtree:true});
    if(table){tableObserver=new MutationObserver(syncFundCount);tableObserver.observe(table,{childList:true,subtree:true,characterData:true});}
  }

  function init(){
    if(window.matchMedia && window.matchMedia('(max-width:768px)').matches) return;
    overlay=document.getElementById('comparOverlay'); table=document.getElementById('comparTable'); insights=document.getElementById('comparInsightsV728');
    if(!overlay) return;
    portalOverlay();
    requestAnimationFrame(portalOverlay);
    setTimeout(portalOverlay,50);
    if(overlay.dataset.v819Bound==='1') return;
    overlay.dataset.v819Bound='1';
    removeOldExportUI(); injectExportButtons(); syncFundCount(); syncOpenState(); bindObservers();
    document.addEventListener('keydown',onKeydown,true);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true}); else init();
})();

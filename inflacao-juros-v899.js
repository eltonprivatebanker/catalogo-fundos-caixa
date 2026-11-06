/* V899 — interpreta o desvio da inflação em relação à faixa de tolerância.
   Somente lê os valores já existentes no painel; nunca altera índices ou gráficos. */
(function(){
  'use strict';
  if(window.__inflationV899Installed)return;
  window.__inflationV899Installed=true;
  var mq=window.matchMedia('(min-width:769px)');
  var queued=false;
  function parsePct(raw){
    var s=String(raw||'');
    var match=s.match(/[-+]?\s*\d+(?:[.,]\d+)?\s*%/);
    if(!match)return null;
    var v=Number(match[0].replace(/\s/g,'').replace('%','').replace(',','.'));
    return Number.isFinite(v)?v:null;
  }
  function pct(n){return n.toFixed(2).replace('.',',')+'%'}
  function pp(n){return Math.abs(n).toFixed(2).replace('.',',')+' p.p.'}
  function schedule(){
    if(queued)return;
    queued=true;
    requestAnimationFrame(function(){queued=false;apply()});
  }
  function apply(){
    if(!mq.matches)return;
    var card=document.getElementById('mobileIpcaMetaV400');
    if(!card)return;
    var summary=card.querySelector('#v860IpcaMetaSummary');
    var band=card.querySelector('.econ-meta-band-v378');
    if(!summary||!band)return;
    var currentNode=summary.querySelector('[data-v860-meta-current]');
    var targetNode=summary.querySelector('[data-v860-meta-target]');
    var statusNode=summary.querySelector('[data-v860-meta-status]');
    var limits=band.querySelectorAll('.econ-meta-item-v680 b');
    var lower=parsePct(limits[0]?.textContent);
    var upper=parsePct(limits[2]?.textContent);
    var current=parsePct(currentNode?.textContent);
    var target=parsePct(targetNode?.textContent);
    if(statusNode){
      var parent=statusNode.parentElement;
      var note=parent&&parent.querySelector('.v899-meta-delta');
      if(!note&&parent){
        note=document.createElement('small');
        note.className='v899-meta-delta';
        note.setAttribute('aria-live','polite');
        statusNode.insertAdjacentElement('afterend',note);
      }
      if(note){
        var label='',state='';
        if(current===null || upper===null || lower===null){
          note.hidden=true;
        }else{
          if(current>upper+0.0001){
            state='above';
            label=pp(current-upper)+' acima do limite superior ('+pct(upper)+').';
          }else if(current<lower-0.0001){
            state='below';
            label=pp(lower-current)+' abaixo do limite inferior ('+pct(lower)+').';
          }else{
            state='within';
            if(target!==null){
              if(Math.abs(current-target)<0.005)label='Na meta central de '+pct(target)+'.';
              else label=pp(current-target)+(current>target?' acima':' abaixo')+' da meta central ('+pct(target)+').';
            }else label='Dentro da faixa de tolerância.';
          }
          if(note.textContent!==label)note.textContent=label;
          if(note.dataset.status!==state)note.dataset.status=state;
          note.hidden=false;
        }
      }
    }
    /* Rótulos descritivos: não interferem na atualização dinâmica dos números. */
    var first=summary.querySelector('div:first-child small');
    var second=summary.querySelector('div:nth-child(2) small');
    if(first&&first.textContent!=='IPCA 12M')first.textContent='IPCA 12M';
    if(second&&second.textContent!=='Meta central')second.textContent='Meta central';
  }
  function init(){
    apply();
    var card=document.getElementById('mobileIpcaMetaV400');
    if(card && window.MutationObserver){
      var summary=card.querySelector('#v860IpcaMetaSummary');
      var band=card.querySelector('.econ-meta-band-v378');
      var current=summary?.querySelector('[data-v860-meta-current]');
      var target=summary?.querySelector('[data-v860-meta-target]');
      [current,target].forEach(function(node){
        if(node)new MutationObserver(schedule).observe(node,{childList:true,characterData:true,subtree:true});
      });
      if(band)new MutationObserver(schedule).observe(band,{childList:true,subtree:true,characterData:true});
    }
    var ranges=document.querySelectorAll('#mobileIpcaMetaV400 [data-dash-range-target="meta"]');
    ranges.forEach(function(button){button.addEventListener('click',schedule)});
    if(mq.addEventListener)mq.addEventListener('change',schedule);
    else if(mq.addListener)mq.addListener(schedule);
    window.addEventListener('pageshow',schedule,{passive:true});
    window.addEventListener('load',schedule,{once:true});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();

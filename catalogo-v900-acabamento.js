/* V900 — reforça semântica IPCA e abre as Fontes no próprio painel. */
(function(){
  'use strict';
  if(window.__v900FixInstalled)return;
  window.__v900FixInstalled=true;
  var labelObserver=null,dialog=null,lastTrigger=null;
  function fixIpcaLabel(){
    var card=document.getElementById('mobileIpcaMetaV400');
    var label=card&&card.querySelector('#v860IpcaMetaSummary > div:first-child > small');
    var value=card&&card.querySelector('[data-v860-meta-current]');
    if(label&&label.textContent!=='IPCA 12M')label.textContent='IPCA 12M';
    if(label)label.setAttribute('aria-label','IPCA acumulado em 12 meses');
    if(value)value.setAttribute('aria-label','Taxa do IPCA acumulada nos últimos 12 meses');
    if(label && !labelObserver && window.MutationObserver){
      labelObserver=new MutationObserver(function(){
        if(label.textContent!=='IPCA 12M')label.textContent='IPCA 12M';
      });
      labelObserver.observe(label,{childList:true,subtree:true,characterData:true});
    }
  }
  function createDialog(){
    if(dialog)return dialog;
    var footer=document.getElementById('siteSources');
    var body=footer&&footer.querySelector('.footer-clean-body');
    if(!body)return null;
    dialog=document.createElement('dialog');
    dialog.id='v900SourcesDialog';
    dialog.setAttribute('aria-labelledby','v900SourcesHeading');
    dialog.innerHTML='<div class="v900-sources-header"><div><h2 id="v900SourcesHeading">Fontes e transparência</h2><p>Dados públicos, finalidade informativa e limitações do painel.</p></div><button type="button" class="v900-sources-close" aria-label="Fechar Fontes">×</button></div><div class="v900-sources-content"></div>';
    dialog.querySelector('.v900-sources-content').appendChild(body.cloneNode(true));
    document.body.appendChild(dialog);
    dialog.querySelector('.v900-sources-close').addEventListener('click',function(){dialog.close()});
    dialog.addEventListener('click',function(ev){
      if(ev.target===dialog)dialog.close();
    });
    dialog.addEventListener('close',function(){
      if(lastTrigger&&lastTrigger.isConnected){
        try{lastTrigger.focus({preventScroll:true})}catch(_){lastTrigger.focus()}
      }
    });
    return dialog;
  }
  function openSources(){
    var d=createDialog();
    if(!d)return false;
    var footerDisclosure=document.getElementById('footerDisclaimer');
    if(footerDisclosure)footerDisclosure.open=true;
    if(!d.open)d.showModal();
    var btn=d.querySelector('.v900-sources-close');
    if(btn)btn.focus();
    return true;
  }
  function onNavClick(ev){
    var target=ev.target;
    var link=target&&target.closest&&target.closest('#desktopAnchorNavV131 a[data-anchor-target="siteSources"]');
    if(!link)return;
    ev.preventDefault();
    ev.stopImmediatePropagation();
    lastTrigger=link;
    openSources();
  }
  function init(){
    fixIpcaLabel();
    createDialog();
  }
  /* Captura anterior aos manipuladores antigos para não cair no roteamento
     do menu que só reconhece as telas Início/Catálogo/Rankings/Mercado. */
  window.addEventListener('click',onNavClick,true);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
  window.addEventListener('pageshow',fixIpcaLabel,{passive:true});
})();

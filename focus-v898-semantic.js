/* V898: leitura semântica a partir dos próprios valores e anos exibidos no Focus. */
(function(){
 'use strict';
 if(window.__focusV898Installed)return;
 window.__focusV898Installed=true;
 var media=window.matchMedia('(min-width:769px)'),grid=null,pending=false;
 var units={
  selic:'Meta Selic para dezembro · % a.a.',
  ipca:'Inflação acumulada no ano · %',
  cambio:'Cotação para dezembro · R$/US$',
  pib:'Crescimento real anual do PIB · %',
  igpm:'Inflação anual pelo IGP-M · %'
 };
 function key(card){
  var t=String(card.querySelector('.fcad-label')?.textContent||'').toLowerCase();
  if(t.includes('selic'))return 'selic';
  if(t.includes('ipca'))return 'ipca';
  if(t.includes('câmbio')||t.includes('cambio'))return 'cambio';
  if(t.includes('pib'))return 'pib';
  if(t.includes('igp-m'))return 'igpm';
  return '';
 }
 function num(s){
  var n=String(s||'').replace(/[^0-9,.\-+]/g,'');
  if(!n)return null;
  var x=Number(n.includes(',')?n.replace(/\./g,'').replace(',','.'):n);
  return Number.isFinite(x)?x:null;
 }
 function rows(card){
  return Array.from(card.querySelectorAll('.fcad-row')).map(function(r){
   var y=parseInt(r.querySelector('.fcad-year')?.textContent||'',10);
   var v=num(r.querySelector('.fcad-val')?.textContent);
   return Number.isFinite(y)&&v!==null?{year:y,value:v}:null;
  }).filter(Boolean);
 }
 function diff(a){return a&&a.length>=2?a[a.length-1].value-a[0].value:null}
 function summary(d){
  var s=diff(d.selic),i=diff(d.ipca),c=diff(d.cambio),p=d.pib;
  if(s===null||i===null||c===null||!p||p.length<2)return '';
  var t=[];
  if(s<0&&i<0)t.push('As medianas da Selic e do IPCA diminuem no horizonte');
  else if(s>0&&i>0)t.push('As medianas da Selic e do IPCA aumentam no horizonte');
  else t.push('Selic e IPCA apresentam trajetórias distintas nas projeções');
  t.push(c>.03?'o câmbio projetado sobe':c<-.03?'o câmbio projetado recua':'o câmbio projetado permanece praticamente estável');
  var low=p.reduce(function(a,b){return b.value<a.value?b:a;},p[0]),last=p[p.length-1];
  if(low.year>p[0].year&&low.year<last.year&&last.value>low.value)t.push('o crescimento do PIB desacelera até '+low.year+' e depois se recupera');
  else if(last.value>p[0].value)t.push('o crescimento projetado do PIB aumenta');
  else if(last.value<p[0].value)t.push('o crescimento projetado do PIB diminui');
  else t.push('o crescimento do PIB termina próximo do valor inicial');
  return t.join('; ')+'.';
 }
 function set(el,value){if(el&&el.textContent!==value)el.textContent=value}
 function apply(){
  pending=false;
  if(!media.matches||!grid)return;
  var cards=Array.from(grid.querySelectorAll('.focus-card-v802'));
  if(cards.length<5)return;
  var d={};
  cards.forEach(function(card){
   var k=key(card),label=card.querySelector('.fcad-label');if(!k||!label)return;
   d[k]=rows(card);
   var sub=card.querySelector('.v898-focus-unit');
   if(!sub){sub=document.createElement('div');sub.className='v898-focus-unit';label.insertAdjacentElement('afterend',sub)}
   set(sub,units[k]);
  });
  var text=summary(d);
  if(text)set(grid.querySelector('.focus-summary-copy-v802 > p'),text);
  var first=grid.querySelector('.focus-summary-v802');
  if(first){
   var note=document.getElementById('v898FocusBasis');
   if(!note){note=document.createElement('p');note.className='v898-focus-basis';note.id='v898FocusBasis';first.insertAdjacentElement('afterend',note)}
   var years=Object.values(d).flat().map(function(x){return x.year});
   var from=years.length?Math.min.apply(null,years):2026,to=years.length?Math.max.apply(null,years):2029;
   set(note,'Como ler as setas: diferenças entre as projeções para '+from+' e '+to+'; não representam revisões semanais.');
  }
 }
 function schedule(){if(!pending){pending=true;requestAnimationFrame(apply)}}
 function init(){
  grid=document.getElementById('focusGrid');
  var title=document.querySelector('#sec-focus .focus-title-line');
  if(title&&!document.getElementById('v898FocusIntro')){
   var p=document.createElement('p');p.className='v898-focus-intro';p.id='v898FocusIntro';
   p.textContent='Medianas das expectativas do mercado para juros, inflação, câmbio e atividade econômica. Não são projeções oficiais do Banco Central.';
   title.insertAdjacentElement('afterend',p);
  }
  apply();
  if(grid&&window.MutationObserver)new MutationObserver(schedule).observe(grid,{childList:true,subtree:false});
  if(media.addEventListener)media.addEventListener('change',schedule);
  else if(media.addListener)media.addListener(schedule);
  window.addEventListener('pageshow',schedule,{passive:true});
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
 else init();
})();

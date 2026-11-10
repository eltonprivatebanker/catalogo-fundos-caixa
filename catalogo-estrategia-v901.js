/* V901 — filtro experimental pelo campo Estratégia de dados_atuais.csv.
   Sem alterar o motor de cálculo, os dados ou os demais módulos. */
(function(){
'use strict';
const $=id=>document.getElementById(id);
const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\s+/g,' ').trim();
const digits=s=>String(s||'').replace(/\D/g,'');
let records=[], selected=new Set(), ready=false, nativePerPage=null, scheduled=false;
function parseCSV(text){
  if(window.Papa&&Papa.parse) return Papa.parse(text,{header:true,skipEmptyLines:true}).data;
  throw new Error('PapaParse indisponível');
}
function getCnpj(s){const m=String(s||'').match(/\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}/);return m?digits(m[0]):''}
function build(){
  const host=$('fundFilterShell'),existing=$('strategyFilterV901');
  if(!host||existing)return;
  const target=host.querySelector('.fund-secondary-controls-v217');
  if(!target)return;
  const block=document.createElement('div');block.id='strategyFilterV901';
  block.innerHTML='<span class="strategy-label">Estratégia</span><div class="strategy-picker"><button type="button" id="strategyToggleV901" aria-expanded="false" aria-controls="strategyMenuV901"><span id="strategyLabelV901">Todas as estratégias</span><span aria-hidden="true">⌄</span></button><div id="strategyMenuV901" hidden><input id="strategySearchV901" type="search" placeholder="Buscar estratégia..." aria-label="Buscar estratégias"><div id="strategyOptionsV901"></div></div></div><div class="strategy-tools"><button type="button" id="strategyClearV901">Limpar</button><span id="strategyCountV901" role="status" aria-live="polite">Carregando estratégias...</span></div>';
  target.insertAdjacentElement('afterend',block);
  $('strategyToggleV901').addEventListener('click',()=>{$('strategyMenuV901').hidden=!$('strategyMenuV901').hidden;$('strategyToggleV901').setAttribute('aria-expanded',String(!$('strategyMenuV901').hidden));if(!$('strategyMenuV901').hidden)$('strategySearchV901').focus()});
  $('strategySearchV901').addEventListener('input',renderOptions);
  $('strategyClearV901').addEventListener('click',()=>{selected.clear();renderOptions();apply()});
  document.addEventListener('pointerdown',e=>{if(!block.contains(e.target))closeMenu()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
}
function closeMenu(){const m=$('strategyMenuV901');if(m){m.hidden=true;$('strategyToggleV901').setAttribute('aria-expanded','false')}}
function renderOptions(){
  if(!$('strategyOptionsV901'))return;
  const q=norm($('strategySearchV901').value);
  const opts=[...new Set(records.map(x=>x.strategy).filter(Boolean))].sort((a,b)=>a.localeCompare(b,'pt-BR')).filter(x=>norm(x).includes(q));
  const root=$('strategyOptionsV901');root.replaceChildren();
  if(!opts.length){root.textContent='Nenhuma estratégia encontrada';return}
  opts.forEach(value=>{const label=document.createElement('label');const cb=document.createElement('input');cb.type='checkbox';cb.checked=selected.has(value);cb.addEventListener('change',()=>{if(cb.checked)selected.add(value);else selected.delete(value);apply()});const span=document.createElement('span');span.textContent=value;label.append(cb,span);root.append(label)});
}
function derive(row){
 const txt=row.textContent||'';
 const cnpj=getCnpj(txt);
 if(cnpj)return records.find(x=>x.cnpj===cnpj);
 // fallback apenas quando há correspondência inequívoca do nome
 const name=norm(row.querySelector('strong, .fund-name, .fund-name-cell')?.textContent||'');
 return name?records.find(x=>norm(x.name)===name):undefined;
}
function apply(){
 if(!$('strategyLabelV901'))return;
 const active=selected.size>0;
 $('strategyLabelV901').textContent=!active?'Todas as estratégias':selected.size===1?[...selected][0]:selected.size+' estratégias selecionadas';
 if(!ready){$('strategyCountV901').textContent='Dados indisponíveis';return}
 const per=$('perPage');
 if(per){
   if(active&&nativePerPage===null){nativePerPage=per.value;if(per.value!=='9999'){per.value='9999';per.dispatchEvent(new Event('change',{bubbles:true}))}}
   if(!active&&nativePerPage!==null){const prev=nativePerPage;nativePerPage=null;per.value=prev;per.dispatchEvent(new Event('change',{bubbles:true}))}
 }
 let visible=0, total=0, lastShow=false, unknown=0;
 const rows=[...document.querySelectorAll('#tableBody > tr')];
 rows.forEach(row=>{
   const rec=derive(row);
   // Uma linha de detalhe sem identificador acompanha a linha principal anterior.
   const hasIdentity=!!getCnpj(row.textContent||'')||!!row.querySelector('.fund-name');
   if(rec){lastShow=!active||selected.has(rec.strategy);total++;if(lastShow)visible++}
   else if(hasIdentity){lastShow=!active;unknown++}
   row.classList.toggle('strategy-hidden-v901',active&&!lastShow);
 });
 // Modo mobile usa cartões próprios (vinculados preferencialmente por CNPJ).
 document.querySelectorAll('#mobileFundCards > *').forEach(card=>{
   const rec=derive(card);
   card.classList.toggle('strategy-hidden-v901',active&&(!rec||!selected.has(rec.strategy)));
 });
 $('strategyCountV901').textContent=active?(visible+' fundo(s) na tabela'+(unknown?' · '+unknown+' sem correspondência':'')):(records.length+' registros com estratégia');
}
function schedule(){if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;apply()})}
async function start(){
 build();
 try{
   const response=await fetch('./dados_atuais.csv?v=901-'+Date.now(),{cache:'no-store'});
   if(!response.ok)throw new Error('HTTP '+response.status);
   const data=parseCSV(await response.text());
   records=data.map(row=>({cnpj:digits(row.CNPJ),name:row.Fundo||'',strategy:(row['Estratégia']||'').trim()})).filter(x=>x.cnpj&&x.strategy);
   ready=true;renderOptions();apply();
 }catch(e){console.error('[V901] Estratégia:',e);$('strategyCountV901').textContent='Não foi possível carregar o CSV';return}
 const body=$('tableBody'),cards=$('mobileFundCards');
 [body,cards].filter(Boolean).forEach(el=>new MutationObserver(schedule).observe(el,{childList:true,subtree:true}));
 ['searchInput','catalogRiskSelectV198'].forEach(id=>$(id)?.addEventListener('input',schedule));
 $('fundFilterShell')?.addEventListener('click',e=>{if(e.target.closest('[data-preset],[data-audience-v488],#clearFiltersTop'))setTimeout(schedule,80)});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
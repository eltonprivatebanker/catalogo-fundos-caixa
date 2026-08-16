/* IPCA-15 TESTE v708 — leitura, comparação e educação do usuário */
(function ipca15TesteV708(){
  'use strict';

  const BUILD = 'ELTAUM_IPCA15_TESTE_V708';

  /* Calendário oficial IBGE de divulgações restantes em 2026.
     Mantido aqui apenas para a página de teste/explicação visual. */
  const CAL_IPCA15 = [
    {competencia:'202608', data:'2026-08-26'},
    {competencia:'202609', data:'2026-09-25'},
    {competencia:'202610', data:'2026-10-23'},
    {competencia:'202611', data:'2026-11-26'},
    {competencia:'202612', data:'2026-12-23'}
  ];

  const CAL_IPCA = [
    {competencia:'202608', data:'2026-09-11'},
    {competencia:'202609', data:'2026-10-09'},
    {competencia:'202610', data:'2026-11-12'},
    {competencia:'202611', data:'2026-12-11'},
    {competencia:'202612', data:'2027-01-12'}
  ];

  function byId(id){ return document.getElementById(id); }

  function pct(v){
    const n = Number(v);
    if(!Number.isFinite(n)) return '—';
    const s = n > 0 ? '+' : '';
    return s + n.toFixed(2).replace('.', ',') + '%';
  }

  function parsePct(text){
    const m = String(text || '').match(/(-?\d+(?:[.,]\d+)?)\s*%/);
    if(!m) return null;
    const n = Number(m[1].replace(',', '.'));
    return Number.isFinite(n) ? n : null;
  }

  function labelCompetencia(c){
    const s = String(c || '');
    if(!/^\d{6}$/.test(s)) return s || '—';
    const nomes = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
    const ano = s.slice(0,4);
    const mes = Number(s.slice(4,6));
    return mes >= 1 && mes <= 12 ? `${nomes[mes-1]}/${ano}` : s;
  }

  function fmtDate(iso){
    const [y,m,d] = iso.split('-');
    return `${d}/${m}/${y}`;
  }

  function nextRelease(cal){
    const today = new Date();
    const local = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
    return cal.find(x => {
      const [y,m,d] = x.data.split('-').map(Number);
      return new Date(y,m-1,d).getTime() >= local;
    }) || cal[cal.length-1];
  }

  function renderCalendar(){
    const p = nextRelease(CAL_IPCA15);
    const o = nextRelease(CAL_IPCA);

    if(byId('ipcaNextPreviewV708')){
      byId('ipcaNextPreviewV708').textContent =
        `Próxima: ${labelCompetencia(p.competencia)} · ${fmtDate(p.data)}`;
    }
    if(byId('ipcaNextOfficialV708')){
      byId('ipcaNextOfficialV708').textContent =
        `Próxima: ${labelCompetencia(o.competencia)} · ${fmtDate(o.data)}`;
    }
  }

  function official12m(){
    /* O card da meta mantém sempre a leitura oficial em 12 meses,
       mesmo quando o usuário alterna 12/24/36 meses no gráfico mensal. */
    const note = byId('evoCardMetaNote');
    return parsePct(note ? note.textContent : '');
  }

  function renderComparison(ipca15_12m){
    const out = byId('ipca15CompareTextV708');
    if(!out) return;

    const oficial = official12m();
    const previa = Number(ipca15_12m);

    if(!Number.isFinite(oficial) || !Number.isFinite(previa)){
      out.textContent = 'Aguardando a leitura do IPCA oficial em 12 meses.';
      return;
    }

    const diff = previa - oficial;
    const abs = Math.abs(diff).toFixed(2).replace('.', ',');

    if(Math.abs(diff) < 0.005){
      out.textContent = `IPCA-15 e IPCA oficial em 12M estão praticamente no mesmo nível (${pct(previa)} vs. ${pct(oficial)}).`;
    }else if(diff > 0){
      out.textContent = `Prévia está ${abs} p.p. acima do IPCA oficial em 12M (${pct(previa)} vs. ${pct(oficial)}).`;
    }else{
      out.textContent = `Prévia está ${abs} p.p. abaixo do IPCA oficial em 12M (${pct(previa)} vs. ${pct(oficial)}).`;
    }
  }

  function watchOfficial(ipca15_12m){
    const note = byId('evoCardMetaNote');
    if(!note) return;
    renderComparison(ipca15_12m);
    const obs = new MutationObserver(() => renderComparison(ipca15_12m));
    obs.observe(note, {childList:true, subtree:true, characterData:true});
  }

  function setStatus(error){
    const card = byId('ipca15PreviewV708');
    if(card){
      card.classList.toggle('is-error', !!error);
      card.classList.remove('is-loading');
    }
  }

  async function carregar(){
    const card = byId('ipca15PreviewV708');
    if(!card) return;

    renderCalendar();

    try{
      const r = await fetch(`ipca15.json?v=${Date.now()}`, {cache:'no-store'});
      if(!r.ok) throw new Error(`HTTP ${r.status}`);

      const dados = await r.json();
      const atual = dados && dados.atual;

      if(!atual || !atual.competencia){
        byId('ipca15PeriodoV708').textContent = 'Aguardando primeira coleta automática';
        setStatus(false);
        return;
      }

      byId('ipca15PeriodoV708').textContent =
        `${labelCompetencia(atual.competencia)} · divulgado pelo IBGE`;

      byId('ipca15MensalV708').textContent = pct(atual.mensal);
      byId('ipca15AnoV708').textContent = pct(atual.acumulado_ano);
      byId('ipca15DozeV708').textContent = pct(atual.acumulado_12m);

      watchOfficial(atual.acumulado_12m);

      card.dataset.ipca15Ready = '1';
      setStatus(false);
      console.info('[Catálogo CAIXA] IPCA-15 v708 carregado:', atual);
    }catch(err){
      console.warn('[Catálogo CAIXA] Falha ao carregar ipca15.json:', err);
      byId('ipca15PeriodoV708').textContent = 'IPCA-15 temporariamente indisponível';
      const compare = byId('ipca15CompareTextV708');
      if(compare) compare.textContent = 'A prévia não pôde ser carregada; o IPCA oficial permanece disponível normalmente.';
      setStatus(true);
    }
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', carregar, {once:true});
  }else{
    carregar();
  }

  window.__ELTAUM_IPCA15_TESTE_V708__ = {
    build:BUILD,
    carregar,
    renderCalendar
  };
})();

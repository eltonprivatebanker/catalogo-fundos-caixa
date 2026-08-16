/* IPCA-15 TESTE v707 — isolado da aplicação principal */
(function ipca15TesteV707(){
  'use strict';

  const BUILD = 'ELTAUM_IPCA15_TESTE_V707';

  function byId(id){ return document.getElementById(id); }

  function pct(v){
    const n = Number(v);
    if(!Number.isFinite(n)) return '—';
    const s = n > 0 ? '+' : '';
    return s + n.toFixed(2).replace('.', ',') + '%';
  }

  function labelCompetencia(c){
    const s = String(c || '');
    if(!/^\d{6}$/.test(s)) return s || '—';
    const nomes = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
    const ano = s.slice(0,4);
    const mes = Number(s.slice(4,6));
    return mes >= 1 && mes <= 12 ? `${nomes[mes-1]}/${ano}` : s;
  }

  function setStatus(text, error){
    const card = byId('ipca15PreviewV707');
    const status = byId('ipca15StatusV707');
    if(status) status.textContent = text;
    if(card){
      card.classList.toggle('is-error', !!error);
      card.classList.remove('is-loading');
    }
  }

  async function carregar(){
    const card = byId('ipca15PreviewV707');
    if(!card) return;

    try{
      const url = `ipca15.json?v=${Date.now()}`;
      const r = await fetch(url, {cache:'no-store'});
      if(!r.ok) throw new Error(`HTTP ${r.status}`);

      const dados = await r.json();
      const atual = dados && dados.atual;

      if(!atual || !atual.competencia){
        byId('ipca15PeriodoV707').textContent = 'Aguardando primeira coleta automática';
        setStatus('Execute manualmente o workflow “IPCA-15 · IBGE” no GitHub Actions para gerar a primeira leitura.', false);
        return;
      }

      byId('ipca15PeriodoV707').textContent =
        `${labelCompetencia(atual.competencia)} · divulgado pelo IBGE`;

      byId('ipca15MensalV707').textContent = pct(atual.mensal);
      byId('ipca15AnoV707').textContent = pct(atual.acumulado_ano);
      byId('ipca15DozeV707').textContent = pct(atual.acumulado_12m);

      const gerado = dados.gerado_em_utc
        ? new Date(dados.gerado_em_utc).toLocaleString('pt-BR', {dateStyle:'short', timeStyle:'short'})
        : '';

      setStatus(
        `Prévia mensal · fonte IBGE/SIDRA${gerado ? ` · arquivo atualizado em ${gerado}` : ''}. ` +
        `O IPCA oficial permanece como referência principal.`,
        false
      );

      card.dataset.ipca15Ready = '1';
      console.info('[Catálogo CAIXA] IPCA-15 teste carregado:', atual);
    }catch(err){
      console.warn('[Catálogo CAIXA] Falha ao carregar ipca15.json:', err);
      byId('ipca15PeriodoV707').textContent = 'IPCA-15 temporariamente indisponível';
      setStatus('A prévia não pôde ser carregada. O restante da página continua funcionando normalmente.', true);
    }
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', carregar, {once:true});
  }else{
    carregar();
  }

  window.__ELTAUM_IPCA15_TESTE_V707__ = {build:BUILD, carregar};
})();

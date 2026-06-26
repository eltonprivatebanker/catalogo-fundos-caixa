// ELTAUM_REMOVE_12M_XAXIS_v342
// ELTAUM_INFLATION_SUMMARY_COMPACT_v341
// ELTAUM_CHARTS_LOOP_FIX_v340
// ELTAUM_CHARTS_TABS_FIX_v339
// ELTAUM_INFLATION_RATES_CLEAN_v338
// ELTAUM_DOLAR_CHART_CLOSED_v337
// ELTAUM_DOLAR_BADGE_MONTHS_v336
// ELTAUM_DOLAR_XAXIS_MOBILE_v335
// ELTAUM_DOLAR_CHART_STATS_v334
// ELTAUM_DOLAR_EXECUTIVE_MOBILE_v333
// ELTAUM_MARKET_MICROCOPY_FORCE_v332
// ELTAUM_MARKET_CARD_156_v331
// ELTAUM_MARKET_CARD_WIDTH_UNIFORM_v330
// ELTAUM_MARKET_MICROCOPY_CLEAN_v329
// ELTAUM_SAVINGS_MICRO_POLISH_v327
// ELTAUM_SAVINGS_SCENARIOS_POLISH_v326
// ELTAUM_SAVINGS_CLEAN_MOBILE_v325
// ELTAUM_CDI_SEMANTIC_CARDS_v324
// ELTAUM_CDI_12M_FIX_v323
// ELTAUM_CDI_MONTH_CAROUSEL_v322
// ELTAUM_COPOM_CAROUSEL_v321
// ELTAUM_REMOVE_NEXT_SUMMARY_v320
// ELTAUM_MARKET_RATES_GRID_FORCE_v319
// ELTAUM_MARKET_RATES_COMPACT_v318
// ELTAUM_RANKING_MARKET_CLEAN_v317
// ELTAUM_MARKET_MOBILE_CARD_SYSTEM_v316
// ELTAUM_RANKING_PROFESSIONAL_BREATH_v315
// ELTAUM_PAGINATION_RANKING_TIGHT_v314
// ELTAUM_RANKING_GAP_CLEANUP_v312
// SUMMARY_HEAD_REMOVED_v311
// ELTAUM_SUMMARY_ICON_DEDUP_v310
// ELTAUM_RANKING_HERO_SPACING_v309
// ELTAUM_REMOVE_GFB_FULL_v308
// ELTAUM_REMOVE_GFB_TOP_v307
// ELTAUM_TITLE_HERO_LEVELS_v306
// ELTAUM_RANKING_HERO_ICON_v305
// ELTAUM_CARD_TITLE_SYSTEM_v304
// ELTAUM_TITLE_NORMALIZED_JS_v303
// ELTAUM_TITLE_UNIFIED_v302
// ELTAUM_SECTION_TITLE_FORCE_v301
// ELTAUM_SECTION_TITLE_SYSTEM_v300
// ELTAUM_CDI_MOBILE_CANVAS_FIX_v299
// ELTAUM_CDI_MOBILE_SEMANTIC_v298
// ELTAUM_CDI_MOBILE_BARS_v297
// ELTAUM_CDI_MOBILE_COMPACT_v296
// ELTAUM_RANKING_INSIGHT_PREMIUM_v295
// ELTAUM_MOBILE_HIDE_GFB_SEARCH_v294
// ELTAUM_RANKING_INSIGHT_STABLE_v293
// ELTAUM_RANKING_VALUE_STANDARD_v292
// ELTAUM_RANKING_VALUES_COMPACT_v291
// ELTAUM_RANKING_TIGHT_UNIFORM_v290
// ELTAUM_RANKING_UNIFORM_FINAL_v289
// ELTAUM_RANKING_PL_COMPACT_v288
// ELTAUM_RANKING_SCALE_FINAL_v287
// ELTAUM_RANKING_VALUE_FIX_v286
// ELTAUM_RANKING_PROPORTION_v285
// ELTAUM_RANKING_PREMIUM_v284
// ELTAUM_RANKING_MOBILE_REFINEMENT_v283
// ELTAUM_RANKING_MOBILE_STANDARD_20260619_v282
// ELTAUM_RANKING_MOBILE_VALUE_RIGHT_20260619_v280
// ELTAUM_LAYOUT_EXECUTIVO_20260618_v279
// ELTAUM_PALETTE_APPLIED_20260618_v278
// ELTAUM_RATES_EXECUTIVE_LEAN_20260618_v268
// ELTAUM_RATES_DECOMPRESSED_20260618_v267
// ELTAUM_DESKTOP_RATES_REFINE_20260618_v266
// ELTAUM_COMPACT_MOBILE_20260618_v265
// ELTAUM_RATES_CDI_REAL_20260618_v264
// ELTAUM_RATES_SCROLL_FIX_20260618_v263
// ELTAUM_RATES_PREMIUM_20260618_v261
// ELTAUM_RATES_MOBILE_COMPACT_20260618_v260
// ELTAUM_SELIC_MOBILE_FIT_20260618_v258
// ELTAUM_RATES_REFERENCE_STABLE_20260618_v257
// ELTAUM_RATES_REFERENCE_CLEAN_20260618_v256
// ELTAUM_RATES_REFERENCE_EXEC_20260618_v255
// ELTAUM_FOOTER_PRIVACY_20260618_v254
// ELTAUM_SELIC_AXIS_LABELS_20260618_v253
// ELTAUM_IPCA_SUMMARY_LABEL_FIX_20260618_v252
// ELTAUM_IPCA_CHART_FIX_20260618_v251
// ELTAUM_IPCA_CHART_SUMMARY_20260618_v250
// ELTAUM_SELIC_PERIODS_20260618_v249
// ELTAUM_SELIC_VIGENTE_SYNC_20260618_v248
// ELTAUM_DOLAR_MOBILE_EXECUTIVE_20260618_v247
// ELTAUM_DOLAR_MOBILE_TYPOGRAPHY_20260618_v246
// ELTAUM_FUND_MOBILE_CNPJ_20260618_v238
// ELTAUM_CDI_CURRENT_CONTEXT_20260618_v233
// ELTAUM_CDI_DAILY_AUTO_REFRESH_20260618_v232
// ELTAUM_NUMERIC_LEGIBILITY_20260618_v231
// ELTAUM_MARKET_PERIOD_CDI_SOURCE_20260618_v230
// ELTAUM_CDI_MONTH_ORDER_20260617_v216
// ELTAUM_MARKET_REFERENCE_EXECUTIVE_20260612_v167
// ELTAUM_MOBILE_PREMIUM_FILTERS_CARDS_20260606_v68
/* PATCH v19 — Topo de mercado reorganizado + CDI sem encavalamento */
function toggleSection(b,c){
  var bd=document.getElementById(b),ct=document.getElementById(c);
  if(!bd)return false;
  var h=bd.hasAttribute('hidden');
  h?bd.removeAttribute('hidden'):bd.setAttribute('hidden','');
  if(ct){ct.classList.toggle('section-expanded',h);ct.setAttribute('aria-expanded',h?'true':'false');}
  var btn=ct?ct.querySelector('.section-toggle-btn'):null;
  if(btn)btn.setAttribute('aria-expanded',h?'true':'false');
  var l=btn?btn.querySelector('.toggle-label'):(ct?ct.querySelector('.toggle-label'):null);
  var openLabel=btn&&btn.dataset.labelOpen?btn.dataset.labelOpen:'Ver menos';
  var closedLabel=btn&&btn.dataset.labelClosed?btn.dataset.labelClosed:'Ver mais';
  if(l)l.textContent=h?openLabel:closedLabel;
  return false;
}
window.toggleSection=toggleSection;

function handleSectionToggleClick(event, bodyId, containerId){
  if(event){
    var target = event.target;
    var current = event.currentTarget;
    var toggleBtn = target && target.closest ? target.closest('.section-toggle-btn') : null;
    var interactive = target && target.closest ? target.closest('button,a,input,select,textarea,label,[data-no-section-toggle]') : null;

    // Botões internos (12M/24M/36M, Print, WhatsApp etc.) não podem acionar o abre/fecha do bloco pai.
    if(interactive && interactive !== current && !toggleBtn){
      if(typeof event.stopPropagation === 'function') event.stopPropagation();
      return false;
    }

    if(typeof event.preventDefault === 'function') event.preventDefault();
    if(typeof event.stopPropagation === 'function') event.stopPropagation();
  }
  return toggleSection(bodyId, containerId);
}
window.handleSectionToggleClick=handleSectionToggleClick;
/* ════════════════════════════════════════════════════
   UTILITÁRIOS
════════════════════════════════════════════════════ */
const BASE_URL = window.location.protocol === 'file:'
  ? 'https://raw.githubusercontent.com/eltonprivatebanker/catalogo-fundos-caixa/main/'
  : '';

const $ = id => document.getElementById(id);
const fmt = (v,dec=2,suf='%') => {
  if(v===null||v===undefined||v==='') return '—';
  return Number(v).toFixed(dec).replace('.',',')+suf;
};
const fmtBRL = v => v===null||v===undefined ? '—' : Number(v).toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2});
const fmtBRL4 = v => v===null||v===undefined ? '—' : Number(v).toLocaleString('pt-BR',{minimumFractionDigits:4,maximumFractionDigits:4});
const brl = v => v===null||v===undefined || Number.isNaN(Number(v)) ? '—' : 'R$\u00a0' + fmtBRL(v);
const fmtPLBilhoes = v => {
  const n = Number(v);
  if(!Number.isFinite(n) || n <= 0) return '—';
  return 'R$\u00a0' + (n/1000).toLocaleString('pt-BR',{minimumFractionDigits:1,maximumFractionDigits:1}) + ' bi';
};
const fmtPLMilhoes = v => {
  const n = Number(v);
  if(!Number.isFinite(n) || n <= 0) return 'patrimônio consolidado';
  return n.toLocaleString('pt-BR',{maximumFractionDigits:0}) + ' mi · patrimônio consolidado';
};
const fmtDataBR = d => `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;
const fmtK   = v => v===null||v===undefined ? '—' : Number(v).toLocaleString('pt-BR',{maximumFractionDigits:0});
const clsPct = n => n>0?'pos':n<0?'neg':'zero';
const signPct = n => n>0?'+':'';

const MESES_PT = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
const MESES_FULL = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];

/* Data atual do sistema */
const HOJE = new Date();
const ANO_ATUAL = HOJE.getFullYear();

/* ════════════════════════════════════════════════════
   ESTADO GLOBAL DOS INDICADORES (para tabs 12M/24M/36M)
════════════════════════════════════════════════════ */
const indicState = {
  cdi:  { m12: null, m24: null, m36: null, mes: null, mesRef: null },
  ipca: { m12: null, m24: null, m36: null, mes: null, ano: null, mesRef: null },
  dolarBRL: { mes: null, ano: null, m12: null, m24: null, m36: null },
  dolarPct: { mes: null, ano: null, m12: null, m24: null, m36: null },
};
let activePeriodTab = 12; // 12, 24 ou 36
let _ptaxHistorico = []; // cache para uso nos tabs

/* ════════════════════════════════════════════════════
   v232 — FONTE ÚNICA DO CDI DO MÊS ATUAL
   Utilizada pela visão executiva, tabela analítica e atualização automática.
════════════════════════════════════════════════════ */
function obterCdiAtualV232(dados){
  let base = dados;
  if(!base){
    try{ base = _dadosMercado; }catch(e){ base = null; }
  }
  const card = base?.cards?.cdi || window.__mercadoAtualV230?.cards?.cdi || {};
  const valorRaw = card.parcial_mes_atual;
  const valor = valorRaw === null || valorRaw === undefined || valorRaw === ''
    ? null
    : Number(valorRaw);
  const data = String(card.parcial_ate || '').trim() || null;
  const dataIso = String(card.parcial_data_iso || '').trim() || null;
  const referencia = String(card.parcial_ref || '').trim() || null;
  const origem = String(card.parcial_origem || '').trim() || null;
  const consultadoEm = String(card.consultado_em || base?.atualizado_em || '').trim() || null;
  return {
    valor: Number.isFinite(valor) ? valor : null,
    data,
    dataIso,
    referencia,
    origem,
    consultadoEm,
    diasUteis: Number.isFinite(Number(card.parcial_dias_uteis)) ? Number(card.parcial_dias_uteis) : null,
    status: Number.isFinite(valor) ? 'parcial' : 'aguardando'
  };
}
window.obterCdiAtualV232 = obterCdiAtualV232;

/* ════════════════════════════════════════════════════
   v233 — CONTEXTO CLARO DO CDI PARCIAL
   Distingue o valor acumulado no mês da data/referência
   da última observação disponível.
════════════════════════════════════════════════════ */
function contextoCdiAtualV233(info){
  const source = String(info?.origem || '').trim();
  const reference = String(info?.referencia || '').trim();
  const rawDate = String(info?.data || '').trim();
  const shortDate = /^\d{2}\/\d{2}/.test(rawDate) ? rawDate.slice(0, 5) : '';

  let stale = false;
  if(info?.dataIso){
    const parsed = new Date(`${info.dataIso}T12:00:00`);
    if(!Number.isNaN(parsed.getTime())){
      stale = (Date.now() - parsed.getTime()) > (3 * 24 * 60 * 60 * 1000);
    }
  }

  const monthlyMarker = /4391/i.test(source) && /^01\//.test(rawDate);
  let detail = 'Atualização parcial';

  if(monthlyMarker && reference){
    detail = `Atualização parcial de ${reference}`;
  }else if(shortDate){
    detail = stale
      ? `Última referência disponível: ${shortDate}`
      : `Dados disponíveis até ${shortDate}`;
  }else if(reference){
    detail = `Atualização parcial de ${reference}`;
  }

  return {
    title: 'Acumulado no mês',
    detail,
    shortDate,
    stale,
    monthlyMarker
  };
}
window.contextoCdiAtualV233 = contextoCdiAtualV233;

/* ════════════════════════════════════════════════════
   v230 — CDI DINÂMICO COM FONTE ÚNICA E RECARGA SEGURA
   - centraliza 12M/24M/36M em um cache próprio;
   - lê diretamente cards.cdi.acum_12m/24m/36m;
   - recompõe pelo histórico mensal quando necessário;
   - refaz somente a leitura de mercado_atual.json se o período estiver vazio;
   - elimina dependência da ordem de carregamento do painel.
════════════════════════════════════════════════════ */
const CDI_PERIOD_OPTIONS_V229 = Object.freeze([12, 24, 36]);
const cdiPeriodoCacheV230 = Object.seal({ 12: null, 24: null, 36: null });
let cdiRefreshPromiseV230 = null;

function numeroFinitoV229(value){
  if(value === null || value === undefined || value === '') return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function chaveMesDeRotuloV229(label){
  const match = String(label || '').trim().toLowerCase().match(/(jan|fev|mar|abr|mai|jun|jul|ago|set|out|nov|dez)\/(\d{4})/);
  if(!match) return null;
  const monthIndex = MESES_PT.indexOf(match[1]);
  return monthIndex >= 0 ? `${match[2]}-${String(monthIndex + 1).padStart(2, '0')}` : null;
}

function acumularPercentuaisMensaisV229(values){
  if(!Array.isArray(values) || !values.length) return null;
  let factor = 1;
  let count = 0;
  for(const value of values){
    const n = numeroFinitoV229(value);
    if(n === null) continue;
    factor *= (1 + n / 100);
    count += 1;
  }
  return count ? Number(((factor - 1) * 100).toFixed(4)) : null;
}

function calcularCdiDoHistoricoV229(cdiCard, months){
  const periodo = CDI_PERIOD_OPTIONS_V229.includes(Number(months)) ? Number(months) : 12;
  const historico = Array.isArray(cdiCard?.historico) ? cdiCard.historico : [];
  if(!historico.length) return null;

  const ultimoFechadoKey = chaveMesDeRotuloV229(cdiCard?.mes_ref);
  const ordenado = historico
    .map(item => ({
      key: String(item?.key || item?.data_ref || '').slice(0, 7),
      value: numeroFinitoV229(item?.valor ?? item?.value)
    }))
    .filter(item => /^\d{4}-\d{2}$/.test(item.key) && item.value !== null)
    .filter(item => !ultimoFechadoKey || item.key <= ultimoFechadoKey)
    .sort((a, b) => a.key.localeCompare(b.key));

  if(ordenado.length < periodo) return null;
  return acumularPercentuaisMensaisV229(ordenado.slice(-periodo).map(item => item.value));
}

function fontesCdiV230(preferida){
  const fontes = [];
  const adicionar = value => {
    if(value && typeof value === 'object' && !fontes.includes(value)) fontes.push(value);
  };

  adicionar(preferida);
  try{ adicionar(_dadosMercado?.cards?.cdi); }catch(e){}
  adicionar(window.__mercadoAtualV230?.cards?.cdi);
  return fontes;
}

function cdiCardAtualV230(){
  try{
    return _dadosMercado?.cards?.cdi || window.__mercadoAtualV230?.cards?.cdi || {};
  }catch(e){
    return window.__mercadoAtualV230?.cards?.cdi || {};
  }
}

function resolverCdiPeriodoV229(cdiCard, months){
  const periodo = CDI_PERIOD_OPTIONS_V229.includes(Number(months)) ? Number(months) : 12;

  for(const fonte of fontesCdiV230(cdiCard)){
    const direto = numeroFinitoV229(fonte?.[`acum_${periodo}m`]);
    if(direto !== null){
      cdiPeriodoCacheV230[periodo] = direto;
      return direto;
    }

    const historico = calcularCdiDoHistoricoV229(fonte, periodo);
    if(historico !== null){
      cdiPeriodoCacheV230[periodo] = historico;
      return historico;
    }
  }

  const cache = numeroFinitoV229(cdiPeriodoCacheV230[periodo]);
  if(cache !== null) return cache;

  return numeroFinitoV229(indicState.cdi?.[`m${periodo}`]);
}

function atualizarDiagnosticoCdiV230(){
  const disponiveis = CDI_PERIOD_OPTIONS_V229.filter(periodo => numeroFinitoV229(cdiPeriodoCacheV230[periodo]) !== null);
  document.documentElement.dataset.cdiPeriods = disponiveis.join(',');
}

function sincronizarEstadoCdiV229(dados){
  if(dados && typeof dados === 'object') window.__mercadoAtualV230 = dados;

  const cdiCard = dados?.cards?.cdi || {};
  const mensal = numeroFinitoV229(cdiCard.mensal);
  if(mensal !== null) indicState.cdi.mes = mensal;
  if(cdiCard.mes_ref) indicState.cdi.mesRef = cdiCard.mes_ref;

  CDI_PERIOD_OPTIONS_V229.forEach(periodo => {
    const value = resolverCdiPeriodoV229(cdiCard, periodo);
    if(value !== null){
      indicState.cdi[`m${periodo}`] = value;
      cdiPeriodoCacheV230[periodo] = value;
    }
  });

  atualizarDiagnosticoCdiV230();

  return {
    m12: numeroFinitoV229(cdiPeriodoCacheV230[12] ?? indicState.cdi.m12),
    m24: numeroFinitoV229(cdiPeriodoCacheV230[24] ?? indicState.cdi.m24),
    m36: numeroFinitoV229(cdiPeriodoCacheV230[36] ?? indicState.cdi.m36)
  };
}

async function recarregarCdiPeriodosV230(){
  if(cdiRefreshPromiseV230) return cdiRefreshPromiseV230;

  cdiRefreshPromiseV230 = (async () => {
    const url = BASE_URL + 'mercado_atual.json?v=market-cdi-v230-' + Date.now();
    const response = await fetch(url, { cache: 'no-store' });
    if(!response.ok) throw new Error(`HTTP ${response.status} ao carregar mercado_atual.json`);

    const raw = await response.json();
    const fresco = typeof normalizarMercadoAtual === 'function' ? normalizarMercadoAtual(raw) : raw;
    const cdiFresco = fresco?.cards?.cdi;

    if(cdiFresco){
      try{
        if(_dadosMercado && typeof _dadosMercado === 'object'){
          if(!_dadosMercado.cards) _dadosMercado.cards = {};
          _dadosMercado.cards.cdi = { ...(_dadosMercado.cards.cdi || {}), ...cdiFresco };
          sincronizarEstadoCdiV229(_dadosMercado);
        }else{
          sincronizarEstadoCdiV229(fresco);
        }
      }catch(e){
        sincronizarEstadoCdiV229(fresco);
      }
    }

    return sincronizarEstadoCdiV229(fresco);
  })().finally(() => {
    cdiRefreshPromiseV230 = null;
  });

  return cdiRefreshPromiseV230;
}

async function garantirCdiPeriodoV230(months){
  const periodo = CDI_PERIOD_OPTIONS_V229.includes(Number(months)) ? Number(months) : 12;
  let value = resolverCdiPeriodoV229(cdiCardAtualV230(), periodo);
  if(value !== null) return value;

  await recarregarCdiPeriodosV230();
  value = resolverCdiPeriodoV229(cdiCardAtualV230(), periodo);
  return value;
}

window.sincronizarEstadoCdiV229 = sincronizarEstadoCdiV229;
window.resolverCdiPeriodoV229 = resolverCdiPeriodoV229;
window.recarregarCdiPeriodosV230 = recarregarCdiPeriodosV230;
window.garantirCdiPeriodoV230 = garantirCdiPeriodoV230;
window.getCdiPeriodosV230 = () => ({ ...cdiPeriodoCacheV230 });

/* ════════════════════════════════════════════════════
   POUPANÇA — TOGGLE
════════════════════════════════════════════════════ */
function togglePoupanca(){
  const el = $('poupExplain');
  const btn = $('poupExpandBtn');
  const isOpen = el.classList.toggle('open');
  btn.textContent = isOpen ? 'Ocultar detalhes ▲' : 'Ver detalhes ▼';
}


function togglePoupancaMobileDetails(force){
  const shouldOpen = typeof force === 'boolean'
    ? force
    : !document.body.classList.contains('poup-mobile-expanded');

  document.body.classList.toggle('poup-mobile-expanded', shouldOpen);

  const btn = $('poupMobileDetailsToggle');
  if(btn){
    btn.textContent = shouldOpen ? 'Ocultar cenários e regras ↑' : 'Ver cenários e regras ↓';
    btn.setAttribute('aria-expanded', String(shouldOpen));
  }

  // No mobile, o botão único controla também a explicação das regras.
  const explain = $('poupExplain');
  if(explain) explain.classList.toggle('open', shouldOpen);

  const desktopBtn = $('poupExpandBtn');
  if(desktopBtn) desktopBtn.textContent = shouldOpen ? 'Ocultar detalhes ▲' : 'Ver detalhes ▼';

  if(shouldOpen){
    setTimeout(function(){
      try{ if(poupScenarioChart && typeof poupScenarioChart.resize === 'function') poupScenarioChart.resize(); }catch(e){}
      try{ if(poupScenarioChart && typeof poupScenarioChart.update === 'function') poupScenarioChart.update(); }catch(e){}
    }, 120);
  }

  return false;
}
window.togglePoupancaMobileDetails = togglePoupancaMobileDetails;

document.addEventListener('DOMContentLoaded', function(){
  try{
    if(window.matchMedia && window.matchMedia('(max-width: 768px), (pointer: coarse)').matches){
      togglePoupancaMobileDetails(false);
    }
  }catch(e){}
});

function formatPctCard(v, fallback='—'){
  if(v===null || v===undefined || v==='') return fallback;
  const n = Number(v);
  if(!Number.isFinite(n)) return fallback;
  return (n>0 ? '+' : '') + n.toFixed(2).replace('.',',') + '%';
}

function getFirstNumber(...vals){
  for(const v of vals){
    if(v===null || v===undefined || v==='') continue;
    const n = Number(v);
    if(Number.isFinite(n)) return n;
  }
  return null;
}


let poupScenarioChart = null;

function calcularPoupancaNovaMensalPorSelic(selicAnual, trMensal=0){
  const s = Number(selicAnual);
  const tr = Number.isFinite(Number(trMensal)) ? Math.max(0, Number(trMensal)) : 0;
  if(!Number.isFinite(s)) return null;

  // Acima de 8,5% a.a.: regra nova converge para TR + 0,50% a.m.
  if(s > 8.5) return 0.5 + tr;

  // Até 8,5% a.a.: TR + 70% da Selic meta anual, convertida para equivalente mensal.
  const mensal = (Math.pow(1 + ((s * 0.70) / 100), 1/12) - 1) * 100;
  return mensal + tr;
}

function calcularPoupancaAntigaMensal(trMensal=0){
  const tr = Number.isFinite(Number(trMensal)) ? Math.max(0, Number(trMensal)) : 0;
  return 0.5 + tr;
}

function atualizarPoupancaCenarios({selic, valorNova, valorAntiga} = {}){
  const selicNum = getFirstNumber(selic);
  const valorNovaNum = getFirstNumber(valorNova);
  const valorAntigaNum = getFirstNumber(valorAntiga);

  let trEstimada = 0;
  if(selicNum != null && valorNovaNum != null){
    const baseNovaHoje = selicNum > 8.5
      ? 0.5
      : (Math.pow(1 + ((selicNum * 0.70) / 100), 1/12) - 1) * 100;
    trEstimada = Math.max(0, valorNovaNum - baseNovaHoje);
  }else if(valorAntigaNum != null){
    trEstimada = Math.max(0, valorAntigaNum - 0.5);
  }

  const mensalNova4 = calcularPoupancaNovaMensalPorSelic(4, trEstimada);
  const mensalNova85 = calcularPoupancaNovaMensalPorSelic(8.5, trEstimada);
  const mensalAntiga = calcularPoupancaAntigaMensal(trEstimada);
  const mensalNovaAtual = selicNum != null
    ? calcularPoupancaNovaMensalPorSelic(selicNum, trEstimada)
    : valorNovaNum;
  const mensalAntigaAtual = valorAntigaNum != null ? valorAntigaNum : mensalAntiga;

  const setText = (id, value) => {
    const el = $(id);
    if(el) el.textContent = value;
  };
  const formatMensal = (v) => Number.isFinite(Number(v)) ? `${fmt(Number(v))} a.m.` : '—';

  setText('poupScenarioNew4', `70% da Selic + TR (${formatMensal(mensalNova4)})`);
  setText('poupScenarioOld4', `TR + 0,50% a.m. (${formatMensal(mensalAntiga)})`);
  setText('poupScenarioNew85', `70% da Selic + TR (${formatMensal(mensalNova85)})`);
  setText('poupScenarioOld85', `TR + 0,50% a.m. (${formatMensal(mensalAntiga)})`);
  setText('poupScenarioCurrentTitle', selicNum != null ? `Selic atual: ${fmt(selicNum)}` : 'Cenário atual');
  setText('poupScenarioCurrentNew', formatMensal(mensalNovaAtual));
  setText('poupScenarioCurrentOld', formatMensal(mensalAntigaAtual));

  if($('poupScenarioSummary')){
    if(selicNum == null){
      $('poupScenarioSummary').textContent = 'Quando a Selic carregar, o comparativo mostrará o efeito da regra atual e da regra anterior.';
    }else if(selicNum > 8.5){
      $('poupScenarioSummary').textContent = `Com Selic em ${fmt(selicNum)}, as duas regras utilizam TR + 0,50% a.m. A diferença aparece quando a Selic fica em 8,50% a.a. ou abaixo.`;
    }else{
      $('poupScenarioSummary').textContent = `Com Selic em ${fmt(selicNum)}, a regra vigente passa a usar 70% da Selic + TR, enquanto a regra pré-2012 mantém TR + 0,50% a.m.`;
    }
  }

  if($('poupScenarioNote')){
    $('poupScenarioNote').textContent = trEstimada > 0
      ? `Comparação didática com TR estimada de ${fmt(trEstimada)} a.m. A TR varia conforme o período de aniversário.`
      : 'Comparação didática sem TR estimada. Para valor exato, consulte a Calculadora do Cidadão do BCB.';
  }
}
function atualizarPoupancaCard(d, selicAtual){
  const c = d?.cards || {};
  const nova = c.poupanca_nova || d?.poupanca_nova || d?.poupanca?.nova || {};
  const antiga = c.poupanca_antiga || d?.poupanca_antiga || d?.poupanca?.antiga || {};

  const selic = getFirstNumber(selicAtual, c.selic_meta?.valor);
  const acima = selic != null && selic > 8.5;

  const valorNova = getFirstNumber(nova.valor, nova.mensal, nova.rendimento_mensal);

  // Regra antiga: se o robô ainda não mandar esse campo, e a Selic estiver acima de 8,5%,
  // podemos espelhar a regra nova, pois ambas usam TR + 0,50% a.m.
  let valorAntiga = getFirstNumber(antiga.valor, antiga.mensal, antiga.rendimento_mensal);
  // Guarda: poupança mensal nunca > 2% a.m. — descarta se vier dado errado (ex: CDI 12M)
  if(valorAntiga != null && valorAntiga > 2.0){ valorAntiga = null; }
  if(valorAntiga == null && acima && valorNova != null){
    valorAntiga = valorNova;
  }

  const acumNova = getFirstNumber(
    nova.acum_ano,
    nova.acumulado_ano,
    nova.rendimento_ano,
    nova.ytd
  );

  let acumAntiga = getFirstNumber(
    antiga.acum_ano,
    antiga.acumulado_ano,
    antiga.rendimento_ano,
    antiga.ytd
  );

  // Mesmo raciocínio para o acumulado: quando Selic > 8,5%, as duas regras usam a mesma base.
  if(acumAntiga == null && acima && acumNova != null){
    acumAntiga = acumNova;
  }

  if($('mc-poup')){
    const valorMensalTexto = valorNova != null ? fmt(valorNova) : '—';
    $('mc-poup').textContent = valorMensalTexto;
    $('mc-poup').setAttribute(
      'aria-label',
      valorNova != null ? `Rendimento mensal atual: ${valorMensalTexto} ao mês` : 'Rendimento mensal ainda não disponível'
    );
  }

  if($('poupTodayCompactV199')){
    $('poupTodayCompactV199').textContent = valorNova != null ? fmt(valorNova) : '—';
  }

  if($('poupYearCompactV199')){
    const acumuladoAnoTexto = acumNova != null ? formatPctCard(acumNova) : '—';
    $('poupYearCompactV199').textContent = acumuladoAnoTexto;
    $('poupYearCompactV199').setAttribute(
      'aria-label',
      acumNova != null ? `Acumulado da poupança no ano: ${acumuladoAnoTexto}` : 'Acumulado no ano ainda não disponível'
    );
  }

  if($('poupOldMonthly')){
    $('poupOldMonthly').textContent = valorAntiga != null ? fmt(valorAntiga) : '—';
  }

  if($('poupNewAccum')){
    $('poupNewAccum').textContent = 'Acum. ano: ' + (acumNova != null ? formatPctCard(acumNova) : '—');
  }

  if($('poupOldAccum')){
    $('poupOldAccum').textContent = 'Acum. ano: ' + (acumAntiga != null ? formatPctCard(acumAntiga) : '—');
  }

  if($('poupNewRuleText')){
    if(selic == null){
      $('poupNewRuleText').textContent = 'Aguardando a Selic vigente.';
    }else if(acima){
      $('poupNewRuleText').innerHTML = 'Com Selic acima de 8,50% a.a.: <strong>TR + 0,50% a.m.</strong>';
    }else{
      $('poupNewRuleText').innerHTML = 'Com Selic em até 8,50% a.a.: <strong>70% da Selic + TR</strong>';
    }
  }

  if($('poupOldRuleText')){
    $('poupOldRuleText').innerHTML = 'Rendimento: <strong>TR + 0,50% a.m.</strong>';
  }

  if($('poupQuickNote')){
    if(selic == null){
      $('poupQuickNote').textContent =
        'Aguardando Selic vigente para definir a regra aplicada.';
    }else if(acima){
      $('poupQuickNote').innerHTML =
        `Rendimento de <strong>TR + 0,50% a.m.</strong> <span class="poup-note-muted-v327">(Selic acima de 8,50% a.a.)</span>`;
    }else{
      $('poupQuickNote').innerHTML =
        `Depósitos novos: <strong>70% da Selic + TR</strong> <span class="poup-note-muted-v327">(regra vigente)</span>`;
    }
  }

  atualizarPoupancaCenarios({selic, valorNova, valorAntiga});
}

/* ════════════════════════════════════════════════════
   BOLETIM FOCUS — CARD EXPLICATIVO
════════════════════════════════════════════════════ */
function toggleFocusExplain(){
  const body = $('focusExplainBody');
  const icon = $('focusExplainIcon');
  if(!body) return;

  const isOpen = body.classList.toggle('open');
  if(icon) icon.textContent = isOpen ? 'Recolher ▲' : 'Mostrar ▼';
}

/* ════════════════════════════════════════════════════
   CDI — SÉRIE 4391 BCB (12M / 24M / 36M)
════════════════════════════════════════════════════ */
async function carregarCDIPeriodos(){
  let periodos = sincronizarEstadoCdiV229(_dadosMercado);
  let ausentes = CDI_PERIOD_OPTIONS_V229.filter(periodo => periodos[`m${periodo}`] === null);

  if(ausentes.length){
    try{
      await recarregarCdiPeriodosV230();
      periodos = sincronizarEstadoCdiV229(_dadosMercado || window.__mercadoAtualV230);
      ausentes = CDI_PERIOD_OPTIONS_V229.filter(periodo => periodos[`m${periodo}`] === null);
    }catch(error){
      console.warn('[CDI v230] Não foi possível refazer a leitura dos acumulados:', error);
    }
  }

  const disponiveis = CDI_PERIOD_OPTIONS_V229.filter(periodo => periodos[`m${periodo}`] !== null);
  if(disponiveis.length){
    console.info(`[CDI v230] Períodos disponíveis: ${disponiveis.join('M, ')}M`);
  }
  if(ausentes.length){
    console.warn(`[CDI v230] Períodos ainda ausentes: ${ausentes.join('M, ')}M`);
    if($('cdi-acum-src-v2')) $('cdi-acum-src-v2').textContent = 'histórico indisponível';
  }

  atualizarTabelaIndicadores();
}

/* ════════════════════════════════════════════════════
   IPCA — SÉRIE 433 BCB (12M / 24M / 36M)
════════════════════════════════════════════════════ */
async function carregarIPCAPeriodos(){
  // v17 local: não chama mais a API SGS 433 pelo navegador.
  // IPCA mensal, ano e acumulados vêm do mercado_atual.json.
  if(indicState.ipca.m12 !== null || indicState.ipca.m24 !== null || indicState.ipca.m36 !== null){
    console.info('[IPCA] Usando acumulados do mercado_atual.json');
  } else {
    console.warn('[IPCA] mercado_atual.json não trouxe acumulados IPCA. Execute o +.');
    if($('ipca-acum-sub-v2')) $('ipca-acum-sub-v2').textContent = 'histórico indisponível';
  }
  atualizarTabelaIndicadores();
}

/* ════════════════════════════════════════════════════
   PTAX HISTÓRICO — usado pela tabela e gráfico
════════════════════════════════════════════════════ */
async function carregarPTAXHistorico(){
  // v17 local: não chama mais CotacaoDolarPeriodo pelo navegador.
  // O atualização automatizada já salva ptax_historico no mercado_atual.json.
  if(_ptaxHistorico.length > 0){
    console.info('[PTAX] Histórico carregado do mercado_atual.json');
    calcularDolarPeriodos();
    renderDolarMensais();
    buildChartDolar('24m');
  } else {
    console.warn('[PTAX] mercado_atual.json não trouxe ptax_historico. Execute o +.');
    const sub = $('dolar-chart-sub');
    if(sub) sub.textContent = 'Histórico PTAX temporariamente indisponível';
  }
}

function setDolarVarCard(id, valor){
  const el = $(id);
  if(!el) return;

  const n = Number(valor);
  if(valor === null || valor === undefined || !Number.isFinite(n)){
    el.textContent = '—';
    el.className = 'dolar-metric-val muted';
    return;
  }

  el.textContent = `${signPct(n)}${fmt(n)}`;
  el.className = `dolar-metric-val ${n > 0 ? 'pos' : n < 0 ? 'neg' : 'muted'}`;
}

function atualizarCardDolarResumo(refLabel){
  setDolarVarCard('dolar-var-mes-card', indicState.dolarPct.mes);
  setDolarVarCard('dolar-var-ano-card', indicState.dolarPct.ano);
  setDolarVarCard('dolar-var-12m-card', indicState.dolarPct.m12);
  setDolarVarCard('dolar-var-24m-card', indicState.dolarPct.m24);
  setDolarVarCard('dolar-var-36m-card', indicState.dolarPct.m36);

  const card36 = document.querySelector('.dolar-mini-kpi-36m');
  if(card36){
    const has36 = indicState.dolarPct.m36 !== null && indicState.dolarPct.m36 !== undefined && Number.isFinite(Number(indicState.dolarPct.m36));
    card36.classList.toggle('is-empty', !has36);
  }

  if($('dolar-day-ref') && refLabel){
    $('dolar-day-ref').textContent = `Ref.: ${refLabel}`;
  }
}

function hidratarDolarResumoDoJson(d){
  const dolar = d?.indices_mercado?.dolar || d?.cards?.dolar || {};
  const fallback = d?.cards?.dolar || {};

  const put = (key, ...vals) => {
    for(const value of vals){
      const n = Number(value);
      if(value !== null && value !== undefined && value !== '' && Number.isFinite(n)){
        indicState.dolarPct[key] = n;
        return;
      }
    }
  };

  put('mes', dolar.variacao_mes_atual, dolar.variacao_mensal, fallback.variacao_mes_atual, fallback.variacao_mensal);
  put('ano', dolar.acum_ano, fallback.acum_ano);
  put('m12', dolar.acum_12m, fallback.acum_12m);
  put('m24', dolar.acum_24m, fallback.acum_24m);
  put('m36', dolar.acum_36m, fallback.acum_36m);

  atualizarCardDolarResumo();
}


function atualizarPTAXStats(range='24m'){
  const setText = (id, value) => { const el = $(id); if(el) el.textContent = value; };
  const setClass = (id, cls) => { const el = $(id); if(el) el.className = cls; };

  const reset = () => {
    ['ptaxStatAtual','ptaxStatMax','ptaxStatMin','ptaxStatMedia','ptaxStatMaxRef','ptaxStatMinRef'].forEach(id => setText(id,'—'));
  };

  if(!_ptaxHistorico || !_ptaxHistorico.length){ reset(); return; }

  const byMonth = {};
  _ptaxHistorico.forEach(item => {
    const rawDate = item.dataHoraCotacao || item.data_ref || item.data || item.date;
    const dt = new Date(rawDate);
    const val = Number(item.cotacaoVenda ?? item.cotacao ?? item.valor);
    if(isNaN(dt) || !Number.isFinite(val)) return;
    const key = `${dt.getFullYear()}-${String(dt.getMonth()+1).padStart(2,'0')}`;
    if(!byMonth[key] || new Date(rawDate) > new Date(byMonth[key].rawDate)){
      byMonth[key] = { key, dt, val, rawDate, label:item._mes_label || `${MESES_PT[dt.getMonth()]}/${dt.getFullYear()}` };
    }
  });

  const asc = Object.values(byMonth).sort((a,b)=>a.key.localeCompare(b.key));
  if(!asc.length){ reset(); return; }

  let janela;
  let periodoTexto;
  if(range === 'year'){
    janela = asc.filter(item => item.dt.getFullYear() === ANO_ATUAL);
    periodoTexto = String(ANO_ATUAL);
  }else{
    const meses = range === '12m' ? 12 : range === '36m' ? 36 : 24;
    janela = asc.slice(-meses);
    periodoTexto = `${meses} meses`;
  }
  if(!janela.length) janela = asc;

  const atual = asc[asc.length-1];
  const max = janela.reduce((a,b)=> b.val > a.val ? b : a, janela[0]);
  const min = janela.reduce((a,b)=> b.val < a.val ? b : a, janela[0]);
  const media = janela.reduce((sum,item)=>sum+item.val,0) / janela.length;

  setText('ptaxStatsTitleV162', `Estatísticas do período · ${periodoTexto}`);
  const primeiroPeriodo = janela[0];
  const ultimoPeriodo = janela[janela.length - 1] || atual;
  const variacaoPeriodo = primeiroPeriodo && Number.isFinite(primeiroPeriodo.val) && primeiroPeriodo.val !== 0
    ? ((ultimoPeriodo.val / primeiroPeriodo.val - 1) * 100)
    : NaN;
  const varPeriodoTxt = Number.isFinite(variacaoPeriodo)
    ? `${variacaoPeriodo > 0 ? '+' : ''}${variacaoPeriodo.toFixed(2).replace('.', ',')}%`
    : '—';
  const varPeriodoCls = !Number.isFinite(variacaoPeriodo) ? 'neu' : variacaoPeriodo > 0 ? 'pos' : variacaoPeriodo < 0 ? 'neg' : 'neu';

  setText('ptaxStatVarLabelV334', 'Variação');
  setText('ptaxStatMaxLabel', 'Máxima');
  setText('ptaxStatMinLabel', 'Mínima');
  setText('ptaxStatMediaLabel', 'Média');
  setText('ptaxStatAtual', varPeriodoTxt);
  setText('ptaxStatMax', brl(max.val));
  setText('ptaxStatMaxRef', max.label);
  setText('ptaxStatMin', brl(min.val));
  setText('ptaxStatMinRef', min.label);
  setText('ptaxStatMedia', brl(media));

  setClass('ptaxStatAtual', `ptax-stat-val ${varPeriodoCls}`);
  setClass('ptaxStatMax', 'ptax-stat-val neu');
  setClass('ptaxStatMin', 'ptax-stat-val neu');
  setClass('ptaxStatMedia', 'ptax-stat-val neu');
}

function calcularDolarPeriodos(){
  if(!_ptaxHistorico.length) return;

  // Agrupa por mês (último registro = fechamento)
  const byMonth = {};
  _ptaxHistorico.forEach(item => {
    const dt = new Date(item.dataHoraCotacao);
    const key = `${dt.getFullYear()}-${String(dt.getMonth()+1).padStart(2,'0')}`;
    if(!byMonth[key] || new Date(item.dataHoraCotacao) > new Date(byMonth[key].dataHoraCotacao)){
      byMonth[key] = item;
    }
  });

  const sorted = Object.entries(byMonth).sort(([a],[b]) => a.localeCompare(b));
  if(sorted.length < 2) return;

  const last = sorted[sorted.length-1];
  const lastVal = parseFloat(last[1].cotacaoVenda);

  // Mês atual vs mês anterior
  const prevMes = sorted[sorted.length-2];
  const prevMesVal = parseFloat(prevMes[1].cotacaoVenda);
  indicState.dolarBRL.mes = lastVal;
  indicState.dolarPct.mes = +((lastVal/prevMesVal-1)*100).toFixed(2);

  // Ref label
  const [ano, mes] = last[0].split('-');
  const refLabel = `${MESES_PT[parseInt(mes)-1]}/${ano}`;

  // Acumulado no ano
  // Regra correta: comparar a cotação atual com o fechamento de DEZEMBRO do ano anterior.
  // Antes estava usando o primeiro registro de 2026 (jan/2026), o que gerava -3,82% em vez de -8,58%.
  const dolarJson = _dadosMercado?.indices_mercado?.dolar || _dadosMercado?.cards?.dolar || {};
  const baseAnoJson = Number(dolarJson.base_ano ?? dolarJson.fechamento_ano_anterior ?? dolarJson.baseAno);
  const acumAnoJson = Number(dolarJson.acum_ano);

  const anoAtualStr = `${ANO_ATUAL}`;
  const dezAnteriorKey = `${ANO_ATUAL - 1}-12`;
  const dezAnterior = sorted.find(([k]) => k === dezAnteriorKey);
  const primeiroMesAno = sorted.find(([k]) => k.startsWith(anoAtualStr));

  if(Number.isFinite(baseAnoJson) && baseAnoJson > 0){
    indicState.dolarBRL.ano = baseAnoJson;
    indicState.dolarPct.ano = Number.isFinite(acumAnoJson)
      ? acumAnoJson
      : +((lastVal/baseAnoJson-1)*100).toFixed(2);
  }else if(dezAnterior){
    const baseDez = parseFloat(dezAnterior[1].cotacaoVenda);
    indicState.dolarBRL.ano = baseDez;
    indicState.dolarPct.ano = +((lastVal/baseDez-1)*100).toFixed(2);
  }else if(primeiroMesAno){
    // fallback apenas se o histórico não trouxer dez/ano anterior
    const inicioVal = parseFloat(primeiroMesAno[1].cotacaoVenda);
    indicState.dolarBRL.ano = inicioVal;
    indicState.dolarPct.ano = +((lastVal/inicioVal-1)*100).toFixed(2);
  }

  // 12M, 24M, 36M
  [12, 24, 36].forEach(m => {
    if(sorted.length > m){
      const ref = sorted[sorted.length-1-m];
      const refVal = parseFloat(ref[1].cotacaoVenda);
      indicState.dolarBRL[`m${m}`] = refVal;
      indicState.dolarPct[`m${m}`] = +((lastVal/refVal-1)*100).toFixed(2);
    }
  });

  // Atualiza campos fixos na tabela (BRL)
  if($('ref-dolar')) $('ref-dolar').textContent = refLabel;
  if($('ref-dolar2')) $('ref-dolar2').textContent = refLabel;

  if($('it-dolar-mes-val')) $('it-dolar-mes-val').textContent = indicState.dolarBRL.mes ? brl(indicState.dolarBRL.mes) : '—';
  if($('it-dolar-ano-val') && indicState.dolarBRL.ano) $('it-dolar-ano-val').textContent = brl(indicState.dolarBRL.ano);

  const mesVarEl = $('it-dolar-var-mes');
  if(mesVarEl && indicState.dolarPct.mes !== null){
    const n = indicState.dolarPct.mes;
    mesVarEl.textContent = `${signPct(n)}${fmt(n)}`;
    mesVarEl.className = `indic-pct ${n>0?'neg':'pos'}`; // dolar subindo = ruim para BRL
  }
  const anoVarEl = $('it-dolar-var-ano');
  if(anoVarEl && indicState.dolarPct.ano !== null){
    const n = indicState.dolarPct.ano;
    anoVarEl.textContent = `${signPct(n)}${fmt(n)}`;
    anoVarEl.className = `indic-pct ${n>0?'neg':'pos'}`;
  }

  if($('dolar-day-rate')){
    $('dolar-day-rate').textContent = brl(lastVal);
  }
  if($('dolar-ptax-compact')){
    $('dolar-ptax-compact').textContent = `Cotação PTAX de venda / fechamento ${refLabel}`;
  }
  if($('dolar-day-src')){
    $('dolar-day-src').textContent = `BCB · PTAX · ${refLabel}`;
  }
  if($('dolar-day-loading')){
    $('dolar-day-loading').style.display = 'none';
  }
  if($('dolar-day-content')){
    $('dolar-day-content').style.display = 'block';
  }
  atualizarCardDolarResumo(refLabel);
  atualizarPTAXStats('24m');

  atualizarTabelaIndicadores();
}

/* ════════════════════════════════════════════════════
   DÓLAR DO DIA
════════════════════════════════════════════════════ */
async function carregarDolarDia(){
  const fmtDataBCB = d =>
    `${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}-${d.getFullYear()}`;

  // Tenta até 5 dias para trás (fins de semana/feriados)
  for(let i = 0; i < 5; i++){
    const dia = new Date(HOJE);
    dia.setDate(HOJE.getDate() - i);
    const url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/`
      + `CotacaoDolarDia(dataCotacao=@d)?@d='${fmtDataBCB(dia)}'`
      + `&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`;
    try{
      const r = await fetch(url);
      if(!r.ok) continue;
      const data = await r.json();
      if(!data.value || !data.value.length) continue;

      // Última cotação do dia
      const ultima = data.value[data.value.length-1];
      const cotVenda = parseFloat(ultima.cotacaoVenda);
      const cotCompra = parseFloat(ultima.cotacaoCompra);
      const dtCot = new Date(ultima.dataHoraCotacao);

      if($('dolar-day-rate')) $('dolar-day-rate').textContent = brl(cotVenda);
      if($('dolar-compra')) $('dolar-compra').textContent = brl(cotCompra);
      if($('dolar-venda')) $('dolar-venda').textContent = brl(cotVenda);
      if($('dolar-ptax-compact')) $('dolar-ptax-compact').textContent = 'Cotação PTAX de venda / fechamento: ' + brl(cotVenda);

      const diaRef = `${String(dtCot.getDate()).padStart(2,'0')}/${String(dtCot.getMonth()+1).padStart(2,'0')}/${dtCot.getFullYear()}`;
      const hora = `${String(dtCot.getHours()).padStart(2,'0')}:${String(dtCot.getMinutes()).padStart(2,'0')}`;
      if($('dolar-day-ref')) $('dolar-day-ref').textContent = `Referência: ${diaRef}`;
      if($('dolar-hora')) $('dolar-hora').textContent = hora + ' (BCB)';
      if($('dolar-day-src')) $('dolar-day-src').textContent = `BCB · PTAX · ${diaRef}`;

      // Variação vs dia anterior
      if(i === 0 && data.value.length > 1){
        const anterior = data.value[data.value.length-2];
        const antVal = parseFloat(anterior.cotacaoVenda);
        const varPct = ((cotVenda - antVal) / antVal) * 100;
        const varEl = $('dolar-var-dia');
        if(varEl){
          varEl.textContent = `${signPct(varPct)}${fmt(varPct)} (vs cot. anterior do dia)`;
          varEl.className = `dolar-metric-val ${varPct < 0 ? 'neg' : varPct > 0 ? 'pos' : 'muted'}`;
        }
        if($('dolar-dia-ant')) $('dolar-dia-ant').textContent = brl(antVal);
      } else {
        // Compara com dia anterior via histórico
        const diaAnt = new Date(dia);
        diaAnt.setDate(dia.getDate() - 1);
        buscarCotacaoDiaAnterior(cotVenda, diaAnt);
      }

      $('dolar-day-loading').style.display = 'none';
      $('dolar-day-content').style.display = 'block';
      return;
    }catch(e){ continue; }
  }
  $('dolar-day-loading').innerHTML = '<span style="color:var(--muted)">Cotação PTAX indisponível no momento</span>';
}

async function buscarCotacaoDiaAnterior(cotAtual, diaAnt){
  const fmtDataBCB = d =>
    `${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}-${d.getFullYear()}`;
  for(let i = 0; i < 5; i++){
    const dia = new Date(diaAnt);
    dia.setDate(diaAnt.getDate() - i);
    try{
      const url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/`
        + `CotacaoDolarDia(dataCotacao=@d)?@d='${fmtDataBCB(dia)}'`
        + `&$format=json&$select=cotacaoVenda,dataHoraCotacao`;
      const r = await fetch(url);
      if(!r.ok) continue;
      const data = await r.json();
      if(!data.value || !data.value.length) continue;
      const antVal = parseFloat(data.value[data.value.length-1].cotacaoVenda);
      const varPct = ((cotAtual - antVal) / antVal) * 100;
      const varEl = $('dolar-var-dia');
      if(varEl){
        varEl.textContent = `${signPct(varPct)}${fmt(varPct)} (vs fechamento ${fmtDataBR(dia)})`;
        varEl.className = `dolar-metric-val ${varPct < 0 ? 'neg' : varPct > 0 ? 'pos' : 'muted'}`;
        if($('dolar-dia-ant')) $('dolar-dia-ant').textContent = brl(antVal);
      }
      return;
    }catch(e){ continue; }
  }
}

/* ════════════════════════════════════════════════════
   DÓLAR MENSAL — TIMELINE
════════════════════════════════════════════════════ */
function renderDolarMensais(){
  if(!_ptaxHistorico.length) return;

  const byMonth = {};
  _ptaxHistorico.forEach(item => {
    const dataRef = item.dataHoraCotacao || item.data_ref;
    const dt = new Date(dataRef);
    if(isNaN(dt)) return;
    const key = `${dt.getFullYear()}-${String(dt.getMonth()+1).padStart(2,'0')}`;
    if(!byMonth[key] || new Date(dataRef) > new Date(byMonth[key].dataHoraCotacao || byMonth[key].data_ref)){
      byMonth[key] = item;
    }
  });

  const sorted = Object.entries(byMonth).sort(([a],[b]) => a.localeCompare(b));
  if(!sorted.length) return;

  const currentKey = `${HOJE.getFullYear()}-${String(HOJE.getMonth()+1).padStart(2,'0')}`;
  const currentEntry = sorted.find(([key]) => key === currentKey);
  const closedEntries = sorted.filter(([key]) => key !== currentKey).slice(-6).reverse();

  const calcVar = (key,item) => {
    let varPct = item._var_pct;
    if(varPct === null || varPct === undefined || Number.isNaN(Number(varPct))){
      const idxAsc = sorted.findIndex(([k]) => k === key);
      if(idxAsc > 0){
        const val = parseFloat(item.cotacaoVenda || item.cotacao || 0);
        const prevVal = parseFloat(sorted[idxAsc-1][1].cotacaoVenda || sorted[idxAsc-1][1].cotacao || 0);
        if(prevVal) varPct = ((val - prevVal) / prevVal) * 100;
      }
    }
    return (varPct !== null && varPct !== undefined && !Number.isNaN(Number(varPct))) ? Number(varPct) : null;
  };

  const currentCard = $('dolarCurrentMonthV162');
  if(currentCard){
    if(currentEntry){
      const [key,item] = currentEntry;
      const [ano,mes] = key.split('-');
      const label = item._mes_label || `${MESES_PT[parseInt(mes)-1]}/${ano}`;
      const val = parseFloat(item.cotacaoVenda || item.cotacao || 0);
      const varPct = calcVar(key,item);
      const varEl = $('dolar-current-month-var');
      currentCard.hidden = false;
      if($('dolar-current-month-ref')) $('dolar-current-month-ref').textContent = label;
      if($('dolar-current-month-rate')) $('dolar-current-month-rate').textContent = `R$ ${fmtBRL(val)}`;
      if(varEl){
        varEl.textContent = varPct === null ? '—' : `${signPct(varPct)}${fmt(varPct)}`;
        varEl.className = varPct === null ? 'muted' : varPct > 0 ? 'pos' : varPct < 0 ? 'neg' : 'muted';
      }
    }else{
      currentCard.hidden = true;
    }
  }

  const container = $('dolarMonths');
  if(!container) return;
  container.innerHTML = closedEntries.map(([key,item]) => {
    const [ano,mes] = key.split('-');
    const label = item._mes_label || `${MESES_PT[parseInt(mes)-1]}/${ano}`;
    const val = parseFloat(item.cotacaoVenda || item.cotacao || 0);
    const varPct = calcVar(key,item);
    const cls = varPct === null ? 'zero' : varPct > 0 ? 'pos' : varPct < 0 ? 'neg' : 'zero';
    const varTxt = varPct === null ? '—' : `${signPct(varPct)}${fmt(varPct)}`;
    return `<div class="dolar-month-item dolar-month-row-v162 dolar-month-snap-v98">
      <span class="dolar-month-label">${label}</span>
      <span class="dolar-month-val">R$ ${fmtBRL(val)}</span>
      <span class="dolar-month-var ${cls}">${varTxt}</span>
    </div>`;
  }).join('') || '<div class="dolar-month-empty-v162">Nenhum mês fechado disponível.</div>';

  requestAnimationFrame(() => {
    try{ window.__ELTAUM_MOBILE_PTAX_SCROLL_HINT_V99__?.sync?.(); }catch(_error){}
    try{ window.__ELTAUM_MOBILE_PTAX_MONTH_CAROUSEL_V187__?.setup?.(); }catch(_error){}
  });
}

function toggleDolarTimeline(){
  const body = $('dolarTimelineBody');
  const toggle = $('dolarTimelineToggle');
  if(!body || !toggle) return;

  const isOpen = body.classList.toggle('open');
  toggle.textContent = isOpen ? 'Recolher ▲' : 'Mostrar ▼';
  toggle.setAttribute('aria-expanded', String(isOpen));
}

function toggleDolarChartMobile(){
  const panel = $('dolarChartPanel');
  const toggle = $('dolarChartToggle');
  if(!panel || !toggle) return;

  const isCollapsed = panel.classList.toggle('is-mobile-collapsed');
  toggle.textContent = isCollapsed ? 'Ver gráfico' : 'Ocultar gráfico';
  toggle.setAttribute('aria-expanded', String(!isCollapsed));

  if(!isCollapsed){
    const active = document.querySelector('[data-dolar-range].active');
    const range = active?.dataset?.dolarRange || '24m';
    setTimeout(() => {
      buildChartDolar(range);
      if(_chartDolar && typeof _chartDolar.resize === 'function') _chartDolar.resize();
    }, 80);
  }
}

/* ════════════════════════════════════════════════════
   GRÁFICO DO DÓLAR
════════════════════════════════════════════════════ */
let _ptaxDiario = [];

async function carregarPTAXDiarioAno(){
  if(_ptaxDiario.length > 10){buildChartDolar('24m');return;}
  try{
    const hoje=new Date(), ini=new Date(hoje.getFullYear(),0,2);
    const fmtD=d=>`${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}-${d.getFullYear()}`;
    const url=`https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/`
      +`CotacaoDolarPeriodo(dataInicial=@di,dataFinal=@df)`
      +`?@di='${fmtD(ini)}'&@df='${fmtD(hoje)}'`
      +`&$format=json&$select=cotacaoVenda,dataHoraCotacao`;
    const r=await fetch(url); if(!r.ok) throw new Error('HTTP '+r.status);
    const dados=(await r.json()).value||[];
    _ptaxDiario=dados.filter(d=>d.cotacaoVenda).sort((a,b)=>a.dataHoraCotacao.localeCompare(b.dataHoraCotacao));
    if(_ptaxDiario.length>10) console.info('[PTAX diário] '+_ptaxDiario.length+' pontos para '+hoje.getFullYear());
    else _ptaxDiario=[];
  }catch(e){console.warn('[PTAX diário]:',e.message); _ptaxDiario=[];}
  buildChartDolar('24m');
}

let _chartDolar = null;

function buildChartDolar(range){
  if(!_ptaxHistorico.length) return;

  let dados;
  const hoje = new Date();

  if(range === 'year'){
    // Apenas 2026 (ano atual)
    const _src=_ptaxDiario.length>10?_ptaxDiario:_ptaxHistorico;
    dados=_src.filter(d=>new Date(d.dataHoraCotacao).getFullYear()===ANO_ATUAL);
    const _tipoLabel=(_ptaxDiario.length>10&&range==='year')?'diária':'mensal';
  if($('dolar-chart-sub')) $('dolar-chart-sub').textContent=`PTAX ${_tipoLabel} · ${dados.length} registros`;
  } else if(range === '12m'){
    const limite = new Date(hoje); limite.setMonth(hoje.getMonth()-12);
    dados = _ptaxHistorico.filter(d => new Date(d.dataHoraCotacao) >= limite);
    $('dolar-chart-sub').textContent = `12 meses · ${dados.length} registros`;
  } else if(range === '24m'){
    const limite = new Date(hoje); limite.setMonth(hoje.getMonth()-24);
    dados = _ptaxHistorico.filter(d => new Date(d.dataHoraCotacao) >= limite);
    $('dolar-chart-sub').textContent = `24 meses · ${dados.length} registros`;
  } else { // 36m
    const limite = new Date(hoje); limite.setMonth(hoje.getMonth()-36);
    dados = _ptaxHistorico.filter(d => new Date(d.dataHoraCotacao) >= limite);
    $('dolar-chart-sub').textContent = `36 meses · ${dados.length} registros`;
  }

  if(!dados.length) return;

  atualizarPTAXStats(range);

  // Amostra para não sobrecarregar o gráfico (máx 200 pontos)
  const step = Math.max(1, Math.floor(dados.length/200));
  const sample = dados.filter((_,i) => i % step === 0 || i === dados.length-1);

  const labels = sample.map((d, idx) => {
    const dt = new Date(d.dataHoraCotacao);
    const mes = MESES_PT[dt.getMonth()] || String(dt.getMonth()+1).padStart(2,'0');
    const yy = String(dt.getFullYear()).slice(-2);
    if(range === '36m') return idx === 0 || idx === sample.length - 1 || dt.getMonth() === 0 ? String(dt.getFullYear()) : `${mes}/${yy}`;
    if(range === '24m' || range === '12m') return `${mes}/${yy}`;
    return `${String(dt.getDate()).padStart(2,'0')}/${String(dt.getMonth()+1).padStart(2,'0')}`;
  });
  const values = sample.map(d => parseFloat(d.cotacaoVenda));
  const primeiroVal = values[0];
  const ptColors = values.map(v => v >= primeiroVal ? 'rgba(240,85,101,.8)' : 'rgba(46,209,122,.8)');

  if(_chartDolar) _chartDolar.destroy();
  const ctx = document.getElementById('chartDolar')?.getContext('2d');
  if(!ctx) return;

  // Gradiente de área
  const grad = ctx.createLinearGradient(0, 0, 0, 200);
  grad.addColorStop(0, 'rgba(200,151,58,.18)');
  grad.addColorStop(1, 'rgba(200,151,58,0)');

  _chartDolar = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        data: values,
        borderColor: '#c8973a',
        backgroundColor: grad,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
        pointHoverBackgroundColor: '#e8bb6a',
        fill: false,
        tension: 0.24,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      resizeDelay: 150,
      interaction: { intersect: false, mode: 'index' },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(11,13,26,.95)',
          borderColor: 'rgba(200,151,58,.3)',
          borderWidth: 1,
          titleColor: '#e8bb6a',
          bodyColor: '#d8dcea',
          padding: 10,
          titleFont: { family: 'Cormorant Garamond', size: 13, weight: '700' },
          bodyFont: { family: 'JetBrains Mono', size: 11 },
          callbacks: {
            title: items => {
              const item = items && items[0];
              const raw = sample[item?.dataIndex || 0]?.dataHoraCotacao;
              const dt = raw ? new Date(raw) : null;
              return dt && !isNaN(dt)
                ? `${String(dt.getDate()).padStart(2,'0')}/${String(dt.getMonth()+1).padStart(2,'0')}/${dt.getFullYear()}`
                : (item?.label || '');
            },
            label: ctx => `${brl(ctx.parsed.y)}`,
            afterLabel: ctx => {
              const v = ctx.parsed.y;
              const var_ = ((v - primeiroVal) / primeiroVal * 100);
              return `Var. período: ${signPct(var_)}${fmt(var_)}`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(255,255,255,.04)', drawBorder: false },
          ticks: {
            color: '#3d4560',
            font: { family: 'JetBrains Mono', size: 9 },
            maxTicksLimit: window.innerWidth <= 768 ? 5 : 10,
            maxRotation: 0,
            minRotation: 0,
            autoSkip: false,
            callback: function(value, index, ticks){
              const total = Array.isArray(ticks) ? ticks.length : (this.chart?.data?.labels?.length || 0);
              const maxLabels = window.innerWidth <= 768 ? 5 : 10;
              const label = this.getLabelForValue(value);
              if(total <= maxLabels) return label;
              const step = Math.max(1, Math.ceil((total - 1) / (maxLabels - 1)));
              if(index === 0 || index === total - 1 || index % step === 0) return label;
              return '';
            }
          }
        },
        y: {
          grid: { color: 'rgba(255,255,255,.04)', drawBorder: false },
          ticks: {
            color: '#5e6b8a', font: { family: 'JetBrains Mono', size: 10 },
            callback: v => brl(v)
          }
        }
      }
    }
  });
}

// Tabs do gráfico dólar
document.querySelectorAll('[data-dolar-range]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-dolar-range]').forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected','false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected','true');
    buildChartDolar(btn.dataset.dolarRange);
  });
});

/* ════════════════════════════════════════════════════
   ATUALIZAR TABELA DE INDICADORES (tabs 12M/24M/36M)
════════════════════════════════════════════════════ */
function atualizarTabelaIndicadores(){
  const m = activePeriodTab;
  const hoje = new Date();

  const set = (id, txt) => { const el=$(id); if(el) el.textContent = txt; };
  const setHTML = (id, html) => { const el=$(id); if(el) el.innerHTML = html; };
  const num = v => {
    if(v === null || v === undefined || v === '') return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  };
  const pctTxt = n => n === null || n === undefined || Number.isNaN(Number(n))
    ? '—'
    : (Number(n) > 0 ? '+' : '') + Number(n).toFixed(2).replace('.',',') + '%';

  const limparStatus = (txt='') => String(txt || '').replace(/^(FECHADO|PARCIAL|AGUARDANDO)\s*/i,'').trim();
  const subStatus = (label, status='fechado') => {
    const cleanLabel = limparStatus(label || '—');
    const s = String(status || 'fechado').toLowerCase();
    const nome = s === 'aguardando' ? 'aguardando' : s === 'parcial' ? 'parcial' : 'fechado';
    const statusTxt = nome === 'fechado' ? 'fechado' : nome === 'parcial' ? 'parcial' : 'aguardando';
    return `<span class="period-line status-${nome}"><span class="period-label">${cleanLabel}</span><span class="period-dot">·</span><span class="period-status">${statusTxt}</span></span>`;
  };

  const setSubStatus = (id, label, status='fechado') => setHTML(id, subStatus(label, status));
  const setSubSimple = (id, label) => {
    const el = $(id);
    if(el) el.textContent = limparStatus(label || '—');
  };
  const atePeriodo = (label) => label ? `até ${limparStatus(label)}` : 'até último dado';

  const setPct = (id, n, barId, maxPct=20, inverse=false, emptyText='—') => {
    const el=$(id);
    const val=num(n);

    if(el){
      if(val === null){
        el.textContent = emptyText;
        el.className = 'v2-val dash';
      }else{
        const cls = val > 0 ? (inverse ? 'neg' : 'pos') : val < 0 ? (inverse ? 'pos' : 'neg') : 'neu';
        el.textContent = pctTxt(val);
        el.className = 'v2-val ' + cls;
      }
    }

    const bar=$(barId);
    if(bar){
      if(val === null){
        bar.style.width = '0%';
        bar.className = '';
      }else{
        const cls = val > 0 ? (inverse ? 'v2-bar-n' : 'v2-bar-p') : val < 0 ? (inverse ? 'v2-bar-p' : 'v2-bar-n') : 'v2-bar-p';
        bar.style.width = Math.min(Math.abs(val) / maxPct * 100, 100) + '%';
        bar.className = cls;
      }
    }
  };

  const setPts = (id, v, sufixo='pts', emptyText='—') => {
    const val=num(v);
    set(id, val === null ? emptyText : `${fmtK(val)} ${sufixo}`);
    const el=$(id);
    if(el) el.className = val === null ? 'v2-val dash' : 'v2-val neu';
  };

  const setMoney = (id, v, emptyText='—') => {
    const val=num(v);
    set(id, val === null ? emptyText : brl(val));
    const el=$(id);
    if(el) el.className = val === null ? 'v2-val dash' : 'v2-val neu';
  };

  const monthKey = d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
  const labelFromDate = dataStr => {
    if(!dataStr) return null;
    const m = String(dataStr).match(/^(\d{4})-(\d{2})-(\d{2})/);
    if(!m) return null;
    const ano = Number(m[1]);
    const mes = Number(m[2]) - 1;
    return `${MESES_PT[mes]}/${ano}`;
  };
  const keyFromDate = dataStr => {
    if(!dataStr) return null;
    const m = String(dataStr).match(/^(\d{4})-(\d{2})-(\d{2})/);
    return m ? `${m[1]}-${m[2]}` : null;
  };
  const parseLabelKey = label => {
    const m = String(label || '').match(/([a-zç]{3})\/(\d{4})/i);
    if(!m) return null;
    const mes = MESES_PT.findIndex(x => x.toLowerCase() === m[1].toLowerCase());
    return mes >= 0 ? `${m[2]}-${String(mes+1).padStart(2,'0')}` : null;
  };
  const currentKey = monthKey(hoje);
  const mesAtualLabel = `${MESES_PT[hoje.getMonth()]}/${hoje.getFullYear()}`;
  const anoLabel = `jan→${MESES_PT[hoje.getMonth()]}/${hoje.getFullYear()}`;

  const isAtualNoMesCorrente = item => keyFromDate(item?.data_atual) === currentKey;
  const itemTemDadoAtual = item => num(item?.fechamento_atual) !== null && isAtualNoMesCorrente(item);

  const indices = _dadosMercado?.indices_mercado || {};
  const cards = _dadosMercado?.cards || {};
  const intl = _dadosMercado?.indices_internacionais || {};

  const idxDolar = indices.dolar || {};
  const idxIbov = indices.ibovespa || {};
  const idxSp = indices.sp500 || intl.sp500 || {};
  const idxDow = indices.dow_jones || intl.dow_jones_detalhado || {};
  const idxNasdaq = indices.nasdaq || intl.nasdaq_detalhado || {};

  function fechadoDeItem(item, fallbackLabel){
    const dataLabel = labelFromDate(item?.data_atual);
    const dataKey = keyFromDate(item?.data_atual);
    const itemLabelKey = parseLabelKey(item?.mes_anterior_label);

    // Se o dado mais recente ainda é de mês já encerrado, ele é o último fechado.
    // Isso evita repetir a mesma cotação/pontuação em “fechado” e “mês atual” na virada do mês.
    if(dataKey && dataKey !== currentKey && dataLabel){
      const usarAtualComoFechado = !item?.mes_anterior_label || itemLabelKey !== dataKey;
      if(usarAtualComoFechado){
        return {
          label: dataLabel,
          valor: num(item?.fechamento_atual),
          variacao: num(item?.variacao_mes_atual) ?? num(item?.variacao_mes_fechado),
          brl: num(item?.variacao_mes_atual_brl) ?? num(item?.variacao_mes_fechado_brl),
        };
      }
    }

    return {
      label: item?.mes_anterior_label || fallbackLabel || dataLabel || 'último fechado',
      valor: num(item?.fechamento_mes_anterior) ?? num(item?.fechamento_atual),
      variacao: num(item?.variacao_mes_fechado) ?? num(item?.variacao_mes_atual),
      brl: num(item?.variacao_mes_fechado_brl),
    };
  }

  function atualDeItem(item){
    if(!itemTemDadoAtual(item)){
      return { label: mesAtualLabel, valor: null, variacao: null, brl: null, status: 'aguardando' };
    }
    return {
      label: item?.mes_atual_label || mesAtualLabel,
      valor: num(item?.fechamento_atual),
      variacao: num(item?.variacao_mes_atual),
      brl: num(item?.variacao_mes_atual_brl),
      status: 'parcial'
    };
  }

  const fallbackMesFechado =
    cards.cdi?.mes_ref ||
    idxIbov.mes_anterior_label ||
    idxDolar.mes_anterior_label ||
    (() => {
      const mAtualIdx = hoje.getMonth();
      const mAntIdx = mAtualIdx === 0 ? 11 : mAtualIdx - 1;
      const mAntAno = mAtualIdx === 0 ? hoje.getFullYear() - 1 : hoje.getFullYear();
      return `${MESES_PT[mAntIdx]}/${mAntAno}`;
    })();

  // Cabeçalhos mais claros para virada de mês
  set('th-mes-ant-sub', fallbackMesFechado);
  set('th-mes-cur-sub', mesAtualLabel);
  set('th-ano-sub', 'ano até agora');
  set('th-acum-sub-v2', `${m}M`);
  const thAcum = $('th-acum-head');
  if(thAcum) thAcum.firstChild.textContent = `Acum. ${m}M `;

  // ═══ CDI ═══
  const cdiMesFechado = num(cards.cdi?.mensal) ?? num(indicState.cdi.mes);
  const cdiAtualInfo = obterCdiAtualV232(_dadosMercado);
  const cdiParcial = num(cdiAtualInfo.valor);
  const cdiParcialLabel = cdiAtualInfo.referencia || mesAtualLabel;
  const cdiAno = (cdiParcial !== null ? num(cards.cdi?.acum_ano_com_parcial) : num(cards.cdi?.acum_ano)) ?? num(cards.cdi?.acum_ano_com_parcial) ?? null;
  const cdiAcum = num(resolverCdiPeriodoV229(cards.cdi || {}, m));

  setPct('cdi-mes-ant', cdiMesFechado, 'bar-cdi-ant', 2);
  setSubStatus('cdi-mes-ant-sub', cards.cdi?.mes_ref || fallbackMesFechado, 'fechado');

  setPct('cdi-mes-cur', cdiParcial, 'bar-cdi-cur', 2, false, '—');
  setSubStatus('cdi-cur-sub', cdiParcialLabel, cdiParcial !== null ? 'parcial' : 'aguardando');
  const cdiCurSub = $('cdi-cur-sub');
  if(cdiCurSub && cdiParcial !== null){
    const contexto = contextoCdiAtualV233(cdiAtualInfo);
    cdiCurSub.innerHTML = `<span class="period-line status-parcial cdi-period-context-v233"><span class="period-label">${contexto.title}</span><span class="period-dot">·</span><span class="period-status">${contexto.detail}</span></span>`;
    cdiCurSub.title = `${contexto.title}. ${contexto.detail}${cdiAtualInfo.origem ? ` · fonte ${cdiAtualInfo.origem}` : ''}`;
  }

  setPct('cdi-ano', cdiAno, 'bar-cdi-ano', 15);
  setSubSimple('cdi-ano-sub', atePeriodo(cdiParcial !== null ? cdiParcialLabel : (cards.cdi?.mes_ref || fallbackMesFechado)));

  setPct('cdi-acum-v2', cdiAcum, 'bar-cdi-acum', 50);
  if($('cdi-acum-v2') && cdiAcum !== null) $('cdi-acum-v2').classList.add('pos');
  set('cdi-acum-src-v2', `${m}M`);

  // ═══ IPCA ═══
  const ipcaMes = num(cards.ipca?.ultimo_mes) ?? num(indicState.ipca.mes);
  const ipcaRef = cards.ipca?.label_mes || indicState.ipca.mesRef || 'último dado';
  const ipcaAno = num(cards.ipca?.acum_ano) ?? num(indicState.ipca.ano);
  const ipcaAcum = num(cards.ipca?.[`acum_${m}m`]) ?? num(indicState.ipca[`m${m}`]);

  setPct('ipca-mes-ant', ipcaMes, 'bar-ipca-ant', 2, false);
  setSubStatus('ipca-mes-ant-sub', ipcaRef, 'fechado');
  const ipcaCurCell = document.querySelector('#row-ipca .td-cur');
  if(ipcaCurCell){
    ipcaCurCell.innerHTML = `<div class="v2-val dash">—</div><div class="v2-sub status-line">${subStatus(mesAtualLabel, 'aguardando')}</div>`;
  }
  setPct('ipca-ano-v2', ipcaAno, 'bar-ipca-ano', 10, false);
  const ipcaAnoSub = document.querySelector('#row-ipca td:nth-child(4) .v2-sub');
  if(ipcaAnoSub) ipcaAnoSub.textContent = atePeriodo(ipcaRef);
  setPct('ipca-acum-v2', ipcaAcum, 'bar-ipca-acum', 20, false);
  set('ipca-acum-sub-v2', `${m}M`);

  const alertEl = $('ipca-alert-badge');
  const rowIpca = $('row-ipca');
  if(alertEl && ipcaAcum !== null){
    const show = ipcaAcum > 4.5;
    alertEl.style.display = show ? 'inline-block' : 'none';
    if(rowIpca) rowIpca.className = 'data-row';
  }

  // ═══ DÓLAR ═══
  const dolarFechado = fechadoDeItem(idxDolar, fallbackMesFechado);
  const dolarAtualInfo = atualDeItem(idxDolar);
  const dolarAno = num(idxDolar.acum_ano) ?? num(cards.dolar?.acum_ano) ?? num(indicState.dolarPct.ano);
  const dolarAcum = num(idxDolar[`acum_${m}m`]) ?? num(cards.dolar?.[`acum_${m}m`]) ?? num(indicState.dolarPct[`m${m}`]);

  setMoney('dolar-ant-cot', dolarFechado.valor ?? indicState.dolarBRL.mes);
  setSubStatus('dolar-ant-sub', dolarFechado.label, 'fechado');

  setMoney('dolar-cur-cot', dolarAtualInfo.valor, '—');
  setPct('dolar-cur-var', dolarAtualInfo.variacao, 'bar-dolar-cur', 10, false, '');
  setSubStatus('dolar-cur-sub', dolarAtualInfo.label, dolarAtualInfo.status);
  setPct('dolar-ano-v2', dolarAno, 'bar-dolar-ano', 15);
  const dolarAnoSub = document.querySelector('#row-dolar td:nth-child(4) .v2-sub');
  if(dolarAnoSub) dolarAnoSub.textContent = atePeriodo(dolarAtualInfo.status === 'parcial' ? dolarAtualInfo.label : dolarFechado.label);
  setPct('dolar-acum-v2', dolarAcum, 'bar-dolar-acum', 25);
  set('dolar-acum-sub-v2', `${m}M`);

  // ═══ IBOVESPA ═══
  const ibovFechado = fechadoDeItem(idxIbov, fallbackMesFechado);
  const ibovAtualInfo = atualDeItem(idxIbov);
  const ibovAno = num(idxIbov.acum_ano) ?? num(cards.ibovespa?.acum_ano);
  const ibovAcum = num(idxIbov[`acum_${m}m`]) ?? num(cards.ibovespa?.[`acum_${m}m`]);

  setPts('ibov-ant-pts', ibovFechado.valor);
  setPct('ibov-ant-var', ibovFechado.variacao, 'bar-ibov-ant', 20);
  setSubStatus('ibov-ant-sub', ibovFechado.label, 'fechado');

  setPts('ibov-cur-pts', ibovAtualInfo.valor, 'pts', '—');
  setPct('ibov-cur-var', ibovAtualInfo.variacao, 'bar-ibov-var', 20, false, '');
  setSubStatus('ibov-cur-sub', ibovAtualInfo.label, ibovAtualInfo.status);

  setPct('ibov-ano-v2', ibovAno, 'bar-ibov-ano', 40);
  const ibovAnoSub = document.querySelector('#row-ibov td:nth-child(4) .v2-sub');
  if(ibovAnoSub) ibovAnoSub.textContent = atePeriodo(ibovAtualInfo.status === 'parcial' ? ibovAtualInfo.label : ibovFechado.label);
  setPct('ibov-acum-v2', ibovAcum, 'bar-ibov-acum', 80);
  set('ibov-acum-sub-v2', `${m}M`);

  // ═══ BOLSAS EUA ═══
  function usdBrlHTML(usd, brl){
    const u = num(usd), b = num(brl);
    const clsU = u === null ? 'dash' : u > 0 ? 'pos' : u < 0 ? 'neg' : 'neu';
    const clsB = b === null ? 'dash' : b > 0 ? 'pos' : b < 0 ? 'neg' : 'neu';

    const linha = (rotulo, valor, cls, extra='') => `
      <div class="us-market-line ${cls} ${extra}">
        <span class="us-market-label">${rotulo}</span>
        <strong class="us-market-value">${pctTxt(valor)}</strong>
      </div>`;

    return `
      <div class="us-market-block" aria-label="Variação em dólar e em reais">
        ${linha('USD', u, clsU, 'usd')}
        ${b !== null ? linha('BRL', b, clsB, 'brl') : ''}
      </div>`;
  }

  function popularIndiceEUA(prefix, item){
    const fechado = fechadoDeItem(item, fallbackMesFechado);
    const atual = atualDeItem(item);
    const ano = num(item?.acum_ano);
    const anoBrl = num(item?.acum_ano_brl);
    const acum = num(item?.[`acum_${m}m`]);
    const acumBrl = num(item?.[`acum_${m}m_brl`]);

    setHTML(`${prefix}-ant-var`, usdBrlHTML(fechado.variacao, fechado.brl));
    const antEl = $(`${prefix}-ant-var`); if(antEl) antEl.className = 'v2-val us-market-stack';
    setSubStatus(`${prefix}-ant-sub`, fechado.label, 'fechado');

    setPts(`${prefix}-cur-pts`, atual.valor, 'pts', '—');
    setHTML(`${prefix}-cur-var`, atual.variacao === null ? '' : usdBrlHTML(atual.variacao, atual.brl));
    const curEl = $(`${prefix}-cur-var`); if(curEl) curEl.className = atual.variacao === null ? 'v2-val dash' : 'v2-val us-market-stack';
    const barCur = $(`bar-${prefix}-cur`); if(barCur){ barCur.style.width = atual.variacao === null ? '0%' : Math.min(Math.abs(atual.variacao)/35*100,100)+'%'; barCur.className = atual.variacao >= 0 ? 'v2-bar-p' : 'v2-bar-n'; }
    setSubStatus(`${prefix}-cur-sub`, atual.label, atual.status);

    setHTML(`${prefix}-ano-var`, usdBrlHTML(ano, anoBrl));
    const anoEl = $(`${prefix}-ano-var`); if(anoEl) anoEl.className = 'v2-val us-market-stack';
    const barAno = $(`bar-${prefix}-ano`); if(barAno){ barAno.style.width = ano === null ? '0%' : Math.min(Math.abs(ano)/60*100,100)+'%'; barAno.className = ano >= 0 ? 'v2-bar-p' : 'v2-bar-n'; }
    setSubSimple(`${prefix}-ano-sub`, atePeriodo(atual.status === 'parcial' ? atual.label : fechado.label));

    setHTML(`${prefix}-acum-var`, usdBrlHTML(acum, acumBrl));
    const acumEl = $(`${prefix}-acum-var`); if(acumEl) acumEl.className = 'v2-val us-market-stack';
    const barAcum = $(`bar-${prefix}-acum`); if(barAcum){ barAcum.style.width = acum === null ? '0%' : Math.min(Math.abs(acum)/120*100,100)+'%'; barAcum.className = acum >= 0 ? 'v2-bar-p' : 'v2-bar-n'; }
    set(`${prefix}-acum-sub-v2`, `${m}M`);
  }

  if(!idxSp || Object.keys(idxSp).length === 0){
    if(intl.sp500_usd) setPts('sp-cur-pts', intl.sp500_usd);
  }else{
    popularIndiceEUA('sp', idxSp);
  }
  popularIndiceEUA('dow', idxDow);
  popularIndiceEUA('nasdaq', idxNasdaq);
}


/* ════════════════════════════════════════════════════
   v229 — CONTROLADOR ÚNICO DO PERÍODO DE MERCADO
   - sincroniza estado, botões, aria-pressed, tabela e visão executiva;
   - usa apenas o evento click, compatível com mouse, toque e teclado;
   - remove a necessidade de z-index elevado e hit-test por coordenadas.
════════════════════════════════════════════════════ */
const MARKET_PERIOD_OPTIONS_V229 = Object.freeze([12, 24, 36]);

function normalizarPeriodoMercadoV229(value){
  const months = Number.parseInt(value, 10);
  return MARKET_PERIOD_OPTIONS_V229.includes(months) ? months : 12;
}

function sincronizarBotoesPeriodoMercadoV229(months){
  const selected = normalizarPeriodoMercadoV229(months);

  document.querySelectorAll('.indic-tab[data-months]').forEach(button => {
    const isActive = Number.parseInt(button.dataset.months, 10) === selected;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  });
}

function selecionarPeriodoMercadoV229(value, options = {}){
  const months = normalizarPeriodoMercadoV229(value);
  const source = options.source || 'api';
  const shouldRender = options.render !== false;

  activePeriodTab = months;
  document.documentElement.dataset.indicPeriod = String(months);
  sincronizarBotoesPeriodoMercadoV229(months);

  let renderOk = true;
  if(shouldRender){
    try{
      atualizarTabelaIndicadores();
    }catch(error){
      renderOk = false;
      console.error('[ELTAUM_MARKET_PERIOD_CDI_SOURCE_20260618_v230] Falha ao atualizar os indicadores:', error);
    }
  }

  // Se o valor do período ainda não estiver no estado, busca novamente o JSON
  // e redesenha apenas quando o usuário continuar no mesmo período.
  if(resolverCdiPeriodoV229(cdiCardAtualV230(), months) === null){
    garantirCdiPeriodoV230(months).then(value => {
      if(value !== null && activePeriodTab === months){
        atualizarTabelaIndicadores();
        document.dispatchEvent(new CustomEvent('elton:market-cdi-ready', { detail: { months, value } }));
      }
    }).catch(error => console.warn(`[CDI v230] Falha ao garantir ${months}M:`, error));
  }

  document.dispatchEvent(new CustomEvent('elton:market-period-change', {
    detail: { months, source, renderOk }
  }));

  return renderOk;
}

function inicializarPeriodoMercadoV229(){
  const fromDataset = document.documentElement.dataset.indicPeriod;
  const fromActiveButton = document.querySelector('.indic-tab.active[data-months]')?.dataset.months;
  const initial = fromDataset || fromActiveButton || activePeriodTab || 12;
  selecionarPeriodoMercadoV229(initial, { source: 'init', render: false });
}

// Exportações explícitas: evitam depender de propriedades globais implícitas.
window.atualizarTabelaIndicadores = atualizarTabelaIndicadores;
window.selecionarPeriodoMercado = selecionarPeriodoMercadoV229;
window.getPeriodoMercado = () => activePeriodTab;
window.__marketPeriodBuild = 'ELTAUM_MARKET_PERIOD_CDI_SOURCE_20260618_v230';

// Captura única para impedir que o clique no botão abra/feche o bloco pai.
document.addEventListener('click', event => {
  const button = event.target?.closest?.('.indic-tab[data-months]');
  if(!button) return;

  event.preventDefault();
  event.stopPropagation();
  selecionarPeriodoMercadoV229(button.dataset.months, { source: 'user' });
}, true);

if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', inicializarPeriodoMercadoV229, { once: true });
}else{
  inicializarPeriodoMercadoV229();
}

window.addEventListener('pageshow', () => {
  sincronizarBotoesPeriodoMercadoV229(activePeriodTab);
});

/* ════════════════════════════════════════════════════
   NORMALIZA mercado_atual.json PARA A TABELA DE INDICADORES
   Resolve compatibilidade entre o JSON gerado pelo robô e a estrutura
   esperada pela tabela nova.
════════════════════════════════════════════════════ */
function normalizarMercadoAtual(d){
  if(!d || typeof d !== 'object') return d;

  const c = d.cards || {};
  const intl = d.indices_internacionais || {};

  // A tabela nova lê d.indices_mercado.
  // O robô atual ainda manda Ibovespa/Dólar dentro de cards
  // e índices internacionais como valores simples.
  if(!d.indices_mercado) d.indices_mercado = {};

  const put = (obj, key, value) => {
    if(value !== null && value !== undefined && value !== '' && obj[key] === undefined){
      obj[key] = value;
    }
  };

  // Dólar — compatibiliza cards.dolar -> indices_mercado.dolar
  if(!d.indices_mercado.dolar) d.indices_mercado.dolar = {};
  if(c.dolar){
    put(d.indices_mercado.dolar, 'fechamento_atual', c.dolar.atual);
    put(d.indices_mercado.dolar, 'fechamento_mes_anterior', c.dolar.anterior);
    put(d.indices_mercado.dolar, 'variacao_mes_atual', c.dolar.variacao_mensal);
    put(d.indices_mercado.dolar, 'variacao_mes_fechado', c.dolar.variacao_mes_fechado);
    put(d.indices_mercado.dolar, 'acum_ano', c.dolar.acum_ano);
    put(d.indices_mercado.dolar, 'acum_12m', c.dolar.acum_12m);
    put(d.indices_mercado.dolar, 'acum_24m', c.dolar.acum_24m);
    put(d.indices_mercado.dolar, 'acum_36m', c.dolar.acum_36m);
  }

  // Ibovespa — compatibiliza cards.ibovespa -> indices_mercado.ibovespa
  if(!d.indices_mercado.ibovespa) d.indices_mercado.ibovespa = {};
  if(c.ibovespa){
    put(d.indices_mercado.ibovespa, 'fechamento_atual', c.ibovespa.atual);
    put(d.indices_mercado.ibovespa, 'fechamento_mes_anterior', c.ibovespa.anterior);
    put(d.indices_mercado.ibovespa, 'variacao_mes_atual', c.ibovespa.variacao_mensal);
    put(d.indices_mercado.ibovespa, 'variacao_mes_fechado', c.ibovespa.variacao_mes_fechado);
    put(d.indices_mercado.ibovespa, 'acum_ano', c.ibovespa.acum_ano);
    put(d.indices_mercado.ibovespa, 'acum_12m', c.ibovespa.acum_12m);
    put(d.indices_mercado.ibovespa, 'acum_24m', c.ibovespa.acum_24m);
    put(d.indices_mercado.ibovespa, 'acum_36m', c.ibovespa.acum_36m);
  }

  // Bolsa EUA — o robô atual entrega só o valor atual como número.
  // A tabela nova espera objeto com fechamento_atual e variações.
  const garantirIndiceEUA = (nome, valorAtual) => {
    if(!d.indices_mercado[nome]) d.indices_mercado[nome] = {};
    put(d.indices_mercado[nome], 'fechamento_atual', valorAtual);
  };

  garantirIndiceEUA('sp500', intl.sp500_usd);
  garantirIndiceEUA('dow_jones', intl.dow_jones);
  garantirIndiceEUA('nasdaq', intl.nasdaq);

  return d;
}



/* ════════════════════════════════════════════════════
   ROBÔ v17 — indices_mercado já vem completo dentro de mercado_atual.json.
   Arquivo indices_mercado_teste.json foi eliminado (era gerado separadamente
   nas versões anteriores). A função abaixo é mantida como stub para não
   quebrar a chamada em carregarMercado(), mas não faz fetch algum.
════════════════════════════════════════════════════ */
async function carregarIndicesMercadoDetalhados(){
  // v17: todos os campos de dólar, ibovespa, S&P, Dow e Nasdaq
  // (mês fechado, mês atual, ano, 12M, 24M, 36M + BRL) já chegam
  // dentro de mercado_atual.json → indices_mercado. Nada a buscar.
  return null;
}

function mesclarMercadoComIndicesDetalhados(raw, detalhado){
  if(!raw || typeof raw !== 'object' || !detalhado || typeof detalhado !== 'object') return raw;

  // Mantém o mercado_atual.json como arquivo principal, mas injeta
  // os objetos detalhados que a tabela nova usa.
  raw.indices_mercado = raw.indices_mercado || {};

  if(detalhado.indices_mercado && typeof detalhado.indices_mercado === 'object'){
    Object.entries(detalhado.indices_mercado).forEach(([chave, valor]) => {
      const atual = raw.indices_mercado[chave] || {};
      raw.indices_mercado[chave] = {
        ...(valor || {}),
        ...(atual || {})
      };
    });
  }

  raw.indices_internacionais = raw.indices_internacionais || {};

  if(detalhado.indices_internacionais && typeof detalhado.indices_internacionais === 'object'){
    raw.indices_internacionais = {
      ...detalhado.indices_internacionais,
      ...raw.indices_internacionais
    };
  }

  if(detalhado.gerado_em) raw.indices_mercado_gerado_em = detalhado.gerado_em;

  return raw;
}




function atualizarResumoCenario(d){
  const el = $('marketScenarioText');
  if(!el) return;
  const toNum = v => {
    if(v === null || v === undefined || v === '') return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  };
  const pct = v => v === null ? '—' : `${v > 0 ? '+' : ''}${v.toFixed(2).replace('.',',')}%`;
  const c = d?.cards || {};
  const idx = d?.indices_mercado || {};
  const cdi = toNum(c.cdi?.valor);
  const cdiMes = toNum(c.cdi?.parcial_mes_atual) ?? toNum(c.cdi?.mensal) ?? null;
  const ipca12 = toNum(c.ipca?.acum_12m) ?? toNum(indicState.ipca.m12);
  const dolarAno = toNum(idx.dolar?.acum_ano) ?? toNum(c.dolar?.acum_ano) ?? null;

  const partes = [];
  if(cdi !== null) partes.push(`CDI em <strong>${fmt(cdi)}</strong> a.a.`);
  if(cdiMes !== null) partes.push(`mês atual em <strong>${pct(cdiMes)}</strong>`);
  if(ipca12 !== null) partes.push(`IPCA 12M em <strong>${fmt(ipca12)}</strong>`);
  if(dolarAno !== null){
    const direcao = dolarAno < 0 ? 'queda' : dolarAno > 0 ? 'alta' : 'estabilidade';
    partes.push(`dólar com ${direcao} de <strong>${pct(dolarAno)}</strong> no ano`);
  }

  el.innerHTML = partes.length
    ? `Juros ainda elevados, ${partes.join(', ')}.`
    : 'Dados principais carregados. Execute o robô de mercado para atualizar a leitura automática do cenário.';
}


let _chartCdiYearV271 = null;

function renderCdiYearHistory(d){
  const chartCanvas = $('cdiYearChartV271');
  if(!chartCanvas) return;

  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const cdi = d?.cards?.cdi || {};
  const hist = Array.isArray(cdi.historico) ? cdi.historico : [];
  const title = $('cdiYearHistoryTitle');
  const totalEl = $('cdiYearHistoryTotal');
  const currentLabelEl = $('cdiCurrentMonthLabelV271');
  const currentValueEl = $('cdiCurrentMonthValueV271');
  const lastLabelEl = $('cdiLastClosedLabelV271');
  const lastValueEl = $('cdiLastClosedValueV271');
  const accumEl = $('cdiAccumYearValueV271');
  const accumLabelElV298 = $('cdiAccumYearLabelV298');
  const last12mElV296 = $('cdiLast12mValueV296');
  const last12mLabelElV298 = $('cdiLast12mLabelV298');
  const cdiMonthCarouselV322 = $('cdiMonthCarouselV322');

  const fmtPctLocal = v => {
    const n = Number(v);
    if(!Number.isFinite(n)) return '—';
    return (n >= 0 ? '+' : '') + n.toFixed(2).replace('.',',') + '%';
  };
  const fmtAxis = v => {
    const n = Number(v);
    if(!Number.isFinite(n)) return '—';
    return n.toFixed(0).replace('.',',') + '%';
  };
  const normalizar = txt => String(txt || '').trim().toLowerCase();
  const mesCurto = item => {
    const raw = String(item?.label || item?.key || '').trim();
    const m = raw.match(/^(\d{4})-(\d{2})/);
    if(m){
      const nomes = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
      return nomes[Math.max(0, Math.min(11, Number(m[2]) - 1))];
    }
    return raw.replace(/\/\d{4}/,'').slice(0,3).toLowerCase();
  };
  const labelMesAno = item => {
    const raw = String(item?.label || item?.key || '').trim();
    if(raw.includes('/')) return raw;
    const m = raw.match(/^(\d{4})-(\d{2})/);
    if(m){
      const nomes = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
      return nomes[Math.max(0, Math.min(11, Number(m[2]) - 1))] + '/' + m[1];
    }
    return raw;
  };

  if(!hist.length){
    if(title) title.textContent = 'CDI no ano';
    if(totalEl) totalEl.textContent = 'Ano —';
    if(currentLabelEl) currentLabelEl.textContent = 'Mês atual';
    if(currentValueEl) currentValueEl.textContent = '—';
    if(lastLabelEl) lastLabelEl.textContent = 'Último fechado';
    if(lastValueEl) lastValueEl.textContent = '—';
    if(accumEl) accumEl.textContent = '—';
    if(accumLabelElV298) accumLabelElV298.textContent = 'Ano';
    if(last12mElV296) last12mElV296.textContent = '—';
    if(last12mLabelElV298) last12mLabelElV298.textContent = '12 meses';
    if(cdiMonthCarouselV322) cdiMonthCarouselV322.innerHTML = '<span class="cdi-month-empty-v322">Histórico mensal indisponível.</span>';
    if(_chartCdiYearV271){ _chartCdiYearV271.destroy(); _chartCdiYearV271 = null; }
    return;
  }

  const ordenado = [...hist].sort((a,b) => String(a?.key || '').localeCompare(String(b?.key || '')));
  const last = ordenado[ordenado.length - 1];
  const ano = String(last?.key || '').slice(0,4) || String(new Date().getFullYear());
  const mesesAno = ordenado.filter(x => String(x?.key || '').startsWith(ano + '-'));

  const parcialRef = normalizar(cdi.parcial_ref);
  const mesFechadoRef = normalizar(cdi.mes_ref);
  const byLabel = label => mesesAno.find(x => normalizar(x?.label) === label || normalizar(mesCurto(x)) === label);
  const atualParcial = parcialRef ? byLabel(parcialRef) : mesesAno[mesesAno.length - 1];
  const ultimoFechado = mesFechadoRef ? byLabel(mesFechadoRef) : [...mesesAno].reverse().find(x => x !== atualParcial) || mesesAno[mesesAno.length - 1];

  const labels = mesesAno.map(mesCurto).map(s => s.toUpperCase());
  const mensal = mesesAno.map(item => Number(item?.valor ?? 0));
  const acumulado = [];
  let running = 1;
  mensal.forEach((valor) => {
    const n = Number.isFinite(valor) ? valor : 0;
    running *= (1 + n / 100);
    acumulado.push(Number(((running - 1) * 100).toFixed(2)));
  });

  const idxAtual = Math.max(0, mesesAno.indexOf(atualParcial));
  const idxFechado = Math.max(0, mesesAno.indexOf(ultimoFechado));
  const acumAno = Number(cdi.acum_ano_com_parcial ?? cdi.acum_ano ?? acumulado[acumulado.length - 1]);
  const cdi12mV296 = typeof resolverCdiPeriodoV229 === 'function' ? resolverCdiPeriodoV229(cdi, 12) : Number(cdi.acum_12m ?? cdi.m12);

  const cdi12mFixV323 = (() => {
    const direto = Number(cdi.acum_12m ?? cdi.m12 ?? cdi.acumulado_12m ?? cdi.acum12m);
    if(Number.isFinite(direto)) return direto;

    if(typeof resolverCdiPeriodoV229 === 'function'){
      const resolvido = Number(resolverCdiPeriodoV229(cdi, 12));
      if(Number.isFinite(resolvido)) return resolvido;
    }

    const ultimos12 = ordenado.slice(-12).map(item => Number(item?.valor)).filter(Number.isFinite);
    if(ultimos12.length){
      const fator = ultimos12.reduce((acc, v) => acc * (1 + v / 100), 1);
      return Number(((fator - 1) * 100).toFixed(2));
    }

    return NaN;
  })();

  if(title) title.textContent = isMobile ? `CDI mensal ${ano}` : `CDI mensal + acumulado ${ano}`;
  if(accumLabelElV298) accumLabelElV298.textContent = isMobile ? `Ano ${ano}` : 'Acumulado no ano';
  if(last12mLabelElV298) last12mLabelElV298.textContent = isMobile ? 'CDI 12M' : 'Últimos 12 meses';
  if(totalEl) totalEl.textContent = Number.isFinite(acumAno) ? `Ano ${fmtPctLocal(acumAno)}` : 'Ano —';
  if(currentLabelEl) currentLabelEl.textContent = atualParcial ? `${mesCurto(atualParcial).toUpperCase()} · parcial` : 'Mês atual';
  if(currentValueEl) currentValueEl.textContent = atualParcial ? fmtPctLocal(atualParcial.valor) : '—';
  if(lastLabelEl) lastLabelEl.textContent = ultimoFechado ? `${mesCurto(ultimoFechado).toUpperCase()} · fechado` : 'Último fechado';
  if(lastValueEl) lastValueEl.textContent = ultimoFechado ? fmtPctLocal(ultimoFechado.valor) : '—';
  if(accumEl) accumEl.textContent = Number.isFinite(acumAno) ? fmtPctLocal(acumAno) : '—';
  if(last12mElV296) last12mElV296.textContent = Number.isFinite(cdi12mFixV323) ? fmtPctLocal(cdi12mFixV323) : '—';

  if(cdiMonthCarouselV322){
    cdiMonthCarouselV322.innerHTML = mesesAno.map((item, idx) => {
      const valor = Number(item?.valor);
      const acum = acumulado[idx];
      const isAtual = item === atualParcial;
      const isFechado = item === ultimoFechado;
      const sinal = Number.isFinite(valor) && valor < 0 ? 'neg' : 'pos';
      const label = mesCurto(item).toUpperCase();
      const status = isAtual ? `${label} · parcial` : label;
      const acumTxt = Number.isFinite(acum) ? fmtPctLocal(acum) : '—';
      return `
        <article class="cdi-month-card-v322 ${sinal} ${isAtual ? 'is-current' : ''} ${isFechado ? 'is-lastclosed' : ''}" role="listitem">
          <span class="cdi-month-kicker-v322">${status}</span>
          <strong class="cdi-month-value-v322">${Number.isFinite(valor) ? fmtPctLocal(valor) : '—'}</strong>
          <small class="cdi-month-accum-v322">Ano ${acumTxt}</small>
        </article>`;
    }).join('');
  }

  if(!window.Chart){
    setTimeout(() => renderCdiYearHistory(d), 300);
    return;
  }

  const barBg = mensal.map((_,i) => i === idxAtual ? 'rgba(45, 212, 160, 0.62)' : i === idxFechado ? 'rgba(232, 180, 92, 0.50)' : 'rgba(125, 162, 255, 0.28)');
  const barBorder = mensal.map((_,i) => i === idxAtual ? 'rgba(45, 212, 160, 0.96)' : i === idxFechado ? 'rgba(232, 180, 92, 0.86)' : 'rgba(125, 162, 255, 0.52)');
  const maxMensal = Math.max(0.1, ...mensal.filter(Number.isFinite));
  const maxAcumulado = Math.max(1, ...acumulado.filter(Number.isFinite), Number.isFinite(acumAno) ? acumAno : 0);

  // v276: eixos com escala linear explícita e degraus sincronizados.
  // Evita o Chart.js escolher ticks irregulares como 0/2/4/7 no eixo direito.
  const yGridStepsV276 = 4;
  const yMonthlyMax = maxMensal <= 1.75
    ? 2
    : Math.ceil((maxMensal + 0.10) / 0.5) * 0.5;
  const yMonthlyStepV276 = yMonthlyMax / yGridStepsV276;
  const yAccumMax = maxAcumulado <= 8
    ? 8
    : Math.ceil((maxAcumulado + 0.35) / 4) * 4;
  const yAccumStepV276 = yAccumMax / yGridStepsV276;
  const fmtAxis1 = value => {
    const n = Number(value);
    if(!Number.isFinite(n)) return '—';
    return n.toFixed(n % 1 === 0 ? 0 : 1).replace('.',',') + '%';
  };

  if(_chartCdiYearV271){
    try{ _chartCdiYearV271.destroy(); }catch(e){}
    _chartCdiYearV271 = null;
  }

  const chartInnerV273 = document.getElementById('cdiChartScrollInnerV273');
  const totalMesesV273 = labels.length;
  const minChartWidthV273 = isMobile ? '100%' : '100%';
  if(chartInnerV273){
    chartInnerV273.style.minWidth = typeof minChartWidthV273 === 'number' ? `${minChartWidthV273}px` : minChartWidthV273;
  }
  const barraEspessuraV273 = totalMesesV273 >= 11 ? (isMobile ? 10 : 18) : (totalMesesV273 >= 8 ? (isMobile ? 12 : 22) : (isMobile ? 16 : 26));
  const raioPontoV273 = totalMesesV273 >= 10 ? 2.2 : 2.8;
  const raioPontoDestaqueV273 = totalMesesV273 >= 10 ? 3.6 : 4.2;
  const mostrarTodosMesesV273 = true;

  const ctx = chartCanvas.getContext('2d');
  _chartCdiYearV271 = new Chart(ctx, {
    data: {
      labels,
      datasets: [
        {
          type: 'bar',
          label: 'CDI mensal',
          data: mensal,
          yAxisID: 'y',
          backgroundColor: barBg,
          borderColor: barBorder,
          borderWidth: 1.4,
          borderRadius: { topLeft: 8, topRight: 8, bottomLeft: 3, bottomRight: 3 },
          borderSkipped: false,
          barThickness: barraEspessuraV273,
          maxBarThickness: barraEspessuraV273 + 4
        },
        {
          type: 'line',
          label: 'CDI acumulado',
          data: acumulado,
          hidden: isMobile,
          yAxisID: 'y1',
          borderColor: '#e8b45c',
          backgroundColor: 'rgba(232, 180, 92, 0.10)',
          borderWidth: totalMesesV273 >= 10 ? 2.2 : 2.5,
          tension: 0.25,
          fill: false,
          pointBackgroundColor: acumulado.map((_,i) => i === idxAtual ? '#2dd4a0' : '#e8b45c'),
          pointBorderColor: '#080d18',
          pointBorderWidth: 1.4,
          pointRadius: acumulado.map((_,i) => i === idxAtual || i === idxFechado ? raioPontoDestaqueV273 : raioPontoV273),
          pointHoverRadius: raioPontoDestaqueV273 + 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      resizeDelay: 80,
      layout: { padding: { left: 4, right: isMobile ? 8 : 12, top: 4, bottom: 0 } },
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(11,16,33,.96)',
          titleColor: '#ffffff',
          bodyColor: '#dfe7ff',
          borderColor: 'rgba(255,255,255,.08)',
          borderWidth: 1,
          displayColors: true,
          callbacks: {
            title(items){
              const i = items?.[0]?.dataIndex ?? 0;
              return labelMesAno(mesesAno[i]);
            },
            label(context){
              const value = Number(context.parsed.y);
              const txt = fmtPctLocal(value);
              return `${context.dataset.label}: ${txt}`;
            },
            afterBody(){
              return isMobile ? '' : undefined;
            }
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            color: 'rgba(229,235,255,0.74)',
            autoSkip: false,
            maxRotation: 0,
            minRotation: 0,
            font: { size: totalMesesV273 >= 11 ? (isMobile ? 8 : 10) : (isMobile ? 9 : 11), weight: '700' }
          }
        },
        y: {
          type: 'linear',
          beginAtZero: true,
          min: 0,
          max: yMonthlyMax,
          bounds: 'ticks',
          ticks: {
            color: 'rgba(188,200,234,0.72)',
            padding: 8,
            stepSize: yMonthlyStepV276,
            callback: value => fmtAxis1(value)
          },
          grid: {
            color: 'rgba(255,255,255,0.06)',
            tickLength: 0
          }
        },
        y1: {
          type: 'linear',
          beginAtZero: true,
          min: 0,
          position: 'right',
          max: yAccumMax,
          bounds: 'ticks',
          display: !isMobile,
          ticks: {
            color: 'rgba(232,187,106,0.76)',
            stepSize: yAccumStepV276,
            callback: value => fmtAxis1(value)
          },
          grid: { drawOnChartArea: false }
        }
      }
    }
  });
}

/* ELTAUM_MOBILE_BRAND_COPY_20260613_v192
   Formata a atualização do cabeçalho de forma compacta, preservando
   a data completa em title/aria-label. */
function formatarAtualizacaoHeader(valor){
  const bruto=String(valor ?? '').trim();
  const match=bruto.match(/^(\d{2})\/(\d{2})\/(\d{4})\s+(\d{2}):(\d{2})(?::(\d{2}))?/);
  if(!match) return {compacto:bruto,completo:bruto,datetime:''};

  const [,dia,mes,ano,hora,minuto,segundo='00']=match;
  const meses=['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
  const nomeMes=meses[Math.max(0,Math.min(11,Number(mes)-1))];

  return {
    compacto:`${dia} ${nomeMes} · ${hora}:${minuto}`,
    completo:`${dia}/${mes}/${ano} às ${hora}:${minuto}`,
    datetime:`${ano}-${mes}-${dia}T${hora}:${minuto}:${segundo}`
  };
}

function atualizarDataHeader(valor,opcoes={}){
  const elemento=document.getElementById('lastUpdate');
  if(!elemento) return;

  const dot=document.createElement('span');
  dot.className='live-dot';

  if(opcoes.cache){
    dot.style.background='var(--muted)';
    const texto=document.createElement('span');
    texto.className='live-update-label';
    texto.textContent='Dados em cache';
    elemento.replaceChildren(dot,texto);
    elemento.title='Os dados mais recentes não puderam ser carregados.';
    elemento.setAttribute('aria-label','Dados em cache');
    return;
  }

  const data=formatarAtualizacaoHeader(valor);
  const label=document.createElement('span');
  label.className='live-update-label';
  label.textContent='Atualizado ·';

  const time=document.createElement('time');
  time.className='live-update-time';
  if(data.datetime) time.dateTime=data.datetime;
  time.textContent=data.compacto || String(valor || '');

  elemento.replaceChildren(dot,label,time);
  elemento.title=`Dados atualizados em ${data.completo || valor}`;
  elemento.setAttribute('aria-label',`Dados atualizados em ${data.completo || valor}`);
}

/* ════════════════════════════════════════════════════
   CARREGA mercado_atual.json
════════════════════════════════════════════════════ */
async function carregarMercado(){
  try{
    const r = await fetch(BASE_URL+'mercado_atual.json?v=market-v230-'+Date.now(), { cache: 'no-store' });
    const raw = await r.json();

    // Complementa o mercado_atual.json com o arquivo de índices detalhados,
    // que contém mês fechado, mês atual, ano, 12M, 24M e 36M para dólar,
    // Ibovespa, S&P 500, Dow Jones e Nasdaq.
    const rawIndicesDetalhados = await carregarIndicesMercadoDetalhados();
    const rawUnificado = mesclarMercadoComIndicesDetalhados(raw, rawIndicesDetalhados);

    const d = normalizarMercadoAtual(rawUnificado);
    _dadosMercado = d;
    window.__mercadoAtualV230 = d;
    sincronizarEstadoCdiV229(d);
    setTimeout(()=>{ try{ atualizarResumoFechamentoMes(); atualizarPainelFechadoCard(); renderClosedMarketSheet(); }catch(e){} }, 600);
    hidratarDolarResumoDoJson(d);

    if(d.atualizado_em) atualizarDataHeader(d.atualizado_em);

    const c = d.cards || {};

    // ── Selic ──
    const selic = c.selic_meta?.valor;
    if($('mc-selic')) $('mc-selic').textContent = selic ? fmt(selic) : '—';

    // v223: a taxa vigente e a data precisam vir da mesma decisão.
    // Quando o robô já atualizou o valor, mas o histórico ainda está atrasado,
    // o painel reconcilia os dados com o calendário oficial do Copom.
    const selicUltimaAlteracao = resolverDataUltimaAlteracaoSelic(d);
    const elSelicLastChange = $('selic-last-change');
    if(elSelicLastChange){
      elSelicLastChange.textContent = selicUltimaAlteracao.data || '—';
      // v256: evita expor mensagem técnica de reconciliação para o usuário final.
      // A auditoria continua no console/dados, mas o card fica limpo.
      elSelicLastChange.removeAttribute('title');
      delete elSelicLastChange.dataset.selicDateReconciled;
    }

    buildCopomCalendario();

    // ── CDI — v229: taxa, mês e acumulados independentes entre si ──
    const cdiCard = c.cdi || {};
    const cdi = numeroFinitoV229(cdiCard.valor);
    const cdiMensalInformado = numeroFinitoV229(cdiCard.mensal);
    const cdiMensal = cdiMensalInformado ?? (cdi !== null ? ((Math.pow(1 + cdi / 100, 1 / 12) - 1) * 100) : null);

    if($('mc-cdi')) $('mc-cdi').textContent = cdi !== null ? fmt(cdi) : '—';

    // Esta sincronização não depende de cards.cdi.valor. Assim, versões do JSON
    // que trazem apenas mensal, histórico e acumulados continuam funcionando.
    sincronizarEstadoCdiV229(d);

    if(cdiMensal !== null){
      const isEst = cdiMensalInformado === null;
      const fCdiMes = (cdiMensal > 0 ? '+' : '') + cdiMensal.toFixed(2).replace('.', ',') + '%';
      const mesRefLabel = cdiCard.mes_ref ? ` · ${cdiCard.mes_ref}` : '';
      if($('mc-cdi-mes-ref')) $('mc-cdi-mes-ref').textContent = fCdiMes + mesRefLabel + (isEst ? '*' : '');
      indicState.cdi.mes = cdiMensal;
    }

    if(!indicState.cdi.mesRef){
      const h = new Date();
      indicState.cdi.mesRef = cdiCard.mes_ref ||
        `${MESES_PT[h.getMonth() === 0 ? 11 : h.getMonth() - 1]}/${h.getMonth() === 0 ? h.getFullYear() - 1 : h.getFullYear()}`;
    }

    // Compatibilidade conservadora com JSON muito antigo: somente 12M pode usar
    // a taxa anual de referência como último recurso. 24M/36M nunca são simulados.
    if(indicState.cdi.m12 == null && cdi !== null) indicState.cdi.m12 = cdi;

    const cdiAtualInfoV232 = obterCdiAtualV232(d);
    const cdiMesAtual = numeroFinitoV229(cdiAtualInfoV232.valor) ?? cdiMensal;
    const cdiMesAtualTxt = cdiMesAtual !== null
      ? (cdiMesAtual > 0 ? '+' : '') + cdiMesAtual.toFixed(2).replace('.', ',') + '%'
      : '—';
    const cdi12 = resolverCdiPeriodoV229(cdiCard, 12);
    const cdi12Txt = cdi12 !== null
      ? (cdi12 > 0 ? '+' : '') + Number(cdi12).toFixed(2).replace('.', ',') + '%'
      : '—';

    if($('mc-cdi-mes-atual')) $('mc-cdi-mes-atual').textContent = cdiMesAtualTxt;
    if($('mc-cdi-12m-val-hero')) $('mc-cdi-12m-val-hero').textContent = cdi12Txt;
    if($('mc-cdi-12m-val')) $('mc-cdi-12m-val').textContent = cdi12Txt;
    renderCdiYearHistory(d);

    // ── IPCA (do JSON — complementado pela série 433) ──
    const ipca = c.ipca || {};
    const ipcaLabel = ipca.label_mes || '';
    // Preenche campos que a série 433 pode não ter chegado ainda
    // ★ v16 — IPCA: lê todos os acumulados pré-calculados do robô
    if(ipca.acum_12m != null) indicState.ipca.m12 = ipca.acum_12m;
    if(ipca.acum_24m != null) indicState.ipca.m24 = ipca.acum_24m;   // ★ v16
    if(ipca.acum_36m != null) indicState.ipca.m36 = ipca.acum_36m;   // ★ v16
    if(ipca.acum_ano != null) indicState.ipca.ano = ipca.acum_ano;
    if(ipca.ultimo_mes != null) indicState.ipca.mes = ipca.ultimo_mes;
    if(ipcaLabel) indicState.ipca.mesRef = ipcaLabel;
    else if(!indicState.ipca.mesRef){
      const h = new Date();
      indicState.ipca.mesRef = `${MESES_PT[h.getMonth()===0?11:h.getMonth()-1]}/${h.getMonth()===0?h.getFullYear()-1:h.getFullYear()}`;
    }

    // ── Ibovespa ──
    const ibov = c.ibovespa || {};
    const ibovAtual = ibov.atual;
    const ibovVar = ibov.variacao_mensal;
    const refHoje = MESES_PT[HOJE.getMonth()]+'/'+HOJE.getFullYear();
    if($('ref-ibov')) $('ref-ibov').textContent = refHoje;
    if($('ref-ibov2')) $('ref-ibov2').textContent = refHoje;
    if($('ref-sp-brl')) $('ref-sp-brl').textContent = refHoje;
    if($('ref-sp-usd')) $('ref-sp-usd').textContent = refHoje;

    if($('it-ibov-pts') && ibovAtual) $('it-ibov-pts').textContent = fmtK(ibovAtual)+' pts';
    if($('it-ibov-var-mes') && ibovVar !== null && ibovVar !== undefined){
      const n = ibovVar;
      $('it-ibov-var-mes').textContent = `${signPct(n)}${fmt(n)}`;
      $('it-ibov-var-mes').className = `indic-pct ${clsPct(n)}`;
    }

    // ── S&P 500 ──
    const intl = d.indices_internacionais || {};
    if($('it-sp-brl') && intl.sp500_brl) $('it-sp-brl').textContent = 'R$ '+fmtK(intl.sp500_brl);
    if($('it-sp-usd') && intl.sp500_usd) $('it-sp-usd').textContent = fmtK(intl.sp500_usd)+' pts';

    // ── Poupança ──
    atualizarPoupancaCard(d, selic);

    atualizarResumoCenario(d);
    atualizarResumoEvolucao(d);

    // ★ v16 — PTAX histórico pré-carregado pelo robô
    // Resolve HTTP 400 que ocorria quando browser tentava buscar 36M (limite é 24M)
    if(d.ptax_historico && d.ptax_historico.length) {
      _ptaxHistorico = d.ptax_historico.map(item => ({
        cotacaoVenda:      item.cotacao,
        dataHoraCotacao:   item.data_ref + 'T12:00:00.0000000',
        _var_pct:          item.var_pct,
        _mes_label:        item.mes,
      }));
      calcularDolarPeriodos();
      renderDolarMensais();
      buildChartDolar('24m');
      console.info(`[PTAX] ${d.ptax_historico.length} fechamentos carregados do mercado_atual.json`);
    }

    atualizarTabelaIndicadores();
    carregarFocus(d.focus, d.atualizado_em);
    await inicializarGraficos(d);

  }catch(e){
    console.warn('mercado_atual.json indisponível:', e);
    if($('lastUpdate')) atualizarDataHeader('',{cache:true});
    carregarFocusFallback();
  }
}

/* ════════════════════════════════════════════════════
   FOCUS
════════════════════════════════════════════════════ */
function focusCardHTML(icon, label, sub, dados){
  const anos = [2026,2027,2028,2029];
  const rows = anos.map((ano,i) => {
    const v = dados?.[ano];
    const med = v?.mediana;
    const fmtd = med!==null && med!==undefined
      ? (label==='Câmbio' ? brl(med) : fmt(med))
      : '—';
    return `<div class="fcad-row">
      <span class="fcad-year">${ano}</span>
      <span class="fcad-val${i===0?' hl':''}">${fmtd}</span>
    </div>${i<anos.length-1?'<hr class="fcad-hr">':''}`;
  }).join('');
  return `<div class="fcad"><div class="fcad-label">${icon} ${label}</div>
    <div class="fcad-sub">${sub}</div><div class="fcad-rows">${rows}</div></div>`;
}

function normalizarDataFocus(dataRef){
  if(!dataRef) return null;
  const raw = String(dataRef).trim();

  // Aceita yyyy-mm-dd, dd/mm/yyyy, yyyy/mm/dd ou yyyymmdd.
  let m = raw.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if(m) return { ano:m[1], mes:m[2], dia:m[3], br:`${m[3]}/${m[2]}/${m[1]}` };

  m = raw.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if(m) return { ano:m[3], mes:m[2], dia:m[1], br:raw };

  m = raw.match(/^(\d{4})\/(\d{2})\/(\d{2})$/);
  if(m) return { ano:m[1], mes:m[2], dia:m[3], br:`${m[3]}/${m[2]}/${m[1]}` };

  m = raw.match(/^(\d{4})(\d{2})(\d{2})$/);
  if(m) return { ano:m[1], mes:m[2], dia:m[3], br:`${m[3]}/${m[2]}/${m[1]}` };

  return null;
}

function formatarDataFocusObj(dateObj){
  const ano = String(dateObj.getFullYear());
  const mes = String(dateObj.getMonth()+1).padStart(2,'0');
  const dia = String(dateObj.getDate()).padStart(2,'0');
  return { ano, mes, dia, br:`${dia}/${mes}/${ano}` };
}

function subtrairDiasFocus(dataFocus, dias){
  if(!dataFocus) return null;
  const d = new Date(`${dataFocus.ano}-${dataFocus.mes}-${dataFocus.dia}T12:00:00`);
  if(isNaN(d)) return null;
  d.setDate(d.getDate() - dias);
  return formatarDataFocusObj(d);
}

function montarUrlPdfFocus(dataFocus){
  if(!dataFocus) return 'https://www.bcb.gov.br/publicacoes/focus';
  return `https://www.bcb.gov.br/content/focus/focus/R${dataFocus.ano}${dataFocus.mes}${dataFocus.dia}.pdf`;
}

function extrairDataDoPdfUrlFocus(url){
  const m = String(url || '').match(/R(\d{4})(\d{2})(\d{2})\.pdf/i);
  if(!m) return null;
  return { ano:m[1], mes:m[2], dia:m[3], br:`${m[3]}/${m[2]}/${m[1]}` };
}

function obterPdfFocus(focus, dataFocus){
  // Prioridade 1: URL já validada pelo robô em mercado_atual.json.
  const urlValidada = focus?.pdf_url || focus?.pdfUrl || focus?.url_pdf || focus?.focus_pdf_url;
  if(urlValidada){
    return {
      url: urlValidada,
      data: extrairDataDoPdfUrlFocus(urlValidada) || normalizarDataFocus(focus?.data_pdf || focus?.data_pdf_br) || dataFocus,
      origem: 'validado'
    };
  }

  // Prioridade 2: data do PDF validada pelo robô.
  const dataPdf = normalizarDataFocus(focus?.data_pdf || focus?.dataPdf || focus?.data_pdf_br || focus?.referencia_pdf);
  if(dataPdf){
    return { url: montarUrlPdfFocus(dataPdf), data: dataPdf, origem: 'data_pdf' };
  }

  // Fallback conservador: quando o OData já mostra a sexta mais recente,
  // mas o PDF correspondente ainda não foi publicado, usa a semana anterior.
  const dataConservadora = subtrairDiasFocus(dataFocus, 7) || dataFocus;
  return { url: montarUrlPdfFocus(dataConservadora), data: dataConservadora, origem: 'fallback_conservador' };
}

function obterDataReferenciaFocus(focus){
  const grupos = ['IPCA','Selic','PIB','Cambio','IGPM'];

  for(const grupo of grupos){
    const dados = focus?.[grupo];
    if(!dados) continue;

    for(const ano of Object.keys(dados)){
      const dataRef = dados?.[ano]?.data_ref || dados?.[ano]?.data || dados?.[ano]?.referencia;
      const normalizada = normalizarDataFocus(dataRef);
      if(normalizada) return normalizada;
    }
  }

  return null;
}

function carregarFocus(focus, atualizadoEm){
  const grid = $('focusGrid');
  const refEl = $('focusRef');
  if(!focus || Object.keys(focus).length === 0){
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:24px;color:var(--muted);font-size:.78rem">Dados do Focus não disponíveis.</div>`;
    if(refEl) refEl.innerHTML = `<span class="focus-ref-label">Boletim Focus temporariamente indisponível</span>`;
    return;
  }

  const dataFocus = obterDataReferenciaFocus(focus);
  const pdfFocus = obterPdfFocus(focus, dataFocus);
  const dataFormatada = pdfFocus?.data?.br || dataFocus?.br || (atualizadoEm?.split(' ')[0] || 'data não informada');
  const pdfUrl = pdfFocus?.url || 'https://www.bcb.gov.br/publicacoes/focus';

  if(refEl){
    refEl.innerHTML = `<span class="focus-ref-label">Último boletim Focus disponível: <strong>${dataFormatada}</strong></span><a class="focus-pdf-link" href="${pdfUrl}" target="_blank" rel="noopener">Baixe aqui o último boletim Focus (PDF) ↗</a>`;
  }

  grid.innerHTML = [
    focusCardHTML('🏦','Selic','Meta da Taxa Básica de Juros',focus.Selic),
    focusCardHTML('🎯','IPCA','Inflação ao Consumidor',focus.IPCA),
    focusCardHTML('💵','Câmbio','R$ / US$ (dólar americano)',focus.Cambio),
    focusCardHTML('📦','PIB','Crescimento do Produto Interno Bruto',focus.PIB),
    focusCardHTML('📊','IGP-M','Índice Geral de Preços — Mercado',focus.IGPM),
  ].join('');
}

function carregarFocusFallback(){
  if($('focusRef')) $('focusRef').innerHTML = '<span class="focus-ref-label">Boletim Focus temporariamente indisponível</span>';
  if($('focusGrid')) $('focusGrid').innerHTML = `<div style="grid-column:1/-1;padding:20px;color:var(--muted);font-size:.75rem;
    text-align:center;border:1px dashed var(--border2);border-radius:10px">
    ⚠️ Indicadores de mercado temporariamente indisponíveis. Atualize a página em alguns instantes.</div>`;
}

/* ════════════════════════════════════════════════════
   RANKINGS
════════════════════════════════════════════════════ */
const MEDALHAS = ['🥇','🥈','🥉'];
let kpisDashboard = null;

function numKpi(v){
  if(typeof v === 'number') return Number.isFinite(v) ? v : null;
  return toNum(v);
}
function fmtPctKpi(v){
  const n = numKpi(v);
  if(n === null) return '—';
  const sign = n > 0 ? '+' : '';
  return sign + n.toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2}) + '%';
}
function fmtPlMi(v){
  const n = numKpi(v);
  if(n === null) return 'PL —';
  return 'PL R$ ' + n.toLocaleString('pt-BR',{maximumFractionDigits:0}) + ' mi';
}


let activeRankFilter = 'todos';
let activeRankRisk = '';
let activeRankView = 'top';
let activeRankPeriods = { topFundos:'12m', destaques:'mes' };

function normRankTxt(v){
  return String(v||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toUpperCase();
}
function normalizarPerfilRiscoV198(valor){
  const n=normRankTxt(valor).replace(/[^A-Z0-9 ]+/g,' ').replace(/\s+/g,' ').trim();
  if(!n) return 'sem-classificacao';
  if(/\bCONSERVADOR\b/.test(n)) return 'conservador';
  if(/\bMODERADO\b/.test(n)) return 'moderado';
  if(/\bARROJADO\b/.test(n)) return 'arrojado';
  if(/\bAGRESSIVO\b/.test(n)) return 'agressivo';
  if(n.includes('SEM CLASSIFICACAO')||n.includes('NAO CLASSIFICADO')) return 'sem-classificacao';
  return n.toLowerCase().replace(/\s+/g,'-');
}
function perfilRiscoCorrespondeV198(valor,filtro){
  if(!String(filtro||'').trim()) return true;
  return normalizarPerfilRiscoV198(valor)===normalizarPerfilRiscoV198(filtro);
}
function rotuloPerfilRiscoV198(filtro){
  if(!String(filtro||'').trim()) return 'Todos os perfis';
  const map={
    conservador:'Conservador',moderado:'Moderado',arrojado:'Arrojado',
    agressivo:'Agressivo','sem-classificacao':'Sem classificação'
  };
  return map[normalizarPerfilRiscoV198(filtro)]||'Todos os perfis';
}
function syncRiskProfileControlsV198(){
  const catalogValue=typeof activeRisco!=='undefined'?(activeRisco||''):'';
  ['catalogRiskSelectV198','mobileRiskSelectV198'].forEach(id=>{
    const el=document.getElementById(id);
    if(el&&el.value!==catalogValue) el.value=catalogValue;
  });
  const ranking=document.getElementById('rankingRiskSelectV198');
  const rankValue=typeof activeRankRisk!=='undefined'?(activeRankRisk||''):'';
  if(ranking&&ranking.value!==rankValue) ranking.value=rankValue;
}
function rankCampoPorPeriodo(periodo){
  if(periodo === 'dia') return 'Variacao Dia (%)';
  if(periodo === 'mes') return 'Acum. Mes (%)';
  if(periodo === 'ano') return 'Acum. Ano (%)';
  return 'Acum. 12M (%)';
}
function rankPeriodoLabel(periodo){
  return ({dia:'dia',mes:'mês',ano:'ano',m12:'12 meses','12m':'12 meses'})[periodo] || '12 meses';
}
function rankPeriodoResumo(periodo){
  return ({dia:'do dia',mes:'do mês',ano:'no ano',m12:'12M','12m':'12M'})[periodo] || '12M';
}
function fmtSummaryPct(v){
  const raw = String(v ?? '').trim();
  if(!raw || raw === '—') return '—';
  const n = toNum(raw);
  if(n === null) return raw.includes('%') ? raw : raw;
  const sign = n > 0 ? '+' : '';
  return sign + n.toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2}) + '%';
}
function fmtSummaryPl(v){
  const n = numKpi(v);
  if(n === null) return '—';
  if(Math.abs(n) >= 1000){
    return 'R$ ' + (n/1000).toLocaleString('pt-BR',{minimumFractionDigits:1,maximumFractionDigits:1}) + ' bi';
  }
  return 'R$ ' + n.toLocaleString('pt-BR',{maximumFractionDigits:0}) + ' mi';
}
/* v197 — filtros de classe usam somente a coluna Categoria.
   Evita falsos positivos por palavras no nome/benchmark, como
   MOVIMENTACOES sendo interpretado como ACOES ou DOLAR MM como CAMBIAL. */
const RANK_CATEGORY_BY_FILTER_V197 = Object.freeze({
  'renda-fixa-simples': 'RENDA FIXA SIMPLES',
  'renda-fixa': 'RENDA FIXA',
  'renda-fixa-referenciado': 'RENDA FIXA REFERENCIADO',
  'renda-fixa-curto-prazo': 'RENDA FIXA CURTO PRAZO',
  'multimercado': 'MULTIMERCADO',
  'cambial': 'CAMBIAL',
  'acoes': 'ACOES',
  'fundo-de-indice': 'FUNDO DE INDICE',
  'fmp': 'FUNDOS MUTUOS DE PRIVATIZACAO'
});
function rankCategoriaCanonicaV197(v){
  return normRankTxt(v).replace(/\s+/g,' ').trim();
}
function passaFiltroRanking(r){
  const filtro = String(activeRankFilter || 'todos');
  const cat = rankCategoriaCanonicaV197(r?.['Categoria']);
  if(filtro === 'todos') return true;
  if(filtro === 'sem-fmp') return cat !== RANK_CATEGORY_BY_FILTER_V197.fmp;
  const categoriaEsperada = RANK_CATEGORY_BY_FILTER_V197[filtro];
  return categoriaEsperada ? cat === categoriaEsperada : true;
}
function atualizarRankingFilterUI(){
  document.querySelectorAll('[data-rank-filter]').forEach(btn=>{
    btn.classList.toggle('active', btn.dataset.rankFilter === activeRankFilter);
  });
  document.querySelectorAll('[data-rank-view]').forEach(btn=>{
    btn.classList.toggle('active', btn.dataset.rankView === activeRankView);
  });
}
function rankPeriodTabs(target, active, periods){
  return `<div class="rank-period-tabs" role="tablist" aria-label="Período do ranking">${periods.map(p=>`<button type="button" class="rank-period-tab ${active===p?'active':''}" data-rank-target="${target}" data-rank-period="${p}">${p==='dia'?'Dia':p==='mes'?'Mês':p==='ano'?'Ano':'12M'}</button>`).join('')}</div>`;
}

function renderRankings(){
  const grid = $('rankingGrid');
  if(!grid || !allRows.length) return;

  atualizarRankingFilterUI();

  let base = allRows.filter(r => temDados(r)).filter(passaFiltroRanking);
  if(activePerfil) base = base.filter(r => {
    const tokens = String(r['Perfis']||r['Perfil']||'').split(/\s*\|\s*/).map(s=>s.trim());
    return tokens.includes(activePerfil);
  });
  if(activeRankRisk) base = base.filter(r => perfilRiscoCorrespondeV198(r['Perfil de Risco'],activeRankRisk));

  const ordenaCampo = (campo, asc=false) => base
    .filter(r=>toNum(r[campo])!==null)
    .sort((a,b)=>asc ? toNum(a[campo])-toNum(b[campo]) : toNum(b[campo])-toNum(a[campo]));

  const campoTop = rankCampoPorPeriodo(activeRankPeriods.topFundos);
  const campoDestaques = rankCampoPorPeriodo(activeRankPeriods.destaques);
  const sortedTop = ordenaCampo(campoTop);
  const sortedDestaques = ordenaCampo(campoDestaques);
  const sortedPiores = ordenaCampo(campoDestaques, true).filter(r=>toNum(r[campoDestaques]) < 0);
  const sorted12m = ordenaCampo('Acum. 12M (%)');

  // Melhor fundo dentro de cada categoria, com base no Acum. 12M.
  const catMap = {};
  sorted12m.forEach(r=>{ const cat=r['Categoria']||'—'; if(!catMap[cat]) catMap[cat]=r; });
  const catTop = Object.entries(catMap).sort((a,b)=>toNum(b[1]['Acum. 12M (%)'])-toNum(a[1]['Acum. 12M (%)']));

  // Ranking agregado por categoria, vindo do kpis_dashboard.json.
  // Quando o filtro "sem FMP" está ativo, retiramos FMP/privatização também do agregado.
  const categoriasKpi = kpisDashboard?.categorias || {};
  const passaFiltroCat = (cat) => {
    const c = normRankTxt(cat);
    if(activeRankFilter === 'sem-fmp') return !(c.includes('FMP') || c.includes('PRIVATIZACAO'));
    if(activeRankFilter === 'renda-fixa') return c.includes('RENDA FIXA');
    if(activeRankFilter === 'acoes') return c.includes('ACOES');
    if(activeRankFilter === 'multimercado') return c.includes('MULTIMERCADO');
    return true;
  };
  const catPonderada = Object.entries(categoriasKpi)
    .filter(([cat,d])=>passaFiltroCat(cat) && numKpi(d?.rent_12m_ponderada)!==null)
    .sort((a,b)=>numKpi(b[1].rent_12m_ponderada)-numKpi(a[1].rent_12m_ponderada));
  const catPL = Object.entries(categoriasKpi)
    .filter(([cat,d])=>passaFiltroCat(cat) && numKpi(d?.pl_total)!==null)
    .sort((a,b)=>numKpi(b[1].pl_total)-numKpi(a[1].pl_total));

  const rankItem = (r,i,campo) => {
    const val=r[campo]||'—'; const n=toNum(val);
    const cls=n>0?'pos':n<0?'neg':'zero'; const sign=n>0?'+':'';
    const nome=(r['Fundo']||'').replace(/\s*\(\d+\)/g,'').trim();
    const medal=i<3?MEDALHAS[i]:`${i+1}º`;
    return `<div class="rank-item">
      <span class="rank-pos${i===0?' gold-medal':''}">${medal}</span>
      <div class="rank-info"><div class="rank-name" title="${attr(nome)}">${attr(nome)}</div><div class="rank-cat">${attr(r['Categoria']||'')}</div></div>
      <span class="rank-val ${cls}">${sign}${attr(val)}</span></div>`;
  };

  const attr = (v) => String(v||'').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const rankCard = (icon,title,html,sub='',opts={}) => {
    const total = (html.match(/class="rank-item"/g)||[]).length;
    const more = total > 5 ? `<div class="rank-more-wrap"><button type="button" class="rank-more-btn" data-rank-action="toggle-card">Ver + ${total-5}</button></div>` : '';
    const tabs = opts.tabs || '';
    const wide = opts.wide ? ' rank-wide' : '';
    const note = opts.note ? `<div class="rank-advisory-note">${opts.note}</div>` : '';
    return `<div class="rank-card rank-collapsed${wide}" data-rank-title="${attr(title)}" data-rank-view-key="${attr(opts.key||title)}">
      <div class="rank-card-header">
        <div class="rank-card-main-title"><span>${icon}</span><span class="rank-card-title" title="${attr(title)}">${title}</span></div>
        ${tabs}
      </div>
      ${sub ? `<div class="rank-card-sub">${sub}</div>` : ''}
      ${note}
      <div class="rank-list">${html||'<div class="rank-empty">Sem dados suficientes</div>'}</div>${more}</div>`;
  };

  const topFundosHtml = sortedTop.slice(0,10).map((r,i)=>rankItem(r,i,campoTop)).join('');

  const catHtml = catTop.slice(0,8).map(([cat,r],i)=>{
    const val=r['Acum. 12M (%)']||'—'; const n=toNum(val);
    const cls=n>0?'pos':n<0?'neg':'zero'; const sign=n>0?'+':'';
    const nome=(r['Fundo']||'').replace(/\s*\(\d+\)/g,'').trim();
    const medal=i<3?MEDALHAS[i]:`${i+1}º`;
    return `<div class="rank-item">
      <span class="rank-pos${i===0?' gold-medal':''}">${medal}</span>
      <div class="rank-info"><div class="rank-name" title="${attr(cat)}">${attr(cat)}</div><div class="rank-cat rank-cat-fund" title="${attr(nome)}">${attr(nome)}</div></div>
      <span class="rank-val ${cls}">${sign}${attr(val)}</span></div>`;
  }).join('');

  const destaqueAltaHtml = sortedDestaques.slice(0,3).map((r,i)=>rankItem(r,i,campoDestaques)).join('');
  const destaqueQuedaHtml = sortedPiores.slice(0,2).map((r,i)=>rankItem(r,i,campoDestaques)).join('');
  const destaquesHtml = [destaqueAltaHtml, destaqueQuedaHtml ? `<div class="rank-card-sub" style="border-top:1px solid var(--border2);padding-top:8px;margin-top:2px">Maiores quedas no período</div>${destaqueQuedaHtml}` : ''].join('');

  const catPonderadaHtml = catPonderada.slice(0,8).map(([cat,d],i)=>{
    const n = numKpi(d.rent_12m_ponderada);
    const cls = n>0?'pos':n<0?'neg':'zero';
    const medal = i<3?MEDALHAS[i]:`${i+1}º`;
    const qtd = d.qtd_ativos ?? '—';
    return `<div class="rank-item">
      <span class="rank-pos${i===0?' gold-medal':''}">${medal}</span>
      <div class="rank-info"><div class="rank-name" title="${attr(cat)}">${attr(cat)}</div><div class="rank-cat">${qtd} fundos · ${fmtPlMi(d.pl_total)}</div></div>
      <span class="rank-val ${cls}">${fmtPctKpi(n)}</span></div>`;
  }).join('');

  const catPLHtml = catPL.slice(0,8).map(([cat,d],i)=>{
    const n = numKpi(d.pl_total);
    const medal = i<3?MEDALHAS[i]:`${i+1}º`;
    const rent = fmtPctKpi(d.rent_12m_ponderada);
    const qtd = d.qtd_ativos ?? '—';
    return `<div class="rank-item">
      <span class="rank-pos${i===0?' gold-medal':''}">${medal}</span>
      <div class="rank-info"><div class="rank-name" title="${attr(cat)}">${attr(cat)}</div><div class="rank-cat">${qtd} fundos · rent. pond. 12M ${rent}</div></div>
      <span class="rank-val zero">R$ ${n.toLocaleString('pt-BR',{maximumFractionDigits:0})} mi</span></div>`;
  }).join('');

  const filtroLabel = activeRankFilter === 'todos' ? 'todos os fundos' : document.querySelector(`[data-rank-filter="${activeRankFilter}"]`)?.textContent?.trim() || 'filtro aplicado';

  const resumoCards = (() => {
    const melhor = sortedTop[0];
    const melhorNome = melhor ? String(melhor['Fundo']||'').replace(/\s*\(\d+\)/g,'').trim() : '—';
    const melhorVal = melhor ? fmtSummaryPct(melhor[campoTop]) : '—';
    const destaque = sortedDestaques[0];
    const destaqueNome = destaque ? String(destaque['Fundo']||'').replace(/\s*\(\d+\)/g,'').trim() : '—';
    const destaqueVal = destaque ? fmtSummaryPct(destaque[campoDestaques]) : '—';
    const maiorPL = catPL[0];
    const maiorPLNome = maiorPL ? maiorPL[0] : '—';
    const maiorPLVal = maiorPL ? fmtSummaryPl(maiorPL[1].pl_total) : '—';
    const melhorLabel = activeRankPeriods.topFundos === '12m' ? '🏆 Melhor fundo 12M' : `🏆 Melhor fundo ${rankPeriodoResumo(activeRankPeriods.topFundos)}`;
    const destaqueLabel = `📈 Maior alta ${rankPeriodoResumo(activeRankPeriods.destaques)}`;
    return `<div class="ranking-summary-strip" aria-label="Resumo rápido dos rankings">
      <div class="ranking-summary-card ranking-summary-best">
        <span class="ranking-summary-label">${attr(melhorLabel)}</span>
        <strong>${attr(melhorVal)}</strong>
        <small class="ranking-summary-name" title="${attr(melhorNome)}">${attr(melhorNome)}</small>
      </div>
      <div class="ranking-summary-card ranking-summary-highlight">
        <span class="ranking-summary-label">${attr(destaqueLabel)}</span>
        <strong>${attr(destaqueVal)}</strong>
        <small class="ranking-summary-name" title="${attr(destaqueNome)}">${attr(destaqueNome)}</small>
      </div>
      <div class="ranking-summary-card ranking-summary-pl">
        <span class="ranking-summary-label">🏦 Categoria com maior PL</span>
        <strong>${attr(maiorPLVal)}</strong>
        <small class="ranking-summary-name" title="${attr(maiorPLNome)}">${attr(maiorPLNome)}</small>
      </div>
    </div>`;
  })();

  const cardsPorVisao = {
    top: rankCard('🏆','Top Fundos',topFundosHtml,`Ranking por rentabilidade — ${rankPeriodoLabel(activeRankPeriods.topFundos)} · ${filtroLabel}.`,{key:'top',tabs:rankPeriodTabs('topFundos',activeRankPeriods.topFundos,['mes','ano','12m'])}),
    categoria: rankCard('🎖️','Melhor por Categoria',catHtml,'Melhor fundo de cada categoria com base no acumulado de 12 meses.',{key:'categoria'}),
    destaques: rankCard('📅','Destaques do Período',destaquesHtml,`Maiores altas e quedas — ${rankPeriodoLabel(activeRankPeriods.destaques)}.`,{key:'destaques',tabs:rankPeriodTabs('destaques',activeRankPeriods.destaques,['dia','mes','ano','12m'])}),
    rentabilidade: rankCard('📊','Categorias — Rentabilidade',catPonderadaHtml,'Rentabilidade 12M ponderada pelo PL consolidado da categoria.',{key:'rentabilidade',wide:true,note:'Leitura institucional: média ponderada da categoria pelo PL, não apenas o fundo vencedor.'}),
    pl: rankCard('🏦','Categorias — Patrimônio Líquido',catPLHtml,'Ajuda a entender onde está concentrado o patrimônio dos fundos.',{key:'pl',wide:true}),
  };

  grid.innerHTML = resumoCards + (cardsPorVisao[activeRankView] || cardsPorVisao.top);
}


/* ════════════════════════════════════════════════════
   COMPARTILHAMENTO DOS RANKINGS
════════════════════════════════════════════════════ */
function showRankToast(msg){
  const t = $('rankShareToast');
  if(!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(showRankToast._timer);
  showRankToast._timer = setTimeout(()=>t.classList.remove('show'), 2200);
}
function getVisibleRankItems(card){
  return Array.from(card.querySelectorAll('.rank-list .rank-item')).filter(el=>el.offsetParent !== null);
}
function textoDoRankCard(card){
  if(!card) return '';
  const title = card.dataset.rankTitle || card.querySelector('.rank-card-title')?.textContent?.trim() || 'Ranking';
  const linhas = getVisibleRankItems(card).map(item=>{
    const pos = item.querySelector('.rank-pos')?.textContent?.trim() || '';
    const nome = item.querySelector('.rank-name')?.textContent?.trim() || '';
    const sub = item.querySelector('.rank-cat')?.textContent?.trim() || '';
    const val = item.querySelector('.rank-val')?.textContent?.trim() || '';
    return `${pos} ${nome}${sub ? ' — '+sub : ''}: ${val}`;
  });
  return `*${title}*\n${linhas.join('\n')}`;
}
function textoDosRankings(){
  const cards = Array.from(document.querySelectorAll('#rankingGrid .rank-card'));
  const data = _dadosMercado?.atualizado_em || kpisDashboard?.gerado_em || '';
  const header = `*Rankings de Performance — Fundos CAIXA*${data ? '\nAtualizado em: '+data : ''}`;
  return [header, ...cards.map(textoDoRankCard).filter(Boolean), '_Fonte: dados públicos SIPII/CAIXA. Material informativo._'].join('\n\n');
}
async function copiarTextoRank(texto){
  try{
    await navigator.clipboard.writeText(texto);
    showRankToast('Resumo copiado para a área de transferência.');
  }catch(e){
    const ta = document.createElement('textarea');
    ta.value = texto;
    ta.style.position='fixed'; ta.style.left='-9999px';
    document.body.appendChild(ta); ta.select();
    document.execCommand('copy'); ta.remove();
    showRankToast('Resumo copiado.');
  }
}
function abrirWhatsRank(texto){
  copiarTextoRank(texto);
  window.open('https://wa.me/?text=' + encodeURIComponent(texto), '_blank', 'noopener');
}
function slugRank(s){
  return String(s||'ranking').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'').slice(0,60) || 'ranking';
}

function ensureHtml2Canvas(){
  if(window.html2canvas) return Promise.resolve(window.html2canvas);
  if(window.__html2canvasLoading) return window.__html2canvasLoading;
  window.__html2canvasLoading = new Promise((resolve, reject)=>{
    const s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
    s.async = true;
    s.onload = ()=>resolve(window.html2canvas);
    s.onerror = ()=>reject(new Error('Falha ao carregar html2canvas'));
    document.head.appendChild(s);
  });
  return window.__html2canvasLoading;
}

async function baixarPrintRank(el, nome){
  try{
    if(!window.html2canvas){
      showRankToast('Preparando biblioteca de print...');
      await ensureHtml2Canvas();
    }
  }catch(e){
    showRankToast('Não consegui carregar a biblioteca de print. Verifique a internet/CDN.');
    return;
  }
  const wasCollapsed = el.classList?.contains('rank-collapsed');
  try{
    // Para print individual, abre temporariamente o card inteiro.
    if(el.classList?.contains('rank-card')) el.classList.remove('rank-collapsed');
    const canvas = await html2canvas(el, {
      backgroundColor:'#07080f',
      scale:Math.min(2, window.devicePixelRatio || 1.5),
      useCORS:true,
      logging:false
    });
    const a = document.createElement('a');
    a.download = `${slugRank(nome)}.png`;
    a.href = canvas.toDataURL('image/png');
    a.click();
    showRankToast('Print PNG gerado.');
  }catch(e){
    console.error(e);
    showRankToast('Não consegui gerar o print deste quadro.');
  }finally{
    if(wasCollapsed) el.classList.add('rank-collapsed');
  }
}
document.addEventListener('click', (ev)=>{
  const viewBtn = ev.target.closest('[data-rank-view]');
  if(viewBtn){
    activeRankView = viewBtn.dataset.rankView || 'top';
    renderRankings();
    const sec = $('rankingsSection');
    if(sec && window.matchMedia('(max-width: 760px)').matches){
      sec.scrollIntoView({behavior:'smooth', block:'start'});
    }
    return;
  }

  const filterBtn = ev.target.closest('[data-rank-filter]');
  if(filterBtn){
    activeRankFilter = filterBtn.dataset.rankFilter || 'todos';
    renderRankings();
    return;
  }

  const periodBtn = ev.target.closest('[data-rank-period][data-rank-target]');
  if(periodBtn){
    const target = periodBtn.dataset.rankTarget;
    const period = periodBtn.dataset.rankPeriod;
    if(target && period){
      activeRankPeriods[target] = period;
      renderRankings();
    }
    return;
  }

  const btn = ev.target.closest('[data-rank-action]');
  if(!btn) return;
  const action = btn.dataset.rankAction;
  const card = btn.closest('.rank-card');
  if(action === 'toggle-card' && card){
    const collapsed = card.classList.toggle('rank-collapsed');
    const total = card.querySelectorAll('.rank-list .rank-item').length;
    const hidden = Math.max(0,total-5);
    btn.textContent = collapsed ? `Ver + ${hidden}` : 'Ver menos';
    return;
  }
  if(action === 'copy-card' && card) return copiarTextoRank(textoDoRankCard(card));
  if(action === 'png-card' && card) return baixarPrintRank(card, card.dataset.rankTitle || 'ranking');
  if(action === 'copy-all') return copiarTextoRank(textoDosRankings());
  if(action === 'whatsapp-all') return abrirWhatsRank(textoDosRankings());
  if(action === 'png-all') return baixarPrintRank($('rankingsSection') || $('rankingGrid'), 'rankings-performance-fundos-caixa');
});

/* ════════════════════════════════════════════════════
   TABELA DE FUNDOS
════════════════════════════════════════════════════ */
let allRows=[],filtered=[],sortCol=-1,sortDir=-1,currentPage=1,perPage=10;
let activeSearch='',activeCat='',activeBenchmark='',activePerfil='',activeRisco='',hideSemDados=false,displayHeaders=[];
let activePerf=null,activePerfCampo='Acum. 12M (%)';
let activeCdiSort=null; // 'desc' = maior % CDI 12M primeiro; 'asc' = menor primeiro
let activeMobileSortCampo='dia'; // dia | mes | ano | m12 | cdi
let activeMobileSortDir='desc';  // desc = maior primeiro; asc = menor primeiro
let expandedRows=new Set();

const NUM_SET=new Set(["Cota (R$)","Variacao Dia (%)","Acum. Mes (%)","Acum. Ano (%)","Acum. 12M (%)","PL (milhoes R$)","% CDI 12M"]);
const DATE_SET=new Set(["Data Inicio","Data Início","Data de Inicio","Data de Início","DATA INICIO","DATA INÍCIO"]);
function normalizarHeaderOrdenacao(h){
  return String(h||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
}
function isDateHeader(key){
  const n=normalizarHeaderOrdenacao(key);
  return DATE_SET.has(key)||n==='data inicio'||n==='data de inicio'||n.includes('data inicio');
}
function parseDateBR(v){
  if(v===null||v===undefined) return null;
  const s=String(v).trim();
  if(!s||s==='-'||s==='—'||s.toLowerCase()==='null') return null;
  const m=s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})$/);
  if(m){
    const d=parseInt(m[1],10);
    const mo=parseInt(m[2],10)-1;
    let y=parseInt(m[3],10);
    if(y<100) y+=2000;
    const dt=new Date(y,mo,d);
    if(dt.getFullYear()===y&&dt.getMonth()===mo&&dt.getDate()===d) return dt.getTime();
  }
  const t=Date.parse(s);
  return Number.isFinite(t)?t:null;
}
function compararOrdenacao(av,bv){
  if(av===null&&bv===null) return 0;
  if(av===null) return 1;
  if(bv===null) return -1;
  return av<bv?-sortDir:av>bv?sortDir:0;
}
const DEFAULT_SORT="Acum. 12M (%)";
const CAT_CLS={"RENDA FIXA SIMPLES":"RF-S","RENDA FIXA":"RF","RENDA FIXA REFERENCIADO":"RF-R","RENDA FIXA CURTO PRAZO":"RF-CP","MULTIMERCADO":"MM","CAMBIAL":"CAM","ACOES":"AC","FUNDO DE INDICE":"ETF","FUNDOS MUTUOS DE PRIVATIZACAO":"FMP"};
const DETAIL_COLS=new Set(["CNPJ","codfundo","Perfil de Risco","Taxa Adm (%)","Aplicacao Minima (R$)","Conversao Aplicacao","Conversao Resgate","Pagamento Resgate","Benchmark","Benchmark Oficial","Estrategia","Estratégia","Adiantamento Resgate","Adiantamento de Resgate","Classificacao Tributaria","Classificação Tributária","Tributacao","Tributação","Status Captacao","Status Captação","Status de Captação","Captacao","Captação","Horário Limite Aplicação","Horario Limite Aplicacao","Horário Aplicação","Horario Aplicacao","Grade Aplicação","Grade Aplicacao","Horário Limite Resgate","Horario Limite Resgate","Horário Resgate","Horario Resgate","Grade Resgate","Grade de Resgate","Horário Limite Movimentação","Horario Limite Movimentacao","Grade de Movimentação","Grade de Movimentacao","Aplicacao Adicional Minima (R$)","Resgate Minimo (R$)","Saldo Minimo (R$)","Público Alvo","Publico Alvo","Movimentação Automática","Movimentacao Automatica","Carência","Carencia","ASG","Observação Operacional","Observacao Operacional","doc_lamina","doc_regulamento","doc_inf_comp","doc_comunicado","doc_carta","doc_boletim","doc_termo"]);
const HIDDEN_COLS=new Set(["Fundo_norm","Perfil","Perfis","URL"]);



/* ════════════════════════════════════════════════════
   VISTA REUNIÃO / COMPLETA
   Reunião: só o essencial — Fundo, liquidez, rentabilidade, PL e Docs
   Completa: todas as colunas incluindo Cota, Data, Variação dia
════════════════════════════════════════════════════ */
const COLS_OCULTAS_REUNIAO = new Set([
  'Data Inicio',
  'Cota (R$)',
  // 'Variacao Dia (%)' devolvida — assessor precisa ver var. do dia
  'PL (milhoes R$)',
]);

let vistaAtual = 'reuniao'; // padrão: Reunião

function setVista(vista){
  vistaAtual = vista;
  // Atualiza botões
  const btnR = $('vistaBtnReuniao');
  const btnC = $('vistaBtnCompleta');
  if(btnR) {
    btnR.className = vista === 'reuniao' ? 'vista-btn active' : 'vista-btn';
    btnR.setAttribute('aria-pressed', vista === 'reuniao' ? 'true' : 'false');
  }
  if(btnC) {
    btnC.className = vista === 'completa' ? 'vista-btn active' : 'vista-btn';
    btnC.setAttribute('aria-pressed', vista === 'completa' ? 'true' : 'false');
  }
  // Recria tabela com as novas colunas
  buildHeader();
  render();
  // Não persiste — cada sessão começa em 'reuniao' (padrão para reunião com cliente)
}

// Vista sempre inicia em 'reuniao' ao abrir/recarregar
// (a preferência da sessão muda ao clicar nos botões, mas não persiste entre sessões)
// Isso garante foco em rentabilidade ao abrir numa reunião com cliente.

function getVisibleHeaders(){
  // Filtra ocultas permanentes
  const base = displayHeaders.filter(h=>
    !HIDDEN_COLS.has(h) &&
    !DETAIL_COLS.has(h) &&
    h !== 'Categoria'
  );

  // Injeta coluna de liquidez unificada (Conversão + Pagamento em 1 célula compacta)
  const idxFundo = base.indexOf('Fundo');
  if(idxFundo >= 0 && !base.includes('Conv / Pag')){
    base.splice(idxFundo + 1, 0, 'Conv / Pag');
  }
  // Remove colunas separadas se existirem no CSV
  const remover = ['Conversão','Pagamento'];
  remover.forEach(col=>{ const i=base.indexOf(col); if(i>=0) base.splice(i,1); });

  // O comparativo com CDI fica dentro da própria coluna Acum. 12M,
  // evitando a coluna redundante "% CDI 12M" na tabela.
  if(!base.includes('Documentos')) base.push('Documentos');

  // Vista Reunião: remove colunas que distraem na reunião com cliente
  if(vistaAtual === 'reuniao'){
    return base.filter(h => !COLS_OCULTAS_REUNIAO.has(h));
  }
  return base;
}
function getFundUrl(r){
  const u=String(r['URL']||'').trim();
  if(u&&u.startsWith('http')&&u.includes('caixa.gov.br')) return u;
  const nome=(r['Fundo']||'').replace(/\s*\(\d+\)/g,'').trim();
  return 'https://www.google.com/search?q='+encodeURIComponent('"'+nome+'" site:caixa.gov.br fundos-investimento');
}
function isFallbackUrl(r){
  const u=String(r['URL']||'').trim();
  return !(u&&u.startsWith('http')&&u.includes('caixa.gov.br'));
}
function parseCsv(raw){
  if(raw.charCodeAt(0)===0xFEFF) raw=raw.slice(1);
  return Papa.parse(raw,{header:true,skipEmptyLines:true});
}
function toNum(v){
  if(v===null||v===undefined) return null;
  const s=String(v).trim();
  if(!s||s==='-'||s==='—'||s==='null') return null;
  const n=parseFloat(s.replace('%','').replace(/\s/g,'').replace(/\./g,'').replace(',','.'));
  return isNaN(n)?null:n;
}
function pctCell(val){
  if(!val||String(val).trim()===''||val==='-'||val==='—')
    return `<td class="col-pct"><span class="dash">—</span></td>`;
  const n=toNum(val);
  if(n===null) return `<td class="col-pct"><span class="dash">${val}</span></td>`;
  const cls=n>0?'pos':n<0?'neg':'zero';
  const sign=n>0?'+':'';
  return `<td class="col-pct"><span class="pct-val ${cls}">${sign}${val}</span></td>`;
}
function temDados(r){
  const c=String(r['Cota (R$)']||'').trim();
  return c&&c!=='-'&&c!=='—';
}

function kpiShortFundName(nome){
  const original = String(nome || '').replace(/\s+/g,' ').trim();
  if(!original) return '—';

  // Casos mais comuns do painel: deixa o card consultivo e evita nomes jurídicos longos.
  if(/FMP[-\s]*FGTS/i.test(original) && /ELETROBRAS/i.test(original)) return 'FMP-FGTS Eletrobras';
  if(/IAGRO/i.test(original)) return 'Ações Indexa Iagro';

  let clean = original
    .replace(/^CAIXA\s+/i,'')
    .replace(/\s+RESP\s+LTDA.*$/i,'')
    .replace(/\s+-\s*RL\s*$/i,'')
    .replace(/(FIC|FIF|FI)\s*/gi,'')
    .replace(/\s+/g,' ')
    .trim();

  const especiais = new Set(['RF','DI','CDI','IPCA','IMA-B','IRF-M','FMP-FGTS','ETF','BDR','MM','LP','CP','PJ','PF','RPPS']);
  clean = clean.split(' ').map(p=>{
    const up = p.toUpperCase();
    if(especiais.has(up)) return up;
    if(up === 'ACOES') return 'Ações';
    if(up === 'DOLAR') return 'Dólar';
    if(up === 'CRED') return 'Créd.';
    if(up === 'PRIV') return 'Priv.';
    return p.charAt(0).toUpperCase() + p.slice(1).toLowerCase();
  }).join(' ');

  const palavras = clean.split(' ').filter(Boolean);
  return palavras.length > 4 ? palavras.slice(0,4).join(' ') : clean;
}

function syncMobileKpis(){
  const getTxt = id => ($(id)?.textContent || '—').trim() || '—';
  const setTxt = (id, value) => { const el=$(id); if(el) el.textContent=value; };

  setTxt('mKpiFundos', getTxt('kpiFundos'));
  setTxt('mKpiFundosSub', getTxt('kpiFundosSub'));
  setTxt('mKpiCats', getTxt('kpiCats'));
  setTxt('mKpiPL', getTxt('kpiPL'));
  setTxt('mKpiPLSub', getTxt('kpiPLSub'));
  setTxt('mKpiPipe', getTxt('kpiPipe'));
  setTxt('mKpiBest', getTxt('kpiBest'));
  setTxt('mKpiBestFundo', getTxt('kpiBestFundo'));
  setTxt('mKpiWorst', getTxt('kpiWorst'));
  setTxt('mKpiWorstFundo', getTxt('kpiWorstFundo'));
}

function updateKPIs(){
  let pl=0,best=-Infinity,worst=Infinity,bestName='',worstName='',bestVal='—',worstVal='—';
  allRows.forEach(r=>{
    const p=toNum(r['PL (milhoes R$)']);
    if(p!==null) pl+=p;
    const m=toNum(r['Acum. 12M (%)']);
    if(m!==null){
      if(m>best){best=m;bestName=r['Fundo']||'';bestVal=r['Acum. 12M (%)'];}
      if(m<worst){worst=m;worstName=r['Fundo']||'';worstVal=r['Acum. 12M (%)'];}
    }
  });
  $('kpiFundos').textContent=allRows.length;
  const semDados=allRows.filter(r=>!temDados(r)).length;
  $('kpiFundosSub').textContent=`${allRows.length-semDados} ativos · ${semDados} pipeline`;
  $('kpiCats').textContent=new Set(allRows.map(r=>r['Categoria']||'')).size;
  $('kpiPL').textContent=pl>0?fmtPLBilhoes(pl):'—';
  if($('kpiPLSub')){ $('kpiPLSub').textContent='Patrimônio consolidado'; $('kpiPLSub').title=fmtPLMilhoes(pl); }
  $('kpiPipe').textContent=semDados;
  $('kpiBest').textContent=best>-Infinity?`+${bestVal}%`:'—';
  if($('kpiBestFundo')){ $('kpiBestFundo').textContent=kpiShortFundName(bestName); $('kpiBestFundo').title=bestName; }
  $('kpiWorst').textContent=worst<Infinity?`${worstVal}%`:'—';
  if($('kpiWorstFundo')){ $('kpiWorstFundo').textContent=kpiShortFundName(worstName); $('kpiWorstFundo').title=worstName; }
  syncMobileKpis();
}

async function carregarKPIs(){
  try{
    const r=await fetch(BASE_URL+'kpis_dashboard.json?v='+Date.now());
    const d=await r.json();
    kpisDashboard = d;
    const pl=d.resumo_geral?.pl_total_consolidado;
    const pipe=d.resumo_geral?.pipeline_novos_fundos;
    if(pl){
      $('kpiPL').textContent=fmtPLBilhoes(pl);
      if($('kpiPLSub')){ $('kpiPLSub').textContent='Patrimônio consolidado'; $('kpiPLSub').title=fmtPLMilhoes(pl); }
    }
    if(pipe!==undefined) $('kpiPipe').textContent=pipe;
    syncMobileKpis();
    renderRankings();
  }catch(e){
    console.warn('Não foi possível carregar kpis_dashboard.json', e);
  }
}


function getCdiRatioFromRow(row){
  const rent12=toNum(row['Acum. 12M (%)']);
  return calcCdiRatio(rent12, indicState?.cdi?.m12);
}
function updateCdiSortButtons(){
  document.querySelectorAll('[data-cdi-sort]').forEach(btn=>{
    btn.classList.toggle('active', btn.dataset.cdiSort === activeCdiSort);
    btn.setAttribute('aria-pressed', btn.dataset.cdiSort === activeCdiSort ? 'true' : 'false');
  });
}
function ordenarPorCdiRelativo(rows,dir){
  const mult = dir === 'asc' ? 1 : -1;
  rows.sort((a,b)=>{
    const av=getCdiRatioFromRow(a);
    const bv=getCdiRatioFromRow(b);
    if(av===null&&bv===null) return 0;
    if(av===null) return 1;
    if(bv===null) return -1;
    return (av-bv)*mult;
  });
}

const MOBILE_SORT_FIELDS={
  dia:'Variacao Dia (%)',
  mes:'Acum. Mes (%)',
  ano:'Acum. Ano (%)',
  m12:'Acum. 12M (%)',
  cdi:'__CDI_12M__'
};
function isMobileSortViewport(){
  return window.matchMedia && window.matchMedia('(max-width: 820px)').matches;
}

/* Favoritos: chave estável + compatibilidade com versões anteriores.
   Isso garante que o botão ⭐ Favoritos filtre de fato apenas os fundos salvos. */
const FAVORITOS_STORAGE_KEY='fundos_favoritos_v1';
function favNormalizeNameForFilter(row){
  return String(row?.['Fundo']||'')
    .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .toUpperCase().replace(/\s+/g,' ').trim().slice(0,160);
}
function favAliasesForRow(row){
  const aliases=[];
  const cnpj=String(row?.['CNPJ']||'').replace(/\D/g,'').slice(0,20);
  const nome=favNormalizeNameForFilter(row);
  const legacy=(String(row?.['CNPJ']||row?.['Fundo']||'').replace(/\D/g,'').slice(0,20) || JSON.stringify(row||{}).slice(0,40));
  if(cnpj) aliases.push(cnpj);
  if(nome) aliases.push(nome);
  if(legacy) aliases.push(legacy);
  return [...new Set(aliases.filter(Boolean))];
}
function favCanonicalKeyForRow(row){
  return favAliasesForRow(row)[0] || '';
}
function getFavSetForFilter(){
  try{return new Set(JSON.parse(localStorage.getItem(FAVORITOS_STORAGE_KEY)||'[]'));}
  catch(e){return new Set();}
}
function rowIsFavoritedForFilter(row){
  const favs=getFavSetForFilter();
  return favAliasesForRow(row).some(k=>favs.has(k));
}
function saveCanonicalFavorite(row,on){
  const favs=getFavSetForFilter();
  const aliases=favAliasesForRow(row);
  const key=favCanonicalKeyForRow(row);
  aliases.forEach(k=>favs.delete(k));
  if(on && key) favs.add(key);
  try{localStorage.setItem(FAVORITOS_STORAGE_KEY,JSON.stringify([...favs]));}catch(e){}
}
function getMobileSortValue(row,campo){
  if(campo==='cdi') return getCdiRatioFromRow(row);
  const key=MOBILE_SORT_FIELDS[campo] || MOBILE_SORT_FIELDS.m12;
  return toNum(row[key]);
}
function ordenarPorMobileSort(rows){
  const campo=activeMobileSortCampo || 'm12';
  const dir=activeMobileSortDir || 'desc';
  const mult=dir==='asc' ? 1 : -1;
  rows.sort((a,b)=>{
    const av=getMobileSortValue(a,campo);
    const bv=getMobileSortValue(b,campo);
    if(av===null&&bv===null) return 0;
    if(av===null) return 1;
    if(bv===null) return -1;
    return (av-bv)*mult;
  });
}
function updateMobileSortButtons(){
  document.querySelectorAll('[data-mobile-sort-field]').forEach(btn=>{
    const on=btn.dataset.mobileSortField===activeMobileSortCampo;
    btn.classList.toggle('active',on);
    btn.setAttribute('aria-pressed',on?'true':'false');
  });
  document.querySelectorAll('[data-mobile-sort-dir]').forEach(btn=>{
    const on=btn.dataset.mobileSortDir===activeMobileSortDir;
    btn.classList.toggle('active',on);
    btn.setAttribute('aria-pressed',on?'true':'false');
  });
  const toolbar=document.getElementById('mobileSortToolbar');
  if(toolbar){
    const labels={dia:'Dia',mes:'Mês',ano:'Ano',m12:'12M',cdi:'% CDI'};
    toolbar.setAttribute('data-current-sort',`${labels[activeMobileSortCampo]||'12M'} · ${activeMobileSortDir==='asc'?'Menor':'Maior'}`);
  }
}
function setMobileSort(campo,dir){
  if(campo) activeMobileSortCampo=campo;
  if(dir) activeMobileSortDir=dir;
  // No mobile, a régua própria controla a ordenação; evita conflito com clique em cabeçalho.
  activeCdiSort=null;
  sortCol=-1;
  sortDir=-1;
  updateCdiSortButtons();
  updateMobileSortButtons();
  applyFilter();
}
function setupMobileSortToolbar(){
  document.querySelectorAll('[data-mobile-sort-field]').forEach(btn=>{
    btn.addEventListener('click',()=>setMobileSort(btn.dataset.mobileSortField,null));
  });
  document.querySelectorAll('[data-mobile-sort-dir]').forEach(btn=>{
    btn.addEventListener('click',()=>setMobileSort(null,btn.dataset.mobileSortDir));
  });
  updateMobileSortButtons();
}
function setCdiSort(dir){
  activeCdiSort = activeCdiSort === dir ? null : dir;
  if(activeCdiSort){
    activeMobileSortCampo='cdi';
    activeMobileSortDir=activeCdiSort;
  }
  if(activeCdiSort){
    sortCol = -1;
    sortDir = -1;
    const thead=$('tableHead');
    if(thead) thead.querySelectorAll('th').forEach(t=>{
      const wasNum=t.classList.contains('th-num');
      t.className=wasNum?'th-num':'';
    });
  }
  updateCdiSortButtons();
  updateMobileSortButtons();
  applyFilter();
}
(function setupCdiSortButtonsWhenReady(){
  const setup=()=>{
    document.querySelectorAll('[data-cdi-sort]').forEach(btn=>{
      btn.addEventListener('click',()=>setCdiSort(btn.dataset.cdiSort));
    });
    updateCdiSortButtons();
  };


  window.__eltonDiagnosticarAtalhos=function(){
    const atalhos=[...document.querySelectorAll('.shortcut-preset[data-preset], .filter-preset-chip[data-preset]')];
    const out={
      buildIndex:document.querySelector('meta[name="app-build"]')?.content,
      buildAtalhos:window.__ELTAUM_SHORTCUT_FILTERS_BUILD__,
      presetAtivo:window.__ELTAUM_ACTIVE_SHORTCUT_PRESET__,
      qtdBotoes:atalhos.length,
      filteredQtd:Array.isArray(filtered)?filtered.length:null,
      allRowsQtd:Array.isArray(allRows)?allRows.length:null,
      botoes:atalhos.map(b=>({texto:b.textContent.trim(),preset:b.dataset.preset,classe:b.className,aria:b.getAttribute('aria-pressed')}))
    };
    console.table(out.botoes);
    console.log('[Diagnóstico atalhos]',out);
    return out;
  };

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',setup);
  else setup();
})();


function normalizeCatalogSearch(v){
  return String(v??'')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g,'')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g,' ')
    .trim()
    .replace(/\s+/g,' ');
}
function digitsOnlyCatalogSearch(v){
  return String(v??'').replace(/\D/g,'');
}
function rowMatchesCatalogSearch(row, query){
  const raw=String(query??'').trim().toLowerCase();
  if(!raw) return true;
  const norm=normalizeCatalogSearch(raw);
  const digits=digitsOnlyCatalogSearch(raw);
  return Object.values(row||{}).some(value=>{
    if(value===null || value===undefined || value==='') return false;
    const text=String(value);
    if(text.toLowerCase().includes(raw)) return true;
    if(norm && normalizeCatalogSearch(text).includes(norm)) return true;
    if(digits.length>=6 && digitsOnlyCatalogSearch(text).includes(digits)) return true;
    return false;
  });
}

function applyFilter(){
  const q=String(activeSearch||'').trim();
  const favModeAtivo = !!window.__favListMode;
  filtered=allRows.filter(r=>{
    if(favModeAtivo && !rowIsFavoritedForFilter(r)) return false;
    if(hideSemDados&&!temDados(r)) return false;
    if(activeCat){
      const rowCat=String(r['Categoria']||'');
      const canonCat=v=>String(v||'')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g,'')
        .replace(/[^A-Z0-9]+/gi,' ')
        .replace(/\s+/g,' ')
        .trim()
        .toUpperCase();
      if(rowCat!==activeCat && canonCat(rowCat)!==canonCat(activeCat)) return false;
    }
    if(activeBenchmark && detectarBenchmarkFundo(r).label !== activeBenchmark) return false;
    if(activePerfil){
      const tokens=String(r['Perfis']||r['Perfil']||'').split(/\s*\|\s*/).map(s=>s.trim());
      if(!tokens.includes(activePerfil)) return false;
    }
    if(activeRisco&&!perfilRiscoCorrespondeV198(r['Perfil de Risco'],activeRisco)) return false;
    if(q&&!rowMatchesCatalogSearch(r,q)) return false;
    return true;
  });
  if(isMobileSortViewport()){
    ordenarPorMobileSort(filtered);
  } else if(activeCdiSort){
    ordenarPorCdiRelativo(filtered, activeCdiSort);
  } else if(sortCol>=0&&sortCol<displayHeaders.length){
    const key=displayHeaders[sortCol];
    const isNum=NUM_SET.has(key);
    const isDate=isDateHeader(key);
    filtered.sort((a,b)=>{
      let av,bv;
      if(isNum){
        av=toNum(a[key]);
        bv=toNum(b[key]);
      }else if(isDate){
        av=parseDateBR(a[key]);
        bv=parseDateBR(b[key]);
      }else{
        av=String(a[key]||'').toLowerCase();
        bv=String(b[key]||'').toLowerCase();
        if(!av) av=null;
        if(!bv) bv=null;
      }
      return compararOrdenacao(av,bv);
    });
  }
  currentPage=1; expandedRows.clear(); render(); renderRankings(); updateCdiSortButtons();
  syncRiskProfileControlsV198();
}

/* ════════════════════════════════════════════════════
   DOCUMENTOS — fundos_caixa.json (CAIXA Asset)
════════════════════════════════════════════════════ */
let _fundosDocMap = {}; // CNPJ limpo → { codfundo, docs:{} }

let _fundosMetaMap = {};      // CNPJ limpo → cadastro operacional completo de fundos.json
let _fundosMetaByCode = {};   // código SIICO → cadastro
let _fundosMetaByName = {};   // nome normalizado → cadastro

function limparCnpjMeta(v){ return String(v || '').replace(/\D/g,'').slice(0,14); }
function normalizarNomeMeta(v){
  return String(v || '')
    .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .toUpperCase().replace(/[^A-Z0-9]+/g,' ').replace(/\s+/g,' ').trim();
}
function valorMetaValido(v){
  if(v === null || v === undefined) return false;
  const s=String(v).trim();
  return !!s && !/^(?:-|—|NULL|NONE|INDISPONIVEL)$/i.test(s);
}
function urlMetaValida(v){ return /^https?:\/\//i.test(String(v || '').trim()); }
function formatarCnpjMeta(v){
  const d=limparCnpjMeta(v);
  return d.length===14 ? `${d.slice(0,2)}.${d.slice(2,5)}.${d.slice(5,8)}/${d.slice(8,12)}-${d.slice(12)}` : String(v||'');
}
function formatarHoraMeta(v){
  const s=String(v || '').trim();
  const m=s.match(/^(\d{1,2})[:hH](\d{2})$/);
  return m ? `${String(Number(m[1])).padStart(2,'0')}h${m[2]}` : s;
}
function formatarPercentualMeta(v){
  if(v===null || v===undefined || String(v).trim()==='') return '';
  const n=Number(v);
  if(!Number.isFinite(n)) return '';
  return n.toLocaleString('pt-BR',{minimumFractionDigits:0,maximumFractionDigits:2})+'%';
}
function formatarAdiantamentoMeta(meta){
  const flag=meta?.ic_adiantamento_resgate;
  const modo=String(meta?.de_adiant_manual_automatico || '').trim();
  const pct=formatarPercentualMeta(meta?.pc_adiant_resgate);
  const modoNorm=normalizarStatusOperacional(modo);
  if(flag === true){
    const partes=['Sim'];
    if(modo && !modoNorm.includes('NAO SE APLICA')) partes.push(modo.toLowerCase()==='automatico'?'Automático':modo.toLowerCase()==='manual'?'Manual':modo);
    if(pct) partes.push(pct);
    return partes.join(' · ');
  }
  if(flag === false) return 'Não disponível';
  if(modoNorm.includes('NAO SE APLICA')) return 'Não se aplica';
  if(modo) return modo;
  return '';
}
function formatarCaptacaoMeta(meta){
  if(meta?.ic_aberto_captacao === true) return 'Aberto para captação';
  if(meta?.ic_aberto_captacao === false) return 'Fechado para captação';
  return '';
}
function formatarListaMeta(v){
  if(Array.isArray(v)) return v.filter(Boolean).join(' · ');
  if(!valorMetaValido(v)) return '';
  const s=String(v).trim();
  try{
    const parsed=JSON.parse(s);
    if(Array.isArray(parsed)) return parsed.filter(Boolean).join(' · ');
  }catch(e){}
  return s;
}
function pontuarMeta(meta){
  const campos=['no_benchmark','no_estrategia','no_classificacao_tributaria','de_horario_limite','de_horario_resgate','de_link_pagina_fundo','de_link_lamina','de_link_regulamento'];
  return campos.reduce((n,k)=>n+(valorMetaValido(meta?.[k])?1:0),0);
}

async function carregarFundosMetaJson(){
  try{
    const r=await fetch(BASE_URL+'fundos.json?v='+Date.now());
    if(!r.ok) throw new Error('HTTP '+r.status);
    const payload=await r.json();
    const lista=Array.isArray(payload) ? payload : (payload?.value || payload?.fundos || payload?.data || []);
    if(!Array.isArray(lista)) throw new Error('estrutura inesperada');

    const porCnpj={}, porCodigo={}, porNome={};
    lista.forEach(meta=>{
      if(!meta || typeof meta!=='object') return;
      const cnpj=limparCnpjMeta(meta.nu_cnpj || meta.cnpj);
      const codigoRaw=String(meta.co_siico00 || meta.co_siico || meta.codfundo || '').replace(/\D/g,'');
      const codigo=codigoRaw.replace(/^0+(?=\d)/,'');
      const nome=normalizarNomeMeta(meta.no_fundo || meta.nome);
      if(cnpj && (!porCnpj[cnpj] || pontuarMeta(meta)>=pontuarMeta(porCnpj[cnpj]))) porCnpj[cnpj]=meta;
      [codigoRaw,codigo].filter(Boolean).forEach(ch=>{ if(!porCodigo[ch] || pontuarMeta(meta)>=pontuarMeta(porCodigo[ch])) porCodigo[ch]=meta; });
      if(nome && (!porNome[nome] || pontuarMeta(meta)>=pontuarMeta(porNome[nome]))) porNome[nome]=meta;
    });
    _fundosMetaMap=porCnpj;
    _fundosMetaByCode=porCodigo;
    _fundosMetaByName=porNome;
    console.log(`[fundos.json] ${lista.length} registros · ${Object.keys(porCnpj).length} CNPJs indexados`);
    return lista;
  }catch(e){
    _fundosMetaMap={}; _fundosMetaByCode={}; _fundosMetaByName={};
    console.info('[fundos.json] metadados operacionais não disponíveis:',e.message);
    return [];
  }
}

function obterMetaFundo(row){
  const cnpj=limparCnpjMeta(row?.['CNPJ'] || row?.nu_cnpj);
  if(cnpj && _fundosMetaMap[cnpj]) return _fundosMetaMap[cnpj];
  const codigoRaw=String(row?.['codfundo'] || row?.co_siico00 || row?.co_siico || '').replace(/\D/g,'');
  const codigo=codigoRaw.replace(/^0+(?=\d)/,'');
  if(codigoRaw && _fundosMetaByCode[codigoRaw]) return _fundosMetaByCode[codigoRaw];
  if(codigo && _fundosMetaByCode[codigo]) return _fundosMetaByCode[codigo];
  const nome=normalizarNomeMeta(row?.['Fundo'] || row?.no_fundo);
  return nome ? (_fundosMetaByName[nome] || null) : null;
}

function preencherSeVazio(row,chave,valor){
  if(!valorMetaValido(row?.[chave]) && valorMetaValido(valor)) row[chave]=valor;
}
function mesclarMetadadosFundo(row){
  const meta=obterMetaFundo(row);
  if(!meta) return row;
  try{ Object.defineProperty(row,'__fundosMeta',{value:meta,enumerable:false,configurable:true}); }catch(e){ row.__fundosMeta=meta; }

  preencherSeVazio(row,'CNPJ',formatarCnpjMeta(meta.nu_cnpj));
  preencherSeVazio(row,'codfundo',String(meta.co_siico00 || meta.co_siico || '').replace(/^0+(?=\d)/,''));
  preencherSeVazio(row,'Perfil de Risco',meta.no_perfil_risco);
  preencherSeVazio(row,'Taxa Adm (%)',meta.pc_taxa_adm_cliente);
  preencherSeVazio(row,'Aplicacao Minima (R$)',meta.vr_aplicacao_inicial);
  preencherSeVazio(row,'Conversao Aplicacao',meta.de_conversao_aplicacao);
  preencherSeVazio(row,'Conversao Resgate',meta.de_conversao_resgate);
  preencherSeVazio(row,'Pagamento Resgate',meta.de_pagamento_resgate);
  preencherSeVazio(row,'Benchmark Oficial',String(meta.no_benchmark || '').trim());
  preencherSeVazio(row,'Estratégia',String(meta.no_estrategia || '').trim());
  preencherSeVazio(row,'Adiantamento de Resgate',formatarAdiantamentoMeta(meta));
  preencherSeVazio(row,'Classificação Tributária',String(meta.no_classificacao_tributaria || '').trim());
  preencherSeVazio(row,'Status de Captação',formatarCaptacaoMeta(meta));
  preencherSeVazio(row,'Horário Limite Aplicação',formatarHoraMeta(meta.de_horario_limite));
  preencherSeVazio(row,'Horário Limite Resgate',formatarHoraMeta(meta.de_horario_resgate || meta.de_horario_limite));

  preencherSeVazio(row,'Aplicacao Adicional Minima (R$)',meta.vr_aplicacao_adicional_minima);
  preencherSeVazio(row,'Resgate Minimo (R$)',meta.vr_resgate_minimo);
  preencherSeVazio(row,'Saldo Minimo (R$)',meta.vr_saldo_minimo);
  preencherSeVazio(row,'Público Alvo',formatarListaMeta(meta.lista_publico_alvo) || meta.no_classificacao_investidor);
  preencherSeVazio(row,'Movimentação Automática',meta.ic_mov_automatica===true?'Sim':meta.ic_mov_automatica===false?'Não':'');
  preencherSeVazio(row,'Carência',meta.ic_carencia===true?(meta.dt_fim_carencia?`Até ${meta.dt_fim_carencia}`:'Sim'):meta.ic_carencia===false?'Não':'');
  preencherSeVazio(row,'ASG',meta.ic_asg===true?'Sim':meta.ic_asg===false?'Não':'');
  preencherSeVazio(row,'Observação Operacional',String(meta.de_observacao_qs || '').trim());

  preencherSeVazio(row,'URL',urlMetaValida(meta.de_link_pagina_fundo)?meta.de_link_pagina_fundo:'');
  preencherSeVazio(row,'doc_lamina',urlMetaValida(meta.de_link_lamina)?meta.de_link_lamina:'');
  preencherSeVazio(row,'doc_regulamento',urlMetaValida(meta.de_link_regulamento)?meta.de_link_regulamento:'');
  preencherSeVazio(row,'doc_inf_comp',urlMetaValida(meta.de_link_info_compl)?meta.de_link_info_compl:'');
  preencherSeVazio(row,'doc_comunicado',urlMetaValida(meta.de_link_fato_relevante)?meta.de_link_fato_relevante:'');
  preencherSeVazio(row,'doc_boletim',urlMetaValida(meta.de_link_boletim_comercial)?meta.de_link_boletim_comercial:'');
  preencherSeVazio(row,'doc_termo',urlMetaValida(meta.de_link_termo_adesao)?meta.de_link_termo_adesao:'');
  return row;
}

async function carregarFundosJson(){
  try{
    const r = await fetch(BASE_URL+'fundos_caixa.json?v='+Date.now());
    if(!r.ok) throw new Error('HTTP '+r.status);
    const d = await r.json();
    _fundosDocMap = d.por_cnpj || {};
    console.log(`[fundos_caixa.json] ${Object.keys(_fundosDocMap).length} fundos indexados`);
  }catch(e){
    // Silencioso — fallback usa código extraído da URL
    console.info('[fundos_caixa.json] não disponível, usando fallback por URL:', e.message);
  }
}

function htmlAttr(s){
  return String(s||'').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function abrirDocsSelecionados(btn){
  const card = btn.closest('.docs-card');
  const urls = [...card.querySelectorAll('.doc-check:checked')].map(i=>i.dataset.url).filter(Boolean);
  if(!urls.length){ alert('Selecione pelo menos um documento.'); return; }
  urls.forEach((u,i)=>setTimeout(()=>window.open(u,'_blank','noopener'), i*180));
}

function abrirTodosDocs(btn){
  const card = btn.closest('.docs-card');
  const checks = [...card.querySelectorAll('.doc-check')];
  checks.forEach(c=>c.checked=true);
  const urls = checks.map(i=>i.dataset.url).filter(Boolean);
  if(!urls.length){ alert('Nenhum documento disponível para este fundo.'); return; }
  urls.forEach((u,i)=>setTimeout(()=>window.open(u,'_blank','noopener'), i*180));
}

function marcarTodosDocs(btn, checked){
  const card = btn.closest('.docs-card');
  card.querySelectorAll('.doc-check').forEach(c=>c.checked=checked);
}


function obterDocsFundoCompactos(row){
  const DOC_TIPOS = [
    { label:'Boletim Comercial', curto:'BC', icon:'⭐', csvKey:'doc_boletim', jsonKey:'boletim', cod:'LAC', pasta:'laminas-comerciais' },
    { label:'Lâmina', curto:'L', icon:'📄', csvKey:'doc_lamina',      jsonKey:'lamina',       cod:'LA',  pasta:'laminas' },
    { label:'Regulamento', curto:'R', icon:'📋', csvKey:'doc_regulamento', jsonKey:'regulamento',  cod:'RG',  pasta:'regulamentos' },
    { label:'Inf. Compl.', curto:'IC', icon:'ℹ️', csvKey:'doc_inf_comp',    jsonKey:'inf_comp',     cod:'FIC', pasta:'inf-com' },
    { label:'Comunicado', curto:'C', icon:'📢', csvKey:'doc_comunicado',  jsonKey:'comunicado',   cod:'COM', pasta:'comunicado-aos-cotistas' },
    { label:'Carta Mensal', curto:'CM', icon:'📊', csvKey:'doc_carta',       jsonKey:'carta_mensal', cod:'CM',  pasta:'carta-mensal' },
    { label:'Termo de Adesão', curto:'TA', icon:'✍️', csvKey:'doc_termo', jsonKey:'termo', cod:'TA', pasta:'termos-adesao' },
  ];

  const cnpjLimpo = String(row?.['CNPJ']||'').replace(/\D/g,'');
  const fundoDoc = cnpjLimpo ? _fundosDocMap[cnpjLimpo] : null;
  const urlFundo = String(row?.['URL']||'');
  const matchCod = urlFundo.match(/[_\/]([0-9]{3,6})(?:[_\/.]|$)/);
  const codFallback = matchCod ? matchCod[1] : '';

  const mkUrl = (c, pasta) => {
    if(!c || !pasta || !codFallback) return '';
    return c === 'RG'
      ? `https://www.caixa.gov.br/downloads/aplicacao-financeira-regulamentos/RG_${codFallback}.pdf`
      : `https://www.caixa.gov.br/Downloads/aplicacao-financeira-${pasta}/${c}_${codFallback}.pdf`;
  };

  const docs = [];
  const urlsVistas = new Set();

  DOC_TIPOS.forEach(d=>{
    const urlCsv = String(row?.[d.csvKey]||'').trim();
    const urlJson = String(fundoDoc?.docs?.[d.jsonKey]||'').trim();
    const urlFallback = mkUrl(d.cod,d.pasta);
    const url = [urlCsv,urlJson,urlFallback].find(u=>u && u.startsWith('http')) || '';
    if(url && !urlsVistas.has(url)){
      urlsVistas.add(url);
      docs.push({ ...d, url, estimado: url === urlFallback && !urlCsv && !urlJson });
    }
  });

  return docs;
}

function abrirDocsDaLinha(ev, btn){
  ev.preventDefault();
  ev.stopPropagation();
  try{
    const urls = JSON.parse(decodeURIComponent(btn.dataset.urls || '[]'));
    urls.forEach((u, i)=>setTimeout(()=>window.open(u, '_blank', 'noopener'), i*120));
  }catch(e){
    console.warn('Erro ao abrir documentos da linha:', e);
  }
}

function buildDocsCompactos(row){
  const docs = obterDocsFundoCompactos(row);
  if(!docs.length) return '<span class="doc-mini-empty">—</span>';

  const boletim = docs.find(d => d.csvKey === 'doc_boletim' || d.label === 'Boletim Comercial');
  const secundarios = boletim ? docs.filter(d => d.url !== boletim.url) : docs;

  const primary = boletim ? `
    <a class="doc-mini-primary" href="${htmlAttr(boletim.url)}" target="_blank" rel="noopener" onclick="event.stopPropagation()" title="Boletim Comercial">Boletim</a>
  ` : '';

  const btnTodos = (!boletim && docs.length > 1)
    ? `<button type="button" class="doc-mini-all" data-urls="${encodeURIComponent(JSON.stringify(docs.map(d=>d.url)))}" onclick="abrirDocsDaLinha(event,this)" title="Abrir todos os documentos">Todos</button>`
    : '';

  const links = secundarios.map(d=>`
    <a class="doc-mini doc-mini-secondary" href="${htmlAttr(d.url)}" target="_blank" rel="noopener" onclick="event.stopPropagation()" title="${htmlAttr(d.label)}">${d.curto}</a>
  `).join('');


  return `<div class="docs-mini-wrap">${primary}${btnTodos}${links}</div>`;
}

function buildDetailQuickActions(row, urlFund){
  const docs = obterDocsFundoCompactos(row);
  const boletim = docs.find(d => d.csvKey === 'doc_boletim' || /boletim/i.test(String(d.label||'')));
  const lamina = docs.find(d => d.csvKey === 'doc_lamina' || /lâmina|lamina/i.test(String(d.label||'')));
  const regulamento = docs.find(d => d.csvKey === 'doc_regulamento' || /regulamento/i.test(String(d.label||'')));

  const mkBtn = (href, cls, icon, label, title) => href
    ? `<a class="detail-action-btn ${cls}" href="${htmlAttr(href)}" target="_blank" rel="noopener" onclick="event.stopPropagation()" title="${htmlAttr(title || label)}"><span>${icon}</span>${label}</a>`
    : '';

  // O Boletim Comercial é o documento principal desta área. Quando ele não
  // estiver disponível, a lâmina assume o destaque para não deixar o cabeçalho vazio.
  const principal = boletim || lamina || regulamento;
  const principalLabel = principal === boletim ? 'Boletim Comercial' : principal === lamina ? 'Lâmina' : 'Regulamento';
  const principalIcon = principal === boletim ? '⭐' : principal === lamina ? '📄' : '📋';
  const principalTitle = principal === boletim ? 'Abrir Boletim Comercial' : `Abrir ${principalLabel.toLowerCase()}`;

  const primary = principal
    ? mkBtn(principal.url, 'detail-action-primary detail-action-commercial-v224', principalIcon, principalLabel, principalTitle)
    : '';

  const regulation = regulamento && regulamento !== principal
    ? mkBtn(regulamento.url, 'detail-action-secondary', '📋', 'Regulamento', 'Abrir regulamento')
    : '';

  const moreDocs = [
    lamina && lamina !== principal ? {href:lamina.url, icon:'📄', label:'Lâmina'} : null,
    urlFund ? {href:urlFund, icon:'🏦', label:'Página do fundo'} : null,
  ].filter(Boolean);

  const more = moreDocs.length ? `<details class="detail-more-docs-v224" onclick="event.stopPropagation()">
    <summary title="Abrir outros documentos"><span>＋</span>Mais documentos</summary>
    <div class="detail-more-docs-menu-v224">
      ${moreDocs.map(d=>`<a href="${htmlAttr(d.href)}" target="_blank" rel="noopener" onclick="event.stopPropagation()"><span>${d.icon}</span>${d.label}</a>`).join('')}
    </div>
  </details>` : '';

  const buttons = `${primary}${regulation}${more}`;
  if(!buttons) return '';
  return `<div class="detail-actions-card detail-actions-card-v158 detail-actions-card-v224">
    <div class="detail-actions-copy-v158">
      <div class="detail-actions-title">Informações do fundo</div>
      <small>Características operacionais e documentos oficiais</small>
    </div>
    <div class="detail-actions-buttons">${buttons}</div>
  </div>`;
}

function detailValueV158(r, keys, fallback='—'){
  for(const key of keys){
    const value = r?.[key];
    if(value === null || value === undefined) continue;
    const text = String(value).trim();
    if(text && text !== '—' && text.toUpperCase() !== 'INDISPONIVEL') return text;
  }
  return fallback;
}

function detailMoneyV158(value){
  const raw = String(value ?? '').trim();
  if(!raw || raw === '—') return '—';
  let normalized = raw.replace(/R\$/gi,'').replace(/\s/g,'');
  if(normalized.includes(',') && normalized.includes('.')) normalized = normalized.replace(/\./g,'').replace(',','.');
  else normalized = normalized.replace(',','.');
  const number = Number(normalized);
  if(!Number.isFinite(number)) return raw;
  return number.toLocaleString('pt-BR',{style:'currency',currency:'BRL',minimumFractionDigits:2,maximumFractionDigits:2});
}

function detailPercentV158(value){
  const raw = String(value ?? '').trim();
  if(!raw || raw === '—') return '—';
  let normalized = raw.replace(/%/g,'').replace(/\s/g,'');
  if(normalized.includes(',') && normalized.includes('.')) normalized = normalized.replace(/\./g,'').replace(',','.');
  else normalized = normalized.replace(',','.');
  const number = Number(normalized);
  if(!Number.isFinite(number)) return /%/.test(raw) ? raw : `${raw}%`;
  return `${number.toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2})}% a.a.`;
}

function detailBoolV158(value){
  const raw = String(value ?? '').trim();
  const norm = normalizarTextoBase(raw);
  if(!raw || raw === '—' || norm === 'NAO INFORMADO' || norm === 'INDISPONIVEL') return {label:'Não informado',state:'unknown',dot:'○'};
  if(['SIM','TRUE','1','ATIVO','ATIVA'].includes(norm) || norm.startsWith('SIM ')) return {label:'Sim',state:'on',dot:'●'};
  if(['NAO','FALSE','0','INATIVO','INATIVA'].includes(norm) || norm.startsWith('NAO ')) return {label:'Não',state:'off',dot:'○'};
  return {label:raw,state:'unknown',dot:'○'};
}

function detailAudienceV158(value){
  const raw = String(value ?? '').trim();
  if(!raw || raw === '—') return [];
  let values = [];
  if(raw.startsWith('[')){
    try{
      const parsed = JSON.parse(raw);
      if(Array.isArray(parsed)) values = parsed;
    }catch(e){}
  }
  if(!values.length) values = raw.split(/\s*[·;,|/]\s*/g);
  return [...new Set(values.map(v=>String(v).trim()).filter(Boolean))];
}

/* v225 — padronização semântica do público-alvo */
function detailAudienceSemanticV225(values){
  const out = [];
  const add = (label, short, cls) => {
    const key = normalizarTextoBase(label);
    if(!out.some(item=>item.key === key)) out.push({key,label,short,cls});
  };

  (Array.isArray(values) ? values : []).forEach(value=>{
    const raw = String(value ?? '').trim();
    if(!raw) return;
    const norm = normalizarTextoBase(raw);

    if((norm.includes('PESSOA FISICA') || norm === 'PF') && (norm.includes('PESSOA JURIDICA') || norm === 'PJ')){
      add('Pessoa Física','PF','pf');
      add('Pessoa Jurídica','PJ','pj');
      return;
    }
    if(norm === 'PF' || norm.includes('PESSOA FISICA')) return add('Pessoa Física','PF','pf');
    if(norm === 'PJ' || norm.includes('PESSOA JURIDICA')) return add('Pessoa Jurídica','PJ','pj');
    if(norm === 'GOV' || norm.includes('GOVERNO') || norm.includes('ENTE PUBLICO')) return add('Governo','Governo','gov');
    if(norm.includes('RPPS')) return add('RPPS','RPPS','rpps');
    if(norm.includes('PRIVATE')) return add('Private','Private','private');
    if(norm.includes('QUALIFICAD')) return add('Investidor qualificado','Qualificado','qualified');
    if(norm.includes('PROFISSIONAL')) return add('Investidor profissional','Profissional','professional');
    if(norm.includes('INSTITUCIONAL')) return add('Institucional','Institucional','institutional');
    if(norm.includes('NAO RESIDENTE')) return add('Não residente','Não residente','nonresident');
    if(norm === 'GERAL' || norm === 'PUBLICO GERAL' || norm === 'TODOS' || norm === 'TODOS OS PUBLICOS') return add('Público geral','Geral','general');
    if(norm.includes('VAREJO')) return add('Varejo','Varejo','retail');

    add(raw,raw,'other');
  });

  return out;
}

function detailAudienceChipV225(item, compact=false){
  const label = compact ? item.short : item.label;
  return `<span class="detail-audience-chip-v158 detail-audience-chip-v225 ${htmlAttr(item.cls)}" title="${htmlAttr(item.label)}">${htmlAttr(label)}</span>`;
}

function detailAdvanceSummaryV206(statusClass, text){
  const raw = String(text ?? '').trim();
  if(statusClass === 'negative') return 'Não';
  if(statusClass === 'unknown') return raw && raw !== '—' ? raw : 'Não informado';
  const match = raw.match(/(\d+(?:[.,]\d+)?)\s*%/);
  return match ? `Sim · ${match[1].replace('.',',')}%` : 'Sim';
}

function detailObservationV206(r){
  const observation = detailValueV158(r,['Observação Operacional','Observacao Operacional'],'');
  return observation
    ? `<details class="detail-observation-v158 detail-observation-v206 detail-observation-v224">
        <summary><span>⚠ Regras operacionais e carência</span><small>Ver detalhes</small></summary>
        <p>${htmlAttr(observation)}</p>
      </details>`
    : '';
}

function buildDetailExecutiveV158(r){
  const d = obterDadosOperacionaisFundo(r);
  const capCls = classeStatusOperacional(d.captacao.status,'captacao');
  const adiCls = classeStatusOperacional(d.adiantamento.status,'adiantamento');
  const profile = detailValueV158(r,['Perfil de Risco']);
  const cnpj = detailValueV158(r,['CNPJ']);
  const code = detailValueV158(r,['codfundo','Código do fundo','Codigo do fundo']);
  const taxAdm = detailPercentV158(detailValueV158(r,['Taxa Adm (%)']));
  const appInitial = detailMoneyV158(detailValueV158(r,['Aplicacao Minima (R$)','Aplicação Mínima','Aplicacao Minima']));
  const appAdditional = detailMoneyV158(detailValueV158(r,['Aplicacao Adicional Minima (R$)','Aplicação Adicional Mínima']));
  const redemptionMin = detailMoneyV158(detailValueV158(r,['Resgate Minimo (R$)','Resgate Mínimo']));
  const balanceMin = detailMoneyV158(detailValueV158(r,['Saldo Minimo (R$)','Saldo Mínimo']));
  const conversionApp = detailValueV158(r,['Conversao Aplicacao','Conversão Aplicação']);
  const conversionRed = detailValueV158(r,['Conversao Resgate','Conversão Resgate']);
  const paymentRed = detailValueV158(r,['Pagamento Resgate','Pagamento do Resgate']);
  const audience = detailAudienceV158(detailValueV158(r,['Público Alvo','Publico Alvo']));
  const audienceSemantic = detailAudienceSemanticV225(audience);
  const automatic = detailBoolV158(detailValueV158(r,['Movimentação Automática','Movimentacao Automatica']));
  const grace = detailBoolV158(detailValueV158(r,['Carência','Carencia']));
  const asgRaw = detailBoolV158(detailValueV158(r,['ASG']));
  const asg = asgRaw.state === 'off' ? {...asgRaw,label:'Não identificada'} : asgRaw;
  const capLabel = capCls === 'positive' ? 'Aberta' : capCls === 'negative' ? 'Fechada' : 'Não informado';
  const advanceSummary = detailAdvanceSummaryV206(adiCls,d.adiantamento.texto);
  const audienceSummaryHtml = audienceSemantic.length
    ? `<div class="detail-audience-compact-v225" aria-label="Público-alvo: ${htmlAttr(audienceSemantic.map(item=>item.label).join(', '))}">${audienceSemantic.slice(0,3).map(item=>detailAudienceChipV225(item,true)).join('')}${audienceSemantic.length>3?`<span class="detail-audience-more-v225" title="${htmlAttr(audienceSemantic.slice(3).map(item=>item.label).join(', '))}">+${audienceSemantic.length-3}</span>`:''}</div>`
    : '<strong>Não informado</strong>';
  const observationHtml = detailObservationV206(r);
  const cnpjCopyValue = String(cnpj || '').replace(/\D/g,'') || String(cnpj || '').trim();

  const statusValue = (text, cls) => `<span class="detail-status-v158 ${cls}"><i>●</i>${htmlAttr(text)}</span>`;
  const audienceHtml = audienceSemantic.length
    ? audienceSemantic.map(item=>detailAudienceChipV225(item,false)).join('')
    : '<span class="detail-empty-v158">Não informado</span>';
  const flagHtml = (label, obj) => `<span class="detail-flag-v158 ${obj.state}"><i>${obj.dot}</i><b>${htmlAttr(label)}</b><em>${htmlAttr(obj.label)}</em></span>`;

  return `<div class="detail-executive-v158 detail-executive-v206 detail-executive-v224">
    <section class="detail-summary-v158 detail-summary-v224" aria-label="Características principais do fundo">
      <div class="detail-section-head-v158 detail-section-head-v224"><strong>Características principais</strong></div>
      <div class="detail-summary-grid-v158 detail-summary-grid-v206 detail-summary-grid-v224">
        <div class="detail-summary-item-v158 strategy"><span>Estratégia</span><strong>${htmlAttr(d.estrategia.texto)}</strong>${d.estrategia.estimada?'<em>indicativo</em>':''}</div>
        <div class="detail-summary-item-v158"><span>Perfil de risco</span><strong>${htmlAttr(profile)}</strong></div>
        <div class="detail-summary-item-v158"><span>Benchmark</span><strong>${htmlAttr(d.benchmark.texto)}</strong>${d.benchmark.estimado?'<em>indicativo</em>':''}</div>
        <div class="detail-summary-item-v158"><span>Tributação</span><strong>${htmlAttr(d.tributacao.texto)}</strong></div>
        <div class="detail-summary-item-v158 audience-v225"><span>Público-alvo</span>${audienceSummaryHtml}</div>
        <div class="detail-summary-item-v158 capture"><span>Captação</span>${statusValue(capLabel,capCls)}</div>
      </div>
    </section>

    <section class="detail-movement-v158 detail-movement-v224" aria-label="Movimentação do fundo">
      <div class="detail-section-head-v158 detail-section-head-v224"><strong>Movimentação</strong><small>Prazos em dias úteis; solicitações após o horário limite podem seguir para o próximo dia útil.</small></div>
      <div class="detail-movement-grid-v158 detail-movement-grid-v224">
        <article class="detail-movement-card-v158 application">
          <div class="detail-movement-title-v158"><span>↓</span><div><b>Aplicação</b><small>Entrada de recursos</small></div></div>
          <div class="detail-flow-v158 detail-flow-v224">
            <div><span>Horário limite</span><strong>${htmlAttr(d.horarios.aplicacao)}</strong></div>
            <i>→</i>
            <div><span>Conversão da cota</span><strong>${htmlAttr(conversionApp)}</strong></div>
          </div>
          <div class="detail-movement-meta-v158"><span><b>Aplicação inicial</b>${htmlAttr(appInitial)}</span><span><b>Aplicação adicional</b>${htmlAttr(appAdditional)}</span></div>
        </article>
        <article class="detail-movement-card-v158 redemption">
          <div class="detail-movement-title-v158"><span>↑</span><div><b>Resgate</b><small>Saída de recursos</small></div></div>
          <div class="detail-flow-v158 three detail-flow-v224">
            <div><span>Horário limite</span><strong>${htmlAttr(d.horarios.resgate)}</strong></div>
            <i>→</i>
            <div><span>Conversão da cota</span><strong>${htmlAttr(conversionRed)}</strong></div>
            <i>→</i>
            <div><span>Crédito em conta</span><strong>${htmlAttr(paymentRed)}</strong></div>
          </div>
          <div class="detail-movement-meta-v158"><span><b>Resgate mínimo</b>${htmlAttr(redemptionMin)}</span><span class="advance ${adiCls}"><b>Adiantamento</b>${htmlAttr(advanceSummary)}</span></div>
        </article>
      </div>
      ${observationHtml}
    </section>

    <section class="detail-complementary-v224" aria-label="Informações complementares">
      <div class="detail-section-head-v158 detail-section-head-v224"><strong>Informações complementares</strong></div>
      <div class="detail-complementary-grid-v224">
        <div class="detail-complementary-group-v224">
          <span class="detail-complementary-kicker-v224">Custos e identificação</span>
          <dl class="detail-definition-list-v158 detail-definition-list-v224">
            <div><dt>Taxa de administração</dt><dd>${htmlAttr(taxAdm)}</dd></div>
            <div><dt>Saldo mínimo</dt><dd>${htmlAttr(balanceMin)}</dd></div>
            <div><dt>CNPJ</dt><dd class="copyable detail-copyable-v225"><span class="detail-copy-text-v225">${htmlAttr(cnpj)}</span><button type="button" class="detail-copy-btn-v225" data-copy-value="${htmlAttr(cnpjCopyValue)}" aria-label="Copiar CNPJ ${htmlAttr(cnpj)}" title="Copiar CNPJ"><span class="detail-copy-icon-v225" aria-hidden="true">⧉</span><span class="detail-copy-label-v225" aria-live="polite">Copiar</span></button></dd></div>
            <div><dt>Código SIICO</dt><dd>${htmlAttr(code)}</dd></div>
          </dl>
        </div>
        <div class="detail-complementary-group-v224">
          <span class="detail-complementary-kicker-v224">Público e enquadramento</span>
          <div class="detail-audience-v158 detail-audience-v224"><b>Público-alvo</b><div>${audienceHtml}</div></div>
          <div class="detail-flags-v158 detail-flags-v224">${flagHtml('Movimentação automática',automatic)}${flagHtml('Carência para resgate',grace)}${flagHtml('Classificação ASG',asg)}</div>
        </div>
      </div>
    </section>
  </div>`;
}

/* v225 — cópia explícita do CNPJ em fichas geradas dinamicamente */
(function initDetailCopyV225(){
  if(window.__ELTAUM_DETAIL_COPY_V225__) return;
  window.__ELTAUM_DETAIL_COPY_V225__ = true;

  async function copyTextV225(value){
    if(navigator.clipboard && window.isSecureContext){
      await navigator.clipboard.writeText(value);
      return;
    }
    const textarea = document.createElement('textarea');
    textarea.value = value;
    textarea.setAttribute('readonly','');
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand('copy');
    textarea.remove();
    if(!ok) throw new Error('Falha ao copiar');
  }

  document.addEventListener('click', async event=>{
    const target = event.target instanceof Element ? event.target : null;
    const button = target?.closest('.detail-copy-btn-v225');
    if(!button) return;

    event.preventDefault();
    event.stopPropagation();
    if(button.dataset.copyBusy === '1') return;

    const value = String(button.dataset.copyValue || '').trim();
    if(!value) return;

    const label = button.querySelector('.detail-copy-label-v225');
    const icon = button.querySelector('.detail-copy-icon-v225');
    const originalAria = button.getAttribute('aria-label') || 'Copiar CNPJ';
    button.dataset.copyBusy = '1';

    try{
      await copyTextV225(value);
      button.classList.add('is-copied');
      button.setAttribute('aria-label','CNPJ copiado');
      if(label) label.textContent = 'Copiado';
      if(icon) icon.textContent = '✓';
    }catch(error){
      button.classList.add('copy-error');
      button.setAttribute('aria-label','Não foi possível copiar o CNPJ');
      if(label) label.textContent = 'Tente novamente';
      if(icon) icon.textContent = '!';
    }

    clearTimeout(button._copyTimerV225);
    button._copyTimerV225 = setTimeout(()=>{
      button.classList.remove('is-copied','copy-error');
      button.setAttribute('aria-label',originalAria);
      if(label) label.textContent = 'Copiar';
      if(icon) icon.textContent = '⧉';
      delete button.dataset.copyBusy;
    },1800);
  });
})();

function buildDocsHtml(cnpjLimpo, urlFundo, row){
  let cod = String(row?.['codfundo']||'').trim();
  const fundoDoc = cnpjLimpo ? _fundosDocMap[cnpjLimpo] : null;
  cod = cod || String(fundoDoc?.codfundo||'').trim();

  const docs = obterDocsFundoCompactos(row);
  if(!docs.length) return '';

  const pills = docs.map((d,idx)=>{
    const primaryCls = d.csvKey === 'doc_boletim' ? ' primary-doc' : '';
    return `
    <label class="doc-pill${primaryCls}" title="${htmlAttr(d.url)}">
      <input type="checkbox" class="doc-check" data-url="${htmlAttr(d.url)}" checked>
      <a href="${htmlAttr(d.url)}" target="_blank" rel="noopener">${d.icon} ${d.label}</a>
    </label>`;
  }).join('');

  return `<aside class="docs-card">
    <div class="docs-head">
      <div class="docs-title">📁 Documentos${cod ? '<br><span style="color:var(--muted)">Cód. '+htmlAttr(cod)+'</span>' : ''}</div>
      <div class="docs-actions">
        <button type="button" class="docs-action-btn" onclick="abrirTodosDocs(this)">Abrir todos</button>
      </div>
    </div>
    <div class="docs-grid">${pills}</div>
    <div class="docs-actions" style="margin-top:8px">
      <button type="button" class="docs-action-btn secondary" onclick="abrirDocsSelecionados(this)">Abrir selecionados</button>
      <button type="button" class="docs-action-btn secondary" onclick="marcarTodosDocs(this,false)">Limpar</button>
    </div>
    <div class="docs-note">Os PDFs podem abrir em novas abas. Se bloquear, permita pop-ups para localhost.</div>
  </aside>`;
}


function gerarLeituraRapidaFundo(r){
  const texto = (v) => String(v ?? '').trim();
  const numero = (v) => {
    if(v === null || v === undefined) return null;
    let s = String(v).trim();
    if(!s || s === '-' || s === '—' || s.toLowerCase() === 'none') return null;
    if(s.includes(',') && s.includes('.')) s = s.replace(/\./g,'').replace(',','.');
    else s = s.replace(',','.');
    const n = parseFloat(s);
    return isNaN(n) ? null : n;
  };
  const pct = (n) => n === null ? '' : `${n >= 0 ? '+' : ''}${n.toFixed(2).replace('.',',')}%`;

  const nome = texto(r['Fundo']);
  const categoria = texto(r['Categoria']);
  const risco = texto(r['Perfil de Risco']);
  const taxa = texto(r['Taxa Adm (%)']);
  const conv = texto(r['Conversao Resgate']);
  const pag = texto(r['Pagamento Resgate']);
  const rent12 = numero(r['Acum. 12M (%)']);
  const rentAno = numero(r['Acum. Ano (%)']);
  const cdiRatio = calcCdiRatio(rent12, indicState.cdi.m12);

  const base = (categoria + ' ' + nome)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g,'')
    .toUpperCase();

  // ── Objetivo por categoria ──────────────────────────────────────────
  let objetivo = 'Este fundo pode ser analisado como alternativa de investimento conforme sua categoria, perfil de risco, liquidez e comportamento de rentabilidade.';

  if(base.includes('FUNDOS MUTUOS DE PRIVATIZACAO') || base.includes('FMP')){
    objetivo = 'Fundo Mútuo de Privatização (FMP-FGTS): permite aplicar recursos do FGTS em ações de empresas privatizadas. Concentra risco em papéis específicos e está sujeito às oscilações do mercado de renda variável e ao ambiente regulatório.';
  } else if(base.includes('PETROBRAS') && base.includes('PRE-SAL')){
    objetivo = 'Fundo concentrado em ações da Petrobras com ênfase em ativos do pré-sal. Exposição elevada ao desempenho operacional da empresa, variações do preço do petróleo, câmbio e risco político/regulatório do setor de energia.';
  } else if(base.includes('PETROBRAS')){
    objetivo = 'Fundo concentrado em ações da Petrobras. Apresenta exposição direta ao preço do petróleo, variações cambiais, política de dividendos da empresa e risco regulatório do setor. Adequado para horizonte de longo prazo com tolerância a alta volatilidade.';
  } else if(base.includes('VALE') || base.includes('RIO DOCE')){
    objetivo = 'Fundo concentrado em ações da Vale. O desempenho está diretamente ligado ao preço internacional do minério de ferro e ao ciclo de demanda da China (principal consumidor). Exposto à variação cambial (receitas em dólar) e a riscos ESG do setor de mineração.';
  } else if(base.includes('ELETROBRAS') || base.includes('PRIVATIZ')){
    objetivo = 'Fundo com exposição a ações de empresas resultantes de processos de privatização, incluindo o setor elétrico. O desempenho reflete a transição para o modelo privado de gestão, tarifas reguladas, política energética e condições hídricas do país.';
  } else if(base.includes('CONSTRUCAO CIVIL')){
    objetivo = 'Fundo setorial de construção civil. Exposto ao ciclo imobiliário, taxa de juros (INCC, IGPM), crédito habitacional e programas governamentais. Indicado para quem acredita na expansão do setor a médio e longo prazo.';
  } else if(base.includes('CONSUMO')){
    objetivo = 'Fundo setorial com ações de empresas de consumo e varejo. O desempenho reflete o ciclo econômico doméstico, nível de emprego, renda e confiança do consumidor. Correlacionado com a atividade econômica do Brasil.';
  } else if(base.includes('DIVIDENDOS')){
    objetivo = 'Fundo focado em ações com histórico consistente de distribuição de dividendos. Estratégia orientada à geração de renda recorrente via proventos, combinando potencial de valorização com menor volatilidade relativa ao Ibovespa.';
  } else if(base.includes('SMALL CAPS')){
    objetivo = 'Fundo de ações de empresas menores (small caps), com potencial de crescimento acima da média, mas com liquidez e volatilidade superiores aos fundos de large caps. Requer horizonte de longo prazo e tolerância a oscilações maiores.';
  } else if(base.includes('BDR')){
    objetivo = 'Fundo com exposição a BDRs (Brazilian Depositary Receipts), que representam ações de empresas estrangeiras negociadas no Brasil. O desempenho combina a performance das empresas investidas com a variação cambial BRL/USD.';
  } else if(base.includes('ISE') || base.includes('SUSTENTABILIDADE')){
    objetivo = 'Fundo de ações com critérios ESG (ambiental, social e governança), referenciado ao Índice de Sustentabilidade Empresarial da B3. Seleciona empresas com melhores práticas socioambientais dentro do universo de investimento.';
  } else if(base.includes('SETOR FINANCEIRO')){
    objetivo = 'Fundo setorial com exposição a bancos, seguradoras e outras instituições financeiras. O desempenho é sensível ao nível de spread bancário, inadimplência, regulação do setor e ciclo de crédito da economia.';
  } else if(base.includes('INFRAESTRUTURA')){
    objetivo = 'Fundo setorial de infraestrutura, com exposição a empresas de utilidade pública, concessões, energia e saneamento. Apresenta características defensivas com previsibilidade de receita por contratos de longo prazo.';
  } else if((base.includes('IBOVESPA') || base.includes('IBX') || base.includes('IBRX') || base.includes('PIBB')) && !base.includes('ATIVO')){
    objetivo = 'Fundo passivo referenciado ao Ibovespa ou IBrX. O objetivo é replicar o desempenho do índice com baixo custo de gestão. Exposição ampla ao mercado acionário brasileiro, incluindo as principais empresas por liquidez e capitalização.';
  } else if(base.includes('IBOVESPA') && base.includes('ATIVO')){
    objetivo = 'Fundo de gestão ativa que usa o Ibovespa como benchmark. O gestor busca superar o índice por meio de seleção de ações, podendo apresentar tracking error (diferença de desempenho) positivo ou negativo em relação ao índice.';
  } else if(base.includes('BOLSA AMERICANA') || base.includes('GLOBAL EQUITIES') || base.includes('INVEST EXT') || base.includes('IE')){
    objetivo = 'Fundo com exposição ao mercado acionário internacional (principalmente EUA). O retorno em reais combina a performance das ações no exterior com a variação cambial BRL/USD. Serve como diversificação geográfica da carteira.';
  } else if(base.includes('CAMBIAL') || base.includes('DOLAR') || base.includes('EURO') || base.includes('INDEXA DOLAR')){
    objetivo = 'Fundo cambial com exposição direta à variação da moeda estrangeira frente ao real. Funciona como hedge (proteção) cambial ou especulação direcional. O resultado depende quase exclusivamente da variação da taxa de câmbio.';
  } else if(base.includes('OURO')){
    objetivo = 'Fundo com exposição ao ouro, ativo historicamente usado como reserva de valor e proteção em cenários de incerteza e inflação. O retorno em reais combina a performance do ouro em dólar com a variação cambial.';
  } else if(base.includes('IMA-B 5+') || base.includes('IMA-B5+')){
    objetivo = 'Fundo de renda fixa referenciado ao IMA-B 5+, índice de títulos IPCA+ com prazo acima de 5 anos. Elevada sensibilidade a variações de taxa de juros (duration longa). Indicado para proteção contra inflação no longo prazo, mas com volatilidade relevante.';
  } else if(base.includes('IMA-B 5') || base.includes('IMA-B5')){
    objetivo = 'Fundo de renda fixa referenciado ao IMA-B 5 (títulos IPCA+ com prazo de até 5 anos). Menor sensibilidade à taxa de juros que o IMA-B 5+, mas ainda com exposição à inflação e marcação a mercado dos títulos.';
  } else if(base.includes('IMA-B') || base.includes('IMAB') || base.includes('BRASIL INFLACAO')){
    objetivo = 'Fundo de renda fixa indexado ao IMA-B (Índice de Mercado ANBIMA de títulos IPCA+). Protege o patrimônio da inflação com rendimento real. A marcação a mercado pode gerar volatilidade no curto prazo, especialmente em períodos de abertura de juros.';
  } else if(base.includes('IRF-M 1+') || base.includes('IRFM 1+')){
    objetivo = 'Fundo de renda fixa referenciado ao IRF-M 1+ (títulos prefixados com prazo acima de 1 ano). Alta sensibilidade à taxa de juros futura (duration longa). O valor da cota pode variar bastante conforme a curva de juros — positiva quando os juros caem, negativa quando sobem.';
  } else if(base.includes('IRF-M 1') || base.includes('IRFM 1')){
    objetivo = 'Fundo de renda fixa referenciado ao IRF-M 1 (títulos prefixados com prazo de até 1 ano). Menor sensibilidade à taxa de juros que o IRF-M 1+, com retorno mais previsível e adequado a horizontes mais curtos.';
  } else if(base.includes('IRF-M') || base.includes('IRFM') || base.includes('PREFIXADO') || base.includes('PRE RF') || base.includes('ABSOLUTO PRE')){
    objetivo = 'Fundo de renda fixa prefixada, com rentabilidade contratada no momento da aplicação. O valor da cota oscila conforme a variação da curva de juros (marcação a mercado). Beneficia-se de quedas de taxa Selic; perde quando os juros sobem.';
  } else if(base.includes('IDKA')){
    objetivo = 'Fundo referenciado ao IDKA (Índice de Duração Constante ANBIMA), que mantém prazo médio fixo de títulos IPCA+. O retorno combina juro real com variação da inflação, com duration controlada para previsibilidade de risco.';
  } else if(base.includes('CREDITO PRIVADO') || base.includes('CRED PRIV') || base.includes('EXPERTISE') || base.includes('DIAMANTE') || base.includes('FIDELIDADE')){
    objetivo = 'Fundo de renda fixa com exposição a títulos corporativos, como debêntures, CRIs e CRAs. Busca prêmio acima do CDI, mas exige atenção à liquidez e ao risco de crédito dos emissores. Avaliar spread, qualidade dos ativos e prazo de resgate.';
  } else if(base.includes('MULTIMERCADO') && (base.includes('BTG') || base.includes('ZARATHUSTRA') || base.includes('PIMCO') || base.includes('VERDE') || base.includes('CLARITAS'))){
    objetivo = 'Fundo multimercado de gestão especializada (parceria com gestora renomada). Estratégia flexível com exposição a múltiplas classes de ativos. Avalie o histórico de risco/retorno, volatilidade e consistência da gestora em diferentes cenários de mercado.';
  } else if(base.includes('MULTIMERCADO')){
    objetivo = 'Fundo multimercado com liberdade de alocação entre diferentes classes de ativos (juros, câmbio, ações). O resultado depende fortemente das decisões táticas do gestor. Avalie o histórico de volatilidade e consistência de desempenho.';
  } else if(base.includes('FUNDO DE INDICE') || base.includes('ETF IBOVESPA')){
    objetivo = 'ETF (Fundo de Índice) negociado em bolsa que replica um índice de referência. Combina a diversificação de uma carteira índice com a liquidez de negociação em bolsa e taxas de administração tipicamente baixas.';
  } else if(base.includes('EXTRAMERCADO') || base.includes('TRANSFERENCIA VOLUNTARIA') || base.includes('SAUDE SUPLEMENTAR') || base.includes('CNI') || base.includes('SEBRAE') || base.includes('ANS')){
    objetivo = 'Fundo de destinação específica, voltado a segmentos institucionais ou programas governamentais com regras e restrições próprias de aplicação e resgate. Consulte a lâmina para verificar elegibilidade.';
  } else if(base.includes('RENDA FIXA REFERENCIADO') || base.includes('REF DI') || base.includes('REFERENC DI')){
    objetivo = 'Fundo referenciado ao CDI, com objetivo de acompanhar a taxa DI com liquidez diária. Adequado para reserva de liquidez, capital de giro e posições conservadoras. O retorno varia conforme o nível da taxa Selic/CDI.';
  } else if(base.includes('RENDA FIXA CURTO PRAZO') || base.includes('CURTO PRAZO')){
    objetivo = 'Fundo de renda fixa de curto prazo com prazo médio de carteira reduzido. Baixa sensibilidade a variações de juros e alta liquidez. Adequado para objetivos de curtíssimo prazo ou como alternativa à poupança.';
  } else if(base.includes('RENDA FIXA SIMPLES') || base.includes('RF SIMPLES')){
    objetivo = 'Fundo de renda fixa simples com gestão passiva e isenção de IOF após 30 dias. Voltado a perfis conservadores e reserva de emergência. Investe majoritariamente em títulos públicos federais.';
  } else if(base.includes('TITULOS PUBLICOS') || base.includes('TP RF') || base.includes('BRASIL TP')){
    objetivo = 'Fundo de renda fixa com carteira composta predominantemente por títulos públicos federais. Risco soberano baixo, com retorno atrelado à taxa Selic ou indexadores (prefixado/IPCA+) conforme a estratégia do fundo.';
  } else if(base.includes('RENDA FIXA')){
    objetivo = 'Fundo de renda fixa com estratégia ampla — pode incluir títulos públicos, crédito privado, inflação ou prefixados conforme a política de investimento. Verifique o regulamento para entender a composição e o nível de risco efetivo.';
  }

  // ── Tags de contexto rápido ──────────────────────────────────────────
  const tags = [];
  if(base.includes('PETROBRAS') || base.includes('VALE') || base.includes('RIO DOCE') || base.includes('ELETROBRAS') || base.includes('FMP') || base.includes('PRIVATIZ'))
    tags.push('<span class="fund-note-tag tag-risco-alto">⚡ Risco concentrado</span>');
  if(base.includes('CREDITO PRIVADO') || base.includes('CRED PRIV'))
    tags.push('<span class="fund-note-tag tag-credpriv">📋 Crédito privado</span>');
  if(base.includes('CAMBIAL') || base.includes('DOLAR') || base.includes('EURO') || base.includes('OURO') || base.includes('BOLSA AMERICANA') || base.includes('GLOBAL') || base.includes('BDR'))
    tags.push('<span class="fund-note-tag tag-cambio">💱 Exposição cambial</span>');
  if(base.includes('IMA-B') || base.includes('IPCA') || base.includes('INFLACAO') || base.includes('IDKA'))
    tags.push('<span class="fund-note-tag tag-inflacao">📊 Indexado inflação</span>');
  if(base.includes('IRF-M') || base.includes('IRFM') || base.includes('PRE RF') || base.includes('PREFIXADO') || base.includes('ABSOLUTO PRE'))
    tags.push('<span class="fund-note-tag tag-risco-mod">📉 Prefixado / duration</span>');
  if(base.includes('REF DI') || base.includes('REFERENCIADO') || base.includes('SIMPLES') || base.includes('CURTO PRAZO'))
    tags.push('<span class="fund-note-tag tag-liquidez">💧 Liquidez diária / CDI</span>');
  if(base.includes('SMALL CAPS'))
    tags.push('<span class="fund-note-tag tag-risco-alto">📈 Small caps</span>');
  if(base.includes('IMA-B 5+') || base.includes('IRFM 1+') || base.includes('LONGO PRAZO'))
    tags.push('<span class="fund-note-tag tag-risco-mod">⏳ Duration longa</span>');

  // ── Alerta de CDI abaixo de 80% ──────────────────────────────────────
  let alertaCdi = '';
  if(cdiRatio !== null && cdiRatio < 80 && rent12 !== null &&
     (base.includes('REFERENCIADO') || base.includes('REF DI') || base.includes('SIMPLES') || base.includes('RENDA FIXA'))){
    alertaCdi = `<div class="fund-note-alert">⚠️ <strong>Atenção:</strong> Este fundo rendeu apenas <strong>${cdiRatio}% do CDI</strong> nos últimos 12 meses. Fundos de renda fixa/referenciados abaixo de 90–95% do CDI merecem avaliação cuidadosa da relação custo-benefício.</div>`;
  }

  // ── Complementos da leitura rápida ─────────────────────────────────
  // Evita redundância: cadastro, taxa, perfil e liquidez já aparecem na grade de dados.
  // Aqui ficam apenas os indicadores de performance para leitura executiva.
  const complementos = [];
  if(rentAno !== null) complementos.push({label:'Ano', value:pct(rentAno)});
  if(rent12 !== null) complementos.push({label:'12M', value:pct(rent12)});
  if(cdiRatio !== null) complementos.push({label:'% CDI', value:`${cdiRatio}% do CDI`});

  const tagsHtml = tags.length
    ? `<div class="fund-note-badge-wrap">${tags.join('')}</div>`
    : '';

  const metricValueClass = (label, value) => {
    const n = toNum(value);
    const labelNorm = normalizarTextoBase(label);
    if(n === null || !Number.isFinite(Number(n))) return 'zero';
    if(labelNorm.includes('CDI')){
      if(n < 0) return 'neg';
      if(n >= 100) return 'pos cdi-good';
      if(n >= 80) return 'cdi-mid';
      return 'cdi-low';
    }
    return n > 0 ? 'pos' : n < 0 ? 'neg' : 'zero';
  };

  // Métricas removidas da Leitura rápida para evitar duplicidade com o bloco Rentabilidade.
  // Ano, 12M e % CDI já aparecem no card/tabela principal.
  const complementosHtml = '';

  const escapeNoteV237 = (v) => String(v ?? '').replace(/[&<>"']/g, ch => ({
    '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
  }[ch]));

  const formatarLeituraConsultivaV237 = (texto) => {
    const clean = String(texto || '').replace(/\s+/g, ' ').trim();
    if(!clean) return '';

    // Quebra controlada para mobile: blocos curtos, sem justificar texto.
    const isCredPriv = base.includes('CREDITO PRIVADO') || base.includes('CRED PRIV');
    if(isCredPriv){
      return [
        'Fundo de renda fixa com exposição a títulos corporativos, como debêntures, CRIs e CRAs.',
        'Busca prêmio acima do CDI, mas exige atenção à liquidez e ao risco de crédito dos emissores.',
        'Avaliar spread, qualidade dos ativos e prazo de resgate.'
      ].map(p => `<p>${escapeNoteV237(p)}</p>`).join('');
    }

    const frases = clean
      .split(/(?<=[.!?])\s+/)
      .map(p => p.trim())
      .filter(Boolean);

    if(frases.length <= 1) return `<p>${escapeNoteV237(clean)}</p>`;

    const blocos = [];
    for(const frase of frases){
      if(blocos.length && (blocos[blocos.length - 1] + ' ' + frase).length <= 128){
        blocos[blocos.length - 1] += ' ' + frase;
      }else{
        blocos.push(frase);
      }
    }

    return blocos.slice(0, 3).map(p => `<p>${escapeNoteV237(p)}</p>`).join('');
  };

  const objetivoHtml = formatarLeituraConsultivaV237(objetivo);

  return `
    <div class="fund-quick-note fund-quick-note-v224 fund-quick-note-v237">
      <div class="fund-quick-note-head-v224">
        <div class="fund-quick-note-title">🧭 Leitura consultiva</div>
        ${tagsHtml}
      </div>
      <div class="fund-quick-note-text fund-quick-note-text-v237">${objetivoHtml}</div>
      ${complementosHtml}
      ${alertaCdi}
      <div class="fund-quick-note-disclaimer">
        ⓘ Leitura interpretativa. Consulte os documentos oficiais.
      </div>
    </div>`;
}

function buildDetailPanel(r,colspan){
  const urlFund=isFallbackUrl(r)?'':getFundUrl(r);
  const detailActions = buildDetailQuickActions(r, urlFund);
  return `<tr class="detail-row"><td colspan="${colspan}" style="padding:0">
    <div class="detail-panel detail-panel-mobile-clean detail-panel-v158">
      <div class="detail-main">${detailActions}${buildDetailExecutiveV158(r)}${gerarLeituraRapidaFundo(r)}</div>
    </div>
  </td></tr>`;
}


function normalizarTextoBase(v){
  return String(v || '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g,'')
    .toUpperCase();
}

function detectarLiquidezFundo(r){
  const conv = String(r['Conversao Resgate'] || '').trim();
  const pag = String(r['Pagamento Resgate'] || '').trim();

  if(conv || pag){
    return `${conv || '—'} / ${pag || '—'}`;
  }

  return '';
}

function getLiquidezConsultiva(r){
  const clean = v => String(v || '').trim();
  const conv = clean(r['Conversao Resgate']);
  const pag = clean(r['Pagamento Resgate']);

  if(conv && pag){
    if(conv === pag) return conv;
    return `Conv. ${conv} · Pag. ${pag}`;
  }
  if(conv) return `Conv. ${conv}`;
  if(pag) return `Pag. ${pag}`;
  return 'Consultar';
}

function detectarBenchmarkFundo(r){
  const nome = normalizarTextoBase(r['Fundo']);
  const cat = normalizarTextoBase(r['Categoria']);
  const risco = normalizarTextoBase(r['Perfil de Risco']);
  const base = `${cat} ${nome} ${risco}`;

  if(base.includes('CAMBIAL') || base.includes('DOLAR') || base.includes('EURO') || base.includes('OURO') || base.includes('BDR') || base.includes('BOLSA AMERICANA') || base.includes('GLOBAL')){
    return {label:'Dólar/Câmbio', cls:'bench-cambio', icon:'💱'};
  }
  if(base.includes('IMA-B') || base.includes('IMAB') || base.includes('IPCA') || base.includes('INFLACAO') || base.includes('IDKA')){
    return {label:'IPCA', cls:'bench-ipca', icon:'📊'};
  }
  if(base.includes('IRF-M') || base.includes('IRFM') || base.includes('PREFIXADO') || base.includes('PRE RF') || base.includes('IMA-B 5+') || base.includes('LONGO PRAZO')){
    return {label:'Prefixado/Duration', cls:'bench-prefixado', icon:'⏳'};
  }
  if(base.includes('CREDITO PRIVADO') || base.includes('CRED PRIV')){
    return {label:'Crédito privado', cls:'bench-cred', icon:'📋'};
  }
  if(base.includes('ACOES') || base.includes('IBOVESPA') || base.includes('SMALL CAPS') || base.includes('PETROBRAS') || base.includes('VALE') || base.includes('ELETROBRAS') || base.includes('FMP') || base.includes('FUNDO DE INDICE')){
    return {label:'Renda variável', cls:'bench-rv', icon:'📈'};
  }
  if(base.includes('MULTIMERCADO')){
    return {label:'Multimercado', cls:'bench-multi', icon:'🧭'};
  }
  if(base.includes('REF DI') || base.includes('REFERENCIADO') || base.includes('SIMPLES') || base.includes('CURTO PRAZO') || base.includes('CDI') || base.includes('RENDA FIXA')){
    return {label:'CDI', cls:'bench-cdi', icon:'📌'};
  }
  return {label:'Outros', cls:'bench-outros', icon:'🧩'};
}


function primeiroCampoFundo(r, chaves){
  for(const chave of chaves){
    const valor = String(r?.[chave] ?? '').trim();
    if(valor && valor !== '-' && valor !== '—' && valor.toLowerCase() !== 'null' && valor.toLowerCase() !== 'none') return valor;
  }
  return '';
}

function normalizarStatusOperacional(valor){
  return String(valor || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g,'')
    .trim()
    .toUpperCase();
}

function detectarEstrategiaFundo(r){
  const oficial = primeiroCampoFundo(r,[
    'Estratégia','Estrategia','Estratégia do Fundo','Estrategia do Fundo',
    'Política de Investimento','Politica de Investimento','Composição da Carteira','Composicao da Carteira'
  ]);
  if(oficial) return {texto:oficial, estimada:false};

  const nome = normalizarTextoBase(r?.['Fundo']);
  const cat = normalizarTextoBase(r?.['Categoria']);
  const base = `${cat} ${nome}`;
  let texto = '';

  if(base.includes('FUNDOS MUTUOS DE PRIVATIZACAO') || base.includes('FMP')) texto='FMP-FGTS com exposição concentrada a ações de empresa privatizada';
  else if(base.includes('CREDITO PRIVADO') || base.includes('CRED PRIV')) texto='Renda fixa com exposição a crédito privado';
  else if(base.includes('IMA-B 5+') || base.includes('IMAB 5+')) texto='Renda fixa indexada à inflação com duration longa';
  else if(base.includes('IMA-B 5') || base.includes('IMAB 5')) texto='Renda fixa indexada à inflação com duration intermediária';
  else if(base.includes('IMA-B') || base.includes('IMAB') || base.includes('IPCA') || base.includes('IDKA')) texto='Renda fixa indexada à inflação';
  else if(base.includes('IRF-M 1+') || base.includes('IRFM 1+')) texto='Renda fixa prefixada com duration longa';
  else if(base.includes('IRF-M 1') || base.includes('IRFM 1')) texto='Renda fixa prefixada de prazo mais curto';
  else if(base.includes('IRF-M') || base.includes('IRFM') || base.includes('PREFIXADO') || base.includes('PRE RF')) texto='Renda fixa prefixada';
  else if(base.includes('REF DI') || base.includes('REFERENCIADO') || base.includes('CDI')) texto='Renda fixa referenciada ao CDI';
  else if(base.includes('RENDA FIXA SIMPLES') || base.includes('RF SIMPLES')) texto='Renda fixa simples, com predominância de títulos públicos federais';
  else if(base.includes('CURTO PRAZO')) texto='Renda fixa de curto prazo';
  else if(base.includes('TITULOS PUBLICOS') || base.includes('TP RF') || base.includes('BRASIL TP')) texto='Renda fixa com predominância de títulos públicos federais';
  else if(base.includes('CAMBIAL') || base.includes('DOLAR') || base.includes('EURO')) texto='Exposição cambial';
  else if(base.includes('FUNDO DE INDICE') || base.includes('ETF')) texto='Gestão passiva para replicação de índice';
  else if(base.includes('ACOES') || base.includes('IBOVESPA') || base.includes('SMALL CAPS')) texto='Renda variável';
  else if(base.includes('MULTIMERCADO')) texto='Multimercado com alocação em múltiplas classes';
  else if(base.includes('RENDA FIXA')) texto='Renda fixa de estratégia ampla';
  else texto='Estratégia não identificada na base';

  return {texto, estimada:true};
}

function obterDadosOperacionaisFundo(r){
  const benchmarkOficial = primeiroCampoFundo(r,['Benchmark Oficial','Benchmark','Índice de Referência','Indice de Referencia','Referência','Referencia']);
  const benchmarkDetectado = detectarBenchmarkFundo(r);
  const estrategia = detectarEstrategiaFundo(r);
  const adiantamento = primeiroCampoFundo(r,[
    'Adiantamento de Resgate','Adiantamento Resgate','Permite Adiantamento de Resgate',
    'Permite Adiantamento','Adiantamento','Antecipação de Resgate','Antecipacao de Resgate'
  ]);
  const tributacao = primeiroCampoFundo(r,[
    'Classificação Tributária','Classificacao Tributaria','Classificação Tributaria',
    'Tributação','Tributacao','Regime Tributário','Regime Tributario'
  ]);
  const captacao = primeiroCampoFundo(r,[
    'Status de Captação','Status Captação','Status Captacao','Captação','Captacao',
    'Aberto para Captação','Aberto para Captacao','Situação de Captação','Situacao de Captacao'
  ]);
  const horarioMovimentacao = primeiroCampoFundo(r,[
    'Horário Limite Movimentação','Horario Limite Movimentacao',
    'Horário de Movimentação','Horario de Movimentacao',
    'Grade de Movimentação','Grade de Movimentacao','Horário da Grade','Horario da Grade'
  ]);
  const horarioAplicacao = primeiroCampoFundo(r,[
    'Horário Limite Aplicação','Horario Limite Aplicacao',
    'Horário Limite de Aplicação','Horario Limite de Aplicacao',
    'Horário Aplicação','Horario Aplicacao','Horário de Aplicação','Horario de Aplicacao',
    'Grade Aplicação','Grade Aplicacao','Grade de Aplicação','Grade de Aplicacao'
  ]) || horarioMovimentacao;
  const horarioResgate = primeiroCampoFundo(r,[
    'Horário Limite Resgate','Horario Limite Resgate',
    'Horário Limite de Resgate','Horario Limite de Resgate',
    'Horário Resgate','Horario Resgate','Horário de Resgate','Horario de Resgate',
    'Grade Resgate','Grade de Resgate'
  ]) || horarioMovimentacao;

  return {
    benchmark:{texto:benchmarkOficial || benchmarkDetectado.label || 'Não informado', estimado:!benchmarkOficial},
    estrategia,
    adiantamento:{texto:adiantamento || 'Não informado', status:normalizarStatusOperacional(adiantamento)},
    tributacao:{texto:tributacao || 'Não informada'},
    captacao:{texto:captacao || 'Não informada', status:normalizarStatusOperacional(captacao)},
    horarios:{
      aplicacao:horarioAplicacao || 'Não informado',
      resgate:horarioResgate || 'Não informado',
      informado:Boolean(horarioAplicacao || horarioResgate)
    }
  };
}

function classeStatusOperacional(status, tipo){
  if(!status) return 'unknown';
  if(tipo === 'captacao'){
    if(status.includes('FECHAD') || status.includes('ENCERRAD') || status.includes('SUSPENS')) return 'negative';
    if(status.includes('ABERT') || status.includes('DISPONIVEL') || status === 'SIM') return 'positive';
  }
  if(tipo === 'adiantamento'){
    if(status.includes('NAO SE APLICA')) return 'unknown';
    if(status === 'NAO' || status.startsWith('NAO ') || status.includes('NAO PERMITE') || status.includes('INDISPONIVEL')) return 'negative';
    if(status === 'SIM' || status.startsWith('SIM ') || status.includes('PERMITE') || status.includes('DISPONIVEL')) return 'positive';
  }
  return 'unknown';
}



function formatarHorarioGradeMobileV236(valor){
  const raw = String(valor || '').trim();
  if(!raw || raw === '—') return 'Não informado';
  if(/não informado/i.test(raw)) return 'Não informado';
  const m = raw.match(/^(\d{1,2})(?::|h)(\d{2})$/i);
  if(m){
    return `${String(m[1]).padStart(2,'0')}h${m[2]}`;
  }
  const m2 = raw.match(/^(\d{1,2})$/);
  if(m2){
    return `${String(m2[1]).padStart(2,'0')}h00`;
  }
  return raw.replace(/(\d{1,2}):(\d{2})/g, function(_,h,mi){return `${String(h).padStart(2,'0')}h${mi}`;});
}

function rotuloCaptacaoMobileV235(info){
  const raw = String(info?.texto || '').trim();
  const status = String(info?.status || normalizarStatusOperacional(raw) || '').toUpperCase();
  const cls = classeStatusOperacional(status, 'captacao');
  if(cls === 'positive') return {valor:'Sim', detalhe:'Aberto', cls:'positive', dot:'●'};
  if(cls === 'negative') return {valor:'Não', detalhe:'Fechado', cls:'negative', dot:'●'};
  return {valor: raw && raw !== 'Não informada' ? raw : 'Não informado', detalhe:'Status não identificado', cls:'unknown', dot:'○'};
}

function deveExibirAdiantamentoMobileV235(info, cls){
  const raw = String(info?.texto || '').trim();
  const norm = normalizarStatusOperacional(raw);
  if(!raw || raw === 'Não informado') return false;
  if(norm.includes('NAO SE APLICA')) return false;
  return cls !== 'unknown' || raw.length > 0;
}

function factMobileV235(label, value, opts={}){
  const cls = opts.cls ? ` ${opts.cls}` : '';
  const detail = opts.detail ? `<small>${htmlAttr(opts.detail)}</small>` : '';
  const dot = opts.dot ? `<i>${opts.dot}</i>` : '';
  return `<div class="fund-fact-v154 fund-fact-mobile-v235${cls}"><span>${htmlAttr(label)}</span><strong>${dot}${value}</strong>${detail}</div>`;
}

function buildFundOperationalFacts(r, variant='detail'){
  const d = obterDadosOperacionaisFundo(r);
  const capCls = classeStatusOperacional(d.captacao.status,'captacao');
  const adiCls = classeStatusOperacional(d.adiantamento.status,'adiantamento');
  const capDot = capCls==='positive'?'●':capCls==='negative'?'●':'○';
  const adiDot = adiCls==='positive'?'●':adiCls==='negative'?'●':'○';
  const estimateBadge = '<em class="fund-fact-estimated-v154">indicativo</em>';

  if(String(variant || '').includes('mobile')){
    const cap = rotuloCaptacaoMobileV235(d.captacao);
    const adiantamentoHtml = deveExibirAdiantamentoMobileV235(d.adiantamento, adiCls)
      ? factMobileV235('Antecipação de resgate', htmlAttr(d.adiantamento.texto), {cls:`status-${adiCls}`, dot:adiDot})
      : '';

    const cnpjBruto = detailValueV158(r,['CNPJ']);
    const cnpjLimpo = String(cnpjBruto || '').replace(/\D/g,'').slice(0,14);
    const cnpjFormatado = cnpjLimpo ? formatarCnpjMeta(cnpjLimpo) : String(cnpjBruto || '').trim();
    const cnpjHtml = cnpjFormatado
      ? `<div class="fund-cnpj-row-mobile-v238" aria-label="CNPJ do fundo">
          <span>CNPJ</span>
          <strong class="fund-cnpj-value-mobile-v238">${htmlAttr(cnpjFormatado)}</strong>
          <button type="button" class="fund-cnpj-copy-mobile-v238 detail-copy-btn-v225" data-copy-value="${htmlAttr(cnpjLimpo || cnpjFormatado)}" aria-label="Copiar CNPJ ${htmlAttr(cnpjFormatado)}" title="Copiar CNPJ"><span class="detail-copy-icon-v225" aria-hidden="true">⧉</span><span class="detail-copy-label-v225" aria-live="polite">Copiar</span></button>
        </div>`
      : '';

    return `<section class="fund-facts-v154 mobile fund-facts-mobile-v235 fund-facts-mobile-v236 fund-facts-mobile-v238" aria-label="Dados operacionais e cadastrais do fundo">
      <div class="fund-facts-head-v154 fund-facts-head-mobile-v235 fund-facts-head-mobile-v236 fund-facts-head-mobile-v238"><strong>Dados do fundo</strong><small>Operação, referência e disponibilidade</small></div>
      ${cnpjHtml}

      <div class="fund-operation-strip-v235 fund-operation-strip-v236" aria-label="Horários limite de movimentação">
        <div><span>Aplicação</span><strong>${htmlAttr(formatarHorarioGradeMobileV236(d.horarios.aplicacao))}</strong></div>
        <div><span>Resgate</span><strong>${htmlAttr(formatarHorarioGradeMobileV236(d.horarios.resgate))}</strong></div>
      </div>

      <div class="fund-facts-grid-v154 fund-facts-grid-mobile-v235">
        ${factMobileV235('Referência', `${htmlAttr(d.benchmark.texto)} ${d.benchmark.estimado?estimateBadge:''}`)}
        ${factMobileV235('Estratégia', `${htmlAttr(d.estrategia.texto)} ${d.estrategia.estimada?estimateBadge:''}`, {cls:'strategy'})}
        ${factMobileV235('Tributação', htmlAttr(d.tributacao.texto))}
        ${factMobileV235('Novas aplicações', htmlAttr(cap.valor), {cls:`status-${cap.cls} availability`, dot:cap.dot})}
        ${adiantamentoHtml}
      </div>
      <p class="fund-operation-note-v235">Solicitações após o horário limite podem ser processadas no próximo dia útil.</p>
    </section>`;
  }

  return `<section class="fund-facts-v154 ${htmlAttr(variant)}" aria-label="Informações complementares do fundo">
    <div class="fund-facts-head-v154"><strong>Informações complementares</strong><small>${r?.__fundosMeta?'Dados oficiais do cadastro do fundo':'Dados da base; indicação apenas quando sinalizada'}</small></div>
    <div class="fund-facts-grid-v154">
      <div class="fund-fact-v154"><span>Benchmark / referência</span><strong>${htmlAttr(d.benchmark.texto)} ${d.benchmark.estimado?estimateBadge:''}</strong></div>
      <div class="fund-fact-v154 strategy"><span>Estratégia</span><strong>${htmlAttr(d.estrategia.texto)} ${d.estrategia.estimada?estimateBadge:''}</strong></div>
      <div class="fund-fact-v154"><span>Adiantamento de resgate</span><strong class="status-${adiCls}"><i>${adiDot}</i>${htmlAttr(d.adiantamento.texto)}</strong></div>
      <div class="fund-fact-v154"><span>Classificação tributária</span><strong>${htmlAttr(d.tributacao.texto)}</strong></div>
      <div class="fund-fact-v154"><span>Captação</span><strong class="status-${capCls}"><i>${capDot}</i>${htmlAttr(d.captacao.texto)}</strong></div>
      <div class="fund-fact-v154 movement-hours-v155"><span>Horários limite da grade diária</span><strong class="fund-hours-v155 ${d.horarios.informado?'has-data':'no-data'}"><em><b>Aplicação</b>${htmlAttr(d.horarios.aplicacao)}</em><em><b>Resgate</b>${htmlAttr(d.horarios.resgate)}</em></strong><small>Solicitações após o horário limite podem ser processadas no próximo dia útil.</small></div>
    </div>
  </section>`;
}
function prazoResgateCell(valor, tipo){
  const v = String(valor || '').trim();
  const cls = v ? `prazo-badge ${tipo === 'pagamento' ? 'pagamento' : ''}` : 'prazo-badge muted';
  return `<td class="col-prazo-resgate"><span class="${cls}">${htmlAttr(v || '—')}</span></td>`;
}

function conversaoCell(r){
  return prazoResgateCell(r['Conversao Resgate'], 'conversao');
}

function pagamentoCell(r){
  return prazoResgateCell(r['Pagamento Resgate'], 'pagamento');
}

function liquidezCell(r){
  return `<td class="col-liquidez"><span class="liquidez-badge">💧 ${htmlAttr(getLiquidezConsultiva(r))}</span></td>`;
}

function benchmarkCell(r){
  const b = detectarBenchmarkFundo(r);
  return `<td class="col-benchmark"><span class="benchmark-badge ${b.cls}">${b.icon} ${htmlAttr(b.label)}</span></td>`;
}

function buildSinaisConsultivos(r){
  const nome = normalizarTextoBase(r['Fundo']);
  const cat = normalizarTextoBase(r['Categoria']);
  const risco = normalizarTextoBase(r['Perfil de Risco']);
  const base = `${cat} ${nome} ${risco}`;
  const chips = [];

  const liquidez = detectarLiquidezFundo(r);
  if(liquidez){
    chips.push(`<span class="sinal-chip sinal-liq">💧 ${liquidez}</span>`);
  }

  if(base.includes('REF DI') || base.includes('REFERENCIADO') || base.includes('SIMPLES') || base.includes('CURTO PRAZO') || base.includes('CDI')){
    chips.push(`<span class="sinal-chip sinal-cdi">📌 CDI</span>`);
  }

  if(base.includes('IMA-B') || base.includes('IMAB') || base.includes('IPCA') || base.includes('INFLACAO') || base.includes('IDKA')){
    chips.push(`<span class="sinal-chip sinal-ipca">📊 IPCA</span>`);
  }

  if(base.includes('CAMBIAL') || base.includes('DOLAR') || base.includes('EURO') || base.includes('OURO') || base.includes('BDR') || base.includes('BOLSA AMERICANA') || base.includes('GLOBAL')){
    chips.push(`<span class="sinal-chip sinal-cambio">💱 Câmbio</span>`);
  }

  if(base.includes('CREDITO PRIVADO') || base.includes('CRED PRIV')){
    chips.push(`<span class="sinal-chip sinal-cred">📋 Crédito privado</span>`);
  }

  if(base.includes('IRF-M') || base.includes('IRFM') || base.includes('PREFIXADO') || base.includes('PRE RF') || base.includes('IMA-B 5+') || base.includes('LONGO PRAZO')){
    chips.push(`<span class="sinal-chip sinal-duration">⏳ Duration</span>`);
  }

  if(base.includes('ACOES') || base.includes('IBOVESPA') || base.includes('SMALL CAPS') || base.includes('PETROBRAS') || base.includes('VALE') || base.includes('ELETROBRAS') || base.includes('FMP') || base.includes('FUNDO DE INDICE')){
    chips.push(`<span class="sinal-chip sinal-rv">📈 Renda variável</span>`);
  }

  if(!chips.length){
    chips.push(`<span class="sinal-chip">🧭 Ver detalhe</span>`);
  }

  return `<div class="sinais-wrap">${chips.slice(0,4).join('')}</div>`;
}

/* Calcula quanto % do CDI o fundo rendeu em 12M */
function calcCdiRatio(rent12, cdi12){
  const r = typeof rent12 === 'string' ? toNum(rent12) : rent12;
  const c = cdi12 || indicState.cdi.m12 || null;
  if(r === null || c === null || c === 0) return null;
  return Math.round((r / c) * 100);
}
function pctCdiCell(r){
  const rent12 = toNum(r['Acum. 12M (%)']);
  const ratio = calcCdiRatio(rent12, indicState.cdi.m12);
  if(ratio === null) return '<td class="cdi-ratio-cell"><span class="cdi-ratio-badge neutral">—</span></td>';
  const cls = ratio >= 100 ? 'above' : ratio >= 80 ? 'neutral' : 'below';
  const label = ratio >= 100 ? `${ratio}% CDI` : `${ratio}% CDI`;
  const icon = ratio >= 100 ? '▲' : ratio >= 80 ? '≈' : '▼';
  return `<td class="cdi-ratio-cell">
    <span class="cdi-ratio-badge ${cls}">${icon} ${ratio}%</span>
  </td>`;
}


/* ════════════════════════════════════════
   CÉLULAS OTIMIZADAS v21
════════════════════════════════════════ */

// Liquidez Unificada: Conversão + Pagamento em 1 célula compacta
function liquidezUnifCell(r){
  const conv = String(r['Conversao Resgate']||'').trim();
  const pag  = String(r['Pagamento Resgate']||'').trim();
  if(!conv && !pag) return '<td class="liq-unified-cell"><span style="color:var(--muted2);font-size:.65rem">—</span></td>';

  // D+30 ou mais = prazo realmente longo (apagado, sem alarme)
  const isLong = pag && /D\+([3-9][0-9]|[1-9][0-9]{2,})/.test(pag);

  const sameValue = conv && pag && conv === pag;
  let inner = '';
  if(sameValue){
    inner = `<div class="liq-line"><span class="liq-label">Conv</span><span class="liq-val">${htmlAttr(conv)}</span></div>`;
  } else {
    if(conv) inner += `<div class="liq-line"><span class="liq-label">Conv</span><span class="liq-val">${htmlAttr(conv)}</span></div>`;
    if(pag)  inner += `<div class="liq-line"><span class="liq-label">Pag</span><span class="liq-val${isLong?' liq-long':''}">${htmlAttr(pag)}</span></div>`;
  }
  return `<td class="liq-unified-cell"><div class="liq-unified-inner">${inner}</div></td>`;
}

// Acum. 12M com tipografia em destaque (Cormorant maior)
function pct12mCell(val){
  if(!val||String(val).trim()===''||val==='-'||val==='—')
    return '<td class="col-pct-12m"><span class="dash" style="color:var(--muted2)">—</span></td>';
  const n=toNum(val);
  if(n===null) return `<td class="col-pct-12m"><span class="dash">${val}</span></td>`;
  const cls=n>0?'pos':n<0?'neg':'zero';
  const sign=n>0?'+':'';
  // Sub-label contextual
  const cdi12 = indicState?.cdi?.m12;
  const ratio = (cdi12 && cdi12 > 0) ? Math.round((n/cdi12)*100) : null;
  const subLabel = ratio !== null ? (n < 0 ? 'retorno negativo' : `≈ ${ratio}% do CDI`) : '';
  return `<td class="col-pct-12m"><div class="pct12m-wrap">
    <span class="pct12m-val ${cls}">${sign}${val}</span>
    ${subLabel ? `<span class="pct12m-sub">${subLabel}</span>` : ''}
  </div></td>`;
}

// % CDI 12M com barra visual proporcional
function pctCdiCell(r){
  const rent12=toNum(r['Acum. 12M (%)']);
  const ratio=calcCdiRatio(rent12,indicState?.cdi?.m12);
  if(ratio===null) return '<td class="col-cdi-bar"><span class="cdi-ratio-badge neutral">—</span></td>';

  const cls   = ratio>=100?'above':ratio>=80?'neutral':'below';
  const icon  = ratio>=100?'▲':ratio>=80?'≈':'▼';
  const label = `${icon} ${ratio}%`;

  // Barra: 100% CDI = 33% da largura (referência visual no centro)
  // Máximo exibido: 300% CDI = largura total
  const pct300 = Math.min(ratio/300*100, 100);

  return `<td class="col-cdi-bar">
    <div class="cdi-bar-wrap">
      <div class="cdi-bar-header">
        <span class="cdi-bar-pct ${cls}">${label}</span>
      </div>
      <div class="cdi-bar-track" title="${ratio}% do CDI em 12 meses">
        <div class="cdi-bar-fill ${cls}" style="width:${pct300}%"></div>
      </div>
      <span class="cdi-bar-label">do CDI 12M</span>
    </div>
  </td>`;
}


// Mobile: uma célula única de rentabilidade para evitar tabela espremida.
// Mantém Dia, Mês, Ano, 12M e % do CDI sem criar muitas colunas no celular.
function mobileResumoRentCell(r){
  const metrics = [
    { label:'D', title:'Dia', key:'Variacao Dia (%)' },
    { label:'M', title:'Mês', key:'Acum. Mes (%)' },
    { label:'A', title:'Ano', key:'Acum. Ano (%)' },
  ];

  function fmtPctInline(raw){
    const n = toNum(raw);
    if(n === null) return {txt:'—', cls:'zero'};
    const sign = n > 0 ? '+' : '';
    const txt = sign + String(raw).replace('.', ',');
    return {txt, cls:n > 0 ? 'pos' : n < 0 ? 'neg' : 'zero'};
  }

  const rent12 = toNum(r['Acum. 12M (%)']);
  const m12 = fmtPctInline(r['Acum. 12M (%)']);
  const ratio = calcCdiRatio(rent12, indicState?.cdi?.m12);
  const ratioTxt = ratio === null ? 'CDI indisponível' : (rent12 !== null && rent12 < 0 ? 'retorno negativo' : `≈ ${ratio}% do CDI`);

  const small = metrics.map(m=>{
    const v = fmtPctInline(r[m.key]);
    return `<span class="mrt-pill ${v.cls}" title="${m.title}: ${v.txt}"><b>${m.label}</b><strong>${v.txt}</strong></span>`;
  }).join('');

  return `<td class="mobile-rent-summary-cell">
    <div class="mobile-rent-summary mobile-rent-summary-v3">
      <div class="mrt-period-strip">${small}</div>
      <div class="mrt-12m-line ${m12.cls}">
        <span class="mrt-main-label">12M</span>
        <strong>${m12.txt}</strong>
        <small>${ratioTxt}</small>
      </div>
    </div>
  </td>`;
}

function buildRowHTML(r,idx){
  const semDados=!temDados(r);
  const visibleHeaders=getVisibleHeaders();
  const colspan=visibleHeaders.length+2;
  let html=`<tr${semDados?' class="row-sem-dados"':''} data-idx="${idx}">`;
  const isExpanded=expandedRows.has(idx);
  html+=`<td style="width:28px;padding:11px 8px;text-align:center">
    <button class="exp-btn" data-idx="${idx}">${isExpanded?'▲':'▼'}</button>
  </td>`;
  // Checkbox comparador
  const isCompSelected = comparSet.has(idx);
  html+=`<td class="comp-check-wrap" style="width:28px;padding:0 4px">
    <input type="checkbox" class="comp-check" data-idx="${idx}" ${isCompSelected?'checked':''} title="Selecionar para comparar">
  </td>`;
  visibleHeaders.forEach(h=>{
    const val=String(r[h]||'');
    if(h==='Resumo Mobile'){
      html+=mobileResumoRentCell(r);return;
    }
    if(h==='Categoria'){
      const cls=CAT_CLS[val]||'RF';
      html+=`<td class="col-cat"><span class="cat-badge cat-${cls}">${val||'—'}</span></td>`;return;
    }
    if(h==='Sinais'){
      html+=`<td class="col-sinais">${buildSinaisConsultivos(r)}</td>`;return;
    }
    if(h==='Conversão'){
      html+=conversaoCell(r);return;
    }
    if(h==='Pagamento'){
      html+=pagamentoCell(r);return;
    }
    if(h==='Conv / Pag'){
      html+=liquidezUnifCell(r);return;
    }
    if(h==='Conv / Pag'){
      html+=liquidezCell(r);return;
    }
    if(h==='Benchmark'){
      html+=benchmarkCell(r);return;
    }
    if(h==='Fundo'){
      const url=getFundUrl(r); const isFb=isFallbackUrl(r);
      const fbLabel=isFb?'<span class="link-fallback">🔍</span>':'';
      // Categoria como badge colorido
      const cat=String(r['Categoria']||'');
      const catCls=CAT_CLS[cat]||'RF';
      const catAbrev={'RENDA FIXA SIMPLES':'RF Simples','RENDA FIXA':'RF','RENDA FIXA REFERENCIADO':'RF Ref.','RENDA FIXA CURTO PRAZO':'RF CP','MULTIMERCADO':'MM','CAMBIAL':'CAM','ACOES':'Ações','FUNDO DE INDICE':'ETF','FUNDOS MUTUOS DE PRIVATIZACAO':'FMP'};
      const catLabel=catAbrev[cat]||cat.slice(0,8);
      // PL compacto
      const plVal=toNum(r['PL (milhoes R$)']);
      const plStr=plVal?'PL R$ '+( plVal>=1000?(plVal/1000).toFixed(1)+'bi' : plVal.toLocaleString('pt-BR',{maximumFractionDigits:0})+'mi' ):'';
      const cnpjBruto=String(r['CNPJ']||'').trim();
      const cnpjLimpo=cnpjBruto.replace(/\D/g,'').slice(0,14);
      const cnpjFormatado=cnpjLimpo ? formatarCnpjMeta(cnpjLimpo) : cnpjBruto;
      const cnpjStr=cnpjFormatado ? `<span class="fundo-cnpj-sub">CNPJ ${htmlAttr(cnpjFormatado)}</span>` : '';
      html+=`<td class="col-fundo"><a href="${url}" target="_blank" rel="noopener" class="fundo-cell-name">${val}${fbLabel}<svg class="link-icon" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></a><div class="fundo-cell-meta"><span class="fundo-cat-badge cat-${catCls}">${catLabel}</span>${cnpjStr}${plStr?`<span class="fundo-pl-sub">${plStr}</span>`:''}</div></td>`;return;
    }
    if(['Variacao Dia (%)','Acum. Mes (%)','Acum. Ano (%)'].includes(h)){html+=pctCell(val);return;}
    if(h==='Acum. 12M (%)'){html+=pct12mCell(val);return;}
    if(h==='% CDI 12M'){html+=pctCdiCell(r);return;}
    if(h==='Documentos'){
      html+=`<td class="col-docs">${buildDocsCompactos(r)}</td>`;return;
    }
    if(h==='Perfis'){
      const chips=val.split(/\s*\|\s*/).filter(Boolean).map(p=>`<span class="perfil-chip pchip-${p.trim()}">${p.trim()}</span>`).join('');
      html+=`<td><div class="perfis-wrap">${chips}</div></td>`;return;
    }
    html+=`<td>${val||'—'}</td>`;
  });
  html+='</tr>';
  if(isExpanded) html+=buildDetailPanel(r,colspan);
  return html;
}

function fundPlural(n){ return n===1 ? 'fundo encontrado' : 'fundos encontrados'; }
function perPageDisplayLabel(){
  const sel=$('perPage');
  return sel?.selectedOptions?.[0]?.textContent?.trim() || (perPage===9999?'Todos os fundos':`${perPage} por página`);
}
function updateFundResultSummary(){
  const total=Array.isArray(filtered)?filtered.length:0;
  const resultText=`Resultado: ${total.toLocaleString('pt-BR')} ${fundPlural(total)}`;
  const top=$('filterResultSummary');
  if(top) top.textContent=`${total.toLocaleString('pt-BR')} ${fundPlural(total)}`;
  const shell=$('fundFilterShell');
  if(shell) shell.setAttribute('data-result', resultText);
  const per=$('perPage');
  if(per) per.setAttribute('aria-label', `Exibição: ${perPageDisplayLabel()}`);
}

function render(){
  const start=(currentPage-1)*perPage;
  const end=perPage===9999?filtered.length:Math.min(start+perPage,filtered.length);
  const rows=filtered.slice(start,end);
  const tbody=$('tableBody');
  if(!rows.length){
    tbody.innerHTML=`<tr><td colspan="20" style="text-align:center;padding:50px;color:var(--muted)">Nenhum fundo encontrado.</td></tr>`;
    $('resultInfo').textContent='Resultado: 0 fundos encontrados'; updateFundResultSummary(); renderPagination(); return;
  }
  tbody.innerHTML=rows.map((r,i)=>buildRowHTML(r,start+i)).join('');
  $('resultInfo').textContent= perPage===9999 ? `Resultado: ${filtered.length.toLocaleString('pt-BR')} ${fundPlural(filtered.length)}` : `Resultado: ${filtered.length.toLocaleString('pt-BR')} ${fundPlural(filtered.length)} · exibindo ${Math.min(start+1,filtered.length)}–${end}`;
  updateFundResultSummary();
  // Eventos checkboxes comparador
  tbody.querySelectorAll('.comp-check').forEach(cb=>{
    const idx = parseInt(cb.dataset.idx);
    cb.addEventListener('change', ()=>{
      const row = filtered[idx] || allRows[idx];
      comparToggle(idx, row, cb);
    });
    cb.addEventListener('click', e=>e.stopPropagation());
  });

  tbody.querySelectorAll('.exp-btn').forEach(btn=>{
    btn.addEventListener('click',e=>{
      e.stopPropagation();
      const idx=parseInt(btn.dataset.idx);
      if(expandedRows.has(idx)) expandedRows.delete(idx); else expandedRows.add(idx);
      render();
    });
  });
  renderPagination();
}

function scrollToFundResultsStart(options={}){
  const tableWrap = document.querySelector('#sec-fundos .table-wrap');
  const mobileCards = document.getElementById('mobileFundCards');
  const fallback = document.getElementById('sec-fundos');
  const isMobile = window.matchMedia('(max-width: 820px)').matches;
  const target = isMobile ? (mobileCards || tableWrap || fallback) : (tableWrap || fallback);
  if(!target) return;

  const stickyOffset = isMobile ? 96 : 20;
  const y = target.getBoundingClientRect().top + window.pageYOffset - stickyOffset;
  window.scrollTo({
    top: Math.max(0, y),
    behavior: options.behavior || (isMobile ? 'smooth' : 'auto')
  });
}

function changeFundPageV168(page){
  const total=perPage===9999?1:Math.max(1,Math.ceil(filtered.length/perPage));
  const nextPage=Math.min(total,Math.max(1,Number(page)||1));
  if(nextPage===currentPage) return;

  const section=document.getElementById('sec-fundos');
  const isMobile=window.matchMedia('(max-width: 820px)').matches;
  const tableWrap=section?.querySelector('.table-wrap');
  const mobileCards=document.getElementById('mobileFundCards');
  const stableBox=isMobile ? (mobileCards || tableWrap) : tableWrap;
  const previousHeight=stableBox?.getBoundingClientRect().height || 0;

  if(section) section.classList.add('pagination-switching-v168');
  if(stableBox && previousHeight>0) stableBox.style.minHeight=`${Math.ceil(previousHeight)}px`;

  currentPage=nextPage;
  expandedRows.clear();
  render();

  requestAnimationFrame(()=>{
    /*
      v169: no desktop a troca de página NÃO altera a posição da viewport.
      O diagnóstico confirmou que o window.scrollTo era animado pelo
      scroll-behavior:smooth global do <html>, produzindo o pulo.
      No mobile, o patch v108 continua responsável pela única rolagem
      até o primeiro card.
    */
    const active=document.querySelector('#pageBtns .page-btn.active');
    if(active){
      try{ active.focus({preventScroll:true}); }catch(_){ /* evita focus() comum, que pode mover a tela */ }
    }

    const release=()=>{
      if(stableBox) stableBox.style.minHeight='';
      if(section) section.classList.remove('pagination-switching-v168');
    };
    if(isMobile) setTimeout(release,220);
    else requestAnimationFrame(release);
  });
}
window.changeFundPageV168=changeFundPageV168;

function renderPagination(){
  const total=perPage===9999?1:Math.ceil(filtered.length/perPage);
  const c=$('pageBtns');
  if(!c) return;
  c.innerHTML='';
  if(total<=1) return;

  c.setAttribute('role','navigation');
  c.setAttribute('aria-label','Paginação dos fundos');

  const mk=(label,page,dis,act,ariaLabel)=>{
    const b=document.createElement('button');
    b.type='button';
    b.className='page-btn'+(act?' active':'');
    b.textContent=label;
    b.disabled=dis;
    b.dataset.page=String(page);
    if(ariaLabel) b.setAttribute('aria-label',ariaLabel);
    if(act) b.setAttribute('aria-current','page');
    if(!dis) b.addEventListener('click',e=>{
      e.preventDefault();
      changeFundPageV168(page);
    });
    return b;
  };

  c.appendChild(mk('‹',currentPage-1,currentPage===1,false,'Página anterior'));
  let from=Math.max(1,currentPage-2),to=Math.min(total,from+4);
  from=Math.max(1,to-4);
  for(let i=from;i<=to;i++) c.appendChild(mk(i,i,false,i===currentPage,`Página ${i}`));
  c.appendChild(mk('›',currentPage+1,currentPage===total||total===0,false,'Próxima página'));
}

function buildHeader(){
  const thead=$('tableHead'),tr=document.createElement('tr');thead.innerHTML='';
  const thExp=document.createElement('th');thExp.style.width='28px';thExp.style.padding='13px 8px';tr.appendChild(thExp);
  const thComp=document.createElement('th');
  thComp.className='th-comp-check';
  thComp.style.width='28px';
  thComp.style.padding='13px 4px';
  thComp.title='Selecionar fundos para comparar';
  tr.appendChild(thComp);
  const visibleHeaders=getVisibleHeaders();
  visibleHeaders.forEach(h=>{
    const th=document.createElement('th');

    if(h==='Resumo Mobile' || h==='Documentos' || h==='Sinais' || h==='Conv / Pag' || h==='Benchmark' || h==='Conversão' || h==='Pagamento'){
      th.innerHTML = h==='Resumo Mobile' ? 'Rentabilidade' : h;
      th.style.cursor='default';
      th.title = h === 'Sinais'
        ? 'Resumo consultivo: liquidez, benchmark e principais exposições'
        : h === 'Conversão'
          ? 'Prazo estimado para conversão do resgate em cotas'
          : h === 'Pagamento'
            ? 'Prazo estimado para pagamento do resgate'
            : h === 'Conv / Pag'
              ? 'Prazo de conversão e pagamento do resgate'
              : h === 'Benchmark'
                ? 'Indicador de referência inferido pelo nome/categoria do fundo'
                : 'Atalhos para documentos oficiais do fundo';
      tr.appendChild(th);
      return;
    }

    th.innerHTML=`${h} <span class="si"></span>`;
    const realIdx=displayHeaders.indexOf(h);
    // Centraliza colunas numéricas
    if(NUM_SET.has(h)) th.classList.add('th-num');
    if(realIdx===sortCol) th.className=(th.classList.contains('th-num')?'th-num ':'')+(sortDir===1?'sa':'sd');
    th.addEventListener('click',()=>{
      activeCdiSort=null;
      updateCdiSortButtons();
      if(sortCol===realIdx) sortDir*=-1; else{sortCol=realIdx;sortDir=-1;}
      thead.querySelectorAll('th').forEach(t=>{
        const wasNum=t.classList.contains('th-num');
        t.className=wasNum?'th-num':'';
      });
      th.className=(th.classList.contains('th-num')?'th-num ':'')+(sortDir===1?'sa':'sd'); applyFilter();
    });
    tr.appendChild(th);
  });
  thead.appendChild(tr);
}

function setActiveChip(container,selector,active){
  container.querySelectorAll(selector).forEach(b=>b.classList.remove('active'));
  active.classList.add('active');
}

function buildCatFilters(cats){
  const row=$('catFilters');
  if(!row){ activeCat=''; return; }
  const label=row.querySelector('.filter-label');
  row.innerHTML=''; row.appendChild(label);
  const all=document.createElement('button');
  all.className='chip active'; all.dataset.cat=''; all.textContent='Todas';
  all.addEventListener('click',()=>{activeCat='';setActiveChip(row,'[data-cat]',all);applyFilter();});
  row.appendChild(all);
  const CAT_CAIXA_ORDER = [
    'RENDA FIXA SIMPLES','RENDA FIXA','RENDA FIXA REFERENCIADO',
    'RENDA FIXA CURTO PRAZO','MULTIMERCADO','CAMBIAL',
    'ACOES','FUNDO DE INDICE','FUNDOS MUTUOS DE PRIVATIZACAO',
  ];
  const _catIdx = c => {
    const cu = c.toUpperCase();
    const i = CAT_CAIXA_ORDER.findIndex(o => cu===o || cu.includes(o) || o.includes(cu));
    return i === -1 ? 99 : i;
  };
  [...cats].sort((a,b)=>_catIdx(a)-_catIdx(b)||a.localeCompare(b)).forEach(cat=>{
    const b=document.createElement('button'); b.className='chip'; b.dataset.cat=cat; b.textContent=cat;
    b.addEventListener('click',()=>{activeCat=cat;setActiveChip(row,'[data-cat]',b);applyFilter();});
    row.appendChild(b);
  });
}

function buildBenchmarkFilters(rows){
  const row=$('benchmarkFilters');
  if(!row){ activeBenchmark=''; return; }
  const label=row.querySelector('.filter-label');
  row.innerHTML=''; row.appendChild(label);
  const all=document.createElement('button');
  all.className='chip active'; all.dataset.benchmark=''; all.textContent='Todos';
  all.addEventListener('click',()=>{activeBenchmark='';setActiveChip(row,'[data-benchmark]',all);applyFilter();});
  row.appendChild(all);

  const seen=new Map();
  rows.forEach(r=>{
    const b=detectarBenchmarkFundo(r);
    if(!seen.has(b.label)) seen.set(b.label,b);
  });
  [...seen.values()].sort((a,b)=>a.label.localeCompare(b.label,'pt-BR')).forEach(item=>{
    const btn=document.createElement('button');
    btn.className='chip';
    btn.dataset.benchmark=item.label;
    btn.textContent=`${item.icon} ${item.label}`;
    btn.addEventListener('click',()=>{activeBenchmark=item.label;setActiveChip(row,'[data-benchmark]',btn);applyFilter();});
    row.appendChild(btn);
  });
}

/* Listeners */
$('perfilFilters')?.addEventListener('click',e=>{
  const btn=e.target.closest('[data-perfil]'); if(!btn) return;
  activePerfil=btn.dataset.perfil; setActiveChip($('perfilFilters'),'[data-perfil]',btn); applyFilter();
});
$('riscoFilters')?.addEventListener('click',e=>{
  const btn=e.target.closest('[data-risco]'); if(!btn) return;
  activeRisco=btn.dataset.risco; setActiveChip($('riscoFilters'),'[data-risco]',btn); applyFilter();
});
let _st=null;
function irParaTabelaDeFundosMobile(){
  const target=document.getElementById('mobileSortToolbar') || document.querySelector('.table-wrap') || document.getElementById('sec-fundos');
  if(!target) return;
  const offset=(window.matchMedia&&window.matchMedia('(max-width:820px)').matches)?120:70;
  const top=target.getBoundingClientRect().top+window.scrollY-offset;
  window.scrollTo({top:Math.max(0,top),behavior:'smooth'});
}
function ativarTabelaAoBuscar(){
  if(!(window.matchMedia&&window.matchMedia('(max-width:820px)').matches)) return;
  try{localStorage.setItem('fundMobileView','table');}catch(e){}
  document.body.classList.remove('fund-card-mode');
  document.querySelectorAll('.mobile-view-btn').forEach(b=>b.classList.toggle('active',b.dataset.view==='table'));
}
$('searchInput')?.addEventListener('input',e=>{
  clearTimeout(_st);
  _st=setTimeout(()=>{
    activeSearch=e.target.value;
    const temBusca=String(activeSearch||'').trim().length>=2;
    if(temBusca) ativarTabelaAoBuscar();
    applyFilter();
    // v49: busca local do catálogo não deve rolar a página.
    // Mantém o cabeçalho/filtros na mesma posição enquanto o usuário digita.
  },280);
});
$('perPage')?.addEventListener('change',e=>{ perPage=parseInt(e.target.value); currentPage=1; render(); updateFundResultSummary(); });
$('toggleSemDados')?.addEventListener('change',e=>{ hideSemDados=e.target.checked; applyFilter(); });

async function carregarDados(){
  try{
    const raw=await fetch(BASE_URL+'dados_atuais.csv?v='+Date.now()).then(r=>r.text());
    const result=parseCsv(raw);
    allRows=result.data.map(mesclarMetadadosFundo);
    const headers=Object.keys(allRows[0]||{});
    displayHeaders=headers;
    const di=displayHeaders.indexOf(DEFAULT_SORT);
    if(di>=0){sortCol=di;sortDir=-1;}
    const cats=new Set(allRows.map(r=>r['Categoria']||'').filter(Boolean));
    buildHeader(); buildCatFilters(cats); buildBenchmarkFilters(allRows); updateKPIs(); applyFilter();
    $('loadMsg').style.display='none';
    $('mainTable').style.display='table';
    renderRankings();
  }catch(err){
    $('loadMsg').innerHTML=`<div style="color:var(--red)">Erro ao carregar dados_atuais.csv<br><small>${err.message}</small></div>`;
  }
}

/* ════════════════════════════════════════════════════
   GRÁFICOS — IPCA / SELIC / META
════════════════════════════════════════════════════ */
let _chartIpca=null,_chartSelic=null,_chartMeta=null;
let _dadosMercado=null;

const CHART_DEFAULTS={
  responsive:true,maintainAspectRatio:false,
  plugins:{
    legend:{display:false},
    tooltip:{
      backgroundColor:'rgba(11,13,26,.95)',borderColor:'rgba(200,151,58,.3)',borderWidth:1,
      titleColor:'#e8bb6a',bodyColor:'#d8dcea',padding:10,
      titleFont:{family:'Cormorant Garamond',size:14,weight:'700'},
      bodyFont:{family:'JetBrains Mono',size:11},
    }
  },
  scales:{
    x:{grid:{color:'rgba(255,255,255,.04)',drawBorder:false},ticks:{color:'#3d4560',font:{family:'JetBrains Mono',size:9},maxTicksLimit:8}},
    y:{grid:{color:'rgba(255,255,255,.04)',drawBorder:false},ticks:{color:'#5e6b8a',font:{family:'JetBrains Mono',size:10},callback:v=>v.toFixed(2)+'%'}}
  }
};

function normalizarHistoricoIPCA(historico){
  return (historico || [])
    .map((d, idx) => {
      const dataRaw = d.Data || d.data || d.data_ref || d.DataReferencia || d.mes_ref || d.label || '';
      let dt = null;

      if(dataRaw){
        if(typeof dataRaw === 'string' && dataRaw.includes('/')){
          const p = dataRaw.split('/');
          if(p.length === 3) dt = new Date(`${p[2]}-${p[1]}-${p[0]}T00:00:00`);
          else if(p.length === 2) dt = new Date(`${p[1]}-${p[0]}-01T00:00:00`);
        }else{
          dt = new Date(dataRaw);
        }
      }

      const valorRaw = d.valor ?? d.Valor ?? d.value ?? d.ipca ?? d.IPCA ?? d.variacao ?? d.Variacao ?? null;
      const valor = parseFloat(String(valorRaw).replace(',','.'));
      const label = d.label || (dt && !isNaN(dt.getTime()) ? `${String(dt.getMonth()+1).padStart(2,'0')}/${dt.getFullYear()}` : `p${idx+1}`);

      return {
        ...d,
        label,
        valor,
        _dt: dt,
        _ts: dt && !isNaN(dt.getTime()) ? dt.getTime() : idx,
      };
    })
    .filter(d => Number.isFinite(d.valor))
    .sort((a,b) => a._ts - b._ts);
}

async function carregarIPCAHistoricoAmpliado(historicoAtual){
  const atual = normalizarHistoricoIPCA(historicoAtual);
  if(atual.length >= 120) return atual;

  const extrairArray = obj => {
    if(Array.isArray(obj)) return obj;
    if(Array.isArray(obj?.conteudo)) return obj.conteudo;
    if(Array.isArray(obj?.historico)) return obj.historico;
    if(Array.isArray(obj?.dados)) return obj.dados;
    if(Array.isArray(obj?.value)) return obj.value;
    if(Array.isArray(obj?.serie)) return obj.serie;
    if(Array.isArray(obj?.records)) return obj.records;
    if(Array.isArray(obj?.ipca)) return obj.ipca;
    if(Array.isArray(obj?.historico_ipca)) return obj.historico_ipca;
    return [];
  };

  // 1) Tenta primeiro arquivos locais/estáticos, caso o robô já tenha salvo a série completa no repositório.
  const arquivosLocais = [
    // Nome que está no repositório atual
    'ipca_historico_base.json',

    // Nomes alternativos para manter compatibilidade com versões anteriores
    'ipca_historico.json',
    'historico_ipca.json',
    'serie_ipca_433.json',
    'ipca_serie_433.json',
    'historico ipca bcb.json'
  ];

  for(const nome of arquivosLocais){
    try{
      const js = await carregarJsonLocal(nome);
      const arr = normalizarHistoricoIPCA(extrairArray(js));
      if(arr.length > atual.length){
        console.info(`[IPCA] ${arr.length} registros carregados de ${nome}.`);
        return arr;
      }
    }catch(e){
      console.warn(`[IPCA] Falha ao tentar ${nome}:`, e);
    }
  }

  // 2) Fallback público do BCB/SGS 433: libera os botões 5A e 10A mesmo quando o JSON principal traz só 24M.
  try{
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    const hoje = new Date();
    const iniAno = hoje.getFullYear() - 10;
    const dataInicial = `01/01/${iniAno}`;
    const dataFinal = `${String(hoje.getDate()).padStart(2,'0')}/${String(hoje.getMonth()+1).padStart(2,'0')}/${hoje.getFullYear()}`;
    const url = `https://api.bcb.gov.br/dados/serie/bcdata.sgs.433/dados?formato=json&dataInicial=${encodeURIComponent(dataInicial)}&dataFinal=${encodeURIComponent(dataFinal)}`;
    const r = await fetch(url, { signal: controller.signal });
    clearTimeout(timer);
    if(!r.ok) throw new Error(`HTTP ${r.status}`);
    const arr = normalizarHistoricoIPCA(await r.json());
    if(arr.length > atual.length){
      console.info(`[IPCA] ${arr.length} registros carregados diretamente da série SGS 433 do BCB.`);
      return arr;
    }
  }catch(e){
    console.warn('[IPCA] Não foi possível ampliar o histórico pela série SGS 433:', e);
  }

  return atual;
}

async function carregarSelicHistoricoAmpliado(historicoAtual){
  const extrairArray = obj => {
    if(Array.isArray(obj)) return obj;
    if(Array.isArray(obj?.conteudo)) return obj.conteudo;
    if(Array.isArray(obj?.historico)) return obj.historico;
    if(Array.isArray(obj?.dados)) return obj.dados;
    if(Array.isArray(obj?.value)) return obj.value;
    if(Array.isArray(obj?.serie)) return obj.serie;
    if(Array.isArray(obj?.records)) return obj.records;
    return [];
  };

  const normalizar = arr => (arr || [])
    .map((d, idx) => {
      const dataRaw = d.DataReuniaoCopom || d.data || d.DataInicioVigencia || d.Data || d.data_ref || '';
      let dt = dataRaw ? new Date(dataRaw) : null;

      if((!dt || isNaN(dt.getTime())) && typeof dataRaw === 'string' && dataRaw.includes('/')){
        const p = dataRaw.split('/');
        if(p.length === 3) dt = new Date(`${p[2]}-${p[1]}-${p[0]}T00:00:00`);
        else if(p.length === 2) dt = new Date(`${p[1]}-${p[0]}-01T00:00:00`);
      }

      const valorRaw = d.MetaSelic ?? d.valor ?? d.TaxaSelic ?? d.taxa ?? d.Selic ?? null;
      const valor = parseFloat(String(valorRaw).replace(',','.'));

      return {
        ...d,
        _dtSelic: dt,
        _tsSelic: dt && !isNaN(dt.getTime()) ? dt.getTime() : idx,
        _valorSelic: valor
      };
    })
    .filter(d => Number.isFinite(d._valorSelic) && d._valorSelic >= 0)
    .sort((a,b) => a._tsSelic - b._tsSelic);

  const atual = normalizar(historicoAtual);
  const primeiroAno = atual.length && atual[0]._dtSelic && !isNaN(atual[0]._dtSelic.getTime())
    ? atual[0]._dtSelic.getFullYear()
    : 9999;

  // Se a base já vier realmente histórica, mantém. Se vier curta, força o JSON completo do repositório.
  if(atual.length >= 80 && primeiroAno <= 2000) return atual;

  const arquivosLocais = [
    'historico da selic do BC.json',
    'historico_selic.json',
    'selic_historico.json'
  ];

  for(const nome of arquivosLocais){
    const js = await carregarJsonLocal(nome);
    const arr = normalizar(extrairArray(js));
    if(arr.length > atual.length){
      console.info(`[Selic] ${arr.length} registros carregados de ${nome}.`);
      return arr;
    }
  }

  return atual;
}


function fmtIPCALabelV250(item){
  if(!item) return '—';

  // v252: o gráfico usa o campo label como competência exibida.
  // Algumas bases antigas vêm com data técnica diferente da competência do IPCA,
  // então o resumo deve priorizar o mesmo label usado no eixo/tooltip.
  const label = item.label || item.competencia || item.mes_ref || item.mes || '';
  if(label && String(label).trim() && !String(label).startsWith('p')){
    return String(label).trim();
  }

  if(item._dt instanceof Date && !isNaN(item._dt.getTime())){
    const meses = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
    return `${meses[item._dt.getMonth()]}/${item._dt.getFullYear()}`;
  }
  return '—';
}

function fmtPctIPCAResumoV251(v){
  const n = Number(v);
  if(!Number.isFinite(n)) return '—';
  const sinal = n > 0 ? '+' : '';
  return sinal + n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '%';
}

function atualizarResumoIPCAMensalV250(slice){
  if(!Array.isArray(slice) || !slice.length) return;
  const valoresValidos = slice
    .map(d => ({ item:d, valor:Number(d.valor) }))
    .filter(d => Number.isFinite(d.valor));
  if(!valoresValidos.length) return;

  const ultimoGrafico = valoresValidos[valoresValidos.length - 1];
  const maxObj = valoresValidos.reduce((acc, d) => d.valor > acc.valor ? d : acc, valoresValidos[0]);
  const minObj = valoresValidos.reduce((acc, d) => d.valor < acc.valor ? d : acc, valoresValidos[0]);

  let ultimoValor = ultimoGrafico.valor;
  let ultimoLabel = fmtIPCALabelV250(ultimoGrafico.item);

  // v252: o "Último IPCA" do resumo deve bater com o card oficial do painel,
  // que já traz a competência consolidada mais recente.
  try{
    const ipcaCard = _dadosMercado?.cards?.ipca || {};
    const valorCard = Number(ipcaCard.ultimo_mes);
    if(Number.isFinite(valorCard)){
      ultimoValor = valorCard;
      ultimoLabel = ipcaCard.label_mes || ultimoLabel;
    }
  }catch(e){}

  const set = (id, txt) => {
    const el = document.getElementById(id);
    if(el) el.textContent = txt;
  };

  set('ipcaResumoUltimoV250', fmtPctIPCAResumoV251(ultimoValor));
  set('ipcaResumoUltimoDataV250', ultimoLabel || '—');
  set('ipcaResumoMaxV250', fmtPctIPCAResumoV251(maxObj.valor));
  set('ipcaResumoMaxDataV250', fmtIPCALabelV250(maxObj.item));
  set('ipcaResumoMinV250', fmtPctIPCAResumoV251(minObj.valor));
  const ipcaMinElV402 = document.getElementById('ipcaResumoMinV250');
  if(ipcaMinElV402){
    const nMinV402 = Number(minObj.valor);
    ipcaMinElV402.classList.toggle('valor-negativo-v402', Number.isFinite(nMinV402) && nMinV402 < 0);
    ipcaMinElV402.classList.toggle('valor-positivo-v402', Number.isFinite(nMinV402) && nMinV402 > 0);
  }
  set('ipcaResumoMinDataV250', fmtIPCALabelV250(minObj.item));
}

function ipcaChartOptionsV250(range){
  const isMobile = window.matchMedia && window.matchMedia('(max-width:700px)').matches;
  const r = Number(range) || 24;
  const maxTicks = r >= 120 ? (isMobile ? 5 : 9) : r >= 60 ? (isMobile ? 6 : 10) : (isMobile ? 6 : 12);
  const base = typeof chartDefaults === 'function' ? chartDefaults() : CHART_DEFAULTS;
  return {
    ...base,
    plugins:{
      ...base.plugins,
      tooltip:{
        ...base.plugins?.tooltip,
        callbacks:{
          label:ctx=>'IPCA: ' + fmtPctIPCAResumoV251(ctx.parsed.y)
        }
      }
    },
    scales:{
      ...base.scales,
      x:{
        ...base.scales?.x,
        ticks:{
          ...base.scales?.x?.ticks,
          autoSkip:true,
          maxTicksLimit:maxTicks,
          maxRotation:isMobile ? 0 : 38,
          minRotation:0,
          font:{ size:isMobile ? 9 : 10 }
        },
        grid:{
          ...base.scales?.x?.grid,
          drawBorder:false
        }
      },
      y:{
        ...base.scales?.y,
        ticks:{
          ...base.scales?.y?.ticks,
          maxTicksLimit:isMobile ? 6 : 7,
          font:{ size:isMobile ? 9 : 10 }
        }
      }
    }
  };
}


function buildChartIpca(historico,meses){
  const range = Number(meses) || 24;
  const base = normalizarHistoricoIPCA(historico);
  const slice = base.slice(-range);
  const labels = slice.map(d=>d.label);
  const values = slice.map(d=>d.valor);
  const colors = values.map(v=>v>=0?'rgba(46,209,122,.72)':'rgba(240,85,101,.78)');
  const barPct = range >= 120 ? .62 : range >= 60 ? .70 : .82;
  const catPct = range >= 120 ? .74 : range >= 60 ? .82 : .90;

  atualizarResumoIPCAMensalV250(slice);

  if(_chartIpca) _chartIpca.destroy();
  const ctx=document.getElementById('chartIpca')?.getContext('2d'); if(!ctx) return;
  const emptyMsg = ctx.canvas?.parentElement?.querySelector('.chart-empty-msg');
  if(emptyMsg) emptyMsg.remove();

  _chartIpca=new Chart(ctx,{
    type:'bar',
    data:{
      labels,
      datasets:[{
        data:values,
        backgroundColor:colors,
        borderColor:colors.map(c=>c.replace('.72)','.12)').replace('.78)','.12)')),
        borderWidth:1,
        borderRadius:range >= 120 ? 1 : 2,
        barPercentage:barPct,
        categoryPercentage:catPct,
        maxBarThickness:range >= 120 ? 8 : range >= 60 ? 12 : 22
      }]
    },
    options:ipcaChartOptionsV250(range)
  });
}


function selicAxisConfigV253(slice, rangeMeses){
  const meses = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
  const r = Number(rangeMeses) || 999;
  const isMobile = window.matchMedia && window.matchMedia('(max-width:700px)').matches;

  function dtFromIndex(index){
    const item = slice?.[Number(index)];
    return item?._dt instanceof Date && !isNaN(item._dt.getTime()) ? item._dt : null;
  }

  function curto(dt){
    return `${meses[dt.getMonth()]}/${String(dt.getFullYear()).slice(-2)}`;
  }

  const callback = function(value, index){
    const dt = dtFromIndex(value) || dtFromIndex(index);
    if(!dt) return '';

    if(r <= 24){
      // Curto prazo: rótulos por mês selecionado, sem inclinar demais.
      const step = r <= 12 ? 2 : 4;
      if(index === 0 || index === slice.length - 1 || index % step === 0) return curto(dt);
      return '';
    }

    if(r <= 60){
      // 5 anos: mostra apenas anos de forma limpa.
      const prev = slice[index - 1]?._dt;
      if(index === 0 || index === slice.length - 1 || !prev || prev.getFullYear() !== dt.getFullYear()){
        return String(dt.getFullYear());
      }
      return '';
    }

    if(r <= 120){
      // 10 anos: mostra anos alternados, preservando início e fim.
      const prev = slice[index - 1]?._dt;
      const virouAno = !prev || prev.getFullYear() !== dt.getFullYear();
      if(index === 0 || index === slice.length - 1) return String(dt.getFullYear());
      if(virouAno && dt.getFullYear() % 2 === 0) return String(dt.getFullYear());
      return '';
    }

    // Histórico: mostra poucos marcos temporais.
    const prev = slice[index - 1]?._dt;
    const virouAno = !prev || prev.getFullYear() !== dt.getFullYear();
    if(index === 0 || index === slice.length - 1) return String(dt.getFullYear());
    if(virouAno && dt.getFullYear() % 5 === 0) return String(dt.getFullYear());
    return '';
  };

  return {
    callback,
    autoSkip:false,
    maxRotation:0,
    minRotation:0,
    maxTicksLimit:r <= 24 ? (isMobile ? 6 : 8) : r <= 60 ? 7 : r <= 120 ? 7 : 8,
    font:{size:isMobile ? 9 : 10}
  };
}


function buildChartSelic(historico,qtd){
  // Aceita os dois formatos:
  // 1) mercado_atual.json: [{data, valor}]
  // 2) "historico da selic do BC.json": [{DataReuniaoCopom, MetaSelic, ...}]
  const filtrado=(historico||[])
    .map(d=>{
      const dataRaw = d.DataReuniaoCopom || d.data || d.DataInicioVigencia || '';
      let dt = dataRaw ? new Date(dataRaw) : null;

      // fallback para data em formato dd/mm/aaaa
      if((!dt || isNaN(dt.getTime())) && typeof dataRaw === 'string' && dataRaw.includes('/')){
        const p = dataRaw.split('/');
        if(p.length === 3) dt = new Date(`${p[2]}-${p[1]}-${p[0]}T00:00:00`);
      }

      const valorRaw = d.MetaSelic ?? d.valor ?? d.TaxaSelic ?? d.taxa ?? null;
      const valor = parseFloat(String(valorRaw).replace(',','.'));

      return {
        ...d,
        _dt: dt,
        _ts: dt && !isNaN(dt.getTime()) ? dt.getTime() : 0,
        _ano: dt && !isNaN(dt.getTime()) ? dt.getFullYear() : 0,
        _valor: valor
      };
    })
    .filter(d=>d._ano>=1999 && !isNaN(d._valor) && d._valor>=0 && d._ts>0);

  filtrado.sort((a,b)=>a._ts-b._ts);

  // v249: também reconcilia o módulo antigo do gráfico com a taxa vigente oficial.
  // Assim o desenho inicial e os cliques antigos usam o mesmo valor do painel.
  try{
    const card = _dadosMercado?.cards?.selic_meta || {};
    const valorVigente = Number(card.valor);
    if(Number.isFinite(valorVigente)){
      const ref = typeof resolverDataUltimaAlteracaoSelic === 'function'
        ? resolverDataUltimaAlteracaoSelic(_dadosMercado)
        : null;
      const dataRef = ref?.data || card.ultima_alteracao || card.data_ultima_alteracao || card.vigente_desde || card.data_ref || '';
      let dtVigente = null;
      if(dataRef && typeof dataRef === 'string' && dataRef.includes('/')){
        const p = dataRef.split('/');
        if(p.length === 3) dtVigente = new Date(`${p[2]}-${p[1]}-${p[0]}T00:00:00`);
      }else if(dataRef){
        dtVigente = new Date(dataRef);
      }
      if(!dtVigente || isNaN(dtVigente.getTime())){
        const hoje = new Date();
        dtVigente = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
      }
      const tsVigente = dtVigente.getTime();
      const mesmoDia = d => d?._dt
        && d._dt.getFullYear() === dtVigente.getFullYear()
        && d._dt.getMonth() === dtVigente.getMonth()
        && d._dt.getDate() === dtVigente.getDate();

      const ultimo = filtrado[filtrado.length - 1];
      if(!(ultimo && ultimo._ts >= tsVigente && Math.abs(Number(ultimo._valor) - valorVigente) < .005)){
        const idxMesmoDia = filtrado.findIndex(mesmoDia);
        const ponto = {
          data: dataRef,
          valor: valorVigente,
          _dt: dtVigente,
          _ts: tsVigente,
          _ano: dtVigente.getFullYear(),
          _valor: valorVigente,
          _vigenteSyncV249: true
        };
        if(idxMesmoDia >= 0) filtrado[idxMesmoDia] = {...filtrado[idxMesmoDia], ...ponto};
        else filtrado.push(ponto);
        filtrado.sort((a,b)=>a._ts-b._ts);
      }
    }
  }catch(e){
    console.warn('[Selic v249] Falha ao reconciliar buildChartSelic:', e);
  }

  // Nos botões da Selic, data-range representa meses de janela: 12 = 1A, 24 = 2A, 60 = 5A, 120 = 10A, 999 = histórico completo.
  let slice = filtrado;
  if(qtd < 999 && filtrado.length){
    const ultimo = filtrado[filtrado.length - 1]._dt;
    const limite = new Date(ultimo);
    limite.setMonth(limite.getMonth() - qtd);
    slice = filtrado.filter(d => d._dt >= limite);
    if(slice.length < 2) slice = filtrado.slice(-Math.max(2, Math.min(filtrado.length, qtd)));
  }

  const mesesSelicLabelV253 = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
  const labels=slice.map(d=>`${mesesSelicLabelV253[d._dt.getMonth()]}/${d._dt.getFullYear()}`);
  const values=slice.map(d=>d._valor);
  const xTicksSelicV253 = selicAxisConfigV253(slice, qtd);


  if(_chartSelic) _chartSelic.destroy();
  const ctx=document.getElementById('chartSelic')?.getContext('2d'); if(!ctx || !values.length) return;

  const fmtSelic = v => `${Number(v).toFixed(2).replace('.',',')}% a.a.`;
  const fmtDataSelic = dt => {
    if(!dt || isNaN(dt.getTime())) return '';
    return `${String(dt.getDate()).padStart(2,'0')}/${String(dt.getMonth()+1).padStart(2,'0')}/${dt.getFullYear()}`;
  };
  const setTxt = (id, value) => { const el = document.getElementById(id); if(el) el.textContent = value; };

  const maxVal = Math.max(...values);
  const minVal = Math.min(...values);
  const maxIndex = values.indexOf(maxVal);
  const minIndex = values.indexOf(minVal);
  const currentIndex = values.length - 1;

  const maxRow = slice[maxIndex];
  const minRow = slice[minIndex];
  const currentRow = slice[currentIndex];

  setTxt('selicMaxResumo', fmtSelic(maxVal));
  setTxt('selicMaxData', fmtDataSelic(maxRow?._dt));
  setTxt('selicMinResumo', fmtSelic(minVal));
  setTxt('selicMinData', fmtDataSelic(minRow?._dt));
  let vigenteResumoValor = values[currentIndex];
  let vigenteResumoData = fmtDataSelic(currentRow?._dt) || 'último dado';
  try{
    const card = _dadosMercado?.cards?.selic_meta || {};
    const valorCard = Number(card.valor);
    if(Number.isFinite(valorCard)){
      vigenteResumoValor = valorCard;
      const ref = typeof resolverDataUltimaAlteracaoSelic === 'function'
        ? resolverDataUltimaAlteracaoSelic(_dadosMercado)
        : null;
      vigenteResumoData = ref?.data || card.ultima_alteracao || card.data_ultima_alteracao || card.vigente_desde || card.data_ref || vigenteResumoData;
      if(vigenteResumoData && !String(vigenteResumoData).toLowerCase().startsWith('desde')) vigenteResumoData = 'desde ' + vigenteResumoData;
    }
  }catch(e){}
  setTxt('selicHojeResumo', fmtSelic(vigenteResumoValor));
  setTxt('selicHojeData', vigenteResumoData);

  const markerMap = new Map();
  function addMarker(index, label, color, mode){
    if(index < 0 || index >= values.length) return;
    const old = markerMap.get(index);
    if(old){
      old.label = `${old.label} · ${label}`;
      if(mode === 'current') old.mode = 'current';
      return;
    }
    markerMap.set(index, { index, label, color, mode });
  }

  addMarker(maxIndex, `Máxima ${fmtSelic(maxVal)}`, '#e8bb6a', 'max');
  addMarker(minIndex, `Mínima ${fmtSelic(minVal)}`, '#5b9cf6', 'min');
  addMarker(currentIndex, `Hoje ${fmtSelic(values[currentIndex])}`, '#2ed17a', 'current');

  const selicMarkersPlugin = {
    id:'selicMarkers',
    afterDatasetsDraw(chart, args, opts){
      const markers = opts?.markers || [];
      if(!markers.length) return;
      const {ctx} = chart;
      const meta = chart.getDatasetMeta(0);
      if(!meta || !meta.data) return;

      ctx.save();
      markers.forEach((m) => {
        const point = meta.data[m.index];
        if(!point) return;
        const pos = point.getProps(['x','y'], true);
        const x = pos.x;
        const y = pos.y;

        ctx.beginPath();
        ctx.fillStyle = m.color;
        ctx.strokeStyle = 'rgba(7,8,15,.92)';
        ctx.lineWidth = 2;
        ctx.arc(x, y, m.mode === 'current' ? 6.5 : 5.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = m.color;
        ctx.globalAlpha = .42;
        ctx.lineWidth = 1;
        ctx.arc(x, y, m.mode === 'current' ? 11 : 9, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
      });
      ctx.restore();
    }
  };

  _chartSelic=new Chart(ctx,{type:'line',data:{labels,datasets:[{data:values,borderColor:'#c8973a',backgroundColor:'rgba(200,151,58,.08)',borderWidth:2,pointBackgroundColor:'#e8bb6a',pointRadius:2.6,pointHoverRadius:5,fill:true,stepped:'before',tension:0}]},
    options:{
      ...CHART_DEFAULTS,
      layout:{padding:{top:12,right:14,left:8,bottom:8}},
      plugins:{
        ...CHART_DEFAULTS.plugins,
        selicMarkers:{markers:[...markerMap.values()]},
        tooltip:{...CHART_DEFAULTS.plugins.tooltip,callbacks:{label:ctx=>`Selic: ${ctx.parsed.y.toFixed(2).replace('.',',')}% a.a.`}}
      },
      scales:{
        ...CHART_DEFAULTS.scales,
        x:{
          ...CHART_DEFAULTS.scales.x,
          ticks:{
            ...CHART_DEFAULTS.scales.x.ticks,
            ...xTicksSelicV253
          }
        },
        y:{
          ...CHART_DEFAULTS.scales.y,
          suggestedMin:0,
          suggestedMax:maxVal * 1.10,
          ticks:{...CHART_DEFAULTS.scales.y.ticks,callback:v=>Number(v).toFixed(2)+'%'}
        }
      }
    },
    plugins:[selicMarkersPlugin]
  });
}



/* v185 — mantém o gráfico IPCA 12M × meta sincronizado com o card mais recente */
function sincronizarSerieMetaComIpcaAtual(metaDados, ipca){
  const lista = Array.isArray(metaDados) ? metaDados : [];
  const valorAtual = Number(ipca?.acum_12m);
  const labelAtual = String(ipca?.label_mes || '').trim().toLowerCase();

  if(!Number.isFinite(valorAtual) || !labelAtual) return lista;

  const meses = {
    jan:1, fev:2, mar:3, abr:4, mai:5, jun:6,
    jul:7, ago:8, set:9, out:10, nov:11, dez:12
  };
  const partes = labelAtual.match(/^([a-zç]{3})\/(\d{4})$/i);
  if(!partes) return lista;

  const mes = meses[partes[1].toLowerCase()];
  const ano = Number(partes[2]);
  if(!mes || !Number.isInteger(ano)) return lista;

  const chaveAtual = `${ano}-${String(mes).padStart(2,'0')}`;
  const porMes = new Map();

  lista.forEach(item=>{
    const data = String(item?.DataReferencia || '');
    const chave = data.slice(0,7);
    const valor = Number(item?.Inflacao12Meses);
    if(/^\d{4}-\d{2}$/.test(chave) && Number.isFinite(valor)){
      porMes.set(chave, {...item, Inflacao12Meses: valor});
    }
  });

  const anterior = porMes.get(chaveAtual) || {};
  porMes.set(chaveAtual, {
    ...anterior,
    DataReferencia: `${chaveAtual}-01T03:00:00Z`,
    Inflacao12Meses: Number(valorAtual.toFixed(4)),
    CartaAberta: anterior.CartaAberta || 'Não'
  });

  return [...porMes.values()].sort(
    (a,b)=>new Date(b.DataReferencia)-new Date(a.DataReferencia)
  );
}

function buildChartMeta(metaDados){
  if(!metaDados||!metaDados.length) return;
  const sorted=[...metaDados].filter(d=>d?.DataReferencia && d?.Inflacao12Meses != null && Number.isFinite(Number(d.Inflacao12Meses))).sort((a,b)=>new Date(a.DataReferencia)-new Date(b.DataReferencia));
  const labels=sorted.map(d=>{const dt=new Date(d.DataReferencia);return `${String(dt.getMonth()+1).padStart(2,'0')}/${dt.getFullYear()}`;});
  const values=sorted.map(d=>parseFloat(d.Inflacao12Meses));
  const META=3.0,SUP=4.5,INF=1.5;
  const ptColors=values.map(v=>(v>SUP||v<INF)?'#f05565':'#2ed17a');
  if(_chartMeta) _chartMeta.destroy();
  const ctx=document.getElementById('chartMeta')?.getContext('2d'); if(!ctx) return;
  _chartMeta=new Chart(ctx,{type:'line',data:{labels,datasets:[
    {label:'Banda (1,5%–4,5%)',data:values.map(()=>SUP),borderColor:'rgba(46,209,122,.25)',backgroundColor:'rgba(46,209,122,.07)',borderWidth:1,borderDash:[4,4],pointRadius:0,fill:'+1',order:3},
    {label:null,data:values.map(()=>INF),borderColor:'rgba(46,209,122,.25)',backgroundColor:'transparent',borderWidth:1,borderDash:[4,4],pointRadius:0,fill:false,order:3},
    {label:'Meta (3%)',data:values.map(()=>META),borderColor:'rgba(200,151,58,.75)',borderWidth:1.5,borderDash:[6,3],pointRadius:0,fill:false,order:2},
    {label:'IPCA 12M',data:values,borderColor:'#5b9cf6',borderWidth:2.5,pointBackgroundColor:ptColors,pointBorderColor:ptColors,pointRadius:4,pointHoverRadius:6,fill:false,tension:0.3,order:1,segment:{borderColor:ctx=>{const v=values[ctx.p1DataIndex];return(v>SUP||v<INF)?'#f05565':'#5b9cf6';}}}
  ]},
  options:{...CHART_DEFAULTS,plugins:{...CHART_DEFAULTS.plugins,legend:{display:true,position:'bottom',labels:{color:'#5e6b8a',font:{family:'JetBrains Mono',size:9},boxWidth:12,padding:8,filter:item=>item.text!==null}},
    tooltip:{...CHART_DEFAULTS.plugins.tooltip,callbacks:{label:ctx=>ctx.dataset.label?`${ctx.dataset.label}: ${ctx.parsed.y.toFixed(2).replace('.',',')}%`:null,
      afterBody:items=>{const v=items.find(i=>i.dataset.label==='IPCA 12M')?.parsed?.y;if(v===undefined) return[];if(v>SUP) return[`⚠️ Acima do teto (${SUP}%)`];if(v<INF) return[`⚠️ Abaixo do piso (${INF}%)`];return['✅ Dentro da faixa de tolerância'];}}}}}}
  );
}


function marcarGraficoSemDados(canvasId, mensagem){
  const canvas = document.getElementById(canvasId);
  if(!canvas) return;
  const body = canvas.parentElement;
  if(!body) return;
  if(body.querySelector('.chart-empty-msg')) return;
  const msg = document.createElement('div');
  msg.className = 'chart-empty-msg';
  msg.style.cssText = 'position:absolute;inset:0;display:flex;align-items:center;justify-content:center;text-align:center;padding:18px;color:var(--muted);font-size:.72rem;font-family:JetBrains Mono,monospace;line-height:1.5;background:transparent;pointer-events:none';
  msg.textContent = mensagem;
  body.appendChild(msg);
}

async function carregarJsonLocal(nomeArquivo){
  // Busca JSON local do GitHub Pages e, se necessário, cai para o raw.githubusercontent.com.
  // Isso reduz cache/404 intermitente e também funciona quando o arquivo tem espaços no nome.
  const arquivo = encodeURI(nomeArquivo);
  const versao = '?v=' + Date.now();
  const candidatos = [];

  if(BASE_URL){
    candidatos.push(BASE_URL + arquivo + versao);
  }else{
    candidatos.push(arquivo + versao);
    candidatos.push('https://raw.githubusercontent.com/eltonprivatebanker/catalogo-fundos-caixa/main/' + arquivo + versao);
  }

  let ultimoErro = null;
  for(const url of candidatos){
    try{
      const r = await fetch(url, { cache:'no-store' });
      if(!r.ok) throw new Error(`HTTP ${r.status}`);
      return await r.json();
    }catch(e){
      ultimoErro = e;
      console.warn(`[JSON LOCAL] Não consegui carregar ${nomeArquivo} em ${url}:`, e);
    }
  }

  console.warn(`[JSON LOCAL] Falha final ao carregar ${nomeArquivo}:`, ultimoErro);
  return null;
}

function atualizarResumoEvolucao(d){
  const ipca = d?.cards?.ipca || {};
  const selic = d?.cards?.selic_meta || {};

  const setText = (id, value) => { const el = document.getElementById(id); if(el) el.textContent = value; };
  const pct = v => formatPctCard(v);
  const pp = v => `${Number(v).toFixed(2).replace('.',',')} p.p.`;
  const metaStatus = (v) => {
    const n = Number(v);
    if(!Number.isFinite(n)) return 'Meta central: 3,00% · faixa: 1,50% a 4,50%';
    if(n > 4.5) return `${pp(n - 4.5)} acima do teto de 4,50%`;
    if(n < 1.5) return `${pp(1.5 - n)} abaixo do piso de 1,50%`;
    return 'dentro da faixa de 1,50% a 4,50%';
  };

  const selicRef = resolverDataUltimaAlteracaoSelic(d).data || '';
  const selicValor = selic.valor != null ? `${Number(selic.valor).toFixed(2).replace('.',',')}% a.a.` : '—';

  setText('evoIpcaMensalVal', pct(ipca.ultimo_mes));
  setText('evoIpcaMensalSub', ipca.label_mes ? `${ipca.label_mes} · dado oficial` : 'dado oficial');
  setText('evoSelicAtualVal', selicValor);
  setText('evoSelicAtualSub', selicRef ? `Vigente desde ${selicRef} · definida pelo Copom` : 'Meta definida pelo Copom');
  setText('evoIpca12Val', pct(ipca.acum_12m));
  setText('evoIpca12Sub', metaStatus(ipca.acum_12m));

  setText('evoCardIpcaNote', ipca.ultimo_mes != null
    ? `Último resultado · ${ipca.label_mes || 'período recente'} · ${pct(ipca.ultimo_mes)}`
    : 'Último resultado: aguardando atualização.');
  setText('evoCardSelicNote', selic.valor != null
    ? `Taxa vigente · ${selicValor}${selicRef ? ` · desde ${selicRef}` : ''}`
    : 'Taxa vigente: aguardando atualização.');
  setText('evoCardMetaNote', ipca.acum_12m != null
    ? `IPCA em 12 meses · ${pct(ipca.acum_12m)} · ${metaStatus(ipca.acum_12m)}`
    : 'Meta central: 3,00% · faixa: 1,50% a 4,50%.');

  const ativo = document.querySelector('.evo-view-tab.active')?.dataset.evoChart || 'ipca';
  atualizarResumoMovelEvolucao(ativo, d);
}

function atualizarResumoMovelEvolucao(chave, d){
  const box = document.getElementById('evoMobileSummary');
  if(!box) return;

  const target = chave || document.querySelector('.evo-view-tab.active')?.dataset.evoChart || 'ipca';
  const ipca = d?.cards?.ipca || {};
  const selic = d?.cards?.selic_meta || {};
  const pct = v => formatPctCard(v);
  const pp = v => `${Number(v).toFixed(2).replace('.',',')} p.p.`;

  const metaStatus = (v) => {
    const n = Number(v);
    if(!Number.isFinite(n)) return 'Meta central: 3,00% · faixa: 1,50% a 4,50%';
    if(n > 4.5) return `${pp(n - 4.5)} acima do teto de 4,50%`;
    if(n < 1.5) return `${pp(1.5 - n)} abaixo do piso de 1,50%`;
    return 'Dentro da faixa de tolerância de 1,50% a 4,50%';
  };

  const selicRef = resolverDataUltimaAlteracaoSelic(d).data || '';
  const selicValor = selic.valor != null
    ? `${Number(selic.valor).toFixed(2).replace('.',',')}% a.a.`
    : '—';

  let kicker = 'IPCA do último mês';
  let value = pct(ipca.ultimo_mes);
  let description = ipca.label_mes ? `${ipca.label_mes} · dado oficial` : 'dado oficial';

  if(target === 'selic'){
    kicker = 'Selic meta vigente';
    value = selicValor;
    description = selicRef ? `Vigente desde ${selicRef} · definida pelo Copom` : 'Meta definida pelo Copom';
  } else if(target === 'meta'){
    kicker = 'IPCA em 12 meses';
    value = pct(ipca.acum_12m);
    description = metaStatus(ipca.acum_12m);
  }

  box.dataset.evoType = target;
  const kickerEl = document.getElementById('evoMobileKicker');
  const valueEl = document.getElementById('evoMobileValue');
  const descriptionEl = document.getElementById('evoMobileDescription');
  if(kickerEl) kickerEl.textContent = kicker;
  if(valueEl) valueEl.textContent = value;
  if(descriptionEl) descriptionEl.textContent = description;
}

function selecionarGraficoEvolucao(chave){
  const target = chave || 'ipca';
  document.querySelectorAll('.evo-view-tab').forEach(btn=>{
    const ativo = btn.dataset.evoChart === target;
    btn.classList.toggle('active', ativo);
    btn.setAttribute('aria-pressed', ativo ? 'true' : 'false');
  });
  document.querySelectorAll('.evo-chart-card').forEach(card=>{
    card.classList.toggle('active', card.dataset.evoPanel === target);
  });
  atualizarResumoMovelEvolucao(target, _dadosMercado);
  setTimeout(()=>{
    [_chartIpca,_chartSelic,_chartMeta].forEach(ch=>{
      if(!ch || typeof ch.resize !== 'function') return;
      const canvas = ch.canvas || ch.ctx?.canvas;
      if(!canvas || !canvas.isConnected || !canvas.ownerDocument) return;
      try{ ch.resize(); }catch(err){ console.warn('[gráficos] resize ignorado:', err?.message || err); }
    });
  }, 80);
}

function bindEvolucaoTabs(){
  document.querySelectorAll('.evo-view-tab').forEach(btn=>{
    if(btn.dataset.bound === '1') return;
    btn.dataset.bound = '1';
    btn.addEventListener('click',()=>selecionarGraficoEvolucao(btn.dataset.evoChart));
  });
}



async function inicializarGraficos(d){
  _dadosMercado = d;
  await renderIndicadoresDashboardV378(d);
  bindIndicadoresDashboardV378();
}

const econDashStateV378 = window.__ECON_DASH_STATE_V378__ || {
  range:{ ipca:12, meta:12, selic:'all' },
  ipcaNorm:[],
  metaNorm:[],
  selicNorm:[],
  mercado:null
};
window.__ECON_DASH_STATE_V378__ = econDashStateV378;

function econPctV378(v, withPlus = true){
  const n = Number(v);
  if(!Number.isFinite(n)) return '—';
  const sign = withPlus && n > 0 ? '+' : '';
  return sign + n.toFixed(2).replace('.', ',') + '%';
}

function econSetTextV378(id, value){
  const el = document.getElementById(id);
  if(el) el.textContent = value;
}

function econNumberV378(v){
  const n = Number(String(v ?? '').replace(',', '.'));
  return Number.isFinite(n) ? n : null;
}

function econParseDateV378(raw){
  if(raw instanceof Date && !isNaN(raw.getTime())) return raw;
  if(!raw) return null;
  let dt = new Date(raw);
  if(dt && !isNaN(dt.getTime())) return dt;
  if(typeof raw === 'string' && raw.includes('/')){
    const p = raw.split('/');
    if(p.length === 3){
      dt = new Date(`${p[2]}-${p[1]}-${p[0]}T00:00:00`);
      if(dt && !isNaN(dt.getTime())) return dt;
    }
  }
  return null;
}

function econLabelMonthV378(date, longYear = false){
  const dt = econParseDateV378(date);
  if(!dt) return '—';
  const months = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
  return `${months[dt.getMonth()]}/${longYear ? dt.getFullYear() : String(dt.getFullYear()).slice(-2)}`;
}

function econLabelFromItemV378(item){
  if(!item) return '—';
  if(item.label) return String(item.label);
  const raw = item.DataReferencia || item.data || item.DataInicioVigencia || item.DataReuniaoCopom || item.Data || '';
  return econLabelMonthV378(raw);
}

function econMetaStatusV378(v){
  const n = Number(v);
  if(!Number.isFinite(n)) return 'Meta central: 3,00% · banda de 1,50% a 4,50%';
  const fmt = x => Number(x).toFixed(2).replace('.', ',') + ' p.p.';
  if(n > 4.5) return `Acima do teto da meta em ${fmt(n - 4.5)}`;
  if(n < 1.5) return `Abaixo do piso da meta em ${fmt(1.5 - n)}`;
  return 'Dentro da banda da meta';
}

function econRangeLabelV378(range, suffix = 'M'){
  if(range === 'all') return 'histórico completo';
  const n = Number(range || 12);
  if(suffix === 'A'){
    if(n === 36) return '3 anos';
    if(n === 12) return '1 ano';
    if(n === 60) return '5 anos';
    if(n === 120) return '10 anos';
  }
  return `${n} meses`;
}

function econUpdateRangeButtonsV378(target, range){
  document.querySelectorAll(`#sec-graficos [data-dash-range-target="${target}"]`).forEach(btn => {
    const active = String(btn.dataset.dashRange) === String(range);
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-pressed', String(active));
  });
}

function bindIndicadoresDashboardV378(){
  document.querySelectorAll('#sec-graficos [data-dash-range-target]').forEach(btn => {
    if(btn.dataset.dashBoundV378 === '1') return;
    btn.dataset.dashBoundV378 = '1';
    btn.addEventListener('click', () => {
      const target = btn.dataset.dashRangeTarget;
      const raw = btn.dataset.dashRange;
      const range = raw === 'all' ? 'all' : Number(raw || 12);
      econDashStateV378.range[target] = range;
      econUpdateRangeButtonsV378(target, raw);
      econRenderTargetV378(target);
    });
  });
}

function econRenderIpcaBarsV378(containerId, rows, range){
  const el = document.getElementById(containerId);
  if(!el) return;

  const take = range === 'all' ? 36 : Number(range || 24);
  const data = (rows || []).slice(-take).map(item => ({
    label:econLabelFromItemV378(item),
    value:Number(item.valor),
    date:item.data || item.DataReferencia || ''
  })).filter(x => Number.isFinite(x.value));

  if(!data.length){
    el.innerHTML = '<div class="econ-empty-v367">Histórico indisponível no momento.</div>';
    return;
  }

  const width = 720, height = 260;
  const left = 48, right = 14, topPad = 22, bottomPad = 36;
  const plotW = width - left - right;
  const plotH = height - topPad - bottomPad;

  const values = data.map(d => d.value);
  const max = Math.max(...values, 1.4);
  const min = Math.min(...values, -0.2);
  const top = Math.ceil(max * 10) / 10;
  const bottom = Math.floor(min * 10) / 10;
  const size = top - bottom || 1;
  const yFor = v => topPad + ((top - v) / size) * plotH;
  const zeroY = yFor(0);

  const ticks = [];
  for(let v = bottom; v <= top + 0.0001; v += 0.2) ticks.push(Number(v.toFixed(1)));

  const grid = ticks.map(v => {
    const y = yFor(v);
    const cls = Math.abs(v) < 0.0001 ? 'zero' : 'grid';
    return `
      <line class="${cls}" x1="${left}" y1="${y.toFixed(1)}" x2="${width - right}" y2="${y.toFixed(1)}"></line>
      <text class="axis y ${Math.abs(v) < 0.0001 ? 'zero-label' : ''}" x="${left - 8}" y="${(y + 3).toFixed(1)}" text-anchor="end">${econPctV378(v, false)}</text>
    `;
  }).join('');

  const gap = data.length > 24 ? 4 : 7;
  const barW = Math.max(7, (plotW - gap * (data.length - 1)) / data.length);

  const bars = data.map((d, i) => {
    const x = left + i * (barW + gap);
    const yValue = yFor(d.value);
    const y = Math.min(yValue, zeroY);
    const h = Math.max(3, Math.abs(yValue - zeroY));
    const cls = d.value >= 0 ? 'bar pos' : 'bar neg';
    return `<rect class="${cls}" x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${barW.toFixed(1)}" height="${h.toFixed(1)}" rx="3"><title>${d.label} · ${econPctV378(d.value)}</title></rect>`;
  }).join('');

  const labelStep = Math.max(1, Math.round(data.length / 6));
  const labels = data.map((d, i) => {
    const show = i === 0 || i === data.length - 1 || i % labelStep === 0;
    if(!show) return '';
    const x = left + i * (barW + gap) + barW/2;
    return `<text class="axis x" x="${x.toFixed(1)}" y="${height - 10}" text-anchor="middle">${d.label}</text>`;
  }).join('');

  el.innerHTML = `
    <svg class="econ-svg-ipca-bars-v378" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" aria-hidden="true">
      <rect class="plot-bg" x="${left}" y="${topPad}" width="${plotW}" height="${plotH}" rx="10"></rect>
      ${grid}
      ${bars}
      ${labels}
    </svg>
  `;

  econSetTextV378('ipcaDashRangeLabelV378', range === 12 ? '12 meses' : range === 24 ? '24 meses' : '36 meses');
}

function econRenderLineSvgV378(containerId, rows, getValue, getDate, opts = {}){
  const el = document.getElementById(containerId);
  if(!el) return;

  const rawLimit = opts.limit ?? 36;
  const limit = rawLimit === 'all' ? 99999 : Number(rawLimit || 36);
  const data = (rows || []).map(item => ({
    item,
    value:Number(getValue(item)),
    date:getDate(item),
    label:econLabelMonthV378(getDate(item))
  })).filter(d => Number.isFinite(d.value)).slice(-limit);

  if(!data.length){
    el.innerHTML = '<div class="econ-empty-v367">Histórico indisponível no momento.</div>';
    return;
  }

  const width = opts.w || 720;
  const height = opts.h || 260;
  const left = opts.left || 48;
  const right = opts.right || 14;
  const topPad = opts.topPad || 24;
  const bottomPad = opts.bottomPad || 34;
  const plotW = width - left - right;
  const plotH = height - topPad - bottomPad;

  const values = data.map(d => d.value);
  let min = Math.min(...values);
  let max = Math.max(...values);
  if(opts.band){
    min = Math.min(min, 1.5);
    max = Math.max(max, 4.5);
  }
  if(Number.isFinite(opts.min)) min = Math.min(min, opts.min);
  if(Number.isFinite(opts.max)) max = Math.max(max, opts.max);

  const pad = Math.max((max - min) * 0.12, opts.pad ?? 0.25);
  const lo = Math.max(0, min - pad);
  const hi = max + pad;
  const size = hi - lo || 1;
  const yFor = v => topPad + ((hi - v) / size) * plotH;
  const xFor = i => left + (data.length === 1 ? plotW : (i / (data.length - 1)) * plotW);

  const points = data.map((d, i) => `${xFor(i).toFixed(1)},${yFor(d.value).toFixed(1)}`).join(' ');
  const area = `${left},${topPad + plotH} ${points} ${left + plotW},${topPad + plotH}`;
  const last = data[data.length - 1];
  const first = data[0];

  const ticks = opts.ticks || (opts.band ? [1.5,3,4.5,5,5.5,6] : []);
  const grid = ticks.map(v => {
    if(v < lo || v > hi) return '';
    const y = yFor(v);
    return `
      <line class="grid ${opts.band && [1.5,3,4.5].includes(v) ? 'threshold' : ''}" x1="${left}" y1="${y.toFixed(1)}" x2="${left+plotW}" y2="${y.toFixed(1)}"></line>
      <text class="axis y" x="${left-8}" y="${(y+3).toFixed(1)}" text-anchor="end">${econPctV378(v, false)}</text>
    `;
  }).join('');

  let band = '';
  if(opts.band){
    const yTop = yFor(4.5), yBottom = yFor(1.5), yMid = yFor(3);
    band = `
      <rect class="band" x="${left}" y="${Math.min(yTop,yBottom).toFixed(1)}" width="${plotW}" height="${Math.abs(yBottom-yTop).toFixed(1)}" rx="10"></rect>
      <line class="threshold top" x1="${left}" y1="${yTop.toFixed(1)}" x2="${left+plotW}" y2="${yTop.toFixed(1)}"></line>
      <line class="threshold mid" x1="${left}" y1="${yMid.toFixed(1)}" x2="${left+plotW}" y2="${yMid.toFixed(1)}"></line>
      <line class="threshold bottom" x1="${left}" y1="${yBottom.toFixed(1)}" x2="${left+plotW}" y2="${yBottom.toFixed(1)}"></line>
    `;
  }

  const labels = [first, data[Math.floor(data.length/2)], last].map((d, idx) => {
    const i = idx === 0 ? 0 : idx === 1 ? Math.floor(data.length/2) : data.length - 1;
    return `<text class="axis x" x="${xFor(i).toFixed(1)}" y="${height - 9}" text-anchor="${idx === 0 ? 'start' : idx === 2 ? 'end' : 'middle'}">${d.label}</text>`;
  }).join('');

  const markerIndex = data.length - 1;
  const markerX = xFor(markerIndex), markerY = yFor(last.value);

  el.innerHTML = `
    <svg class="econ-line-svg-v378 ${opts.className || ''}" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" aria-hidden="true">
      <rect class="plot-bg" x="${left}" y="${topPad}" width="${plotW}" height="${plotH}" rx="10"></rect>
      ${band}
      ${grid}
      ${opts.area ? `<polygon class="area" points="${area}"></polygon>` : ''}
      <polyline class="main-line" points="${points}" fill="none"></polyline>
      <circle class="last-dot" cx="${markerX.toFixed(1)}" cy="${markerY.toFixed(1)}" r="4.5"></circle>
      ${labels}
    </svg>
    <div class="econ-axis-caption-v367"><span>${first.label}</span><span>${last.label} · ${econPctV378(last.value)}</span></div>
  `;
}

function atualizarResumoIPCADashboardV378(rows){
  const data = (rows || []).filter(x => Number.isFinite(Number(x.valor)));
  if(!data.length) return;
  const last = data[data.length - 1];
  const max = data.reduce((acc, cur) => Number(cur.valor) > Number(acc.valor) ? cur : acc, data[0]);
  const min = data.reduce((acc, cur) => Number(cur.valor) < Number(acc.valor) ? cur : acc, data[0]);
  const acumulado = (data.reduce((acc, cur) => acc * (1 + Number(cur.valor) / 100), 1) - 1) * 100;
  const periodoLabel = data.length === 12 ? '12M' : data.length === 24 ? '24M' : data.length === 36 ? '36M' : `${data.length}M`;
  const periodoDatas = `${econLabelFromItemV378(data[0])} → ${econLabelFromItemV378(last)}`;
  econSetTextV378('ipcaResumoAcumLabelV420', `Acumulado ${periodoLabel}`);
  econSetTextV378('ipcaResumoAcumV420', econPctV378(acumulado));
  econSetTextV378('ipcaResumoAcumDataV420', periodoDatas);
  const ipcaAcumElV420 = document.getElementById('ipcaResumoAcumV420');
  if(ipcaAcumElV420){
    ipcaAcumElV420.classList.toggle('valor-negativo-v402', Number.isFinite(acumulado) && acumulado < 0);
    ipcaAcumElV420.classList.toggle('valor-positivo-v402', Number.isFinite(acumulado) && acumulado > 0);
  }
  econSetTextV378('ipcaResumoUltimoV250', econPctV378(last.valor));
  econSetTextV378('ipcaResumoUltimoDataV250', econLabelFromItemV378(last));
  econSetTextV378('ipcaResumoMaxV250', econPctV378(max.valor));
  econSetTextV378('ipcaResumoMaxDataV250', econLabelFromItemV378(max));
  econSetTextV378('ipcaResumoMinV250', econPctV378(min.valor));
  const ipcaMinElV402 = document.getElementById('ipcaResumoMinV250');
  if(ipcaMinElV402){
    const nMinV402 = Number(min.valor);
    ipcaMinElV402.classList.toggle('valor-negativo-v402', Number.isFinite(nMinV402) && nMinV402 < 0);
    ipcaMinElV402.classList.toggle('valor-positivo-v402', Number.isFinite(nMinV402) && nMinV402 > 0);
  }
  econSetTextV378('ipcaResumoMinDataV250', econLabelFromItemV378(min));
}

function atualizarResumoSelicDashboardV378(rows, mercado){
  const lista = (rows || []).filter(x => Number.isFinite(Number(x._valor)));
  const set = econSetTextV378;
  const selicCard = mercado?.cards?.selic_meta || {};
  const atualCard = econNumberV378(selicCard.valor);
  if(!lista.length){
    set('selicMaxResumo', atualCard != null ? `${atualCard.toFixed(2).replace('.', ',')}% a.a.` : '—');
    set('selicMinResumo', atualCard != null ? `${atualCard.toFixed(2).replace('.', ',')}% a.a.` : '—');
    set('selicHojeResumo', atualCard != null ? `${atualCard.toFixed(2).replace('.', ',')}% a.a.` : '—');
    return;
  }
  const max = lista.reduce((a,b) => b._valor > a._valor ? b : a, lista[0]);
  const min = lista.reduce((a,b) => b._valor < a._valor ? b : a, lista[0]);
  const last = lista[lista.length - 1];
  const fmt = v => `${Number(v).toFixed(2).replace('.', ',')}% a.a.`;
  set('selicMaxResumo', fmt(max._valor));
  set('selicMaxData', max._dt ? max._dt.toLocaleDateString('pt-BR') : '—');
  set('selicMinResumo', fmt(min._valor));
  set('selicMinData', min._dt ? min._dt.toLocaleDateString('pt-BR') : '—');
  set('selicHojeResumo', fmt(Number.isFinite(atualCard) ? atualCard : last._valor));
  let hojeData = last._dt ? last._dt.toLocaleDateString('pt-BR') : 'último dado';
  try{
    const ref = typeof resolverDataUltimaAlteracaoSelic === 'function' ? resolverDataUltimaAlteracaoSelic(mercado) : null;
    hojeData = ref?.data || hojeData;
  }catch(e){}
  set('selicHojeData', hojeData);
}


function econRenderMetaVersusMetaV379(containerId, rows, range){
  const el = document.getElementById(containerId);
  if(!el) return;

  const limit = range === 'all' ? 9999 : Number(range || 12);
  const data = (rows || [])
    .map(item => ({
      value:Number(item.Inflacao12Meses),
      date:item.DataReferencia,
      label:econLabelMonthV378(item.DataReferencia)
    }))
    .filter(d => Number.isFinite(d.value) && d.date)
    .slice(-limit);

  if(data.length < 2){
    el.innerHTML = '<div class="econ-empty-v367">Histórico indisponível no momento.</div>';
    return;
  }

  const width = 720;
  const height = 250;
  const left = 48;
  const right = 16;
  const topPad = 18;
  const bottomPad = 42;
  const plotW = width - left - right;
  const plotH = height - topPad - bottomPad;

  const values = data.map(d => d.value);
  const lo = Math.max(0, Math.min(1.5, Math.floor((Math.min(...values) - 0.4) * 2) / 2));
  const hi = Math.max(6, Math.ceil((Math.max(...values) + 0.4) * 2) / 2);

  const yFor = v => topPad + ((hi - v) / (hi - lo || 1)) * plotH;
  const xFor = i => left + (i / (data.length - 1)) * plotW;

  const ticks = [];
  for(let v = Math.ceil(lo * 2) / 2; v <= hi + 0.001; v += 0.5){
    ticks.push(Number(v.toFixed(1)));
  }

  const grid = ticks.map(v => {
    const y = yFor(v);
    const special = Math.abs(v - 1.5) < .001 || Math.abs(v - 3) < .001 || Math.abs(v - 4.5) < .001;
    return `
      <line class="grid ${special ? 'special' : ''}" x1="${left}" y1="${y.toFixed(1)}" x2="${left+plotW}" y2="${y.toFixed(1)}"></line>
      <text class="axis y" x="${left - 8}" y="${(y + 3).toFixed(1)}" text-anchor="end">${econPctV378(v, false)}</text>
    `;
  }).join('');

  const yBandTop = yFor(4.5);
  const yBandBottom = yFor(1.5);
  const yMeta = yFor(3);

  const band = `
    <rect class="band" x="${left}" y="${Math.min(yBandTop,yBandBottom).toFixed(1)}" width="${plotW}" height="${Math.abs(yBandBottom-yBandTop).toFixed(1)}" rx="10"></rect>
    <line class="threshold teto" x1="${left}" y1="${yBandTop.toFixed(1)}" x2="${left+plotW}" y2="${yBandTop.toFixed(1)}"></line>
    <line class="threshold meta" x1="${left}" y1="${yMeta.toFixed(1)}" x2="${left+plotW}" y2="${yMeta.toFixed(1)}"></line>
    <line class="threshold piso" x1="${left}" y1="${yBandBottom.toFixed(1)}" x2="${left+plotW}" y2="${yBandBottom.toFixed(1)}"></line>
  `;

  const points = data.map((d, i) => `${xFor(i).toFixed(1)},${yFor(d.value).toFixed(1)}`);

  const segments = data.slice(1).map((d, i) => {
    const prev = data[i];
    const avg = (prev.value + d.value) / 2;
    let cls = 'seg ok';
    if(avg > 4.5) cls = 'seg high';
    else if(avg < 1.5) cls = 'seg low';
    const p1 = `${xFor(i).toFixed(1)},${yFor(prev.value).toFixed(1)}`;
    const p2 = `${xFor(i+1).toFixed(1)},${yFor(d.value).toFixed(1)}`;
    return `<line class="${cls}" x1="${p1.split(',')[0]}" y1="${p1.split(',')[1]}" x2="${p2.split(',')[0]}" y2="${p2.split(',')[1]}"></line>`;
  }).join('');

  const dots = data.map((d, i) => {
    let cls = 'dot ok';
    if(d.value > 4.5) cls = 'dot high';
    else if(d.value < 1.5) cls = 'dot low';
    return `<circle class="${cls}" cx="${xFor(i).toFixed(1)}" cy="${yFor(d.value).toFixed(1)}" r="4.2"><title>${d.label} · ${econPctV378(d.value)}</title></circle>`;
  }).join('');

  const labelStep = Math.max(1, Math.round(data.length / 5));
  const labels = data.map((d, i) => {
    const show = i === 0 || i === data.length - 1 || i % labelStep === 0;
    if(!show) return '';
    const x = xFor(i);
    return `<text class="axis x" x="${x.toFixed(1)}" y="${height - 24}" text-anchor="${i === 0 ? 'start' : i === data.length - 1 ? 'end' : 'middle'}">${d.label}</text>`;
  }).join('');

  const last = data[data.length - 1];

  el.innerHTML = `
    <svg class="econ-meta-legacy-svg-v379" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" aria-label="IPCA em 12 meses versus meta">
      <rect class="plot-bg" x="${left}" y="${topPad}" width="${plotW}" height="${plotH}" rx="10"></rect>
      ${band}
      ${grid}
      ${segments}
      ${dots}
      ${labels}
    </svg>
    <div class="econ-meta-legend-v379" aria-hidden="true">
      <span><i class="ipca"></i> IPCA 12M</span>
      <span><i class="meta"></i> Meta 3%</span>
      <span><i class="banda"></i> Banda 1,5%–4,5%</span>
      <strong>Atual · ${econPctV378(last.value)}</strong>
    </div>
  `;
}




/* v383 — Helper global para sincronizar gráfico e KPIs da Selic por período real */
function econSelicVisibleRowsV381(rows, range){
  const sorted = (rows || [])
    .filter(x => Number.isFinite(Number(x._valor)))
    .sort((a,b) => (a._ts || 0) - (b._ts || 0));

  if(range === 'all') return sorted;

  const months = Number(range || 12);
  const lastWithDate = [...sorted].reverse().find(x => x._dt && !isNaN(x._dt.getTime()));
  const endDate = lastWithDate?._dt || new Date();

  const startDate = new Date(endDate);
  startDate.setMonth(startDate.getMonth() - months);

  let filtered = sorted.filter(x => x._dt && x._dt >= startDate && x._dt <= endDate);

  // Inclui um ponto imediatamente anterior ao início apenas para continuidade visual da linha,
  // mas esse ponto não entra no cálculo de máxima/mínima do período.
  const previous = [...sorted].reverse().find(x => x._dt && x._dt < startDate);
  if(previous && filtered.length){
    filtered = [{...previous, _periodContextOnly:true}, ...filtered];
  }

  if(filtered.length >= 2) return filtered;

  return sorted.slice(-Math.max(2, Math.min(12, months)));
}

function econAtualizarSelicKpiLabelsV381(range){
  const maxLabel = document.getElementById('selicMaxLabelV381');
  const minLabel = document.getElementById('selicMinLabelV381');

  if(range === 'all'){
    if(maxLabel) maxLabel.textContent = 'Máxima histórica';
    if(minLabel) minLabel.textContent = 'Mínima histórica';
    return;
  }

  if(maxLabel) maxLabel.textContent = 'Máxima do período';
  if(minLabel) minLabel.textContent = 'Mínima do período';
}

function econAtualizarSelicPeriodoTextoV381(range){
  const note = document.getElementById('evoCardSelicNote');
  if(!note) return;

  const mercado = window.__ECON_DASH_STATE_V378__?.mercado || econDashStateV378?.mercado || {};
  const selic = mercado?.cards?.selic_meta || {};
  const valor = Number(selic.valor);
  let data = 'último dado';

  try{
    const ref = typeof resolverDataUltimaAlteracaoSelic === 'function' ? resolverDataUltimaAlteracaoSelic(mercado) : null;
    data = ref?.data || data;
  }catch(e){}

  const periodo =
    range === 'all' ? 'histórico completo' :
    Number(range) === 12 ? 'último 1 ano' :
    Number(range) === 60 ? 'últimos 5 anos' :
    Number(range) === 120 ? 'últimos 10 anos' :
    `últimos ${range} meses`;

  note.textContent = `Taxa vigente · ${Number.isFinite(valor) ? valor.toFixed(2).replace('.', ',') : '—'}% a.a. · desde ${data} · período: ${periodo}`;
}


function econRenderSelicLegacyV380(containerId, rows, range){
  const el = document.getElementById(containerId);
  if(!el) return;

  const visibleRows = econSelicVisibleRowsV381(rows || [], range);
  const data = visibleRows
    .filter(x => Number.isFinite(Number(x._valor)) && x._dt)
    .sort((a,b) => a._ts - b._ts)
    .map(x => ({
      value:Number(x._valor),
      date:x._dt,
      label:econLabelMonthV378(x._dt),
      contextOnly:!!x._periodContextOnly
    }));

  if(data.length < 2){
    el.innerHTML = '<div class="econ-empty-v367">Histórico indisponível no momento.</div>';
    return;
  }

  const width = 1280;
  const height = 350;
  const left = 56;
  const right = 26;
  const topPad = 26;
  const bottomPad = 40;
  const plotW = width - left - right;
  const plotH = height - topPad - bottomPad;

  const kpiData = data.filter(d => !d.contextOnly);
  const values = data.map(d => d.value);
  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);
  const amplitude = maxValue - minValue;
  const useDynamicScale = range !== 'all' && amplitude > 0 && amplitude < 3;
  const top = useDynamicScale ? Math.ceil((maxValue + 0.35) * 4) / 4 : Math.max(16, Math.ceil(Math.max(maxValue, 15) / 5) * 5);
  const lo = useDynamicScale ? Math.max(0, Math.floor((minValue - 0.35) * 4) / 4) : 0;

  const yFor = v => topPad + ((top - v) / (top - lo || 1)) * plotH;
  const xFor = i => left + (i / (data.length - 1)) * plotW;

  const ticks = [];
  if(useDynamicScale){
    const mid = (top + lo) / 2;
    [lo, mid, top].forEach(v => ticks.push(v));
  }else{
    for(let v = 0; v <= top + .001; v += 5) ticks.push(v);
  }

  const grid = ticks.map(v => {
    const y = yFor(v);
    return `
      <line class="grid" x1="${left}" y1="${y.toFixed(1)}" x2="${left + plotW}" y2="${y.toFixed(1)}"></line>
      <text class="axis y" x="${left - 8}" y="${(y + 3).toFixed(1)}" text-anchor="end">${econPctV378(v, false)}</text>
    `;
  }).join('');

  const points = data.map((d, i) => `${xFor(i).toFixed(1)},${yFor(d.value).toFixed(1)}`).join(' ');
  const area = `${left},${yFor(lo).toFixed(1)} ${points} ${left + plotW},${yFor(lo).toFixed(1)}`;

  const kpiValues = kpiData.length ? kpiData.map(d => d.value) : values;
  const maxPeriodValue = Math.max(...kpiValues);
  const minPeriodValue = Math.min(...kpiValues);
  const maxIdx = data.findIndex(d => !d.contextOnly && d.value === maxPeriodValue);
  const minIdx = data.findIndex(d => !d.contextOnly && d.value === minPeriodValue);
  const lastIdx = data.length - 1;

  const dots = data.map((d, i) => {
    let cls = d.contextOnly ? 'dot context' : 'dot small';
    let r = d.contextOnly ? 1.8 : 2.4;
    if(i === maxIdx){ cls = 'dot max'; r = 6; }
    if(i === minIdx){ cls = 'dot min'; r = 5.4; }
    if(i === lastIdx){ cls = 'dot current'; r = 6.4; }
    return `<circle class="${cls}" cx="${xFor(i).toFixed(1)}" cy="${yFor(d.value).toFixed(1)}" r="${r}"><title>${d.label} · ${econPctV378(d.value, false)} a.a.</title></circle>`;
  }).join('');

  const labelTargetCount = range === 'all' ? 7 : range === 36 ? 4 : range === 60 ? 5 : 6;
  const labelStep = Math.max(1, Math.round(data.length / labelTargetCount));
  const labels = data.map((d, i) => {
    const show = i === 0 || i === data.length - 1 || i % labelStep === 0;
    if(!show) return '';
    const x = xFor(i);
    return `<text class="axis x" x="${x.toFixed(1)}" y="${height - 10}" text-anchor="${i === 0 ? 'start' : i === data.length - 1 ? 'end' : 'middle'}">${d.label}</text>`;
  }).join('');

  const last = data[lastIdx];
  const periodStart = kpiData[0]?.label || data[0].label;
  const periodEnd = kpiData[kpiData.length - 1]?.label || last.label;

  el.innerHTML = `
    <svg class="econ-selic-legacy-svg-v380" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet" aria-label="Trajetória histórica da Selic meta">
      <rect class="plot-bg" x="${left}" y="${topPad}" width="${plotW}" height="${plotH}" rx="10"></rect>
      ${grid}
      <polygon class="area" points="${area}"></polygon>
      <polyline class="main-line" points="${points}" fill="none"></polyline>
      ${dots}
      ${labels}
    </svg>
    <div class="econ-selic-legend-v380" aria-hidden="true">
      <span><i class="max"></i> máxima do período</span>
      <span><i class="min"></i> mínima do período</span>
      <span><i class="current"></i> vigente</span>
      <strong>${periodStart} → ${periodEnd}</strong>
      <strong>Atual · ${econPctV378(last.value, false)} a.a.</strong>
    </div>
  `;
}


function econRenderTargetV378(target){
  if(target === 'ipca'){
    const range = econDashStateV378.range.ipca;
    const data = econDashStateV378.ipcaNorm || [];
    econRenderIpcaBarsV378('econSparkIpcaV367', data, range);
    atualizarResumoIPCADashboardV378(data.slice(-Number(range || 24)));
  }

  if(target === 'meta'){
    const range = econDashStateV378.range.meta;
    const meta = econDashStateV378.metaNorm || [];
    const ipca = econDashStateV378.mercado?.cards?.ipca || {};
    if(meta.length >= 2){
      econRenderMetaVersusMetaV379('econSparkMetaV367', meta, range);
    }else{
      document.getElementById('econSparkMetaV367').innerHTML = '<div class="econ-empty-v367">Histórico indisponível no momento.</div>';
    }
    econSetTextV378('evoCardMetaNote', `IPCA em 12 meses · ${econPctV378(ipca.acum_12m)} · ${econMetaStatusV378(ipca.acum_12m).toLowerCase()}`);
  }

  if(target === 'selic'){
    const range = econDashStateV378.range.selic;
    const selic = econDashStateV378.selicNorm || [];
    econRenderSelicLegacyV380('econSparkSelicV367', selic, range);

    const visibleRows = econSelicVisibleRowsV381(selic, range).filter(x => !x._periodContextOnly);
    atualizarResumoSelicDashboardV378(visibleRows, econDashStateV378.mercado);
    econAtualizarSelicKpiLabelsV381(range);
    econAtualizarSelicPeriodoTextoV381(range);
  }
}

async function renderIndicadoresDashboardV378(d){
  econDashStateV378.mercado = d || {};
  const ipca = d?.cards?.ipca || {};
  const selic = d?.cards?.selic_meta || {};

  let histIpca = [];
  try{
    histIpca = await carregarIPCAHistoricoAmpliado(ipca.historico || []);
  }catch(e){
    histIpca = normalizarHistoricoIPCA(ipca.historico || []);
  }

  const ipcaNorm = normalizarHistoricoIPCA(histIpca);
  econDashStateV378.ipcaNorm = ipcaNorm;

  const lastIpca = ipcaNorm[ipcaNorm.length - 1];
  const lastLabel = lastIpca ? econLabelFromItemV378(lastIpca) : (ipca.label_mes || 'último dado');
  econSetTextV378('evoCardIpcaNote', `Último resultado · ${lastLabel} · ${econPctV378(ipca.ultimo_mes ?? lastIpca?.valor)}`);

  let histSelic = [];
  try{
    histSelic = await carregarSelicHistoricoAmpliado(d?.historico_selic || selic.historico || []);
  }catch(e){
    histSelic = d?.historico_selic || selic.historico || [];
  }

  const selicNorm = (histSelic || []).map((item, idx) => {
    const dt = econParseDateV378(item._dtSelic || item.DataReuniaoCopom || item.data || item.DataInicioVigencia || item.Data || '');
    const valor = econNumberV378(item._valorSelic ?? item.MetaSelic ?? item.valor ?? item.TaxaSelic ?? item.taxa ?? item.Selic);
    return {...item, _dt:dt, _ts:dt ? dt.getTime() : idx, _valor:valor};
  }).filter(x => Number.isFinite(x._valor)).sort((a,b) => a._ts - b._ts);

  try{
    const refAtualV402 = typeof resolverDataUltimaAlteracaoSelic === 'function' ? resolverDataUltimaAlteracaoSelic(d) : null;
    const dtAtualV402 = econParseDateV378(refAtualV402?.data || selic.data || selic.data_referencia || '');
    const valorAtualV402 = econNumberV378(selic.valor ?? selic.MetaSelic ?? selic.taxa);
    const ultimoV402 = selicNorm[selicNorm.length - 1];
    if(dtAtualV402 && Number.isFinite(valorAtualV402) && (!ultimoV402 || dtAtualV402.getTime() > ultimoV402._ts || Math.abs(Number(ultimoV402._valor) - valorAtualV402) > 0.0001)){
      selicNorm.push({
        DataReuniaoCopom: refAtualV402?.data || selic.data || selic.data_referencia,
        _dt: dtAtualV402,
        _ts: dtAtualV402.getTime(),
        _valor: valorAtualV402,
        _currentInjectedV402: true
      });
      selicNorm.sort((a,b) => a._ts - b._ts);
    }
  }catch(e){}

  econDashStateV378.selicNorm = selicNorm;
  // v381: KPIs da Selic agora são atualizados dentro de econRenderTargetV378,
  // respeitando o período selecionado.

  let selicData = 'último dado';
  try{
    const ref = typeof resolverDataUltimaAlteracaoSelic === 'function' ? resolverDataUltimaAlteracaoSelic(d) : null;
    selicData = ref?.data || selicData;
  }catch(e){}
  const selicValor = Number(selic.valor);
  econSetTextV378('evoCardSelicNote', `Taxa vigente · ${Number.isFinite(selicValor) ? selicValor.toFixed(2).replace('.', ',') : '—'}% a.a. · desde ${selicData}`);

  let meta = d?.meta_vs_inflacao_efetiva || [];
  if(!meta.length){
    try{
      const jsMeta = await carregarJsonLocal('meta-vs-inflacao-efetiva.json');
      meta = jsMeta?.conteudo || jsMeta?.dados || (Array.isArray(jsMeta) ? jsMeta : []);
    }catch(e){}
  }

  try{
    meta = sincronizarSerieMetaComIpcaAtual(meta, ipca);
  }catch(e){}

  const metaNorm = (meta || [])
    .filter(x => x?.DataReferencia && Number.isFinite(Number(x.Inflacao12Meses)))
    .sort((a,b) => new Date(a.DataReferencia) - new Date(b.DataReferencia));

  econDashStateV378.metaNorm = metaNorm;

  econRenderTargetV378('ipca');
  econRenderTargetV378('meta');
  econRenderTargetV378('selic');
  bindIndicadoresDashboardV378();
}



/* v184 — títulos dos gráficos sincronizados com o período selecionado */
function atualizarTituloPeriodoGrafico(chart, range){
  const periodo = Number(range);
  const configuracoes = {
    ipca: {
      24: {
        titulo: '🎯 IPCA mensal — últimos 24 meses',
        subtitulo: 'Variação oficial mês a mês'
      },
      60: {
        titulo: '🎯 IPCA mensal — últimos 5 anos',
        subtitulo: 'Ciclo recente de inflação mensal'
      },
      120: {
        titulo: '🎯 IPCA mensal — últimos 10 anos',
        subtitulo: 'Histórico mensal mais amplo'
      }
    },
    selic: {
      12: {
        titulo: '🏦 Trajetória da Selic meta',
        subtitulo: 'Último ano · decisões recentes do Copom'
      },
      24: {
        titulo: '🏦 Trajetória da Selic meta',
        subtitulo: 'Últimos 2 anos · ciclo atual de juros'
      },
      60: {
        titulo: '🏦 Trajetória da Selic meta',
        subtitulo: 'Últimos 5 anos · visão executiva do ciclo'
      },
      120: {
        titulo: '🏦 Trajetória da Selic meta',
        subtitulo: 'Últimos 10 anos · comparação com ciclos anteriores'
      },
      999: {
        titulo: '🏦 Trajetória da Selic meta',
        subtitulo: 'Série histórica da Selic meta.'
      }
    }
  };

  const config = configuracoes[chart]?.[periodo];
  if(!config) return;

  const tituloId = chart === 'ipca' ? 'chartIpcaTitle' : chart === 'selic' ? 'chartSelicTitle' : null;
  const titulo = tituloId ? document.getElementById(tituloId) : null;
  if(titulo && config.titulo) titulo.textContent = config.titulo;

  const subtituloId = chart === 'ipca' ? 'chartIpcaSub' : chart === 'selic' ? 'chartSelicSub' : null;
  const subtitulo = subtituloId ? document.getElementById(subtituloId) : null;
  if(subtitulo && config.subtitulo) subtitulo.textContent = config.subtitulo;
}

function sincronizarTitulosGraficosAtivos(){
  document.querySelectorAll('.chart-tab[data-chart][data-range].active').forEach(btn=>{
    atualizarTituloPeriodoGrafico(btn.dataset.chart, Number(btn.dataset.range));
  });
}

window.atualizarTituloPeriodoGrafico = atualizarTituloPeriodoGrafico;

async function alterarPeriodoGraficoEvolucao(btn){
  if(!btn) return;
  const chart = btn.dataset.chart;
  const range = parseInt(btn.dataset.range, 10);
  if(!chart || !Number.isFinite(range)) return;

  atualizarTituloPeriodoGrafico(chart, range);

  document.querySelectorAll(`.chart-tab[data-chart="${chart}"]`).forEach(b=>{
    const ativo = b === btn;
    b.classList.toggle('active', ativo);
    b.setAttribute('aria-pressed', String(ativo));
    b.setAttribute('type','button');
  });

  btn.dataset.loadingChart = '1';

  try{
    if(chart === 'ipca'){
      if(!_dadosMercado) _dadosMercado = {};
      if(!_dadosMercado.cards) _dadosMercado.cards = {};
      if(!_dadosMercado.cards.ipca) _dadosMercado.cards.ipca = {};

      let hist = _dadosMercado?.cards?.ipca?.historico || [];

      // Quando clicar 5A/10A e a base atual estiver curta, tenta buscar a base histórica do repositório.
      if(range > normalizarHistoricoIPCA(hist).length){
        hist = await carregarIPCAHistoricoAmpliado(hist);
        _dadosMercado.cards.ipca.historico = hist;
      }

      if(hist.length) buildChartIpca(hist, range);
      else marcarGraficoSemDados('chartIpca', 'Histórico de IPCA temporariamente indisponível.');
    }

    if(chart === 'selic'){
      let histSelic = _dadosMercado?.historico_selic || _dadosMercado?.cards?.selic_meta?.historico || [];

      // Mantém 1A/5A/Histórico funcionando mesmo quando o JSON principal trouxer uma amostra curta.
      histSelic = await carregarSelicHistoricoAmpliado(histSelic);
      if(!_dadosMercado) _dadosMercado = {};
      _dadosMercado.historico_selic = histSelic;

      if(histSelic.length) buildChartSelic(histSelic, range);
      else marcarGraficoSemDados('chartSelic', 'Histórico da Selic temporariamente indisponível.');
    }
  }catch(err){
    console.warn('[Gráficos] Erro ao trocar período:', chart, range, err);
  }finally{
    delete btn.dataset.loadingChart;
    setTimeout(()=>{
      if(chart === 'ipca' && _chartIpca && typeof _chartIpca.resize === 'function') _chartIpca.resize();
      if(chart === 'selic' && _chartSelic && typeof _chartSelic.resize === 'function') _chartSelic.resize();
    }, 40);
  }
}

window.alterarPeriodoGraficoEvolucao = alterarPeriodoGraficoEvolucao;

function bindEvolucaoChartPeriodTabs(){
  document.querySelectorAll('.chart-tab[data-chart]').forEach(btn=>{
    btn.setAttribute('type','button');
    btn.setAttribute('aria-pressed', String(btn.classList.contains('active')));
    btn.style.pointerEvents = 'auto';

    if(btn.dataset.chartTabBound === '1') return;
    btn.dataset.chartTabBound = '1';

    btn.addEventListener('click', e=>{
      e.preventDefault();
      alterarPeriodoGraficoEvolucao(btn);
    });
  });
}

document.addEventListener('click', e=>{
  const btn = e.target.closest('.chart-tab[data-chart]');
  if(!btn) return;
  e.preventDefault();
  alterarPeriodoGraficoEvolucao(btn);
});

/* ════════════════════════════════════════════════════
   PTAX MODAL
════════════════════════════════════════════════════ */
let _ptaxCarregado=false;

function abrirModalPTAX(){
  $('modalPtax').classList.add('open');
  document.body.style.overflow='hidden';
  if(!_ptaxCarregado) carregarPTAX();
}
function fecharModalPTAX(e){
  if(e&&e.target!==$('modalPtax')) return;
  $('modalPtax').classList.remove('open');
  document.body.style.overflow='';
}
document.addEventListener('keydown',e=>{ if(e.key==='Escape') fecharModalPTAX(); });

async function carregarPTAX(){
  const loading=$('ptaxLoading'),table=$('ptaxTable'),tbody=$('ptaxBody');
  try{
    if(!_ptaxHistorico.length) throw new Error('ptax_historico ausente no mercado_atual.json');

    const byMonth={};
    _ptaxHistorico.forEach(item=>{
      if(!item.cotacaoVenda) return;
      const dt=new Date(item.dataHoraCotacao);
      const key=`${dt.getFullYear()}-${String(dt.getMonth()+1).padStart(2,'0')}`;
      if(!byMonth[key]||new Date(item.dataHoraCotacao)>new Date(byMonth[key].dataHoraCotacao)) byMonth[key]=item;
    });

    const asc=Object.entries(byMonth).sort(([a],[b])=>a.localeCompare(b));
    if(!asc.length) throw new Error('Sem dados no histórico PTAX');

    const desc=[...asc].reverse();
    tbody.innerHTML=desc.map(([key,item])=>{
      const [ano,mes]=key.split('-');
      const label=item._mes_label || `${MESES_PT[parseInt(mes)-1]}/${ano}`;
      const val=Number(item.cotacaoVenda);
      const valFmt='R$ '+val.toLocaleString('pt-BR',{minimumFractionDigits:4,maximumFractionDigits:4});
      const dtCot=new Date(item.dataHoraCotacao);
      const dtFmt=`${String(dtCot.getDate()).padStart(2,'0')}/${String(dtCot.getMonth()+1).padStart(2,'0')}/${dtCot.getFullYear()}`;

      let varPct = item._var_pct;
      if(varPct === null || varPct === undefined){
        const idxAsc = asc.findIndex(([k])=>k===key);
        if(idxAsc > 0){
          const prevVal = Number(asc[idxAsc-1][1].cotacaoVenda);
          if(prevVal) varPct = ((val/prevVal)-1)*100;
        }
      }

      let varHtml='<span class="ptax-var zero">—</span>';
      if(varPct !== null && varPct !== undefined && !Number.isNaN(Number(varPct))){
        const n = Number(varPct);
        const cls=n>0?'neg':n<0?'pos':'zero';
        varHtml=`<span class="ptax-var ${cls}">${signPct(n)}${fmt(n)}</span>`;
      }

      return `<tr><td class="ptax-month">${label}</td><td class="ptax-val">${valFmt}</td><td>${varHtml}</td><td style="color:var(--muted);font-size:.72rem">${dtFmt}</td></tr>`;
    }).join('');
    loading.style.display='none'; table.style.display='table'; _ptaxCarregado=true;
  }catch(err){
    loading.innerHTML=`<div style="color:var(--muted)">Histórico PTAX temporariamente indisponível.<br><small>Atualize a página em alguns instantes.</small></div>`;
  }
}

/* ════════════════════════════════════════════════════
   CALENDÁRIO COPOM 2026 — com decisão da Selic
════════════════════════════════════════════════════ */
const COPOM_2026 = [
  { num:1, short:'27–28 jan', datas:'27 e 28 de janeiro',  decision:'2026-01-28', resultado_static:'mantida em 15,00%',        tipo_static:'hold' },
  { num:2, short:'17–18 mar', datas:'17 e 18 de março',    decision:'2026-03-18', resultado_static:'corte −0,25 p.p. → 14,75%', tipo_static:'cut'  },
  { num:3, short:'28–29 abr', datas:'28 e 29 de abril',    decision:'2026-04-29', resultado_static:'corte −0,25 p.p. → 14,50%', tipo_static:'cut'  },
  { num:4, short:'16–17 jun', datas:'16 e 17 de junho',    decision:'2026-06-17' },
  { num:5, short:'4–5 ago',   datas:'4 e 5 de agosto',     decision:'2026-08-05' },
  { num:6, short:'15–16 set', datas:'15 e 16 de setembro', decision:'2026-09-16' },
  { num:7, short:'3–4 nov',   datas:'3 e 4 de novembro',   decision:'2026-11-04' },
  { num:8, short:'8–9 dez',   datas:'8 e 9 de dezembro',   decision:'2026-12-09' },
];

function _dateKeyCopom(v){
  if(!v) return '';
  const s = String(v);
  if(/^\d{4}-\d{2}-\d{2}/.test(s)) return s.slice(0,10);
  const m = s.match(/^(\d{2})\/(\d{2})\/(\d{4})/);
  if(m) return `${m[3]}-${m[2]}-${m[1]}`;
  return '';
}
function _selicValorRegistro(r){
  const v = r?.MetaSelic ?? r?.valor ?? r?.meta_selic ?? r?.taxa;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}
function _fmtPpCopom(v){
  const n = Number(v);
  if(!Number.isFinite(n)) return '—';
  return (n > 0 ? '+' : '') + n.toFixed(2).replace('.',',') + ' p.p.';
}
function _fmtPctCopom(v){
  const n = Number(v);
  if(!Number.isFinite(n)) return '—';
  return n.toFixed(2).replace('.',',') + '%';
}
function _dataKeyHojeLocal(){
  const hoje = new Date();
  return `${hoje.getFullYear()}-${String(hoje.getMonth()+1).padStart(2,'0')}-${String(hoje.getDate()).padStart(2,'0')}`;
}
function _dataBrCopom(key){
  const m = String(key || '').match(/^(\d{4})-(\d{2})-(\d{2})$/);
  return m ? `${m[3]}/${m[2]}/${m[1]}` : String(key || '');
}
function _historicoSelicOrdenadoParaDados(dados){
  const card = dados?.cards?.selic_meta || {};
  const h = dados?.historico_selic || card.historico || [];
  const historico = (Array.isArray(h) ? h : [])
    .map(r => ({...r, _key:_dateKeyCopom(r.DataReuniaoCopom || r.data || r.DataInicioVigencia || r.data_ref), _valor:_selicValorRegistro(r)}))
    .filter(r => r._key && r._valor !== null)
    .sort((a,b) => b._key.localeCompare(a._key));

  const vigente = Number(card.valor);
  if(!Number.isFinite(vigente)) return historico;

  const maisRecente = historico[0] || null;
  const historicoJaAtual = maisRecente && Math.abs(maisRecente._valor - vigente) < 0.005;
  if(historicoJaAtual) return historico;

  // Prioridade para uma data explícita produzida pelo robô.
  const dataExplicita = card.ultima_alteracao || card.data_ultima_alteracao || card.data_mudanca || card.vigente_desde || card.data_ref;
  let decisionKey = _dateKeyCopom(dataExplicita);

  // Proteção v223: se a taxa mudou antes de o histórico receber o novo registro,
  // identifica a reunião mais recente do Copom posterior ao histórico disponível.
  if(!decisionKey){
    const hojeKey = _dataKeyHojeLocal();
    const limiteInferior = maisRecente?._key || '';
    const reuniao = COPOM_2026
      .filter(r => r.decision <= hojeKey && (!limiteInferior || r.decision > limiteInferior))
      .sort((a,b) => b.decision.localeCompare(a.decision))[0];
    decisionKey = reuniao?.decision || '';
  }

  if(!decisionKey) return historico;
  if(historico.some(r => r._key === decisionKey && Math.abs(r._valor - vigente) < 0.005)) return historico;

  historico.push({
    data:_dataBrCopom(decisionKey),
    valor:vigente,
    MetaSelic:vigente,
    DataReuniaoCopom:`${decisionKey}T03:00:00Z`,
    _key:decisionKey,
    _valor:vigente,
    _reconciliado_v223:true
  });
  return historico.sort((a,b) => b._key.localeCompare(a._key));
}
function _historicoSelicOrdenado(){
  return _historicoSelicOrdenadoParaDados(_dadosMercado);
}
function resolverDataUltimaAlteracaoSelic(dados){
  const card = dados?.cards?.selic_meta || {};
  const vigente = Number(card.valor);
  const historico = _historicoSelicOrdenadoParaDados(dados);

  if(!Number.isFinite(vigente) || !historico.length){
    const fallback = card.ultima_alteracao || card.data_ultima_alteracao || card.data_ref || '';
    const key = _dateKeyCopom(fallback);
    return { data:key ? _dataBrCopom(key) : String(fallback || ''), key, inferida:false };
  }

  // "Última alteração" não é necessariamente a última reunião.
  // Percorre o bloco inicial de registros com a taxa vigente e retorna o
  // registro mais antigo desse bloco: o momento em que a taxa passou a valer.
  const vigentesConsecutivos = [];
  for(const registro of historico){
    if(Math.abs(registro._valor - vigente) < 0.005){
      vigentesConsecutivos.push(registro);
      continue;
    }
    if(vigentesConsecutivos.length) break;
  }

  const referencia = vigentesConsecutivos.length
    ? vigentesConsecutivos[vigentesConsecutivos.length - 1]
    : historico.find(r => Math.abs(r._valor - vigente) < 0.005) || historico[0];

  return {
    data: referencia?.data || _dataBrCopom(referencia?._key) || '—',
    key: referencia?._key || '',
    inferida: Boolean(referencia?._reconciliado_v223)
  };
}
function _decisaoCopomPorData(decisionDate){
  const hist = _historicoSelicOrdenado();
  const idx = hist.findIndex(r => r._key === decisionDate);
  if(idx < 0) return null;
  const atual = hist[idx];
  const anterior = hist[idx + 1];
  const taxa = atual._valor;
  if(!anterior || anterior._valor === null){
    return { tipo:'done', texto:`Selic ${_fmtPctCopom(taxa)}` };
  }
  const diff = +(taxa - anterior._valor).toFixed(2);
  if(Math.abs(diff) < 0.005){
    return { tipo:'hold', texto:`mantida em ${_fmtPctCopom(taxa)}` };
  }
  if(diff > 0){
    return { tipo:'hike', texto:`alta ${_fmtPpCopom(diff)} → ${_fmtPctCopom(taxa)}` };
  }
  return { tipo:'cut', texto:`corte ${_fmtPpCopom(diff)} → ${_fmtPctCopom(taxa)}` };
}
function _resumoCopomTexto(resultado){
  const raw = String(resultado || '').trim();
  if(!raw) return 'Sem atualização disponível.';
  let m = raw.match(/^corte\s+([^→]+)\s+→\s+(.+)$/i);
  if(m) return `Selic em ${m[2].trim()} após corte ${m[1].trim()}.`;
  m = raw.match(/^alta\s+([^→]+)\s+→\s+(.+)$/i);
  if(m) return `Selic em ${m[2].trim()} após alta ${m[1].trim()}.`;
  m = raw.match(/^mantida em\s+(.+)$/i);
  if(m) return `Selic mantida em ${m[1].trim()}.`;
  return raw;
}

function _statusCopomCurto(tipo, resultado){
  if(tipo === 'cut') return 'corte';
  if(tipo === 'hike') return 'alta';
  if(tipo === 'hold') return 'manutenção';
  if(String(resultado||'').toLowerCase().includes('próxima')) return 'agenda';
  return 'status';
}

function _renderCopomExecutiveCardsV270(ultima, proxima){
  const last = $('copomLastExecutiveV270');
  const next = $('copomNextExecutiveV270');
  if(last && ultima){
    last.innerHTML = `
      <span class="copom-exec-kicker-v270">Última decisão</span>
      <strong class="copom-exec-date-v270">${ultima.short || '—'}</strong>
      <div class="copom-exec-meta-v270">
        <span class="copom-exec-pill-v270">${ultima.num}ª reunião</span>
        <span class="copom-exec-status-v270 is-${ultima.klass || 'done'}">${_statusCopomCurto(ultima.decisao?.tipo, ultima.resultado)}</span>
      </div>
      <p class="copom-exec-desc-v270">${_resumoCopomTexto(ultima.resultado)}</p>`;
  }
  if(next){
    if(proxima){
      next.innerHTML = `
        <span class="copom-exec-kicker-v270">Próxima reunião</span>
        <strong class="copom-exec-date-v270">${proxima.short || '—'}</strong>
        <div class="copom-exec-meta-v270">
          <span class="copom-exec-pill-v270">${proxima.num}ª reunião</span>
          <span class="copom-exec-status-v270 is-next">agenda</span>
        </div>
        <p class="copom-exec-desc-v270">Reunião programada para ${proxima.datas}. Próxima decisão prevista do Copom.</p>`;
    } else {
      next.innerHTML = `
        <span class="copom-exec-kicker-v270">Próxima reunião</span>
        <strong class="copom-exec-date-v270">Calendário concluído</strong>
        <div class="copom-exec-meta-v270">
          <span class="copom-exec-pill-v270">2026</span>
          <span class="copom-exec-status-v270 is-hold">encerrado</span>
        </div>
        <p class="copom-exec-desc-v270">Não há novas reuniões previstas para o restante do calendário informado.</p>`;
    }
  }
}

function buildCopomCalendario(){
  const container = $('copomMeetings');
  if(!container) return;

  const hojeKey = _dataKeyHojeLocal();
  const comDecisao = COPOM_2026.map((r,i) => ({
    ...r,
    _i:i,
    decisao:_decisaoCopomPorData(r.decision)
  }));
  // A reunião do próprio dia deixa de ser tratada como "próxima" assim que
  // a nova taxa já estiver disponível, evitando duplicidade no calendário.
  const proxIdx = comDecisao.findIndex(r => !r.decisao && r.decision >= hojeKey);

  const base = comDecisao.map((r,i) => {
    const isNext = i === proxIdx;
    const isFuture = !r.decisao && r.decision >= hojeKey && !isNext;
    const klass = r.decisao?.tipo || (isNext ? 'next' : isFuture ? 'future' : 'done');
    const resultado = r.decisao?.texto || (isNext ? 'próxima ★' : isFuture ? 'prevista' : 'realizada');
    return { ...r, isNext, isFuture, klass, resultado };
  });

  // v167: primeiras leituras = três decisões mais recentes + próxima reunião.
  const realizadas = base.filter(r => r.decisao).slice(-3).reverse();
  const proxima = proxIdx >= 0 ? base[proxIdx] : null;
  const futuras = base.filter((r,i) => i > proxIdx && !r.decisao);
  const antigas = base.filter(r => !realizadas.includes(r) && r !== proxima && !futuras.includes(r));
  const lista = [...realizadas, ...(proxima ? [proxima] : []), ...futuras, ...antigas];

  container.innerHTML = lista.map((r,position) => {
    const extra = position >= 4 ? ' copom-extra-v167' : '';
    return `<div class="copom-item ${r.klass} ${r.isNext ? 'next featured-next' : ''}${extra}" title="${r.num}ª reunião: ${r.datas}" data-original-order="${r._i}" role="listitem">
      <span class="copom-num">${r.num}ª reunião</span>
      <strong class="copom-date">${r.short}</strong>
      <small class="copom-result">${r.resultado}</small>
    </div>`;
  }).join('');

  const ultimaDecisao = realizadas[0] || base.filter(r => r.decisao).slice(-1)[0] || null;
  _renderCopomExecutiveCardsV270(ultimaDecisao, proxima);

  const nextDate = $('copomNextDateV167');
  const nextStatus = $('copomNextStatusV167');
  if(nextDate) nextDate.textContent = proxima ? proxima.short : 'Calendário concluído';
  if(nextStatus) nextStatus.textContent = proxima ? (proxima.resultado || 'decisão pendente') : 'Sem novas reuniões em 2026';

  container.classList.remove('is-expanded-v167');
  const panel = $('copomCalendarSecondaryV270');
  if(panel) panel.classList.remove('is-open-v270');
  const toggle = $('copomCalendarToggleV167');
  container.classList.add('copom-timeline-clean-v256');
  if(toggle){
    toggle.textContent = 'Ver calendário completo';
    toggle.setAttribute('aria-expanded','false');
  }
  requestAnimationFrame(() => { container.scrollLeft = 0; });
}


/* ════════════════════════════════════════════════════
   INIT — v80 dados primeiro, indicadores depois
════════════════════════════════════════════════════ */
async function iniciarDashboard(){
  const etapa = async function(nome, fn){
    try{
      if(typeof fn !== 'function') return null;
      return await fn();
    }catch(e){
      console.warn('[INIT] Falha em ' + nome + ':', e);
      return null;
    }
  };

  const revelar = function(){
    try{
      document.documentElement.classList.remove('app-booting');
      document.documentElement.classList.add('app-ready','no-boot-v79','data-first-v80');
      const boot=document.getElementById('appBootScreen');
      if(boot) boot.remove();
      if(typeof window.__revealApp === 'function') window.__revealApp('data-first-v80');
    }catch(e){}
  };

  try{
    /* Principal: dados locais do catálogo não podem esperar endpoints externos. */
    await Promise.all([
      etapa('carregarFundosJson', carregarFundosJson),
      etapa('carregarFundosMetaJson', carregarFundosMetaJson)
    ]);
    await etapa('carregarDados', carregarDados);
    await etapa('carregarKPIs', carregarKPIs);

    revelar();
    window.__dashboardReady = true;

    try{ if(typeof renderMobileFundCards === 'function') renderMobileFundCards(); }catch(e){}
    try{ if(typeof renderRankings === 'function') renderRankings(); }catch(e){}

    /* Indicadores e gráficos rodam em segundo plano. Se algum endpoint atrasar,
       a lista de fundos continua disponível. */
    (async function carregarIndicadoresEmBackground(){
      await etapa('carregarMercado', carregarMercado);
      await etapa('carregarCDIPeriodos', carregarCDIPeriodos);
      await etapa('carregarIPCAPeriodos', carregarIPCAPeriodos);
      etapa('carregarDolarDia', carregarDolarDia);
      etapa('carregarPTAXDiarioAno', carregarPTAXDiarioAno);
      await etapa('carregarPTAXHistorico', carregarPTAXHistorico);

      try{ if(typeof applyFilter === 'function') applyFilter(); }catch(e){}
      try{ if(typeof renderRankings === 'function') renderRankings(); }catch(e){}
      try{ if(typeof atualizarResumoFechamentoMes==='function') atualizarResumoFechamentoMes(); }catch(e){}
      try{ if(typeof atualizarPainelFechadoCard==='function') atualizarPainelFechadoCard(); }catch(e){}
      try{ if(typeof renderClosedMarketSheet==='function') renderClosedMarketSheet(); }catch(e){}
    })();

  }catch(e){
    console.error('[INIT] Falha crítica no carregamento principal:', e);
    revelar();

    const loadMsg = document.getElementById('loadMsg');
    if(loadMsg){
      loadMsg.innerHTML = `<div style="color:var(--red)">Erro ao carregar a base principal<br><small>${e.message || e}</small></div>`;
    }
  }
}
iniciarDashboard();

document.addEventListener('click', function(e){
  if(e.target.closest('.detail-row a, .detail-row button, .detail-row input, .docs-card')){
    e.stopPropagation();
  }
}, true);
// Mantém o disclaimer do rodapé fechado ao abrir/recarregar a página.
document.addEventListener('DOMContentLoaded', function(){
  var footer = document.getElementById('footerDisclaimer');
  if (footer) footer.removeAttribute('open');
});
/* ════════════════════════════════════════════════════
   MOBILE UX — atalhos, filtros compactos e cards de fundos
════════════════════════════════════════════════════ */
(function(){
  function qs(sel,root=document){return root.querySelector(sel)}
  function qsa(sel,root=document){return Array.from(root.querySelectorAll(sel))}
  function isMobile(){return window.matchMedia('(max-width: 820px)').matches}
  function setSectionIds(){
    const sections=qsa('.section-gap');
    sections.forEach(sec=>{
      const txt=(sec.textContent||'').replace(/\s+/g,' ').trim();
      if(txt.includes('Indicadores de Mercado')&&!qs('#sec-mercado')) sec.id='sec-mercado';
      if(txt.includes('Câmbio — Dólar')&&!qs('#sec-dolar')) sec.id='sec-dolar';
      if(txt.includes('Boletim Focus')&&!qs('#sec-focus')) sec.id='sec-focus';
      if(txt.includes('Catálogo Completo de Fundos')&&!qs('#sec-fundos')) sec.id='sec-fundos';
    });
    // v20: nova ordem — Fundos e Rankings sobem; Mercado e Dólar descem
    ['topo','sec-fundos','rankingsSection','sec-mercado','sec-dolar','sec-focus'].forEach(id=>{
      const el=document.getElementById(id); if(el) el.classList.add('mobile-anchor-target');
    });
  }

  function getMobileDocs(row){
    if(typeof obterDocsFundoCompactos !== 'function') return [];
    const docs = obterDocsFundoCompactos(row) || [];
    const vistos = new Set();
    return docs
      .filter(d => d && String(d.url || '').startsWith('http'))
      .filter(d => {
        const u = String(d.url || '').trim();
        if(vistos.has(u)) return false;
        vistos.add(u);
        return true;
      });
  }

  function buildMobileDocsHtml(row){
    const docs = getMobileDocs(row);
    if(!docs.length){
      return `<div class="fund-card-docs-empty">Nenhum documento disponível na base</div>`;
    }

    const boletim = docs.find(d => /boletim/i.test(String(d.label || '')) || String(d.csvKey || '') === 'doc_boletim');
    const secundarios = boletim ? docs.filter(d => d.url !== boletim.url) : docs;

    // No mobile, o Boletim Comercial já aparece como ação rápida no card.
    // Para evitar repetição dentro de "Mais detalhes", mostramos aqui apenas documentos complementares.
    if(!secundarios.length) return '';

    const pageUrl = getFundUrl(row);
    const pageBtn = pageUrl
      ? `<a class="fund-card-docs-page-v235" href="${htmlAttr(pageUrl)}" target="_blank" rel="noopener">Página oficial ↗</a>`
      : '';

    const docLabelMobileV466 = d => {
      const label = String(d.label || '').trim();
      const curto = String(d.curto || '').trim().toUpperCase();
      if(/l[âa]mina/i.test(label) || curto === 'L') return 'Lâmina';
      if(/regulamento/i.test(label) || curto === 'R') return 'Regulamento';
      if(/informa/i.test(label) || curto === 'IC') return 'Informe';
      if(/carteira/i.test(label) || curto === 'C') return 'Carteira';
      if(/comercial|boletim/i.test(label) || curto === 'CM') return 'Comercial';
      if(/termo|ades/i.test(label) || curto === 'TA') return 'Termo';
      return label || curto || 'Documento';
    };

    const links = secundarios.map(d => {
      const label = docLabelMobileV466(d);
      return `<a class="fund-card-doc-pill" href="${htmlAttr(d.url)}" target="_blank" rel="noopener" title="${htmlAttr(d.label || label)}">${htmlAttr(label)}</a>`;
    }).join('');

    return `<div class="fund-card-mobile-docs fund-card-mobile-docs-v236">
      <div class="fund-card-docs-head fund-card-docs-head-v236">
        <span class="fund-card-docs-title">Documentos oficiais</span>
      </div>
      <div class="fund-card-docs-list secundarios">${links}</div>
      ${pageBtn}
    </div>`;
  }

  function cdiRatioInfo(m12){
    const ratio = typeof calcCdiRatio === 'function' ? calcCdiRatio(toNum(m12), indicState?.cdi?.m12) : null;
    if(ratio === null || ratio === undefined || !Number.isFinite(Number(ratio))) return {txt:'—', cls:''};
    const cls = ratio >= 100 ? 'fund-cdi-ratio-good' : ratio >= 80 ? 'fund-cdi-ratio-mid' : 'fund-cdi-ratio-low';
    return {txt:`${ratio}% do CDI`, cls};
  }

  function pctClass(v){
    const n=toNum(v);
    return n>0?'pos':n<0?'neg':'';
  }
  function fmtDash(v){
    const s=String(v??'').trim();
    return s && s!=='-' && s!=='—' ? s : '—';
  }

  function fmtPctMobilePremium(v){
    const n=toNum(v);
    if(n===null || n===undefined || !Number.isFinite(Number(n))) return {txt:'—', cls:'zero'};
    const sign=n>0?'+':'';
    const txt=sign+n.toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2})+'%';
    return {txt, cls:n>0?'pos':n<0?'neg':'zero'};
  }

  function getCampoPrazoMobile(row, key){
    const v = String(row?.[key] || '').trim();
    return v && v !== '-' && v !== '—' ? v : 'Consultar';
  }

  function getCodigoFundoMobile(row){
    const keys = ['codfundo','Código SIART','Codigo SIART','SIART','Código SIICO','Codigo SIICO','SIICO','Código do Fundo','Codigo do Fundo','Cod Fundo','Cód. Fundo'];
    for(const k of keys){
      const v = String(row?.[k] || '').trim();
      if(v && v !== '-' && v !== '—') return v;
    }
    const cnpjLimpo = String(row?.['CNPJ'] || '').replace(/\D/g,'');
    const vJson = cnpjLimpo ? String(_fundosDocMap?.[cnpjLimpo]?.codfundo || '').trim() : '';
    return vJson || '';
  }

  function buildMobileFundCard(r,idx){
    const nome=fmtDash(r['Fundo']);
    const cat=fmtDash(r['Categoria']);
    const risco=fmtDash(r['Perfil de Risco']);
    const cota=fmtDash(r['Cota (R$)']);
    const diaInfo=fmtPctMobilePremium(r['Variacao Dia (%)']);
    const mesInfo=fmtPctMobilePremium(r['Acum. Mes (%)']);
    const anoInfo=fmtPctMobilePremium(r['Acum. Ano (%)']);
    const m12Info=fmtPctMobilePremium(r['Acum. 12M (%)']);
    const mes=fmtDash(r['Acum. Mes (%)']);
    const ano=fmtDash(r['Acum. Ano (%)']);
    const m12=fmtDash(r['Acum. 12M (%)']);
    const pl=fmtDash(r['PL (milhoes R$)']);
    const data=fmtDash(r['Data Inicio']||r['Data Início']||r['Data de Inicio']||r['Data de Início']);
    const cls=CAT_CLS[cat]||'RF';
    const url=getFundUrl(r);
    const ratioCdi = cdiRatioInfo(m12);
    const conversao = getCampoPrazoMobile(r,'Conversao Resgate');
    const pagamento = getCampoPrazoMobile(r,'Pagamento Resgate');
    const codigo = getCodigoFundoMobile(r);
    const bench = typeof detectarBenchmarkFundo === 'function' ? detectarBenchmarkFundo(r).label : '—';
    const docs = getMobileDocs(r);
    const boletim = docs.find(d => /boletim/i.test(String(d.label || '')) || String(d.csvKey || '') === 'doc_boletim');
    const boletimBtn = boletim
      ? `<a class="fund-card-boletim-quick-btn" href="${htmlAttr(boletim.url)}" target="_blank" rel="noopener">Boletim ↗</a>`
      : '';
    const docsHtml = buildMobileDocsHtml(r);
    return `<article class="fund-card-mobile fund-card-mobile-list fund-card-mobile-v26 fund-card-hierarchy-v444" data-card-idx="${idx}" data-idx="${idx}">
      <div class="fund-card-list-main fund-card-list-main-premium-v68">
        <div class="fund-card-list-left">
          <div class="fund-card-mobile-tags fund-card-list-tags">
            <span class="cat-badge cat-${cls}">${cat}</span>
            ${risco!=='—'?`<span class="perfil-chip pchip-TODOS">${risco}</span>`:''}
            ${codigo?`<span class="fund-code-chip">Cód. ${htmlAttr(codigo)}</span>`:''}
          </div>
          <div class="fund-card-mobile-name fund-card-list-name">${htmlAttr(nome)}</div>
        </div>
      </div>

      <div class="fund-card-performance-v68" aria-label="Rentabilidade do fundo">
        <div class="fund-card-performance-title-v68">Desempenho</div>
        <div class="fund-card-perf-short-v68">
          <span class="fund-card-perf-chip-v68"><small>Dia</small><strong class="${diaInfo.cls}">${diaInfo.txt}</strong></span>
          <span class="fund-card-perf-chip-v68"><small>Mês</small><strong class="${mesInfo.cls}">${mesInfo.txt}</strong></span>
          <span class="fund-card-perf-chip-v68"><small>Ano</small><strong class="${anoInfo.cls}">${anoInfo.txt}</strong></span>
        </div>
        <div class="fund-card-perf-highlight-v68">
          <span class="fund-card-perf-main-v68"><small>12 meses</small><strong class="${m12Info.cls}">${m12Info.txt}</strong></span>
          <span class="fund-card-perf-main-v68 cdi"><small>% CDI 12M</small><strong class="${ratioCdi.cls}">${ratioCdi.txt}</strong></span>
        </div>
      </div>

      <div class="fund-card-mobile-actions fund-card-list-actions fund-card-list-actions-v26">
        ${boletimBtn}
        <a class="fund-card-primary-btn fund-card-page-btn" href="${htmlAttr(url)}" target="_blank" rel="noopener">Página ↗</a>
        <button type="button" class="fund-card-detail-btn" data-card-idx="${idx}" aria-expanded="false">Detalhes</button>
      </div>

      <div class="fund-card-list-expanded" aria-hidden="true">
        <div class="fund-card-expanded-head">
          <strong>Detalhes do fundo</strong>
        </div>
        <div class="fund-card-mobile-body fund-detail-list-v468">
          <div class="fund-metric fund-detail-row-v468"><span class="fund-metric-label">Cota</span><span class="fund-metric-value">${cota}</span></div>
          <div class="fund-metric fund-detail-row-v468"><span class="fund-metric-label">Conversão</span><span class="fund-metric-value prazo-mobile">${htmlAttr(conversao)}</span></div>
          <div class="fund-metric fund-detail-row-v468"><span class="fund-metric-label">Pagamento</span><span class="fund-metric-value prazo-mobile">${htmlAttr(pagamento)}</span></div>
          <div class="fund-metric fund-detail-row-v468"><span class="fund-metric-label">Patrimônio mi</span><span class="fund-metric-value">${pl}</span></div>
          <div class="fund-metric fund-detail-row-v468"><span class="fund-metric-label">Início</span><span class="fund-metric-value">${data}</span></div>
        </div>
        ${typeof buildFundOperationalFacts==='function'?buildFundOperationalFacts(r,'mobile'):''}
        ${docsHtml}
        <div class="fund-card-mobile-detail">${typeof gerarLeituraRapidaFundo==='function'?gerarLeituraRapidaFundo(r):''}</div>
      </div>
    </article>`;
  }

  window.renderMobileFundCards=function(){
    const box=qs('#mobileFundCards');
    if(!box) return;
    if(typeof filtered==='undefined' || !Array.isArray(filtered)){box.innerHTML='';return;}
    const start=(currentPage-1)*perPage;
    const end=perPage===9999?filtered.length:Math.min(start+perPage,filtered.length);
    const rows=filtered.slice(start,end);
    if(!rows.length){box.innerHTML='<div class="rank-empty">Nenhum fundo encontrado.</div>';return;}
    box.innerHTML=rows.map((r,i)=>buildMobileFundCard(r,start+i)).join('');
    qsa('.fund-card-detail-btn',box).forEach(btn=>{
      btn.addEventListener('click',(ev)=>{
        ev.preventDefault();
        ev.stopPropagation();
        const card=btn.closest('.fund-card-mobile');
        if(!card) return;
        const open=card.classList.toggle('open');
        const expanded=card.querySelector('.fund-card-list-expanded');
        if(expanded) expanded.setAttribute('aria-hidden', open?'false':'true');
        btn.textContent=open?'Ocultar':'Detalhes';
        btn.setAttribute('aria-expanded', open?'true':'false');
        try{
          const key=fundKeyFromIdx(btn.dataset.cardIdx || card.dataset.idx);
          if(open) openCards.add(key); else openCards.delete(key);
        }catch(e){}
      });
    });
  }

  function applyViewMode(mode){
    const finalMode=mode || localStorage.getItem('fundMobileView') || (isMobile()?'cards':'table');
    document.body.classList.toggle('fund-card-mode', finalMode==='cards');
    qsa('.mobile-view-btn').forEach(b=>b.classList.toggle('active',b.dataset.view===finalMode));
    localStorage.setItem('fundMobileView',finalMode);
    if(typeof window.renderMobileFundCards==='function') window.renderMobileFundCards();
  }

  function filterCssEscape(v){
    return (window.CSS && CSS.escape) ? CSS.escape(String(v||'')) : String(v||'').replace(/"/g,'\"');
  }

  function getActiveFilterParts(){
    const parts=[];
    if(typeof activeCat!=='undefined' && activeCat) parts.push({kind:'cat', label:'Categoria', value:activeCat});
    if(typeof activeBenchmark!=='undefined' && activeBenchmark) parts.push({kind:'benchmark', label:'Benchmark', value:activeBenchmark});
    if(typeof activePerfil!=='undefined' && activePerfil) parts.push({kind:'perfil', label:'Perfil', value:activePerfil});
    if(typeof activeRisco!=='undefined' && activeRisco) parts.push({kind:'risco', label:'Risco', value:activeRisco});
    if(typeof hideSemDados!=='undefined' && hideSemDados) parts.push({kind:'semDados', label:'Base', value:'sem pipeline'});
    return parts;
  }

  function activateFilterChip(rowSelector, attr, value){
    const row=qs(rowSelector);
    if(!row) return;
    row.querySelectorAll(`[${attr}]`).forEach(b=>b.classList.remove('active'));
    const target=row.querySelector(`[${attr}="${filterCssEscape(value||'')}"]`) || row.querySelector(`[${attr}=""]`);
    if(target) target.classList.add('active');
  }

  function syncFilterControls(){
    try{ activateFilterChip('#catFilters','data-cat',activeCat||''); }catch(e){}
    try{ activateFilterChip('#benchmarkFilters','data-benchmark',activeBenchmark||''); }catch(e){}
    try{ activateFilterChip('#perfilFilters','data-perfil',activePerfil||''); }catch(e){}
    try{ activateFilterChip('#riscoFilters','data-risco',activeRisco||''); }catch(e){}
    const chk=qs('#toggleSemDados');
    if(chk) chk.checked=!!hideSemDados;
    try{ syncRiskProfileControlsV198(); }catch(e){}
  }

  function setFilterPanelOpen(open){
    const sec=qs('#fundFilterDrawer') || qs('.filter-section');
    const btn=qs('#mobileFilterToggle');
    const backdrop=qs('#filterBackdrop');
    const label=qs('#filterButtonText');
    if(!sec) return;
    const willOpen=!!open;
    const isMobile = window.matchMedia && window.matchMedia('(max-width: 820px)').matches;
    sec.classList.toggle('mobile-filters-collapsed', !willOpen);
    sec.classList.toggle('desktop-filters-collapsed', !willOpen);

    // No desktop, o painel fica como gaveta leve e não bloqueia/embaça a tabela.
    // No mobile, mantém o comportamento de bottom sheet com fundo escurecido.
    document.body.classList.toggle('filter-sheet-open', willOpen && isMobile);
    if(backdrop) backdrop.classList.toggle('active', willOpen && isMobile);

    if(btn) btn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    if(label) label.textContent=willOpen ? 'Fechar filtros' : 'Refinar filtros';
  }

  function clearFilter(kind){
    if(kind==='cat') activeCat='';
    if(kind==='benchmark') activeBenchmark='';
    if(kind==='perfil') activePerfil='';
    if(kind==='risco') activeRisco='';
    if(kind==='semDados') hideSemDados=false;
    syncFilterControls();
    if(typeof applyFilter==='function') applyFilter();
  }

  function clearAllFilters(){
    try{ activeCat=''; activeBenchmark=''; activePerfil=''; activeRisco=''; hideSemDados=false; }catch(e){}
    syncFilterControls();
    if(typeof applyFilter==='function') applyFilter();
  }

  function applyFilterPreset(preset){
    if(!preset || preset==='all'){
      clearAllFilters();
      return;
    }
  if(preset==='pf') activePerfil='PF';
  if(preset==='cdi') activeBenchmark='CDI';
  if(preset==='ipca') activeBenchmark='IPCA';
  if(preset==='conservador') activeRisco='Conservador';
  if(preset==='renda-fixa-simples') activeCat='RENDA FIXA SIMPLES';
  if(preset==='renda-fixa') activeCat='RENDA FIXA';
  if(preset==='renda-fixa-referenciado') activeCat='RENDA FIXA REFERENCIADO';
  if(preset==='renda-fixa-curto-prazo') activeCat='RENDA FIXA CURTO PRAZO';
  if(preset==='multimercado') activeCat='MULTIMERCADO';
  if(preset==='cambial') activeCat='CAMBIAL';
  if(preset==='acoes') activeCat='ACOES';
  if(preset==='fundo-de-indice') activeCat='FUNDO DE INDICE';
  if(preset==='fmp') activeCat='FUNDOS MUTUOS DE PRIVATIZACAO';
  syncFilterControls();
  if(typeof applyFilter==='function') applyFilter();
}

  function updatePresetStates(){
    const cat=typeof activeCat!=='undefined' ? activeCat : '';
    const bench=typeof activeBenchmark!=='undefined' ? activeBenchmark : '';
    const risco=typeof activeRisco!=='undefined' ? activeRisco : '';
    const perfil=typeof activePerfil!=='undefined' ? activePerfil : '';
    const semDados=typeof hideSemDados!=='undefined' ? !!hideSemDados : false;

    const presetByCat = {
      'renda-fixa-simples':'RENDA FIXA SIMPLES',
      'renda-fixa':'RENDA FIXA',
      'renda-fixa-referenciado':'RENDA FIXA REFERENCIADO',
      'renda-fixa-curto-prazo':'RENDA FIXA CURTO PRAZO',
      'multimercado':'MULTIMERCADO',
      'cambial':'CAMBIAL',
      'acoes':'ACOES',
      'fundo-de-indice':'FUNDO DE INDICE',
      'fmp':'FUNDOS MUTUOS DE PRIVATIZACAO'
    };

    qsa('.filter-preset-chip').forEach(btn=>{
      const p=btn.dataset.preset;
      let on=false;
      if(p==='all') on=!cat&&!bench&&!risco&&!perfil&&!semDados;
      if(p==='cdi') on=bench==='CDI';
      if(p==='ipca') on=bench==='IPCA';
      if(p==='conservador') on=risco==='Conservador';
      if(p==='pf') on=perfil==='PF';
      if(presetByCat[p]) on=cat===presetByCat[p];
      btn.classList.toggle('active', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });

    const status=qs('#categoryGridStatus');
    if(status){
      const labelMap={
        'RENDA FIXA SIMPLES':'RF Simples',
        'RENDA FIXA':'Renda Fixa',
        'RENDA FIXA REFERENCIADO':'RF Referenciado',
        'RENDA FIXA CURTO PRAZO':'RF Curto Prazo',
        'MULTIMERCADO':'Multimercado',
        'CAMBIAL':'Cambial',
        'ACOES':'Ações',
        'FUNDO DE INDICE':'Fundo de Índice',
        'FUNDOS MUTUOS DE PRIVATIZACAO':'FMP / Privatização'
      };
      status.textContent = cat ? ('Categoria: '+(labelMap[cat] || cat)) : 'Todos os fundos';
    }
  }

  function updateMobileFilterSummary(){
    const parts=getActiveFilterParts();
    const el=qs('#mobileFilterSummary');
    if(el) el.textContent='Filtros: '+(parts.length?parts.map(p=>p.value).join(' · '):'todos');

    const count=qs('#filterActiveCount');
    if(count){
      count.textContent=String(parts.length);
      count.classList.toggle('has-active', parts.length>0);
    }

    const strip=qs('#activeFilterStrip');
    if(strip){
      if(!parts.length){
        strip.innerHTML='';
        strip.classList.remove('active');
      }else{
        strip.classList.add('active');
        strip.innerHTML=`<span class="active-filter-label">Filtros ativos</span>`+
          parts.map(p=>`<button type="button" class="active-filter-pill" data-clear-filter="${p.kind}"><small>${p.label}</small>${p.value}<span>×</span></button>`).join('')+
          `<button type="button" class="active-filter-clear" data-clear-filter="all">Limpar tudo</button>`;
      }
    }

    const applyBtn=qs('#filterApplyBtn');
    if(applyBtn){
      applyBtn.textContent='Fechar';
      const n=(typeof filtered!=='undefined' && Array.isArray(filtered)) ? filtered.length :
              (typeof allRows!=='undefined' && Array.isArray(allRows) ? allRows.length : null);
      if(n!==null) applyBtn.setAttribute('title', `${n} fundos no resultado atual`);
    }
    if(typeof updateFundResultSummary==='function') updateFundResultSummary();
    updatePresetStates();
  }

  function setupAdvancedFilterAccordion(){
    const items=qsa('#fundFilterDrawer .filter-group-accordion');
    if(!items.length) return;
    items.forEach(details=>{
      if(details.dataset.accordionReady==='1') return;
      details.dataset.accordionReady='1';
      details.addEventListener('toggle',()=>{
        if(!details.open) return;
        items.forEach(other=>{ if(other!==details) other.open=false; });
      });
    });
  }

  function setupMobileFilters(){
    const btn=qs('#mobileFilterToggle');
    const sec=qs('#fundFilterDrawer') || qs('.filter-section');
    if(!btn||!sec) return;
    sec.dataset.resizeGuard='1';

    setFilterPanelOpen(false);

    btn.addEventListener('click',()=>{
      const isOpen=!sec.classList.contains('mobile-filters-collapsed') || !sec.classList.contains('desktop-filters-collapsed');
      setFilterPanelOpen(!isOpen);
    });

    qs('#filterCloseBtn')?.addEventListener('click',()=>setFilterPanelOpen(false));
    qs('#filterBackdrop')?.addEventListener('click',()=>setFilterPanelOpen(false));
    qs('#filterApplyBtn')?.addEventListener('click',()=>setFilterPanelOpen(false));
    qs('#clearFiltersBtn')?.addEventListener('click',clearAllFilters);
    qs('#clearFiltersTop')?.addEventListener('click',clearAllFilters);

    qs('#activeFilterStrip')?.addEventListener('click',e=>{
      const b=e.target.closest('[data-clear-filter]');
      if(!b) return;
      const kind=b.dataset.clearFilter;
      if(kind==='all') clearAllFilters(); else clearFilter(kind);
    });

    qsa('.filter-preset-chip').forEach(b=>b.addEventListener('click',()=>applyFilterPreset(b.dataset.preset)));
    setupAdvancedFilterAccordion();

    document.addEventListener('keydown',e=>{
      if(e.key==='Escape') setFilterPanelOpen(false);
    });

    sec.addEventListener('click',e=>{
      if(e.target.closest('.chip')) setTimeout(updateMobileFilterSummary,70);
    });
    qs('#toggleSemDados')?.addEventListener('change',()=>setTimeout(updateMobileFilterSummary,70));
    syncFilterControls();
    updateMobileFilterSummary();
  }

  function setupBottomNav(){
    qsa('.mobile-bottom-nav a').forEach(a=>{
      a.addEventListener('click',ev=>{
        const id=a.getAttribute('href').slice(1);
        const target=document.getElementById(id);
        if(target){
          ev.preventDefault();
          target.scrollIntoView({behavior:'smooth',block:'start'});
          history.replaceState(null,'','#'+id);
        }
      });
    });
    // v20: nova ordem — fundos e rankings antes do mercado macro
    const ids=['topo','sec-fundos','rankingsSection','sec-mercado','sec-dolar','sec-focus'];
    const obs=new IntersectionObserver(entries=>{
      entries.forEach(en=>{
        if(en.isIntersecting){
          qsa('.mobile-bottom-nav a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+en.target.id));
        }
      });
    },{rootMargin:'-35% 0px -55% 0px',threshold:0.01});
    ids.forEach(id=>{const el=document.getElementById(id);if(el) obs.observe(el);});
  }

  document.addEventListener('DOMContentLoaded',()=>{
    setSectionIds();
    setupMobileFilters();
    setupBottomNav();
    setupMobileSortToolbar();
    qsa('.mobile-view-btn').forEach(b=>b.addEventListener('click',()=>applyViewMode(b.dataset.view)));
    applyViewMode();
    updateMobileFilterSummary();
  });

  try{
    const originalRender=render;
    render=function(){
      originalRender();
      if(typeof window.renderMobileFundCards==='function') window.renderMobileFundCards();
      updateMobileFilterSummary();
    };
  }catch(e){console.warn('Não foi possível acoplar renderização mobile:',e);}

  window.addEventListener('resize',()=>applyViewMode(localStorage.getItem('fundMobileView')));
})();
(function(){
  'use strict';

  /* ════════════════════════════════════════════
     UTILITÁRIOS FAVORITOS
  ════════════════════════════════════════════ */
  const FAV_KEY='fundos_favoritos_v1';
  function getFavs(){ try{return new Set(JSON.parse(localStorage.getItem(FAV_KEY)||'[]'));}catch{return new Set();} }
  function saveFavs(s){ localStorage.setItem(FAV_KEY,JSON.stringify([...s])); }
  function getFundKey(r){ return (r['CNPJ']||r['Fundo']||'').replace(/\D/g,'').slice(0,20)||JSON.stringify(r).slice(0,40); }
  function showToast(msg){ const t=document.getElementById('elton-fav-toast');if(!t)return;t.textContent=msg;t.classList.add('show');clearTimeout(t._tid);t._tid=setTimeout(()=>t.classList.remove('show'),1800); }
  function toggleFavRow(key,btn,el){ const f=getFavs();if(f.has(key)){f.delete(key);showToast('Removido dos favoritos');btn.textContent='☆';btn.classList.remove('is-fav');el?.classList.remove('row-fav','card-fav');}else{f.add(key);showToast('⭐ Adicionado aos favoritos');btn.textContent='⭐';btn.classList.add('is-fav');el?.classList.add('row-fav','card-fav');}saveFavs(f);updateFavChip(); }
  function updateFavChip(){ const c=document.querySelector('.fav-chip');if(!c)return;const n=getFavs().size;let ct=c.querySelector('.fav-count');if(n>0){if(!ct){ct=document.createElement('span');ct.className='fav-count';c.appendChild(ct);}ct.textContent=n;}else if(ct)ct.remove(); }

  /* ════════════════════════════════════════════
     BARRA GLOBAL — LÓGICA
  ════════════════════════════════════════════ */
  let _gfbInit=false;
  let _currentGcat=''; // categoria ativa na barra global

  let _gfbScrollTimer=null;
  function scrollToFunds(){
    const sec=document.getElementById('sec-fundos');
    if(!sec) return;
    const top=sec.getBoundingClientRect().top+window.scrollY-60;
    window.scrollTo({top:Math.max(0,top),behavior:'smooth'});
  }
  function scheduleScrollToFunds(delay){
    clearTimeout(_gfbScrollTimer);
    _gfbScrollTimer=setTimeout(scrollToFunds, typeof delay==='number' ? delay : 220);
  }

  function setGlobalCat(cat, skipApply){
    _currentGcat=cat;
    // Sincroniza com o chip existente em #catFilters
    const catRow=document.getElementById('catFilters');
    if(catRow){
      const target=catRow.querySelector(`[data-cat="${cat}"]`);
      if(target) target.click();
      else if(cat==='') { const all=catRow.querySelector('[data-cat=""]'); if(all) all.click(); }
    } else {
      // catFilters ainda não foi construído — seta diretamente
      if(typeof activeCat!=='undefined') window.activeCat=cat;
      if(!skipApply && typeof applyFilter==='function') applyFilter();
    }
    // Atualiza visual dos chips globais
    document.querySelectorAll('.gfb-chip').forEach(c=>c.classList.toggle('gfb-chip-active',c.dataset.gcat===cat));
  }

  function updateGfbCount(){
    const el=document.getElementById('gfbCount');
    if(!el) return;
    const n=(typeof filtered!=='undefined'&&Array.isArray(filtered))?filtered.length:
            (typeof allRows!=='undefined'&&Array.isArray(allRows))?allRows.length:null;
    el.innerHTML = n!==null ? `<strong>${n}</strong> <span>fundo${n===1?'':'s'}</span>` : '—';
  }

  function initGlobalBar(){
    if(_gfbInit) return; _gfbInit=true;

    const inp=document.getElementById('gfbSearch');
    const existing=document.getElementById('searchInput');
    const clearBtn=document.getElementById('gfbClear');
    const goBtn=document.getElementById('gfbGo');

    /* Busca: global → existente */
    inp?.addEventListener('input',e=>{
      const v=e.target.value;
      if(clearBtn) clearBtn.classList.toggle('visible',v.length>0);
      if(existing && existing.value!==v){
        existing.value=v;
        existing.dispatchEvent(new Event('input'));
      }
      if(String(v||'').trim().length>=2 && typeof ativarTabelaAoBuscar==='function') ativarTabelaAoBuscar();
      // v49: a busca global ainda conduz até Fundos, mas com debounce para não "quicar" a tela a cada letra.
      if(String(v||'').trim().length>=2) scheduleScrollToFunds(240);
    });

    /* Busca: existente → global (sincroniza quando outro input muda) */
    existing?.addEventListener('input',e=>{
      if(inp && inp!==document.activeElement && inp.value!==e.target.value) inp.value=e.target.value;
      if(clearBtn) clearBtn.classList.toggle('visible',(e.target.value||'').length>0);
    });

    clearBtn?.addEventListener('click',()=>{
      if(inp){ inp.value=''; clearBtn.classList.remove('visible'); inp.dispatchEvent(new Event('input')); }
    });

    goBtn?.addEventListener('click',scrollToFunds);

    /* Chips de categoria */
    document.querySelectorAll('.gfb-chip').forEach(btn=>{
      btn.addEventListener('click',()=>{
        setGlobalCat(btn.dataset.gcat);
        scrollToFunds();
      });
    });

    /* Sincroniza chips globais quando o usuário muda filtro localmente */
    document.getElementById('catFilters')?.addEventListener('click',e=>{
      const b=e.target.closest('[data-cat]'); if(!b) return;
      const cat=b.dataset.cat||'';
      if(cat!==_currentGcat){
        _currentGcat=cat;
        document.querySelectorAll('.gfb-chip').forEach(c=>c.classList.toggle('gfb-chip-active',c.dataset.gcat===cat));
      }
    });

    updateGfbCount();
  }

  /* ════════════════════════════════════════════
     PATCH applyFilter — CDI sort fix + favoritos + atualiza contagem
  ════════════════════════════════════════════ */
  let onlyFavs=false;

  function addFavChip(){
    const row=document.getElementById('catFilters'); if(!row||row.querySelector('.fav-chip')) return;
    const btn=document.createElement('button');
    btn.className='chip fav-chip'; btn.innerHTML='⭐ Favoritos';
    btn.addEventListener('click',()=>{ onlyFavs=!onlyFavs; btn.classList.toggle('active',onlyFavs); if(typeof applyFilter==='function') applyFilter(); });
    const first=row.querySelector('[data-cat=""]');
    first?.nextSibling ? row.insertBefore(btn,first.nextSibling) : row.appendChild(btn);
    updateFavChip();
  }

  function patchApplyFilter(){
    if(typeof applyFilter!=='function') return;
    const orig=applyFilter;
    window.applyFilter=function(){
      orig.apply(this,arguments);

      /* Fix sort coluna virtual % CDI 12M (não está em displayHeaders → indexOf=-1 → sortCol=-1 → sem sort) */
      const cdiTh=document.querySelector('#mainTable thead th.sa, #mainTable thead th.sd');
      if(cdiTh && cdiTh.textContent.includes('% CDI 12M') && typeof filtered!=='undefined' && Array.isArray(filtered)){
        const dir=cdiTh.classList.contains('sa')?1:-1;
        const cdi12=(typeof indicState!=='undefined'&&indicState.cdi)?indicState.cdi.m12:null;
        const tn=typeof toNum==='function'?toNum:v=>parseFloat(String(v||'').replace(',','.'));
        filtered.sort((a,b)=>{
          let av,bv;
          if(cdi12 && typeof calcCdiRatio==='function'){ av=calcCdiRatio(tn(a['Acum. 12M (%)']),cdi12); bv=calcCdiRatio(tn(b['Acum. 12M (%)']),cdi12); }
          else{ av=tn(a['Acum. 12M (%)']); bv=tn(b['Acum. 12M (%)']); }
          if(av===null&&bv===null) return 0; if(av===null) return 1; if(bv===null) return -1;
          return dir===1?av-bv:bv-av;
        });
        if(typeof currentPage!=='undefined') currentPage=1;
        if(typeof expandedRows!=='undefined') expandedRows.clear();
        if(typeof render==='function') render();
      }

      /* Favoritos
         v66: favorito NÃO altera mais a ordenação da lista geral.
         Antes, qualquer fundo favoritado era jogado para o topo depois da ordenação,
         o que fazia o CAIXA FIC FIF INDEXA DOLAR CAMBIAL parecer "preso".
         Agora: Favoritos clicado => filtra favoritos; Todos => ordena normalmente. */
      if(typeof filtered==='undefined') return;
      const favs=getFavs();
      if(onlyFavs){
        filtered=filtered.filter(r=>{
          try{ return typeof rowIsFavoritedForFilter==='function' ? rowIsFavoritedForFilter(r) : favs.has(getFundKey(r)); }
          catch(e){ return favs.has(getFundKey(r)); }
        });
        if(typeof render==='function') render();
      }

      /* Atualiza contador na barra global */
      updateGfbCount();
    };
  }

  /* ════════════════════════════════════════════
     PATCH buildRowHTML — botão ⭐ na tabela
  ════════════════════════════════════════════ */
  function patchBuildRow(){
    if(typeof buildRowHTML!=='function') return;
    const orig=buildRowHTML;
    window.buildRowHTML=function(row,idx){
      let html=orig.apply(this,arguments);
      const key=getFundKey(row); const isFav=getFavs().has(key);
      const star=`<button class="fav-btn${isFav?' is-fav':''}" data-fk="${key}" title="Favorito">${isFav?'⭐':'☆'}</button>`;
      html=html.replace(/(<td[^>]*style="width:28px[^"]*"[^>]*>)([\s\S]*?)(<\/td>)/,`$1$2${star}$3`);
      if(isFav) html=html.replace(/^<tr/,'<tr class="row-fav"');
      return html;
    };
  }

  function patchRender(){
    if(typeof render!=='function') return;
    const orig=render;
    window.render=function(){
      orig.apply(this,arguments);
      document.querySelectorAll('#tableBody .fav-btn').forEach(btn=>{
        btn.onclick=e=>{ e.stopPropagation(); toggleFavRow(btn.dataset.fk,btn,btn.closest('tr')); };
      });
      updateGfbCount();
    };
  }

  /* ════════════════════════════════════════════
     CARDS MOBILE — botão ⭐
  ════════════════════════════════════════════ */
  function injectFavBtnsCards(){
    // v27: no mobile, removemos o botão de favorito do card para limpar a interface.
    // A gestão de favoritos permanece no desktop/barra global, mas o card compacto não exibe estrela.
    document.querySelectorAll('#mobileFundCards .fav-btn-mobile').forEach(btn=>btn.remove());
    document.querySelectorAll('#mobileFundCards .fund-card-mobile').forEach(card=>{
      card.classList.remove('card-fav');
    });
  }

  function patchMobileRender(){
    if(typeof window.renderMobileFundCards!=='function') return;
    const orig=window.renderMobileFundCards;
    window.renderMobileFundCards=function(){ orig.apply(this,arguments); injectFavBtnsCards(); updateGfbCount(); };
  }

  /* ════════════════════════════════════════════
     INIT
  ════════════════════════════════════════════ */
  function init(){
    initGlobalBar();
    addFavChip();
    patchBuildRow();
    patchRender();
    patchApplyFilter();
    patchMobileRender();
    new MutationObserver(()=>injectFavBtnsCards())
      .observe(document.getElementById('mobileFundCards')||document.body,{childList:true,subtree:!document.getElementById('mobileFundCards')});
    updateGfbCount();
  }

  const d=document.readyState==='loading';
  if(d) document.addEventListener('DOMContentLoaded',()=>setTimeout(init,400));
  else setTimeout(init,400);

})();
(function(){
  'use strict';

  function isMobileQuick(){ return window.matchMedia && window.matchMedia('(max-width: 820px)').matches; }

  function safeClick(el){ if(el && typeof el.click === 'function') el.click(); }

  function scrollFundsQuick(){
    const sec=document.getElementById('sec-fundos');
    if(!sec) return;
    const offset=isMobileQuick()?116:64;
    const top=sec.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({top:Math.max(0,top),behavior:'smooth'});
  }

  function setMobileCardsMode(){
    if(!isMobileQuick()) return;
    const cardsBtn=document.querySelector('.mobile-view-btn[data-view="cards"]');
    safeClick(cardsBtn);
    document.body.classList.add('fund-card-mode');
    try{ localStorage.setItem('fundMobileView','cards'); }catch(e){}
    document.querySelectorAll('.mobile-bottom-nav a').forEach(a=>{
      a.classList.toggle('active',a.getAttribute('href')==='#sec-fundos');
    });
  }

  function setMobileTableMode(){
    if(!isMobileQuick()) return;
    const tableBtn=document.querySelector('.mobile-view-btn[data-view="table"]');
    safeClick(tableBtn);
    document.body.classList.remove('fund-card-mode');
    try{ localStorage.setItem('fundMobileView','table'); }catch(e){}
  }

  function clickLocalFilter(selector, fallback){
    const el=document.querySelector(selector);
    if(el){ safeClick(el); return true; }
    if(typeof fallback === 'function') fallback();
    return false;
  }

  function applyQuickFilter(btn){
    const isAll=btn.dataset.gquick==='all';
    const cat=btn.dataset.gcat;
    const bench=btn.dataset.gbench;

    if(isAll){
      clickLocalFilter('#catFilters [data-cat=""]',()=>{ try{ activeCat=''; }catch(e){} });
      clickLocalFilter('#benchmarkFilters [data-benchmark=""]',()=>{ try{ activeBenchmark=''; }catch(e){} });
      try{ if(typeof applyFilter==='function') applyFilter(); }catch(e){}
    }else if(typeof cat !== 'undefined'){
      clickLocalFilter(`#catFilters [data-cat="${CSS.escape(cat)}"]`,()=>{ try{ activeCat=cat; if(typeof applyFilter==='function') applyFilter(); }catch(e){} });
    }else if(typeof bench !== 'undefined'){
      clickLocalFilter(`#benchmarkFilters [data-benchmark="${CSS.escape(bench)}"]`,()=>{ try{ activeBenchmark=bench; if(typeof applyFilter==='function') applyFilter(); }catch(e){} });
    }

    setMobileCardsMode();
    updateQuickHeaderActive();
    updateQuickCount();
    setTimeout(scrollFundsQuick,80);
  }

  function updateQuickHeaderActive(){
    let cat='', bench='';
    try{ cat=activeCat||''; }catch(e){}
    try{ bench=activeBenchmark||''; }catch(e){}
    document.querySelectorAll('#gfb-chips .gfb-chip').forEach(c=>{
      const active = (c.dataset.gquick==='all' && !cat && !bench) ||
        (typeof c.dataset.gcat !== 'undefined' && c.dataset.gcat===cat && !bench) ||
        (typeof c.dataset.gbench !== 'undefined' && c.dataset.gbench===bench);
      c.classList.toggle('gfb-chip-active',active);
    });
  }

  function updateQuickCount(){
    const el=document.getElementById('gfbCount');
    if(!el) return;
    let base=null, n=null;
    try{ if(Array.isArray(allRows)) base=allRows.length; }catch(e){}
    try{ if(Array.isArray(filtered)) n=filtered.length; }catch(e){}
    if(!base){ el.innerHTML='<strong>—</strong> <span>fundos</span>'; return; }
    if(n===null) n=base;
    el.innerHTML=`<strong>${n}</strong> <span>fundo${n===1?'':'s'}</span>`;
  }

  function syncQuickGoLabel(){
    const go=document.getElementById('gfbGo');
    if(!go) return;
    if(!isMobileQuick()){ go.textContent='Ver tabela ↓'; return; }
    go.textContent=document.body.classList.contains('fund-card-mode')?'Tabela ↓':'Cards ↓';
  }

  function setupQuickHeader(){
    const chips=document.getElementById('gfb-chips');
    if(chips && !chips.dataset.quickPatch){
      chips.dataset.quickPatch='1';
      chips.addEventListener('click',ev=>{
        const btn=ev.target.closest('.gfb-chip');
        if(!btn) return;
        ev.preventDefault();
        ev.stopPropagation();
        if(ev.stopImmediatePropagation) ev.stopImmediatePropagation();
        applyQuickFilter(btn);
      },true);
    }

    const go=document.getElementById('gfbGo');
    if(go && !go.dataset.quickPatch){
      go.dataset.quickPatch='1';
      go.addEventListener('click',ev=>{
        if(!isMobileQuick()) return;
        ev.preventDefault();
        ev.stopPropagation();
        if(ev.stopImmediatePropagation) ev.stopImmediatePropagation();
        if(document.body.classList.contains('fund-card-mode')) setMobileTableMode(); else setMobileCardsMode();
        syncQuickGoLabel();
        setTimeout(scrollFundsQuick,60);
      },true);
    }

    const inp=document.getElementById('gfbSearch');
    if(inp && !inp.dataset.quickPatch){
      inp.dataset.quickPatch='1';
      const setPh=()=>{ inp.placeholder=isMobileQuick()?'Buscar fundo, CNPJ...':'Buscar fundo, CNPJ, benchmark...'; };
      setPh();
      window.addEventListener('resize',setPh,{passive:true});
      inp.addEventListener('focus',()=>{ if(isMobileQuick()) setMobileCardsMode(); },{passive:true});
    }

    updateQuickHeaderActive();
    updateQuickCount();
    syncQuickGoLabel();
  }

  /* Mantém detalhe aberto em cards mobile mesmo quando render() reconstrói os cards */
  const openCards=new Set();
  function fundKeyFromIdx(idx){
    try{
      const row=Array.isArray(filtered)?filtered[Number(idx)]:null;
      if(!row) return String(idx);
      if(typeof getFundKey==='function') return getFundKey(row);
      return String(row.CNPJ || row.Fundo || idx);
    }catch(e){ return String(idx); }
  }
  function restoreOpenCards(){
    document.querySelectorAll('.fund-card-mobile[data-idx]').forEach(card=>{
      const idx=card.dataset.idx;
      const key=fundKeyFromIdx(idx);
      const should=openCards.has(key);
      card.classList.toggle('open',should);
      const expanded=card.querySelector('.fund-card-list-expanded');
      if(expanded) expanded.setAttribute('aria-hidden', should?'false':'true');
      const btn=card.querySelector('.fund-card-detail-btn');
      if(btn){
        btn.textContent=should?'Ocultar':'Detalhes';
        btn.setAttribute('aria-expanded', should?'true':'false');
      }
    });
    updateQuickCount();
    updateQuickHeaderActive();
    syncQuickGoLabel();
  }
  function setupPersistentDetails(){
    const box=document.getElementById('mobileFundCards');
    if(!box || box.dataset.persistentDetails) return;
    box.dataset.persistentDetails='1';
    box.addEventListener('click',ev=>{
      const detailBtn=ev.target.closest('.fund-card-detail-btn');
      const closeBtn=ev.target.closest('.fund-card-close-details');
      const btn=detailBtn || closeBtn;
      if(!btn) return;
      ev.preventDefault();
      ev.stopPropagation();
      if(ev.stopImmediatePropagation) ev.stopImmediatePropagation();
      const card=btn.closest('.fund-card-mobile');
      if(!card) return;
      const mainBtn=card.querySelector('.fund-card-detail-btn');
      const key=fundKeyFromIdx(btn.dataset.cardIdx || card.dataset.idx);
      const open=detailBtn ? !card.classList.contains('open') : false;
      card.classList.toggle('open',open);
      const expanded=card.querySelector('.fund-card-list-expanded');
      if(expanded) expanded.setAttribute('aria-hidden', open?'false':'true');
      if(mainBtn){
        mainBtn.textContent=open?'Ocultar':'Detalhes';
        mainBtn.setAttribute('aria-expanded', open?'true':'false');
      }
      if(open) openCards.add(key); else openCards.delete(key);
    },true);
    new MutationObserver(()=>restoreOpenCards()).observe(box,{childList:true,subtree:false});
  }

  /* Evita que resize do navegador mobile feche os filtros quando o usuário abriu manualmente */
  function setupFilterResizeGuard(){
    const btn=document.getElementById('mobileFilterToggle');
    const sec=document.querySelector('.filter-section');
    if(!btn || !sec || sec.dataset.resizeGuard) return;
    sec.dataset.resizeGuard='1';
    let userOpen=!sec.classList.contains('mobile-filters-collapsed');
    btn.addEventListener('click',()=>{ setTimeout(()=>{ userOpen=!sec.classList.contains('mobile-filters-collapsed'); },0); },true);
    window.addEventListener('resize',()=>{
      if(!isMobileQuick()) return;
      setTimeout(()=>{
        if(userOpen){ sec.classList.remove('mobile-filters-collapsed'); btn.textContent='✓ Ocultar filtros'; }
      },30);
    },{passive:true});
  }

  function patchRenderAgain(){
    try{
      if(typeof render==='function' && !render.__quickHeaderPatched){
        const original=render;
        render=function(){
          const r=original.apply(this,arguments);
          setTimeout(()=>{restoreOpenCards();updateQuickCount();updateQuickHeaderActive();syncQuickGoLabel();},0);
          return r;
        };
        render.__quickHeaderPatched=true;
      }
    }catch(e){}
  }

  function init(){
    setupQuickHeader();
    setupPersistentDetails();
    setupFilterResizeGuard();
    patchRenderAgain();
    setTimeout(()=>{restoreOpenCards();updateQuickCount();updateQuickHeaderActive();syncQuickGoLabel();},450);
    setInterval(()=>{updateQuickCount();syncQuickGoLabel();},1800);
  }



  window.__eltonDiagnosticarAtalhos=function(){
    const atalhos=[...document.querySelectorAll('.shortcut-preset[data-preset], .filter-preset-chip[data-preset]')];
    const out={
      buildIndex:document.querySelector('meta[name="app-build"]')?.content,
      buildAtalhos:window.__ELTAUM_SHORTCUT_FILTERS_BUILD__,
      presetAtivo:window.__ELTAUM_ACTIVE_SHORTCUT_PRESET__,
      qtdBotoes:atalhos.length,
      filteredQtd:Array.isArray(filtered)?filtered.length:null,
      allRowsQtd:Array.isArray(allRows)?allRows.length:null,
      botoes:atalhos.map(b=>({texto:b.textContent.trim(),preset:b.dataset.preset,classe:b.className,aria:b.getAttribute('aria-pressed')}))
    };
    console.table(out.botoes);
    console.log('[Diagnóstico atalhos]',out);
    return out;
  };

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init);
  else init();
})();
(function(){
  'use strict';

  function $(id){return document.getElementById(id);}
  function isMobile(){return window.matchMedia && window.matchMedia('(max-width: 820px)').matches;}
  function normText(v){
    return String(v||'')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g,'')
      .replace(/\s+/g,' ')
      .trim()
      .toUpperCase();
  }
  function cleanCnpj(v){return String(v||'').replace(/\D/g,'');}
  function rowKey(row){
    const c=cleanCnpj(row && row['CNPJ']);
    if(c) return 'cnpj:'+c;
    return 'nome:'+normText(row && row['Fundo']);
  }
  function sameRow(a,b){return rowKey(a)===rowKey(b);}
  function numKpi(v){
    try{
      if(typeof toNum==='function') return toNum(v);
    }catch(e){}
    const s=String(v||'').trim();
    if(!s || s==='—' || s==='-') return null;
    const n=parseFloat(s.replace('%','').replace(/\s/g,'').replace(/\./g,'').replace(',','.'));
    return Number.isFinite(n)?n:null;
  }

  function bestWorstRow(kind){
    if(!Array.isArray(window.allRows) && typeof allRows==='undefined') return null;
    const rows = Array.isArray(window.allRows) ? window.allRows : allRows;
    let chosen=null;
    let chosenVal = kind==='best' ? -Infinity : Infinity;
    rows.forEach(r=>{
      const n=numKpi(r && r['Acum. 12M (%)']);
      if(n===null) return;
      if(kind==='best' ? n>chosenVal : n<chosenVal){
        chosenVal=n;
        chosen=r;
      }
    });
    return chosen;
  }

  function setInputValue(id,value){
    const el=$(id);
    if(el) el.value=value;
  }

  function clearChipGroups(){
    try{ activeCat=''; }catch(e){}
    try{ activeBenchmark=''; }catch(e){}
    try{ activePerfil=''; }catch(e){}
    try{ activeRisco=''; }catch(e){}
    try{ hideSemDados=false; }catch(e){}
    const toggle=$('toggleSemDados');
    if(toggle) toggle.checked=false;
  }

  function showToast(msg){
    let el=$('kpiOpenToast');
    if(!el){
      el=document.createElement('div');
      el.id='kpiOpenToast';
      el.className='kpi-open-toast';
      document.body.appendChild(el);
    }
    el.textContent=msg;
    el.classList.add('show');
    clearTimeout(showToast._t);
    showToast._t=setTimeout(()=>el.classList.remove('show'),2600);
  }

  function goToFundInCatalog(row){
    if(!row) return showToast('Fundo não localizado na base atual.');
    const nome=String(row['Fundo']||'').trim();
    const cnpj=String(row['CNPJ']||'').trim();
    const busca=nome || cnpj;
    if(!busca) return showToast('Não foi possível identificar o fundo.');

    clearChipGroups();
    document.querySelectorAll('.filter-preset-chip[data-preset], .shortcut-preset[data-preset]').forEach(btn=>{
      const isAll=btn.dataset.preset==='all';
      btn.classList.toggle('active',isAll);
      btn.setAttribute('aria-pressed',isAll?'true':'false');
    });
    const categoryStatus=document.getElementById('categoryGridStatus');
    if(categoryStatus) categoryStatus.textContent='Todos os fundos';
    try{ activeSearch=busca; }catch(e){}

    const inp=$('searchInput');
    if(inp) inp.value=busca;
    const gfb=$('gfbSearch');
    if(gfb) gfb.value=busca;

    // "Ver na tabela" deve realmente abrir a visualização em tabela.
    try{ localStorage.setItem('fundMobileView','table'); }catch(e){}
    document.body.classList.remove('fund-card-mode');
    document.querySelectorAll('.mobile-view-btn').forEach(btn=>{
      btn.classList.toggle('active',btn.dataset.view==='table');
    });

    try{ if(typeof applyFilter==='function') applyFilter(); }catch(e){console.error('Falha ao localizar fundo no catálogo',e);}

    requestAnimationFrame(()=>requestAnimationFrame(()=>{
      const table=document.querySelector('.table-wrap');
      const sec=$('sec-fundos') || table;
      const target=table || sec;
      if(target){
        const nav=document.getElementById('desktopAnchorNavV131');
        const offset=(nav?.getBoundingClientRect().height||0)+18;
        const top=target.getBoundingClientRect().top+window.scrollY-offset;
        window.scrollTo({top:Math.max(0,top),behavior:'smooth'});
      }
      const firstRow=document.querySelector('#tableBody tr[data-idx], .table-wrap tbody tr[data-idx]');
      if(firstRow){
        firstRow.classList.add('catalog-focus-row-v153');
        setTimeout(()=>firstRow.classList.remove('catalog-focus-row-v153'),2600);
      }
      if(Array.isArray(filtered) && filtered.length===0){
        showToast('Fundo não localizado. A busca foi restaurada pelo nome.');
      }
    }));
  }

  /* ═══════════════════════════════════════════
     FUND SPOTLIGHT MODAL — lógica de abertura
  ═══════════════════════════════════════════ */
  function openFundRow(row){
    if(!row) return showToast('Fundo não localizado na base atual.');

    const nome  = String(row['Fundo']||'').trim();
    const cat   = String(row['Categoria']||'').trim();
    const pl    = numKpi(row['PL (milhoes R$)']);
    const conv  = String(row['Conversao Resgate']||'').trim();
    const pag   = String(row['Pagamento Resgate']||'').trim();
    const r12   = numKpi(row['Acum. 12M (%)']);
    const rAno  = numKpi(row['Acum. Ano (%)']);
    const rMes  = numKpi(row['Acum. Mes (%)']);
    const rDia  = numKpi(row['Variacao Dia (%)']);
    const cdi   = calcCdiRatio(r12, indicState?.cdi?.m12);

    const fmtPct = (n,forceSign=true)=>{
      if(n===null) return '—';
      return (forceSign && n>0?'+':'')+n.toFixed(2).replace('.',',')+' %';
    };
    const clsPct = n=>n===null?'neu':n>0?'pos':'neg';

    // Título e meta
    const el = id => document.getElementById(id);
    el('fspotTitle').textContent = nome;

    const catAbrev={
      'RENDA FIXA SIMPLES':'RF Simples','RENDA FIXA':'Renda Fixa',
      'RENDA FIXA REFERENCIADO':'RF Ref. DI','RENDA FIXA CURTO PRAZO':'RF Curto Prazo',
      'MULTIMERCADO':'Multimercado','CAMBIAL':'Cambial',
      'ACOES':'Ações','FUNDO DE INDICE':'ETF','FUNDOS MUTUOS DE PRIVATIZACAO':'FMP-FGTS'
    };
    const catLabel = catAbrev[cat] || cat || '—';
    const plStr = pl ? ' · PL R$ '+(pl>=1000?(pl/1000).toFixed(1)+'bi':pl.toLocaleString('pt-BR',{maximumFractionDigits:0})+'mi') : '';
    el('fspotMeta').textContent = catLabel + plStr;

    // Métricas
    el('fspotMetrics').innerHTML = [
      {label:'Mês',  val:fmtPct(rMes),  cls:clsPct(rMes)},
      {label:'Ano',  val:fmtPct(rAno),  cls:clsPct(rAno)},
      {label:'12M',  val:fmtPct(r12),   cls:clsPct(r12)},
      {label:'% CDI 12M', val:cdi!==null?cdi+'%':'—', cls:cdi!==null?(cdi>=100?'pos':cdi>=80?'neu':'neg'):'neu'},
    ].map(m=>`
      <div class="fspot-metric-item">
        <span class="fspot-metric-label">${m.label}</span>
        <span class="fspot-metric-val ${m.cls}">${m.val}</span>
      </div>`).join('');

    // Liquidez
    const liqParts = [];
    if(conv) liqParts.push(`<span class="fspot-liq-badge"><i class="ti ti-refresh" aria-hidden="true" style="font-size:12px"></i>${conv}</span>`);
    if(pag)  liqParts.push(`<span class="fspot-liq-badge"><i class="ti ti-cash" aria-hidden="true" style="font-size:12px"></i>${pag}</span>`);
    el('fspotLiq').innerHTML = liqParts.length
      ? `<span class="fspot-liq-label">Liquidez</span>${liqParts.join('')}`
      : '';
    el('fspotLiq').style.display = liqParts.length ? '' : 'none';

    // Informações complementares
    const factsEl = el('fspotFacts');
    if(factsEl){
      factsEl.innerHTML = buildFundOperationalFacts(row,'spotlight');
      factsEl.style.display = '';
    }

    // Nota rápida
    const nota = gerarLeituraRapidaFundo(row);
    const tmpDiv = document.createElement('div');
    tmpDiv.innerHTML = nota;
    const noteBody = tmpDiv.querySelector('.fund-quick-note-text');
    const noteTxt = noteBody
      ? Array.from(noteBody.querySelectorAll('p')).map(p=>String(p.textContent||'').trim()).filter(Boolean).join(' ')
      : String(tmpDiv.textContent || '').trim();
    const safeNoteTxt = (typeof htmlAttr === 'function') ? htmlAttr(noteTxt) : noteTxt.replace(/[&<>"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[ch]));
    el('fspotNote').innerHTML = noteTxt
      ? `<div class="fspot-note-title">🧭 Leitura consultiva</div>${safeNoteTxt}`
      : '';
    el('fspotNote').style.display = noteTxt ? '' : 'none';

    // Link CAIXA
    const urlFundo = getFundUrl(row);
    const linkEl = el('fspotLinkCaixa');
    if(urlFundo && !isFallbackUrl(row)){
      linkEl.href = urlFundo;
      linkEl.textContent = '↗ Página do fundo';
      linkEl.title = 'Abrir página do fundo';
      linkEl.style.display = '';
    } else {
      linkEl.style.display = 'none';
    }

    // Botão "Ver na tabela"
    el('fspotVerTabela').onclick = ()=>{
      closeFundSpotlight();
      // Usa o nome do fundo como busca visível e mantém compatibilidade com CNPJ formatado.
      setTimeout(()=>goToFundInCatalog(row),220);
    };

    // Documentos
    const docs = obterDocsFundoCompactos ? obterDocsFundoCompactos(row) : [];
    el('fspotDocs').innerHTML = docs.length
      ? docs.map(d=>`<a class="fspot-doc-btn" href="${d.url}" target="_blank" rel="noopener">${d.curto} ${d.label}</a>`).join('')
      : '';

    // Badge tipo (best/worst)
    const kind = _spotlightKind || 'best';
    const badge = el('fspotKind');
    badge.textContent = kind==='best' ? '🏆 Melhor 12M' : '📉 Pior 12M';
    badge.className = 'fspot-badge ' + (kind==='best' ? 'best' : 'worst');

    openFundSpotlight();
  }

  let _spotlightKind = 'best';

  function openFundSpotlight(){
    const ov = document.getElementById('fundSpotlightOverlay');
    if(!ov) return;
    ov.classList.add('open');
    document.body.style.overflow = 'hidden';
    ov.addEventListener('click', _spotlightBackdropClose);
    document.addEventListener('keydown', _spotlightEscClose);
  }

  function closeFundSpotlight(){
    const ov = document.getElementById('fundSpotlightOverlay');
    if(!ov) return;
    ov.classList.remove('open');
    document.body.style.overflow = '';
    ov.removeEventListener('click', _spotlightBackdropClose);
    document.removeEventListener('keydown', _spotlightEscClose);
  }

  function _spotlightBackdropClose(e){
    if(e.target.id === 'fundSpotlightOverlay') closeFundSpotlight();
  }
  function _spotlightEscClose(e){
    if(e.key === 'Escape') closeFundSpotlight();
  }

  // Botão fechar
  document.addEventListener('DOMContentLoaded', ()=>{
    const btn = document.getElementById('fspotClose');
    if(btn) btn.addEventListener('click', closeFundSpotlight);
  });
  setTimeout(()=>{
    const btn = document.getElementById('fspotClose');
    if(btn && !btn._fspotPatched){
      btn._fspotPatched = true;
      btn.addEventListener('click', closeFundSpotlight);
    }
  }, 500);
  function setupKpiClick(){
    const best=$('kpiBestFundo');
    const worst=$('kpiWorstFundo');
    [best,worst].forEach((el,i)=>{
      if(!el) return;
      const card=el.closest('.kpi');
      if(!card || card.dataset.fundClickPatch) return;
      card.dataset.fundClickPatch='1';
      card.classList.add('kpi-fund-link');
      card.setAttribute('role','button');
      card.setAttribute('tabindex','0');
      card.title='Clique para abrir os detalhes do fundo';
      const kind=i===0?'best':'worst';
      const handler=()=>{
        _spotlightKind = kind;
        openFundRow(bestWorstRow(kind));
      };
      card.addEventListener('click',handler);
      card.addEventListener('keydown',ev=>{
        if(ev.key==='Enter' || ev.key===' '){ev.preventDefault();handler();}
      });
    });
  }



  window.__eltonDiagnosticarAtalhos=function(){
    const atalhos=[...document.querySelectorAll('.shortcut-preset[data-preset], .filter-preset-chip[data-preset]')];
    const out={
      buildIndex:document.querySelector('meta[name="app-build"]')?.content,
      buildAtalhos:window.__ELTAUM_SHORTCUT_FILTERS_BUILD__,
      presetAtivo:window.__ELTAUM_ACTIVE_SHORTCUT_PRESET__,
      qtdBotoes:atalhos.length,
      filteredQtd:Array.isArray(filtered)?filtered.length:null,
      allRowsQtd:Array.isArray(allRows)?allRows.length:null,
      botoes:atalhos.map(b=>({texto:b.textContent.trim(),preset:b.dataset.preset,classe:b.className,aria:b.getAttribute('aria-pressed')}))
    };
    console.table(out.botoes);
    console.log('[Diagnóstico atalhos]',out);
    return out;
  };

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',setupKpiClick);
  else setupKpiClick();
  setTimeout(setupKpiClick,600);
  setTimeout(setupKpiClick,1800);
})();
(function(){
  function isMobilePriorityTable(){
    try{
      return window.matchMedia('(max-width: 820px), (pointer: coarse), (hover: none)').matches;
    }catch(e){
      return window.innerWidth <= 820;
    }
  }

  function uniquePush(arr, item){
    if(item && !arr.includes(item)) arr.push(item);
  }

  function firstExisting(base, candidates){
    for(const c of candidates){
      if(base.includes(c)) return c;
    }
    return '';
  }

  function baseVisibleHeaders(){
    try{
      return displayHeaders.filter(h=>
        !HIDDEN_COLS.has(h) &&
        !DETAIL_COLS.has(h) &&
        h !== 'Categoria'
      );
    }catch(e){
      return [];
    }
  }

  function desktopHeaders(){
    const base = baseVisibleHeaders();
    const idxFundo = base.indexOf('Fundo');
    if(idxFundo >= 0 && !base.includes('Conv / Pag')){
      base.splice(idxFundo + 1, 0, 'Conv / Pag');
    }
    ['Conversão','Pagamento'].forEach(col=>{ const i=base.indexOf(col); if(i>=0) base.splice(i,1); });
    // O % do CDI fica como subtítulo dentro de Acum. 12M, não como coluna separada.
    if(!base.includes('Documentos')) base.push('Documentos');
    // Aplica filtro Vista Reunião (remove colunas que distraem na reunião com cliente)
    if(typeof vistaAtual !== 'undefined' && vistaAtual === 'reuniao' &&
       typeof COLS_OCULTAS_REUNIAO !== 'undefined'){
      return base.filter(h => !COLS_OCULTAS_REUNIAO.has(h));
    }
    return base;
  }

  function mobilePriorityHeaders(){
    const base = baseVisibleHeaders();
    const out = [];

    uniquePush(out, firstExisting(base, ['Fundo']));

    // Mobile: evita 4 ou 5 colunas espremidas.
    // A célula "Rentabilidade" consolida Dia, Mês, Ano, 12M e % do CDI.
    uniquePush(out, 'Resumo Mobile');

    return out.filter(Boolean);
  }

  try{
    getVisibleHeaders = function(){
      return isMobilePriorityTable() ? mobilePriorityHeaders() : desktopHeaders();
    };
  }catch(e){
    console.warn('Não foi possível ajustar getVisibleHeaders para mobile:', e);
  }

  let lastMode = isMobilePriorityTable();
  function rebuildTableForViewport(force){
    const now = isMobilePriorityTable();
    if(!force && now === lastMode) return;
    lastMode = now;
    try{
      if(typeof buildHeader === 'function' && Array.isArray(displayHeaders) && displayHeaders.length){
        buildHeader();
        if(typeof render === 'function') render();
      }
    }catch(e){
      console.warn('Não foi possível reconstruir a tabela mobile:', e);
    }
  }

  let t=null;
  window.addEventListener('resize', ()=>{
    clearTimeout(t);
    t=setTimeout(()=>rebuildTableForViewport(false),180);
  }, {passive:true});

  // Aguarda o CSV carregar e então reconstrói com a ordem correta.
  setTimeout(()=>rebuildTableForViewport(true),900);
  setTimeout(()=>rebuildTableForViewport(true),2200);
  setTimeout(()=>rebuildTableForViewport(true),4500);
})();


/* ════════════════════════════════════════════════════════
   COMPARADOR DE FUNDOS — v1.0
   Máximo 6 fundos | Checkbox em cada linha | Modal lado a lado
════════════════════════════════════════════════════════ */

const COMPAR_MAX = 6;
let comparSet = new Map(); // idx → row data

function comparUpdateBar(){
  const n = comparSet.size;
  const bar = document.getElementById('comparBar');
  const btn = document.getElementById('comparBtn');
  const hint = document.getElementById('comparHint');
  const count = document.getElementById('comparCount');
  if(!bar) return;
  if(n === 0){ bar.style.display='none'; return; }
  bar.style.display='flex';
  count.textContent = n;
  if(btn) btn.disabled = n < 2;
  if(hint){
    if(n < 2) hint.textContent = 'selecione ao menos 2';
    else if(n >= COMPAR_MAX) hint.textContent = `máximo ${COMPAR_MAX} fundos`;
    else hint.textContent = '';
  }
}

function comparToggle(idx, row, checkbox){
  if(comparSet.has(idx)){
    comparSet.delete(idx);
    checkbox.checked = false;
    const tr = document.querySelector(`tr[data-idx="${idx}"]`);
    if(tr) tr.classList.remove('row-selected-compar');
  } else {
    if(comparSet.size >= COMPAR_MAX){
      showToast(`Máximo ${COMPAR_MAX} fundos para comparar`);
      checkbox.checked = false;
      return;
    }
    comparSet.set(idx, row);
    checkbox.checked = true;
    const tr = document.querySelector(`tr[data-idx="${idx}"]`);
    if(tr) tr.classList.add('row-selected-compar');
  }
  comparUpdateBar();
}

function limparComparador(){
  comparSet.clear();
  document.querySelectorAll('.comp-check').forEach(c=>c.checked=false);
  document.querySelectorAll('.row-selected-compar').forEach(tr=>tr.classList.remove('row-selected-compar'));
  comparUpdateBar();
}

function fecharComparador(){
  const ov = document.getElementById('comparOverlay');
  if(ov){ ov.classList.remove('open'); document.body.style.overflow=''; }
}

function abrirComparador(){
  if(comparSet.size < 2){ showToast('Selecione ao menos 2 fundos'); return; }
  const fundos = [...comparSet.values()];
  const tbl = document.getElementById('comparTable');
  if(!tbl) return;

  const fmt = (v,dec=2) => {
    if(v===null||v===undefined||v===''||v==='—') return '—';
    const n = parseFloat(String(v).replace(',','.'));
    return isNaN(n) ? String(v) : (n>0?'+':'')+n.toFixed(dec).replace('.',',')+' %';
  };
  const fmtN = v => {
    if(!v||v==='—') return '—';
    const n = parseFloat(String(v).replace(',','.'));
    if(isNaN(n)) return v;
    return n.toLocaleString('pt-BR',{maximumFractionDigits:2});
  };
  const fmtPL = v => {
    const n = parseFloat(String(v||'').replace(',','.'));
    if(isNaN(n)||n===0) return '—';
    return n>=1000 ? 'R$ '+(n/1000).toFixed(1)+'bi' : 'R$ '+Math.round(n)+'mi';
  };
  const cls = v => {
    const n = parseFloat(String(v||'').replace(',','.'));
    if(isNaN(n)) return '';
    return n > 0 ? 'pos' : n < 0 ? 'neg' : '';
  };

  // Campos a comparar
  const campos = [
    { label:'Perfil',       key: r => r['Perfil de Risco']||r['Perfil']||'—',  tipo:'txt' },
    { label:'Categoria',    key: r => r['Categoria']||'—',                      tipo:'txt' },
    { label:'CNPJ',         key: r => r['CNPJ']||'—',                           tipo:'txt' },
    { label:'Taxa Adm',     key: r => r['Taxa Adm (%)'] ? r['Taxa Adm (%)']+' %' : '—', tipo:'txt' },
    { label:'Var. Dia',     key: r => fmt(r['Variacao Dia (%)']),    tipo:'pct', val: r => parseFloat(String(r['Variacao Dia (%)']||'').replace(',','.')) },
    { label:'Acum. Mês',    key: r => fmt(r['Acum. Mes (%)']),       tipo:'pct', val: r => parseFloat(String(r['Acum. Mes (%)']||'').replace(',','.')) },
    { label:'Acum. Ano',    key: r => fmt(r['Acum. Ano (%)']),       tipo:'pct', val: r => parseFloat(String(r['Acum. Ano (%)']||'').replace(',','.')) },
    { label:'Acum. 12M',    key: r => fmt(r['Acum. 12M (%)']),       tipo:'pct dest', val: r => parseFloat(String(r['Acum. 12M (%)']||'').replace(',','.')) },
    { label:'% CDI 12M',    key: r => {
        const rent = parseFloat(String(r['Acum. 12M (%)']||'').replace(',','.'));
        const cdi  = indicState?.cdi?.m12;
        if(isNaN(rent)||!cdi) return '—';
        return Math.round((rent/cdi)*100)+' %';
      }, tipo:'cdi', val: r => {
        const rent = parseFloat(String(r['Acum. 12M (%)']||'').replace(',','.'));
        const cdi  = indicState?.cdi?.m12;
        return (isNaN(rent)||!cdi) ? NaN : Math.round((rent/cdi)*100);
      }
    },
    { label:'PL',           key: r => fmtPL(r['PL (milhoes R$)']),  tipo:'txt' },
    { label:'Conversão',    key: r => r['Conversao Resgate']||'—',   tipo:'txt' },
    { label:'Pagamento',    key: r => r['Pagamento Resgate']||'—',   tipo:'txt' },
    { label:'Aplic. Mín.',  key: r => r['Aplicacao Minima (R$)'] ? 'R$ '+fmtN(r['Aplicacao Minima (R$)']) : '—', tipo:'txt' },
  ];

  // Cabeçalho com nomes dos fundos
  const catAbrev = {'RENDA FIXA SIMPLES':'RF Simples','RENDA FIXA':'RF','RENDA FIXA REFERENCIADO':'RF Ref.','RENDA FIXA CURTO PRAZO':'RF CP','MULTIMERCADO':'MM','CAMBIAL':'CAM','ACOES':'Ações','FUNDO DE INDICE':'ETF','FUNDOS MUTUOS DE PRIVATIZACAO':'FMP'};
  let thead = '<thead><tr><th class="ct-campo">Campo</th>';
  fundos.forEach((r,i)=>{
    const cat = r['Categoria']||'';
    const catCls = (CAT_CLS?.[cat])||'RF';
    const catLabel = catAbrev[cat]||cat.slice(0,10);
    const nome = (r['Fundo']||'').replace(/RESP\s+LTDA.*$/i,'').trim();
    thead += `<th class="ct-fundo">
      <span class="ct-fundo-nome">${nome}</span>
      <span class="fundo-cat-badge cat-${catCls} ct-fundo-cat">${catLabel}</span>
      <button class="ct-remove" onclick="comparRemover(${[...comparSet.keys()][i]})" title="Remover da comparação">✕ remover</button>
    </th>`;
  });
  thead += '</tr></thead>';

  // Corpo com cada campo
  let tbody = '<tbody>';
  campos.forEach(campo=>{
    // Calcular valores numéricos para highlight melhor/pior
    const vals = fundos.map(r=>campo.val ? campo.val(r) : NaN);
    const validos = vals.filter(v=>!isNaN(v));
    const melhor = validos.length ? Math.max(...validos) : NaN;
    const pior   = validos.length ? Math.min(...validos) : NaN;

    tbody += `<tr><td class="ct-campo">${campo.label}</td>`;
    fundos.forEach((r,i)=>{
      const txt  = campo.key(r);
      const vn   = vals[i];
      const isMelhor = !isNaN(vn) && vn===melhor && melhor!==pior;
      const isPior   = !isNaN(vn) && vn===pior   && melhor!==pior;
      let valCls = campo.tipo.includes('pct') ? cls(r[
        campo.label==='Var. Dia'?'Variacao Dia (%)':
        campo.label==='Acum. Mês'?'Acum. Mes (%)':
        campo.label==='Acum. Ano'?'Acum. Ano (%)':'Acum. 12M (%)'
      ]) : (campo.tipo==='cdi'?(vn>=100?'pos':vn>=80?'':vn>0?'neg':''):'');
      const destCls = campo.tipo.includes('dest') ? ' dest' : '';
      const bgCls = isMelhor ? ' ct-best' : isPior ? ' ct-worst' : '';
      tbody += `<td class="ct-val${destCls}${bgCls} ${valCls}">${txt}</td>`;
    });
    tbody += '</tr>';
  });
  tbody += '</tbody>';

  tbl.innerHTML = thead + tbody;

  const ov = document.getElementById('comparOverlay');
  if(ov){
    ov.classList.add('open');
    document.body.style.overflow='hidden';
    ov.addEventListener('click', e=>{ if(e.target===ov) fecharComparador(); }, {once:true});
  }
  document.addEventListener('keydown', e=>{ if(e.key==='Escape') fecharComparador(); }, {once:true});
}

function comparRemover(idx){
  comparSet.delete(idx);
  const tr = document.querySelector(`tr[data-idx="${idx}"]`);
  if(tr) tr.classList.remove('row-selected-compar');
  const cb = tr?.querySelector('.comp-check');
  if(cb) cb.checked = false;
  comparUpdateBar();
  if(comparSet.size < 1){ fecharComparador(); return; }
  abrirComparador(); // re-render
}

// Fechar botão
document.addEventListener('DOMContentLoaded', ()=>{
  const btn = document.getElementById('comparClose');
  if(btn) btn.addEventListener('click', fecharComparador);
});
setTimeout(()=>{
  const btn = document.getElementById('comparClose');
  if(btn && !btn._cpatched){ btn._cpatched=true; btn.addEventListener('click', fecharComparador); }
},600);

(function(){
  'use strict';

  const FAV_KEY = 'fundos_favoritos_v1';
  window.__favListMode = window.__favListMode || false;

  function favGet(){
    try{return new Set(JSON.parse(localStorage.getItem(FAV_KEY)||'[]'));}
    catch(e){return new Set();}
  }
  function favSave(set){
    try{localStorage.setItem(FAV_KEY, JSON.stringify([...set]));}catch(e){}
  }
  function favKey(row){
    if(typeof favCanonicalKeyForRow==='function') return favCanonicalKeyForRow(row);
    if(!row) return '';
    const cnpj = String(row['CNPJ']||'').replace(/\D/g,'').slice(0,20);
    if(cnpj) return cnpj;
    return String(row['Fundo']||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toUpperCase().replace(/\s+/g,' ').trim().slice(0,160);
  }
  function favHasRow(row){
    if(typeof rowIsFavoritedForFilter==='function') return rowIsFavoritedForFilter(row);
    return favGet().has(favKey(row));
  }
  function toast(msg){
    const t=document.getElementById('elton-fav-toast');
    if(!t) return;
    t.textContent=msg;
    t.classList.add('show');
    clearTimeout(t._tid);
    t._tid=setTimeout(()=>t.classList.remove('show'),1800);
  }
  function setFav(key,on){
    if(!key) return;
    let row=null;
    try{
      row=(Array.isArray(filtered)?filtered:[]).concat(Array.isArray(allRows)?allRows:[]).find(r=>favAliasesForRow(r).includes(key));
    }catch(e){}
    const favs=favGet();
    const aliases=row && typeof favAliasesForRow==='function' ? favAliasesForRow(row) : [key];
    const was=aliases.some(k=>favs.has(k));
    if(on===undefined) on=!was;
    aliases.forEach(k=>favs.delete(k));
    if(on){
      const canonical=row && typeof favCanonicalKeyForRow==='function' ? favCanonicalKeyForRow(row) : key;
      if(canonical) favs.add(canonical);
    }
    favSave(favs);
    refreshFavUi();
    toast(on?'⭐ Fundo adicionado aos favoritos':'Fundo removido dos favoritos');
    if(window.__favListMode && typeof applyFilter==='function') applyFilter();
  }

  function favCount(){ return favGet().size; }

  function updateFavCounts(){
    const n=favCount();
    document.querySelectorAll('.fav-count-inline,.gfb-fav-count,.fav-count').forEach(el=>{
      el.textContent=String(n);
      el.classList.toggle('is-zero', n===0);
    });
    document.querySelectorAll('.fav-shortcut-chip,.gfb-fav-chip,.fav-chip').forEach(el=>{
      el.classList.toggle('has-favs', n>0);
      el.classList.toggle('active', !!window.__favListMode);
      el.setAttribute('aria-pressed', window.__favListMode ? 'true' : 'false');
    });
  }

  function annotateRenderedFavorites(){
    const favs=favGet();

    document.querySelectorAll('#tableBody tr[data-idx]').forEach(tr=>{
      const idx=parseInt(tr.dataset.idx,10);
      const row=(typeof filtered!=='undefined' && Array.isArray(filtered)) ? filtered[idx] : null;
      if(!row) return;
      const key=favKey(row);
      const isFav=favHasRow(row);
      tr.classList.toggle('row-fav', isFav);

      const nameCell=tr.querySelector('td.col-fundo');
      if(nameCell && !nameCell.querySelector('.fav-btn-inline')){
        const btn=document.createElement('button');
        btn.type='button';
        btn.className='fav-btn-inline';
        btn.dataset.fk=key;
        btn.title='Adicionar ou remover dos favoritos';
        btn.setAttribute('aria-label','Adicionar ou remover dos favoritos');
        nameCell.prepend(btn);
      }
      const b=nameCell?.querySelector('.fav-btn-inline');
      if(b){
        b.dataset.fk=key;
        b.textContent=isFav?'⭐':'☆';
        b.classList.toggle('is-fav', isFav);
      }
    });

    document.querySelectorAll('#mobileFundCards .fund-card-mobile').forEach(card=>{
      // v27: não inserir estrela/favorito nos cards mobile; mantém a tela mais limpa.
      card.classList.remove('card-fav');
      card.querySelectorAll('.fav-btn-mobile').forEach(btn=>btn.remove());
    });
  }

  function ensureFavEmptyState(){
    if(!window.__favListMode) return;
    const hasRows = typeof filtered!=='undefined' && Array.isArray(filtered) && filtered.length>0;
    const favs=favGet();
    if(hasRows) return;

    const msg = favs.size
      ? 'Nenhum favorito combina com os filtros atuais. Limpe os filtros ou pesquise outro termo.'
      : 'Nenhum fundo favorito ainda. Toque na estrela ao lado de um fundo para montar sua lista de acompanhamento.';

    const tableBody=document.getElementById('tableBody');
    if(tableBody && !tableBody.querySelector('.fav-empty-row')){
      const colspan = document.querySelectorAll('#tableHead th').length || 2;
      tableBody.innerHTML = `<tr class="fav-empty-row"><td colspan="${colspan}"><div class="fav-empty-state"><strong>⭐ Favoritos</strong><span>${msg}</span></div></td></tr>`;
    }
    const cards=document.getElementById('mobileFundCards');
    if(cards && !cards.querySelector('.fav-empty-state')){
      cards.innerHTML = `<div class="fav-empty-state mobile"><strong>⭐ Favoritos</strong><span>${msg}</span></div>`;
    }
  }

  function refreshFavUi(){
    updateFavCounts();
    annotateRenderedFavorites();
    ensureFavEmptyState();
  }

  function clearBaseFiltersForFavs(){
    try{activeCat=''; activeBenchmark=''; activePerfil=''; activeRisco=''; hideSemDados=false;}catch(e){}
    const s=document.getElementById('searchInput');
    if(s && s.value){ s.value=''; s.dispatchEvent(new Event('input',{bubbles:true})); }
    const g=document.getElementById('gfbSearch');
    if(g) g.value='';
    try{ if(typeof syncFilterControls==='function') syncFilterControls(); }catch(e){}
  }

  function toggleFavList(force){
    window.__favListMode = force===undefined ? !window.__favListMode : !!force;
    if(window.__favListMode) clearBaseFiltersForFavs();
    try{ if(typeof currentPage!=='undefined') currentPage=1; }catch(e){}
    try{ if(typeof expandedRows!=='undefined') expandedRows.clear(); }catch(e){}
    if(typeof applyFilter==='function') applyFilter();
    refreshFavUi();
    const sec=document.getElementById('sec-fundos');
    if(sec) sec.scrollIntoView({behavior:'smooth', block:'start'});
  }
  window.toggleFavList = toggleFavList;

  function patchApplyFilterForFavs(){
    if(typeof applyFilter!=='function' || applyFilter.__favEnhanced) return;
    const original=applyFilter;
    const wrapped=function(){
      original.apply(this,arguments);
      if(window.__favListMode && typeof filtered!=='undefined' && Array.isArray(filtered)){
        const favs=favGet();
        filtered=filtered.filter(r=>typeof rowIsFavoritedForFilter==='function'?rowIsFavoritedForFilter(r):favs.has(favKey(r)));
        try{currentPage=1;}catch(e){}
        try{expandedRows?.clear?.();}catch(e){}
        if(typeof render==='function') render();
        if(typeof renderMobileFundCards==='function') renderMobileFundCards();
      }
      refreshFavUi();
    };
    wrapped.__favEnhanced=true;
    window.applyFilter=wrapped;
  }

  function patchRenderForFavs(){
    if(typeof render==='function' && !render.__favEnhanced){
      const old=render;
      const wrapped=function(){ const out=old.apply(this,arguments); setTimeout(refreshFavUi,0); return out; };
      wrapped.__favEnhanced=true;
      window.render=wrapped;
    }
    if(typeof renderMobileFundCards==='function' && !renderMobileFundCards.__favEnhanced){
      const oldCards=renderMobileFundCards;
      const wrappedCards=function(){ const out=oldCards.apply(this,arguments); setTimeout(refreshFavUi,0); return out; };
      wrappedCards.__favEnhanced=true;
      window.renderMobileFundCards=wrappedCards;
    }
  }

  function setupFavInteractions(){
    document.addEventListener('click', function(e){
      const favModeBtn=e.target.closest('[data-preset="favoritos"], .gfb-fav-chip, .fav-chip');
      if(favModeBtn){
        e.preventDefault();
        e.stopPropagation();
        if(typeof e.stopImmediatePropagation==='function') e.stopImmediatePropagation();
        toggleFavList();
        return;
      }
      const favBtn=e.target.closest('.fav-btn-inline,.fav-btn-mobile,.fav-btn');
      if(favBtn){
        e.preventDefault();
        e.stopPropagation();
        const key=favBtn.dataset.fk || favBtn.dataset.fundKey;
        setFav(key);
      }
    }, true);
  }

  function initFavEnhanced(){
    patchApplyFilterForFavs();
    patchRenderForFavs();
    setupFavInteractions();
    updateFavCounts();
    setTimeout(refreshFavUi,250);
    setInterval(updateFavCounts,2000);
  }



  window.__eltonDiagnosticarAtalhos=function(){
    const atalhos=[...document.querySelectorAll('.shortcut-preset[data-preset], .filter-preset-chip[data-preset]')];
    const out={
      buildIndex:document.querySelector('meta[name="app-build"]')?.content,
      buildAtalhos:window.__ELTAUM_SHORTCUT_FILTERS_BUILD__,
      presetAtivo:window.__ELTAUM_ACTIVE_SHORTCUT_PRESET__,
      qtdBotoes:atalhos.length,
      filteredQtd:Array.isArray(filtered)?filtered.length:null,
      allRowsQtd:Array.isArray(allRows)?allRows.length:null,
      botoes:atalhos.map(b=>({texto:b.textContent.trim(),preset:b.dataset.preset,classe:b.className,aria:b.getAttribute('aria-pressed')}))
    };
    console.table(out.botoes);
    console.log('[Diagnóstico atalhos]',out);
    return out;
  };

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>setTimeout(initFavEnhanced,500));
  else setTimeout(initFavEnhanced,500);
})();
// ─────────────────────────────────────────────
// Painel consolidado — print e compartilhamento
// Agora foca somente no bloco do ÚLTIMO MÊS FECHADO
// ─────────────────────────────────────────────
function painelText(id){
  const el=document.getElementById(id);
  return el ? (el.textContent||'').replace(/\s+/g,' ').trim() : '—';
}
function cleanTxt(v){
  return String(v||'—').replace(/\s+/g,' ').trim() || '—';
}
function escapeHtml(v){
  return String(v||'').replace(/[&<>"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[ch]));
}
function periodoUltimoFechado(){
  const raw=painelText('th-mes-ant-sub');
  return cleanTxt(raw.replace(/\s*·?\s*fechado/ig,'').replace(/fechado/ig,''));
}
function quebrarUsdBrl(txt){
  const s=cleanTxt(txt).replace(/\s*(USD)\s*/ig,'USD ').replace(/\s*(BRL)\s*/ig,' BRL ');
  const partes=[];
  const re=/(USD|BRL)\s*([+-]?\d+(?:,\d+)?%|—)/ig;
  let m;
  while((m=re.exec(s))!==null){
    partes.push(`${m[1].toUpperCase()} ${m[2]}`);
  }
  return partes.length ? partes : [s];
}
function linhasHtmlUsdBrl(txt){
  return quebrarUsdBrl(txt).map(l=>{
    const cls = l.includes('-') ? 'neg' : (l.includes('+') ? 'pos' : 'neu');
    return `<span class="closed-us-line ${cls}">${escapeHtml(l)}</span>`;
  }).join('');
}
function linhaTextoUsdBrl(txt){
  return quebrarUsdBrl(txt).join(' | ');
}
function normalizeValueForSign(txt){
  const s=String(txt||'');
  const m=s.match(/[-+]?\d+(?:[\.,]\d+)?/);
  if(!m) return null;
  const n=Number(m[0].replace('.','').replace(',','.'));
  return Number.isFinite(n) ? n : null;
}
function signClassFromText(txt){
  const n=normalizeValueForSign(txt);
  if(n === null) return 'neu';
  return n > 0 ? 'pos' : n < 0 ? 'neg' : 'neu';
}
function primeiroValorNaoVazio(...vals){
  for(const v of vals){
    const s=cleanTxt(v);
    if(s && s !== '—') return s;
  }
  return '—';
}
function ifixFechadoRow(){
  const indices=_dadosMercado?.indices_mercado || {};
  const intl=_dadosMercado?.indices_internacionais || {};
  const item = indices.ifix || indices.IFIX || intl.ifix || _dadosMercado?.ifix || _dadosMercado?.cards?.ifix || null;
  if(!item) return {grupo:'Bolsa Brasil', icon:'🏢', nome:'IFIX', valor:'—', detalhe:'pendente no robô'};
  const pts = item.fechamento_mes_anterior ?? item.fechamento_atual ?? item.pontos ?? item.valor;
  const vari = item.variacao_mes_fechado ?? item.variacao_mes_anterior ?? item.variacao_mes_atual ?? item.mensal;
  const ptsTxt = pts != null && Number.isFinite(Number(pts)) ? `${fmtK(Number(pts))} pts` : '';
  const varTxt = vari != null && Number.isFinite(Number(vari)) ? pctTxt(Number(vari)) : '';
  return {
    grupo:'Bolsa Brasil',
    icon:'🏢',
    nome:'IFIX',
    valor:primeiroValorNaoVazio(ptsTxt, varTxt),
    detalhe:'fundos imobiliários',
    extra: varTxt && varTxt !== ptsTxt ? varTxt : ''
  };
}
function indicadorFechadoRows(){
  const poupValor = primeiroValorNaoVazio(painelText('mc-poup'), painelText('poupOldMonthly'));
  return [
    {grupo:'Taxas e inflação', icon:'💰', nome:'CDI', valor:painelText('cdi-mes-ant'), detalhe:'mês fechado'},
    {grupo:'Taxas e inflação', icon:'🎯', nome:'IPCA', valor:painelText('ipca-mes-ant'), detalhe:'inflação do mês'},
    {grupo:'Taxas e inflação', icon:'🏠', nome:'Poupança', valor:poupValor, detalhe:'rendimento mensal'},
    {grupo:'Câmbio e bolsa Brasil', icon:'💵', nome:'Dólar PTAX', valor:painelText('dolar-ant-cot'), detalhe:'cotação de fechamento', extra:painelText('dolar-ant-var')},
    {grupo:'Câmbio e bolsa Brasil', icon:'📈', nome:'Ibovespa', valor:painelText('ibov-ant-pts'), detalhe:'fechamento mensal', extra:painelText('ibov-ant-var')},
    ifixFechadoRow(),
    {grupo:'Bolsa EUA', icon:'🌎', nome:'S&P 500', valor:painelText('sp-ant-var'), detalhe:'USD e BRL', us:true},
    {grupo:'Bolsa EUA', icon:'💻', nome:'Nasdaq', valor:painelText('nasdaq-ant-var'), detalhe:'USD e BRL', us:true},
    {grupo:'Bolsa EUA', icon:'🏛️', nome:'Dow Jones', valor:painelText('dow-ant-var'), detalhe:'USD e BRL', us:true},
  ];
}
function atualizarResumoFechamentoMes(){
  const periodo=periodoUltimoFechado();
  const title=document.getElementById('closedMonthLaunchTitle');
  const sub=document.getElementById('closedMonthLaunchSub');
  if(title) title.textContent=`Resumo de mercado`;
  if(sub) sub.textContent=`${periodo} · indicadores consolidados`;
  const setMini=(id,val,mode='auto')=>{
    const el=document.getElementById(id);
    if(!el) return;
    const txt=cleanTxt(val);
    const isQuote=mode==='quote' || /^R\$\s*/i.test(txt);
    el.textContent=txt;
    el.className='finance-number-v231';
    if(isQuote){
      el.classList.add('market-quote-v231','zero');
    }else{
      el.classList.add(signClassFromText(txt));
    }
  };
  setMini('closedMiniCdi', painelText('cdi-mes-ant'));
  setMini('closedMiniIpca', painelText('ipca-mes-ant'));
  const dolarVariacaoMini=painelText('dolar-ant-var');
  const dolarCotacaoMini=painelText('dolar-ant-cot');
  setMini('closedMiniDolar', dolarVariacaoMini !== '—' ? dolarVariacaoMini : dolarCotacaoMini, dolarVariacaoMini !== '—' ? 'variation' : 'quote');
  setMini('closedMiniIbov', painelText('ibov-ant-var'));
}
function renderClosedMarketSheet(){
  const periodo=periodoUltimoFechado();
  // Título removido do cabeçalho para reduzir altura no modal compacto.
  const note=document.getElementById('closedMarketSheetNote');
  const list=document.getElementById('closedMarketSheetList');  if(note) note.textContent=`Último mês fechado · ${periodo}`;
  if(!list) return;
  let lastGrupo='';
  list.innerHTML=indicadorFechadoRows().map(r=>{
    const grupo = r.grupo || '';
    const section = grupo !== lastGrupo ? `<div class="closed-market-group-label">${escapeHtml(grupo)}</div>` : '';
    lastGrupo=grupo;
    let valueHtml='';
    if(r.us){
      valueHtml = `<div class="closed-market-us-lines">${quebrarUsdBrl(r.valor).map(l=>`<span class="${signClassFromText(l)}">${escapeHtml(l)}</span>`).join('')}</div>`;
    }else if(r.extra && r.extra !== '—'){
      const mainCls = signClassFromText(r.valor);
      const extraCls = signClassFromText(r.extra);
      valueHtml = `<strong class="${mainCls}">${escapeHtml(r.valor)}</strong><small class="${extraCls}">${escapeHtml(r.extra)}</small>`;
    }else{
      const mainCls = signClassFromText(r.valor);
      valueHtml = `<strong class="${mainCls}">${escapeHtml(r.valor)}</strong>`;
    }
    return `${section}<button type="button" class="closed-market-row" aria-label="${escapeHtml(r.nome)} ${escapeHtml(r.valor)}">
      <span class="closed-market-row-icon">${r.icon}</span>
      <span class="closed-market-row-name">${escapeHtml(r.nome)}<small>${escapeHtml(r.detalhe||'')}</small></span>
      <span class="closed-market-row-value">${valueHtml}</span>
    </button>`;
  }).join('');
}
function ensureClosedMarketPortal(){
  var sheet=document.getElementById('closedMarketSheet');
  var overlay=document.getElementById('closedMarketOverlay');

  // O modal não pode ficar dentro de uma seção recolhida com hidden.
  // Quando fica dentro de #sec-painel-body fechado, o JS abre, mas o retângulo real vira 0x0.
  // Movendo overlay + sheet para o body, o modal independe do estado do painel consolidado.
  if(overlay && overlay.parentElement !== document.body){
    document.body.appendChild(overlay);
  }
  if(sheet && sheet.parentElement !== document.body){
    document.body.appendChild(sheet);
  }

  return { sheet:sheet, overlay:overlay };
}

function openFechamentoMesSheet(){
  const portal=ensureClosedMarketPortal();
  const sheet=portal.sheet;
  const overlay=portal.overlay;

  if(!sheet){
    console.warn('[Fechamento] closedMarketSheet não encontrado no DOM.');
    return false;
  }

  // O painel deve abrir mesmo se algum dado externo ainda não tiver carregado.
  // Assim um erro de fetch/BCB não bloqueia a interação do usuário.
  try{ if(typeof atualizarResumoFechamentoMes==='function') atualizarResumoFechamentoMes(); }catch(e){ console.warn('[Fechamento] resumo:', e); }
  try{ if(typeof atualizarPainelFechadoCard==='function') atualizarPainelFechadoCard(); }catch(e){ console.warn('[Fechamento] card:', e); }
  try{ if(typeof renderClosedMarketSheet==='function') renderClosedMarketSheet(); }catch(e){ console.warn('[Fechamento] sheet:', e); }

  document.body.classList.add('closed-market-open');
  sheet.removeAttribute('hidden');
  sheet.setAttribute('aria-hidden','false');
  try{
    Object.assign(sheet.style,{
      position:'fixed',
      left:'50%',
      top: window.matchMedia && window.matchMedia('(min-width:701px)').matches ? '50%' : 'auto',
      bottom: window.matchMedia && window.matchMedia('(min-width:701px)').matches ? 'auto' : '0',
      transform: window.matchMedia && window.matchMedia('(min-width:701px)').matches ? 'translate(-50%, -50%)' : 'translate(-50%, 0)',
      width: (window.matchMedia && window.matchMedia('(min-width:701px)').matches) ? 'min(760px, calc(100vw - 24px))' : 'calc(100vw - 16px)',
      minHeight:'0',
      maxHeight: window.matchMedia && window.matchMedia('(min-width:701px)').matches ? 'calc(100vh - 20px)' : 'calc(100vh - 12px)',
      display:'block',
      opacity:'1',
      visibility:'visible',
      pointerEvents:'auto',
      zIndex:'2147483647',
      contentVisibility:'visible',
      contain:'none',
      overflow:'auto'
    });
  }catch(e){}

  if(overlay){
    overlay.removeAttribute('hidden');
    overlay.setAttribute('aria-hidden','false');
    try{
      Object.assign(overlay.style,{
        position:'fixed',
        inset:'0',
        display:'block',
        opacity:'1',
        visibility:'visible',
        pointerEvents:'auto',
        zIndex:'2147483646'
      });
    }catch(e){}
  }

  return false;
}
function closeFechamentoMesSheet(){
  document.body.classList.remove('closed-market-open');
  const sheet=document.getElementById('closedMarketSheet');
  const overlay=document.getElementById('closedMarketOverlay');
  if(sheet){
    sheet.setAttribute('aria-hidden','true');
    try{
      sheet.style.opacity='0';
      sheet.style.visibility='hidden';
      sheet.style.pointerEvents='none';
    }catch(e){}
  }
  if(overlay){
    overlay.setAttribute('aria-hidden','true');
    try{
      overlay.style.opacity='0';
      overlay.style.visibility='hidden';
      overlay.style.pointerEvents='none';
    }catch(e){}
  }
}
window.openFechamentoMesSheet=openFechamentoMesSheet;
window.closeFechamentoMesSheet=closeFechamentoMesSheet;

(function setupClosedMarketOpen(){
  function init(){
    var btn=document.getElementById('closedMonthLaunch');
    if(!btn || btn.dataset.closedMarketBound === '1') return;
    btn.dataset.closedMarketBound='1';
    btn.setAttribute('data-open-closed-market','true');
    btn.style.pointerEvents='auto';
    btn.addEventListener('click', function(e){
      e.preventDefault();
      e.stopPropagation();
      if(typeof e.stopImmediatePropagation === 'function') e.stopImmediatePropagation();
      openFechamentoMesSheet();
      return false;
    }, true);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init, {once:true});
  else init();
  setTimeout(init, 300);
  setTimeout(init, 1200);
})();
(function setupClosedMarketClose(){
  function init(){
    var ov=document.getElementById('closedMarketOverlay');
    if(ov&&!ov.dataset.cr){ov.dataset.cr='1';ov.addEventListener('click',function(e){if(e.target===ov)closeFechamentoMesSheet();});}
    var cb=document.querySelector('.closed-market-close,#closedMarketClose');
    if(cb&&!cb.dataset.cr){cb.dataset.cr='1';cb.addEventListener('click',closeFechamentoMesSheet);}
    if(!window.__cesc){window.__cesc=1;document.addEventListener('keydown',function(e){if(e.key==='Escape'&&document.body.classList.contains('closed-market-open'))closeFechamentoMesSheet();});}
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
  else setTimeout(init,400);
  setTimeout(init,1500);
  setInterval(function(){
    var s=document.getElementById('closedMarketSheet');
    if(s&&s.getAttribute('aria-hidden')==='true')document.body.classList.remove('closed-market-open');
  },2000);
})();
function atualizarPainelFechadoCard(){
  const periodo=periodoUltimoFechado();
  const card=document.getElementById('painelFechadoCard');
  const title=document.getElementById('closedCardTitle');
  const badge=document.getElementById('closedCardPeriod');
  const grid=document.getElementById('closedCardGrid');
  if(!card || !grid) return;
  if(title) title.textContent=`Indicadores — ${periodo} fechado`;
  if(badge) badge.textContent=periodo;
  grid.innerHTML=indicadorFechadoRows().map(r=>{
    let valHtml='';
    if(r.us){
      valHtml = `<div class="closed-us-lines">${linhasHtmlUsdBrl(r.valor)}</div>`;
    }else if(r.extra && r.extra !== '—'){
      valHtml = `<strong class="${signClassFromText(r.valor)}">${escapeHtml(r.valor)}</strong><small class="${signClassFromText(r.extra)}">${escapeHtml(r.extra)}</small>`;
    }else{
      valHtml = `<strong class="${signClassFromText(r.valor)}">${escapeHtml(r.valor)}</strong>`;
    }
    return `<article class="closed-card-item closed-grupo-${escapeHtml((r.grupo||'geral').toLowerCase().replace(/\s+/g,'-'))}">
      <div class="closed-item-top"><span class="closed-item-icon">${r.icon}</span><span class="closed-item-name">${escapeHtml(r.nome)}</span></div>
      <div class="closed-item-value">${valHtml}</div>
      <small>${escapeHtml(r.detalhe)}</small>
    </article>`;
  }).join('');
  atualizarResumoFechamentoMes();
}
function montarResumoPainelMercado(){
  const periodo=periodoUltimoFechado();
  const data=document.getElementById('lastUpdate')?.textContent?.replace(/\s+/g,' ').trim() || '';
  const linhas=[
    `📊 Indicadores de mercado — ${periodo} fechado`,
    data ? `Atualização: ${data}` : '',
    '',
    ...indicadorFechadoRows().map(r=>`${r.icon} ${r.nome}: ${r.us ? linhaTextoUsdBrl(r.valor) : cleanTxt(r.valor)}`),
    '',
    'Fonte: dados públicos · BCB/PTAX e fontes públicas de mercado.'
  ].filter(Boolean);
  return linhas.join('\n');
}
async function copiarResumoPainelMercado(){
  atualizarPainelFechadoCard();
  const texto=montarResumoPainelMercado();
  try{
    await navigator.clipboard.writeText(texto);
    alert('Resumo do mês fechado copiado.');
  }catch(e){
    prompt('Copie o resumo abaixo:', texto);
  }
}
function printPainelMercado(){
  atualizarPainelFechadoCard();
  document.body.classList.add('printing-closed-month-panel');
  setTimeout(()=>window.print(),80);
  setTimeout(()=>document.body.classList.remove('printing-closed-month-panel'),1000);
}
async function sharePainelMercado(){
  atualizarPainelFechadoCard();
  const texto=montarResumoPainelMercado();
  const url='https://wa.me/?text='+encodeURIComponent(texto);
  const opened=window.open(url,'_blank','noopener,noreferrer');
  if(opened) return;
  try{
    await navigator.clipboard.writeText(texto);
    alert('Resumo do mês fechado copiado. Agora é só colar no WhatsApp.');
  }catch(e){
    alert('Não foi possível abrir o WhatsApp automaticamente. Copie o resumo manualmente pelo painel.');
  }
}
/* Patch final — controle próprio dos botões IPCA/Selic.
   Build: ELTAUM_TABS_FORCE_20260602_v10
   Motivo: alguns browsers/ambientes estavam deixando a classe active mudar, mas o canvas não era redesenhado.
   Este patch captura o clique antes dos listeners antigos, recarrega a base necessária e redesenha diretamente o Chart.js. */
(function(){
  const BUILD = 'ELTAUM_RATES_CLEAN_DASHBOARD_20260620_v399';
  window.__ELTAUM_TABS_FORCE_BUILD__ = BUILD;
  console.info('[Catálogo CAIXA] Patch filtros gráficos ativo:', BUILD);

  const repoRaw = 'https://raw.githubusercontent.com/eltonprivatebanker/catalogo-fundos-caixa/main/';
  const cache = window.__ELTAUM_CHART_CACHE__ || (window.__ELTAUM_CHART_CACHE__ = { ipca:null, selic:null, mercado:null });

  function baseUrl(){
    try{
      return window.location.protocol === 'file:' ? repoRaw : '';
    }catch(e){
      return '';
    }
  }

  function qs(sel, root){ return Array.from((root || document).querySelectorAll(sel)); }
  function byId(id){ return document.getElementById(id); }
  function pct(v){ return Number(v).toFixed(2).replace('.', ',') + '%'; }
  function dataBR(dt){
    if(!dt || isNaN(dt.getTime())) return '—';
    return String(dt.getDate()).padStart(2,'0') + '/' + String(dt.getMonth()+1).padStart(2,'0') + '/' + dt.getFullYear();
  }
  function mesAno(dt){
    if(!dt || isNaN(dt.getTime())) return '—';
    return String(dt.getMonth()+1).padStart(2,'0') + '/' + dt.getFullYear();
  }
  function parseNum(v){
    if(v === null || v === undefined || v === '') return NaN;
    return Number(String(v).replace(',', '.'));
  }
  function parseDateAny(v){
    if(!v) return null;
    if(v instanceof Date) return v;
    const txt = String(v).trim();
    if(/^\d{2}\/\d{2}\/\d{4}$/.test(txt)){
      const [d,m,y] = txt.split('/');
      return new Date(`${y}-${m}-${d}T00:00:00`);
    }
    if(/^\d{2}\/\d{4}$/.test(txt)){
      const [m,y] = txt.split('/');
      return new Date(`${y}-${m}-01T00:00:00`);
    }
    const dt = new Date(txt);
    return isNaN(dt.getTime()) ? null : dt;
  }

  function extrairArray(obj, nomes){
    if(Array.isArray(obj)) return obj;
    if(!obj || typeof obj !== 'object') return [];
    for(const nome of nomes){
      if(Array.isArray(obj[nome])) return obj[nome];
    }
    return [];
  }

  async function fetchJson(url){
    const r = await fetch(url, { cache:'no-store' });
    if(!r.ok) throw new Error('HTTP ' + r.status + ' em ' + url);
    return await r.json();
  }

  async function carregarJsonDoRepo(nomeArquivo){
    const b = baseUrl();
    const arquivo = encodeURI(nomeArquivo);
    const versao = '?v=' + Date.now();
    const candidatos = b ? [b + arquivo + versao] : [arquivo + versao, repoRaw + arquivo + versao];
    let ultimoErro = null;
    for(const url of candidatos){
      try{ return await fetchJson(url); }
      catch(e){ ultimoErro = e; console.warn('[Gráficos v4] Falha ao carregar', nomeArquivo, url, e); }
    }
    throw ultimoErro || new Error('Não carregou ' + nomeArquivo);
  }

  async function carregarMercadoAtual(){
    if(cache.mercado) return cache.mercado;
    cache.mercado = await carregarJsonDoRepo('mercado_atual.json');
    return cache.mercado;
  }

  function normalizarIPCA(arr){
    return (arr || []).map((d, idx) => {
      const dataRaw = d.Data || d.data || d.data_ref || d.DataReferencia || d.mes_ref || d.label || d.Mes || d.mes || '';
      const dt = parseDateAny(dataRaw);
      const valor = parseNum(d.valor ?? d.Valor ?? d.value ?? d.ipca ?? d.IPCA ?? d.variacao ?? d.Variacao);
      return {
        label: d.label || (dt ? mesAno(dt) : 'p' + (idx + 1)),
        valor,
        _dt: dt,
        _ts: dt ? dt.getTime() : idx
      };
    }).filter(d => Number.isFinite(d.valor)).sort((a,b) => a._ts - b._ts);
  }

  async function carregarIPCA(range){
    if(cache.ipca && cache.ipca.length >= range) return cache.ipca;

    let base = [];
    try{
      const mercado = await carregarMercadoAtual();
      base = normalizarIPCA(mercado?.cards?.ipca?.historico || mercado?.ipca_historico || mercado?.historico_ipca || []);
    }catch(e){
      console.warn('[Gráficos v4] mercado_atual não trouxe IPCA histórico:', e);
    }

    const arquivos = [
      'ipca_historico_base.json',
      'ipca_historico.json',
      'historico_ipca.json',
      'serie_ipca_433.json',
      'ipca_serie_433.json',
      'historico ipca bcb.json'
    ];

    for(const nome of arquivos){
      if(base.length >= range) break;
      try{
        const js = await carregarJsonDoRepo(nome);
        const arr = normalizarIPCA(extrairArray(js, ['conteudo','historico','dados','value','serie','records','ipca','historico_ipca']));
        if(arr.length > base.length) base = arr;
      }catch(e){}
    }

    // Fallback BCB mais simples: últimos N registros da série 433, sem parâmetro de data.
    if(base.length < range){
      try{
        const qtd = Math.max(120, range);
        const arr = await fetchJson(`https://api.bcb.gov.br/dados/serie/bcdata.sgs.433/dados/ultimos/${qtd}?formato=json`);
        const norm = normalizarIPCA(arr);
        if(norm.length > base.length) base = norm;
      }catch(e){
        console.warn('[Gráficos v4] Fallback BCB IPCA não respondeu:', e);
      }
    }

    cache.ipca = base;
    return base;
  }

  function normalizarSelic(arr){
    const norm = (arr || []).map((d, idx) => {
      const dataRaw = d.DataReuniaoCopom || d.data || d.DataInicioVigencia || d.Data || d.data_ref || d.label || '';
      const dt = parseDateAny(dataRaw);
      const valor = parseNum(d.MetaSelic ?? d.valor ?? d.Valor ?? d.TaxaSelic ?? d.taxa ?? d.Selic ?? d.selic);
      return { label: dt ? mesAno(dt) : 'p' + (idx + 1), valor, _dt: dt, _ts: dt ? dt.getTime() : idx };
    }).filter(d => Number.isFinite(d.valor) && d.valor >= 0).sort((a,b) => a._ts - b._ts);

    // Se vier uma série diária, mantém só pontos de mudança para o gráfico ficar leve e didático.
    const compacta = [];
    for(const item of norm){
      const ant = compacta[compacta.length - 1];
      if(!ant || Math.abs(ant.valor - item.valor) > 0.0001) compacta.push(item);
      else compacta[compacta.length - 1] = item; // mantém a data mais recente do mesmo patamar
    }
    return compacta;
  }

  function reconciliarSelicVigenteV248(base, mercado){
    const lista = Array.isArray(base) ? [...base] : [];
    const card = mercado?.cards?.selic_meta || {};
    const valor = Number(card.valor);
    if(!Number.isFinite(valor)) return lista;

    let dataRef = '';
    try{
      if(typeof resolverDataUltimaAlteracaoSelic === 'function'){
        dataRef = resolverDataUltimaAlteracaoSelic(mercado)?.data || '';
      }
    }catch(e){}

    dataRef = dataRef
      || card.ultima_alteracao
      || card.data_ultima_alteracao
      || card.data_mudanca
      || card.vigente_desde
      || card.data_ref
      || '';

    let dt = parseDateAny(dataRef);
    if(!dt || isNaN(dt.getTime())){
      const hoje = new Date();
      dt = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
    }

    const ts = dt.getTime();
    const mesmoDia = (a,b) => {
      if(!a || !b) return false;
      return a.getFullYear() === b.getFullYear()
        && a.getMonth() === b.getMonth()
        && a.getDate() === b.getDate();
    };

    const ultimo = lista[lista.length - 1];
    if(ultimo && ultimo._dt && ultimo._dt.getTime() >= ts && Math.abs(Number(ultimo.valor) - valor) < 0.005){
      return lista;
    }

    const semDuplicarData = lista.filter(item => !(item?._dt && mesmoDia(item._dt, dt)));
    semDuplicarData.push({
      label: mesAno(dt),
      valor,
      _dt: dt,
      _ts: ts,
      _vigente_sync_v248: true
    });

    return semDuplicarData
      .filter(d => Number.isFinite(Number(d.valor)))
      .sort((a,b) => (a._ts || 0) - (b._ts || 0));
  }

  async function carregarSelic(){
    if(cache.selic && cache.selic.length) return cache.selic;

    let base = [];
    let mercadoAtual = null;

    try{
      mercadoAtual = await carregarMercadoAtual();
      base = normalizarSelic(mercadoAtual?.historico_selic || mercadoAtual?.cards?.selic_meta?.historico || []);
    }catch(e){
      console.warn('[Gráficos v4] mercado_atual não trouxe Selic histórica:', e);
    }

    const arquivos = [
      'historico da selic do BC.json',
      'historico_selic.json',
      'selic_historico.json',
      'selic_meta_historico.json'
    ];

    for(const nome of arquivos){
      if(base.length >= 80 && base[0]?._dt?.getFullYear?.() <= 2000) break;
      try{
        const js = await carregarJsonDoRepo(nome);
        const arr = normalizarSelic(extrairArray(js, ['conteudo','historico','dados','value','serie','records','selic','historico_selic']));
        if(arr.length > base.length) base = arr;
      }catch(e){}
    }

    // Fallback BCB: série 432 = meta Selic definida pelo Copom. Pode vir diária; normalizarSelic compacta mudanças.
    if(base.length < 20){
      try{
        const arr = await fetchJson('https://api.bcb.gov.br/dados/serie/bcdata.sgs.432/dados?formato=json&dataInicial=01/01/1999');
        const norm = normalizarSelic(arr);
        if(norm.length > base.length) base = norm;
      }catch(e){
        console.warn('[Gráficos v4] Fallback BCB Selic não respondeu:', e);
      }
    }

    // v248: garante que a taxa vigente do card oficial entre no histórico do gráfico.
    // Isso evita divergência quando o histórico ainda termina em uma decisão anterior.
    try{
      if(!mercadoAtual) mercadoAtual = await carregarMercadoAtual();
      base = reconciliarSelicVigenteV248(base, mercadoAtual);
    }catch(e){
      console.warn('[Selic v248] Não consegui reconciliar a taxa vigente com o histórico:', e);
    }

    cache.selic = base;
    return base;
  }

  function chartDefaults(){
    return {
      responsive:true,
      maintainAspectRatio:false,
      plugins:{
        legend:{display:false},
        tooltip:{
          backgroundColor:'rgba(11,13,26,.95)',
          borderColor:'rgba(200,151,58,.3)',
          borderWidth:1,
          titleColor:'#e8bb6a',
          bodyColor:'#d8dcea',
          padding:10,
          titleFont:{family:'Cormorant Garamond',size:14,weight:'700'},
          bodyFont:{family:'JetBrains Mono',size:11}
        }
      },
      scales:{
        x:{grid:{color:'rgba(255,255,255,.04)',drawBorder:false},ticks:{color:'#3d4560',font:{family:'JetBrains Mono',size:9},maxTicksLimit:8}},
        y:{grid:{color:'rgba(255,255,255,.04)',drawBorder:false},ticks:{color:'#5e6b8a',font:{family:'JetBrains Mono',size:10},callback:v=>Number(v).toFixed(2)+'%'}}
      }
    };
  }

  function destruirChart(canvas){
    if(!canvas || !window.Chart) return;
    const existente = Chart.getChart ? Chart.getChart(canvas) : null;
    if(existente && typeof existente.destroy === 'function') existente.destroy();
  }

  function limparMsg(canvas){
    const msg = canvas?.parentElement?.querySelector('.chart-empty-msg');
    if(msg) msg.remove();
  }

  function mostrarMsg(canvasId, texto){
    const canvas = byId(canvasId);
    const body = canvas?.parentElement;
    if(!body) return;
    limparMsg(canvas);
    const msg = document.createElement('div');
    msg.className = 'chart-empty-msg';
    msg.style.cssText = 'position:absolute;inset:0;display:flex;align-items:center;justify-content:center;text-align:center;padding:18px;color:var(--muted);font-size:.72rem;font-family:JetBrains Mono,monospace;line-height:1.5;background:transparent;pointer-events:none';
    msg.textContent = texto;
    body.appendChild(msg);
  }

  async function desenharIPCA(range){
    if(!window.Chart){ mostrarMsg('chartIpca', 'Chart.js ainda não carregou. Recarregue a página.'); return; }
    const r = Number(range) || 24;
    const dados = await carregarIPCA(r);
    const slice = dados.slice(-r);
    const canvas = byId('chartIpca');
    const ctx = canvas?.getContext('2d');
    if(!ctx || !slice.length){ mostrarMsg('chartIpca', 'Histórico de IPCA temporariamente indisponível.'); return; }
    limparMsg(canvas);
    destruirChart(canvas);

    const labels = slice.map(d => d.label);
    const values = slice.map(d => d.valor);
    const colors = values.map(v => v >= 0 ? 'rgba(46,209,122,.72)' : 'rgba(240,85,101,.78)');
    const barPct = r >= 120 ? .62 : r >= 60 ? .70 : .82;
    const catPct = r >= 120 ? .74 : r >= 60 ? .82 : .90;

    atualizarResumoIPCAMensalV250(slice);

    new Chart(ctx, {
      type:'bar',
      data:{
        labels,
        datasets:[{
          data:values,
          backgroundColor:colors,
          borderColor:colors,
          borderWidth:1,
          borderRadius:r >= 120 ? 1 : 2,
          barPercentage:barPct,
          categoryPercentage:catPct,
          maxBarThickness:r >= 120 ? 8 : r >= 60 ? 12 : 22
        }]
      },
      options:ipcaChartOptionsV250(r)
    });
  }

  function janelaSelic(dados, range){
    if(range >= 999) return dados;
    if(!dados.length) return [];
    const ultimo = dados[dados.length - 1]._dt;
    if(!ultimo || isNaN(ultimo.getTime())) return dados.slice(-Math.min(range, dados.length));
    const limite = new Date(ultimo);
    limite.setMonth(limite.getMonth() - range);
    let out = dados.filter(d => d._dt && d._dt >= limite);
    if(out.length < 2) out = dados.slice(-Math.min(Math.max(2, range), dados.length));
    return out;
  }

  function atualizarResumoSelic(slice){
    if(!slice.length) return;
    const values = slice.map(d => d.valor);
    const maxVal = Math.max(...values);
    const minVal = Math.min(...values);
    const maxItem = slice[values.indexOf(maxVal)];
    const minItem = slice[values.indexOf(minVal)];
    const hoje = slice[slice.length - 1];

    let vigenteValor = hoje.valor;
    let vigenteData = dataBR(hoje._dt);

    // v248: o card "Vigente" deve refletir a taxa vigente oficial do painel,
    // não apenas o último ponto que veio no histórico antigo.
    try{
      const card = _dadosMercado?.cards?.selic_meta || {};
      const valorCard = Number(card.valor);
      if(Number.isFinite(valorCard)){
        vigenteValor = valorCard;
        const ref = typeof resolverDataUltimaAlteracaoSelic === 'function'
          ? resolverDataUltimaAlteracaoSelic(_dadosMercado)
          : null;
        vigenteData = ref?.data
          || card.ultima_alteracao
          || card.data_ultima_alteracao
          || card.vigente_desde
          || card.data_ref
          || vigenteData;
      }
    }catch(e){}

    const set = (id, txt) => { const el = byId(id); if(el) el.textContent = txt; };
    set('selicMaxResumo', pct(maxVal) + ' a.a.');
    set('selicMaxData', dataBR(maxItem?._dt));
    set('selicMinResumo', pct(minVal) + ' a.a.');
    set('selicMinData', dataBR(minItem?._dt));
    set('selicHojeResumo', pct(vigenteValor) + ' a.a.');
    set('selicHojeData', vigenteData ? `desde ${vigenteData}` : 'vigente');
  }

  async function desenharSelic(range){
    if(!window.Chart){ mostrarMsg('chartSelic', 'Chart.js ainda não carregou. Recarregue a página.'); return; }
    const dados = await carregarSelic();
    const slice = janelaSelic(dados, range);
    const canvas = byId('chartSelic');
    const ctx = canvas?.getContext('2d');
    if(!ctx || !slice.length){ mostrarMsg('chartSelic', 'Histórico da Selic temporariamente indisponível.'); return; }
    limparMsg(canvas);
    atualizarResumoSelic(slice);
    destruirChart(canvas);

    const labels = slice.map(d => d.label);
    const values = slice.map(d => d.valor);
    const xTicksSelicV253 = selicAxisConfigV253(slice, range);
    const maxVal = Math.max(...values);
    const minVal = Math.min(...values);
    const currentIndex = Math.max(0, values.length - 1);
    const maxIndex = values.indexOf(maxVal);
    const minIndex = values.indexOf(minVal);

    // v245: melhora a leitura no mobile. A linha fica mais limpa e apenas
    // máxima, mínima e vigente recebem marcadores de destaque.
    const isMobile = window.matchMedia && window.matchMedia('(max-width: 760px)').matches;
    const dense = values.length > 70;
    const medium = values.length > 28;
    const basePointRadius = isMobile ? (dense ? 0 : medium ? 1.2 : 2.2) : (dense ? 1.3 : 2.6);
    const baseHoverRadius = isMobile ? 4.2 : 5;
    const baseRadius = values.map(() => basePointRadius);
    const pointColors = values.map(() => '#e8bb6a');
    const pointBorders = values.map(() => 'rgba(16,18,30,.95)');
    const hoverRadius = values.map(() => baseHoverRadius);

    const applyMarker = (idx, color, radius) => {
      if(idx < 0 || idx >= values.length) return;
      baseRadius[idx] = Math.max(baseRadius[idx], radius);
      pointColors[idx] = color;
      pointBorders[idx] = 'rgba(8,10,18,.98)';
      hoverRadius[idx] = Math.max(hoverRadius[idx], radius + 1.8);
    };

    applyMarker(maxIndex, '#e8bb6a', isMobile ? 4.8 : 5.6);
    applyMarker(minIndex, '#5b9cf6', isMobile ? 4.8 : 5.6);
    applyMarker(currentIndex, '#2ed17a', isMobile ? 5.4 : 6.2);

    const markerDataset = (index, color, label, radius) => ({
      type:'scatter',
      label,
      data: values.map((v, i) => i === index ? v : null),
      pointRadius: radius,
      pointHoverRadius: radius + 1.5,
      pointBackgroundColor: color,
      pointBorderColor: 'rgba(8,10,18,.98)',
      pointBorderWidth: 2,
      showLine: false,
      spanGaps: false,
      order: 1
    });

    const defaults = chartDefaults();
    const maxTicks = isMobile ? (range >= 999 ? 6 : range >= 60 ? 5 : 4) : undefined;

    new Chart(ctx, {
      type:'line',
      data:{ labels, datasets:[
        {
          label:'Selic',
          data:values,
          borderColor:'#c8973a',
          backgroundColor:'rgba(200,151,58,.07)',
          borderWidth:isMobile ? 2.15 : 2,
          pointBackgroundColor:pointColors,
          pointBorderColor:pointBorders,
          pointBorderWidth:1.25,
          pointRadius:baseRadius,
          pointHoverRadius:hoverRadius,
          fill:true,
          stepped:'before',
          tension:0,
          order:3
        },
        markerDataset(maxIndex, '#e8bb6a', 'Máxima do período', isMobile ? 5.4 : 6),
        markerDataset(minIndex, '#5b9cf6', 'Mínima do período', isMobile ? 5.4 : 6),
        markerDataset(currentIndex, '#2ed17a', 'Taxa vigente', isMobile ? 6 : 6.8)
      ] },
      options:{
        ...defaults,
        maintainAspectRatio:false,
        layout:{ padding:{ top:isMobile ? 6 : 10, right:isMobile ? 8 : 12, bottom:isMobile ? 2 : 6, left:isMobile ? 0 : 4 } },
        plugins:{
          ...defaults.plugins,
          tooltip:{
            ...defaults.plugins.tooltip,
            callbacks:{
              label:ctx=>{
                const idx = ctx.dataIndex;
                const prefix = idx === maxIndex ? 'Máxima' : idx === minIndex ? 'Mínima' : idx === currentIndex ? 'Vigente' : 'Selic';
                return prefix + ': ' + pct(ctx.parsed.y) + ' a.a.';
              }
            }
          },
          legend:{ display:false }
        },
        scales:{
          ...defaults.scales,
          x:{
            ...defaults.scales.x,
            ticks:{
              ...defaults.scales.x.ticks,
              autoSkip:true,
              maxTicksLimit:maxTicks,
              maxRotation:isMobile ? 42 : 35,
              minRotation:isMobile ? 42 : 0,
              font:{ size:isMobile ? 9 : 10 }
            },
            grid:{ ...defaults.scales.x.grid, drawBorder:false }
          },
          y:{
            ...defaults.scales.y,
            suggestedMin:0,
            suggestedMax:maxVal * 1.10,
            ticks:{
              ...defaults.scales.y.ticks,
              maxTicksLimit:isMobile ? 7 : 8,
              font:{ size:isMobile ? 9 : 10 }
            }
          }
        }
      }
    });
  }

  function tabsDoGrafico(chart){
    return qs('.chart-tab[data-chart="' + chart + '"]');
  }

  function marcarAtivo(btn){
    const chart = btn?.dataset?.chart;
    if(!chart) return;
    tabsDoGrafico(chart).forEach(tab => {
      const ativo = tab === btn;
      tab.classList.toggle('active', ativo);
      tab.setAttribute('aria-pressed', ativo ? 'true' : 'false');
      tab.setAttribute('type', 'button');
      tab.style.pointerEvents = 'auto';
      tab.style.cursor = 'pointer';
    });
  }

  function setLoading(btn, ligado){
    if(!btn) return;
    if(ligado){
      btn.dataset.loadingChart = '1';
      btn.style.opacity = '.72';
    }else{
      delete btn.dataset.loadingChart;
      btn.style.opacity = '';
    }
  }

  async function trocarPeriodo(btn){
    const chart = btn?.dataset?.chart;
    const range = Number(btn?.dataset?.range);
    if(!chart || !Number.isFinite(range)) return;
    marcarAtivo(btn);
    setLoading(btn, true);
    try{
      if(chart === 'ipca') await desenharIPCA(range);
      if(chart === 'selic') await desenharSelic(range);
      setTimeout(() => {
        const canvas = byId(chart === 'ipca' ? 'chartIpca' : 'chartSelic');
        const ch = window.Chart?.getChart ? Chart.getChart(canvas) : null;
        if(ch && typeof ch.resize === 'function') ch.resize();
      }, 40);
    }catch(e){
      console.warn('[Gráficos v4] Erro ao trocar período:', chart, range, e);
      mostrarMsg(chart === 'ipca' ? 'chartIpca' : 'chartSelic', 'Não consegui redesenhar este período agora. Veja o console para detalhes.');
    }finally{
      setLoading(btn, false);
    }
  }

  function prepararBotoes(){
    qs('.chart-tab[data-chart]').forEach(btn => {
      btn.setAttribute('type', 'button');
      btn.setAttribute('aria-pressed', btn.classList.contains('active') ? 'true' : 'false');
      btn.style.pointerEvents = 'auto';
      btn.style.cursor = 'pointer';
    });
  }

  function capturar(ev){
    const target = ev.target;
    const btn = target && target.closest ? target.closest('.chart-tab[data-chart]') : null;
    if(!btn) return;
    ev.preventDefault();
    if(typeof ev.stopImmediatePropagation === 'function') ev.stopImmediatePropagation();
    trocarPeriodo(btn);
  }

  prepararBotoes();
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', prepararBotoes, {once:true});
  else setTimeout(prepararBotoes, 0);
  setTimeout(prepararBotoes, 700);
  setTimeout(prepararBotoes, 2000);

  // v363: usa somente click. Pointerup em captura disparava redraw durante rolagem mobile.
  document.addEventListener('click', capturar, true);
})();
/* Patches legados v5/v6 dos tabs removidos pela correção v228. */
/* ════════════════════════════════════════════════════
   v24 — Mobile card-first para o catálogo de fundos
════════════════════════════════════════════════════ */
(function(){
  'use strict';
  const BUILD='ELTAUM_CATALOGO_MOBILE_CARDS_CLEAN_20260604_v24';
  function isMobile(){return window.matchMedia && window.matchMedia('(max-width: 820px)').matches;}
  function qsa(sel,root=document){return Array.from((root||document).querySelectorAll(sel));}
  function forceCards(){
    if(!isMobile()) return;
    document.body.classList.add('fund-card-mode','catalog-mobile-clean');
    try{ localStorage.setItem('fundMobileView','cards'); }catch(e){}
    qsa('.mobile-view-btn').forEach(b=>b.classList.toggle('active',b.dataset.view==='cards'));
    const g=document.getElementById('gfbGo');
    if(g){ g.textContent='Fundos ↓'; g.setAttribute('aria-label','Ir para os fundos'); }
    if(typeof window.renderMobileFundCards==='function'){
      try{ window.renderMobileFundCards(); }catch(e){}
    }
  }
  function scrollFunds(){
    const sec=document.getElementById('sec-fundos');
    if(!sec) return;
    const offset=isMobile()?96:64;
    const top=sec.getBoundingClientRect().top+window.scrollY-offset;
    window.scrollTo({top:Math.max(0,top),behavior:'smooth'});
  }
  function neutralizeGoButton(){
    const old=document.getElementById('gfbGo');
    if(!old || old.dataset.cleanV24==='1') return;
    const fresh=old.cloneNode(true);
    fresh.dataset.cleanV24='1';
    fresh.textContent='Fundos ↓';
    fresh.setAttribute('aria-label','Ir para os fundos');
    old.parentNode.replaceChild(fresh,old);
    fresh.addEventListener('click',function(ev){
      if(!isMobile()) return;
      ev.preventDefault();
      ev.stopPropagation();
      if(ev.stopImmediatePropagation) ev.stopImmediatePropagation();
      forceCards();
      setTimeout(scrollFunds,30);
    },true);
  }
  function init(){
    forceCards();
    neutralizeGoButton();
    setTimeout(forceCards,120);
    setTimeout(forceCards,500);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
  window.addEventListener('resize',()=>setTimeout(forceCards,80),{passive:true});
  window.addEventListener('orientationchange',()=>setTimeout(forceCards,180),{passive:true});
  document.addEventListener('input',function(ev){
    if(ev.target && (ev.target.id==='searchInput' || ev.target.id==='gfbSearch')){
      setTimeout(forceCards,340);
    }
  },true);
  document.addEventListener('click',function(ev){
    if(!isMobile()) return;
    const tableBtn=ev.target && ev.target.closest ? ev.target.closest('.mobile-view-btn[data-view="table"]') : null;
    if(tableBtn){
      ev.preventDefault();
      ev.stopPropagation();
      if(ev.stopImmediatePropagation) ev.stopImmediatePropagation();
      forceCards();
    }
  },true);
  const oldRender=window.render;
  if(typeof oldRender==='function' && !oldRender.__v24Clean){
    window.render=function(){
      const r=oldRender.apply(this,arguments);
      setTimeout(forceCards,0);
      return r;
    };
    window.render.__v24Clean=true;
  }
})();


/* ════════════════════════════════════════════════════
   v26 — Catálogo mobile: ações rápidas e detalhes persistentes
════════════════════════════════════════════════════ */
(function(){
  'use strict';
  window.__ELTAUM_MOBILE_CATALOG_V26__='ELTAUM_CATALOGO_MOBILE_ACOES_DETALHES_20260604_v26';
  function isMobile(){return window.matchMedia && window.matchMedia('(max-width: 820px)').matches;}
  function syncCards(){
    if(!isMobile()) return;
    document.body.classList.add('fund-card-mode','catalog-mobile-clean','catalog-mobile-v26');
    try{ localStorage.setItem('fundMobileView','cards'); }catch(e){}
    if(typeof window.renderMobileFundCards==='function'){
      try{ window.renderMobileFundCards(); }catch(e){}
    }
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>setTimeout(syncCards,450),{once:true});
  else setTimeout(syncCards,450);
})();


/* ════════════════════════════════════════════════════════
   PATCH v28 — Filtros mobile simplificados
   - Insere filtros rápidos dentro do drawer
   - Avançados ficam recolhidos por padrão
   - Mantém apenas uma categoria avançada aberta
════════════════════════════════════════════════════════ */
(function(){
  'use strict';

  function isMobileV28(){
    try{return window.matchMedia && window.matchMedia('(max-width: 820px)').matches;}catch(e){return false;}
  }
  function qs(sel,root=document){return root.querySelector(sel);}
  function qsa(sel,root=document){return Array.from(root.querySelectorAll(sel));}

  const QUICK = [
    {preset:'all', label:'Todos'},
    {preset:'pf', label:'Pessoa Física'},
    {preset:'cdi', label:'CDI'},
    {preset:'conservador', label:'Conservador'},
    {preset:'renda-fixa', label:'Renda Fixa'},
    {preset:'multimercado', label:'Multimercado'}
  ];

  function activePresetV28(){
    let cat='', bench='', risco='', perfil='';
    try{cat=activeCat||'';}catch(e){}
    try{bench=activeBenchmark||'';}catch(e){}
    try{risco=activeRisco||'';}catch(e){}
    try{perfil=activePerfil||'';}catch(e){}
    if(!cat && !bench && !risco && !perfil) return 'all';
    if(perfil==='PF') return 'pf';
    if(bench==='CDI') return 'cdi';
    if(risco==='Conservador') return 'conservador';
    if(cat==='RENDA FIXA') return 'renda-fixa';
    if(cat==='MULTIMERCADO') return 'multimercado';
    return '';
  }

  function clickExistingPreset(preset){
    const btn = qs(`.filter-preset-chip[data-preset="${preset}"]`);
    if(btn){ btn.click(); return true; }
    return false;
  }

  function clearDirect(){
    try{activeCat=''; activeBenchmark=''; activePerfil=''; activeRisco=''; hideSemDados=false;}catch(e){}
    const t=qs('#toggleSemDados'); if(t) t.checked=false;
    qsa('#fundFilterDrawer .chip').forEach(b=>b.classList.remove('active'));
    qsa('#fundFilterDrawer [data-cat=""], #fundFilterDrawer [data-benchmark=""], #fundFilterDrawer [data-perfil=""], #fundFilterDrawer [data-risco=""]').forEach(b=>b.classList.add('active'));
    try{ if(typeof applyFilter==='function') applyFilter(); }catch(e){}
  }

  function applyPresetDirect(preset){
    if(preset==='all'){ clearDirect(); return; }
    if(clickExistingPreset(preset)) return;
    try{
      if(preset==='pf') activePerfil='PF';
      if(preset==='cdi') activeBenchmark='CDI';
      if(preset==='conservador') activeRisco='Conservador';
      if(preset==='renda-fixa') activeCat='RENDA FIXA';
      if(preset==='multimercado') activeCat='MULTIMERCADO';
      if(typeof applyFilter==='function') applyFilter();
    }catch(e){}
  }

  function refreshFastButtons(){
    const active=activePresetV28();
    qsa('.filter-fast-btn-v28').forEach(b=>{
      b.classList.toggle('is-active', b.dataset.v28Preset===active);
      b.setAttribute('aria-pressed', b.dataset.v28Preset===active ? 'true':'false');
    });
    const drawer=qs('#fundFilterDrawer');
    const advBtn=qs('.filter-advanced-toggle-v28');
    if(advBtn && drawer){
      const open=drawer.classList.contains('filters-advanced-open');
      advBtn.setAttribute('aria-expanded',open?'true':'false');
      const txt=advBtn.querySelector('span:last-child');
      if(txt) txt.textContent=open?'Ocultar opções':'Mais opções';
    }
    const apply=qs('#filterApplyBtn');
    if(apply) apply.textContent='Ver resultados';
  }

  function buildFastPanel(){
    const drawer=qs('#fundFilterDrawer');
    if(!drawer || drawer.querySelector('.filter-mobile-fast-v28')) return;
    const groups=qs('.filter-groups-grid',drawer);
    const panel=document.createElement('div');
    panel.className='filter-mobile-fast-v28';
    panel.innerHTML=`
      <div class="filter-mobile-fast-title-v28">
        <span>Filtros rápidos</span>
        <small>toque para aplicar</small>
      </div>
      <div class="filter-mobile-fast-grid-v28">
        ${QUICK.map(q=>`<button type="button" class="filter-fast-btn-v28" data-v28-preset="${q.preset}" aria-pressed="false">${q.label}</button>`).join('')}
        <button type="button" class="filter-advanced-toggle-v28" aria-expanded="false"><span>Filtros avançados</span><span>Mais opções</span></button>
      </div>`;
    if(groups) drawer.insertBefore(panel,groups); else drawer.appendChild(panel);

    panel.addEventListener('click',ev=>{
      const fast=ev.target.closest('.filter-fast-btn-v28');
      const adv=ev.target.closest('.filter-advanced-toggle-v28');
      if(fast){
        ev.preventDefault(); ev.stopPropagation();
        applyPresetDirect(fast.dataset.v28Preset);
        setTimeout(refreshFastButtons,80);
      }
      if(adv){
        ev.preventDefault(); ev.stopPropagation();
        drawer.classList.toggle('filters-advanced-open');
        setTimeout(refreshFastButtons,30);
      }
    },true);
  }

  function refineDrawerBehavior(){
    const drawer=qs('#fundFilterDrawer');
    if(!drawer || drawer.dataset.v28Ready==='1') return;
    drawer.dataset.v28Ready='1';

    // Começa simples no mobile: avançados fechados.
    if(isMobileV28()) drawer.classList.remove('filters-advanced-open');

    drawer.addEventListener('toggle',ev=>{
      const d=ev.target;
      if(!d || !d.matches || !d.matches('.filter-group-accordion') || !d.open) return;
      qsa('.filter-group-accordion',drawer).forEach(o=>{ if(o!==d) o.open=false; });
    },true);

    drawer.addEventListener('click',ev=>{
      if(ev.target.closest('.chip')) setTimeout(refreshFastButtons,100);
    },true);
  }

  function centerOnOpenPatch(){
    const btn=qs('#mobileFilterToggle');
    const drawer=qs('#fundFilterDrawer');
    if(!btn || !drawer || btn.dataset.v28OpenPatch==='1') return;
    btn.dataset.v28OpenPatch='1';
    btn.addEventListener('click',()=>{
      setTimeout(()=>{
        if(!isMobileV28()) return;
        if(!drawer.classList.contains('mobile-filters-collapsed')){
          drawer.classList.remove('filters-advanced-open');
          qsa('.filter-group-accordion',drawer).forEach(d=>d.open=false);
          refreshFastButtons();
        }
      },60);
    },true);
  }

  function init(){
    buildFastPanel();
    refineDrawerBehavior();
    centerOnOpenPatch();
    refreshFastButtons();
    const clearTop=qs('#clearFiltersTop');
    if(clearTop && !clearTop.dataset.v28){
      clearTop.dataset.v28='1';
      clearTop.addEventListener('click',()=>setTimeout(refreshFastButtons,80),true);
    }
    const clear=qs('#clearFiltersBtn');
    if(clear && !clear.dataset.v28){
      clear.dataset.v28='1';
      clear.addEventListener('click',()=>setTimeout(refreshFastButtons,80),true);
    }
    setInterval(refreshFastButtons,1800);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>setTimeout(init,350));
  else setTimeout(init,350);
})();


/* ════════════════════════════════════════════════════════
   PATCH v44 — Filtro mobile limpo por categorias
   Base aprovada: v40. Remove vestígios de filtros avançados no mobile.
════════════════════════════════════════════════════════ */
(function(){
  'use strict';
  const BUILD='ELTAUM_FILTRO_CATEGORIAS_LIMPO_20260605_v44';
  const CATEGORY_LABELS={
    '':'Todos os fundos',
    'RENDA FIXA SIMPLES':'RF Simples',
    'RENDA FIXA':'Renda Fixa',
    'RENDA FIXA REFERENCIADO':'RF Referenciado',
    'RENDA FIXA CURTO PRAZO':'RF Curto Prazo',
    'MULTIMERCADO':'Multimercado',
    'CAMBIAL':'Cambial',
    'ACOES':'Ações',
    'FUNDO DE INDICE':'Fundo de Índice',
    'FUNDOS MUTUOS DE PRIVATIZACAO':'FMP / Privatização'
  };

  function qs(sel,root=document){return root.querySelector(sel);} 
  function qsa(sel,root=document){return Array.from(root.querySelectorAll(sel));}
  function isMobile(){try{return window.matchMedia('(max-width:820px)').matches;}catch(e){return false;}}

  function closePanel(){
    const drawer=qs('#fundFilterDrawer');
    const btn=qs('#mobileFilterToggle');
    const backdrop=qs('#filterBackdrop');
    const label=qs('#filterButtonText');
    if(drawer){
      drawer.classList.add('mobile-filters-collapsed','desktop-filters-collapsed');
      drawer.classList.remove('filters-advanced-open','filters-select-v37','filters-caixa-v33');
    }
    document.body.classList.remove('filter-sheet-open');
    if(backdrop) backdrop.classList.remove('active');
    if(btn) btn.setAttribute('aria-expanded','false');
    if(label) label.textContent='Categorias';
  }

  function openPanelClean(){
    const drawer=qs('#fundFilterDrawer');
    const btn=qs('#mobileFilterToggle');
    const backdrop=qs('#filterBackdrop');
    const label=qs('#filterButtonText');
    if(drawer){
      purgeLegacyUi();
      drawer.classList.remove('mobile-filters-collapsed','desktop-filters-collapsed');
      drawer.classList.add('filter-drawer-category-only-v44');
    }
    if(isMobile()) document.body.classList.add('filter-sheet-open');
    if(backdrop && isMobile()) backdrop.classList.add('active');
    if(btn) btn.setAttribute('aria-expanded','true');
    if(label) label.textContent='Fechar';
    syncCategoryButtons();
  }

  function togglePanelClean(ev){
    if(ev){ ev.preventDefault(); ev.stopImmediatePropagation(); ev.stopPropagation(); }
    const drawer=qs('#fundFilterDrawer');
    const closed=!drawer || drawer.classList.contains('mobile-filters-collapsed') || drawer.classList.contains('desktop-filters-collapsed');
    if(closed) openPanelClean(); else closePanel();
    return false;
  }

  function purgeLegacyUi(){
    const drawer=qs('#fundFilterDrawer'); if(!drawer) return;
    drawer.classList.add('filter-drawer-category-only-v44');
    drawer.classList.remove('filters-select-v37','filters-caixa-v33','filters-advanced-open');
    qsa('.filter-mobile-fast-v28,.filter-mobile-classes-v33,.filter-mobile-select-v37,.filter-refine-block-v37,.filter-advanced-line-v37,.filter-select-block-v37,.filter-groups-grid,.filter-group-accordion',drawer).forEach(el=>{
      if(!el.closest('.category-hidden-engine-v44')) el.remove();
    });
    const label=qs('#filterButtonText');
    const btn=qs('#mobileFilterToggle');
    if(label && (!btn || btn.getAttribute('aria-expanded')!=='true')) label.textContent='Categorias';
  }

  function syncHiddenChip(cat){
    const row=qs('#catFilters'); if(!row) return;
    qsa('[data-cat]',row).forEach(b=>b.classList.remove('active'));
    let target=row.querySelector(`[data-cat="${String(cat||'').replace(/"/g,'\\"')}"]`) || row.querySelector('[data-cat=""]');
    if(target) target.classList.add('active');
  }

  function syncCategoryButtons(){
    let cat='';
    try{cat=activeCat||'';}catch(e){}
    qsa('.category-choice-v44').forEach(btn=>{
      const on=String(btn.dataset.cat||'')===String(cat||'');
      btn.classList.toggle('active',on);
      btn.setAttribute('aria-pressed',on?'true':'false');
    });
    const summary=qs('#mobileFilterSummary');
    if(summary) summary.textContent='Categoria: '+(CATEGORY_LABELS[cat]||cat||'Todos os fundos');
    const count=qs('#filterActiveCount');
    if(count){
      count.textContent=cat ? '1' : '0';
      count.classList.toggle('has-active',!!cat);
      count.classList.toggle('is-active',!!cat);
    }
  }

  function applyCategory(cat,shouldClose=true){
    try{
      activeCat=cat||'';
      activeBenchmark='';
      activePerfil='';
      activeRisco='';
      hideSemDados=false;
      currentPage=1;
    }catch(e){}
    syncHiddenChip(cat||'');
    syncCategoryButtons();
    try{ if(typeof applyFilter==='function') applyFilter(); }catch(e){}
    try{ if(typeof updateFundResultSummary==='function') updateFundResultSummary(); }catch(e){}
    setTimeout(syncCategoryButtons,90);
    if(shouldClose) setTimeout(closePanel,120);
  }

  function bind(){
    const meta=qs('meta[name="app-build"]'); if(meta) meta.content=BUILD;
    const btn=qs('#mobileFilterToggle');
    if(btn && btn.dataset.v44Bound!=='1'){
      btn.dataset.v44Bound='1';
      btn.addEventListener('click',togglePanelClean,true);
    }
    qsa('.category-choice-v44').forEach(b=>{
      if(b.dataset.v44Bound==='1') return;
      b.dataset.v44Bound='1';
      b.addEventListener('click',ev=>{
        ev.preventDefault(); ev.stopPropagation(); ev.stopImmediatePropagation();
        applyCategory(b.dataset.cat||'',true);
      },true);
    });
    const close=qs('#filterCloseBtn');
    if(close && close.dataset.v44Bound!=='1'){
      close.dataset.v44Bound='1'; close.addEventListener('click',ev=>{ev.preventDefault(); closePanel();},true);
    }
    const apply=qs('#filterApplyBtn');
    if(apply && apply.dataset.v44Bound!=='1'){
      apply.dataset.v44Bound='1'; apply.textContent='Fechar'; apply.addEventListener('click',ev=>{ev.preventDefault(); closePanel();},true);
    }
    const clear=qs('#clearFiltersBtn');
    if(clear && clear.dataset.v44Bound!=='1'){
      clear.dataset.v44Bound='1'; clear.addEventListener('click',ev=>{ev.preventDefault(); applyCategory('',false);},true);
    }
    const clearTop=qs('#clearFiltersTop');
    if(clearTop && clearTop.dataset.v44Bound!=='1'){
      clearTop.dataset.v44Bound='1'; clearTop.addEventListener('click',ev=>{ev.preventDefault(); applyCategory('',false);},true);
    }
    const backdrop=qs('#filterBackdrop');
    if(backdrop && backdrop.dataset.v44Bound!=='1'){
      backdrop.dataset.v44Bound='1'; backdrop.addEventListener('click',closePanel,true);
    }
    document.addEventListener('keydown',ev=>{ if(ev.key==='Escape') closePanel(); },{once:false});
    purgeLegacyUi();
    syncCategoryButtons();
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>setTimeout(bind,500));
  else setTimeout(bind,500);
  setInterval(()=>{ purgeLegacyUi(); bind(); syncCategoryButtons(); },1500);
})();

/* Build UI: ELTAUM_FILTRO_CATEGORIAS_LIMPO_20260605_v44 */


/* ════════════════════════════════════════════════════════
   PATCH v45 — Visualização mobile: Lista tabular x Cards
   Permite ver mais fundos por tela sem perder os cards detalhados.
════════════════════════════════════════════════════════ */
(function(){
  'use strict';
  const BUILD='ELTAUM_LISTA_TABULAR_MOBILE_20260605_v45';
  const MODE_KEY='fundMobileViewV45';
  const LEGACY_KEY='fundMobileView';
  const LABELS={
    'RENDA FIXA SIMPLES':'RF SIMPLES',
    'RENDA FIXA':'RENDA FIXA',
    'RENDA FIXA REFERENCIADO':'RF REFERENC.',
    'RENDA FIXA CURTO PRAZO':'RF CURTO',
    'MULTIMERCADO':'MULTIMERCADO',
    'CAMBIAL':'CAMBIAL',
    'ACOES':'AÇÕES',
    'FUNDO DE INDICE':'ÍNDICE',
    'FUNDOS MUTUOS DE PRIVATIZACAO':'FMP'
  };

  function qs(sel,root=document){return root.querySelector(sel);} 
  function qsa(sel,root=document){return Array.from(root.querySelectorAll(sel));}
  function isMobile(){try{return window.matchMedia('(max-width:820px)').matches;}catch(e){return false;}}
  function esc(v){return String(v??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
  function clean(v){const s=String(v??'').trim(); return s && s!=='-' && s!=='—' ? s : '—';}
  function num(v){try{ return typeof toNum==='function' ? toNum(v) : parseFloat(String(v).replace('%','').replace(/\./g,'').replace(',','.')); }catch(e){ return null; }}
  function cls(v){const n=num(v); return n>0?'pos':n<0?'neg':'zero';}
  function catLabel(cat){return LABELS[String(cat||'').trim().toUpperCase()] || clean(cat);}
  function shortCode(row){
    const keys=['codfundo','Código SIART','Codigo SIART','SIART','Código SIICO','Codigo SIICO','SIICO','Código do Fundo','Codigo do Fundo','Cod Fundo','Cód. Fundo'];
    for(const k of keys){ const v=clean(row?.[k]); if(v!=='—') return v; }
    const url=String(row?.URL||'');
    const m=url.match(/(?:codfundo|codigo|fundos?)[=_-]?(\d{3,8})/i) || url.match(/(\d{4,6})(?:\.pdf|\/|$)/i);
    return m ? m[1] : '';
  }
  function cdiText(row){
    try{
      const ratio = typeof calcCdiRatio==='function' ? calcCdiRatio(num(row['Acum. 12M (%)']), indicState?.cdi?.m12) : null;
      if(ratio!==null && ratio!==undefined && Number.isFinite(Number(ratio))) return ratio+'%';
    }catch(e){}
    const raw=clean(row['% CDI 12M']);
    return raw==='—' ? '—' : raw.replace(/\s*do\s*CDI/i,'');
  }
  function normalizeMode(mode){return mode==='cards' ? 'cards' : 'list';}
  function getMode(){
    // v67: no celular a experiência oficial é somente Cards.
    // Desktop continua iniciando em Tabela, com opção de alternar para Cards.
    if(isMobile()) return 'cards';
    try{return normalizeMode(localStorage.getItem(MODE_KEY)||'list');}catch(e){return 'list';}
  }
  function saveMode(mode){
    try{localStorage.setItem(MODE_KEY,normalizeMode(mode)); localStorage.setItem(LEGACY_KEY,'cards');}catch(e){}
  }
  function pagedRows(){
    try{
      if(!Array.isArray(filtered)) return [];
      const pg=typeof currentPage==='number' ? currentPage : 1;
      const pp=typeof perPage==='number' ? perPage : 5;
      const start=(pg-1)*pp;
      const end=pp===9999 ? filtered.length : Math.min(start+pp,filtered.length);
      return filtered.slice(start,end).map((r,i)=>({row:r,idx:start+i}));
    }catch(e){return [];}
  }
  function renderList(){
    const box=qs('#mobileFundCards');
    if(!box) return;
    const rows=pagedRows();
    if(!rows.length){
      box.innerHTML='<div class="fund-mobile-table-list"><div class="fund-list-empty-v45">Nenhum fundo encontrado.</div></div>';
      return;
    }
    const html=rows.map(({row,idx})=>{
      const name=clean(row['Fundo']);
      const cat=catLabel(row['Categoria']);
      const risco=clean(row['Perfil de Risco']);
      const code=shortCode(row);
      const mes=clean(row['Acum. Mes (%)']);
      const m12=clean(row['Acum. 12M (%)']);
      const cdi=cdiText(row);
      return `<article class="fund-list-row-v45" data-idx="${idx}" aria-label="${esc(name)}">
        <div class="fund-list-main-v45">
          <div class="fund-list-tags-v45">
            ${cat!=='—'?`<span class="fund-list-tag-v45">${esc(cat)}</span>`:''}
            ${risco!=='—'?`<span class="fund-list-tag-v45 risk">${esc(risco)}</span>`:''}
            ${code?`<span class="fund-list-tag-v45 code">Cód. ${esc(code)}</span>`:''}
          </div>
          <div class="fund-list-name-v45">${esc(name)}</div>
        </div>
        <div class="fund-list-metrics-v45">
          <span class="fund-list-metric-v45"><small>Mês</small><strong class="${cls(mes)}">${esc(mes)}</strong></span>
          <span class="fund-list-metric-v45"><small>12M</small><strong class="${cls(m12)}">${esc(m12)}</strong></span>
          <span class="fund-list-metric-v45 cdi"><small>% CDI</small><strong class="${cls(cdi)}">${esc(cdi)}</strong></span>
        </div>
      </article>`;
    }).join('');
    box.innerHTML='<div class="fund-mobile-table-list">'+html+'</div>';
  }

  const originalRenderCards = window.renderMobileFundCards;
  function renderByMode(){
    const mode=getMode();
    if(mode==='cards'){
      if(typeof originalRenderCards==='function') originalRenderCards.apply(this,arguments);
    }else{
      if(isMobile()) renderList();
    }
  }
  window.renderMobileFundCards=renderByMode;

  function syncButtons(){
    const mode=getMode();
    qsa('.mobile-catalog-view-btn').forEach(btn=>{
      const on=btn.dataset.mobileCatalogView===mode;
      btn.classList.toggle('active',on);
      btn.setAttribute('aria-pressed',on?'true':'false');
    });
  }
  function applyMode(mode){
    mode=normalizeMode(mode);
    const mobile=isMobile();
    // v67: mobile não tem alternância Tabela/Cards; força Cards sempre.
    if(mobile) mode='cards';
    saveMode(mode);
    document.body.classList.toggle('fund-card-mode', mode==='cards' || mobile);
    document.body.classList.toggle('fund-list-mode', false);
    syncButtons();
    renderByMode();
  }
  function ensureToggle(){
    const host=qs('#sec-fundos');
    if(!host || qs('#mobileCatalogViewSwitch')) return;
    const table=qs('#sec-fundos .table-wrap');
    const div=document.createElement('div');
    div.className='mobile-catalog-view-switch';
    div.id='mobileCatalogViewSwitch';
    div.setAttribute('aria-label','Escolher forma de visualização dos fundos no celular');
    div.innerHTML=`<div class="mobile-catalog-view-copy"><strong>Visualização</strong><small>Tabela compara mais fundos; cards priorizam leitura rápida.</small></div><div class="mobile-catalog-view-buttons" role="group" aria-label="Modo de visualização"><button type="button" class="mobile-catalog-view-btn active" data-mobile-catalog-view="list" aria-pressed="true">Tabela</button><button type="button" class="mobile-catalog-view-btn" data-mobile-catalog-view="cards" aria-pressed="false">Cards</button></div>`;
    if(table) host.insertBefore(div,table); else host.appendChild(div);
  }
  function bind(){
    const meta=qs('meta[name="app-build"]'); if(meta) meta.content=BUILD;
    ensureToggle();
    qsa('.mobile-catalog-view-btn').forEach(btn=>{
      if(btn.dataset.v45Bound==='1') return;
      btn.dataset.v45Bound='1';
      btn.addEventListener('click',ev=>{
        ev.preventDefault(); ev.stopPropagation();
        applyMode(btn.dataset.mobileCatalogView||'list');
      },true);
    });
    applyMode(getMode());
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>setTimeout(bind,650),{once:true});
  else setTimeout(bind,650);
  document.addEventListener('click',ev=>{
    const btn=ev.target && ev.target.closest ? ev.target.closest('.category-choice-v44,#clearFiltersTop,#clearFiltersBtn,.active-filter-pill,.active-filter-clear') : null;
    if(btn) setTimeout(()=>applyMode(getMode()),220);
  },true);
  document.addEventListener('input',ev=>{
    if(ev.target && (ev.target.id==='searchInput' || ev.target.id==='gfbSearch')) setTimeout(()=>applyMode(getMode()),360);
  },true);
  window.addEventListener('resize',()=>setTimeout(()=>applyMode(getMode()),160),{passive:true});
  window.addEventListener('orientationchange',()=>setTimeout(()=>applyMode(getMode()),260),{passive:true});
  setInterval(()=>{ if(isMobile()) { ensureToggle(); applyMode(getMode()); } },1800);
})();

/* Build UI: ELTAUM_BUSCA_SCROLL_RESULTADOS_20260605_v46 */


/* ════════════════════════════════════════════════════════
   PATCH v46 — Busca/filtro mobile conduz para resultados
   Objetivo: ao digitar na busca superior ou do catálogo, a tela desce
   para a visualização dos fundos, evitando que o usuário fique preso no topo.
════════════════════════════════════════════════════════ */
(function(){
  'use strict';
  const BUILD='ELTAUM_BUSCA_SCROLL_RESULTADOS_20260605_v46';
  const MODE_KEY='fundMobileViewV45';
  let scrollTimer=null;
  let lastScrollAt=0;

  function qs(sel,root=document){return root.querySelector(sel);} 
  function isMobile(){try{return window.matchMedia('(max-width:820px)').matches;}catch(e){return false;}}
  function hasRealQuery(){
    const s=qs('#searchInput');
    const g=qs('#gfbSearch');
    return [s?.value,g?.value].some(v=>String(v||'').trim().length>=2);
  }
  function preferListMode(){
    // v67: compatibilidade com patch antigo; no mobile mantém Cards.
    try{localStorage.setItem(MODE_KEY,'cards');}catch(e){}
    const btn=qs('.mobile-catalog-view-btn[data-mobile-catalog-view="cards"]');
    if(btn && !btn.classList.contains('active')){
      btn.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true,view:window}));
    }
  }
  function topOffset(){
    const gfb=qs('#gfb');
    const rect=gfb ? gfb.getBoundingClientRect() : null;
    const visible=rect && rect.height>0 && rect.bottom>0;
    const gfbH=visible ? Math.min(74,Math.max(48,rect.height)) : 0;
    return gfbH + 18;
  }
  function ensureHint(){
    // v67: aviso removido no mobile para reduzir ruído visual.
    const old=qs('#mobileResultsHintV46');
    if(old) old.remove();
  }
  function resultsAnchor(){
    return qs('#mobileFundCards') || qs('#sec-fundos .table-wrap') || qs('#sec-fundos');
  }
  function scrollToResults(reason){
    if(!isMobile()) return;
    const target=resultsAnchor();
    if(!target) return;
    const now=Date.now();
    if(now-lastScrollAt<650 && reason==='input') return;
    lastScrollAt=now;
    ensureHint();
    document.body.classList.toggle('mobile-searching-results-v46',!!hasRealQuery());
    const sw=qs('#mobileCatalogViewSwitch');
    if(sw){
      sw.classList.add('results-focus-v46');
      setTimeout(()=>sw.classList.remove('results-focus-v46'),1400);
    }
    const top=Math.max(0,target.getBoundingClientRect().top+window.scrollY-topOffset());
    window.scrollTo({top,behavior:'smooth'});
  }
  function scheduleResultsScroll(reason,delay){
    if(!isMobile()) return;
    clearTimeout(scrollTimer);
    scrollTimer=setTimeout(()=>{
      preferListMode();
      scrollToResults(reason||'input');
    },typeof delay==='number'?delay:520);
  }
  function bind(){
    const meta=qs('meta[name="app-build"]'); if(meta) meta.content=BUILD;
    // v50: não reescreve mais o href do CSS via JavaScript.
    // Isso evitava cache, mas causava recarregamento visual/FOUC após a página abrir.
    ensureHint();
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',bind,{once:true});
  else bind();

  document.addEventListener('input',function(ev){
    const id=ev.target && ev.target.id;
    if(id==='gfbSearch'){
      const hasText=String(ev.target.value||'').trim().length>=2;
      if(hasText) scheduleResultsScroll('input',620);
      else document.body.classList.remove('mobile-searching-results-v46');
    }
  },true);

  document.addEventListener('keydown',function(ev){
    const id=ev.target && ev.target.id;
    if(id==='gfbSearch' && ev.key==='Enter'){
      ev.preventDefault();
      scheduleResultsScroll('enter',80);
      try{ev.target.blur();}catch(e){}
    }
  },true);

  document.addEventListener('click',function(ev){
    if(!isMobile()) return;
    const cat=ev.target && ev.target.closest ? ev.target.closest('.category-choice-v44') : null;
    if(cat) scheduleResultsScroll('category',360);
    const clear=ev.target && ev.target.closest ? ev.target.closest('#clearFiltersTop,#clearFiltersBtn,.active-filter-pill,.active-filter-clear') : null;
    if(clear) scheduleResultsScroll('clear',360);
  },true);

  window.addEventListener('resize',()=>setTimeout(bind,120),{passive:true});
  window.addEventListener('orientationchange',()=>setTimeout(bind,220),{passive:true});
})();

/* Build UI: ELTAUM_BUSCA_SCROLL_RESULTADOS_20260605_v46 */

/* Build UI: ELTAUM_BOOT_STABLE_RANKING_20260606_v51
   PATCH v50 — Ranking executivo limpo + sem reescrever CSS
   - Substitui a visão de abas por uma leitura única: cards, Top 10, melhores por categoria e alertas.
   - Mantém filtros existentes e o seletor de período sem exigir vários cliques.
*/
(function(){
  'use strict';
  const BUILD='ELTAUM_DESKTOP_CARDS_FORMAT_FIX_20260606_v57';
  function qs(sel,root=document){return root.querySelector(sel)}
  function esc(v){return String(v??'').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
  function cleanFund(v){return String(v||'—').replace(/\s*\(\d+\)/g,'').trim()||'—'}
  function compactFundName(v){
    const full=cleanFund(v);
    if(full==='—') return full;
    let s=full
      .replace(/\s*\(\d+\)/g,' ')
      .replace(/\bCAIXA\b/gi,' ')
      .replace(/\b(FIC|FIF|FI|FIA|FIM|ETF)\b/gi,' ')
      .replace(/\b(FUNDO|DE|INVESTIMENTO)\b/gi,' ')
      .replace(/\b(RESP|LTDA|LTD|LP)\b/gi,' ')
      .replace(/\s*-\s*/g,' ')
      .replace(/\s+/g,' ')
      .trim();
    if(!s) return full;

    const replacements=[
      [/\bACOES\b/gi,'Ações'],
      [/\bDOLAR\b/gi,'Dólar'],
      [/\bINDICE\b/gi,'Índice'],
      [/\bCRED PRIV\b/gi,'Cred. Priv.'],
      [/\bREFERENCIADO\b/gi,'Ref.'],
      [/\bCORPORATIVO\b/gi,'Corp.'],
      [/\bBOLSA AMERICANA\b/gi,'Bolsa Americana'],
      [/\bELETROBRAS MIGRACAO\b/gi,'Eletrobras Migração'],
      [/\bELETROBRAS\b/gi,'Eletrobras']
    ];
    replacements.forEach(([pattern,value])=>{s=s.replace(pattern,value);});

    const acronyms=new Set(['RF','DI','CP','CDI','FMP','FGTS','MM','IRF-M','IMA-B','IPCA']);
    s=s.split(/\s+/).map(word=>{
      const clean=word.replace(/[.,]/g,'').toUpperCase();
      if(acronyms.has(clean)) return word.toUpperCase();
      if(word.includes('-')) return word.split('-').map(part=>{
        const p=part.toUpperCase();
        return acronyms.has(p)?p:(part.charAt(0).toUpperCase()+part.slice(1).toLowerCase());
      }).join('-');
      return word.charAt(0).toUpperCase()+word.slice(1).toLowerCase();
    }).join(' ');

    const words=s.split(/\s+/).filter(Boolean);
    if(words.length>4) s=words.slice(0,4).join(' ');
    return s||full;
  }
  function shortCat(v){
    const raw=String(v||'—').trim();
    const n=typeof normRankTxt==='function'?normRankTxt(raw):raw.toUpperCase();
    if(n.includes('FUNDOS MUTUOS')||n.includes('PRIVATIZACAO')) return 'FMP';
    if(n.includes('RENDA FIXA REFERENCIADO')) return 'RF Ref.';
    if(n.includes('RENDA FIXA CURTO')) return 'RF Curto';
    if(n.includes('RENDA FIXA SIMPLES')) return 'RF Simples';
    if(n.includes('RENDA FIXA')) return 'Renda Fixa';
    if(n.includes('MULTIMERCADO')) return 'Multimercado';
    if(n.includes('CAMBIAL')) return 'Cambial';
    if(n.includes('ACOES')) return 'Ações';
    if(n.includes('INDICE')) return 'Índice';
    return raw;
  }
  function num(v){return typeof toNum==='function'?toNum(v):Number(String(v??'').replace('%','').replace(',','.'))}
  function numK(v){return typeof numKpi==='function'?numKpi(v):num(v)}
  function pct(v){
    const n=num(v); if(n===null||Number.isNaN(n)||!Number.isFinite(n)) return '—';
    const sign=n>0?'+':''; return sign+n.toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2})+'%';
  }
  function plMi(v){
    const n=numK(v); if(n===null||Number.isNaN(n)||!Number.isFinite(n)) return 'PL —';
    if(Math.abs(n)>=1000) return 'PL R$ '+(n/1000).toLocaleString('pt-BR',{minimumFractionDigits:1,maximumFractionDigits:1})+' bi';
    return 'PL R$ '+n.toLocaleString('pt-BR',{maximumFractionDigits:0})+' mi';
  }
  function retClass(v){const n=num(v); return n>0?'pos':n<0?'neg':'zero'}
  function campoPorPeriodo(p){return typeof rankCampoPorPeriodo==='function'?rankCampoPorPeriodo(p):(p==='mes'?'Acum. Mes (%)':p==='ano'?'Acum. Ano (%)':'Acum. 12M (%)')}
  function periodoLabel(p){return typeof rankPeriodoLabel==='function'?rankPeriodoLabel(p):(p==='mes'?'mês':p==='ano'?'ano':'12 meses')}
  function periodoResumo(p){return typeof rankPeriodoResumo==='function'?rankPeriodoResumo(p):(p==='mes'?'do mês':p==='ano'?'no ano':'12M')}
  function filtroLabelAtual(){
    if(typeof activeRankFilter==='undefined'||activeRankFilter==='todos') return 'Todos';
    const btn=qs(`[data-rank-filter="${activeRankFilter}"]`);
    return btn?btn.textContent.trim():'Filtro aplicado';
  }
  function cdiReferenciaRankingV538(periodo){
    const p=periodo||'12m';
    const card=typeof cdiCardAtualV230==='function' ? cdiCardAtualV230() : (window.__mercadoAtualV230?.cards?.cdi || {});
    const firstFinite=(...values)=>{
      for(const value of values){
        const n=num(value);
        if(n!==null && !Number.isNaN(n) && Number.isFinite(n)) return n;
      }
      return null;
    };
    if(p==='mes'){
      let atual=null;
      try{ atual=typeof obterCdiAtualV232==='function' ? obterCdiAtualV232().valor : null; }catch(e){ atual=null; }
      return firstFinite(atual, card?.parcial_mes_atual, card?.mensal, indicState?.cdi?.mes);
    }
    if(p==='ano'){
      const direto=firstFinite(card?.acum_ano_com_parcial, card?.acum_ano, card?.ano, indicState?.cdi?.ano);
      if(direto!==null) return direto;
      try{
        const hist=Array.isArray(card?.historico)?card.historico:[];
        const ano=String(new Date().getFullYear());
        const valores=hist
          .map(item=>({key:String(item?.key||item?.data_ref||'').slice(0,7),value:num(item?.valor ?? item?.value)}))
          .filter(item=>item.key.startsWith(ano+'-') && item.value!==null && !Number.isNaN(item.value) && Number.isFinite(item.value))
          .map(item=>item.value);
        if(valores.length && typeof acumularPercentuaisMensaisV229==='function') return acumularPercentuaisMensaisV229(valores);
      }catch(e){}
      return null;
    }
    const m12=typeof resolverCdiPeriodoV229==='function' ? resolverCdiPeriodoV229(card,12) : null;
    return firstFinite(m12, card?.acum_12m, card?.m12, indicState?.cdi?.m12);
  }
  function cdiRatioTxt(r,periodo='12m'){
    try{
      const campo=campoPorPeriodo(periodo);
      const rent=num(r[campo]);
      const cdiRef=cdiReferenciaRankingV538(periodo);
      if(rent===null || Number.isNaN(rent) || !Number.isFinite(rent) || cdiRef===null || cdiRef===0) return '—';
      const ratio=typeof calcCdiRatio==='function' ? calcCdiRatio(rent,cdiRef) : Math.round((rent/cdiRef)*100);
      return ratio===null?'—':ratio+'%';
    }catch(e){return '—'}
  }
  function rowPL(r){return plMi(r['PL (milhoes R$)']||r['PL']||r['Patrimonio Liquido'])}
  function medal(i){return i===0?'🥇':i===1?'🥈':i===2?'🥉':(i+1)+'º'}
  function periodTabs(active){
    const periods=['mes','ano','12m'];
    return `<div class="ranking-exec-periods" role="tablist" aria-label="Período do ranking">${periods.map(p=>`<button type="button" class="rank-period-tab ${active===p?'active':''}" data-rank-target="topFundos" data-rank-period="${p}">${p==='mes'?'Mês':p==='ano'?'Ano':'12M'}</button>`).join('')}</div>`;
  }
  function universePill(){return `<span class="ranking-universe-pill">Universo: <strong>${esc(filtroLabelAtual())}</strong></span>`}
  function riskPill(){return `<span class="ranking-risk-pill-v198">Risco: <strong>${esc(rotuloPerfilRiscoV198(typeof activeRankRisk!=='undefined'?activeRankRisk:''))}</strong></span>`}
  function summaryCard(kind,label,value,name,meta){
    const fullName=cleanFund(name);
    const displayName=kind==='pl' ? fullName : compactFundName(fullName);
    return `<article class="ranking-exec-card ${kind}"><span>${esc(label)}</span><strong class="ranking-value-standard ${kind==='worst'?'neg':'pos'}">${esc(value)}</strong><small title="${esc(fullName)}">${esc(displayName)}</small>${meta?`<em>${esc(meta)}</em>`:''}</article>`;
  }
  function topRow(r,i,campo,periodo){
    const cat=shortCat(r['Categoria']);
    const nome=cleanFund(r['Fundo']);
    const val=pct(r[campo]);
    const cls=retClass(r[campo]);
    const cdi=cdiRatioTxt(r,periodo);
    return `<div class="ranking-top-row">
      <div class="ranking-pos">${medal(i)}</div>
      <div class="ranking-fund"><strong title="${esc(nome)}">${esc(nome)}</strong><span>${esc(cat)} · ${esc(rowPL(r))}</span></div>
      <div class="ranking-value-standard ranking-return ${cls}">${esc(val)}</div>
      <div class="ranking-cdi">${esc(cdi)}</div>
    </div>`;
  }
  function categoryMini([cat,r]){
    const nome=cleanFund(r['Fundo']);
    const nomeCurto=compactFundName(nome);
    const val=pct(r['Acum. 12M (%)']);
    return `<article class="ranking-cat-mini ranking-cat-row-v457 ranking-cat-row-v531">
      <span>${esc(shortCat(cat))}</span>
      <strong class="ranking-value-standard ${retClass(r['Acum. 12M (%)'])}">${esc(val)}</strong>
      <small title="${esc(nome)}"><span class="ranking-cat-name-full-v531">${esc(nome)}</span><span class="ranking-cat-name-short-v531">${esc(nomeCurto)}</span></small>
      <em>Melhor em 12 meses</em>
    </article>`;
  }
  function worstMini(r,i,campo){
    const nome=cleanFund(r['Fundo']);
    return `<div class="ranking-risk-row"><span>${i+1}º</span><strong title="${esc(nome)}">${esc(nome)}</strong><em class="${retClass(r[campo])}">${esc(pct(r[campo]))}</em></div>`;
  }
  function insight(top,worst,periodo){
    if(!top) return 'Ainda não há dados suficientes para montar uma leitura executiva dos rankings.';
    const cat=shortCat(top['Categoria']);
    const nome=cleanFund(top['Fundo']);
    const v=pct(top[campoPorPeriodo(periodo)]);
    const w=worst?` No mesmo recorte, o destaque negativo é ${cleanFund(worst['Fundo'])}, com ${pct(worst[campoPorPeriodo(periodo)])}.`:'';
    return `No período de ${periodoLabel(periodo)}, o maior destaque é ${nome}, da categoria ${cat}, com ${v}.${w}`;
  }
  function compactInsight(top,worst,periodo){
    if(!top) return 'Dados insuficientes para leitura rápida.';
    const positivo=`${pct(top[campoPorPeriodo(periodo)])} em ${shortCat(top['Categoria'])}`;
    if(!worst) return `${periodoLabel(periodo)}: destaque positivo ${positivo}.`;
    return `${periodoLabel(periodo)}: positivo ${positivo}; negativo ${pct(worst[campoPorPeriodo(periodo)])} em ${shortCat(worst['Categoria'])}.`;
  }

  function renderRankingsV50(){
    const grid=qs('#rankingGrid');
    if(!grid || typeof allRows==='undefined' || !Array.isArray(allRows) || !allRows.length) return;
    try{ if(typeof atualizarRankingFilterUI==='function') atualizarRankingFilterUI(); }catch(e){}
    const periodo=(typeof activeRankPeriods!=='undefined' && activeRankPeriods.topFundos) ? activeRankPeriods.topFundos : '12m';
    const campo=campoPorPeriodo(periodo);
    let base=allRows.filter(r=>typeof temDados==='function'?temDados(r):true).filter(r=>typeof passaFiltroRanking==='function'?passaFiltroRanking(r):true);
    try{
      if(typeof activePerfil!=='undefined' && activePerfil) base=base.filter(r=>String(r['Perfis']||r['Perfil']||'').split(/\s*\|\s*/).map(s=>s.trim()).includes(activePerfil));
      if(typeof activeRankRisk!=='undefined' && activeRankRisk) base=base.filter(r=>perfilRiscoCorrespondeV198(r['Perfil de Risco'],activeRankRisk));
    }catch(e){}
    const sortBy=(field,asc=false)=>base.filter(r=>num(r[field])!==null && !Number.isNaN(num(r[field]))).sort((a,b)=>asc?num(a[field])-num(b[field]):num(b[field])-num(a[field]));
    const top=sortBy(campo).slice(0,10);
    const worst=sortBy(campo,true).filter(r=>num(r[campo])<0).slice(0,5);
    const top12=sortBy('Acum. 12M (%)');
    const best12=top12[0];
    const bestMonth=sortBy('Acum. Mes (%)')[0];
    const worst12=sortBy('Acum. 12M (%)',true).find(r=>num(r['Acum. 12M (%)'])<0);

    const catMap={};
    top12.forEach(r=>{const cat=r['Categoria']||'—'; if(!catMap[cat]) catMap[cat]=r;});
    const catTop=Object.entries(catMap).slice(0,8);

    const categoriasFiltradas={};
    base.forEach(r=>{
      const cat=r['Categoria']||'Sem categoria';
      const pl=numK(r['PL (milhoes R$)']||r['PL']||r['Patrimonio Liquido']);
      if(!categoriasFiltradas[cat]) categoriasFiltradas[cat]={pl_total:0,qtd_ativos:0};
      categoriasFiltradas[cat].qtd_ativos+=1;
      if(pl!==null&&!Number.isNaN(pl)&&Number.isFinite(pl)) categoriasFiltradas[cat].pl_total+=pl;
    });
    const catPL=Object.entries(categoriasFiltradas)
      .filter(([,d])=>d.qtd_ativos>0)
      .sort((a,b)=>numK(b[1].pl_total)-numK(a[1].pl_total));
    const maiorPL=catPL[0];

    const cards=[
      summaryCard('best','Melhor 12M', best12?pct(best12['Acum. 12M (%)']):'—', best12?cleanFund(best12['Fundo']):'—', best12?`${cdiRatioTxt(best12,'12m')} do CDI · ${shortCat(best12['Categoria'])}`:''),
      summaryCard('worst','Pior 12M', worst12?pct(worst12['Acum. 12M (%)']):'—', worst12?cleanFund(worst12['Fundo']):'Sem retorno negativo', worst12?shortCat(worst12['Categoria']):''),
      summaryCard('month','Melhor mês', bestMonth?pct(bestMonth['Acum. Mes (%)']):'—', bestMonth?cleanFund(bestMonth['Fundo']):'—', bestMonth?shortCat(bestMonth['Categoria']):''),
      summaryCard('pl','Maior PL', maiorPL?plMi(maiorPL[1].pl_total).replace('PL ',''):'—', maiorPL?shortCat(maiorPL[0]):'—', maiorPL?`${maiorPL[1].qtd_ativos??'—'} fundos`:'')
    ].join('');

    const topRows=top.map((r,i)=>topRow(r,i,campo,periodo)).join('') || '<div class="ranking-empty-v50">Sem dados suficientes para este filtro.</div>';
    const catRows=catTop.map(categoryMini).join('') || '<div class="ranking-empty-v50">Sem categorias suficientes.</div>';
    // v195: o painel lateral de atenção já reúne piores leituras,
    // negativos no ano e fundos sem dados. Evita duplicar a mesma informação
    // dentro do bloco principal de rankings.
    grid.className='ranking-grid ranking-executive-v50 ranking-main-v136';
    grid.innerHTML=`
      <section class="ranking-exec-summary" aria-label="Destaques dos rankings">${cards}</section>
      <section class="ranking-exec-board">
        <div class="ranking-exec-board-head">
          <div><h3>Top 10 fundos no período</h3><p>Ranking por rentabilidade · ${esc(periodoLabel(periodo))}</p></div>
          <div class="ranking-exec-controls">${periodTabs(periodo)}${universePill()}${riskPill()}</div>
        </div>
        <div class="ranking-top-table" role="table" aria-label="Top 10 fundos">
          <div class="ranking-top-header"><span>Pos.</span><span>Fundo</span><span>Retorno</span><span>% CDI no período</span></div>
          ${topRows}
        </div>
      </section>
      <section class="ranking-exec-secondary ranking-exec-secondary-single-v195">
        <div class="ranking-category-panel"><div class="ranking-panel-head"><h3>Melhores por categoria</h3><p>Top fundo de cada classe · 12 meses</p></div><div class="ranking-cat-grid-v50">${catRows}</div></div>
      </section>
    `;
  }

  window.renderRankings=renderRankingsV50;
  try{ renderRankings=renderRankingsV50; }catch(e){}
  function init(){
    const meta=qs('meta[name="app-build"]'); if(meta) meta.content=BUILD;
    // v50: não altera o href do CSS em runtime para evitar recarregamento visual.
    if(typeof allRows!=='undefined' && Array.isArray(allRows) && allRows.length) renderRankingsV50();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true}); else init();
})();


/* ════════════════════════════════════════════════════════
   PATCH v57 — Correção visual dos cards no desktop
════════════════════════════════════════════════════════ */
(function(){
  const BUILD='ELTAUM_DESKTOP_CARDS_FORMAT_FIX_20260606_v57';
  function qs(s,root=document){return root.querySelector(s)}
  function qsa(s,root=document){return Array.from(root.querySelectorAll(s))}
  function markSearching(input){
    if(!input) return;
    const wrap = input.closest('.search-wrap') || input.closest('#gfb-search-wrap') || input.parentElement;
    if(!wrap) return;
    wrap.classList.add('is-searching');
    clearTimeout(wrap.__searchUxTimer);
    wrap.__searchUxTimer=setTimeout(()=>wrap.classList.remove('is-searching'),520);
  }
  function bindSearchFeedback(){
    qsa('#searchInput,#gfbSearch').forEach(inp=>{
      if(inp.dataset.v57SearchFeedback==='1') return;
      inp.dataset.v57SearchFeedback='1';
      inp.addEventListener('input',()=>markSearching(inp),{passive:true});
      inp.addEventListener('change',()=>setTimeout(()=>{
        const wrap = inp.closest('.search-wrap') || inp.closest('#gfb-search-wrap') || inp.parentElement;
        if(wrap) wrap.classList.remove('is-searching');
      },120),{passive:true});
    });
  }
  function init(){
    const meta=qs('meta[name="app-build"]'); if(meta) meta.content=BUILD;
    bindSearchFeedback();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true}); else init();
  document.addEventListener('focusin',ev=>{ if(ev.target && (ev.target.id==='searchInput'||ev.target.id==='gfbSearch')) bindSearchFeedback(); },true);
})();


/* ════════════════════════════════════════════════════════
   v58 — Detalhes dos cards em painel lateral no desktop
   - Evita expansão vertical dos cards no desktop.
   - Mantém cards compactos e abre análise em um painel à direita.
   - No mobile, preserva o comportamento atual em bottom/lista.
════════════════════════════════════════════════════════ */
(function(){
  const BUILD='ELTAUM_MOBILE_CARDS_RANKING_FOCUS_20260606_v67';
  function isDesktopCards(){
    return window.matchMedia && window.matchMedia('(min-width: 821px)').matches && document.body.classList.contains('fund-card-mode');
  }
  function ensurePanel(){
    let backdrop=document.getElementById('fundCardDetailBackdrop');
    let panel=document.getElementById('fundCardDetailPanel');
    if(backdrop && panel) return {backdrop,panel};
    backdrop=document.createElement('div');
    backdrop.id='fundCardDetailBackdrop';
    backdrop.className='fund-card-detail-backdrop-v58';
    backdrop.setAttribute('aria-hidden','true');
    panel=document.createElement('aside');
    panel.id='fundCardDetailPanel';
    panel.className='fund-card-detail-panel-v58';
    panel.setAttribute('aria-hidden','true');
    panel.setAttribute('role','dialog');
    panel.setAttribute('aria-modal','false');
    panel.setAttribute('aria-label','Detalhes do fundo');
    panel.innerHTML=`
      <div class="fund-card-detail-panel-head-v58">
        <div class="fund-card-detail-panel-kicker-v58">Detalhes do fundo</div>
        <button type="button" class="fund-card-detail-panel-close-v58" aria-label="Fechar painel">×</button>
      </div>
      <div class="fund-card-detail-panel-title-v58"></div>
      <div class="fund-card-detail-panel-tags-v58"></div>
      <div class="fund-card-detail-panel-body-v58"></div>
    `;
    document.body.appendChild(backdrop);
    document.body.appendChild(panel);
    const close=()=>closePanel();
    backdrop.addEventListener('click',close);
    panel.querySelector('.fund-card-detail-panel-close-v58')?.addEventListener('click',close);
    document.addEventListener('keydown',ev=>{
      if(ev.key==='Escape' && document.body.classList.contains('fund-detail-panel-open-v58')) closePanel();
    });
    return {backdrop,panel};
  }
  function resetCardButtons(){
    document.querySelectorAll('#mobileFundCards .fund-card-mobile').forEach(card=>{
      card.classList.remove('side-panel-active-v58');
      const btn=card.querySelector('.fund-card-detail-btn');
      if(btn){
        btn.textContent='Mais detalhes';
        btn.setAttribute('aria-expanded','false');
      }
    });
  }
  function closePanel(){
    document.body.classList.remove('fund-detail-panel-open-v58');
    const backdrop=document.getElementById('fundCardDetailBackdrop');
    const panel=document.getElementById('fundCardDetailPanel');
    if(backdrop) backdrop.setAttribute('aria-hidden','true');
    if(panel) panel.setAttribute('aria-hidden','true');
    resetCardButtons();
  }
  function cloneCleanExpanded(card){
    const expanded=card.querySelector('.fund-card-list-expanded');
    const wrapper=document.createElement('div');
    if(!expanded){
      wrapper.innerHTML='<div class="rank-empty">Detalhes indisponíveis para este fundo.</div>';
      return wrapper;
    }
    wrapper.innerHTML=expanded.innerHTML;
    wrapper.querySelector('.fund-card-expanded-head')?.remove();
    wrapper.querySelectorAll('.fund-card-close-details').forEach(el=>el.remove());
    wrapper.querySelectorAll('[aria-hidden]').forEach(el=>el.removeAttribute('aria-hidden'));
    wrapper.querySelectorAll('.fund-card-list-expanded').forEach(el=>el.classList.remove('fund-card-list-expanded'));
    return wrapper;
  }
  function openPanelForCard(card){
    if(!card) return;
    const {backdrop,panel}=ensurePanel();
    const title=card.querySelector('.fund-card-mobile-name,.fund-card-list-name')?.textContent?.trim() || 'Fundo selecionado';
    const tags=card.querySelector('.fund-card-mobile-tags,.fund-card-list-tags')?.cloneNode(true);
    const body=panel.querySelector('.fund-card-detail-panel-body-v58');
    const titleEl=panel.querySelector('.fund-card-detail-panel-title-v58');
    const tagsEl=panel.querySelector('.fund-card-detail-panel-tags-v58');
    if(titleEl) titleEl.textContent=title;
    if(tagsEl){
      tagsEl.innerHTML='';
      if(tags) tagsEl.appendChild(tags);
    }
    if(body){
      body.innerHTML='';
      body.appendChild(cloneCleanExpanded(card));
      body.scrollTop=0;
    }
    resetCardButtons();
    card.classList.add('side-panel-active-v58');
    const btn=card.querySelector('.fund-card-detail-btn');
    if(btn){
      btn.textContent='Em análise';
      btn.setAttribute('aria-expanded','true');
    }
    backdrop.setAttribute('aria-hidden','false');
    panel.setAttribute('aria-hidden','false');
    document.body.classList.add('fund-detail-panel-open-v58');
  }
  function bindSidePanel(){
    if(document.body.dataset.cardSidePanelV58==='1') return;
    document.body.dataset.cardSidePanelV58='1';
    const meta=document.querySelector('meta[name="app-build"]');
    if(meta) meta.content=BUILD;
    document.addEventListener('click',ev=>{
      const btn=ev.target.closest('.fund-card-detail-btn');
      if(!btn || !isDesktopCards()) return;
      const card=btn.closest('#mobileFundCards .fund-card-mobile');
      if(!card) return;
      ev.preventDefault();
      ev.stopPropagation();
      if(ev.stopImmediatePropagation) ev.stopImmediatePropagation();
      openPanelForCard(card);
    },true);
    window.addEventListener('resize',()=>{
      if(!isDesktopCards()) closePanel();
    },{passive:true});
    const box=document.getElementById('mobileFundCards');
    if(box){
      new MutationObserver(()=>{
        if(document.body.classList.contains('fund-detail-panel-open-v58')){
          const active=document.querySelector('#mobileFundCards .side-panel-active-v58');
          if(!active) closePanel();
        }
      }).observe(box,{childList:true});
    }
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',bindSidePanel);
  else bindSidePanel();
})();


/* ════════════════════════════════════════════════════════
   v68 — Mobile premium: filtros rápidos + cards com Dia/Mês/Ano/12M/%CDI
   Mantém a base atual e apenas refina a experiência mobile.
════════════════════════════════════════════════════════ */
(function(){
  function qs(sel,root=document){return root.querySelector(sel)}
  function isMobile(){return window.matchMedia && window.matchMedia('(max-width: 820px)').matches}
  const PRESET_LABEL={
    'all':'Todos','renda-fixa':'RF','cdi':'CDI','ipca':'IPCA','multimercado':'MM','acoes':'Ações','fmp':'FMP','cambial':'Cambial','conservador':'Conservador','favoritos':'Favoritos','pf':'PF'
  };
  function activePremiumLabel(){
    try{
      const preset=window.__ELTAUM_ACTIVE_SHORTCUT_PRESET__ || 'all';
      if(preset && preset!=='all') return PRESET_LABEL[preset] || preset;
      if(typeof activeCat!=='undefined' && activeCat) return String(activeCat).replace('RENDA FIXA','RF').replace('FUNDOS MUTUOS DE PRIVATIZACAO','FMP');
      if(typeof activeBenchmark!=='undefined' && activeBenchmark) return String(activeBenchmark);
      if(typeof activePerfil!=='undefined' && activePerfil) return String(activePerfil);
      if(typeof activeRisco!=='undefined' && activeRisco) return String(activeRisco);
      if(typeof hideSemDados!=='undefined' && hideSemDados) return 'Sem pipeline';
    }catch(e){}
    return '';
  }
  function syncMobilePremiumFilterState(){
    const total=(typeof filtered!=='undefined' && Array.isArray(filtered)) ? filtered.length : null;
    const label=activePremiumLabel();
    const top=qs('#filterResultSummary');
    if(top && total!==null){
      top.textContent=label ? `${label} · ${total.toLocaleString('pt-BR')} fundos` : `${total.toLocaleString('pt-BR')} fundos encontrados`;
    }
    const clear=qs('#clearFiltersTop');
    if(clear){
      const active=!!label;
      clear.hidden=!active;
      clear.classList.toggle('is-visible',active);
      clear.textContent=active?'Limpar filtro':'Limpar';
    }
    const more=qs('#mobileCategoryMoreBtn');
    if(more){
      more.setAttribute('aria-expanded', document.body.classList.contains('filter-sheet-open')?'true':'false');
    }
  }
  function setupPremiumMobileCategoryButton(){
    const more=qs('#mobileCategoryMoreBtn');
    if(!more || more.dataset.readyPremiumV68==='1') return;
    more.dataset.readyPremiumV68='1';
    more.addEventListener('click',function(ev){
      ev.preventDefault();
      ev.stopPropagation();
      const toggle=qs('#mobileFilterToggle');
      if(toggle) toggle.click();
    });
  }
  const prevRender=typeof render==='function' ? render : null;
  if(prevRender && !window.__ELTAUM_RENDER_PREMIUM_V68__){
    window.__ELTAUM_RENDER_PREMIUM_V68__=true;
    render=function(){
      const out=prevRender.apply(this,arguments);
      try{syncMobilePremiumFilterState();}catch(e){}
      return out;
    };
  }
  document.addEventListener('DOMContentLoaded',function(){
    setupPremiumMobileCategoryButton();
    setTimeout(syncMobilePremiumFilterState,250);
    setTimeout(syncMobilePremiumFilterState,900);
  });
  // v363: touchend/pointerup removidos; em mobile isso executava em gestos de rolagem.
  ['click','input','change'].forEach(evt=>{
    document.addEventListener(evt,function(){setTimeout(syncMobilePremiumFilterState,90);},true);
  });
  window.addEventListener('resize',function(){ if(isMobile()) setTimeout(syncMobilePremiumFilterState,80); });
  window.__eltonSyncMobilePremiumV68=syncMobilePremiumFilterState;
})();


/* ════════════════════════════════════════════════════
   PATCH v76 — Mobile: rodapé seguro e compacto
   - Ajusta espaçamento inferior para o último card não ficar atrás do menu.
   - Renomeia item "Mês" para "Mercado" quando necessário.
   - Recalcula altura real do rodapé em celulares com barra de navegação.
════════════════════════════════════════════════════ */
(function(){
  'use strict';

  const BUILD = 'ELTAUM_RATES_CLEAN_DASHBOARD_20260620_v399';
  window.__ELTAUM_MOBILE_FOOTER_SAFE_BUILD__ = BUILD;

  function qs(sel,root=document){return root.querySelector(sel)}
  function qsa(sel,root=document){return Array.from(root.querySelectorAll(sel))}
  function isMobile(){return window.matchMedia && window.matchMedia('(max-width: 820px)').matches}

  function updateFooterSafeAreaV76(){
    try{
      const nav = qs('.mobile-bottom-nav');
      const root = document.documentElement;
      const mobile = isMobile();

      if(!mobile || !nav){
        root.style.removeProperty('--mobile-bottom-nav-real-h');
        root.style.removeProperty('--mobile-content-safe-bottom');
        return;
      }

      // Renomeia "Mês" para "Mercado" sem depender de HTML específico.
      qsa('.mobile-bottom-nav a, .mobile-bottom-nav button').forEach(item=>{
        const text = (item.textContent || '').trim();
        if(/^📊?\s*M[eê]s$/i.test(text) || text === 'Mês' || text === 'Mes'){
          item.childNodes.forEach(n=>{
            if(n.nodeType === 3 && /M[eê]s|Mes/.test(n.nodeValue || '')) n.nodeValue = n.nodeValue.replace(/M[eê]s|Mes/g,'Mercado');
          });
          const span = item.querySelector('span:last-child, small:last-child, b:last-child');
          if(span && /M[eê]s|Mes/.test(span.textContent || '')) span.textContent = 'Mercado';
        }
      });

      const rect = nav.getBoundingClientRect();
      const h = Math.max(64, Math.ceil(rect.height || 0));
      const safe = Math.max(108, h + 38);

      root.style.setProperty('--mobile-bottom-nav-real-h', h + 'px');
      root.style.setProperty('--mobile-content-safe-bottom', `calc(${safe}px + env(safe-area-inset-bottom, 0px))`);

      document.body.classList.add('mobile-footer-safe-v76');
    }catch(e){}
  }

  function bind(){
    const meta = qs('meta[name="app-build"]');
    if(meta) meta.content = BUILD;

    updateFooterSafeAreaV76();
    setTimeout(updateFooterSafeAreaV76,300);
    setTimeout(updateFooterSafeAreaV76,1000);
    setTimeout(updateFooterSafeAreaV76,1800);

    window.addEventListener('resize', updateFooterSafeAreaV76, {passive:true});
    window.addEventListener('orientationchange', ()=>setTimeout(updateFooterSafeAreaV76,350), {passive:true});

    console.info('[Catálogo CAIXA] Rodapé mobile seguro:', BUILD);
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bind);
  else bind();

  window.__ELTAUM_MOBILE_FOOTER_SAFE_V76__ = {sync:updateFooterSafeAreaV76};
})();


/* PATCH v79 — app sem boot screen */
(function(){
  try{
    document.documentElement.classList.remove('app-booting');
    document.documentElement.classList.add('app-ready','no-boot-v79');
    var boot=document.getElementById('appBootScreen');
    if(boot) boot.remove();
    console.info('[Catálogo CAIXA] Sem tela inicial de carregamento: ELTAUM_W3C_HTML_VALIDATE_FIX_20260608_v128');
  }catch(e){}
})();


/* ════════════════════════════════════════════════════
   PATCH v81 — Mobile filtro unificado sem loop
   - Remove MutationObserver do botão limpar que causava timeout.
   - Mantém Categoria, Pessoa Física e Ordenação no mobile.
   - Mantém init "dados primeiro".
════════════════════════════════════════════════════ */
(function(){
  'use strict';

  const BUILD = 'ELTAUM_RATES_CLEAN_DASHBOARD_20260620_v399';
  window.__ELTAUM_DATA_FIRST_NO_LOOP_BUILD__ = BUILD;

  function qs(sel,root=document){return root.querySelector(sel)}
  function isMobile(){return window.matchMedia && window.matchMedia('(max-width: 820px)').matches}

  const CANON_LABEL = {
    'RENDA FIXA SIMPLES':'RF Simples',
    'RENDA FIXA':'Renda Fixa',
    'RENDA FIXA REFERENCIADO':'RF Referenciado',
    'RENDA FIXA CURTO PRAZO':'RF Curto Prazo',
    'MULTIMERCADO':'Multimercado',
    'CAMBIAL':'Cambial',
    'ACOES':'Ações',
    'FUNDO DE INDICE':'Fundo de Índice',
    'FUNDOS MUTUOS DE PRIVATIZACAO':'FMP / Privatização'
  };

  const SORT_MAP = {
    base:{campo:'base',dir:'desc'},
    m12_desc:{campo:'m12',dir:'desc'},
    m12_asc:{campo:'m12',dir:'asc'},
    ano_desc:{campo:'ano',dir:'desc'},
    ano_asc:{campo:'ano',dir:'asc'},
    mes_desc:{campo:'mes',dir:'desc'},
    dia_desc:{campo:'dia',dir:'desc'},
    cdi_desc:{campo:'cdi',dir:'desc'},
    cdi_asc:{campo:'cdi',dir:'asc'}
  };

  function canon(v){
    return String(v || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g,'')
      .replace(/[^\w\s]/g,' ')
      .replace(/\s+/g,' ')
      .trim()
      .toUpperCase();
  }

  function activeCanonCat(){
    try{return canon(activeCat || '')}catch(e){return ''}
  }

  function findRawCategoryByCanon(canonTarget){
    try{
      if(!canonTarget || !Array.isArray(allRows)) return '';
      const found = allRows.find(r => canon(r && r['Categoria']) === canonTarget);
      return found ? String(found['Categoria'] || '').trim() : canonTarget;
    }catch(e){
      return canonTarget || '';
    }
  }

  function getSortMode(){
    try{return localStorage.getItem('mobileSortModeV81') || localStorage.getItem('mobileSortModeV75') || 'base'}
    catch(e){return 'base'}
  }

  function setSortMode(mode){
    const valid = SORT_MAP[mode] ? mode : 'base';
    window.__mobileSortModeV81 = valid;
    try{
      localStorage.setItem('mobileSortModeV81', valid);
      localStorage.setItem('mobileSortModeV75', valid);
    }catch(e){}
  }

  try{
    if(typeof ordenarPorMobileSort === 'function' && !ordenarPorMobileSort.__v81Wrapped){
      const originalOrdenarPorMobileSort = ordenarPorMobileSort;
      ordenarPorMobileSort = function(rows){
        const mode = getSortMode();
        const cfg = SORT_MAP[mode] || SORT_MAP.base;
        if(cfg.campo === 'base') return rows;
        try{
          activeMobileSortCampo = cfg.campo;
          activeMobileSortDir = cfg.dir;
        }catch(e){}
        return originalOrdenarPorMobileSort(rows);
      };
      ordenarPorMobileSort.__v81Wrapped = true;
    }
  }catch(e){}

  function keepMobileCards(){
    try{
      if(!isMobile()) return;
      document.body.classList.add('fund-card-mode','catalog-mobile-clean','catalog-mobile-v26','v81-mobile-cards-only');
      document.body.classList.remove('fund-list-mode');
      try{
        localStorage.setItem('fundMobileView','cards');
        localStorage.setItem('fundMobileViewV45','cards');
      }catch(e){}
    }catch(e){}
  }

  function hasMobileFilter(){
    let pf = false;
    try{pf = String(activePerfil || '') === 'PF'}catch(e){}
    return !!(activeCanonCat() || pf || getSortMode() !== 'base');
  }

  function syncV81(){
    try{
      const active = activeCanonCat();
      const pfActive = String(activePerfil || '') === 'PF';
      const label = active ? (CANON_LABEL[active] || active) : 'Todos os fundos';

      const select = qs('#mobileCategorySelectV74');
      if(select && select.value !== active) select.value = active;

      const pf = qs('#mobileOnlyPfV75');
      if(pf) pf.checked = pfActive;

      const sort = qs('#mobileSortSelectV75');
      if(sort && sort.value !== getSortMode()) sort.value = getSortMode();

      const status = qs('#mobileCategorySelectStatusV74');
      if(status) status.textContent = label + (pfActive ? ' · PF' : '');

      const result = qs('#mobileCategorySelectResultV74');
      const n = (typeof filtered !== 'undefined' && Array.isArray(filtered)) ? filtered.length : null;
      if(result && n !== null) result.textContent = `${n} fundos encontrados`;

      const clear = qs('#mobileCategoryClearV74');
      if(clear){
        const has = hasMobileFilter();
        clear.textContent = 'Limpar filtros';
        clear.hidden = !has;
        clear.classList.toggle('is-visible-v81', has);
        clear.setAttribute('aria-hidden', has ? 'false' : 'true');
      }

      const filterResult = qs('#filterResultSummary');
      if(filterResult && n !== null) filterResult.textContent = `${n} fundos encontrados`;

      const summary = qs('#mobileFilterSummary');
      if(summary) summary.textContent = active ? ('Categoria: ' + label) : 'Categoria: Todos os fundos';

      const strip = qs('#activeFilterStrip');
      if(strip && isMobile()){
        strip.classList.remove('active');
        strip.innerHTML = '';
      }

      keepMobileCards();
    }catch(e){}
  }

  function preserveViewport(task){
    const y = window.scrollY || window.pageYOffset || 0;
    const shell = qs('#fundFilterShell') || qs('#sec-fundos');
    const beforeTop = shell ? shell.getBoundingClientRect().top : 0;

    const locked = [];
    ['#fundFilterShell','#mobileFundCards','#sec-fundos .table-wrap','.pagination-row'].forEach(sel=>{
      const el = qs(sel);
      if(!el) return;
      const h = Math.ceil(el.getBoundingClientRect().height);
      if(h > 0){
        locked.push([el, el.style.minHeight || '']);
        el.style.minHeight = h + 'px';
        el.classList.add('v81-stabilizing');
      }
    });

    try{ task(); }
    finally{
      const restore = () => {
        try{
          const nowTop = shell ? shell.getBoundingClientRect().top : beforeTop;
          const delta = nowTop - beforeTop;
          if(Math.abs(delta) > 0.5){
            window.scrollBy({top:delta, left:0, behavior:'auto'});
          }else{
            window.scrollTo({top:y, left:0, behavior:'auto'});
          }
        }catch(e){
          try{window.scrollTo(0,y)}catch(_){}
        }
      };

      syncV81();
      restore();
      requestAnimationFrame(()=>{syncV81(); restore();});
      setTimeout(()=>{syncV81(); restore();},90);
      setTimeout(()=>{
        locked.forEach(([el,old])=>{
          el.style.minHeight = old;
          el.classList.remove('v81-stabilizing');
        });
        syncV81();
        restore();
      },260);
    }
  }

  function applyMobileControls(options){
    const opts = options || {};
    preserveViewport(()=>{
      const cat = opts.hasOwnProperty('category') ? opts.category : (qs('#mobileCategorySelectV74')?.value || '');
      const onlyPf = opts.hasOwnProperty('onlyPf') ? !!opts.onlyPf : !!qs('#mobileOnlyPfV75')?.checked;
      const sortMode = opts.sortMode || qs('#mobileSortSelectV75')?.value || getSortMode();

      try{
        activeCat = cat ? findRawCategoryByCanon(cat) : '';
        activePerfil = onlyPf ? 'PF' : '';
        activeBenchmark = '';
        activeRisco = '';
        hideSemDados = false;
        currentPage = 1;
        activeCdiSort = null;
        sortCol = -1;
        sortDir = -1;
        window.__favListMode = false;
        window.__ELTAUM_ACTIVE_SHORTCUT_PRESET__ = 'mobile-controls-v81';
        if(expandedRows && typeof expandedRows.clear === 'function') expandedRows.clear();
      }catch(e){}

      setSortMode(sortMode);

      const toggle = qs('#toggleSemDados');
      if(toggle) toggle.checked = false;

      try{ if(typeof syncFilterControls === 'function') syncFilterControls(); }catch(e){}
      try{ if(typeof updateCdiSortButtons === 'function') updateCdiSortButtons(); }catch(e){}
      try{ if(typeof updateMobileSortButtons === 'function') updateMobileSortButtons(); }catch(e){}
      try{ if(typeof applyFilter === 'function') applyFilter(); }catch(e){}
      try{ if(typeof renderMobileFundCards === 'function') renderMobileFundCards(); }catch(e){}

      keepMobileCards();
      syncV81();
    });
  }

  function clearMobileControls(ev){
    if(ev){
      ev.preventDefault();
      ev.stopPropagation();
    }
    const sel = qs('#mobileCategorySelectV74');
    const pf = qs('#mobileOnlyPfV75');
    const sort = qs('#mobileSortSelectV75');
    if(sel) sel.value = '';
    if(pf) pf.checked = false;
    if(sort) sort.value = 'base';
    applyMobileControls({category:'', onlyPf:false, sortMode:'base'});
  }

  function bindV81(){
    const meta = qs('meta[name="app-build"]');
    if(meta) meta.content = BUILD;

    const sel = qs('#mobileCategorySelectV74');
    if(sel && sel.dataset.v81Bound !== '1'){
      sel.dataset.v81Bound = '1';
      sel.addEventListener('change', ()=>{
        applyMobileControls({category:sel.value});
        if(typeof sel.blur === 'function') sel.blur();
      });
    }

    const pf = qs('#mobileOnlyPfV75');
    if(pf && pf.dataset.v81Bound !== '1'){
      pf.dataset.v81Bound = '1';
      pf.addEventListener('change', ()=>applyMobileControls({onlyPf:pf.checked}));
    }

    const sort = qs('#mobileSortSelectV75');
    if(sort && sort.dataset.v81Bound !== '1'){
      sort.dataset.v81Bound = '1';
      sort.value = getSortMode();
      sort.addEventListener('change', ()=>{
        applyMobileControls({sortMode:sort.value});
        if(typeof sort.blur === 'function') sort.blur();
      });
    }

    const clear = qs('#mobileCategoryClearV74');
    if(clear && clear.dataset.v81Bound !== '1'){
      clear.dataset.v81Bound = '1';
      clear.addEventListener('click', clearMobileControls);
    }

    keepMobileCards();
    syncV81();
    setTimeout(()=>{keepMobileCards(); syncV81();},350);
    setTimeout(()=>{keepMobileCards(); syncV81();},1200);

    window.addEventListener('resize',()=>setTimeout(syncV81,80),{passive:true});
    window.addEventListener('orientationchange',()=>setTimeout(syncV81,250),{passive:true});

    console.info('[Catálogo CAIXA] Mobile filtro sem loop:', BUILD);
  }

  const oldRender = window.render;
  if(typeof oldRender === 'function' && !oldRender.__mobileNoLoopV81){
    const wrapped = function(){
      const out = oldRender.apply(this, arguments);
      keepMobileCards();
      syncV81();
      return out;
    };
    wrapped.__mobileNoLoopV81 = true;
    window.render = wrapped;
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded',()=>setTimeout(bindV81,180));
  else setTimeout(bindV81,180);

  window.__ELTAUM_MOBILE_FILTER_NO_LOOP_V81__ = {
    apply: applyMobileControls,
    clear: clearMobileControls,
    sync: syncV81
  };
})();

/* PATCH v81 — monitor de dados principais */
(function(){
  setTimeout(function(){
    try{
      var hasRows = Array.isArray(allRows) && allRows.length > 0;
      var loadMsg = document.getElementById('loadMsg');
      if(loadMsg && loadMsg.style.display !== 'none' && !hasRows){
        loadMsg.innerHTML = '<div style="color:var(--muted)">Ainda tentando carregar <b>dados_atuais.csv</b>...<br><small>Se permanecer assim, confira no console se o arquivo existe na branch publicada.</small></div>';
      }
    }catch(e){}
  }, 6500);
  console.info('[Catálogo CAIXA] Init dados primeiro sem loop:', 'ELTAUM_W3C_HTML_VALIDATE_FIX_20260608_v128');
})();


/* ════════════════════════════════════════════════════
   PATCH v82 — Desktop: normalização visual do filtro
════════════════════════════════════════════════════ */
(function(){
  'use strict';

  const BUILD = 'ELTAUM_RATES_CLEAN_DASHBOARD_20260620_v399';
  window.__ELTAUM_DESKTOP_FILTER_STABLE_BUILD__ = BUILD;

  function qs(sel,root=document){return root.querySelector(sel)}
  function isDesktop(){return window.matchMedia && window.matchMedia('(min-width: 821px)').matches}

  function normalizeDesktopFilterV82(){
    try{
      const meta=qs('meta[name="app-build"]');
      if(meta) meta.content=BUILD;

      if(!isDesktop()) return;

      document.body.classList.add('desktop-filter-stable-v82');

      const clear = qs('#clearFiltersTop');
      if(clear){
        clear.textContent = 'Limpar';
      }

      const result = qs('#filterResultSummary');
      if(result){
        const txt = (result.textContent || '').replace(/^Resultado:\s*/i,'').trim();
        result.textContent = txt || '— fundos';
      }

      const status = qs('#categoryGridStatus');
      if(status){
        const txt = (status.textContent || '').trim();
        if(!txt) status.textContent = 'Todos os fundos';
      }

      const strip = qs('#activeFilterStrip');
      if(strip && strip.children.length === 0){
        strip.innerHTML = '<span class="active-filter-label">Filtros ativos</span>';
      }
    }catch(e){}
  }

  const oldRender = window.render;
  if(typeof oldRender === 'function' && !oldRender.__desktopStableV82){
    const wrapped = function(){
      const out = oldRender.apply(this, arguments);
      normalizeDesktopFilterV82();
      return out;
    };
    wrapped.__desktopStableV82 = true;
    window.render = wrapped;
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded',()=>setTimeout(normalizeDesktopFilterV82,120));
  else setTimeout(normalizeDesktopFilterV82,120);

  window.addEventListener('resize',()=>setTimeout(normalizeDesktopFilterV82,80),{passive:true});
  setTimeout(normalizeDesktopFilterV82,600);
  setTimeout(normalizeDesktopFilterV82,1600);
})();


/* ════════════════════════════════════════════════════
   PATCH v84 — Desativa gaveta legada de categorias
   - Mantém o botão "Categorias" apenas como indicador visual.
   - Impede abertura do drawer lateral legado.
   - Mantém filtros principais pelo grid visível e pelo select mobile.
════════════════════════════════════════════════════ */
(function(){
  'use strict';

  const BUILD = 'ELTAUM_RATES_CLEAN_DASHBOARD_20260620_v399';
  window.__ELTAUM_DISABLE_LEGACY_DRAWER_BUILD__ = BUILD;

  function qs(sel,root=document){return root.querySelector(sel)}

  function closeLegacyDrawerV84(){
    try{
      const meta = qs('meta[name="app-build"]');
      if(meta) meta.content = BUILD;

      const drawer = qs('#fundFilterDrawer');
      if(drawer){
        drawer.classList.add('legacy-drawer-disabled-v84','mobile-filters-collapsed','desktop-filters-collapsed');
        drawer.classList.remove('filter-sheet-open');
        drawer.setAttribute('aria-hidden','true');
        drawer.style.display = 'none';
        drawer.style.visibility = 'hidden';
        drawer.style.pointerEvents = 'none';
      }

      const btn = qs('#mobileFilterToggle');
      if(btn){
        btn.setAttribute('aria-expanded','false');
        btn.setAttribute('aria-disabled','true');
        btn.classList.add('filter-toggle-inert-v84');
        btn.title = 'Categorias disponíveis no grid abaixo';
      }

      const label = qs('#filterButtonText');
      if(label) label.textContent = 'Categorias';

      document.body.classList.remove('filter-sheet-open');

      const backdrop = qs('#filterBackdrop');
      if(backdrop) backdrop.classList.remove('active');

      const close = qs('#filterCloseBtn');
      if(close) close.setAttribute('tabindex','-1');
    }catch(e){}
  }

  function interceptLegacyToggleV84(ev){
    const target = ev.target && ev.target.closest ? ev.target.closest('#mobileFilterToggle, #filterButtonText, #fundFilterDrawer, #filterBackdrop') : null;
    if(!target) return;

    // Permite clique nos controles reais do drawer somente se, por alguma razão, o elemento estiver oculto
    // mas intercepta abertura/uso da gaveta legada.
    if(target.matches('#mobileFilterToggle, #filterButtonText, #filterBackdrop') || target.closest('#fundFilterDrawer')){
      ev.preventDefault();
      ev.stopPropagation();
      if(typeof ev.stopImmediatePropagation === 'function') ev.stopImmediatePropagation();
      closeLegacyDrawerV84();
    }
  }

  function bindV84(){
    closeLegacyDrawerV84();

    if(document.documentElement.dataset.v84DrawerDisabled !== '1'){
      document.documentElement.dataset.v84DrawerDisabled = '1';
      window.addEventListener('click', interceptLegacyToggleV84, true);
      window.addEventListener('pointerdown', function(ev){
        const t = ev.target && ev.target.closest ? ev.target.closest('#mobileFilterToggle, #filterButtonText') : null;
        if(!t) return;
        ev.preventDefault();
        ev.stopPropagation();
        if(typeof ev.stopImmediatePropagation === 'function') ev.stopImmediatePropagation();
        closeLegacyDrawerV84();
      }, true);
    }

    setTimeout(closeLegacyDrawerV84,120);
    setTimeout(closeLegacyDrawerV84,500);
    setTimeout(closeLegacyDrawerV84,1400);

    console.info('[Catálogo CAIXA] Drawer legado desativado:', BUILD);
  }

  const oldRender = window.render;
  if(typeof oldRender === 'function' && !oldRender.__drawerDisabledV84){
    const wrapped = function(){
      const out = oldRender.apply(this, arguments);
      closeLegacyDrawerV84();
      return out;
    };
    wrapped.__drawerDisabledV84 = true;
    window.render = wrapped;
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded',()=>setTimeout(bindV84,180));
  else setTimeout(bindV84,180);

  window.addEventListener('resize',()=>setTimeout(closeLegacyDrawerV84,80),{passive:true});
  window.__ELTAUM_DISABLE_LEGACY_DRAWER_V84__ = {close:closeLegacyDrawerV84};
})();


/* ════════════════════════════════════════════════════
   PATCH v87 — Categoria exata, sem pulo e sem botão drawer
   - Clique de categoria roda uma única vez, somente no evento click.
   - Evita destaque falso por foco/hover.
   - Remove botão/área "Categorias" do topo como controle clicável.
   - Topo fica só com resultado, para não variar largura.
════════════════════════════════════════════════════ */
(function(){
  'use strict';

  const BUILD = 'ELTAUM_RATES_CLEAN_DASHBOARD_20260620_v399';
  window.__ELTAUM_CATEGORY_EXACT_STABLE_BUILD__ = BUILD;

  function qs(sel,root=document){return root.querySelector(sel)}
  function qsa(sel,root=document){return Array.from(root.querySelectorAll(sel))}
  function isDesktop(){return window.matchMedia && window.matchMedia('(min-width: 821px)').matches}

  const PRESET_CAT = {
    'all':'',
    'renda-fixa-simples':'RENDA FIXA SIMPLES',
    'renda-fixa':'RENDA FIXA',
    'renda-fixa-referenciado':'RENDA FIXA REFERENCIADO',
    'renda-fixa-curto-prazo':'RENDA FIXA CURTO PRAZO',
    'multimercado':'MULTIMERCADO',
    'cambial':'CAMBIAL',
    'acoes':'ACOES',
    'fundo-de-indice':'FUNDO DE INDICE',
    'fmp':'FUNDOS MUTUOS DE PRIVATIZACAO'
  };

  const LABELS = {
    '':'Todos',
    'RENDA FIXA SIMPLES':'RENDA FIXA SIMPLES',
    'RENDA FIXA':'RENDA FIXA',
    'RENDA FIXA REFERENCIADO':'RENDA FIXA REFERENCIADO',
    'RENDA FIXA CURTO PRAZO':'RENDA FIXA CURTO PRAZO',
    'MULTIMERCADO':'MULTIMERCADO',
    'CAMBIAL':'CAMBIAL',
    'ACOES':'AÇÕES',
    'FUNDO DE INDICE':'FUNDO DE ÍNDICE',
    'FUNDOS MUTUOS DE PRIVATIZACAO':'FMP'
  };

  function canon(v){
    return String(v || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g,'')
      .replace(/[^\w\s]/g,' ')
      .replace(/\s+/g,' ')
      .trim()
      .toUpperCase();
  }

  function activeCanon(){
    try{return canon(activeCat || '')}catch(e){return ''}
  }

  function labelFor(canonCat){
    return LABELS[canonCat || ''] || canonCat || 'Todos';
  }

  function escV87(v){
    return String(v || '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  }

  function findRawCategory(canonTarget){
    if(!canonTarget) return '';
    try{
      if(Array.isArray(allRows)){
        const found = allRows.find(r => canon(r && r['Categoria']) === canonTarget);
        if(found) return String(found['Categoria'] || '').trim();
      }
    }catch(e){}
    return canonTarget;
  }

  function removeLegacyDrawer(){
    try{
      qsa('#fundFilterDrawer,#filterBackdrop,.filter-backdrop').forEach(el=>el.remove());
      document.body.classList.remove('filter-sheet-open');
    }catch(e){}
  }

  function stabilizeFilterBox(task){
    const shell = qs('#fundFilterShell');
    const oldH = shell ? shell.style.minHeight : '';
    const h = shell ? Math.ceil(shell.getBoundingClientRect().height) : 0;
    if(shell && h > 0){
      shell.style.minHeight = h + 'px';
      shell.classList.add('v87-filter-stabilizing');
    }
    try{ task(); }
    finally{
      setTimeout(()=>{
        if(shell){
          shell.style.minHeight = oldH;
          shell.classList.remove('v87-filter-stabilizing');
        }
      },180);
    }
  }

  function applyPresetExact(preset, sourceBtn){
    const clickedActive = !!(sourceBtn && sourceBtn.getAttribute && sourceBtn.getAttribute('aria-pressed') === 'true');
    if(clickedActive && preset && preset !== 'all') preset = 'all';
    const wanted = PRESET_CAT.hasOwnProperty(preset) ? PRESET_CAT[preset] : '';

    stabilizeFilterBox(()=>{
      try{
        activeCat = wanted ? findRawCategory(wanted) : '';
        // Desktop v526: categoria não limpa público-alvo, risco, benchmark ou busca.
        // Assim os filtros voltam a acumular na ordem: busca → público-alvo → categoria → risco.
        currentPage = 1;
        window.__favListMode = false;
        window.__ELTAUM_ACTIVE_SHORTCUT_PRESET__ = preset || 'all';
        if(expandedRows && typeof expandedRows.clear === 'function') expandedRows.clear();
      }catch(e){}

      const semDados = qs('#toggleSemDados');
      if(semDados) semDados.checked = !!hideSemDados;

      try{ if(typeof syncFilterControls === 'function') syncFilterControls(); }catch(e){}
      try{ if(typeof applyFilter === 'function') applyFilter(); }catch(e){}
      try{ if(typeof renderMobileFundCards === 'function') renderMobileFundCards(); }catch(e){}

      if(sourceBtn && typeof sourceBtn.blur === 'function') sourceBtn.blur();
      syncV87();
      try{
        if(window.__ELTAUM_DESKTOP_FILTER_ACTIONS_V526__ && typeof window.__ELTAUM_DESKTOP_FILTER_ACTIONS_V526__.sync === 'function'){
          setTimeout(window.__ELTAUM_DESKTOP_FILTER_ACTIONS_V526__.sync,0);
        }
      }catch(e){}
    });
  }

  function syncV87(){
    try{
      removeLegacyDrawer();

      const meta = qs('meta[name="app-build"]');
      if(meta) meta.content = BUILD;

      const active = activeCanon();
      const label = labelFor(active);

      qsa('.catalog-shortcuts-category-grid-v69 [data-preset]').forEach(btn=>{
        const p = btn.dataset.preset || 'all';
        const wanted = PRESET_CAT[p] || '';
        const on = p === 'all' ? !active : active === wanted;
        btn.classList.toggle('active', on);
        btn.setAttribute('aria-pressed', on ? 'true' : 'false');
        if(!on) btn.classList.remove('pseudo-active-v87');
      });

      const n = (typeof filtered !== 'undefined' && Array.isArray(filtered)) ? filtered.length : null;

      const result = qs('#filterResultSummary');
      if(result && n !== null){
        result.textContent = `${n} fundos encontrados`;
        result.title = result.textContent;
      }

      const status = qs('#categoryGridStatus');
      if(status){
        status.textContent = active ? label : 'Todos os fundos';
        status.title = status.textContent;
      }

      const strip = qs('#activeFilterStrip');
      if(strip && isDesktop()){
        const parts = [];
        try{ if(activePerfil) parts.push({kind:'perfil', label:'Público-alvo', value:String(activePerfil)}); }catch(e){}
        try{ if(activeBenchmark) parts.push({kind:'benchmark', label:'Benchmark', value:String(activeBenchmark)}); }catch(e){}
        if(active) parts.push({kind:'cat', label:'Categoria', value:label});
        try{ if(activeRisco) parts.push({kind:'risco', label:'Risco', value:(typeof rotuloPerfilRiscoV198 === 'function' ? rotuloPerfilRiscoV198(activeRisco) : String(activeRisco))}); }catch(e){}
        try{ if(hideSemDados) parts.push({kind:'semDados', label:'Base', value:'Ocultar sem dados'}); }catch(e){}

        if(parts.length){
          strip.classList.add('active','desktop-active-filter-v87');
          strip.innerHTML = parts.map(p =>
            `<button type="button" class="active-filter-pill active-filter-pill-v87" data-clear-filter="${escV87(p.kind)}"><small>${escV87(p.label)}</small>${escV87(p.value)}<span aria-hidden="true">×</span></button>`
          ).join('') + '<button type="button" class="active-filter-clear" data-clear-filter="all">Limpar tudo</button>';
        }else{
          strip.classList.remove('active','desktop-active-filter-v87');
          strip.innerHTML = '';
        }
      }

      const toggle = qs('#mobileFilterToggle');
      if(toggle){
        toggle.setAttribute('aria-expanded','false');
        toggle.setAttribute('aria-disabled','true');
        toggle.classList.add('filter-toggle-inert-v87');
        toggle.title = 'Use as categorias abaixo';
      }

      const topClear = qs('#clearFiltersTop');
      if(topClear){
        topClear.hidden = true;
        topClear.setAttribute('aria-hidden','true');
      }
    }catch(e){}
  }

  function captureCategoryClick(ev){
    const btn = ev.target && ev.target.closest ? ev.target.closest('.catalog-shortcuts-category-grid-v69 [data-preset]') : null;
    if(!btn) return;

    ev.preventDefault();
    ev.stopPropagation();
    if(typeof ev.stopImmediatePropagation === 'function') ev.stopImmediatePropagation();

    applyPresetExact(btn.dataset.preset || 'all', btn);
  }

  function captureDisabledToggle(ev){
    const t = ev.target && ev.target.closest ? ev.target.closest('#mobileFilterToggle,#filterButtonText') : null;
    if(!t) return;

    ev.preventDefault();
    ev.stopPropagation();
    if(typeof ev.stopImmediatePropagation === 'function') ev.stopImmediatePropagation();
    syncV87();
  }

  function bindV87(){
    removeLegacyDrawer();

    if(document.documentElement.dataset.v87ExactCategory !== '1'){
      document.documentElement.dataset.v87ExactCategory = '1';
      window.addEventListener('click', captureCategoryClick, true);
      window.addEventListener('click', captureDisabledToggle, true);
      window.addEventListener('pointerdown', captureDisabledToggle, true);
    }

    syncV87();
    setTimeout(syncV87,200);
    setTimeout(syncV87,800);
    setTimeout(syncV87,1800);

    console.info('[Catálogo CAIXA] Categoria exata estável:', BUILD);
  }

  const oldRender = window.render;
  if(typeof oldRender === 'function' && !oldRender.__exactCategoryV87){
    const wrapped = function(){
      const out = oldRender.apply(this, arguments);
      syncV87();
      return out;
    };
    wrapped.__exactCategoryV87 = true;
    window.render = wrapped;
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded',()=>setTimeout(bindV87,180));
  else setTimeout(bindV87,180);

  window.addEventListener('resize',()=>setTimeout(syncV87,80),{passive:true});
  window.__ELTAUM_CATEGORY_EXACT_STABLE_V87__ = {sync:syncV87, apply:applyPresetExact};
})();


/* ════════════════════════════════════════════════════
   PATCH v88 — Desktop: topbar reorganizada
   - Mantém o filtro exato da v87.
   - Ajusta textos/labels da barra para não cortar "Todos os fundos".
════════════════════════════════════════════════════ */
(function(){
  'use strict';

  const BUILD = 'ELTAUM_RATES_CLEAN_DASHBOARD_20260620_v399';
  window.__ELTAUM_DESKTOP_TOPBAR_REORG_BUILD__ = BUILD;

  function qs(sel,root=document){return root.querySelector(sel)}
  function isDesktop(){return window.matchMedia && window.matchMedia('(min-width: 821px)').matches}

  function normalizeTopbarV88(){
    try{
      const meta = qs('meta[name="app-build"]');
      if(meta) meta.content = BUILD;

      const perPage = qs('#perPage');
      if(perPage){
        const all = perPage.querySelector('option[value="9999"]');
        if(all) all.textContent = 'Todos os fundos';
        const five = perPage.querySelector('option[value="5"]');
        if(five) five.textContent = '05 por página';
        perPage.setAttribute('aria-label','Quantidade de fundos exibidos');
        perPage.title = perPage.options[perPage.selectedIndex]?.textContent || 'Exibição';
      }

      const exhibition = qs('.exhibition-control');
      if(exhibition){
        exhibition.title = 'Quantidade de fundos exibidos na tabela';
      }

      const result = qs('#filterResultSummary');
      if(result){
        result.title = result.textContent || '';
      }

      if(isDesktop()){
        document.body.classList.add('desktop-topbar-v88');
      }
    }catch(e){}
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded',()=>setTimeout(normalizeTopbarV88,160));
  else setTimeout(normalizeTopbarV88,160);

  const oldRender = window.render;
  if(typeof oldRender === 'function' && !oldRender.__desktopTopbarV88){
    const wrapped = function(){
      const out = oldRender.apply(this, arguments);
      normalizeTopbarV88();
      return out;
    };
    wrapped.__desktopTopbarV88 = true;
    window.render = wrapped;
  }

  window.addEventListener('resize',()=>setTimeout(normalizeTopbarV88,80),{passive:true});
  setTimeout(normalizeTopbarV88,700);
  setTimeout(normalizeTopbarV88,1600);
})();


/* ════════════════════════════════════════════════════
   PATCH v89 — Resumo de quantidade e label do toggle
   - Resultado fica padronizado: "1 fundo", "10 fundos", "171 fundos".
   - Remove prefixos de categoria no resumo superior.
   - Troca "Ocultar sem dados" por "Ocultar fundos sem dados".
════════════════════════════════════════════════════ */
(function(){
  'use strict';

  const BUILD = 'ELTAUM_RATES_CLEAN_DASHBOARD_20260620_v399';
  window.__ELTAUM_SUMMARY_LABELS_BUILD__ = BUILD;

  function qs(sel,root=document){return root.querySelector(sel)}
  function qsa(sel,root=document){return Array.from(root.querySelectorAll(sel))}

  function countLabel(n){
    const num = Number(n || 0);
    return num === 1 ? '1 fundo' : `${num} fundos`;
  }

  function currentFilteredCount(){
    try{
      if(Array.isArray(filtered)) return filtered.length;
    }catch(e){}
    const cards = qsa('#mobileFundCards .fund-card-mobile').length;
    if(cards) return cards;
    const rows = qsa('#tableBody tr').length;
    return rows || 0;
  }

  function normalizeSummaryLabelsV89(){
    try{
      const meta = qs('meta[name="app-build"]');
      if(meta) meta.content = BUILD;

      const n = currentFilteredCount();
      const txt = countLabel(n);

      const result = qs('#filterResultSummary');
      if(result){
        result.textContent = txt;
        result.title = txt;
      }

      const mobileResult = qs('#mobileCategorySelectResultV74');
      if(mobileResult){
        mobileResult.textContent = txt;
        mobileResult.title = txt;
      }

      const applyBtn = qs('#filterApplyBtn');
      if(applyBtn) applyBtn.title = txt;

      const toggleLabel = qs('#toggleSemDados')?.closest('.toggle-wrap')?.querySelector('.toggle-label') || qs('.toggle-label');
      if(toggleLabel && /Ocultar/i.test(toggleLabel.textContent || '')){
        toggleLabel.textContent = 'Ocultar fundos sem dados';
        toggleLabel.title = 'Ocultar fundos sem dados';
      }

      const toggleWrap = qs('#toggleSemDados')?.closest('.toggle-wrap');
      if(toggleWrap) toggleWrap.title = 'Ocultar fundos sem dados';

      const toggle = qs('#toggleSemDados');
      if(toggle) toggle.setAttribute('aria-label','Ocultar fundos sem dados');
    }catch(e){}
  }

  const oldRender = window.render;
  if(typeof oldRender === 'function' && !oldRender.__summaryLabelsV89){
    const wrapped = function(){
      const out = oldRender.apply(this, arguments);
      normalizeSummaryLabelsV89();
      return out;
    };
    wrapped.__summaryLabelsV89 = true;
    window.render = wrapped;
  }

  const oldApplyFilter = window.applyFilter || (typeof applyFilter === 'function' ? applyFilter : null);
  if(typeof oldApplyFilter === 'function' && !oldApplyFilter.__summaryLabelsV89){
    const wrappedApply = function(){
      const out = oldApplyFilter.apply(this, arguments);
      setTimeout(normalizeSummaryLabelsV89, 0);
      return out;
    };
    wrappedApply.__summaryLabelsV89 = true;
    try{ window.applyFilter = wrappedApply; }catch(e){}
    try{ applyFilter = wrappedApply; }catch(e){}
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded',()=>setTimeout(normalizeSummaryLabelsV89,160));
  else setTimeout(normalizeSummaryLabelsV89,160);

  setTimeout(normalizeSummaryLabelsV89,600);
  setTimeout(normalizeSummaryLabelsV89,1400);
  setTimeout(normalizeSummaryLabelsV89,2600);

  window.addEventListener('resize',()=>setTimeout(normalizeSummaryLabelsV89,80),{passive:true});
  window.__ELTAUM_SUMMARY_LABELS_V89__ = {sync:normalizeSummaryLabelsV89};
})();


/* ════════════════════════════════════════════════════
   PATCH v90 — Resultado somente com quantidade
   - Força "1 fundo" / "N fundos", sem "encontrados" e sem prefixos.
   - Corrige sobrescritas tardias de funções antigas.
════════════════════════════════════════════════════ */
(function(){
  'use strict';

  const BUILD = 'ELTAUM_RATES_CLEAN_DASHBOARD_20260620_v399';
  window.__ELTAUM_RESULT_COUNT_FINAL_BUILD__ = BUILD;

  function qs(sel,root=document){return root.querySelector(sel)}
  function qsa(sel,root=document){return Array.from(root.querySelectorAll(sel))}

  function countLabel(n){
    const num = Number(n || 0);
    return num === 1 ? '1 fundo' : `${num} fundos`;
  }

  function readCountFromDomText(txt){
    const m = String(txt || '').match(/(\d+)/);
    return m ? Number(m[1]) : null;
  }

  function currentCount(){
    try{
      if(Array.isArray(filtered)) return filtered.length;
    }catch(e){}
    const fromMain = readCountFromDomText(qs('#filterResultSummary')?.textContent);
    if(fromMain !== null) return fromMain;
    const fromMobile = readCountFromDomText(qs('#mobileCategorySelectResultV74')?.textContent);
    if(fromMobile !== null) return fromMobile;
    const rows = qsa('#tableBody tr').length;
    if(rows) return rows;
    const cards = qsa('#mobileFundCards .fund-card-mobile').length;
    return cards || 0;
  }

  let normalizing = false;

  function setCleanText(el, txt){
    if(!el) return;
    if(el.textContent !== txt) el.textContent = txt;
    if(el.title !== txt) el.title = txt;
  }

  function normalizeResultCountV90(){
    if(normalizing) return;
    normalizing = true;
    try{
      const meta = qs('meta[name="app-build"]');
      if(meta) meta.content = BUILD;

      const txt = countLabel(currentCount());

      setCleanText(qs('#filterResultSummary'), txt);
      setCleanText(qs('#mobileCategorySelectResultV74'), txt);

      const applyBtn = qs('#filterApplyBtn');
      if(applyBtn) applyBtn.title = txt;

      const toggleLabel = qs('#toggleSemDados')?.closest('.toggle-wrap')?.querySelector('.toggle-label') || qs('.toggle-label');
      if(toggleLabel && /Ocultar/i.test(toggleLabel.textContent || '')){
        toggleLabel.textContent = 'Ocultar fundos sem dados';
        toggleLabel.title = 'Ocultar fundos sem dados';
      }

      const toggleWrap = qs('#toggleSemDados')?.closest('.toggle-wrap');
      if(toggleWrap) toggleWrap.title = 'Ocultar fundos sem dados';

      const toggle = qs('#toggleSemDados');
      if(toggle) toggle.setAttribute('aria-label','Ocultar fundos sem dados');
    }catch(e){}
    finally{
      normalizing = false;
    }
  }

  function scheduleNormalizeV90(){
    normalizeResultCountV90();
    requestAnimationFrame(normalizeResultCountV90);
    setTimeout(normalizeResultCountV90, 30);
    setTimeout(normalizeResultCountV90, 120);
    setTimeout(normalizeResultCountV90, 320);
  }

  function wrapFunction(name){
    try{
      const fn = window[name] || eval(name);
      if(typeof fn !== 'function' || fn.__resultCountFinalV90) return;
      const wrapped = function(){
        const out = fn.apply(this, arguments);
        scheduleNormalizeV90();
        return out;
      };
      wrapped.__resultCountFinalV90 = true;
      try{ window[name] = wrapped; }catch(e){}
      try{ eval(name + ' = wrapped'); }catch(e){}
    }catch(e){}
  }

  function bindObserver(){
    ['#filterResultSummary','#mobileCategorySelectResultV74'].forEach(sel=>{
      const el = qs(sel);
      if(!el || el.dataset.v90Observed === '1') return;
      el.dataset.v90Observed = '1';
      try{
        const obs = new MutationObserver(()=>{
          if(normalizing) return;
          setTimeout(normalizeResultCountV90, 0);
        });
        obs.observe(el,{childList:true,characterData:true,subtree:true});
      }catch(e){}
    });
  }

  function bindV90(){
    ['render','applyFilter','updateFundResultSummary','updateMobileFilterSummary','syncCleanFilterV86','normalizeTopbarV88','normalizeSummaryLabelsV89'].forEach(wrapFunction);

    bindObserver();
    scheduleNormalizeV90();

    document.addEventListener('click',()=>setTimeout(scheduleNormalizeV90,40),true);
    document.addEventListener('change',()=>setTimeout(scheduleNormalizeV90,40),true);
    document.addEventListener('input',()=>setTimeout(scheduleNormalizeV90,80),true);

    setTimeout(scheduleNormalizeV90,700);
    setTimeout(scheduleNormalizeV90,1600);
    setTimeout(scheduleNormalizeV90,3000);

    console.info('[Catálogo CAIXA] Resultado somente quantidade:', BUILD);
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded',()=>setTimeout(bindV90,180));
  else setTimeout(bindV90,180);

  window.addEventListener('resize',()=>setTimeout(scheduleNormalizeV90,80),{passive:true});
  window.__ELTAUM_RESULT_COUNT_FINAL_V90__ = {sync:scheduleNormalizeV90};
})();


/* ════════════════════════════════════════════════════
   PATCH v91 — Oculta cabeçalho visual das categorias
   - O bloco "Categorias + categoria ativa" era apenas informativo.
   - A categoria ativa já aparece em "Filtros ativos".
════════════════════════════════════════════════════ */
(function(){
  'use strict';

  const BUILD = 'ELTAUM_RATES_CLEAN_DASHBOARD_20260620_v399';
  window.__ELTAUM_HIDE_CATEGORY_HEADER_BUILD__ = BUILD;

  function qs(sel,root=document){return root.querySelector(sel)}
  function qsa(sel,root=document){return Array.from(root.querySelectorAll(sel))}

  function hideCategoryHeaderV91(){
    try{
      const meta = qs('meta[name="app-build"]');
      if(meta) meta.content = BUILD;

      qsa('.category-grid-head-v69').forEach(el=>{
        el.setAttribute('aria-hidden','true');
        el.classList.add('category-grid-head-hidden-v91');
      });
    }catch(e){}
  }

  const oldRender = window.render;
  if(typeof oldRender === 'function' && !oldRender.__hideCategoryHeaderV91){
    const wrapped = function(){
      const out = oldRender.apply(this, arguments);
      hideCategoryHeaderV91();
      return out;
    };
    wrapped.__hideCategoryHeaderV91 = true;
    window.render = wrapped;
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded',()=>setTimeout(hideCategoryHeaderV91,120));
  else setTimeout(hideCategoryHeaderV91,120);

  setTimeout(hideCategoryHeaderV91,700);
  setTimeout(hideCategoryHeaderV91,1600);

  window.__ELTAUM_HIDE_CATEGORY_HEADER_V91__ = {sync:hideCategoryHeaderV91};
})();


/* ════════════════════════════════════════════════════
   PATCH v92 — Remove métricas redundantes da leitura rápida
   - Ano, 12M e % CDI já aparecem na linha/tabela e nos cards.
   - A leitura rápida passa a focar no comentário interpretativo.
════════════════════════════════════════════════════ */
(function(){
  'use strict';

  const BUILD = 'ELTAUM_RATES_CLEAN_DASHBOARD_20260620_v399';
  window.__ELTAUM_REMOVE_NOTE_METRICS_BUILD__ = BUILD;

  function qs(sel,root=document){return root.querySelector(sel)}
  function qsa(sel,root=document){return Array.from(root.querySelectorAll(sel))}

  function removeNoteMetricsV92(){
    try{
      const meta = qs('meta[name="app-build"]');
      if(meta) meta.content = BUILD;

      qsa('.fund-note-metrics').forEach(el=>{
        el.remove();
      });

      qsa('.fund-note').forEach(note=>{
        note.classList.add('fund-note-clean-v92');
      });
    }catch(e){}
  }

  const oldRender = window.render;
  if(typeof oldRender === 'function' && !oldRender.__removeNoteMetricsV92){
    const wrapped = function(){
      const out = oldRender.apply(this, arguments);
      removeNoteMetricsV92();
      return out;
    };
    wrapped.__removeNoteMetricsV92 = true;
    window.render = wrapped;
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded',()=>setTimeout(removeNoteMetricsV92,120));
  else setTimeout(removeNoteMetricsV92,120);

  setTimeout(removeNoteMetricsV92,700);
  setTimeout(removeNoteMetricsV92,1600);

  document.addEventListener('click',()=>setTimeout(removeNoteMetricsV92,80),true);

  window.__ELTAUM_REMOVE_NOTE_METRICS_V92__ = {sync:removeNoteMetricsV92};
})();


/* ════════════════════════════════════════════════════
   PATCH v93 — ESC fecha detalhes expandidos
   - Quando houver linha expandida pelo botão .exp-btn, ESC recolhe.
   - Mantém tabela/cards e filtros no estado atual.
════════════════════════════════════════════════════ */
(function(){
  'use strict';

  const BUILD = 'ELTAUM_RATES_CLEAN_DASHBOARD_20260620_v399';
  window.__ELTAUM_ESC_CLOSE_DETAILS_BUILD__ = BUILD;

  function qs(sel,root=document){return root.querySelector(sel)}
  function qsa(sel,root=document){return Array.from(root.querySelectorAll(sel))}

  function hasOpenDetailsV93(){
    try{
      if(expandedRows && typeof expandedRows.size === 'number' && expandedRows.size > 0) return true;
    }catch(e){}
    return qsa('tr.detail-row, .detail-panel, .fund-card-mobile.expanded, .fund-card-mobile.is-expanded').length > 0 ||
           qsa('.exp-btn').some(btn => String(btn.textContent || '').includes('▲'));
  }

  function closeOpenDetailsV93(){
    let closed = false;

    try{
      if(expandedRows && typeof expandedRows.clear === 'function' && expandedRows.size > 0){
        expandedRows.clear();
        closed = true;
      }
    }catch(e){}

    try{
      qsa('tr.detail-row').forEach(row => {
        row.remove();
        closed = true;
      });
    }catch(e){}

    try{
      qsa('.exp-btn').forEach(btn => {
        if(String(btn.textContent || '').includes('▲')){
          btn.textContent = '▼';
          btn.setAttribute('aria-expanded','false');
          closed = true;
        }
      });
    }catch(e){}

    try{
      qsa('.fund-card-mobile.expanded, .fund-card-mobile.is-expanded').forEach(card => {
        card.classList.remove('expanded','is-expanded');
        closed = true;
      });
    }catch(e){}

    if(closed){
      try{ if(typeof render === 'function') render(); }catch(e){}
      try{ if(typeof renderMobileFundCards === 'function') renderMobileFundCards(); }catch(e){}
      setTimeout(()=>{
        try{ if(window.__ELTAUM_RESULT_COUNT_FINAL_V90) window.__ELTAUM_RESULT_COUNT_FINAL_V90.sync(); }catch(e){}
        try{ if(window.__ELTAUM_HIDE_CATEGORY_HEADER_V91) window.__ELTAUM_HIDE_CATEGORY_HEADER_V91.sync(); }catch(e){}
        try{ if(window.__ELTAUM_REMOVE_NOTE_METRICS_V92) window.__ELTAUM_REMOVE_NOTE_METRICS_V92.sync(); }catch(e){}
      },60);
    }

    return closed;
  }

  function handleEscV93(ev){
    if(ev.key !== 'Escape') return;
    if(!hasOpenDetailsV93()) return;

    ev.preventDefault();
    ev.stopPropagation();
    if(typeof ev.stopImmediatePropagation === 'function') ev.stopImmediatePropagation();

    closeOpenDetailsV93();
  }

  function enhanceButtonsV93(){
    try{
      const meta = qs('meta[name="app-build"]');
      if(meta) meta.content = BUILD;

      qsa('.exp-btn').forEach(btn=>{
        if(btn.dataset.v93EscReady === '1') return;
        btn.dataset.v93EscReady = '1';
        btn.title = 'Abrir detalhes. Pressione ESC para fechar.';
        btn.setAttribute('aria-label','Abrir ou fechar detalhes do fundo');
      });
    }catch(e){}
  }

  const oldRender = window.render;
  if(typeof oldRender === 'function' && !oldRender.__escCloseDetailsV93){
    const wrapped = function(){
      const out = oldRender.apply(this, arguments);
      enhanceButtonsV93();
      return out;
    };
    wrapped.__escCloseDetailsV93 = true;
    window.render = wrapped;
  }

  if(document.documentElement.dataset.v93EscCloseBound !== '1'){
    document.documentElement.dataset.v93EscCloseBound = '1';
    document.addEventListener('keydown', handleEscV93, true);
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded',()=>setTimeout(enhanceButtonsV93,120));
  else setTimeout(enhanceButtonsV93,120);

  setTimeout(enhanceButtonsV93,700);
  setTimeout(enhanceButtonsV93,1600);

  window.__ELTAUM_ESC_CLOSE_DETAILS_V93__ = {
    close: closeOpenDetailsV93,
    sync: enhanceButtonsV93
  };
})();


/* ════════════════════════════════════════════════════
   PATCH v94 — Remove métricas redundantes também no mobile
   - Remove Ano, 12M e % CDI da leitura rápida em detalhes desktop e mobile.
   - Mantém apenas badge + texto interpretativo + disclaimer.
════════════════════════════════════════════════════ */
(function(){
  'use strict';

  const BUILD = 'ELTAUM_RATES_CLEAN_DASHBOARD_20260620_v399';
  window.__ELTAUM_REMOVE_MOBILE_NOTE_METRICS_BUILD__ = BUILD;

  function qs(sel,root=document){return root.querySelector(sel)}
  function qsa(sel,root=document){return Array.from(root.querySelectorAll(sel))}

  function removeAllNoteMetricsV94(){
    try{
      const meta = qs('meta[name="app-build"]');
      if(meta) meta.content = BUILD;

      const selectors = [
        '.fund-note-metrics',
        '.fund-quick-note-metrics',
        '.mobile-fund-note-metrics',
        '.mobile-note-metrics',
        '.fund-card-note-metrics',
        '.fund-card-mobile .fund-note-metrics',
        '.fund-card-mobile .fund-quick-note-metrics'
      ];

      qsa(selectors.join(',')).forEach(el => el.remove());

      qsa('.fund-note, .fund-quick-note, .fund-card-mobile, .mobile-fund-detail, .detail-panel').forEach(el => {
        el.classList.add('note-metrics-removed-v94');
      });
    }catch(e){}
  }

  const oldRender = window.render;
  if(typeof oldRender === 'function' && !oldRender.__removeMobileNoteMetricsV94){
    const wrapped = function(){
      const out = oldRender.apply(this, arguments);
      removeAllNoteMetricsV94();
      return out;
    };
    wrapped.__removeMobileNoteMetricsV94 = true;
    window.render = wrapped;
  }

  const oldRenderMobileCards = window.renderMobileFundCards || (typeof renderMobileFundCards === 'function' ? renderMobileFundCards : null);
  if(typeof oldRenderMobileCards === 'function' && !oldRenderMobileCards.__removeMobileNoteMetricsV94){
    const wrappedMobile = function(){
      const out = oldRenderMobileCards.apply(this, arguments);
      removeAllNoteMetricsV94();
      return out;
    };
    wrappedMobile.__removeMobileNoteMetricsV94 = true;
    try{ window.renderMobileFundCards = wrappedMobile; }catch(e){}
    try{ renderMobileFundCards = wrappedMobile; }catch(e){}
  }

  function bindV94(){
    removeAllNoteMetricsV94();

    // Quando abrir "Mais detalhes" no mobile ou expandir linha no desktop, remove logo após renderizar.
    document.addEventListener('click', () => {
      setTimeout(removeAllNoteMetricsV94, 40);
      setTimeout(removeAllNoteMetricsV94, 180);
    }, true);

    setTimeout(removeAllNoteMetricsV94, 600);
    setTimeout(removeAllNoteMetricsV94, 1400);
    setTimeout(removeAllNoteMetricsV94, 2600);

    console.info('[Catálogo CAIXA] Métricas redundantes removidas da leitura rápida mobile:', BUILD);
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded',()=>setTimeout(bindV94,120));
  else setTimeout(bindV94,120);

  window.__ELTAUM_REMOVE_MOBILE_NOTE_METRICS_V94__ = {sync:removeAllNoteMetricsV94};
})();


/* ════════════════════════════════════════════════════
   PATCH v95 — Comparador: cabeçalhos legíveis
   - Evita nomes de fundos encavalados no comparador.
   - Adiciona title com nome completo e classe de layout.
════════════════════════════════════════════════════ */
(function(){
  'use strict';

  const BUILD = 'ELTAUM_RATES_CLEAN_DASHBOARD_20260620_v399';
  window.__ELTAUM_COMPARATOR_HEADERS_BUILD__ = BUILD;

  function qs(sel,root=document){return root.querySelector(sel)}
  function qsa(sel,root=document){return Array.from(root.querySelectorAll(sel))}

  function enhanceComparatorHeadersV95(){
    try{
      const meta = qs('meta[name="app-build"]');
      if(meta) meta.content = BUILD;

      const table = qs('#comparTable');
      if(table) table.classList.add('compar-table-readable-v95');

      const scroll = qs('.compar-scroll');
      if(scroll) scroll.classList.add('compar-scroll-readable-v95');

      qsa('#comparTable .ct-fundo-nome').forEach(el=>{
        const txt = (el.textContent || '').trim();
        if(txt) el.title = txt;
      });

      qsa('#comparTable th.ct-fundo').forEach((th,i)=>{
        th.classList.add('ct-fundo-readable-v95');
        th.style.setProperty('--compar-col-index', String(i + 1));
      });
    }catch(e){}
  }

  const oldAbrir = window.abrirComparador || (typeof abrirComparador === 'function' ? abrirComparador : null);
  if(typeof oldAbrir === 'function' && !oldAbrir.__comparatorHeadersV95){
    const wrappedAbrir = function(){
      const out = oldAbrir.apply(this, arguments);
      enhanceComparatorHeadersV95();
      setTimeout(enhanceComparatorHeadersV95, 60);
      return out;
    };
    wrappedAbrir.__comparatorHeadersV95 = true;
    try{ window.abrirComparador = wrappedAbrir; }catch(e){}
    try{ abrirComparador = wrappedAbrir; }catch(e){}
  }

  document.addEventListener('click',()=>{
    setTimeout(enhanceComparatorHeadersV95,80);
  },true);

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded',()=>setTimeout(enhanceComparatorHeadersV95,160));
  else setTimeout(enhanceComparatorHeadersV95,160);

  window.__ELTAUM_COMPARATOR_HEADERS_V95__ = {sync:enhanceComparatorHeadersV95};
})();


/* ════════════════════════════════════════════════════
   PATCH v96 — Remove métricas da Leitura rápida na origem
   - Ano, 12M e % CDI já ficam no bloco Rentabilidade.
   - Remove sobras no desktop e mobile mesmo se algum render legado recriar.
════════════════════════════════════════════════════ */
(function(){
  'use strict';

  const BUILD = 'ELTAUM_RATES_CLEAN_DASHBOARD_20260620_v399';
  window.__ELTAUM_REMOVE_QUICK_NOTE_METRICS_SOURCE_BUILD__ = BUILD;

  function qs(sel,root=document){return root.querySelector(sel)}
  function qsa(sel,root=document){return Array.from(root.querySelectorAll(sel))}

  function removeQuickNoteMetricsV96(){
    try{
      const meta = qs('meta[name="app-build"]');
      if(meta) meta.content = BUILD;

      qsa('.fund-note-metrics, .fund-note-metric, .fund-quick-note-metrics, .mobile-fund-note-metrics, .mobile-note-metrics, .fund-card-note-metrics').forEach(el=>{
        const parent = el.closest('.fund-note-metrics') || el;
        if(parent && parent.remove) parent.remove();
      });

      qsa('.fund-quick-note, .fund-note, .fund-card-mobile, .detail-panel, .mobile-fund-detail').forEach(el=>{
        el.classList.add('quick-note-no-metrics-v96');
      });
    }catch(e){}
  }

  const oldRender = window.render;
  if(typeof oldRender === 'function' && !oldRender.__removeQuickNoteMetricsV96){
    const wrapped = function(){
      const out = oldRender.apply(this, arguments);
      removeQuickNoteMetricsV96();
      return out;
    };
    wrapped.__removeQuickNoteMetricsV96 = true;
    window.render = wrapped;
  }

  const oldRenderMobileCards = window.renderMobileFundCards || (typeof renderMobileFundCards === 'function' ? renderMobileFundCards : null);
  if(typeof oldRenderMobileCards === 'function' && !oldRenderMobileCards.__removeQuickNoteMetricsV96){
    const wrappedMobile = function(){
      const out = oldRenderMobileCards.apply(this, arguments);
      removeQuickNoteMetricsV96();
      return out;
    };
    wrappedMobile.__removeQuickNoteMetricsV96 = true;
    try{ window.renderMobileFundCards = wrappedMobile; }catch(e){}
    try{ renderMobileFundCards = wrappedMobile; }catch(e){}
  }

  document.addEventListener('click',()=>{
    setTimeout(removeQuickNoteMetricsV96,40);
    setTimeout(removeQuickNoteMetricsV96,180);
  },true);

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded',()=>setTimeout(removeQuickNoteMetricsV96,120));
  else setTimeout(removeQuickNoteMetricsV96,120);

  setTimeout(removeQuickNoteMetricsV96,700);
  setTimeout(removeQuickNoteMetricsV96,1600);
  setTimeout(removeQuickNoteMetricsV96,2600);

  window.__ELTAUM_REMOVE_QUICK_NOTE_METRICS_SOURCE_V96__ = {sync:removeQuickNoteMetricsV96};
})();


/* ════════════════════════════════════════════════════
   PATCH v97 — Mobile: paginação próxima dos cards
   - Remove min-height/padding residual do container de cards.
   - Mantém respiro apenas depois da paginação, para o rodapé fixo não cobrir.
════════════════════════════════════════════════════ */
(function(){
  'use strict';

  const BUILD = 'ELTAUM_RATES_CLEAN_DASHBOARD_20260620_v399';
  window.__ELTAUM_MOBILE_PAGINATION_CLOSE_BUILD__ = BUILD;

  function qs(sel,root=document){return root.querySelector(sel)}
  function isMobile(){return window.matchMedia && window.matchMedia('(max-width: 820px)').matches}

  function fixMobilePaginationSpacingV97(){
    try{
      const meta = qs('meta[name="app-build"]');
      if(meta) meta.content = BUILD;

      if(!isMobile()) return;

      const cards = qs('#mobileFundCards');
      if(cards){
        cards.classList.add('mobile-pagination-close-v97');
        /* Remove alturas temporárias deixadas por patches de estabilização, caso existam. */
        if(cards.style.minHeight) cards.style.minHeight = '';
        if(cards.style.height) cards.style.height = '';
      }

      const pagination = qs('#sec-fundos .pagination-row') || qs('.pagination-row');
      if(pagination){
        pagination.classList.add('mobile-pagination-row-close-v97');
      }
    }catch(e){}
  }

  const oldRender = window.render;
  if(typeof oldRender === 'function' && !oldRender.__mobilePaginationCloseV97){
    const wrapped = function(){
      const out = oldRender.apply(this, arguments);
      fixMobilePaginationSpacingV97();
      return out;
    };
    wrapped.__mobilePaginationCloseV97 = true;
    window.render = wrapped;
  }

  const oldRenderMobileCards = window.renderMobileFundCards || (typeof renderMobileFundCards === 'function' ? renderMobileFundCards : null);
  if(typeof oldRenderMobileCards === 'function' && !oldRenderMobileCards.__mobilePaginationCloseV97){
    const wrappedMobile = function(){
      const out = oldRenderMobileCards.apply(this, arguments);
      fixMobilePaginationSpacingV97();
      return out;
    };
    wrappedMobile.__mobilePaginationCloseV97 = true;
    try{ window.renderMobileFundCards = wrappedMobile; }catch(e){}
    try{ renderMobileFundCards = wrappedMobile; }catch(e){}
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded',()=>setTimeout(fixMobilePaginationSpacingV97,120));
  else setTimeout(fixMobilePaginationSpacingV97,120);

  setTimeout(fixMobilePaginationSpacingV97,700);
  setTimeout(fixMobilePaginationSpacingV97,1600);
  document.addEventListener('click',()=>setTimeout(fixMobilePaginationSpacingV97,80),true);

  window.__ELTAUM_MOBILE_PAGINATION_CLOSE_V97__ = {sync:fixMobilePaginationSpacingV97};
})();


/* ════════════════════════════════════════════════════
   PATCH v98 — Mobile PTAX profissional
   - Compacta títulos do bloco Dólar PTAX no mobile.
   - Mantém dados existentes e reorganiza visualmente via CSS.
════════════════════════════════════════════════════ */
(function(){
  'use strict';

  const BUILD = 'ELTAUM_RATES_CLEAN_DASHBOARD_20260620_v399';
  window.__ELTAUM_MOBILE_PTAX_PRO_BUILD__ = BUILD;

  function qs(sel,root=document){return root.querySelector(sel)}
  function qsa(sel,root=document){return Array.from(root.querySelectorAll(sel))}
  function isMobile(){return window.matchMedia && window.matchMedia('(max-width: 820px)').matches}

  function normalizeMobilePtaxV98(){
    try{
      const meta = qs('meta[name="app-build"]');
      if(meta) meta.content = BUILD;

      const sec = qs('#sec-dolar');
      if(sec) sec.classList.add('dolar-mobile-pro-v98');

      const title = qs('#sec-dolar .dolar-chart-title');
      if(title && isMobile()){
        title.textContent = 'Histórico PTAX';
      }

      const chartSub = qs('#dolar-chart-sub');
      if(chartSub && isMobile()){
        chartSub.textContent = chartSub.textContent || 'Série histórica do dólar PTAX';
      }

      const chartBtn = qs('#dolarChartToggle');
      if(chartBtn && isMobile()){
        const expanded = chartBtn.getAttribute('aria-expanded') === 'true';
        chartBtn.textContent = expanded ? 'Ocultar' : 'Abrir gráfico';
      }

      const toggle = qs('#dolarTimelineToggle');
      if(toggle && isMobile()){
        toggle.setAttribute('aria-hidden','true');
        toggle.tabIndex = -1;
      }

      qsa('#sec-dolar .dolar-mini-kpi').forEach(el=>{
        el.classList.add('dolar-variation-chip-v98');
      });

      qsa('#sec-dolar .dolar-month-item').forEach(el=>{
        el.classList.add('dolar-month-snap-v98');
      });
    }catch(e){}
  }

  const oldCarregarDolar = window.carregarDolarDia || (typeof carregarDolarDia === 'function' ? carregarDolarDia : null);
  if(typeof oldCarregarDolar === 'function' && !oldCarregarDolar.__mobilePtaxProV98){
    const wrappedDolar = async function(){
      const out = await oldCarregarDolar.apply(this, arguments);
      normalizeMobilePtaxV98();
      setTimeout(normalizeMobilePtaxV98, 120);
      return out;
    };
    wrappedDolar.__mobilePtaxProV98 = true;
    try{ window.carregarDolarDia = wrappedDolar; }catch(e){}
    try{ carregarDolarDia = wrappedDolar; }catch(e){}
  }

  const oldToggleChart = window.toggleDolarChartMobile || (typeof toggleDolarChartMobile === 'function' ? toggleDolarChartMobile : null);
  if(typeof oldToggleChart === 'function' && !oldToggleChart.__mobilePtaxProV98){
    const wrappedToggle = function(){
      const out = oldToggleChart.apply(this, arguments);
      setTimeout(normalizeMobilePtaxV98, 40);
      return out;
    };
    wrappedToggle.__mobilePtaxProV98 = true;
    try{ window.toggleDolarChartMobile = wrappedToggle; }catch(e){}
    try{ toggleDolarChartMobile = wrappedToggle; }catch(e){}
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded',()=>setTimeout(normalizeMobilePtaxV98,120));
  else setTimeout(normalizeMobilePtaxV98,120);

  document.addEventListener('click',()=>setTimeout(normalizeMobilePtaxV98,80),true);
  window.addEventListener('resize',()=>setTimeout(normalizeMobilePtaxV98,80),{passive:true});

  setTimeout(normalizeMobilePtaxV98,700);
  setTimeout(normalizeMobilePtaxV98,1600);
  setTimeout(normalizeMobilePtaxV98,2800);

  window.__ELTAUM_MOBILE_PTAX_PRO_V98__ = {sync:normalizeMobilePtaxV98};
})();


/* ════════════════════════════════════════════════════
   PATCH v99 — Mobile PTAX: indicação de rolagem horizontal
   - Adiciona microcopy "arraste para ver mais" nos carrosséis.
   - Adiciona classe quando há conteúdo fora da tela.
   - Remove a dúvida visual de parecer conteúdo cortado.
════════════════════════════════════════════════════ */
(function(){
  'use strict';

  const BUILD = 'ELTAUM_RATES_CLEAN_DASHBOARD_20260620_v399';
  window.__ELTAUM_MOBILE_PTAX_SCROLL_HINT_BUILD__ = BUILD;

  function qs(sel,root=document){return root.querySelector(sel)}
  function qsa(sel,root=document){return Array.from(root.querySelectorAll(sel))}
  function isMobile(){return window.matchMedia && window.matchMedia('(max-width: 820px)').matches}

  function ensureHintBefore(row, text, id){
    if(!row || !row.parentElement) return null;

    let hint = row.parentElement.querySelector(`[data-scroll-hint-v99="${id}"]`);
    if(!hint){
      hint = document.createElement('div');
      hint.className = 'ptax-scroll-hint-v99';
      hint.dataset.scrollHintV99 = id;
      hint.innerHTML = `<span>${text}</span>`;
      row.parentElement.insertBefore(hint, row);
    }else{
      const span = hint.querySelector('span');
      if(span) span.textContent = text;
    }
    return hint;
  }

  function updateOverflowState(row, hint){
    if(!row) return;

    const hasOverflow = row.scrollWidth > row.clientWidth + 8;
    row.classList.toggle('has-horizontal-overflow-v99', hasOverflow);

    if(hint){
      hint.hidden = !hasOverflow;
      hint.classList.toggle('is-hidden-v99', !hasOverflow);
    }

    const updateScrollClass = () => {
      const max = Math.max(0, row.scrollWidth - row.clientWidth);
      const atStart = row.scrollLeft <= 8;
      const atEnd = row.scrollLeft >= max - 8;
      row.classList.toggle('is-scroll-start-v99', atStart);
      row.classList.toggle('is-scroll-end-v99', atEnd);
      if(hint){
        hint.classList.toggle('is-scroll-end-v99', atEnd);
      }
    };

    if(row.dataset.v99ScrollBound !== '1'){
      row.dataset.v99ScrollBound = '1';
      row.addEventListener('scroll', updateScrollClass, {passive:true});
    }
    updateScrollClass();
  }

  function normalizePtaxScrollHintsV99(){
    try{
      const meta = qs('meta[name="app-build"]');
      if(meta) meta.content = BUILD;

      const sec = qs('#sec-dolar');
      if(sec) sec.classList.add('dolar-mobile-scroll-hint-v99');

      if(!isMobile()) return;

      const kpiRow = qs('#sec-dolar .dolar-kpi-row');
      const monthRow = qs('#sec-dolar .dolar-compact-card .dolar-months');

      const kpiHint = ensureHintBefore(kpiRow, 'Variações por período', 'ptax-variacoes');
      const monthHint = ensureHintBefore(monthRow, 'Fechamentos anteriores', 'ptax-fechamentos');

      updateOverflowState(kpiRow, kpiHint);
      updateOverflowState(monthRow, monthHint);

      /* Garante que os carrosséis comecem alinhados no primeiro item. */
      if(kpiRow && !kpiRow.dataset.v99InitialScroll){
        kpiRow.dataset.v99InitialScroll = '1';
        kpiRow.scrollLeft = 0;
      }
      if(monthRow && !monthRow.dataset.v99InitialScroll){
        monthRow.dataset.v99InitialScroll = '1';
        monthRow.scrollLeft = 0;
      }
    }catch(e){}
  }

  const oldNormalize = window.__ELTAUM_MOBILE_PTAX_PRO_V98__?.sync;
  if(typeof oldNormalize === 'function' && !oldNormalize.__scrollHintV99){
    const wrapped = function(){
      const out = oldNormalize.apply(this, arguments);
      normalizePtaxScrollHintsV99();
      return out;
    };
    wrapped.__scrollHintV99 = true;
    try{ window.__ELTAUM_MOBILE_PTAX_PRO_V98__.sync = wrapped; }catch(e){}
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded',()=>setTimeout(normalizePtaxScrollHintsV99,160));
  else setTimeout(normalizePtaxScrollHintsV99,160);

  document.addEventListener('click',()=>setTimeout(normalizePtaxScrollHintsV99,100),true);
  window.addEventListener('resize',()=>setTimeout(normalizePtaxScrollHintsV99,120),{passive:true});

  setTimeout(normalizePtaxScrollHintsV99,700);
  setTimeout(normalizePtaxScrollHintsV99,1600);
  setTimeout(normalizePtaxScrollHintsV99,3000);

  window.__ELTAUM_MOBILE_PTAX_SCROLL_HINT_V99__ = {sync:normalizePtaxScrollHintsV99};
})();


/* PATCH v424 — PTAX mobile: dica única e fechamentos mais compactos */
(function(){
  'use strict';

  const BUILD = 'ELTAUM_DOLAR_MONTHS_CLEAN_v424';

  function syncDolarMonthsCleanV424(){
    try{
      document.documentElement.classList.add('mobile-v424','dolar-months-clean-v424');
      const meta = document.querySelector('meta[name="app-build"]');
      if(meta) meta.content = BUILD;

      document
        .querySelectorAll('#sec-dolar .ptax-scroll-hint-v99 strong')
        .forEach((node) => node.remove());
    }catch(_error){}
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', syncDolarMonthsCleanV424, {once:true});
  }else{
    syncDolarMonthsCleanV424();
  }

  setTimeout(syncDolarMonthsCleanV424, 450);
  setTimeout(syncDolarMonthsCleanV424, 1400);
  setTimeout(syncDolarMonthsCleanV424, 2800);

  window.__ELTAUM_DOLAR_MONTHS_CLEAN_V424__ = {
    build: BUILD,
    sync: syncDolarMonthsCleanV424
  };
})();


/* ════════════════════════════════════════════════════
   PATCH v100 — Mobile Rankings profissional + paginação justa
   - Reduz o espaço entre paginação de fundos e a seção Rankings.
   - Deixa nomes dos fundos legíveis no mobile.
   - Reorganiza os blocos de rankings para leitura vertical.
════════════════════════════════════════════════════ */
(function(){
  'use strict';

  const BUILD = 'ELTAUM_RATES_CLEAN_DASHBOARD_20260620_v399';
  window.__ELTAUM_MOBILE_RANKING_PRO_BUILD__ = BUILD;

  function qs(sel,root=document){return root.querySelector(sel)}
  function qsa(sel,root=document){return Array.from(root.querySelectorAll(sel))}
  function isMobile(){return window.matchMedia && window.matchMedia('(max-width: 820px)').matches}

  function normalizeMobileRankingsV100(){
    try{
      const meta = qs('meta[name="app-build"]');
      if(meta) meta.content = BUILD;

      if(!isMobile()) return;

      const secFundos = qs('#sec-fundos');
      if(secFundos) secFundos.classList.add('funds-pagination-tight-v100');

      const pagination = qs('#sec-fundos .pagination-row') || qs('.pagination-row');
      if(pagination) pagination.classList.add('pagination-tight-v100');

      const rankings = qs('#rankingsSection') || qs('#sec-ranking') || qs('.ranking-section');
      if(rankings) rankings.classList.add('rankings-mobile-pro-v100');

      qsa('#rankingsSection .ranking-exec-card, #sec-ranking .ranking-exec-card, .ranking-exec-card').forEach(card=>{
        card.classList.add('ranking-summary-card-mobile-v100');
      });

      qsa('#rankingsSection .ranking-top-row, #sec-ranking .ranking-top-row, .ranking-top-row').forEach((row,idx)=>{
        row.classList.add('ranking-top-row-mobile-v100');
        row.style.setProperty('--rank-row-index', String(idx + 1));
      });

      qsa('#rankingsSection .ranking-cat-mini, #sec-ranking .ranking-cat-mini, .ranking-cat-mini').forEach(card=>{
        card.classList.add('ranking-cat-mini-mobile-v100');
      });

      qsa('#rankingsSection .ranking-risk-row, #sec-ranking .ranking-risk-row, .ranking-risk-row').forEach(row=>{
        row.classList.add('ranking-risk-row-mobile-v100');
      });
    }catch(e){}
  }

  const oldRenderRankings = window.renderRankings || (typeof renderRankings === 'function' ? renderRankings : null);
  if(typeof oldRenderRankings === 'function' && !oldRenderRankings.__mobileRankingProV100){
    const wrappedRankings = function(){
      const out = oldRenderRankings.apply(this, arguments);
      normalizeMobileRankingsV100();
      setTimeout(normalizeMobileRankingsV100,80);
      return out;
    };
    wrappedRankings.__mobileRankingProV100 = true;
    try{ window.renderRankings = wrappedRankings; }catch(e){}
    try{ renderRankings = wrappedRankings; }catch(e){}
  }

  const oldRender = window.render;
  if(typeof oldRender === 'function' && !oldRender.__mobileRankingProV100){
    const wrappedRender = function(){
      const out = oldRender.apply(this, arguments);
      setTimeout(normalizeMobileRankingsV100,80);
      return out;
    };
    wrappedRender.__mobileRankingProV100 = true;
    window.render = wrappedRender;
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded',()=>setTimeout(normalizeMobileRankingsV100,160));
  else setTimeout(normalizeMobileRankingsV100,160);

  document.addEventListener('click',()=>setTimeout(normalizeMobileRankingsV100,100),true);
  window.addEventListener('resize',()=>setTimeout(normalizeMobileRankingsV100,120),{passive:true});

  setTimeout(normalizeMobileRankingsV100,700);
  setTimeout(normalizeMobileRankingsV100,1600);
  setTimeout(normalizeMobileRankingsV100,3000);

  window.__ELTAUM_MOBILE_RANKING_PRO_V100__ = {sync:normalizeMobileRankingsV100};
})();


/* ════════════════════════════════════════════════════
   PATCH v102 — Botão Painel Consultivo Looker Studio
   Como configurar:
   1) Publique ou compartilhe seu relatório no Looker Studio.
   2) Copie o link do relatório.
   3) Cole abaixo em LOOKER_PANEL_URL.
════════════════════════════════════════════════════ */
(function(){
  'use strict';

  const BUILD = 'ELTAUM_RATES_CLEAN_DASHBOARD_20260620_v399';
  window.__ELTAUM_LOOKER_PANEL_BUTTON_BUILD__ = BUILD;

  /* Cole aqui o link do seu relatório Looker Studio.
     Exemplo:
     const LOOKER_PANEL_URL = 'https://lookerstudio.google.com/reporting/SEU_RELATORIO';
  */
  const LOOKER_PANEL_URL = '';

  function qs(sel,root=document){return root.querySelector(sel)}

  function setupLookerPanelButtonV102(){
    try{
      const meta = qs('meta[name="app-build"]');
      if(meta) meta.content = BUILD;

      const btn = qs('#lookerPanelBtn');
      if(!btn) return;

      const url = (LOOKER_PANEL_URL || btn.dataset.lookerUrl || '').trim();

      if(url){
        btn.href = url;
        btn.dataset.lookerUrl = url;
        btn.classList.remove('is-disabled');
        btn.removeAttribute('aria-disabled');
        btn.title = 'Abrir painel consultivo no Looker Studio';
      }else{
        btn.href = '#';
        btn.classList.add('is-disabled');
        btn.setAttribute('aria-disabled','true');
        btn.title = 'Cole o link do relatório Looker Studio no app.js, em LOOKER_PANEL_URL';
      }

      if(btn.dataset.v102Bound !== '1'){
        btn.dataset.v102Bound = '1';
        btn.addEventListener('click', function(ev){
          const currentUrl = (LOOKER_PANEL_URL || btn.dataset.lookerUrl || '').trim();
          if(currentUrl) return;

          ev.preventDefault();
          ev.stopPropagation();

          alert('Painel consultivo ainda não configurado. Cole o link do Looker Studio no app.js, na constante LOOKER_PANEL_URL.');
        });
      }
    }catch(e){}
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded',()=>setTimeout(setupLookerPanelButtonV102,120));
  else setTimeout(setupLookerPanelButtonV102,120);

  setTimeout(setupLookerPanelButtonV102,700);
  setTimeout(setupLookerPanelButtonV102,1600);

  window.__ELTAUM_LOOKER_PANEL_BUTTON_V102__ = {sync:setupLookerPanelButtonV102};
})();


/* ════════════════════════════════════════════════════
   PATCH v108 — Mobile: paginação com rolagem nativa única
   - Remove a lógica de múltiplas tentativas das versões antigas.
   - Não usa correção final por timeout.
   - Usa requestAnimationFrame pós-render + scrollIntoView nativo.
   - Resultado esperado: subida lisa, sem "degraus".
════════════════════════════════════════════════════ */
(function(){
  'use strict';

  const BUILD = 'ELTAUM_RATES_CLEAN_DASHBOARD_20260620_v399';
  window.__ELTAUM_MICRO_PAGINATION_NATIVE_BUILD__ = BUILD;

  let scrollTimer = null;
  let lastClick = 0;

  function qs(sel,root=document){return root.querySelector(sel)}
  function isMobile(){return window.matchMedia && window.matchMedia('(max-width: 820px)').matches}

  function setBuildV108(){
    const meta = qs('meta[name="app-build"]');
    if(meta) meta.content = BUILD;
  }

  function getFirstCardV108(){
    return (
      qs('#mobileFundCards .fund-card-mobile') ||
      qs('#mobileFundCards article') ||
      qs('#mobileFundCards > div') ||
      qs('.mobile-fund-cards .fund-card-mobile') ||
      qs('.fund-card-mobile') ||
      qs('#mobileFundCards')
    );
  }

  function scrollToFirstCardNativeV108(){
    if(!isMobile()) return;

    const target = getFirstCardV108();
    if(!target) return;

    /*
      scrollIntoView com scroll-margin-top via CSS é mais suave no Android
      do que window.scrollTo calculado manualmente.
    */
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    });
  }

  function schedulePaginationScrollV108(){
    if(!isMobile()) return;

    clearTimeout(scrollTimer);

    /*
      Uma única execução depois da troca dos cards.
      Sem fallback em 3 tempos, sem correção final.
    */
    scrollTimer = setTimeout(() => {
      requestAnimationFrame(() => scrollToFirstCardNativeV108());
    }, 140);
  }

  function isPaginationClickV108(target){
    if(!target || !target.closest) return false;

    return !!(
      target.closest('#pageBtns .page-btn') ||
      target.closest('.pagination-row .page-btn') ||
      target.closest('.pagination-row button') ||
      target.closest('[data-page]')
    );
  }

  function setupPaginationNativeV108(){
    setBuildV108();

    if(document.documentElement.dataset.v108PaginationNative === '1') return;
    document.documentElement.dataset.v108PaginationNative = '1';

    document.addEventListener('click', function(ev){
      if(!isPaginationClickV108(ev.target)) return;

      const btn = ev.target.closest('button,.page-btn,[data-page]');
      if(btn && (btn.disabled || btn.getAttribute('aria-disabled') === 'true')) return;

      const now = Date.now();
      if(now - lastClick < 320) return;
      lastClick = now;

      schedulePaginationScrollV108();
    }, false);
  }

  /*
    Se alguma parte legada chamar esta função, agora ela faz apenas uma rolagem nativa.
  */
  try{
    window.scrollToFundResultsStart = function(){
      if(isMobile()) {
        schedulePaginationScrollV108();
      } else {
        const t = qs('#sec-fundos .table-wrap') || qs('#mainTable') || qs('#sec-fundos');
        if(t) t.scrollIntoView({behavior:'smooth', block:'start'});
      }
    };
    scrollToFundResultsStart = window.scrollToFundResultsStart;
  }catch(e){}

  if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(setupPaginationNativeV108, 120));
  } else {
    setTimeout(setupPaginationNativeV108, 120);
  }

  setTimeout(setupPaginationNativeV108, 800);
  setTimeout(setupPaginationNativeV108, 1800);

  window.__ELTAUM_MICRO_PAGINATION_NATIVE_V108__ = {
    sync: setupPaginationNativeV108,
    scrollToFirstFund: scrollToFirstCardNativeV108
  };
})();


/* ════════════════════════════════════════════════════
   PATCH v118 — Remove criadores legados dos hints de mercado
   Base: v108 de paginação preservada.
   Decisão:
   - patches v101/v104/v105 removidos do app.js porque recriavam market-scroll-hint-v101;
   - mantém apenas market-drag-label-v118;
   - sem listener de click;
   - observer só remove hints legados se algum código remanescente tentar recriá-los.
════════════════════════════════════════════════════ */
(function(){
  'use strict';

  const BUILD = 'ELTAUM_RATES_CLEAN_DASHBOARD_20260620_v399';
  window.__ELTAUM_REMOVE_LEGACY_MARKET_HINTS_BUILD__ = BUILD;

  function qs(sel, root=document){ return root.querySelector(sel); }
  function qsa(sel, root=document){ return Array.from(root.querySelectorAll(sel)); }
  function isMobile(){ return window.matchMedia && window.matchMedia('(max-width: 820px)').matches; }

  const LEGACY_HINTS = [
    '#sec-mercado .market-scroll-hint-v101',
    '#sec-mercado .copom-scroll-hint-v101',
    '#sec-mercado .cdi-scroll-hint-v101',
    '#sec-mercado .market-drag-label-v112',
    '#sec-mercado .market-drag-label-v113',
    '#sec-mercado .market-drag-label-v114',
    '#sec-mercado .market-drag-label-v115',
    '#sec-mercado .market-drag-label-v116',
    '#sec-mercado .market-drag-label-v117'
  ].join(',');

  function setBuildV118(){
    const meta = qs('meta[name="app-build"]');
    if(meta) meta.content = BUILD;
  }

  function normalizeClosedMiniSignsV118(){
    qsa('#closedMiniCdi,#closedMiniIpca,#closedMiniDolar,#closedMiniIbov').forEach(el => {
      const txt = (el.textContent || '').trim();
      const isQuote = /^R\$\s*/i.test(txt);
      el.classList.add('finance-number-v231');
      el.classList.remove('pos','neg','zero','neu','market-quote-v231');
      if(isQuote){
        el.classList.add('market-quote-v231','zero');
      }else if(/^-\s*/.test(txt)){
        el.classList.add('neg');
      }else if(/^\+/.test(txt)){
        el.classList.add('pos');
      }else{
        el.classList.add('zero');
      }
    });
  }

  function removeLegacyHintsV118(){
    qsa(LEGACY_HINTS).forEach(el => el.remove());
  }

  function ensureHintV118(target, label, key){
    if(!target || !target.parentElement || !isMobile()) return;

    const parent = target.parentElement;
    qsa(`.market-drag-label-v118[data-drag-label-v118="${key}"]`, parent).forEach(el => el.remove());

    const row = document.createElement('div');
    row.className = 'market-drag-label-v118';
    row.dataset.dragLabelV118 = key;
    row.setAttribute('aria-hidden', 'true');
    row.setAttribute('tabindex', '-1');
    row.innerHTML = `<span>${label}</span><strong>Arraste →</strong>`;
    target.insertAdjacentElement('beforebegin', row);
  }

  function normalizeCdiV118(){
    const strip = qs('#cdiMonthStrip');
    if(!strip || !isMobile()) return;

    const chips = qsa('.cdi-month-chip', strip);
    if(!chips.length) return;

    chips.forEach(chip => {
      chip.classList.add('cdi-chip-aligned-v118');
      const m = chip.querySelector('.m');
      const v = chip.querySelector('.v');
      const p = chip.querySelector('.p');
      if(m) m.textContent = m.textContent.trim().toUpperCase();
      if(v) v.textContent = v.textContent.trim();
      if(p) p.textContent = p.textContent.trim();
    });

    const month = {JAN:1,FEV:2,MAR:3,ABR:4,MAI:5,JUN:6,JUL:7,AGO:8,SET:9,OUT:10,NOV:11,DEZ:12};

    function score(chip){
      const txt = (chip.querySelector('.m')?.textContent || chip.textContent || '').toUpperCase();
      const m = txt.match(/(JAN|FEV|MAR|ABR|MAI|JUN|JUL|AGO|SET|OUT|NOV|DEZ)(?:\/(\d{4}))?/);
      if(!m) return -1;
      const y = Number(m[2] || new Date().getFullYear());
      return y * 100 + (month[m[1]] || 0);
    }

    const current = chips.find(c => c.classList.contains('current') || /parcial/i.test(c.textContent || ''));
    const closed = chips.find(c => c !== current && (c.classList.contains('closed') || /último mês|ultimo mês/i.test(c.textContent || '')));
    const rest = chips.filter(c => c !== current && c !== closed).sort((a,b) => score(b) - score(a));
    [current, closed, ...rest].filter(Boolean).forEach(chip => strip.appendChild(chip));
    strip.scrollLeft = 0;
  }

  function syncV118(){
    try{
      setBuildV118();
      removeLegacyHintsV118();
      normalizeClosedMiniSignsV118();

      const mercado = qs('#sec-mercado');
      if(mercado) mercado.classList.add('market-clean-v118');

      const copom = qs('#copomMeetings');
      if(copom){
        // v257: o bloco de Cenário monetário já possui título próprio.
        // Não criar microcopy "Arraste" aqui para não poluir desktop/mobile.
      }

      const cdi = qs('#cdiMonthStrip');
      if(cdi){
        normalizeCdiV118();
        // v257: sem hint "Histórico mensal do CDI / Arraste" neste módulo.
      }
    }catch(e){
      console.warn('[v118 mercado] falha ao sincronizar:', e);
    }
  }

  function installLegacyHintObserverV118(){
    if(document.documentElement.dataset.v118HintObserver === '1') return;
    document.documentElement.dataset.v118HintObserver = '1';

    const obs = new MutationObserver((mutations) => {
      let found = false;
      for(const m of mutations){
        for(const n of m.addedNodes || []){
          if(n.nodeType !== 1) continue;
          if(n.matches && n.matches(LEGACY_HINTS)){ found = true; break; }
          if(n.querySelector && n.querySelector(LEGACY_HINTS)){ found = true; break; }
        }
        if(found) break;
      }
      if(found) {
        requestAnimationFrame(removeLegacyHintsV118);
      }
    });

    obs.observe(document.body, {childList:true, subtree:true});
    window.__ELTAUM_REMOVE_LEGACY_MARKET_HINTS_OBSERVER__ = obs;
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(syncV118, 180);
      setTimeout(installLegacyHintObserverV118, 220);
    }, {once:true});
  }else{
    setTimeout(syncV118, 180);
    setTimeout(installLegacyHintObserverV118, 220);
  }

  // Sem click/touch/scroll.
  window.addEventListener('resize', () => setTimeout(syncV118, 180), {passive:true});
  window.addEventListener('orientationchange', () => setTimeout(syncV118, 280), {passive:true});

  setTimeout(syncV118, 900);
  setTimeout(syncV118, 2200);
  setTimeout(syncV118, 4200);

  window.__ELTAUM_REMOVE_LEGACY_MARKET_HINTS_V118__ = { sync: syncV118, removeLegacy: removeLegacyHintsV118 };
})();


/* ════════════════════════════════════════════════════
   PATCH v119 — Header: data dentro da brand-text
   - Mantém v108 e v118.
   - Garante que #lastUpdate fique logo abaixo da descrição.
   - Corrige meta app-build no final para auditoria.
════════════════════════════════════════════════════ */
(function(){
  'use strict';

  const BUILD = 'ELTAUM_RATES_CLEAN_DASHBOARD_20260620_v399';
  window.__ELTAUM_HEADER_LASTUPDATE_REORG_BUILD__ = BUILD;

  function qs(sel, root=document){ return root.querySelector(sel); }

  function syncHeaderV119(){
    try{
      const meta = qs('meta[name="app-build"]');
      if(meta) meta.content = BUILD;

      const brandText = qs('.site-header-clean .brand-text');
      const lastUpdate = qs('#lastUpdate');
      const headerActions = qs('.site-header-clean .header-actions-v102');

      if(brandText && lastUpdate && lastUpdate.parentElement !== brandText){
        brandText.appendChild(lastUpdate);
      }

      if(headerActions && !headerActions.querySelector('#lastUpdate')){
        headerActions.remove();
      }

      const html = document.documentElement;
      html.classList.add('header-lastupdate-reorg-v119');
    }catch(e){}
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', () => setTimeout(syncHeaderV119, 120), {once:true});
  }else{
    setTimeout(syncHeaderV119, 120);
  }

  setTimeout(syncHeaderV119, 700);
  setTimeout(syncHeaderV119, 1800);
  setTimeout(syncHeaderV119, 3500);

  window.__ELTAUM_HEADER_LASTUPDATE_REORG_V119__ = { sync: syncHeaderV119 };
})();


/* ════════════════════════════════════════════════════
   PATCH v120 — Sistema tipográfico global
   - Apenas auditoria/build.
   - Não altera filtros, paginação v108, Mercado/Arraste v118 ou header v119.
════════════════════════════════════════════════════ */
(function(){
  'use strict';

  const BUILD = 'ELTAUM_RATES_CLEAN_DASHBOARD_20260620_v399';
  window.__ELTAUM_TYPOGRAPHY_SYSTEM_BUILD__ = BUILD;

  function qs(sel, root=document){ return root.querySelector(sel); }

  function syncTypographyV120(){
    try{
      const meta = qs('meta[name="app-build"]');
      if(meta) meta.content = BUILD;

      document.documentElement.classList.add('typography-system-v120');
    }catch(e){}
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', () => setTimeout(syncTypographyV120, 120), {once:true});
  }else{
    setTimeout(syncTypographyV120, 120);
  }

  setTimeout(syncTypographyV120, 800);
  setTimeout(syncTypographyV120, 1800);

  window.__ELTAUM_TYPOGRAPHY_SYSTEM_V120__ = { sync: syncTypographyV120 };
})();


/* ════════════════════════════════════════════════════
   PATCH v121 — Fechamento mensal: mini indicadores em modo painel
   - Apenas build/auditoria.
   - Não altera filtros, paginação v108, Mercado/Arraste v118, header v119 ou tipografia v120.
════════════════════════════════════════════════════ */
(function(){
  'use strict';

  const BUILD = 'ELTAUM_RATES_CLEAN_DASHBOARD_20260620_v399';
  window.__ELTAUM_CLOSED_MONTH_MINI_PANEL_BUILD__ = BUILD;

  function qs(sel, root=document){ return root.querySelector(sel); }

  function syncClosedMonthMiniPanelV121(){
    try{
      const meta = qs('meta[name="app-build"]');
      if(meta) meta.content = BUILD;

      const launch = qs('#closedMonthLaunch');
      if(launch) launch.classList.add('closed-month-mini-panel-v121');

      document.documentElement.classList.add('closed-month-mini-panel-v121');
    }catch(e){}
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', () => setTimeout(syncClosedMonthMiniPanelV121, 120), {once:true});
  }else{
    setTimeout(syncClosedMonthMiniPanelV121, 120);
  }

  setTimeout(syncClosedMonthMiniPanelV121, 800);
  setTimeout(syncClosedMonthMiniPanelV121, 1800);

  window.__ELTAUM_CLOSED_MONTH_MINI_PANEL_V121__ = { sync: syncClosedMonthMiniPanelV121 };
})();


/* ════════════════════════════════════════════════════
   PATCH v122 — Fechamento mensal mobile: rebalanceamento visual
   - Corrige card que ficou centralizado demais no celular.
   - Mantém v108, v118, v119, v120 e v121.
════════════════════════════════════════════════════ */
(function(){
  'use strict';

  const BUILD = 'ELTAUM_RATES_CLEAN_DASHBOARD_20260620_v399';
  window.__ELTAUM_CLOSED_MONTH_MOBILE_REBALANCE_BUILD__ = BUILD;

  function qs(sel, root=document){ return root.querySelector(sel); }

  function syncClosedMonthMobileV122(){
    try{
      const meta = qs('meta[name="app-build"]');
      if(meta) meta.content = BUILD;

      const launch = qs('#closedMonthLaunch');
      if(launch) launch.classList.add('closed-month-mobile-rebalance-v122');

      document.documentElement.classList.add('closed-month-mobile-rebalance-v122');
    }catch(e){}
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', () => setTimeout(syncClosedMonthMobileV122, 120), {once:true});
  }else{
    setTimeout(syncClosedMonthMobileV122, 120);
  }

  setTimeout(syncClosedMonthMobileV122, 800);
  setTimeout(syncClosedMonthMobileV122, 1800);

  window.__ELTAUM_CLOSED_MONTH_MOBILE_REBALANCE_V122__ = { sync: syncClosedMonthMobileV122 };
})();


/* ════════════════════════════════════════════════════
   PATCH v123 — Busca sem autofill/senhas no mobile
   Problema:
   - Chrome/Android exibia bottom sheet de senhas/endereço ao focar nos campos de busca.
   Ajuste:
   - força atributos anti-autofill nos inputs de busca;
   - não altera filtros, paginação v108, mercado v118, header v119, tipografia v120 ou cards v121/v122.
════════════════════════════════════════════════════ */
(function(){
  'use strict';

  const BUILD = 'ELTAUM_RATES_CLEAN_DASHBOARD_20260620_v399';
  window.__ELTAUM_SEARCH_NO_AUTOFILL_BUILD__ = BUILD;

  function qsa(sel, root=document){ return Array.from(root.querySelectorAll(sel)); }
  function qs(sel, root=document){ return root.querySelector(sel); }

  function isSearchInput(el){
    if(!el || el.tagName !== 'INPUT') return false;
    const blob = [
      el.id || '',
      el.name || '',
      el.className || '',
      el.placeholder || '',
      el.getAttribute('aria-label') || ''
    ].join(' ').toLowerCase();

    return (
      blob.includes('buscar fundo') ||
      blob.includes('benchmark') ||
      blob.includes('cnpj') ||
      blob.includes('search') ||
      blob.includes('fundo')
    );
  }

  function hardenSearchInputV123(el){
    
    if(!el) return;
    const originalTypeV126 = (el.getAttribute('type') || '').toLowerCase();
    const idV126 = (el.id || '').toLowerCase();
    const roleV126 = (el.getAttribute('role') || '').toLowerCase();
    const clsV126 = (el.className || '').toString().toLowerCase();
    if(
      idV126 === 'togglesemdados' ||
      originalTypeV126 === 'checkbox' ||
      originalTypeV126 === 'radio' ||
      roleV126 === 'switch' ||
      clsV126.includes('toggle') ||
      clsV126.includes('checkbox')
    ) return;
if(!isSearchInput(el)) return;

    try{ el.type = 'search'; }catch(e){}

    el.setAttribute('autocomplete', 'off');
    el.setAttribute('autocapitalize', 'none');
    el.setAttribute('autocorrect', 'off');
    el.setAttribute('spellcheck', 'false');
    el.setAttribute('inputmode', 'search');
    el.setAttribute('enterkeyhint', 'search');

    el.setAttribute('data-lpignore', 'true');
    el.setAttribute('data-form-type', 'other');
    el.setAttribute('data-1p-ignore', 'true');
    el.setAttribute('data-bwignore', 'true');

    el.setAttribute('name', 'fund_search_no_autofill');

    el.classList.add('search-no-autofill-v123');
  }

  function syncSearchNoAutofillV123(){
    try{
      const meta = qs('meta[name="app-build"]');
      if(meta) meta.content = BUILD;

      qsa('input').forEach(hardenSearchInputV123);
      document.documentElement.classList.add('search-no-autofill-v123');
    }catch(e){}
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', () => setTimeout(syncSearchNoAutofillV123, 100), {once:true});
  }else{
    setTimeout(syncSearchNoAutofillV123, 100);
  }

  setTimeout(syncSearchNoAutofillV123, 700);
  setTimeout(syncSearchNoAutofillV123, 1800);
  setTimeout(syncSearchNoAutofillV123, 3500);

  const obs = new MutationObserver((mutations) => {
    let shouldSync = false;
    for(const m of mutations){
      for(const n of m.addedNodes || []){
        if(n.nodeType !== 1) continue;
        if(n.tagName === 'INPUT' || (n.querySelector && n.querySelector('input'))){
          shouldSync = true;
          break;
        }
      }
      if(shouldSync) break;
    }
    if(shouldSync) requestAnimationFrame(syncSearchNoAutofillV123);
  });

  if(document.body) obs.observe(document.body, {childList:true, subtree:true});

  window.__ELTAUM_SEARCH_NO_AUTOFILL_V123__ = { sync: syncSearchNoAutofillV123 };
})();


/* ════════════════════════════════════════════════════
   PATCH v124 — Design System Tokens + legibilidade
   - Cria camada de tokens visuais.
   - Ajusta legibilidade dos blocos mais visíveis.
   - Não altera filtros, paginação v108, Mercado/Arraste v118, header v119,
     tipografia v120, cards v121/v122 ou busca v123.
════════════════════════════════════════════════════ */
(function(){
  'use strict';

  const BUILD = 'ELTAUM_RATES_CLEAN_DASHBOARD_20260620_v399';
  window.__ELTAUM_DESIGN_TOKENS_LEGIBILITY_BUILD__ = BUILD;

  function qs(sel, root=document){ return root.querySelector(sel); }

  function syncDesignTokensV124(){
    try{
      const meta = qs('meta[name="app-build"]');
      if(meta) meta.content = BUILD;

      document.documentElement.classList.add('design-tokens-legibility-v124');

      const launch = qs('#closedMonthLaunch');
      if(launch) launch.classList.add('closed-month-tokenized-v124');

      const mercado = qs('#sec-mercado');
      if(mercado) mercado.classList.add('market-tokenized-v124');
    }catch(e){}
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', () => setTimeout(syncDesignTokensV124, 120), {once:true});
  }else{
    setTimeout(syncDesignTokensV124, 120);
  }

  setTimeout(syncDesignTokensV124, 800);
  setTimeout(syncDesignTokensV124, 1800);

  window.__ELTAUM_DESIGN_TOKENS_LEGIBILITY_V124__ = { sync: syncDesignTokensV124 };
})();


/* ════════════════════════════════════════════════════
   PATCH v125 — KPI desktop + toggle "Ocultar fundos sem dados"
   - Melhora legibilidade do nome do fundo nos KPIs no desktop.
   - Reforça funcionamento do toggle no desktop sem alterar lógica existente.
   - Preserva v108/v118/v119/v120/v121/v122/v123/v124.
════════════════════════════════════════════════════ */
(function(){
  'use strict';

  const BUILD = 'ELTAUM_RATES_CLEAN_DASHBOARD_20260620_v399';
  window.__ELTAUM_KPI_TOGGLE_DESKTOP_FIX_BUILD__ = BUILD;

  function qs(sel, root=document){ return root.querySelector(sel); }
  function qsa(sel, root=document){ return Array.from(root.querySelectorAll(sel)); }

  function syncBuildV125(){
    try{
      const meta = qs('meta[name="app-build"]');
      if(meta) meta.content = BUILD;
      document.documentElement.classList.add('kpi-toggle-desktop-fix-v125');
    }catch(e){}
  }

  function findHideNoDataControl(){
    const label = qsa('.toggle-label').find(el =>
      (el.textContent || '').toLowerCase().includes('ocultar fundos sem dados') ||
      (el.title || '').toLowerCase().includes('ocultar fundos sem dados')
    );

    const input =
      qs('#hideNoData') ||
      qs('#hideEmptyFunds') ||
      qs('#hideWithoutData') ||
      qs('#toggleNoData') ||
      qs('input[type="checkbox"][data-hide-no-data]') ||
      (label ? label.closest('label')?.querySelector('input[type="checkbox"]') : null) ||
      (label ? label.parentElement?.querySelector('input[type="checkbox"]') : null) ||
      (label ? label.closest('.toggle-control,.switch,.data-toggle,.no-data-toggle,.toggle-wrap')?.querySelector('input[type="checkbox"]') : null);

    const wrap =
      input?.closest('label') ||
      input?.closest('.toggle-control,.switch,.data-toggle,.no-data-toggle,.toggle-wrap') ||
      label?.closest('label') ||
      label?.parentElement;

    return {label, input, wrap};
  }

  function reinforceHideNoDataToggleV125(){
    try{
      const {label, input, wrap} = findHideNoDataControl();
      if(label){
        label.textContent = 'Ocultar fundos sem dados';
        label.title = 'Ocultar fundos sem dados';
        label.classList.add('toggle-label-v125');
      }

      if(wrap){
        wrap.classList.add('hide-no-data-toggle-v125');
        wrap.setAttribute('role', wrap.getAttribute('role') || 'switch');
        wrap.style.pointerEvents = 'auto';
      }

      if(input){
        input.classList.add('hide-no-data-input-v125');
        input.style.pointerEvents = 'auto';

        if(!input.dataset.v125Bound){
          input.dataset.v125Bound = '1';
          input.addEventListener('change', () => {
            setTimeout(() => {
              try{
                if(typeof window.renderTable === 'function') window.renderTable();
                if(typeof window.renderCards === 'function') window.renderCards();
                if(typeof window.applyFilters === 'function') window.applyFilters();
              }catch(e){}
            }, 0);
          });
        }

        if(label && !label.dataset.v125Bound){
          label.dataset.v125Bound = '1';
          label.addEventListener('click', (ev) => {
            if(ev.target === input) return;
            const container = label.closest('label');
            if(container) return; // label nativo já resolve
            ev.preventDefault();
            input.click();
          });
        }

        if(wrap && !wrap.dataset.v125Bound){
          wrap.dataset.v125Bound = '1';
          wrap.addEventListener('click', (ev) => {
            if(ev.target === input || ev.target.closest('input')) return;
            if(ev.target.closest('button,a,select')) return;
            if(ev.target.classList && ev.target.classList.contains('toggle-label-v125')) return;
            input.click();
          });
        }
      }
    }catch(e){}
  }

  function syncV125(){
    syncBuildV125();
    reinforceHideNoDataToggleV125();
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', () => setTimeout(syncV125, 120), {once:true});
  }else{
    setTimeout(syncV125, 120);
  }

  setTimeout(syncV125, 800);
  setTimeout(syncV125, 1800);
  setTimeout(syncV125, 3500);

  window.__ELTAUM_KPI_TOGGLE_DESKTOP_FIX_V125__ = {
    sync: syncV125,
    findHideNoDataControl
  };
})();


/* ════════════════════════════════════════════════════
   PATCH v126 — Corrige #toggleSemDados para checkbox
   Causa confirmada:
   - O patch v123 de anti-autofill transformou #toggleSemDados em type="search".
   Correção:
   - #toggleSemDados sempre volta a ser checkbox;
   - remove atributos de busca/autofill do toggle;
   - impede que o anti-autofill trate toggles como campos de busca;
   - preserva v108/v118/v119/v120/v121/v122/v123/v124/v125.
════════════════════════════════════════════════════ */
(function(){
  'use strict';

  const BUILD = 'ELTAUM_RATES_CLEAN_DASHBOARD_20260620_v399';
  window.__ELTAUM_TOGGLE_SEM_DADOS_CHECKBOX_FIX_BUILD__ = BUILD;

  function qs(sel, root=document){ return root.querySelector(sel); }

  function normalizeToggleSemDadosV126(){
    try{
      const meta = qs('meta[name="app-build"]');
      if(meta) meta.content = BUILD;

      document.documentElement.classList.add('toggle-sem-dados-checkbox-fix-v126');

      const input = qs('#toggleSemDados');
      if(!input) return;

      try{ input.type = 'checkbox'; }catch(e){ input.setAttribute('type', 'checkbox'); }

      input.name = 'toggleSemDados';
      input.removeAttribute('inputmode');
      input.removeAttribute('enterkeyhint');
      input.removeAttribute('autocomplete');
      input.removeAttribute('autocapitalize');
      input.removeAttribute('autocorrect');
      input.removeAttribute('spellcheck');
      input.removeAttribute('data-lpignore');
      input.removeAttribute('data-form-type');
      input.removeAttribute('data-1p-ignore');
      input.removeAttribute('data-bwignore');

      input.classList.remove('search-no-autofill-v123');
      input.classList.add('hide-no-data-input-v126');

      input.style.pointerEvents = 'auto';

      const wrap = input.closest('.toggle-wrap');
      const label = input.closest('label');
      const text = wrap?.querySelector('.toggle-label');

      if(wrap){
        wrap.classList.add('toggle-sem-dados-fixed-v126');
        wrap.style.pointerEvents = 'auto';
      }

      if(label){
        label.style.pointerEvents = 'auto';
      }

      if(text){
        text.style.pointerEvents = 'auto';
        text.textContent = 'Ocultar fundos sem dados';
        text.title = 'Ocultar fundos sem dados';
      }

      if(!input.dataset.v126Bound){
        input.dataset.v126Bound = '1';
        input.addEventListener('click', (ev) => {
          ev.stopPropagation();
        }, true);

        input.addEventListener('change', () => {
          setTimeout(() => {
            try{
              if(typeof window.aplicarFiltros === 'function') window.aplicarFiltros();
              else if(typeof window.applyFilters === 'function') window.applyFilters();
              else if(typeof window.renderFunds === 'function') window.renderFunds();
              else if(typeof window.renderTable === 'function') window.renderTable();
            }catch(e){}
          }, 0);
        });
      }

      if(wrap && !wrap.dataset.v126ClickBound){
        wrap.dataset.v126ClickBound = '1';
        wrap.addEventListener('click', (ev) => {
          if(ev.target === input || ev.target.closest('input,button,a,select')) return;
          ev.preventDefault();
          input.checked = !input.checked;
          input.dispatchEvent(new Event('change', {bubbles:true}));
        });
      }

    }catch(e){}
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', () => setTimeout(normalizeToggleSemDadosV126, 80), {once:true});
  }else{
    setTimeout(normalizeToggleSemDadosV126, 80);
  }

  setTimeout(normalizeToggleSemDadosV126, 400);
  setTimeout(normalizeToggleSemDadosV126, 1000);
  setTimeout(normalizeToggleSemDadosV126, 2200);
  setTimeout(normalizeToggleSemDadosV126, 4000);

  window.__ELTAUM_TOGGLE_SEM_DADOS_CHECKBOX_FIX_V126__ = {
    sync: normalizeToggleSemDadosV126,
    diagnose(){
      const input = qs('#toggleSemDados');
      const wrap = input?.closest('.toggle-wrap');
      const text = wrap?.querySelector('.toggle-label');
      return {
        build: qs('meta[name="app-build"]')?.content,
        htmlClass: document.documentElement.className,
        input: {
          existe: !!input,
          type: input?.type,
          checked: input?.checked,
          name: input?.name,
          className: input?.className,
          outerHTML: input?.outerHTML
        },
        wrap: {
          existe: !!wrap,
          className: wrap?.className,
          pointerEvents: wrap ? getComputedStyle(wrap).pointerEvents : null
        },
        texto: text?.textContent?.trim()
      };
    }
  };
})();


/* ════════════════════════════════════════════════════
   PATCH v127 — Toggle sem dados: clique nativo sem duplo evento
   Causa identificada no diagnóstico:
   - O clique no slider acionava o label/input nativo e também handlers manuais v125/v126.
   - Isso gerava alternância duplicada: true -> false -> true.
   Correção:
   - Recria somente o controle do toggle para limpar handlers antigos.
   - Usa 1 único listener no input checkbox.
   - Mantém estado global e dispara rotinas de render/filtro quando disponíveis.
════════════════════════════════════════════════════ */
(function(){
  'use strict';

  const BUILD = 'ELTAUM_RATES_CLEAN_DASHBOARD_20260620_v399';
  window.__ELTAUM_TOGGLE_SEM_DADOS_NATIVE_FIX_BUILD__ = BUILD;

  function qs(sel, root=document){ return root.querySelector(sel); }
  function qsa(sel, root=document){ return Array.from(root.querySelectorAll(sel)); }

  function getToggleStateV127(){
    try{
      const input = qs('#toggleSemDados');
      if(input) return !!input.checked;
      if(typeof window.ocultarSemDados === 'boolean') return !!window.ocultarSemDados;
      if(typeof window.hideNoData === 'boolean') return !!window.hideNoData;
      if(typeof window.__hideNoData === 'boolean') return !!window.__hideNoData;
    }catch(e){}
    return false;
  }

  function setPossibleGlobalStatesV127(checked){
    try{ window.ocultarSemDados = checked; }catch(e){}
    try{ window.hideNoData = checked; }catch(e){}
    try{ window.__hideNoData = checked; }catch(e){}
    try{ window.semDadosOcultos = checked; }catch(e){}
  }

  function callIfFnV127(name){
    try{
      if(typeof window[name] === 'function'){
        window[name]();
        return true;
      }
    }catch(e){}
    return false;
  }

  function refreshFundsV127(){
    const called = [
      'aplicarFiltros',
      'applyFilters',
      'filtrarFundos',
      'applyCurrentFilters',
      'renderFundos',
      'renderFunds',
      'renderCards',
      'renderTable',
      'atualizarTabela',
      'updateFundList'
    ].some(callIfFnV127);

    // Fallback: dispara eventos para listeners originais que escutem document/window.
    try{ document.dispatchEvent(new CustomEvent('toggleSemDadosChange', {detail:{checked:getToggleStateV127()}})); }catch(e){}
    try{ window.dispatchEvent(new CustomEvent('toggleSemDadosChange', {detail:{checked:getToggleStateV127()}})); }catch(e){}

    return called;
  }

  function normalizeAndRebuildToggleV127(){
    try{
      const meta = qs('meta[name="app-build"]');
      if(meta) meta.content = BUILD;

      document.documentElement.classList.add('toggle-sem-dados-native-fix-v127');

      const oldInput = qs('#toggleSemDados');
      if(!oldInput) return null;

      const oldWrap = oldInput.closest('.toggle-wrap') || oldInput.closest('.compact-toggle-wrap') || oldInput.parentElement;
      if(!oldWrap) return null;

      if(oldWrap.dataset.v127Rebuilt === '1'){
        const input = qs('#toggleSemDados');
        if(input && input.type !== 'checkbox') input.type = 'checkbox';
        return input;
      }

      const checked = !!oldInput.checked;

      // Recria estrutura limpa para remover handlers manuais antigos que causavam duplo toggle.
      const newWrap = document.createElement('div');
      newWrap.className = 'toggle-wrap compact-toggle-wrap toggle-sem-dados-clean-v127';
      newWrap.title = 'Ocultar fundos sem dados';
      newWrap.dataset.v127Rebuilt = '1';

      const newLabel = document.createElement('label');
      newLabel.className = 'toggle toggle-sem-dados-label-v127';
      newLabel.setAttribute('aria-label', 'Ocultar fundos sem dados');

      const newInput = document.createElement('input');
      newInput.type = 'checkbox';
      newInput.id = 'toggleSemDados';
      newInput.name = 'toggleSemDados';
      newInput.checked = checked;
      newInput.className = 'toggle-sem-dados-input-v127';
      newInput.setAttribute('aria-label', 'Ocultar fundos sem dados');

      const newSlider = document.createElement('span');
      newSlider.className = 'toggle-slider toggle-sem-dados-slider-v127';
      newSlider.setAttribute('aria-hidden', 'true');

      const newText = document.createElement('span');
      newText.className = 'toggle-label toggle-sem-dados-text-v127';
      newText.title = 'Ocultar fundos sem dados';
      newText.textContent = 'Ocultar fundos sem dados';

      newLabel.appendChild(newInput);
      newLabel.appendChild(newSlider);
      newWrap.appendChild(newLabel);
      newWrap.appendChild(newText);

      oldWrap.replaceWith(newWrap);

      setPossibleGlobalStatesV127(checked);

      newInput.addEventListener('change', () => {
        const value = !!newInput.checked;
        newWrap.classList.toggle('is-on', value);
        setPossibleGlobalStatesV127(value);
        setTimeout(refreshFundsV127, 0);
      });

      // Texto também aciona o input, mas apenas uma vez.
      newText.addEventListener('click', (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        newInput.click();
      });

      newWrap.classList.toggle('is-on', checked);

      return newInput;
    }catch(e){
      console.warn('[v127 toggleSemDados] falha ao reconstruir toggle', e);
      return null;
    }
  }

  function syncV127(){
    normalizeAndRebuildToggleV127();
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', () => setTimeout(syncV127, 120), {once:true});
  }else{
    setTimeout(syncV127, 120);
  }

  setTimeout(syncV127, 500);
  setTimeout(syncV127, 1200);
  setTimeout(syncV127, 2500);

  window.__ELTAUM_TOGGLE_SEM_DADOS_NATIVE_FIX_V127__ = {
    sync: syncV127,
    diagnose(){
      const input = qs('#toggleSemDados');
      const wrap = input?.closest('.toggle-wrap');
      const label = input?.closest('label');
      const text = wrap?.querySelector('.toggle-label');
      const slider = label?.querySelector('.toggle-slider');
      const info = (el) => {
        if(!el) return null;
        const cs = getComputedStyle(el);
        const r = el.getBoundingClientRect();
        return {
          tag: el.tagName,
          id: el.id || '',
          type: el.type || '',
          checked: typeof el.checked === 'boolean' ? el.checked : null,
          className: el.className || '',
          display: cs.display,
          opacity: cs.opacity,
          pointerEvents: cs.pointerEvents,
          width: cs.width,
          height: cs.height,
          rect:{x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width),h:Math.round(r.height)},
          outerHTML: el.outerHTML
        };
      };
      return {
        build: qs('meta[name="app-build"]')?.content,
        htmlClass: document.documentElement.className,
        input: info(input),
        label: info(label),
        slider: info(slider),
        wrap: info(wrap),
        text: info(text),
        globals:{
          ocultarSemDados: window.ocultarSemDados,
          hideNoData: window.hideNoData,
          __hideNoData: window.__hideNoData
        },
        funcoes:{
          aplicarFiltros: typeof window.aplicarFiltros,
          applyFilters: typeof window.applyFilters,
          filtrarFundos: typeof window.filtrarFundos,
          renderFundos: typeof window.renderFundos,
          renderFunds: typeof window.renderFunds,
          renderCards: typeof window.renderCards,
          renderTable: typeof window.renderTable
        }
      };
    }
  };
})();


/* ════════════════════════════════════════════════════
   PATCH v128 — W3C HTML Validate Fix
   - Corrige marcações que o Nu Html Checker apontou.
   - Não altera regras de negócio.
   - Preserva v108/v118/v119/v120/v121/v122/v123/v124/v125/v126/v127.
════════════════════════════════════════════════════ */
(function(){
  'use strict';

  const BUILD = 'ELTAUM_RATES_CLEAN_DASHBOARD_20260620_v399';
  window.__ELTAUM_W3C_HTML_VALIDATE_FIX_BUILD__ = BUILD;

  function qs(sel, root=document){ return root.querySelector(sel); }
  function qsa(sel, root=document){ return Array.from(root.querySelectorAll(sel)); }

  function syncW3CV128(){
    try{
      const meta = qs('meta[name="app-build"]');
      if(meta) meta.content = BUILD;

      document.documentElement.classList.add('w3c-html-validate-fix-v128');

      // Fallback runtime: qualquer div com aria-label e sem role ganha role="group".
      qsa('div[aria-label]').forEach(el => {
        if(!el.getAttribute('role')) el.setAttribute('role', 'group');
      });

      // Evita containers role=button com botões/títulos dentro.
      qsa('[role="button"]').forEach(el => {
        if(el.tagName !== 'BUTTON' && (el.querySelector('button,h1,h2,h3,h4,h5,h6'))){
          el.setAttribute('role','region');
        }
      });

      // Dialog precisa estar coerente em runtime.
      const sheet = qs('#closedMarketSheet');
      if(sheet){
        sheet.setAttribute('role','dialog');
        sheet.setAttribute('aria-modal','true');
      }
    }catch(e){}
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', () => setTimeout(syncW3CV128, 120), {once:true});
  }else{
    setTimeout(syncW3CV128, 120);
  }

  setTimeout(syncW3CV128, 800);
  setTimeout(syncW3CV128, 1800);

  window.__ELTAUM_W3C_HTML_VALIDATE_FIX_V128__ = { sync: syncW3CV128 };
})();

/* ════════════════════════════════════════════════════════════
   ELTAUM_DESKTOP_SIDE_NAV_20260610_v129
   Scroll suave e destaque automático do menu lateral desktop
════════════════════════════════════════════════════════════ */
(function(){
  'use strict';

  const MIN_DESKTOP_NAV = 1220;

  function $$(sel, root=document){ return Array.from(root.querySelectorAll(sel)); }
  function isDesktopNav(){ return window.matchMedia && window.matchMedia('(min-width:'+MIN_DESKTOP_NAV+'px)').matches; }

  function setActiveDesktopNav(id){
    if(!id) return;
    $$('.desktop-side-nav .desktop-nav-link').forEach(link=>{
      const active = link.getAttribute('data-section') === id || link.getAttribute('href') === '#'+id;
      link.classList.toggle('active', active);
      if(active) link.setAttribute('aria-current','page');
      else link.removeAttribute('aria-current');
    });
  }

  function openTargetIfNeeded(target){
    if(!target) return;

    if(target.id === 'sec-fontes'){
      const details = target.querySelector('details');
      if(details) details.open = true;
    }

    if(target.classList && target.classList.contains('collapsible-section')){
      const body = target.querySelector('.section-collapsible-body[hidden]');
      const toggle = target.querySelector('button[aria-expanded="false"], .section-collapsible-toggle[aria-expanded="false"], .section-toggle[aria-expanded="false"]');
      if(body && toggle && typeof toggle.click === 'function'){
        try{ toggle.click(); }catch(e){}
      }
    }
  }

  function scrollToTarget(target){
    if(!target) return;
    openTargetIfNeeded(target);
    const offset = 24;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({top:Math.max(0,top),behavior:'smooth'});
  }

  function setupDesktopSideNav(){
    const nav = document.getElementById('desktopSideNav');
    if(!nav) return;

    const links = $$('.desktop-nav-link', nav);
    links.forEach(link=>{
      link.addEventListener('click', ev=>{
        const href = link.getAttribute('href') || '';
        if(!href.startsWith('#')) return;
        const id = href.slice(1);
        const target = document.getElementById(id);
        if(!target) return;
        ev.preventDefault();
        setActiveDesktopNav(id);
        scrollToTarget(target);
        try{ history.replaceState(null,'',href); }catch(e){}
      });
    });

    const sectionIds = links.map(link=>link.getAttribute('data-section')).filter(Boolean);
    const sections = sectionIds.map(id=>document.getElementById(id)).filter(Boolean);

    if('IntersectionObserver' in window && sections.length){
      const observer = new IntersectionObserver(entries=>{
        if(!isDesktopNav()) return;
        const visible = entries
          .filter(entry=>entry.isIntersecting)
          .sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
        if(visible && visible.target && visible.target.id){
          setActiveDesktopNav(visible.target.id);
        }
      },{root:null,rootMargin:'-28% 0px -58% 0px',threshold:[0.01,0.08,0.16,0.28,0.42]});
      sections.forEach(sec=>observer.observe(sec));
    }

    if(location.hash){
      const id = decodeURIComponent(location.hash.slice(1));
      if(document.getElementById(id)) setActiveDesktopNav(id);
    }
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', setupDesktopSideNav);
  }else{
    setupDesktopSideNav();
  }
})();


/* ELTAUM_RANKING_CATEGORY_NAMES_FULL_20260611_v149
   Ajuste visual feito em CSS: nomes completos nos cartões por categoria. */


/* ════════════════════════════════════════════════════════════
   ELTAUM_MARKET_EXECUTIVE_SIMPLE_20260612_v159
   - Um único modo visível: executivo OU tabela analítica.
   - O período "Último fechado" é lido da base e replicado em todo o painel.
   - O mês corrente permanece separado como parcial/aguardando.
   - Sem MutationObserver amplo: atualizações controladas e finitas.
════════════════════════════════════════════════════════════ */
(function(){
  'use strict';

  const BUILD = 'ELTAUM_RATES_CLEAN_DASHBOARD_20260620_v399';
  const DESKTOP = 901;
  const state = { mode:'exec', usMode:'brl', lastFingerprint:'' };
  const monthMap = {jan:0,fev:1,mar:2,abr:3,mai:4,jun:5,jul:6,ago:7,set:8,out:9,nov:10,dez:11};
  const monthNames = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];

  function qs(sel, root=document){ return root.querySelector(sel); }
  function qsa(sel, root=document){ return Array.from(root.querySelectorAll(sel)); }
  function clean(v){ return String(v == null ? '' : v).replace(/\s+/g,' ').trim(); }
  function text(id){ const el=document.getElementById(id); return el ? clean(el.textContent) : '—'; }
  function esc(v){ return String(v == null ? '' : v).replace(/[&<>"']/g, ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch])); }
  function pctClass(v){
    const s=clean(v);
    const m=s.match(/[+-]?\d+(?:[.,]\d+)?\s*%/);
    if(!m) return s === '—' || !s ? 'dash' : 'neu';
    const n=Number(m[0].replace('%','').replace('.','').replace(',','.'));
    return n>0?'pos':n<0?'neg':'neu';
  }
  function periodToken(v){
    const s=clean(v).toLowerCase();
    const m=s.match(/\b(jan|fev|mar|abr|mai|jun|jul|ago|set|out|nov|dez)\s*\/\s*(20\d{2})\b/i);
    if(m) return `${m[1].toLowerCase()}/${m[2]}`;
    const n=s.match(/\b(0?[1-9]|1[0-2])\s*\/\s*(20\d{2})\b/);
    if(n) return `${monthNames[Number(n[1])-1]}/${n[2]}`;
    return '';
  }
  function previousCalendarMonth(){
    const d=new Date();
    d.setDate(1); d.setMonth(d.getMonth()-1);
    return `${monthNames[d.getMonth()]}/${d.getFullYear()}`;
  }
  function currentCalendarMonth(){
    const d=new Date();
    return `${monthNames[d.getMonth()]}/${d.getFullYear()}`;
  }
  function getClosedPeriod(){
    const candidates=[
      text('th-mes-ant-sub'), text('cdi-mes-ant-sub'), text('ipca-mes-ant-sub'),
      text('dolar-ant-sub'), text('ibov-ant-sub'), text('sp-ant-sub'), text('dow-ant-sub'), text('nasdaq-ant-sub'),
      text('closedCardPeriod'), text('closedMonthLaunchSub')
    ];
    for(const v of candidates){ const p=periodToken(v); if(p) return p; }
    return previousCalendarMonth();
  }
  function getCurrentPeriod(){
    const candidates=[text('th-mes-cur-sub'),text('cdi-cur-sub'),text('dolar-cur-sub'),text('ibov-cur-sub'),text('sp-cur-sub')];
    for(const v of candidates){ const p=periodToken(v); if(p) return p; }
    return currentCalendarMonth();
  }
  function getAccumLabel(){
    // A fonte primária passa a ser o estado global gravado pelos patches de clique.
    // Isso evita divergência quando listeners legados interrompem a propagação do evento.
    const datasetMonths=clean(document.documentElement.dataset.indicPeriod || '');
    const active=qs('.market-period-tabs .indic-tab.active[data-months]');
    const headerMonths=periodToken(text('th-acum-sub-v2')).replace(/\D/g,'');
    const months=[datasetMonths,active?.dataset.months,headerMonths]
      .map(v=>String(v||''))
      .find(v=>['12','24','36'].includes(v)) || '12';
    return `${months}M`;
  }
  function valueOrDash(v){ const s=clean(v); return s && !/^(m[eê]s|ano|fechado|atual)$/i.test(s) ? s : '—'; }

  function normalizeClosedPeriodLabels(closed, current){
    const closedHeader=qs('#th-mes-ant-sub');
    if(closedHeader) closedHeader.textContent=closed;
    const currentHeader=qs('#th-mes-cur-sub');
    if(currentHeader && !periodToken(currentHeader.textContent)) currentHeader.textContent=current;

    ['cdi-mes-ant-sub','ipca-mes-ant-sub','dolar-ant-sub','ibov-ant-sub','sp-ant-sub','dow-ant-sub','nasdaq-ant-sub'].forEach(id=>{
      const el=document.getElementById(id);
      if(el) el.textContent=`${closed} · fechado`;
    });
    const launch=document.getElementById('closedMonthLaunchSub');
    if(launch) launch.textContent=`${closed} · indicadores consolidados`;
    const cardPeriod=document.getElementById('closedCardPeriod');
    if(cardPeriod) cardPeriod.textContent=closed;
    const sheetNote=document.getElementById('closedMarketSheetNote');
    if(sheetNote) sheetNote.textContent=`Último mês fechado · ${closed}`;
  }

  function parseUs(id){
    const raw=text(id);
    const result={usd:'—',brl:'—'};
    const re=/(USD|BRL)\s*([+-]?\d+(?:[.,]\d+)?%|—)/ig;
    let m;
    while((m=re.exec(raw))){ result[m[1].toLowerCase()]=m[2]; }
    if(result.usd==='—' && result.brl==='—'){
      const vals=raw.match(/[+-]?\d+(?:[.,]\d+)?%/g)||[];
      if(vals[0]) result.usd=vals[0];
      if(vals[1]) result.brl=vals[1];
      else if(vals[0]) result.brl=vals[0];
    }
    return result;
  }
  function usHtml(pair, mode){
    if(mode==='both'){
      return `<span class="market-v150-double"><span class="${pctClass(pair.usd)}">USD ${esc(pair.usd)}</span><span class="${pctClass(pair.brl)}">BRL ${esc(pair.brl)}</span></span>`;
    }
    const val=pair[mode]||'—';
    return `<strong class="${pctClass(val)}">${esc(val)}</strong><small>${mode.toUpperCase()}</small>`;
  }
  function marketCell(main, sub='', mainClass){
    const cls=mainClass || pctClass(main);
    return `<div class="market-v150-cell"><strong class="${cls}">${esc(valueOrDash(main))}</strong>${sub?`<small class="market-v150-sub ${pctClass(sub)}">${esc(sub)}</small>`:''}</div>`;
  }
  function nameCell(icon,name,sub){
    return `<div class="market-v150-name"><span class="market-v150-icon">${icon}</span><div><strong>${esc(name)}</strong><small>${esc(sub)}</small></div></div>`;
  }
  function standardRow(item){
    return `<div class="market-v150-row">${nameCell(item.icon,item.name,item.sub)}${item.cells.map(c=>marketCell(c.main,c.sub,c.cls)).join('')}</div>`;
  }
  function groupCard(title, subtitle, rows, extraClass=''){
    const accum=getAccumLabel();
    return `<article class="market-v150-card ${extraClass}"><div class="market-v150-card-head"><div><span>${esc(title)}</span><small>${esc(subtitle)}</small></div></div><div class="market-v150-table-head"><span>Indicador</span><span>Fechado</span><span>Atual</span><span>Ano</span><span>${esc(accum)}</span></div>${rows.map(standardRow).join('')}</article>`;
  }
  function usCard(rows){
    const accum=getAccumLabel();
    return `<article class="market-v150-card us"><div class="market-v150-card-head"><div><span>Bolsas dos Estados Unidos</span><small>Retornos convertidos em BRL, em USD ou nas duas moedas</small></div><div class="market-v150-us-toggle" role="group" aria-label="Moeda dos índices dos Estados Unidos">${['brl','usd','both'].map(mode=>`<button type="button" data-v150-us="${mode}" class="${state.usMode===mode?'active':''}" aria-pressed="${state.usMode===mode}">${mode==='both'?'Ambos':mode.toUpperCase()}</button>`).join('')}</div></div><div class="market-v150-table-head"><span>Índice</span><span>Fechado</span><span>Atual</span><span>Ano</span><span>${esc(accum)}</span></div>${rows.map(r=>`<div class="market-v150-row">${nameCell(r.icon,r.name,r.sub)}<div class="market-v150-cell">${usHtml(r.closed,state.usMode)}</div><div class="market-v150-cell">${usHtml(r.current,state.usMode)}${r.points&&r.points!=='—'?`<small class="market-v150-points">${esc(r.points)}</small>`:''}</div><div class="market-v150-cell">${usHtml(r.year,state.usMode)}</div><div class="market-v150-cell">${usHtml(r.accum,state.usMode)}</div></div>`).join('')}</article>`;
  }

  function collectData(){
    const closed=getClosedPeriod();
    const current=getCurrentPeriod();
    const accum=getAccumLabel();
    const ipcaCurrentEl=qs('#row-ipca .td-cur');
    const ipcaCurrentTxt=clean(ipcaCurrentEl?.textContent||'');
    const ipcaCurrent = /aguard/i.test(ipcaCurrentTxt) ? '—' : valueOrDash(ipcaCurrentTxt.match(/[+-]?\d+(?:[.,]\d+)?%/)?.[0]||'—');
    return {
      closed,current,accum,
      cdi:{
        closed:valueOrDash(text('cdi-mes-ant')),
        current:valueOrDash(text('cdi-mes-cur')),
        currentRef:clean(_dadosMercado?.cards?.cdi?.parcial_ate || ''),
        currentDateIso:clean(_dadosMercado?.cards?.cdi?.parcial_data_iso || ''),
        currentPeriodRef:clean(_dadosMercado?.cards?.cdi?.parcial_ref || ''),
        currentSource:clean(_dadosMercado?.cards?.cdi?.parcial_origem || ''),
        year:valueOrDash(text('cdi-ano')),
        accum:valueOrDash(text('cdi-acum-v2'))
      },
      ipca:{closed:valueOrDash(text('ipca-mes-ant')),current:ipcaCurrent,year:valueOrDash(text('ipca-ano-v2')),accum:valueOrDash(text('ipca-acum-v2'))},
      dolar:{closedQuote:valueOrDash(text('dolar-ant-cot')),closedVar:valueOrDash(text('dolar-ant-var')),currentQuote:valueOrDash(text('dolar-cur-cot')),currentVar:valueOrDash(text('dolar-cur-var')),year:valueOrDash(text('dolar-ano-v2')),accum:valueOrDash(text('dolar-acum-v2'))},
      ibov:{closedPoints:valueOrDash(text('ibov-ant-pts')),closedVar:valueOrDash(text('ibov-ant-var')),currentPoints:valueOrDash(text('ibov-cur-pts')),currentVar:valueOrDash(text('ibov-cur-var')),year:valueOrDash(text('ibov-ano-v2')),accum:valueOrDash(text('ibov-acum-v2'))},
      us:[
        {icon:'🌎',name:'S&P 500',sub:'índice amplo dos EUA',closed:parseUs('sp-ant-var'),current:parseUs('sp-cur-var'),year:parseUs('sp-ano-var'),accum:parseUs('sp-acum-var'),points:valueOrDash(text('sp-cur-pts'))},
        {icon:'🏛️',name:'Dow Jones',sub:'empresas blue chips',closed:parseUs('dow-ant-var'),current:parseUs('dow-cur-var'),year:parseUs('dow-ano-var'),accum:parseUs('dow-acum-var'),points:valueOrDash(text('dow-cur-pts'))},
        {icon:'💻',name:'Nasdaq',sub:'empresas de tecnologia',closed:parseUs('nasdaq-ant-var'),current:parseUs('nasdaq-cur-var'),year:parseUs('nasdaq-ano-var'),accum:parseUs('nasdaq-acum-var'),points:valueOrDash(text('nasdaq-cur-pts'))}
      ]
    };
  }

  function summaryKpi(label, main, sub, mainClass=''){
    const cls=mainClass||pctClass(main);
    return `<div class="market-v150-summary-kpi"><b>${esc(label)}</b><strong class="${cls}">${esc(main)}</strong><small class="${pctClass(sub)}">${esc(sub)}</small></div>`;
  }
  function compactUsValue(pair, mode){
    const resolved = mode === 'usd' ? 'usd' : 'brl';
    return valueOrDash(pair?.[resolved] || '—');
  }
  function closedMetric(label, main, subLabel, subValue, mainClass=''){
    const cls=mainClass || pctClass(main);
    return `<article class="market-v159-kpi"><span>${esc(label)}</span><strong class="${cls}">${esc(valueOrDash(main))}</strong><small><b>${esc(subLabel)}</b><em class="${pctClass(subValue)}">${esc(valueOrDash(subValue))}</em></small></article>`;
  }
  function currentMetric(label, main, variation, mainClass='neu'){
    return `<div class="market-v159-current-metric"><span>${esc(label)}</span><strong class="${mainClass}">${esc(valueOrDash(main))}</strong><em class="${pctClass(variation)}">${esc(valueOrDash(variation))}</em></div>`;
  }
  function currentCdiMetricV233(data){
    const info={
      data:data?.cdi?.currentRef || '',
      dataIso:data?.cdi?.currentDateIso || '',
      referencia:data?.cdi?.currentPeriodRef || data?.current || '',
      origem:data?.cdi?.currentSource || ''
    };
    const contexto=contextoCdiAtualV233(info);
    return `<div class="market-v159-current-metric market-current-cdi-v233"><span>CDI</span><strong class="${pctClass(data?.cdi?.current)}">${esc(valueOrDash(data?.cdi?.current))}</strong><div class="market-current-cdi-meta-v233"><b>${esc(contexto.title)}</b><em>${esc(contexto.detail)}</em></div></div>`;
  }
  function usCompactCard(item, mode, accum){
    const current=compactUsValue(item.current,mode);
    const year=compactUsValue(item.year,mode);
    const total=compactUsValue(item.accum,mode);
    return `<article class="market-v159-us-card"><div class="market-v159-us-name"><span>${item.icon}</span><strong>${esc(item.name)}</strong></div><div class="market-v159-us-current"><span>Mês atual</span><strong class="${pctClass(current)}">${esc(current)}</strong></div><div class="market-v159-us-foot"><span><b>Ano</b><em class="${pctClass(year)}">${esc(year)}</em></span><span><b>${esc(accum)}</b><em class="${pctClass(total)}">${esc(total)}</em></span></div></article>`;
  }
  function parsePctV172(value){
    const match=clean(value).match(/[+-]?\d+(?:[.,]\d+)?\s*%/);
    if(!match) return null;
    let raw=match[0].replace('%','').replace(/\s+/g,'');
    if(raw.includes(',') && raw.includes('.')) raw=raw.replace(/\./g,'').replace(',','.');
    else if(raw.includes(',')) raw=raw.replace(',','.');
    const n=Number(raw);
    return Number.isFinite(n)?n:null;
  }
  function formatPctV172(value, suffix='%'){
    if(value===null || !Number.isFinite(value)) return '—';
    const abs=Math.abs(value).toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2});
    return `${value>0?'+':value<0?'−':''}${abs}${suffix}`;
  }
  function comparisonRowV172(label, value, maxAbs, tone){
    const n=parsePctV172(value);
    const safeMax=Math.max(maxAbs||0,1);
    const width=n===null?0:Math.min(Math.abs(n)/safeMax*50,50);
    const left=n===null?50:(n<0?50-width:50);
    const cls=n===null?'dash':n>0?'pos':n<0?'neg':'neu';
    return `<div class="market-v172-compare-row ${tone||''}">
      <div class="market-v172-compare-label"><span>${esc(label)}</span><strong class="${cls}">${esc(valueOrDash(value))}</strong></div>
      <div class="market-v172-compare-track" aria-hidden="true"><i></i><b class="${cls}" style="left:${left.toFixed(2)}%;width:${width.toFixed(2)}%"></b></div>
    </div>`;
  }
  function differenceCardV172(label, diff){
    const cls=diff===null?'dash':diff>0?'pos':diff<0?'neg':'neu';
    return `<div class="market-v172-diff-card"><span>${esc(label)}</span><strong class="${cls}">${esc(formatPctV172(diff,' p.p.'))}</strong></div>`;
  }
  function ibovPerspectiveV172(data){
    const ibov=parsePctV172(data.ibov.accum);
    const cdi=parsePctV172(data.cdi.accum);
    const ipca=parsePctV172(data.ipca.accum);
    const values=[ibov,cdi,ipca].filter(Number.isFinite);
    const maxAbs=values.length?Math.max(...values.map(Math.abs),1):1;
    const vsCdi=ibov!==null && cdi!==null ? ibov-cdi : null;
    const vsIpca=ibov!==null && ipca!==null ? ibov-ipca : null;
    const relation=(name,diff)=>{
      if(diff===null) return `sem comparação disponível com ${name}`;
      if(Math.abs(diff)<0.005) return `empatado com ${name}`;
      return `${Math.abs(diff).toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2})} p.p. ${diff>0?'acima':'abaixo'} de ${name}`;
    };
    const reading=ibov===null
      ? `Aguardando o retorno acumulado do Ibovespa para ${data.accum}.`
      : `Em ${data.accum}, o Ibovespa está ${relation('CDI',vsCdi)} e ${relation('IPCA',vsIpca)}.`;

    return `<section class="market-v159-section market-v172-ibov" aria-label="Ibovespa em perspectiva">
      <div class="market-v159-section-head market-v172-ibov-head">
        <div><span>Bolsa brasileira</span><strong>Ibovespa em perspectiva</strong></div>
        <small>Retorno acumulado · ${esc(data.accum)}</small>
      </div>
      <div class="market-v172-ibov-grid">
        <div class="market-v172-compare" role="img" aria-label="Comparação do retorno acumulado do Ibovespa, CDI e IPCA em ${esc(data.accum)}">
          ${comparisonRowV172('Ibovespa',data.ibov.accum,maxAbs,'ibov')}
          ${comparisonRowV172('CDI',data.cdi.accum,maxAbs,'cdi')}
          ${comparisonRowV172('IPCA',data.ipca.accum,maxAbs,'ipca')}
          <div class="market-v172-axis"><span>Retorno negativo</span><b>0%</b><span>Retorno positivo</span></div>
        </div>
        <aside class="market-v172-reading">
          <div class="market-v172-reading-title"><span>💡</span><div><strong>Leitura do período</strong><small>${esc(data.accum)} selecionados no painel</small></div></div>
          <p>${esc(reading)}</p>
          <div class="market-v172-diff-grid">
            ${differenceCardV172('Ibovespa × CDI',vsCdi)}
            ${differenceCardV172('Ibovespa × IPCA',vsIpca)}
            <div class="market-v172-diff-card"><span>Mês atual</span><strong class="${pctClass(data.ibov.currentVar)}">${esc(valueOrDash(data.ibov.currentVar))}</strong></div>
            <div class="market-v172-diff-card"><span>Pontuação atual</span><strong class="neu">${esc(valueOrDash(data.ibov.currentPoints))}</strong></div>
          </div>
        </aside>
      </div>
    </section>`;
  }
  function buildDashboard(data){
    const body=document.getElementById('sec-painel-body');
    if(!body) return null;
    qsa('#marketDashboardV146,.market-exec-dashboard-v146',body).forEach(el=>el.remove());
    let shell=document.getElementById('marketDashboardV150');
    if(!shell){
      shell=document.createElement('div');
      shell.id='marketDashboardV150';
      shell.className='market-v150-shell market-v159-shell';
      const table=qs(':scope > .indic-table-wrap',body) || qs('.indic-table-wrap',body);
      body.insertBefore(shell,table||body.firstChild);
    }
    shell.classList.add('market-v159-shell');
    const usMode=state.usMode==='usd'?'usd':'brl';
    const awaiting=[];
    const currentNotes=[];
    const cdiAvailable=data.cdi.current!=='—';
    const ipcaAvailable=data.ipca.current!=='—';
    if(!cdiAvailable) awaiting.push('CDI');
    else currentNotes.push('CDI acumulado no mês');
    if(!ipcaAvailable) awaiting.push('IPCA');
    else currentNotes.push('IPCA disponível');
    const awaitingText=[
      ...currentNotes,
      awaiting.length ? `${awaiting.join(' e ')} aguardando fechamento` : ''
    ].filter(Boolean).join(' · ') || 'Indicadores correntes disponíveis';

    shell.innerHTML=`
      <div class="market-v150-head market-v159-head">
        <div class="market-v150-title market-v159-title">
          <strong>Indicadores de mercado</strong>
          <div class="market-v150-periods market-v159-periods"><span><b>Fechado</b> ${esc(data.closed)}</span><i></i><span><b>Atual</b> ${esc(data.current)} parcial</span></div>
        </div>
        <div class="market-v150-view-switch" role="group" aria-label="Modo de visualização do painel">
          <button type="button" data-v150-mode="exec" class="${state.mode==='exec'?'active':''}" aria-pressed="${state.mode==='exec'}">Visão executiva</button>
          <button type="button" data-v150-mode="analytic" class="${state.mode==='analytic'?'active':''}" aria-pressed="${state.mode==='analytic'}">Tabela analítica</button>
        </div>
      </div>
      <div class="market-v150-executive market-v159-executive">
        <section class="market-v159-section market-v159-closed">
          <div class="market-v159-section-head"><div><span>Fechamento</span><strong>${esc(data.closed)}</strong></div><small>Último mês consolidado</small></div>
          <div class="market-v159-kpi-grid">
            ${closedMetric('CDI',data.cdi.closed,data.accum,data.cdi.accum)}
            ${closedMetric('IPCA',data.ipca.closed,data.accum,data.ipca.accum)}
            ${closedMetric('Dólar PTAX',data.dolar.closedQuote,'Variação no mês',data.dolar.closedVar,'neu')}
            ${closedMetric('Ibovespa',data.ibov.closedPoints,'Variação no mês',data.ibov.closedVar,'neu')}
          </div>
        </section>

        <section class="market-v159-current market-v227-current" aria-label="Mês atual">
          <div class="market-v159-current-copy"><span>Mês atual</span><strong>${esc(data.current)} · parcial</strong><small>${esc(awaitingText)}</small></div>
          ${currentCdiMetricV233(data)}
          ${currentMetric('Dólar',data.dolar.currentQuote,data.dolar.currentVar)}
          ${currentMetric('Ibovespa',data.ibov.currentPoints,data.ibov.currentVar)}
        </section>

        ${ibovPerspectiveV172(data)}

        <section class="market-v159-section market-v159-us">
          <div class="market-v159-section-head">
            <div><span>Bolsas dos EUA</span><strong>Retornos em ${usMode.toUpperCase()}</strong></div>
            <div class="market-v150-us-toggle market-v159-us-toggle" role="group" aria-label="Moeda dos índices dos Estados Unidos">
              ${['brl','usd'].map(mode=>`<button type="button" data-v150-us="${mode}" class="${usMode===mode?'active':''}" aria-pressed="${usMode===mode}">${mode.toUpperCase()}</button>`).join('')}
            </div>
          </div>
          <div class="market-v159-us-grid">${data.us.map(item=>usCompactCard(item,usMode,data.accum)).join('')}</div>
        </section>
      </div>`;
    return shell;
  }

  function applyMode(){
    const body=document.getElementById('sec-painel-body');
    const shell=document.getElementById('marketDashboardV150');
    const table=body && (qs(':scope > .indic-table-wrap',body)||qs('.indic-table-wrap',body));
    if(!body||!shell||!table) return;
    const mobile=window.innerWidth<DESKTOP;
    body.classList.toggle('market-v150-mode-exec',!mobile && state.mode==='exec');
    body.classList.toggle('market-v150-mode-analytic',!mobile && state.mode==='analytic');
    shell.style.display=mobile?'none':'';
    if(mobile){ table.style.display=''; table.hidden=false; }
    else { table.style.display=''; table.hidden=false; }
  }
  function bind(shell){
    if(!shell || shell.dataset.boundV150==='1') return;
    shell.dataset.boundV150='1';
    shell.addEventListener('click',ev=>{
      const modeBtn=ev.target.closest('[data-v150-mode]');
      if(modeBtn){ state.mode=modeBtn.dataset.v150Mode==='analytic'?'analytic':'exec'; state.lastFingerprint=''; sync(true); return; }
      const usBtn=ev.target.closest('[data-v150-us]');
      if(usBtn){ state.usMode=['brl','usd','both'].includes(usBtn.dataset.v150Us)?usBtn.dataset.v150Us:'brl'; state.lastFingerprint=''; sync(true); }
    });
  }
  function fingerprint(data){ return JSON.stringify(data)+`|${state.mode}|${state.usMode}`; }
  function sync(force=false){
    try{
      const body=document.getElementById('sec-painel-body');
      if(!body) return;
      const meta=qs('meta[name="app-build"]'); if(meta) meta.content=BUILD;
      document.documentElement.classList.add('market-panel-pro-v150','market-ibov-perspective-v172','dolar-current-dedup-v172','market-period-sync-v174');
      const data=collectData();
      normalizeClosedPeriodLabels(data.closed,data.current);
      const fp=fingerprint(data);
      let shell=document.getElementById('marketDashboardV150');
      if(force || fp!==state.lastFingerprint || !shell){ shell=buildDashboard(data); state.lastFingerprint=fp; }
      bind(shell);
      applyMode();
    }catch(err){ console.warn('[v150 mercado]',err); }
  }
  function debounce(fn,wait){ let t; return function(){ clearTimeout(t); t=setTimeout(fn,wait); }; }
  function init(){
    [120,450,900,1600,2800,4800,8000,12000].forEach(ms=>setTimeout(()=>sync(false),ms));
    document.addEventListener('click',ev=>{
      if(ev.target.closest('#sec-mercado-painel,.section-toggle-btn')) setTimeout(()=>sync(true),120);
    },true);
    document.addEventListener('elton:market-period-change',()=>{
      // Duplo frame garante que CDI, IPCA e Ibovespa já tenham recebido os valores do novo período.
      requestAnimationFrame(()=>requestAnimationFrame(()=>sync(true)));
      setTimeout(()=>sync(true),140);
    });

    // Segurança v174: o patch legado de alta prioridade usa stopImmediatePropagation
    // no window. Por isso, o painel também observa diretamente o estado do período.
    const periodObserver=new MutationObserver(mutations=>{
      if(!mutations.some(m=>m.type==='attributes' && m.attributeName==='data-indic-period')) return;
      requestAnimationFrame(()=>requestAnimationFrame(()=>sync(true)));
      setTimeout(()=>sync(true),90);
    });
    periodObserver.observe(document.documentElement,{
      attributes:true,
      attributeFilter:['data-indic-period']
    });

    window.addEventListener('resize',debounce(()=>{applyMode();},140),{passive:true});
    window.addEventListener('pageshow',()=>setTimeout(()=>sync(true),120),{once:true});
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true}); else init();
  window.__ELTAUM_MARKET_PANEL_V150__={sync:()=>sync(true),getClosedPeriod,getCurrentPeriod,state};
})();


/* ==========================================================
   ELTAUM v227 — CDI parcial automático no painel executivo
   - lê cards.cdi.parcial_mes_atual gerado diariamente pelo robô
   - mostra data do último dado disponível em cards.cdi.parcial_ate
   - preserva mês fechado e acumulados históricos separadamente
========================================================== */

/* ==========================================================
   ELTAUM v232 — atualização automática do mercado_atual.json
   - consulta a base sem cache a cada 30 minutos;
   - atualiza ao retornar para a aba ou focar a janela;
   - mantém visão executiva e tabela analítica sincronizadas.
========================================================== */
(function(){
  'use strict';
  const INTERVALO_MS = 30 * 60 * 1000;
  let executando = false;
  let ultimaAssinatura = '';

  function assinatura(raw){
    const cdi = raw?.cards?.cdi || {};
    return [raw?.atualizado_em||'',cdi.parcial_mes_atual??'',cdi.parcial_data_iso||'',cdi.acum_12m??'',cdi.acum_24m??'',cdi.acum_36m??''].join('|');
  }

  async function atualizarAgora(forcar=false){
    if(executando) return false;
    executando = true;
    try{
      const url = BASE_URL + 'mercado_atual.json?v=cdi-daily-v232-' + Date.now();
      const response = await fetch(url,{cache:'no-store',headers:{'Cache-Control':'no-cache'}});
      if(!response.ok) throw new Error(`HTTP ${response.status}`);
      const raw = await response.json();
      const sig = assinatura(raw);
      if(!forcar && sig && sig === ultimaAssinatura) return false;
      ultimaAssinatura = sig;

      const fresco = typeof normalizarMercadoAtual === 'function' ? normalizarMercadoAtual(raw) : raw;
      try{
        if(typeof _dadosMercado === 'object' && _dadosMercado){
          _dadosMercado = {
            ..._dadosMercado,
            ...fresco,
            cards:{...(_dadosMercado.cards||{}),...(fresco.cards||{})}
          };
        }else{
          _dadosMercado = fresco;
        }
      }catch(e){
        window.__mercadoAtualV230 = fresco;
      }
      window.__mercadoAtualV230 = _dadosMercado || fresco;
      sincronizarEstadoCdiV229(_dadosMercado || fresco);
      if((_dadosMercado||fresco)?.atualizado_em) atualizarDataHeader((_dadosMercado||fresco).atualizado_em);
      atualizarTabelaIndicadores();
      try{ window.__ELTAUM_MARKET_PANEL_V150__?.sync?.(); }catch(e){}
      try{ window.__ELTAUM_MARKET_PERIOD_CARDS_V196__?.render?.(); }catch(e){}
      document.dispatchEvent(new CustomEvent('elton:market-data-refresh',{detail:{build:'v232',cdi:obterCdiAtualV232(_dadosMercado||fresco)}}));
      return true;
    }catch(error){
      console.warn('[v232] Atualização automática dos indicadores indisponível:',error);
      return false;
    }finally{
      executando = false;
    }
  }

  function iniciar(){
    // v367: no mobile real, o refresh recorrente pode acordar rotinas visuais.
    // O carregamento inicial do mercado_atual.json permanece normal.
    const mobile = window.matchMedia && window.matchMedia('(max-width: 820px)').matches;
    if(mobile){
      window.__ELTAUM_CDI_DAILY_REFRESH_MOBILE_DISABLED_V367__ = true;
      return;
    }
    setTimeout(()=>atualizarAgora(true),60*1000);
    setInterval(()=>atualizarAgora(false),INTERVALO_MS);
    document.addEventListener('visibilitychange',()=>{
      if(document.visibilityState==='visible') atualizarAgora(false);
    });
    window.addEventListener('focus',()=>atualizarAgora(false),{passive:true});
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',iniciar,{once:true});
  else iniciar();
  window.atualizarIndicadoresAgoraV232 = atualizarAgora;
})();

/* ==========================================================
   ELTAUM v151 — integração dos componentes restaurados
   - navegação com offset e destaque da seção
   - selects dos rankings sincronizados com os filtros existentes
   - classes completas de ativo
   - painel lateral de atenção alimentado apenas por retornos negativos
========================================================== */
(function(){
  'use strict';
  const BUILD='ELTAUM_FUND_CATALOG_NAVIGATION_20260611_v153';

  const q=(s,r=document)=>r.querySelector(s);
  const qa=(s,r=document)=>Array.from(r.querySelectorAll(s));
  const esc=(v)=>String(v??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  const normalize=(v)=>String(v||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toUpperCase();
  const nval=(v)=>{ try{return typeof toNum==='function'?toNum(v):Number(String(v??'').replace('%','').replace(',','.'));}catch(e){return null;} };
  const pct=(v)=>{const n=nval(v);if(n===null||!Number.isFinite(n))return '—';return (n>0?'+':'')+n.toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2})+'%';};

  const CATEGORY_BY_FILTER_V197=Object.freeze({
    'renda-fixa-simples':'RENDA FIXA SIMPLES',
    'renda-fixa':'RENDA FIXA',
    'renda-fixa-referenciado':'RENDA FIXA REFERENCIADO',
    'renda-fixa-curto-prazo':'RENDA FIXA CURTO PRAZO',
    'multimercado':'MULTIMERCADO',
    'cambial':'CAMBIAL',
    'acoes':'ACOES',
    'fundo-de-indice':'FUNDO DE INDICE',
    'fmp':'FUNDOS MUTUOS DE PRIVATIZACAO'
  });
  function categoryMatches(category,filter){
    const cat=normalize(category).replace(/\s+/g,' ').trim();
    const f=String(filter||'todos');
    if(f==='todos') return true;
    if(f==='sem-fmp') return cat!==CATEGORY_BY_FILTER_V197.fmp;
    const expected=CATEGORY_BY_FILTER_V197[f];
    return expected ? cat===expected : true;
  }
  window.rankCategoryMatchesV151=categoryMatches;

  // Substitui o filtro global usado pelo renderer legado sem reescrever o renderer inteiro.
  try{
    passaFiltroRanking=function(r){
      return categoryMatches(r?.Categoria,typeof activeRankFilter!=='undefined'?activeRankFilter:'todos');
    };
  }catch(e){}

  function navOffset(){
    const nav=q('#desktopAnchorNavV131');
    return nav && nav.offsetParent!==null ? nav.getBoundingClientRect().height+18 : 18;
  }
  function scrollToTarget(target,focusSearch){
    if(!target) return;
    const top=Math.max(0,target.getBoundingClientRect().top+window.scrollY-navOffset());
    window.scrollTo({top,behavior:'smooth'});
    if(focusSearch){
      setTimeout(()=>{const inp=q('#searchInput');if(inp){try{inp.focus({preventScroll:true});}catch(e){inp.focus();}}},520);
    }
  }
  function bindNavigation(){
    const nav=q('#desktopAnchorNavV131');
    if(!nav||nav.dataset.v151Bound==='1') return;
    nav.dataset.v151Bound='1';
    nav.addEventListener('click',ev=>{
      const a=ev.target.closest('[data-anchor-target]');
      if(!a) return;
      ev.preventDefault();
      const detailsId=a.dataset.openDetails;
      const bodyId=a.dataset.openSection;
      if(detailsId){const d=document.getElementById(detailsId);if(d&&'open' in d)d.open=true;}
      if(bodyId){const b=document.getElementById(bodyId);if(b)b.hidden=false;}
      const target=document.getElementById(a.dataset.anchorTarget);
      qa('.desktop-anchor-link-v131',nav).forEach(x=>x.classList.toggle('active',x===a));
      try{history.replaceState(null,'',location.pathname+location.search);}catch(e){}
      requestAnimationFrame(()=>scrollToTarget(target,a.dataset.searchFocus==='1'));
    });

    if('IntersectionObserver' in window){
      const links=qa('[data-anchor-target]',nav).filter(a=>a.dataset.searchFocus!=='1');
      const map=new Map(links.map(a=>[a.dataset.anchorTarget,a]));
      const io=new IntersectionObserver(entries=>{
        const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>Math.abs(a.boundingClientRect.top)-Math.abs(b.boundingClientRect.top))[0];
        if(!visible) return;
        const active=map.get(visible.target.id);
        if(active) qa('.desktop-anchor-link-v131',nav).forEach(a=>a.classList.toggle('active',a===active));
      },{rootMargin:'-18% 0px -70% 0px',threshold:[0,.01]});
      map.forEach((_,id)=>{const el=document.getElementById(id);if(el)io.observe(el);});
    }
  }

  function syncRankingControls(){
    const cls=q('#rankingClassSelectV136');
    const period=q('#rankingPeriodSelectV136');
    const risk=q('#rankingRiskSelectV198');
    if(cls && typeof activeRankFilter!=='undefined' && cls.value!==activeRankFilter) cls.value=activeRankFilter;
    if(period && typeof activeRankPeriods!=='undefined'){
      const p=activeRankPeriods.topFundos||'12m';
      if(period.value!==p) period.value=p;
    }
    if(risk && typeof activeRankRisk!=='undefined' && risk.value!==(activeRankRisk||'')) risk.value=activeRankRisk||'';
    try{syncRiskProfileControlsV198();}catch(e){}
  }

  function filteredRankingRows(includeMissing=false){
    if(typeof allRows==='undefined'||!Array.isArray(allRows)) return [];
    return allRows.filter(r=>includeMissing ? true : (typeof temDados==='function'?temDados(r):true)).filter(r=>{
      try{
        if(!passaFiltroRanking(r)) return false;
        if(typeof activeRankRisk!=='undefined'&&activeRankRisk&&!perfilRiscoCorrespondeV198(r['Perfil de Risco'],activeRankRisk)) return false;
        return true;
      }catch(e){return true;}
    });
  }

  function attentionRows(rows,campo,reason,limit=4){
    return rows
      .filter(r=>{const n=nval(r[campo]);return n!==null&&Number.isFinite(n)&&n<0;})
      .sort((a,b)=>nval(a[campo])-nval(b[campo]))
      .slice(0,limit)
      .map(r=>`<button type="button" class="attention-row-v136" data-attention-fund="${esc(r.Fundo||'')}"><span><span class="fund">${esc(r.Fundo||'—')}</span><span class="reason">${esc(reason)}</span></span><span class="value">${esc(pct(r[campo]))}</span></button>`).join('');
  }

  function renderAttention(){
    const host=q('#rankingAttentionV136 .attention-body-v136');
    if(!host) return;
    const rows=filteredRankingRows(false);
    const neg12=rows.filter(r=>{const n=nval(r['Acum. 12M (%)']);return n!==null&&n<0;});
    const negAno=rows.filter(r=>{const n=nval(r['Acum. Ano (%)']);return n!==null&&n<0;});
    const negMes=rows.filter(r=>{const n=nval(r['Acum. Mes (%)']);return n!==null&&n<0;});
    const missing=filteredRankingRows(true).filter(r=>{
      try{return typeof temDados==='function'?!temDados(r):false;}catch(e){return false;}
    });
    let worst=attentionRows(rows,'Acum. 12M (%)','12M negativo — avaliar contexto e benchmark',4);
    if(!worst) worst=attentionRows(rows,'Acum. Mes (%)','Mês negativo — monitorar comportamento',4);
    const year=attentionRows(rows,'Acum. Ano (%)','Ano negativo — verificar a tese de manutenção',3);
    const insight=neg12.length
      ? `<strong>${neg12.length}</strong> fundo(s) com retorno negativo em 12 meses no filtro atual. Use os alertas como ponto de partida para investigar classe, prazo, benchmark e aderência ao perfil.`
      : `Nenhum retorno negativo em 12 meses no filtro atual. Ainda assim, confira eventuais resultados negativos no mês e no ano.`;
    host.innerHTML=`
      <div class="attention-metric-grid-v136">
        <div class="attention-metric-v136"><span>12M negativo</span><strong>${neg12.length}</strong></div>
        <div class="attention-metric-v136"><span>Ano negativo</span><strong>${negAno.length}</strong></div>
      </div>
      <div class="attention-block-v136"><h3>Insight SIPII</h3><div class="attention-insight-v136">${insight}</div></div>
      ${worst?`<div class="attention-block-v136"><h3>Piores em 12 meses</h3><div class="attention-list-v136">${worst}</div></div>`:''}
      ${year?`<div class="attention-block-v136"><h3>Negativos no ano</h3><div class="attention-list-v136">${year}</div></div>`:''}
      <div class="attention-foot-v136">Alertas automáticos para apoio à análise. Não substituem suitability, objetivo e horizonte do cliente.</div>`;
  }

  function renderRankingsAndAttention(){
    try{ if(typeof renderRankings==='function') renderRankings(); }catch(e){console.error('v151 ranking render',e);}
    syncRankingControls();
    renderAttention();
  }

  function bindRankingControls(){
    const cls=q('#rankingClassSelectV136');
    const period=q('#rankingPeriodSelectV136');
    const risk=q('#rankingRiskSelectV198');
    if(cls&&cls.dataset.v151Bound!=='1'){
      cls.dataset.v151Bound='1';
      cls.addEventListener('change',()=>{
        try{activeRankFilter=cls.value||'todos';}catch(e){}
        renderRankingsAndAttention();
      });
    }
    if(period&&period.dataset.v151Bound!=='1'){
      period.dataset.v151Bound='1';
      period.addEventListener('change',()=>{
        try{activeRankPeriods.topFundos=period.value||'12m';}catch(e){}
        renderRankingsAndAttention();
      });
    }
    if(risk&&risk.dataset.v198Bound!=='1'){
      risk.dataset.v198Bound='1';
      risk.addEventListener('change',()=>{
        try{activeRankRisk=risk.value||'';}catch(e){}
        renderRankingsAndAttention();
      });
    }
    const section=q('#rankingsSection');
    if(section&&section.dataset.v151AttentionBound!=='1'){
      section.dataset.v151AttentionBound='1';
      section.addEventListener('click',ev=>{
        const row=ev.target.closest('[data-attention-fund]');
        if(!row) return;
        const name=row.dataset.attentionFund||'';
        const input=q('#searchInput');
        if(input){
          input.value=name;
          input.dispatchEvent(new Event('input',{bubbles:true}));
          scrollToTarget(q('#sec-fundos'),true);
        }
      });
    }
    document.addEventListener('click',ev=>{
      if(ev.target.closest('[data-rank-filter],[data-rank-period]')) setTimeout(()=>{syncRankingControls();renderAttention();},40);
    },true);
  }

  function init(){
    const meta=q('meta[name="app-build"]');if(meta)meta.content=BUILD;
    document.documentElement.classList.add('fund-catalog-navigation-v153','fund-details-enrichment-v154');
    bindNavigation();
    bindRankingControls();
    syncRankingControls();
    setTimeout(renderRankingsAndAttention,250);
    setTimeout(renderRankingsAndAttention,1100);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true}); else init();
})();


/* ════════════════════════════════════════════════════
   PATCH v156 — integração oficial fundos.json
   Une metadados operacionais ao CSV por CNPJ, código ou nome.
════════════════════════════════════════════════════ */
(function(){
  const BUILD='ELTAUM_FUNDOS_META_INTEGRATION_20260612_v156';
  function syncBuild(){
    const meta=document.querySelector('meta[name="app-build"]');
    if(meta) meta.content=BUILD;
    document.documentElement.classList.add('fundos-meta-integration-v156');
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',syncBuild,{once:true}); else syncBuild();
  window.__ELTAUM_FUNDOS_META_V156__={
    build:BUILD,
    get totalCnpj(){ return Object.keys(_fundosMetaMap||{}).length; },
    get totalCodigos(){ return Object.keys(_fundosMetaByCode||{}).length; },
    localizar(cnpjOuCodigo){
      const d=String(cnpjOuCodigo||'').replace(/\D/g,'');
      return _fundosMetaMap[d] || _fundosMetaByCode[d] || null;
    },
    auditar(){
      const rows=Array.isArray(allRows)?allRows:[];
      const vinculados=rows.filter(r=>!!r.__fundosMeta).length;
      return {linhasCsv:rows.length,vinculados,semVinculo:rows.length-vinculados,cnpjsMeta:Object.keys(_fundosMetaMap||{}).length};
    }
  };
})();


/* ==========================================================
   ELTAUM v158 — detalhes do fundo organizados por jornada
========================================================== */
(function(){
  const BUILD='ELTAUM_FUND_DETAIL_EXECUTIVE_20260612_v158';
  function mark(){
    document.documentElement.classList.add('fund-detail-executive-v158');
    window.__ELTAUM_BUILD_V158__=BUILD;
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',mark,{once:true});
  else mark();
})();


/* ════════════════════════════════════════════════════════════
   ELTAUM_MARKET_ANALYTIC_COMPACT_20260612_v160
   Compactação controlada da tabela analítica e seletor BRL/USD.
════════════════════════════════════════════════════════════ */
(function(){
  'use strict';
  const BUILD='ELTAUM_MARKET_ANALYTIC_COMPACT_20260612_v160';
  const state={currency:'brl'};

  function qs(sel,root=document){return root.querySelector(sel);}
  function qsa(sel,root=document){return Array.from(root.querySelectorAll(sel));}

  function renameGroups(table){
    const cdi=document.getElementById('row-cdi');
    const dolar=document.getElementById('row-dolar');
    const ibov=document.getElementById('row-ibov');
    if(cdi?.previousElementSibling?.classList.contains('group-row')){
      const span=qs('.group-lbl>span',cdi.previousElementSibling);
      if(span) span.textContent='Taxas e inflação';
    }
    if(dolar?.previousElementSibling?.classList.contains('group-row')){
      const span=qs('.group-lbl>span',dolar.previousElementSibling);
      if(span) span.textContent='Brasil — câmbio e bolsa';
    }
    if(ibov?.previousElementSibling?.classList.contains('group-row')){
      ibov.previousElementSibling.hidden=true;
      ibov.previousElementSibling.style.display='none';
    }
    const sp=document.getElementById('row-sp');
    if(sp?.previousElementSibling?.classList.contains('group-row')){
      const span=qs('.group-lbl>span',sp.previousElementSibling);
      if(span) span.textContent='Bolsas dos Estados Unidos';
    }
  }

  function applyCurrency(wrap,mode){
    state.currency=['brl','usd','both'].includes(mode)?mode:'brl';
    wrap.classList.remove('us-mode-brl','us-mode-usd','us-mode-both');
    wrap.classList.add(`us-mode-${state.currency}`);
    qsa('[data-analytic-currency]',wrap).forEach(btn=>{
      const active=btn.dataset.analyticCurrency===state.currency;
      btn.classList.toggle('active',active);
      btn.setAttribute('aria-pressed',String(active));
    });
  }

  function buildTools(wrap){
    let tools=qs('.market-analytic-tools-v160',wrap);
    if(tools) return tools;
    tools=document.createElement('div');
    tools.className='market-analytic-tools-v160';
    tools.innerHTML=`
      <div class="market-analytic-tools-title-v160">
        <strong>Tabela analítica</strong>
        <small>Comparação por período; cotações e pontos permanecem neutros</small>
      </div>
      <div class="market-analytic-currency-v160" role="group" aria-label="Moeda dos índices dos Estados Unidos">
        <span>Bolsas EUA</span>
        <button type="button" data-analytic-currency="brl" aria-pressed="true">BRL</button>
        <button type="button" data-analytic-currency="usd" aria-pressed="false">USD</button>
        <button type="button" data-analytic-currency="both" aria-pressed="false">Ambos</button>
      </div>`;
    wrap.insertBefore(tools,wrap.firstChild);
    tools.addEventListener('click',ev=>{
      const btn=ev.target.closest('[data-analytic-currency]');
      if(!btn) return;
      applyCurrency(wrap,btn.dataset.analyticCurrency);
    });
    return tools;
  }

  function setup(){
    const body=document.getElementById('sec-painel-body');
    const wrap=body && (qs(':scope > .indic-table-wrap',body)||qs('.indic-table-wrap',body));
    const table=wrap && qs('.indic-table-v2',wrap);
    if(!wrap||!table) return;
    const meta=qs('meta[name="app-build"]');
    if(meta) meta.content=BUILD;
    document.documentElement.classList.add('market-analytic-compact-v160');
    wrap.classList.add('market-analytic-compact-v160');
    renameGroups(table);
    buildTools(wrap);
    applyCurrency(wrap,state.currency);
  }

  function init(){
    setup();
    [250,700,1400,2800,5200,9000].forEach(ms=>setTimeout(setup,ms));
    document.addEventListener('click',ev=>{
      if(ev.target.closest('[data-v150-mode="analytic"],.market-period-tabs .indic-tab,#sec-mercado-painel')){
        setTimeout(setup,100);
      }
    },true);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
  window.__ELTAUM_MARKET_ANALYTIC_V160__={setup,get currency(){return state.currency;}};
})();

/* ELTAUM_DOLAR_PTAX_REORG_20260612_v162 */

/* ════════════════════════════════════════════════════════════
   ELTAUM_MARKET_ANALYTIC_DEDUP_20260612_v163
   Remove contexto repetido das células da tabela analítica.
════════════════════════════════════════════════════════════ */
(function(){
  'use strict';
  const BUILD='ELTAUM_MARKET_ANALYTIC_DEDUP_20260612_v163';

  function qs(sel,root=document){return root.querySelector(sel);}
  function qsa(sel,root=document){return Array.from(root.querySelectorAll(sel));}
  function cleanStatus(value){
    const text=String(value||'').trim().toLowerCase();
    if(text.includes('aguard')) return 'aguardando';
    if(text.includes('parcial')) return 'parcial';
    return '';
  }
  function titleCase(value){
    const s=String(value||'').trim();
    return s ? s.charAt(0).toUpperCase()+s.slice(1) : '';
  }
  function hideContext(cell){
    qsa(':scope > .v2-sub',cell).forEach(el=>{
      el.classList.add('redundant-context-v163');
      el.setAttribute('aria-hidden','true');
    });
  }
  function compactCurrentCell(cell){
    const sub=qs(':scope > .v2-sub',cell);
    const statusNode=qs('.period-status',cell);
    const primaryStatus=qs('.analytic-status-primary-v163',cell);
    const dash=qs('.v2-val.dash',cell);
    const status=cleanStatus(
      statusNode?.textContent ||
      sub?.textContent ||
      primaryStatus?.textContent ||
      dash?.textContent ||
      ''
    );

    cell.classList.toggle('status-cell-v164',Boolean(status));

    // O status aparece uma única vez, como chip centralizado.
    // Esconde o antigo valor principal criado pela v163 para evitar duplicação
    // em execuções repetidas do setup().
    [dash,primaryStatus].filter(Boolean).forEach(el=>{
      el.style.display='none';
      el.setAttribute('aria-hidden','true');
    });

    if(status && sub){
      sub.classList.remove('redundant-context-v163');
      sub.removeAttribute('aria-hidden');
      sub.classList.add('status-only-v163');
      sub.innerHTML=`<span class="analytic-status-chip-v163 status-${status}">${titleCase(status)}</span>`;
      return;
    }

    if(sub){
      sub.classList.add('redundant-context-v163');
      sub.setAttribute('aria-hidden','true');
    }
  }

  function setup(){
    const body=document.getElementById('sec-painel-body');
    const wrap=body && (qs(':scope > .indic-table-wrap',body)||qs('.indic-table-wrap',body));
    const table=wrap && qs('.indic-table-v2',wrap);
    if(!wrap||!table) return;

    document.documentElement.classList.add('market-analytic-dedup-v163');
    wrap.classList.add('market-analytic-dedup-v163');
    const meta=qs('meta[name="app-build"]');
    if(meta) meta.content=BUILD;

    const toolSub=qs('.market-analytic-tools-title-v160 small',wrap);
    if(toolSub) toolSub.textContent='Comparação por período';

    const acumSub=document.getElementById('th-acum-sub-v2');
    if(acumSub){
      acumSub.classList.add('redundant-context-v163');
      acumSub.setAttribute('aria-hidden','true');
    }
    const anoSub=document.getElementById('th-ano-sub');
    if(anoSub) anoSub.textContent='até agora';

    qsa('tbody tr.data-row',table).forEach(row=>{
      const cells=qsa(':scope > td',row);
      if(cells.length<5) return;
      hideContext(cells[1]);       // período já está em "Último fechado"
      compactCurrentCell(cells[2]); // mantém apenas Parcial/Aguardando
      hideContext(cells[3]);       // "No ano" já está no cabeçalho
      hideContext(cells[4]);       // "12M" já está no cabeçalho
    });

    qsa('#row-sp .ind-v2-sub,#row-dow .ind-v2-sub,#row-nasdaq .ind-v2-sub',table)
      .forEach(el=>{ el.textContent='Pontos · variação'; });
  }

  function init(){
    setup();
    [180,500,1000,1800,3200,5600,9000].forEach(ms=>setTimeout(setup,ms));
    document.addEventListener('click',ev=>{
      if(ev.target.closest('[data-v150-mode="analytic"],.market-period-tabs .indic-tab,[data-analytic-currency],#sec-mercado-painel')){
        setTimeout(setup,80);
        setTimeout(setup,320);
      }
    },true);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
  window.__ELTAUM_MARKET_ANALYTIC_V163__={setup};
})();


/* ════════════════════════════════════════════════════════════
   ELTAUM_MARKET_ANALYTIC_ALIGNMENT_20260612_v164
   Alinhamento híbrido: nomes à esquerda, números à direita,
   cabeçalhos e estados operacionais centralizados.
════════════════════════════════════════════════════════════ */
(function(){
  'use strict';
  const BUILD='ELTAUM_MARKET_ANALYTIC_ALIGNMENT_20260612_v164';
  function setup(){
    const wrap=document.querySelector('#sec-painel-body .indic-table-wrap');
    const table=wrap && wrap.querySelector('.indic-table-v2');
    if(!wrap||!table) return;
    document.documentElement.classList.add('market-analytic-alignment-v164');
    wrap.classList.add('market-analytic-alignment-v164');
    const meta=document.querySelector('meta[name="app-build"]');
    if(meta) meta.content=BUILD;

    // Segurança extra: se uma execução anterior deixou dois “Aguardando”,
    // conserva somente o chip de status.
    table.querySelectorAll('.status-cell-v164').forEach(cell=>{
      const primary=cell.querySelector('.analytic-status-primary-v163');
      if(primary){
        primary.style.display='none';
        primary.setAttribute('aria-hidden','true');
      }
    });
  }
  function init(){
    setup();
    [180,500,1000,1800,3200,5600].forEach(ms=>setTimeout(setup,ms));
    document.addEventListener('click',ev=>{
      if(ev.target.closest('[data-v150-mode="analytic"],.market-period-tabs .indic-tab,[data-analytic-currency],#sec-mercado-painel')){
        setTimeout(setup,100);
        setTimeout(setup,350);
      }
    },true);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
  window.__ELTAUM_MARKET_ANALYTIC_V164__={setup};
})();


/* ════════════════════════════════════════════════════════════
   ELTAUM_MOBILE_UX_FIXES_20260612_v165
   Status único, navegação estável dos rankings e ajustes mobile.
════════════════════════════════════════════════════════════ */
(function(){
  'use strict';
  const BUILD='ELTAUM_MOBILE_UX_FIXES_20260612_v165';
  const qs=(s,r=document)=>r.querySelector(s);
  const qsa=(s,r=document)=>Array.from(r.querySelectorAll(s));

  function setBuild(){
    document.documentElement.classList.add('mobile-ux-fixes-v165');
    const meta=qs('meta[name="app-build"]');
    if(meta) meta.content=BUILD;
  }

  function dedupeAnalyticStatuses(){
    const table=qs('#sec-painel-body .indic-table-v2');
    if(!table) return;
    qsa('td',table).forEach(cell=>{
      // Remove fisicamente o status principal legado; CSS !important antigo
      // não poderá trazê-lo de volta em desktop ou mobile.
      qsa('.analytic-status-primary-v163',cell).forEach(el=>el.remove());

      const chips=qsa('.analytic-status-chip-v163',cell);
      chips.slice(1).forEach(el=>el.remove());
      if(chips.length){
        cell.classList.add('status-cell-v164');
        qsa(':scope > .v2-bar-row',cell).forEach(row=>{
          if(!row.querySelector('.v2-val.neu,.v2-val.pos,.v2-val.neg,.us-market-stack')) row.remove();
        });
      }
    });
  }

  function cssAttr(value){
    return String(value||'').replace(/\\/g,'\\\\').replace(/"/g,'\\"');
  }

  function preserveRankingViewport(ev){
    const btn=ev.target.closest('[data-rank-period][data-rank-target]');
    if(!btn || !window.matchMedia('(max-width:900px)').matches) return;

    const target=btn.dataset.rankTarget||'';
    const period=btn.dataset.rankPeriod||'';
    const beforeTop=btn.getBoundingClientRect().top;
    const beforeScrollY=window.scrollY;
    const tabs=btn.closest('.rank-period-tabs,.ranking-exec-periods');
    const beforeScrollLeft=tabs ? tabs.scrollLeft : 0;

    // O renderer legado substitui o botão inteiro. Depois da troca,
    // recolocamos o novo botão exatamente na mesma posição visual.
    setTimeout(()=>{
      requestAnimationFrame(()=>{
        requestAnimationFrame(()=>{
          const selector=`[data-rank-target="${cssAttr(target)}"][data-rank-period="${cssAttr(period)}"]`;
          const next=qs(selector);
          if(!next){
            window.scrollTo({top:beforeScrollY,behavior:'auto'});
            return;
          }
          const nextTabs=next.closest('.rank-period-tabs,.ranking-exec-periods');
          if(nextTabs) nextTabs.scrollLeft=beforeScrollLeft;
          const afterTop=next.getBoundingClientRect().top;
          const delta=afterTop-beforeTop;
          if(Math.abs(delta)>1){
            window.scrollTo({top:Math.max(0,window.scrollY+delta),behavior:'auto'});
          }
          try{next.focus({preventScroll:true});}catch(_){/* sem ação */}
        });
      });
    },0);
  }

  function setup(){
    setBuild();
    dedupeAnalyticStatuses();
  }

  function init(){
    setup();
    [120,350,750,1400,2600,4800,8000].forEach(ms=>setTimeout(setup,ms));
    document.addEventListener('click',preserveRankingViewport,true);
    document.addEventListener('click',ev=>{
      if(ev.target.closest('[data-v150-mode="analytic"],.market-period-tabs .indic-tab,[data-analytic-currency],#sec-mercado-painel')){
        setTimeout(dedupeAnalyticStatuses,70);
        setTimeout(dedupeAnalyticStatuses,280);
      }
    },true);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
  window.__ELTAUM_MOBILE_UX_V165__={setup,dedupeAnalyticStatuses};
})();


/* ════════════════════════════════════════════════════
   v167 — TAXAS DE REFERÊNCIA E POUPANÇA EXECUTIVAS
════════════════════════════════════════════════════ */
function toggleCopomCalendarV167(force){
  const grid = document.getElementById('copomMeetings');
  const panel = document.getElementById('copomCalendarSecondaryV270');
  const btn = document.getElementById('copomCalendarToggleV167');
  const target = panel || grid;
  if(!grid || !target) return false;
  const open = typeof force === 'boolean' ? force : !target.classList.contains('is-open-v270');
  target.classList.toggle('is-open-v270', open);
  grid.classList.toggle('is-expanded-v167', open);
  if(btn){
    btn.textContent = open ? 'Ocultar calendário' : 'Ver calendário completo';
    btn.setAttribute('aria-expanded', String(open));
  }
  return false;
}
window.toggleCopomCalendarV167 = toggleCopomCalendarV167;

function togglePoupancaExecutiveV167(force){
  const panel = document.getElementById('poupDetailsPanelV167');
  const btn = document.getElementById('poupExpandBtn');
  if(!panel) return false;

  const mobile = window.matchMedia('(max-width:700px)').matches;
  const currentlyOpen = !panel.hasAttribute('hidden');
  const open = typeof force === 'boolean' ? force : !currentlyOpen;

  document.body.classList.toggle('poup-mobile-expanded', open);
  panel.toggleAttribute('hidden', !open);
  panel.classList.toggle('is-open-v167', open);

  const explain = document.getElementById('poupExplain');
  if(explain) explain.classList.toggle('open', open);
  if(btn){
    btn.textContent = mobile
      ? (open ? 'Ocultar regras' : 'Ver regras')
      : (open ? 'Ocultar regras' : 'Ver regras');
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-controls', 'poupDetailsPanelV167');
  }

  return false;
}

// Mantém compatibilidade com os botões e chamadas já existentes.
window.togglePoupanca = function(){ return togglePoupancaExecutiveV167(); };
window.togglePoupancaMobileDetails = function(force){ return togglePoupancaExecutiveV167(force); };

function initMarketReferenceExecutiveV167(){
  const panel = document.getElementById('poupDetailsPanelV167');
  if(panel){
    panel.setAttribute('hidden','');
    panel.classList.remove('is-open-v167');
  }
  document.body.classList.remove('poup-mobile-expanded');
  const btn = document.getElementById('poupExpandBtn');
  if(btn){
    const mobile = window.matchMedia('(max-width:700px)').matches;
    btn.textContent = 'Ver regras';
    btn.setAttribute('aria-expanded','false');
    btn.setAttribute('aria-controls', 'poupDetailsPanelV167');
  }
  toggleCopomCalendarV167(false);
}

if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', initMarketReferenceExecutiveV167, {once:true});
}else{
  initMarketReferenceExecutiveV167();
}


/* ════════════════════════════════════════════════════
   v169 — PAGINAÇÃO SEM MOVIMENTO NO DESKTOP
   - impede rolagem suave no desktop;
   - preserva a altura da área durante a troca;
   - mantém foco no botão ativo sem mover a viewport.
════════════════════════════════════════════════════ */
(function(){
  'use strict';
  const BUILD='ELTAUM_PAGINATION_NO_DESKTOP_SCROLL_20260612_v169';
  window.__ELTAUM_PAGINATION_NO_DESKTOP_SCROLL_V169__={build:BUILD,changePage:window.changeFundPageV168};

  function syncBuild(){
    const meta=document.querySelector('meta[name="app-build"]');
    if(meta) meta.content=BUILD;
  }

  // Sobrescreve a função que o patch v108 redefine anteriormente.
  window.scrollToFundResultsStart=function(options={}){
    const isMobile=window.matchMedia('(max-width: 820px)').matches;
    const target=isMobile
      ? (document.querySelector('#mobileFundCards .fund-card-mobile') || document.getElementById('mobileFundCards') || document.querySelector('#sec-fundos .table-wrap'))
      : (document.querySelector('#sec-fundos .table-wrap') || document.getElementById('sec-fundos'));
    if(!target) return;
    const offset=isMobile?96:20;
    const top=Math.max(0,target.getBoundingClientRect().top+window.scrollY-offset);
    window.scrollTo({top,behavior:options.behavior || (isMobile?'smooth':'auto')});
  };
  try{ scrollToFundResultsStart=window.scrollToFundResultsStart; }catch(_){ }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',syncBuild,{once:true});
  else syncBuild();
})();


/* ════════════════════════════════════════════════════
   PATCH v171 — Tabela do catálogo: colunas controladas
   - impede que novos campos técnicos do CSV apareçam na grade;
   - reaproveita os campos operacionais no painel de detalhes;
   - reinicia a rolagem horizontal após filtros, vista e paginação;
   - mantém a tabela mobile resumida (Fundo + Rentabilidade).
════════════════════════════════════════════════════ */
(function(){
  'use strict';

  const BUILD = 'ELTAUM_RATES_CLEAN_DASHBOARD_20260620_v399';
  const CORE_DESKTOP_ORDER = [
    'Fundo',
    'Data Inicio',
    'Cota (R$)',
    'Variacao Dia (%)',
    'Acum. Mes (%)',
    'Acum. Ano (%)',
    'Acum. 12M (%)',
    'PL (milhoes R$)'
  ];

  function hasValueV171(value){
    if(value === null || value === undefined) return false;
    const text = String(value).trim();
    return !!text && !/^(?:-|—|null|none|indispon[ií]vel)$/i.test(text);
  }

  function firstValueV171(row, names){
    for(const name of names){
      if(hasValueV171(row?.[name])) return row[name];
    }
    return '';
  }

  function copyAliasV171(row, canonical, aliases){
    if(hasValueV171(row?.[canonical])) return;
    const value = firstValueV171(row, aliases);
    if(hasValueV171(value)) row[canonical] = value;
  }

  function listValuesV171(value){
    if(Array.isArray(value)) return value.map(v=>String(v).trim()).filter(Boolean);
    if(!hasValueV171(value)) return [];
    const text = String(value).trim();
    try{
      const parsed = JSON.parse(text);
      if(Array.isArray(parsed)) return parsed.map(v=>String(v).trim()).filter(Boolean);
    }catch(_){ /* valor textual comum */ }
    return text.split(/\s*[|;,·]\s*/g).map(v=>v.trim()).filter(Boolean);
  }

  function formatDateV171(value){
    if(!hasValueV171(value)) return '';
    const text = String(value).trim();
    const iso = text.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if(iso) return `${iso[3]}/${iso[2]}/${iso[1]}`;
    return text;
  }

  function formatPctV171(value){
    if(!hasValueV171(value)) return '';
    const raw = String(value).trim().replace('%','').replace(/\s/g,'').replace(',','.');
    const number = Number(raw);
    if(!Number.isFinite(number)) return String(value).trim();
    return number.toLocaleString('pt-BR',{maximumFractionDigits:2}) + '%';
  }

  function normalizeOperationalColumnsV171(row){
    if(!row || typeof row !== 'object') return row;

    copyAliasV171(row,'Fundo',[
      'Nome do Fundo','Nome Fundo','Razão Social','Razao Social','RAZÃO SOCIAL','RAZAO SOCIAL','no_fundo'
    ]);
    copyAliasV171(row,'Data Inicio',[
      'Data Início','Data de Inicio','Data de Início','DATA INICIO','DATA INÍCIO'
    ]);
    copyAliasV171(row,'Variacao Dia (%)',['Variação Dia (%)','VARIACAO DIA (%)','VARIAÇÃO DIA (%)']);
    copyAliasV171(row,'Acum. Mes (%)',['Acum. Mês (%)','ACUM. MES (%)','ACUM. MÊS (%)']);
    copyAliasV171(row,'Acum. Ano (%)',['ACUM. ANO (%)']);
    copyAliasV171(row,'Acum. 12M (%)',['Acum. 12 Meses (%)','ACUM. 12M (%)']);
    copyAliasV171(row,'PL (milhoes R$)',['PL (milhões R$)','PL MILHOES R$','PL MILHÕES R$']);

    const segments = listValuesV171(firstValueV171(row,[
      'Segmentos','SEGMENTOS','Público Alvo','Publico Alvo','lista_publico_alvo'
    ]));
    if(segments.length && !hasValueV171(row['Público Alvo'])){
      row['Público Alvo'] = segments.join(' · ');
    }

    const endGrace = firstValueV171(row,[
      'Fim Carência','Fim Carencia','FIM CARÊNCIA','FIM CARENCIA','Data Fim Carência','Data Fim Carencia','dt_fim_carencia'
    ]);
    if(hasValueV171(endGrace) && !hasValueV171(row['Carência'])){
      row['Carência'] = `Até ${formatDateV171(endGrace)}`;
    }

    const advanceRaw = firstValueV171(row,[
      'Adiantamento','ADIANTAMENTO','Tipo Adiantamento','TIPO ADIANTAMENTO','Adiantamento Resgate'
    ]);
    const advancePct = firstValueV171(row,[
      'Percentual Adiantamento (%)','PERCENTUAL ADIANTAMENTO (%)','Percentual de Adiantamento (%)','pc_adiant_resgate'
    ]);
    if(!hasValueV171(row['Adiantamento de Resgate']) && (hasValueV171(advanceRaw) || hasValueV171(advancePct))){
      const rawText = String(advanceRaw || '').trim();
      const norm = rawText.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toUpperCase();
      const parts = [];
      if(/^(TRUE|SIM|1)$/.test(norm)) parts.push('Sim');
      else if(/^(FALSE|NAO|0)$/.test(norm)) parts.push('Não disponível');
      else if(hasValueV171(rawText) && !/^\d+(?:[.,]\d+)?$/.test(rawText)) parts.push(rawText);
      else if(hasValueV171(rawText)) parts.push(formatPctV171(rawText));
      const pctText = formatPctV171(advancePct);
      if(pctText && !parts.includes(pctText)) parts.push(pctText);
      row['Adiantamento de Resgate'] = parts.join(' · ') || 'Não informado';
    }

    return row;
  }

  // Os dados novos continuam disponíveis para busca e detalhes, mas não viram
  // automaticamente colunas da grade principal.
  try{
    const originalMergeV171 = mesclarMetadadosFundo;
    mesclarMetadadosFundo = function(row){
      return normalizeOperationalColumnsV171(originalMergeV171(row));
    };
  }catch(error){
    console.warn('[v171] Não foi possível normalizar os metadados:', error);
  }

  function isMobileTableV171(){
    try{
      return window.matchMedia('(max-width: 820px)').matches;
    }catch(_){
      return window.innerWidth <= 820;
    }
  }

  function desktopHeadersV171(){
    const available = new Set(Array.isArray(displayHeaders) ? displayHeaders : []);
    const core = CORE_DESKTOP_ORDER.filter(header=>available.has(header));
    const output = [];

    core.forEach(header=>{
      output.push(header);
      if(header === 'Fundo') output.push('Conv / Pag');
    });

    const meetingView = typeof vistaAtual === 'undefined' || vistaAtual === 'reuniao';
    const filteredHeaders = meetingView
      ? output.filter(header=>header !== 'Data Inicio' && header !== 'Cota (R$)' && header !== 'PL (milhoes R$)')
      : output;

    filteredHeaders.push('Documentos');
    return filteredHeaders;
  }

  function mobileHeadersV171(){
    const available = new Set(Array.isArray(displayHeaders) ? displayHeaders : []);
    return available.has('Fundo') ? ['Fundo','Resumo Mobile'] : [];
  }

  try{
    getVisibleHeaders = function(){
      return isMobileTableV171() ? mobileHeadersV171() : desktopHeadersV171();
    };
  }catch(error){
    console.warn('[v171] Não foi possível controlar as colunas da tabela:', error);
  }

  function decorateHeadersV171(){
    const row = document.querySelector('#tableHead tr');
    if(!row) return;
    const headers = getVisibleHeaders();
    [...row.children].forEach((th,index)=>{
      if(index < 2){
        th.dataset.column = index === 0 ? 'expandir' : 'comparar';
        return;
      }
      const column = headers[index - 2];
      if(column) th.dataset.column = column;
    });
  }

  try{
    const originalBuildHeaderV171 = buildHeader;
    buildHeader = function(){
      const result = originalBuildHeaderV171.apply(this,arguments);
      decorateHeadersV171();
      resetTableXScrollV171();
      return result;
    };
  }catch(error){
    console.warn('[v171] Não foi possível identificar os cabeçalhos:', error);
  }

  let resetFrameV171 = 0;
  function resetTableXScrollV171(){
    const wrap = document.querySelector('#sec-fundos .table-wrap');
    if(!wrap) return;
    cancelAnimationFrame(resetFrameV171);
    resetFrameV171 = requestAnimationFrame(()=>{
      wrap.scrollLeft = 0;
      wrap.classList.remove('is-scrolled-x-v171');
    });
  }

  function bindScrollStateV171(){
    const wrap = document.querySelector('#sec-fundos .table-wrap');
    if(!wrap || wrap.dataset.v171ScrollBound === '1') return;
    wrap.dataset.v171ScrollBound = '1';
    wrap.addEventListener('scroll',()=>{
      wrap.classList.toggle('is-scrolled-x-v171',wrap.scrollLeft > 8);
    },{passive:true});
  }

  function resetAfterResultV171(result){
    if(result && typeof result.finally === 'function'){
      return result.finally(resetTableXScrollV171);
    }
    resetTableXScrollV171();
    return result;
  }

  try{
    const originalApplyFilterV171 = applyFilter;
    applyFilter = function(){
      return resetAfterResultV171(originalApplyFilterV171.apply(this,arguments));
    };
    window.applyFilter = applyFilter;
  }catch(error){
    console.warn('[v171] Não foi possível ajustar applyFilter:',error);
  }

  try{
    const originalSetVistaV171 = setVista;
    setVista = function(){
      return resetAfterResultV171(originalSetVistaV171.apply(this,arguments));
    };
    window.setVista = setVista;
  }catch(error){
    console.warn('[v171] Não foi possível ajustar setVista:',error);
  }

  try{
    const originalChangePageV171 = changeFundPageV168;
    changeFundPageV168 = function(){
      return resetAfterResultV171(originalChangePageV171.apply(this,arguments));
    };
    window.changeFundPageV168 = changeFundPageV168;
  }catch(error){
    console.warn('[v171] Não foi possível ajustar changeFundPageV168:',error);
  }

  try{
    const originalLoadDataV171 = carregarDados;
    carregarDados = function(){
      return resetAfterResultV171(originalLoadDataV171.apply(this,arguments));
    };
    window.carregarDados = carregarDados;
  }catch(error){
    console.warn('[v171] Não foi possível ajustar carregarDados:',error);
  }

  function setupV171(){
    document.documentElement.classList.add('catalog-table-sanitized-v171');
    const meta = document.querySelector('meta[name="app-build"]');
    if(meta) meta.content = BUILD;
    bindScrollStateV171();
    decorateHeadersV171();
    resetTableXScrollV171();

    const perPageSelect = document.getElementById('perPage');
    if(perPageSelect && perPageSelect.dataset.v171ResetBound !== '1'){
      perPageSelect.dataset.v171ResetBound = '1';
      perPageSelect.addEventListener('change',resetTableXScrollV171);
    }
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded',setupV171,{once:true});
  else setupV171();

  window.__ELTAUM_CATALOG_TABLE_V171__ = {
    build:BUILD,
    normalizeRow:normalizeOperationalColumnsV171,
    visibleHeaders:()=>getVisibleHeaders(),
    resetHorizontalScroll:resetTableXScrollV171
  };
})();


/* PATCH v172 — build final do painel de mercado */
(function(){
  const apply=()=>{
    document.documentElement.classList.add('market-ibov-perspective-v172','dolar-current-dedup-v172');
    const meta=document.querySelector('meta[name="app-build"]');
    if(meta) meta.content='ELTAUM_MARKET_IBOV_PERSPECTIVE_20260613_v172';
  };
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',apply,{once:true});
  else apply();
})();

/* ELTAUM_MARKET_NUMBER_LEGIBILITY_20260613_v176
   Build visual; sem alteração de lógica. */

/* ELTAUM_RANKING_MOBILE_STABLE_20260613_v177
   Mantém a mesma posição visual do bloco Top 10 quando Mês/Ano/12M
   substitui o HTML da seção de rankings no mobile. */
(function(){
  'use strict';

  const BUILD='ELTAUM_RANKING_MOBILE_STABLE_20260613_v177';
  let snapshot=null;
  let clearTimer=0;
  let observer=null;

  function isMobile(){
    try{return window.matchMedia('(max-width:700px)').matches;}
    catch(_){return window.innerWidth<=700;}
  }

  function rankingButton(target){
    return target && target.closest
      ? target.closest('#rankingsSection .ranking-exec-periods .rank-period-tab[data-rank-target="topFundos"]')
      : null;
  }

  function capture(btn){
    if(!btn || !isMobile()) return;
    const board=btn.closest('.ranking-exec-board');
    if(!board) return;
    const tabs=btn.closest('.ranking-exec-periods');
    snapshot={
      period:btn.dataset.rankPeriod||'',
      boardTop:board.getBoundingClientRect().top,
      scrollY:window.scrollY,
      tabsLeft:tabs?tabs.scrollLeft:0,
      capturedAt:performance.now()
    };
    document.documentElement.classList.add('ranking-period-switch-v177');
    window.clearTimeout(clearTimer);
    clearTimer=window.setTimeout(()=>{
      document.documentElement.classList.remove('ranking-period-switch-v177');
      snapshot=null;
    },520);
  }

  function restore(){
    if(!snapshot || !isMobile()) return;
    const board=document.querySelector('#rankingsSection .ranking-exec-board');
    if(!board) return;

    const currentTop=board.getBoundingClientRect().top;
    const delta=currentTop-snapshot.boardTop;
    if(Math.abs(delta)>0.5){
      window.scrollTo({top:Math.max(0,window.scrollY+delta),behavior:'auto'});
    }

    const selected=document.querySelector(
      `#rankingsSection .ranking-exec-periods .rank-period-tab[data-rank-target="topFundos"][data-rank-period="${CSS.escape(snapshot.period)}"]`
    );
    if(selected){
      const tabs=selected.closest('.ranking-exec-periods');
      if(tabs) tabs.scrollLeft=snapshot.tabsLeft;
      try{selected.focus({preventScroll:true});}catch(_){/* navegador antigo */}
    }
  }

  function scheduleRestore(){
    [0,24,70,150,280].forEach(delay=>{
      window.setTimeout(()=>{
        requestAnimationFrame(()=>requestAnimationFrame(restore));
      },delay);
    });
  }

  function onPointerDown(ev){
    const btn=rankingButton(ev.target);
    if(btn) capture(btn);
  }

  function onClick(ev){
    const btn=rankingButton(ev.target);
    if(!btn || !isMobile()) return;
    if(!snapshot) capture(btn);
    scheduleRestore();
  }

  function onKeyDown(ev){
    if(ev.key!=='Enter' && ev.key!==' ') return;
    const btn=rankingButton(ev.target);
    if(btn) capture(btn);
  }

  function setupObserver(){
    const grid=document.getElementById('rankingGrid');
    if(!grid || observer) return;
    observer=new MutationObserver(()=>{
      if(snapshot) scheduleRestore();
    });
    observer.observe(grid,{childList:true,subtree:false});
  }

  function setup(){
    document.documentElement.classList.add('rankings-mobile-stable-v177');
    const meta=document.querySelector('meta[name="app-build"]');
    if(meta) meta.content=BUILD;
    setupObserver();
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',setup,{once:true});
  else setup();

  document.addEventListener('pointerdown',onPointerDown,true);
  document.addEventListener('click',onClick,true);
  document.addEventListener('keydown',onKeyDown,true);
  window.addEventListener('resize',()=>{if(!isMobile()) snapshot=null;},{passive:true});
})();

/* ELTAUM_MOBILE_COPOM_CAROUSEL_RANK_UNIVERSE_20260613_v178
   Sincroniza o rótulo Universo após qualquer rerender do ranking e
   atualiza a orientação do carrossel do COPOM no mobile. */
(function(){
  'use strict';

  const BUILD='ELTAUM_MOBILE_COPOM_CAROUSEL_RANK_UNIVERSE_20260613_v178';
  let rankingObserver=null;

  function qs(sel,root=document){return root.querySelector(sel);}
  function qsa(sel,root=document){return Array.from(root.querySelectorAll(sel));}

  function currentUniverseLabel(){
    let value='';
    try{
      if(typeof activeRankFilter!=='undefined') value=String(activeRankFilter||'');
    }catch(_){/* escopo legado indisponível */}

    const select=qs('#rankingClassSelectV136');
    if(!value && select) value=String(select.value||'');

    if(select){
      const option=Array.from(select.options||[]).find(opt=>String(opt.value)===value);
      if(option && option.textContent.trim()) return option.textContent.trim();
    }

    const activeChip=qs('#rankingFilterRow .ranking-filter-chip.active,[data-rank-filter].active');
    if(activeChip && activeChip.textContent.trim()) return activeChip.textContent.trim();

    const map={
      todos:'Todos',
      'sem-fmp':'Sem FMP',
      'renda-fixa-simples':'RF Simples',
      'renda-fixa':'Renda Fixa',
      'renda-fixa-referenciado':'RF Ref.',
      'renda-fixa-curto-prazo':'RF Curto',
      multimercado:'Multimercado',
      cambial:'Cambial',
      acoes:'Ações',
      'fundo-de-indice':'Índice',
      fmp:'FMP'
    };
    return map[value]||'Todos';
  }

  function syncUniversePill(){
    const label=currentUniverseLabel();
    qsa('#rankingsSection .ranking-universe-pill').forEach(pill=>{
      let strong=qs('strong',pill);
      if(!strong){
        strong=document.createElement('strong');
        pill.appendChild(strong);
      }
      strong.textContent=label;
      pill.title='Universo: '+label;
      pill.setAttribute('aria-label','Universo: '+label);
    });
  }

  function syncCopomDragLabel(){
    const label=qs('#sec-mercado .market-drag-label-v118[data-drag-label-v118="copom"] span');
    if(label) label.textContent='Decisões e próximas reuniões';
  }

  function syncAll(){
    document.documentElement.classList.add('mobile-copom-carousel-v178','ranking-universe-mobile-v178');
    const meta=qs('meta[name="app-build"]');
    if(meta) meta.content=BUILD;
    syncUniversePill();
    syncCopomDragLabel();
  }

  function observeRanking(){
    const grid=qs('#rankingGrid');
    if(!grid || rankingObserver) return;
    rankingObserver=new MutationObserver(()=>{
      requestAnimationFrame(syncUniversePill);
    });
    rankingObserver.observe(grid,{childList:true,subtree:true});
  }

  function setup(){
    syncAll();
    observeRanking();
    [120,350,800,1600,3200].forEach(ms=>setTimeout(syncAll,ms));
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',setup,{once:true});
  else setup();

  document.addEventListener('change',ev=>{
    if(ev.target && ev.target.matches('#rankingClassSelectV136')){
      setTimeout(syncUniversePill,0);
      setTimeout(syncUniversePill,80);
    }
  },true);

  document.addEventListener('click',ev=>{
    if(ev.target.closest('[data-rank-filter],#copomCalendarToggleV167')){
      setTimeout(syncAll,0);
      setTimeout(syncAll,100);
    }
  },true);

  window.addEventListener('resize',()=>setTimeout(syncAll,120),{passive:true});
  window.addEventListener('orientationchange',()=>setTimeout(syncAll,220),{passive:true});

  window.__ELTAUM_V178__={sync:syncAll,syncUniverse:syncUniversePill};
})();

/* ELTAUM_MOBILE_MARKET_LAYOUT_20260613_v180
   Melhora o arraste horizontal do CDI em mouse, touch e emuladores responsivos. */
(function(){
  'use strict';

  function enablePointerDrag(strip){
    if(!strip || strip.dataset.pointerDragV180==='1') return;
    if(strip.id === 'cdiMonthStrip' && (document.documentElement.classList.contains('rates-scroll-fix-v263') || document.documentElement.classList.contains('rates-cdi-real-v264'))){
      strip.dataset.pointerDragV180 = 'disabled-v263';
      return;
    }
    strip.dataset.pointerDragV180='1';

    let active=false;
    let startX=0;
    let startScroll=0;
    let moved=false;

    strip.addEventListener('pointerdown',function(event){
      if(window.innerWidth>700 || event.button>0) return;
      active=true;
      moved=false;
      startX=event.clientX;
      startScroll=strip.scrollLeft;
      strip.classList.add('is-pointer-dragging-v180');
      try{ strip.setPointerCapture(event.pointerId); }catch(_error){}
    });

    strip.addEventListener('pointermove',function(event){
      if(!active) return;
      const delta=event.clientX-startX;
      if(Math.abs(delta)>4) moved=true;
      strip.scrollLeft=startScroll-delta;
    });

    function finish(event){
      if(!active) return;
      active=false;
      strip.classList.remove('is-pointer-dragging-v180');
      try{ strip.releasePointerCapture(event.pointerId); }catch(_error){}
    }

    strip.addEventListener('pointerup',finish);
    strip.addEventListener('pointercancel',finish);
    strip.addEventListener('lostpointercapture',function(){
      active=false;
      strip.classList.remove('is-pointer-dragging-v180');
    });

    strip.addEventListener('click',function(event){
      if(!moved) return;
      event.preventDefault();
      event.stopPropagation();
      moved=false;
    },true);
  }

  function setup(){
    enablePointerDrag(document.getElementById('cdiMonthStrip'));

    const target=document.getElementById('cdiYearHistory');
    if(target && !target.dataset.observeDragV180){
      target.dataset.observeDragV180='1';
      new MutationObserver(function(){
        enablePointerDrag(document.getElementById('cdiMonthStrip'));
      }).observe(target,{childList:true,subtree:true});
    }
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',setup,{once:true});
  else setup();

  window.addEventListener('resize',setup,{passive:true});
  window.__ELTAUM_V180__={setup:setup};
})();


/* ELTAUM_EVOLUTION_DYNAMIC_TITLES_20260613_v184
   Segunda barreira: mantém o título sincronizado mesmo se um patch legado
   alterar o botão ativo antes de chamar a função principal. */
(function(){
  'use strict';
  const BUILD = 'ELTAUM_RATES_CLEAN_DASHBOARD_20260620_v399';

  function atualizarPorBotao(btn){
    if(!btn || typeof window.atualizarTituloPeriodoGrafico !== 'function') return;
    window.atualizarTituloPeriodoGrafico(btn.dataset.chart, Number(btn.dataset.range));
  }

  function capturar(ev){
    const alvo = ev.target && ev.target.closest
      ? ev.target.closest('.chart-tab[data-chart][data-range]')
      : null;
    if(alvo) atualizarPorBotao(alvo);
  }

  function inicializar(){
    document.querySelectorAll('.chart-tab[data-chart][data-range].active').forEach(atualizarPorBotao);
  }

  // v363: pointerup removido para não reagir a gesto de scroll sobre abas.
  document.addEventListener('click', capturar, true);
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', inicializar, {once:true});
  }else{
    inicializar();
  }
  console.info('[' + BUILD + '] títulos dinâmicos instalados.');
})();


/* ELTAUM_MOBILE_PTAX_MONTH_CAROUSEL_20260613_v187
   Arraste horizontal por toque, mouse e emuladores responsivos. */
(function(){
  'use strict';

  function isMobile(){
    return window.matchMedia && window.matchMedia('(max-width:820px)').matches;
  }

  function enablePointerDrag(strip){
    if(!strip || strip.dataset.pointerDragV187==='1') return;
    strip.dataset.pointerDragV187='1';

    let active=false;
    let moved=false;
    let startX=0;
    let startScroll=0;

    strip.addEventListener('pointerdown',function(event){
      if(!isMobile() || event.button>0) return;
      active=true;
      moved=false;
      startX=event.clientX;
      startScroll=strip.scrollLeft;
      strip.classList.add('is-pointer-dragging-v187');
      try{ strip.setPointerCapture(event.pointerId); }catch(_error){}
    });

    strip.addEventListener('pointermove',function(event){
      if(!active) return;
      const delta=event.clientX-startX;
      if(Math.abs(delta)>4) moved=true;
      strip.scrollLeft=startScroll-delta;
    });

    function finish(event){
      if(!active) return;
      active=false;
      strip.classList.remove('is-pointer-dragging-v187');
      try{ strip.releasePointerCapture(event.pointerId); }catch(_error){}
      setTimeout(function(){
        try{ window.__ELTAUM_MOBILE_PTAX_SCROLL_HINT_V99__?.sync?.(); }catch(_error){}
      },20);
    }

    strip.addEventListener('pointerup',finish);
    strip.addEventListener('pointercancel',finish);
    strip.addEventListener('lostpointercapture',function(){
      active=false;
      strip.classList.remove('is-pointer-dragging-v187');
    });

    strip.addEventListener('click',function(event){
      if(!moved) return;
      event.preventDefault();
      event.stopPropagation();
      moved=false;
    },true);
  }

  function setup(){
    const strip=document.getElementById('dolarMonths');
    if(!strip) return;
    enablePointerDrag(strip);
    requestAnimationFrame(function(){
      try{ window.__ELTAUM_MOBILE_PTAX_SCROLL_HINT_V99__?.sync?.(); }catch(_error){}
    });
  }

  function observe(){
    const strip=document.getElementById('dolarMonths');
    if(!strip || strip.dataset.observeCarouselV187==='1') return;
    strip.dataset.observeCarouselV187='1';
    new MutationObserver(function(){
      setup();
      setTimeout(setup,40);
    }).observe(strip,{childList:true,subtree:false});
  }

  function init(){
    setup();
    observe();
    [120,500,1200,2600].forEach(function(ms){setTimeout(function(){setup();observe();},ms);});
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();

  window.addEventListener('resize',function(){setTimeout(setup,100);},{passive:true});
  window.addEventListener('orientationchange',function(){setTimeout(setup,180);},{passive:true});

  window.__ELTAUM_MOBILE_PTAX_MONTH_CAROUSEL_V187__={setup:setup};
})();


/* ELTAUM_MOBILE_EVOLUTION_ORDER_SEMANTICS_20260613_v190
   Resumo móvel único e sincronizado com a aba ativa dos gráficos. */


/* ELTAUM_MOBILE_EVOLUTION_ORDER_SEMANTICS_20260613_v190
   Abas móveis agrupam os dois indicadores de IPCA antes da Selic.
   Textos da Selic explicam vigência e período de forma mais direta. */

/* ════════════════════════════════════════════════════════════
   ELTAUM_MARKET_PERIOD_CARDS_20260614_v196
   Espelha a tabela analítica em três cards temáticos, mantendo
   a tabela original no DOM como fonte compatível dos dados.
════════════════════════════════════════════════════════════ */
(function(){
  'use strict';
  const BUILD='ELTAUM_MARKET_MOBILE_DEDUP_LIVE_VALUES_20260618_v234';
  let currency='brl';
  let observer=null;
  let timer=0;

  const qs=(sel,root=document)=>root.querySelector(sel);
  const qsa=(sel,root=document)=>Array.from(root.querySelectorAll(sel));
  const clean=value=>String(value??'').replace(/\s+/g,' ').trim();
  const esc=value=>String(value??'').replace(/[&<>"']/g,ch=>({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[ch]));
  const text=id=>clean(document.getElementById(id)?.textContent||'—')||'—';

  function tone(value){
    const v=clean(value);
    if(!v || v==='—' || v==='-') return 'dash';
    if(/^\+/.test(v)) return 'pos';
    if(/^[−-]/.test(v)) return 'neg';
    return 'neu';
  }

  function period(id,fallback){
    const value=text(id);
    return value==='—'?fallback:value;
  }

  /* v234 — os cards temáticos passam a consultar o JSON normalizado diretamente.
     A tabela original continua como fallback, evitando corrida de renderização e
     valores “—” quando o card é montado antes de o DOM legado terminar de atualizar. */
  function finiteV234(value){
    if(value===null || value===undefined || value==='') return null;
    let normalized=value;
    if(typeof value==='string'){
      normalized=value.trim().replace(/%/g,'').replace(/\s+/g,'');
      // Strings vindas do DOM podem usar padrão brasileiro (1.234,56),
      // enquanto o JSON usa ponto decimal (2.06). Só remove pontos quando
      // há vírgula decimal explícita.
      if(normalized.includes(',')) normalized=normalized.replace(/\./g,'').replace(',','.');
    }
    const number=Number(normalized);
    return Number.isFinite(number) ? number : null;
  }

  function firstFiniteV234(...values){
    for(const value of values){
      const number=finiteV234(value);
      if(number!==null) return number;
    }
    return null;
  }

  function pctV234(value,fallback='—'){
    const number=finiteV234(value);
    if(number===null) return fallback;
    return `${number>0?'+':''}${number.toFixed(2).replace('.',',')}%`;
  }

  function brlV234(value,fallback='—'){
    const number=finiteV234(value);
    if(number===null) return fallback;
    return `R$ ${number.toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2})}`;
  }

  function ptsV234(value,fallback='—'){
    const number=finiteV234(value);
    if(number===null) return fallback;
    return `${number.toLocaleString('pt-BR',{maximumFractionDigits:0})} pts`;
  }

  function currentVariationV234(item,card){
    const explicit=firstFiniteV234(
      item?.variacao_mes_atual,
      item?.variacao_mensal,
      item?.variacao_mes,
      card?.variacao_mes_atual,
      card?.variacao_mensal,
      card?.variacao_mes
    );
    if(explicit!==null) return explicit;

    const current=firstFiniteV234(item?.fechamento_atual,card?.atual);
    const previous=firstFiniteV234(item?.fechamento_mes_anterior,card?.anterior);
    if(current!==null && previous!==null && previous!==0){
      return ((current/previous)-1)*100;
    }
    return null;
  }

  function marketDataV234(key,cardKey=key){
    const data=(typeof _dadosMercado!=='undefined' && _dadosMercado) || window.__mercadoAtualV230 || {};
    const item=data?.indices_mercado?.[key] || {};
    const card=data?.cards?.[cardKey] || {};
    return {item,card};
  }

  function currentStatusV234(item,fallback=''){
    if(item?.status_mes_atual) return /parcial/i.test(item.status_mes_atual)?'Parcial':fallback;
    if(item?.tem_mes_atual===true) return 'Parcial';
    const match=String(item?.data_atual||'').match(/^(\d{4})-(\d{2})/);
    if(match){
      const today=new Date();
      const currentKey=`${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}`;
      if(`${match[1]}-${match[2]}`===currentKey) return 'Parcial';
    }
    return fallback;
  }

  function periodValueV234(item,card,months){
    return firstFiniteV234(item?.[`acum_${months}m`],card?.[`acum_${months}m`]);
  }

  function pairFromMarketV234(item,field,fallbackId){
    const fallback=usPair(fallbackId);
    return {
      usd:pctV234(item?.[field],fallback.usd),
      brl:pctV234(item?.[`${field}_brl`],fallback.brl)
    };
  }

  function statusFor(rowId){
    const row=document.getElementById(rowId);
    if(!row) return '';
    const cell=qs('.td-cur',row);
    if(!cell) return '';
    const explicit=clean(
      qs('.analytic-status-chip-v163',cell)?.textContent ||
      qs('.period-status',cell)?.textContent ||
      qs('.badge-await',cell)?.textContent ||
      qs('.status-only-v163',cell)?.textContent || ''
    );
    if(/aguard/i.test(explicit)) return 'Aguardando';
    if(/parcial/i.test(explicit)) return 'Parcial';
    return '';
  }

  function alertBadge(){
    const el=document.getElementById('ipca-alert-badge');
    if(!el || getComputedStyle(el).display==='none') return '';
    const value=clean(el.textContent);
    return value?`<span class="market-period-badge-v196">${esc(value)}</span>`:'';
  }

  function metric(label,value,note='',options={}){
    const status=options.status||'';
    const aguardando=/aguard/i.test(status);
    const parcial=/parcial/i.test(status);
    const semValor=!value || value==='—' || value==='-';
    const main=aguardando
      ? `<strong class="market-period-status-v196">${esc(status)}</strong>`
      : `<strong class="${tone(value)}">${esc(value||'—')}</strong>`;
    let detalhe=parcial && !aguardando ? (note || status) : note;
    if(semValor && !aguardando && !detalhe) detalhe='Dado não disponível';
    return `<div class="market-period-metric-v196"><span>${esc(label)}</span>${main}<small>${esc(detalhe||'')}</small></div>`;
  }

  function nameCell(icon,name,sub,level='',badge=''){
    return `<div class="market-period-name-v196">
      <div class="market-period-icon-v196">${icon}</div>
      <div class="market-period-name-copy-v196">
        <div class="market-period-name-line-v196"><strong>${esc(name)}</strong>${badge}</div>
        <small>${esc(sub)}</small>
        ${level&&level!=='—'?`<div class="market-current-level-v196"><small>Atual</small>${esc(level)}</div>`:''}
      </div>
    </div>`;
  }

  function selectedPeriodMonths(){
    const fromDataset = Number.parseInt(document.documentElement.dataset.indicPeriod || '', 10);
    const fromButton = Number.parseInt(qs('.market-period-tabs .indic-tab.active[data-months]')?.dataset.months || '', 10);
    const fromState = typeof activePeriodTab !== 'undefined' ? Number(activePeriodTab) : NaN;
    return [fromDataset, fromButton, fromState].find(value => [12, 24, 36].includes(value)) || 12;
  }

  function selectedPeriodLabel(){
    return `${selectedPeriodMonths()} meses`;
  }

  function gridHead(first='Indicador'){
    const closed=period('th-mes-ant-sub','Último fechado');
    const current=period('th-mes-cur-sub','Mês atual');
    const accumulated=selectedPeriodLabel();
    return `<div class="market-period-grid-head-v196">
      <span>${esc(first)}</span><span>Fechado<br>${esc(closed)}</span><span>Atual<br>${esc(current)}</span><span>No ano</span><span>${esc(accumulated)}</span>
    </div>`;
  }

  function row(content){
    return `<div class="market-period-row-v196">${content}</div>`;
  }

  function cardHeader(title,sub,source,extra=''){
    return `<div class="market-period-card-head-v196">
      <div class="market-period-card-title-v196"><span>${esc(title)}</span><small>${esc(sub)}</small></div>
      ${extra||`<span class="market-period-source-v196">${esc(source)}</span>`}
    </div>`;
  }

  function usPair(id){
    const host=document.getElementById(id);
    if(!host) return {usd:'—',brl:'—'};
    const usd=clean(qs('.us-market-line.usd .us-market-value',host)?.textContent||'');
    const brl=clean(qs('.us-market-line.brl .us-market-value',host)?.textContent||'');
    if(usd||brl) return {usd:usd||'—',brl:brl||'—'};
    const raw=clean(host.textContent);
    const out={usd:'—',brl:'—'};
    const re=/(USD|BRL)\s*([+−-]?\d+(?:[.,]\d+)?%|—)/ig;
    let match;
    while((match=re.exec(raw))) out[match[1].toLowerCase()]=match[2];
    if(out.usd==='—'&&out.brl==='—'){
      const values=raw.match(/[+−-]?\d+(?:[.,]\d+)?%/g)||[];
      if(values[0]) out.usd=values[0];
      if(values[1]) out.brl=values[1];
      else if(values[0]) out.brl=values[0];
    }
    return out;
  }

  function usMetric(label,pair,note=''){
    if(currency==='both'){
      return `<div class="market-period-metric-v196"><span>${esc(label)}</span>
        <div class="market-period-double-v196">
          <em class="${tone(pair.usd)}">USD ${esc(pair.usd)}</em>
          <em class="${tone(pair.brl)}">BRL ${esc(pair.brl)}</em>
        </div><small>${esc(note)}</small></div>`;
    }
    const value=pair[currency]||'—';
    return metric(label,value,currency.toUpperCase()+(note?` · ${note}`:''));
  }

  function buildTaxes(){
    const cdiStatus=statusFor('row-cdi');
    const ipcaStatus=statusFor('row-ipca');
    const cdiInfo=typeof obterCdiAtualV232==='function' ? obterCdiAtualV232() : {};
    const cdiContexto=contextoCdiAtualV233(cdiInfo);
    const cdiAtualNota=cdiInfo?.valor!==null && cdiInfo?.valor!==undefined
      ? `${cdiContexto.title} · ${cdiContexto.detail}`
      : (cdiStatus||'');
    return `<article class="market-period-card-v196 taxas">
      ${cardHeader('Taxas e inflação','Retornos consolidados por período','BCB 4391 / 433')}
      ${gridHead()}
      ${row(
        nameCell('💰','CDI','Certificado de Depósito Interbancário')+
        metric('Fechado',text('cdi-mes-ant'))+
        metric('Atual',text('cdi-mes-cur'),cdiAtualNota,{status:cdiStatus})+
        metric('No ano',text('cdi-ano'))+
        metric(selectedPeriodLabel(),text('cdi-acum-v2'))
      )}
      ${row(
        nameCell('🎯','IPCA','Inflação ao consumidor · meta 3,0%','',alertBadge())+
        metric('Fechado',text('ipca-mes-ant'))+
        metric('Atual','—','',{status:ipcaStatus||'Aguardando'})+
        metric('No ano',text('ipca-ano-v2'))+
        metric(selectedPeriodLabel(),text('ipca-acum-v2'))
      )}
      <div class="market-period-card-foot-v196">CDI e IPCA: séries públicas do Banco Central. O mês atual pode permanecer aguardando o fechamento oficial.</div>
    </article>`;
  }

  function buildBrasil(){
    const months=selectedPeriodMonths();
    const dolarData=marketDataV234('dolar','dolar');
    const ibovData=marketDataV234('ibovespa','ibovespa');

    const dolarStatus=currentStatusV234(dolarData.item,statusFor('row-dolar'));
    const ibovStatus=currentStatusV234(ibovData.item,statusFor('row-ibov'));

    const dolarAtual=firstFiniteV234(dolarData.item?.fechamento_atual,dolarData.card?.atual);
    const dolarFechado=firstFiniteV234(dolarData.item?.fechamento_mes_anterior,dolarData.card?.anterior);
    const dolarVarAtual=currentVariationV234(dolarData.item,dolarData.card);
    const dolarAno=firstFiniteV234(dolarData.item?.acum_ano,dolarData.card?.acum_ano);
    const dolarAcum=periodValueV234(dolarData.item,dolarData.card,months);

    const ibovAtual=firstFiniteV234(ibovData.item?.fechamento_atual,ibovData.card?.atual);
    const ibovFechado=firstFiniteV234(ibovData.item?.fechamento_mes_anterior,ibovData.card?.anterior);
    const ibovVarFechado=firstFiniteV234(ibovData.item?.variacao_mes_fechado,ibovData.card?.variacao_mes_fechado);
    const ibovVarAtual=currentVariationV234(ibovData.item,ibovData.card);
    const ibovAno=firstFiniteV234(ibovData.item?.acum_ano,ibovData.card?.acum_ano);
    const ibovAcum=periodValueV234(ibovData.item,ibovData.card,months);

    return `<article class="market-period-card-v196 brasil">
      ${cardHeader('Brasil — câmbio e bolsa','Nível atual separado da variação percentual','PTAX BCB / B3')}
      ${gridHead()}
      ${row(
        nameCell('💵','Dólar BRL/USD','Cotação PTAX e desempenho em reais',brlV234(dolarAtual,text('dolar-cur-cot')))+
        metric('Fechado',brlV234(dolarFechado,text('dolar-ant-cot')),'cotação de fechamento')+
        metric('Atual',pctV234(dolarVarAtual,text('dolar-cur-var')),dolarStatus)+
        metric('No ano',pctV234(dolarAno,text('dolar-ano-v2')))+
        metric(selectedPeriodLabel(),pctV234(dolarAcum,text('dolar-acum-v2')))
      )}
      ${row(
        nameCell('📈','Ibovespa','B3 · pontos e variação percentual',ptsV234(ibovAtual,text('ibov-cur-pts')))+
        metric('Fechado',pctV234(ibovVarFechado,text('ibov-ant-var')),ptsV234(ibovFechado,text('ibov-ant-pts')))+
        metric('Atual',pctV234(ibovVarAtual,text('ibov-cur-var')),ibovStatus)+
        metric('No ano',pctV234(ibovAno,text('ibov-ano-v2')))+
        metric(selectedPeriodLabel(),pctV234(ibovAcum,text('ibov-acum-v2')))
      )}
      <div class="market-period-card-foot-v196">Os cards leem diretamente o JSON atualizado; a tabela original permanece apenas como fonte de compatibilidade.</div>
    </article>`;
  }

  function usToggle(){
    return `<div class="market-period-us-toggle-v196" role="group" aria-label="Moeda das bolsas dos Estados Unidos">
      ${['brl','usd','both'].map(mode=>`<button type="button" data-v196-currency="${mode}" class="${currency===mode?'active':''}" aria-pressed="${currency===mode?'true':'false'}">${mode==='both'?'Ambos':mode.toUpperCase()}</button>`).join('')}
    </div>`;
  }

  function buildUs(){
    const months=selectedPeriodMonths();
    const makeRow=(key,prefix,icon,name,sub)=>{
      const data=marketDataV234(key,key);
      const item=data.item||{};
      return {
        icon,name,sub,
        points:ptsV234(item?.fechamento_atual,text(`${prefix}-cur-pts`)),
        closed:pairFromMarketV234(item,'variacao_mes_fechado',`${prefix}-ant-var`),
        current:pairFromMarketV234(item,'variacao_mes_atual',`${prefix}-cur-var`),
        year:pairFromMarketV234(item,'acum_ano',`${prefix}-ano-var`),
        accum:pairFromMarketV234(item,`acum_${months}m`,`${prefix}-acum-var`),
        status:currentStatusV234(item,statusFor(`row-${prefix}`))
      };
    };
    const rows=[
      makeRow('sp500','sp','🌎','S&P 500','Índice amplo dos Estados Unidos'),
      makeRow('dow_jones','dow','🏛️','Dow Jones','Empresas blue chips'),
      makeRow('nasdaq','nasdaq','💻','Nasdaq','Empresas de tecnologia')
    ];
    return `<article class="market-period-card-v196 usa">
      ${cardHeader('Bolsas dos Estados Unidos','Rentabilidade em reais, dólares ou nas duas moedas','',usToggle())}
      ${gridHead('Índice')}
      ${rows.map(item=>row(
        nameCell(item.icon,item.name,item.sub,item.points)+
        usMetric('Fechado',item.closed)+
        usMetric('Atual',item.current,item.status)+
        usMetric('No ano',item.year)+
        usMetric(selectedPeriodLabel(),item.accum)
      )).join('')}
      <div class="market-period-card-foot-v196">BRL incorpora a variação cambial; USD representa o desempenho do índice em sua moeda de origem.</div>
    </article>`;
  }

  function render(){
    const shell=qs('#sec-painel-body .market-period-shell-v196') || qs('#sec-painel-body .indic-table-wrap');
    const source=shell&&qs('.indic-table-v2',shell);
    const host=document.getElementById('marketPeriodCardsV196');
    if(!shell||!source||!host) return;

    const wrapMode=['brl','usd','both'].find(mode=>shell.classList.contains(`us-mode-${mode}`));
    if(wrapMode) currency=wrapMode;

    host.innerHTML=buildTaxes()+buildBrasil()+buildUs();
    shell.classList.add('market-cards-ready-v196');
    document.documentElement.classList.add('market-period-cards-v196');
    const meta=qs('meta[name="app-build"]');
    if(meta) meta.content=BUILD;
  }

  function schedule(){
    clearTimeout(timer);
    timer=setTimeout(render,60);
  }

  function bind(){
    const host=document.getElementById('marketPeriodCardsV196');
    if(host&&host.dataset.v196Bound!=='1'){
      host.dataset.v196Bound='1';
      host.addEventListener('click',event=>{
        const button=event.target.closest('[data-v196-currency]');
        if(!button) return;
        currency=button.dataset.v196Currency||'brl';
        const legacy=qs(`[data-analytic-currency="${currency}"]`);
        if(legacy && legacy!==button) legacy.click();
        render();
      });
    }
    const source=qs('#sec-painel-body .indic-table-v2');
    if(source&&!observer){
      observer=new MutationObserver(schedule);
      observer.observe(source,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['class','style']});
    }
  }

  function setup(){bind();render();}
  function init(){
    setup();
    [150,400,900,1600,3000,5200,8500].forEach(ms=>setTimeout(setup,ms));
    document.addEventListener('click',event=>{
      if(event.target.closest('[data-v150-mode="analytic"],.market-period-tabs .indic-tab,[data-analytic-currency],#sec-mercado-painel,.section-toggle-btn')){
        setTimeout(setup,80);
        setTimeout(setup,320);
      }
    },true);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
  window.__ELTAUM_MARKET_PERIOD_CARDS_V196__={build:BUILD,render,get currency(){return currency;}};
  window.__ELTAUM_MARKET_LIVE_VALUES_V234__={build:BUILD,render};
})();


/* ELTAUM_RISK_PROFILE_FILTERS_20260614_v198 */
(function(){
  'use strict';
  const BUILD='ELTAUM_RISK_PROFILE_FILTERS_20260614_v198';
  function bindCatalogRiskSelect(id){
    const select=document.getElementById(id);
    if(!select||select.dataset.v198Bound==='1') return;
    select.dataset.v198Bound='1';
    select.addEventListener('change',()=>{
      try{activeRisco=select.value||'';}catch(e){}
      syncRiskProfileControlsV198();
      try{applyFilter();}catch(e){console.error('v198 catalog risk filter',e);}
    });
  }
  function setup(){
    document.documentElement.classList.add('risk-profile-filters-v198');
    const meta=document.querySelector('meta[name="app-build"]');
    if(meta) meta.content=BUILD;
    bindCatalogRiskSelect('catalogRiskSelectV198');
    bindCatalogRiskSelect('mobileRiskSelectV198');
    syncRiskProfileControlsV198();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',setup,{once:true});
  else setup();
  window.__ELTAUM_RISK_FILTERS_V198__={
    build:BUILD,
    normalize:normalizarPerfilRiscoV198,
    matches:perfilRiscoCorrespondeV198,
    sync:syncRiskProfileControlsV198
  };
})();


/* ════════════════════════════════════════════════════
   PATCH v204 — Toggle "Ocultar fundos sem dados" estável
   Causa: o patch v127 recriava o checkbox depois do listener original,
   fazendo o controle mudar visualmente sem atualizar hideSemDados/applyFilter.
════════════════════════════════════════════════════ */
(function(){
  'use strict';

  const BUILD = 'ELTAUM_RATES_CLEAN_DASHBOARD_20260620_v399';

  function bindToggleSemDadosV204(){
    const input = document.getElementById('toggleSemDados');
    if(!input) return false;

    document.documentElement.classList.add('toggle-sem-dados-stable-v204');
    const meta = document.querySelector('meta[name="app-build"]');
    if(meta) meta.content = BUILD;

    if(input.type !== 'checkbox') input.type = 'checkbox';

    const wrap = input.closest('.toggle-wrap');
    if(wrap){
      wrap.classList.add('toggle-sem-dados-v204');
      wrap.setAttribute('role','group');
    }

    const syncVisual = () => {
      const checked = !!input.checked;
      if(wrap) wrap.classList.toggle('is-on', checked);
      const label = input.closest('label');
      if(label){
        label.setAttribute('role','switch');
        label.setAttribute('aria-checked', checked ? 'true' : 'false');
      }
    };

    if(input.dataset.v204Bound !== '1'){
      input.dataset.v204Bound = '1';
      input.addEventListener('change', function(){
        const checked = !!input.checked;
        try{ hideSemDados = checked; }catch(e){}
        try{ window.hideSemDados = checked; }catch(e){}
        try{ window.ocultarSemDados = checked; }catch(e){}
        try{ window.hideNoData = checked; }catch(e){}
        syncVisual();
        try{
          if(typeof applyFilter === 'function') applyFilter();
          else if(typeof window.applyFilter === 'function') window.applyFilter();
        }catch(err){
          console.warn('[v204 toggleSemDados] falha ao aplicar filtro', err);
        }
      });
    }

    // Torna toda a cápsula clicável, sem duplo acionamento no switch/texto.
    if(wrap && wrap.dataset.v204ClickBound !== '1'){
      wrap.dataset.v204ClickBound = '1';
      wrap.addEventListener('click', function(ev){
        if(ev.target === input || ev.target.closest('label')) return;
        ev.preventDefault();
        input.click();
      });
    }

    // O estado real da variável do catálogo prevalece quando disponível.
    try{ input.checked = !!hideSemDados; }catch(e){}
    syncVisual();
    return true;
  }

  function scheduleV204(){
    [0,180,550,1300,2800].forEach(ms => setTimeout(bindToggleSemDadosV204, ms));
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', scheduleV204, {once:true});
  }else{
    scheduleV204();
  }

  window.__ELTAUM_TOGGLE_SEM_DADOS_V204__ = {
    sync: bindToggleSemDadosV204,
    state(){
      const input=document.getElementById('toggleSemDados');
      return {checked:!!input?.checked,bound:input?.dataset.v204Bound||'',build:BUILD};
    }
  };
})();


/* ============================================================
   ELTAUM_CATALOG_DESKTOP_PRO_20260618_v217
   Ajustes finais de rotulagem, acessibilidade e estado inicial.
============================================================ */
(function(){
  'use strict';
  const BUILD='ELTAUM_CATALOG_DESKTOP_PRO_20260618_v217';
  function applyV217(){
    const meta=document.querySelector('meta[name="app-build"]');
    if(meta) meta.content=BUILD;
    document.documentElement.classList.add('catalog-desktop-professional-v217');
    const per=document.getElementById('perPage');
    if(per && String(per.value)!=='10' && typeof window.perPage==='undefined') per.value='10';
    const search=document.getElementById('searchInput');
    if(search) search.setAttribute('aria-describedby','filterResultSummary');
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',applyV217,{once:true});
  else applyV217();
})();

/* ============================================================
   ELTAUM_CATALOG_DESKTOP_RESULT_CHIP_20260618_v221
   Espelha no selo desktop a contagem mantida pelo resumo mobile.
============================================================ */
(function(){
  'use strict';
  const BUILD='ELTAUM_CATALOG_DESKTOP_RESULT_CHIP_20260618_v221';

  function syncDesktopResultChipV221(){
    const source=document.getElementById('filterResultSummary');
    const target=document.getElementById('desktopFilterResultSummary');
    if(!target) return;

    const text=(source?.textContent || '—').trim() || '—';
    if(target.textContent!==text) target.textContent=text;
    target.title=text;

    const search=document.getElementById('searchInput');
    if(search){
      const desktop=window.matchMedia && window.matchMedia('(min-width:1181px)').matches;
      search.setAttribute('aria-describedby',desktop?'desktopFilterResultSummary':'filterResultSummary');
    }

    const meta=document.querySelector('meta[name="app-build"]');
    if(meta) meta.content=BUILD;
  }

  function bindDesktopResultChipV221(){
    const source=document.getElementById('filterResultSummary');
    if(source && source.dataset.v221Observed!=='1'){
      source.dataset.v221Observed='1';
      try{
        const observer=new MutationObserver(syncDesktopResultChipV221);
        observer.observe(source,{childList:true,characterData:true,subtree:true,attributes:true,attributeFilter:['title']});
      }catch(e){}
    }

    syncDesktopResultChipV221();
    requestAnimationFrame(syncDesktopResultChipV221);
    setTimeout(syncDesktopResultChipV221,120);
    setTimeout(syncDesktopResultChipV221,500);
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',bindDesktopResultChipV221,{once:true});
  }else{
    bindDesktopResultChipV221();
  }

  ['input','change','click'].forEach(function(evt){
    document.addEventListener(evt,function(){setTimeout(syncDesktopResultChipV221,40);},true);
  });
  window.addEventListener('resize',function(){setTimeout(syncDesktopResultChipV221,60);},{passive:true});

  window.__ELTAUM_DESKTOP_RESULT_CHIP_V221__={sync:syncDesktopResultChipV221};
})();


/* ELTAUM_SELIC_DATE_RECONCILIATION_20260618_v223 */
window.__ELTAUM_SELIC_DATE_V223__ = 'ELTAUM_SELIC_DATE_RECONCILIATION_20260618_v223';


/* ════════════════════════════════════════════════════
   PATCH v231 — LEGIBILIDADE NUMÉRICA
   - mantém classes semânticas após atualizações dinâmicas;
   - usa zero diferenciado e algarismos tabulares;
   - reserva verde/vermelho para variações e mantém cotações neutras.
════════════════════════════════════════════════════ */
(function numericLegibilityV231(){
  'use strict';
  const MINI_IDS=['closedMiniCdi','closedMiniIpca','closedMiniDolar','closedMiniIbov'];
  function apply(){
    document.documentElement.classList.add('numeric-legibility-v231');
    MINI_IDS.forEach(function(id){
      const el=document.getElementById(id);
      if(!el) return;
      el.classList.add('finance-number-v231');
      const txt=(el.textContent||'').trim();
      if(/^R\$\s*/i.test(txt)) el.classList.add('market-quote-v231');
      else el.classList.remove('market-quote-v231');
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',apply,{once:true});
  else apply();
  window.setTimeout(apply,350);
})();


/* ============================================================
   ELTAUM_SAVINGS_MOBILE_REORG_20260618_v242
   Poupança mobile: textos mais curtos e ações mais equilibradas.
============================================================ */
(function(){
  function ajustarPoupancaMobileV242(){
    const title = document.getElementById('poupCurrentScenarioTitleV214');
    if(title) title.textContent = 'Regra vigente';

    const btn = document.getElementById('poupExpandBtn');
    if(btn){
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.innerHTML = expanded ? 'Ocultar regras <span aria-hidden="true">▴</span>' : 'Ver regras <span aria-hidden="true">▾</span>';
    }

    const source = document.querySelector('#sec-mercado .savings-actions-v207 .market-reference-source-v167');
    if(source && !source.dataset.v242Short){
      source.dataset.v242Short = '1';
      source.innerHTML = 'Calculadora BCB <span aria-hidden="true">↗</span>';
    }
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', ajustarPoupancaMobileV242, {once:true});
  }else{
    ajustarPoupancaMobileV242();
  }
  document.addEventListener('click', function(event){
    if(event.target && event.target.closest && event.target.closest('#poupExpandBtn')){
      setTimeout(ajustarPoupancaMobileV242, 40);
      setTimeout(ajustarPoupancaMobileV242, 220);
    }
  }, true);
  window.addEventListener('load', ajustarPoupancaMobileV242);
})();


/* ELTAUM_CDI_TITLE_SHORT_V263 */
(function(){
  function applyCdiTitleShortV263(){
    const title = document.getElementById('cdiYearHistoryTitle');
    if(title){
      title.textContent = title.textContent.replace(/\s+—\s+mais recente primeiro/i,'').trim();
      if(!title.textContent) title.textContent = 'CDI mensal 2026';
    }
  }
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', applyCdiTitleShortV263, {once:true});
  }else{
    applyCdiTitleShortV263();
  }
  setTimeout(applyCdiTitleShortV263, 300);
  setTimeout(applyCdiTitleShortV263, 1200);
})();


/* ELTAUM_CDI_REAL_STARTUP_V264 */
(function(){
  function fixCdiRealV264(){
    const title = document.getElementById('cdiYearHistoryTitle');
    if(title) title.textContent = title.textContent.replace(/\s+—\s+mais recente primeiro/i,'').trim() || 'CDI mensal 2026';
    const strip = document.getElementById('cdiMonthStrip');
    if(strip){
      strip.classList.add('cdi-month-list-v264');
      strip.setAttribute('data-cdi-layout-v264','list');
      strip.style.overflow = 'visible';
      strip.style.touchAction = 'pan-y';
    }
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fixCdiRealV264, {once:true});
  else fixCdiRealV264();
  setTimeout(fixCdiRealV264, 250);
  setTimeout(fixCdiRealV264, 1000);
})();


/* ELTAUM_CDI_MONTHS_TOGGLE_V268 */
function toggleCdiMonthsV268(force){
  const box = document.getElementById('cdiYearHistory');
  const strip = document.getElementById('cdiMonthStrip');
  const btn = document.getElementById('cdiMonthsToggleV268');
  if(!box || !strip) return false;
  const open = typeof force === 'boolean' ? force : !box.classList.contains('is-expanded-v268');
  box.classList.toggle('is-expanded-v268', open);
  strip.classList.toggle('is-expanded-v268', open);
  if(btn){
    btn.textContent = open ? 'Ocultar' : 'Ver meses';
    btn.setAttribute('aria-expanded', String(open));
  }
  return false;
}

(function(){
  function initCdiToggleV268(){
    const box = document.getElementById('cdiYearHistory');
    const strip = document.getElementById('cdiMonthStrip');
    const btn = document.getElementById('cdiMonthsToggleV268');
    if(box && strip){
      box.classList.remove('is-expanded-v268');
      strip.classList.remove('is-expanded-v268');
    }
    if(btn){
      btn.textContent = 'Ver meses';
      btn.setAttribute('aria-expanded','false');
    }
  }
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', initCdiToggleV268, {once:true});
  }else{
    initCdiToggleV268();
  }
  setTimeout(initCdiToggleV268, 500);
})();


/* ELTAUM_CDI_ANALYTIC_LINK_V275 */
function openCdiAnalyticTableV274(){
  // Este botão leva o usuário para a Tabela Analítica do painel de indicadores
  // e alterna o modo de visualização para "Tabela analítica".
  const analyticBtn = document.querySelector('#marketDashboardV150 [data-v150-mode="analytic"], [data-v150-mode="analytic"]');
  const panel = document.getElementById('marketDashboardV150')
    || document.getElementById('sec-mercado-painel')
    || document.querySelector('#sec-painel-body .indic-table-wrap')
    || document.getElementById('sec-mercado');

  if(analyticBtn && typeof analyticBtn.click === 'function'){
    analyticBtn.click();
  }else{
    // Fallback: se o painel executivo ainda não foi montado, mostra a tabela nativa.
    const tableWrap = document.querySelector('#sec-painel-body .indic-table-wrap, .indic-table-wrap');
    if(tableWrap){
      tableWrap.hidden = false;
      tableWrap.style.display = '';
    }
  }

  setTimeout(() => {
    const target = document.getElementById('marketDashboardV150')
      || document.getElementById('sec-mercado-painel')
      || document.querySelector('#sec-painel-body .indic-table-wrap')
      || panel;
    if(target && typeof target.scrollIntoView === 'function'){
      target.scrollIntoView({behavior:'smooth', block:'start'});
    }
  }, 80);

  return false;
}


/* ════════════════════════════════════════════════════
   v303 — normalizador final de títulos
   Motivo: regras antigas de algumas seções ainda tinham !important e
   venciam o CSS da v302. Aqui a padronização é aplicada com
   element.style.setProperty(..., 'important'), que vence o legado.
════════════════════════════════════════════════════ */
(function normalizeSectionTitlesV303(){
  const TARGETS = [
    'Resumo executivo',
    'Fundos disponíveis',
    'Rankings dos fundos',
    'Indicadores de mercado',
    'Dólar PTAX',
    'Boletim Focus',
    'Inflação e juros',
    'Comparador de fundos'
  ];

  function txt(el){
    return String(el?.innerText || '').replace(/\s+/g, ' ').trim();
  }

  function isTarget(h2){
    const t = txt(h2).replace(/^[^\p{L}\p{N}]+/u, '').trim().toLowerCase();
    return TARGETS.some(x => t === x.toLowerCase());
  }

  function setImportant(el, prop, val){
    if(el) el.style.setProperty(prop, val, 'important');
  }

  function apply(){
    document.documentElement.classList.add('title-normalized-v303');

    document.querySelectorAll('h2.section-title-v302, h2.page-section-title-v302, h2.compar-title').forEach(h2 => {
      if(!isTarget(h2)) return;
      if(
        h2.classList.contains('ranking-title-hero-v305') ||
        h2.classList.contains('section-hero-premium-v306') ||
        h2.classList.contains('section-hero-soft-v306') ||
        h2.classList.contains('summary-hero-v306') ||
        h2.classList.contains('market-hero-v306')
      ) return;

      h2.classList.add('section-title-v303-final');

      const isNarrow = window.matchMedia('(max-width: 390px)').matches;
      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      const titleSize = isNarrow ? '1.16rem' : (isMobile ? '1.22rem' : '1.34rem');
      const iconSize = isNarrow ? '26px' : (isMobile ? '28px' : '30px');
      const iconFont = isNarrow ? '.82rem' : (isMobile ? '.88rem' : '.95rem');

      setImportant(h2, 'display', 'flex');
      setImportant(h2, 'align-items', 'center');
      setImportant(h2, 'justify-content', 'flex-start');
      setImportant(h2, 'gap', isNarrow ? '8px' : '9px');
      setImportant(h2, 'margin', '0 0 12px');
      setImportant(h2, 'padding', '0');
      setImportant(h2, 'width', '100%');
      setImportant(h2, 'color', '#f8fafc');
      setImportant(h2, 'font-family', 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif');
      setImportant(h2, 'font-size', titleSize);
      setImportant(h2, 'line-height', '1.12');
      setImportant(h2, 'font-weight', '800');
      setImportant(h2, 'letter-spacing', '-0.032em');
      setImportant(h2, 'text-transform', 'none');
      setImportant(h2, 'text-shadow', 'none');
      setImportant(h2, 'background', 'transparent');
      setImportant(h2, 'border', '0');

      const icon = h2.querySelector('.section-title-icon-v302, .section-title-icon-v300');
      if(icon){
        icon.classList.add('section-title-icon-v303-final');
        setImportant(icon, 'width', iconSize);
        setImportant(icon, 'height', iconSize);
        setImportant(icon, 'min-width', iconSize);
        setImportant(icon, 'max-width', iconSize);
        setImportant(icon, 'flex', `0 0 ${iconSize}`);
        setImportant(icon, 'border-radius', isNarrow ? '8px' : '9px');
        setImportant(icon, 'display', 'inline-flex');
        setImportant(icon, 'align-items', 'center');
        setImportant(icon, 'justify-content', 'center');
        setImportant(icon, 'background', 'linear-gradient(135deg, rgba(246,200,97,.18), rgba(76,104,255,.13))');
        setImportant(icon, 'border', '1px solid rgba(246,200,97,.22)');
        setImportant(icon, 'box-shadow', 'inset 0 1px 0 rgba(255,255,255,.08), 0 6px 14px rgba(0,0,0,.18)');
        setImportant(icon, 'color', 'inherit');
        setImportant(icon, 'font-size', iconFont);
        setImportant(icon, 'font-weight', '400');
        setImportant(icon, 'line-height', '1');
        setImportant(icon, 'letter-spacing', '0');
        setImportant(icon, 'text-shadow', 'none');
      }

      const label = h2.querySelector('.section-title-text-v302, .section-title-text-v300, span:last-child');
      if(label){
        label.classList.add('section-title-text-v303-final');
        setImportant(label, 'display', 'inline-block');
        setImportant(label, 'min-width', '0');
        setImportant(label, 'color', '#f8fafc');
        setImportant(label, 'font-size', 'inherit');
        setImportant(label, 'line-height', 'inherit');
        setImportant(label, 'font-weight', 'inherit');
        setImportant(label, 'letter-spacing', 'inherit');
        setImportant(label, 'text-transform', 'none');
        setImportant(label, 'text-shadow', 'none');
      }
    });
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply);
  else apply();

  window.addEventListener('resize', () => requestAnimationFrame(apply), { passive:true });
  setTimeout(apply, 250);
  setTimeout(apply, 900);
})();


/* ════════════════════════════════════════════════════
   v308 — remove GFB completo no mobile
   O CSS oculta o container inteiro #gfb. Este complemento garante
   também aria-hidden/inert no mobile, sem afetar desktop.
════════════════════════════════════════════════════ */
(function removeGlobalFundBarMobileV308(){
  function apply(){
    const gfb = document.getElementById('gfb');
    if(!gfb) return;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if(isMobile){
      gfb.setAttribute('aria-hidden','true');
      try{ gfb.inert = true; }catch(_){}
      gfb.style.setProperty('display','none','important');
      gfb.style.setProperty('height','0','important');
      gfb.style.setProperty('min-height','0','important');
      gfb.style.setProperty('max-height','0','important');
      gfb.style.setProperty('margin','0','important');
      gfb.style.setProperty('padding','0','important');
      gfb.style.setProperty('overflow','hidden','important');
    }else{
      gfb.removeAttribute('aria-hidden');
      try{ gfb.inert = false; }catch(_){}
      gfb.style.removeProperty('display');
      gfb.style.removeProperty('height');
      gfb.style.removeProperty('min-height');
      gfb.style.removeProperty('max-height');
      gfb.style.removeProperty('margin');
      gfb.style.removeProperty('padding');
      gfb.style.removeProperty('overflow');
    }
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply);
  else apply();
  window.addEventListener('resize', () => requestAnimationFrame(apply), { passive:true });
  setTimeout(apply, 250);
  setTimeout(apply, 1000);
})();


/* ════════════════════════════════════════════════════
   v309 — ranking hero spacing/fix
   Remove estilos inline herdados do normalizador v303 no título do Ranking
   e reaplica centralização/medalhão compacto apenas no mobile.
════════════════════════════════════════════════════ */
(function fixRankingHeroV309(){
  function clearImportantInline(el, props){
    if(!el) return;
    props.forEach(p => el.style.removeProperty(p));
  }

  function setImportant(el, prop, val){
    if(el) el.style.setProperty(prop, val, 'important');
  }

  function apply(){
    const h2 = document.querySelector('h2.ranking-title-hero-v305, h2.section-hero-premium-v306');
    if(!h2) return;

    const icon = h2.querySelector('.section-title-icon-v302, .section-title-icon-v300');
    const text = h2.querySelector('.section-title-text-v302, .section-title-text-v300, span:last-child');
    const group = h2.closest('.ranking-title-group');
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const isNarrow = window.matchMedia('(max-width: 390px)').matches;

    if(!isMobile){
      [h2, icon, text, group].forEach(el => el && el.removeAttribute('style'));
      return;
    }

    h2.classList.add('ranking-title-v309-fixed');
    if(group) group.classList.add('ranking-title-group-v309-fixed');

    const iconSize = isNarrow ? '48px' : '54px';
    const iconFont = isNarrow ? '1.42rem' : '1.58rem';
    const titleSize = isNarrow ? '1.28rem' : '1.38rem';

    setImportant(group, 'display', 'flex');
    setImportant(group, 'flex-direction', 'column');
    setImportant(group, 'align-items', 'center');
    setImportant(group, 'text-align', 'center');
    setImportant(group, 'width', '100%');
    setImportant(group, 'margin', '6px 0 14px');
    setImportant(group, 'padding', '0');

    setImportant(h2, 'position', 'relative');
    setImportant(h2, 'display', 'flex');
    setImportant(h2, 'flex-direction', 'column');
    setImportant(h2, 'align-items', 'center');
    setImportant(h2, 'justify-content', 'center');
    setImportant(h2, 'gap', isNarrow ? '8px' : '9px');
    setImportant(h2, 'width', '100%');
    setImportant(h2, 'margin', '0');
    setImportant(h2, 'padding', '0');
    setImportant(h2, 'text-align', 'center');
    setImportant(h2, 'color', '#f8fafc');
    setImportant(h2, 'font-size', titleSize);
    setImportant(h2, 'line-height', '1.08');
    setImportant(h2, 'font-weight', '850');
    setImportant(h2, 'letter-spacing', '-0.042em');
    setImportant(h2, 'text-shadow', 'none');
    setImportant(h2, 'background', 'transparent');
    setImportant(h2, 'border', '0');

    setImportant(icon, 'width', iconSize);
    setImportant(icon, 'height', iconSize);
    setImportant(icon, 'min-width', iconSize);
    setImportant(icon, 'max-width', iconSize);
    setImportant(icon, 'flex', `0 0 ${iconSize}`);
    setImportant(icon, 'border-radius', '999px');
    setImportant(icon, 'display', 'inline-flex');
    setImportant(icon, 'align-items', 'center');
    setImportant(icon, 'justify-content', 'center');
    setImportant(icon, 'background', 'radial-gradient(circle at 50% 40%, rgba(255,223,135,.22), rgba(246,200,97,.08) 42%, rgba(8,10,20,.92) 72%), linear-gradient(145deg, rgba(246,200,97,.20), rgba(20,24,42,.86))');
    setImportant(icon, 'border', '1px solid rgba(246,200,97,.52)');
    setImportant(icon, 'box-shadow', '0 0 0 1px rgba(246,200,97,.08), 0 0 26px rgba(246,200,97,.22), 0 10px 22px rgba(0,0,0,.34), inset 0 1px 0 rgba(255,255,255,.12)');
    setImportant(icon, 'color', '#ffd36f');
    setImportant(icon, 'font-size', iconFont);
    setImportant(icon, 'font-weight', '400');
    setImportant(icon, 'line-height', '1');
    setImportant(icon, 'letter-spacing', '0');
    setImportant(icon, 'text-shadow', '0 0 14px rgba(255,211,111,.34)');

    setImportant(text, 'display', 'block');
    setImportant(text, 'text-align', 'center');
    setImportant(text, 'color', '#f8fafc');
    setImportant(text, 'font-size', 'inherit');
    setImportant(text, 'font-weight', 'inherit');
    setImportant(text, 'line-height', 'inherit');
    setImportant(text, 'letter-spacing', 'inherit');
    setImportant(text, 'text-shadow', '0 8px 22px rgba(0,0,0,.34)');
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply);
  else apply();

  window.addEventListener('resize', () => requestAnimationFrame(apply), { passive:true });
  setTimeout(apply, 250);
  setTimeout(apply, 900);
})();


/* ════════════════════════════════════════════════════
   v310 — resumo sem ícone duplicado
   O bloco .mobile-kpi-head já tinha um ícone legado .mobile-kpi-emoji.
   Como o H2 ganhou o ícone padronizado, o legado precisa sair.
════════════════════════════════════════════════════ */
(function dedupeSummaryIconV310(){
  function apply(){
    const legacy = document.querySelector('#sec-kpi .mobile-kpi-head > .mobile-kpi-emoji, .mobile-kpi-head > .mobile-kpi-emoji');
    if(!legacy) return;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if(isMobile){
      legacy.setAttribute('aria-hidden','true');
      legacy.style.setProperty('display','none','important');
      legacy.style.setProperty('visibility','hidden','important');
      legacy.style.setProperty('width','0','important');
      legacy.style.setProperty('height','0','important');
      legacy.style.setProperty('margin','0','important');
      legacy.style.setProperty('padding','0','important');
      legacy.style.setProperty('overflow','hidden','important');
    }else{
      legacy.removeAttribute('aria-hidden');
      legacy.style.removeProperty('display');
      legacy.style.removeProperty('visibility');
      legacy.style.removeProperty('width');
      legacy.style.removeProperty('height');
      legacy.style.removeProperty('margin');
      legacy.style.removeProperty('padding');
      legacy.style.removeProperty('overflow');
    }
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply);
  else apply();
  window.addEventListener('resize', () => requestAnimationFrame(apply), { passive:true });
  setTimeout(apply, 250);
  setTimeout(apply, 900);
})();


/* ════════════════════════════════════════════════════
   v312 — limpeza de gap antes do ranking no mobile
   Remove ações ocultas/fantasmas e força o bloco Ranking a ficar
   compacto logo após a paginação/fundos.
════════════════════════════════════════════════════ */
(function rankingGapCleanupV312(){
  function setImportant(el, prop, val){
    if(el) el.style.setProperty(prop, val, 'important');
  }

  function apply(){
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const section = document.getElementById('rankingsSection');
    if(!section) return;

    const head = section.querySelector('.ranking-head');
    const actions = section.querySelector('.ranking-actions');
    const titleGroup = section.querySelector('.ranking-title-group');
    const h2 = section.querySelector('h2.ranking-title-hero-v305, h2.section-hero-premium-v306');
    const toolbar = section.querySelector('.ranking-toolbar, .ranking-toolbar-v136');

    if(!isMobile){
      [section, head, actions, titleGroup, h2, toolbar].forEach(el => el && el.removeAttribute('style'));
      if(actions){
        actions.removeAttribute('aria-hidden');
        try{ actions.inert = false; }catch(_){}
      }
      return;
    }

    section.classList.add('ranking-gap-clean-v312-active');

    setImportant(section, 'padding-top', '6px');
    setImportant(section, 'margin-top', '10px');
    setImportant(section, 'scroll-margin-top', '82px');

    if(head){
      setImportant(head, 'display', 'block');
      setImportant(head, 'margin', '0');
      setImportant(head, 'padding', '0');
      setImportant(head, 'min-height', '0');
      setImportant(head, 'height', 'auto');
    }

    if(actions){
      actions.setAttribute('aria-hidden','true');
      try{ actions.inert = true; }catch(_){}
      setImportant(actions, 'display', 'none');
      setImportant(actions, 'height', '0');
      setImportant(actions, 'min-height', '0');
      setImportant(actions, 'max-height', '0');
      setImportant(actions, 'margin', '0');
      setImportant(actions, 'padding', '0');
      setImportant(actions, 'overflow', 'hidden');
    }

    if(titleGroup){
      setImportant(titleGroup, 'display', 'flex');
      setImportant(titleGroup, 'flex-direction', 'column');
      setImportant(titleGroup, 'align-items', 'center');
      setImportant(titleGroup, 'text-align', 'center');
      setImportant(titleGroup, 'margin', '2px 0 10px');
      setImportant(titleGroup, 'padding', '0');
      setImportant(titleGroup, 'min-height', '0');
    }

    if(h2){
      setImportant(h2, 'margin', '0');
      setImportant(h2, 'padding', '0');
      setImportant(h2, 'gap', '7px');
    }

    if(toolbar){
      setImportant(toolbar, 'margin-top', '0');
    }
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply);
  else apply();

  window.addEventListener('resize', () => requestAnimationFrame(apply), { passive:true });
  setTimeout(apply, 250);
  setTimeout(apply, 900);
})();


// RANKING_GAP_RAYS_V313


/* ════════════════════════════════════════════════════
   v314 — aproximação extrema paginação → ranking
   Complemento JS para remover altura/margens fantasmas que estilos
   legados ou inline possam manter entre .pagination-row e .ranking-head.
════════════════════════════════════════════════════ */
(function paginationRankingTightV314(){
  function setImportant(el, prop, val){
    if(el) el.style.setProperty(prop, val, 'important');
  }

  function apply(){
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const ranking = document.getElementById('rankingsSection');
    if(!ranking) return;

    const rankingHead = ranking.querySelector('.ranking-head');
    const titleGroup = ranking.querySelector('.ranking-title-group');
    const h2 = ranking.querySelector('h2.ranking-title-hero-v305, h2.section-hero-premium-v306');
    const toolbar = ranking.querySelector('.ranking-toolbar, .ranking-toolbar-v136');
    const actions = ranking.querySelector('.ranking-actions');

    const paginationCandidates = [
      ...document.querySelectorAll('.pagination-row, .pagination-controls, .pagination, .catalog-pagination, .fund-pagination-wrap, #pageBtns')
    ];

    if(!isMobile){
      [ranking, rankingHead, titleGroup, h2, toolbar, actions, ...paginationCandidates].forEach(el => {
        if(!el) return;
        el.style.removeProperty('margin-top');
        el.style.removeProperty('margin-bottom');
        el.style.removeProperty('padding-top');
        el.style.removeProperty('padding-bottom');
        el.style.removeProperty('min-height');
        el.style.removeProperty('height');
      });
      if(actions){
        actions.removeAttribute('aria-hidden');
        try{ actions.inert = false; }catch(_){}
      }
      return;
    }

    paginationCandidates.forEach(el => {
      setImportant(el, 'margin-bottom', '0');
      setImportant(el, 'padding-bottom', '0');
    });

    const funds = document.getElementById('sec-fundos');
    if(funds){
      setImportant(funds, 'margin-bottom', '0');
      setImportant(funds, 'padding-bottom', '0');
    }

    setImportant(ranking, 'margin-top', '0');
    setImportant(ranking, 'padding-top', '0');
    setImportant(ranking, 'scroll-margin-top', '82px');

    if(rankingHead){
      setImportant(rankingHead, 'margin-top', '0');
      setImportant(rankingHead, 'margin-bottom', '0');
      setImportant(rankingHead, 'padding-top', '0');
      setImportant(rankingHead, 'padding-bottom', '0');
      setImportant(rankingHead, 'min-height', '0');
    }

    if(actions){
      actions.setAttribute('aria-hidden', 'true');
      try{ actions.inert = true; }catch(_){}
      setImportant(actions, 'display', 'none');
      setImportant(actions, 'height', '0');
      setImportant(actions, 'min-height', '0');
      setImportant(actions, 'max-height', '0');
      setImportant(actions, 'margin', '0');
      setImportant(actions, 'padding', '0');
      setImportant(actions, 'overflow', 'hidden');
    }

    if(titleGroup){
      setImportant(titleGroup, 'margin-top', '0');
      setImportant(titleGroup, 'margin-bottom', '8px');
      setImportant(titleGroup, 'padding-top', '0');
      setImportant(titleGroup, 'padding-bottom', '0');
      setImportant(titleGroup, 'min-height', '0');
    }

    if(h2){
      setImportant(h2, 'margin-top', '0');
      setImportant(h2, 'margin-bottom', '0');
      setImportant(h2, 'padding-top', '0');
      setImportant(h2, 'padding-bottom', '0');
      setImportant(h2, 'gap', '7px');
    }

    if(toolbar){
      setImportant(toolbar, 'margin-top', '0');
    }
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply);
  else apply();

  window.addEventListener('resize', () => requestAnimationFrame(apply), { passive:true });
  setTimeout(apply, 200);
  setTimeout(apply, 800);
  setTimeout(apply, 1600);
})();


/* ════════════════════════════════════════════════════
   v315 — respiro profissional paginação → ranking
   Corrige a sobreposição criada pela aproximação extrema da v314.
   Objetivo: cerca de 52–64px entre paginação e troféu, sem colisão.
════════════════════════════════════════════════════ */
(function rankingProfessionalBreathV315(){
  function setImportant(el, prop, val){
    if(el) el.style.setProperty(prop, val, 'important');
  }

  function apply(){
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const ranking = document.getElementById('rankingsSection');
    if(!ranking) return;

    const rankingHead = ranking.querySelector('.ranking-head');
    const titleGroup = ranking.querySelector('.ranking-title-group');
    const h2 = ranking.querySelector('h2.ranking-title-hero-v305, h2.section-hero-premium-v306');
    const toolbar = ranking.querySelector('.ranking-toolbar, .ranking-toolbar-v136');
    const actions = ranking.querySelector('.ranking-actions');

    const paginationCandidates = [
      ...document.querySelectorAll('.pagination-row, .pagination-controls, .pagination, .catalog-pagination, .fund-pagination-wrap, #pageBtns')
    ];

    if(!isMobile){
      [ranking, rankingHead, titleGroup, h2, toolbar, actions, ...paginationCandidates].forEach(el => {
        if(!el) return;
        el.style.removeProperty('margin-top');
        el.style.removeProperty('margin-bottom');
        el.style.removeProperty('padding-top');
        el.style.removeProperty('padding-bottom');
        el.style.removeProperty('min-height');
        el.style.removeProperty('height');
      });
      if(actions){
        actions.removeAttribute('aria-hidden');
        try{ actions.inert = false; }catch(_){}
      }
      return;
    }

    paginationCandidates.forEach(el => {
      setImportant(el, 'margin-bottom', '16px');
      setImportant(el, 'padding-bottom', '0');
    });

    const funds = document.getElementById('sec-fundos');
    if(funds){
      setImportant(funds, 'margin-bottom', '16px');
      setImportant(funds, 'padding-bottom', '0');
    }

    setImportant(ranking, 'margin-top', '0');
    setImportant(ranking, 'padding-top', '0');
    setImportant(ranking, 'scroll-margin-top', '82px');

    if(rankingHead){
      setImportant(rankingHead, 'margin-top', '44px');
      setImportant(rankingHead, 'margin-bottom', '0');
      setImportant(rankingHead, 'padding-top', '0');
      setImportant(rankingHead, 'padding-bottom', '0');
      setImportant(rankingHead, 'min-height', '0');
      setImportant(rankingHead, 'height', 'auto');
    }

    if(actions){
      actions.setAttribute('aria-hidden', 'true');
      try{ actions.inert = true; }catch(_){}
      setImportant(actions, 'display', 'none');
      setImportant(actions, 'height', '0');
      setImportant(actions, 'min-height', '0');
      setImportant(actions, 'max-height', '0');
      setImportant(actions, 'margin', '0');
      setImportant(actions, 'padding', '0');
      setImportant(actions, 'overflow', 'hidden');
    }

    if(titleGroup){
      setImportant(titleGroup, 'margin-top', '0');
      setImportant(titleGroup, 'margin-bottom', '12px');
      setImportant(titleGroup, 'padding-top', '0');
      setImportant(titleGroup, 'padding-bottom', '0');
      setImportant(titleGroup, 'min-height', '0');
    }

    if(h2){
      setImportant(h2, 'margin-top', '0');
      setImportant(h2, 'margin-bottom', '0');
      setImportant(h2, 'padding-top', '0');
      setImportant(h2, 'padding-bottom', '0');
      setImportant(h2, 'gap', '8px');
    }

    if(toolbar){
      setImportant(toolbar, 'margin-top', '0');
    }
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply);
  else apply();

  window.addEventListener('resize', () => requestAnimationFrame(apply), { passive:true });
  setTimeout(apply, 200);
  setTimeout(apply, 800);
  setTimeout(apply, 1600);
})();


/* ════════════════════════════════════════════════════
   v316 — Mercado mobile cards/progressive disclosure
   Complemento leve para não ocupar espaço com botões técnicos no mobile.
════════════════════════════════════════════════════ */
(function marketMobileCardsV316(){
  function setImportant(el, prop, val){
    if(el) el.style.setProperty(prop, val, 'important');
  }

  function apply(){
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const cdiBtn = document.getElementById('cdiAnalyticLinkV274');
    const cdiLegend = document.querySelector('#cdiYearHistory .cdi-chart-legend-v271');
    const cdiFoot = document.querySelector('#cdiYearHistory .reference-footnote-v167');

    if(isMobile){
      [cdiBtn, cdiLegend, cdiFoot].forEach(el => {
        if(!el) return;
        setImportant(el, 'display', 'none');
      });
    }else{
      [cdiBtn, cdiLegend, cdiFoot].forEach(el => {
        if(!el) return;
        el.style.removeProperty('display');
      });
    }
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply);
  else apply();
  window.addEventListener('resize', () => requestAnimationFrame(apply), { passive:true });
})();


/* ════════════════════════════════════════════════════
   v317 — limpeza ranking / Copom / CDI mobile
   - corrige o retorno do espaço no Ranking gerado por v315;
   - remove botão Calendário BCB no Copom mobile;
   - remove texto descritivo da próxima reunião;
   - oculta e destrói o gráfico CDI no mobile, mantendo KPIs.
════════════════════════════════════════════════════ */
(function rankingMarketCleanV317(){
  function setImportant(el, prop, val){
    if(el) el.style.setProperty(prop, val, 'important');
  }

  function cleanRanking(){
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const ranking = document.getElementById('rankingsSection');
    if(!ranking || !isMobile) return;

    const head = ranking.querySelector('.ranking-head');
    const titleGroup = ranking.querySelector('.ranking-title-group');
    const h2 = ranking.querySelector('h2.ranking-title-hero-v305, h2.section-hero-premium-v306');
    const icon = h2?.querySelector('.section-title-icon-v302');
    const actions = ranking.querySelector('.ranking-actions');
    const toolbar = ranking.querySelector('.ranking-toolbar, .ranking-toolbar-v136');

    setImportant(ranking, 'margin-top', '8px');
    setImportant(ranking, 'padding-top', '0');

    if(head){
      setImportant(head, 'display', 'block');
      setImportant(head, 'margin', '18px 0 0');
      setImportant(head, 'padding', '0');
      setImportant(head, 'min-height', '0');
      setImportant(head, 'height', 'auto');
    }

    if(titleGroup){
      setImportant(titleGroup, 'display', 'flex');
      setImportant(titleGroup, 'flex-direction', 'column');
      setImportant(titleGroup, 'align-items', 'center');
      setImportant(titleGroup, 'text-align', 'center');
      setImportant(titleGroup, 'width', '100%');
      setImportant(titleGroup, 'margin', '0 0 10px');
      setImportant(titleGroup, 'padding', '0');
      setImportant(titleGroup, 'min-height', '0');
    }

    if(h2){
      setImportant(h2, 'position', 'relative');
      setImportant(h2, 'display', 'flex');
      setImportant(h2, 'flex-direction', 'column');
      setImportant(h2, 'align-items', 'center');
      setImportant(h2, 'justify-content', 'center');
      setImportant(h2, 'gap', '7px');
      setImportant(h2, 'margin', '0');
      setImportant(h2, 'padding', '0');
      setImportant(h2, 'font-size', '1.26rem');
      setImportant(h2, 'line-height', '1.08');
    }

    if(icon){
      setImportant(icon, 'width', '44px');
      setImportant(icon, 'height', '44px');
      setImportant(icon, 'min-width', '44px');
      setImportant(icon, 'max-width', '44px');
      setImportant(icon, 'flex', '0 0 44px');
      setImportant(icon, 'font-size', '1.26rem');
      setImportant(icon, 'position', 'relative');
      setImportant(icon, 'overflow', 'visible');
    }

    if(actions){
      actions.setAttribute('aria-hidden','true');
      try{ actions.inert = true; }catch(_){}
      setImportant(actions, 'display', 'none');
      setImportant(actions, 'height', '0');
      setImportant(actions, 'min-height', '0');
      setImportant(actions, 'max-height', '0');
      setImportant(actions, 'margin', '0');
      setImportant(actions, 'padding', '0');
      setImportant(actions, 'overflow', 'hidden');
    }

    if(toolbar) setImportant(toolbar, 'margin-top', '0');
  }

  function cleanCopom(){
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if(!isMobile) return;

    document.querySelectorAll('.copom-link-v271').forEach(el => {
      el.setAttribute('aria-hidden','true');
      try{ el.inert = true; }catch(_){}
      setImportant(el, 'display', 'none');
    });

    document.querySelectorAll('#copomNextExecutiveV270 .copom-exec-desc-v270, .copom-exec-card-v270.is-next .copom-exec-desc-v270').forEach(el => {
      el.remove();
    });
  }

  function cleanCdiChart(){
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const canvas = document.getElementById('cdiYearChartV271');
    const wrap = document.querySelector('#cdiYearHistory .cdi-chart-canvas-wrap-v271');
    const inner = document.getElementById('cdiChartScrollInnerV273');
    const legend = document.querySelector('#cdiYearHistory .cdi-chart-legend-v271');
    const foot = document.querySelector('#cdiYearHistory .reference-footnote-v167');

    if(!isMobile) return;

    try{
      if(window.Chart && canvas){
        const chart = Chart.getChart(canvas);
        if(chart) chart.destroy();
      }
    }catch(_){}

    [wrap, inner, canvas, legend, foot].forEach(el => {
      if(!el) return;
      el.setAttribute('aria-hidden','true');
      setImportant(el, 'display', 'none');
      setImportant(el, 'height', '0');
      setImportant(el, 'min-height', '0');
      setImportant(el, 'max-height', '0');
      setImportant(el, 'margin', '0');
      setImportant(el, 'padding', '0');
      setImportant(el, 'overflow', 'hidden');
    });
  }

  function apply(){
    cleanRanking();
    cleanCopom();
    cleanCdiChart();
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply);
  else apply();

  window.addEventListener('resize', () => requestAnimationFrame(apply), { passive:true });
  setTimeout(apply, 250);
  setTimeout(apply, 900);
  setTimeout(apply, 1800);
})();


/* ════════════════════════════════════════════════════
   v318 — cenário monetário compacto no mobile
   Remove fonte BCB do topo e compacta os cards de taxas/Copom.
════════════════════════════════════════════════════ */
(function marketRatesCompactV318(){
  function setImportant(el, prop, val){
    if(el) el.style.setProperty(prop, val, 'important');
  }

  function apply(){
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if(!isMobile) return;

    document.querySelectorAll('#sec-mercado .rates-reference-v167 .market-reference-source-v167').forEach(el => {
      el.setAttribute('aria-hidden','true');
      try{ el.inert = true; }catch(_){}
      setImportant(el, 'display', 'none');
    });

    // Remove descrições longas do Copom no mobile: os cards ficam de consulta rápida.
    document.querySelectorAll('#sec-mercado .copom-exec-desc-v270').forEach(el => {
      el.setAttribute('aria-hidden','true');
      setImportant(el, 'display', 'none');
    });
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply);
  else apply();

  window.addEventListener('resize', () => requestAnimationFrame(apply), { passive:true });
  setTimeout(apply, 250);
  setTimeout(apply, 900);
})();


/* ════════════════════════════════════════════════════
   v319 — força grid 2 colunas cenário monetário mobile
   Diagnóstico: v318 carregou, mas regras antigas ainda deixaram
   .rates-summary-v167 com 1 coluna e cards em largura total.
════════════════════════════════════════════════════ */
(function forceRatesGridV319(){
  function setImportant(el, prop, val){
    if(el) el.style.setProperty(prop, val, 'important');
  }

  function apply(){
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const wrap = document.querySelector('#sec-mercado .rates-reference-v167 .rates-summary-v167');
    if(!wrap) return;

    const cards = [...wrap.querySelectorAll('.rate-summary-card-v167')];
    const bcb = document.querySelector('#sec-mercado .rates-reference-v167 .market-reference-source-v167');

    if(!isMobile){
      [wrap, bcb, ...cards].forEach(el => {
        if(!el) return;
        el.removeAttribute('style');
      });
      return;
    }

    // remove botão/fonte BCB do topo
    if(bcb){
      bcb.setAttribute('aria-hidden', 'true');
      try{ bcb.inert = true; }catch(_){}
      setImportant(bcb, 'display', 'none');
      setImportant(bcb, 'height', '0');
      setImportant(bcb, 'margin', '0');
      setImportant(bcb, 'padding', '0');
      setImportant(bcb, 'overflow', 'hidden');
    }

    setImportant(wrap, 'display', 'grid');
    setImportant(wrap, 'grid-template-columns', 'minmax(0, 1fr) minmax(0, 1fr)');
    setImportant(wrap, 'gap', '9px');
    setImportant(wrap, 'overflow', 'visible');
    setImportant(wrap, 'padding', '0');
    setImportant(wrap, 'margin', '0 0 12px');
    setImportant(wrap, 'width', '100%');

    cards.forEach((card, idx) => {
      setImportant(card, 'display', 'block');
      setImportant(card, 'width', 'auto');
      setImportant(card, 'min-width', '0');
      setImportant(card, 'max-width', 'none');
      setImportant(card, 'flex', 'initial');
      setImportant(card, 'border-radius', '13px');
      setImportant(card, 'padding', '10px 11px');
      setImportant(card, 'min-height', idx === 2 ? '62px' : '76px');
      setImportant(card, 'box-sizing', 'border-box');

      if(idx === 0 || idx === 1){
        setImportant(card, 'grid-column', 'auto');
      }else{
        setImportant(card, 'grid-column', '1 / -1');
        setImportant(card, 'display', 'grid');
        setImportant(card, 'grid-template-columns', '1fr auto');
        setImportant(card, 'align-items', 'center');
        setImportant(card, 'column-gap', '10px');
      }
    });

    const next = wrap.querySelector('.copom-next-summary-v167');
    if(next){
      const label = next.querySelector(':scope > span');
      const status = next.querySelector(':scope > small');
      if(label) setImportant(label, 'grid-column', '1 / -1');
      if(status){
        setImportant(status, 'justify-self', 'end');
        setImportant(status, 'margin', '0');
        setImportant(status, 'padding', '3px 8px');
      }
    }
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply);
  else apply();

  window.addEventListener('resize', () => requestAnimationFrame(apply), { passive:true });
  setTimeout(apply, 250);
  setTimeout(apply, 900);
  setTimeout(apply, 1800);
})();


/* ════════════════════════════════════════════════════
   v320 — remove card "Próxima reunião" do resumo superior
   Mantém a informação no bloco "Copom executivo", evitando duplicidade.
════════════════════════════════════════════════════ */
(function removeNextSummaryCardV320(){
  function apply(){
    const cards = document.querySelectorAll('#sec-mercado .rates-summary-v167 .copom-next-summary-v167');
    cards.forEach(card => card.remove());

    const wrap = document.querySelector('#sec-mercado .rates-reference-v167 .rates-summary-v167');
    if(wrap && window.matchMedia('(max-width: 768px)').matches){
      wrap.style.setProperty('grid-template-columns', 'minmax(0, 1fr) minmax(0, 1fr)', 'important');
      wrap.style.setProperty('gap', '9px', 'important');
      wrap.style.setProperty('margin-bottom', '12px', 'important');
    }
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply);
  else apply();

  setTimeout(apply, 250);
  setTimeout(apply, 900);
})();


/* ════════════════════════════════════════════════════
   v321 — carrossel das 8 reuniões do Copom no mobile
   Usa a store #copomMeetings como fonte e cria uma trilha horizontal
   dentro de #copomExecutiveSummaryV270.
════════════════════════════════════════════════════ */
(function copomCarouselV321(){
  function norm(txt){
    return String(txt || '').replace(/\s+/g, ' ').trim();
  }

  function classify(item, result){
    const cls = String(item.className || '').toLowerCase();
    const r = String(result || '').toLowerCase();
    if(cls.includes('next') || r.includes('próxima') || r.includes('proxima')) return 'is-next';
    if(cls.includes('future') || r.includes('prevista')) return 'is-future';
    if(cls.includes('cut') || r.includes('corte')) return 'is-cut';
    if(cls.includes('hold') || r.includes('mantida')) return 'is-hold';
    return 'is-neutral';
  }

  function statusLabel(result){
    const r = norm(result);
    if(!r) return 'agenda';
    if(/próxima|proxima/i.test(r)) return 'agenda';
    if(/prevista/i.test(r)) return 'prevista';
    if(/corte/i.test(r)) return 'corte';
    if(/mantida/i.test(r)) return 'mantida';
    return r.replace(/→/g, '').slice(0, 18);
  }

  function build(){
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const summary = document.getElementById('copomExecutiveSummaryV270');
    const store = document.getElementById('copomMeetings');
    if(!summary || !store || !isMobile) return;

    const items = [...store.querySelectorAll('.copom-item')]
      .sort((a,b) => Number(a.dataset.originalOrder ?? 999) - Number(b.dataset.originalOrder ?? 999));

    if(!items.length || summary.dataset.v321Built === '1') return;

    // v413 — pista visual mobile para o carrossel da Agenda Copom
    // Mantém o aviso fora da trilha para não atrapalhar o scroll dos cards.
    const oldHint = document.getElementById('copomScrollHintV413');
    if(!oldHint){
      summary.insertAdjacentHTML('beforebegin', '<div class="copom-scroll-hint-v413" id="copomScrollHintV413" aria-hidden="true"></div>');
    }else{
      oldHint.textContent = '';
    }

    const html = items.map(item => {
      const num = norm(item.querySelector('.copom-num')?.textContent);
      const numShort = num.replace(/\s*reuni[aã]o\b/i, '').trim();
      const date = norm(item.querySelector('.copom-date')?.textContent);
      const result = norm(item.querySelector('.copom-result')?.textContent);
      const kind = classify(item, result);
      const label = statusLabel(result);
      return `
        <article class="copom-exec-card-v270 copom-carousel-card-v321 ${kind}" role="listitem">
          <span class="copom-exec-kicker-v270">${numShort || num || 'Reunião'}</span>
          <strong class="copom-exec-date-v270">${date || '—'}</strong>
          <div class="copom-exec-meta-v270">
            <span class="copom-exec-status-v270 ${kind}">${label}</span>
          </div>
          ${result && !/próxima|proxima|prevista/i.test(result) ? `<small class="copom-carousel-result-v321">${result}</small>` : ''}
        </article>`;
    }).join('');

    summary.dataset.v321Built = '1';
    summary.setAttribute('role', 'list');
    summary.setAttribute('aria-label', 'Carrossel das reuniões do Copom');
    summary.innerHTML = html;
  }

  function resetDesktop(){
    if(window.matchMedia('(max-width: 768px)').matches) return;
    const summary = document.getElementById('copomExecutiveSummaryV270');
    if(summary?.dataset.v321Built === '1'){
      summary.dataset.v321Built = '0';
    }
  }

  function apply(){
    build();
    resetDesktop();
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply);
  else apply();

  window.addEventListener('resize', () => requestAnimationFrame(apply), { passive:true });
  setTimeout(apply, 300);
  setTimeout(apply, 1000);
  setTimeout(apply, 2000);
})();


/* ════════════════════════════════════════════════════
   v323 — correção CDI 12 meses
   Preenche o KPI/card "12 meses" com:
   1) cards.cdi.acum_12m;
   2) fallback calculado pelos últimos 12 meses do histórico.
════════════════════════════════════════════════════ */
(function fixCdi12mV323(){
  function fmt(v){
    const n = Number(v);
    if(!Number.isFinite(n)) return '—';
    return (n >= 0 ? '+' : '') + n.toFixed(2).replace('.', ',') + '%';
  }

  function calcFromHistory(hist){
    const vals = (Array.isArray(hist) ? hist : [])
      .slice()
      .sort((a,b) => String(a?.key || '').localeCompare(String(b?.key || '')))
      .slice(-12)
      .map(x => Number(x?.valor))
      .filter(Number.isFinite);

    if(!vals.length) return NaN;
    const fator = vals.reduce((acc, v) => acc * (1 + v / 100), 1);
    return Number(((fator - 1) * 100).toFixed(2));
  }

  function getCdi(){
    return window._mercadoV230?.cards?.cdi
      || window.__dadosMercado?.cards?.cdi
      || window.dadosMercado?.cards?.cdi
      || null;
  }

  function apply(){
    const cdi = getCdi();
    if(!cdi) return;

    const direto = Number(cdi.acum_12m ?? cdi.m12 ?? cdi.acumulado_12m ?? cdi.acum12m);
    const valor = Number.isFinite(direto) ? direto : calcFromHistory(cdi.historico);
    if(!Number.isFinite(valor)) return;

    const txt = fmt(valor);
    const kpi = document.getElementById('cdiLast12mValueV296');
    if(kpi) kpi.textContent = txt;

    document
      .querySelectorAll('#cdiMonthCarouselV322 .cdi-month-card-v322')
      .forEach(card => {
        const label = (card.querySelector('.cdi-month-kicker-v322')?.textContent || '').toLowerCase();
        if(label.includes('12 meses')){
          const strong = card.querySelector('.cdi-month-value-v322, strong');
          if(strong) strong.textContent = txt;
        }
      });
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply);
  else apply();

  setTimeout(apply, 300);
  setTimeout(apply, 1000);
  setTimeout(apply, 2000);
})();


/* ════════════════════════════════════════════════════
   v325 — Poupança: limpeza mobile e correção cenários
   - oculta bloco textual longo #poupRulesV214 no mobile;
   - mantém apenas Comparação de cenários ao expandir;
   - corrige sobreposição de dt/dd nos cards;
   - dá respiro após botões.
════════════════════════════════════════════════════ */
(function savingsCleanMobileV325(){
  function setImportant(el, prop, val){
    if(el) el.style.setProperty(prop, val, 'important');
  }

  function apply(){
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const rules = document.getElementById('poupRulesV214');
    const details = document.getElementById('poupDetailsPanelV167');
    const scenarios = document.querySelector('#poupDetailsPanelV167 .savings-scenarios-v167, #poupDetailsPanelV167 .savings-scenarios-v207, #poupDetailsPanelV167 .savings-scenarios-v208');
    const actions = document.querySelector('#sec-mercado .savings-actions-v167, #sec-mercado .savings-actions-v205, #sec-mercado .savings-actions-v207');

    if(!isMobile){
      if(rules){
        rules.removeAttribute('aria-hidden');
        rules.style.removeProperty('display');
      }
      return;
    }

    if(rules){
      rules.setAttribute('aria-hidden','true');
      try{ rules.inert = true; }catch(_){}
      setImportant(rules, 'display', 'none');
      setImportant(rules, 'height', '0');
      setImportant(rules, 'min-height', '0');
      setImportant(rules, 'max-height', '0');
      setImportant(rules, 'margin', '0');
      setImportant(rules, 'padding', '0');
      setImportant(rules, 'overflow', 'hidden');
    }

    if(actions){
      setImportant(actions, 'margin-bottom', '16px');
    }

    if(scenarios){
      setImportant(scenarios, 'display', 'block');
      setImportant(scenarios, 'margin-top', '0');
    }

    document.querySelectorAll('#sec-mercado .savings-scenario-card-v208 dl > div').forEach(pair => {
      setImportant(pair, 'display', 'flex');
      setImportant(pair, 'flex-direction', 'column');
      setImportant(pair, 'align-items', 'flex-start');
      setImportant(pair, 'gap', '4px');
      setImportant(pair, 'min-height', 'auto');
      setImportant(pair, 'padding', '0');
    });

    document.querySelectorAll('#sec-mercado .savings-scenario-card-v208 dt, #sec-mercado .savings-scenario-card-v208 dd').forEach(el => {
      setImportant(el, 'display', 'block');
      setImportant(el, 'width', '100%');
      setImportant(el, 'margin', '0');
      setImportant(el, 'padding', '0');
      setImportant(el, 'line-height', '1.22');
      setImportant(el, 'white-space', 'normal');
      setImportant(el, 'overflow-wrap', 'anywhere');
    });
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply);
  else apply();

  window.addEventListener('resize', () => requestAnimationFrame(apply), { passive:true });
  setTimeout(apply, 250);
  setTimeout(apply, 900);
})();


/* ════════════════════════════════════════════════════
   v326 — Poupança: refinamento final dos cenários mobile
   - remove texto longo redundante #poupScenarioSummary;
   - padroniza alinhamento à esquerda;
   - corrige hierarquia dt/dd;
   - aumenta largura dos cards.
════════════════════════════════════════════════════ */
(function savingsScenariosPolishV326(){
  function setImportant(el, prop, val){
    if(el) el.style.setProperty(prop, val, 'important');
  }

  function apply(){
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if(!isMobile) return;

    const summary = document.getElementById('poupScenarioSummary');
    if(summary) summary.remove();

    document.querySelectorAll('#sec-mercado .savings-scenario-card-v208').forEach(card => {
      setImportant(card, 'text-align', 'left');
      setImportant(card, 'flex', '0 0 188px');
      setImportant(card, 'min-width', '188px');
      setImportant(card, 'max-width', '188px');
      setImportant(card, 'padding', '14px');
      setImportant(card, 'box-sizing', 'border-box');
    });

    document.querySelectorAll('#sec-mercado .savings-scenario-card-v208 dl > div').forEach(pair => {
      setImportant(pair, 'display', 'flex');
      setImportant(pair, 'flex-direction', 'column');
      setImportant(pair, 'align-items', 'flex-start');
      setImportant(pair, 'justify-content', 'flex-start');
      setImportant(pair, 'text-align', 'left');
      setImportant(pair, 'gap', '5px');
    });

    document.querySelectorAll('#sec-mercado .savings-scenario-card-v208 dt').forEach(dt => {
      setImportant(dt, 'display', 'block');
      setImportant(dt, 'width', '100%');
      setImportant(dt, 'text-align', 'left');
      setImportant(dt, 'font-size', '10px');
      setImportant(dt, 'line-height', '1.1');
      setImportant(dt, 'font-weight', '800');
      setImportant(dt, 'letter-spacing', '.07em');
      setImportant(dt, 'text-transform', 'uppercase');
      setImportant(dt, 'color', 'rgba(220,228,250,.58)');
      setImportant(dt, 'margin', '0');
      setImportant(dt, 'padding', '0');
    });

    document.querySelectorAll('#sec-mercado .savings-scenario-card-v208 dd').forEach(dd => {
      setImportant(dd, 'display', 'block');
      setImportant(dd, 'width', '100%');
      setImportant(dd, 'text-align', 'left');
      setImportant(dd, 'font-size', '12px');
      setImportant(dd, 'line-height', '1.22');
      setImportant(dd, 'font-weight', '760');
      setImportant(dd, 'letter-spacing', '-.01em');
      setImportant(dd, 'color', '#f8fafc');
      setImportant(dd, 'margin', '0');
      setImportant(dd, 'padding', '0');
      setImportant(dd, 'white-space', 'normal');
      setImportant(dd, 'overflow-wrap', 'normal');
      setImportant(dd, 'word-break', 'normal');
    });
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply);
  else apply();

  window.addEventListener('resize', () => requestAnimationFrame(apply), { passive:true });
  setTimeout(apply, 250);
  setTimeout(apply, 900);
})();


/* ════════════════════════════════════════════════════
   v327 — Poupança: micro-polimento final
   - remove pílula Selic 14,25%;
   - limpa títulos dos cenários;
   - reforça quick note mais orientado ao rendimento.
════════════════════════════════════════════════════ */
(function savingsMicroPolishV327(){
  function apply(){
    const status = document.getElementById('poupScenarioStatus');
    if(status) status.remove();

    const title4 = document.getElementById('poupScenario4TitleV214');
    if(title4) title4.textContent = 'Selic 4,00%';

    const title85 = document.getElementById('poupScenario85TitleV214');
    if(title85) title85.textContent = 'Selic 8,50%';

    const current = document.getElementById('poupScenarioCurrentTitle');
    if(current) current.textContent = current.textContent.replace(/\s+a\.a\.$/i, '');

    const quick = document.getElementById('poupQuickNote');
    if(quick && /depósitos novos e antigos seguem/i.test(quick.textContent || '')){
      quick.innerHTML = 'Rendimento de <strong>TR + 0,50% a.m.</strong> <span class="poup-note-muted-v327">(Selic acima de 8,50% a.a.)</span>';
    }
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply);
  else apply();

  setTimeout(apply, 250);
  setTimeout(apply, 900);
})();


/* v328 - Poupança no topo direito (mobile) */
(function(){
  function apply(){
    var lbl=document.getElementById("poupCurrentLabelV214");
    if(lbl) lbl.textContent = window.innerWidth <= 480 ? "Rendimento do mês" : lbl.textContent;
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", apply); else apply();
  window.addEventListener("resize", apply, {passive:true});
})();


/* ════════════════════════════════════════════════════
   v329 — limpeza de microcopy dos indicadores
   - CDI: texto longo vira "Parcial até dd/mm";
   - Tags: Atual vira Cotação/Pontos conforme indicador;
   - Grid: Atual vira Mês atual.
════════════════════════════════════════════════════ */
(function marketMicrocopyCleanV329(){
  function norm(txt){
    return String(txt || '').replace(/\s+/g, ' ').trim();
  }

  function findAncestorText(el){
    const article = el.closest('article, .market-period-card-v196, .market-asset-card, .period-card, .market-card');
    return norm(article?.innerText || el.closest('section')?.innerText || '');
  }

  function cleanCdi(){
    document.querySelectorAll('#sec-mercado small, #sec-mercado .market-period-metric-v196 small').forEach(small => {
      const t = norm(small.textContent);
      if(/Acumulado no mês/i.test(t) && /Dados disponíveis até/i.test(t)){
        const data = t.match(/até\s+(\d{1,2}\/\d{1,2})/i)?.[1] || '';
        small.textContent = data ? `Parcial até ${data}` : 'Parcial do mês';
      }
    });
  }

  function cleanCurrentLevelTags(){
    document.querySelectorAll('#sec-mercado .market-current-level-v196 small, #sec-mercado .market-current-level-v196 span, #sec-mercado .market-current-level-v196').forEach(el => {
      const txt = norm(el.textContent);
      if(!/^Atual$/i.test(txt)) return;

      const ctx = findAncestorText(el).toLowerCase();

      if(ctx.includes('dólar') || ctx.includes('ptax') || ctx.includes('brl/usd')){
        el.textContent = 'Cotação';
        return;
      }

      if(ctx.includes('ibovespa') || ctx.includes('s&p') || ctx.includes('dow jones') || ctx.includes('nasdaq')){
        el.textContent = 'Pontos';
      }
    });

    // fallback para tags que vêm como texto completo "ATUAL R$..." ou "ATUAL 168.289 pts"
    document.querySelectorAll('#sec-mercado .market-current-level-v196').forEach(el => {
      const ctx = findAncestorText(el).toLowerCase();
      el.childNodes.forEach(node => {
        if(node.nodeType !== Node.TEXT_NODE) return;
        const val = String(node.nodeValue || '');
        if(/^\s*Atual\s+/i.test(val)){
          if(ctx.includes('dólar') || ctx.includes('ptax') || ctx.includes('brl/usd')){
            node.nodeValue = val.replace(/Atual/i, 'Cotação');
          }else if(ctx.includes('ibovespa') || ctx.includes('s&p') || ctx.includes('dow jones') || ctx.includes('nasdaq')){
            node.nodeValue = val.replace(/Atual/i, 'Pontos');
          }
        }
      });
    });
  }

  function cleanMetricGridLabels(){
    document.querySelectorAll('#sec-mercado .market-period-metric-v196 span, #sec-mercado .market-period-metric-v196 dt').forEach(label => {
      const t = norm(label.textContent);
      if(/^Atual$/i.test(t)){
        label.textContent = 'Mês atual';
      }
    });
  }

  function apply(){
    cleanCdi();
    cleanCurrentLevelTags();
    cleanMetricGridLabels();
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply);
  else apply();

  setTimeout(apply, 250);
  setTimeout(apply, 900);
  setTimeout(apply, 1800);
})();


/* ════════════════════════════════════════════════════
   v330 — largura uniforme dos cards do cenário monetário
   Copom e CDI mensal passam a usar a mesma régua dos cards 2 colunas:
   2 cards visíveis por vez + próximo card levemente sugerido no scroll.
════════════════════════════════════════════════════ */
(function marketCardWidthUniformV330(){
  function setImportant(el, prop, val){
    if(el) el.style.setProperty(prop, val, 'important');
  }

  function apply(){
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if(!isMobile) return;

    const width = 'calc((100% - 9px) / 2)';

    document
      .querySelectorAll('#sec-mercado #copomExecutiveSummaryV270 > .copom-exec-card-v270, #sec-mercado #cdiMonthCarouselV322 > .cdi-month-card-v322')
      .forEach(card => {
        setImportant(card, 'flex', `0 0 ${width}`);
        setImportant(card, 'min-width', width);
        setImportant(card, 'max-width', width);
        setImportant(card, 'box-sizing', 'border-box');
      });

    document
      .querySelectorAll('#sec-mercado #copomExecutiveSummaryV270, #sec-mercado #cdiMonthCarouselV322')
      .forEach(track => {
        setImportant(track, 'gap', '9px');
        setImportant(track, 'padding-left', '1px');
        setImportant(track, 'padding-right', '1px');
      });
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply);
  else apply();

  window.addEventListener('resize', () => requestAnimationFrame(apply), { passive:true });
  setTimeout(apply, 250);
  setTimeout(apply, 900);
  setTimeout(apply, 1800);
})();


/* ════════════════════════════════════════════════════
   v331 — cards Copom/CDI com largura igual aos cards Selic/CDI
   Diagnóstico do console:
   - Selic/CDI: 156px
   - Copom/CDI mensal: 130px
   Correção: carrosséis com cards de 156px no mobile.
════════════════════════════════════════════════════ */
(function marketCard156V331(){
  function setImportant(el, prop, val){
    if(el) el.style.setProperty(prop, val, 'important');
  }

  function cleanCopomResult(txt){
    return String(txt || '')
      .replace(/corte\s+-0,25\s+p\.p\.\s+→\s+/i, 'Corte → ')
      .replace(/mantida em/i, 'Mantida ')
      .trim();
  }

  function apply(){
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if(!isMobile) return;

    const cardWidth = '156px';

    document
      .querySelectorAll('#sec-mercado #copomExecutiveSummaryV270 > .copom-exec-card-v270, #sec-mercado #cdiMonthCarouselV322 > .cdi-month-card-v322')
      .forEach(card => {
        setImportant(card, 'flex', `0 0 ${cardWidth}`);
        setImportant(card, 'min-width', cardWidth);
        setImportant(card, 'max-width', cardWidth);
        setImportant(card, 'box-sizing', 'border-box');
      });

    document
      .querySelectorAll('#sec-mercado #copomExecutiveSummaryV270, #sec-mercado #cdiMonthCarouselV322')
      .forEach(track => {
        setImportant(track, 'gap', '9px');
        setImportant(track, 'padding-left', '1px');
        setImportant(track, 'padding-right', '18px');
        setImportant(track, 'scroll-padding-left', '1px');
      });

    document.querySelectorAll('#sec-mercado .copom-carousel-result-v321').forEach(small => {
      const original = small.textContent;
      const clean = cleanCopomResult(original);
      if(clean && clean !== original) small.textContent = clean;
    });
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply);
  else apply();

  window.addEventListener('resize', () => requestAnimationFrame(apply), { passive:true });
  setTimeout(apply, 250);
  setTimeout(apply, 900);
  setTimeout(apply, 1800);
})();


/* ════════════════════════════════════════════════════
   v332 — força microcopy no painel consolidado
   Corrige textos que podem ser recriados depois do carregamento:
   - CDI: "Acumulado no mês..." => "Parcial até dd/mm"
   - Tags nominais: Atual => Cotação/Pontos
   - Grid de variação: Atual => Mês atual
════════════════════════════════════════════════════ */
(function marketMicrocopyForceV332(){
  function txt(el){
    return String(el?.textContent || '').replace(/\s+/g, ' ').trim();
  }

  function context(el){
    const block = el.closest(
      '.market-period-card-v196, .market-period-group-v196, .market-asset-card, article, .period-card, .market-card, .market-v172-card, .market-reference-block-v167'
    );
    return txt(block || el).toLowerCase();
  }

  function replaceTextNodePrefix(el, from, to){
    [...el.childNodes].forEach(node => {
      if(node.nodeType === Node.TEXT_NODE && new RegExp('^\\s*' + from + '\\b', 'i').test(node.nodeValue || '')){
        node.nodeValue = String(node.nodeValue).replace(new RegExp(from, 'i'), to);
      }
    });
  }

  function cleanCdiLongText(root){
    root.querySelectorAll('small, .market-period-metric-v196 small, .market-period-metric-v196 p, .market-period-metric-v196 div').forEach(el => {
      const t = txt(el);
      if(/Acumulado no mês/i.test(t) && /Dados disponíveis até/i.test(t)){
        const data = t.match(/até\s+(\d{1,2}\/\d{1,2})/i)?.[1] || '';
        el.textContent = data ? `Parcial até ${data}` : 'Parcial do mês';
      }
    });
  }

  function cleanCurrentNominalTags(root){
    root.querySelectorAll('.market-current-level-v196, .market-current-level-v196 small, .market-current-level-v196 span, .market-current-level-v196 b, .market-current-level-v196 strong').forEach(el => {
      const t = txt(el);
      const ctx = context(el);

      if(/^Atual$/i.test(t)){
        if(/dólar|dolar|ptax|brl\/usd/.test(ctx)) el.textContent = 'Cotação';
        if(/ibovespa|s&p|dow jones|nasdaq/.test(ctx)) el.textContent = 'Pontos';
      }

      if(/^Atual\s+/i.test(t)){
        if(/dólar|dolar|ptax|brl\/usd/.test(ctx)) replaceTextNodePrefix(el, 'Atual', 'Cotação');
        if(/ibovespa|s&p|dow jones|nasdaq/.test(ctx)) replaceTextNodePrefix(el, 'Atual', 'Pontos');
      }
    });
  }

  function cleanMetricCurrent(root){
    root.querySelectorAll('.market-period-metric-v196 span, .market-period-metric-v196 dt, .market-period-metric-v196 .metric-label, .market-period-metric-v196 label').forEach(el => {
      if(/^Atual$/i.test(txt(el))) el.textContent = 'Mês atual';
    });
  }

  function cleanAll(){
    const root = document.querySelector('#sec-mercado') || document;
    cleanCdiLongText(root);
    cleanCurrentNominalTags(root);
    cleanMetricCurrent(root);
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', cleanAll);
  else cleanAll();

  [250, 750, 1500, 2500, 4000].forEach(ms => setTimeout(cleanAll, ms));

  const target = document.querySelector('#sec-mercado');
  if(target && 'MutationObserver' in window){
    const obs = new MutationObserver(() => {
      clearTimeout(window.__marketMicrocopyForceV332Timer);
      window.__marketMicrocopyForceV332Timer = setTimeout(cleanAll, 80);
    });
    obs.observe(target, { childList:true, subtree:true, characterData:true });
  }
})();


/* ════════════════════════════════════════════════════
   v333 — Dólar PTAX executivo mobile
   Organiza a seção em:
   1) cotação principal;
   2) variações resumidas;
   3) gráfico/estatísticas sob demanda;
   4) fechamentos mensais recolhidos por padrão.
════════════════════════════════════════════════════ */
(function dolarExecutiveMobileV333(){
  function setImportant(el, prop, val){
    if(el) el.style.setProperty(prop, val, 'important');
  }

  function apply(){
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const sec = document.getElementById('sec-dolar');
    if(!sec) return;

    const timelineBody = document.getElementById('dolarTimelineBody');
    const timelineToggle = document.getElementById('dolarTimelineToggle');
    const chartPanel = document.getElementById('dolarChartPanel');
    const chartToggle = document.getElementById('dolarChartToggle');
    const currentMonth = document.getElementById('dolarCurrentMonthV162');

    if(!isMobile){
      if(timelineBody) timelineBody.classList.add('open');
      if(timelineToggle){
        timelineToggle.textContent = 'Recolher ▲';
        timelineToggle.setAttribute('aria-expanded','true');
      }
      if(currentMonth) currentMonth.hidden = true;
      return;
    }

    sec.classList.add('dolar-exec-mobile-v333-active');

    // O mês atual já aparece no card de variações. Evita duplicidade.
    if(currentMonth){
      currentMonth.hidden = true;
      setImportant(currentMonth, 'display', 'none');
    }

    // Gráfico fechado por padrão, estatísticas aparecem quando o gráfico abre.
    if(chartPanel && !chartPanel.dataset.v333UserTouched){
      chartPanel.classList.add('is-mobile-collapsed');
    }
    if(chartToggle && !chartToggle.dataset.v333Bound){
      chartToggle.textContent = chartPanel?.classList.contains('is-mobile-collapsed') ? 'Abrir gráfico' : 'Ocultar gráfico';
      chartToggle.setAttribute('aria-expanded', String(!chartPanel?.classList.contains('is-mobile-collapsed')));
      chartToggle.dataset.v333Bound = '1';
      chartToggle.addEventListener('click', () => {
        if(chartPanel) chartPanel.dataset.v333UserTouched = '1';
        setTimeout(() => {
          chartToggle.textContent = chartPanel?.classList.contains('is-mobile-collapsed') ? 'Abrir gráfico' : 'Ocultar gráfico';
        }, 60);
      }, { passive:true });
    }

    // Fechamentos recolhidos por padrão para reduzir altura.
    if(timelineBody && !timelineBody.dataset.v333UserTouched){
      timelineBody.classList.remove('open');
    }
    if(timelineToggle && !timelineToggle.dataset.v333Bound){
      timelineToggle.textContent = 'Ver fechamentos';
      timelineToggle.setAttribute('aria-expanded','false');
      timelineToggle.dataset.v333Bound = '1';
      timelineToggle.addEventListener('click', () => {
        timelineBody && (timelineBody.dataset.v333UserTouched = '1');
        setTimeout(() => {
          const open = timelineBody?.classList.contains('open');
          timelineToggle.textContent = open ? 'Ocultar fechamentos' : 'Ver fechamentos';
          timelineToggle.setAttribute('aria-expanded', String(!!open));
        }, 60);
      }, { passive:true });
    }
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply);
  else apply();

  window.addEventListener('resize', () => requestAnimationFrame(apply), { passive:true });
  setTimeout(apply, 300);
  setTimeout(apply, 1000);
})();


/* ════════════════════════════════════════════════════
   v334 — Dólar: eixo X limpo + estatísticas sem redundância
   - eixo X horizontal, com poucos ticks;
   - card "Atual" vira "Variação";
   - Máxima/Mínima em cor neutra.
════════════════════════════════════════════════════ */
(function dolarChartStatsV334(){
  function apply(){
    const varLabel = document.getElementById('ptaxStatVarLabelV334')
      || document.querySelector('#ptaxStatsCard .ptax-stat-item:first-child .ptax-stat-label');
    if(varLabel) varLabel.textContent = 'Variação';

    ['ptaxStatMax', 'ptaxStatMin', 'ptaxStatMedia'].forEach(id => {
      const el = document.getElementById(id);
      if(el) el.className = 'ptax-stat-val neu';
    });

    const chart = window.Chart && document.getElementById('chartDolar')
      ? Chart.getChart(document.getElementById('chartDolar'))
      : null;

    if(chart?.options?.scales?.x?.ticks){
      chart.options.scales.x.ticks.maxRotation = 0;
      chart.options.scales.x.ticks.minRotation = 0;
      chart.options.scales.x.ticks.maxTicksLimit = window.innerWidth <= 768 ? 5 : 10;
      chart.options.scales.x.ticks.autoSkip = true;
      chart.update('none');
    }
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply);
  else apply();

  window.addEventListener('resize', () => requestAnimationFrame(apply), { passive:true });
  setTimeout(apply, 300);
  setTimeout(apply, 1000);
  setTimeout(apply, 2000);
})();


/* ════════════════════════════════════════════════════
   v335 — força eixo X do gráfico PTAX horizontal no mobile
   Evita labels diagonais em 24M/36M:
   - maxRotation/minRotation 0
   - apenas 5 labels visíveis
   - demais labels ficam vazios
════════════════════════════════════════════════════ */
(function dolarXAxisMobileV335(){
  function apply(){
    const canvas = document.getElementById('chartDolar');
    if(!canvas || !window.Chart) return;

    const chart = Chart.getChart(canvas);
    if(!chart?.options?.scales?.x?.ticks) return;

    const ticks = chart.options.scales.x.ticks;
    ticks.maxRotation = 0;
    ticks.minRotation = 0;
    ticks.autoSkip = false;
    ticks.maxTicksLimit = window.innerWidth <= 768 ? 5 : 10;
    ticks.callback = function(value, index, tickList){
      const total = Array.isArray(tickList) ? tickList.length : (this.chart?.data?.labels?.length || 0);
      const maxLabels = window.innerWidth <= 768 ? 5 : 10;
      const label = this.getLabelForValue(value);
      if(total <= maxLabels) return label;

      const step = Math.max(1, Math.ceil((total - 1) / (maxLabels - 1)));
      if(index === 0 || index === total - 1 || index % step === 0) return label;
      return '';
    };

    chart.update('none');
  }

  function schedule(){
    [80, 250, 700, 1200].forEach(ms => setTimeout(apply, ms));
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', schedule);
  else schedule();

  window.addEventListener('resize', () => requestAnimationFrame(apply), { passive:true });
  document.querySelectorAll('[data-dolar-range]').forEach(btn => {
    btn.addEventListener('click', schedule, { passive:true });
  });

  const chartToggle = document.getElementById('dolarChartToggle');
  if(chartToggle) chartToggle.addEventListener('click', schedule, { passive:true });
})();


/* ════════════════════════════════════════════════════
   v336 — Dólar: badge na linha do título + fechamentos visíveis
   - reposiciona a fonte BCB/PTAX na mesma linha do título;
   - reabre o carrossel de fechamentos mensais no mobile;
   - evita que o v333 feche novamente a timeline.
════════════════════════════════════════════════════ */
(function dolarBadgeMonthsV336(){
  function setImportant(el, prop, val){
    if(el) el.style.setProperty(prop, val, 'important');
  }

  function apply(){
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const sec = document.getElementById('sec-dolar');
    if(!sec || !isMobile) return;

    const badge = sec.querySelector('.section-badge');
    if(badge){
      badge.classList.add('dolar-source-badge-v336');
      badge.innerHTML = '<span class="badge-dot green"></span>BCB · PTAX';
      badge.removeAttribute('aria-hidden');
      setImportant(badge, 'display', 'inline-flex');
    }

    const body = document.getElementById('dolarTimelineBody');
    const toggle = document.getElementById('dolarTimelineToggle');
    const footer = sec.querySelector('.dolar-compact-footer');
    const months = document.getElementById('dolarMonths');

    if(body){
      body.dataset.v333UserTouched = '1';
      body.classList.add('open');
      body.removeAttribute('hidden');
      setImportant(body, 'display', 'block');
      setImportant(body, 'margin-top', '12px');
    }

    if(toggle){
      toggle.setAttribute('aria-hidden','true');
      toggle.setAttribute('tabindex','-1');
      setImportant(toggle, 'display', 'none');
    }

    if(footer){
      setImportant(footer, 'display', 'block');
    }

    if(months){
      setImportant(months, 'display', 'flex');
      setImportant(months, 'overflow-x', 'auto');
      setImportant(months, 'gap', '9px');
      setImportant(months, 'padding-bottom', '8px');
    }
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply);
  else apply();

  window.addEventListener('resize', () => requestAnimationFrame(apply), { passive:true });
  [250, 800, 1600, 2600].forEach(ms => setTimeout(apply, ms));
})();


/* ════════════════════════════════════════════════════
   v337 — Dólar: gráfico fechado por padrão no mobile
   O gráfico fica sob demanda para reduzir altura e ruído visual.
   Botão: "Abrir gráfico" / "Ocultar gráfico".
════════════════════════════════════════════════════ */
(function dolarChartClosedV337(){
  function setImportant(el, prop, val){
    if(el) el.style.setProperty(prop, val, 'important');
  }

  function applyInitial(){
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const panel = document.getElementById('dolarChartPanel');
    const toggle = document.getElementById('dolarChartToggle');
    if(!panel || !toggle || !isMobile) return;

    if(!panel.dataset.v337UserOpened){
      panel.classList.add('is-mobile-collapsed');
      toggle.textContent = 'Abrir gráfico';
      toggle.setAttribute('aria-expanded', 'false');
    }

    setImportant(toggle, 'display', 'inline-flex');
  }

  function bind(){
    const panel = document.getElementById('dolarChartPanel');
    const toggle = document.getElementById('dolarChartToggle');
    if(!panel || !toggle || toggle.dataset.v337Bound) return;

    toggle.dataset.v337Bound = '1';
    toggle.addEventListener('click', () => {
      setTimeout(() => {
        const isCollapsed = panel.classList.contains('is-mobile-collapsed');
        panel.dataset.v337UserOpened = isCollapsed ? '' : '1';
        toggle.textContent = isCollapsed ? 'Abrir gráfico' : 'Ocultar gráfico';
        toggle.setAttribute('aria-expanded', String(!isCollapsed));
      }, 70);
    }, { passive:true });
  }

  function apply(){
    applyInitial();
    bind();
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply);
  else apply();

  window.addEventListener('resize', () => requestAnimationFrame(apply), { passive:true });
  [250, 800, 1600].forEach(ms => setTimeout(apply, ms));
})();


/* ════════════════════════════════════════════════════
   v338 — Inflação e juros: limpeza de redundâncias mobile
   - remove pílulas de leitura dos gráficos;
   - remove cards "vigente/último" redundantes;
   - compacta botões de prazo em trilha horizontal.
════════════════════════════════════════════════════ */
(function inflationRatesCleanV338(){
  function setImportant(el, prop, val){
    if(el) el.style.setProperty(prop, val, 'important');
  }

  function hide(el){
    if(!el) return;
    el.setAttribute('aria-hidden','true');
    try{ el.inert = true; }catch(_){}
    setImportant(el, 'display', 'none');
    setImportant(el, 'height', '0');
    setImportant(el, 'min-height', '0');
    setImportant(el, 'max-height', '0');
    setImportant(el, 'margin', '0');
    setImportant(el, 'padding', '0');
    setImportant(el, 'overflow', 'hidden');
  }

  function apply(){
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const root = document.getElementById('sec-graficos') || document.getElementById('sec-graficos-body') || document;
    if(!root || !isMobile) return;

    // 1) Pílulas/leituras redundantes dos gráficos
    ['evoCardIpcaNote', 'evoCardSelicNote', 'evoCardMetaNote'].forEach(id => hide(document.getElementById(id)));
    root.querySelectorAll('.chart-reading, .evo-card-reading, .evo-chart-reading').forEach(hide);

    // 2) Selic: remover cartão da taxa vigente dentro do grid
    root.querySelectorAll(
      '#selicSummaryRow .selic-summary-chip.now, ' +
      '#selicSummaryRow .selic-summary-chip.vigente, ' +
      '#selicSummaryRow .selic-summary-chip.current, ' +
      '#selicSummaryRow .selic-summary-chip.is-current'
    ).forEach(hide);

    // fallback por texto
    root.querySelectorAll('#selicSummaryRow .selic-summary-chip').forEach(el => {
      const t = (el.innerText || '').toLowerCase();
      if(t.includes('vigente') || t.includes('taxa vigente')) hide(el);
    });

    // 3) IPCA: remover cartão último IPCA/último resultado
    root.querySelectorAll(
      '#ipcaSummaryRowV250 .ipca-summary-chip-v250.latest, ' +
      '#ipcaSummaryRowV250 .ipca-summary-chip-v250.current, ' +
      '#ipcaSummaryRowV250 .ipca-summary-chip-v250.is-latest'
    ).forEach(hide);

    root.querySelectorAll('#ipcaSummaryRowV250 .ipca-summary-chip-v250').forEach(el => {
      const t = (el.innerText || '').toLowerCase();
      if(t.includes('último') || t.includes('ultimo') || t.includes('ipca do último')) hide(el);
    });

    // 4) Botões de prazo em uma linha rolável
    root.querySelectorAll('.chart-tabs, .evo-range-tabs, .selic-range-tabs, .ipca-range-tabs').forEach(tabs => {
      setImportant(tabs, 'display', 'flex');
      setImportant(tabs, 'flex-wrap', 'nowrap');
      setImportant(tabs, 'overflow-x', 'auto');
      setImportant(tabs, 'overflow-y', 'hidden');
      setImportant(tabs, 'gap', '7px');
      setImportant(tabs, 'padding', '1px 1px 8px');
      setImportant(tabs, 'scroll-snap-type', 'x proximity');
      setImportant(tabs, 'scrollbar-width', 'none');
    });

    root.querySelectorAll('.chart-tabs button, .chart-tab, .evo-range-tabs button, .selic-range-tabs button, .ipca-range-tabs button').forEach(btn => {
      setImportant(btn, 'flex', '0 0 auto');
      setImportant(btn, 'min-width', '72px');
      setImportant(btn, 'min-height', '34px');
      setImportant(btn, 'padding', '0 12px');
      setImportant(btn, 'font-size', '.66rem');
      setImportant(btn, 'border-radius', '12px');
    });
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply);
  else apply();

  window.addEventListener('resize', () => requestAnimationFrame(apply), { passive:true });
  [250, 800, 1600, 2600].forEach(ms => setTimeout(apply, ms));

  const target = document.getElementById('sec-graficos') || document.getElementById('sec-graficos-body');
  if(target && 'MutationObserver' in window){
    const obs = new MutationObserver(() => {
      clearTimeout(window.__inflationRatesCleanV338Timer);
      window.__inflationRatesCleanV338Timer = setTimeout(apply, 80);
    });
    obs.observe(target, { childList:true, subtree:true, characterData:true });
  }
})();


/* ════════════════════════════════════════════════════
   v339 — gráficos Inflação/Juros: tabs, cards e eixo X
   - Restaura botões em carrossel horizontal.
   - Adiciona 12M quando ausente.
   - Corrige chips Máxima/Mínima.
   - Força eixo X horizontal nos charts.
   - Atualiza título IPCA conforme prazo escolhido.
════════════════════════════════════════════════════ */
(function chartsTabsFixV339(){
  function setImportant(el, prop, val){
    if(el) el.style.setProperty(prop, val, 'important');
  }

  function normalizeRangeLabel(raw){
    const r = String(raw || '').toLowerCase();
    if(r.includes('12')) return 'últimos 12 meses';
    if(r.includes('24')) return 'últimos 24 meses';
    if(r.includes('36')) return 'últimos 36 meses';
    if(r.includes('1a') || r === '1' || r === 'year') return 'últimos 12 meses';
    if(r.includes('2a')) return 'últimos 24 meses';
    if(r.includes('5a')) return 'últimos 5 anos';
    if(r.includes('10a')) return 'últimos 10 anos';
    if(r.includes('hist')) return 'histórico';
    return 'período selecionado';
  }

  function inferRangeFromButton(btn){
    return btn?.dataset?.range
      || btn?.dataset?.ipcaRange
      || btn?.dataset?.selicRange
      || btn?.dataset?.months
      || btn?.textContent
      || '';
  }

  function updateIpcaTitle(range){
    const title = document.getElementById('chartIpcaTitle');
    if(!title) return;
    title.textContent = `🎯 IPCA mensal — ${normalizeRangeLabel(range)}`;
  }

  function ensure12MButtons(){
    // v342: 12M removido por redundância/bug; não reinserir.
    return;
  }

  function fixTabs(){
    const root = document.getElementById('sec-graficos') || document;
    root.querySelectorAll('.chart-tabs, .evo-range-tabs, .selic-range-tabs, .ipca-range-tabs').forEach(tabs => {
      setImportant(tabs, 'display', 'flex');
      setImportant(tabs, 'flex-wrap', 'nowrap');
      setImportant(tabs, 'overflow-x', 'auto');
      setImportant(tabs, 'overflow-y', 'hidden');
      setImportant(tabs, 'justify-content', 'flex-start');
      setImportant(tabs, 'gap', '8px');
      setImportant(tabs, 'padding', '1px 1px 8px');
      setImportant(tabs, 'scrollbar-width', 'none');
    });

    root.querySelectorAll('.chart-tabs button, .chart-tab, .evo-range-tabs button, .selic-range-tabs button, .ipca-range-tabs button').forEach(btn => {
      setImportant(btn, 'flex', '0 0 auto');
      setImportant(btn, 'width', 'auto');
      setImportant(btn, 'min-width', '68px');
      setImportant(btn, 'max-width', 'none');
      setImportant(btn, 'white-space', 'nowrap');
      setImportant(btn, 'min-height', '34px');
      setImportant(btn, 'padding', '0 12px');
      setImportant(btn, 'font-size', '.66rem');
    });
  }

  function fixSummaryChips(){
    const root = document.getElementById('sec-graficos') || document;

    root.querySelectorAll('#selicSummaryRow .selic-summary-chip, #ipcaSummaryRowV250 .ipca-summary-chip-v250').forEach(chip => {
      setImportant(chip, 'display', 'grid');
      setImportant(chip, 'grid-template-columns', '1fr');
      setImportant(chip, 'gap', '5px');
      setImportant(chip, 'align-items', 'start');
      setImportant(chip, 'min-height', '64px');
      setImportant(chip, 'height', 'auto');
      setImportant(chip, 'overflow', 'visible');
      setImportant(chip, 'padding', '10px 11px');
    });

    root.querySelectorAll('#selicSummaryRow .selic-summary-text, #ipcaSummaryRowV250 .ipca-summary-text-v250').forEach(txt => {
      setImportant(txt, 'display', 'flex');
      setImportant(txt, 'flex-direction', 'column');
      setImportant(txt, 'align-items', 'flex-start');
      setImportant(txt, 'gap', '4px');
      setImportant(txt, 'min-width', '0');
      setImportant(txt, 'width', '100%');
      setImportant(txt, 'line-height', '1.12');
    });

    root.querySelectorAll('#selicSummaryRow .selic-summary-chip span, #selicSummaryRow .selic-summary-chip small, #selicSummaryRow .selic-summary-chip strong, #ipcaSummaryRowV250 .ipca-summary-chip-v250 span, #ipcaSummaryRowV250 .ipca-summary-chip-v250 small, #ipcaSummaryRowV250 .ipca-summary-chip-v250 strong').forEach(el => {
      setImportant(el, 'position', 'static');
      setImportant(el, 'display', 'block');
      setImportant(el, 'white-space', 'normal');
      setImportant(el, 'line-height', '1.15');
      setImportant(el, 'max-width', '100%');
      setImportant(el, 'overflow', 'visible');
      setImportant(el, 'text-overflow', 'clip');
    });
  }

  function fixChartXAxis(chart){
    if(!chart?.options?.scales?.x?.ticks) return;
    const ticks = chart.options.scales.x.ticks;
    ticks.maxRotation = 0;
    ticks.minRotation = 0;
    ticks.autoSkip = true;
    ticks.maxTicksLimit = window.innerWidth <= 768 ? 5 : 10;
    chart.update('none');
  }

  function fixAllCharts(){
    if(!window.Chart) return;
    ['chartSelic', 'chartIpca', 'chartIpca12m', 'chartDolar', 'evoChartSelic', 'evoChartIpca', 'evoChartMeta'].forEach(id => {
      const canvas = document.getElementById(id);
      if(!canvas) return;
      const chart = Chart.getChart(canvas);
      if(chart) fixChartXAxis(chart);
    });
  }

  function bindTitleUpdates(){
    if(window.__chartsTabsFixV339Bound) return;
    window.__chartsTabsFixV339Bound = true;

    document.addEventListener('click', ev => {
      const btn = ev.target.closest('#sec-graficos .chart-tabs button, #sec-graficos .chart-tab, #sec-graficos .evo-range-tabs button, #sec-graficos .selic-range-tabs button, #sec-graficos .ipca-range-tabs button');
      if(!btn) return;
      const range = inferRangeFromButton(btn);
      setTimeout(() => {
        updateIpcaTitle(range);
        fixAllCharts();
      }, 120);
      setTimeout(fixAllCharts, 500);
    }, { passive:true });
  }

  function apply(){
    ensure12MButtons();
    fixTabs();
    fixSummaryChips();
    fixAllCharts();

    const activeIpca = document.querySelector('#sec-graficos .ipca-range-tabs .active, #sec-graficos [data-ipca-range].active, #sec-graficos #chartIpcaTitle')?.closest?.('button');
    updateIpcaTitle(inferRangeFromButton(activeIpca) || '24m');
    bindTitleUpdates();
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply);
  else apply();

  window.addEventListener('resize', () => requestAnimationFrame(apply), { passive:true });
  [250, 800, 1600, 2800].forEach(ms => setTimeout(apply, ms));

  // v340: MutationObserver removido.
  // Motivo: a própria função apply() altera estilos/atributos e isso gerava loop de mutações/piscadas.
})();


/* ════════════════════════════════════════════════════
   v340 — correção do loop/pisca em Inflação e Juros
   Diagnóstico:
   - v339 criou MutationObserver em #sec-graficos;
   - apply() alterava style/atributos;
   - o MutationObserver chamava apply() de novo;
   - resultado: mutações contínuas, tela piscando e pulando.
════════════════════════════════════════════════════ */
(function chartsLoopFixV340(){
  function safeChartUpdate(chart){
    if(!chart || typeof chart.update !== 'function') return;
    const canvas = chart.canvas || chart.ctx?.canvas;
    if(!canvas || !canvas.isConnected || !canvas.ownerDocument) return;
    try{ chart.update('none'); }catch(err){ console.warn('[v340] chart.update ignorado:', err?.message || err); }
  }

  function safeFixCharts(){
    if(!window.Chart) return;
    ['chartSelic', 'chartIpca', 'chartIpca12m', 'chartDolar', 'evoChartSelic', 'evoChartIpca', 'evoChartMeta'].forEach(id => {
      const canvas = document.getElementById(id);
      if(!canvas || !canvas.isConnected) return;
      const chart = Chart.getChart(canvas);
      if(!chart?.options?.scales?.x?.ticks) return;
      const ticks = chart.options.scales.x.ticks;
      ticks.maxRotation = 0;
      ticks.minRotation = 0;
      ticks.autoSkip = true;
      ticks.maxTicksLimit = window.innerWidth <= 768 ? 5 : 10;
      safeChartUpdate(chart);
    });
  }

  function stabilize(){
    // Reaplica só uma vez, sem observador de mutações.
    document.documentElement.classList.add('charts-loop-stable-v340');
    safeFixCharts();
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', stabilize);
  else stabilize();

  window.addEventListener('resize', () => requestAnimationFrame(safeFixCharts), { passive:true });
  document.addEventListener('click', ev => {
    if(ev.target.closest('#sec-graficos .chart-tab, #sec-graficos .chart-tabs button, #sec-graficos .evo-range-tabs button, #sec-graficos .selic-range-tabs button, #sec-graficos .ipca-range-tabs button')){
      setTimeout(safeFixCharts, 160);
      setTimeout(safeFixCharts, 500);
    }
  }, { passive:true });
})();


/* ════════════════════════════════════════════════════
   ELTAUM_EVO_DASHBOARD_INDICATORS_SVG_20260620_v378
   Garante que o badge #lastUpdate não fique perdido no corpo da tela.
   Move para o bloco correto do header e impede reinserções erradas.
════════════════════════════════════════════════════ */
(function headerUpdateFixV374(){
  const BUILD = 'ELTAUM_RATES_CLEAN_DASHBOARD_20260620_v399';
  window.__ELTAUM_HEADER_UPDATE_FIX_V374__ = { build: BUILD };

  function qs(sel, root=document){ return root.querySelector(sel); }

  function ensureHost(){
    let host = qs('.header-update-host-v374');
    if(host) return host;

    // Preferências de encaixe: onde já ficam metadados do cabeçalho.
    const shell =
      qs('.header-data-status-v344') ||
      qs('.header-metadata-v344') ||
      qs('.header-meta') ||
      qs('.header-actions') ||
      qs('.topbar-actions') ||
      qs('.app-header') ||
      qs('header');

    host = document.createElement('span');
    host.className = 'header-update-host-v374';
    host.setAttribute('aria-label', 'Status de atualização dos dados');

    if(shell){
      shell.appendChild(host);
    }else if(document.body){
      document.body.prepend(host);
    }

    return host;
  }

  function normalizeLastUpdate(){
    try{
      document.documentElement.classList.add('header-update-fix-v374');

      const meta = qs('meta[name="app-build"]');
      if(meta) meta.content = BUILD;

      const last = qs('#lastUpdate');
      if(!last) return;

      const host = ensureHost();
      if(last.parentElement !== host){
        host.appendChild(last);
      }

      last.classList.add('header-update-v374');
      last.style.position = '';
      last.style.left = '';
      last.style.right = '';
      last.style.top = '';
      last.style.bottom = '';
      last.style.transform = '';
      last.style.float = '';

      const label = qs('.live-update-label', last);
      if(label && label.textContent.trim() !== 'Atualizado ·'){
        label.textContent = 'Atualizado ·';
      }
    }catch(e){}
  }

  function boot(){
    normalizeLastUpdate();

    [80, 200, 500, 1000, 1800, 3000, 5200].forEach(ms => {
      setTimeout(normalizeLastUpdate, ms);
    });

    try{
      const obs = new MutationObserver(() => normalizeLastUpdate());
      obs.observe(document.body || document.documentElement, { childList:true, subtree:true });
      window.__ELTAUM_HEADER_UPDATE_FIX_V374__.observer = obs;
      window.__ELTAUM_HEADER_UPDATE_FIX_V374__.sync = normalizeLastUpdate;
    }catch(e){}
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', boot, {once:true});
  }else{
    boot();
  }
})();

/* PATCH v384 — proteção leve contra deslocamento horizontal */
(function overflowZoomGuardV384(){
  const BUILD = 'ELTAUM_RATES_CLEAN_DASHBOARD_20260620_v399';
  window.__ELTAUM_OVERFLOW_ZOOM_FIX_V384__ = { build: BUILD };

  function guard(){
    try{
      document.documentElement.classList.add('evo-overflow-zoom-fix-v384');

      // Se algum componente causar scroll horizontal, volta para a origem.
      if(window.scrollX && Math.abs(window.scrollX) > 0){
        window.scrollTo({ left:0, top:window.scrollY, behavior:'auto' });
      }

      // Diagnóstico apenas no console, não altera zoom do usuário.
      const approxZoom = Math.round((window.devicePixelRatio || 1) * 100);
      if(approxZoom < 50 && !window.__ELTAUM_ZOOM_WARNED_V384__){
        window.__ELTAUM_ZOOM_WARNED_V384__ = true;
        console.warn('[v384] Zoom do navegador parece muito baixo:', approxZoom + '%. Use Ctrl+0 para voltar a 100%.');
      }
    }catch(e){}
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', guard, {once:true});
  }else{
    guard();
  }

  window.addEventListener('resize', guard, {passive:true});
  window.addEventListener('scroll', () => {
    if(window.scrollX && Math.abs(window.scrollX) > 0) guard();
  }, {passive:true});
})();

/* PATCH v407 — Selic mobile-first: sparkline específico para celular
   Objetivo: parar de encolher o gráfico desktop no mobile. No celular, ocultamos eixos/grades,
   mostramos apenas a curva, os pontos-chave e um rodapé legível com período + taxa atual. */
(function(){
  const originalRenderSelic = window.econRenderSelicLegacyV380;
  if(typeof originalRenderSelic !== 'function') return;

  function fmtPct(v){
    const n = Number(v);
    if(!Number.isFinite(n)) return '—';
    return n.toFixed(2).replace('.', ',') + '%';
  }

  function renderMobileSelicV407(containerId, rows, range){
    const el = document.getElementById(containerId);
    if(!el) return;

    const visibleRows = (typeof econSelicVisibleRowsV381 === 'function')
      ? econSelicVisibleRowsV381(rows || [], range)
      : (rows || []);

    const data = visibleRows
      .filter(x => Number.isFinite(Number(x._valor)) && x._dt)
      .sort((a,b) => (a._ts || +a._dt) - (b._ts || +b._dt))
      .map(x => ({
        value: Number(x._valor),
        date: x._dt,
        label: (typeof econLabelMonthV378 === 'function') ? econLabelMonthV378(x._dt) : '',
        contextOnly: !!x._periodContextOnly
      }));

    if(data.length < 2){
      el.innerHTML = '<div class="econ-empty-v367">Histórico indisponível no momento.</div>';
      return;
    }

    const width = 720;
    const height = 188;
    const left = 16;
    const right = 16;
    const topPad = 18;
    const bottomPad = 18;
    const plotW = width - left - right;
    const plotH = height - topPad - bottomPad;

    const kpiData = data.filter(d => !d.contextOnly);
    const kpiValues = kpiData.length ? kpiData.map(d => d.value) : data.map(d => d.value);
    const allValues = data.map(d => d.value);
    const maxValue = Math.max(...allValues);
    const minValue = Math.min(...allValues);
    const amplitude = Math.max(.01, maxValue - minValue);

    // Escala com respiro: no mobile interessa a forma, não o eixo completo.
    let top = maxValue + Math.max(.45, amplitude * .18);
    let lo = Math.max(0, minValue - Math.max(.45, amplitude * .18));
    if(range === 'all'){
      // Histórico preserva o zero para mostrar a dimensão real dos extremos.
      lo = 0;
      top = Math.max(16, Math.ceil((maxValue + 1) / 5) * 5);
    }

    const yFor = v => topPad + ((top - v) / (top - lo || 1)) * plotH;
    const xFor = i => left + (i / (data.length - 1)) * plotW;
    const points = data.map((d, i) => `${xFor(i).toFixed(1)},${yFor(d.value).toFixed(1)}`).join(' ');
    const area = `${left},${yFor(lo).toFixed(1)} ${points} ${left + plotW},${yFor(lo).toFixed(1)}`;

    const maxPeriodValue = Math.max(...kpiValues);
    const minPeriodValue = Math.min(...kpiValues);
    const maxIdx = data.findIndex(d => !d.contextOnly && d.value === maxPeriodValue);
    const minIdx = data.findIndex(d => !d.contextOnly && d.value === minPeriodValue);
    const lastIdx = data.length - 1;
    const last = data[lastIdx];

    function dot(idx, cls, r, title){
      if(idx < 0 || idx >= data.length) return '';
      const d = data[idx];
      return `<circle class="${cls}" cx="${xFor(idx).toFixed(1)}" cy="${yFor(d.value).toFixed(1)}" r="${r}"><title>${title}</title></circle>`;
    }

    const periodStart = (kpiData[0] || data[0]).label;
    const periodEnd = (kpiData[kpiData.length - 1] || last).label;
    const atual = `${fmtPct(last.value)} a.a.`;

    el.innerHTML = `
      <svg class="econ-selic-mobile-svg-v407" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" aria-label="Trajetória da Selic meta em versão compacta para celular">
        <rect class="plot-bg" x="${left}" y="${topPad}" width="${plotW}" height="${plotH}" rx="18"></rect>
        <line class="mobile-ref-line" x1="${left}" y1="${yFor(last.value).toFixed(1)}" x2="${left + plotW}" y2="${yFor(last.value).toFixed(1)}"></line>
        <polygon class="area" points="${area}"></polygon>
        <polyline class="main-line" points="${points}" fill="none"></polyline>
        ${dot(maxIdx, 'dot max', 6.4, `Máxima · ${fmtPct(maxPeriodValue)} a.a.`)}
        ${dot(minIdx, 'dot min', 6.0, `Mínima · ${fmtPct(minPeriodValue)} a.a.`)}
        ${dot(lastIdx, 'dot current', 7.2, `Atual · ${atual}`)}
      </svg>
      <div class="econ-selic-mobile-summary-v407" aria-hidden="true">
        <span>${periodStart}</span>
        <span>${periodEnd}</span>
      </div>
    `;
  }

  window.econRenderSelicLegacyV380 = function(containerId, rows, range){
    const isMobile = window.matchMedia && window.matchMedia('(max-width: 700px)').matches;
    if(isMobile) return renderMobileSelicV407(containerId, rows, range);
    return originalRenderSelic.apply(this, arguments);
  };

  window.addEventListener('resize', function(){
    clearTimeout(window.__selicMobileV407ResizeT);
    window.__selicMobileV407ResizeT = setTimeout(function(){
      try{
        if(typeof econRenderTargetV378 === 'function') econRenderTargetV378('selic');
      }catch(e){}
    }, 180);
  }, {passive:true});
})();

/* PATCH v424 — marcador final para evitar overwrite por rotinas antigas */
(function(){
  function syncFinalBuildV424(){
    try{
      document.documentElement.classList.add('mobile-v424','dolar-months-clean-v424');
      const meta = document.querySelector('meta[name="app-build"]');
      if(meta) meta.content = 'ELTAUM_DOLAR_MONTHS_CLEAN_v424';
      if(window.__ELTAUM_DOLAR_MONTHS_CLEAN_V424__?.sync){
        window.__ELTAUM_DOLAR_MONTHS_CLEAN_V424__.sync();
      }
    }catch(_error){}
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', syncFinalBuildV424, {once:true});
  }else{
    syncFinalBuildV424();
  }

  window.addEventListener('load', syncFinalBuildV424, {once:true});
  setTimeout(syncFinalBuildV424, 3200);
})();

/* PATCH v425 — Juros e CDI: Copom/CDI mensal em carrosseis padronizados */
(function(){
  const BUILD = 'ELTAUM_RATES_COPOM_CDI_CAROUSELS_v425';

  function syncRatesCarouselsV425(){
    try{
      document.documentElement.classList.add('mobile-v425','rates-copom-cdi-carousels-v425');
      const meta = document.querySelector('meta[name="app-build"]');
      if(meta) meta.content = BUILD;

      const copomHint = document.getElementById('copomScrollHintV413');
      if(copomHint) copomHint.textContent = '';

      const cdiBox = document.getElementById('cdiYearHistory');
      if(cdiBox){
        cdiBox.removeAttribute('hidden');
        cdiBox.removeAttribute('aria-hidden');
      }

      const setImportant = (el, prop, val) => {
        if(el) el.style.setProperty(prop, val, 'important');
      };

      document
        .querySelectorAll('#sec-mercado #copomExecutiveSummaryV270, #sec-mercado #cdiMonthCarouselV322')
        .forEach(track => {
          setImportant(track, 'display', 'flex');
          setImportant(track, 'gap', '9px');
          setImportant(track, 'padding-left', '0');
          setImportant(track, 'padding-right', '28px');
          setImportant(track, 'overflow-x', 'auto');
          setImportant(track, 'overflow-y', 'hidden');
          setImportant(track, 'scroll-snap-type', 'x proximity');
        });

      document
        .querySelectorAll('#sec-mercado #copomExecutiveSummaryV270 > article, #sec-mercado #cdiMonthCarouselV322 > .cdi-month-card-v322')
        .forEach(card => {
          setImportant(card, 'flex', '0 0 112px');
          setImportant(card, 'width', '112px');
          setImportant(card, 'min-width', '112px');
          setImportant(card, 'max-width', '112px');
          setImportant(card, 'box-sizing', 'border-box');
        });
    }catch(_error){}
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', syncRatesCarouselsV425, {once:true});
  }else{
    syncRatesCarouselsV425();
  }

  window.addEventListener('load', syncRatesCarouselsV425, {once:true});
  window.addEventListener('resize', () => requestAnimationFrame(syncRatesCarouselsV425), {passive:true});
  setTimeout(syncRatesCarouselsV425, 450);
  setTimeout(syncRatesCarouselsV425, 1500);
  setTimeout(syncRatesCarouselsV425, 3400);

  window.__ELTAUM_RATES_COPOM_CDI_CAROUSELS_V425__ = {
    build: BUILD,
    sync: syncRatesCarouselsV425
  };
})();

/* PATCH v426 — Juros e CDI: tres cards visiveis por tela */
(function(){
  const BUILD = 'ELTAUM_RATES_THREE_VISIBLE_v426';

  function syncRatesThreeVisibleV426(){
    try{
      document.documentElement.classList.add('mobile-v426','rates-three-visible-v426');
      const meta = document.querySelector('meta[name="app-build"]');
      if(meta) meta.content = BUILD;

      const setImportant = (el, prop, val) => {
        if(el) el.style.setProperty(prop, val, 'important');
      };

      document
        .querySelectorAll('#sec-mercado #copomExecutiveSummaryV270, #sec-mercado #cdiMonthCarouselV322')
        .forEach(track => {
          setImportant(track, 'gap', '8px');
          setImportant(track, 'padding-left', '0');
          setImportant(track, 'padding-right', '14px');
          setImportant(track, 'overflow-x', 'auto');
          setImportant(track, 'scroll-snap-type', 'x proximity');
        });

      const width = 'calc((100% - 16px) / 3)';
      document
        .querySelectorAll('#sec-mercado #copomExecutiveSummaryV270 > article, #sec-mercado #cdiMonthCarouselV322 > .cdi-month-card-v322')
        .forEach(card => {
          setImportant(card, 'flex', `0 0 ${width}`);
          setImportant(card, 'width', width);
          setImportant(card, 'min-width', width);
          setImportant(card, 'max-width', width);
          setImportant(card, 'box-sizing', 'border-box');
        });
    }catch(_error){}
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', syncRatesThreeVisibleV426, {once:true});
  }else{
    syncRatesThreeVisibleV426();
  }

  window.addEventListener('load', syncRatesThreeVisibleV426, {once:true});
  window.addEventListener('resize', () => requestAnimationFrame(syncRatesThreeVisibleV426), {passive:true});
  setTimeout(syncRatesThreeVisibleV426, 520);
  setTimeout(syncRatesThreeVisibleV426, 1650);
  setTimeout(syncRatesThreeVisibleV426, 3600);

  window.__ELTAUM_RATES_THREE_VISIBLE_V426__ = {
    build: BUILD,
    sync: syncRatesThreeVisibleV426
  };
})();

/* PATCH v427 — Juros e CDI: remove conflitos legados e fixa 3 cards */
(function(){
  const BUILD = 'ELTAUM_RATES_HARD_THREE_v427';
  let observerStarted = false;

  function setImportant(el, prop, val){
    if(el) el.style.setProperty(prop, val, 'important');
  }

  function forceThreeCardsV427(){
    try{
      const root = document.documentElement;
      root.classList.add('mobile-v427','rates-hard-three-v427');
      root.classList.remove('mobile-rates-final-v352','mobile-v414','mobile-v413');

      const meta = document.querySelector('meta[name="app-build"]');
      if(meta) meta.content = BUILD;

      const sec = document.getElementById('sec-mercado');
      if(sec) sec.classList.add('rates-hard-three-v427');

      document.querySelectorAll('#sec-mercado .copom-scroll-hint-v413').forEach(el => el.remove());

      const cdiBox = document.getElementById('cdiYearHistory');
      if(cdiBox){
        cdiBox.removeAttribute('hidden');
        cdiBox.removeAttribute('aria-hidden');
        setImportant(cdiBox, 'display', 'block');
        setImportant(cdiBox, 'visibility', 'visible');
        setImportant(cdiBox, 'height', 'auto');
        setImportant(cdiBox, 'max-height', 'none');
        setImportant(cdiBox, 'overflow', 'hidden');
        setImportant(cdiBox, 'margin', '12px 0 0');
        setImportant(cdiBox, 'padding', '11px 10px 13px');
      }

      const oldCdi = document.getElementById('cdiMobileReadableV352');
      if(oldCdi){
        oldCdi.setAttribute('aria-hidden','true');
        try{ oldCdi.inert = true; }catch(_error){}
        setImportant(oldCdi, 'display', 'none');
        setImportant(oldCdi, 'height', '0');
        setImportant(oldCdi, 'max-height', '0');
        setImportant(oldCdi, 'overflow', 'hidden');
      }

      document
        .querySelectorAll('#sec-mercado #copomExecutiveSummaryV270, #sec-mercado #cdiMonthCarouselV322')
        .forEach(track => {
          setImportant(track, 'display', 'flex');
          setImportant(track, 'flex-wrap', 'nowrap');
          setImportant(track, 'gap', '8px');
          setImportant(track, 'padding-left', '0');
          setImportant(track, 'padding-right', '0');
          setImportant(track, 'overflow-x', 'auto');
          setImportant(track, 'overflow-y', 'hidden');
          setImportant(track, 'scroll-snap-type', 'x proximity');
          setImportant(track, 'scrollbar-width', 'none');
        });

      const width = 'calc((100% - 16px) / 3)';
      document
        .querySelectorAll('#sec-mercado #copomExecutiveSummaryV270 > article, #sec-mercado #cdiMonthCarouselV322 > .cdi-month-card-v322')
        .forEach(card => {
          setImportant(card, 'flex', `0 0 ${width}`);
          setImportant(card, 'width', width);
          setImportant(card, 'min-width', width);
          setImportant(card, 'max-width', width);
          setImportant(card, 'box-sizing', 'border-box');
          setImportant(card, 'min-height', '66px');
          setImportant(card, 'padding', '8px 6px 8px 9px');
        });

      if(!observerStarted){
        observerStarted = true;
        const targets = [
          document.getElementById('copomExecutiveSummaryV270'),
          document.getElementById('cdiMonthCarouselV322'),
          document.getElementById('cdiYearHistory')
        ].filter(Boolean);

        const obs = new MutationObserver(() => {
          requestAnimationFrame(forceThreeCardsV427);
        });
        targets.forEach(target => obs.observe(target, {
          childList:true,
          subtree:true,
          attributes:true,
          attributeFilter:['style','class','hidden','aria-hidden']
        }));
        window.__ELTAUM_RATES_HARD_THREE_OBSERVER_V427__ = obs;
      }
    }catch(_error){}
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', forceThreeCardsV427, {once:true});
  }else{
    forceThreeCardsV427();
  }

  window.addEventListener('load', forceThreeCardsV427, {once:true});
  window.addEventListener('resize', () => requestAnimationFrame(forceThreeCardsV427), {passive:true});
  [350, 800, 1400, 2400, 4200, 6500].forEach(ms => setTimeout(forceThreeCardsV427, ms));

  window.__ELTAUM_RATES_HARD_THREE_V427__ = {
    build: BUILD,
    sync: forceThreeCardsV427
  };
})();

/* PATCH v428 — Juros e CDI: limpeza semantica dos textos */
(function(){
  const BUILD = 'ELTAUM_RATES_SEMANTIC_CLEAN_v428';

  function syncRatesSemanticCleanV428(){
    try{
      document.documentElement.classList.add('mobile-v428','rates-semantic-clean-v428');
      const meta = document.querySelector('meta[name="app-build"]');
      if(meta) meta.content = BUILD;

      const cdiTitle = document.getElementById('cdiYearHistoryTitle');
      if(cdiTitle){
        cdiTitle.textContent = cdiTitle.textContent
          .replace(/CDI\s+—\s+vis[aã]o mensal/i, 'CDI mensal')
          .replace(/\s+/g, ' ')
          .trim();
      }

      document.querySelectorAll('#sec-mercado #copomExecutiveSummaryV270 .copom-exec-kicker-v270').forEach(el => {
        el.textContent = el.textContent.replace(/\s*reuni[aã]o\b/i, '').trim();
      });

      document.querySelectorAll('#sec-mercado #cdiMonthCarouselV322 .cdi-month-card-v322').forEach(card => {
        const kicker = card.querySelector('.cdi-month-kicker-v322');
        if(kicker){
          const text = kicker.textContent.trim();
          kicker.textContent = /parcial/i.test(text)
            ? text.replace(/\s*·\s*fechado/i, '').replace(/\s+/g, ' ')
            : text.replace(/\s*·\s*fechado/i, '').trim();
        }

        const accum = card.querySelector('.cdi-month-accum-v322');
        if(accum){
          accum.textContent = accum.textContent.replace(/^Acum\.\s*ano/i, 'Ano').replace(/\s+/g, ' ').trim();
        }
      });
    }catch(_error){}
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', syncRatesSemanticCleanV428, {once:true});
  }else{
    syncRatesSemanticCleanV428();
  }

  window.addEventListener('load', syncRatesSemanticCleanV428, {once:true});
  [500, 1200, 2600, 4600, 7000, 9200].forEach(ms => setTimeout(syncRatesSemanticCleanV428, ms));

  window.__ELTAUM_RATES_SEMANTIC_CLEAN_V428__ = {
    build: BUILD,
    sync: syncRatesSemanticCleanV428
  };
})();

/* PATCH v429 — Juros e CDI: Copom e CDI mensal com cards internos borderless */
(function(){
  const BUILD = 'ELTAUM_RATES_BORDERLESS_CAROUSELS_v429';

  function setImportant(el, prop, val){
    if(el) el.style.setProperty(prop, val, 'important');
  }

  function syncRatesBorderlessCarouselsV429(){
    try{
      document.documentElement.classList.add('mobile-v429','rates-borderless-carousel-v429');
      const meta = document.querySelector('meta[name="app-build"]');
      if(meta) meta.content = BUILD;

      document
        .querySelectorAll('#sec-mercado #copomExecutiveSummaryV270 > article, #sec-mercado #cdiMonthCarouselV322 > .cdi-month-card-v322')
        .forEach(card => {
          setImportant(card, 'background', 'transparent');
          setImportant(card, 'border', '0');
          setImportant(card, 'outline', '0');
          setImportant(card, 'box-shadow', 'none');
        });

      document
        .querySelectorAll('#sec-mercado #cdiMonthCarouselV322 > .cdi-month-card-v322')
        .forEach(card => {
          setImportant(card, 'padding-left', '6px');
          setImportant(card, 'padding-right', '6px');
        });
    }catch(_error){}
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', syncRatesBorderlessCarouselsV429, {once:true});
  }else{
    syncRatesBorderlessCarouselsV429();
  }

  window.addEventListener('load', syncRatesBorderlessCarouselsV429, {once:true});
  window.addEventListener('resize', () => requestAnimationFrame(syncRatesBorderlessCarouselsV429), {passive:true});
  [600, 1600, 3200, 5200, 7600, 9800].forEach(ms => setTimeout(syncRatesBorderlessCarouselsV429, ms));

  window.__ELTAUM_RATES_BORDERLESS_CAROUSELS_V429__ = {
    build: BUILD,
    sync: syncRatesBorderlessCarouselsV429
  };
})();

/* PATCH v430 — Agenda Copom: mostra apenas movimento em p.p. para corte/alta */
(function(){
  const BUILD = 'ELTAUM_RATES_COPOM_MOVE_v430';

  function extractMoveText(result){
    const text = String(result || '').replace(/\u2212/g, '-').replace(/\s+/g, ' ').trim();
    const match = text.match(/\b(corte|alta)\s*([+-]?\d+(?:[,.]\d+)?\s*p\.?\s*p\.?)/i);
    if(!match) return '';
    const value = match[2]
      .replace(/\s*p\.?\s*p\.?/i, ' p.p.')
      .replace(/^\+?/, match[1].toLowerCase() === 'alta' ? '+' : '');
    return value;
  }

  function syncCopomMoveV430(){
    try{
      document.documentElement.classList.add('mobile-v430','rates-copom-move-v430');
      const meta = document.querySelector('meta[name="app-build"]');
      if(meta) meta.content = BUILD;

      document.querySelectorAll('#sec-mercado #copomExecutiveSummaryV270 > article').forEach(card => {
        const status = card.querySelector('.copom-exec-status-v270');
        const result = card.querySelector('.copom-carousel-result-v321');
        const raw = result?.textContent || '';
        const move = extractMoveText(raw);

        card.querySelectorAll('.copom-move-v430').forEach(el => el.remove());

        if(result){
          result.setAttribute('aria-hidden', move ? 'true' : 'false');
          if(move){
            result.style.setProperty('display', 'none', 'important');
          }
        }

        if(!move || !status) return;

        const el = document.createElement('small');
        el.className = 'copom-move-v430';
        el.textContent = move;
        status.insertAdjacentElement('afterend', el);
      });
    }catch(_error){}
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', syncCopomMoveV430, {once:true});
  }else{
    syncCopomMoveV430();
  }

  window.addEventListener('load', syncCopomMoveV430, {once:true});
  [700, 1700, 3300, 5400, 7800, 10200].forEach(ms => setTimeout(syncCopomMoveV430, ms));

  window.__ELTAUM_RATES_COPOM_MOVE_V430__ = {
    build: BUILD,
    sync: syncCopomMoveV430
  };
})();

/* PATCH v431 — Agenda Copom: movimento em p.p. persistente apos rebuild */
(function(){
  const BUILD = 'ELTAUM_RATES_COPOM_MOVE_PERSISTENT_v431';
  let observerStarted = false;
  let scheduled = false;

  function extractMoveText(result){
    const text = String(result || '').replace(/\u2212/g, '-').replace(/\s+/g, ' ').trim();
    const match = text.match(/\b(corte|alta)\s*([+-]?\d+(?:[,.]\d+)?\s*p\.?\s*p\.?)/i);
    if(!match) return '';
    return match[2]
      .replace(/\s*p\.?\s*p\.?/i, ' p.p.')
      .replace(/^\+?/, match[1].toLowerCase() === 'alta' ? '+' : '');
  }

  function schedule(){
    if(scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      syncCopomMovePersistentV431();
    });
  }

  function syncCard(card){
    const status = card.querySelector('.copom-exec-status-v270');
    const result = card.querySelector('.copom-carousel-result-v321');
    const move = extractMoveText(result?.textContent || '');
    const existing = card.querySelector('.copom-move-v430, .copom-move-v431');

    if(!move){
      card.querySelectorAll('.copom-move-v430, .copom-move-v431').forEach(el => el.remove());
      return;
    }

    if(result){
      result.setAttribute('aria-hidden', 'true');
      result.style.setProperty('display', 'none', 'important');
    }

    if(existing){
      existing.className = 'copom-move-v430 copom-move-v431';
      if(existing.textContent !== move) existing.textContent = move;
      if(status && existing.previousElementSibling !== status){
        status.insertAdjacentElement('afterend', existing);
      }
      card.querySelectorAll('.copom-move-v430, .copom-move-v431').forEach(el => {
        if(el !== existing) el.remove();
      });
      return;
    }

    if(!status) return;
    const el = document.createElement('small');
    el.className = 'copom-move-v430 copom-move-v431';
    el.textContent = move;
    status.insertAdjacentElement('afterend', el);
  }

  function startObserver(summary){
    if(observerStarted || !summary || !window.MutationObserver) return;
    observerStarted = true;
    const target = document.getElementById('sec-mercado') || summary;
    const obs = new MutationObserver(schedule);
    obs.observe(target, {
      childList:true,
      subtree:true
    });
    window.__ELTAUM_RATES_COPOM_MOVE_OBSERVER_V431__ = obs;
  }

  function syncCopomMovePersistentV431(){
    try{
      document.documentElement.classList.add('mobile-v430','rates-copom-move-v430','mobile-v431','rates-copom-move-persistent-v431');
      const meta = document.querySelector('meta[name="app-build"]');
      if(meta) meta.content = BUILD;

      const summary = document.getElementById('copomExecutiveSummaryV270');
      if(!summary) return;
      summary.querySelectorAll(':scope > article').forEach(syncCard);
      startObserver(summary);
    }catch(_error){}
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', syncCopomMovePersistentV431, {once:true});
  }else{
    syncCopomMovePersistentV431();
  }

  window.addEventListener('load', syncCopomMovePersistentV431, {once:true});
  window.addEventListener('pageshow', syncCopomMovePersistentV431, {passive:true});
  [300, 900, 1800, 3600, 6200, 9800, 14000, 22000].forEach(ms => setTimeout(syncCopomMovePersistentV431, ms));

  window.__ELTAUM_RATES_COPOM_MOVE_PERSISTENT_V431__ = {
    build: BUILD,
    sync: syncCopomMovePersistentV431
  };
})();

/* PATCH v432 — Poupanca mobile: hierarquia de KPI e regra mais clara */
(function(){
  const BUILD = 'ELTAUM_SAVINGS_MOBILE_HERO_v432';

  function applySavingsMobileHeroV432(){
    try{
      const root = document.documentElement;
      root.classList.add('mobile-v432','savings-mobile-hero-v432');
      const meta = document.querySelector('meta[name="app-build"]');
      if(meta) meta.content = BUILD;

      const label = document.getElementById('poupCurrentLabelV214');
      if(label) label.textContent = 'Rendimento do mês';

      const ruleTitle = document.getElementById('poupCurrentScenarioTitleV214');
      if(ruleTitle) ruleTitle.textContent = 'Regra vigente';

      const yearLabel = document.querySelector('#sec-mercado .savings-summary-v207 .savings-kpi-v199.year dt');
      if(yearLabel) yearLabel.textContent = 'Acumulado 2026';

      const threshold = document.querySelector('#sec-mercado .savings-summary-v207 .savings-kpi-v199.threshold');
      if(threshold){
        const dt = threshold.querySelector('dt');
        const data = threshold.querySelector('data');
        if(dt) dt.textContent = 'Regra atual';
        if(data) data.textContent = 'Selic acima de 8,50%';
      }

      const quick = document.getElementById('poupQuickNote');
      if(quick){
        const raw = quick.textContent.toLowerCase();
        if(raw.includes('aguardando')){
          quick.innerHTML = '<strong>Regra será definida pela Selic vigente</strong><span>O cálculo muda quando a Selic fica em até 8,50% a.a.</span>';
        }else if(raw.includes('70%') || raw.includes('até 8,50') || raw.includes('ate 8,50')){
          quick.innerHTML = '<strong>70% da Selic + TR</strong><span>Enquanto a Selic estiver em até <b class="poup-nowrap-v434">8,50% a.a.</b></span>';
        }else{
          quick.innerHTML = '<strong>TR + 0,50% a.m.</strong><span>Enquanto a Selic estiver acima de <b class="poup-nowrap-v434">8,50% a.a.</b></span>';
        }
      }

      const source = document.querySelector('#sec-mercado .savings-actions-v207 .market-reference-source-v167');
      if(source){
        source.innerHTML = 'Simular rendimento <span aria-hidden="true">↗</span>';
        source.setAttribute('aria-label', 'Abrir simulador de rendimento da poupança do Banco Central em uma nova guia');
      }

      const btn = document.getElementById('poupExpandBtn');
      if(btn){
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.innerHTML = expanded ? 'Ocultar regras <span aria-hidden="true">▴</span>' : 'Ver regras <span aria-hidden="true">▾</span>';
      }
    }catch(_error){}
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', applySavingsMobileHeroV432, {once:true});
  }else{
    applySavingsMobileHeroV432();
  }

  document.addEventListener('click', function(event){
    if(event.target && event.target.closest && event.target.closest('#poupExpandBtn')){
      setTimeout(applySavingsMobileHeroV432, 40);
      setTimeout(applySavingsMobileHeroV432, 220);
    }
  }, true);

  window.addEventListener('load', applySavingsMobileHeroV432, {once:true});
  [400, 1200, 2600, 5200, 9000, 14000, 24500].forEach(ms => setTimeout(applySavingsMobileHeroV432, ms));

  window.__ELTAUM_SAVINGS_MOBILE_HERO_V432__ = {
    build: BUILD,
    sync: applySavingsMobileHeroV432
  };
})();

/* PATCH v433 — Poupanca mobile: microajustes de texto e leitura */
(function(){
  const BUILD = 'ELTAUM_SAVINGS_MOBILE_POLISH_v433';

  function applySavingsMobilePolishV433(){
    try{
      document.documentElement.classList.add('mobile-v433','savings-mobile-polish-v433');
      const meta = document.querySelector('meta[name="app-build"]');
      if(meta) meta.content = BUILD;

      const kicker = document.querySelector('#sec-mercado .savings-reference-v167 .savings-title-v207 .market-reference-kicker-v167');
      if(kicker) kicker.textContent = 'Rendimento';

      const threshold = document.querySelector('#sec-mercado .savings-summary-v207 .savings-kpi-v199.threshold');
      if(threshold){
        const dt = threshold.querySelector('dt');
        const data = threshold.querySelector('data');
        if(dt) dt.textContent = 'Regra atual';
        if(data) data.textContent = 'Selic acima de 8,50%';
      }

      const quick = document.getElementById('poupQuickNote');
      if(quick){
        const raw = quick.textContent.toLowerCase();
        if(raw.includes('70%') || raw.includes('até 8,50') || raw.includes('ate 8,50')){
          quick.innerHTML = '<strong>70% da Selic + TR</strong><span>Enquanto a Selic estiver em até <b class="poup-nowrap-v434">8,50% a.a.</b></span>';
        }else if(raw.includes('aguardando')){
          quick.innerHTML = '<strong>Regra definida pela Selic vigente</strong><span>O cálculo muda quando a Selic fica em até 8,50% a.a.</span>';
        }else{
          quick.innerHTML = '<strong>TR + 0,50% a.m.</strong><span>Enquanto a Selic estiver acima de <b class="poup-nowrap-v434">8,50% a.a.</b></span>';
        }
      }

      const source = document.querySelector('#sec-mercado .savings-actions-v207 .market-reference-source-v167');
      if(source){
        source.innerHTML = 'Simular rendimento <span aria-hidden="true">↗</span>';
      }
    }catch(_error){}
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', applySavingsMobilePolishV433, {once:true});
  }else{
    applySavingsMobilePolishV433();
  }

  document.addEventListener('click', function(event){
    if(event.target && event.target.closest && event.target.closest('#poupExpandBtn')){
      setTimeout(applySavingsMobilePolishV433, 60);
      setTimeout(applySavingsMobilePolishV433, 260);
    }
  }, true);

  window.addEventListener('load', applySavingsMobilePolishV433, {once:true});
  [600, 1600, 3200, 6200, 10200, 15000, 25200].forEach(ms => setTimeout(applySavingsMobilePolishV433, ms));

  window.__ELTAUM_SAVINGS_MOBILE_POLISH_V433__ = {
    build: BUILD,
    sync: applySavingsMobilePolishV433
  };
})();

/* PATCH v434 — Poupanca mobile: estabiliza textos finais sem piscar */
(function(){
  const BUILD = 'ELTAUM_SAVINGS_MOBILE_TEXT_STABLE_v434';
  let observerStarted = false;
  let scheduled = false;

  function applySavingsMobileTextStableV434(){
    try{
      document.documentElement.classList.add('mobile-v434','savings-mobile-text-stable-v434');
      const meta = document.querySelector('meta[name="app-build"]');
      if(meta) meta.content = BUILD;

      const threshold = document.querySelector('#sec-mercado .savings-summary-v207 .savings-kpi-v199.threshold');
      if(threshold){
        const dt = threshold.querySelector('dt');
        const data = threshold.querySelector('data');
        if(dt && dt.textContent !== 'Regra atual') dt.textContent = 'Regra atual';
        if(data && data.textContent !== 'Selic acima de 8,50%') data.textContent = 'Selic acima de 8,50%';
      }

      const quick = document.getElementById('poupQuickNote');
      if(quick){
        const raw = quick.textContent.toLowerCase();
        let html = '';
        if(raw.includes('70%') || raw.includes('até 8,50') || raw.includes('ate 8,50')){
          html = '<strong>70% da Selic + TR</strong><span>Enquanto a Selic estiver em até <b class="poup-nowrap-v434">8,50% a.a.</b></span>';
        }else if(raw.includes('aguardando') || raw.includes('definida')){
          html = '<strong>Regra definida pela Selic vigente</strong><span>O cálculo muda quando a Selic fica em até 8,50% a.a.</span>';
        }else{
          html = '<strong>TR + 0,50% a.m.</strong><span>Enquanto a Selic estiver acima de <b class="poup-nowrap-v434">8,50% a.a.</b></span>';
        }
        if(html && quick.innerHTML !== html) quick.innerHTML = html;
      }

      const source = document.querySelector('#sec-mercado .savings-actions-v207 .market-reference-source-v167');
      if(source && !source.textContent.includes('Simular rendimento')){
        source.innerHTML = 'Simular rendimento <span aria-hidden="true">↗</span>';
      }

      startObserver();
    }catch(_error){}
  }

  function schedule(){
    if(scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      applySavingsMobileTextStableV434();
    });
  }

  function startObserver(){
    if(observerStarted || !window.MutationObserver) return;
    const target = document.querySelector('#sec-mercado .savings-reference-v167');
    if(!target) return;
    observerStarted = true;
    const obs = new MutationObserver(schedule);
    obs.observe(target, {childList:true, subtree:true, characterData:true});
    window.__ELTAUM_SAVINGS_MOBILE_TEXT_STABLE_OBSERVER_V434__ = obs;
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', applySavingsMobileTextStableV434, {once:true});
  }else{
    applySavingsMobileTextStableV434();
  }

  window.addEventListener('load', applySavingsMobileTextStableV434, {once:true});
  [800, 1800, 3600, 7000, 11200, 16000, 26000].forEach(ms => setTimeout(applySavingsMobileTextStableV434, ms));

window.__ELTAUM_SAVINGS_MOBILE_TEXT_STABLE_V434__ = {
    build: BUILD,
    sync: applySavingsMobileTextStableV434
  };
})();

/* PATCH v435 — Mobile: topo compacto e KPIs com icones */
(function(){
  const BUILD = 'ELTAUM_MOBILE_TOP_KPI_ICONS_v435';
  let observerStarted = false;
  let scheduled = false;

  const ICONS = {
    fundos: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 8 4-8 4-8-4 8-4Z"/><path d="m4 12 8 4 8-4"/><path d="m4 17 8 4 8-4"/></svg>',
    pl: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12a9 9 0 1 1-9-9v9h9Z"/><path d="M12 3a9 9 0 0 1 9 9h-9V3Z"/></svg>',
    best: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 17 9 11l4 4 8-8"/><path d="M14 7h7v7"/></svg>',
    worst: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 7 6 6 4-4 8 8"/><path d="M14 17h7v-7"/></svg>'
  };

  function setLabel(cell, text){
    const label = cell?.querySelector(':scope > span:not(.mobile-kpi-icon-v435)');
    if(label && label.textContent.trim() !== text) label.textContent = text;
  }

  function ensureIcon(cell, type){
    if(!cell) return;
    cell.classList.add(`is-${type}-v435`);
    let icon = cell.querySelector(':scope > .mobile-kpi-icon-v435');
    if(!icon){
      icon = document.createElement('span');
      icon.className = 'mobile-kpi-icon-v435';
      icon.setAttribute('aria-hidden','true');
      cell.prepend(icon);
    }
    const html = ICONS[type] || '';
    if(icon.innerHTML !== html) icon.innerHTML = html;
  }

  function applyMobileTopKpiIconsV435(){
    try{
      const html = document.documentElement;
      html.classList.add('mobile-v435','mobile-top-kpi-icons-v435');

      const meta = document.querySelector('meta[name="app-build"]');
      if(meta) meta.content = BUILD;

      const header = document.querySelector('.site-header-clean');
      const status = header?.querySelector('.header-data-status-v343');
      const last = document.getElementById('lastUpdate');
      if(status && last && last.parentElement !== status){
        status.appendChild(last);
      }

      const grid = document.querySelector('#sec-kpi-mobile .mobile-kpi-compact-grid');
      if(grid){
        grid.setAttribute('data-mobile-kpi-icons-v435','1');
        const cells = Array.from(grid.querySelectorAll(':scope > .mobile-kpi-cell'));
        const fundos = cells[0];
        const pl = cells[1];
        const categorias = cells[2];
        const pipeline = cells[3];
        const best = cells[4];
        const worst = cells[5];

        ensureIcon(fundos, 'fundos');
        ensureIcon(pl, 'pl');
        ensureIcon(best, 'best');
        ensureIcon(worst, 'worst');

        setLabel(fundos, 'Fundos');
        setLabel(pl, 'PL');
        setLabel(best, 'Melhor 12M');
        setLabel(worst, 'Pior 12M');

        categorias?.setAttribute('aria-hidden','true');
        pipeline?.setAttribute('aria-hidden','true');
      }

      startObserver();
    }catch(_error){}
  }

  function schedule(){
    if(scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      applyMobileTopKpiIconsV435();
    });
  }

  function startObserver(){
    if(observerStarted || !window.MutationObserver) return;
    const targets = [
      document.querySelector('.site-header-clean'),
      document.getElementById('sec-kpi-mobile')
    ].filter(Boolean);
    if(!targets.length) return;

    observerStarted = true;
    const obs = new MutationObserver(schedule);
    targets.forEach(target => obs.observe(target, {childList:true, subtree:true, characterData:true}));
    window.__ELTAUM_MOBILE_TOP_KPI_ICONS_OBSERVER_V435__ = obs;
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', applyMobileTopKpiIconsV435, {once:true});
  }else{
    applyMobileTopKpiIconsV435();
  }

  window.addEventListener('load', applyMobileTopKpiIconsV435, {once:true});
  [300, 900, 1800, 3600, 7000, 12000, 18000, 27000].forEach(ms => setTimeout(applyMobileTopKpiIconsV435, ms));

  window.__ELTAUM_MOBILE_TOP_KPI_ICONS_V435__ = {
    build: BUILD,
    sync: applyMobileTopKpiIconsV435
  };
})();

/* PATCH v436 — Mobile: header minimalista sem chip na data */
(function(){
  const BUILD = 'ELTAUM_MOBILE_HEADER_MINIMAL_v436';
  let observerStarted = false;
  let scheduled = false;

  function applyMobileHeaderMinimalV436(){
    try{
      const html = document.documentElement;
      html.classList.add('mobile-v436','mobile-header-minimal-v436');

      const meta = document.querySelector('meta[name="app-build"]');
      if(meta) meta.content = BUILD;

      const header = document.querySelector('.site-header-clean');
      const brandText = header?.querySelector('.brand-text');
      const title = brandText?.querySelector('h1');
      const last = document.getElementById('lastUpdate');
      if(brandText && last && last.parentElement !== brandText){
        if(title?.nextSibling){
          brandText.insertBefore(last, title.nextSibling);
        }else{
          brandText.appendChild(last);
        }
      }

      startObserver();
    }catch(_error){}
  }

  function schedule(){
    if(scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      applyMobileHeaderMinimalV436();
    });
  }

  function startObserver(){
    if(observerStarted || !window.MutationObserver) return;
    const header = document.querySelector('.site-header-clean');
    if(!header) return;
    observerStarted = true;
    const obs = new MutationObserver(schedule);
    obs.observe(header, {childList:true, subtree:true});
    window.__ELTAUM_MOBILE_HEADER_MINIMAL_OBSERVER_V436__ = obs;
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', applyMobileHeaderMinimalV436, {once:true});
  }else{
    applyMobileHeaderMinimalV436();
  }

  window.addEventListener('load', applyMobileHeaderMinimalV436, {once:true});
  [300, 900, 1800, 3600, 7000, 12000, 18000, 27000].forEach(ms => setTimeout(applyMobileHeaderMinimalV436, ms));

  window.__ELTAUM_MOBILE_HEADER_MINIMAL_V436__ = {
    build: BUILD,
    sync: applyMobileHeaderMinimalV436
  };
})();

/* PATCH v437 — Mobile: remove wrapper antigo da data e zera topo excedente */
(function(){
  const BUILD = 'ELTAUM_MOBILE_HEADER_TIGHT_v437';
  let observerStarted = false;
  let scheduled = false;

  function disableLegacyHeaderObserver(){
    try{
      const legacy = window.__ELTAUM_HEADER_UPDATE_FIX_V374__;
      if(legacy?.observer && typeof legacy.observer.disconnect === 'function'){
        legacy.observer.disconnect();
      }
      if(legacy){
        legacy.sync = function(){};
        legacy.disabledByV437 = true;
      }
    }catch(_error){}
  }

  function unwrapLegacyHost(){
    const header = document.querySelector('.site-header-clean');
    const brandText = header?.querySelector('.brand-text');
    const title = brandText?.querySelector('h1');
    const last = document.getElementById('lastUpdate');
    if(!brandText || !last) return;

    last.classList.remove('header-update-v374');
    last.removeAttribute('style');

    if(last.parentElement !== brandText){
      if(title?.nextSibling){
        brandText.insertBefore(last, title.nextSibling);
      }else{
        brandText.appendChild(last);
      }
    }

    document.querySelectorAll('.header-update-host-v374').forEach(host => {
      if(!host.contains(last) && !host.textContent.trim()) host.remove();
    });
  }

  function applyMobileHeaderTightV437(){
    try{
      document.documentElement.classList.add('mobile-v437','mobile-header-tight-v437');
      const meta = document.querySelector('meta[name="app-build"]');
      if(meta) meta.content = BUILD;
      disableLegacyHeaderObserver();
      unwrapLegacyHost();
      startObserver();
    }catch(_error){}
  }

  function schedule(){
    if(scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      applyMobileHeaderTightV437();
    });
  }

  function startObserver(){
    if(observerStarted || !window.MutationObserver) return;
    const header = document.querySelector('.site-header-clean');
    if(!header) return;
    observerStarted = true;
    const obs = new MutationObserver(schedule);
    obs.observe(header, {childList:true, subtree:true, attributes:true, attributeFilter:['class','style']});
    window.__ELTAUM_MOBILE_HEADER_TIGHT_OBSERVER_V437__ = obs;
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', applyMobileHeaderTightV437, {once:true});
  }else{
    applyMobileHeaderTightV437();
  }

  window.addEventListener('load', applyMobileHeaderTightV437, {once:true});
  [50, 120, 260, 600, 1100, 2200, 4200, 6500, 10000, 16000, 26000].forEach(ms => setTimeout(applyMobileHeaderTightV437, ms));

  window.__ELTAUM_MOBILE_HEADER_TIGHT_V437__ = {
    build: BUILD,
    sync: applyMobileHeaderTightV437
  };
})();

/* PATCH v439 — Mobile: data visual dentro da mesma linha do titulo
   PATCH v483 — Desktop limpo: não injeta a data no H1 fora do mobile */
(function(){
  const BUILD = 'ELTAUM_MOBILE_HEADER_DATE_IN_TITLE_v439_DESKTOP_CLEAN_v483';
  const MOBILE_QUERY = '(max-width: 768px)';
  let observerStarted = false;
  let scheduled = false;

  function isMobileHeaderMode(){
    return !!(window.matchMedia && window.matchMedia(MOBILE_QUERY).matches);
  }

  function currentDateText(){
    const time = document.querySelector('#lastUpdate .live-update-time, #lastUpdate time');
    const raw = (time?.textContent || document.getElementById('lastUpdate')?.textContent || '').replace(/\s+/g,' ').trim();
    return raw.replace(/^Atualizado\s*·\s*/i,'') || '';
  }

  function removeDesktopInlineDateV483(){
    const html = document.documentElement;
    const header = document.querySelector('.site-header-clean');
    const h1 = header?.querySelector('.brand-text h1');

    html.classList.remove('mobile-header-date-in-title-v439');

    h1?.querySelectorAll('.header-inline-date-v439').forEach(inline => {
      const previous = inline.previousSibling;
      if(previous && previous.nodeType === Node.TEXT_NODE && !previous.textContent.trim()){
        previous.remove();
      }
      inline.remove();
    });
  }

  function applyMobileHeaderDateInTitleV439(){
    try{
      if(!isMobileHeaderMode()){
        removeDesktopInlineDateV483();
        return;
      }

      const html = document.documentElement;
      html.classList.add('mobile-v439','mobile-header-date-in-title-v439');

      const meta = document.querySelector('meta[name="app-build"]');
      if(meta) meta.content = BUILD;

      const legacy = window.__ELTAUM_HEADER_UPDATE_FIX_V374__;
      if(legacy?.observer && typeof legacy.observer.disconnect === 'function') legacy.observer.disconnect();
      if(legacy) legacy.disabledByV439 = true;

      const header = document.querySelector('.site-header-clean');
      const h1 = header?.querySelector('.brand-text h1');
      const last = document.getElementById('lastUpdate');
      if(!h1 || !last) return;

      last.classList.remove('header-update-v374');

      let inline = h1.querySelector('.header-inline-date-v439');
      if(!inline){
        inline = document.createElement('span');
        inline.className = 'header-inline-date-v439';
        inline.setAttribute('aria-hidden','true');
        h1.appendChild(document.createTextNode(' '));
        h1.appendChild(inline);
      }

      const text = currentDateText();
      if(text && inline.textContent !== text) inline.textContent = text;

      document.querySelectorAll('.header-update-host-v374').forEach(host => {
        if(!host.contains(last) && !host.textContent.trim()) host.remove();
      });

      startObserver();
    }catch(_error){}
  }

  function schedule(){
    if(scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      applyMobileHeaderDateInTitleV439();
    });
  }

  function startObserver(){
    if(observerStarted || !window.MutationObserver) return;
    const header = document.querySelector('.site-header-clean');
    if(!header) return;
    observerStarted = true;
    const obs = new MutationObserver(schedule);
    obs.observe(header, {childList:true, subtree:true, characterData:true});
    window.__ELTAUM_MOBILE_HEADER_DATE_IN_TITLE_OBSERVER_V439__ = obs;
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', applyMobileHeaderDateInTitleV439, {once:true});
  }else{
    applyMobileHeaderDateInTitleV439();
  }

  window.addEventListener('load', applyMobileHeaderDateInTitleV439, {once:true});
  window.addEventListener('resize', schedule, {passive:true});

  if(window.matchMedia){
    const mobileMedia = window.matchMedia(MOBILE_QUERY);
    if(typeof mobileMedia.addEventListener === 'function'){
      mobileMedia.addEventListener('change', schedule);
    }else if(typeof mobileMedia.addListener === 'function'){
      mobileMedia.addListener(schedule);
    }
  }

  [50, 120, 260, 600, 1100, 2200, 4200, 6500, 10000, 16000, 26000].forEach(ms => setTimeout(applyMobileHeaderDateInTitleV439, ms));

  window.__ELTAUM_MOBILE_HEADER_DATE_IN_TITLE_V439__ = {
    build: BUILD,
    sync: applyMobileHeaderDateInTitleV439,
    desktopClean: removeDesktopInlineDateV483
  };
})();

/* PATCH v440 — Mobile: filtros de fundos compactos */
(function(){
  const BUILD = 'ELTAUM_MOBILE_FUNDS_FILTERS_COMPACT_v440';
  let observerStarted = false;
  let scheduled = false;

  function totalFundsText(){
    const candidates = [
      document.getElementById('filterResultSummary')?.textContent,
      document.getElementById('mobileCategorySelectResultV74')?.textContent,
      document.getElementById('desktopFilterResultSummary')?.textContent,
      document.getElementById('resultInfo')?.textContent
    ].filter(Boolean);

    for(const raw of candidates){
      const match = String(raw).match(/(\d[\d.]*)\s+fundos?/i);
      if(match) return `${match[1]} fundos`;
    }

    return '';
  }

  function ensureFundsTitleCount(){
    const section = document.getElementById('sec-fundos');
    const title = section?.querySelector('.section-title h2');
    if(!title) return;

    let count = title.querySelector('.funds-title-count-v440');
    if(!count){
      count = document.createElement('span');
      count.className = 'funds-title-count-v440';
      count.setAttribute('aria-live','polite');
      title.appendChild(count);
    }

    const text = totalFundsText();
    if(text && count.textContent !== text) count.textContent = text;
  }

  function moveRealNoDataToggle(){
    const shell = document.getElementById('mobileCategorySelectShellV74');
    const toggle = document.querySelector('label[for="toggleSemDados"]');
    if(!shell || !toggle) return;

    shell.classList.add('has-real-toggle-v440');
    toggle.classList.add('mobile-moved-toggle-v440');
    if(toggle.parentElement !== shell){
      const head = shell.querySelector('.mobile-category-select-head-v74');
      shell.insertBefore(toggle, head || shell.firstChild);
    }
  }

  function applyMobileFundsFiltersCompactV440(){
    try{
      document.documentElement.classList.add('mobile-v440','mobile-funds-filters-compact-v440');
      const meta = document.querySelector('meta[name="app-build"]');
      if(meta) meta.content = BUILD;

      const pfText = document.querySelector('#mobileExtraControlsV75 .mobile-pf-toggle-text-v75 strong');
      if(pfText && pfText.textContent.trim() !== 'Pessoa Física') pfText.textContent = 'Pessoa Física';

      moveRealNoDataToggle();
      ensureFundsTitleCount();
      startObserver();
    }catch(_error){}
  }

  function schedule(){
    if(scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      applyMobileFundsFiltersCompactV440();
    });
  }

  function startObserver(){
    if(observerStarted || !window.MutationObserver) return;
    const targets = [
      document.getElementById('sec-fundos'),
      document.getElementById('filterResultSummary'),
      document.getElementById('mobileCategorySelectResultV74'),
      document.getElementById('resultInfo')
    ].filter(Boolean);
    if(!targets.length) return;

    observerStarted = true;
    const obs = new MutationObserver(schedule);
    targets.forEach(target => obs.observe(target, {childList:true, subtree:true, characterData:true}));
    window.__ELTAUM_MOBILE_FUNDS_FILTERS_COMPACT_OBSERVER_V440__ = obs;
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', applyMobileFundsFiltersCompactV440, {once:true});
  }else{
    applyMobileFundsFiltersCompactV440();
  }

  window.addEventListener('load', applyMobileFundsFiltersCompactV440, {once:true});
  [250, 800, 1600, 3200, 6400, 12000].forEach(ms => setTimeout(applyMobileFundsFiltersCompactV440, ms));

  window.__ELTAUM_MOBILE_FUNDS_FILTERS_COMPACT_V440__ = {
    build: BUILD,
    sync: applyMobileFundsFiltersCompactV440
  };
})();

/* PATCH v441 — Mobile: ajustes finos dos filtros de fundos */
(function(){
  const BUILD = 'ELTAUM_MOBILE_FUNDS_FILTERS_FIX_v441';
  let scheduled = false;

  function applyMobileFundsFiltersFixV441(){
    try{
      document.documentElement.classList.add('mobile-v441','mobile-funds-filters-fix-v441');
      const meta = document.querySelector('meta[name="app-build"]');
      if(meta) meta.content = BUILD;

      const search = document.getElementById('searchInput');
      if(search && !search.dataset.mobilePlaceholderV441){
        search.dataset.desktopPlaceholderV441 = search.getAttribute('placeholder') || '';
        search.dataset.mobilePlaceholderV441 = '1';
      }
      if(search && window.matchMedia?.('(max-width: 768px)').matches){
        search.setAttribute('placeholder','Buscar fundo ou CNPJ...');
      }

      const pf = document.getElementById('mobileOnlyPfV75');
      const pfLabel = document.querySelector('label[for="mobileOnlyPfV75"]');
      if(pf && pfLabel){
        pfLabel.classList.toggle('is-checked-v441', !!pf.checked);
      }

      const noDataToggle = document.querySelector('#mobileCategorySelectShellV74 .mobile-moved-toggle-v440');
      if(noDataToggle){
        noDataToggle.setAttribute('data-mobile-fixed-v441','1');
      }
    }catch(_error){}
  }

  function schedule(){
    if(scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      applyMobileFundsFiltersFixV441();
    });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', applyMobileFundsFiltersFixV441, {once:true});
  }else{
    applyMobileFundsFiltersFixV441();
  }

  document.addEventListener('change', event => {
    if(event.target?.id === 'mobileOnlyPfV75' || event.target?.id === 'toggleSemDados') schedule();
  }, true);
  window.addEventListener('resize', schedule, {passive:true});
  window.addEventListener('load', applyMobileFundsFiltersFixV441, {once:true});
  [250, 800, 1600, 3200, 6400, 12000].forEach(ms => setTimeout(applyMobileFundsFiltersFixV441, ms));

  window.__ELTAUM_MOBILE_FUNDS_FILTERS_FIX_V441__ = {
    build: BUILD,
    sync: applyMobileFundsFiltersFixV441
  };
})();

/* PATCH v442 — Mobile: estabiliza o toggle "Ocultar fundos sem dados" */
(function(){
  const BUILD = 'ELTAUM_MOBILE_NO_DATA_TOGGLE_STABLE_v442';
  let scheduled = false;

  function ensureStableNoDataToggleV442(){
    try{
      document.documentElement.classList.add('mobile-v442','mobile-no-data-toggle-stable-v442');
      const meta = document.querySelector('meta[name="app-build"]');
      if(meta) meta.content = BUILD;

      const shell = document.getElementById('mobileCategorySelectShellV74');
      const input = document.getElementById('toggleSemDados');
      if(!shell || !input) return;

      if(input.type !== 'checkbox') input.type = 'checkbox';

      let row = document.getElementById('mobileNoDataRowV442');
      if(!row){
        row = document.createElement('label');
        row.id = 'mobileNoDataRowV442';
        row.className = 'toggle-wrap compact-toggle-wrap toggle-sem-dados-clean-v127 mobile-no-data-row-v442';
        row.htmlFor = 'toggleSemDados';
      }

      row.dataset.v127Rebuilt = '1';
      row.dataset.v442Stable = '1';
      row.setAttribute('title','Ocultar fundos sem dados');

      let text = row.querySelector('.mobile-no-data-text-v442');
      if(!text){
        text = document.createElement('span');
        text.className = 'mobile-no-data-text-v442';
        text.textContent = 'Ocultar fundos sem dados';
      }

      let switchWrap = row.querySelector('.mobile-no-data-switch-v442');
      if(!switchWrap){
        switchWrap = document.createElement('span');
        switchWrap.className = 'mobile-no-data-switch-v442';
      }

      let slider = input.parentElement?.querySelector('.toggle-slider, .toggle-sem-dados-slider-v127') ||
        row.querySelector('.toggle-slider, .toggle-sem-dados-slider-v127');
      if(!slider){
        slider = document.createElement('span');
        slider.className = 'toggle-slider toggle-sem-dados-slider-v127';
        slider.setAttribute('aria-hidden','true');
      }else{
        slider.classList.add('toggle-slider','toggle-sem-dados-slider-v127');
        slider.setAttribute('aria-hidden','true');
      }

      input.classList.add('toggle-sem-dados-input-v127');
      input.setAttribute('aria-label','Ocultar fundos sem dados');

      if(text.parentElement !== row) row.appendChild(text);
      if(switchWrap.parentElement !== row) row.appendChild(switchWrap);
      if(input.parentElement !== switchWrap) switchWrap.appendChild(input);
      if(slider.parentElement !== switchWrap) switchWrap.appendChild(slider);

      row.classList.toggle('is-on', !!input.checked);

      const head = shell.querySelector('.mobile-category-select-head-v74');
      if(row.parentElement !== shell){
        shell.insertBefore(row, head || shell.firstChild);
      }else if(head && row.nextElementSibling !== head){
        shell.insertBefore(row, head);
      }

      shell.classList.add('has-stable-no-data-toggle-v442');

      document.querySelectorAll('.mobile-moved-toggle-v440, .toggle-sem-dados-clean-v127').forEach(el => {
        if(el !== row && el.contains(input) === false && el.id !== 'mobileNoDataRowV442'){
          el.remove();
        }
      });

      if(input.dataset.v442Bound !== '1'){
        input.dataset.v442Bound = '1';
        input.addEventListener('change', () => {
          row.classList.toggle('is-on', !!input.checked);
        });
      }
    }catch(_error){}
  }

  function schedule(){
    if(scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      ensureStableNoDataToggleV442();
    });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', ensureStableNoDataToggleV442, {once:true});
  }else{
    ensureStableNoDataToggleV442();
  }

  document.addEventListener('change', event => {
    if(event.target?.id === 'toggleSemDados') schedule();
  }, true);
  window.addEventListener('load', ensureStableNoDataToggleV442, {once:true});
  [100, 260, 600, 1200, 2400, 4200, 7000, 12000, 20000].forEach(ms => setTimeout(ensureStableNoDataToggleV442, ms));

  window.__ELTAUM_MOBILE_NO_DATA_TOGGLE_STABLE_V442__ = {
    build: BUILD,
    sync: ensureStableNoDataToggleV442
  };
})();

/* PATCH v443 — Mobile: ranking toolbar compacto */
(function(){
  const BUILD = 'ELTAUM_MOBILE_RANKING_TOOLBAR_COMPACT_v443';

  function applyMobileRankingToolbarCompactV443(){
    try{
      document.documentElement.classList.add('mobile-v443','mobile-ranking-toolbar-compact-v443');
      const meta = document.querySelector('meta[name="app-build"]');
      if(meta) meta.content = BUILD;
    }catch(_error){}
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', applyMobileRankingToolbarCompactV443, {once:true});
  }else{
    applyMobileRankingToolbarCompactV443();
  }

  window.addEventListener('load', applyMobileRankingToolbarCompactV443, {once:true});
  [300, 1000, 2500, 6000].forEach(ms => setTimeout(applyMobileRankingToolbarCompactV443, ms));

window.__ELTAUM_MOBILE_RANKING_TOOLBAR_COMPACT_V443__ = {
    build: BUILD,
    sync: applyMobileRankingToolbarCompactV443
  };
})();

/* PATCH v444 — Mobile: hierarquia visual dos cards de fundos */
(function(){
  const BUILD = 'ELTAUM_MOBILE_FUND_CARD_HIERARCHY_v444';

  function applyMobileFundCardHierarchyV444(){
    try{
      document.documentElement.classList.add('mobile-v444','mobile-fund-card-hierarchy-v444');
      const meta = document.querySelector('meta[name="app-build"]');
      if(meta) meta.content = BUILD;
      document.querySelectorAll('#mobileFundCards .fund-card-mobile-v26').forEach(card => {
        card.classList.add('fund-card-hierarchy-v444');
      });
    }catch(_error){}
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', applyMobileFundCardHierarchyV444, {once:true});
  }else{
    applyMobileFundCardHierarchyV444();
  }

  window.addEventListener('load', applyMobileFundCardHierarchyV444, {once:true});
  [250, 800, 1800, 3600, 7000].forEach(ms => setTimeout(applyMobileFundCardHierarchyV444, ms));

window.__ELTAUM_MOBILE_FUND_CARD_HIERARCHY_V444__ = {
    build: BUILD,
    sync: applyMobileFundCardHierarchyV444
  };
})();

/* PATCH v445 — Mobile: Indicadores por mês */
(function(){
  const BUILD = 'ELTAUM_MOBILE_MONTHLY_INDICATORS_BALANCE_v451';
  let range = 'year';
  let view = 'all';

  function toNumV445(value){
    if(value === null || value === undefined || value === '') return null;
    if(typeof value === 'string'){
      const cleaned = value.replace('%','').replace(/\./g,'').replace(',','.').trim();
      const n = Number(cleaned);
      return Number.isFinite(n) ? n : null;
    }
    const n = Number(value);
    return Number.isFinite(n) ? n : null;
  }

  function pctV445(value){
    const n = toNumV445(value);
    if(n === null) return '—';
    return `${n > 0 ? '+' : ''}${n.toFixed(2).replace('.', ',')}%`;
  }

  function clsV445(value){
    const n = toNumV445(value);
    if(n === null || Math.abs(n) < 0.005) return 'muted';
    return n > 0 ? 'pos' : 'neg';
  }

  function monthNameV445(index){
    const meses = Array.isArray(window.MESES_PT) ? window.MESES_PT : null;
    const fallback = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
    return (meses || fallback)[index] || '';
  }

  function keyFromPartsV445(year, monthIndex){
    return `${year}-${String(monthIndex + 1).padStart(2,'0')}`;
  }

  function labelFromKeyV447(key){
    const monthIndex = Math.max(0, Math.min(11, Number(String(key).slice(5,7)) - 1));
    const base = monthNameV445(monthIndex);
    if(range === '12m'){
      const year = String(key).slice(2,4);
      return year ? `${base}/${year}` : base;
    }
    return base;
  }

  function normalizeMonthKeyV445(item){
    if(!item || typeof item !== 'object') return '';
    const raw = String(
      item.key || item.mes_key || item.mesKey || item.periodo || item.mes || item.label ||
      item.data_ref || item.data || item.date || item.dataHoraCotacao || ''
    ).trim().toLowerCase();
    if(!raw) return '';

    let m = raw.match(/(\d{4})[-/](\d{1,2})/);
    if(m) return `${m[1]}-${String(Number(m[2])).padStart(2,'0')}`;

    m = raw.match(/(\d{1,2})[-/](\d{1,2})[-/](\d{4})/);
    if(m) return `${m[3]}-${String(Number(m[2])).padStart(2,'0')}`;

    const nomes = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
    m = raw.match(/(jan|fev|mar|abr|mai|jun|jul|ago|set|out|nov|dez)[a-zç]*[\/\s.-]*(\d{2,4})/i);
    if(m){
      const year = Number(m[2]) < 100 ? 2000 + Number(m[2]) : Number(m[2]);
      return `${year}-${String(nomes.indexOf(m[1].slice(0,3).toLowerCase()) + 1).padStart(2,'0')}`;
    }
    return '';
  }

  function valueFromItemV445(item){
    if(!item || typeof item !== 'object') return null;
    const keys = [
      'valor','value','mensal','variacao','variacao_mensal','variacao_mes',
      'var_pct','retorno','retorno_mes','pct','percentual'
    ];
    for(const key of keys){
      const n = toNumV445(item[key]);
      if(n !== null) return n;
    }
    return null;
  }

  function mapSeriesV445(series){
    const map = new Map();
    (Array.isArray(series) ? series : []).forEach(item => {
      const key = normalizeMonthKeyV445(item);
      const value = valueFromItemV445(item);
      if(key && value !== null) map.set(key, value);
    });
    return map;
  }

  function getMercadoV445(){
    try{
      return (typeof _dadosMercado !== 'undefined' && _dadosMercado) || window.__mercadoAtualV230 || {};
    }catch(_error){
      return window.__mercadoAtualV230 || {};
    }
  }

  function getPtaxSeriesV445(dados){
    try{
      if(typeof _ptaxHistorico !== 'undefined' && Array.isArray(_ptaxHistorico) && _ptaxHistorico.length){
        return _ptaxHistorico.map(item => ({
          key: normalizeMonthKeyV445(item),
          valor: item._var_pct ?? item.var_pct ?? item.variacao ?? item.variacao_mensal
        }));
      }
    }catch(_error){}
    return Array.isArray(dados?.ptax_historico) ? dados.ptax_historico : [];
  }

  function getIbovSeriesV445(dados){
    const idx = dados?.indices_mercado?.ibovespa || {};
    const card = dados?.cards?.ibovespa || {};
    return idx.historico || idx.mensal || idx.meses || idx.fechamentos || card.historico || card.mensal || card.meses || [];
  }

  function getConsolidatedMonthlyV448(dados){
    return Array.isArray(dados?.indicadores_mensais) ? dados.indicadores_mensais : [];
  }

  function mapConsolidatedV448(series, field){
    const map = new Map();
    (Array.isArray(series) ? series : []).forEach(item => {
      const key = normalizeMonthKeyV445(item);
      const value = toNumV445(item?.[field]);
      if(key && value !== null) map.set(key, value);
    });
    return map;
  }

  function getMonthKeysV445(maps){
    const currentYear = (new Date()).getFullYear();
    if(range === 'year'){
      const yearKeys = Array.from({length:12}, (_,index) => keyFromPartsV445(currentYear, index));
      const keysWithData = yearKeys.filter(key => maps.some(map => toNumV445(map?.get(key)) !== null));
      if(keysWithData.length) return keysWithData;
      const currentMonth = (new Date()).getMonth();
      return yearKeys.slice(0, currentMonth + 1);
    }

    const union = new Set();
    maps.forEach(map => map.forEach((_value, key) => union.add(key)));
    const sorted = [...union].sort();
    if(sorted.length >= 12) return sorted.slice(-12);

    const base = new Date();
    return Array.from({length:12}, (_,i) => {
      const d = new Date(base.getFullYear(), base.getMonth() - (11 - i), 1);
      return keyFromPartsV445(d.getFullYear(), d.getMonth());
    });
  }

  function compoundV445(values){
    const nums = values.map(toNumV445).filter(v => v !== null);
    if(!nums.length) return null;
    return (nums.reduce((acc, value) => acc * (1 + value / 100), 1) - 1) * 100;
  }

  function summaryValueV445(dados, key, map, directCandidates){
    for(const candidate of directCandidates){
      const n = toNumV445(candidate);
      if(n !== null) return n;
    }
    const year = String((new Date()).getFullYear());
    return compoundV445([...map.entries()].filter(([monthKey]) => monthKey.startsWith(year + '-')).map(([,value]) => value));
  }

  function summaryValueForKeysV449(map, keys, directCandidates){
    for(const candidate of directCandidates){
      const n = toNumV445(candidate);
      if(n !== null) return n;
    }
    return compoundV445(keys.map(key => map.get(key)));
  }

  function setSummaryV445(id, value, label){
    const el = document.getElementById(id);
    if(!el) return;
    const labelEl = el.closest('article')?.querySelector('span');
    if(labelEl && label) labelEl.textContent = label;
    el.textContent = pctV445(value);
    el.className = clsV445(value);
  }

  const indicatorMetaV446 = {
    all:{label:'Todos'},
    cdi:{label:'CDI'},
    ipca:{label:'IPCA'},
    ibov:{label:'Ibov'},
    dolar:{label:'Dólar'}
  };

  function renderMonthlyHeaderV446(table, activeView){
    if(!table) return;
    table.dataset.viewV446 = activeView;
    const headRow = table.querySelector('thead tr');
    if(!headRow) return;
    if(activeView === 'all'){
      headRow.innerHTML = '<th scope="col">Mês</th><th scope="col">CDI</th><th scope="col">IPCA</th><th scope="col">Ibov</th><th scope="col">Dólar</th>';
    }else{
      const label = indicatorMetaV446[activeView]?.label || 'Indicador';
      headRow.innerHTML = `<th scope="col">Mês</th><th scope="col">${label}</th>`;
    }
  }

  function mapHasDataForKeysV447(map, keys){
    return keys.some(key => toNumV445(map?.get(key)) !== null);
  }

  function syncIndicatorButtonsV447(root, maps, keys, activeView){
    root.querySelectorAll('[data-monthly-indicators-view-v446]').forEach(btn => {
      const key = btn.dataset.monthlyIndicatorsViewV446 || 'all';
      const hasData = key === 'all' || mapHasDataForKeysV447(maps[key], keys);
      const isActive = key === activeView;
      btn.classList.toggle('active', isActive);
      btn.classList.toggle('is-unavailable-v447', !hasData);
      btn.disabled = !hasData;
      btn.setAttribute('aria-disabled', hasData ? 'false' : 'true');
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
  }

  function renderMonthlyIndicatorsV445(){
    const root = document.getElementById('monthlyIndicatorsV445');
    const tbody = document.getElementById('monthlyIndicatorsRowsV445');
    const table = root?.querySelector('.monthly-indicators-table-v445');
    if(!root || !tbody) return;

    document.documentElement.classList.add('mobile-v451','mobile-monthly-indicators-balance-v451','mobile-v450','mobile-monthly-indicators-fit-v450','mobile-v449','mobile-monthly-indicators-compact-v449','mobile-v448','mobile-monthly-indicators-sticky-v448','mobile-v447','mobile-monthly-indicators-clean-v447','mobile-v446','mobile-monthly-indicators-select-v446','mobile-v445','mobile-monthly-indicators-v445');
    const meta = document.querySelector('meta[name="app-build"]');
    if(meta) meta.content = BUILD;

    const dados = getMercadoV445();
    const cdiCard = dados?.cards?.cdi || {};
    const ipcaCard = dados?.cards?.ipca || {};
    const ibovCard = dados?.cards?.ibovespa || {};
    const ibovIdx = dados?.indices_mercado?.ibovespa || {};
    const dolarCard = dados?.cards?.dolar || {};
    const dolarIdx = dados?.indices_mercado?.dolar || {};

    const consolidated = getConsolidatedMonthlyV448(dados);
    const cdiMap = consolidated.length ? mapConsolidatedV448(consolidated, 'cdi') : mapSeriesV445(cdiCard.historico || []);
    const ipcaMap = consolidated.length ? mapConsolidatedV448(consolidated, 'ipca') : mapSeriesV445(ipcaCard.historico || dados?.ipca_historico || dados?.historico_ipca || []);
    const ibovMap = consolidated.length ? mapConsolidatedV448(consolidated, 'ibov') : mapSeriesV445(getIbovSeriesV445(dados));
    const dolarMap = consolidated.length ? mapConsolidatedV448(consolidated, 'dolar') : mapSeriesV445(getPtaxSeriesV445(dados));
    const keys = getMonthKeysV445([cdiMap, ipcaMap, ibovMap, dolarMap]);
    const maps = {cdi:cdiMap, ipca:ipcaMap, ibov:ibovMap, dolar:dolarMap};
    let activeView = indicatorMetaV446[view] ? view : 'all';
    if(activeView !== 'all' && !mapHasDataForKeysV447(maps[activeView], keys)){
      activeView = 'all';
      view = 'all';
    }

    renderMonthlyHeaderV446(table, activeView);

    const summarySuffix = range === '12m' ? '12M' : 'ano';
    setSummaryV445(
      'monthlySummaryCdiV445',
      summaryValueForKeysV449(cdiMap, keys, range === '12m' ? [cdiCard.acum_12m] : [cdiCard.acum_ano_com_parcial, cdiCard.acum_ano, cdiCard.ano]),
      `CDI ${summarySuffix}`
    );
    setSummaryV445(
      'monthlySummaryIpcaV445',
      summaryValueForKeysV449(ipcaMap, keys, range === '12m' ? [ipcaCard.acum_12m] : [ipcaCard.acum_ano, ipcaCard.ano]),
      `IPCA ${summarySuffix}`
    );
    setSummaryV445(
      'monthlySummaryIbovV445',
      summaryValueForKeysV449(ibovMap, keys, range === '12m' ? [ibovIdx.acum_12m, ibovCard.acum_12m] : [ibovIdx.acum_ano, ibovCard.acum_ano]),
      `Ibov ${summarySuffix}`
    );
    setSummaryV445(
      'monthlySummaryDolarV445',
      summaryValueForKeysV449(dolarMap, keys, range === '12m' ? [dolarIdx.acum_12m, dolarCard.acum_12m] : [dolarIdx.acum_ano, dolarCard.acum_ano]),
      `Dólar ${summarySuffix}`
    );

    tbody.innerHTML = keys.map(key => {
      const label = labelFromKeyV447(key);
      if(activeView !== 'all'){
        const value = maps[activeView]?.get(key);
        return `<tr><td>${label}</td><td class="${clsV445(value)}">${pctV445(value)}</td></tr>`;
      }
      const values = [cdiMap.get(key), ipcaMap.get(key), ibovMap.get(key), dolarMap.get(key)];
      return `<tr>
        <td>${label}</td>
        ${values.map(value => `<td class="${clsV445(value)}">${pctV445(value)}</td>`).join('')}
      </tr>`;
    }).join('');

    if(activeView !== 'all' && !mapHasDataForKeysV447(maps[activeView], keys)){
      const label = indicatorMetaV446[activeView]?.label || 'indicador';
      tbody.innerHTML = `<tr class="monthly-empty-row-v447"><td colspan="2">Série mensal de ${label} indisponível no JSON atual.</td></tr>`;
    }

    const active = root.querySelector(`[data-monthly-indicators-range-v445="${range}"]`);
    root.querySelectorAll('[data-monthly-indicators-range-v445]').forEach(btn => {
      const isActive = btn === active;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    syncIndicatorButtonsV447(root, maps, keys, activeView);
    const shell = root.querySelector('.monthly-indicators-table-shell-v445');
    if(shell && activeView === 'all'){
      requestAnimationFrame(() => {
        shell.scrollLeft = 0;
      });
    }
  }

  function bindMonthlyIndicatorsV445(){
    const root = document.getElementById('monthlyIndicatorsV445');
    if(!root || root.dataset.v445Bound) return;
    root.dataset.v445Bound = '1';

    root.addEventListener('click', event => {
      const rangeBtn = event.target.closest('[data-monthly-indicators-range-v445]');
      if(rangeBtn){
        range = rangeBtn.dataset.monthlyIndicatorsRangeV445 || 'year';
        renderMonthlyIndicatorsV445();
        return;
      }

      const viewBtn = event.target.closest('[data-monthly-indicators-view-v446]');
      if(viewBtn){
        if(viewBtn.disabled || viewBtn.getAttribute('aria-disabled') === 'true') return;
        view = viewBtn.dataset.monthlyIndicatorsViewV446 || 'all';
        renderMonthlyIndicatorsV445();
        return;
      }

      const more = event.target.closest('#monthlyIndicatorsMoreV445');
      if(more){
        const expanded = root.classList.toggle('is-expanded');
        more.textContent = expanded ? 'Mostrar menos' : 'Ver todos os meses';
        more.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      }
    });
  }

  function initMonthlyIndicatorsV445(){
    bindMonthlyIndicatorsV445();
    renderMonthlyIndicatorsV445();
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', initMonthlyIndicatorsV445, {once:true});
  }else{
    initMonthlyIndicatorsV445();
  }

  window.addEventListener('load', initMonthlyIndicatorsV445, {once:true});
  document.addEventListener('elton:market-data-refresh', initMonthlyIndicatorsV445);
  [400, 1200, 2500, 5000, 9000].forEach(ms => setTimeout(initMonthlyIndicatorsV445, ms));

  window.__ELTAUM_MOBILE_MONTHLY_INDICATORS_V445__ = {
    build: BUILD,
    render: renderMonthlyIndicatorsV445
  };

  window.__ELTAUM_MOBILE_MONTHLY_INDICATORS_SELECT_V446__ = {
    build: BUILD,
    render: renderMonthlyIndicatorsV445
  };

  window.__ELTAUM_MOBILE_MONTHLY_INDICATORS_CLEAN_V447__ = {
    build: BUILD,
    render: renderMonthlyIndicatorsV445
  };

  window.__ELTAUM_MOBILE_MONTHLY_INDICATORS_STICKY_V448__ = {
    build: BUILD,
    render: renderMonthlyIndicatorsV445
  };

  window.__ELTAUM_MOBILE_MONTHLY_INDICATORS_COMPACT_V449__ = {
    build: BUILD,
    render: renderMonthlyIndicatorsV445
  };

  window.__ELTAUM_MOBILE_MONTHLY_INDICATORS_FIT_V450__ = {
    build: BUILD,
    render: renderMonthlyIndicatorsV445
  };

  window.__ELTAUM_MOBILE_MONTHLY_INDICATORS_BALANCE_V451__ = {
    build: BUILD,
    render: renderMonthlyIndicatorsV445
  };
})();

/* PATCH v452 — Mobile: hierarquia refinada dos cards de fundos */
(function(){
  const BUILD = 'ELTAUM_MOBILE_FUND_CARD_BALANCED_METRICS_v454';

  function applyMobileFundCardRefinementV452(){
    try{
      document.documentElement.classList.add('mobile-v454','mobile-fund-card-balanced-metrics-v454','mobile-v453','mobile-fund-card-details-cta-v453','mobile-v452','mobile-fund-card-refinement-v452');
      const meta = document.querySelector('meta[name="app-build"]');
      if(meta) meta.content = BUILD;
      document.querySelectorAll('#mobileFundCards .fund-card-mobile-v26').forEach(card => {
        card.classList.add('fund-card-refinement-v452');
      });
    }catch(_error){}
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', applyMobileFundCardRefinementV452, {once:true});
  }else{
    applyMobileFundCardRefinementV452();
  }

  window.addEventListener('load', applyMobileFundCardRefinementV452, {once:true});
  document.addEventListener('elton:fund-cards-rendered', applyMobileFundCardRefinementV452);
  [300, 900, 1800, 3500, 7000].forEach(ms => setTimeout(applyMobileFundCardRefinementV452, ms));

  window.__ELTAUM_MOBILE_FUND_CARD_REFINEMENT_V452__ = {
    build: BUILD,
    sync: applyMobileFundCardRefinementV452
  };

  window.__ELTAUM_MOBILE_FUND_CARD_DETAILS_CTA_V453__ = {
    build: BUILD,
    sync: applyMobileFundCardRefinementV452
  };

  window.__ELTAUM_MOBILE_FUND_CARD_BALANCED_METRICS_V454__ = {
    build: BUILD,
    sync: applyMobileFundCardRefinementV452
  };
})();

/* PATCH v455 — Mobile: indicadores mensais legíveis */
(function(){
  const BUILD = 'ELTAUM_MOBILE_MONTHLY_INDICATORS_READABLE_v455';

  function applyMonthlyIndicatorsReadableV455(){
    try{
      document.documentElement.classList.add('mobile-v455','mobile-monthly-indicators-readable-v455');
      const meta = document.querySelector('meta[name="app-build"]');
      if(meta) meta.content = BUILD;
    }catch(_error){}
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', applyMonthlyIndicatorsReadableV455, {once:true});
  }else{
    applyMonthlyIndicatorsReadableV455();
  }

  window.addEventListener('load', applyMonthlyIndicatorsReadableV455, {once:true});
  [400, 1200, 3000, 7000].forEach(ms => setTimeout(applyMonthlyIndicatorsReadableV455, ms));

  window.__ELTAUM_MOBILE_MONTHLY_INDICATORS_READABLE_V455__ = {
    build: BUILD,
    sync: applyMonthlyIndicatorsReadableV455
  };
})();

/* PATCH v456 — Mobile: harmonia tipografica dos KPIs do topo */
(function(){
  const BUILD = 'ELTAUM_MOBILE_TOP_KPI_HARMONY_v456';

  function applyTopKpiHarmonyV456(){
    try{
      document.documentElement.classList.add('mobile-v456','mobile-top-kpi-harmony-v456');
      const meta = document.querySelector('meta[name="app-build"]');
      if(meta) meta.content = BUILD;
    }catch(_error){}
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', applyTopKpiHarmonyV456, {once:true});
  }else{
    applyTopKpiHarmonyV456();
  }

  window.addEventListener('load', applyTopKpiHarmonyV456, {once:true});
  [400, 1200, 3000, 7000].forEach(ms => setTimeout(applyTopKpiHarmonyV456, ms));

window.__ELTAUM_MOBILE_TOP_KPI_HARMONY_V456__ = {
    build: BUILD,
    sync: applyTopKpiHarmonyV456
  };
})();

/* PATCH v457 — Mobile: ranking por categoria em lista compacta */
(function(){
  const BUILD = 'ELTAUM_MOBILE_RANKING_CATEGORY_LIST_v457';

  function applyRankingCategoryListV457(){
    try{
      document.documentElement.classList.add('mobile-v457','mobile-ranking-category-list-v457');
      const meta = document.querySelector('meta[name="app-build"]');
      if(meta) meta.content = BUILD;
    }catch(_error){}
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', applyRankingCategoryListV457, {once:true});
  }else{
    applyRankingCategoryListV457();
  }

  window.addEventListener('load', applyRankingCategoryListV457, {once:true});
  [400, 1200, 3000, 7000].forEach(ms => setTimeout(applyRankingCategoryListV457, ms));

  window.__ELTAUM_MOBILE_RANKING_CATEGORY_LIST_V457__ = {
    build: BUILD,
    sync: applyRankingCategoryListV457
  };
})();

/* PATCH v458 — Mobile: destaques do ranking compactos */
(function(){
  const BUILD = 'ELTAUM_MOBILE_RANKING_HIGHLIGHTS_COMPACT_v458';

  function applyRankingHighlightsCompactV458(){
    try{
      document.documentElement.classList.add('mobile-v458','mobile-ranking-highlights-compact-v458');
      const meta = document.querySelector('meta[name="app-build"]');
      if(meta) meta.content = BUILD;
    }catch(_error){}
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', applyRankingHighlightsCompactV458, {once:true});
  }else{
    applyRankingHighlightsCompactV458();
  }

  window.addEventListener('load', applyRankingHighlightsCompactV458, {once:true});
  [400, 1200, 3000, 7000].forEach(ms => setTimeout(applyRankingHighlightsCompactV458, ms));

  window.__ELTAUM_MOBILE_RANKING_HIGHLIGHTS_COMPACT_V458__ = {
    build: BUILD,
    sync: applyRankingHighlightsCompactV458
  };
})();

/* PATCH v459 — Mobile: refino visual dos destaques do ranking */
(function(){
  const BUILD = 'ELTAUM_MOBILE_RANKING_HIGHLIGHTS_REFINE_v459';

  function applyRankingHighlightsRefineV459(){
    try{
      document.documentElement.classList.add('mobile-v459','mobile-ranking-highlights-refine-v459');
      const meta = document.querySelector('meta[name="app-build"]');
      if(meta) meta.content = BUILD;
    }catch(_error){}
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', applyRankingHighlightsRefineV459, {once:true});
  }else{
    applyRankingHighlightsRefineV459();
  }

  window.addEventListener('load', applyRankingHighlightsRefineV459, {once:true});
  [400, 1200, 3000, 7000].forEach(ms => setTimeout(applyRankingHighlightsRefineV459, ms));

  window.__ELTAUM_MOBILE_RANKING_HIGHLIGHTS_REFINE_V459__ = {
    build: BUILD,
    sync: applyRankingHighlightsRefineV459
  };
})();

/* PATCH v460 — Mobile: indicadores mensais mais legiveis */
(function(){
  const BUILD = 'ELTAUM_MOBILE_MONTHLY_INDICATORS_NUMERIC_v460';

  function applyMonthlyIndicatorsNumericV460(){
    try{
      document.documentElement.classList.add('mobile-v460','mobile-monthly-indicators-numeric-v460');
      const meta = document.querySelector('meta[name="app-build"]');
      if(meta) meta.content = BUILD;
    }catch(_error){}
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', applyMonthlyIndicatorsNumericV460, {once:true});
  }else{
    applyMonthlyIndicatorsNumericV460();
  }

  window.addEventListener('load', applyMonthlyIndicatorsNumericV460, {once:true});
  [400, 1200, 3000, 7000].forEach(ms => setTimeout(applyMonthlyIndicatorsNumericV460, ms));

window.__ELTAUM_MOBILE_MONTHLY_INDICATORS_NUMERIC_V460__ = {
    build: BUILD,
    sync: applyMonthlyIndicatorsNumericV460
  };
})();

/* PATCH v461 — Mobile: destaques do ranking compactos e sem texto comido */
(function(){
  const BUILD = 'ELTAUM_MOBILE_RANKING_HIGHLIGHTS_TIGHT_v461';

  function applyRankingHighlightsTightV461(){
    try{
      document.documentElement.classList.add('mobile-v461','mobile-ranking-highlights-tight-v461');
      const meta = document.querySelector('meta[name="app-build"]');
      if(meta) meta.content = BUILD;

      const semFmp = document.querySelector('#rankingClassSelectV136 option[value="sem-fmp"]');
      if(semFmp && semFmp.textContent.trim() !== 'Sem FMP') semFmp.textContent = 'Sem FMP';
    }catch(_error){}
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', applyRankingHighlightsTightV461, {once:true});
  }else{
    applyRankingHighlightsTightV461();
  }

  window.addEventListener('load', applyRankingHighlightsTightV461, {once:true});
  document.addEventListener('elton:rankings-rendered', applyRankingHighlightsTightV461);
  [400, 1200, 3000, 7000].forEach(ms => setTimeout(applyRankingHighlightsTightV461, ms));

  window.__ELTAUM_MOBILE_RANKING_HIGHLIGHTS_TIGHT_V461__ = {
    build: BUILD,
    sync: applyRankingHighlightsTightV461
  };
})();

/* PATCH v462 — Mobile: tipografia harmonizada nos KPIs do topo */
(function(){
  const BUILD = 'ELTAUM_MOBILE_TOP_KPI_TYPOGRAPHY_v462';

  function applyTopKpiTypographyV462(){
    try{
      document.documentElement.classList.add('mobile-v462','mobile-top-kpi-typography-v462');
      const meta = document.querySelector('meta[name="app-build"]');
      if(meta) meta.content = BUILD;
    }catch(_error){}
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', applyTopKpiTypographyV462, {once:true});
  }else{
    applyTopKpiTypographyV462();
  }

  window.addEventListener('load', applyTopKpiTypographyV462, {once:true});
  document.addEventListener('elton:fund-cards-rendered', applyTopKpiTypographyV462);
  [400, 1200, 3000, 7000].forEach(ms => setTimeout(applyTopKpiTypographyV462, ms));

  window.__ELTAUM_MOBILE_TOP_KPI_TYPOGRAPHY_V462__ = {
    build: BUILD,
    sync: applyTopKpiTypographyV462
  };
})();

/* PATCH v463 — Mobile: ranking sem truncamento agressivo */
(function(){
  const BUILD = 'ELTAUM_MOBILE_RANKING_NO_CUT_v463';

  function applyRankingNoCutV463(){
    try{
      document.documentElement.classList.add('mobile-v463','mobile-ranking-no-cut-v463');
      const meta = document.querySelector('meta[name="app-build"]');
      if(meta) meta.content = BUILD;

      const labels = {
        todos:'Todos',
        'sem-fmp':'Sem FMP',
        'renda-fixa-referenciado':'RF Ref.',
        'renda-fixa-curto-prazo':'RF Curto'
      };
      Object.entries(labels).forEach(([value,label]) => {
        const option = document.querySelector(`#rankingClassSelectV136 option[value="${value}"]`);
        if(option && option.textContent.trim() !== label) option.textContent = label;
      });
    }catch(_error){}
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', applyRankingNoCutV463, {once:true});
  }else{
    applyRankingNoCutV463();
  }

  window.addEventListener('load', applyRankingNoCutV463, {once:true});
  document.addEventListener('elton:rankings-rendered', applyRankingNoCutV463);
  [400, 1200, 3000, 7000].forEach(ms => setTimeout(applyRankingNoCutV463, ms));

  window.__ELTAUM_MOBILE_RANKING_NO_CUT_V463__ = {
    build: BUILD,
    sync: applyRankingNoCutV463
  };
})();

/* PATCH v464 — Mobile: nomes curtos nos cards de destaque do ranking */
(function(){
  const BUILD = 'ELTAUM_MOBILE_RANKING_SHORT_NAMES_v464';

  function applyRankingShortNamesV464(){
    try{
      document.documentElement.classList.add('mobile-v464','mobile-ranking-short-names-v464');
      const meta = document.querySelector('meta[name="app-build"]');
      if(meta) meta.content = BUILD;
    }catch(_error){}
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', applyRankingShortNamesV464, {once:true});
  }else{
    applyRankingShortNamesV464();
  }

  window.addEventListener('load', applyRankingShortNamesV464, {once:true});
  document.addEventListener('elton:rankings-rendered', applyRankingShortNamesV464);
  [400, 1200, 3000, 7000].forEach(ms => setTimeout(applyRankingShortNamesV464, ms));

  window.__ELTAUM_MOBILE_RANKING_SHORT_NAMES_V464__ = {
    build: BUILD,
    sync: applyRankingShortNamesV464
  };
})();

/* PATCH v465 — Mobile: ranking adaptativo por viewport real */
(function(){
  const BUILD = 'ELTAUM_MOBILE_ADAPTIVE_RANKING_v465';

  function viewportSizeV465(){
    const vv = window.visualViewport;
    return {
      width: Math.round(vv?.width || window.innerWidth || document.documentElement.clientWidth || 0),
      height: Math.round(vv?.height || window.innerHeight || document.documentElement.clientHeight || 0)
    };
  }

  function applyAdaptiveRankingV465(){
    try{
      const html = document.documentElement;
      html.classList.add('mobile-v465','mobile-adaptive-ranking-v465');
      const meta = document.querySelector('meta[name="app-build"]');
      if(meta) meta.content = BUILD;

      const size = viewportSizeV465();
      html.classList.toggle('mobile-tight-viewport-v465', size.width <= 390 || size.height <= 760);

      document.querySelectorAll('#rankingRiskSelectV198,#rankingClassSelectV136,#rankingPeriodSelectV136').forEach(select => {
        select.style.minHeight = html.classList.contains('mobile-tight-viewport-v465') ? '38px' : '';
      });
    }catch(_error){}
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', applyAdaptiveRankingV465, {once:true});
  }else{
    applyAdaptiveRankingV465();
  }

  window.addEventListener('load', applyAdaptiveRankingV465, {once:true});
  window.addEventListener('resize', applyAdaptiveRankingV465, {passive:true});
  window.visualViewport?.addEventListener('resize', applyAdaptiveRankingV465, {passive:true});
  document.addEventListener('elton:rankings-rendered', applyAdaptiveRankingV465);
  [400, 1200, 3000, 7000].forEach(ms => setTimeout(applyAdaptiveRankingV465, ms));

window.__ELTAUM_MOBILE_ADAPTIVE_RANKING_V465__ = {
    build: BUILD,
    sync: applyAdaptiveRankingV465
  };
})();

/* PATCH v466 — Mobile: detalhes dos fundos com hierarquia mais limpa */
(function(){
  const BUILD = 'ELTAUM_MOBILE_FUND_DETAIL_IA_v466';

  function applyMobileFundDetailIaV466(){
    try{
      const html = document.documentElement;
      html.classList.add('mobile-v466','mobile-fund-detail-ia-v466');
      const meta = document.querySelector('meta[name="app-build"]');
      if(meta) meta.content = BUILD;

      document.querySelectorAll('#mobileFundCards .fund-card-mobile-v26').forEach(card => {
        card.classList.add('fund-detail-ia-v466');
      });

      document.querySelectorAll('#mobileFundCards .fund-card-doc-pill').forEach(link => {
        const txt = String(link.textContent || '').trim();
        const normalized = txt.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^A-Za-z]/g,'').toUpperCase();
        const labels = {
          L:'Lâmina',
          R:'Regulamento',
          IC:'Informe',
          C:'Carteira',
          CM:'Comercial',
          TA:'Termo'
        };
        if(labels[normalized]){
          link.textContent = labels[normalized];
          link.setAttribute('aria-label', labels[normalized]);
        }
      });
    }catch(_error){}
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', applyMobileFundDetailIaV466, {once:true});
  }else{
    applyMobileFundDetailIaV466();
  }

  window.addEventListener('load', applyMobileFundDetailIaV466, {once:true});
  document.addEventListener('elton:fund-cards-rendered', applyMobileFundDetailIaV466);
  document.addEventListener('click', () => setTimeout(applyMobileFundDetailIaV466, 80), true);
  [300, 900, 1800, 3500, 7000].forEach(ms => setTimeout(applyMobileFundDetailIaV466, ms));

window.__ELTAUM_MOBILE_FUND_DETAIL_IA_V466__ = {
    build: BUILD,
    sync: applyMobileFundDetailIaV466
  };
})();

/* PATCH v467 — Mobile: remove truncamento dos detalhes do fundo */
(function(){
  const BUILD = 'ELTAUM_MOBILE_FUND_DETAIL_NO_CUT_v467';

  function applyMobileFundDetailNoCutV467(){
    try{
      const html = document.documentElement;
      html.classList.add('mobile-v467','mobile-fund-detail-no-cut-v467');
      const meta = document.querySelector('meta[name="app-build"]');
      if(meta) meta.content = BUILD;

      document.querySelectorAll('#mobileFundCards .fund-card-mobile-v26').forEach(card => {
        card.classList.add('fund-detail-no-cut-v467');
      });
    }catch(_error){}
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', applyMobileFundDetailNoCutV467, {once:true});
  }else{
    applyMobileFundDetailNoCutV467();
  }

  window.addEventListener('load', applyMobileFundDetailNoCutV467, {once:true});
  document.addEventListener('elton:fund-cards-rendered', applyMobileFundDetailNoCutV467);
  document.addEventListener('click', () => setTimeout(applyMobileFundDetailNoCutV467, 80), true);
  [300, 900, 1800, 3500, 7000].forEach(ms => setTimeout(applyMobileFundDetailNoCutV467, ms));

window.__ELTAUM_MOBILE_FUND_DETAIL_NO_CUT_V467__ = {
    build: BUILD,
    sync: applyMobileFundDetailNoCutV467
  };
})();

/* PATCH v468 — Mobile: lista de detalhes sem reticências */
(function(){
  const BUILD = 'ELTAUM_MOBILE_FUND_DETAIL_LIST_v468';

  function applyMobileFundDetailListV468(){
    try{
      const html = document.documentElement;
      html.classList.add('mobile-v468','mobile-fund-detail-list-v468');
      const meta = document.querySelector('meta[name="app-build"]');
      if(meta) meta.content = BUILD;

      document.querySelectorAll('#mobileFundCards .fund-card-mobile-v26').forEach(card => {
        card.classList.add('fund-detail-list-card-v468');
      });
    }catch(_error){}
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', applyMobileFundDetailListV468, {once:true});
  }else{
    applyMobileFundDetailListV468();
  }

  window.addEventListener('load', applyMobileFundDetailListV468, {once:true});
  document.addEventListener('elton:fund-cards-rendered', applyMobileFundDetailListV468);
  document.addEventListener('click', () => setTimeout(applyMobileFundDetailListV468, 80), true);
  [300, 900, 1800, 3500, 7000].forEach(ms => setTimeout(applyMobileFundDetailListV468, ms));

  window.__ELTAUM_MOBILE_FUND_DETAIL_LIST_V468__ = {
    build: BUILD,
    sync: applyMobileFundDetailListV468
  };
})();

/* PATCH v469 — Mobile: harmonia visual dos detalhes do fundo */
(function(){
  const BUILD = 'ELTAUM_MOBILE_FUND_DETAIL_HARMONY_v469';

  function applyMobileFundDetailHarmonyV469(){
    try{
      const html = document.documentElement;
      html.classList.add('mobile-v469','mobile-fund-detail-harmony-v469');
      const meta = document.querySelector('meta[name="app-build"]');
      if(meta) meta.content = BUILD;

      document.querySelectorAll('#mobileFundCards .fund-card-mobile-v26').forEach(card => {
        card.classList.add('fund-detail-harmony-card-v469');
      });
    }catch(_error){}
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', applyMobileFundDetailHarmonyV469, {once:true});
  }else{
    applyMobileFundDetailHarmonyV469();
  }

  window.addEventListener('load', applyMobileFundDetailHarmonyV469, {once:true});
  document.addEventListener('elton:fund-cards-rendered', applyMobileFundDetailHarmonyV469);
  document.addEventListener('click', () => setTimeout(applyMobileFundDetailHarmonyV469, 80), true);
  [300, 900, 1800, 3500, 7000].forEach(ms => setTimeout(applyMobileFundDetailHarmonyV469, ms));

  window.__ELTAUM_MOBILE_FUND_DETAIL_HARMONY_V469__ = {
    build: BUILD,
    sync: applyMobileFundDetailHarmonyV469
  };
})();

/* PATCH v470 — Juros e CDI: Agenda Copom consultiva e menos peso visual */
(function(){
  const BUILD = 'ELTAUM_RATES_COPOM_CONSULTATIVE_v470';
  let observerStarted = false;
  let scheduled = false;

  function cleanText(value){
    return String(value || '')
      .replace(/\u2212/g, '-')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function extractDecision(card){
    const status = cleanText(card.querySelector('.copom-exec-status-v270')?.textContent);
    const result = cleanText(card.querySelector('.copom-carousel-result-v321')?.textContent);
    const text = `${status} ${result}`.trim();
    const lower = text.toLowerCase();

    const move = text.match(/\b(corte|alta)\s*([+-]?\d+(?:[,.]\d+)?\s*p\.?\s*p\.?)/i);
    if(move){
      const type = move[1].toLowerCase() === 'alta' ? 'Alta' : 'Corte';
      const value = move[2]
        .replace(/[+-]/g, '')
        .replace(/\s*p\.?\s*p\.?/i, ' p.p.');
      return `${type} de ${value}`;
    }

    if(lower.includes('mantida')) return 'Mantida';
    if(lower.includes('prevista')) return 'Prevista';
    if(lower.includes('agenda') || lower.includes('próxima') || lower.includes('proxima')) return 'Próxima reunião';
    return status || result || 'Agenda';
  }

  function syncCopomConsultativeV470(){
    try{
      const html = document.documentElement;
      html.classList.add('mobile-v470','rates-copom-consultative-v470');
      const meta = document.querySelector('meta[name="app-build"]');
      if(meta) meta.content = BUILD;

      const summary = document.getElementById('copomExecutiveSummaryV270');
      if(!summary) return;

      summary.querySelectorAll(':scope > article').forEach(card => {
        const decision = extractDecision(card);
        let el = card.querySelector('.copom-decision-v470');
        if(!el){
          el = document.createElement('small');
          el.className = 'copom-decision-v470';
          card.appendChild(el);
        }
        el.textContent = decision;

        card.querySelectorAll('.copom-move-v430, .copom-move-v431').forEach(old => {
          old.setAttribute('aria-hidden','true');
        });
      });

      if(!observerStarted && window.MutationObserver){
        observerStarted = true;
        const obs = new MutationObserver(() => {
          if(scheduled) return;
          scheduled = true;
          requestAnimationFrame(() => {
            scheduled = false;
            syncCopomConsultativeV470();
          });
        });
        obs.observe(summary, { childList:true, subtree:true });
        window.__ELTAUM_RATES_COPOM_CONSULTATIVE_OBSERVER_V470__ = obs;
      }
    }catch(_error){}
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', syncCopomConsultativeV470, {once:true});
  }else{
    syncCopomConsultativeV470();
  }

  window.addEventListener('load', syncCopomConsultativeV470, {once:true});
  window.addEventListener('pageshow', syncCopomConsultativeV470, {passive:true});
  [300, 900, 1800, 3600, 6200, 9800, 14000, 22000].forEach(ms => setTimeout(syncCopomConsultativeV470, ms));

  window.__ELTAUM_RATES_COPOM_CONSULTATIVE_V470__ = {
    build: BUILD,
    sync: syncCopomConsultativeV470
  };
})();

/* PATCH v471 — Mobile: botoes "Ver mais" padronizados e rodape mais leve */
(function(){
  const BUILD = 'ELTAUM_MOBILE_TOGGLE_HARMONY_v471';

  function syncToggleHarmonyV471(){
    try{
      const html = document.documentElement;
      html.classList.add('mobile-v471','mobile-toggle-harmony-v471');
      const meta = document.querySelector('meta[name="app-build"]');
      if(meta) meta.content = BUILD;

      document.querySelectorAll('#sec-focus .section-toggle-btn, #sec-graficos .section-toggle-btn, #sec-mercado-painel .section-toggle-btn').forEach(btn => {
        btn.dataset.labelClosed = 'Ver mais';
        btn.dataset.labelOpen = 'Ver menos';
        const label = btn.querySelector('.toggle-label');
        const section = btn.closest('.collapsible-section');
        const isOpen = section?.classList.contains('section-expanded') || btn.getAttribute('aria-expanded') === 'true';
        if(label) label.textContent = isOpen ? 'Ver menos' : 'Ver mais';
      });
    }catch(_error){}
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', syncToggleHarmonyV471, {once:true});
  }else{
    syncToggleHarmonyV471();
  }

  window.addEventListener('load', syncToggleHarmonyV471, {once:true});
  document.addEventListener('click', () => setTimeout(syncToggleHarmonyV471, 80), true);
  [300, 900, 1800, 3500, 7000].forEach(ms => setTimeout(syncToggleHarmonyV471, ms));

  window.__ELTAUM_MOBILE_TOGGLE_HARMONY_V471__ = {
    build: BUILD,
    sync: syncToggleHarmonyV471
  };
})();

/* PATCH v472 — Mobile: Focus sem estouro horizontal */
(function(){
  const BUILD = 'ELTAUM_MOBILE_FOCUS_WRAP_v472';

  function syncFocusWrapV472(){
    try{
      const html = document.documentElement;
      html.classList.add('mobile-v472','mobile-focus-wrap-v472');
      const meta = document.querySelector('meta[name="app-build"]');
      if(meta) meta.content = BUILD;
    }catch(_error){}
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', syncFocusWrapV472, {once:true});
  }else{
    syncFocusWrapV472();
  }

  window.addEventListener('load', syncFocusWrapV472, {once:true});
  [300, 900, 1800, 3500].forEach(ms => setTimeout(syncFocusWrapV472, ms));

  window.__ELTAUM_MOBILE_FOCUS_WRAP_V472__ = {
    build: BUILD,
    sync: syncFocusWrapV472
  };
})();

/* PATCH v473 — Agenda Copom: decisao unica com movimento em p.p. */
(function(){
  const BUILD = 'ELTAUM_COPOM_SINGLE_DECISION_v473';
  let observerStarted = false;
  let scheduled = false;

  function clean(value){
    return String(value || '')
      .replace(/\u2212/g, '-')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function normalizeMove(value){
    const text = clean(value);
    const match = text.match(/\b(corte|alta)\b(?:\s+de)?\s*([+-]?\d+(?:[,.]\d+)?)\s*p\.?\s*p\.?/i);
    if(!match) return null;
    return {
      type: match[1].toLowerCase() === 'alta' ? 'Alta' : 'Corte',
      value: match[2].replace(/[+-]/g, '') + ' p.p.'
    };
  }

  function storeResults(){
    const store = document.getElementById('copomMeetings');
    if(!store) return [];
    return [...store.querySelectorAll('.copom-item')]
      .sort((a,b) => Number(a.dataset.originalOrder ?? 999) - Number(b.dataset.originalOrder ?? 999))
      .map(item => clean(item.querySelector('.copom-result')?.textContent));
  }

  function decisionFor(card, fallbackResult){
    const pieces = [
      card.querySelector('.copom-exec-status-v270')?.textContent,
      card.querySelector('.copom-carousel-result-v321')?.textContent,
      card.querySelector('.copom-move-v430')?.textContent,
      card.querySelector('.copom-move-v431')?.textContent,
      fallbackResult
    ].map(clean).filter(Boolean);
    const text = pieces.join(' ');
    const lower = text.toLowerCase();
    const move = normalizeMove(text);

    if(move) return `${move.type} de ${move.value}`;
    if(lower.includes('mantida')) return 'Mantida';
    if(lower.includes('corte')) return 'Corte';
    if(lower.includes('alta')) return 'Alta';
    if(lower.includes('prevista')) return 'Prevista';
    if(lower.includes('agenda') || lower.includes('próxima') || lower.includes('proxima')) return 'Próxima reunião';
    return clean(card.querySelector('.copom-exec-status-v270')?.textContent) || 'Agenda';
  }

  function hideLegacy(card){
    card.querySelectorAll('.copom-exec-meta-v270, .copom-exec-status-v270, .copom-carousel-result-v321, .copom-move-v430, .copom-move-v431').forEach(el => {
      el.setAttribute('aria-hidden', 'true');
      el.style.setProperty('display', 'none', 'important');
    });
  }

  function syncCopomSingleDecisionV473(){
    try{
      const html = document.documentElement;
      html.classList.add('mobile-v473','copom-single-decision-v473');
      const meta = document.querySelector('meta[name="app-build"]');
      if(meta) meta.content = BUILD;

      const summary = document.getElementById('copomExecutiveSummaryV270');
      if(!summary) return;

      const results = storeResults();
      const cards = [...summary.querySelectorAll(':scope > article')];
      cards.forEach((card, index) => {
        hideLegacy(card);
        let decision = card.querySelector('.copom-decision-v473');
        if(!decision){
          decision = document.createElement('small');
          decision.className = 'copom-decision-v473';
          card.appendChild(decision);
        }
        decision.textContent = decisionFor(card, results[index]);
      });

      if(!observerStarted && window.MutationObserver){
        observerStarted = true;
        const target = document.getElementById('sec-mercado') || summary;
        const obs = new MutationObserver(() => {
          if(scheduled) return;
          scheduled = true;
          requestAnimationFrame(() => {
            scheduled = false;
            syncCopomSingleDecisionV473();
          });
        });
        obs.observe(target, { childList:true, subtree:true });
        window.__ELTAUM_COPOM_SINGLE_DECISION_OBSERVER_V473__ = obs;
      }
    }catch(_error){}
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', syncCopomSingleDecisionV473, {once:true});
  }else{
    syncCopomSingleDecisionV473();
  }

  window.addEventListener('load', syncCopomSingleDecisionV473, {once:true});
  window.addEventListener('pageshow', syncCopomSingleDecisionV473, {passive:true});
  [300, 900, 1800, 3600, 6200, 9800, 14000, 22000].forEach(ms => setTimeout(syncCopomSingleDecisionV473, ms));

  window.__ELTAUM_COPOM_SINGLE_DECISION_V473__ = {
    build: BUILD,
    sync: syncCopomSingleDecisionV473
  };
})();

/* PATCH v474 — Mobile: Dolar PTAX mais compacto */
(function(){
  const BUILD = 'ELTAUM_DOLAR_MOBILE_COMPACT_V474';

  function syncDolarMobileCompactV474(){
    try{
      const html = document.documentElement;
      html.classList.add('mobile-v474','dolar-mobile-compact-v474');
      const meta = document.querySelector('meta[name="app-build"]');
      if(meta) meta.content = BUILD;
    }catch(_error){}
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', syncDolarMobileCompactV474, {once:true});
  }else{
    syncDolarMobileCompactV474();
  }

  window.addEventListener('load', syncDolarMobileCompactV474, {once:true});
  [300, 900, 1800, 3600, 7000].forEach(ms => setTimeout(syncDolarMobileCompactV474, ms));

window.__ELTAUM_DOLAR_MOBILE_COMPACT_V474__ = {
    build: BUILD,
    sync: syncDolarMobileCompactV474
  };
})();

/* PATCH v475 — Mobile: Poupanca mais leve e plana */
(function(){
  const BUILD = 'ELTAUM_SAVINGS_MOBILE_FLAT_V475';

  function syncSavingsMobileFlatV475(){
    try{
      const html = document.documentElement;
      html.classList.add('mobile-v475','savings-mobile-flat-v475');
      const meta = document.querySelector('meta[name="app-build"]');
      if(meta) meta.content = BUILD;

      const label = document.getElementById('poupCurrentLabelV214');
      if(label) label.textContent = 'Rendimento do mês';

      const yearLabel = document.querySelector('#sec-mercado .savings-summary-v207 .savings-kpi-v199.year dt');
      if(yearLabel) yearLabel.textContent = 'Acumulado 2026';

      const threshold = document.querySelector('#sec-mercado .savings-summary-v207 .savings-kpi-v199.threshold');
      if(threshold){
        const dt = threshold.querySelector('dt');
        const data = threshold.querySelector('data');
        if(dt) dt.textContent = 'Regra atual';
        if(data) data.textContent = 'Selic acima de 8,50%';
      }

      const ruleTitle = document.getElementById('poupCurrentScenarioTitleV214');
      if(ruleTitle) ruleTitle.textContent = 'Regra vigente';

      const source = document.querySelector('#sec-mercado .savings-actions-v207 .market-reference-source-v167');
      if(source){
        source.innerHTML = 'Simular rendimento <span aria-hidden="true">↗</span>';
        source.setAttribute('aria-label', 'Abrir simulador de rendimento da poupança do Banco Central em uma nova guia');
      }

      const btn = document.getElementById('poupExpandBtn');
      if(btn){
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.innerHTML = expanded ? 'Ocultar regras <span aria-hidden="true">▴</span>' : 'Ver regras <span aria-hidden="true">▾</span>';
      }
    }catch(_error){}
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', syncSavingsMobileFlatV475, {once:true});
  }else{
    syncSavingsMobileFlatV475();
  }

  window.addEventListener('load', syncSavingsMobileFlatV475, {once:true});
  window.addEventListener('pageshow', syncSavingsMobileFlatV475, {passive:true});
  [300, 900, 1800, 3600, 7000].forEach(ms => setTimeout(syncSavingsMobileFlatV475, ms));

  window.__ELTAUM_SAVINGS_MOBILE_FLAT_V475__ = {
    build: BUILD,
    sync: syncSavingsMobileFlatV475
  };
})();

/* PATCH v476 — Mobile: Dolar PTAX flat */
(function(){
  const BUILD = 'ELTAUM_DOLAR_MOBILE_FLAT_V476';

  function syncDolarMobileFlatV476(){
    try{
      const html = document.documentElement;
      html.classList.add('mobile-v476','dolar-mobile-flat-v476');
      const meta = document.querySelector('meta[name="app-build"]');
      if(meta) meta.content = BUILD;
    }catch(_error){}
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', syncDolarMobileFlatV476, {once:true});
  }else{
    syncDolarMobileFlatV476();
  }

  window.addEventListener('load', syncDolarMobileFlatV476, {once:true});
  window.addEventListener('pageshow', syncDolarMobileFlatV476, {passive:true});
  [300, 900, 1800, 3600, 7000].forEach(ms => setTimeout(syncDolarMobileFlatV476, ms));

  window.__ELTAUM_DOLAR_MOBILE_FLAT_V476__ = {
    build: BUILD,
    sync: syncDolarMobileFlatV476
  };
})();

/* PATCH v477 — Mobile: PTAX ultra compacta */
(function(){
  const BUILD = 'ELTAUM_DOLAR_MOBILE_ULTRA_COMPACT_V477';

  function syncDolarMobileUltraCompactV477(){
    try{
      const html = document.documentElement;
      html.classList.add('mobile-v477','dolar-mobile-ultra-compact-v477');
      const meta = document.querySelector('meta[name="app-build"]');
      if(meta) meta.content = BUILD;
    }catch(_error){}
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', syncDolarMobileUltraCompactV477, {once:true});
  }else{
    syncDolarMobileUltraCompactV477();
  }

  window.addEventListener('load', syncDolarMobileUltraCompactV477, {once:true});
  window.addEventListener('pageshow', syncDolarMobileUltraCompactV477, {passive:true});
  [300, 900, 1800, 3600, 7000].forEach(ms => setTimeout(syncDolarMobileUltraCompactV477, ms));

  window.__ELTAUM_DOLAR_MOBILE_ULTRA_COMPACT_V477__ = {
    build: BUILD,
    sync: syncDolarMobileUltraCompactV477
  };
})();

/* PATCH v478 — Mobile: evita corte de textos em fundos, filtros e ranking */
(function(){
  const BUILD = 'ELTAUM_MOBILE_NO_TEXT_CUT_V478';

  function syncMobileNoTextCutV478(){
    try{
      const html = document.documentElement;
      html.classList.add('mobile-v478','mobile-no-text-cut-v478');
      const meta = document.querySelector('meta[name="app-build"]');
      if(meta) meta.content = BUILD;
    }catch(_error){}
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', syncMobileNoTextCutV478, {once:true});
  }else{
    syncMobileNoTextCutV478();
  }

  window.addEventListener('load', syncMobileNoTextCutV478, {once:true});
  window.addEventListener('pageshow', syncMobileNoTextCutV478, {passive:true});
  [300, 900, 1800, 3600, 7000].forEach(ms => setTimeout(syncMobileNoTextCutV478, ms));

  window.__ELTAUM_MOBILE_NO_TEXT_CUT_V478__ = {
    build: BUILD,
    sync: syncMobileNoTextCutV478
  };
})();

/* PATCH v479 — Mobile: ranking compacto */
(function(){
  const BUILD = 'ELTAUM_MOBILE_RANKING_COMPACT_V479';

  function syncMobileRankingCompactV479(){
    try{
      const html = document.documentElement;
      html.classList.add('mobile-v479','mobile-ranking-compact-v479');
      const meta = document.querySelector('meta[name="app-build"]');
      if(meta) meta.content = BUILD;
    }catch(_error){}
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', syncMobileRankingCompactV479, {once:true});
  }else{
    syncMobileRankingCompactV479();
  }

  window.addEventListener('load', syncMobileRankingCompactV479, {once:true});
  window.addEventListener('pageshow', syncMobileRankingCompactV479, {passive:true});
  [300, 900, 1800, 3600, 7000].forEach(ms => setTimeout(syncMobileRankingCompactV479, ms));

  window.__ELTAUM_MOBILE_RANKING_COMPACT_V479__ = {
    build: BUILD,
    sync: syncMobileRankingCompactV479
  };
})();

/* PATCH v480 — Mobile: ranking compacto sem cortes */
(function(){
  const BUILD = 'ELTAUM_MOBILE_RANKING_SAFE_V480';

  function syncMobileRankingSafeV480(){
    try{
      const html = document.documentElement;
      html.classList.add('mobile-v480','mobile-ranking-safe-v480');
      const meta = document.querySelector('meta[name="app-build"]');
      if(meta) meta.content = BUILD;
    }catch(_error){}
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', syncMobileRankingSafeV480, {once:true});
  }else{
    syncMobileRankingSafeV480();
  }

  window.addEventListener('load', syncMobileRankingSafeV480, {once:true});
  window.addEventListener('pageshow', syncMobileRankingSafeV480, {passive:true});
  [300, 900, 1800, 3600, 7000].forEach(ms => setTimeout(syncMobileRankingSafeV480, ms));

  window.__ELTAUM_MOBILE_RANKING_SAFE_V480__ = {
    build: BUILD,
    sync: syncMobileRankingSafeV480
  };
})();

/* PATCH v481 — Mobile: filtros com selects seguros */
(function(){
  const BUILD = 'ELTAUM_MOBILE_FILTER_SELECT_SAFE_V481';

  function syncMobileFilterSelectSafeV481(){
    try{
      const html = document.documentElement;
      html.classList.add('mobile-v481','mobile-filter-select-safe-v481');
      const meta = document.querySelector('meta[name="app-build"]');
      if(meta) meta.content = BUILD;
    }catch(_error){}
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', syncMobileFilterSelectSafeV481, {once:true});
  }else{
    syncMobileFilterSelectSafeV481();
  }

  window.addEventListener('load', syncMobileFilterSelectSafeV481, {once:true});
  window.addEventListener('pageshow', syncMobileFilterSelectSafeV481, {passive:true});
  [300, 900, 1800, 3600, 7000].forEach(ms => setTimeout(syncMobileFilterSelectSafeV481, ms));

window.__ELTAUM_MOBILE_FILTER_SELECT_SAFE_V481__ = {
    build: BUILD,
    sync: syncMobileFilterSelectSafeV481
  };
})();

/* PATCH v482 — Mobile: filtros em lista com valor visual sem corte */
(function(){
  const BUILD = 'ELTAUM_MOBILE_FILTER_LIST_V482';
  const FIELD_LABELS = {
    mobileCategorySelectV74: 'Categoria',
    mobileRiskSelectV198: 'Perfil de risco',
    mobileSortSelectV75: 'Ordenar por'
  };

  function getOptionText(select){
    const option = select?.options?.[select.selectedIndex];
    return option ? option.textContent.trim() : 'Todos';
  }

  function upsertVisualFilterValueV482(select){
    if(!select) return;
    const host = select.closest('label') || select.parentElement;
    if(!host) return;

    host.classList.add('filter-list-row-v482');

    let label = host.querySelector(':scope > .filter-label-v482');
    if(!label){
      label = document.createElement('span');
      label.className = 'filter-label-v482';
      label.textContent = FIELD_LABELS[select.id] || select.getAttribute('aria-label') || 'Filtro';
      host.insertBefore(label, host.firstChild);
    }

    let value = host.querySelector(':scope > .filter-value-v482');
    if(!value){
      value = document.createElement('strong');
      value.className = 'filter-value-v482';
      const arrow = host.querySelector(':scope > .mobile-category-select-arrow-v74, :scope > .mobile-risk-arrow-v198, :scope > .mobile-sort-arrow-v75');
      if(arrow) host.insertBefore(value, arrow);
      else host.appendChild(value);
    }

    value.textContent = getOptionText(select);
  }

  function syncMobileFilterListV482(){
    try{
      const html = document.documentElement;
      html.classList.add('mobile-v482','mobile-filter-list-v482');
      const meta = document.querySelector('meta[name="app-build"]');
      if(meta) meta.content = BUILD;

      ['mobileCategorySelectV74','mobileRiskSelectV198','mobileSortSelectV75'].forEach(id => {
        const select = document.getElementById(id);
        if(!select) return;
        upsertVisualFilterValueV482(select);
        if(select.dataset.v482Bound === '1') return;
        select.addEventListener('change', () => {
          requestAnimationFrame(() => upsertVisualFilterValueV482(select));
          setTimeout(() => upsertVisualFilterValueV482(select), 80);
        }, {passive:true});
        select.dataset.v482Bound = '1';
      });
    }catch(_error){}
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', syncMobileFilterListV482, {once:true});
  }else{
    syncMobileFilterListV482();
  }

  window.addEventListener('load', syncMobileFilterListV482, {once:true});
  window.addEventListener('pageshow', syncMobileFilterListV482, {passive:true});
  [300, 900, 1800, 3600, 7000].forEach(ms => setTimeout(syncMobileFilterListV482, ms));

  window.__ELTAUM_MOBILE_FILTER_LIST_V482__ = {
    build: BUILD,
    sync: syncMobileFilterListV482
  };
})();

/* ELTAUM_DESKTOP_MARKET_HIERARCHY_V520_LEGACY
   Desktop only: corrige a seção Juros e CDI resetando transform/grid-area legados
   que faziam o bloco CDI invadir o Copom. Mantém mobile preservado. */
(function(){
  const FLAG = '__ELTAUM_DESKTOP_MARKET_HIERARCHY_V520_LEGACY__';
  if (window[FLAG]) return;
  window[FLAG] = true;

  const isDesktop = () => window.matchMedia && window.matchMedia('(min-width: 769px)').matches;
  const hasPatch = () => document.documentElement.classList.contains('desktop-market-hierarchy-v520') || document.documentElement.classList.contains('desktop-market-fix-v519');
  const set = (el, prop, value) => { if (el) el.style.setProperty(prop, value, 'important'); };
  const clear = (el, prop) => { if (el) el.style.removeProperty(prop); };
  const resetLegacyPlacement = (el) => {
    if (!el) return;
    set(el, 'transform', 'none');
    set(el, 'translate', 'none');
    set(el, 'grid-area', 'auto');
    set(el, 'grid-column', 'auto');
    set(el, 'justify-self', 'stretch');
    set(el, 'align-self', 'start');
  };

  function applyMarketFix(){
    if (!isDesktop() || !hasPatch()) return;
    document.documentElement.classList.add('desktop-market-hierarchy-v520');
    const root = document.getElementById('sec-mercado');
    if (!root) return;

    const rates = root.querySelector('.rates-reference-v167, .rates-executive-v255');
    if (rates){
      set(rates, 'display', 'grid');
      set(rates, 'grid-template-columns', '300px minmax(0,1fr)');
      set(rates, 'grid-template-areas', '"head head" "summary detail"');
      set(rates, 'gap', '14px 20px');
      set(rates, 'align-items', 'start');
      set(rates, 'overflow', 'visible');
    }

    const head = root.querySelector('.rates-reference-v167 > .market-reference-head-v167');
    set(head, 'grid-area', 'head');

    const summary = root.querySelector('.rates-summary-v167');
    if (summary){
      set(summary, 'grid-area', 'summary');
      set(summary, 'display', 'grid');
      set(summary, 'grid-template-columns', '1fr');
      set(summary, 'gap', '10px');
      set(summary, 'align-self', 'start');
      set(summary, 'width', '100%');
      set(summary, 'min-width', '0');
    }

    const detailGrid = root.querySelector('.rates-detail-grid-v167');
    if (detailGrid){
      set(detailGrid, 'grid-area', 'detail');
      set(detailGrid, 'display', 'grid');
      set(detailGrid, 'grid-template-columns', '1fr');
      set(detailGrid, 'grid-template-rows', 'auto auto');
      set(detailGrid, 'grid-template-areas', 'none');
      set(detailGrid, 'gap', '12px');
      set(detailGrid, 'width', '100%');
      set(detailGrid, 'min-width', '0');
      set(detailGrid, 'align-items', 'start');
      set(detailGrid, 'isolation', 'isolate');
      set(detailGrid, 'overflow', 'visible');
    }

    const copom = root.querySelector('.copom-compact-v167');
    if (copom){
      resetLegacyPlacement(copom);
      set(copom, 'grid-row', '1');
      set(copom, 'width', '100%');
      set(copom, 'min-width', '0');
      set(copom, 'height', 'auto');
      set(copom, 'margin', '0');
      set(copom, 'overflow', 'hidden');
      set(copom, 'z-index', '2');
    }

    const copomSummary = root.querySelector('#copomExecutiveSummaryV270');
    if (copomSummary){
      set(copomSummary, 'display', 'grid');
      set(copomSummary, 'grid-template-columns', 'repeat(2,minmax(0,1fr))');
      set(copomSummary, 'gap', '10px');
      set(copomSummary, 'width', '100%');
      set(copomSummary, 'max-width', '100%');
      set(copomSummary, 'overflow', 'hidden');
      set(copomSummary, 'scroll-snap-type', 'none');
    }
    root.querySelectorAll('#copomExecutiveSummaryV270 > article').forEach(card => {
      set(card, 'flex', 'initial');
      set(card, 'width', 'auto');
      set(card, 'min-width', '0');
      set(card, 'max-width', 'none');
      set(card, 'box-sizing', 'border-box');
      set(card, 'min-height', '72px');
    });

    const cdi = root.querySelector('#cdiYearHistory');
    if (cdi){
      resetLegacyPlacement(cdi);
      set(cdi, 'grid-row', '2');
      set(cdi, 'display', 'block');
      set(cdi, 'width', '100%');
      set(cdi, 'min-width', '0');
      set(cdi, 'max-width', '100%');
      set(cdi, 'height', 'auto');
      set(cdi, 'min-height', '0');
      set(cdi, 'max-height', 'none');
      set(cdi, 'margin', '0');
      set(cdi, 'position', 'relative');
      set(cdi, 'overflow', 'hidden');
      set(cdi, 'box-sizing', 'border-box');
      set(cdi, 'z-index', '1');
    }

    const cdiKpis = root.querySelector('#cdiYearHistory .cdi-kpis-v271');
    if (cdiKpis){
      set(cdiKpis, 'display', 'grid');
      set(cdiKpis, 'grid-template-columns', 'repeat(4,minmax(0,1fr))');
      set(cdiKpis, 'gap', '10px');
      set(cdiKpis, 'width', '100%');
    }

    const monthCarousel = root.querySelector('#cdiMonthCarouselV322');
    if (monthCarousel){
      set(monthCarousel, 'display', 'grid');
      set(monthCarousel, 'grid-template-columns', 'repeat(6,minmax(0,1fr))');
      set(monthCarousel, 'gap', '8px');
      set(monthCarousel, 'width', '100%');
      set(monthCarousel, 'overflow', 'hidden');
      set(monthCarousel, 'scroll-snap-type', 'none');
      set(monthCarousel, 'flex-wrap', 'initial');
    }
    root.querySelectorAll('#cdiMonthCarouselV322 > article').forEach(card => {
      set(card, 'flex', 'initial');
      set(card, 'width', 'auto');
      set(card, 'min-width', '0');
      set(card, 'max-width', 'none');
      set(card, 'box-sizing', 'border-box');
      set(card, 'min-height', '54px');
    });

    const canvasWrap = root.querySelector('.cdi-chart-canvas-wrap-v271');
    if (canvasWrap){
      set(canvasWrap, 'width', '100%');
      set(canvasWrap, 'height', '260px');
      set(canvasWrap, 'min-height', '260px');
      set(canvasWrap, 'max-height', '260px');
      set(canvasWrap, 'overflow', 'hidden');
    }
    const scrollWrap = root.querySelector('.cdi-chart-scroll-wrap-v273');
    const scrollInner = root.querySelector('#cdiChartScrollInnerV273');
    [scrollWrap, scrollInner].forEach(el => {
      if (!el) return;
      set(el, 'width', '100%');
      set(el, 'min-width', '0');
      set(el, 'max-width', '100%');
      set(el, 'overflow', 'hidden');
    });

    const canvas = root.querySelector('#cdiYearChartV271');
    if (canvas){
      set(canvas, 'width', '100%');
      set(canvas, 'height', '260px');
      set(canvas, 'max-height', '260px');
      try{
        if (window.Chart && typeof window.Chart.getChart === 'function'){
          const chart = window.Chart.getChart(canvas);
          if (chart && typeof chart.resize === 'function') chart.resize();
        }
      }catch(_){ }
    }
  }

  let raf = 0;
  function schedule(){
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      raf = 0;
      applyMarketFix();
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', schedule, {once:true});
  else schedule();
  window.addEventListener('load', () => { schedule(); setTimeout(schedule, 250); setTimeout(schedule, 900); }, {once:true});
  window.addEventListener('resize', schedule);

  const obs = new MutationObserver((mutations) => {
    if (!isDesktop() || !hasPatch()) return;
    for (const m of mutations){
      const t = m.target;
      if (t && t.nodeType === 1 && (t.id === 'sec-mercado' || (t.closest && t.closest('#sec-mercado')))){
        schedule();
        break;
      }
    }
  });
  try{ obs.observe(document.documentElement, {subtree:true, childList:true, attributes:true, attributeFilter:['style','class']}); }catch(_){ }
})();


/* ELTAUM_DESKTOP_MARKET_FILTERS_V523
   Desktop only: aplica largura integral à seção Mercado, remove o botão técnico do CDI
   e reforça a hierarquia sem mexer no mobile. */
(function(){
  const FLAG='__ELTAUM_DESKTOP_MARKET_FILTERS_V523__';
  if(window[FLAG]) return;
  window[FLAG]=true;
  const isDesktop=()=>window.matchMedia&&window.matchMedia('(min-width: 769px)').matches;
  const hasPatch=()=>document.documentElement.classList.contains('desktop-market-hierarchy-v523')||document.documentElement.classList.contains('desktop-filter-buttons-v523');
  const set=(el,prop,val)=>{ if(el) el.style.setProperty(prop,val,'important'); };
  const reset=(el)=>{
    if(!el) return;
    ['transform','translate','top','left','right','bottom'].forEach(p=>set(el,p,p==='transform'?'none':p==='translate'?'none':'auto'));
    set(el,'grid-area','auto');set(el,'grid-column','auto');set(el,'grid-row','auto');set(el,'position','relative');
    set(el,'justify-self','stretch');set(el,'align-self','start');set(el,'width','100%');set(el,'min-width','0');set(el,'max-width','100%');
    set(el,'height','auto');set(el,'min-height','0');set(el,'max-height','none');set(el,'margin','0');set(el,'box-sizing','border-box');
  };
  function apply(){
    if(!isDesktop()||!hasPatch()) return;
    document.documentElement.classList.add('desktop-market-hierarchy-v523','desktop-filter-buttons-v523');
    const root=document.getElementById('sec-mercado');
    if(root){
      set(root,'width','100%');set(root,'max-width','none');set(root,'margin-left','0');set(root,'margin-right','0');set(root,'padding-left','0');set(root,'padding-right','0');
      root.querySelectorAll('#cdiAnalyticLinkV274,.cdi-analytic-link-v274').forEach(el=>{set(el,'display','none');set(el,'visibility','hidden');set(el,'pointer-events','none');});
      root.querySelectorAll('.market-ref-grid,.market-reference-v167,.rates-reference-v167,.rates-executive-v255,.savings-reference-v167,#closedMonthLaunch').forEach(el=>{set(el,'width','100%');set(el,'max-width','none');set(el,'margin-left','0');set(el,'margin-right','0');});
      const marketGrid=root.querySelector('.market-ref-grid.market-reference-v167');set(marketGrid,'display','block');
      const rates=root.querySelector('.rates-reference-v167,.rates-executive-v255');
      if(rates){set(rates,'display','grid');set(rates,'grid-template-columns','260px minmax(0,1fr)');set(rates,'grid-template-areas','"head head" "summary detail"');set(rates,'gap','16px 24px');set(rates,'align-items','start');set(rates,'overflow','visible');set(rates,'min-height','auto');set(rates,'height','auto');set(rates,'padding','18px 20px 22px');}
      const head=root.querySelector('.rates-reference-v167 > .market-reference-head-v167');set(head,'grid-area','head');set(head,'margin','0');set(head,'padding','0 0 8px');
      const summary=root.querySelector('.rates-summary-v167');if(summary){set(summary,'grid-area','summary');set(summary,'display','grid');set(summary,'grid-template-columns','1fr');set(summary,'gap','12px');set(summary,'width','100%');set(summary,'min-width','0');set(summary,'margin','0');set(summary,'padding','0');}
      root.querySelectorAll('.rate-summary-card-v167').forEach(card=>{set(card,'min-height','104px');set(card,'height','auto');set(card,'max-height','none');set(card,'padding','14px 16px');});
      const detail=root.querySelector('.rates-detail-grid-v167');if(detail){set(detail,'grid-area','detail');set(detail,'display','flex');set(detail,'flex-direction','column');set(detail,'gap','14px');set(detail,'width','100%');set(detail,'min-width','0');set(detail,'margin','0');set(detail,'padding','0');set(detail,'overflow','visible');set(detail,'isolation','isolate');}
      const copom=root.querySelector('.copom-compact-v167');if(copom){reset(copom);set(copom,'z-index','2');set(copom,'padding','14px 16px');set(copom,'border-radius','14px');set(copom,'overflow','visible');}
      const copomSummary=root.querySelector('#copomExecutiveSummaryV270');if(copomSummary){set(copomSummary,'display','grid');set(copomSummary,'grid-template-columns','repeat(2,minmax(0,1fr))');set(copomSummary,'gap','12px');set(copomSummary,'width','100%');set(copomSummary,'max-width','100%');set(copomSummary,'overflow','visible');set(copomSummary,'scroll-snap-type','none');}
      root.querySelectorAll('#copomExecutiveSummaryV270 > article,.copom-exec-card-v270').forEach(card=>{set(card,'width','auto');set(card,'min-width','0');set(card,'max-width','none');set(card,'min-height','76px');set(card,'height','auto');set(card,'padding','10px 12px');set(card,'box-sizing','border-box');});
      root.querySelectorAll('.copom-exec-desc-v270').forEach(el=>{set(el,'max-width','100%');set(el,'line-height','1.28');set(el,'overflow','visible');set(el,'display','block');});
      const cdi=root.querySelector('#cdiYearHistory');if(cdi){reset(cdi);set(cdi,'z-index','1');set(cdi,'display','block');set(cdi,'padding','14px 16px');set(cdi,'border-radius','16px');set(cdi,'overflow','hidden');}
      const cdiHead=root.querySelector('#cdiYearHistory .cdi-year-head,#cdiYearHistory .cdi-chart-head-v271');if(cdiHead){set(cdiHead,'display','flex');set(cdiHead,'align-items','flex-start');set(cdiHead,'justify-content','flex-start');set(cdiHead,'gap','14px');set(cdiHead,'margin','0 0 12px');set(cdiHead,'padding','0');set(cdiHead,'border','0');}
      const kpis=root.querySelector('#cdiYearHistory .cdi-kpis-v271');if(kpis){set(kpis,'display','grid');set(kpis,'grid-template-columns','repeat(4,minmax(0,1fr))');set(kpis,'gap','10px');set(kpis,'width','100%');set(kpis,'margin','0 0 12px');}
      const months=root.querySelector('#cdiMonthCarouselV322');if(months){set(months,'display','grid');set(months,'grid-template-columns','repeat(3,minmax(0,1fr))');set(months,'gap','10px');set(months,'width','100%');set(months,'max-width','100%');set(months,'margin','0 0 12px');set(months,'padding','0');set(months,'overflow','hidden');set(months,'scroll-snap-type','none');}
      root.querySelectorAll('#cdiMonthCarouselV322 > article,.cdi-month-card-v322').forEach(card=>{set(card,'width','auto');set(card,'min-width','0');set(card,'max-width','none');set(card,'flex','initial');set(card,'min-height','54px');set(card,'padding','8px 10px');});
      const canvasWrap=root.querySelector('.cdi-chart-canvas-wrap-v271');if(canvasWrap){set(canvasWrap,'width','100%');set(canvasWrap,'height','260px');set(canvasWrap,'min-height','260px');set(canvasWrap,'max-height','260px');set(canvasWrap,'margin','0');set(canvasWrap,'overflow','hidden');}
      const canvas=root.querySelector('#cdiYearChartV271');if(canvas){set(canvas,'width','100%');set(canvas,'height','260px');set(canvas,'max-height','260px');try{const chart=window.Chart?.getChart?.(canvas);chart?.resize?.();}catch(_){}}
    }
  }
  let raf=0;function schedule(){if(raf) cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{raf=0;apply();});}
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',schedule,{once:true}); else schedule();
  window.addEventListener('load',()=>{schedule();setTimeout(schedule,250);setTimeout(schedule,900);},{once:true});
  window.addEventListener('resize',schedule,{passive:true});
})();


/* ELTAUM_DESKTOP_FILTER_CATEGORY_V524 — safety class only */
(function(){
  const FLAG='__ELTAUM_DESKTOP_FILTER_CATEGORY_V524__';
  if(window[FLAG]) return;
  window[FLAG]=true;
  function apply(){
    if(window.matchMedia && window.matchMedia('(min-width: 769px)').matches){
      document.documentElement.classList.add('desktop-filter-buttons-v524');
    }
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',apply,{once:true}); else apply();
  window.addEventListener('resize',apply,{passive:true});
})();


/* ELTAUM_DESKTOP_CATALOG_BASE_V525
   Base desktop restaurada: tabela única, sem alternância de cards/executiva/detalhada.
   Mantém mobile preservado e impede scripts antigos de reativarem fund-card-mode no desktop. */
(function(){
  function isDesktopV525(){
    return !window.matchMedia || window.matchMedia('(min-width: 769px)').matches;
  }
  function enforceDesktopCatalogBaseV525(){
    if(!isDesktopV525()) return;
    document.documentElement.classList.add('desktop-catalog-base-v525');
    var metaBuild=document.querySelector('meta[name="app-build"]');
    if(metaBuild) metaBuild.content='ELTAUM_DESKTOP_CATALOG_BASE_V525';
    if(document.body){
      document.body.classList.remove('fund-card-mode','mobile-catalog-cards-mode','mobile-catalog-table-mode');
    }
    var toggle=document.querySelector('#sec-fundos .desktop-table-mode-control, #sec-fundos .vista-toggle-wrap');
    if(toggle) toggle.remove();
    var cards=document.getElementById('mobileFundCards');
    if(cards){
      cards.style.setProperty('display','none','important');
      cards.setAttribute('aria-hidden','true');
    }
    var table=document.querySelector('#sec-fundos .table-wrap');
    if(table){
      table.style.removeProperty('display');
      table.removeAttribute('aria-hidden');
    }
    try{
      if(typeof vistaAtual !== 'undefined') vistaAtual='reuniao';
    }catch(e){}
  }
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded', enforceDesktopCatalogBaseV525, {once:true});
  }else{
    enforceDesktopCatalogBaseV525();
  }
  window.addEventListener('resize', enforceDesktopCatalogBaseV525, {passive:true});
  window.addEventListener('load', enforceDesktopCatalogBaseV525, {once:true});
  setTimeout(enforceDesktopCatalogBaseV525, 0);
  setTimeout(enforceDesktopCatalogBaseV525, 400);
  setTimeout(enforceDesktopCatalogBaseV525, 1200);
  try{
    var obs=new MutationObserver(function(muts){
      if(!isDesktopV525() || !document.body) return;
      if(document.body.classList.contains('fund-card-mode') || document.body.classList.contains('mobile-catalog-cards-mode')){
        enforceDesktopCatalogBaseV525();
      }
    });
    if(document.body) obs.observe(document.body,{attributes:true,attributeFilter:['class']});
    else document.addEventListener('DOMContentLoaded',function(){ obs.observe(document.body,{attributes:true,attributeFilter:['class']}); },{once:true});
  }catch(e){}
})();


/* ELTAUM_DESKTOP_FILTER_ACTIONS_V526
   Desktop only: restaura o comportamento acumulativo dos filtros.
   - Público-alvo volta a filtrar de fato e acumula com categoria/risco/busca.
   - Categoria ativa pode ser clicada novamente para limpar apenas a categoria.
   - Filtros ativos deixam de duplicar o rótulo e passam a refletir os filtros reais. */
(function(){
  'use strict';
  const FLAG='__ELTAUM_DESKTOP_FILTER_ACTIONS_V526__';
  if(window[FLAG]) return;
  window[FLAG]=true;
  const BUILD='ELTAUM_DESKTOP_FILTER_ACTIONS_V526';
  const isDesktop=()=>!window.matchMedia || window.matchMedia('(min-width: 769px)').matches;
  const qs=(sel,root=document)=>root.querySelector(sel);
  const qsa=(sel,root=document)=>Array.from(root.querySelectorAll(sel));

  function syncAudienceButtonsV526(){
    if(!isDesktop()) return;
    let atual='';
    try{ atual=String(activePerfil||''); }catch(e){}
    qsa('#sec-fundos .desktop-audience-chip-v488[data-audience-v488]').forEach(btn=>{
      const val=String(btn.dataset.audienceV488||'');
      const on=val===atual;
      btn.classList.toggle('active',on);
      btn.setAttribute('aria-pressed',on?'true':'false');
    });
  }

  function syncDesktopFiltersV526(){
    if(!isDesktop()) return;
    document.documentElement.classList.add('desktop-filter-actions-v526','desktop-catalog-base-v525');
    syncAudienceButtonsV526();
    try{ if(window.__ELTAUM_CATEGORY_EXACT_STABLE_V87__ && typeof window.__ELTAUM_CATEGORY_EXACT_STABLE_V87__.sync==='function') window.__ELTAUM_CATEGORY_EXACT_STABLE_V87__.sync(); }catch(e){}
    try{ if(typeof syncRiskProfileControlsV198==='function') syncRiskProfileControlsV198(); }catch(e){}
    const meta=document.querySelector('meta[name="app-build"]');
    if(meta) meta.content=BUILD;
  }

  function applyAudienceV526(btn){
    if(!btn || !isDesktop()) return;
    const val=String(btn.dataset.audienceV488||'');
    const wasActive=btn.getAttribute('aria-pressed')==='true';
    try{
      activePerfil=(wasActive && val) ? '' : val;
      currentPage=1;
      window.__favListMode=false;
      if(expandedRows && typeof expandedRows.clear==='function') expandedRows.clear();
    }catch(e){}
    syncAudienceButtonsV526();
    try{ if(typeof applyFilter==='function') applyFilter(); }catch(e){ console.error('v526 audience filter',e); }
    setTimeout(syncDesktopFiltersV526,0);
    requestAnimationFrame(syncDesktopFiltersV526);
  }

  function clearByKindV526(kind){
    if(!isDesktop()) return;
    try{
      if(kind==='all'){
        if(typeof clearAllFilters==='function') clearAllFilters();
        else { activeCat=''; activeBenchmark=''; activePerfil=''; activeRisco=''; hideSemDados=false; if(typeof applyFilter==='function') applyFilter(); }
      }else if(typeof clearFilter==='function'){
        clearFilter(kind);
      }else{
        if(kind==='cat') activeCat='';
        if(kind==='benchmark') activeBenchmark='';
        if(kind==='perfil') activePerfil='';
        if(kind==='risco') activeRisco='';
        if(kind==='semDados') hideSemDados=false;
        if(typeof applyFilter==='function') applyFilter();
      }
    }catch(e){}
    setTimeout(syncDesktopFiltersV526,0);
    requestAnimationFrame(syncDesktopFiltersV526);
  }

  function bindDesktopFiltersV526(){
    syncDesktopFiltersV526();
    if(document.documentElement.dataset.v526DesktopFiltersBound==='1') return;
    document.documentElement.dataset.v526DesktopFiltersBound='1';

    document.addEventListener('click',ev=>{
      const audienceBtn=ev.target.closest && ev.target.closest('#sec-fundos .desktop-audience-chip-v488[data-audience-v488]');
      if(audienceBtn && isDesktop()){
        ev.preventDefault();
        ev.stopPropagation();
        if(typeof ev.stopImmediatePropagation==='function') ev.stopImmediatePropagation();
        applyAudienceV526(audienceBtn);
        return;
      }

      const clearBtn=ev.target.closest && ev.target.closest('#activeFilterStrip [data-clear-filter]');
      if(clearBtn && isDesktop()){
        ev.preventDefault();
        ev.stopPropagation();
        if(typeof ev.stopImmediatePropagation==='function') ev.stopImmediatePropagation();
        clearByKindV526(clearBtn.dataset.clearFilter||'all');
      }
    },true);

    document.addEventListener('change',ev=>{
      if(!isDesktop()) return;
      if(ev.target && ev.target.id==='catalogRiskSelectV198') setTimeout(syncDesktopFiltersV526,0);
    },true);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',bindDesktopFiltersV526,{once:true}); else bindDesktopFiltersV526();
  window.addEventListener('load',()=>{syncDesktopFiltersV526();setTimeout(syncDesktopFiltersV526,400);},{once:true});
  window.addEventListener('resize',syncDesktopFiltersV526,{passive:true});
  [250,900,1800,3200].forEach(ms=>setTimeout(syncDesktopFiltersV526,ms));
  window.__ELTAUM_DESKTOP_FILTER_ACTIONS_V526__={build:BUILD,sync:syncDesktopFiltersV526};
})();


/* ELTAUM_DESKTOP_POLISH_V528
   Desktop only: aplica a classe de acabamento visual, mantém tabela única e remove ruídos legados. */
(function(){
  'use strict';
  const FLAG='__ELTAUM_DESKTOP_POLISH_V528__';
  if(window[FLAG]) return;
  window[FLAG]=true;
  const isDesktop=()=>!window.matchMedia || window.matchMedia('(min-width: 769px)').matches;
  function apply(){
    if(!isDesktop()) return;
    document.documentElement.classList.add('desktop-polish-v528','desktop-catalog-clean-v527','desktop-catalog-base-v525');
    const meta=document.querySelector('meta[name="app-build"]');
    if(meta) meta.content='ELTAUM_DESKTOP_POLISH_V528';
    if(document.body){
      document.body.classList.remove('fund-card-mode','mobile-catalog-cards-mode','mobile-catalog-table-mode');
    }
    document.querySelectorAll('#mobileCatalogViewSwitch, #sec-fundos .mobile-catalog-view-switch, #sec-fundos .mobile-catalog-view-btn[data-mobile-catalog-view="cards"], #sec-fundos .mobile-catalog-view-panel, #sec-fundos .mobile-view-toggle').forEach(el=>{
      el.setAttribute('aria-hidden','true');
      el.style.setProperty('display','none','important');
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',apply,{once:true}); else apply();
  window.addEventListener('load',apply,{once:true});
  window.addEventListener('resize',apply,{passive:true});
  setTimeout(apply,300);
  setTimeout(apply,1200);
})();


/* =========================================================
   PATCH v534 — Desktop: reposiciona Pontos de atenção como faixa
   Mantém a estrutura mobile original. No desktop, retira a coluna lateral
   e insere o bloco entre a leitura rápida e o Top 10.
   ========================================================= */
(function(){
  const BUILD='ELTAUM_DESKTOP_RANKING_ATTENTION_STRIP_V534';
  const mq=window.matchMedia ? window.matchMedia('(min-width:769px)') : {matches:true,addEventListener:null,addListener:null};
  let cachedAttention=null;

  function q(sel,root=document){return root.querySelector(sel)}
  function qa(sel,root=document){return Array.from(root.querySelectorAll(sel))}

  function ensureClass(){
    document.documentElement.classList.add('desktop-ranking-attention-strip-v534');
    const meta=q('meta[name="app-build"]');
    if(meta) meta.content=BUILD;
  }

  function createAttention(){
    const aside=document.createElement('aside');
    aside.id='rankingAttentionV136';
    aside.className='ranking-attention-panel-v136 ranking-attention-strip-v534';
    aside.setAttribute('aria-label','Pontos de atenção dos fundos');
    aside.innerHTML='<div class="attention-head-v136"><span>⚠️</span><div><strong>Pontos de atenção</strong><small>Alertas consultivos da base</small></div></div><div class="attention-body-v136"><div class="attention-empty-v136">Carregando insights...</div></div>';
    return aside;
  }

  function detachAttention(){
    const aside=q('#rankingAttentionV136');
    if(aside){
      cachedAttention=aside;
      if(aside.parentNode) aside.parentNode.removeChild(aside);
    }
  }

  function moveAttention(){
    ensureClass();
    const section=q('#rankingsSection');
    if(!section) return;
    const layout=q('.ranking-layout-v136',section);
    const grid=q('#rankingGrid',section);
    if(!layout || !grid) return;
    let aside=cachedAttention || q('#rankingAttentionV136',section) || createAttention();
    aside.classList.add('ranking-attention-strip-v534');

    if(mq.matches){
      const insight=q('.ranking-exec-insight',grid);
      if(insight){
        insight.insertAdjacentElement('afterend',aside);
      }else if(aside.parentNode!==grid){
        grid.appendChild(aside);
      }
    }else{
      if(aside.parentNode!==layout) layout.appendChild(aside);
    }
    cachedAttention=aside;
  }

  function compactAttentionDetails(){
    if(!mq.matches) return;
    const aside=q('#rankingAttentionV136');
    const body=q('.attention-body-v136',aside||document);
    if(!aside || !body) return;
    aside.classList.add('ranking-attention-strip-v534');
    const blocks=qa(':scope > .attention-block-v136',body);
    const foot=q(':scope > .attention-foot-v136',body);
    if(blocks.length<=1) return;
    if(q(':scope > .attention-details-v534',body)) return;

    const details=document.createElement('details');
    details.className='attention-details-v534';
    details.innerHTML='<summary>Ver alertas</summary><div class="attention-details-body-v534"></div>';
    const detailsBody=q('.attention-details-body-v534',details);
    blocks.slice(1).forEach(block=>detailsBody.appendChild(block));
    if(foot) detailsBody.appendChild(foot);
    body.appendChild(details);
  }

  function apply(){
    moveAttention();
    setTimeout(()=>{moveAttention(); compactAttentionDetails();},0);
    setTimeout(()=>{moveAttention(); compactAttentionDetails();},80);
  }

  function wrapRankingRender(){
    const original=window.renderRankings || (typeof renderRankings==='function' ? renderRankings : null);
    if(!original || original.__attentionStripV534) return;
    const wrapped=function(){
      detachAttention();
      const result=original.apply(this,arguments);
      apply();
      return result;
    };
    wrapped.__attentionStripV534=true;
    try{window.renderRankings=wrapped;}catch(e){}
    try{renderRankings=wrapped;}catch(e){}
  }

  function init(){
    ensureClass();
    wrapRankingRender();
    apply();
    setTimeout(()=>{wrapRankingRender();apply();},300);
    setTimeout(()=>{wrapRankingRender();apply();},1200);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true}); else init();
  if(mq.addEventListener) mq.addEventListener('change',apply); else if(mq.addListener) mq.addListener(apply);
})();


/* =========================================================
   PATCH v536 — Desktop ranking hierarchy cleanup
   - Remove Leitura rápida da visão desktop.
   - Mantém Pontos de atenção como faixa e abre alertas em linha, largura cheia.
   - Centraliza o cabeçalho da seção de rankings.
   ========================================================= */
(function(){
  const BUILD='ELTAUM_DESKTOP_RANKING_HIERARCHY_V536';
  const mq=window.matchMedia ? window.matchMedia('(min-width:769px)') : {matches:true,addEventListener:null,addListener:null};
  let busy=false;

  function q(sel,root=document){return root.querySelector(sel)}
  function qa(sel,root=document){return Array.from(root.querySelectorAll(sel))}

  function ensureBuild(){
    document.documentElement.classList.add('desktop-ranking-hierarchy-v536');
    const meta=q('meta[name="app-build"]');
    if(meta) meta.content=BUILD;
  }

  function removeQuickRead(){
    if(!mq.matches) return;
    qa('#rankingsSection .ranking-exec-insight').forEach(el=>el.remove());
  }

  function normalizeAttention(){
    if(!mq.matches || busy) return;
    const aside=q('#rankingAttentionV136');
    const host=q('.attention-body-v136',aside||document);
    if(!aside || !host) return;
    const metric=q('.attention-metric-grid-v136',host);
    if(!metric) return;

    const existingDetails=q('.attention-details-v536',host);
    const wasOpen=!!(existingDetails && existingDetails.open) || !!q('.attention-details-v534[open]',host);
    const blocks=qa('.attention-block-v136',host);
    const foot=q('.attention-foot-v136',host);
    const detailsBlocks=[];

    blocks.forEach(block=>{
      const title=(q('h3',block)?.textContent||'').trim().toLowerCase();
      if(title.includes('insight')){
        block.remove();
        return;
      }
      detailsBlocks.push(block);
    });
    if(foot) detailsBlocks.push(foot);

    // Se a v534/v535 já tiver criado um details antigo, reaproveita os blocos de dentro.
    qa('.attention-details-v534 .attention-block-v136',host).forEach(block=>{
      const title=(q('h3',block)?.textContent||'').trim().toLowerCase();
      if(!title.includes('insight') && !detailsBlocks.includes(block)) detailsBlocks.push(block);
    });
    const oldFoot=q('.attention-details-v534 .attention-foot-v136',host);
    if(oldFoot && !detailsBlocks.includes(oldFoot)) detailsBlocks.push(oldFoot);

    busy=true;
    const details=document.createElement('details');
    details.className='attention-details-v536';
    if(wasOpen) details.open=true;
    details.innerHTML='<summary>Ver alertas</summary>';

    const body=document.createElement('div');
    body.className='attention-details-body-v536';
    detailsBlocks.forEach(node=>body.appendChild(node));

    host.innerHTML='';
    host.appendChild(metric);
    host.appendChild(details);
    if(detailsBlocks.length){
      host.appendChild(body);
    }else{
      details.style.display='none';
    }
    busy=false;
  }

  function apply(){
    ensureBuild();
    removeQuickRead();
    normalizeAttention();
  }

  function observe(){
    const target=q('#rankingsSection');
    if(!target || target.dataset.v536Observer==='1') return;
    target.dataset.v536Observer='1';
    const obs=new MutationObserver(()=>{
      clearTimeout(target.__rankingV536Timer);
      target.__rankingV536Timer=setTimeout(apply,30);
    });
    obs.observe(target,{childList:true,subtree:true});
  }

  function wrapRankingRender(){
    const original=window.renderRankings || (typeof renderRankings==='function' ? renderRankings : null);
    if(!original || original.__desktopV536) return;
    const wrapped=function(){
      const result=original.apply(this,arguments);
      setTimeout(apply,0);
      return result;
    };
    wrapped.__desktopV536=true;
    try{window.renderRankings=wrapped;}catch(e){}
    try{renderRankings=wrapped;}catch(e){}
  }

  function init(){
    ensureBuild();
    wrapRankingRender();
    apply();
    observe();
    setTimeout(()=>{wrapRankingRender();apply();observe();},250);
    setTimeout(()=>{wrapRankingRender();apply();observe();},1200);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true}); else init();
  if(mq.addEventListener) mq.addEventListener('change',apply); else if(mq.addListener) mq.addListener(apply);
})();


/* =========================================================
   PATCH v537 — Desktop: semântica dos alertas dos rankings
   Escopo: somente desktop.
   - Renomeia Piores leituras para Piores em 12 meses.
   - Remove Sem dados / pipeline da área consultiva principal.
   - Mantém Pontos de atenção em faixa horizontal, sem coluna lateral.
   ========================================================= */
(function(){
  const BUILD='ELTAUM_DESKTOP_RANKING_ALERTS_SEMANTIC_V537';
  const mq=window.matchMedia ? window.matchMedia('(min-width:769px)') : {matches:true,addEventListener:null,addListener:null};
  let busy=false;

  function q(sel,root=document){return root.querySelector(sel)}
  function qa(sel,root=document){return Array.from(root.querySelectorAll(sel))}
  function txt(el){return (el && el.textContent || '').trim().toLowerCase()}

  function ensureBuild(){
    document.documentElement.classList.add('desktop-ranking-alerts-semantic-v537');
    const meta=q('meta[name="app-build"]');
    if(meta) meta.content=BUILD;
  }

  function removeQuickRead(){
    if(!mq.matches) return;
    qa('#rankingsSection .ranking-exec-insight').forEach(el=>el.remove());
  }

  function renameAndTrimAttention(){
    if(!mq.matches || busy) return;
    const aside=q('#rankingAttentionV136');
    const host=q('.attention-body-v136', aside || document);
    if(!aside || !host) return;

    // Remove o indicador de qualidade da base da área consultiva principal.
    qa('.attention-metric-v136', host).forEach(metric=>{
      if(txt(metric).includes('sem dados')) metric.remove();
    });

    // Renomeia o bloco de 12M e remove blocos não consultivos.
    qa('.attention-block-v136', host).forEach(block=>{
      const h=q('h3', block);
      const title=txt(h);
      if(title.includes('piores leituras')) h.textContent='Piores em 12 meses';
      if(title.includes('sem dados') || title.includes('pipeline') || title.includes('insight')) block.remove();
    });

    const foot=q('.attention-foot-v136', host);
    if(foot) foot.textContent='Alertas automáticos para apoio à análise. Não substituem suitability, objetivo e horizonte do cliente.';

    // Se a v536 já organizou em details + body, garante apenas os dois blocos úteis.
    const details=q('.attention-details-v536', host);
    const body=q('.attention-details-body-v536', host);
    if(details && body){
      qa('.attention-block-v136', body).forEach(block=>{
        const h=q('h3', block);
        const title=txt(h);
        if(title.includes('piores leituras')) h.textContent='Piores em 12 meses';
        if(title.includes('sem dados') || title.includes('pipeline') || title.includes('insight')) block.remove();
      });
      const useful=qa('.attention-block-v136', body);
      if(!useful.length){
        details.style.display='none';
        body.style.display='none';
      }else{
        details.style.display='block';
      }
    }
  }

  function apply(){
    ensureBuild();
    removeQuickRead();
    renameAndTrimAttention();
  }

  function wrapRankingRender(){
    const original=window.renderRankings || (typeof renderRankings==='function' ? renderRankings : null);
    if(!original || original.__desktopV537) return;
    const wrapped=function(){
      const result=original.apply(this,arguments);
      setTimeout(apply,0);
      setTimeout(apply,80);
      return result;
    };
    wrapped.__desktopV537=true;
    try{window.renderRankings=wrapped;}catch(e){}
    try{renderRankings=wrapped;}catch(e){}
  }

  function observe(){
    const target=q('#rankingsSection');
    if(!target || target.dataset.v537Observer==='1') return;
    target.dataset.v537Observer='1';
    const obs=new MutationObserver(()=>{
      clearTimeout(target.__rankingV537Timer);
      target.__rankingV537Timer=setTimeout(apply,40);
    });
    obs.observe(target,{childList:true,subtree:true});
  }

  function init(){
    ensureBuild();
    wrapRankingRender();
    apply();
    observe();
    setTimeout(()=>{wrapRankingRender();apply();observe();},250);
    setTimeout(()=>{wrapRankingRender();apply();observe();},1200);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true}); else init();
  if(mq.addEventListener) mq.addEventListener('change',apply); else if(mq.addListener) mq.addListener(apply);
})();


/* =========================================================
   PATCH v542 — Desktop: Ver mais estavel, sem recriar o grafico
   ========================================================= */
(function desktopSectionToggleFixV542(){
  if(window.__desktopSectionToggleFixV542Installed) return;
  window.__desktopSectionToggleFixV542Installed = true;

  var SECTION_IDS = ['rankingsSection','sec-dolar'];
  var BTN_SELECTOR = '.desktop-section-more-v539, .desktop-section-more-v540, .desktop-section-more-v541, [data-desktop-section-toggle]';
  var root = document.documentElement;

  root.classList.add('desktop-section-toggle-fix-v542');
  var meta = document.querySelector('meta[name="app-build"]');
  if(meta) meta.content = 'ELTAUM_DESKTOP_SECTION_TOGGLE_FIX_V542';

  function getSectionIdFromButton(btn){
    if(!btn) return '';
    return btn.getAttribute('data-desktop-section-toggle') ||
      (btn.classList.contains('ranking-more-v539') ? 'rankingsSection' :
       btn.classList.contains('dolar-more-v539') ? 'sec-dolar' : '');
  }

  function getToggleButton(section){
    if(!section) return null;
    return section.querySelector(BTN_SELECTOR);
  }

  function setButtonState(section, isOpen){
    var btn = getToggleButton(section);
    if(!btn) return;
    btn.removeAttribute('onclick');
    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    var label = btn.querySelector('.toggle-label');
    var icon = btn.querySelector('.toggle-icon');
    var closed = btn.getAttribute('data-label-closed') || 'Ver mais';
    var open = btn.getAttribute('data-label-open') || 'Ver menos';
    if(label) label.textContent = isOpen ? open : closed;
    if(icon) icon.textContent = isOpen ? '-' : '›';
  }

  function syncDolarDetails(section, isOpen){
    if(!section || section.id !== 'sec-dolar') return;
    section.classList.toggle('dolar-details-collapsed-v542', !isOpen);
    ['dolarChartPanel','ptaxStatsCard'].forEach(function(id){
      var el = document.getElementById(id);
      if(!el) return;
      el.hidden = false;
      el.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    });
    var footer = section.querySelector('.dolar-compact-footer');
    if(footer){
      footer.hidden = false;
      footer.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    }
  }

  function refreshDolarChartWhenOpened(sectionId, isOpen){
    if(sectionId !== 'sec-dolar' || !isOpen) return;
    var raf = window.requestAnimationFrame || function(cb){ return setTimeout(cb, 16); };
    raf(function(){
      raf(function(){
        try{
          var canvas = document.getElementById('chartDolar');
          var chart = window.Chart && canvas ? Chart.getChart(canvas) : null;
          if(chart && typeof chart.resize === 'function') chart.resize();
          if(chart && typeof chart.update === 'function') chart.update('none');
          window.dispatchEvent(new Event('resize'));
        }catch(err){
          console.warn('[Dolar PTAX] grafico aguardando layout:', err);
        }
      });
    });
  }

  function setSectionOpen(sectionId, isOpen){
    var section = document.getElementById(sectionId);
    if(!section) return false;
    if(sectionId === 'sec-dolar'){
      section.dataset.desktopDesiredOpenV544 = isOpen ? 'true' : 'false';
      section.dataset.desktopUserToggledV544 = '1';
    }
    section.classList.toggle('section-expanded', !!isOpen);
    section.classList.toggle('section-collapsed', !isOpen);
    section.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    setButtonState(section, !!isOpen);
    syncDolarDetails(section, !!isOpen);
    refreshDolarChartWhenOpened(sectionId, !!isOpen);
    return false;
  }

  window.toggleDesktopCompactSection = function(event, sectionId){
    if(event){
      if(event.__desktopCompactToggleV542Handled) return false;
      event.__desktopCompactToggleV542Handled = true;
      if(typeof event.preventDefault === 'function') event.preventDefault();
      if(typeof event.stopPropagation === 'function') event.stopPropagation();
      if(typeof event.stopImmediatePropagation === 'function') event.stopImmediatePropagation();
    }
    var section = document.getElementById(sectionId);
    if(!section) return false;
    return setSectionOpen(sectionId, !section.classList.contains('section-expanded'));
  };

  function initSection(id){
    var section = document.getElementById(id);
    if(!section) return;
    var btn = getToggleButton(section);
    if(btn){
      btn.setAttribute('data-desktop-section-toggle', id);
      btn.removeAttribute('onclick');
      btn.style.pointerEvents = 'auto';
      btn.style.cursor = 'pointer';
    }
    var isOpen = section.classList.contains('section-expanded');
    if(id === 'sec-dolar' && !section.dataset.desktopDesiredOpenV544){
      section.dataset.desktopDesiredOpenV544 = isOpen ? 'true' : 'false';
    }
    section.classList.toggle('section-collapsed', !isOpen);
    section.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    setButtonState(section, isOpen);
    syncDolarDetails(section, isOpen);
  }

  function init(){
    SECTION_IDS.forEach(initSection);
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true});
  else init();

  document.addEventListener('click', function(ev){
    var btn = ev.target && ev.target.closest ? ev.target.closest(BTN_SELECTOR) : null;
    if(!btn) return;
    var id = getSectionIdFromButton(btn);
    if(!id) return;
    window.toggleDesktopCompactSection(ev, id);
  }, true);
})();


/* =========================================================
   PATCH v543 — Desktop: oculta seletor de visualizacao mobile
   ========================================================= */
(function desktopHideMobileViewSwitchV543(){
  if(window.__desktopHideMobileViewSwitchV543Installed) return;
  window.__desktopHideMobileViewSwitchV543Installed = true;

  function isDesktop(){
    return !window.matchMedia || window.matchMedia('(min-width: 769px)').matches;
  }

  function apply(){
    if(!isDesktop()) return;
    document.documentElement.classList.add('desktop-hide-mobile-view-switch-v543');
    var meta = document.querySelector('meta[name="app-build"]');
    if(meta) meta.content = 'ELTAUM_DESKTOP_HIDE_MOBILE_VIEW_SWITCH_V543';
    document.querySelectorAll('#mobileCatalogViewSwitch, #sec-fundos .mobile-catalog-view-switch').forEach(function(el){
      el.setAttribute('aria-hidden','true');
      el.style.setProperty('display','none','important');
      el.style.setProperty('visibility','hidden','important');
      el.style.setProperty('height','0','important');
      el.style.setProperty('min-height','0','important');
      el.style.setProperty('max-height','0','important');
      el.style.setProperty('margin','0','important');
      el.style.setProperty('padding','0','important');
      el.style.setProperty('border','0','important');
      el.style.setProperty('overflow','hidden','important');
    });
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply, {once:true});
  else apply();
  window.addEventListener('load', apply, {once:true});
  window.addEventListener('resize', apply, {passive:true});
  setTimeout(apply, 300);
  setTimeout(apply, 1200);
})();


/* =========================================================
   PATCH v544 — Desktop: trava estado manual do Dolar PTAX
   ========================================================= */
(function desktopDolarToggleStateGuardV544(){
  if(window.__desktopDolarToggleStateGuardV544Installed) return;
  window.__desktopDolarToggleStateGuardV544Installed = true;

  function isDesktop(){
    return !window.matchMedia || window.matchMedia('(min-width: 769px)').matches;
  }

  function getButton(){
    return document.querySelector('[data-desktop-section-toggle="sec-dolar"], .dolar-more-v539');
  }

  function setButtonState(btn, isOpen){
    if(!btn) return;
    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    var label = btn.querySelector('.toggle-label');
    var icon = btn.querySelector('.toggle-icon');
    if(label) label.textContent = isOpen ? (btn.dataset.labelOpen || 'Ver menos') : (btn.dataset.labelClosed || 'Ver mais');
    if(icon) icon.textContent = isOpen ? '-' : '›';
  }

  function syncDetails(sec, isOpen){
    if(!sec) return;
    sec.classList.toggle('dolar-details-collapsed-v542', !isOpen);
    ['dolarChartPanel','ptaxStatsCard'].forEach(function(id){
      var el = document.getElementById(id);
      if(!el) return;
      el.hidden = false;
      el.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    });
    var footer = sec.querySelector('.dolar-compact-footer');
    if(footer){
      footer.hidden = false;
      footer.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    }
  }

  function applyDesiredState(){
    if(!isDesktop()) return;
    var sec = document.getElementById('sec-dolar');
    if(!sec || sec.dataset.desktopUserToggledV544 !== '1') return;

    var isOpen = sec.dataset.desktopDesiredOpenV544 === 'true';
    var btn = getButton();

    sec.classList.toggle('section-expanded', isOpen);
    sec.classList.toggle('section-collapsed', !isOpen);
    sec.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    setButtonState(btn, isOpen);
    syncDetails(sec, isOpen);
  }

  function install(){
    if(!isDesktop()) return;
    document.documentElement.classList.add('desktop-dolar-toggle-state-guard-v544');
    var meta = document.querySelector('meta[name="app-build"]');
    if(meta) meta.content = 'ELTAUM_DESKTOP_DOLAR_TOGGLE_STATE_GUARD_V544';

    var sec = document.getElementById('sec-dolar');
    if(!sec || sec.dataset.desktopGuardV544Bound) return;
    sec.dataset.desktopGuardV544Bound = '1';

    var scheduled = false;
    var obs = new MutationObserver(function(){
      if(scheduled) return;
      scheduled = true;
      requestAnimationFrame(function(){
        scheduled = false;
        applyDesiredState();
      });
    });
    obs.observe(sec, {attributes:true, attributeFilter:['class','aria-expanded','aria-hidden']});

    var btn = getButton();
    if(btn){
      obs.observe(btn, {attributes:true, attributeFilter:['aria-expanded','class']});
    }

    window.__ELTAUM_DESKTOP_DOLAR_TOGGLE_STATE_GUARD_OBSERVER_V544__ = obs;
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', install, {once:true});
  else install();
  window.addEventListener('load', install, {once:true});
  window.addEventListener('pageshow', install, {passive:true});
})();


/* =========================================================
   PATCH v545 — Desktop: neutraliza mutacoes mobile dos filtros
   ========================================================= */
(function desktopNeutralizeMobileFilterUiV545(){
  if(window.__desktopNeutralizeMobileFilterUiV545Installed) return;
  window.__desktopNeutralizeMobileFilterUiV545Installed = true;

  function isDesktop(){
    return !window.matchMedia || window.matchMedia('(min-width: 769px)').matches;
  }

  function apply(){
    if(!isDesktop()) return;
    document.documentElement.classList.add('desktop-neutralize-mobile-filter-ui-v545');
    var meta = document.querySelector('meta[name="app-build"]');
    if(meta) meta.content = 'ELTAUM_DESKTOP_NEUTRALIZE_MOBILE_FILTER_UI_V545';

    document.querySelectorAll([
      '#sec-fundos #mobileFilterBar',
      '#sec-fundos #mobileFilterToggle',
      '#sec-fundos #mobileFilterSummary',
      '#sec-fundos #mobileCategorySelectShellV74',
      '#sec-fundos #mobileNoDataRowV442',
      '#sec-fundos .mobile-filter-summary',
      '#sec-fundos .mobile-filter-toggle',
      '#sec-fundos .mobile-category-select-shell-v74',
      '#sec-fundos .mobile-no-data-row-v442'
    ].join(',')).forEach(function(el){
      el.setAttribute('aria-hidden','true');
      el.style.setProperty('display','none','important');
      el.style.setProperty('visibility','hidden','important');
      el.style.setProperty('height','0','important');
      el.style.setProperty('min-height','0','important');
      el.style.setProperty('max-height','0','important');
      el.style.setProperty('margin','0','important');
      el.style.setProperty('padding','0','important');
      el.style.setProperty('border','0','important');
      el.style.setProperty('overflow','hidden','important');
      el.style.setProperty('pointer-events','none','important');
      el.style.setProperty('position','absolute','important');
    });
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply, {once:true});
  else apply();
  window.addEventListener('load', apply, {once:true});
  window.addEventListener('pageshow', apply, {passive:true});
  [120, 400, 900, 1800, 3200].forEach(function(delay){
    setTimeout(apply, delay);
  });
})();

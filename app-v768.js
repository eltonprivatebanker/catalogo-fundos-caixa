
/* V740 terminal flag: impede patches antigos de reassumirem Juros/CDI no desktop. */
window.__ELTAUM_DESKTOP_RATES_TERMINAL_V740__ = true;


/* =========================================================
   PATCH v666 — Helper oficial da Selic vigente
   ---------------------------------------------------------
   Centraliza a leitura da Selic vigente e evita usar 0,00%.
   Prioridade:
   1) dados oficiais do mercado_atual, se > 0;
   2) DOM do card de juros (#mc-selic), se já renderizado;
   3) textos visíveis do bloco de juros, como fallback.
   ========================================================= */
(function selicOfficialHelperV666(){
  function parse(v){
    if(v === null || v === undefined || v === '') return NaN;
    var s = String(v)
      .replace(/%/g,'')
      .replace(/\s+/g,'')
      .replace(/[^0-9,.\-]/g,'');
    if(!s || s === '-' || s === '—') return NaN;
    if(s.includes(',') && s.includes('.')) s = s.replace(/\./g,'').replace(',','.');
    else if(s.includes(',')) s = s.replace(',','.');
    var n = Number(s);
    return Number.isFinite(n) && n > 0 ? n : NaN;
  }

  function fromData(dados){
    var card = dados?.cards?.selic_meta || window._dadosMercado?.cards?.selic_meta || window.__ECON_DASH_STATE_V378__?.mercado?.cards?.selic_meta || {};
    var vals = [
      card.valor,
      card.taxa,
      card.valor_atual,
      card.selic,
      card.selic_meta,
      card.meta,
      card.valor_anual
    ];
    for(var i=0;i<vals.length;i++){
      var n = parse(vals[i]);
      if(Number.isFinite(n) && n > 0) return n;
    }
    return NaN;
  }

  function fromDom(){
    var selectors = [
      '#mc-selic',
      '#evoSelicAtualVal',
      '#selicHojeResumo',
      '.selic-summary-v167 strong',
      '.rate-summary-card-v167.selic-summary-v167 strong',
      '[data-selic-meta]',
      '[data-current-selic]'
    ];

    for(var i=0;i<selectors.length;i++){
      var el = document.querySelector(selectors[i]);
      var n = parse(el?.textContent || el?.value || el?.dataset?.selicMeta || el?.dataset?.currentSelic);
      if(Number.isFinite(n) && n > 0) return n;
    }

    var area = document.querySelector('#sec-mercado, #mobileSelicV400, body');
    var txt = String(area?.innerText || '');
    var m = txt.match(/Selic\s*(?:meta|vigente|atual)?[^0-9]{0,25}(\d{1,2}(?:[,.]\d{1,2})?)\s*%/i);
    var n2 = parse(m && m[1]);
    return Number.isFinite(n2) && n2 > 0 ? n2 : NaN;
  }

  function dateFromData(dados){
    var card = dados?.cards?.selic_meta || window._dadosMercado?.cards?.selic_meta || window.__ECON_DASH_STATE_V378__?.mercado?.cards?.selic_meta || {};
    var vals = [
      card.ultima_alteracao,
      card.data_ultima_alteracao,
      card.data_mudanca,
      card.vigente_desde,
      card.data_ref,
      card.data
    ];
    for(var i=0;i<vals.length;i++){
      var v = vals[i];
      if(v && String(v).trim() && !/^0/.test(String(v).trim())) return String(v).trim();
    }
    var el = document.querySelector('#selic-last-change, #selicHojeData');
    var t = String(el?.textContent || '').replace(/^desde\s+/i,'').trim();
    return t && !/0,00|último dado|ultimo dado|vigente$/i.test(t) ? t : '';
  }

  window.selicOfficialPositiveV666 = function(dados){
    var n = fromData(dados);
    if(Number.isFinite(n) && n > 0) return n;
    n = fromDom();
    if(Number.isFinite(n) && n > 0) return n;
    return NaN;
  };

  window.selicOfficialDateV666 = function(dados){
    return dateFromData(dados);
  };

  window.formatSelicOfficialV666 = function(v){
    var n = Number(v);
    return Number.isFinite(n) && n > 0 ? n.toFixed(2).replace('.', ',') + '% a.a.' : '—';
  };
})();

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

/* v642 — CDI acumulado para rankings: normalização segura de escala
   Corrige casos em que o CDI 12M chega em escala 10x, por exemplo 146,8 em vez de 14,68.
   Esta correção atua no motor lógico, sem MutationObserver e sem reescrever DOM renderizado. */
function normalizarCdiPeriodoV642(value, months){
  let n = numeroFinitoV229(value);
  if(n === null) return null;

  const periodo = Number(months) || 12;
  const limite = periodo === 12 ? 35 : periodo === 24 ? 80 : periodo === 36 ? 130 : 50;

  // CDI acumulado mensal/anual pode vir multiplicado por 10/100 em algumas fontes intermediárias.
  while(Math.abs(n) > limite){
    n = n / 10;
  }

  return Number.isFinite(n) ? Number(n.toFixed(4)) : null;
}
window.normalizarCdiPeriodoV642 = normalizarCdiPeriodoV642;


/* v643 — trava final para % do CDI nos rankings
   Motivo: algumas renderizações desktop/mobile calculam o ratio usando a referência
   do CDI antes da normalização. Esta função é chamada no momento do cálculo do
   percentual e impede CDI 12M em escala 10x/100x (ex.: 146,8) de distorcer o ranking. */
function parseNumeroRankingCdiV643(value){
  if(value === null || value === undefined || value === '') return null;
  if(typeof value === 'number') return Number.isFinite(value) ? value : null;
  let s = String(value).trim();
  if(!s || s === '-' || s === '—' || s.toLowerCase() === 'null') return null;
  s = s.replace(/%/g,'').replace(/\s/g,'').replace(/[^0-9,\.\-]/g,'');
  if(!s || s === '-' || s === ',' || s === '.') return null;
  if(s.includes(',') && s.includes('.')){
    s = s.replace(/\./g,'').replace(',', '.');
  }else if(s.includes(',')){
    s = s.replace(',', '.');
  }else{
    const parts = s.split('.');
    if(parts.length > 2 || (parts.length === 2 && parts[1].length === 3 && parts[0].length <= 3)){
      s = s.replace(/\./g,'');
    }
  }
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}
function normalizarCdiRankingPeriodoV643(value, periodo){
  let n = parseNumeroRankingCdiV643(value);
  if(n === null) return null;
  const p = String(periodo || '12m').toLowerCase();

  if(p === 'mes' || p === 'mês'){
    // CDI mensal normalmente fica perto de 0,5% a 1,5%.
    while(Math.abs(n) > 5) n = n / 10;
    return Number.isFinite(n) ? Number(n.toFixed(6)) : null;
  }

  if(p === 'ano'){
    // CDI no ano dificilmente passa de 25% em um ano corrente.
    while(Math.abs(n) > 25) n = n / 10;
    return Number.isFinite(n) ? Number(n.toFixed(6)) : null;
  }

  // 12M: CDI acumulado deve ficar em escala percentual normal, não 10x.
  while(Math.abs(n) > 35) n = n / 10;
  return Number.isFinite(n) ? Number(n.toFixed(6)) : null;
}
function calcularPercentualCdiRankingV643(rentabilidade, cdiReferencia, periodo){
  const rent = parseNumeroRankingCdiV643(rentabilidade);
  const cdi = normalizarCdiRankingPeriodoV643(cdiReferencia, periodo || '12m');
  if(rent === null || cdi === null || cdi === 0) return null;
  const ratio = Math.round((rent / cdi) * 100);
  return Number.isFinite(ratio) ? ratio : null;
}
window.parseNumeroRankingCdiV643 = parseNumeroRankingCdiV643;
window.normalizarCdiRankingPeriodoV643 = normalizarCdiRankingPeriodoV643;
window.calcularPercentualCdiRankingV643 = calcularPercentualCdiRankingV643;

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
    const direto = normalizarCdiPeriodoV642(fonte?.[`acum_${periodo}m`], periodo);
    if(direto !== null){
      cdiPeriodoCacheV230[periodo] = direto;
      return direto;
    }

    const historico = normalizarCdiPeriodoV642(calcularCdiDoHistoricoV229(fonte, periodo), periodo);
    if(historico !== null){
      cdiPeriodoCacheV230[periodo] = historico;
      return historico;
    }
  }

  const cache = normalizarCdiPeriodoV642(cdiPeriodoCacheV230[periodo], periodo);
  if(cache !== null) return cache;

  return normalizarCdiPeriodoV642(indicState.cdi?.[`m${periodo}`], periodo);
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
    $('dolar-day-rate').textContent = 'R$\u00a0' + fmtBRL4(lastVal);
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

      if($('dolar-day-rate')) $('dolar-day-rate').textContent = 'R$\u00a0' + fmtBRL4(cotVenda);
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
  // v656: a visão executiva deve exibir sempre somente os últimos 6 meses fechados.
  // Quando um novo mês consolidado entra, o mais antigo sai automaticamente.
  const EXECUTIVE_MONTH_LIMIT_V656 = 6;
  const closedEntries = sorted
    .filter(([key]) => key !== currentKey)
    .slice(-EXECUTIVE_MONTH_LIMIT_V656)
    .reverse();

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
  container.innerHTML = closedEntries.map(([key,item], index) => {
    const [ano,mes] = key.split('-');
    const label = item._mes_label || `${MESES_PT[parseInt(mes)-1]}/${ano}`;
    const val = parseFloat(item.cotacaoVenda || item.cotacao || 0);
    const varPct = calcVar(key,item);
    const cls = varPct === null ? 'zero' : varPct > 0 ? 'pos' : varPct < 0 ? 'neg' : 'zero';
    const varTxt = varPct === null ? '—' : `${signPct(varPct)}${fmt(varPct)}`;
    return `<div class="dolar-month-item dolar-month-row-v162 dolar-month-snap-v98${index === 0 ? ' is-latest-v656' : ''}" aria-label="${label}: fechamento R$ ${fmtBRL(val)}; variação ${varTxt}">
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

  const setAwaitingValueV650 = (id, text='Aguardando divulgação') => {
    const el=$(id);
    if(el){
      el.textContent = text;
      el.className = 'v2-val dash market-awaiting-value-v650';
    }
  };

  const setSubIpcaPendingV650 = (id, lastLabel, lastValue, awaitingLabel) => {
    const el=$(id);
    if(!el) return;
    const label = limparStatus(lastLabel || 'último dado');
    const val = num(lastValue);
    const valTxt = val === null ? '—' : pctTxt(val);
    const aguardando = limparStatus(awaitingLabel || 'mês fechado');
    el.innerHTML = `<span class="period-line status-aguardando ipca-pending-v650"><span class="period-label">Aguardando ${aguardando}</span><span class="period-dot">·</span><span class="period-status">último: ${label} ${valTxt}</span></span>`;
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

  const ipcaClosedKeyV650 = parseLabelKey(fallbackMesFechado);
  const ipcaRefKeyV650 = parseLabelKey(ipcaRef);
  const ipcaMesFechadoDisponivelV650 = ipcaMes !== null && (!ipcaClosedKeyV650 || !ipcaRefKeyV650 || ipcaRefKeyV650 === ipcaClosedKeyV650);
  const rowIpcaV650 = $('row-ipca');
  if(ipcaMesFechadoDisponivelV650){
    setPct('ipca-mes-ant', ipcaMes, 'bar-ipca-ant', 2, false);
    setSubStatus('ipca-mes-ant-sub', ipcaRef, 'fechado');
    if(rowIpcaV650){
      rowIpcaV650.dataset.ipcaClosedStatus = 'available';
      rowIpcaV650.dataset.ipcaLastAvailable = '';
      rowIpcaV650.dataset.ipcaAwaitingMonth = '';
    }
  }else{
    setAwaitingValueV650('ipca-mes-ant', 'Aguardando divulgação');
    const barIpcaAntV650 = $('bar-ipca-ant');
    if(barIpcaAntV650){ barIpcaAntV650.style.width = '0%'; barIpcaAntV650.className = ''; }
    setSubIpcaPendingV650('ipca-mes-ant-sub', ipcaRef, ipcaMes, fallbackMesFechado);
    if(rowIpcaV650){
      rowIpcaV650.dataset.ipcaClosedStatus = 'pending';
      rowIpcaV650.dataset.ipcaLastAvailable = `${limparStatus(ipcaRef)} ${ipcaMes === null ? '—' : pctTxt(ipcaMes)}`;
      rowIpcaV650.dataset.ipcaAwaitingMonth = limparStatus(fallbackMesFechado);
    }
  }
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
  setPct('dolar-ant-var', dolarFechado.variacao, 'bar-dolar-ant', 10, false, '—');
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
  d = typeof repararSelicMercadoV667 === 'function' ? repararSelicMercadoV667(d) : d;

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

function syncDesktopNavUpdateV730(data,opcoes={}){
  const box=document.getElementById('desktopNavUpdateBoxV730');
  const main=document.getElementById('desktopNavUpdateV730');
  const sub=document.getElementById('desktopNavUpdateSubV730');
  if(!box || !main || !sub) return;

  if(opcoes.cache){
    box.dataset.state='cache';
    main.textContent='Dados em cache';
    sub.textContent='Última sincronização indisponível';
    return;
  }

  box.dataset.state='ok';
  main.textContent=data.compacto || 'Atualizado';
  sub.textContent='Última sincronização concluída';
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
    elemento.dataset.state='cache';
    elemento.title='Os dados mais recentes não puderam ser carregados.';
    elemento.setAttribute('aria-label','Dados em cache');
    syncDesktopNavUpdateV730({},opcoes);
    return;
  }

  const data=formatarAtualizacaoHeader(valor);
  const label=document.createElement('span');
  label.className='live-update-label';
  label.textContent='Dados atualizados em';

  const time=document.createElement('time');
  time.className='live-update-time';
  if(data.datetime) time.dateTime=data.datetime;
  time.dataset.short=data.compacto || String(valor || '');
  time.textContent=data.completo || String(valor || '');

  elemento.replaceChildren(dot,label,time);
  elemento.dataset.state='ok';
  elemento.title=`Última sincronização concluída em ${data.completo || valor}`;
  elemento.setAttribute('aria-label',`Dados atualizados em ${data.completo || valor}. Última sincronização concluída.`);
  syncDesktopNavUpdateV730(data,opcoes);
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
function focusSeriesV595(dados){
  const anos = [2026,2027,2028,2029];
  return anos.map(ano => {
    const med = dados?.[ano]?.mediana;
    const value = focusNumberV595(med);
    return {ano, med, value};
  });
}

function focusNumberV595(value){
  if(value === null || value === undefined || value === '') return null;
  if(typeof value === 'number') return Number.isFinite(value) ? value : null;
  const raw = String(value).trim().replace('%','').replace(/\s/g,'');
  if(!raw || raw === '-' || raw === '—') return null;
  const normalized = raw.includes(',')
    ? raw.replace(/\./g,'').replace(',','.')
    : raw;
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

function focusTrendMetaV595(label, series){
  const values = series.filter(item => item.value !== null && Number.isFinite(item.value));
  if(values.length < 2) return {kind:'flat', label:'tendência', arrow:'↔', delta:'—'};
  const first = values[0].value;
  const last = values[values.length - 1].value;
  const diff = last - first;
  const abs = Math.abs(diff);
  const flatLimit = label === 'Câmbio' ? 0.03 : label === 'PIB' ? 0.12 : 0.08;
  const kind = abs <= flatLimit ? 'flat' : diff > 0 ? 'up' : 'down';
  const trendLabel = kind === 'flat' ? 'estável' : kind === 'down' ? 'queda' : (label === 'Câmbio' ? 'alta leve' : 'alta');
  const signal = diff > 0 ? '+' : diff < 0 ? '-' : '';
  const deltaValue = Math.abs(diff).toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2});
  const delta = label === 'Câmbio' ? `${signal}R$ ${deltaValue} até 2029` : `${signal}${deltaValue} p.p. até 2029`;
  return {kind, label:trendLabel, arrow:kind === 'up' ? '↑' : kind === 'down' ? '↓' : '↔', delta};
}

function focusSparklineV595(series){
  const values = series.map(item => item.value).filter(value => value !== null && Number.isFinite(value));
  if(values.length < 2) return '';
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const points = series.map((item, index) => {
    const x = 10 + index * (280 / Math.max(1, series.length - 1));
    const y = item.value === null || !Number.isFinite(item.value)
      ? 42
      : 42 - ((item.value - min) / span) * 28;
    return {x, y};
  });
  const line = points.map(point => `${point.x.toFixed(1)},${point.y.toFixed(1)}`).join(' ');
  const dots = points.map(point => `<circle cx="${point.x.toFixed(1)}" cy="${point.y.toFixed(1)}" r="2.6"></circle>`).join('');
  return `<svg class="focus-sparkline-v595" viewBox="0 0 300 52" aria-hidden="true" focusable="false">
    <line class="focus-sparkline-base-v595" x1="10" y1="44" x2="290" y2="44"></line>
    <polyline points="${line}"></polyline>
    ${dots}
  </svg>`;
}

function focusSummaryHTMLV595(focus){
  const selic = focusTrendMetaV595('Selic', focusSeriesV595(focus?.Selic));
  const ipca = focusTrendMetaV595('IPCA', focusSeriesV595(focus?.IPCA));
  const cambio = focusTrendMetaV595('Câmbio', focusSeriesV595(focus?.Cambio));
  const pib = focusTrendMetaV595('PIB', focusSeriesV595(focus?.PIB));
  const jurosInflacao = selic.kind === 'down' && ipca.kind === 'down' ? 'juros e inflação em queda gradual' : 'juros e inflação em ajuste';
  const cambioTxt = cambio.kind === 'up' ? 'dólar em leve alta' : cambio.kind === 'down' ? 'dólar em queda' : 'dólar estável';
  const pibTxt = pib.kind === 'flat' ? 'PIB estável no médio prazo' : pib.kind === 'up' ? 'PIB em melhora gradual' : 'PIB em desaceleração';
  return `<div class="focus-trend-summary-v595" aria-label="Leitura de tendência do Boletim Focus">
    <span class="focus-trend-icon-v595" aria-hidden="true">↗</span>
    <p><strong>Leitura Focus:</strong> ${jurosInflacao}; ${cambioTxt}; ${pibTxt}.</p>
    <span class="focus-trend-pill-v595">Tendência 2026 → 2029</span>
  </div>`;
}

function focusCardHTML(icon, label, sub, dados){
  const anos = [2026,2027,2028,2029];
  const series = focusSeriesV595(dados);
  const trend = focusTrendMetaV595(label, series);
  const rows = anos.map((ano,i) => {
    const item = series[i] || {};
    const med = item.med;
    const fmtd = med!==null && med!==undefined
      ? (label==='Câmbio' ? brl(med) : fmt(med))
      : '—';
    return `<div class="fcad-row">
      <span class="fcad-year">${ano}</span>
      <span class="fcad-val${i===0?' hl':''}">${fmtd}<em class="focus-row-arrow-v595 trend-${trend.kind}">${trend.arrow}</em></span>
    </div>${i<anos.length-1?'<hr class="fcad-hr">':''}`;
  }).join('');
  return `<div class="fcad focus-trend-card-v595 trend-${trend.kind}"><div class="fcad-label">${icon} ${label}</div>
    <div class="fcad-sub">${sub}</div>
    <div class="focus-trend-line-v595"><strong>${trend.label}</strong><span>${trend.arrow}</span><em>${trend.delta}</em></div>
    <div class="fcad-rows">${rows}</div>${focusSparklineV595(series)}</div>`;
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

  grid.innerHTML = focusSummaryHTMLV595(focus) + [
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
    return typeof catalogAudienceMatchesV553 === 'function'
      ? catalogAudienceMatchesV553(r, activePerfil)
      : String(r['Perfis']||r['Perfil']||'').split(/\s*\|\s*/).map(s=>s.trim()).includes(activePerfil);
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
    const mobileResumoV626 = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(max-width: 768px)').matches;
    const resumoNomeV626 = (nome) => String(nome||'')
      .replace(/\bRESP\.?\s*LTDA\b/gi,'')
      .replace(/\bRESPONSABILIDADE\s+LIMITADA\b/gi,'')
      .replace(/\s+/g,' ')
      .trim();
    const melhorLabel = activeRankPeriods.topFundos === '12m' ? '🏆 Melhor 12M' : `🏆 Melhor ${rankPeriodoResumo(activeRankPeriods.topFundos)}`;
    const destaqueLabel = activeRankPeriods.destaques === 'mes' ? '📈 Destaque do mês' : `📈 Maior alta ${rankPeriodoResumo(activeRankPeriods.destaques)}`;
    const maiorPLHtml = mobileResumoV626 ? '' : `
      <div class="ranking-summary-card ranking-summary-pl">
        <span class="ranking-summary-label">🏦 Categoria com maior PL</span>
        <strong>${attr(maiorPLVal)}</strong>
        <small class="ranking-summary-name" title="${attr(maiorPLNome)}">${attr(maiorPLNome)}</small>
      </div>`;
    return `<div class="ranking-summary-strip ranking-summary-two-v626" aria-label="Resumo rápido dos rankings">
      <div class="ranking-summary-card ranking-summary-best">
        <span class="ranking-summary-label">${attr(melhorLabel)}</span>
        <strong>${attr(melhorVal)}</strong>
        <small class="ranking-summary-name" title="${attr(melhorNome)}">${attr(resumoNomeV626(melhorNome))}</small>
      </div>
      <div class="ranking-summary-card ranking-summary-highlight">
        <span class="ranking-summary-label">${attr(destaqueLabel)}</span>
        <strong>${attr(destaqueVal)}</strong>
        <small class="ranking-summary-name" title="${attr(destaqueNome)}">${attr(resumoNomeV626(destaqueNome))}</small>
      </div>${maiorPLHtml}
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

window.__renderRankingsMobileBaseV607 = renderRankings;


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
let allRows=[],filtered=[],sortCol=-1,sortDir=-1,currentPage=1,perPage=5;
let activeSearch='',activeCat='',activeBenchmark='',activePerfil='',activeRisco='',hideSemDados=false,displayHeaders=[];
let activePerf=null,activePerfCampo='Acum. 12M (%)';
let activeCdiSort=null; // 'desc' = maior % CDI 12M primeiro; 'asc' = menor primeiro
let activeMobileSortCampo='dia'; // dia | mes | ano | m12 | cdi
let activeMobileSortDir='desc';  // desc = maior primeiro; asc = menor primeiro
let expandedRows=new Set();
let fundDetailFocusIdxV700=null; // v700: índice absoluto em filtered do fundo aberto em modo foco

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

function catalogShortFundNameV594(nome){
  const original = String(nome || '').replace(/\s+/g,' ').trim();
  if(!original) return '—';

  const upper = original.toUpperCase();
  if(/FMP[-\s]*FGTS/.test(upper) && /PETROBR/.test(upper)){
    const serie = upper.match(/\b(I|II|III|IV|V|VI|VII|VIII|IX|X)\b/);
    return `FMP-FGTS Petrobras${serie ? ' ' + serie[1] : ''}`;
  }

  let clean = original
    .replace(/^CAIXA\s+/i,'')
    .replace(/\s+RESP\s+LTDA.*$/i,'')
    .replace(/\s+LTDA.*$/i,'')
    .replace(/\s+-\s*RL\s*$/i,'')
    .replace(/\b(FIC|FIF|FI|FUNDO\s+DE\s+INVESTIMENTO|COTAS\s+DE|COTAS)\b\s*/gi,'')
    .replace(/\bMULTIMERCADO\b/gi,'MM')
    .replace(/\bACOES\b/gi,'Ações')
    .replace(/\bDOLAR\b/gi,'Dólar')
    .replace(/\bRENDA\s+FIXA\b/gi,'RF')
    .replace(/\bREFERENCIADO\b/gi,'Ref.')
    .replace(/\bCURTO\s+PRAZO\b/gi,'CP')
    .replace(/\bCREDITO\b/gi,'Crédito')
    .replace(/\bCRED\b/gi,'Créd.')
    .replace(/\bMIGRACAO\b/gi,'Migração')
    .replace(/\bPRIVADO\b/gi,'Privado')
    .replace(/\bPRIV\b/gi,'Priv.')
    .replace(/\bMOVIMENTACOES\b/gi,'Mov.')
    .replace(/\bMOVIMENTAÇÕES\b/gi,'Mov.')
    .replace(/\s+/g,' ')
    .trim();

  const keepUpper = new Set(['RF','DI','CDI','IPCA','IMA-B','IRF-M','FMP-FGTS','ETF','BDR','MM','LP','CP','PJ','PF','RPPS','FOF']);
  clean = clean.split(' ').filter(Boolean).map(part => {
    const up = part.toUpperCase();
    if(keepUpper.has(up)) return up;
    if(/^I{1,3}$|^IV$|^V$|^VI{0,3}$|^IX$|^X$/.test(up)) return up;
    if(part.includes('-')) return part.split('-').map(p => {
      const pUp = p.toUpperCase();
      return keepUpper.has(pUp) ? pUp : p.charAt(0).toUpperCase() + p.slice(1).toLowerCase();
    }).join('-');
    return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
  }).join(' ');

  clean = clean
    .replace(/\bRf\b/g,'RF')
    .replace(/\bMm\b/g,'MM')
    .replace(/\bLp\b/g,'LP')
    .replace(/\bCp\b/g,'CP')
    .replace(/\bFoF\b/g,'FOF')
    .replace(/\s+/g,' ')
    .trim();

  const maxLen = 42;
  if(clean.length <= maxLen) return clean;
  const words = clean.split(' ');
  let out = '';
  for(const word of words){
    const next = out ? `${out} ${word}` : word;
    if(next.length > maxLen) break;
    out = next;
  }
  return out || clean.slice(0, maxLen).trim();
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


/* PATCH v726 — saneamento: v562-terminal legado neutralizado.
   O renderer oficial é registrado pelo bloco desktopRankingPodiumV562 abaixo
   e renderiza quando os dados chegam, sem reinstalações temporizadas. */
(function desktopRankingPodiumV562TerminalV726(){
  window.__desktopRankingV562TerminalSanitizedV726 = true;
})();


/* =========================================================
   PATCH v562 — Desktop: ranking em podio visual por categoria
   Escopo: somente desktop. Mantem a base v561 sem cards no catalogo,
   sem toggle de visualizacao e sem coluna lateral de pontos de atencao.
   ========================================================= */
(function desktopRankingPodiumV562(){
  if(window.__desktopRankingPodiumV562Installed) return;
  window.__desktopRankingPodiumV562Installed = true;

  function isDesktop(){
    return !window.matchMedia || window.matchMedia('(min-width: 769px)').matches;
  }
  function q(sel, root){ return (root || document).querySelector(sel); }
  function qa(sel, root){ return Array.from((root || document).querySelectorAll(sel)); }
  function esc(v){
    return String(v ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }
  function num(v){
    try{ return typeof toNum === 'function' ? toNum(v) : Number(String(v ?? '').replace('%','').replace(',','.')); }
    catch(e){ return null; }
  }
  function finite(v){
    const n = num(v);
    return n !== null && !Number.isNaN(n) && Number.isFinite(n) ? n : null;
  }
  function pct(v){
    const n = finite(v);
    if(n === null) return '—';
    return (n > 0 ? '+' : '') + n.toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2}) + '%';
  }
  function cls(v){
    const n = finite(v);
    return n > 0 ? 'pos' : n < 0 ? 'neg' : 'zero';
  }
  function norm(v){
    return String(v || '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toUpperCase();
  }
  function cleanFund(v){
    return String(v || '—').replace(/\s*\(\d+\)/g,'').replace(/\s+/g,' ').trim() || '—';
  }
  function compactFund(v){
    let s = cleanFund(v)
      .replace(/^CAIXA\s+/i,'')
      .replace(/\bFIC\b/ig,'')
      .replace(/\bFIF\b/ig,'')
      .replace(/\bRESP\.?\s*LTDA\b/ig,'')
      .replace(/\bRESP\b/ig,'')
      .replace(/\bFUNDO DE INDICE\b/ig,'')
      .replace(/\bREFERENCIADO\b/ig,'Ref.')
      .replace(/\bCORPORATIVO\b/ig,'Corp.')
      .replace(/\s+-\s+/g,' ')
      .replace(/\s+/g,' ')
      .trim();
    const words = s.split(/\s+/).filter(Boolean);
    if(words.length > 5) s = words.slice(0,5).join(' ');
    return s || cleanFund(v);
  }
  function shortCat(v){
    const raw = String(v || '—').trim();
    const n = norm(raw);
    if(n.includes('FUNDOS MUTUOS') || n.includes('PRIVATIZACAO')) return 'FMP';
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
  function catIcon(cat){
    const s = norm(cat);
    if(s.includes('FUNDOS MUTUOS') || s.includes('PRIVATIZACAO')) return '🏛';
    if(s.includes('ACOES')) return '📈';
    if(s.includes('MULTIMERCADO')) return '🧭';
    if(s.includes('CAMBIAL')) return '💱';
    if(s.includes('INDICE')) return '◈';
    return '▦';
  }
  function parsePtNumberLocal(v){
    if(typeof v === 'number') return Number.isFinite(v) ? v : null;
    let s = String(v ?? '').trim();
    if(!s) return null;
    s = s.replace(/[^\d,.\-]/g,'');
    if(!s || s === '-' || s === ',' || s === '.') return null;
    if(s.includes(',') && s.includes('.')) s = s.replace(/\./g,'').replace(',', '.');
    else if(s.includes(',')) s = s.replace(',', '.');
    else{
      const parts = s.split('.');
      if(parts.length > 2 || (parts.length === 2 && parts[1].length === 3 && parts[0].length <= 3)) s = s.replace(/\./g,'');
    }
    const n = Number(s);
    return Number.isFinite(n) ? n : null;
  }
  function plValue(r){
    const raw = r?.['PL (milhoes R$)'] ?? r?.PL ?? r?.['Patrimonio Liquido'];
    const n = parsePtNumberLocal(raw);
    if(n === null) return null;
    return Math.abs(n) >= 1000000 ? n / 1000000 : n;
  }
  function plTxt(v){
    const n = parsePtNumberLocal(v);
    if(n === null) return 'R$ —';
    if(Math.abs(n) >= 1000) return 'R$ ' + (n / 1000).toLocaleString('pt-BR',{minimumFractionDigits:1,maximumFractionDigits:1}) + ' bi';
    return 'R$ ' + n.toLocaleString('pt-BR',{maximumFractionDigits:0}) + ' mi';
  }
  function periodoAtual(){
    const select = q('#rankingPeriodSelectV136');
    const p = (typeof activeRankPeriods !== 'undefined' && activeRankPeriods.topFundos) || select?.value || '12m';
    return ['mes','ano','12m'].includes(p) ? p : '12m';
  }
  function campoPorPeriodo(periodo){
    if(typeof rankCampoPorPeriodo === 'function') return rankCampoPorPeriodo(periodo);
    if(periodo === 'mes') return 'Acum. Mes (%)';
    if(periodo === 'ano') return 'Acum. Ano (%)';
    return 'Acum. 12M (%)';
  }
  function labelPeriodo(periodo){
    return periodo === 'mes' ? 'Mês' : periodo === 'ano' ? 'Ano' : '12M';
  }
  function normalizarCdiPeriodo(raw, periodo){
    let n = finite(raw);
    if(n === null) return null;
    const abs = Math.abs(n);
    if(periodo === 'mes'){
      if(abs > 1000) n = n / 10000;
      else if(abs > 20) n = n / 100;
      return Number.isFinite(n) ? n : null;
    }
    if(periodo === 'ano'){
      while(Math.abs(n) > 20) n = n / 10;
      return Number.isFinite(n) ? n : null;
    }
    if(abs > 10000) n = n / 1000;
    else if(abs > 1000) n = n / 100;
    else if(abs > 80) n = n / 10;
    return Number.isFinite(n) ? n : null;
  }
  function cdiReferencia(periodo){
    const card = typeof cdiCardAtualV230 === 'function' ? cdiCardAtualV230() : (window.__mercadoAtualV230?.cards?.cdi || {});
    const first = function(){
      for(const value of arguments){
        const n = normalizarCdiPeriodo(value, periodo);
        if(n !== null) return n;
      }
      return null;
    };
    if(periodo === 'mes'){
      let atual = null;
      try{ atual = typeof obterCdiAtualV232 === 'function' ? obterCdiAtualV232().valor : null; }catch(e){}
      return first(atual, card?.parcial_mes_atual, card?.mensal, window.indicState?.cdi?.mes);
    }
    if(periodo === 'ano') return first(card?.acum_ano_com_parcial, card?.acum_ano, card?.ano, window.indicState?.cdi?.ano);
    const m12 = typeof resolverCdiPeriodoV229 === 'function' ? resolverCdiPeriodoV229(card,12) : null;
    return first(m12, card?.acum_12m, card?.m12, window.indicState?.cdi?.m12);
  }
  function cdiRatioNumber(r, periodo){
    const rent = finite(r?.[campoPorPeriodo(periodo)]);
    const cdi = cdiReferencia(periodo);
    if(rent === null || cdi === null || cdi === 0) return null;
    const ratio = typeof calcularPercentualCdiRankingV643 === 'function' ? calcularPercentualCdiRankingV643(rent, cdi, periodo) : Math.round((rent / cdi) * 100);
    return Number.isFinite(ratio) ? ratio : null;
  }
  function cdiRatioTxt(r, periodo){
    const ratio = cdiRatioNumber(r, periodo);
    return ratio === null ? '—' : ratio.toLocaleString('pt-BR',{maximumFractionDigits:0}) + '%';
  }
  function retornoLabel(periodo){
    return periodo === 'mes' ? 'Retorno no mês' : periodo === 'ano' ? 'Retorno no ano' : 'Retorno em 12M';
  }
  function cdiLabel(periodo){
    return periodo === 'mes' ? '% do CDI no mês' : periodo === 'ano' ? '% do CDI no ano' : '% do CDI em 12M';
  }
  function riskOk(r){
    if(typeof activeRankRisk === 'undefined' || !activeRankRisk) return true;
    return typeof perfilRiscoCorrespondeV198 === 'function' ? perfilRiscoCorrespondeV198(r['Perfil de Risco'], activeRankRisk) : true;
  }
  function rankingCategoryValueV685(){
    return q('#rankingClassSelectV136')?.value || 'todos';
  }
  function rankingUniverseValueV685(){
    return q('#rankingUniverseSelectV685')?.value || 'todos';
  }
  function categoryOkV685(r){
    const filtro = rankingCategoryValueV685();
    if(filtro === 'todos') return true;
    const mapa = (typeof RANK_CATEGORY_BY_FILTER_V197 !== 'undefined') ? RANK_CATEGORY_BY_FILTER_V197 : {
      'renda-fixa-simples':'RENDA FIXA SIMPLES','renda-fixa':'RENDA FIXA',
      'renda-fixa-referenciado':'RENDA FIXA REFERENCIADO','renda-fixa-curto-prazo':'RENDA FIXA CURTO PRAZO',
      'multimercado':'MULTIMERCADO','cambial':'CAMBIAL','acoes':'ACOES',
      'fundo-de-indice':'FUNDO DE INDICE','fmp':'FUNDOS MUTUOS DE PRIVATIZACAO'
    };
    const cat = typeof rankCategoriaCanonicaV197 === 'function' ? rankCategoriaCanonicaV197(r?.Categoria) : norm(r?.Categoria).replace(/\s+/g,' ').trim();
    return mapa[filtro] ? cat === mapa[filtro] : true;
  }
  function universeOkV685(r){
    if(rankingUniverseValueV685() !== 'sem-fmp') return true;
    const cat = typeof rankCategoriaCanonicaV197 === 'function' ? rankCategoriaCanonicaV197(r?.Categoria) : norm(r?.Categoria).replace(/\s+/g,' ').trim();
    const fmp = (typeof RANK_CATEGORY_BY_FILTER_V197 !== 'undefined') ? RANK_CATEGORY_BY_FILTER_V197.fmp : 'FUNDOS MUTUOS DE PRIVATIZACAO';
    return cat !== fmp;
  }
  function parseRankingDateV685(value){
    if(value instanceof Date && !Number.isNaN(value.getTime())) return new Date(value.getFullYear(),value.getMonth(),value.getDate());
    const raw = String(value || '').trim();
    if(!raw) return null;
    let m = raw.match(/^(\d{1,2})[\/.-](\d{1,2})[\/.-](\d{4})/);
    if(m){
      const d = new Date(Number(m[3]),Number(m[2])-1,Number(m[1]));
      return Number.isNaN(d.getTime()) ? null : d;
    }
    m = raw.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
    if(m){
      const d = new Date(Number(m[1]),Number(m[2])-1,Number(m[3]));
      return Number.isNaN(d.getTime()) ? null : d;
    }
    return null;
  }
  function rankingBaseDateV685(r){
    return parseRankingDateV685(r?.['Data Base Consulta']) || parseRankingDateV685(r?.['Data Rentabilidade Ref']) || new Date();
  }
  function rankingPeriodEligibleV685(r, periodo){
    const campo = campoPorPeriodo(periodo);
    if(finite(r?.[campo]) === null) return false;
    const inicio = parseRankingDateV685(r?.['Data Inicio']);
    if(!inicio) return true;
    const base = rankingBaseDateV685(r);
    let limite;
    if(periodo === '12m'){
      limite = new Date(base.getFullYear()-1, base.getMonth(), base.getDate());
    }else if(periodo === 'ano'){
      limite = new Date(base.getFullYear(),0,1);
    }else{
      limite = new Date(base.getFullYear(),base.getMonth(),1);
    }
    return inicio.getTime() <= limite.getTime();
  }
  function baseRows(){
    if(typeof allRows === 'undefined' || !Array.isArray(allRows)) return [];
    return allRows
      .filter(function(r){ return typeof temDados === 'function' ? temDados(r) : true; })
      .filter(universeOkV685)
      .filter(categoryOkV685)
      .filter(riskOk);
  }
  function sortedRows(rows, campo, asc){
    return rows
      .filter(function(r){ return finite(r[campo]) !== null; })
      .sort(function(a,b){ return asc ? finite(a[campo]) - finite(b[campo]) : finite(b[campo]) - finite(a[campo]); });
  }
  function categoryWinners(rows, campo, geral){
    const map = new Map();
    geral.forEach(function(r){
      const cat = r.Categoria || 'Sem categoria';
      if(!map.has(cat)) map.set(cat, {cat:cat, row:r});
    });
    return Array.from(map.values()).sort(function(a,b){
      return finite(b.row[campo]) - finite(a.row[campo]);
    });
  }
  function syncControls(periodo){
    document.documentElement.classList.add('desktop-ranking-podium-v562','desktop-ranking-semantico-cdi-v563','desktop-ranking-cdi-ano-scale-v564','desktop-ranking-filters-centered-v565','desktop-ranking-stable-v566','desktop-ranking-toolbar-locked-v567','desktop-ranking-compact-height-v568','desktop-ranking-ultra-compact-v569','desktop-docs-compact-v570','desktop-hide-closed-month-launch-v571','desktop-dolar-no-collapse-v573','desktop-monthly-indicators-v574','desktop-monthly-us-markets-v576','desktop-monthly-comparison-chart-v580','desktop-monthly-chart-start-zero-v581','desktop-header-kpis-focus-clean-v582','desktop-header-clean-inflacao-juros-v583','desktop-header-kpis-minimal-v584','desktop-side-nav-v585','desktop-side-nav-no-overlap-v586','desktop-side-nav-market-fix-v588','desktop-ranking-balanced-v645','desktop-ranking-closed-badge-v646');
    const meta = q('meta[name="app-build"]');
    if(meta) meta.content = 'ELTAUM_RANKING_CAPTACAO_FECHADA_V646';
    const period = q('#rankingPeriodSelectV136');
    const clsSelect = q('#rankingClassSelectV136');
    const universeSelect = q('#rankingUniverseSelectV685');
    const risk = q('#rankingRiskSelectV198');
    if(period && period.value !== periodo) period.value = periodo;
    if(clsSelect && !clsSelect.dataset.v685Initialized){
      const legacy = String(typeof activeRankFilter !== 'undefined' ? (activeRankFilter || 'todos') : 'todos');
      if(legacy !== 'sem-fmp' && Array.from(clsSelect.options || []).some(function(opt){ return opt.value === legacy; })) clsSelect.value = legacy;
      clsSelect.dataset.v685Initialized = '1';
    }
    if(universeSelect && !universeSelect.dataset.v685Initialized){
      universeSelect.value = String(typeof activeRankFilter !== 'undefined' && activeRankFilter === 'sem-fmp' ? 'sem-fmp' : 'todos');
      universeSelect.dataset.v685Initialized = '1';
    }
    if(risk && typeof activeRankRisk !== 'undefined' && risk.value !== (activeRankRisk || '')) risk.value = activeRankRisk || '';
    qa('[data-rank-filter]').forEach(function(btn){
      btn.classList.toggle('active', btn.dataset.rankFilter === rankingCategoryValueV685());
    });
    const attention = q('#rankingAttentionV136');
    if(attention) attention.remove();
  }
  function contextLine(rows, periodo){
    return '';
  }
  function summaryCard(kind, label, value, name, meta){
    return '<article class="ranking-v562-summary-card ranking-v682-summary-card ' + esc(kind || '') + '">' +
      '<span>' + esc(label) + '</span>' +
      '<strong class="' + esc(kind === 'worst' ? 'neg' : kind === 'neutral' ? 'zero' : 'pos') + '">' + esc(value || '—') + '</strong>' +
      '<small title="' + esc(name || '') + '">' + esc(name || '—') + '</small>' +
      (meta ? '<em>' + esc(meta) + '</em>' : '') +
    '</article>';
  }
  function periodTabs(){
    /* v682: o período é controlado somente pelo filtro superior. */
    return '';
  }
  function rankingFundClosedForCaptationV646(row){
    try{
      const meta = row && (row.__fundosMeta || (typeof obterMetaFundo === 'function' ? obterMetaFundo(row) : null));
      if(meta && meta.ic_aberto_captacao === false) return true;
      if(meta && meta.ic_aberto_captacao === true) return false;

      const raw = typeof primeiroCampoFundo === 'function' ? primeiroCampoFundo(row,[
        'Status de Captação','Status Captação','Status Captacao','Captação','Captacao',
        'Aberto para Captação','Aberto para Captacao','Situação de Captação','Situacao de Captacao'
      ]) : '';
      const norm = typeof normalizarStatusOperacional === 'function'
        ? normalizarStatusOperacional(raw)
        : String(raw || '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toUpperCase();

      return /FECHAD|ENCERRAD|SUSPENS/.test(norm);
    }catch(e){
      return false;
    }
  }
  function rankingClosedBadgeV646(row){
    return rankingFundClosedForCaptationV646(row)
      ? '<span class="ranking-v646-closed-badge" title="Fechado para captação" aria-label="Captação fechada"><span aria-hidden="true">🔒</span><b>Fechado</b></span>'
      : '';
  }
  function rankingDisplayNameV683(rawName){
    let name = String(rawName || '').trim();
    if(!name) return 'Fundo sem nome';
    name = name
      .replace(/^CAIXA\s+/i,'')
      .replace(/^(?:(?:FIC|FIF)\s+){1,3}/i,'')
      .replace(/\s+-?\s*RESP(?:ONSABILIDADE)?\s+LTDA\.?$/i,'')
      .replace(/\s{2,}/g,' ')
      .trim();
    return name || String(rawName || '').trim();
  }
  function categoryRow(item, i, campo, periodo, showCategory){
    const r = item.row;
    const ratio = cdiRatioNumber(r, periodo);
    const ratioClass = ratio === null ? 'is-neutral' : ratio >= 100 ? 'is-above' : ratio >= 80 ? 'is-near' : 'is-below';
    const medalClass = i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : 'standard';
    const fullName = cleanFund(r.Fundo);
    const name = rankingDisplayNameV683(fullName);
    const closedBadge = rankingClosedBadgeV646(r);
    const closedClass = closedBadge ? ' is-closed-captacao-v646' : '';
    const riskText = String(r['Perfil de Risco'] || 'Risco não informado').trim();
    return '<tr class="ranking-v682-row ' + medalClass + closedClass + '">' +
      '<td class="ranking-v682-position"><span aria-label="Posição ' + esc(i + 1) + '">' + esc(i + 1) + '</span></td>' +
      '<th scope="row" class="ranking-v682-fund-cell">' +
        '<div class="ranking-v682-fund-wrap">' +
          '<span class="ranking-v682-icon" aria-hidden="true">' + catIcon(item.cat) + '</span>' +
          '<span class="ranking-v682-fund-copy">' +
            '<strong title="' + esc(fullName) + '">' + esc(name) + '</strong>' +
            '<small class="ranking-v683-fund-meta"><span class="ranking-v682-risk">' + esc(riskText) + '</span>' + (closedBadge ? '<span class="ranking-v683-meta-separator" aria-hidden="true">·</span>' + closedBadge : '') + '</small>' +
          '</span>' +
        '</div>' +
      '</th>' +
      (showCategory ? '<td class="ranking-v682-category"><span>' + esc(shortCat(item.cat)) + '</span></td>' : '') +
      '<td class="ranking-v682-return ' + cls(r[campo]) + '"><span>' + esc(retornoLabel(periodo)) + '</span><strong>' + esc(pct(r[campo])) + '</strong></td>' +
      '<td class="ranking-v682-cdi ' + ratioClass + '"><span>' + esc(cdiLabel(periodo)) + '</span><strong>' + esc(cdiRatioTxt(r, periodo)) + '</strong></td>' +
    '</tr>';
  }
  function categoryBoardRowsV590(winners, campo, periodo){
    return (winners || []).slice(0,10).map(function(item, idx){
      return categoryRow(item, idx, campo, periodo, true);
    }).join('');
  }
  function alertRows(rows, campo){
    return rows.map(function(r, i){
      const fullName = cleanFund(r.Fundo);
      const name = rankingDisplayNameV683(fullName);
      return '<div class="ranking-v562-alert-row">' +
        '<span>' + (i + 1) + '</span>' +
        '<strong title="' + esc(fullName) + '">' + esc(name) + '</strong>' +
        '<small>' + esc(shortCat(r.Categoria)) + '</small>' +
        '<em class="' + cls(r[campo]) + '">' + esc(pct(r[campo])) + '</em>' +
      '</div>';
    }).join('');
  }
  function rankingFilteredSingleCategoryV644(){
    return rankingCategoryValueV685() !== 'todos';
  }
  function rankingCurrentCategoryLabelV644(rows){
    const clsSelect = q('#rankingClassSelectV136');
    const optionLabel = clsSelect && clsSelect.options && clsSelect.selectedIndex >= 0
      ? String(clsSelect.options[clsSelect.selectedIndex].textContent || '').trim()
      : '';
    if(optionLabel && optionLabel.toLowerCase() !== 'todos') return optionLabel;
    const firstCat = rows && rows[0] && rows[0].Categoria ? shortCat(rows[0].Categoria) : '';
    return firstCat || 'Categoria selecionada';
  }
  function topFundsBoardRowsV644(rows, campo, periodo){
    const top = (rows || []).slice(0,10).map(function(r){
      return { cat: r.Categoria || 'Sem categoria', row: r };
    });
    return (top || []).map(function(item, idx){ return categoryRow(item, idx, campo, periodo, false); }).join('');
  }
  function rankingContextStripV762(periodo, boardSource, isSingleCategory, currentCategoryLabel, excludedIncomplete){
    const universeSelect = q('#rankingUniverseSelectV685');
    const categorySelect = q('#rankingClassSelectV136');
    const riskSelect = q('#rankingRiskSelectV198');

    const universeLabel = universeSelect?.options?.[universeSelect.selectedIndex]?.textContent?.trim() || 'Todos os fundos';
    const categoryLabel = isSingleCategory
      ? currentCategoryLabel
      : (categorySelect?.options?.[categorySelect.selectedIndex]?.textContent?.trim() || 'Todas as categorias');
    const riskLabel = riskSelect?.options?.[riskSelect.selectedIndex]?.textContent?.trim() || 'Todos perfis';
    const eligibleLabel = isSingleCategory
      ? `${boardSource.length || 0} fundos elegíveis`
      : `${boardSource.length || 0} categorias elegíveis`;

    return '<div class="ranking-context-v762" aria-label="Contexto atual do ranking">' +
      '<div class="ranking-context-main-v762">' +
        '<span class="ranking-context-label-v762">Ranking atual</span>' +
        '<strong>' + esc(labelPeriodo(periodo)) + '</strong>' +
        '<i aria-hidden="true">·</i><span>' + esc(universeLabel) + '</span>' +
        '<i aria-hidden="true">·</i><span>' + esc(categoryLabel) + '</span>' +
        '<i aria-hidden="true">·</i><span>' + esc(riskLabel) + '</span>' +
      '</div>' +
      '<div class="ranking-context-meta-v762">' +
        '<span>' + esc(eligibleLabel) + '</span>' +
        (excludedIncomplete ? '<span>· ' + esc(String(excludedIncomplete)) + ' sem histórico completo</span>' : '') +
      '</div>' +
    '</div>';
  }

  function rankingBoardMetaV763(periodo, boardSource, isSingleCategory, currentCategoryLabel, excludedIncomplete){
    const universeSelect = q('#rankingUniverseSelectV685');
    const categorySelect = q('#rankingClassSelectV136');
    const riskSelect = q('#rankingRiskSelectV198');

    const universeLabel = universeSelect?.options?.[universeSelect.selectedIndex]?.textContent?.trim() || 'Todos os fundos';
    const categoryLabel = isSingleCategory
      ? currentCategoryLabel
      : (categorySelect?.options?.[categorySelect.selectedIndex]?.textContent?.trim() || 'Todas as categorias');
    const riskLabel = riskSelect?.options?.[riskSelect.selectedIndex]?.textContent?.trim() || 'Todos perfis';
    const eligibleLabel = isSingleCategory
      ? `${boardSource.length || 0} fundos`
      : `${boardSource.length || 0} categorias`;

    const parts = [labelPeriodo(periodo), universeLabel, categoryLabel, riskLabel];

    return '<div class="ranking-board-meta-v763" aria-label="Contexto atual do ranking">' +
      '<span class="ranking-board-meta-left-v763">' +
        parts.map((p,i)=> (i ? '<i aria-hidden="true">·</i>' : '') + '<span>' + esc(p) + '</span>').join('') +
      '</span>' +
      '<span class="ranking-board-meta-right-v763">' +
        '<strong>' + esc(eligibleLabel) + '</strong>' +
        (excludedIncomplete ? '<span>· ' + esc(String(excludedIncomplete)) + ' sem histórico completo</span>' : '') +
      '</span>' +
    '</div>';
  }

  function renderRankingsV562(){
    const grid = q('#rankingGrid');
    if(!grid || !isDesktop()) return;
    if(typeof allRows === 'undefined' || !Array.isArray(allRows) || !allRows.length) return;

    document.documentElement.classList.add('desktop-ranking-table-v682','desktop-ranking-refine-v683','desktop-ranking-overhaul-v684','desktop-ranking-workspace-v685');
    const metaBuild = q('meta[name="app-build"]');
    if(metaBuild) metaBuild.content = 'ELTAUM_RANKING_WORKSPACE_V685';

    const periodo = periodoAtual();
    const campo = campoPorPeriodo(periodo);
    syncControls(periodo);

    const filteredRows = baseRows();
    const rows = filteredRows.filter(function(r){ return rankingPeriodEligibleV685(r, periodo); });
    const excludedIncomplete = Math.max(0, filteredRows.length - rows.length);
    const sorted = sortedRows(rows, campo);
    const ascending = sortedRows(rows, campo, true);
    const negatives = ascending.filter(function(r){ return finite(r[campo]) < 0; });
    const winners = categoryWinners(rows, campo, sorted);
    const isSingleCategory = rankingFilteredSingleCategoryV644();
    document.body.classList.toggle('ranking-single-category-v684', isSingleCategory);
    document.body.classList.toggle('ranking-single-category-v685', isSingleCategory);
    const currentCategoryLabel = rankingCurrentCategoryLabelV644(rows);
    const boardSource = isSingleCategory ? sorted : winners;
    const boardRows = isSingleCategory ? topFundsBoardRowsV644(sorted, campo, periodo) : categoryBoardRowsV590(winners, campo, periodo);
    const best = sorted[0];
    const lowest = ascending[0];
    const alertBody = alertRows(negatives.slice(0,8), campo);
    const summaryLabel = isSingleCategory ? 'Fundos elegíveis' : 'Categorias elegíveis';
    const summaryValue = String(boardSource.length || 0);
    const summaryName = isSingleCategory ? currentCategoryLabel : ('Histórico completo em ' + labelPeriodo(periodo));
    const boardTitle = isSingleCategory ? ('Ranking em ' + currentCategoryLabel) : 'Líderes por categoria';
    const boardDescription = isSingleCategory
      ? ('Fundos com histórico completo, ordenados pelo retorno em ' + labelPeriodo(periodo) + '.')
      : 'Melhor retorno no período selecionado em cada categoria.';
    const boardAria = isSingleCategory ? ('Ranking de fundos em ' + currentCategoryLabel) : 'Líderes por categoria';
    const displayedCount = Math.min(10, boardSource.length || 0);
    const resultText = isSingleCategory
      ? ((boardSource.length || 0) + ' fundos · exibindo ' + displayedCount)
      : ((boardSource.length || 0) + ' categorias com dados');

    const resultsEl = q('#rankingResultsV682');
    if(resultsEl) resultsEl.textContent = resultText;

    grid.className = 'ranking-grid ranking-main-v136 ranking-v682-grid';
    grid.removeAttribute('data-active-rank-view');
    grid.innerHTML =
      '<section class="ranking-v562-summary ranking-v682-summary ranking-summary-v762 ranking-summary-v763" aria-label="Extremos do ranking">' +
        summaryCard('best','Maior retorno', best ? pct(best[campo]) : '—', best ? rankingDisplayNameV683(cleanFund(best.Fundo)) : 'Sem dados', best ? shortCat(best.Categoria) : '') +
        summaryCard(lowest && finite(lowest[campo]) < 0 ? 'worst' : 'neutral','Menor retorno', lowest ? pct(lowest[campo]) : '—', lowest ? rankingDisplayNameV683(cleanFund(lowest.Fundo)) : 'Sem dados', lowest ? shortCat(lowest.Categoria) : '') +
      '</section>' +
      '<section class="ranking-v682-board ranking-v685-board ' + (isSingleCategory ? 'is-single-category-v685' : 'is-multi-category-v685') + '" aria-label="' + esc(boardAria) + '">' +
        '<div class="ranking-v682-board-head ranking-v763-board-head">' +
          '<div class="ranking-v763-board-copy">' +
            '<h3>' + esc(boardTitle) + '</h3>' +
            '<p>' + esc(boardDescription) + '</p>' +
            rankingBoardMetaV763(periodo, boardSource, isSingleCategory, currentCategoryLabel, excludedIncomplete) +
          '</div>' +
        '</div>' +
        '<div class="ranking-v682-table-shell">' +
          '<table class="ranking-v682-table ranking-v685-table">' +
            '<caption>Fundos elegíveis ordenados pelo retorno no período selecionado</caption>' +
            (isSingleCategory
              ? '<colgroup><col class="col-position"><col class="col-fund"><col class="col-return"><col class="col-cdi"></colgroup>'
              : '<colgroup><col class="col-position"><col class="col-fund"><col class="col-category"><col class="col-return"><col class="col-cdi"></colgroup>') +
            (isSingleCategory
              ? '<thead><tr><th scope="col">Pos.</th><th scope="col">Fundo</th><th scope="col">' + esc(retornoLabel(periodo)) + '</th><th scope="col">' + esc(cdiLabel(periodo)) + '</th></tr></thead>'
              : '<thead><tr><th scope="col">Pos.</th><th scope="col">Fundo</th><th scope="col">Categoria</th><th scope="col">' + esc(retornoLabel(periodo)) + '</th><th scope="col">' + esc(cdiLabel(periodo)) + '</th></tr></thead>') +
            '<tbody>' + (boardRows || '<tr><td colspan="' + (isSingleCategory ? '4' : '5') + '" class="ranking-empty-v50">Nenhum fundo possui histórico completo para este filtro.</td></tr>') + '</tbody>' +
          '</table>' +
        '</div>' +
      '</section>' +
      '<details class="ranking-v562-alerts ranking-v682-alerts ranking-v683-alerts">' +
        '<summary><span>Fundos com retorno negativo</span><strong>' + negatives.length + '</strong></summary>' +
        '<div class="ranking-v562-alert-list">' + (alertBody || '<div class="ranking-empty-v50">Nenhum retorno negativo no recorte atual.</div>') + '</div>' +
      '</details>';
  }
  function syncActiveSectionV683(){
    if(!isDesktop()){
      document.body.classList.remove('ranking-active-v683');
      return;
    }
    const nav = q('#desktopAnchorNavV131');
    if(!nav) return;
    const links = qa('.desktop-anchor-link-v131[data-anchor-target]', nav).filter(function(link){
      return link.dataset.searchFocus !== '1';
    });
    if(!links.length) return;
    const threshold = Math.min(220, Math.max(120, window.innerHeight * 0.24));
    let chosen = links[0];
    links.forEach(function(link){
      const target = q('#' + link.dataset.anchorTarget);
      if(!target || target.offsetParent === null) return;
      const rect = target.getBoundingClientRect();
      if(rect.top <= threshold && rect.bottom > threshold) chosen = link;
    });
    links.forEach(function(link){
      link.classList.toggle('active', link === chosen);
      if(link === chosen) link.setAttribute('aria-current','page');
      else link.removeAttribute('aria-current');
    });
    document.body.classList.toggle('ranking-active-v683', chosen.dataset.anchorTarget === 'rankingsSection');
  }
  function installActiveSectionSyncV683(){
    if(window.__rankingActiveSectionV683Installed) return;
    window.__rankingActiveSectionV683Installed = true;
    let scheduled = false;
    const requestSync = function(){
      if(scheduled) return;
      scheduled = true;
      requestAnimationFrame(function(){
        scheduled = false;
        syncActiveSectionV683();
      });
    };
    window.addEventListener('scroll', requestSync, {passive:true});
    window.addEventListener('resize', requestSync, {passive:true});
    window.addEventListener('load', requestSync, {once:true});
    [0,180,600,1400].forEach(function(delay){ setTimeout(requestSync, delay); });
  }
  function bind(){
    const clsSelect = q('#rankingClassSelectV136');
    const universeSelect = q('#rankingUniverseSelectV685');
    const period = q('#rankingPeriodSelectV136');
    const risk = q('#rankingRiskSelectV198');

    if(clsSelect && clsSelect.dataset.v562Bound !== '1'){
      clsSelect.dataset.v562Bound = '1';
      clsSelect.addEventListener('change', function(){
        try{ activeRankFilter = clsSelect.value || (universeSelect?.value === 'sem-fmp' ? 'sem-fmp' : 'todos'); }catch(e){}
        setTimeout(renderRankingsV562, 0);
      });
    }
    if(universeSelect && universeSelect.dataset.v685Bound !== '1'){
      universeSelect.dataset.v685Bound = '1';
      universeSelect.addEventListener('change', function(){
        try{ activeRankFilter = clsSelect?.value && clsSelect.value !== 'todos' ? clsSelect.value : (universeSelect.value || 'todos'); }catch(e){}
        setTimeout(renderRankingsV562, 0);
      });
    }
    if(period && period.dataset.v562Bound !== '1'){
      period.dataset.v562Bound = '1';
      period.addEventListener('change', function(){
        try{
          activeRankPeriods.topFundos = period.value || '12m';
          activeRankPeriods.destaques = period.value || '12m';
        }catch(e){}
        setTimeout(renderRankingsV562, 0);
      });
    }
    if(risk && risk.dataset.v562Bound !== '1'){
      risk.dataset.v562Bound = '1';
      risk.addEventListener('change', function(){
        try{ activeRankRisk = risk.value || ''; }catch(e){}
        setTimeout(renderRankingsV562, 0);
      });
    }
    const row = q('#rankingFilterRow');
    if(row && row.dataset.v562Bound !== '1'){
      row.dataset.v562Bound = '1';
      row.addEventListener('click', function(ev){
        const btn = ev.target.closest('[data-rank-filter]');
        if(!btn) return;
        const value = btn.dataset.rankFilter || 'todos';
        try{ activeRankFilter = value; }catch(e){}
        if(clsSelect) clsSelect.value = value === 'sem-fmp' ? 'todos' : value;
        if(universeSelect) universeSelect.value = value === 'sem-fmp' ? 'sem-fmp' : 'todos';
        setTimeout(renderRankingsV562, 0);
      });
    }
    document.addEventListener('click', function(ev){
      const btn = ev.target && ev.target.closest ? ev.target.closest('[data-rank-period][data-rank-target]') : null;
      if(!btn || !q('#rankingsSection')?.contains(btn)) return;
      try{
        activeRankPeriods.topFundos = btn.dataset.rankPeriod || '12m';
        activeRankPeriods.destaques = btn.dataset.rankPeriod || '12m';
      }catch(e){}
      setTimeout(renderRankingsV562, 0);
    }, true);
  }
  function setRankingWorkspaceV685(active){
    /* V750 — Rankings deixa de criar uma "página dedicada".
       Clicar no menu deve apenas navegar até a seção, sem alterar
       a estrutura/largura do documento e sem ocultar os demais blocos. */
    document.body.classList.remove('ranking-page-v685');
  }
  function installRankingWorkspaceNavigationV685(){
    if(window.__rankingWorkspaceNavigationV685Installed) return;
    window.__rankingWorkspaceNavigationV685Installed = true;
    const nav = q('#desktopAnchorNavV131');
    if(nav){
      nav.addEventListener('click', function(ev){
        const link = ev.target.closest('.desktop-anchor-link-v131[data-anchor-target]');
        if(!link) return;
        const targetId = link.dataset.anchorTarget;
        if(targetId === 'rankingsSection'){
          ev.preventDefault();
          setRankingWorkspaceV685(false);
          try{ history.replaceState(null,'','#rankingsSection'); }catch(e){}
          requestAnimationFrame(function(){
            const target = q('#rankingsSection');
            if(!target) return;

            /* V750 — preserva a coordenada horizontal.
               scrollIntoView pode ajustar também o eixo X quando há
               pequenas diferenças de overflow/zoom. */
            const top = window.scrollY + target.getBoundingClientRect().top - 8;
            window.scrollTo({
              top: Math.max(0, top),
              left: window.scrollX,
              behavior: 'smooth'
            });
          });
        }else{
          setRankingWorkspaceV685(false);
        }
      }, true);
    }
    /* V750 — hash de Rankings não altera o modo/layout da página. */
    setRankingWorkspaceV685(false);
    window.addEventListener('hashchange', function(){ setRankingWorkspaceV685(false); });
  }
  function install(){
    if(!isDesktop()) return;
    window.renderRankings = renderRankingsV562;
    try{ renderRankings = renderRankingsV562; }catch(e){}
    bind();
    installRankingWorkspaceNavigationV685();
    installActiveSectionSyncV683();
    /* v726: só desenha aqui se os dados já existirem. No carregamento normal,
       applyFilter() é o gatilho único quando dados_atuais.csv termina de carregar. */
    if(typeof allRows !== 'undefined' && Array.isArray(allRows) && allRows.length){
      renderRankingsV562();
    }
    syncActiveSectionV683();
  }

  window.__renderRankingsV562 = renderRankingsV562;
  /* v726: uma única instalação; sem load + cascata de timers. */
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', install, {once:true});
  else install();
})();


/* =========================================================
   PATCH v555 — Desktop: Rankings reconstruidos e simplificados
   ========================================================= */
(function desktopRankingRedesignV555(){
  if(window.__desktopRankingRedesignV555Installed) return;
  if(window.__desktopRankingPodiumV562Installed) return;
  window.__desktopRankingRedesignV555Installed = true;

  function isDesktop(){
    return !window.matchMedia || window.matchMedia('(min-width: 769px)').matches;
  }
  function q(sel, root){ return (root || document).querySelector(sel); }
  function qa(sel, root){ return Array.from((root || document).querySelectorAll(sel)); }
  function esc(v){
    return String(v ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }
  function num(v){
    try{ return typeof toNum === 'function' ? toNum(v) : Number(String(v ?? '').replace('%','').replace(',','.')); }
    catch(e){ return null; }
  }
  function finite(v){
    const n = num(v);
    return n !== null && !Number.isNaN(n) && Number.isFinite(n) ? n : null;
  }
  function pct(v){
    const n = finite(v);
    if(n === null) return '—';
    return (n > 0 ? '+' : '') + n.toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2}) + '%';
  }
  function cls(v){
    const n = finite(v);
    return n > 0 ? 'pos' : n < 0 ? 'neg' : 'zero';
  }
  function norm(v){
    return String(v || '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toUpperCase();
  }
  function cleanFund(v){
    return String(v || '—').replace(/\s*\(\d+\)/g,'').replace(/\s+/g,' ').trim() || '—';
  }
  function compactFund(v){
    let s = cleanFund(v)
      .replace(/^CAIXA\s+/i,'')
      .replace(/\bFIC\b/ig,'')
      .replace(/\bFIF\b/ig,'')
      .replace(/\bRESP\.?\s*LTDA\b/ig,'')
      .replace(/\bRESP\b/ig,'')
      .replace(/\bFUNDO DE INDICE\b/ig,'')
      .replace(/\bCORPORATIVO\b/ig,'Corp.')
      .replace(/\bREFERENCIADO\b/ig,'Ref.')
      .replace(/\s+-\s+/g,' ')
      .replace(/\s+/g,' ')
      .trim();
    const words = s.split(/\s+/).filter(Boolean);
    if(words.length > 4) s = words.slice(0,4).join(' ');
    return s || cleanFund(v);
  }
  function shortCat(v){
    const raw = String(v || '—').trim();
    const n = norm(raw);
    if(n.includes('FUNDOS MUTUOS') || n.includes('PRIVATIZACAO')) return 'FMP';
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
  function parsePtNumberLocal(v){
    if(typeof v === 'number') return Number.isFinite(v) ? v : null;
    let s = String(v ?? '').trim();
    if(!s) return null;
    s = s.replace(/[^\d,.\-]/g,'');
    if(!s || s === '-' || s === ',' || s === '.') return null;
    if(s.includes(',') && s.includes('.')){
      s = s.replace(/\./g,'').replace(',', '.');
    }else if(s.includes(',')){
      s = s.replace(',', '.');
    }else{
      const parts = s.split('.');
      if(parts.length > 2 || (parts.length === 2 && parts[1].length === 3 && parts[0].length <= 3)){
        s = s.replace(/\./g,'');
      }
    }
    const n = Number(s);
    return Number.isFinite(n) ? n : null;
  }
  function plValue(r){
    const raw = r?.['PL (milhoes R$)'] ?? r?.PL ?? r?.['Patrimonio Liquido'];
    const n = parsePtNumberLocal(raw);
    if(n === null) return null;
    return Math.abs(n) >= 1000000 ? n / 1000000 : n;
  }
  function plTxt(v){
    const n = parsePtNumberLocal(v);
    if(n === null) return 'R$ —';
    if(Math.abs(n) >= 1000) return 'R$ ' + (n / 1000).toLocaleString('pt-BR',{minimumFractionDigits:1,maximumFractionDigits:1}) + ' bi';
    return 'R$ ' + n.toLocaleString('pt-BR',{maximumFractionDigits:0}) + ' mi';
  }
  function periodoAtual(){
    const select = q('#rankingPeriodSelectV136');
    const p = (typeof activeRankPeriods !== 'undefined' && activeRankPeriods.topFundos) || select?.value || '12m';
    return ['mes','ano','12m'].includes(p) ? p : '12m';
  }
  function campoPorPeriodo(periodo){
    if(typeof rankCampoPorPeriodo === 'function') return rankCampoPorPeriodo(periodo);
    if(periodo === 'mes') return 'Acum. Mes (%)';
    if(periodo === 'ano') return 'Acum. Ano (%)';
    return 'Acum. 12M (%)';
  }
  function labelPeriodo(periodo){
    return periodo === 'mes' ? 'mês' : periodo === 'ano' ? 'ano' : '12 meses';
  }
  function normalizarCdiPeriodo(raw, periodo){
    let n = finite(raw);
    if(n === null) return null;
    const abs = Math.abs(n);
    if(periodo === 'mes'){
      if(abs > 1000) n = n / 10000;
      else if(abs > 20) n = n / 100;
      return Number.isFinite(n) ? n : null;
    }
    if(periodo === 'ano'){
      while(Math.abs(n) > 20) n = n / 10;
      return Number.isFinite(n) ? n : null;
    }
    if(abs > 10000) n = n / 1000;
    else if(abs > 1000) n = n / 100;
    else if(abs > 80) n = n / 10;
    return Number.isFinite(n) ? n : null;
  }
  function cdiReferencia(periodo){
    const card = typeof cdiCardAtualV230 === 'function' ? cdiCardAtualV230() : (window.__mercadoAtualV230?.cards?.cdi || {});
    const first = function(){
      for(const value of arguments){
        const n = normalizarCdiPeriodo(value, periodo);
        if(n !== null) return n;
      }
      return null;
    };
    if(periodo === 'mes'){
      let atual = null;
      try{ atual = typeof obterCdiAtualV232 === 'function' ? obterCdiAtualV232().valor : null; }catch(e){}
      return first(atual, card?.parcial_mes_atual, card?.mensal, window.indicState?.cdi?.mes);
    }
    if(periodo === 'ano'){
      return first(card?.acum_ano_com_parcial, card?.acum_ano, card?.ano, window.indicState?.cdi?.ano);
    }
    const m12 = typeof resolverCdiPeriodoV229 === 'function' ? resolverCdiPeriodoV229(card,12) : null;
    return first(m12, card?.acum_12m, card?.m12, window.indicState?.cdi?.m12);
  }
  function cdiRatio(r, periodo){
    const rent = finite(r?.[campoPorPeriodo(periodo)]);
    const cdi = cdiReferencia(periodo);
    if(rent === null || cdi === null || cdi === 0) return '—';
    const ratio = typeof calcularPercentualCdiRankingV643 === 'function' ? calcularPercentualCdiRankingV643(rent, cdi, periodo) : Math.round((rent / cdi) * 100);
    if(!Number.isFinite(ratio)) return '—';
    return ratio.toLocaleString('pt-BR',{maximumFractionDigits:0}) + '%';
  }
  function riskOk(r){
    if(typeof activeRankRisk === 'undefined' || !activeRankRisk) return true;
    return typeof perfilRiscoCorrespondeV198 === 'function' ? perfilRiscoCorrespondeV198(r['Perfil de Risco'], activeRankRisk) : true;
  }
  function filterOk(r){
    return typeof passaFiltroRanking === 'function' ? passaFiltroRanking(r) : true;
  }
  function baseRows(){
    if(typeof allRows === 'undefined' || !Array.isArray(allRows)) return [];
    return allRows
      .filter(function(r){ return typeof temDados === 'function' ? temDados(r) : true; })
      .filter(filterOk)
      .filter(riskOk);
  }
  function sortedRows(rows, campo, asc){
    return rows
      .filter(function(r){ return finite(r[campo]) !== null; })
      .sort(function(a,b){ return asc ? finite(a[campo]) - finite(b[campo]) : finite(b[campo]) - finite(a[campo]); });
  }
  function medal(i){ return i === 0 ? '1' : i === 1 ? '2' : i === 2 ? '3' : String(i + 1); }
  function syncControls(periodo){
    document.documentElement.classList.add('desktop-ranking-redesign-v555','desktop-ranking-compact-cdi-v556','desktop-ranking-cdi-pl-fix-v557');
    const meta = q('meta[name="app-build"]');
    if(meta) meta.content = 'ELTAUM_DESKTOP_RANKING_CDI_PL_FIX_V557';
    const period = q('#rankingPeriodSelectV136');
    const clsSelect = q('#rankingClassSelectV136');
    const risk = q('#rankingRiskSelectV198');
    if(period && period.value !== periodo) period.value = periodo;
    if(clsSelect && typeof activeRankFilter !== 'undefined' && clsSelect.value !== activeRankFilter) clsSelect.value = activeRankFilter || 'todos';
    if(risk && typeof activeRankRisk !== 'undefined' && risk.value !== (activeRankRisk || '')) risk.value = activeRankRisk || '';
    qa('[data-rank-filter]').forEach(function(btn){
      btn.classList.toggle('active', btn.dataset.rankFilter === (typeof activeRankFilter !== 'undefined' ? activeRankFilter : 'todos'));
    });
  }
  function periodTabs(periodo){
    return '<div class="ranking-v555-period-tabs" role="tablist" aria-label="Período do ranking">' +
      ['mes','ano','12m'].map(function(p){
        const label = p === 'mes' ? 'Mês' : p === 'ano' ? 'Ano' : '12M';
        return '<button type="button" class="' + (p === periodo ? 'active' : '') + '" data-rank-target="topFundos" data-rank-period="' + p + '">' + label + '</button>';
      }).join('') +
    '</div>';
  }
  function contextLine(rows, periodo){
    const cdi = cdiReferencia(periodo);
    const universo = q('[data-rank-filter="' + (typeof activeRankFilter !== 'undefined' ? activeRankFilter : 'todos') + '"]')?.textContent?.trim()
      || q('#rankingClassSelectV136 option:checked')?.textContent?.trim()
      || 'Todos';
    const risco = typeof rotuloPerfilRiscoV198 === 'function' ? rotuloPerfilRiscoV198(typeof activeRankRisk !== 'undefined' ? activeRankRisk : '') : 'Todos os perfis';
    return '<div class="ranking-v555-context ranking-v556-context">' +
      '<span>' + rows.length + ' fundos no recorte</span>' +
      '<span>Universo: <strong>' + esc(universo) + '</strong></span>' +
      '<span>Risco: <strong>' + esc(risco) + '</strong></span>' +
      '<span>CDI do período: <strong>' + esc(cdi === null ? '—' : pct(cdi)) + '</strong></span>' +
    '</div>';
  }
  function summaryCard(label, r, campo, periodo, mode){
    if(!r) return '<article class="ranking-v555-summary-card"><span>' + esc(label) + '</span><strong>—</strong><small>Sem dados</small></article>';
    const nome = cleanFund(r.Fundo);
    return '<article class="ranking-v555-summary-card ' + esc(mode || '') + '">' +
      '<span>' + esc(label) + '</span>' +
      '<strong class="' + cls(r[campo]) + '">' + esc(pct(r[campo])) + '</strong>' +
      '<small title="' + esc(nome) + '">' + esc(compactFund(nome)) + '</small>' +
      '<em>' + esc(shortCat(r.Categoria)) + (cdiRatio(r, periodo) !== '—' ? ' · ' + esc(cdiRatio(r, periodo)) + ' do CDI' : '') + '</em>' +
    '</article>';
  }
  function categoryWinners(rows, campo){
    const map = new Map();
    sortedRows(rows, campo).forEach(function(r){
      const cat = r.Categoria || 'Sem categoria';
      if(!map.has(cat)) map.set(cat, r);
    });
    const order = ['RF Simples','Renda Fixa','RF Ref.','RF Curto','Multimercado','Cambial','Ações','Índice','FMP'];
    return Array.from(map.entries()).sort(function(a,b){
      const ia = order.indexOf(shortCat(a[0]));
      const ib = order.indexOf(shortCat(b[0]));
      if(ia !== -1 || ib !== -1) return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
      return shortCat(a[0]).localeCompare(shortCat(b[0]), 'pt-BR');
    });
  }
  function categoryCard(entry, campo, periodo){
    const cat = entry[0], r = entry[1], nome = cleanFund(r.Fundo), ratio = cdiRatio(r, periodo);
    return '<article class="ranking-v555-category-card">' +
      '<span class="ranking-v555-cat">' + esc(shortCat(cat)) + '</span>' +
      '<strong class="' + cls(r[campo]) + '">' + esc(pct(r[campo])) + '</strong>' +
      '<small title="' + esc(nome) + '">' + esc(compactFund(nome)) + '</small>' +
      '<em>' + (ratio === '—' ? 'CDI indisponível' : esc(ratio) + ' do CDI') + '</em>' +
    '</article>';
  }
  function topRow(r, i, campo, periodo){
    const nome = cleanFund(r.Fundo);
    const ratio = cdiRatio(r, periodo);
    return '<div class="ranking-v555-table-row">' +
      '<span class="ranking-v555-pos">' + medal(i) + '</span>' +
      '<span class="ranking-v555-fund"><strong title="' + esc(nome) + '">' + esc(nome) + '</strong><small>' + esc(shortCat(r.Categoria)) + ' · ' + esc(plTxt(plValue(r))) + '</small></span>' +
      '<span class="' + cls(r[campo]) + '">' + esc(pct(r[campo])) + '</span>' +
      '<span>' + esc(ratio) + '</span>' +
    '</div>';
  }
  function alertRow(r, i, campo){
    const nome = cleanFund(r.Fundo);
    return '<div class="ranking-v555-alert-row">' +
      '<span>' + (i + 1) + '</span>' +
      '<strong title="' + esc(nome) + '">' + esc(compactFund(nome)) + '</strong>' +
      '<small>' + esc(shortCat(r.Categoria)) + '</small>' +
      '<em class="' + cls(r[campo]) + '">' + esc(pct(r[campo])) + '</em>' +
    '</div>';
  }
  function renderRankingsV555(){
    const grid = q('#rankingGrid');
    if(!grid || !isDesktop()) return;
    if(typeof allRows === 'undefined' || !Array.isArray(allRows) || !allRows.length) return;

    const periodo = periodoAtual();
    const campo = campoPorPeriodo(periodo);
    syncControls(periodo);

    const rows = baseRows();
    const sorted = sortedRows(rows, campo);
    const worst = sortedRows(rows, campo, true).filter(function(r){ return finite(r[campo]) < 0; });
    const best = sorted[0];
    const worstOne = worst[0];
    const winners = categoryWinners(rows, campo);
    const topRows = sorted.slice(0,10).map(function(r,i){ return topRow(r,i,campo,periodo); }).join('');
    const alertRows = worst.slice(0,6).map(function(r,i){ return alertRow(r,i,campo); }).join('');

    grid.className = 'ranking-grid ranking-v555-grid ranking-main-v136';
    grid.innerHTML =
      contextLine(rows, periodo) +
      '<section class="ranking-v555-summary" aria-label="Resumo do ranking">' +
        summaryCard('Melhor do período', best, campo, periodo, 'best') +
        summaryCard('Pior do período', worstOne, campo, periodo, 'worst') +
        '<article class="ranking-v555-summary-card neutral"><span>Categorias com dados</span><strong>' + winners.length + '</strong><small>Melhor fundo por classe</small><em>Recorte atual</em></article>' +
      '</section>' +
      '<section class="ranking-v555-panel ranking-v555-primary">' +
        '<div class="ranking-v555-panel-head"><div><h3>Melhores por categoria</h3><p>Vencedor de cada classe no período selecionado.</p></div></div>' +
        '<div class="ranking-v555-category-grid">' + (winners.length ? winners.map(function(entry){ return categoryCard(entry,campo,periodo); }).join('') : '<div class="ranking-empty-v50">Sem dados suficientes para este filtro.</div>') + '</div>' +
      '</section>' +
      '<section class="ranking-v555-panel">' +
        '<div class="ranking-v555-panel-head"><div><h3>Top 10 geral</h3><p>Ranking por retorno e comparação com CDI do mesmo período.</p></div></div>' +
        '<div class="ranking-v555-table">' +
          '<div class="ranking-v555-table-head"><span>Pos.</span><span>Fundo</span><span>Retorno</span><span>% CDI</span></div>' +
          (topRows || '<div class="ranking-empty-v50">Sem dados suficientes para este filtro.</div>') +
        '</div>' +
      '</section>' +
      '<details class="ranking-v555-alerts">' +
        '<summary><span>Piores do período</span><strong>' + worst.length + '</strong></summary>' +
        '<div class="ranking-v555-alert-list">' + (alertRows || '<div class="ranking-empty-v50">Nenhum retorno negativo no recorte atual.</div>') + '</div>' +
        '<p>Alertas automáticos para triagem. A decisão depende de suitability, objetivo, prazo e benchmark adequado.</p>' +
      '</details>';
  }
  function bindV555(){
    const clsSelect = q('#rankingClassSelectV136');
    const period = q('#rankingPeriodSelectV136');
    const risk = q('#rankingRiskSelectV198');

    if(clsSelect && clsSelect.dataset.v555Bound !== '1'){
      clsSelect.dataset.v555Bound = '1';
      clsSelect.addEventListener('change', function(){
        try{ activeRankFilter = clsSelect.value || 'todos'; }catch(e){}
        renderRankingsV555();
      });
    }
    if(period && period.dataset.v555Bound !== '1'){
      period.dataset.v555Bound = '1';
      period.addEventListener('change', function(){
        try{
          activeRankPeriods.topFundos = period.value || '12m';
          activeRankPeriods.destaques = period.value || '12m';
        }catch(e){}
        renderRankingsV555();
      });
    }
    if(risk && risk.dataset.v555Bound !== '1'){
      risk.dataset.v555Bound = '1';
      risk.addEventListener('change', function(){
        try{ activeRankRisk = risk.value || ''; }catch(e){}
        renderRankingsV555();
      });
    }
    const row = q('#rankingFilterRow');
    if(row && row.dataset.v555Bound !== '1'){
      row.dataset.v555Bound = '1';
      row.addEventListener('click', function(ev){
        const btn = ev.target.closest('[data-rank-filter]');
        if(!btn) return;
        try{ activeRankFilter = btn.dataset.rankFilter || 'todos'; }catch(e){}
        if(clsSelect) clsSelect.value = activeRankFilter;
        renderRankingsV555();
      });
    }
  }
  function install(){
    if(!isDesktop()) return;
    window.renderRankings = renderRankingsV555;
    try{ renderRankings = renderRankingsV555; }catch(e){}
    bindV555();
    renderRankingsV555();
  }

  window.__renderRankingsV555 = renderRankingsV555;
  window.__bindRankingV555 = bindV555;
  window.__installRankingV555 = install;

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', install, {once:true});
  else install();
  window.addEventListener('load', install, {once:true});
  [150, 600, 1400].forEach(function(delay){ setTimeout(install, delay); });
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

function catalogAudienceMatchesV553(row, audience){
  const wantedRaw = String(audience || '').trim();
  if(!wantedRaw) return true;

  const norm = value => String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g,'')
    .replace(/[^A-Z0-9]+/gi,' ')
    .replace(/\s+/g,' ')
    .trim()
    .toUpperCase();

  const wanted = norm(wantedRaw);
  const legacyTokens = String(row?.['Perfis'] || row?.['Perfil'] || '')
    .split(/\s*\|\s*/)
    .map(s => String(s).trim())
    .filter(Boolean);

  if(legacyTokens.some(token => norm(token) === wanted)) return true;

  const rawParts = [];
  ['Público Alvo','Publico Alvo','Segmentos','SEGMENTOS','lista_publico_alvo','no_classificacao_investidor'].forEach(key=>{
    const value = row?.[key];
    if(value === null || value === undefined || value === '') return;
    if(Array.isArray(value)) rawParts.push(...value);
    else {
      const text = String(value).trim();
      try{
        const parsed = JSON.parse(text);
        if(Array.isArray(parsed)) rawParts.push(...parsed);
        else rawParts.push(text);
      }catch(_){
        rawParts.push(text);
      }
    }
  });

  const normalizedParts = rawParts
    .flatMap(part => String(part ?? '').split(/\s*[·;,|/]\s*/g))
    .map(part => norm(part))
    .filter(Boolean);

  const joined = normalizedParts.join(' ');

  if(wanted === 'PF') return normalizedParts.some(part => part === 'PF' || part.includes('PESSOA FISICA'));
  if(wanted === 'PJ') return normalizedParts.some(part => part === 'PJ' || part.includes('PESSOA JURIDICA'));
  if(wanted.includes('PRIVATE')) return joined.includes('PRIVATE');
  if(wanted.includes('QUALIFICADO')) return joined.includes('QUALIFICAD');
  if(wanted.includes('INSTITUCIONAL')) return joined.includes('INSTITUCIONAL');

  return normalizedParts.some(part => part === wanted || part.includes(wanted));
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
      if(!catalogAudienceMatchesV553(r,activePerfil)) return false;
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
let _fundosMetaLista = [];    // v699: universo completo carregado de fundos.json

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


/* =========================================================
   PATCH v699 — universo completo do catálogo
   fundos.json = cadastro/universo
   dados_atuais.csv = rentabilidade disponível na data
   ========================================================= */
function formatarDataIsoBrV699(v){
  const s=String(v || '').trim();
  if(!s) return '';
  const m=s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  return m ? `${m[3]}/${m[2]}/${m[1]}` : s;
}

function categoriaCatalogoMetaV699(meta){
  const cls=normalizarNomeMeta(meta?.no_classificacao_cvm || '');
  const nome=normalizarNomeMeta(meta?.no_fundo || meta?.no_razao_social || '');
  const est=normalizarNomeMeta(meta?.no_estrategia || '');
  const blob=`${cls} ${nome} ${est}`;

  if(blob.includes('FUNDO DE INDICE') || /\bETF\b/.test(blob)) return 'FUNDO DE INDICE';
  if(blob.includes('FMP') || blob.includes('MUTUOS DE PRIVATIZACAO')) return 'FUNDOS MUTUOS DE PRIVATIZACAO';
  if(cls.includes('ACOES')) return 'ACOES';
  if(cls.includes('CAMBIAL')) return 'CAMBIAL';
  if(cls.includes('MULTIMERCADO')) return 'MULTIMERCADO';

  if(cls.includes('RENDA FIXA')){
    if(blob.includes('SIMPLES')) return 'RENDA FIXA SIMPLES';
    if(blob.includes('CURTO PRAZO')) return 'RENDA FIXA CURTO PRAZO';
    if(blob.includes('REFERENCIADO') || /\bREF\b/.test(est)) return 'RENDA FIXA REFERENCIADO';
    return 'RENDA FIXA';
  }

  return String(meta?.no_classificacao_cvm || '').trim().toUpperCase() || 'OUTROS';
}

function chaveCatalogoV699(row){
  const cnpj=limparCnpjMeta(row?.['CNPJ'] || row?.nu_cnpj);
  if(cnpj) return 'cnpj:'+cnpj;

  const codigo=String(row?.['codfundo'] || row?.co_siico00 || row?.co_siico || '')
    .replace(/\D/g,'')
    .replace(/^0+(?=\d)/,'');
  if(codigo) return 'cod:'+codigo;

  const nome=normalizarNomeMeta(row?.['Fundo'] || row?.no_fundo || row?.no_razao_social);
  return nome ? 'nome:'+nome : '';
}

function criarLinhaCatalogoMetaV699(meta, headers){
  const row={};
  (headers || []).forEach(h=>{ row[h]=''; });

  row['Categoria']=categoriaCatalogoMetaV699(meta);
  row['Fundo']=String(meta?.no_fundo || meta?.no_razao_social || '').trim();
  row['Fundo_norm']=normalizarNomeMeta(row['Fundo']);
  row['Data Inicio']=formatarDataIsoBrV699(meta?.dt_inicial);

  /* Deliberadamente não usa a rentabilidade/cota de fundos.json:
     se o fundo não está no CSV da data, aparece no catálogo com "—",
     evitando misturar dado defasado com a fotografia diária. */
  row['Cota (R$)']='';
  row['Variacao Dia (%)']='';
  row['Acum. Mes (%)']='';
  row['Acum. Ano (%)']='';
  row['Acum. 12M (%)']='';

  if(Number.isFinite(Number(meta?.vr_pl))){
    row['PL (milhoes R$)']=(Number(meta.vr_pl)/1000000)
      .toLocaleString('pt-BR',{minimumFractionDigits:3,maximumFractionDigits:3});
  }

  row['Data Base Consulta']='';
  row['Data Rentabilidade Ref']='';
  row['Fallback Rentabilidade']='Não';
  row['Dias Úteis Fallback']='';
  row['Alerta Rentabilidade Defasada']='Sem rentabilidade na data de referência';

  row['CNPJ']=formatarCnpjMeta(meta?.nu_cnpj || meta?.cnpj);
  row['codfundo']=String(meta?.co_siico00 || meta?.co_siico || meta?.codfundo || '')
    .replace(/\D/g,'')
    .replace(/^0+(?=\d)/,'');

  return mesclarMetadadosFundo(row);
}

function unificarUniversoCatalogoV699(csvRows, headers){
  const rows=Array.isArray(csvRows) ? csvRows.slice() : [];
  const metaLista=Array.isArray(_fundosMetaLista) ? _fundosMetaLista : [];

  const chaves=new Set();
  rows.forEach(row=>{
    const k=chaveCatalogoV699(row);
    if(k) chaves.add(k);

    const meta=obterMetaFundo(row);
    if(meta){
      const mk=chaveCatalogoV699(meta);
      if(mk) chaves.add(mk);
    }
  });

  let adicionados=0;
  metaLista.forEach(meta=>{
    if(!meta || typeof meta!=='object') return;

    /* respeita a sinalização explícita de não exibir no portfólio */
    if(meta.ic_flag_exibir_portfolio === 0 || meta.ic_flag_exibir_portfolio === false) return;

    const k=chaveCatalogoV699(meta);
    if(!k || chaves.has(k)) return;

    const row=criarLinhaCatalogoMetaV699(meta,headers);
    if(!row['Fundo']) return;

    rows.push(row);
    chaves.add(k);
    adicionados++;
  });

  const comDados=rows.filter(temDados).length;
  const semDados=rows.length-comDados;

  window.__ELTAUM_CATALOGO_UNIVERSO_V699__={
    build:'ELTAUM_CATALOGO_UNIVERSO_V699',
    csv:csvRows?.length || 0,
    metadados:metaLista.length,
    adicionados,
    total:rows.length,
    comDados,
    semDados
  };

  console.info(
    `[Catálogo CAIXA] Universo v699: ${rows.length} fundos · `+
    `${comDados} com rentabilidade · ${semDados} sem dado na data · `+
    `${adicionados} adicionados do fundos.json`
  );

  return rows;
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
    _fundosMetaLista=lista;
    console.log(`[fundos.json] ${lista.length} registros · ${Object.keys(porCnpj).length} CNPJs indexados`);
    return lista;
  }catch(e){
    _fundosMetaMap={}; _fundosMetaByCode={}; _fundosMetaByName={}; _fundosMetaLista=[];
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
  preencherSeVazio(row,'Fundo',String(meta.no_fundo || meta.no_razao_social || '').trim());
  preencherSeVazio(row,'Fundo_norm',normalizarNomeMeta(meta.no_fundo || meta.no_razao_social || ''));
  preencherSeVazio(row,'Categoria',categoriaCatalogoMetaV699(meta));
  preencherSeVazio(row,'Data Inicio',formatarDataIsoBrV699(meta.dt_inicial));
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
  preencherSeVazio(row,'Segmentos',formatarListaMeta(meta.lista_segmento));
  preencherSeVazio(row,'Classificação Investidor',String(meta.no_classificacao_investidor || '').trim());
  preencherSeVazio(row,'Razão Social',String(meta.no_razao_social || '').trim());
  preencherSeVazio(row,'Modalidade Adiantamento',String(meta.de_adiant_manual_automatico || '').trim());
  preencherSeVazio(row,'Percentual Adiantamento (%)',meta.pc_adiant_resgate);
  preencherSeVazio(row,'Fim Carência',formatarDataIsoBrV699(meta.dt_fim_carencia));
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
  preencherSeVazio(row,'doc_sumario',urlMetaValida(meta.de_link_sumario)?meta.de_link_sumario:'');
  preencherSeVazio(row,'doc_raio_x',urlMetaValida(meta.de_link_raio_x)?meta.de_link_raio_x:'');
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
  const d = obterDadosOperacionaisFundo(r);
  const capCls = classeStatusOperacional(d.captacao.status,'captacao');
  const capHeadline = capCls === 'positive'
    ? 'Aberto para captação'
    : capCls === 'negative'
      ? 'Fechado para captação'
      : 'Captação não informada';

  const code = detailValueV158(r,['codfundo','Código SIART','Codigo SIART','SIART','Código SIICO','Codigo SIICO','SIICO','Código do Fundo','Codigo do Fundo','Cod Fundo','Cód. Fundo']);
  const taxAdm = detailPercentV158(detailValueV158(r,['Taxa Adm (%)']));
  const profile = detailValueV158(r,['Perfil de Risco']);
  const conversionApp = detailValueV158(r,['Conversao Aplicacao','Conversão Aplicação']);
  const conversionRed = detailValueV158(r,['Conversao Resgate','Conversão Resgate']);
  const paymentRed = detailValueV158(r,['Pagamento Resgate','Pagamento do Resgate']);
  const appInitial = detailMoneyV158(detailValueV158(r,['Aplicacao Minima (R$)','Aplicação Mínima','Aplicacao Minima']));
  const appAdditional = detailMoneyV158(detailValueV158(r,['Aplicacao Adicional Minima (R$)','Aplicação Adicional Mínima']));
  const redemptionMin = detailMoneyV158(detailValueV158(r,['Resgate Minimo (R$)','Resgate Mínimo']));
  const balanceMin = detailMoneyV158(detailValueV158(r,['Saldo Minimo (R$)','Saldo Mínimo']));
  const trib = d.tributacao && d.tributacao.texto ? d.tributacao.texto : detailValueV158(r,['Classificação Tributária','Classificacao Tributaria','Tributação','Tributacao']);
  const audience = detailAudienceSemanticV225(detailAudienceV158(detailValueV158(r,['Público Alvo','Publico Alvo'])));
  const audienceText = audience.length ? audience.map(item=>item.short || item.label).join(' · ') : 'Não informado';
  const urlFund = isFallbackUrl(r) ? '' : getFundUrl(r);

  const safe = value => htmlAttr(value || '—');
  const link = (href, label, cls='') => href ? `<a class="detail-doc-link-v559 detail-doc-link-v768 ${cls}" href="${htmlAttr(href)}" target="_blank" rel="noopener" onclick="event.stopPropagation()">${label}</a>` : '';

  const summaryFact = (label, value) => `
    <div class="detail-summary-fact-v768">
      <span>${htmlAttr(label)}</span>
      <strong>${safe(value)}</strong>
    </div>`;

  const metaFact = (label, value) => `
    <div class="detail-meta-fact-v768">
      <span>${htmlAttr(label)}</span>
      <strong>${safe(value)}</strong>
    </div>`;

  const operRow = (label, value) => `
    <div class="detail-oper-row-v768">
      <span>${htmlAttr(label)}</span>
      <strong>${safe(value)}</strong>
    </div>`;

  return `<tr class="detail-row detail-row-v559 detail-row-v768"><td colspan="${colspan}" style="padding:0">
    <div class="detail-panel detail-panel-v559 detail-panel-v768">

      <div class="detail-compact-head-v559 detail-head-v768">
        <div>
          <strong>Dados operacionais do fundo</strong>
          <small>Consulta rápida para atendimento.</small>
        </div>
        <div class="detail-doc-actions-v559 detail-doc-actions-v768">
          ${urlFund ? link(urlFund,'Página do fundo ↗') : ''}
        </div>
      </div>

      <div class="detail-summary-v768">
        <div class="detail-status-v768 ${capCls}">
          <span>Captação</span>
          <strong>${htmlAttr(capHeadline)}</strong>
        </div>

        <div class="detail-summary-facts-v768">
          ${summaryFact('Perfil', profile)}
          ${summaryFact('Taxa de administração', taxAdm)}
          ${summaryFact('Aplicação inicial', appInitial)}
          ${summaryFact('Resgate', `${conversionRed || '—'} → ${paymentRed || '—'}`)}
        </div>
      </div>

      <div class="detail-meta-v768" aria-label="Dados cadastrais do fundo">
        ${metaFact('Estratégia', d.estrategia.texto)}
        ${metaFact('Benchmark', d.benchmark.texto)}
        ${metaFact('Código SIART', code)}
        ${metaFact('Tributação', trib)}
        ${metaFact('Público-alvo', audienceText)}
        ${metaFact('Saldo mínimo', balanceMin)}
      </div>

      <div class="detail-oper-grid-v559 detail-oper-grid-v768">
        <section class="detail-oper-card-v559 detail-oper-card-v768 application">
          <div class="detail-oper-title-v768">
            <h4>Aplicar</h4>
            <small>Condições de entrada</small>
          </div>
          <div class="detail-oper-list-v768">
            ${operRow('Aplicação inicial', appInitial)}
            ${operRow('Aplicação adicional', appAdditional)}
            ${operRow('Conversão', conversionApp)}
            ${operRow('Horário limite', d.horarios.aplicacao)}
          </div>
        </section>

        <section class="detail-oper-card-v559 detail-oper-card-v768 redemption">
          <div class="detail-oper-title-v768">
            <h4>Resgatar</h4>
            <small>Prazo até o crédito</small>
          </div>
          <div class="detail-oper-list-v768">
            ${operRow('Conversão', conversionRed)}
            ${operRow('Crédito em conta', paymentRed)}
            ${operRow('Resgate mínimo', redemptionMin)}
            ${operRow('Horário limite', d.horarios.resgate)}
          </div>
        </section>
      </div>

    </div>
  </td></tr>`;
}

(function desktopDocsMenuAndDetailV559(){
  if(window.__desktopDocsMenuAndDetailV559Installed) return;
  window.__desktopDocsMenuAndDetailV559Installed = true;

  function closeMenu(){
    var old = document.getElementById('docMenuPortalV559');
    if(old) old.remove();
  }

  function openDocsMenu(btn){
    closeMenu();
    var docs = [];
    try{ docs = JSON.parse(decodeURIComponent(btn.dataset.docsOtherV559 || '[]')); }catch(_){}
    if(!docs.length) return;
    var rect = btn.getBoundingClientRect();
    var menu = document.createElement('div');
    menu.id = 'docMenuPortalV559';
    menu.className = 'doc-menu-portal-v559';
    menu.setAttribute('role','menu');
    menu.innerHTML = `<div class="doc-menu-head-v559">Documentos complementares</div>` + docs.map(function(d){
      return `<a role="menuitem" href="${htmlAttr(d.url)}" target="_blank" rel="noopener"><strong>${htmlAttr(d.curto)}</strong><span>${htmlAttr(d.label)}</span></a>`;
    }).join('');
    document.body.appendChild(menu);
    var width = Math.min(280, Math.max(220, menu.offsetWidth || 240));
    var left = Math.min(window.innerWidth - width - 12, Math.max(12, rect.right - width));
    var top = Math.min(window.innerHeight - menu.offsetHeight - 12, rect.bottom + 8);
    menu.style.left = left + 'px';
    menu.style.top = Math.max(12, top) + 'px';
  }

  function sync(){
    document.documentElement.classList.add('desktop-detail-compact-v559','desktop-detail-sem-cnpj-v560','desktop-detail-color-hierarchy-v561');
    var meta = document.querySelector('meta[name="app-build"]');
    if(meta) meta.content = 'ELTAUM_DESKTOP_DETAIL_COLOR_HIERARCHY_V561';
  }

  document.addEventListener('click', function(ev){
    var btn = ev.target && ev.target.closest ? ev.target.closest('.doc-more-button-v559') : null;
    if(btn){
      ev.preventDefault();
      ev.stopPropagation();
      openDocsMenu(btn);
      return;
    }
    if(!(ev.target && ev.target.closest && ev.target.closest('#docMenuPortalV559'))) closeMenu();
  }, true);

  document.addEventListener('keydown', function(ev){
    if(ev.key === 'Escape') closeMenu();
  });

  var previousRender = typeof render === 'function' ? render : null;
  if(previousRender && !previousRender.__v559Wrapped){
    var wrappedRender = function(){
      var result = previousRender.apply(this, arguments);
      setTimeout(sync, 0);
      return result;
    };
    wrappedRender.__v559Wrapped = true;
    try{ render = wrappedRender; }catch(_){}
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', sync, {once:true});
  else sync();
  window.addEventListener('load', sync, {once:true});
  [120, 500, 1300].forEach(function(delay){
    setTimeout(function(){
      sync();
    }, delay);
  });
})();


/* PATCH v726 — saneamento do antigo v567-final.
   O CSS ranking-stable-final-v706 governa a geometria; este bloco apenas
   preserva a referência do renderer v562, sem estilos inline e sem timers. */
(function desktopRankingPodiumV562FinalV726(){
  function isDesktop(){
    return !window.matchMedia || window.matchMedia('(min-width: 769px)').matches;
  }
  function registerOnly(){
    if(!isDesktop() || typeof window.__renderRankingsV562 !== 'function') return;
    window.renderRankings = window.__renderRankingsV562;
    try{ renderRankings = window.__renderRankingsV562; }catch(_){}
  }
  registerOnly();
})();


/* PATCH v572-final — compacta Juros e CDI no desktop sem alterar dados */
(function desktopRatesCompactV572Final(){
  function isDesktop(){
    return !window.matchMedia || window.matchMedia('(min-width: 769px)').matches;
  }
  function sync(){
    if(!isDesktop()) return;
	    document.documentElement.classList.add(
	      'desktop-hide-closed-month-launch-v571',
	      
	      
	      'desktop-monthly-us-markets-v576',
	      'desktop-monthly-comparison-chart-v580',
	      'desktop-monthly-chart-start-zero-v581','desktop-header-kpis-focus-clean-v582','desktop-header-clean-inflacao-juros-v583','desktop-header-kpis-minimal-v584','desktop-side-nav-v585','desktop-side-nav-no-overlap-v586','desktop-side-nav-market-fix-v588'
	    );
	    var meta = document.querySelector('meta[name="app-build"]');
	    if(meta) meta.content = 'ELTAUM_RANKING_CAPTACAO_FECHADA_V646';
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', sync, {once:true});
  else sync();
  window.addEventListener('load', sync, {once:true});
  [120, 500, 1300, 3200, 7000, 14000, 23000, 36000].forEach(function(delay){ setTimeout(sync, delay); });
})();


/* PATCH v574-final — indicadores mensais visiveis no desktop */
(function desktopMonthlyIndicatorsV574Final(){
  function isDesktop(){
    return !window.matchMedia || window.matchMedia('(min-width: 769px)').matches;
  }
  function sync(){
    if(!isDesktop()) return;
    document.documentElement.classList.add(
      'desktop-hide-closed-month-launch-v571',
	      
	      'desktop-dolar-no-collapse-v573',
	      'desktop-monthly-indicators-v574',
	      
	      'desktop-monthly-us-markets-v576',
	      'desktop-monthly-comparison-chart-v580',
	      'desktop-monthly-chart-start-zero-v581','desktop-header-kpis-focus-clean-v582','desktop-header-clean-inflacao-juros-v583','desktop-header-kpis-minimal-v584','desktop-side-nav-v585','desktop-side-nav-no-overlap-v586','desktop-side-nav-market-fix-v588'
	    );

    var monthly = document.getElementById('monthlyIndicatorsV445');
    if(monthly){
      monthly.dataset.desktopV574 = '1';
      monthly.style.setProperty('display','block','important');
    }

	    var cdiMonths = document.getElementById('cdiMonthCarouselV322');
	    if(cdiMonths){
	      cdiMonths.style.setProperty('display','none','important');
      cdiMonths.style.setProperty('visibility','hidden','important');
      cdiMonths.style.setProperty('height','0','important');
      cdiMonths.style.setProperty('min-height','0','important');
      cdiMonths.style.setProperty('margin','0','important');
      cdiMonths.style.setProperty('padding','0','important');
	      cdiMonths.style.setProperty('overflow','hidden','important');
	    }
	    var cdiHistory = document.getElementById('cdiYearHistory');
	    if(cdiHistory && !window.__ELTAUM_DESKTOP_RATES_TERMINAL_V740__){
	      cdiHistory.style.setProperty('display','none','important');
	      cdiHistory.style.setProperty('visibility','hidden','important');
	      cdiHistory.style.setProperty('height','0','important');
	      cdiHistory.style.setProperty('min-height','0','important');
	      cdiHistory.style.setProperty('max-height','0','important');
	      cdiHistory.style.setProperty('margin','0','important');
	      cdiHistory.style.setProperty('padding','0','important');
	      cdiHistory.style.setProperty('border','0','important');
	      cdiHistory.style.setProperty('overflow','hidden','important');
	    }

    try{
      if(window.__ELTAUM_MOBILE_MONTHLY_INDICATORS_V445__?.render){
        window.__ELTAUM_MOBILE_MONTHLY_INDICATORS_V445__.render();
      }
    }catch(_){}

	    var meta = document.querySelector('meta[name="app-build"]');
	    if(meta) meta.content = 'ELTAUM_RANKING_CAPTACAO_FECHADA_V646';
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', sync, {once:true});
  else sync();
  window.addEventListener('load', sync, {once:true});
  document.addEventListener('elton:market-data-refresh', sync);
  [120, 500, 1300, 3200, 7000, 14000, 23000, 36000].forEach(function(delay){ setTimeout(sync, delay); });
})();


/* PATCH v573-final — dolar sempre aberto e sem botao Recolher no desktop */
(function desktopDolarNoCollapseV573Final(){
  function isDesktop(){
    return !window.matchMedia || window.matchMedia('(min-width: 769px)').matches;
  }
  function sync(){
    if(!isDesktop()) return;
	    document.documentElement.classList.add('desktop-dolar-no-collapse-v573','desktop-monthly-indicators-v574','desktop-monthly-us-markets-v576','desktop-monthly-comparison-chart-v580','desktop-monthly-chart-start-zero-v581','desktop-header-kpis-focus-clean-v582','desktop-header-clean-inflacao-juros-v583','desktop-header-kpis-minimal-v584','desktop-side-nav-v585','desktop-side-nav-no-overlap-v586','desktop-side-nav-market-fix-v588');
	    var meta = document.querySelector('meta[name="app-build"]');
	    if(meta) meta.content = 'ELTAUM_RANKING_CAPTACAO_FECHADA_V646';

    var body = document.getElementById('dolarTimelineBody');
    if(body){
      body.classList.add('open');
      body.removeAttribute('hidden');
      body.style.setProperty('display','block','important');
      body.style.setProperty('max-height','none','important');
      body.style.setProperty('height','auto','important');
      body.style.setProperty('overflow','visible','important');
    }

    var toggle = document.getElementById('dolarTimelineToggle');
    if(toggle){
      toggle.setAttribute('aria-hidden','true');
      toggle.setAttribute('tabindex','-1');
      toggle.setAttribute('aria-expanded','true');
      toggle.style.setProperty('display','none','important');
      toggle.style.setProperty('visibility','hidden','important');
      toggle.style.setProperty('width','0','important');
      toggle.style.setProperty('height','0','important');
      toggle.style.setProperty('min-width','0','important');
      toggle.style.setProperty('min-height','0','important');
      toggle.style.setProperty('margin','0','important');
      toggle.style.setProperty('padding','0','important');
      toggle.style.setProperty('border','0','important');
      toggle.style.setProperty('overflow','hidden','important');
      toggle.style.setProperty('pointer-events','none','important');
    }
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', sync, {once:true});
  else sync();
  window.addEventListener('load', sync, {once:true});
  [120, 500, 1300, 3200, 7000, 14000, 23000, 36000].forEach(function(delay){ setTimeout(sync, delay); });
})();


/* PATCH v588 — menu lateral: impede Mercado/Poupanca/Dolar de invadir a navegacao */
(function desktopSideNavMarketFixV588(){
  var BUILD = 'ELTAUM_DESKTOP_SIDE_NAV_MARKET_FIX_V588';
  var PATCH_CLASS = 'desktop-side-nav-market-fix-v588';
  var WIDE_QUERY = '(min-width: 1180px)';
  var AFFECTED_INNER = [
    '#sec-mercado > .section-title',
    '#sec-mercado #monthlyIndicatorsV445',
    '#sec-mercado .indic-ref-bar',
    '#sec-mercado .market-reference-v167',
    '#sec-mercado .rates-reference-v167',
    '#sec-mercado .rates-executive-v255',
    '#sec-mercado .savings-reference-v167',
    '#sec-dolar > .section-title',
    '#sec-dolar .dolar-compact-card',
    '#sec-dolar #dolarChartPanel',
    '#sec-dolar #ptaxStatsCard',
    '#sec-dolar .dolar-compact-footer',
    '#sec-focus > .section-title',
    '#sec-graficos > .section-title',
    '#siteSources > .section-title'
  ].join(',');

  function isWide(){
    return !window.matchMedia || window.matchMedia(WIDE_QUERY).matches;
  }

  function set(el, prop, value){
    if(el) el.style.setProperty(prop, value, 'important');
  }

  function clear(el, prop){
    if(el) el.style.removeProperty(prop);
  }

  function getOffset(page, nav){
    if(!page || !nav) return 0;
    var pageLeft = page.getBoundingClientRect().left || 0;
    var navRight = nav.getBoundingClientRect().right || 0;
    var gap = window.innerWidth <= 1360 ? 12 : 14;
    return Math.max(0, Math.ceil(navRight - pageLeft + gap));
  }

  function apply(){
    var page = document.getElementById('topo');
    var nav = document.getElementById('desktopAnchorNavV131');
    if(!page || !nav) return;

    if(!isWide()){
      Array.prototype.forEach.call(page.children, function(child){
        if(child && child.dataset && child.dataset.sideNavFixV588 === '1'){
          ['margin-left','width','max-width','min-width','box-sizing'].forEach(function(prop){ clear(child, prop); });
          delete child.dataset.sideNavFixV588;
        }
      });
      return;
    }

    document.documentElement.classList.add(
      'desktop-side-nav-v585',
      'desktop-side-nav-no-overlap-v586',
      'desktop-hide-funds-heading-v587',
      PATCH_CLASS
    );

    var meta = document.querySelector('meta[name="app-build"]');
    if(meta) meta.content = BUILD;

    var offset = getOffset(page, nav);
    var contentWidth = 'calc(100% - ' + offset + 'px)';

    set(page, 'max-width', 'none');
    set(page, 'width', '100%');
    set(page, 'margin', '0');
    set(page, 'padding', '18px 22px 88px 18px');
    set(page, 'overflow-x', 'hidden');

    Array.prototype.forEach.call(page.children, function(child){
      if(!child || child === nav) return;
      child.dataset.sideNavFixV588 = '1';
      set(child, 'margin-left', offset + 'px');
      set(child, 'width', contentWidth);
      set(child, 'max-width', contentWidth);
      set(child, 'min-width', '0');
      set(child, 'box-sizing', 'border-box');
    });

    document.querySelectorAll(AFFECTED_INNER).forEach(function(el){
      set(el, 'width', '100%');
      set(el, 'max-width', '100%');
      set(el, 'min-width', '0');
      set(el, 'margin-left', '0');
      set(el, 'margin-right', '0');
      set(el, 'left', 'auto');
      set(el, 'right', 'auto');
      set(el, 'transform', 'none');
      set(el, 'box-sizing', 'border-box');
    });
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply, {once:true});
  else apply();

  window.addEventListener('load', apply, {once:true});
  window.addEventListener('resize', apply);
  document.addEventListener('elton:market-data-refresh', apply);
  document.addEventListener('elton:market-period-change', apply);
  /* V745: sem timers tardios. O layout já é aplicado no boot,
     load, resize e eventos reais de mercado. */
  requestAnimationFrame(apply);
})();


/* PATCH v589 — trava final do #sec-mercado contra resets tardios */
(function desktopSideNavMarketLockV589(){
  var BUILD = 'ELTAUM_DESKTOP_SIDE_NAV_MARKET_LOCK_V589';
  var PATCH_CLASS = 'desktop-side-nav-market-lock-v589';
  var WIDE_QUERY = '(min-width: 1180px)';
  var applying = false;
  var raf = 0;
  var intervalId = 0;

  function isWide(){
    return !window.matchMedia || window.matchMedia(WIDE_QUERY).matches;
  }

  function set(el, prop, value){
    if(el) el.style.setProperty(prop, value, 'important');
  }

  function getOffset(page, nav){
    if(!page || !nav) return window.innerWidth <= 1360 ? 184 : 208;
    var pageLeft = page.getBoundingClientRect().left || 0;
    var navRight = nav.getBoundingClientRect().right || 0;
    var gap = window.innerWidth <= 1360 ? 12 : 14;
    return Math.max(window.innerWidth <= 1360 ? 184 : 208, Math.ceil(navRight - pageLeft + gap));
  }

  function apply(){
    if(applying) return;
    var page = document.getElementById('topo');
    var nav = document.getElementById('desktopAnchorNavV131');
    var mercado = document.getElementById('sec-mercado');
    if(!page || !nav || !mercado || !isWide()) return;

    applying = true;
    try{
      document.documentElement.classList.add(
        'desktop-side-nav-v585',
        'desktop-side-nav-no-overlap-v586',
        'desktop-hide-funds-heading-v587',
        'desktop-side-nav-market-fix-v588',
        PATCH_CLASS
      );

      var meta = document.querySelector('meta[name="app-build"]');
      if(meta) meta.content = BUILD;

      var offset = getOffset(page, nav);
      var width = 'calc(100% - ' + offset + 'px)';

      set(mercado, 'margin-left', offset + 'px');
      set(mercado, 'margin-right', '0');
      set(mercado, 'width', width);
      set(mercado, 'max-width', width);
      set(mercado, 'min-width', '0');
      set(mercado, 'padding-left', '0');
      set(mercado, 'padding-right', '0');
      set(mercado, 'left', 'auto');
      set(mercado, 'right', 'auto');
      set(mercado, 'transform', 'none');
      set(mercado, 'translate', 'none');
      set(mercado, 'position', 'relative');
      set(mercado, 'box-sizing', 'border-box');
      set(mercado, 'z-index', '1');

      mercado.querySelectorAll(':scope > *').forEach(function(child){
        set(child, 'max-width', '100%');
        set(child, 'min-width', '0');
        set(child, 'box-sizing', 'border-box');
      });
    }finally{
      applying = false;
    }
  }

  function schedule(){
    if(raf) return;
    raf = requestAnimationFrame(function(){
      raf = 0;
      apply();
    });
  }

  function installObserver(){
    var mercado = document.getElementById('sec-mercado');
    if(!mercado || mercado.dataset.sideNavLockV589 === '1') return;
    mercado.dataset.sideNavLockV589 = '1';
    var observer = new MutationObserver(function(records){
      if(applying) return;
      if(records.some(function(record){ return record.attributeName === 'style' || record.attributeName === 'class'; })){
        schedule();
      }
    });
    observer.observe(mercado, {attributes:true, attributeFilter:['style','class']});
  }

  function boot(){
    apply();
    installObserver();
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, {once:true});
  else boot();

  window.addEventListener('load', boot, {once:true});
  window.addEventListener('resize', schedule);
  document.addEventListener('elton:market-data-refresh', schedule);
  document.addEventListener('elton:market-period-change', schedule);
  /* V745: elimina reaplicações periódicas de geometria.
     O lock continua reagindo a resize e eventos reais, sem ficar
     reescrevendo estilo a cada 1,5s durante 3 minutos. */
  requestAnimationFrame(boot);
})();


/* PATCH v590 — ativa layout vertical do ranking por categoria no desktop */
(function desktopRankingColumnsV590(){
  var BUILD = 'ELTAUM_DESKTOP_RANKING_COLUMNS_V590';
  var PATCH_CLASS = 'desktop-ranking-columns-v590';
  function isDesktop(){
    return !window.matchMedia || window.matchMedia('(min-width: 769px)').matches;
  }
  function apply(){
    if(!isDesktop()) return;
    document.documentElement.classList.add(PATCH_CLASS);
    var meta = document.querySelector('meta[name="app-build"]');
    if(meta) meta.content = BUILD;
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply, {once:true});
  else apply();
  window.addEventListener('load', apply, {once:true});
  [80, 250, 700, 1600, 3200, 7000, 14000, 30000].forEach(function(delay){
    setTimeout(apply, delay);
  });
})();


/* PATCH v692 — compatibilidade de carregamento inicial de Fundos
   Consolida os antigos v591/v592 e remove reaplicações tardias por timers. */
(function desktopFundsLoadStableV692(){
  'use strict';
  const BUILD='ELTAUM_DESKTOP_FUNDS_LOAD_STABLE_V692';
  const root=document.documentElement;

  function isDesktop(){
    return !window.matchMedia || window.matchMedia('(min-width: 769px)').matches;
  }

  function sync(){
    if(!isDesktop()) return;
    root.classList.add('desktop-funds-load-stable-v692');
    root.classList.remove('desktop-initial-load-stable-v591','desktop-funds-load-lock-v592');

    const table=document.getElementById('mainTable');
    const body=document.getElementById('tableBody');
    if(table && body && body.children.length && table.style.display!=='none'){
      root.classList.add('catalog-table-ready-v591');
    }

    const meta=document.querySelector('meta[name="app-build"]');
    if(meta) meta.content=BUILD;
  }

  function releaseInitialReserve(ev){
    if(!isDesktop()) return;
    const target=ev && ev.target && ev.target.closest ? ev.target : null;
    if(!target) return;
    if(target.closest('#fundFilterShell,#pageBtns')){
      root.classList.add('catalog-user-interacted-v692');
    }
  }

  /* Captura antes dos handlers dos filtros/paginação, para liberar a reserva
     no mesmo gesto que poderá alterar a quantidade/altura das linhas. */
  document.addEventListener('pointerdown',releaseInitialReserve,true);
  document.addEventListener('keydown',releaseInitialReserve,true);

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',sync,{once:true});
  }else{
    sync();
  }
  window.addEventListener('load',sync,{once:true});
  window.addEventListener('pageshow',sync,{passive:true});
})();

/* PATCH v593 — permite alternar USD/BRL pelo cabecalho das colunas EUA */
(function desktopMonthlyUsHeaderCurrencyV593(){
  var BUILD = 'ELTAUM_DESKTOP_MONTHLY_US_HEADER_CURRENCY_V593';
  var PATCH_CLASS = 'desktop-monthly-us-header-currency-v593';
  function isDesktop(){
    return !window.matchMedia || window.matchMedia('(min-width: 769px)').matches;
  }
  function apply(){
    if(!isDesktop()) return;
    document.documentElement.classList.add(PATCH_CLASS);
    var meta = document.querySelector('meta[name="app-build"]');
    if(meta) meta.content = BUILD;
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply, {once:true});
  else apply();
  window.addEventListener('load', apply, {once:true});
  [60, 180, 420, 900, 1600, 3200, 7000, 14000, 30000].forEach(function(delay){
    setTimeout(apply, delay);
  });
})();


/* PATCH v594 — nomes curtos no catalogo desktop */
(function desktopShortFundNamesV594(){
  var BUILD = 'ELTAUM_DESKTOP_SHORT_FUND_NAMES_V594';
  var PATCH_CLASS = 'desktop-short-fund-names-v594';
  function isDesktop(){
    return !window.matchMedia || window.matchMedia('(min-width: 769px)').matches;
  }
  function apply(){
    if(!isDesktop()) return;
    document.documentElement.classList.add(PATCH_CLASS);
    var meta = document.querySelector('meta[name="app-build"]');
    if(meta) meta.content = BUILD;
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply, {once:true});
  else apply();
  window.addEventListener('load', apply, {once:true});
  [60, 180, 420, 900, 1600, 3200, 7000, 14000, 30000].forEach(function(delay){
    setTimeout(apply, delay);
  });
})();


/* PATCH v595 — Boletim Focus com leitura de tendencia */
(function desktopFocusTrendsV595(){
  var BUILD = 'ELTAUM_DESKTOP_FOCUS_TRENDS_V595';
  var PATCH_CLASS = 'desktop-focus-trends-v595';
  function isDesktop(){
    return !window.matchMedia || window.matchMedia('(min-width: 769px)').matches;
  }
  function apply(){
    if(!isDesktop()) return;
    document.documentElement.classList.add(PATCH_CLASS);
    var meta = document.querySelector('meta[name="app-build"]');
    if(meta) meta.content = BUILD;
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply, {once:true});
  else apply();
  window.addEventListener('load', apply, {once:true});
  [60, 180, 420, 900, 1600, 3200, 7000, 14000, 30000].forEach(function(delay){
    setTimeout(apply, delay);
  });
})();


/* PATCH v596 — Selic com YTD, periodo customizado e tooltip */
(function desktopSelicYtdCustomTooltipV596(){
  var BUILD = 'ELTAUM_DESKTOP_SELIC_YTD_CUSTOM_TOOLTIP_V596';
  var PATCH_CLASS = 'desktop-selic-ytd-custom-tooltip-v596';
  function isDesktop(){
    return !window.matchMedia || window.matchMedia('(min-width: 769px)').matches;
  }
  function apply(){
    if(!isDesktop()) return;
    document.documentElement.classList.add(PATCH_CLASS);
    var meta = document.querySelector('meta[name="app-build"]');
    if(meta) meta.content = BUILD;
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply, {once:true});
  else apply();
  window.addEventListener('load', apply, {once:true});
  [60, 180, 420, 900, 1600, 3200, 7000, 14000, 30000].forEach(function(delay){
    setTimeout(apply, delay);
  });
})();


/* PATCH v597 — Header desktop com KPIs alinhados a direita */
(function desktopHeaderKpisRightV597(){
  var BUILD = 'ELTAUM_DESKTOP_HEADER_KPIS_RIGHT_V597';
  var PATCH_CLASS = 'desktop-header-kpis-right-v597';
  function isDesktop(){
    return !window.matchMedia || window.matchMedia('(min-width: 769px)').matches;
  }
  function apply(){
    if(!isDesktop()) return;
    document.documentElement.classList.add(PATCH_CLASS);
    var meta = document.querySelector('meta[name="app-build"]');
    if(meta) meta.content = BUILD;
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply, {once:true});
  else apply();
  window.addEventListener('load', apply, {once:true});
  [60, 180, 420, 900, 1600, 3200, 7000, 14000, 30000].forEach(function(delay){
    setTimeout(apply, delay);
  });
})();


/* PATCH v598 — Header desktop compacto */
(function desktopHeaderKpisCompactV598(){
  var BUILD = 'ELTAUM_DESKTOP_HEADER_KPIS_COMPACT_V598';
  var PATCH_CLASS = 'desktop-header-kpis-compact-v598';
  function isDesktop(){
    return !window.matchMedia || window.matchMedia('(min-width: 769px)').matches;
  }
  function apply(){
    if(!isDesktop()) return;
    document.documentElement.classList.add(PATCH_CLASS);
    var meta = document.querySelector('meta[name="app-build"]');
    if(meta) meta.content = BUILD;
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply, {once:true});
  else apply();
  window.addEventListener('load', apply, {once:true});
  [60, 180, 420, 900, 1600, 3200, 7000, 14000, 30000].forEach(function(delay){
    setTimeout(apply, delay);
  });
})();


/* PATCH v599 — Menu lateral com rotulos semanticos */
(function desktopSideNavLabelsV599(){
  var BUILD = 'ELTAUM_DESKTOP_SIDE_NAV_LABELS_V599';
  var PATCH_CLASS = 'desktop-side-nav-labels-v599';
  var LABELS = {
    'sec-mercado':'Indicadores',
    'sec-dolar':'Dólar PTAX',
    'sec-focus':'Boletim Focus'
  };
  function isDesktop(){
    return !window.matchMedia || window.matchMedia('(min-width: 769px)').matches;
  }
  function syncLabels(){
    if(!isDesktop()) return;
    document.documentElement.classList.add(PATCH_CLASS);
    Object.keys(LABELS).forEach(function(target){
      var strong = document.querySelector('#desktopAnchorNavV131 [data-anchor-target="' + target + '"] strong');
      if(strong) strong.textContent = LABELS[target];
    });
    var meta = document.querySelector('meta[name="app-build"]');
    if(meta) meta.content = BUILD;
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', syncLabels, {once:true});
  else syncLabels();
  window.addEventListener('load', syncLabels, {once:true});
  [60, 180, 420, 900, 1600, 3200, 7000, 14000, 30000].forEach(function(delay){
    setTimeout(syncLabels, delay);
  });
})();


/* PATCH v600 — Header KPIs sem corte */
(function desktopHeaderKpisNoCutV600(){
  var BUILD = 'ELTAUM_DESKTOP_HEADER_KPIS_NO_CUT_V600';
  var PATCH_CLASS = 'desktop-header-kpis-no-cut-v600';
  function isDesktop(){
    return !window.matchMedia || window.matchMedia('(min-width: 769px)').matches;
  }
  function apply(){
    if(!isDesktop()) return;
    document.documentElement.classList.add(PATCH_CLASS);
    var meta = document.querySelector('meta[name="app-build"]');
    if(meta) meta.content = BUILD;
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply, {once:true});
  else apply();
  window.addEventListener('load', apply, {once:true});
  [60, 180, 420, 900, 1600, 3200, 7000, 14000, 30000].forEach(function(delay){
    setTimeout(apply, delay);
  });
})();


/* PATCH v601 — Header executivo compacto */
(function desktopHeaderTightExecutiveV601(){
  var BUILD = 'ELTAUM_DESKTOP_HEADER_TIGHT_EXECUTIVE_V601';
  var PATCH_CLASS = 'desktop-header-tight-executive-v601';
  function isDesktop(){
    return !window.matchMedia || window.matchMedia('(min-width: 769px)').matches;
  }
  function apply(){
    if(!isDesktop()) return;
    document.documentElement.classList.add(PATCH_CLASS);
    var meta = document.querySelector('meta[name="app-build"]');
    if(meta) meta.content = BUILD;
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply, {once:true});
  else apply();
  window.addEventListener('load', apply, {once:true});
  [60, 180, 420, 900, 1600, 3200, 7000, 14000, 30000].forEach(function(delay){
    setTimeout(apply, delay);
  });
})();


/* PATCH v602 — Ajuste fino vertical dos KPIs do header */
(function desktopHeaderKpiVerticalFineV602(){
  var BUILD = 'ELTAUM_DESKTOP_HEADER_KPI_VERTICAL_FINE_V602';
  var PATCH_CLASS = 'desktop-header-kpi-vertical-fine-v602';
  function isDesktop(){
    return !window.matchMedia || window.matchMedia('(min-width: 769px)').matches;
  }
  function apply(){
    if(!isDesktop()) return;
    document.documentElement.classList.add(PATCH_CLASS);
    var meta = document.querySelector('meta[name="app-build"]');
    if(meta) meta.content = BUILD;
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply, {once:true});
  else apply();
  window.addEventListener('load', apply, {once:true});
  [60, 180, 420, 900, 1600, 3200, 7000, 14000, 30000].forEach(function(delay){
    setTimeout(apply, delay);
  });
})();


/* PATCH v603 — KPIs do header em linha unica */
(function desktopHeaderKpiSingleRowV603(){
  var BUILD = 'ELTAUM_DESKTOP_HEADER_KPI_SINGLE_ROW_V603';
  var PATCH_CLASS = 'desktop-header-kpi-single-row-v603';
  function isDesktop(){
    return !window.matchMedia || window.matchMedia('(min-width: 769px)').matches;
  }
  function apply(){
    if(!isDesktop()) return;
    document.documentElement.classList.add(PATCH_CLASS);
    var meta = document.querySelector('meta[name="app-build"]');
    if(meta) meta.content = BUILD;
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply, {once:true});
  else apply();
  window.addEventListener('load', apply, {once:true});
  [60, 180, 420, 900, 1600, 3200, 7000, 14000, 30000].forEach(function(delay){
    setTimeout(apply, delay);
  });
})();


/* PATCH v605 — Estabiliza altura dos filtros no desktop */
(function desktopFilterHeightStableV605(){
  var BUILD = 'ELTAUM_DESKTOP_FILTER_HEIGHT_STABLE_V605';
  var PATCH_CLASS = 'desktop-filter-height-stable-v605';
  function isDesktop(){
    return !window.matchMedia || window.matchMedia('(min-width: 769px)').matches;
  }
  function apply(){
    if(!isDesktop()) return;
    document.documentElement.classList.add(PATCH_CLASS);
    var meta = document.querySelector('meta[name="app-build"]');
    if(meta) meta.content = BUILD;
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply, {once:true});
  else apply();
  window.addEventListener('load', apply, {once:true});
  [60, 180, 420, 900, 1600, 3200, 7000, 14000, 30000].forEach(function(delay){
    setTimeout(apply, delay);
  });
})();


/* PATCH v606 — Estabiliza a barra inferior dos filtros desktop */
(function desktopFilterToolbarStableV606(){
  var BUILD = 'ELTAUM_DESKTOP_FILTER_TOOLBAR_STABLE_V606';
  var PATCH_CLASS = 'desktop-filter-toolbar-stable-v606';
  function isDesktop(){
    return !window.matchMedia || window.matchMedia('(min-width: 769px)').matches;
  }
  function apply(){
    if(!isDesktop()) return;
    document.documentElement.classList.add(PATCH_CLASS);
    var meta = document.querySelector('meta[name="app-build"]');
    if(meta) meta.content = BUILD;
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply, {once:true});
  else apply();
  window.addEventListener('load', apply, {once:true});
  [40, 100, 220, 520, 1000, 1800, 3200, 7000, 14000, 30000].forEach(function(delay){
    setTimeout(apply, delay);
  });
})();


/* PATCH v607 — Mobile: ranking renderiza sem herdar o renderizador desktop */
(function mobileRankingRenderRestoreV607(){
  var BUILD = 'ELTAUM_MOBILE_RANKING_FILTER_FORCE_ROW_V616';
  var PATCH_CLASS = 'mobile-ranking-render-restore-v607';
  var PATCH_CLASS_V608 = 'mobile-filter-header-clean-v608';
  var PATCH_CLASS_V609 = 'mobile-filters-functional-v609';
  var PATCH_CLASS_V610 = 'mobile-filters-reset-v610';
  var PATCH_CLASS_V611 = 'mobile-filters-origin-clean-v611';
  var PATCH_CLASS_V612 = 'mobile-audience-chips-v612';
  var PATCH_CLASS_V614 = 'mobile-ranking-filter-list-v614';
  var PATCH_CLASS_V615 = 'mobile-ranking-filter-strip-v615';
  var PATCH_CLASS_V616 = 'mobile-ranking-filter-force-row-v616';
  function isMobile(){
    return window.matchMedia && window.matchMedia('(max-width: 768px)').matches;
  }
  function hasRows(){
    return typeof allRows !== 'undefined' && Array.isArray(allRows) && allRows.length > 0;
  }
  function restore(){
    if(!isMobile()) return;
    document.documentElement.classList.add(PATCH_CLASS, PATCH_CLASS_V608, PATCH_CLASS_V609, PATCH_CLASS_V610, PATCH_CLASS_V611, PATCH_CLASS_V612, PATCH_CLASS_V614, PATCH_CLASS_V615, PATCH_CLASS_V616);
    document.documentElement.classList.remove('mobile-v481','mobile-filter-select-safe-v481','mobile-v482','mobile-filter-list-v482');
    document.querySelectorAll('#sec-fundos .filter-value-v482').forEach(function(node){
      node.remove();
    });
    var meta = document.querySelector('meta[name="app-build"]');
    if(meta) meta.content = BUILD;
    if(typeof window.__renderRankingsMobileBaseV607 === 'function'){
      window.renderRankings = window.__renderRankingsMobileBaseV607;
      try{ renderRankings = window.__renderRankingsMobileBaseV607; }catch(e){}
    }
    if(hasRows() && typeof window.renderRankings === 'function'){
      try{ window.renderRankings(); }catch(e){ console.error('ranking mobile v607', e); }
    }
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', restore, {once:true});
  else restore();
  window.addEventListener('load', restore, {once:true});
  window.addEventListener('pageshow', restore, {passive:true});
  [60, 160, 360, 800, 1400, 2400, 4200, 7000, 12000, 22000].forEach(function(delay){
    setTimeout(restore, delay);
  });
})();


/* PATCH v609 — Mobile: filtros reais, sem botoes visuais inertes */
(function mobileFunctionalFiltersV609(){
  var BUILD = 'ELTAUM_MOBILE_RANKING_FILTER_FORCE_ROW_V616';
  var PATCH_CLASS = 'mobile-filters-functional-v609';
  var PATCH_CLASS_V610 = 'mobile-filters-reset-v610';
  var PATCH_CLASS_V611 = 'mobile-filters-origin-clean-v611';
  var PATCH_CLASS_V612 = 'mobile-audience-chips-v612';
  var PATCH_CLASS_V614 = 'mobile-ranking-filter-list-v614';
  var PATCH_CLASS_V615 = 'mobile-ranking-filter-strip-v615';
  var PATCH_CLASS_V616 = 'mobile-ranking-filter-force-row-v616';
  var AUDIENCE_OPTIONS = [
    ['', 'Todos'],
    ['PF', 'Pessoa Física'],
    ['PJ', 'Pessoa Jurídica'],
    ['Private', 'Private'],
    ['Qualificado', 'Qualificado'],
    ['Institucional', 'Institucional']
  ];
  var CATEGORY_LABELS = {
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

  function isMobile(){
    return window.matchMedia && window.matchMedia('(max-width: 768px)').matches;
  }
  function q(sel, root){
    return (root || document).querySelector(sel);
  }
  function qa(sel, root){
    return Array.from((root || document).querySelectorAll(sel));
  }
  function canon(v){
    return String(v || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g,'')
      .replace(/[^A-Z0-9]+/gi,' ')
      .replace(/\s+/g,' ')
      .trim()
      .toUpperCase();
  }
  function activeCategoryCanon(){
    try{ return canon(activeCat || ''); }catch(e){ return ''; }
  }
  function findRawCategory(canonTarget){
    if(!canonTarget) return '';
    try{
      if(Array.isArray(allRows)){
        var found = allRows.find(function(row){
          return canon(row && row.Categoria) === canonTarget || canon(row && row['Categoria']) === canonTarget;
        });
        if(found) return String(found.Categoria || found['Categoria'] || '').trim();
      }
    }catch(e){}
    return canonTarget;
  }
  function sortMode(){
    try{
      return localStorage.getItem('mobileSortModeV81') || localStorage.getItem('mobileSortModeV75') || 'base';
    }catch(e){
      return 'base';
    }
  }
  function setSortMode(mode){
    var value = mode || 'base';
    try{
      localStorage.setItem('mobileSortModeV81', value);
      localStorage.setItem('mobileSortModeV75', value);
    }catch(e){}
    try{ window.__mobileSortModeV81 = value; }catch(e){}
  }
  function optionHtml(pair){
    return '<option value="' + String(pair[0]).replace(/"/g,'&quot;') + '">' + pair[1] + '</option>';
  }
  function ensureAudienceSelect(){
    var shell = q('#mobileCategorySelectShellV74');
    if(!shell) return null;
    var existing = q('#mobileAudienceSelectV609', shell);
    if(existing){
      ensureAudienceChips(existing);
      return existing;
    }

    var row = document.createElement('div');
    row.className = 'mobile-audience-select-v609 mobile-audience-chips-v612 filter-list-row-v482';
    row.innerHTML =
      '<span class="filter-label-v482">Público-alvo</span>' +
      '<select aria-label="Selecionar público-alvo no celular" id="mobileAudienceSelectV609">' +
        AUDIENCE_OPTIONS.map(optionHtml).join('') +
      '</select>' +
      '<span aria-label="Selecionar público-alvo" class="mobile-audience-chip-row-v612" role="group">' +
        AUDIENCE_OPTIONS.map(function(pair, index){
          var label = pair[0] === '' ? 'Todos' : pair[0];
          return '<button aria-pressed="' + (index === 0 ? 'true' : 'false') + '" class="mobile-audience-chip-v612' + (index === 0 ? ' active' : '') + '" data-audience-v612="' + String(pair[0]).replace(/"/g,'&quot;') + '" type="button">' + label + '</button>';
        }).join('') +
      '</span>';

    var noData = q('#mobileNoDataRowV442', shell);
    var category = q('.mobile-category-select-wrap-v74', shell);
    if(noData && noData.nextSibling) shell.insertBefore(row, noData.nextSibling);
    else if(category) shell.insertBefore(row, category);
    else shell.insertBefore(row, shell.firstChild);
    return q('#mobileAudienceSelectV609', shell);
  }
  function ensureAudienceChips(select){
    if(!select) return;
    var host = select.closest('label') || select.parentElement;
    if(!host) return;
    host.classList.add('mobile-audience-chips-v612');
    if(q(':scope > .mobile-audience-chip-row-v612', host)) return;
    var row = document.createElement('span');
    row.className = 'mobile-audience-chip-row-v612';
    row.setAttribute('role','group');
    row.setAttribute('aria-label','Selecionar público-alvo');
    row.innerHTML = AUDIENCE_OPTIONS.map(function(pair, index){
      var label = pair[0] === '' ? 'Todos' : pair[0];
      return '<button aria-pressed="' + (index === 0 ? 'true' : 'false') + '" class="mobile-audience-chip-v612' + (index === 0 ? ' active' : '') + '" data-audience-v612="' + String(pair[0]).replace(/"/g,'&quot;') + '" type="button">' + label + '</button>';
    }).join('');
    host.appendChild(row);
  }
  function syncAudienceChips(value){
    qa('#sec-fundos .mobile-audience-chip-v612[data-audience-v612]').forEach(function(btn){
      var on = String(btn.dataset.audienceV612 || '') === String(value || '');
      btn.classList.toggle('active', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }
  function setSelectValue(id, value){
    var select = q('#' + id);
    if(select && select.value !== String(value || '')) select.value = String(value || '');
  }
  function selectLabel(select){
    var option = select && select.options ? select.options[select.selectedIndex] : null;
    return option ? option.textContent.trim() : '';
  }
  function syncVisualRows(){
    ['mobileAudienceSelectV609','mobileCategorySelectV74','mobileRiskSelectV198','mobileSortSelectV75'].forEach(function(id){
      var select = q('#' + id);
      if(!select) return;
      var host = select.closest('label') || select.parentElement;
      if(!host) return;
      var value = q(':scope > .filter-value-v482', host);
      if(value) value.textContent = selectLabel(select);
    });
  }
  function sync(){
    if(!isMobile()) return;
    document.documentElement.classList.add(PATCH_CLASS, PATCH_CLASS_V610, PATCH_CLASS_V611, PATCH_CLASS_V612, PATCH_CLASS_V614, PATCH_CLASS_V615, PATCH_CLASS_V616);
    document.documentElement.classList.remove('mobile-v481','mobile-filter-select-safe-v481','mobile-v482','mobile-filter-list-v482');
    document.querySelectorAll('#sec-fundos .filter-value-v482').forEach(function(node){
      node.remove();
    });
    var meta = q('meta[name="app-build"]');
    if(meta) meta.content = BUILD;
    ensureAudienceSelect();
    var audience = '';
    var risk = '';
    var hidden = false;
    try{ audience = String(activePerfil || ''); }catch(e){}
    try{ risk = String(activeRisco || ''); }catch(e){}
    try{ hidden = !!hideSemDados; }catch(e){}
    setSelectValue('mobileAudienceSelectV609', audience);
    syncAudienceChips(audience);
    setSelectValue('mobileCategorySelectV74', activeCategoryCanon());
    setSelectValue('mobileRiskSelectV198', risk);
    setSelectValue('mobileSortSelectV75', sortMode());
    var noData = q('#toggleSemDados');
    if(noData) noData.checked = hidden;
    var status = q('#mobileCategorySelectStatusV74');
    if(status){
      var cat = activeCategoryCanon();
      status.textContent = cat ? (CATEGORY_LABELS[cat] || cat) : 'Todos';
    }
    syncVisualRows();
    qa('#sec-fundos .desktop-audience-chip-v488[data-audience-v488]').forEach(function(btn){
      var val = String(btn.dataset.audienceV488 || '');
      var on = val === audience;
      btn.classList.toggle('active', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }
  function applyFromMobile(){
    if(!isMobile()) return;
    var cat = q('#mobileCategorySelectV74')?.value || '';
    var audience = q('#mobileAudienceSelectV609')?.value || '';
    var risk = q('#mobileRiskSelectV198')?.value || '';
    var mode = q('#mobileSortSelectV75')?.value || 'base';
    var noData = !!q('#toggleSemDados')?.checked;
    try{
      activeCat = cat ? findRawCategory(cat) : '';
      activePerfil = audience;
      activeRisco = risk;
      activeBenchmark = '';
      hideSemDados = noData;
      currentPage = 1;
      activeCdiSort = null;
      sortCol = -1;
      sortDir = -1;
      window.__favListMode = false;
      window.__ELTAUM_ACTIVE_SHORTCUT_PRESET__ = 'mobile-functional-v609';
      if(expandedRows && typeof expandedRows.clear === 'function') expandedRows.clear();
    }catch(e){}
    setSortMode(mode);
    try{ if(typeof syncFilterControls === 'function') syncFilterControls(); }catch(e){}
    try{ if(typeof updateCdiSortButtons === 'function') updateCdiSortButtons(); }catch(e){}
    try{ if(typeof updateMobileSortButtons === 'function') updateMobileSortButtons(); }catch(e){}
    try{ if(typeof applyFilter === 'function') applyFilter(); }catch(e){ console.error('mobile filters v609', e); }
    try{ if(typeof renderMobileFundCards === 'function') renderMobileFundCards(); }catch(e){}
    sync();
  }
  function isManagedTarget(target){
    return !!(target && target.closest && target.closest(
      '#mobileAudienceSelectV609,#mobileCategorySelectV74,#mobileRiskSelectV198,#mobileSortSelectV75,#toggleSemDados'
    ));
  }
  function bind(){
    sync();
    if(document.documentElement.dataset.mobileFiltersV609Bound === '1') return;
    document.documentElement.dataset.mobileFiltersV609Bound = '1';
    document.addEventListener('change', function(ev){
      if(!isMobile() || !isManagedTarget(ev.target)) return;
      ev.stopPropagation();
      if(typeof ev.stopImmediatePropagation === 'function') ev.stopImmediatePropagation();
      setTimeout(applyFromMobile, 0);
    }, true);
    document.addEventListener('click', function(ev){
      if(!isMobile()) return;
      var audienceChip = ev.target && ev.target.closest ? ev.target.closest('#sec-fundos .mobile-audience-chip-v612[data-audience-v612]') : null;
      if(audienceChip){
        ev.preventDefault();
        ev.stopPropagation();
        if(typeof ev.stopImmediatePropagation === 'function') ev.stopImmediatePropagation();
        var managedSelect = ensureAudienceSelect();
        if(managedSelect){
          managedSelect.value = String(audienceChip.dataset.audienceV612 || '');
          applyFromMobile();
        }
        return;
      }
      var oldAudience = ev.target && ev.target.closest ? ev.target.closest('#sec-fundos .desktop-audience-chip-v488[data-audience-v488]') : null;
      if(!oldAudience) return;
      ev.preventDefault();
      ev.stopPropagation();
      if(typeof ev.stopImmediatePropagation === 'function') ev.stopImmediatePropagation();
      var select = ensureAudienceSelect();
      if(select){
        select.value = String(oldAudience.dataset.audienceV488 || '');
        applyFromMobile();
      }
    }, true);
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bind, {once:true});
  else bind();
  window.addEventListener('load', bind, {once:true});
  window.addEventListener('pageshow', sync, {passive:true});
  window.addEventListener('resize', sync, {passive:true});
  [80, 220, 520, 1100, 2200, 4200, 8000, 14000].forEach(function(delay){
    setTimeout(bind, delay);
  });
  window.__ELTAUM_MOBILE_FILTERS_FUNCTIONAL_V609__ = {
    sync: sync,
    apply: applyFromMobile
  };
})();

/* PATCH v617 — Mobile ranking: toolbar independente sincronizada com selects originais */
(function rankingMobileToolbarV617(){
  var IDS = {
    periodOriginal: 'rankingPeriodSelectV136',
    classOriginal: 'rankingClassSelectV136',
    riskOriginal: 'rankingRiskSelectV198',
    periodMobile: 'rankingMobilePeriodV617',
    classMobile: 'rankingMobileClassV617',
    riskMobile: 'rankingMobileRiskV617'
  };

  function qs(id){ return document.getElementById(id); }
  function isMobile(){ return !window.matchMedia || window.matchMedia('(max-width: 768px)').matches; }

  function labelForSelect(sourceId, option){
    var value = String(option && option.value || '');
    var text = String(option && option.textContent || '').replace(/\s+/g,' ').trim();

    if(sourceId === IDS.periodOriginal){
      if(value === '12m') return '12M';
      if(value === 'ano') return 'Ano';
      if(value === 'mes') return 'Mês';
    }

    if(sourceId === IDS.classOriginal){
      if(value === 'todos') return 'Todos';
      if(value === 'sem-fmp') return 'Sem FMP';
      if(value === 'renda-fixa-simples') return 'RF Simples';
      if(value === 'renda-fixa-referenciado') return 'RF Ref.';
      if(value === 'renda-fixa-curto-prazo') return 'RF Curto';
      if(value === 'fundo-de-indice') return 'Índice';
    }

    if(sourceId === IDS.riskOriginal){
      if(value === '') return 'Todos';
      if(text.toLowerCase() === 'todos perfis' || text.toLowerCase() === 'todos os perfis') return 'Todos';
    }

    return text || value || '—';
  }

  function copyOptions(source, target){
    if(!source || !target) return;
    var selected = target.value || source.value;
    target.innerHTML = '';
    Array.prototype.forEach.call(source.options || [], function(option){
      var clone = document.createElement('option');
      clone.value = option.value;
      clone.textContent = labelForSelect(source.id, option);
      if(option.disabled) clone.disabled = true;
      if(option.title) clone.title = option.title;
      target.appendChild(clone);
    });
    target.value = source.value || selected;
  }

  function createControl(labelText, id, extraClass){
    var wrap = document.createElement('div');
    wrap.className = 'ranking-mobile-control-v617' + (extraClass ? ' ' + extraClass : '');

    var label = document.createElement('label');
    label.className = 'ranking-mobile-label-v617';
    label.setAttribute('for', id);
    label.textContent = labelText;

    var select = document.createElement('select');
    select.className = 'ranking-mobile-select-v617';
    select.id = id;
    select.setAttribute('aria-label', labelText);

    wrap.appendChild(label);
    wrap.appendChild(select);
    return wrap;
  }

  function ensureToolbar(){
    var section = qs('rankingsSection');
    var oldToolbar = section ? section.querySelector('.ranking-toolbar-v136') : null;
    if(!section || !oldToolbar) return null;

    var toolbar = section.querySelector('.ranking-mobile-toolbar-v617');
    if(!toolbar){
      toolbar = document.createElement('div');
      toolbar.className = 'ranking-mobile-toolbar-v617';
      toolbar.setAttribute('role','group');
      toolbar.setAttribute('aria-label','Filtros dos rankings no mobile');
      toolbar.appendChild(createControl('Período', IDS.periodMobile, 'ranking-mobile-control-period-v617'));
      toolbar.appendChild(createControl('Universo', IDS.classMobile, 'ranking-mobile-control-class-v617'));
      toolbar.appendChild(createControl('Risco', IDS.riskMobile, 'ranking-mobile-control-risk-v617'));
      oldToolbar.parentNode.insertBefore(toolbar, oldToolbar);
    }
    return toolbar;
  }

  function syncOriginalToMobile(){
    var toolbar = ensureToolbar();
    if(!toolbar) return;

    copyOptions(qs(IDS.periodOriginal), qs(IDS.periodMobile));
    copyOptions(qs(IDS.classOriginal), qs(IDS.classMobile));
    copyOptions(qs(IDS.riskOriginal), qs(IDS.riskMobile));
  }

  function setOriginalValue(originalId, value){
    var original = qs(originalId);
    if(!original || original.value === value) return;
    original.value = value;
    try{ original.dispatchEvent(new Event('input', {bubbles:true})); }catch(_){ }
    try{ original.dispatchEvent(new Event('change', {bubbles:true})); }catch(_){ }
  }

  function bind(){
    var map = [
      [IDS.periodMobile, IDS.periodOriginal],
      [IDS.classMobile, IDS.classOriginal],
      [IDS.riskMobile, IDS.riskOriginal]
    ];

    map.forEach(function(pair){
      var mobile = qs(pair[0]);
      var original = qs(pair[1]);
      if(mobile && !mobile.__rankingMobileV617Bound){
        mobile.__rankingMobileV617Bound = true;
        mobile.addEventListener('change', function(){ setOriginalValue(pair[1], mobile.value); });
      }
      if(original && !original.__rankingMobileV617Bound){
        original.__rankingMobileV617Bound = true;
        original.addEventListener('change', syncOriginalToMobile);
      }
    });
  }

  function apply(){
    document.documentElement.classList.add('mobile-ranking-independent-v617','mobile-ranking-summary-two-cards-v626','mobile-ranking-summary-stacked-v627','mobile-ranking-summary-clean-v628','mobile-ranking-gap-fix-v629','mobile-ranking-market-gap-v631','mobile-monthly-us-indicators-v632','mobile-monthly-semantic-v633');
    syncOriginalToMobile();
    bind();
    var meta = document.querySelector('meta[name="app-build"]');
    if(meta && isMobile()) meta.content = 'ELTAUM_MOBILE_RANKING_SUMMARY_CLEAN_V628';
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply, {once:true});
  else apply();
  window.addEventListener('load', apply, {once:true});
  [80, 300, 900, 1800, 3200, 7000, 12000].forEach(function(delay){ setTimeout(apply, delay); });
})();


/* PATCH v631 — Mobile: garante ativação do ajuste de espaçamento Ranking → Mercado */
(function(){
  'use strict';
  var PATCH_CLASS = 'mobile-ranking-market-gap-v631';
  function apply(){
    try{
      document.documentElement.classList.add('mobile-ranking-gap-fix-v629', PATCH_CLASS, 'mobile-monthly-us-indicators-v632','mobile-monthly-semantic-v633');
      var meta = document.querySelector('meta[name="app-build"]');
      if(meta && window.matchMedia && window.matchMedia('(max-width: 768px)').matches){
        meta.content = 'ELTAUM_MOBILE_RANKING_MARKET_GAP_V631';
      }
    }catch(_){ }
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply, {once:true});
  else apply();
  window.addEventListener('load', apply, {once:true});
  [120, 400, 1000, 2200, 5000].forEach(function(delay){ setTimeout(apply, delay); });
})();


/* PATCH v632 — Mobile: indicadores mensais EUA + tabela selecionada sem rolagem lateral */
(function(){
  'use strict';
  var PATCH_CLASS = 'mobile-monthly-us-indicators-v632';
  function isMobile(){
    return !window.matchMedia || window.matchMedia('(max-width: 768px)').matches;
  }
  function apply(){
    try{
      if(!isMobile()) return;
      document.documentElement.classList.add(PATCH_CLASS);
      var root = document.getElementById('monthlyIndicatorsV445');
      if(root) root.dataset.mobileUsV632 = '1';
      if(window.__ELTAUM_MOBILE_MONTHLY_INDICATORS_V445__ && typeof window.__ELTAUM_MOBILE_MONTHLY_INDICATORS_V445__.render === 'function'){
        window.__ELTAUM_MOBILE_MONTHLY_INDICATORS_V445__.render();
      }
      var meta = document.querySelector('meta[name="app-build"]');
      if(meta) meta.content = 'ELTAUM_MOBILE_MONTHLY_US_INDICATORS_V632';
    }catch(_){ }
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply, {once:true});
  else apply();
  window.addEventListener('load', apply, {once:true});
  document.addEventListener('elton:market-data-refresh', apply);
  [150, 450, 1100, 2400, 5200].forEach(function(delay){ setTimeout(apply, delay); });
})();


/* PATCH v633 — Mobile: semântica + tabela mensal completa sem rolagem lateral */
(function(){
  'use strict';
  var PATCH_CLASS = 'mobile-monthly-semantic-v633';
  function isMobile(){
    return !window.matchMedia || window.matchMedia('(max-width: 768px)').matches;
  }
  function setText(selector, text){
    var el = document.querySelector(selector);
    if(el) el.textContent = text;
  }
  function apply(){
    try{
      if(!isMobile()) return;
      document.documentElement.classList.add('mobile-monthly-us-indicators-v632', PATCH_CLASS);
      var root = document.getElementById('monthlyIndicatorsV445');
      if(root){
        root.dataset.mobileSemanticV633 = '1';
        setText('#monthlyIndicatorsV445 [data-monthly-indicators-range-v445="year"]', 'Ano atual');
        setText('#monthlyIndicatorsV445 [data-monthly-indicators-range-v445="12m"]', '12 meses');
        setText('#monthlyIndicatorsV445 [data-monthly-indicators-view-v446="ibov"]', 'Ibovespa');
        var lead = root.querySelector('.monthly-indicators-head-v445 p');
        if(lead) lead.textContent = 'Brasil, dólar e bolsas dos EUA em visão mensal.';
      }
      var meta = document.querySelector('meta[name="app-build"]');
      if(meta) meta.content = 'ELTAUM_MOBILE_MONTHLY_SEMANTIC_FIT_V633';
      if(window.__ELTAUM_MOBILE_MONTHLY_INDICATORS_V445__ && typeof window.__ELTAUM_MOBILE_MONTHLY_INDICATORS_V445__.render === 'function'){
        window.__ELTAUM_MOBILE_MONTHLY_INDICATORS_V445__.render();
      }
    }catch(_){ }
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply, {once:true});
  else apply();
  window.addEventListener('load', apply, {once:true});
  document.addEventListener('elton:market-data-refresh', apply);
  [120, 420, 1000, 2400, 5200, 9000].forEach(function(delay){ setTimeout(apply, delay); });
})();


/* PATCH v634 — Mobile: acabamento dos indicadores mensais + anti-cache visual */
(function(){
  'use strict';
  var PATCH_CLASS = 'mobile-monthly-polish-v634';
  var running = false;

  function isMobile(){
    return !window.matchMedia || window.matchMedia('(max-width: 768px)').matches;
  }

  function setButtonText(selector, text){
    var el = document.querySelector(selector);
    if(el && el.textContent.trim() !== text) el.textContent = text;
  }

  function normalizeLabel(text){
    return String(text || '')
      .replace(/\s+/g,' ')
      .replace(/Ibov$/i,'Ibovespa')
      .trim();
  }

  function classFromValueText(text){
    var raw = String(text || '').trim();
    if(!raw || raw === '—') return 'muted';
    return raw.indexOf('-') >= 0 ? 'neg' : 'pos';
  }

  function compactAllTable(root){
    var table = root && root.querySelector('.monthly-indicators-table-v445');
    if(!table) return;

    var activeBtn = root.querySelector('[data-monthly-indicators-view-v446].active');
    var activeView = activeBtn ? (activeBtn.getAttribute('data-monthly-indicators-view-v446') || 'all') : (root.dataset.monthlyViewV630 || 'all');
    var headRow = table.querySelector('thead tr');
    var rows = Array.prototype.slice.call(table.querySelectorAll('tbody tr'));
    if(!headRow || !rows.length) return;

    if(activeView !== 'all'){
      headRow.innerHTML = '<th scope="col">Mês</th><th scope="col">' + normalizeLabel(activeBtn ? activeBtn.textContent : 'Indicador') + '</th>';
      rows.forEach(function(row){
        var cells = Array.prototype.slice.call(row.children);
        if(cells.length > 2){
          var first = cells[0].cloneNode(true);
          var chosen = cells.find(function(td){ return td.classList && (td.classList.contains('pos') || td.classList.contains('neg') || td.classList.contains('muted')); }) || cells[1];
          row.innerHTML = '';
          row.appendChild(first);
          row.appendChild(chosen.cloneNode(true));
        }
        row.classList.add('monthly-single-indicator-row-v633');
      });
      return;
    }

    if(headRow.children.length <= 2 && table.querySelector('.monthly-mobile-all-grid-v633,.monthly-mobile-all-grid-v634')) return;

    var labels = Array.prototype.slice.call(headRow.children)
      .slice(1)
      .map(function(th){ return normalizeLabel(th.textContent || ''); })
      .filter(Boolean);

    if(!labels.length) labels = ['CDI','IPCA','Ibovespa','Dólar'];
    headRow.innerHTML = '<th scope="col">Mês</th><th scope="col">Indicadores</th>';

    rows.forEach(function(row){
      var cells = Array.prototype.slice.call(row.children);
      if(cells.length < 3) return;
      var month = cells[0].cloneNode(true);
      var values = cells.slice(1);
      var html = '<div class="monthly-mobile-all-grid-v634">' + values.map(function(cell, index){
        var value = (cell.textContent || '').trim() || '—';
        var label = labels[index] || ('Indicador ' + (index + 1));
        return '<span class="monthly-mobile-all-item-v634 ' + classFromValueText(value) + '"><em>' + label + '</em><strong>' + value + '</strong></span>';
      }).join('') + '</div>';
      row.innerHTML = '';
      month.classList.add('monthly-mobile-month-v634');
      row.appendChild(month);
      var td = document.createElement('td');
      td.className = 'monthly-mobile-all-cell-v634';
      td.innerHTML = html;
      row.appendChild(td);
      row.classList.add('monthly-mobile-all-row-v634');
    });
  }

  function polish(){
    if(!isMobile() || running) return;
    running = true;
    try{
      document.documentElement.classList.add('mobile-monthly-us-indicators-v632','mobile-monthly-semantic-v633','mobile-monthly-compact-v635',PATCH_CLASS);
      var root = document.getElementById('monthlyIndicatorsV445');
      if(root){
        root.dataset.mobilePolishV634 = '1';
        var lead = root.querySelector('.monthly-indicators-head-v445 p');
        if(lead) lead.remove();

        setButtonText('#monthlyIndicatorsV445 [data-monthly-indicators-range-v445="year"]', 'Ano');
        setButtonText('#monthlyIndicatorsV445 [data-monthly-indicators-range-v445="12m"]', '12 meses');
        setButtonText('#monthlyIndicatorsV445 [data-monthly-indicators-view-v446="ibov"]', 'Ibovespa');
        setButtonText('#monthlyIndicatorsV445 [data-monthly-indicators-view-v446="sp500"]', 'S&P 500');
        setButtonText('#monthlyIndicatorsV445 [data-monthly-indicators-view-v446="dow"]', 'Dow');

        var usLabel = root.querySelector('.monthly-us-currency-toggle-v578 > span');
        if(usLabel) usLabel.textContent = 'EUA';

        compactAllTable(root);
      }
      var meta = document.querySelector('meta[name="app-build"]');
      if(meta) meta.content = 'ELTAUM_MOBILE_MONTHLY_POLISH_V634';
    }catch(_error){}
    running = false;
  }

  function renderThenPolish(){
    if(!isMobile()) return;
    try{
      if(window.__ELTAUM_MOBILE_MONTHLY_INDICATORS_V445__ && typeof window.__ELTAUM_MOBILE_MONTHLY_INDICATORS_V445__.render === 'function'){
        window.__ELTAUM_MOBILE_MONTHLY_INDICATORS_V445__.render();
      }
    }catch(_error){}
    setTimeout(polish, 0);
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', renderThenPolish, {once:true});
  else renderThenPolish();
  window.addEventListener('load', renderThenPolish, {once:true});
  document.addEventListener('elton:market-data-refresh', renderThenPolish);
  document.addEventListener('click', function(event){
    if(event.target && event.target.closest && event.target.closest('#monthlyIndicatorsV445')){
      setTimeout(polish, 80);
      setTimeout(polish, 250);
    }
  }, true);
  [120, 420, 1000, 2200, 5200, 9000].forEach(function(delay){ setTimeout(renderThenPolish, delay); });
})();


/* PATCH v635 — Mobile: indicadores mensais compactos e hierarquia limpa */
(function(){
  'use strict';
  var PATCH_CLASS = 'mobile-monthly-compact-v635';

  function isMobile(){
    return !window.matchMedia || window.matchMedia('(max-width: 768px)').matches;
  }

  function setButtonText(selector, text){
    var el = document.querySelector(selector);
    if(el && el.textContent.trim() !== text) el.textContent = text;
  }

  function compact(){
    if(!isMobile()) return;
    try{
      document.documentElement.classList.add('mobile-monthly-us-indicators-v632','mobile-monthly-semantic-v633','mobile-monthly-polish-v634',PATCH_CLASS);
      var root = document.getElementById('monthlyIndicatorsV445');
      if(root){
        root.dataset.mobileCompactV635 = '1';
        var kicker = root.querySelector('.monthly-indicators-kicker-v445');
        if(kicker) kicker.remove();
        var lead = root.querySelector('.monthly-indicators-head-v445 p');
        if(lead) lead.remove();
        setButtonText('#monthlyIndicatorsV445 [data-monthly-indicators-range-v445="year"]', 'Ano');
        setButtonText('#monthlyIndicatorsV445 [data-monthly-indicators-range-v445="12m"]', '12 meses');
        setButtonText('#monthlyIndicatorsV445 [data-monthly-indicators-view-v446="ibov"]', 'Ibovespa');
        setButtonText('#monthlyIndicatorsV445 [data-monthly-indicators-view-v446="sp500"]', 'S&P 500');
      }
      var meta = document.querySelector('meta[name="app-build"]');
      if(meta) meta.content = 'ELTAUM_MOBILE_MONTHLY_COMPACT_V635';
    }catch(_error){}
  }

  function renderThenCompact(){
    if(!isMobile()) return;
    try{
      if(window.__ELTAUM_MOBILE_MONTHLY_INDICATORS_V445__ && typeof window.__ELTAUM_MOBILE_MONTHLY_INDICATORS_V445__.render === 'function'){
        window.__ELTAUM_MOBILE_MONTHLY_INDICATORS_V445__.render();
      }
    }catch(_error){}
    setTimeout(compact, 0);
    setTimeout(compact, 120);
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', renderThenCompact, {once:true});
  else renderThenCompact();
  window.addEventListener('load', renderThenCompact, {once:true});
  document.addEventListener('elton:market-data-refresh', renderThenCompact);
  document.addEventListener('click', function(event){
    if(event.target && event.target.closest && event.target.closest('#monthlyIndicatorsV445')){
      setTimeout(compact, 80);
      setTimeout(compact, 260);
    }
  }, true);
  [120, 420, 1000, 2200, 5200, 9000].forEach(function(delay){ setTimeout(renderThenCompact, delay); });
})();


/* PATCH v636 — Mobile: garante ativação da padronização dos botões Ver mais */
(function(){
  'use strict';
  var PATCH_CLASS = 'mobile-vermais-standard-v636';
  function isMobile(){
    return !window.matchMedia || window.matchMedia('(max-width: 768px)').matches;
  }
  function apply(){
    try{
      if(!isMobile()) return;
      document.documentElement.classList.add(PATCH_CLASS);
      var meta = document.querySelector('meta[name="app-build"]');
      if(meta) meta.content = 'ELTAUM_MOBILE_VERMAIS_STANDARD_V636';
    }catch(_error){}
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply, {once:true});
  else apply();
  window.addEventListener('load', apply, {once:true});
  [120, 420, 1000, 2200, 5200, 9000].forEach(function(delay){ setTimeout(apply, delay); });
})();


/* PATCH v637 — Mobile: ativa o refinamento limpo dos botões Ver mais */
(function(){
  'use strict';
  var PATCH_CLASS = 'mobile-vermais-clean-v637';
  function isMobile(){
    return !window.matchMedia || window.matchMedia('(max-width: 768px)').matches;
  }
  function apply(){
    try{
      if(!isMobile()) return;
      document.documentElement.classList.add(PATCH_CLASS);
      var meta = document.querySelector('meta[name="app-build"]');
      if(meta) meta.content = 'ELTAUM_MOBILE_VERMAIS_CLEAN_V637';
    }catch(_error){}
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply, {once:true});
  else apply();
  window.addEventListener('load', apply, {once:true});
  [120, 420, 1000, 2200, 5200, 9000].forEach(function(delay){ setTimeout(apply, delay); });
})();

/* PATCH v638 — Mobile: ativa lapidação dos botões de período do ranking */
(function(){
  'use strict';
  var PATCH_CLASS = 'mobile-ranking-buttons-polish-v638';
  function isMobile(){
    return !window.matchMedia || window.matchMedia('(max-width: 768px)').matches;
  }
  function normalizeRankingButtons(){
    try{
      if(!isMobile()) return;
      document.documentElement.classList.add(PATCH_CLASS);
      var meta = document.querySelector('meta[name="app-build"]');
      if(meta) meta.content = 'ELTAUM_MOBILE_RANKING_BUTTONS_POLISH_V638';

      document.querySelectorAll('#rankingGrid .rank-period-tab').forEach(function(btn){
        var raw = (btn.getAttribute('data-rank-period') || btn.textContent || '').trim().toLowerCase();
        if(raw === 'mes' || raw === 'mês') btn.textContent = 'Mês';
        else if(raw === 'ano') btn.textContent = 'Ano';
        else if(raw === '12m' || raw === '12 meses') btn.textContent = '12 meses';
      });

      document.querySelectorAll('#rankingGrid .rank-more-btn').forEach(function(btn){
        var expanded = false;
        var card = btn.closest('.rank-card');
        if(card) expanded = !card.classList.contains('rank-collapsed');
        var current = (btn.textContent || '').trim().toLowerCase();
        if(expanded || current.indexOf('menos') >= 0){
          btn.textContent = 'Ver menos';
        }else{
          btn.textContent = 'Ver mais fundos';
        }
      });
    }catch(_error){}
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', normalizeRankingButtons, {once:true});
  else normalizeRankingButtons();
  window.addEventListener('load', normalizeRankingButtons, {once:true});
  document.addEventListener('click', function(event){
    if(event.target && event.target.closest && event.target.closest('#rankingGrid')){
      setTimeout(normalizeRankingButtons, 60);
      setTimeout(normalizeRankingButtons, 240);
    }
  }, true);
  [120, 420, 1000, 2200, 5200, 9000].forEach(function(delay){ setTimeout(normalizeRankingButtons, delay); });
})();


/* DIAGNÓSTICO v642 — não altera DOM, apenas mostra a referência de CDI usada no ranking */
(function diagnosticoRankingCdiV642(){
  window.__diagnosticarCdiRankingV642 = function(){
    var card = {};
    try{ card = typeof cdiCardAtualV230 === 'function' ? cdiCardAtualV230() : (window.__mercadoAtualV230 && window.__mercadoAtualV230.cards && window.__mercadoAtualV230.cards.cdi) || {}; }catch(e){}
    var bruto = null;
    try{ bruto = typeof resolverCdiPeriodoV229 === 'function' ? resolverCdiPeriodoV229(card, 12) : (card && card.acum_12m); }catch(e){ bruto = card && card.acum_12m; }
    var normalizado = typeof normalizarCdiPeriodoV642 === 'function' ? normalizarCdiPeriodoV642(bruto, 12) : bruto;
    var out = {
      build: 'v642-safe',
      cdi12m_resolvido: bruto,
      cdi12m_normalizado: normalizado,
      indicState_m12: window.indicState && window.indicState.cdi && window.indicState.cdi.m12,
      card_acum_12m: card && card.acum_12m
    };
    console.table(out);
    return out;
  };
})();


/* DIAGNÓSTICO v643 — valida a referência de CDI usada no cálculo final do ranking */
(function diagnosticoRankingCdiV643(){
  window.__diagnosticarCdiRankingV643 = function(){
    var card = {};
    try{ card = typeof cdiCardAtualV230 === 'function' ? cdiCardAtualV230() : (window.__mercadoAtualV230 && window.__mercadoAtualV230.cards && window.__mercadoAtualV230.cards.cdi) || {}; }catch(e){}
    var bruto = null;
    try{ bruto = typeof resolverCdiPeriodoV229 === 'function' ? resolverCdiPeriodoV229(card, 12) : (card && card.acum_12m); }catch(e){ bruto = card && card.acum_12m; }
    var normalizado = typeof normalizarCdiRankingPeriodoV643 === 'function' ? normalizarCdiRankingPeriodoV643(bruto || (card && card.acum_12m), '12m') : bruto;
    var exemplos = [];
    try{
      var rows = Array.isArray(window.allRows) ? window.allRows : (typeof allRows !== 'undefined' && Array.isArray(allRows) ? allRows : []);
      exemplos = rows.filter(function(r){ return parseNumeroRankingCdiV643(r && r['Acum. 12M (%)']) !== null; }).slice(0,5).map(function(r){
        var rent = parseNumeroRankingCdiV643(r['Acum. 12M (%)']);
        return { fundo: r.Fundo, rent12m: rent, pct_cdi_12m: calcularPercentualCdiRankingV643(rent, normalizado, '12m') };
      });
    }catch(e){}
    var out = {
      build: 'v643-safe-ratio',
      cdi12m_resolvido: bruto,
      cdi12m_normalizado_final: normalizado,
      indicState_m12: window.indicState && window.indicState.cdi && window.indicState.cdi.m12,
      card_acum_12m: card && card.acum_12m,
      exemplos: exemplos
    };
    console.table(out);
    return out;
  };
})();

/* V740: v647 neutralizado; controlador terminal abaixo. */

/* V740: v648 neutralizado; controlador terminal abaixo. */

/* V740: v649 neutralizado; controlador terminal abaixo. */

/* PATCH v653 — Desktop: Selic com leitura executiva e semântica simplificada */
(function desktopSelicExecutiveV653(){
  var BUILD = 'ELTAUM_DESKTOP_SELIC_EXECUTIVE_V653';
  var PATCH_CLASS = 'desktop-selic-executive-v653';
  function isDesktop(){
    return !window.matchMedia || window.matchMedia('(min-width: 769px)').matches;
  }
  function setText(selector, text){
    var el = document.querySelector(selector);
    if(el) el.textContent = text;
  }
  function apply(){
    if(!isDesktop()) return;
    document.documentElement.classList.add(PATCH_CLASS);
    setText('#mobileSelicV400 .econ-dash-card-head-v378 h3', '🏦 Trajetória da Selic meta');
    setText('#mobileSelicV400 .econ-dash-card-head-v378 p', 'Histórico da taxa básica de juros para contextualizar o nível atual.');
    var buttons = document.querySelectorAll('#mobileSelicV400 [data-dash-range-target="selic"]');
    buttons.forEach(function(btn){
      var r = btn.getAttribute('data-dash-range');
      if(r === 'ytd') btn.textContent = 'Ano atual';
      if(r === '36') btn.textContent = '3 anos';
      if(r === '60') btn.textContent = '5 anos';
      if(r === '120') btn.textContent = '10 anos';
      if(r === 'all') btn.textContent = 'Histórico';
    });
    var current = document.querySelector('#mobileSelicV400 .selic-kpi-focus-card-v415.is-current span');
    if(current) current.textContent = 'Selic vigente';
    var active = document.querySelector('#mobileSelicV400 [data-dash-range-target="selic"].active');
    if(active && typeof econAtualizarSelicKpiLabelsV381 === 'function') econAtualizarSelicKpiLabelsV381(active.dataset.dashRange || 'all');
    var meta = document.querySelector('meta[name="app-build"]');
    if(meta) meta.content = BUILD;
  }
  function schedule(){
    apply();
    [80, 220, 520, 1000, 1800, 3200, 7000].forEach(function(delay){ setTimeout(apply, delay); });
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', schedule, {once:true});
  else schedule();
  window.addEventListener('load', schedule, {once:true});
  document.addEventListener('click', function(ev){
    if(ev.target && ev.target.closest && ev.target.closest('#mobileSelicV400')) setTimeout(apply, 30);
  });
})();


/* PATCH v654 — Desktop: cores semânticas no calendário Copom
   Escopo: SOMENTE DESKTOP. Visual sem alterar dados, layout ou mobile. */
(function desktopCopomSemanticColorsV654(){
  var BUILD = 'ELTAUM_DESKTOP_COPOM_SEMANTIC_COLORS_V654';
  var PATCH_CLASS = 'desktop-copom-semantic-colors-v654';
  function isDesktop(){
    return !window.matchMedia || window.matchMedia('(min-width: 769px)').matches;
  }
  function apply(){
    if(!isDesktop()) return;
    document.documentElement.classList.add(PATCH_CLASS);
    var meta = document.querySelector('meta[name="app-build"]');
    if(meta) meta.content = BUILD;
  }
  function boot(){
    apply();
    [100, 350, 900, 1800, 3600, 7000].forEach(function(ms){ setTimeout(apply, ms); });
    var agenda = document.getElementById('desktopCopomAgendaV648');
    if(agenda && !agenda.dataset.v654Observed){
      agenda.dataset.v654Observed = '1';
      new MutationObserver(apply).observe(agenda, {childList:true, subtree:true, characterData:true});
    }
    console.log('[Catálogo CAIXA] Cores semânticas Copom desktop ativas:', BUILD);
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, {once:true});
  else boot();
  window.addEventListener('load', apply, {once:true});
  window.addEventListener('pageshow', apply, {passive:true});
})();


/* =========================================================
   PATCH v660 — Estabilidade inicial do header/KPIs
   Objetivo: reduzir CLS/tremida inicial apontada pelo PageSpeed.
   Escopo: desktop e fallback seguro para classes "mobile-kpi" usadas no topo.
   ========================================================= */
(function headerKpiInitialStabilityV660(){
  const ROOT_CLASS = 'desktop-header-kpi-stable-v660-runtime';

  function apply(){
    try{
      document.documentElement.classList.add(ROOT_CLASS);

      const kpiCells = document.querySelectorAll(
        '.mobile-kpi-cell, .header-kpi-card, .header-kpi, .top-kpi-card, .kpi-card, .brand-kpi, .hero-kpi'
      );

      kpiCells.forEach((cell) => {
        if(!cell || cell.dataset.stableV660 === '1') return;
        cell.dataset.stableV660 = '1';

        const name = cell.querySelector(
          '.mobile-kpi-name, .mobile-kpi-fund, .mobile-kpi-label-small, small, .kpi-name, .kpi-subtitle'
        );
        if(name && !name.getAttribute('title')){
          const text = String(name.textContent || '').replace(/\s+/g,' ').trim();
          if(text) name.setAttribute('title', text);
        }
      });
    }catch(err){
      console.warn('[v660 header stability]', err);
    }
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', apply, {once:true});
  }else{
    apply();
  }

  requestAnimationFrame(apply);
  setTimeout(apply, 120);
  setTimeout(apply, 450);
})();


/* =========================================================
   PATCH v665 — Selic zero-safe
   ---------------------------------------------------------
   Evita que um carregamento antecipado do mercado_atual injete 0,00%
   como Selic vigente no gráfico/resumo.
   ========================================================= */
(function selicZeroSafeV665(){
  function parseSelic(v){
    if(v === null || v === undefined || v === '') return NaN;
    return parseFloat(String(v).replace('%','').replace(',','.').replace(/[^0-9.\-]/g,''));
  }

  function fmt(v){
    return Number.isFinite(v) && v > 0 ? v.toFixed(2).replace('.', ',') + '% a.a.' : '';
  }

  function cardValue(){
    try{
      var card = window._dadosMercado?.cards?.selic_meta || window.__ECON_DASH_STATE_V378__?.mercado?.cards?.selic_meta || {};
      var n = parseSelic(card.valor ?? card.taxa ?? card.valor_atual);
      return Number.isFinite(n) && n > 0 ? n : NaN;
    }catch(e){
      return NaN;
    }
  }

  function lastPositiveFromChart(){
    try{
      var chart = window.Chart && window.Chart.getChart ? window.Chart.getChart('chartSelic') : null;
      var arr = chart?.data?.datasets?.[0]?.data || [];
      for(var i = arr.length - 1; i >= 0; i--){
        var v = typeof arr[i] === 'number' ? arr[i] : (arr[i]?.y ?? arr[i]);
        var n = Number(v);
        if(Number.isFinite(n) && n > 0) return n;
      }
    }catch(e){}
    return NaN;
  }

  function apply(){
    var current = cardValue();
    if(!Number.isFinite(current) || current <= 0) current = lastPositiveFromChart();
    if(!Number.isFinite(current) || current <= 0) return;

    var currentTxt = fmt(current);
    var resumo = document.getElementById('selicHojeResumo');
    if(resumo && /(^|\s)0,00%\s*a\.a\./i.test(resumo.textContent || '')){
      resumo.textContent = currentTxt;
    }

    document.querySelectorAll('#mobileSelicV400 .selic-executive-legend-v596 strong, #mobileSelicV400 .selic-chart-legend-v596 strong').forEach(function(el){
      if(/Selic atual:\s*0,00%\s*a\.a\./i.test(el.textContent || '')){
        el.textContent = (el.textContent || '').replace(/Selic atual:\s*0,00%\s*a\.a\./i, 'Selic atual: ' + currentTxt);
      }
    });
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply, {once:true});
  else apply();

  window.addEventListener('load', apply, {once:true});
  [100, 350, 800, 1600, 3200].forEach(function(delay){ setTimeout(apply, delay); });
})();


/* =========================================================
   PATCH v666 — Selic vigente DOM sync e anti-flicker
   ---------------------------------------------------------
   Corrige re-renderizações tardias do módulo legado da Selic.
   Mantém card e legenda coerentes com a Selic vigente oficial.
   ========================================================= */
(function selicCurrentDomSyncV666(){
  var timer = null;
  var lastApplied = '';

  function val(){
    var n = window.selicOfficialPositiveV666?.(window._dadosMercado);
    return Number.isFinite(n) && n > 0 ? n : NaN;
  }

  function date(){
    return window.selicOfficialDateV666?.(window._dadosMercado) || '';
  }

  function fmt(v){
    return window.formatSelicOfficialV666 ? window.formatSelicOfficialV666(v) : (v.toFixed(2).replace('.', ',') + '% a.a.');
  }

  function normalizeDateText(d){
    if(!d) return '';
    d = String(d).trim().replace(/^desde\s+/i,'');
    var m = d.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if(m) return m[3] + '/' + m[2] + '/' + m[1];
    return d;
  }

  function sync(){
    var n = val();
    if(!Number.isFinite(n) || n <= 0) return;

    var txt = fmt(n);
    var d = normalizeDateText(date());
    var key = txt + '|' + d;

    var currentValue = document.getElementById('selicHojeResumo');
    var currentDate = document.getElementById('selicHojeData');

    if(currentValue && currentValue.textContent !== txt){
      currentValue.textContent = txt;
    }
    if(currentDate && d && currentDate.textContent !== 'desde ' + d){
      currentDate.textContent = 'desde ' + d;
    }

    document.querySelectorAll('#mobileSelicV400 .selic-executive-legend-v596 strong, #mobileSelicV400 .selic-chart-legend-v596 strong').forEach(function(el){
      var t = el.textContent || '';
      var next = t;
      if(/Selic atual:\s*[\d,.]+%\s*a\.a\./i.test(t)){
        next = t.replace(/Selic atual:\s*[\d,.]+%\s*a\.a\./i, 'Selic atual: ' + txt);
      }else if(/Período exibido:/i.test(t) && !/Selic atual:/i.test(t)){
        next = t;
      }
      if(next !== t) el.textContent = next;
    });

    // Atualiza o último dataset de marcador "vigente", quando existir, sem destruir o gráfico.
    try{
      var chart = window.Chart && window.Chart.getChart ? window.Chart.getChart('chartSelic') : null;
      if(chart && chart.data && Array.isArray(chart.data.datasets)){
        chart.data.datasets.forEach(function(ds){
          if(/vigente|atual/i.test(String(ds.label || '')) && Array.isArray(ds.data) && ds.data.length){
            var lastIndex = ds.data.length - 1;
            if(typeof ds.data[lastIndex] === 'number') ds.data[lastIndex] = n;
            else if(ds.data[lastIndex] && typeof ds.data[lastIndex] === 'object') ds.data[lastIndex].y = n;
          }
        });
        chart.update('none');
      }
    }catch(e){}

    lastApplied = key;
  }

  function schedule(){
    clearTimeout(timer);
    timer = setTimeout(sync, 60);
    setTimeout(sync, 220);
  }

  function bind(){
    var root = document.getElementById('mobileSelicV400');
    if(root && !root.dataset.v666Bound){
      root.dataset.v666Bound = '1';
      root.addEventListener('click', function(ev){
        if(ev.target && ev.target.closest('[data-dash-range-target="selic"], #selicCustomApplyV596, button')){
          root.classList.add('selic-switching-v666');
          schedule();
          setTimeout(function(){ root.classList.remove('selic-switching-v666'); sync(); }, 260);
        }
      }, true);

      if(window.MutationObserver){
        new MutationObserver(schedule).observe(root, {childList:true, subtree:true, characterData:true});
      }
    }
    schedule();
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bind, {once:true});
  else bind();

  window.addEventListener('load', bind, {once:true});
  [120, 400, 1000, 2200, 5000].forEach(function(delay){ setTimeout(sync, delay); });
})();


/* =========================================================
   PATCH v667 — Selic/Copom DOM sync final
   ---------------------------------------------------------
   Corrige telas legadas quando mercado_atual.json veio com Selic vazia/0.
   ========================================================= */
(function selicCopomDomRepairV667(){
  function fmtValor(v){
    return Number(v).toFixed(2).replace('.', ',') + '%';
  }

  function apply(){
    try{
      if(window._dadosMercado && typeof repararSelicMercadoV667 === 'function'){
        repararSelicMercadoV667(window._dadosMercado);
      }
      if(window.__ECON_DASH_STATE_V378__?.mercado && typeof repararSelicMercadoV667 === 'function'){
        repararSelicMercadoV667(window.__ECON_DASH_STATE_V378__.mercado);
      }

      const valor = window.selicOfficialPositiveV666?.(window._dadosMercado);
      if(!Number.isFinite(valor) || valor <= 0) return;

      const valorPct = fmtValor(valor);
      const valorAa = valorPct + ' a.a.';
      const data = window.selicOfficialDateV666?.(window._dadosMercado) || SELIC_FALLBACK_V667.dataBR;

      const setText = (sel, text) => {
        document.querySelectorAll(sel).forEach(el => {
          if(el && el.textContent !== text) el.textContent = text;
        });
      };

      setText('#mc-selic', valorPct);
      setText('#selic-last-change', String(data).replace(/^desde\s+/i,''));
      setText('#selicHojeResumo', valorAa);
      setText('#selicHojeData', 'desde ' + String(data).replace(/^desde\s+/i,''));

      document.querySelectorAll('#mobileSelicV400 .selic-executive-legend-v596 strong, #mobileSelicV400 .selic-chart-legend-v596 strong').forEach(el => {
        const txt = el.textContent || '';
        if(/Selic atual:\s*[\d,.]+%\s*a\.a\./i.test(txt)){
          el.textContent = txt.replace(/Selic atual:\s*[\d,.]+%\s*a\.a\./i, 'Selic atual: ' + valorAa);
        }
      });

      // v673: este reparo de Selic/Copom não altera mais o bloco de Poupança.
      // A Poupança fica sob responsabilidade do patch dedicado v673, evitando
      // disputa entre "rendimento efetivo" e "fórmula" no card principal.

      // Se algum texto de Copom ainda foi renderizado com 0,00%, força nova montagem.
      const badCopom = document.querySelector('#desktopCopomAgendaV648, #copomMeetings, .desktop-copom-agenda-v648');
      if(badCopom && /0,00%|14,50\s*p\.p/i.test(badCopom.innerText || '') && typeof buildCopomCalendario === 'function'){
        buildCopomCalendario();
      }
    }catch(err){
      console.warn('[v667 Selic/Copom repair]', err);
    }
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply, {once:true});
  else apply();

  window.addEventListener('load', apply, {once:true});
  [80, 220, 500, 1000, 1800, 3200, 6000].forEach(delay => setTimeout(apply, delay));
  document.addEventListener('click', ev => {
    if(ev.target?.closest?.('#mobileSelicV400, #sec-mercado, [data-dash-range-target="selic"]')){
      setTimeout(apply, 80);
      setTimeout(apply, 260);
    }
  }, true);
})();



/* =========================================================
   PATCH v673 — Poupança: rendimento efetivo estável, sem disputa de render
   ---------------------------------------------------------
   Objetivo: manter o rendimento efetivo no card principal,
   deixar a fórmula como leitura auxiliar e evitar flicker/re-render.
   ========================================================= */
(function poupancaEffectiveMonthlyV673(){
  var BUILD = 'ELTAUM_POUPANCA_EFFECTIVE_MONTHLY_V673';
  var lastKey = '';

  function parseNum(value){
    if(value === null || value === undefined || value === '') return NaN;
    if(typeof value === 'number') return Number.isFinite(value) ? value : NaN;
    var s = String(value).trim();
    if(!s || s === '-' || s === '—') return NaN;
    s = s.replace(/%/g,'').replace(/\s+/g,'').replace(/[^0-9,\.\-]/g,'');
    if(!s || s === '-' || s === '—') return NaN;
    if(s.indexOf(',') >= 0 && s.indexOf('.') >= 0) s = s.replace(/\./g,'').replace(',','.');
    else if(s.indexOf(',') >= 0) s = s.replace(',','.');
    var n = Number(s);
    return Number.isFinite(n) ? n : NaN;
  }

  function firstNumber(){
    for(var i=0;i<arguments.length;i++){
      var n = parseNum(arguments[i]);
      if(Number.isFinite(n)) return n;
    }
    return NaN;
  }

  function fmtPct(n){
    return Number.isFinite(n) ? n.toFixed(2).replace('.', ',') + '%' : '—';
  }

  function mercado(){
    return window._dadosMercado || window.__ECON_DASH_STATE_V378__?.mercado || window.__mercadoAtualV230 || {};
  }

  function selicAtual(d){
    try{
      var s = window.selicOfficialPositiveV666?.(d);
      if(Number.isFinite(s) && s > 0) return s;
    }catch(e){}
    var c = d?.cards || {};
    return firstNumber(c.selic_meta?.valor, c.selic_meta?.taxa, c.selic_meta?.valor_atual, d?.selic_meta?.valor);
  }

  function getPoupanca(d){
    var c = d?.cards || {};
    var nova = c.poupanca_nova || d?.poupanca_nova || d?.poupanca?.nova || {};
    var antiga = c.poupanca_antiga || d?.poupanca_antiga || d?.poupanca?.antiga || {};
    var efetivo = firstNumber(
      nova.valor,
      nova.mensal,
      nova.rendimento_mensal,
      nova.rendimento_mes,
      nova.mes,
      antiga.valor,
      antiga.mensal,
      antiga.rendimento_mensal,
      antiga.rendimento_mes
    );
    var acumAno = firstNumber(nova.acum_ano, nova.acumulado_ano, nova.rendimento_ano, nova.ytd, antiga.acum_ano, antiga.acumulado_ano);
    return { nova:nova, antiga:antiga, efetivo:efetivo, acumAno:acumAno };
  }

  function formulaText(selic){
    if(Number.isFinite(selic) && selic > 8.5) return 'TR + 0,50% a.m.';
    if(Number.isFinite(selic)) return '70% da Selic + TR';
    return 'Regra definida pela Selic vigente';
  }

  function regraText(selic){
    if(Number.isFinite(selic) && selic > 8.5) return 'Selic acima de 8,50%';
    if(Number.isFinite(selic)) return 'Selic até 8,50%';
    return 'Aguardando Selic';
  }

  function setText(selector, text){
    document.querySelectorAll(selector).forEach(function(el){
      if(el && el.textContent !== text) el.textContent = text;
    });
  }

  function ensureFormulaCard(formula){
    var strip = document.querySelector('.savings-reference-v167 .savings-summary-v207, .savings-reference-v167 .savings-kpi-strip-v199');
    if(!strip) return;
    var card = document.getElementById('poupFormulaCompactV672') || document.getElementById('poupFormulaCompactV673');
    if(!card){
      card = document.createElement('div');
      card.className = 'savings-kpi-v199 formula poup-formula-card-v673';
      card.id = 'poupFormulaCompactV673';
      card.innerHTML = '<dt>Fórmula vigente</dt><dd></dd>';
      strip.appendChild(card);
    }
    card.id = 'poupFormulaCompactV673';
    card.classList.add('poup-formula-card-v673');
    var dd = card.querySelector('dd');
    if(dd && dd.textContent !== formula) dd.textContent = formula;
  }

  function apply(force){
    try{
      document.documentElement.classList.add('desktop-poupanca-effective-v673');
      var meta = document.querySelector('meta[name="app-build"]');
      if(meta) meta.content = BUILD;

      var d = mercado();
      var p = getPoupanca(d);
      var selic = selicAtual(d);
      var formula = formulaText(selic);
      var regra = regraText(selic);
      var efetivoTxt = Number.isFinite(p.efetivo) && p.efetivo > 0 ? fmtPct(p.efetivo) : '';
      var key = (efetivoTxt || formula) + '|' + regra + '|' + (Number.isFinite(p.acumAno) ? p.acumAno : '');

      if(!force && key === lastKey){
        // Mesmo sem reescrever tudo, protege o card principal caso algum patch antigo tente trocar por fórmula.
        var outCheck = document.getElementById('mc-poup');
        if(efetivoTxt && outCheck && outCheck.textContent !== efetivoTxt) outCheck.textContent = efetivoTxt;
        return;
      }

      if(efetivoTxt){
        setText('#poupCurrentLabelV214', 'Rendimento efetivo do mês');
        var out = document.getElementById('mc-poup');
        if(out){
          out.textContent = efetivoTxt;
          out.setAttribute('aria-label', 'Rendimento efetivo da poupança no mês: ' + efetivoTxt + ' ao mês');
        }
        setText('#poupTodayCompactV199', efetivoTxt);
      }else{
        setText('#poupCurrentLabelV214', 'Fórmula do mês');
        setText('#mc-poup', formula.replace(' a.m.',''));
      }

      if(Number.isFinite(p.acumAno)) setText('#poupYearCompactV199', (p.acumAno > 0 ? '+' : '') + fmtPct(p.acumAno));

      setText('#poupCurrentScenarioTitleV214', 'Leitura da regra');

      var note = document.getElementById('poupQuickNote');
      if(note){
        note.innerHTML = '<strong>Fórmula vigente:</strong><span>' + formula + '</span><em>' + regra + '</em>';
      }

      var thresholdDt = document.querySelector('.savings-reference-v167 .savings-kpi-v199.threshold dt');
      var thresholdDd = document.querySelector('.savings-reference-v167 .savings-kpi-v199.threshold dd');
      if(thresholdDt) thresholdDt.textContent = 'Regra atual';
      if(thresholdDd) thresholdDd.textContent = regra;

      ensureFormulaCard(formula);

      var currentNew = document.getElementById('poupScenarioCurrentNew');
      if(currentNew && efetivoTxt) currentNew.textContent = efetivoTxt + ' a.m.';

      // Dentro de "Regras da poupança" não repetimos o rendimento efetivo do topo.
      // Essa área explica a regra; o número fica no card principal.
      var newRule = document.getElementById('poupNewRuleText');
      if(newRule) newRule.innerHTML = 'Fórmula aplicada: <strong>' + formula + '</strong>.';

      var oldRule = document.getElementById('poupOldRuleText');
      if(oldRule) oldRule.innerHTML = 'Fórmula: <strong>TR + 0,50% a.m.</strong>';

      lastKey = key;
    }catch(err){
      console.warn('[Poupança v673]', err);
    }
  }

  function bind(){
    apply(true);
    // Sem MutationObserver no bloco: ele causava disputa/flicker com patches legados.
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bind, {once:true});
  else bind();
  window.addEventListener('load', function(){ apply(true); }, {once:true});
  [120, 360, 900, 1800, 3200, 5200, 7600].forEach(function(delay){ setTimeout(function(){ apply(false); }, delay); });
})();



/* =========================================================
   PATCH v674 — Poupança compacta aberta
   ---------------------------------------------------------
   Remove duplicidade visual do card de fórmula no resumo e
   mantém o painel aberto mais enxuto.
   ========================================================= */
(function poupancaCompactOpenV674(){
  function apply(){
    try{
      document.documentElement.classList.add('desktop-poupanca-compact-open-v674');

      var formulaCard =
        document.getElementById('poupFormulaCompactV673') ||
        document.getElementById('poupFormulaCompactV672');
      if(formulaCard){
        formulaCard.setAttribute('hidden','');
        formulaCard.style.display = 'none';
      }

      var btn = document.getElementById('poupExpandBtn');
      if(btn){
        var expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.innerHTML = expanded ? 'Ocultar detalhes <span aria-hidden="true">▲</span>' : 'Ver detalhes <span aria-hidden="true">▼</span>';
      }

      var newRule = document.getElementById('poupNewRuleText');
      if(newRule && /Rendimento efetivo do mês/i.test(newRule.textContent || '')){
        newRule.innerHTML = 'Com Selic acima de 8,50% a.a.: <strong>TR + 0,50% a.m.</strong>';
      }

      var oldRule = document.getElementById('poupOldRuleText');
      if(oldRule && /^Fórmula:/i.test(oldRule.textContent || '')){
        oldRule.innerHTML = 'Rendimento: <strong>TR + 0,50% a.m.</strong>';
      }
    }catch(err){
      console.warn('[Poupança v674]', err);
    }
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply, {once:true});
  else apply();

  window.addEventListener('load', apply, {once:true});
  document.addEventListener('click', function(ev){
    if(ev.target && ev.target.closest && ev.target.closest('#poupExpandBtn, .savings-reference-v167')){
      setTimeout(apply, 40);
      setTimeout(apply, 180);
    }
  }, true);

  [120, 420, 1000, 2200, 4200].forEach(function(delay){ setTimeout(apply, delay); });
})();


/* =========================================================
   PATCH v675 — Poupança ultracompacta aberta
   Remove card duplicado de fórmula e evita reinsert tardio.
   ========================================================= */
(function poupancaUltraCompactV675(){
  let obs = null;

  function removeFormulaCard(){
    document.querySelectorAll('#poupFormulaCompactV672,#poupFormulaCompactV673,.poup-formula-card-v673').forEach(function(el){
      try{ el.remove(); }catch(e){ el.style.display='none'; }
    });
  }

  function apply(){
    try{
      document.documentElement.classList.add('desktop-poupanca-ultracompact-v675');

      removeFormulaCard();

      var btn = document.getElementById('poupExpandBtn');
      if(btn){
        var expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.innerHTML = expanded ? 'Ocultar detalhes <span aria-hidden="true">▲</span>' : 'Ver detalhes <span aria-hidden="true">▼</span>';
      }

      var newRule = document.getElementById('poupNewRuleText');
      if(newRule){
        newRule.innerHTML = 'Com Selic acima de 8,50% a.a.: <strong>TR + 0,50% a.m.</strong>';
      }

      var oldRule = document.getElementById('poupOldRuleText');
      if(oldRule){
        oldRule.innerHTML = 'Rendimento: <strong>TR + 0,50% a.m.</strong>';
      }

      var details = document.getElementById('poupDetailsPanelV167');
      if(details && !details.dataset.v675Ready){
        details.dataset.v675Ready = '1';
      }

      if(!obs && window.MutationObserver){
        var strip = document.querySelector('#sec-mercado .savings-reference-v167 .savings-summary-v207, #sec-mercado .savings-reference-v167 .savings-kpi-strip-v199');
        if(strip){
          obs = new MutationObserver(removeFormulaCard);
          obs.observe(strip, {childList:true, subtree:true});
        }
      }
    }catch(err){
      console.warn('[Poupança v675]', err);
    }
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply, {once:true});
  else apply();

  window.addEventListener('load', apply, {once:true});
  document.addEventListener('click', function(ev){
    if(ev.target && ev.target.closest && ev.target.closest('#poupExpandBtn, .savings-reference-v167')){
      setTimeout(apply, 30);
      setTimeout(apply, 120);
      setTimeout(apply, 300);
    }
  }, true);

  [80, 180, 400, 800, 1600, 3000, 5000].forEach(function(delay){ setTimeout(apply, delay); });
})();


/* PATCH v726 — saneamento do antigo v685-terminal.
   Mantém a classe do workspace e a referência do renderer, sem redesenhar. */
(function rankingWorkspaceV685TerminalV726(){
  function apply(){
    if(!window.matchMedia || window.matchMedia('(min-width:769px)').matches){
      document.documentElement.classList.add('desktop-ranking-workspace-v685','desktop-ranking-sanitized-v726');
      if(typeof window.__renderRankingsV562==='function'){
        window.renderRankings=window.__renderRankingsV562;
        try{ renderRankings=window.__renderRankingsV562; }catch(e){}
      }
    }
  }
  apply();
})();

/* =========================================================
   PATCH v688 — Desktop Ranking Header Safe Hierarchy
   ---------------------------------------------------------
   Correção do v687:
   - NÃO move ranking-head nem toolbar no DOM;
   - preserva o grid/layout desktop já existente;
   - impede quebra vertical do título;
   - fixa o ícone ao lado do título;
   - cria hierarquia editorial discreta;
   - mobile permanece intocado.
   ========================================================= */
(function desktopRankingHeaderSafeV688(){
  'use strict';

  var PATCH_CLASS = 'desktop-ranking-header-safe-v688';
  var STYLE_ID = 'desktop-ranking-header-safe-v688-style';
  var KICKER_CLASS = 'ranking-kicker-v688';

  function isDesktop(){
    return !window.matchMedia || window.matchMedia('(min-width: 769px)').matches;
  }

  function setImp(el, prop, value){
    if(el) el.style.setProperty(prop, value, 'important');
  }

  function clearImp(el, props){
    if(!el) return;
    props.forEach(function(prop){ el.style.removeProperty(prop); });
  }

  function ensureStyle(){
    if(document.getElementById(STYLE_ID)) return;
    var style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      @media (min-width:769px){
        html.${PATCH_CLASS} #rankingsSection > .ranking-head{
          align-self:start!important;
          justify-self:start!important;
          min-width:300px!important;
          width:320px!important;
          max-width:340px!important;
          box-sizing:border-box!important;
        }
        html.${PATCH_CLASS} #rankingsSection .ranking-title-group{
          min-width:0!important;
          width:100%!important;
          max-width:100%!important;
          box-sizing:border-box!important;
        }
        html.${PATCH_CLASS} #rankingsSection .${KICKER_CLASS}{
          display:block!important;
          margin:0 0 8px 52px!important;
          color:#d8ad57!important;
          font:800 .60rem/1 Inter,ui-sans-serif,system-ui,sans-serif!important;
          letter-spacing:.16em!important;
          text-transform:uppercase!important;
          white-space:nowrap!important;
        }
        html.${PATCH_CLASS} #rankingsSection .ranking-title-group > .section-badge{
          display:none!important;
        }
        html.${PATCH_CLASS} #rankingsSection .ranking-title-hero-v305,
        html.${PATCH_CLASS} #rankingsSection .section-hero-premium-v306{
          display:flex!important;
          flex-direction:row!important;
          flex-wrap:nowrap!important;
          align-items:center!important;
          justify-content:flex-start!important;
          gap:12px!important;
          width:max-content!important;
          min-width:0!important;
          max-width:none!important;
          margin:0!important;
          padding:0!important;
          white-space:nowrap!important;
          text-align:left!important;
          overflow:visible!important;
        }
        html.${PATCH_CLASS} #rankingsSection .ranking-title-hero-v305 .section-title-icon-v302,
        html.${PATCH_CLASS} #rankingsSection .section-hero-premium-v306 .section-title-icon-v302{
          position:static!important;
          inset:auto!important;
          transform:none!important;
          translate:none!important;
          order:0!important;
          display:inline-flex!important;
          align-items:center!important;
          justify-content:center!important;
          width:40px!important;
          height:40px!important;
          min-width:40px!important;
          max-width:40px!important;
          flex:0 0 40px!important;
          margin:0!important;
          border-radius:11px!important;
          font-size:1.02rem!important;
          line-height:1!important;
          overflow:visible!important;
        }
        html.${PATCH_CLASS} #rankingsSection .ranking-title-hero-v305 .section-title-text-v302,
        html.${PATCH_CLASS} #rankingsSection .section-hero-premium-v306 .section-title-text-v302{
          position:static!important;
          transform:none!important;
          order:1!important;
          display:block!important;
          width:auto!important;
          min-width:max-content!important;
          max-width:none!important;
          margin:0!important;
          padding:0!important;
          color:#f5f7fb!important;
          font-size:1.46rem!important;
          line-height:1.08!important;
          font-weight:820!important;
          letter-spacing:-.035em!important;
          white-space:nowrap!important;
          word-break:normal!important;
          overflow-wrap:normal!important;
          hyphens:none!important;
          writing-mode:horizontal-tb!important;
          text-orientation:mixed!important;
          overflow:visible!important;
        }
        html.${PATCH_CLASS} #rankingsSection .ranking-section-subtitle-v136{
          display:block!important;
          width:268px!important;
          max-width:268px!important;
          margin:9px 0 0 52px!important;
          padding:0!important;
          color:#8f9ab4!important;
          font-size:.72rem!important;
          line-height:1.48!important;
          font-weight:520!important;
          letter-spacing:0!important;
          text-align:left!important;
          white-space:normal!important;
          word-break:normal!important;
          overflow-wrap:normal!important;
        }
        html.${PATCH_CLASS} #rankingsSection > .ranking-toolbar-v136{
          align-self:start!important;
          margin-top:0!important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function ensureKicker(group, h2){
    if(!group || !h2) return;
    var kicker = group.querySelector('.' + KICKER_CLASS);
    if(!kicker){
      kicker = document.createElement('span');
      kicker.className = KICKER_CLASS;
      kicker.textContent = 'Rankings';
      group.insertBefore(kicker, h2);
    }
  }

  function applyDesktop(){
    /* v706 — o header de Rankings já nasce na geometria final pelo HTML/CSS.
       Não aplicar estilos inline/timers legados no desktop. */
    if(document.documentElement.classList.contains('ranking-stable-final-v706')){
      var oldKickerV706 = document.querySelector('#rankingsSection .ranking-kicker-v688');
      if(oldKickerV706) oldKickerV706.remove();
      document.documentElement.classList.remove(PATCH_CLASS);
      return;
    }

    /* v701 — compatibilidade para builds anteriores */
    if(document.documentElement.classList.contains('desktop-ranking-compact-v701')){
      var oldKicker = document.querySelector('#rankingsSection .ranking-kicker-v688');
      if(oldKicker) oldKicker.remove();
      document.documentElement.classList.remove(PATCH_CLASS);
      return;
    }

    var section = document.getElementById('rankingsSection');
    if(!section) return;

    document.documentElement.classList.add(PATCH_CLASS);
    ensureStyle();

    var head = section.querySelector(':scope > .ranking-head');
    var group = head && head.querySelector('.ranking-title-group');
    var h2 = group && group.querySelector('h2.ranking-title-hero-v305, h2.section-hero-premium-v306, h2');
    var icon = h2 && h2.querySelector('.section-title-icon-v302, .section-title-icon-v300');
    var text = h2 && h2.querySelector('.section-title-text-v302, .section-title-text-v300, span:last-child');
    var subtitle = group && group.querySelector('.ranking-section-subtitle-v136');
    var toolbar = section.querySelector(':scope > .ranking-toolbar-v136');
    if(!head || !group || !h2 || !text) return;

    ensureKicker(group, h2);

    // Reforço inline contra patches antigos com !important.
    setImp(head, 'align-self', 'start');
    setImp(head, 'justify-self', 'start');
    setImp(head, 'width', '320px');
    setImp(head, 'min-width', '300px');
    setImp(head, 'max-width', '340px');
    setImp(head, 'margin', '0');
    setImp(head, 'padding', '12px 0 0 4px');
    setImp(head, 'overflow', 'visible');

    setImp(group, 'display', 'block');
    setImp(group, 'width', '100%');
    setImp(group, 'max-width', '100%');
    setImp(group, 'margin', '0');
    setImp(group, 'padding', '0');
    setImp(group, 'text-align', 'left');
    setImp(group, 'overflow', 'visible');

    setImp(h2, 'position', 'relative');
    setImp(h2, 'display', 'flex');
    setImp(h2, 'flex-direction', 'row');
    setImp(h2, 'flex-wrap', 'nowrap');
    setImp(h2, 'align-items', 'center');
    setImp(h2, 'justify-content', 'flex-start');
    setImp(h2, 'gap', '12px');
    setImp(h2, 'width', 'max-content');
    setImp(h2, 'min-width', '0');
    setImp(h2, 'max-width', 'none');
    setImp(h2, 'margin', '0');
    setImp(h2, 'padding', '0');
    setImp(h2, 'white-space', 'nowrap');
    setImp(h2, 'overflow', 'visible');
    setImp(h2, 'text-align', 'left');

    if(icon){
      setImp(icon, 'position', 'static');
      setImp(icon, 'inset', 'auto');
      setImp(icon, 'transform', 'none');
      setImp(icon, 'translate', 'none');
      setImp(icon, 'display', 'inline-flex');
      setImp(icon, 'align-items', 'center');
      setImp(icon, 'justify-content', 'center');
      setImp(icon, 'width', '40px');
      setImp(icon, 'height', '40px');
      setImp(icon, 'min-width', '40px');
      setImp(icon, 'max-width', '40px');
      setImp(icon, 'flex', '0 0 40px');
      setImp(icon, 'margin', '0');
      setImp(icon, 'border-radius', '11px');
      setImp(icon, 'background', 'linear-gradient(145deg, rgba(200,151,58,.16), rgba(14,18,32,.94))');
      setImp(icon, 'border', '1px solid rgba(232,187,106,.38)');
      setImp(icon, 'box-shadow', 'inset 0 1px 0 rgba(255,255,255,.06), 0 8px 18px rgba(0,0,0,.22)');
      setImp(icon, 'font-size', '1.02rem');
      setImp(icon, 'line-height', '1');
    }

    setImp(text, 'position', 'static');
    setImp(text, 'transform', 'none');
    setImp(text, 'display', 'block');
    setImp(text, 'width', 'auto');
    setImp(text, 'min-width', 'max-content');
    setImp(text, 'max-width', 'none');
    setImp(text, 'margin', '0');
    setImp(text, 'padding', '0');
    setImp(text, 'color', '#f5f7fb');
    setImp(text, 'font-size', '1.46rem');
    setImp(text, 'line-height', '1.08');
    setImp(text, 'font-weight', '820');
    setImp(text, 'letter-spacing', '-0.035em');
    setImp(text, 'white-space', 'nowrap');
    setImp(text, 'word-break', 'normal');
    setImp(text, 'overflow-wrap', 'normal');
    setImp(text, 'hyphens', 'none');
    setImp(text, 'writing-mode', 'horizontal-tb');
    setImp(text, 'overflow', 'visible');

    if(subtitle){
      setImp(subtitle, 'display', 'block');
      setImp(subtitle, 'width', '268px');
      setImp(subtitle, 'max-width', '268px');
      setImp(subtitle, 'margin', '9px 0 0 52px');
      setImp(subtitle, 'padding', '0');
      setImp(subtitle, 'white-space', 'normal');
      setImp(subtitle, 'word-break', 'normal');
      setImp(subtitle, 'overflow-wrap', 'normal');
      setImp(subtitle, 'color', '#8f9ab4');
      setImp(subtitle, 'font-size', '.72rem');
      setImp(subtitle, 'line-height', '1.48');
      setImp(subtitle, 'font-weight', '520');
      setImp(subtitle, 'text-align', 'left');
    }

    if(toolbar){
      setImp(toolbar, 'align-self', 'start');
      setImp(toolbar, 'margin-top', '0');
      // Mantém largura/grid definidos pelas versões anteriores, que já estavam corretos.
    }

    var badge = group.querySelector('.section-badge');
    if(badge) setImp(badge, 'display', 'none');

    var meta = document.querySelector('meta[name="app-build"]');
    if(meta) meta.content = 'ELTAUM_DESKTOP_RANKING_HEADER_SAFE_V688';
  }

  function removeDesktopOverrides(){
    document.documentElement.classList.remove(PATCH_CLASS);
    var section = document.getElementById('rankingsSection');
    if(!section) return;
    var kicker = section.querySelector('.' + KICKER_CLASS);
    if(kicker) kicker.remove();
    // Não remove estilos de patches legados; o v688 só é aplicado em desktop.
  }

  function apply(){
    if(isDesktop()) applyDesktop();
    else removeDesktopOverrides();
  }

  function boot(){
    apply();
    window.addEventListener('resize', function(){ requestAnimationFrame(apply); }, {passive:true});
    window.addEventListener('pageshow', apply, {passive:true});
    [80,240,600,1200,2200,4200,7600,12500].forEach(function(ms){ setTimeout(apply, ms); });
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, {once:true});
  else boot();
})();


/* PATCH v689 — Seletor de mês Selic consistente entre Chrome e Firefox (desktop) */
(function desktopSelicMonthPickerV689(){
  'use strict';
  var PATCH_CLASS = 'desktop-selic-month-picker-v689';
  var STYLE_ID = 'desktop-selic-month-picker-v689-style';
  var MONTHS = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
  var MONTHS_LONG = ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];

  function isDesktop(){
    return !window.matchMedia || window.matchMedia('(min-width: 769px)').matches;
  }

  function monthKey(year, monthIndex){
    return String(year) + '-' + String(monthIndex + 1).padStart(2,'0');
  }

  function parseKey(value){
    var m = String(value || '').match(/^(\d{4})-(\d{2})$/);
    if(!m) return null;
    var year = Number(m[1]);
    var month = Number(m[2]);
    if(!Number.isFinite(year) || month < 1 || month > 12) return null;
    return {year:year, month:month - 1};
  }

  function formatPt(value){
    var parsed = parseKey(value);
    if(!parsed) return 'Selecionar mês';
    return MONTHS_LONG[parsed.month] + ' de ' + parsed.year;
  }

  function withinBounds(input, key){
    var min = input.min || '';
    var max = input.max || '';
    if(min && key < min) return false;
    if(max && key > max) return false;
    return true;
  }

  function clampYear(input, year){
    var min = parseKey(input.min);
    var max = parseKey(input.max);
    if(min && year < min.year) year = min.year;
    if(max && year > max.year) year = max.year;
    return year;
  }

  function ensureStyle(){
    if(document.getElementById(STYLE_ID)) return;
    var style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      @media (min-width:769px){
        html.${PATCH_CLASS} #selicCustomStartV596,
        html.${PATCH_CLASS} #selicCustomEndV596{
          position:absolute!important;
          width:1px!important;
          height:1px!important;
          min-width:1px!important;
          max-width:1px!important;
          padding:0!important;
          margin:-1px!important;
          border:0!important;
          opacity:0!important;
          pointer-events:none!important;
          clip:rect(0 0 0 0)!important;
          clip-path:inset(50%)!important;
          overflow:hidden!important;
          white-space:nowrap!important;
        }
        html.${PATCH_CLASS} .selic-month-field-v689{
          position:relative!important;
          display:inline-flex!important;
          align-items:center!important;
          min-width:0!important;
        }
        html.${PATCH_CLASS} .selic-month-display-v689{
          appearance:none!important;
          -webkit-appearance:none!important;
          display:inline-flex!important;
          align-items:center!important;
          justify-content:space-between!important;
          gap:12px!important;
          width:166px!important;
          min-width:166px!important;
          height:38px!important;
          padding:0 11px 0 12px!important;
          border:1px solid rgba(148,163,184,.16)!important;
          border-radius:11px!important;
          background:rgba(8,12,24,.76)!important;
          color:#dce4f4!important;
          box-shadow:inset 0 1px 0 rgba(255,255,255,.018)!important;
          font:700 .69rem/1 Inter,ui-sans-serif,system-ui,sans-serif!important;
          letter-spacing:-.01em!important;
          text-align:left!important;
          white-space:nowrap!important;
          cursor:pointer!important;
          outline:none!important;
          transition:border-color .15s ease,background .15s ease,box-shadow .15s ease!important;
        }
        html.${PATCH_CLASS} .selic-month-display-v689:hover{
          border-color:rgba(200,151,58,.35)!important;
          background:rgba(11,16,30,.92)!important;
        }
        html.${PATCH_CLASS} .selic-month-display-v689:focus-visible,
        html.${PATCH_CLASS} .selic-month-display-v689[aria-expanded="true"]{
          border-color:rgba(232,187,106,.60)!important;
          box-shadow:0 0 0 2px rgba(200,151,58,.10),inset 0 1px 0 rgba(255,255,255,.03)!important;
        }
        html.${PATCH_CLASS} .selic-month-display-text-v689{
          display:block!important;
          overflow:hidden!important;
          text-overflow:ellipsis!important;
          white-space:nowrap!important;
        }
        html.${PATCH_CLASS} .selic-month-display-icon-v689{
          flex:0 0 auto!important;
          color:#9ba7bf!important;
          font-size:.82rem!important;
          line-height:1!important;
        }
        html.${PATCH_CLASS} .selic-month-popover-v689{
          position:absolute!important;
          z-index:100000!important;
          top:calc(100% + 7px)!important;
          right:0!important;
          width:274px!important;
          padding:12px!important;
          border:1px solid rgba(200,151,58,.28)!important;
          border-radius:14px!important;
          background:#101522!important;
          color:#eef2fb!important;
          box-shadow:0 18px 50px rgba(0,0,0,.48),inset 0 1px 0 rgba(255,255,255,.035)!important;
          font-family:Inter,ui-sans-serif,system-ui,sans-serif!important;
        }
        html.${PATCH_CLASS} .selic-month-popover-v689[hidden]{display:none!important;}
        html.${PATCH_CLASS} .selic-month-yearbar-v689{
          display:grid!important;
          grid-template-columns:32px 1fr 32px!important;
          align-items:center!important;
          gap:8px!important;
          padding:0 0 10px!important;
          margin:0 0 10px!important;
          border-bottom:1px solid rgba(148,163,184,.14)!important;
        }
        html.${PATCH_CLASS} .selic-month-year-v689{
          color:#f0c777!important;
          font-size:.78rem!important;
          font-weight:850!important;
          text-align:center!important;
          letter-spacing:.02em!important;
        }
        html.${PATCH_CLASS} .selic-month-nav-v689{
          appearance:none!important;
          width:32px!important;
          height:30px!important;
          display:inline-flex!important;
          align-items:center!important;
          justify-content:center!important;
          padding:0!important;
          border:1px solid rgba(148,163,184,.14)!important;
          border-radius:8px!important;
          background:#0b1020!important;
          color:#aeb8ce!important;
          cursor:pointer!important;
          font-size:.95rem!important;
        }
        html.${PATCH_CLASS} .selic-month-nav-v689:hover:not(:disabled){
          border-color:rgba(200,151,58,.38)!important;
          color:#f0c777!important;
        }
        html.${PATCH_CLASS} .selic-month-nav-v689:disabled{opacity:.30!important;cursor:default!important;}
        html.${PATCH_CLASS} .selic-month-grid-v689{
          display:grid!important;
          grid-template-columns:repeat(4,1fr)!important;
          gap:7px!important;
        }
        html.${PATCH_CLASS} .selic-month-option-v689{
          appearance:none!important;
          height:34px!important;
          padding:0!important;
          border:1px solid transparent!important;
          border-radius:8px!important;
          background:transparent!important;
          color:#c2cadc!important;
          font-size:.70rem!important;
          font-weight:700!important;
          text-transform:lowercase!important;
          cursor:pointer!important;
        }
        html.${PATCH_CLASS} .selic-month-option-v689:hover:not(:disabled){
          border-color:rgba(200,151,58,.30)!important;
          background:rgba(200,151,58,.08)!important;
          color:#f1d08b!important;
        }
        html.${PATCH_CLASS} .selic-month-option-v689.is-selected{
          border-color:rgba(232,187,106,.62)!important;
          background:linear-gradient(180deg,rgba(200,151,58,.22),rgba(200,151,58,.09))!important;
          color:#f5d48a!important;
          box-shadow:inset 0 1px 0 rgba(255,255,255,.05)!important;
        }
        html.${PATCH_CLASS} .selic-month-option-v689:disabled{
          opacity:.28!important;
          cursor:default!important;
        }
        html.${PATCH_CLASS} .selic-month-actions-v689{
          display:flex!important;
          align-items:center!important;
          justify-content:space-between!important;
          gap:10px!important;
          margin-top:11px!important;
          padding-top:10px!important;
          border-top:1px solid rgba(148,163,184,.14)!important;
        }
        html.${PATCH_CLASS} .selic-month-action-v689{
          appearance:none!important;
          border:0!important;
          background:transparent!important;
          color:#91b7ff!important;
          padding:4px 2px!important;
          font-size:.68rem!important;
          font-weight:700!important;
          cursor:pointer!important;
        }
        html.${PATCH_CLASS} .selic-month-action-v689:hover{color:#c8d9ff!important;}
      }
    `;
    document.head.appendChild(style);
  }

  function closeAll(except){
    document.querySelectorAll('.selic-month-popover-v689').forEach(function(pop){
      if(pop !== except) pop.hidden = true;
    });
    document.querySelectorAll('.selic-month-display-v689').forEach(function(btn){
      var pop = btn.parentElement && btn.parentElement.querySelector('.selic-month-popover-v689');
      btn.setAttribute('aria-expanded', String(Boolean(pop && !pop.hidden)));
    });
  }

  function buildPicker(input){
    if(!input || input.dataset.selicMonthPickerV689 === '1') return;
    var label = input.closest('label');
    if(!label) return;

    input.dataset.selicMonthPickerV689 = '1';

    var field = document.createElement('span');
    field.className = 'selic-month-field-v689';

    var display = document.createElement('button');
    display.type = 'button';
    display.className = 'selic-month-display-v689';
    display.setAttribute('aria-haspopup','dialog');
    display.setAttribute('aria-expanded','false');
    display.setAttribute('aria-label', (input.id === 'selicCustomStartV596' ? 'Mês inicial' : 'Mês final'));
    display.innerHTML = '<span class="selic-month-display-text-v689"></span><span class="selic-month-display-icon-v689" aria-hidden="true">▣</span>';

    var pop = document.createElement('div');
    pop.className = 'selic-month-popover-v689';
    pop.hidden = true;
    pop.setAttribute('role','dialog');
    pop.setAttribute('aria-label','Selecionar mês e ano');
    pop.innerHTML = `
      <div class="selic-month-yearbar-v689">
        <button type="button" class="selic-month-nav-v689" data-dir="-1" aria-label="Ano anterior">‹</button>
        <strong class="selic-month-year-v689"></strong>
        <button type="button" class="selic-month-nav-v689" data-dir="1" aria-label="Próximo ano">›</button>
      </div>
      <div class="selic-month-grid-v689"></div>
      <div class="selic-month-actions-v689">
        <button type="button" class="selic-month-action-v689" data-action="clear">Limpar</button>
        <button type="button" class="selic-month-action-v689" data-action="today">Este mês</button>
      </div>`;

    input.parentNode.insertBefore(field, input.nextSibling);
    field.appendChild(display);
    field.appendChild(pop);

    var view = parseKey(input.value) || parseKey(input.max) || parseKey(input.min) || {year:(new Date()).getFullYear(), month:(new Date()).getMonth()};
    var viewYear = view.year;

    function syncDisplay(){
      var text = display.querySelector('.selic-month-display-text-v689');
      if(text) text.textContent = formatPt(input.value);
      display.title = input.value ? formatPt(input.value) : 'Selecionar mês';
      if(!pop.hidden) renderGrid();
    }

    function renderGrid(){
      viewYear = clampYear(input, viewYear);
      var yearLabel = pop.querySelector('.selic-month-year-v689');
      var grid = pop.querySelector('.selic-month-grid-v689');
      var selected = parseKey(input.value);
      if(yearLabel) yearLabel.textContent = String(viewYear);
      if(grid){
        grid.innerHTML = MONTHS.map(function(name, idx){
          var key = monthKey(viewYear, idx);
          var disabled = !withinBounds(input, key);
          var isSelected = selected && selected.year === viewYear && selected.month === idx;
          return '<button type="button" class="selic-month-option-v689' + (isSelected ? ' is-selected' : '') + '" data-month="' + idx + '"' + (disabled ? ' disabled' : '') + '>' + name + '</button>';
        }).join('');
      }
      var min = parseKey(input.min), max = parseKey(input.max);
      var prev = pop.querySelector('[data-dir="-1"]');
      var next = pop.querySelector('[data-dir="1"]');
      if(prev) prev.disabled = Boolean(min && viewYear <= min.year);
      if(next) next.disabled = Boolean(max && viewYear >= max.year);
    }

    function setValue(key){
      if(key && !withinBounds(input, key)) return;
      input.value = key || '';
      input.dispatchEvent(new Event('input', {bubbles:true}));
      input.dispatchEvent(new Event('change', {bubbles:true}));
      syncDisplay();
    }

    display.addEventListener('click', function(ev){
      ev.preventDefault();
      ev.stopPropagation();
      var willOpen = pop.hidden;
      closeAll(willOpen ? pop : null);
      pop.hidden = !willOpen;
      display.setAttribute('aria-expanded', String(willOpen));
      if(willOpen){
        var current = parseKey(input.value) || parseKey(input.max) || parseKey(input.min);
        if(current) viewYear = current.year;
        renderGrid();
      }
    });

    pop.addEventListener('click', function(ev){
      ev.stopPropagation();
      var nav = ev.target.closest('[data-dir]');
      if(nav){
        viewYear = clampYear(input, viewYear + Number(nav.dataset.dir || 0));
        renderGrid();
        return;
      }
      var monthBtn = ev.target.closest('[data-month]');
      if(monthBtn && !monthBtn.disabled){
        var idx = Number(monthBtn.dataset.month);
        setValue(monthKey(viewYear, idx));
        pop.hidden = true;
        display.setAttribute('aria-expanded','false');
        display.focus();
        return;
      }
      var action = ev.target.closest('[data-action]');
      if(action){
        if(action.dataset.action === 'clear'){
          setValue('');
          pop.hidden = true;
          display.setAttribute('aria-expanded','false');
          display.focus();
        }else if(action.dataset.action === 'today'){
          var now = new Date();
          var key = monthKey(now.getFullYear(), now.getMonth());
          var min = input.min || '', max = input.max || '';
          if(min && key < min) key = min;
          if(max && key > max) key = max;
          setValue(key);
          pop.hidden = true;
          display.setAttribute('aria-expanded','false');
          display.focus();
        }
      }
    });

    input.addEventListener('input', syncDisplay);
    input.addEventListener('change', syncDisplay);
    input._selicMonthPickerSyncV689 = syncDisplay;
    syncDisplay();
  }

  function syncAll(){
    if(!isDesktop()) return;
    document.documentElement.classList.add(PATCH_CLASS);
    ensureStyle();
    ['selicCustomStartV596','selicCustomEndV596'].forEach(function(id){
      var input = document.getElementById(id);
      if(!input) return;
      buildPicker(input);
      if(typeof input._selicMonthPickerSyncV689 === 'function') input._selicMonthPickerSyncV689();
    });
    var meta = document.querySelector('meta[name="app-build"]');
    if(meta) meta.content = 'ELTAUM_DESKTOP_SELIC_MONTH_PICKER_V689';
  }

  function removeDesktop(){
    document.documentElement.classList.remove(PATCH_CLASS);
    closeAll(null);
  }

  document.addEventListener('click', function(ev){
    if(!ev.target.closest('.selic-month-field-v689')) closeAll(null);
  });
  document.addEventListener('keydown', function(ev){
    if(ev.key === 'Escape') closeAll(null);
  });

  function boot(){
    syncAll();
    window.addEventListener('resize', function(){
      if(isDesktop()) syncAll(); else removeDesktop();
    }, {passive:true});
    window.addEventListener('pageshow', syncAll, {passive:true});
    [100,300,700,1400,2600,5000,9000].forEach(function(ms){ setTimeout(syncAll, ms); });
    setInterval(function(){ if(isDesktop()) syncAll(); }, 4000);
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, {once:true});
  else boot();
})();

/* PATCH v690 — Sincroniza DE/ATÉ da Selic com os presets de período (desktop) */
(function desktopSelicPresetPeriodSyncV690(){
  'use strict';

  var PATCH_CLASS = 'desktop-selic-preset-period-sync-v690';

  function isDesktop(){
    return !window.matchMedia || window.matchMedia('(min-width: 769px)').matches;
  }

  function monthKeyFromDate(dt){
    if(!(dt instanceof Date) || isNaN(dt.getTime())) return '';
    return String(dt.getFullYear()) + '-' + String(dt.getMonth() + 1).padStart(2, '0');
  }

  function validRows(){
    var state = window.__ECON_DASH_STATE_V378__ || (typeof econDashStateV378 !== 'undefined' ? econDashStateV378 : null);
    var rows = state && Array.isArray(state.selicNorm) ? state.selicNorm : [];
    return rows
      .filter(function(item){ return item && item._dt instanceof Date && !isNaN(item._dt.getTime()); })
      .sort(function(a,b){ return a._dt.getTime() - b._dt.getTime(); });
  }

  function setInputValue(input, value){
    if(!input || !value) return;
    if(input.min && value < input.min) value = input.min;
    if(input.max && value > input.max) value = input.max;
    input.value = value;
    if(typeof input._selicMonthPickerSyncV689 === 'function'){
      input._selicMonthPickerSyncV689();
    }
  }

  function syncFromRange(rangeOverride){
    if(!isDesktop()) return;

    var startInput = document.getElementById('selicCustomStartV596');
    var endInput = document.getElementById('selicCustomEndV596');
    if(!startInput || !endInput) return;

    var rows = validRows();
    if(!rows.length) return;

    var firstDate = rows[0]._dt;
    var lastDate = rows[rows.length - 1]._dt;
    var firstKey = monthKeyFromDate(firstDate);
    var lastKey = monthKeyFromDate(lastDate);
    if(!firstKey || !lastKey) return;

    // Mantém os limites reais da série nos inputs ocultos.
    startInput.min = firstKey;
    endInput.min = firstKey;
    startInput.max = lastKey;
    endInput.max = lastKey;

    var state = window.__ECON_DASH_STATE_V378__ || (typeof econDashStateV378 !== 'undefined' ? econDashStateV378 : null);
    var range = rangeOverride != null ? rangeOverride : (state && state.range ? state.range.selic : 'all');

    // Período personalizado é controlado diretamente pelos campos + botão Aplicar.
    if(String(range) === 'custom'){
      if(typeof startInput._selicMonthPickerSyncV689 === 'function') startInput._selicMonthPickerSyncV689();
      if(typeof endInput._selicMonthPickerSyncV689 === 'function') endInput._selicMonthPickerSyncV689();
      return;
    }

    var startDate;
    if(String(range) === 'all'){
      startDate = new Date(firstDate.getFullYear(), firstDate.getMonth(), 1);
    }else if(String(range) === 'ytd'){
      startDate = new Date(lastDate.getFullYear(), 0, 1);
    }else{
      var months = Number(range);
      if(!Number.isFinite(months) || months <= 0) months = 12;
      // Replica a mesma regra usada por econSelicVisibleRowsV381:
      // 36 meses a partir de ago/2026 => ago/2023, por exemplo.
      startDate = new Date(lastDate.getFullYear(), lastDate.getMonth() - months, 1);
      var floorDate = new Date(firstDate.getFullYear(), firstDate.getMonth(), 1);
      if(startDate < floorDate) startDate = floorDate;
    }

    setInputValue(startInput, monthKeyFromDate(startDate));
    setInputValue(endInput, lastKey);

    document.documentElement.classList.add(PATCH_CLASS);
    var meta = document.querySelector('meta[name="app-build"]');
    if(meta) meta.content = 'ELTAUM_DESKTOP_SELIC_PRESET_PERIOD_SYNC_V690';
  }

  function rangeFromButton(btn){
    if(!btn) return null;
    var raw = btn.dataset ? btn.dataset.dashRange : null;
    if(raw == null || raw === '') return null;
    if(raw === 'all' || raw === 'ytd' || raw === 'custom') return raw;
    var n = Number(raw);
    return Number.isFinite(n) ? n : raw;
  }

  document.addEventListener('click', function(ev){
    var btn = ev.target && ev.target.closest ? ev.target.closest('[data-dash-range-target="selic"]') : null;
    if(!btn) return;
    var range = rangeFromButton(btn);
    // O listener original do dashboard atualiza o gráfico no próprio botão.
    // Sincronizamos os campos logo depois, sem disparar change/input para não
    // transformar o preset selecionado em período "custom".
    requestAnimationFrame(function(){ syncFromRange(range); });
    setTimeout(function(){ syncFromRange(range); }, 80);
  }, false);

  function boot(){
    if(isDesktop()) syncFromRange();
    window.addEventListener('pageshow', function(){ if(isDesktop()) syncFromRange(); }, {passive:true});
    window.addEventListener('resize', function(){ if(isDesktop()) syncFromRange(); }, {passive:true});
    [120,350,800,1500,3000,6000].forEach(function(ms){
      setTimeout(function(){ if(isDesktop()) syncFromRange(); }, ms);
    });
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, {once:true});
  else boot();
})();

/* PATCH v691 — Selic KPI stability / anti-flicker desktop
   Mantém os valores visíveis durante a troca de período, evita placeholders
   transitórios e estabiliza largura tipográfica dos números/datas. */
(function desktopSelicKpiStabilityV691(){
  'use strict';

  var ROOT_CLASS = 'desktop-selic-kpi-stable-v691';
  var STYLE_ID = 'desktop-selic-kpi-stable-v691-style';
  var IDS = [
    'selicMaxResumo','selicMaxData',
    'selicMinResumo','selicMinData',
    'selicHojeResumo','selicHojeData'
  ];
  var lastGood = Object.create(null);
  var switchingUntil = 0;
  var settleTimer = null;

  function isDesktop(){
    return !window.matchMedia || window.matchMedia('(min-width: 769px)').matches;
  }

  function isTransient(text){
    var t = String(text == null ? '' : text).trim();
    return !t || t === '—' || t === '-' || /^nan\b/i.test(t) || /^undefined\b/i.test(t) || /^null\b/i.test(t);
  }

  function ensureStyle(){
    if(document.getElementById(STYLE_ID)) return;
    var style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      @media (min-width:769px){
        html.${ROOT_CLASS} #selicMaxResumo,
        html.${ROOT_CLASS} #selicMinResumo,
        html.${ROOT_CLASS} #selicHojeResumo,
        html.${ROOT_CLASS} #selicMaxData,
        html.${ROOT_CLASS} #selicMinData,
        html.${ROOT_CLASS} #selicHojeData{
          font-variant-numeric: tabular-nums!important;
          font-feature-settings: "tnum" 1!important;
          animation:none!important;
          transition:none!important;
          backface-visibility:hidden!important;
          transform:translateZ(0)!important;
        }
        html.${ROOT_CLASS} #selicMaxResumo,
        html.${ROOT_CLASS} #selicMinResumo,
        html.${ROOT_CLASS} #selicHojeResumo{
          display:inline-block!important;
          min-width:10.5ch!important;
          min-height:1.2em!important;
          white-space:nowrap!important;
        }
        html.${ROOT_CLASS} #selicMaxData,
        html.${ROOT_CLASS} #selicMinData,
        html.${ROOT_CLASS} #selicHojeData{
          display:block!important;
          min-width:10ch!important;
          min-height:1.15em!important;
          white-space:nowrap!important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function remember(){
    IDS.forEach(function(id){
      var el = document.getElementById(id);
      if(!el) return;
      var txt = String(el.textContent || '').trim();
      if(!isTransient(txt)) lastGood[id] = txt;
    });
  }

  function guardTransient(){
    if(Date.now() > switchingUntil) return;
    IDS.forEach(function(id){
      var el = document.getElementById(id);
      if(!el) return;
      var txt = String(el.textContent || '').trim();
      if(isTransient(txt) && lastGood[id]){
        el.textContent = lastGood[id];
      }else if(!isTransient(txt)){
        lastGood[id] = txt;
      }
    });
  }

  function finalCommit(){
    if(!isDesktop()) return;
    try{
      var state = window.__ECON_DASH_STATE_V378__ || (typeof econDashStateV378 !== 'undefined' ? econDashStateV378 : null);
      if(state && Array.isArray(state.selicNorm) && typeof econSelicVisibleRowsV381 === 'function' && typeof atualizarResumoSelicDashboardV378 === 'function'){
        var range = state.range ? state.range.selic : 'all';
        var rows = econSelicVisibleRowsV381(state.selicNorm, range).filter(function(x){ return !x._periodContextOnly; });
        atualizarResumoSelicDashboardV378(rows, state.mercado || window._dadosMercado || {});
        if(typeof econAtualizarSelicKpiLabelsV381 === 'function') econAtualizarSelicKpiLabelsV381(range);
      }
    }catch(e){
      console.warn('[v691 Selic KPI stability] final commit:', e);
    }
    remember();
  }

  function beginSwitch(){
    if(!isDesktop()) return;
    remember();
    switchingUntil = Date.now() + 420;
    clearTimeout(settleTimer);
    // Não apaga nem reduz opacidade: o valor anterior permanece estável até o
    // render final válido, evitando a sensação de erro/pisca.
    requestAnimationFrame(function(){
      guardTransient();
      requestAnimationFrame(guardTransient);
    });
    setTimeout(guardTransient, 35);
    setTimeout(guardTransient, 80);
    settleTimer = setTimeout(function(){
      finalCommit();
      switchingUntil = 0;
    }, 130);
  }

  function bindObserver(){
    var root = document.getElementById('mobileSelicV400');
    if(!root || root.dataset.selicKpiStableV691 === '1') return;
    root.dataset.selicKpiStableV691 = '1';
    if(window.MutationObserver){
      new MutationObserver(function(){
        if(Date.now() <= switchingUntil) guardTransient();
        else remember();
      }).observe(root, {subtree:true, childList:true, characterData:true});
    }
  }

  function boot(){
    if(!isDesktop()) return;
    document.documentElement.classList.add(ROOT_CLASS);
    ensureStyle();
    bindObserver();
    remember();
    var meta = document.querySelector('meta[name="app-build"]');
    if(meta) meta.content = 'ELTAUM_DESKTOP_SELIC_KPI_STABILITY_V691';
  }

  // Capture acontece antes do listener normal dos botões; guardamos o estado
  // visual atual e deixamos o dashboard calcular o novo período normalmente.
  document.addEventListener('click', function(ev){
    if(!isDesktop()) return;
    var target = ev.target && ev.target.closest ? ev.target.closest(
      '#mobileSelicV400 [data-dash-range-target="selic"], #selicCustomApplyV596'
    ) : null;
    if(target) beginSwitch();
  }, true);

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, {once:true});
  else boot();
  window.addEventListener('load', boot, {once:true});
  window.addEventListener('pageshow', boot, {passive:true});
  window.addEventListener('resize', function(){ if(isDesktop()) boot(); }, {passive:true});
})();


/* =========================================================
   PATCH v696 — Desktop: header estruturalmente estável
   - #lastUpdate nasce dentro de .brand-text no HTML;
   - v374 não cria host/timers/observer no desktop;
   - v435/v436/v437 deixam de executar no desktop;
   - o texto/data pode atualizar, mas o nó não troca de pai.
   ========================================================= */
(function desktopHeaderStableV696(){
  'use strict';
  const BUILD = 'ELTAUM_DESKTOP_HEADER_STABLE_V696';

  function enforce(){
    if(!(window.matchMedia && window.matchMedia('(min-width: 769px)').matches)) return;
    const html = document.documentElement;
    const header = document.querySelector('.site-header-clean');
    const brandText = header?.querySelector('.brand-text');
    const last = document.getElementById('lastUpdate');

    html.classList.add('desktop-header-stable-v696');

    if(brandText && last && last.parentElement !== brandText){
      brandText.appendChild(last);
    }

    last?.classList.remove('header-update-v374');
    document.querySelectorAll('.header-update-host-v374').forEach(host => {
      if(!host.textContent.trim()) host.remove();
    });

    const meta = document.querySelector('meta[name="app-build"]');
    if(meta) meta.content = BUILD;
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', enforce, {once:true});
  }else{
    enforce();
  }
  window.addEventListener('load', enforce, {once:true});

  window.__ELTAUM_DESKTOP_HEADER_STABLE_V696__ = {
    build: BUILD,
    enforce
  };

  console.info('[Catálogo CAIXA] Header desktop estável ativo:', BUILD);
})();


/* =========================================================
   PATCH v697 — Desktop: busca visualmente estável
   - trava geometria do campo via CSS crítico no index;
   - v440/v441/v442 não executam no desktop;
   - contador usa largura fixa, então sua atualização não comprime o input.
   ========================================================= */
(function desktopSearchStableV697(){
  'use strict';
  const BUILD = 'ELTAUM_DESKTOP_SEARCH_STABLE_V697';

  function apply(){
    if(!(window.matchMedia && window.matchMedia('(min-width: 769px)').matches)) return;

    document.documentElement.classList.add('desktop-search-stable-v697');

    const search = document.getElementById('searchInput');
    const result = document.getElementById('desktopFilterResultSummary');

    if(search){
      const desktopPlaceholder = 'Buscar fundo, CNPJ, benchmark ou liquidez...';
      if(search.getAttribute('placeholder') !== desktopPlaceholder){
        search.setAttribute('placeholder', desktopPlaceholder);
      }
      search.dataset.desktopSearchStableV697 = '1';
    }

    if(result && !result.textContent.trim()){
      result.textContent = '— fundos';
    }

    const meta = document.querySelector('meta[name="app-build"]');
    if(meta) meta.content = BUILD;
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', apply, {once:true});
  }else{
    apply();
  }
  window.addEventListener('load', apply, {once:true});

  window.__ELTAUM_DESKTOP_SEARCH_STABLE_V697__ = {
    build: BUILD,
    apply
  };

  console.info('[Catálogo CAIXA] Busca desktop estável ativa:', BUILD);
})();


/* =========================================================
   PATCH v698 — Desktop: busca limpa, sem contador redundante
   - remove o chip "N fundos" da barra de busca;
   - mantém a contagem no resumo oficial junto da tabela;
   - preserva a geometria estável criada na v697.
   ========================================================= */
(function desktopSearchCleanV698(){
  'use strict';
  const BUILD = 'ELTAUM_DESKTOP_SEARCH_CLEAN_V698';

  function apply(){
    if(!(window.matchMedia && window.matchMedia('(min-width: 769px)').matches)) return;

    document.documentElement.classList.add('desktop-search-clean-v698');

    const chip = document.getElementById('desktopFilterResultSummary');
    if(chip) chip.remove();

    const search = document.getElementById('searchInput');
    if(search){
      search.setAttribute('aria-describedby','filterResultSummary');
      search.dataset.desktopSearchCleanV698 = '1';
    }

    const meta = document.querySelector('meta[name="app-build"]');
    if(meta) meta.content = BUILD;
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', apply, {once:true});
  }else{
    apply();
  }
  window.addEventListener('load', apply, {once:true});

  window.__ELTAUM_DESKTOP_SEARCH_CLEAN_V698__ = {
    build: BUILD,
    apply
  };

  console.info('[Catálogo CAIXA] Busca desktop limpa ativa:', BUILD);
})();


/* PATCH v699 — marcador de build */
(function(){
  window.__ELTAUM_CATALOGO_V699__ = {
    build: 'ELTAUM_CATALOGO_UNIVERSO_V699',
    diagnostico: function(){
      return window.__ELTAUM_CATALOGO_UNIVERSO_V699__ || null;
    }
  };
})();


/* =========================================================
   PATCH v700 — Fund Detail Focus Mode
   - detalhe desktop é exclusivo;
   - mantém somente o fundo selecionado + painel;
   - filtros, busca, página e ordenação são preservados;
   - voltar/ESC restaura a lista sem perder o estado.
   ========================================================= */
(function fundDetailFocusModeV700(){
  'use strict';
  const BUILD='ELTAUM_FUND_DETAIL_FOCUS_V700';

  document.documentElement.classList.add('fund-detail-focus-ready-v700');

  window.__ELTAUM_FUND_DETAIL_FOCUS_V700__={
    build:BUILD,
    close:function(){
      try{ expandedRows.clear(); }catch(_){}
      try{ fundDetailFocusIdxV700=null; }catch(_){}
      document.body?.classList.remove('fund-detail-focus-v700');
      document.documentElement.classList.remove('fund-detail-focus-v700');
      try{ if(typeof render==='function') render(); }catch(_){}
    },
    state:function(){
      return {
        active:document.body?.classList.contains('fund-detail-focus-v700')||false,
        index:(typeof fundDetailFocusIdxV700!=='undefined'?fundDetailFocusIdxV700:null)
      };
    }
  };

  console.info('[Catálogo CAIXA] Modo foco dos detalhes ativo:',BUILD);
})();


/* =========================================================
   PATCH v701 — Rankings compactos / hierarquia final
   ========================================================= */
(function rankingCompactV701(){
  'use strict';
  const BUILD='ELTAUM_RANKING_COMPACT_V701';

  function apply(){
    if(!(window.matchMedia && window.matchMedia('(min-width:769px)').matches)) return;

    /* v706 já define a estrutura final desde o primeiro frame. */
    if(document.documentElement.classList.contains('ranking-stable-final-v706')) return;

    document.documentElement.classList.add('desktop-ranking-compact-v701');

    document.querySelectorAll('#rankingsSection .ranking-kicker-v688').forEach(el=>el.remove());

    const text=document.querySelector('#rankingsSection .section-title-text-v302');
    if(text && text.textContent.trim()!=='Rankings de fundos'){
      text.textContent='Rankings de fundos';
    }

    const subtitle=document.querySelector('#rankingsSection .ranking-section-subtitle-v136');
    if(subtitle && subtitle.textContent.trim()!=='Compare por período, universo, categoria e risco.'){
      subtitle.textContent='Compare por período, universo, categoria e risco.';
    }

    const meta=document.querySelector('meta[name="app-build"]');
    if(meta) meta.content=BUILD;
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',apply,{once:true});
  }else{
    apply();
  }
  window.addEventListener('load',apply,{once:true});
  [250,900,1900,4200,8000,13000].forEach(ms=>setTimeout(apply,ms));

  window.__ELTAUM_RANKING_COMPACT_V701__={build:BUILD,apply};

  console.info('[Catálogo CAIXA] Rankings compactos ativos:',BUILD);
})();


/* =========================================================
   PATCH v706 — estabilizador final dos Rankings
   ========================================================= */
(function rankingStableFinalV706(){
  'use strict';
  const BUILD='ELTAUM_RANKING_STABLE_FINAL_V706';

  function clearLegacyInline(){
    const section=document.getElementById('rankingsSection');
    if(!section) return;

    const nodes=[
      section.querySelector(':scope > .ranking-head'),
      section.querySelector('.ranking-title-group'),
      section.querySelector('h2.ranking-title-hero-v305'),
      section.querySelector('.section-title-icon-v302'),
      section.querySelector('.section-title-text-v302'),
      section.querySelector('.ranking-section-subtitle-v136'),
      section.querySelector(':scope > .ranking-toolbar-v136')
    ].filter(Boolean);

    const props=[
      'align-self','justify-self','width','min-width','max-width',
      'height','min-height','max-height','margin','padding','overflow',
      'display','position','inset','top','right','bottom','left',
      'transform','translate','flex-direction','flex-wrap','align-items',
      'justify-content','gap','order','text-align','white-space'
    ];

    nodes.forEach(el=>props.forEach(prop=>el.style.removeProperty(prop)));

    document.querySelectorAll('#rankingsSection .ranking-kicker-v688').forEach(el=>el.remove());
  }

  function apply(){
    document.documentElement.classList.add('ranking-stable-final-v706');
    clearLegacyInline();

    const meta=document.querySelector('meta[name="app-build"]');
    if(meta) meta.content=BUILD;
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',apply,{once:true});
  }else{
    apply();
  }
  window.addEventListener('load',apply,{once:true});

  window.__ELTAUM_RANKING_STABLE_FINAL_V706__={
    build:BUILD,
    apply,
    state:function(){
      const s=document.getElementById('rankingsSection');
      const t=s?.querySelector(':scope > .ranking-toolbar-v136');
      const r=s?.querySelector('.ranking-risk-control-v198');
      return {
        sectionWidth:s ? Math.round(s.getBoundingClientRect().width) : null,
        toolbarHeight:t ? Math.round(t.getBoundingClientRect().height) : null,
        riskWidth:r ? Math.round(r.getBoundingClientRect().width) : null
      };
    }
  };

  console.info('[Catálogo CAIXA] Rankings estáveis ativos:',BUILD);
})();


/* =========================================================
   V726 — Desktop Ranking Sanitation
   Uma única autoridade de renderização (v562), sem cascatas temporizadas.
   ========================================================= */
window.__ELTAUM_RANKING_SANITIZED_V726__ = {
  build:'ELTAUM_RANKING_SANITIZED_V726',
  renderer:function(){ return window.renderRankings === window.__renderRankingsV562 ? 'v562' : 'other'; },
  desktop:function(){ return !window.matchMedia || window.matchMedia('(min-width:769px)').matches; }
};

/* =========================================================
   PRODUÇÃO v720 — Selic simplificada
   - padrão 10 anos
   - custom range avançado
   - KPI vigente primeiro
   - máxima/mínima no período
   - legenda sem duplicar Selic atual
   ========================================================= */
window.__ELTAUM_SELIC_PROD_V720__ = {
  build: 'ELTAUM_SELIC_PROD_V720',
  defaultRange: 120
};
console.info('[Catálogo CAIXA] Selic oficial v720 ativo');


/* =========================================================
   PRODUÇÃO v720 — Selic KPI atomic switch
   ---------------------------------------------------------
   Problema observado:
   durante a troca de período, rotinas legadas escrevem valores/datas
   válidos em momentos diferentes. O navegador pode pintar esses estados
   intermediários, gerando a sensação de "pisca".

   Estratégia:
   1) captura os 6 textos atuais antes do clique;
   2) congela visualmente esses textos enquanto o dashboard recalcula;
   3) calcula o estado final a partir do range já atualizado;
   4) publica valor + data dos 3 KPIs na mesma tarefa;
   5) por alguns ms, impede reescritas tardias de patches antigos.
   ========================================================= */
(function selicKpiAtomicSwitchV714(){
  'use strict';

  const BUILD = 'ELTAUM_SELIC_KPI_ATOMIC_V714';
  const IDS = [
    'selicHojeResumo','selicHojeData',
    'selicMaxResumo','selicMaxData',
    'selicMinResumo','selicMinData'
  ];

  let phase = 'idle'; // idle | freeze | settle
  let frozen = Object.create(null);
  let expected = Object.create(null);
  let restoring = false;
  let commitTimer = null;
  let releaseTimer = null;

  function root(){
    return document.getElementById('mobileSelicV400');
  }

  function txt(id){
    return String(document.getElementById(id)?.textContent || '').trim();
  }

  function snapshot(){
    const obj = Object.create(null);
    IDS.forEach(id => obj[id] = txt(id));
    return obj;
  }

  function applyMap(map){
    restoring = true;
    try{
      IDS.forEach(id => {
        const el = document.getElementById(id);
        if(!el) return;
        const value = map[id];
        if(value != null && el.textContent !== value) el.textContent = value;
      });
    }finally{
      restoring = false;
    }
  }

  function fmtPct(v){
    const n = Number(v);
    return Number.isFinite(n)
      ? `${n.toFixed(2).replace('.', ',')}% a.a.`
      : '—';
  }

  function fmtDate(dt){
    if(!dt) return '—';
    if(dt instanceof Date && !isNaN(dt.getTime())){
      return dt.toLocaleDateString('pt-BR');
    }
    let s = String(dt).trim().replace(/^desde\s+/i,'');
    const iso = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if(iso) return `${iso[3]}/${iso[2]}/${iso[1]}`;
    return s || '—';
  }

  function officialCurrent(mercado, fallbackRow){
    const card = mercado?.cards?.selic_meta || {};
    let value = NaN;

    try{
      value = window.selicOfficialPositiveV666?.(mercado);
    }catch(e){}

    if(!Number.isFinite(value)){
      try{
        value = typeof econNumberV378 === 'function'
          ? econNumberV378(card.valor ?? card.taxa ?? card.valor_atual)
          : Number(String(card.valor ?? card.taxa ?? card.valor_atual ?? '').replace('%','').replace(',','.'));
      }catch(e){}
    }

    if(!Number.isFinite(value)) value = Number(fallbackRow?._valor);

    let date = '';
    try{
      const ref = typeof resolverDataUltimaAlteracaoSelic === 'function'
        ? resolverDataUltimaAlteracaoSelic(mercado)
        : null;
      date = ref?.data
        || card.ultima_alteracao
        || card.data_ultima_alteracao
        || card.vigente_desde
        || card.data_ref
        || fallbackRow?._dt
        || '';
    }catch(e){
      date = fallbackRow?._dt || '';
    }

    return {
      value,
      date: date ? `desde ${fmtDate(date)}` : 'vigente'
    };
  }

  function computeFinal(){
    const state = window.__ECON_DASH_STATE_V378__;
    if(!state || !Array.isArray(state.selicNorm) || typeof econSelicVisibleRowsV381 !== 'function'){
      return snapshot();
    }

    const range = state.range?.selic ?? 120;
    const rows = econSelicVisibleRowsV381(state.selicNorm, range)
      .filter(row => !row._periodContextOnly && Number.isFinite(Number(row._valor)));

    if(!rows.length) return snapshot();

    const max = rows.reduce((a,b) => Number(b._valor) > Number(a._valor) ? b : a, rows[0]);
    const min = rows.reduce((a,b) => Number(b._valor) < Number(a._valor) ? b : a, rows[0]);
    const last = rows[rows.length - 1];
    const current = officialCurrent(state.mercado || window._dadosMercado || {}, last);

    return {
      selicHojeResumo: fmtPct(current.value),
      selicHojeData: current.date,
      selicMaxResumo: fmtPct(max._valor),
      selicMaxData: fmtDate(max._dt),
      selicMinResumo: fmtPct(min._valor),
      selicMinData: fmtDate(min._dt)
    };
  }

  function guard(){
    if(restoring || phase === 'idle') return;
    applyMap(phase === 'freeze' ? frozen : expected);
  }

  function commitFinal(){
    expected = computeFinal();
    phase = 'settle';

    // Uma única tarefa JS: valor e data dos três KPIs mudam juntos
    // antes de o navegador realizar a próxima pintura.
    applyMap(expected);

    try{
      const state = window.__ECON_DASH_STATE_V378__;
      if(state && typeof econAtualizarSelicKpiLabelsV381 === 'function'){
        econAtualizarSelicKpiLabelsV381(state.range?.selic ?? 120);
      }
    }catch(e){}

    clearTimeout(releaseTimer);
    releaseTimer = setTimeout(() => {
      applyMap(expected);
      phase = 'idle';
      root()?.classList.remove('selic-kpi-atomic-switch-v714');
      frozen = snapshot();
    }, 520);
  }

  function begin(){
    const r = root();
    if(!r) return;

    frozen = snapshot();
    expected = Object.create(null);
    phase = 'freeze';
    r.classList.add('selic-kpi-atomic-switch-v714');

    clearTimeout(commitTimer);
    clearTimeout(releaseTimer);

    // Espera o handler normal atualizar state.range e reconstruir o gráfico.
    // Até lá, qualquer escrita intermediária é revertida antes da pintura.
    commitTimer = setTimeout(commitFinal, 165);

    requestAnimationFrame(guard);
    setTimeout(guard, 0);
    setTimeout(guard, 50);
    setTimeout(guard, 110);
  }

  function bind(){
    const r = root();
    if(!r || r.dataset.selicAtomicV714 === '1') return;
    r.dataset.selicAtomicV714 = '1';

    if(window.MutationObserver){
      new MutationObserver(() => {
        if(phase !== 'idle') guard();
      }).observe(r, {
        subtree:true,
        childList:true,
        characterData:true
      });
    }

    // Capture: roda antes do handler normal do dashboard.
    r.addEventListener('click', ev => {
      const target = ev.target?.closest?.(
        '[data-dash-range-target="selic"], #selicCustomApplyV596'
      );
      if(target) begin();
    }, true);

    document.documentElement.classList.add('desktop-selic-atomic-v714');
    console.info('[Catálogo CAIXA] Selic KPI atomic switch ativo:', BUILD);
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', bind, {once:true});
  }else{
    bind();
  }

  window.addEventListener('load', bind, {once:true});

  window.__ELTAUM_SELIC_KPI_ATOMIC_V714__ = {
    build: BUILD,
    state: () => ({
      phase,
      range: window.__ECON_DASH_STATE_V378__?.range?.selic,
      frozen:{...frozen},
      expected:{...expected}
    })
  };
})();



/* V740: controlador V739 neutralizado; substituído pelo terminal V740. */


/* ============================================================
   V740 — Desktop: controlador terminal de Juros / CDI / Copom
   ------------------------------------------------------------
   Saneamento:
   - v647, v648 e v649 não disputam mais o mesmo DOM.
   - v574 não oculta mais #cdiYearHistory no desktop terminal.
   - renderCdiYearHistory é encapsulado: a base atualiza os dados e,
     na MESMA chamada, V740 aplica a semântica final antes do paint.
   - Copom é reconstruído apenas quando #copomMeetings muda.
   - Sem loops de setTimeout para "reassumir" a interface.
============================================================ */
(function desktopRatesTerminalV740(){
  const MQ = '(min-width: 769px)';
  const AGENDA_ID = 'desktopCopomAgendaV648';

  function isDesktop(){
    return !window.matchMedia || window.matchMedia(MQ).matches;
  }

  function clean(v){
    return String(v || '').replace(/\s+/g,' ').replace(/★/g,'').trim();
  }

  function esc(v){
    return String(v || '').replace(/[&<>"']/g, ch => ({
      '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
    }[ch]));
  }

  function setImp(el, prop, value){
    if(el?.style) el.style.setProperty(prop, value, 'important');
  }

  function kindFor(item, result){
    const cls = String(item?.className || '').toLowerCase();
    const txt = String(result || '').toLowerCase();
    if(cls.includes('next') || txt.includes('próxima') || txt.includes('proxima')) return 'is-next';
    if(cls.includes('future') || txt.includes('prevista')) return 'is-future';
    if(cls.includes('cut') || txt.includes('corte')) return 'is-cut';
    if(cls.includes('hike') || txt.includes('alta')) return 'is-hike';
    if(cls.includes('hold') || txt.includes('mantida') || txt.includes('mantido') || txt.includes('manutenção') || txt.includes('manutencao')) return 'is-hold';
    return 'is-neutral';
  }

  function extractRate(result){
    const r = clean(result);
    const arrow = r.match(/(?:→|->)\s*([0-9]{1,2}(?:[,.][0-9]{1,2})?%)/i);
    if(arrow) return arrow[1];
    const em = r.match(/\bem\s*([0-9]{1,2}(?:[,.][0-9]{1,2})?%)/i);
    return em ? em[1] : '';
  }

  function extractMove(result, kind){
    const r = clean(result).replace(/−/g,'-');
    const m = r.match(/(?:corte|alta)\s*([-+]?\d+(?:[,.]\d+)?)\s*p\.?p\.?/i);
    if(m) return `${kind === 'is-hike' ? 'Alta' : 'Corte'} ${m[1].replace('.',',')} p.p.`;
    if(kind === 'is-cut') return 'Corte';
    if(kind === 'is-hike') return 'Alta';
    return '';
  }

  function meetingData(item){
    const num = clean(item.querySelector('.copom-num')?.textContent)
      .replace(/\s*reuni[aã]o\b/i,'').trim() || 'Reunião';
    const date = clean(item.querySelector('.copom-date')?.textContent) || '—';
    const result = clean(item.querySelector('.copom-result')?.textContent);
    const kind = kindFor(item, result);
    const rate = extractRate(result);
    const move = extractMove(result, kind);
    let status='Status a confirmar', detail='—';
    if(kind==='is-next') { status='Próxima reunião'; detail='Aguardando decisão'; }
    else if(kind==='is-future') { status='Prevista'; detail='Sem decisão'; }
    else if(kind==='is-hold') { status='Mantida'; detail=rate ? `Selic ${rate}` : 'Sem alteração'; }
    else if(kind==='is-cut') { status=move || 'Corte'; detail=rate ? `Selic ${rate}` : 'Decisão realizada'; }
    else if(kind==='is-hike') { status=move || 'Alta'; detail=rate ? `Selic ${rate}` : 'Decisão realizada'; }
    else if(result) { status=result; detail=rate ? `Selic ${rate}` : 'Decisão realizada'; }
    return {num,date,result,kind,status,detail};
  }

  function ensureTopCard(summary, id, cls, label, value, note){
    let card = document.getElementById(id);
    if(!card){
      card = document.createElement('article');
      card.id = id;
      card.className = `rate-summary-card-v167 ${cls}`;
      card.setAttribute('role','group');
      summary.appendChild(card);
    }
    const html = `<span>${esc(label)}</span><div class="rate-summary-value-v167"><strong>${esc(value || '—')}</strong></div><small>${esc(note)}</small>`;
    if(card.dataset.htmlV740 !== html){
      card.dataset.htmlV740 = html;
      card.innerHTML = html;
    }
    return card;
  }

  function ensureGroupLabels(summary){
    let current = document.getElementById('ratesCurrentGroupLabelV739');
    if(!current){
      current = document.createElement('div');
      current.id = 'ratesCurrentGroupLabelV739';
      current.className = 'rates-group-label-v739 rates-current-label-v739';
      current.textContent = 'Nível atual';
      summary.prepend(current);
    }
    let accum = document.getElementById('ratesAccumGroupLabelV739');
    if(!accum){
      accum = document.createElement('div');
      accum.id = 'ratesAccumGroupLabelV739';
      accum.className = 'rates-group-label-v739 rates-accum-label-v739';
      accum.textContent = 'CDI acumulado';
      current.insertAdjacentElement('afterend', accum);
    }
  }

  function applyTextsAndCdi(){
    if(!isDesktop()) return;

    const title = document.getElementById('ratesReferenceTitleV167');
    if(title) title.textContent = 'Juros de referência';
    const subtitle = title?.closest('.market-reference-head-v167')?.querySelector('p');
    if(subtitle) subtitle.textContent = 'Selic, CDI e calendário Copom em uma visão operacional.';

    const summary = document.querySelector('#sec-mercado .rates-reference-v167 .rates-summary-v167');
    if(summary){
      ensureGroupLabels(summary);
      const year = clean(document.getElementById('cdiAccumYearValueV271')?.textContent) || '—';
      const m12 = clean(document.getElementById('cdiLast12mValueV296')?.textContent) || '—';
      ensureTopCard(summary,'ratesCdiYearSummaryV649','cdi-year-summary-v649','CDI em 2026',year,'Acumulado no ano');
      ensureTopCard(summary,'ratesCdi12mSummaryV649','cdi-12m-summary-v649','CDI em 12 meses',m12,'Acumulado em 12 meses');
    }

    const cdiNote = document.getElementById('cdiYearHistoryTotal');
    if(cdiNote) cdiNote.textContent = '≈ Selic − 0,10 p.p.';

    const copomTitle = document.getElementById('copomCompactTitleV167');
    if(copomTitle) copomTitle.textContent = 'Calendário Copom 2026';
    const copomSub = copomTitle?.closest('.reference-subhead-v167')?.querySelector('small');
    if(copomSub) copomSub.textContent = 'Decisões realizadas, próxima reunião e agenda restante.';

    const cdiTitle = document.getElementById('cdiYearHistoryTitle');
    if(cdiTitle) cdiTitle.textContent = 'CDI recente';
    const cdiSub = cdiTitle?.closest('.reference-subhead-v167')?.querySelector('small');
    if(cdiSub) cdiSub.textContent = 'Mês atual e último mês fechado.';

    const cdiBlock = document.getElementById('cdiYearHistory');
    if(cdiBlock){
      setImp(cdiBlock,'display','block');
      setImp(cdiBlock,'visibility','visible');
      setImp(cdiBlock,'height','auto');
      setImp(cdiBlock,'min-height','0');
      setImp(cdiBlock,'max-height','none');
      setImp(cdiBlock,'margin','0');
      setImp(cdiBlock,'padding','10px 12px 11px');
      setImp(cdiBlock,'border','');
      setImp(cdiBlock,'overflow','hidden');
    }

    const kpis = cdiBlock?.querySelector('.cdi-kpis-v271');
    if(kpis){
      setImp(kpis,'display','grid');
      setImp(kpis,'grid-template-columns','repeat(2,minmax(0,1fr))');
      setImp(kpis,'gap','8px');
      setImp(kpis,'margin','0');
      kpis.querySelectorAll('.is-total,.is-12m').forEach(el=>{
        setImp(el,'display','none');
        el.setAttribute('aria-hidden','true');
      });
      kpis.querySelectorAll('.is-current,.is-lastclosed').forEach(el=>{
        setImp(el,'display','block');
        setImp(el,'min-height','56px');
        setImp(el,'height','56px');
        setImp(el,'padding','9px 12px');
      });
    }

    ['cdiMonthCarouselV322'].forEach(id=>{
      const el=document.getElementById(id); if(el) setImp(el,'display','none');
    });
    cdiBlock?.querySelectorAll('.cdi-chart-canvas-wrap-v271,.cdi-chart-legend-v271,.reference-footnote-v167').forEach(el=>setImp(el,'display','none'));
  }

  function renderAgenda(){
    if(!isDesktop()) return;
    const copomBlock = document.querySelector('#sec-mercado .copom-compact-v167');
    const store = document.getElementById('copomMeetings');
    const subhead = copomBlock?.querySelector('.reference-subhead-v167');
    if(!copomBlock || !store) return;

    const items = [...store.querySelectorAll('.copom-item')]
      .sort((a,b)=>Number(a.dataset.originalOrder ?? 999)-Number(b.dataset.originalOrder ?? 999));
    if(!items.length) return;

    const legacy = document.getElementById('copomExecutiveSummaryV270');
    if(legacy){
      setImp(legacy,'display','none');
      legacy.setAttribute('aria-hidden','true');
    }

    let agenda = document.getElementById(AGENDA_ID);
    if(!agenda){
      agenda=document.createElement('div');
      agenda.id=AGENDA_ID;
      agenda.className='desktop-copom-agenda-v648';
      agenda.setAttribute('role','list');
      agenda.setAttribute('aria-label','Calendário das reuniões do Copom em 2026');
      subhead?.insertAdjacentElement('afterend',agenda);
    }

    const html = items.map((item,i)=>{
      const d=meetingData(item);
      const realized = d.kind!=='is-next' && d.kind!=='is-future' ? ' is-realized-v739' : '';
      const upcoming = d.kind==='is-next' ? ' is-upcoming-v739' : '';
      return `<article class="desktop-copom-card-v648 ${esc(d.kind)}${realized}${upcoming}" role="listitem" style="order:${i+1}">
        <span class="desktop-copom-num-v648">${esc(d.num)}</span>
        <strong class="desktop-copom-date-v648">${esc(d.date)}</strong>
        <span class="desktop-copom-status-v648">${esc(d.status)}</span>
        <small class="desktop-copom-detail-v648">${esc(d.detail)}</small>
      </article>`;
    }).join('');

    if(agenda.dataset.htmlV740 !== html){
      agenda.dataset.htmlV740=html;
      agenda.innerHTML=html;
    }
  }

  function apply(){
    if(!isDesktop()) return;
    document.documentElement.classList.remove(
      'desktop-market-hierarchy-v523',
      'desktop-rates-compact-v572',
      'desktop-rates-reference-slim-v575'
    );
    document.documentElement.classList.add(
      'desktop-rates-terminal-v740',
      'desktop-rates-executive-v739',
      'desktop-rates-final-v744'
    );
    applyTextsAndCdi();
    renderAgenda();
    const meta=document.querySelector('meta[name="app-build"]');
    if(meta) meta.content='ELTAUM_DESKTOP_RATES_TERMINAL_V740';
  }

  function wrapCdiRenderer(){
    try{
      if(typeof renderCdiYearHistory !== 'function' || renderCdiYearHistory.__v740Wrapped) return;
      const original=renderCdiYearHistory;
      const wrapped=function(){
        const out=original.apply(this,arguments);
        if(isDesktop()) applyTextsAndCdi();
        return out;
      };
      wrapped.__v740Wrapped=true;
      wrapped.__v740Original=original;
      renderCdiYearHistory=wrapped;
      try{ window.renderCdiYearHistory=wrapped; }catch(_){ }
    }catch(_){ }
  }

  function boot(){
    wrapCdiRenderer();
    apply();

    const store=document.getElementById('copomMeetings');
    if(store && !store.dataset.v740Observed && window.MutationObserver){
      store.dataset.v740Observed='1';
      let raf=0;
      new MutationObserver(()=>{
        cancelAnimationFrame(raf);
        raf=requestAnimationFrame(()=>{ renderAgenda(); applyTextsAndCdi(); });
      }).observe(store,{childList:true,subtree:true,characterData:true});
    }
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
  window.addEventListener('load',apply,{once:true});
  window.addEventListener('pageshow',apply,{passive:true});
  window.addEventListener('resize',apply,{passive:true});
})();


/* ============================================================
   V741 — Desktop: Poupança executiva
   ------------------------------------------------------------
   Objetivo:
   - deixar evidente que existem DUAS regras;
   - usar "Regra nova" e "Regra antiga";
   - remover redundâncias visuais;
   - resumir a condição da Selic em um único lugar;
   - manter o motor/data-bind original oculto no desktop;
   - adicionar UMA referência oficial do Banco Central.
   Mobile preservado.
============================================================ */
(function desktopSavingsExecutiveV741(){
  const MQ = '(min-width: 769px)';
  const BCB_RULES_URL = 'https://www.bcb.gov.br/acessoinformacao/legado?url=https:%2F%2Fwww.bcb.gov.br%2Fpec%2Fpoupanca%2Fpoupanca.asp';
  const BCB_CALC_URL = 'https://www3.bcb.gov.br/CALCIDADAO/publico/exibirFormCorrecaoValores.do?method=exibirFormCorrecaoValores';

  function isDesktop(){
    return !window.matchMedia || window.matchMedia(MQ).matches;
  }

  function clean(v){
    return String(v ?? '').replace(/\s+/g,' ').trim();
  }

  function parseNum(v){
    const s = clean(v).replace('%','').replace(/\./g,'').replace(',','.');
    const n = Number(s);
    return Number.isFinite(n) ? n : NaN;
  }

  function fmtPct(v, suffix='%'){
    const n = Number(v);
    if(!Number.isFinite(n)) return '—';
    return n.toFixed(2).replace('.',',') + suffix;
  }

  function market(){
    return window._dadosMercado || window.__ECON_DASH_STATE_V378__?.mercado || window.__mercadoAtualV230 || {};
  }

  function firstNumber(){
    for(const v of arguments){
      if(v === null || v === undefined || v === '') continue;
      const n = typeof v === 'number' ? v : parseNum(v);
      if(Number.isFinite(n)) return n;
    }
    return NaN;
  }

  function currentSelic(){
    const d = market();
    try{
      const s = window.selicOfficialPositiveV666?.(d);
      if(Number.isFinite(s) && s > 0) return s;
    }catch(_){}
    const c = d?.cards || {};
    return firstNumber(
      c.selic_meta?.valor,
      c.selic_meta?.taxa,
      c.selic_meta?.valor_atual,
      d?.selic_meta?.valor
    );
  }

  function sourceValues(){
    const monthlyText = clean(document.getElementById('mc-poup')?.textContent);
    const ytdText = clean(document.getElementById('poupYearCompactV199')?.textContent);
    const monthly = parseNum(monthlyText);
    const ytd = parseNum(ytdText);
    return { monthlyText, ytdText, monthly, ytd };
  }

  function formulaToday(selic){
    if(Number.isFinite(selic) && selic > 8.5) return 'TR + 0,50% a.m.';
    if(Number.isFinite(selic)) return '70% da Selic + TR';
    return 'Definida pela Selic vigente';
  }

  function conditionToday(selic){
    if(!Number.isFinite(selic)) return 'Aguardando Selic vigente';
    if(selic > 8.5) return `Selic em ${fmtPct(selic)} a.a. · acima do corte de 8,50%`;
    return `Selic em ${fmtPct(selic)} a.a. · igual ou abaixo do corte de 8,50%`;
  }

  function ensureShell(){
    const root = document.querySelector('#sec-mercado .savings-reference-v167');
    if(!root || !isDesktop()) return null;

    let shell = document.getElementById('poupDesktopExecutiveV741');
    if(shell) return shell;

    shell = document.createElement('div');
    shell.id = 'poupDesktopExecutiveV741';
    shell.className = 'poup-desktop-executive-v741';
    shell.innerHTML = `
      <section class="poup-two-rules-v741" aria-label="Duas regras de remuneração da poupança">
        <article class="poup-rule-summary-v741 is-new">
          <header>
            <div>
              <span class="poup-rule-kicker-v741">Regra nova</span>
              <strong>Depósitos desde 04/05/2012</strong>
            </div>
            <span class="poup-rule-status-v741">Vigente</span>
          </header>
          <div class="poup-rule-main-v741">
            <span>Hoje</span>
            <strong id="poupNewTodayFormulaV741">—</strong>
          </div>
          <p id="poupNewTodayConditionV741">Aguardando Selic vigente.</p>
        </article>

        <article class="poup-rule-summary-v741 is-old">
          <header>
            <div>
              <span class="poup-rule-kicker-v741">Regra antiga</span>
              <strong>Depósitos até 03/05/2012</strong>
            </div>
            <span class="poup-rule-status-v741 is-old">Anterior</span>
          </header>
          <div class="poup-rule-main-v741">
            <span>Fórmula</span>
            <strong>TR + 0,50% a.m.</strong>
          </div>
          <p>Não muda conforme o nível da Selic.</p>
        </article>
      </section>

      <div class="poup-actions-v741">
        <button type="button" id="poupRulesToggleV741" aria-expanded="false" aria-controls="poupRulesPanelV741">
          Entender as regras <span aria-hidden="true">▾</span>
        </button>
        <a href="${BCB_CALC_URL}" target="_blank" rel="noopener">
          Simular rendimento <span aria-hidden="true">↗</span>
        </a>
      </div>

      <section id="poupRulesPanelV741" class="poup-rules-panel-v741" hidden aria-label="Detalhamento das regras da poupança">
        <div class="poup-rule-explain-grid-v741">
          <article>
            <header>
              <span>Regra nova</span>
              <strong>Desde 04/05/2012</strong>
            </header>
            <div class="poup-branch-v741">
              <span>Selic &gt; 8,50% a.a.</span>
              <strong>TR + 0,50% a.m.</strong>
            </div>
            <div class="poup-branch-v741">
              <span>Selic ≤ 8,50% a.a.</span>
              <strong>70% da Selic + TR</strong>
            </div>
          </article>

          <article>
            <header>
              <span>Regra antiga</span>
              <strong>Até 03/05/2012</strong>
            </header>
            <div class="poup-old-formula-v741">
              <span>Em qualquer nível da Selic</span>
              <strong>TR + 0,50% a.m.</strong>
            </div>
            <p>A fórmula permanece a mesma para os depósitos antigos.</p>
          </article>
        </div>

        <div class="poup-today-band-v741">
          <span>LEITURA DE HOJE</span>
          <strong id="poupTodayBandV741">—</strong>
        </div>

        <section class="poup-scenarios-compact-v741" aria-labelledby="poupScenariosCompactTitleV741">
          <div class="poup-scenarios-compact-head-v741">
            <strong id="poupScenariosCompactTitleV741">Comparação rápida</strong>
            <small>Como a regra nova muda com a Selic.</small>
          </div>
          <div class="poup-scenario-table-v741" role="table" aria-label="Comparação de cenários da poupança">
            <div role="row" class="head">
              <span role="columnheader">Selic</span>
              <span role="columnheader">Regra nova</span>
              <span role="columnheader">Regra antiga</span>
            </div>
            <div role="row">
              <strong role="cell">4,00%</strong>
              <span role="cell">70% da Selic + TR</span>
              <span role="cell">TR + 0,50% a.m.</span>
            </div>
            <div role="row">
              <strong role="cell">8,50%</strong>
              <span role="cell">70% da Selic + TR</span>
              <span role="cell">TR + 0,50% a.m.</span>
            </div>
            <div role="row" class="today">
              <strong role="cell" id="poupScenarioTodaySelicV741">Hoje</strong>
              <span role="cell" id="poupScenarioTodayNewV741">—</span>
              <span role="cell">TR + 0,50% a.m.</span>
            </div>
          </div>
        </section>

        <div class="poup-operational-note-v741">
          <p><strong>Como o rendimento é creditado:</strong> para pessoa física e entidades sem fins lucrativos, o período é mensal e o crédito ocorre na data de aniversário. O cálculo considera o menor saldo do período.</p>
          <a href="${BCB_RULES_URL}" target="_blank" rel="noopener">
            Regras oficiais no Banco Central <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    `;

    const header = root.querySelector('.savings-head-v167');
    header?.insertAdjacentElement('afterend', shell);

    const btn = shell.querySelector('#poupRulesToggleV741');
    const panel = shell.querySelector('#poupRulesPanelV741');
    btn?.addEventListener('click', () => {
      const open = panel.hasAttribute('hidden');
      panel.toggleAttribute('hidden', !open);
      btn.setAttribute('aria-expanded', String(open));
      btn.innerHTML = open
        ? 'Ocultar regras <span aria-hidden="true">▴</span>'
        : 'Entender as regras <span aria-hidden="true">▾</span>';
    });

    return shell;
  }

  function updateHeader(root, values){
    const kicker = root.querySelector('.savings-title-v207 .market-reference-kicker-v167');
    const subtitle = root.querySelector('.savings-title-v207 p');
    const currentLabel = document.getElementById('poupCurrentLabelV214');
    const currentBox = root.querySelector('.savings-current-v167');

    if(kicker) kicker.textContent = 'Rendimento';
    if(subtitle) subtitle.textContent = 'Duas regras de remuneração conforme a data do depósito.';
    if(currentLabel) currentLabel.textContent = 'Rendimento do mês';

    let ytd = currentBox?.querySelector('.poup-current-ytd-v741');
    if(currentBox && (!ytd || !ytd.classList.contains('poup-current-ytd-v748'))){
      if(ytd) ytd.remove();
      ytd = document.createElement('div');
      ytd.className = 'poup-current-ytd-v741 poup-current-ytd-v748';
      ytd.setAttribute('aria-label','Rendimento acumulado da poupança em 2026');
      ytd.innerHTML = '<span>Acum. 2026</span><strong>—</strong>';
      currentBox.appendChild(ytd);
    }
    if(ytd){
      const ytdValue = ytd.querySelector('strong');
      if(ytdValue){
        ytdValue.textContent = Number.isFinite(values.ytd)
          ? `${values.ytd > 0 ? '+' : ''}${fmtPct(values.ytd)}`
          : '—';
      }
    }
  }

  function update(){
    if(!isDesktop()) return;
    const root = document.querySelector('#sec-mercado .savings-reference-v167');
    const shell = ensureShell();
    if(!root || !shell) return;

    document.documentElement.classList.add('desktop-savings-executive-v741');

    const selic = currentSelic();
    const values = sourceValues();
    const formula = formulaToday(selic);
    const condition = conditionToday(selic);

    updateHeader(root, values);

    const f = document.getElementById('poupNewTodayFormulaV741');
    const c = document.getElementById('poupNewTodayConditionV741');
    const band = document.getElementById('poupTodayBandV741');
    const todaySelic = document.getElementById('poupScenarioTodaySelicV741');
    const todayNew = document.getElementById('poupScenarioTodayNewV741');

    if(f) f.textContent = formula;
    if(c) c.textContent = condition;
    if(band){
      band.textContent = Number.isFinite(selic)
        ? `Selic ${fmtPct(selic)} a.a. → ${formula}`
        : formula;
    }
    if(todaySelic){
      todaySelic.textContent = Number.isFinite(selic)
        ? `${fmtPct(selic)} hoje`
        : 'Hoje';
    }
    if(todayNew) todayNew.textContent = formula;

    const meta = document.querySelector('meta[name="app-build"]');
    if(meta) meta.content = 'ELTAUM_DESKTOP_SAVINGS_EXECUTIVE_V741';
  }

  function boot(){
    if(!isDesktop()) return;
    ensureShell();
    update();

    // Observa apenas os DOIS campos-fonte que recebem dados do motor existente.
    ['mc-poup','poupYearCompactV199'].forEach(id => {
      const el = document.getElementById(id);
      if(el && !el.dataset.v741Observed && window.MutationObserver){
        el.dataset.v741Observed = '1';
        new MutationObserver(() => requestAnimationFrame(update))
          .observe(el,{childList:true,characterData:true,subtree:true});
      }
    });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', boot, {once:true});
  }else{
    boot();
  }
  window.addEventListener('load', update, {once:true});
  window.addEventListener('pageshow', update, {passive:true});
})();



/* ============================================================
   V743 — limpeza única de inline legacy no bloco Juros
   ------------------------------------------------------------
   Necessária porque style="" com !important tem precedência sobre
   qualquer seletor do style.css.
============================================================ */
(function desktopRatesInlineCleanupV743(){
  function isDesktop(){
    return !window.matchMedia || window.matchMedia('(min-width: 769px)').matches;
  }

  const clear = (el, props) => {
    if(!el?.style) return;
    props.forEach(p => el.style.removeProperty(p));
  };

  function apply(){
    if(!isDesktop()) return;

    const root = document.querySelector('#sec-mercado .rates-reference-v167, #sec-mercado .rates-executive-v255');
    if(!root) return;

    clear(root, [
      'display','grid-template-columns','grid-template-areas','grid-template-rows',
      'gap','align-items','overflow','min-height','height','padding'
    ]);

    const head = root.querySelector(':scope > .market-reference-head-v167');
    clear(head, ['grid-area','margin','padding','width','min-width']);

    const summary = root.querySelector(':scope > .rates-summary-v167');
    clear(summary, [
      'grid-area','display','grid-template-columns','grid-template-rows',
      'gap','align-self','width','min-width','margin','padding'
    ]);

    const detail = root.querySelector(':scope > .rates-detail-grid-v167');
    clear(detail, [
      'grid-area','display','flex-direction','grid-template-columns',
      'grid-template-rows','grid-template-areas','gap','width','min-width',
      'margin','padding','overflow','isolation','align-items'
    ]);

    const copom = detail?.querySelector(':scope > .copom-compact-v167');
    clear(copom, [
      'grid-area','grid-column','grid-row','justify-self','align-self',
      'width','min-width','max-width','height','min-height','max-height',
      'margin','position','overflow','z-index','padding','border-radius'
    ]);

    const cdi = detail?.querySelector(':scope > #cdiYearHistory, :scope > .cdi-year-history');
    clear(cdi, [
      'grid-area','grid-column','grid-row','justify-self','align-self',
      'width','min-width','max-width','height','min-height','max-height',
      'margin','position','overflow','z-index','padding','border-radius',
      'display','visibility'
    ]);

    const cdiKpis = cdi?.querySelector('.cdi-kpis-v271');
    clear(cdiKpis, ['display','grid-template-columns','gap','width','margin']);

    document.documentElement.classList.add('desktop-rates-inline-sanitized-v743');

    const meta = document.querySelector('meta[name="app-build"]');
    if(meta) meta.content = 'ELTAUM_DESKTOP_RATES_INLINE_SANITIZED_V743';
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', apply, {once:true});
  }else{
    apply();
  }
  window.addEventListener('load', apply, {once:true});
  window.addEventListener('pageshow', apply, {passive:true});
})();



/* V744 — marcador de geometria final, sem timers. */
(function desktopRatesFinalMarkerV744(){
  function apply(){
    if(!window.matchMedia || !window.matchMedia('(min-width:769px)').matches) return;
    document.documentElement.classList.remove(
      'desktop-market-hierarchy-v523',
      'desktop-rates-compact-v572',
      'desktop-rates-reference-slim-v575'
    );
    document.documentElement.classList.add('desktop-rates-final-v744');
  }
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',apply,{once:true});
  }else apply();
  window.addEventListener('load',apply,{once:true});
  window.addEventListener('pageshow',apply,{passive:true});
})();


/* ============================================================
   V745 — Desktop: Juros de referência em view isolada
   ------------------------------------------------------------
   Em vez de continuar disputando CSS com dezenas de patches antigos,
   a interface desktop passa a usar uma camada visual nova.
   O bloco antigo permanece no DOM somente como motor/fonte de dados.
   Sem timers de reassunção.
============================================================ */
(function desktopRatesCleanViewV745(){
  const MQ = '(min-width: 769px)';

  function isDesktop(){
    return !window.matchMedia || window.matchMedia(MQ).matches;
  }

  function clean(v){
    return String(v ?? '').replace(/\s+/g,' ').trim();
  }

  function esc(v){
    return String(v ?? '').replace(/[&<>"']/g, ch => ({
      '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
    }[ch]));
  }

  function sourceText(id, fallback='—'){
    const el = document.getElementById(id);
    const txt = clean(el?.textContent);
    return txt || fallback;
  }

  function meetingKind(item, result){
    const cls = String(item?.className || '').toLowerCase();
    const txt = String(result || '').toLowerCase();
    if(cls.includes('next') || txt.includes('próxima') || txt.includes('proxima')) return 'next';
    if(cls.includes('future') || txt.includes('prevista')) return 'future';
    if(cls.includes('cut') || txt.includes('corte')) return 'cut';
    if(cls.includes('hike') || txt.includes('alta')) return 'hike';
    if(cls.includes('hold') || txt.includes('mantida') || txt.includes('mantido')) return 'hold';
    return 'neutral';
  }

  function extractRate(result){
    const r = clean(result);
    const arrow = r.match(/(?:→|->)\s*([0-9]{1,2}(?:[,.][0-9]{1,2})?%)/i);
    if(arrow) return arrow[1];
    const em = r.match(/\bem\s*([0-9]{1,2}(?:[,.][0-9]{1,2})?%)/i);
    return em ? em[1] : '';
  }

  function extractMove(result, kind){
    const r = clean(result).replace(/−/g,'-');
    const m = r.match(/(?:corte|alta)\s*([-+]?\d+(?:[,.]\d+)?)\s*p\.?p\.?/i);
    if(m) return `${kind === 'hike' ? 'Alta' : 'Corte'} ${m[1].replace('.',',')} p.p.`;
    if(kind === 'cut') return 'Corte';
    if(kind === 'hike') return 'Alta';
    return '';
  }

  function meetingData(item){
    const num = clean(item.querySelector('.copom-num')?.textContent)
      .replace(/\s*reuni[aã]o\b/i,'').trim() || '—';
    const date = clean(item.querySelector('.copom-date')?.textContent) || '—';
    const result = clean(item.querySelector('.copom-result')?.textContent);
    const kind = meetingKind(item,result);
    const rate = extractRate(result);
    const move = extractMove(result,kind);

    let status='Status a confirmar', detail='—';
    if(kind==='next'){ status='Próxima reunião'; detail='Aguardando decisão'; }
    else if(kind==='future'){ status='Prevista'; detail='Sem decisão'; }
    else if(kind==='hold'){ status='Mantida'; detail=rate ? `Selic ${rate}` : 'Sem alteração'; }
    else if(kind==='cut'){ status=move || 'Corte'; detail=rate ? `Selic ${rate}` : 'Decisão realizada'; }
    else if(kind==='hike'){ status=move || 'Alta'; detail=rate ? `Selic ${rate}` : 'Decisão realizada'; }
    else if(result){ status=result; detail=rate ? `Selic ${rate}` : 'Decisão realizada'; }

    return {num,date,status,detail,kind};
  }

  function ensure(){
    if(!isDesktop()) return null;
    const root = document.querySelector('#sec-mercado .rates-reference-v167');
    if(!root) return null;

    let view = document.getElementById('ratesDesktopCleanV745');
    if(view) return view;

    view = document.createElement('div');
    view.id = 'ratesDesktopCleanV745';
    view.className = 'rates-desktop-clean-v745';
    view.innerHTML = `
      <div class="rates-clean-groups-v745">
        <div class="rates-clean-group-v745">
          <span>Nível atual</span>
          <div class="rates-clean-cards-v745 two">
            <article class="rates-clean-kpi-v745 is-selic">
              <small>Selic meta</small>
              <strong id="ratesV745Selic">—</strong>
              <em id="ratesV745SelicDate">Vigente desde —</em>
            </article>
            <article class="rates-clean-kpi-v745">
              <small>CDI</small>
              <strong id="ratesV745Cdi">—</strong>
              <em>≈ Selic − 0,10 p.p.</em>
            </article>
          </div>
        </div>

        <div class="rates-clean-group-v745">
          <span>CDI acumulado</span>
          <div class="rates-clean-cards-v745 two">
            <article class="rates-clean-kpi-v745">
              <small>CDI em 2026</small>
              <strong id="ratesV745Year">—</strong>
              <em>Acumulado no ano</em>
            </article>
            <article class="rates-clean-kpi-v745">
              <small>CDI em 12 meses</small>
              <strong id="ratesV74512m">—</strong>
              <em>Acumulado em 12 meses</em>
            </article>
          </div>
        </div>
      </div>

      <section class="rates-clean-copom-v745">
        <header>
          <div>
            <strong>Calendário Copom 2026</strong>
            <small>Decisões realizadas, próxima reunião e agenda restante.</small>
          </div>
        </header>
        <div id="ratesV745Copom" class="rates-clean-copom-grid-v745" role="list"></div>
      </section>

      <section class="rates-clean-recent-v745">
        <header>
          <strong>CDI recente</strong>
          <small>Mês atual e último mês fechado.</small>
        </header>
        <div class="rates-clean-recent-grid-v745">
          <article>
            <small id="ratesV745CurrentLabel">Mês atual</small>
            <strong id="ratesV745CurrentValue">—</strong>
          </article>
          <article>
            <small id="ratesV745ClosedLabel">Último fechado</small>
            <strong id="ratesV745ClosedValue">—</strong>
          </article>
        </div>
      </section>
    `;

    const head = root.querySelector(':scope > .market-reference-head-v167');
    head?.insertAdjacentElement('afterend', view);
    return view;
  }

  function renderCopom(){
    const box = document.getElementById('ratesV745Copom');
    const store = document.getElementById('copomMeetings');
    if(!box || !store) return;

    const items = [...store.querySelectorAll('.copom-item')]
      .sort((a,b)=>Number(a.dataset.originalOrder ?? 999)-Number(b.dataset.originalOrder ?? 999));

    const html = items.map((item,i)=>{
      const d = meetingData(item);
      return `<article class="rates-clean-meeting-v745 is-${esc(d.kind)}" role="listitem" style="--meeting-order:${i+1}">
        <span class="num">${esc(d.num)}</span>
        <strong>${esc(d.date)}</strong>
        <b>${esc(d.status)}</b>
        <small>${esc(d.detail)}</small>
      </article>`;
    }).join('');

    if(box.dataset.htmlV745 !== html){
      box.dataset.htmlV745 = html;
      box.innerHTML = html;
    }
  }

  function update(){
    if(!isDesktop()) return;
    const view = ensure();
    if(!view) return;

    document.documentElement.classList.add('desktop-rates-cleanview-v745');

    const selic = sourceText('mc-selic');
    const selicDate = sourceText('selic-last-change');
    const cdi = sourceText('mc-cdi');
    const year = sourceText('cdiAccumYearValueV271');
    const m12 = sourceText('cdiLast12mValueV296');
    const curLabel = sourceText('cdiCurrentMonthLabelV271','Mês atual');
    const curValue = sourceText('cdiCurrentMonthValueV271');
    const closedLabel = sourceText('cdiLastClosedLabelV271','Último fechado');
    const closedValue = sourceText('cdiLastClosedValueV271');

    const map = {
      ratesV745Selic: selic,
      ratesV745SelicDate: `Vigente desde ${selicDate}`,
      ratesV745Cdi: cdi,
      ratesV745Year: year,
      ratesV74512m: m12,
      ratesV745CurrentLabel: curLabel,
      ratesV745CurrentValue: curValue,
      ratesV745ClosedLabel: closedLabel,
      ratesV745ClosedValue: closedValue
    };
    Object.entries(map).forEach(([id,txt])=>{
      const el=document.getElementById(id);
      if(el && el.textContent !== txt) el.textContent = txt;
    });

    renderCopom();

    const meta=document.querySelector('meta[name="app-build"]');
    if(meta) meta.content='ELTAUM_DESKTOP_RATES_CLEANVIEW_V745';
  }

  function observe(){
    const ids = [
      'mc-selic','selic-last-change','mc-cdi',
      'cdiAccumYearValueV271','cdiLast12mValueV296',
      'cdiCurrentMonthLabelV271','cdiCurrentMonthValueV271',
      'cdiLastClosedLabelV271','cdiLastClosedValueV271'
    ];
    let raf=0;
    const schedule=()=>{
      cancelAnimationFrame(raf);
      raf=requestAnimationFrame(update);
    };

    ids.forEach(id=>{
      const el=document.getElementById(id);
      if(el && !el.dataset.v745Observed && window.MutationObserver){
        el.dataset.v745Observed='1';
        new MutationObserver(schedule).observe(el,{childList:true,characterData:true,subtree:true});
      }
    });

    const store=document.getElementById('copomMeetings');
    if(store && !store.dataset.v745Observed && window.MutationObserver){
      store.dataset.v745Observed='1';
      new MutationObserver(schedule).observe(store,{childList:true,characterData:true,subtree:true});
    }
  }

  function boot(){
    ensure();
    update();
    observe();
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',boot,{once:true});
  }else{
    boot();
  }
  window.addEventListener('load',update,{once:true});
  window.addEventListener('pageshow',update,{passive:true});
})();



/* V746 — acessibilidade/estado visual do segmented sort */
(function catalogSortAriaV746(){
  function sync(){
    if(!window.matchMedia || !window.matchMedia('(min-width:1180px)').matches) return;
    const box=document.querySelector('#sec-fundos .desktop-cdi-sort-control');
    if(!box) return;
    const buttons=[...box.querySelectorAll('.cdi-sort-btn')];
    buttons.forEach(btn=>{
      const active=btn.classList.contains('active');
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',sync,{once:true});
  }else sync();
  document.addEventListener('click',ev=>{
    if(ev.target?.closest?.('#sec-fundos .cdi-sort-btn')){
      requestAnimationFrame(sync);
    }
  },true);
  window.addEventListener('pageshow',sync,{passive:true});
})();



/* ============================================================
   V750 — Ranking navigation stability
   Remove qualquer estado legado ranking-page-v685 que possa ter
   ficado ativo por navegação/hash anterior.
============================================================ */
(function rankingNavigationStableV750(){
  function clean(){
    document.body?.classList.remove('ranking-page-v685');
    document.documentElement.classList.add('desktop-ranking-nav-stable-v750');
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', clean, {once:true});
  }else{
    clean();
  }
  window.addEventListener('pageshow', clean, {passive:true});
  window.addEventListener('hashchange', clean, {passive:true});
})();



/* ============================================================
   V751 — estabilidade horizontal do Comparador
============================================================ */
(function comparatorHorizontalStabilityV751(){
  function desktop(){
    return !window.matchMedia || window.matchMedia('(min-width:1180px)').matches;
  }

  function normalizeX(){
    if(!desktop()) return;
    if(window.scrollX !== 0){
      window.scrollTo({left:0, top:window.scrollY, behavior:'auto'});
    }
    document.documentElement.classList.add('desktop-comparator-nav-stable-v751');
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', normalizeX, {once:true});
  }else{
    normalizeX();
  }

  document.addEventListener('click', ev => {
    if(ev.target?.closest?.('[data-compar-workspace="1"], #comparWorkspaceCloseV723, #comparWorkspaceBackV723')){
      requestAnimationFrame(normalizeX);
    }
  }, true);

  window.addEventListener('pageshow', normalizeX, {passive:true});
})();



/* ============================================================
   V752 — Comparador: troféu + visualizador de lâmina/documento
   ------------------------------------------------------------
   - clique no nome do fundo abre o documento oficial em overlay;
   - prioridade: Boletim Comercial (LAC) → Lâmina → fallback LAC_código;
   - nova aba fica disponível como fallback;
   - sem download obrigatório.
============================================================ */
(function comparDocumentViewerV752(){
  const LAC_BASE = 'https://www.caixa.gov.br/Downloads/aplicacao-financeira-laminas-comerciais/';

  function escV752(v){
    return String(v ?? '').replace(/[&<>"']/g, ch => ({
      '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
    }[ch]));
  }

  function cleanV752(v){
    return String(v ?? '').replace(/\s+/g,' ').trim();
  }

  function fundCodeV752(row){
    const direct = cleanV752(
      row?.codfundo ??
      row?.['Código do Fundo'] ??
      row?.['Codigo do Fundo'] ??
      row?.['Cod Fundo'] ??
      row?.['Cód. Fundo']
    );
    if(/^\d{3,8}$/.test(direct)) return direct;

    const cnpj = cleanV752(row?.CNPJ).replace(/\D/g,'');
    const mapped = cnpj ? cleanV752(window._fundosDocMap?.[cnpj]?.codfundo) : '';
    if(/^\d{3,8}$/.test(mapped)) return mapped;

    try{
      const c = comparCodeInfoV725(row);
      if(/^\d{3,8}$/.test(cleanV752(c?.value))) return cleanV752(c.value);
    }catch(_){}

    return '';
  }

  function principalDocV752(row){
    let docs = [];
    try{
      docs = typeof obterDocsFundoCompactos === 'function'
        ? obterDocsFundoCompactos(row)
        : [];
    }catch(_){}

    const comercial = docs.find(d =>
      d?.csvKey === 'doc_boletim' ||
      d?.cod === 'LAC' ||
      /boletim comercial|l[aâ]mina comercial/i.test(String(d?.label||''))
    );
    if(comercial?.url){
      return {url:comercial.url, label:'Lâmina comercial', source:'CAIXA'};
    }

    const lamina = docs.find(d =>
      d?.csvKey === 'doc_lamina' ||
      /l[aâ]mina/i.test(String(d?.label||''))
    );
    if(lamina?.url){
      return {url:lamina.url, label:'Lâmina', source:'CAIXA'};
    }

    const code = fundCodeV752(row);
    if(code){
      return {
        url:`${LAC_BASE}LAC_${encodeURIComponent(code)}.pdf`,
        label:'Lâmina comercial',
        source:'CAIXA',
        estimated:true
      };
    }

    return null;
  }

  function ensureViewerV752(){
    let ov = document.getElementById('comparFundDocOverlayV752');
    if(ov) return ov;

    ov = document.createElement('div');
    ov.id = 'comparFundDocOverlayV752';
    ov.className = 'compar-fund-doc-overlay-v752';
    ov.hidden = true;
    ov.innerHTML = `
      <section class="compar-fund-doc-modal-v752" role="dialog" aria-modal="true" aria-labelledby="comparFundDocTitleV752">
        <header class="compar-fund-doc-head-v752">
          <div class="compar-fund-doc-title-wrap-v752">
            <span class="compar-fund-doc-kicker-v752">DOCUMENTO DO FUNDO</span>
            <strong id="comparFundDocTitleV752">Lâmina do fundo</strong>
            <small id="comparFundDocMetaV752">Documento oficial CAIXA</small>
          </div>
          <div class="compar-fund-doc-actions-v752">
            <button type="button" id="comparFundDocCopyV752" title="Copiar link do documento">Copiar link</button>
            <a id="comparFundDocOpenV752" href="#" target="_blank" rel="noopener">Abrir em nova aba ↗</a>
            <button type="button" id="comparFundDocCloseV752" class="close" aria-label="Fechar visualização">×</button>
          </div>
        </header>

        <div class="compar-fund-doc-body-v752">
          <iframe id="comparFundDocFrameV752" title="Visualização da lâmina do fundo" loading="lazy"></iframe>
          <div class="compar-fund-doc-fallback-v752">
            <span>Se o documento não aparecer no visualizador, use</span>
            <a id="comparFundDocFallbackV752" href="#" target="_blank" rel="noopener">Abrir em nova aba</a>.
          </div>
        </div>
      </section>
    `;
    document.body.appendChild(ov);

    const close = ()=>window.comparFecharDocumentoFundoV752?.();
    ov.addEventListener('click', ev=>{
      if(ev.target === ov) close();
    });
    ov.querySelector('#comparFundDocCloseV752')?.addEventListener('click', close);

    ov.querySelector('#comparFundDocCopyV752')?.addEventListener('click', async ()=>{
      const url = ov.dataset.url || '';
      if(!url) return;
      try{
        await navigator.clipboard.writeText(url);
        if(typeof comparToastV721 === 'function') comparToastV721('Link copiado');
      }catch(_){
        window.prompt('Copie o link do documento:', url);
      }
    });

    return ov;
  }

  window.comparAbrirDocumentoFundoV752 = function(idx){
    const row = comparSet?.get?.(Number(idx)) || (Array.isArray(allRows) ? allRows[Number(idx)] : null);
    if(!row) return;

    const doc = principalDocV752(row);
    if(!doc?.url){
      if(typeof comparToastV721 === 'function') comparToastV721('Lâmina não disponível para este fundo');
      return;
    }

    /* V754 — abertura por LINK real, disparado diretamente pelo clique.
       No Firefox, window.open(..., 'noopener,noreferrer') pode abrir a aba
       e ainda assim devolver null; isso gerava falso positivo de "bloqueado".
       Um <a target="_blank"> segue o comportamento normal do navegador. */
    const a = document.createElement('a');
    a.href = doc.url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    a.remove();

    if(typeof comparToastV721 === 'function'){
      comparToastV721('Lâmina aberta em nova aba');
    }
  };

  window.comparFecharDocumentoFundoV752 = function(){
    const ov = document.getElementById('comparFundDocOverlayV752');
    if(!ov) return;
    ov.classList.remove('open','is-popup-fallback-v753');
    document.documentElement.classList.remove('compar-fund-doc-open-v752');
    ov.hidden = true;
    const frame = ov.querySelector('#comparFundDocFrameV752');
    if(frame) frame.src = 'about:blank';
  };

  document.addEventListener('keydown', ev=>{
    const ov = document.getElementById('comparFundDocOverlayV752');
    if(ev.key === 'Escape' && ov && !ov.hidden){
      ev.preventDefault();
      ev.stopPropagation();
      window.comparFecharDocumentoFundoV752();
    }
  }, true);
})();



/* ============================================================
   V754 — desativa visualizador inline legado
============================================================ */
(function disableInlineFundDocumentViewerV754(){
  function hideLegacyViewer(){
    const ov = document.getElementById('comparFundDocOverlayV752');
    if(!ov) return;
    ov.classList.remove('open','is-popup-fallback-v753');
    ov.hidden = true;
  }
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', hideLegacyViewer, {once:true});
  }else{
    hideLegacyViewer();
  }
  window.addEventListener('pageshow', hideLegacyViewer, {passive:true});
})();



/* ============================================================
   V755 — links nativos das lâminas no Comparador
============================================================ */
(function comparatorNativeFundLinksV755(){
  document.addEventListener('click', ev => {
    const link = ev.target?.closest?.('#comparTable a.ct-fundo-doc-v755');
    if(!link) return;

    /* Não usa preventDefault: target=_blank é tratado pelo navegador. */
    if(typeof comparToastV721 === 'function' && ev.button === 0 && !ev.ctrlKey && !ev.metaKey && !ev.shiftKey){
      comparToastV721('Abrindo lâmina em nova aba');
    }
  }, true);
})();


/* ============================================================
   V759 — acabamento do workspace de seleção
============================================================ */
(function workspacePolishV759(){
  function updateClearFiltersState(){
    const search = String(document.getElementById('comparWorkspaceSearchV723')?.value || '').trim();
    const category = String(document.getElementById('comparWorkspaceCategoryV723')?.value || '').trim();
    const risk = String(document.getElementById('comparWorkspaceRiskV723')?.value || '').trim();
    const btn = document.getElementById('comparWorkspaceClearFiltersV758');
    if(!btn) return;
    const active = !!(search || category || risk);
    btn.disabled = !active;
    btn.classList.toggle('is-active-v759', active);
  }

  function bind(){
    const search = document.getElementById('comparWorkspaceSearchV723');
    const category = document.getElementById('comparWorkspaceCategoryV723');
    const risk = document.getElementById('comparWorkspaceRiskV723');
    const clear = document.getElementById('comparWorkspaceClearFiltersV758');

    updateClearFiltersState();
    search?.addEventListener('input', updateClearFiltersState, {passive:true});
    category?.addEventListener('change', updateClearFiltersState, {passive:true});
    risk?.addEventListener('change', updateClearFiltersState, {passive:true});
    clear?.addEventListener('click', ()=>requestAnimationFrame(updateClearFiltersState), {passive:true});
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', bind, {once:true});
  }else{
    bind();
  }
})();


/* ============================================================
   V760 — acabamento contextual do seletor
============================================================ */
(function workspaceFinalPolishV760(){
  function syncClearFiltersVisibility(){
    const search = String(document.getElementById('comparWorkspaceSearchV723')?.value || '').trim();
    const category = String(document.getElementById('comparWorkspaceCategoryV723')?.value || '').trim();
    const risk = String(document.getElementById('comparWorkspaceRiskV723')?.value || '').trim();
    const btn = document.getElementById('comparWorkspaceClearFiltersV758');
    if(!btn) return;
    const active = !!(search || category || risk);
    btn.hidden = !active;
    btn.disabled = !active;
    btn.classList.toggle('is-active-v759', active);
  }

  function bind(){
    const search = document.getElementById('comparWorkspaceSearchV723');
    const category = document.getElementById('comparWorkspaceCategoryV723');
    const risk = document.getElementById('comparWorkspaceRiskV723');
    const clear = document.getElementById('comparWorkspaceClearFiltersV758');

    syncClearFiltersVisibility();

    search?.addEventListener('input', syncClearFiltersVisibility, {passive:true});
    category?.addEventListener('change', syncClearFiltersVisibility, {passive:true});
    risk?.addEventListener('change', syncClearFiltersVisibility, {passive:true});
    clear?.addEventListener('click', ()=>requestAnimationFrame(syncClearFiltersVisibility), {passive:true});
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', bind, {once:true});
  }else{
    bind();
  }
})();


/* ============================================================
   V761 — busca principal: geometria estável + limpar rápido
============================================================ */
(function catalogSearchGeometryV761(){
  function sync(){
    const input = document.getElementById('searchInput');
    const clear = document.getElementById('catalogSearchClearV761');
    const wrap = input?.closest('.fund-search-main');
    if(!input || !clear || !wrap) return;

    const hasValue = !!String(input.value || '').trim();
    wrap.classList.toggle('has-value-v761', hasValue);
    clear.hidden = !hasValue;
  }

  function clearSearch(){
    const input = document.getElementById('searchInput');
    if(!input) return;
    input.value = '';
    input.dispatchEvent(new Event('input', {bubbles:true}));
    input.focus({preventScroll:true});
    sync();
  }

  function bind(){
    const input = document.getElementById('searchInput');
    const clear = document.getElementById('catalogSearchClearV761');
    if(!input || !clear) return;

    sync();
    input.addEventListener('input', sync, {passive:true});
    input.addEventListener('keydown', ev=>{
      if(ev.key === 'Escape' && input.value){
        ev.preventDefault();
        clearSearch();
      }
    });
    clear.addEventListener('click', clearSearch);
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', bind, {once:true});
  }else{
    bind();
  }
})();

/* PATCH v19 — Topo de mercado reorganizado + CDI sem encavalamento */
function toggleSection(b,c){
  var bd=document.getElementById(b),ct=document.getElementById(c);
  if(!bd)return false;
  var h=bd.hasAttribute('hidden');
  h?bd.removeAttribute('hidden'):bd.setAttribute('hidden','');
  if(ct){ct.classList.toggle('section-expanded',h);ct.setAttribute('aria-expanded',h?'true':'false');}
  var l=ct?ct.querySelector('.toggle-label'):null;
  if(l)l.textContent=h?'Ver menos':'Ver mais';
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
  const canvas = $('poupScenarioChart');
  if(!canvas || typeof Chart === 'undefined') return;

  const selicNum = getFirstNumber(selic);
  const valorNovaNum = getFirstNumber(valorNova);
  const valorAntigaNum = getFirstNumber(valorAntiga);

  // A TR não é fixa no tempo. Para o gráfico ficar coerente com o card de hoje,
  // usamos uma TR estimada apenas de forma didática, derivada do rendimento atual.
  let trEstimada = 0;
  if(selicNum != null && valorNovaNum != null){
    const baseNovaHoje = selicNum > 8.5
      ? 0.5
      : (Math.pow(1 + ((selicNum * 0.70) / 100), 1/12) - 1) * 100;
    trEstimada = Math.max(0, valorNovaNum - baseNovaHoje);
  }else if(valorAntigaNum != null){
    trEstimada = Math.max(0, valorAntigaNum - 0.5);
  }

  const cenariosBase = [4, 6, 8.5];
  if(selicNum != null && !cenariosBase.some(v => Math.abs(v - selicNum) < 0.01)){
    cenariosBase.push(selicNum);
  }

  const cenarios = cenariosBase.map(v => {
    const isHoje = selicNum != null && Math.abs(v - selicNum) < 0.01;
    return {
      selic: v,
      // Chart.js interpreta array de strings como rótulo em múltiplas linhas.
      // Assim evitamos aparecer o texto literal "\\n" no gráfico.
      label: isHoje ? ['Hoje', fmt(v)] : ['Selic', fmt(v)]
    };
  });

  const novaVals = cenarios.map(c => calcularPoupancaNovaMensalPorSelic(c.selic, trEstimada));
  const antigaVals = cenarios.map(() => calcularPoupancaAntigaMensal(trEstimada));

  const labels = cenarios.map(c => c.label);

  const chartData = {
    labels,
    datasets:[
      {
        label:'Regra nova',
        data:novaVals,
        backgroundColor:'rgba(91,156,246,.62)',
        borderColor:'rgba(91,156,246,.95)',
        borderWidth:1,
        borderRadius:6,
        maxBarThickness:26
      },
      {
        label:'Regra antiga',
        data:antigaVals,
        backgroundColor:'rgba(200,151,58,.52)',
        borderColor:'rgba(232,187,106,.95)',
        borderWidth:1,
        borderRadius:6,
        maxBarThickness:26
      }
    ]
  };

  const maxY = Math.max(...novaVals, ...antigaVals, 0.8);
  const chartOptions = {
    responsive:true,
    maintainAspectRatio:false,
    animation:{duration:450},
    plugins:{
      legend:{
        display:true,
        position:'bottom',
        labels:{
          color:'#aeb7cf',
          boxWidth:10,
          boxHeight:10,
          padding:10,
          font:{size:10,family:'Inter'}
        }
      },
      tooltip:{
        callbacks:{
          label:function(ctx){
            const val = Number(ctx.raw);
            return `${ctx.dataset.label}: ${Number.isFinite(val) ? fmt(val) : '—'} a.m.`;
          },
          afterBody:function(){
            return trEstimada > 0 ? `TR estimada usada: ${fmt(trEstimada)}` : 'Simulação sem TR estimada';
          }
        }
      }
    },
    scales:{
      x:{
        grid:{display:false},
        ticks:{
          color:'#9faac4',
          font:{size:10,family:'JetBrains Mono'}
        }
      },
      y:{
        beginAtZero:true,
        suggestedMax:maxY * 1.18,
        grid:{color:'rgba(255,255,255,.055)'},
        ticks:{
          color:'#9faac4',
          font:{size:10,family:'JetBrains Mono'},
          callback:function(value){ return Number(value).toFixed(2).replace('.',',') + '%'; }
        }
      }
    }
  };

  if(poupScenarioChart){
    poupScenarioChart.data = chartData;
    poupScenarioChart.options = chartOptions;
    poupScenarioChart.update();
  }else{
    poupScenarioChart = new Chart(canvas, {
      type:'bar',
      data:chartData,
      options:chartOptions
    });
  }

  if($('poupScenarioStatus')){
    $('poupScenarioStatus').textContent = selicNum != null ? `Selic ${fmt(selicNum)}` : 'Selic —';
  }

  if($('poupScenarioToday')){
    if(selicNum == null){
      $('poupScenarioToday').textContent = 'Aguardando Selic';
    }else if(selicNum > 8.5){
      $('poupScenarioToday').textContent = 'Mesma regra hoje';
    }else{
      $('poupScenarioToday').textContent = 'Regra nova menor';
    }
  }

  if($('poupScenarioSummary')){
    if(selicNum == null){
      $('poupScenarioSummary').textContent = 'Quando a Selic carregar, o gráfico compara a regra nova com a regra antiga em cenários selecionados.';
    }else if(selicNum > 8.5){
      $('poupScenarioSummary').textContent = `Com Selic em ${fmt(selicNum)}, as duas regras convergem: TR + 0,50% a.m. A diferença aparece principalmente quando a Selic fica em 8,50% a.a. ou abaixo.`;
    }else{
      $('poupScenarioSummary').textContent = `Com Selic em ${fmt(selicNum)}, a regra nova usa TR + 70% da Selic meta anual, mensalizada; a regra antiga mantém TR + 0,50% a.m.`;
    }
  }

  if($('poupScenarioNote')){
    $('poupScenarioNote').textContent = trEstimada > 0
      ? `Estimativa didática: gráfico mantém TR estimada de ${fmt(trEstimada)} a.m. apenas para comparação visual.`
      : 'Estimativa didática: gráfico sem TR estimada. Para valor exato por período, conferir a calculadora do BCB.';
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
    $('mc-poup').textContent = valorNova != null ? fmt(valorNova) : '—';
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

  let textoNova = 'a.m. · regra conforme nível da Selic';

  if(selic != null){
    textoNova = acima
      ? 'a.m. · TR + 0,50% (Selic > 8,5%)'
      : 'a.m. · TR + 70% da Selic meta anual, mensalizada (Selic ≤ 8,5%)';
  }

  if($('poupNewRuleText')){
    $('poupNewRuleText').textContent = textoNova;
  }

  if($('poupOldRuleText')){
    $('poupOldRuleText').textContent = 'a.m. · TR + 0,50%';
  }

  if($('poupQuickNote')){
    if(selic == null){
      $('poupQuickNote').textContent =
        'Regra nova depende do nível da Selic. Para acumulado exato, conferir calculadora oficial do BCB.';
    }else if(acima){
      $('poupQuickNote').textContent =
        `Com Selic em ${fmt(selic)}, a regra nova usa TR + 0,50% a.m.; a regra antiga também usa TR + 0,50% a.m.`;
    }else{
      $('poupQuickNote').textContent =
        `Com Selic em ${fmt(selic)}, a regra nova usa TR + 70% da Selic meta anual, mensalizada; a regra antiga mantém TR + 0,50% a.m.`;
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
  // v17 local: não chama mais a API SGS 4391 pelo navegador.
  // Os acumulados 12M/24M/36M já vêm pré-calculados no mercado_atual.json pelo atualização automatizada.
  if(indicState.cdi.m12 !== null || indicState.cdi.m24 !== null || indicState.cdi.m36 !== null){
    console.info('[CDI] Usando acumulados do mercado_atual.json');
  } else {
    console.warn('[CDI] mercado_atual.json não trouxe acumulados CDI. Execute o +.');
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


function atualizarPTAXStats(){
  const setText = (id, value) => { const el = $(id); if(el) el.textContent = value; };
  const setClass = (id, cls) => { const el = $(id); if(el) el.className = cls; };

  if(!_ptaxHistorico || !_ptaxHistorico.length){
    ['ptaxStatAtual','ptaxStatMax','ptaxStatMin','ptaxStatMedia','ptaxStatMaxRef','ptaxStatMinRef'].forEach(id => setText(id,'—'));
    return;
  }

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
  if(!asc.length){
    ['ptaxStatAtual','ptaxStatMax','ptaxStatMin','ptaxStatMedia','ptaxStatMaxRef','ptaxStatMinRef'].forEach(id => setText(id,'—'));
    return;
  }

  const janela12 = asc.slice(-12);
  const atual = asc[asc.length-1];
  const max = janela12.reduce((a,b)=> b.val > a.val ? b : a, janela12[0]);
  const min = janela12.reduce((a,b)=> b.val < a.val ? b : a, janela12[0]);
  const media = janela12.reduce((sum,item)=>sum+item.val,0) / janela12.length;

  setText('ptaxStatAtual', brl(atual.val));
  setText('ptaxStatMax', brl(max.val));
  setText('ptaxStatMaxRef', max.label);
  setText('ptaxStatMin', brl(min.val));
  setText('ptaxStatMinRef', min.label);
  setText('ptaxStatMedia', brl(media));

  setClass('ptaxStatAtual', 'ptax-stat-val neu');
  setClass('ptaxStatMax', 'ptax-stat-val neg');
  setClass('ptaxStatMin', 'ptax-stat-val pos');
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
  atualizarPTAXStats();

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

    // Guarda a última cotação disponível de cada mês.
    if(!byMonth[key] || new Date(dataRef) > new Date(byMonth[key].dataHoraCotacao || byMonth[key].data_ref)){
      byMonth[key] = item;
    }
  });

  const sorted = Object.entries(byMonth).sort(([a],[b]) => a.localeCompare(b));
  if(!sorted.length) return;

  // Mostra sempre os últimos fechamentos disponíveis, com o mês mais recente primeiro.
  // Isso evita que no mobile apareça jan/fev enquanto o fechamento atual fica escondido no fim.
  const lastKey = sorted[sorted.length - 1][0];
  const ultimosMeses = sorted.slice(-6).reverse();

  const container = $('dolarMonths');
  if(!container) return;

  container.innerHTML = ultimosMeses.map(([key, item]) => {
    const [ano, mes] = key.split('-');
    const label = item._mes_label || `${MESES_PT[parseInt(mes)-1]}/${ano}`;
    const val = parseFloat(item.cotacaoVenda || item.cotacao || 0);
    const isCurrent = key === lastKey;

    let varPct = item._var_pct;
    if(varPct === null || varPct === undefined || Number.isNaN(Number(varPct))){
      const idxAsc = sorted.findIndex(([k]) => k === key);
      if(idxAsc > 0){
        const prevVal = parseFloat(sorted[idxAsc-1][1].cotacaoVenda || sorted[idxAsc-1][1].cotacao || 0);
        if(prevVal) varPct = ((val - prevVal) / prevVal) * 100;
      }
    }

    let varHtml = '<span class="dolar-month-var zero">—</span>';
    if(varPct !== null && varPct !== undefined && !Number.isNaN(Number(varPct))){
      const n = Number(varPct);
      const cls = n > 0 ? 'pos' : n < 0 ? 'neg' : 'zero';
      varHtml = `<span class="dolar-month-var ${cls}">${signPct(n)}${fmt(n)}</span>`;
    }

    return `<div class="dolar-month-item${isCurrent ? ' current' : ''}">
      <span class="dolar-month-label">${label}</span>
      <span class="dolar-month-val">R$ ${fmtBRL(val)}</span>
      ${varHtml}
    </div>`;
  }).join('');
}

function toggleDolarTimeline(){
  const body = $('dolarTimelineBody');
  const toggle = $('dolarTimelineToggle');
  if(!body || !toggle) return;

  const isOpen = body.classList.toggle('open');
  toggle.textContent = isOpen ? 'Recolher ▲' : 'Mostrar ▼';
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

  // Amostra para não sobrecarregar o gráfico (máx 200 pontos)
  const step = Math.max(1, Math.floor(dados.length/200));
  const sample = dados.filter((_,i) => i % step === 0 || i === dados.length-1);

  const labels = sample.map(d => {
    const dt = new Date(d.dataHoraCotacao);
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
          ticks: { color: '#3d4560', font: { family: 'JetBrains Mono', size: 9 }, maxTicksLimit: 10 }
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
    document.querySelectorAll('[data-dolar-range]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
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
  const cdiParcial = num(cards.cdi?.parcial_mes_atual);
  const cdiParcialLabel = cards.cdi?.parcial_ref || mesAtualLabel;
  const cdiAno = (cdiParcial !== null ? num(cards.cdi?.acum_ano_com_parcial) : num(cards.cdi?.acum_ano)) ?? num(cards.cdi?.acum_ano_com_parcial) ?? null;
  const cdiAcum = num(indicState.cdi[`m${m}`]) ?? num(cards.cdi?.[`acum_${m}m`]);

  setPct('cdi-mes-ant', cdiMesFechado, 'bar-cdi-ant', 2);
  setSubStatus('cdi-mes-ant-sub', cards.cdi?.mes_ref || fallbackMesFechado, 'fechado');

  setPct('cdi-mes-cur', cdiParcial, 'bar-cdi-cur', 2, false, '—');
  setSubStatus('cdi-cur-sub', cdiParcialLabel, cdiParcial !== null ? 'parcial' : 'aguardando');

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


// Tabs 12M / 24M / 36M
document.querySelectorAll('.indic-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.indic-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activePeriodTab = parseInt(btn.dataset.months);
    atualizarTabelaIndicadores();
  });
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


function renderCdiYearHistory(d){
  const strip = $('cdiMonthStrip');
  if(!strip) return;

  const cdi = d?.cards?.cdi || {};
  const hist = Array.isArray(cdi.historico) ? cdi.historico : [];

  if(!hist.length){
    strip.innerHTML = '<span class="cdi-month-empty">histórico indisponível</span>';
    return;
  }

  const ordenado = [...hist].sort((a,b) => String(a?.key || '').localeCompare(String(b?.key || '')));
  const last = ordenado[ordenado.length - 1];
  const ano = String(last?.key || '').slice(0,4) || String(new Date().getFullYear());
  const mesesAno = ordenado.filter(x => String(x?.key || '').startsWith(ano + '-'));

  const parcialRef = String(cdi.parcial_ref || '').toLowerCase();
  const mesFechadoRef = String(cdi.mes_ref || '').toLowerCase();

  const fmtPctLocal = v => {
    const n = Number(v);
    if(!Number.isFinite(n)) return '—';
    return (n >= 0 ? '+' : '') + n.toFixed(2).replace('.',',') + '%';
  };

  const titulo = $('cdiYearHistoryTitle');
  if(titulo) titulo.textContent = `CDI mensal ${ano}`;

  // Mantém no card o mesmo acumulado do painel consolidado: ano com parcial quando existir.
  const total = Number(cdi.acum_ano_com_parcial ?? cdi.acum_ano);
  const totalEl = $('cdiYearHistoryTotal');
  if(totalEl) totalEl.textContent = Number.isFinite(total) ? `Ano ${fmtPctLocal(total)}` : 'Ano —';

  const byLabel = (label) => mesesAno.find(x => String(x?.label || '').toLowerCase() === label);
  const atualParcial = parcialRef ? byLabel(parcialRef) : mesesAno[mesesAno.length - 1];
  const ultimoFechado = mesFechadoRef
    ? byLabel(mesFechadoRef)
    : mesesAno[mesesAno.length - 2];

  // Ordem consultiva no celular: último mês fechado + mês atual parcial sempre aparecem primeiro.
  const destaque = [];
  if(ultimoFechado) destaque.push(ultimoFechado);
  if(atualParcial && atualParcial !== ultimoFechado) destaque.push(atualParcial);

  const restantes = mesesAno.filter(item => !destaque.includes(item)).reverse();
  const exibicao = [...destaque, ...restantes];

  strip.innerHTML = exibicao.map((item) => {
    const labelCompleta = String(item.label || item.key || '');
    const label = labelCompleta.replace('/'+ano,'');
    const isCurrent = atualParcial && item === atualParcial;
    const isClosed = ultimoFechado && item === ultimoFechado;
    const classes = [
      'cdi-month-chip',
      (isCurrent || isClosed) ? 'featured' : '',
      isCurrent ? 'current' : '',
      isClosed ? 'closed' : ''
    ].filter(Boolean).join(' ');

    const subtitulo = isCurrent
      ? '<span class="p">parcial</span>'
      : isClosed
        ? '<span class="p">último mês</span>'
        : '';

    return `<span class="${classes}" title="CDI ${labelCompleta}: ${fmtPctLocal(item.valor)}">
      <span class="m">${label}</span>
      <span class="v">${fmtPctLocal(item.valor)}</span>
      ${subtitulo}
    </span>`;
  }).join('') || '<span class="cdi-month-empty">sem meses no ano</span>';
}

/* ════════════════════════════════════════════════════
   CARREGA mercado_atual.json
════════════════════════════════════════════════════ */
async function carregarMercado(){
  try{
    const r = await fetch(BASE_URL+'mercado_atual.json?v='+Date.now());
    const raw = await r.json();

    // Complementa o mercado_atual.json com o arquivo de índices detalhados,
    // que contém mês fechado, mês atual, ano, 12M, 24M e 36M para dólar,
    // Ibovespa, S&P 500, Dow Jones e Nasdaq.
    const rawIndicesDetalhados = await carregarIndicesMercadoDetalhados();
    const rawUnificado = mesclarMercadoComIndicesDetalhados(raw, rawIndicesDetalhados);

    const d = normalizarMercadoAtual(rawUnificado);
    _dadosMercado = d;
    setTimeout(()=>{ try{ atualizarResumoFechamentoMes(); atualizarPainelFechadoCard(); renderClosedMarketSheet(); }catch(e){} }, 600);
    hidratarDolarResumoDoJson(d);

    if(d.atualizado_em) $('lastUpdate').innerHTML = `<span class="live-dot"></span>${d.atualizado_em}`;

    const c = d.cards || {};

    // ── Selic ──
    const selic = c.selic_meta?.valor;
    if($('mc-selic')) $('mc-selic').textContent = selic ? fmt(selic) : '—';
    const selicHist = d.historico_selic || c.selic_meta?.historico || [];
    if(selicHist.length){
      const ultima = selicHist[0];
      const el = $('selic-last-change');
      if(el) el.textContent = ultima.data || '—';
    }

    buildCopomCalendario();

    // ── CDI — baseline + ★ v16: acumulados pré-calculados pelo robô ──
    const cdi = c.cdi?.valor;
    if($('mc-cdi')) $('mc-cdi').textContent = cdi ? fmt(cdi) : '—';
    if(cdi){
      const cdiMensal = c.cdi?.mensal ?? ((Math.pow(1+cdi/100,1/12)-1)*100);
      const isEst = c.cdi?.mensal == null;
      const fCdiMes = '+'+cdiMensal.toFixed(2).replace('.',',')+'%';
      // v17: exibe taxa + mês de referência no card CDI (ex: "+1,09% · abr/2026")
      const mesRefLabel = c.cdi?.mes_ref ? ` · ${c.cdi.mes_ref}` : '';
      if($('mc-cdi-mes-ref')) $('mc-cdi-mes-ref').textContent = fCdiMes + mesRefLabel + (isEst ? '*' : '');

      // Baseline
      if(!indicState.cdi.mes) indicState.cdi.mes = cdiMensal;
      if(!indicState.cdi.mesRef){
        const h = new Date();
        indicState.cdi.mesRef = c.cdi?.mes_ref ||
          `${MESES_PT[h.getMonth()===0?11:h.getMonth()-1]}/${h.getMonth()===0?h.getFullYear()-1:h.getFullYear()}`;
      }
      // ★ v16 — usa acumulados pré-calculados server-side (resolve CORS/400 do browser)
      if(c.cdi?.acum_12m != null) indicState.cdi.m12 = c.cdi.acum_12m;
      if(c.cdi?.acum_24m != null) indicState.cdi.m24 = c.cdi.acum_24m;
      if(c.cdi?.acum_36m != null) indicState.cdi.m36 = c.cdi.acum_36m;
      // Fallback: se robô não calculou 12M, usa taxa anual como proxy
      if(indicState.cdi.m12 == null) indicState.cdi.m12 = cdi;

      const cdiMesAtual = c.cdi?.parcial_mes_atual ?? c.cdi?.mensal ?? cdiMensal;
      const cdiMesAtualTxt = '+' + Number(cdiMesAtual).toFixed(2).replace('.',',') + '%';
      const cdi12Txt = indicState.cdi.m12 !== null && indicState.cdi.m12 !== undefined
        ? '+' + Number(indicState.cdi.m12).toFixed(2).replace('.',',') + '%'
        : '—';
      if($('mc-cdi-mes-atual')) $('mc-cdi-mes-atual').textContent = cdiMesAtualTxt;
      if($('mc-cdi-12m-val-hero')) $('mc-cdi-12m-val-hero').textContent = cdi12Txt;
      if($('mc-cdi-12m-val')) $('mc-cdi-12m-val').textContent = cdi12Txt;
      renderCdiYearHistory(d);
    } else {
      renderCdiYearHistory(d);
    }

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
    if($('lastUpdate')) $('lastUpdate').innerHTML = `<span class="live-dot" style="background:var(--muted)"></span>Dados em cache`;
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
let activeRankView = 'top';
let activeRankPeriods = { topFundos:'12m', destaques:'mes' };

function normRankTxt(v){
  return String(v||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toUpperCase();
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
function passaFiltroRanking(r){
  const cat = normRankTxt(r['Categoria']);
  const nome = normRankTxt(r['Fundo']);
  const base = cat + ' ' + nome;
  if(activeRankFilter === 'sem-fmp') return !(base.includes('FMP') || base.includes('PRIVATIZACAO'));
  if(activeRankFilter === 'renda-fixa') return cat.includes('RENDA FIXA') || base.includes('REF DI') || base.includes('CDI');
  if(activeRankFilter === 'acoes') return cat.includes('ACOES') || base.includes('ACOES') || base.includes('IBOVESPA') || base.includes('ELETROBRAS') || base.includes('PETROBRAS') || base.includes('VALE');
  if(activeRankFilter === 'multimercado') return cat.includes('MULTIMERCADO');
  return true;
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
  if(activeRisco) base = base.filter(r => (r['Perfil de Risco']||'').trim() === activeRisco);

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
async function baixarPrintRank(el, nome){
  if(!window.html2canvas){
    showRankToast('Biblioteca de print não carregou. Verifique a internet/CDN.');
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
const DETAIL_COLS=new Set(["CNPJ","codfundo","Perfil de Risco","Taxa Adm (%)","Aplicacao Minima (R$)","Conversao Resgate","Pagamento Resgate","doc_lamina","doc_regulamento","doc_inf_comp","doc_comunicado","doc_carta","doc_boletim"]);
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
  if(btnR) { btnR.className = vista === 'reuniao' ? 'vista-btn active' : 'vista-btn'; }
  if(btnC) { btnC.className = vista === 'completa' ? 'vista-btn active' : 'vista-btn'; }
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

function applyFilter(){
  const q=activeSearch.toLowerCase();
  const favModeAtivo = !!window.__favListMode;
  filtered=allRows.filter(r=>{
    if(favModeAtivo && !rowIsFavoritedForFilter(r)) return false;
    if(hideSemDados&&!temDados(r)) return false;
    if(activeCat&&(r['Categoria']||'')!==activeCat) return false;
    if(activeBenchmark && detectarBenchmarkFundo(r).label !== activeBenchmark) return false;
    if(activePerfil){
      const tokens=String(r['Perfis']||r['Perfil']||'').split(/\s*\|\s*/).map(s=>s.trim());
      if(!tokens.includes(activePerfil)) return false;
    }
    if(activeRisco&&(r['Perfil de Risco']||'').trim()!==activeRisco) return false;
    if(q&&!Object.values(r).some(v=>v&&String(v).toLowerCase().includes(q))) return false;
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
}

/* ════════════════════════════════════════════════════
   DOCUMENTOS — fundos_caixa.json (CAIXA Asset)
════════════════════════════════════════════════════ */
let _fundosDocMap = {}; // CNPJ limpo → { codfundo, docs:{} }

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
    { label:'Boletim Comercial', curto:'BC', icon:'⭐', csvKey:'doc_boletim', jsonKey:'boletim', cod:'', pasta:'' },
    { label:'Lâmina', curto:'L', icon:'📄', csvKey:'doc_lamina',      jsonKey:'lamina',       cod:'LAC', pasta:'laminas-comerciais' },
    { label:'Regulamento', curto:'R', icon:'📋', csvKey:'doc_regulamento', jsonKey:'regulamento',  cod:'RG',  pasta:'regulamentos' },
    { label:'Inf. Compl.', curto:'IC', icon:'ℹ️', csvKey:'doc_inf_comp',    jsonKey:'inf_comp',     cod:'FIC', pasta:'inf-com' },
    { label:'Comunicado', curto:'C', icon:'📢', csvKey:'doc_comunicado',  jsonKey:'comunicado',   cod:'COM', pasta:'comunicado-aos-cotistas' },
    { label:'Carta Mensal', curto:'CM', icon:'📊', csvKey:'doc_carta',       jsonKey:'carta_mensal', cod:'CM',  pasta:'carta-mensal' },
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

  const buttons = [
    mkBtn(boletim?.url, 'detail-action-primary', '⭐', 'Boletim Comercial', 'Abrir Boletim Comercial'),
    mkBtn(lamina?.url, 'detail-action-secondary', '📄', 'Lâmina', 'Abrir lâmina'),
    mkBtn(regulamento?.url, 'detail-action-secondary', '📋', 'Regulamento', 'Abrir regulamento'),
    mkBtn(urlFund, 'detail-action-secondary', '🏦', 'Página CAIXA', 'Abrir página do fundo na CAIXA'),
  ].filter(Boolean).join('');

  if(!buttons) return '';
  return `<div class="detail-actions-card">
    <div class="detail-actions-title">Ações rápidas</div>
    <div class="detail-actions-buttons">${buttons}</div>
  </div>`;
}

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
    objetivo = 'Fundo de renda fixa com exposição a crédito privado (debêntures, CRIs, CRAs e outros títulos corporativos). Busca prêmio de risco acima do CDI, mas com menor liquidez e exposição ao risco de crédito dos emissores. Requer análise de spread e qualidade dos ativos.';
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

  // ── Complementos de dados ────────────────────────────────────────────
  const complementos = [];
  if(risco) complementos.push({label:'Perfil', value:risco});
  if(taxa) complementos.push({label:'Taxa adm.', value:`${taxa}% a.a.`});
  if(conv || pag) complementos.push({label:'Liquidez', value:`Conv. ${conv || '—'} · Pag. ${pag || '—'}`});
  if(rentAno !== null) complementos.push({label:'Ano', value:pct(rentAno)});
  if(rent12 !== null){
    const ratioTxt = cdiRatio !== null ? ` · ${cdiRatio}% do CDI` : '';
    complementos.push({label:'12M', value:`${pct(rent12)}${ratioTxt}`});
  }

  const tagsHtml = tags.length
    ? `<div class="fund-note-badge-wrap">${tags.join('')}</div>`
    : '';

  const complementosHtml = complementos.length
    ? `<div class="fund-note-metrics">${complementos.map(m => `<div class="fund-note-metric"><span>${htmlAttr(m.label)}</span><strong>${htmlAttr(m.value)}</strong></div>`).join('')}</div>`
    : '';

  return `
    <div class="fund-quick-note">
      <div class="fund-quick-note-title">🧭 Leitura rápida do fundo</div>
      ${tagsHtml}
      <div class="fund-quick-note-text" style="margin-top:${tags.length?'8px':'0'}">${objetivo}</div>
      ${complementosHtml}
      ${alertaCdi}
      <div class="fund-quick-note-disclaimer">
        Texto interpretativo gerado a partir dos dados do catálogo. Consulte a lâmina e o regulamento para objetivo oficial, riscos e política de investimento completa.
      </div>
    </div>`;
}

function buildDetailPanel(r,colspan){
  const DOC_DETAIL_KEYS = new Set(['doc_lamina','doc_regulamento','doc_inf_comp','doc_comunicado','doc_carta','doc_boletim']);
  const LABELS = {
    'codfundo':'Código do fundo',
    'Aplicacao Minima (R$)':'Aplicação mínima',
    'Taxa Adm (%)':'Taxa adm.',
    'Conversao Resgate':'Conversão resgate',
    'Pagamento Resgate':'Pagamento resgate',
    'Perfil de Risco':'Perfil de risco'
  };
  const detailCols=Object.keys(r).filter(k=>DETAIL_COLS.has(k) && !DOC_DETAIL_KEYS.has(k));
  const items=detailCols.map(k=>{
    let val=String(r[k]||'').trim()||'—';

    // CNPJ agora fica somente como texto copiável; sem link externo para Receita.
    const extraClass = k==='CNPJ' ? ' copyable' : '';

    if(k==='Taxa Adm (%)'&&val!=='—') val=val+'%';
    if(k==='Aplicacao Minima (R$)'&&val!=='—'){
      const n=parseFloat(val.replace(',','.'));
      val=isNaN(n)?val:'R$ '+n.toLocaleString('pt-BR',{minimumFractionDigits:2});
    }
    const label = LABELS[k] || k;
    return `<div class="detail-item"><div class="detail-key">${label}</div><div class="detail-val${extraClass}">${val}</div></div>`;
  }).join('');
  const urlFund=isFallbackUrl(r)?'':getFundUrl(r);
  const urlItem=urlFund?`<div class="detail-item detail-site-link"><div class="detail-key">Página do Fundo</div><div class="detail-val"><a href="${urlFund}" target="_blank" rel="noopener">Abrir no site da CAIXA ↗</a></div></div>`:'';
  const detailActions = buildDetailQuickActions(r, urlFund);
  return `<tr class="detail-row"><td colspan="${colspan}" style="padding:0">
    <div class="detail-panel detail-panel-mobile-clean">
      <div class="detail-main">${detailActions}<div class="detail-grid-compact">${items}${urlItem}</div>${gerarLeituraRapidaFundo(r)}</div>
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
      html+=`<td class="col-fundo"><a href="${url}" target="_blank" rel="noopener" class="fundo-cell-name">${val}${fbLabel}<svg class="link-icon" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></a><div class="fundo-cell-meta"><span class="fundo-cat-badge cat-${catCls}">${catLabel}</span>${plStr?`<span class="fundo-pl-sub">${plStr}</span>`:''}</div></td>`;return;
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
  if(top) top.textContent=resultText;
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

function scrollToFundResultsStart(){
  const tableWrap = document.querySelector('#sec-fundos .table-wrap');
  const fallback = document.getElementById('sec-fundos');
  const target = tableWrap || fallback;
  if(!target) return;

  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const stickyOffset = isMobile ? 118 : 24;
  const y = target.getBoundingClientRect().top + window.pageYOffset - stickyOffset;

  window.scrollTo({
    top: Math.max(0, y),
    behavior: 'smooth'
  });
}

function renderPagination(){
  const total=perPage===9999?1:Math.ceil(filtered.length/perPage);
  const c=$('pageBtns'); c.innerHTML='';
  if(total<=1) return;
  const mk=(label,page,dis,act)=>{
    const b=document.createElement('button');
    b.className='page-btn'+(act?' active':'');
    b.textContent=label; b.disabled=dis;
    if(!dis) b.addEventListener('click',()=>{
      currentPage=page;
      expandedRows.clear();
      render();
      requestAnimationFrame(scrollToFundResultsStart);
    });
    return b;
  };
  c.appendChild(mk('‹',currentPage-1,currentPage===1));
  let from=Math.max(1,currentPage-2),to=Math.min(total,from+4);
  from=Math.max(1,to-4);
  for(let i=from;i<=to;i++) c.appendChild(mk(i,i,false,i===currentPage));
  c.appendChild(mk('›',currentPage+1,currentPage===total||total===0));
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
    if(temBusca) setTimeout(irParaTabelaDeFundosMobile,90);
  },280);
});
$('perPage')?.addEventListener('change',e=>{ perPage=parseInt(e.target.value); currentPage=1; render(); updateFundResultSummary(); });
$('toggleSemDados')?.addEventListener('change',e=>{ hideSemDados=e.target.checked; applyFilter(); });

async function carregarDados(){
  try{
    const raw=await fetch(BASE_URL+'dados_atuais.csv?v='+Date.now()).then(r=>r.text());
    const result=parseCsv(raw);
    allRows=result.data;
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

function buildChartIpca(historico,meses){
  const base = normalizarHistoricoIPCA(historico);
  const slice=base.slice(-meses);
  const labels=slice.map(d=>d.label);
  const values=slice.map(d=>d.valor);
  const colors=values.map(v=>v>0?'rgba(46,209,122,.7)':'rgba(240,85,101,.7)');
  if(_chartIpca) _chartIpca.destroy();
  const ctx=document.getElementById('chartIpca')?.getContext('2d'); if(!ctx) return;
  const emptyMsg = ctx.canvas?.parentElement?.querySelector('.chart-empty-msg');
  if(emptyMsg) emptyMsg.remove();
  _chartIpca=new Chart(ctx,{type:'bar',data:{labels,datasets:[{data:values,backgroundColor:colors,borderColor:colors.map(c=>c.replace('.7)','.1)')),borderWidth:1,borderRadius:2}]},
    options:{...CHART_DEFAULTS,plugins:{...CHART_DEFAULTS.plugins,tooltip:{...CHART_DEFAULTS.plugins.tooltip,callbacks:{label:ctx=>`IPCA: ${ctx.parsed.y.toFixed(2).replace('.',',')}%`}}}}});
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

  // Nos botões da Selic, data-range passa a representar meses de janela: 12 = 1A, 60 = 5A, 999 = histórico completo.
  let slice = filtrado;
  if(qtd < 999 && filtrado.length){
    const ultimo = filtrado[filtrado.length - 1]._dt;
    const limite = new Date(ultimo);
    limite.setMonth(limite.getMonth() - qtd);
    slice = filtrado.filter(d => d._dt >= limite);
    if(slice.length < 2) slice = filtrado.slice(-Math.max(2, Math.min(filtrado.length, qtd)));
  }

  const labels=slice.map(d=>`${String(d._dt.getMonth()+1).padStart(2,'0')}/${d._dt.getFullYear()}`);
  const values=slice.map(d=>d._valor);

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
  setTxt('selicHojeResumo', fmtSelic(values[currentIndex]));
  setTxt('selicHojeData', fmtDataSelic(currentRow?._dt) || 'último dado');

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

function buildChartMeta(metaDados){
  if(!metaDados||!metaDados.length) return;
  const sorted=[...metaDados].filter(d=>d.DataReferencia&&d.Inflacao12Meses).sort((a,b)=>new Date(a.DataReferencia)-new Date(b.DataReferencia));
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
      afterBody:items=>{const v=items.find(i=>i.dataset.label==='IPCA 12M')?.parsed?.y;if(v===undefined) return[];if(v>SUP) return[`⚠️ Acima do teto (${SUP}%)`];if(v<INF) return[`⚠️ Abaixo do piso (${INF}%)`];return['✅ Dentro da meta'];}}}}}}
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
  const meta12 = Number(ipca.acum_12m);

  const setText = (id, value) => { const el = document.getElementById(id); if(el) el.textContent = value; };
  const pct = v => formatPctCard(v);
  const metaStatus = (v) => {
    const n = Number(v);
    if(!Number.isFinite(n)) return 'meta 3,00% · banda 1,50% a 4,50%';
    if(n > 4.5) return 'acima do teto da meta · meta 3,00%';
    if(n < 1.5) return 'abaixo do piso da meta · meta 3,00%';
    return 'dentro da banda da meta · meta 3,00%';
  };

  setText('evoIpcaMensalVal', pct(ipca.ultimo_mes));
  setText('evoIpcaMensalSub', ipca.label_mes ? `${ipca.label_mes} · último dado oficial` : 'último dado oficial');
  setText('evoSelicAtualVal', selic.valor != null ? `${Number(selic.valor).toFixed(2).replace('.',',')}% a.a.` : '—');
  setText('evoSelicAtualSub', selic.data_ref || selic.ultima_alteracao || 'meta COPOM');
  setText('evoIpca12Val', pct(ipca.acum_12m));
  setText('evoIpca12Sub', metaStatus(ipca.acum_12m));

  setText('evoCardIpcaNote', ipca.ultimo_mes != null ? `Último dado: ${pct(ipca.ultimo_mes)} em ${ipca.label_mes || 'período recente'}.` : 'Último dado: aguardando atualização.');
  setText('evoCardSelicNote', selic.valor != null ? `Selic atual: ${Number(selic.valor).toFixed(2).replace('.',',')}% a.a. · referência para CDI, crédito e renda fixa.` : 'Selic atual: aguardando atualização.');
  setText('evoCardMetaNote', ipca.acum_12m != null ? `IPCA 12M: ${pct(ipca.acum_12m)} · ${metaStatus(ipca.acum_12m)}.` : 'Meta: 3,00% · banda: 1,50% a 4,50%.');
}

function selecionarGraficoEvolucao(chave){
  const target = chave || 'ipca';
  document.querySelectorAll('.evo-view-tab').forEach(btn=>{
    btn.classList.toggle('active', btn.dataset.evoChart === target);
  });
  document.querySelectorAll('.evo-chart-card').forEach(card=>{
    card.classList.toggle('active', card.dataset.evoPanel === target);
  });
  setTimeout(()=>{
    [_chartIpca,_chartSelic,_chartMeta].forEach(ch=>{ if(ch && typeof ch.resize === 'function') ch.resize(); });
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
  _dadosMercado=d;

  const hist=await carregarIPCAHistoricoAmpliado(d?.cards?.ipca?.historico||[]);
  if(!_dadosMercado.cards) _dadosMercado.cards = {};
  if(!_dadosMercado.cards.ipca) _dadosMercado.cards.ipca = {};
  _dadosMercado.cards.ipca.historico = hist;

  // Força base histórica completa quando o mercado_atual.json trouxer apenas recorte curto.
  let selic = await carregarSelicHistoricoAmpliado(d?.historico_selic || d?.cards?.selic_meta?.historico || []);
  if(selic.length){
    _dadosMercado.historico_selic = selic;
  }

  // Primeiro tenta o mercado_atual.json. Se não vier, busca o arquivo local separado.
  let meta=d?.meta_vs_inflacao_efetiva||[];
  if(!meta.length){
    const jsMeta = await carregarJsonLocal('meta-vs-inflacao-efetiva.json');
    meta = jsMeta?.conteudo || jsMeta?.dados || (Array.isArray(jsMeta) ? jsMeta : []);
    if(meta.length){
      _dadosMercado.meta_vs_inflacao_efetiva = meta;
      console.info(`[IPCA x Meta] ${meta.length} registros carregados do arquivo local.`);
    }
  }

  if(hist.length) buildChartIpca(hist,24);
  else marcarGraficoSemDados('chartIpca', 'Histórico de IPCA temporariamente indisponível.');

  if(selic.length) buildChartSelic(selic,999);
  else marcarGraficoSemDados('chartSelic', 'Histórico da Selic temporariamente indisponível.');

  if(meta.length) buildChartMeta(meta);
  else marcarGraficoSemDados('chartMeta', 'Histórico de inflação e meta temporariamente indisponível.');

  bindEvolucaoTabs();
  selecionarGraficoEvolucao('ipca');

  bindEvolucaoChartPeriodTabs();
}

async function alterarPeriodoGraficoEvolucao(btn){
  if(!btn) return;
  const chart = btn.dataset.chart;
  const range = parseInt(btn.dataset.range, 10);
  if(!chart || !Number.isFinite(range)) return;

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
function _historicoSelicOrdenado(){
  const h = _dadosMercado?.historico_selic || _dadosMercado?.cards?.selic_meta?.historico || [];
  return (Array.isArray(h) ? h : [])
    .map(r => ({...r, _key:_dateKeyCopom(r.DataReuniaoCopom || r.data || r.DataInicioVigencia), _valor:_selicValorRegistro(r)}))
    .filter(r => r._key && r._valor !== null)
    .sort((a,b) => b._key.localeCompare(a._key));
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
function buildCopomCalendario(){
  const container = $('copomMeetings');
  if(!container) return;

  const hoje = new Date();
  const hojeKey = hoje.toISOString().slice(0,10);
  const proxIdx = COPOM_2026.findIndex(r => r.decision >= hojeKey);

  const base = COPOM_2026.map((r,i) => {
    const decisao = _decisaoCopomPorData(r.decision);
    const isNext = i === proxIdx;
    const isFuture = r.decision >= hojeKey && !isNext;
    const klass = decisao?.tipo || (isNext ? 'next' : isFuture ? 'future' : 'done');
    const resultado = decisao?.texto || (isNext ? 'próxima ★' : isFuture ? 'prevista' : 'realizada');
    return { ...r, _i:i, decisao, isNext, isFuture, klass, resultado };
  });

  // Exibe a próxima reunião em primeiro plano; as demais continuam disponíveis no arraste.
  const lista = proxIdx >= 0
    ? [...base.slice(proxIdx), ...base.slice(0, proxIdx)]
    : [...base].reverse();

  container.innerHTML = lista.map((r) => {
    return `<div class="copom-item ${r.klass} ${r.isNext ? 'next featured-next' : ''}" title="${r.num}ª reunião: ${r.datas}" data-original-order="${r._i}">
      <span class="copom-num">${r.num}ª reunião</span>
      <strong class="copom-date">${r.short}</strong>
      <small class="copom-result">${r.resultado}</small>
    </div>`;
  }).join('');

  // Garante posição inicial no começo da faixa, onde agora fica a próxima reunião.
  requestAnimationFrame(() => { container.scrollLeft = 0; });
}

/* ════════════════════════════════════════════════════
   INIT
════════════════════════════════════════════════════ */
async function iniciarDashboard(){
  const etapa = async function(nome, fn){
    try{
      return await fn();
    }catch(e){
      console.warn('[INIT] Falha em ' + nome + ':', e);
      return null;
    }
  };

  try{
    await etapa('carregarMercado', carregarMercado);
    await etapa('carregarCDIPeriodos', carregarCDIPeriodos);
    await etapa('carregarIPCAPeriodos', carregarIPCAPeriodos);
    etapa('carregarDolarDia', carregarDolarDia);
    etapa('carregarPTAXDiarioAno', carregarPTAXDiarioAno);
    await etapa('carregarPTAXHistorico', carregarPTAXHistorico);
    await etapa('carregarFundosJson', carregarFundosJson);
    await etapa('carregarDados', carregarDados);
    await etapa('carregarKPIs', carregarKPIs);
  }finally{
    // A interface fica pronta mesmo que algum endpoint externo falhe.
    window.__dashboardReady = true;
    try{ if(typeof atualizarResumoFechamentoMes==='function') atualizarResumoFechamentoMes(); }catch(e){}
    try{ if(typeof atualizarPainelFechadoCard==='function') atualizarPainelFechadoCard(); }catch(e){}
    try{ if(typeof renderClosedMarketSheet==='function') renderClosedMarketSheet(); }catch(e){}
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

    const urls = secundarios.map(d => d.url);
    const allBtn = secundarios.length > 1
      ? `<button type="button" class="fund-card-docs-all" data-urls="${encodeURIComponent(JSON.stringify(urls))}" onclick="abrirDocsDaLinha(event,this)">Abrir todos</button>`
      : '';

    const links = secundarios.map(d => {
      const label = d.curto || d.label || 'Doc';
      return `<a class="fund-card-doc-pill" href="${htmlAttr(d.url)}" target="_blank" rel="noopener" title="${htmlAttr(d.label || label)}">${d.icon || '📄'} ${htmlAttr(label)}</a>`;
    }).join('');

    return `<div class="fund-card-mobile-docs">
      <div class="fund-card-docs-head">
        <span class="fund-card-docs-title">Documentos complementares</span>
        ${allBtn}
      </div>
      <div class="fund-card-docs-list secundarios">${links}</div>
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
      ? `<a class="fund-card-boletim-quick-btn" href="${htmlAttr(boletim.url)}" target="_blank" rel="noopener">Boletim comercial ↗</a>`
      : '';
    const docsHtml = buildMobileDocsHtml(r);
    return `<article class="fund-card-mobile fund-card-mobile-list fund-card-mobile-v26" data-card-idx="${idx}" data-idx="${idx}">
      <div class="fund-card-list-main">
        <div class="fund-card-list-left">
          <div class="fund-card-mobile-tags fund-card-list-tags">
            <span class="cat-badge cat-${cls}">${cat}</span>
            ${risco!=='—'?`<span class="perfil-chip pchip-TODOS">${risco}</span>`:''}
            ${codigo?`<span class="fund-code-chip">Cód. ${htmlAttr(codigo)}</span>`:''}
          </div>
          <div class="fund-card-mobile-name fund-card-list-name">${htmlAttr(nome)}</div>
        </div>
        <div class="fund-card-list-metrics" aria-label="Resumo de rentabilidade do fundo">
          <span class="fund-card-list-metric"><small>Mês</small><strong class="${pctClass(mes)}">${mes}</strong></span>
          <span class="fund-card-list-metric"><small>12M</small><strong class="${pctClass(m12)}">${m12}</strong></span>
          <span class="fund-card-list-metric cdi"><small>% CDI</small><strong class="${ratioCdi.cls}">${ratioCdi.txt}</strong></span>
        </div>
      </div>

      <div class="fund-card-mobile-actions fund-card-list-actions fund-card-list-actions-v26">
        ${boletimBtn}
        <a class="fund-card-primary-btn fund-card-page-btn" href="${htmlAttr(url)}" target="_blank" rel="noopener">Página do fundo ↗</a>
        <button type="button" class="fund-card-detail-btn" data-card-idx="${idx}" aria-expanded="false">Mais detalhes</button>
      </div>

      <div class="fund-card-list-expanded" aria-hidden="true">
        <div class="fund-card-expanded-head">
          <strong>Mais detalhes</strong>
          <button type="button" class="fund-card-close-details" data-card-idx="${idx}" aria-label="Fechar detalhes">× Fechar</button>
        </div>
        <div class="fund-card-mobile-body">
          <div class="fund-metric"><span class="fund-metric-label">Cota</span><span class="fund-metric-value">${cota}</span></div>
          <div class="fund-metric"><span class="fund-metric-label">Ano</span><span class="fund-metric-value ${pctClass(ano)}">${ano}</span></div>
          <div class="fund-metric"><span class="fund-metric-label">Conversão</span><span class="fund-metric-value prazo-mobile">${htmlAttr(conversao)}</span></div>
          <div class="fund-metric"><span class="fund-metric-label">Pagamento</span><span class="fund-metric-value prazo-mobile">${htmlAttr(pagamento)}</span></div>
          <div class="fund-metric"><span class="fund-metric-label">Benchmark</span><span class="fund-metric-value">${htmlAttr(bench)}</span></div>
          <div class="fund-metric"><span class="fund-metric-label">PL mi</span><span class="fund-metric-value">${pl}</span></div>
          <div class="fund-metric"><span class="fund-metric-label">Início</span><span class="fund-metric-value">${data}</span></div>
        </div>
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
        btn.textContent=open?'Ocultar':'Mais detalhes';
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
    qsa('.filter-preset-chip').forEach(btn=>{
      const p=btn.dataset.preset;
      let on=false;
      if(p==='all') on=!cat&&!bench&&!risco&&!(typeof activePerfil!=='undefined'&&activePerfil)&&!(typeof hideSemDados!=='undefined'&&hideSemDados);
      if(p==='cdi') on=bench==='CDI';
      if(p==='conservador') on=risco==='Conservador';
      if(p==='ipca') on=bench==='IPCA';
      if(p==='renda-fixa') on=cat==='RENDA FIXA';
      if(p==='multimercado') on=cat==='MULTIMERCADO';
      if(p==='acoes') on=cat==='ACOES';
      if(p==='cambial') on=cat==='CAMBIAL';
      if(p==='fmp') on=cat==='FUNDOS MUTUOS DE PRIVATIZACAO';
      btn.classList.toggle('active', on);
    });
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

  function scrollToFunds(){
    const sec=document.getElementById('sec-fundos');
    if(!sec) return;
    const top=sec.getBoundingClientRect().top+window.scrollY-60;
    window.scrollTo({top:Math.max(0,top),behavior:'smooth'});
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
      scrollToFunds();
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

      /* Favoritos */
      if(typeof filtered==='undefined') return;
      const favs=getFavs();
      if(onlyFavs){ filtered=filtered.filter(r=>favs.has(getFundKey(r))); if(typeof render==='function') render(); }
      else if(favs.size>0){ filtered.sort((a,b)=>(favs.has(getFundKey(a))?0:1)-(favs.has(getFundKey(b))?0:1)); if(typeof render==='function') render(); }

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
        btn.textContent=should?'Ocultar':'Mais detalhes';
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
        mainBtn.textContent=open?'Ocultar':'Mais detalhes';
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

    // Nota rápida
    const nota = gerarLeituraRapidaFundo(row);
    const tmpDiv = document.createElement('div');
    tmpDiv.innerHTML = nota;
    const noteTxt = tmpDiv.querySelector('.fund-quick-note-text')?.textContent || '';
    el('fspotNote').innerHTML = noteTxt
      ? `<div class="fspot-note-title">🧭 Leitura rápida</div>${noteTxt}`
      : '';
    el('fspotNote').style.display = noteTxt ? '' : 'none';

    // Link CAIXA
    const urlFundo = getFundUrl(row);
    const linkEl = el('fspotLinkCaixa');
    if(urlFundo && !isFallbackUrl(row)){
      linkEl.href = urlFundo; linkEl.style.display = '';
    } else {
      linkEl.style.display = 'none';
    }

    // Botão "Ver na tabela"
    el('fspotVerTabela').onclick = ()=>{
      closeFundSpotlight();
      // Pequeno delay para o modal fechar antes de filtrar
      setTimeout(()=>{
        clearChipGroups();
        const cnpj = cleanCnpj ? cleanCnpj(row['CNPJ']) : '';
        const busca = cnpj || nome;
        try{ activeSearch = busca.toLowerCase(); }catch(e){}
        const inp = $('searchInput'); if(inp) inp.value = busca;
        const gfb = $('gfbSearch'); if(gfb) gfb.value = busca;
        try{ if(typeof applyFilter==='function') applyFilter(); }catch(e){}
        // Scroll até a tabela
        const sec = $('sec-fundos') || document.querySelector('.table-wrap');
        if(sec) sec.scrollIntoView({behavior:'smooth', block:'start'});
      }, 320);
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
  const setMini=(id,val)=>{ const el=document.getElementById(id); if(el){ el.textContent=cleanTxt(val); el.className=signClassFromText(val); } };
  setMini('closedMiniCdi', painelText('cdi-mes-ant'));
  setMini('closedMiniIpca', painelText('ipca-mes-ant'));
  setMini('closedMiniDolar', painelText('dolar-ant-var') !== '—' ? painelText('dolar-ant-var') : painelText('dolar-ant-cot'));
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
  const BUILD = 'ELTAUM_TABS_FORCE_20260602_v10';
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

  async function carregarSelic(){
    if(cache.selic && cache.selic.length) return cache.selic;

    let base = [];
    try{
      const mercado = await carregarMercadoAtual();
      base = normalizarSelic(mercado?.historico_selic || mercado?.cards?.selic_meta?.historico || []);
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
    const dados = await carregarIPCA(range);
    const slice = dados.slice(-range);
    const canvas = byId('chartIpca');
    const ctx = canvas?.getContext('2d');
    if(!ctx || !slice.length){ mostrarMsg('chartIpca', 'Histórico de IPCA temporariamente indisponível.'); return; }
    limparMsg(canvas);
    destruirChart(canvas);
    const labels = slice.map(d => d.label);
    const values = slice.map(d => d.valor);
    const colors = values.map(v => v >= 0 ? 'rgba(46,209,122,.7)' : 'rgba(240,85,101,.7)');
    new Chart(ctx, {
      type:'bar',
      data:{ labels, datasets:[{ data:values, backgroundColor:colors, borderColor:colors, borderWidth:1, borderRadius:2 }] },
      options:{
        ...chartDefaults(),
        plugins:{
          ...chartDefaults().plugins,
          tooltip:{ ...chartDefaults().plugins.tooltip, callbacks:{ label:ctx=>'IPCA: ' + pct(ctx.parsed.y) } }
        }
      }
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
    const set = (id, txt) => { const el = byId(id); if(el) el.textContent = txt; };
    set('selicMaxResumo', pct(maxVal) + ' a.a.');
    set('selicMaxData', dataBR(maxItem?._dt));
    set('selicMinResumo', pct(minVal) + ' a.a.');
    set('selicMinData', dataBR(minItem?._dt));
    set('selicHojeResumo', pct(hoje.valor) + ' a.a.');
    set('selicHojeData', dataBR(hoje._dt));
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
    const maxVal = Math.max(...values);
    new Chart(ctx, {
      type:'line',
      data:{ labels, datasets:[{ data:values, borderColor:'#c8973a', backgroundColor:'rgba(200,151,58,.08)', borderWidth:2, pointBackgroundColor:'#e8bb6a', pointRadius:2.6, pointHoverRadius:5, fill:true, stepped:'before', tension:0 }] },
      options:{
        ...chartDefaults(),
        plugins:{ ...chartDefaults().plugins, tooltip:{ ...chartDefaults().plugins.tooltip, callbacks:{ label:ctx=>'Selic: ' + pct(ctx.parsed.y) + ' a.a.' } } },
        scales:{ ...chartDefaults().scales, y:{ ...chartDefaults().scales.y, suggestedMin:0, suggestedMax:maxVal * 1.10 } }
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

  // Usa click e pointerup em captura. Assim, mesmo que algum listener antigo ou overlay lógico interfira, o botão responde.
  document.addEventListener('click', capturar, true);
  document.addEventListener('pointerup', capturar, true);
})();
(function(){
  'use strict';
  const BUILD = 'ELTAUM_INDIC_TABS_FORCE_20260602_v5';

  function qsa(sel, root){ return Array.from((root || document).querySelectorAll(sel)); }

  function prepararIndicTabs(){
    qsa('.indic-tabs, .indic-tabs-bar, .market-period-tabs').forEach(el => {
      el.style.pointerEvents = 'auto';
      if(getComputedStyle(el).position === 'static') el.style.position = 'relative';
      el.style.zIndex = '80';
    });

    qsa('.indic-tab[data-months]').forEach(btn => {
      btn.setAttribute('type', 'button');
      btn.setAttribute('aria-pressed', btn.classList.contains('active') ? 'true' : 'false');
      btn.style.pointerEvents = 'auto';
      btn.style.cursor = 'pointer';
      btn.style.touchAction = 'manipulation';
      if(getComputedStyle(btn).position === 'static') btn.style.position = 'relative';
      btn.style.zIndex = '90';
    });
  }

  function setPeriodoIndicadores(btn){
    const meses = Number(btn && btn.dataset ? btn.dataset.months : NaN);
    if(![12,24,36].includes(meses)) return;

    qsa('.indic-tab[data-months]').forEach(tab => {
      const ativo = tab === btn;
      tab.classList.toggle('active', ativo);
      tab.setAttribute('aria-pressed', ativo ? 'true' : 'false');
    });

    try{
      activePeriodTab = meses;
    }catch(e){
      window.activePeriodTab = meses;
    }
    document.documentElement.dataset.indicPeriod = String(meses);

    if(typeof atualizarTabelaIndicadores === 'function'){
      atualizarTabelaIndicadores();
    }else{
      console.warn('[' + BUILD + '] atualizarTabelaIndicadores ainda não está disponível.');
    }
  }

  function acharIndicTab(evento){
    const alvo = evento.target;
    if(alvo && alvo.closest){
      const direto = alvo.closest('.indic-tab[data-months]');
      if(direto) return direto;
    }
    if(evento.composedPath){
      const item = evento.composedPath().find(el => el && el.matches && el.matches('.indic-tab[data-months]'));
      if(item) return item;
    }
    return null;
  }

  function capturarIndicTab(evento){
    const btn = acharIndicTab(evento);
    if(!btn) return;
    evento.preventDefault();
    if(typeof evento.stopImmediatePropagation === 'function') evento.stopImmediatePropagation();
    setPeriodoIndicadores(btn);
  }

  function instalar(){
    prepararIndicTabs();
    document.addEventListener('click', capturarIndicTab, true);
    document.addEventListener('pointerup', capturarIndicTab, true);
    document.addEventListener('touchend', capturarIndicTab, true);
    setTimeout(prepararIndicTabs, 400);
    setTimeout(prepararIndicTabs, 1200);
    setTimeout(prepararIndicTabs, 2500);
    console.info('[' + BUILD + '] patch dos botões 12M/24M/36M instalado.');
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', instalar, {once:true});
  else instalar();
})();
/* Patch v6 — captura no window antes dos listeners antigos e usa hit-test por coordenada.
   Objetivo: fazer os botões responderem mesmo se algum elemento/camada estiver interceptando o target. */
(function(){
  'use strict';
  const BUILD = 'ELTAUM_WINDOW_HITTEST_TABS_FORCE_20260602_v6';
  window.__ELTAUM_WINDOW_HITTEST_TABS_FORCE_BUILD__ = BUILD;

  function qsa(sel, root){ return Array.from((root || document).querySelectorAll(sel)); }

  function eventoXY(ev){
    if(ev && ev.touches && ev.touches[0]) return {x: ev.touches[0].clientX, y: ev.touches[0].clientY};
    if(ev && ev.changedTouches && ev.changedTouches[0]) return {x: ev.changedTouches[0].clientX, y: ev.changedTouches[0].clientY};
    if(ev && Number.isFinite(ev.clientX) && Number.isFinite(ev.clientY)) return {x: ev.clientX, y: ev.clientY};
    return null;
  }

  function visivel(el){
    if(!el) return false;
    const st = getComputedStyle(el);
    if(st.display === 'none' || st.visibility === 'hidden' || Number(st.opacity) === 0) return false;
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  }

  function dentro(el, pt){
    if(!el || !pt || !visivel(el)) return false;
    const r = el.getBoundingClientRect();
    return pt.x >= r.left && pt.x <= r.right && pt.y >= r.top && pt.y <= r.bottom;
  }

  function tabDireta(ev){
    const t = ev && ev.target;
    if(!t || !t.closest) return null;
    return t.closest('.chart-tab[data-chart][data-range], .indic-tab[data-months]');
  }

  function tabPorCoordenada(ev){
    const pt = eventoXY(ev);
    if(!pt) return null;
    const tabs = qsa('.chart-tab[data-chart][data-range], .indic-tab[data-months]');
    // Inverte a ordem para privilegiar o último elemento pintado no DOM quando há sobreposição.
    for(let i = tabs.length - 1; i >= 0; i--){
      if(dentro(tabs[i], pt)) return tabs[i];
    }
    return null;
  }

  function prepararTab(tab){
    if(!tab) return;
    tab.setAttribute('type', 'button');
    tab.style.pointerEvents = 'auto';
    tab.style.cursor = 'pointer';
    tab.style.touchAction = 'manipulation';
    if(getComputedStyle(tab).position === 'static') tab.style.position = 'relative';
    tab.style.zIndex = '999';
  }

  function prepararTodos(){
    qsa('.chart-tab[data-chart][data-range], .indic-tab[data-months]').forEach(prepararTab);
    qsa('.chart-tabs, .indic-tabs, .indic-tabs-bar, .market-period-tabs').forEach(el => {
      el.style.pointerEvents = 'auto';
      if(getComputedStyle(el).position === 'static') el.style.position = 'relative';
      el.style.zIndex = '998';
    });
  }

  function ativarGrupo(selector, ativo){
    qsa(selector).forEach(btn => {
      const isActive = btn === ativo;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
  }

  function acionarGrafico(btn){
    prepararTab(btn);
    const chart = btn.dataset.chart;
    if(!chart) return false;
    ativarGrupo('.chart-tab[data-chart="' + chart + '"]', btn);
    if(typeof window.alterarPeriodoGraficoEvolucao === 'function'){
      window.alterarPeriodoGraficoEvolucao(btn);
      return true;
    }
    console.warn('[' + BUILD + '] alterarPeriodoGraficoEvolucao não encontrada.');
    return false;
  }

  function acionarIndicador(btn){
    prepararTab(btn);
    const meses = Number(btn.dataset.months);
    if(![12,24,36].includes(meses)) return false;
    ativarGrupo('.indic-tab[data-months]', btn);
    try { activePeriodTab = meses; } catch(e) { window.activePeriodTab = meses; }
    document.documentElement.dataset.indicPeriod = String(meses);
    if(typeof window.atualizarTabelaIndicadores === 'function'){
      window.atualizarTabelaIndicadores();
      return true;
    }
    console.warn('[' + BUILD + '] atualizarTabelaIndicadores não encontrada.');
    return false;
  }

  function capturar(ev){
    var _t = ev && ev.target;
    if(_t && _t.closest && (
      _t.closest('.closed-month-launch') ||
      _t.closest('#closedMarketSheet') ||
      _t.closest('#closedMarketOverlay')
    )) return;
    const btn = tabDireta(ev) || tabPorCoordenada(ev);
    if(!btn) return;

    let ok = false;
    if(btn.matches('.chart-tab[data-chart][data-range]')) ok = acionarGrafico(btn);
    if(btn.matches('.indic-tab[data-months]')) ok = acionarIndicador(btn);

    if(ok){
      ev.preventDefault();
      if(typeof ev.stopImmediatePropagation === 'function') ev.stopImmediatePropagation();
      else if(typeof ev.stopPropagation === 'function') ev.stopPropagation();
      console.info('[' + BUILD + '] botão acionado:', btn.textContent.trim(), Object.assign({}, btn.dataset));
    }
  }

  prepararTodos();
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', prepararTodos, {once:true});
  setTimeout(prepararTodos, 300);
  setTimeout(prepararTodos, 1200);
  setTimeout(prepararTodos, 3000);

  // Window capture roda antes dos listeners em document; isso contorna stopImmediatePropagation de patches anteriores.
  ['pointerdown','pointerup','click','touchend'].forEach(tipo => {
    window.addEventListener(tipo, capturar, true);
  });

  console.info('[' + BUILD + '] instalado.');
})();
/* Patch final — atalhos do catálogo no desktop/mobile.
   Build: ELTAUM_TABS_FORCE_20260602_v10
   Ajuste v10: reduz piscadas/pulos ao filtrar grupos.
   - Grupos (Renda Fixa, Multimercado, Ações, Cambial e FMP) filtram diretamente a base e renderizam uma vez.
   - Remove o scrollIntoView automático que fazia a tela dar salto no desktop.
   - Reduz os eventos de clique e aplica debounce para evitar renderizações duplicadas. */
(function(){
  'use strict';
  const BUILD='ELTAUM_SHORTCUT_FILTERS_FORCE_20260602_v10';
  const GROUP_PRESETS=new Set(['renda-fixa','multimercado','acoes','cambial','fmp']);
  const VALID_PRESETS=new Set(['all','favoritos','cdi','conservador','ipca','renda-fixa','multimercado','acoes','cambial','fmp']);
  window.__ELTAUM_SHORTCUT_FILTERS_BUILD__=BUILD;
  window.__ELTAUM_ACTIVE_SHORTCUT_PRESET__=window.__ELTAUM_ACTIVE_SHORTCUT_PRESET__||'';
  console.info('[Catálogo CAIXA] Patch atalhos/filtros ativo:', BUILD);
  console.info('[Catálogo CAIXA] Correção de overlay/clique dos atalhos ativa: ELTAUM_OVERLAY_CLICK_FIX_20260602_v10');

  function norm(v){
    return String(v||'')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g,'')
      .replace(/\s+/g,' ')
      .trim()
      .toUpperCase();
  }

  function rowCategory(row){ return norm(row && row['Categoria']); }
  function rowName(row){ return norm(row && row['Fundo']); }

  function rowMatchesGroup(row,preset){
    const cat=rowCategory(row);
    const nome=rowName(row);
    if(preset==='renda-fixa') return cat.includes('RENDA FIXA');
    if(preset==='multimercado') return cat.includes('MULTIMERCADO');
    if(preset==='acoes') return cat.includes('ACOES') || cat.includes('ACAO') || nome.includes('ACOES') || nome.includes('ACAO');
    if(preset==='cambial') return cat.includes('CAMBIAL') || nome.includes('CAMBIAL') || nome.includes('DOLAR') || nome.includes('CAMBIO');
    if(preset==='fmp') return cat.includes('PRIVATIZACAO') || cat.includes('FMP') || nome.includes('FMP') || nome.includes('FGTS');
    return true;
  }

  function rowMatchesSearch(row){
    const input=document.getElementById('searchInput');
    const q=norm(input && input.value);
    if(!q) return true;
    return norm(Object.values(row||{}).join(' ')).includes(q);
  }

  function presetLabel(preset){
    return ({
      'renda-fixa':'Renda Fixa',
      'multimercado':'Multimercado',
      'acoes':'Ações',
      'cambial':'Cambial',
      'fmp':'FMP',
      'cdi':'CDI',
      'ipca':'IPCA',
      'conservador':'Conservador',
      'favoritos':'Favoritos',
      'all':'Todos'
    })[preset] || preset || 'Todos';
  }

  function keepFundAreaStable(fn){
    const wrap=document.querySelector('.table-wrap');
    const cards=document.getElementById('mobileFundCards');
    const wrapH=wrap ? Math.ceil(wrap.getBoundingClientRect().height) : 0;
    const cardsH=cards ? Math.ceil(cards.getBoundingClientRect().height) : 0;

    if(wrap && wrapH>0){
      wrap.style.minHeight=wrapH+'px';
      wrap.classList.add('elton-filter-stabilizing');
    }
    if(cards && cardsH>0){
      cards.style.minHeight=cardsH+'px';
      cards.classList.add('elton-filter-stabilizing');
    }

    let out;
    try{ out=fn(); }
    finally{
      setTimeout(()=>{
        if(wrap){ wrap.style.minHeight=''; wrap.classList.remove('elton-filter-stabilizing'); }
        if(cards){ cards.style.minHeight=''; cards.classList.remove('elton-filter-stabilizing'); }
      },180);
    }
    return out;
  }

  function syncShortcutVisual(preset){
    const active=preset || window.__ELTAUM_ACTIVE_SHORTCUT_PRESET__ || 'all';
    document.querySelectorAll('.shortcut-preset[data-preset], .filter-preset-chip[data-preset]').forEach(btn=>{
      const on=(btn.dataset.preset||'')===active || (active==='all' && (btn.dataset.preset||'')==='all');
      btn.classList.toggle('active',on);
      btn.setAttribute('aria-pressed',on?'true':'false');
    });

    const summary=document.getElementById('mobileFilterSummary');
    if(summary){
      if(active==='all' || !active) summary.textContent='Filtros: todos';
      else if(GROUP_PRESETS.has(active)) summary.textContent='Filtros: '+presetLabel(active);
    }

    const count=document.getElementById('filterActiveCount');
    if(count){
      if(active && active!=='all'){
        count.textContent='1';
        count.classList.add('has-active');
      }else{
        count.textContent='0';
        count.classList.remove('has-active');
      }
    }

    const strip=document.getElementById('activeFilterStrip');
    if(strip && GROUP_PRESETS.has(active)){
      strip.classList.add('active');
      strip.innerHTML=`<span class="active-filter-label">Filtros ativos</span><button type="button" class="active-filter-pill" data-elton-clear-shortcut="1"><small>Grupo</small>${presetLabel(active)}<span>×</span></button><button type="button" class="active-filter-clear" data-elton-clear-shortcut="1">Limpar tudo</button>`;
    }else if(strip && (active==='all' || !active)){
      strip.classList.remove('active');
      if(strip.querySelector('[data-elton-clear-shortcut]')) strip.innerHTML='';
    }
  }

  function resetBaseFiltersForShortcut(){
    try{ activeCat=''; activeBenchmark=''; activePerfil=''; activeRisco=''; hideSemDados=false; }catch(e){}
    try{ window.__favListMode=false; }catch(e){}
    try{ if(typeof syncFilterControls==='function') syncFilterControls(); }catch(e){}
  }

  function renderFundListOnce(){
    try{ currentPage=1; }catch(e){}
    try{ if(expandedRows && typeof expandedRows.clear==='function') expandedRows.clear(); }catch(e){}
    try{ if(typeof render==='function') render(); }catch(e){ console.warn('[Atalhos v10] render falhou:',e); }
    try{ if(typeof renderMobileFundCards==='function') renderMobileFundCards(); }catch(e){}
    try{ if(typeof updateFundResultSummary==='function') updateFundResultSummary(); }catch(e){}
  }

  function applyGroupPresetDirect(preset){
    if(typeof allRows==='undefined' || !Array.isArray(allRows)) return false;
    resetBaseFiltersForShortcut();
    window.__ELTAUM_ACTIVE_SHORTCUT_PRESET__=preset;

    keepFundAreaStable(()=>{
      try{
        filtered=allRows.filter(row=>rowMatchesGroup(row,preset) && rowMatchesSearch(row));
      }catch(e){
        console.warn('[Atalhos v10] filtro direto falhou:',e);
        filtered=[];
      }
      renderFundListOnce();
      syncShortcutVisual(preset);
    });
    return true;
  }

  function applyShortcutPreset(preset){
    preset=String(preset||'all');

    if(GROUP_PRESETS.has(preset)){
      applyGroupPresetDirect(preset);
      return;
    }

    keepFundAreaStable(()=>{
      if(preset==='favoritos'){
        window.__ELTAUM_ACTIVE_SHORTCUT_PRESET__='favoritos';
        try{ if(typeof toggleFavList==='function') toggleFavList(); else if(typeof applyFilter==='function') applyFilter(); }catch(e){ console.warn('[Atalhos v10] favoritos falhou:',e); }
        syncShortcutVisual('favoritos');
        return;
      }

      if(preset==='all'){
        window.__ELTAUM_ACTIVE_SHORTCUT_PRESET__='all';
        try{ activeCat=''; activeBenchmark=''; activePerfil=''; activeRisco=''; hideSemDados=false; window.__favListMode=false; }catch(e){}
        try{ if(typeof syncFilterControls==='function') syncFilterControls(); }catch(e){}
        try{ if(typeof applyFilter==='function') applyFilter(); }catch(e){ console.warn('[Atalhos v10] todos falhou:',e); }
        syncShortcutVisual('all');
        return;
      }

      resetBaseFiltersForShortcut();
      window.__ELTAUM_ACTIVE_SHORTCUT_PRESET__=preset;
      try{
        if(preset==='cdi') activeBenchmark='CDI';
        else if(preset==='ipca') activeBenchmark='IPCA';
        else if(preset==='conservador') activeRisco='Conservador';
      }catch(e){}

      try{ if(typeof syncFilterControls==='function') syncFilterControls(); }catch(e){}
      try{ if(typeof applyFilter==='function') applyFilter(); }catch(e){ console.warn('[Atalhos v10] aplicar filtro falhou:',e); }
      syncShortcutVisual(preset);
    });
  }

  let __lastShortcutClick={preset:'',t:0};

  function shortcutHandler(ev){
    const target=ev.target;
    const btn=target && target.closest ? target.closest('.shortcut-preset[data-preset], .filter-preset-chip[data-preset]') : null;
    if(!btn) return;
    const preset=btn.dataset.preset||'all';
    if(!VALID_PRESETS.has(preset)) return;

    ev.preventDefault();
    ev.stopPropagation();
    if(typeof ev.stopImmediatePropagation==='function') ev.stopImmediatePropagation();

    const now=Date.now();
    if(__lastShortcutClick.preset===preset && now-__lastShortcutClick.t<420) return;
    __lastShortcutClick={preset,t:now};
    applyShortcutPreset(preset);
  }

  let __setupDone=false;
  function setup(){
    if(__setupDone) return;
    __setupDone=true;
    ['pointerup','click','touchend'].forEach(type=>{
      document.addEventListener(type, shortcutHandler, true);
    });
    document.getElementById('activeFilterStrip')?.addEventListener('click',ev=>{
      const b=ev.target.closest('[data-elton-clear-shortcut]');
      if(!b) return;
      ev.preventDefault();
      ev.stopPropagation();
      if(typeof ev.stopImmediatePropagation==='function') ev.stopImmediatePropagation();
      applyShortcutPreset('all');
    },true);
    syncShortcutVisual(window.__ELTAUM_ACTIVE_SHORTCUT_PRESET__||'all');
    console.info('[Catálogo CAIXA] Atalhos do catálogo prontos:', BUILD);
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
      resultInfo:document.getElementById('resultInfo')?.textContent||'',
      botoes:atalhos.map(b=>({texto:b.textContent.trim(),preset:b.dataset.preset,classe:b.className,aria:b.getAttribute('aria-pressed')}))
    };
    console.table(out.botoes);
    console.log('[Diagnóstico atalhos]',out);
    return out;
  };

  window.__eltonAplicarAtalhoSuave=applyShortcutPreset;

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>setTimeout(setup,650));
  else setTimeout(setup,650);
})();


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
   PATCH v33 — Filtros mobile no padrão de classes CAIXA
   - Substitui filtros rápidos genéricos por abas de classe de fundo.
   - Avançados ficam secundários: Benchmark, Perfil e Risco.
   - Categoria antiga fica oculta no mobile para evitar redundância.
════════════════════════════════════════════════════════ */
(function(){
  'use strict';

  function isMobileV33(){
    try{return window.matchMedia && window.matchMedia('(max-width: 820px)').matches;}catch(e){return false;}
  }
  function qs(sel,root=document){return root.querySelector(sel);}
  function qsa(sel,root=document){return Array.from(root.querySelectorAll(sel));}
  function norm(s){
    return String(s||'')
      .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
      .replace(/[–—]/g,'-')
      .replace(/\s+/g,' ')
      .trim().toUpperCase();
  }

  const CAIXA_CLASSES = [
    {key:'', label:'Todos os fundos', short:'Todos'},
    {key:'RENDA FIXA SIMPLES', label:'Renda Fixa Simples', short:'RF Simples'},
    {key:'RENDA FIXA', label:'Renda Fixa', short:'Renda Fixa'},
    {key:'RENDA FIXA REFERENCIADO', label:'Renda Fixa Referenciado', short:'RF Referenciado'},
    {key:'RENDA FIXA CURTO PRAZO', label:'Renda Fixa Curto Prazo', short:'RF Curto Prazo'},
    {key:'MULTIMERCADO', label:'Multimercado', short:'Multimercado'},
    {key:'CAMBIAL', label:'Cambial', short:'Cambial'},
    {key:'ACOES', label:'Ações', short:'Ações'},
    {key:'FUNDO DE INDICE', label:'Fundo de Índice', short:'Índice'},
    {key:'FUNDOS MUTUOS DE PRIVATIZACAO', label:'Fundos Mútuos de Privatização', short:'FMP'}
  ];

  function getCurrentCat(){
    try{return activeCat || '';}catch(e){return '';}
  }
  function getCurrentBenchmark(){
    try{return activeBenchmark || '';}catch(e){return '';}
  }
  function getCurrentPerfil(){
    try{return activePerfil || '';}catch(e){return '';}
  }
  function getCurrentRisco(){
    try{return activeRisco || '';}catch(e){return '';}
  }

  function findCatButtonByKey(key){
    const wanted=norm(key);
    const buttons=qsa('#catFilters [data-cat]');
    if(!key) return qs('#catFilters [data-cat=""]');
    return buttons.find(b=>{
      const val=norm(b.dataset.cat || b.textContent || '');
      return val===wanted || val.includes(wanted) || wanted.includes(val);
    });
  }

  function setCategory(key){
    const btn=findCatButtonByKey(key);
    if(btn){
      btn.click();
    }else{
      try{activeCat=key || '';}catch(e){}
      try{ if(typeof applyFilter==='function') applyFilter(); }catch(e){}
    }
    setTimeout(refreshV33,80);
  }

  function setQuick(type){
    try{
      if(type==='pf') activePerfil = getCurrentPerfil()==='PF' ? '' : 'PF';
      if(type==='cdi') activeBenchmark = getCurrentBenchmark()==='CDI' ? '' : 'CDI';
      if(type==='conservador') activeRisco = getCurrentRisco()==='Conservador' ? '' : 'Conservador';
      if(typeof applyFilter==='function') applyFilter();
    }catch(e){}
    setTimeout(refreshV33,80);
  }

  function refreshV33(){
    const cur=norm(getCurrentCat());
    qsa('.filter-class-tab-v33').forEach(btn=>{
      const key=norm(btn.dataset.v33Cat||'');
      const active=(!key && !cur) || (!!key && (cur===key || cur.includes(key) || key.includes(cur)));
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-selected', active ? 'true':'false');
    });
    qsa('.filter-refine-chip-v33').forEach(btn=>{
      const kind=btn.dataset.v33Quick;
      let active=false;
      if(kind==='pf') active=getCurrentPerfil()==='PF';
      if(kind==='cdi') active=getCurrentBenchmark()==='CDI';
      if(kind==='conservador') active=getCurrentRisco()==='Conservador';
      btn.classList.toggle('is-active',active);
      btn.setAttribute('aria-pressed',active?'true':'false');
    });
    const drawer=qs('#fundFilterDrawer');
    const toggle=qs('.filter-advanced-toggle-v33');
    if(drawer&&toggle){
      const open=drawer.classList.contains('filters-advanced-open');
      toggle.setAttribute('aria-expanded',open?'true':'false');
      const txt=toggle.querySelector('.filter-advanced-state-v33');
      if(txt) txt.textContent=open?'Ocultar':'Mais filtros';
    }
    const apply=qs('#filterApplyBtn');
    if(apply) apply.textContent='Ver resultados';
    const head=qs('#fundFilterDrawer .filter-sheet-head span');
    if(head) head.textContent='Escolha uma classe de fundo no padrão CAIXA. Use “Mais filtros” apenas se precisar refinar.';
  }

  function buildV33(){
    const drawer=qs('#fundFilterDrawer');
    if(!drawer) return;

    // Remove interface antiga do patch v28 para evitar camadas duplicadas/confusas.
    qsa('.filter-mobile-fast-v28',drawer).forEach(el=>el.remove());

    if(drawer.querySelector('.filter-mobile-classes-v33')) return;
    const groups=qs('.filter-groups-grid',drawer);
    const panel=document.createElement('div');
    panel.className='filter-mobile-classes-v33';
    panel.innerHTML=`
      <div class="filter-class-head-v33">
        <div>
          <strong>Classe do fundo</strong>
          <small>mesma lógica de consulta por classes da CAIXA</small>
        </div>
      </div>
      <div class="filter-class-tabs-v33" role="tablist" aria-label="Classes de fundos CAIXA">
        ${CAIXA_CLASSES.map(c=>`<button type="button" class="filter-class-tab-v33" role="tab" data-v33-cat="${c.key}" aria-selected="false"><span>${c.short}</span><small>${c.label}</small></button>`).join('')}
      </div>
      <div class="filter-refine-v33" aria-label="Refinamentos rápidos">
        <span>Refinar</span>
        <button type="button" class="filter-refine-chip-v33" data-v33-quick="pf" aria-pressed="false">Pessoa Física</button>
        <button type="button" class="filter-refine-chip-v33" data-v33-quick="cdi" aria-pressed="false">CDI</button>
        <button type="button" class="filter-refine-chip-v33" data-v33-quick="conservador" aria-pressed="false">Conservador</button>
      </div>
      <button type="button" class="filter-advanced-toggle-v33" aria-expanded="false"><span>Opções avançadas</span><strong class="filter-advanced-state-v33">Mais filtros</strong></button>
    `;
    if(groups) drawer.insertBefore(panel,groups); else drawer.appendChild(panel);

    panel.addEventListener('click',ev=>{
      const cat=ev.target.closest('.filter-class-tab-v33');
      const quick=ev.target.closest('.filter-refine-chip-v33');
      const adv=ev.target.closest('.filter-advanced-toggle-v33');
      if(cat){
        ev.preventDefault(); ev.stopPropagation();
        setCategory(cat.dataset.v33Cat || '');
      }
      if(quick){
        ev.preventDefault(); ev.stopPropagation();
        setQuick(quick.dataset.v33Quick);
      }
      if(adv){
        ev.preventDefault(); ev.stopPropagation();
        const drawer=qs('#fundFilterDrawer');
        if(drawer){
          drawer.classList.toggle('filters-advanced-open');
          qsa('.filter-group-accordion',drawer).forEach(d=>d.open=false);
        }
        setTimeout(refreshV33,30);
      }
    },true);
  }

  function refineAdvanced(){
    const drawer=qs('#fundFilterDrawer');
    if(!drawer || drawer.dataset.v33Ready==='1') return;
    drawer.dataset.v33Ready='1';
    drawer.classList.add('filters-caixa-v33');
    if(isMobileV33()) drawer.classList.remove('filters-advanced-open');

    // No mobile, Categoria já aparece nas abas principais; deixamos avançado só para refino real.
    const catDetails=qs('#catFilters')?.closest('.filter-group-accordion');
    if(catDetails) catDetails.classList.add('filter-category-legacy-v33');

    drawer.addEventListener('toggle',ev=>{
      const d=ev.target;
      if(!d || !d.matches || !d.matches('.filter-group-accordion') || !d.open) return;
      qsa('.filter-group-accordion',drawer).forEach(o=>{ if(o!==d) o.open=false; });
    },true);
    drawer.addEventListener('click',ev=>{
      if(ev.target.closest('.chip')) setTimeout(refreshV33,100);
    },true);
  }

  function patchOpen(){
    const btn=qs('#mobileFilterToggle');
    const drawer=qs('#fundFilterDrawer');
    if(!btn || !drawer || btn.dataset.v33OpenPatch==='1') return;
    btn.dataset.v33OpenPatch='1';
    btn.addEventListener('click',()=>{
      setTimeout(()=>{
        if(!isMobileV33()) return;
        buildV33();
        drawer.classList.add('filters-caixa-v33');
        drawer.classList.remove('filters-advanced-open');
        qsa('.filter-group-accordion',drawer).forEach(d=>d.open=false);
        refreshV33();
      },90);
    },true);
  }

  function init(){
    buildV33();
    refineAdvanced();
    patchOpen();
    refreshV33();
    ['#clearFiltersTop','#clearFiltersBtn','#filterApplyBtn'].forEach(sel=>{
      const el=qs(sel);
      if(el && !el.dataset.v33){
        el.dataset.v33='1';
        el.addEventListener('click',()=>setTimeout(refreshV33,120),true);
      }
    });
    setInterval(()=>{ if(isMobileV33()) refreshV33(); },1600);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>setTimeout(init,450));
  else setTimeout(init,450);
})();


/* Build UI: ELTAUM_TOPO_CABECALHO_LIMPO_20260605_v36 */

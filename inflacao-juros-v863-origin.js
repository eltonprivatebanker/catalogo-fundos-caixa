/* ============================================================
   V863 — Inflação e juros · legenda IPCA fixa com parâmetros da meta (desktop)
   ------------------------------------------------------------
   Objetivos:
   1) Os textos finais da Selic já existem no HTML.
   2) Interceptar a função LEGADA que reescrevia os rótulos para
      "Selic vigente / Máxima no recorte / Mínima no recorte".
   3) Manter valores, datas, ranges, SVGs e cálculos intactos.
   4) Sincronizar o IPCA 12M no primeiro carregamento.
   5) Manter o IPCA-15 abaixo dos dois cards principais.
   6) Manter fixa a legenda do IPCA e simplificar semanticamente o IPCA-15.
   ============================================================ */
(() => {
  'use strict';

  const mq = window.matchMedia('(min-width: 769px)');
  let ipca15Home = null;
  let metaTimers = [];
  let metaNudgeDone = false;
  let legacySelicLabelFn = null;
  let selicFunctionPatched = false;
  let headerObserver = null;

  function parsePercent(text) {
    return String(text || '').match(/[-+]?\d{1,3},\d{2}%/)?.[0] || '—';
  }

  function getMetaStatus(text) {
    const value = String(text || '');
    if (/dentro/i.test(value)) return 'Dentro da faixa';
    if (/acima/i.test(value)) return 'Acima da faixa';
    if (/abaixo/i.test(value)) return 'Abaixo da faixa';
    return '—';
  }

  function clearMetaTimers() {
    metaTimers.forEach(clearTimeout);
    metaTimers = [];
  }

  /* ----------------------------------------------------------
     IPCA mensal
     ---------------------------------------------------------- */
  function applyIpcaMensal() {
    if (!mq.matches) return;
    const card = document.getElementById('mobileIpcaMensalV400');
    if (!card) return;

    const title = card.querySelector('.econ-dash-card-head-v378 h3');
    const subtitle = card.querySelector('.econ-dash-card-head-v378 h3 + p');
    const ultimoLabel = card.querySelector('#ipcaResumoUltimoV250')?.previousElementSibling;

    if (title && title.textContent.trim() !== '🎯 IPCA mensal') {
      title.innerHTML = '<span aria-hidden="true">🎯</span> IPCA mensal';
    }
    if (subtitle && subtitle.textContent.trim() !== 'Resultado oficial divulgado pelo IBGE.') {
      subtitle.textContent = 'Resultado oficial divulgado pelo IBGE.';
    }
    if (ultimoLabel && ultimoLabel.textContent.trim() !== 'Último mês') {
      ultimoLabel.textContent = 'Último mês';
    }
  }

  /* ----------------------------------------------------------
     IPCA em 12 meses
     ---------------------------------------------------------- */
  function getMetaSummary() {
    const card = document.getElementById('mobileIpcaMetaV400');
    if (!card) return null;

    let summary = document.getElementById('v860IpcaMetaSummary');
    if (!summary) {
      const chart = card.querySelector('#econSparkMetaV367');
      if (!chart) return null;

      summary = document.createElement('div');
      summary.id = 'v860IpcaMetaSummary';
      summary.setAttribute('role', 'group');
      summary.setAttribute('aria-label', 'Resumo do IPCA em 12 meses frente à meta');
      summary.innerHTML = `
        <div><small>Atual</small><strong data-v860-meta-current>—</strong></div>
        <div><small>Meta</small><strong data-v860-meta-target>3,00%</strong></div>
        <div><small>Situação</small><strong data-v860-meta-status>—</strong></div>
      `;
      chart.before(summary);
    }
    return summary;
  }

  /* V862: a legenda é fixa por CSS, inclusive meta e limites; sem reescrita por JS. */

  function applyIpcaMeta() {
    if (!mq.matches) return false;

    const card = document.getElementById('mobileIpcaMetaV400');
    if (!card) return false;

    const titleDesktop = card.querySelector('.ipca-meta-copy-desktop-v680');
    const titleDefault = card.querySelector('.ipca-meta-copy-default-v680');
    const subtitleDesktop = card.querySelector('#ipcaMetaSubtitleV680 .ipca-meta-copy-desktop-v680');
    const subtitleDefault = card.querySelector('#ipcaMetaSubtitleV680 .ipca-meta-copy-default-v680');

    if (titleDesktop) titleDesktop.textContent = 'IPCA em 12 meses';
    if (titleDefault) titleDefault.textContent = 'IPCA em 12 meses';
    if (subtitleDesktop) subtitleDesktop.textContent = 'Evolução frente à meta de inflação.';
    if (subtitleDefault) subtitleDefault.textContent = 'Evolução frente à meta de inflação.';

    const note = card.querySelector('#evoCardMetaNote');
    const noteText = note?.textContent || '';
    const currentLegend = card.querySelector('.econ-meta-legend-current-v680');
    const legendPercent = parsePercent(currentLegend?.textContent);
    const current = legendPercent !== '—' ? legendPercent : parsePercent(noteText);
    const target = card.querySelector('.econ-meta-band-v378 .is-central-v680 b')
      ?.textContent?.trim() || '3,00%';
    const status = getMetaStatus(noteText);

    const summary = getMetaSummary();
    if (summary) {
      const currentEl = summary.querySelector('[data-v860-meta-current]');
      const targetEl = summary.querySelector('[data-v860-meta-target]');
      const statusEl = summary.querySelector('[data-v860-meta-status]');
      if (currentEl) currentEl.textContent = current;
      if (targetEl) targetEl.textContent = target;
      if (statusEl) statusEl.textContent = status;
    }

    return current !== '—' && status !== '—';
  }

  function ipcaSourceLooksReady() {
    const ultimo = document.getElementById('ipcaResumoUltimoV250');
    const chart = document.getElementById('econSparkIpcaV367');
    return parsePercent(ultimo?.textContent) !== '—' || !!chart?.querySelector('svg, canvas');
  }

  function nudgeMetaRendererOnce() {
    if (metaNudgeDone || !mq.matches || !ipcaSourceLooksReady()) return;

    const card = document.getElementById('mobileIpcaMetaV400');
    const btn12 = card?.querySelector('[data-dash-range-target="meta"][data-dash-range="12"]');
    if (!btn12) return;

    metaNudgeDone = true;
    btn12.click();
  }

  function scheduleMetaInitialSync() {
    clearMetaTimers();
    metaNudgeDone = false;

    const delays = [0, 100, 280, 600, 1100, 1800, 3000, 4600];
    metaTimers = delays.map(delay => setTimeout(() => {
      if (!mq.matches) return;
      const ready = applyIpcaMeta();
      if (!ready) nudgeMetaRendererOnce();
      if (metaNudgeDone) requestAnimationFrame(applyIpcaMeta);
    }, delay));
  }

  function scheduleMetaAfterInteraction() {
    clearMetaTimers();
    const delays = [0, 35, 100, 220, 480];
    metaTimers = delays.map(delay => setTimeout(() => {
      if (mq.matches) applyIpcaMeta();
    }, delay));
  }

  /* ----------------------------------------------------------
     IPCA-15 — faixa própria
     ---------------------------------------------------------- */
  function applyIpca15Semantics() {
    if (!mq.matches) return;

    const preview = document.getElementById('ipca15PreviewV712');
    if (!preview) return;

    const period = preview.querySelector('#ipca15PeriodoV712');
    if (period) {
      const text = period.textContent.trim();
      const match = text.match(/(?:·\s*)?([a-zç]{3}\/\d{4})\s*$/i);
      if (match) {
        const finalText = `Referência: ${match[1]}`;
        if (period.textContent.trim() !== finalText) period.textContent = finalText;
      } else if (/aguardando/i.test(text) && text !== 'Referência: aguardando IBGE') {
        period.textContent = 'Referência: aguardando IBGE';
      }
    }

    const compareLabel = preview.querySelector('.ipca15-compare-label-v712');
    if (compareLabel && compareLabel.textContent.trim() !== 'COMPARAÇÃO COM O IPCA') {
      compareLabel.textContent = 'COMPARAÇÃO COM O IPCA';
    }
  }

  function moveIpca15ToFlow() {
    if (!mq.matches) return;

    const grid = document.querySelector('.econ-dashboard-grid-v378');
    const preview = document.getElementById('ipca15PreviewV712');
    const selic = document.getElementById('mobileSelicV400');
    if (!grid || !preview || !selic) return;

    if (!ipca15Home) {
      ipca15Home = { parent: preview.parentNode, next: preview.nextSibling };
    }

    let row = document.getElementById('v860Ipca15Row');
    if (!row) {
      row = document.createElement('section');
      row.id = 'v860Ipca15Row';
      row.setAttribute('aria-label', 'IPCA-15 — prévia da inflação');
    }

    if (row.parentNode !== grid) grid.insertBefore(row, selic);
    if (preview.parentNode !== row) row.appendChild(preview);
  }

  function restoreIpca15() {
    const row = document.getElementById('v860Ipca15Row');
    const preview = document.getElementById('ipca15PreviewV712');

    if (preview && ipca15Home?.parent) {
      if (ipca15Home.next && ipca15Home.next.parentNode === ipca15Home.parent) {
        ipca15Home.parent.insertBefore(preview, ipca15Home.next);
      } else {
        ipca15Home.parent.appendChild(preview);
      }
    }
    row?.remove();
  }

  /* ----------------------------------------------------------
     SELIC — semântica final na origem
     ---------------------------------------------------------- */
  function applySelicFinalText() {
    if (!mq.matches) return;

    const card = document.getElementById('mobileSelicV400');
    if (!card) return;

    const h3 = card.querySelector('.econ-dash-card-head-v378 h3');
    const subtitle = card.querySelector('.econ-dash-card-head-v378 h3 + p');
    const current = card.querySelector('.selic-kpi-focus-card-v415.is-current > span');
    const max = card.querySelector('#selicMaxLabelV381');
    const min = card.querySelector('#selicMinLabelV381');

    if (h3 && h3.textContent.trim() !== '🏦 Selic') {
      h3.innerHTML = '<span aria-hidden="true">🏦</span> Selic';
    }
    if (subtitle && subtitle.textContent.trim() !== 'Trajetória da taxa meta.') {
      subtitle.textContent = 'Trajetória da taxa meta.';
    }
    if (current && current.textContent.trim() !== 'ATUAL') current.textContent = 'ATUAL';
    if (max && max.textContent.trim() !== 'MÁXIMA NO PERÍODO') max.textContent = 'MÁXIMA NO PERÍODO';
    if (min && min.textContent.trim() !== 'MÍNIMA NO PERÍODO') min.textContent = 'MÍNIMA NO PERÍODO';
  }

  function installSelicLabelOriginPatch() {
    if (selicFunctionPatched) return;

    const fn = window.econAtualizarSelicKpiLabelsV381;
    if (typeof fn !== 'function') return;

    legacySelicLabelFn = fn;

    window.econAtualizarSelicKpiLabelsV381 = function(range) {
      if (!mq.matches) {
        return legacySelicLabelFn.apply(this, arguments);
      }

      /*
       * O renderer já atualizou valores e datas antes de chegar aqui.
       * Na V860 esta função passa a cuidar somente da nomenclatura final.
       */
      applySelicFinalText();
      return range;
    };

    selicFunctionPatched = true;
  }

  function installHeaderGuard() {
    headerObserver?.disconnect();
    headerObserver = null;

    if (!mq.matches || !('MutationObserver' in window)) return;

    const card = document.getElementById('mobileSelicV400');
    const h3 = card?.querySelector('.econ-dash-card-head-v378 h3');
    const subtitle = card?.querySelector('.econ-dash-card-head-v378 h3 + p');
    if (!h3 || !subtitle) return;

    /*
     * Observação deliberadamente restrita a dois textos de cabeçalho.
     * Evita que o patch executivo antigo V653 reassuma o título.
     */
    headerObserver = new MutationObserver(() => {
      if (mq.matches) applySelicFinalText();
    });

    headerObserver.observe(h3, { childList:true, characterData:true, subtree:true });
    headerObserver.observe(subtitle, { childList:true, characterData:true, subtree:true });
  }

  function applyDesktop() {
    if (!mq.matches) return;
    installSelicLabelOriginPatch();
    applyIpcaMensal();
    applyIpcaMeta();
    moveIpca15ToFlow();
    applyIpca15Semantics();
    applySelicFinalText();
    document.documentElement.classList.add('v861-inflacao-ready');
  }

  function onClickCapture(event) {
    if (!mq.matches) return;

    if (event.target.closest(
      '#mobileIpcaMetaV400 [data-dash-range-target="meta"], ' +
      '#mobileIpcaMensalV400 [data-dash-range-target="ipca"]'
    )) {
      scheduleMetaAfterInteraction();
      return;
    }

    if (event.target.closest(
      '#mobileSelicV400 [data-dash-range-target="selic"], #selicCustomApplyV596'
    )) {
      /* A função de labels já foi interceptada; este microtask cobre apenas cabeçalho legado. */
      queueMicrotask(applySelicFinalText);
    }
  }

  function refresh() {
    if (!mq.matches) {
      clearMetaTimers();
      headerObserver?.disconnect();
      restoreIpca15();
      document.documentElement.classList.remove('v861-inflacao-ready');
      return;
    }

    applyDesktop();
    installHeaderGuard();
    scheduleMetaInitialSync();
  }

  function init() {
    installSelicLabelOriginPatch();
    refresh();

    document.addEventListener('click', onClickCapture, true);
    window.addEventListener('pageshow', refresh);
    mq.addEventListener?.('change', refresh);

    /* Reaplica antes do primeiro paint após DOMContentLoaded. */
    requestAnimationFrame(() => {
      applySelicFinalText();
      applyIpcaMeta();
      applyIpca15Semantics();
    });

    [120, 400, 900, 1800, 3200].forEach(delay => {
      setTimeout(() => {
        if (mq.matches) applyIpca15Semantics();
      }, delay);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once:true });
  } else {
    init();
  }
})();

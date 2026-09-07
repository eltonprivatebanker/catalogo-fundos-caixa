/* ============================================================
   V859 — Inflação e juros · sincronização final desktop
   Camada de apresentação. Não altera valores, séries, SVGs ou APIs.
   Sem MutationObserver e sem timers contínuos.
   ============================================================ */
(() => {
  'use strict';

  const mq = window.matchMedia('(min-width: 769px)');
  const originals = new Map();
  let ipca15Home = null;
  let selicTimers = [];
  let metaTimers = [];
  let metaNudgeDone = false;

  function rememberText(el) {
    if (el && !originals.has(el)) {
      originals.set(el, { type: 'text', value: el.textContent });
    }
  }

  function rememberHtml(el) {
    if (el && !originals.has(el)) {
      originals.set(el, { type: 'html', value: el.innerHTML });
    }
  }

  function setText(el, value) {
    if (!el) return;
    rememberText(el);
    if (el.textContent !== value) el.textContent = value;
  }

  function setHtml(el, value) {
    if (!el) return;
    rememberHtml(el);
    if (el.innerHTML !== value) el.innerHTML = value;
  }

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

  function applyIpcaMensal() {
    const card = document.getElementById('mobileIpcaMensalV400');
    if (!card) return;

    const title = card.querySelector('.econ-dash-card-head-v378 h3');
    const subtitle = card.querySelector('.econ-dash-card-head-v378 h3 + p');
    const ultimo = card.querySelector('#ipcaResumoUltimoV250');

    setHtml(title, '<span aria-hidden="true">🎯</span> IPCA mensal');
    setText(subtitle, 'Resultado oficial divulgado pelo IBGE.');
    setText(ultimo?.previousElementSibling, 'Último mês');
  }

  function ensureMetaSummary(card) {
    let summary = document.getElementById('v859IpcaMetaSummary');
    const chart = card.querySelector('#econSparkMetaV367');
    if (!chart) return null;

    if (!summary) {
      summary = document.createElement('div');
      summary.id = 'v859IpcaMetaSummary';
      summary.setAttribute('role', 'group');
      summary.setAttribute('aria-label', 'Resumo do IPCA em 12 meses frente à meta');
      summary.innerHTML = `
        <div><small>Atual</small><strong data-v859-meta-current>—</strong></div>
        <div><small>Meta</small><strong data-v859-meta-target>—</strong></div>
        <div><small>Situação</small><strong data-v859-meta-status>—</strong></div>
      `;
      chart.before(summary);
    }

    return summary;
  }

  function applyMetaLegend(card) {
    const legend = card.querySelector('.econ-meta-legend-v379');
    if (!legend) return;

    const items = [...legend.querySelectorAll(':scope > span')];
    const labels = ['IPCA 12M', 'Meta', 'Faixa de tolerância'];

    items.slice(0, 3).forEach((item, index) => {
      setText(item.querySelector('.ipca-meta-legend-desktop-v680'), labels[index]);
      setText(item.querySelector('.ipca-meta-legend-default-v680'), labels[index]);
    });
  }

  function applyIpcaMeta() {
    const card = document.getElementById('mobileIpcaMetaV400');
    if (!card) return false;

    setText(card.querySelector('.ipca-meta-copy-desktop-v680'), 'IPCA em 12 meses');
    setText(
      card.querySelector('#ipcaMetaSubtitleV680 .ipca-meta-copy-desktop-v680'),
      'Evolução frente à meta de inflação.'
    );

    const note = card.querySelector('#evoCardMetaNote');
    const noteText = note?.textContent || '';
    const currentLegend = card.querySelector('.econ-meta-legend-current-v680');
    const legendPercent = parsePercent(currentLegend?.textContent);
    const current = legendPercent !== '—' ? legendPercent : parsePercent(noteText);
    const target = card.querySelector('.econ-meta-band-v378 .is-central-v680 b')
      ?.textContent?.trim() || '3,00%';
    const status = getMetaStatus(noteText);

    const summary = ensureMetaSummary(card);
    if (summary) {
      summary.querySelector('[data-v859-meta-current]').textContent = current;
      summary.querySelector('[data-v859-meta-target]').textContent = target;
      summary.querySelector('[data-v859-meta-status]').textContent = status;
    }

    applyMetaLegend(card);
    return current !== '—' && status !== '—';
  }

  function moveIpca15ToFlow() {
    const grid = document.querySelector('.econ-dashboard-grid-v378');
    const preview = document.getElementById('ipca15PreviewV712');
    const selic = document.getElementById('mobileSelicV400');
    if (!grid || !preview || !selic) return;

    if (!ipca15Home) {
      ipca15Home = {
        parent: preview.parentNode,
        next: preview.nextSibling
      };
    }

    let row = document.getElementById('v859Ipca15Row');
    if (!row) {
      row = document.createElement('section');
      row.id = 'v859Ipca15Row';
      row.setAttribute('aria-label', 'IPCA-15 — prévia da inflação');
    }

    if (row.parentNode !== grid) grid.insertBefore(row, selic);
    if (preview.parentNode !== row) row.appendChild(preview);
  }

  function restoreIpca15() {
    const row = document.getElementById('v859Ipca15Row');
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

  function applySelicSemanticText() {
    const card = document.getElementById('mobileSelicV400');
    if (!card) return;

    setHtml(
      card.querySelector('.econ-dash-card-head-v378 h3'),
      '<span aria-hidden="true">🏦</span> Selic'
    );
    setText(card.querySelector('.econ-dash-card-head-v378 h3 + p'), 'Trajetória da taxa meta.');
    setText(card.querySelector('.selic-kpi-focus-card-v415.is-current > span'), 'Atual');
    setText(card.querySelector('#selicMaxLabelV381'), 'Máxima no período');
    setText(card.querySelector('#selicMinLabelV381'), 'Mínima no período');
  }

  function clearTimers(list) {
    list.forEach(clearTimeout);
    list.length = 0;
  }

  function scheduleSelicInitialSync() {
    clearTimers(selicTimers);
    const delays = [0, 60, 180, 450, 900, 1600, 2600];
    selicTimers = delays.map(delay => setTimeout(() => {
      if (!mq.matches) return;
      applySelicSemanticText();
    }, delay));
  }

  function scheduleSelicInteractionSync() {
    const card = document.getElementById('mobileSelicV400');
    if (!card) return;

    clearTimers(selicTimers);
    card.classList.add('v859-selic-syncing');

    const delays = [0, 40, 120, 260];
    selicTimers = delays.map((delay, index) => setTimeout(() => {
      if (!mq.matches) return;
      applySelicSemanticText();

      if (index === delays.length - 1) {
        requestAnimationFrame(() => {
          applySelicSemanticText();
          card.classList.remove('v859-selic-syncing');
        });
      }
    }, delay));
  }

  function ipcaSourceLooksReady() {
    const ultimo = document.getElementById('ipcaResumoUltimoV250');
    const chart = document.getElementById('econSparkIpcaV367');
    return parsePercent(ultimo?.textContent) !== '—' || !!chart?.querySelector('svg, canvas');
  }

  function nudgeMetaRendererOnce() {
    if (metaNudgeDone || !mq.matches) return;
    if (!ipcaSourceLooksReady()) return;

    const card = document.getElementById('mobileIpcaMetaV400');
    const active = card?.querySelector('[data-dash-range-target="meta"][data-dash-range="12"]');
    if (!active) return;

    metaNudgeDone = true;
    active.click();
  }

  function scheduleMetaInitialSync() {
    clearTimers(metaTimers);
    metaNudgeDone = false;

    const delays = [0, 120, 350, 700, 1200, 2000, 3200, 4800];
    metaTimers = delays.map(delay => setTimeout(() => {
      if (!mq.matches) return;
      const ready = applyIpcaMeta();
      if (!ready) nudgeMetaRendererOnce();
      if (metaNudgeDone) {
        requestAnimationFrame(() => applyIpcaMeta());
      }
    }, delay));
  }

  function scheduleMetaAfterInteraction() {
    clearTimers(metaTimers);
    const delays = [0, 40, 120, 260, 520];
    metaTimers = delays.map(delay => setTimeout(() => {
      if (!mq.matches) return;
      applyIpcaMeta();
    }, delay));
  }

  function applyDesktopBase() {
    applyIpcaMensal();
    applyIpcaMeta();
    moveIpca15ToFlow();
    applySelicSemanticText();
    document.documentElement.classList.add('v859-inflacao-ready');
  }

  function restoreDesktopTexts() {
    clearTimers(selicTimers);
    clearTimers(metaTimers);

    document.getElementById('mobileSelicV400')?.classList.remove('v859-selic-syncing');
    restoreIpca15();
    document.getElementById('v859IpcaMetaSummary')?.remove();

    for (const [el, saved] of originals) {
      if (!el?.isConnected) continue;
      if (saved.type === 'html') el.innerHTML = saved.value;
      else el.textContent = saved.value;
    }
    originals.clear();
    document.documentElement.classList.remove('v859-inflacao-ready');
  }

  function refresh() {
    if (!mq.matches) {
      restoreDesktopTexts();
      return;
    }

    applyDesktopBase();
    scheduleSelicInitialSync();
    scheduleMetaInitialSync();
  }

  function onClickCapture(event) {
    if (!mq.matches) return;

    if (event.target.closest(
      '#mobileSelicV400 [data-dash-range-target="selic"], #selicCustomApplyV596'
    )) {
      scheduleSelicInteractionSync();
      return;
    }

    if (event.target.closest(
      '#mobileIpcaMetaV400 [data-dash-range-target="meta"], ' +
      '#mobileIpcaMensalV400 [data-dash-range-target="ipca"]'
    )) {
      scheduleMetaAfterInteraction();
    }
  }

  function init() {
    refresh();
    document.addEventListener('click', onClickCapture, true);
    window.addEventListener('pageshow', refresh);
    mq.addEventListener?.('change', refresh);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();

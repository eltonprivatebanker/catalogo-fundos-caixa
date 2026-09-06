/* ============================================================
   V857 — Inflação e juros · semântica desktop
   Camada de apresentação: não altera valores, cálculos ou SVGs.
   Sem MutationObserver: reaplica somente em momentos controlados.
   ============================================================ */
(() => {
  'use strict';

  const DESKTOP = '(min-width: 769px)';
  const mq = window.matchMedia(DESKTOP);
  const originals = new Map();
  let timers = [];

  function rememberText(el) {
    if (el && !originals.has(el)) originals.set(el, { type: 'text', value: el.textContent });
  }

  function rememberHtml(el) {
    if (el && !originals.has(el)) originals.set(el, { type: 'html', value: el.innerHTML });
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

  function restoreTexts() {
    for (const [el, saved] of originals) {
      if (!el?.isConnected) continue;
      if (saved.type === 'html') el.innerHTML = saved.value;
      else el.textContent = saved.value;
    }
    originals.clear();

    document.getElementById('v857IpcaMetaSummary')?.remove();
  }

  function parsePercent(text) {
    return String(text || '').match(/[-+]?\d{1,3},\d{2}%/)?.[0] || '—';
  }

  function applyIpcaOfficial() {
    const card = document.getElementById('mobileIpcaMensalV400');
    if (!card) return;

    const title = card.querySelector('.econ-dash-card-head-v378 h3');
    const subtitle = card.querySelector('.econ-dash-card-head-v378 h3 + p');
    const ultimoValue = card.querySelector('#ipcaResumoUltimoV250');
    const ultimoLabel = ultimoValue?.previousElementSibling;

    setHtml(title, '<span aria-hidden="true">🎯</span> IPCA oficial');
    setText(subtitle, 'Inflação mensal medida pelo IBGE.');
    setText(ultimoLabel, 'Último mês');
  }

  function getMetaStatus(noteText) {
    const text = String(noteText || '');
    if (/dentro/i.test(text)) return 'Dentro da faixa';
    if (/acima/i.test(text)) return 'Acima da faixa';
    if (/abaixo/i.test(text)) return 'Abaixo da faixa';
    return '—';
  }

  function ensureMetaSummary(card) {
    let summary = document.getElementById('v857IpcaMetaSummary');
    const chart = card.querySelector('#econSparkMetaV367');
    if (!chart) return null;

    if (!summary) {
      summary = document.createElement('div');
      summary.id = 'v857IpcaMetaSummary';
      summary.setAttribute('role', 'group');
      summary.setAttribute('aria-label', 'Resumo do IPCA em 12 meses frente à meta');
      summary.innerHTML = `
        <div><small>Atual</small><strong data-v857-meta-current>—</strong></div>
        <div><small>Meta</small><strong data-v857-meta-target>—</strong></div>
        <div><small>Situação</small><strong data-v857-meta-status>—</strong></div>
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

    items.slice(0, 3).forEach((item, i) => {
      const desktop = item.querySelector('.ipca-meta-legend-desktop-v680');
      const fallback = item.querySelector('.ipca-meta-legend-default-v680');
      setText(desktop, labels[i]);
      setText(fallback, labels[i]);
    });
  }

  function applyIpcaMeta() {
    const card = document.getElementById('mobileIpcaMetaV400');
    if (!card) return;

    const title = card.querySelector('.ipca-meta-copy-desktop-v680');
    const subtitle = card.querySelector('#ipcaMetaSubtitleV680 .ipca-meta-copy-desktop-v680');
    setText(title, 'IPCA em 12 meses');
    setText(subtitle, 'Evolução frente à meta de inflação.');

    const note = card.querySelector('#evoCardMetaNote');
    const noteText = note?.textContent || '';
    const currentLegend = card.querySelector('.econ-meta-legend-current-v680');
    const current = parsePercent(currentLegend?.textContent) !== '—'
      ? parsePercent(currentLegend?.textContent)
      : parsePercent(noteText);

    const target = card.querySelector('.econ-meta-band-v378 .is-central-v680 b')?.textContent?.trim() || '3,00%';
    const status = getMetaStatus(noteText);

    const summary = ensureMetaSummary(card);
    if (summary) {
      const currentEl = summary.querySelector('[data-v857-meta-current]');
      const targetEl = summary.querySelector('[data-v857-meta-target]');
      const statusEl = summary.querySelector('[data-v857-meta-status]');
      if (currentEl) currentEl.textContent = current;
      if (targetEl) targetEl.textContent = target;
      if (statusEl) statusEl.textContent = status;
    }

    applyMetaLegend(card);
  }

  function applySelic() {
    const card = document.getElementById('mobileSelicV400');
    if (!card) return;

    const title = card.querySelector('.econ-dash-card-head-v378 h3');
    const subtitle = card.querySelector('.econ-dash-card-head-v378 h3 + p');
    const currentLabel = card.querySelector('.selic-kpi-focus-card-v415.is-current > span');
    const maxLabel = card.querySelector('#selicMaxLabelV381');
    const minLabel = card.querySelector('#selicMinLabelV381');

    setHtml(title, '<span aria-hidden="true">🏦</span> Selic');
    setText(subtitle, 'Trajetória da taxa meta.');
    setText(currentLabel, 'Atual');
    setText(maxLabel, 'Máxima no período');
    setText(minLabel, 'Mínima no período');
  }

  function applyAll() {
    if (!mq.matches) {
      restoreTexts();
      return;
    }
    applyIpcaOfficial();
    applyIpcaMeta();
    applySelic();
  }

  function scheduleApply() {
    timers.forEach(clearTimeout);
    timers = [0, 80, 250, 700, 1600].map(delay => setTimeout(applyAll, delay));
  }

  function onInteraction(event) {
    const target = event.target.closest(
      '#sec-graficos [data-dash-range-target], #selicCustomApplyV596, #sec-graficos input[type="month"]'
    );
    if (!target) return;
    scheduleApply();
  }

  function init() {
    scheduleApply();
    document.addEventListener('click', onInteraction, true);
    document.addEventListener('change', onInteraction, true);
    window.addEventListener('pageshow', scheduleApply);
    mq.addEventListener?.('change', scheduleApply);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();

/* ============================================================
   V851 — JUROS DE REFERÊNCIA · SEMÂNTICA DESKTOP
   - altera apenas textos estáticos de apresentação;
   - aplica somente em viewport desktop (>= 769px);
   - restaura os textos originais ao voltar para mobile;
   - não altera dados, cálculos, datas, APIs ou valores dinâmicos.
   ============================================================ */
(() => {
  'use strict';

  const MEDIA = '(min-width: 769px)';
  const mq = window.matchMedia(MEDIA);
  const originals = new Map();

  function remember(el) {
    if (el && !originals.has(el)) originals.set(el, el.textContent);
    return el;
  }

  function setText(el, value) {
    if (!el) return;
    remember(el);
    el.textContent = value;
  }

  function restore() {
    originals.forEach((text, el) => {
      if (el && el.isConnected) el.textContent = text;
    });
    originals.clear();
    document.documentElement.classList.remove('rates-v851-desktop');
  }

  function applyDesktop() {
    if (!mq.matches) {
      restore();
      return;
    }

    const section = document.querySelector('.rates-reference-v167');
    const clean = document.getElementById('ratesDesktopCleanV745');

    if (!section || !clean) return;

    document.documentElement.classList.add('rates-v851-desktop');

    /* Cabeçalho: complemento sem repetir "juros" duas vezes. */
    setText(
      section.querySelector('.market-reference-kicker-v167'),
      'Mercado monetário'
    );
    setText(
      section.querySelector('.market-reference-head-v167 p'),
      'Selic, CDI e agenda do Copom.'
    );

    /* Grupos principais. */
    const groups = clean.querySelectorAll('.rates-clean-group-v745');
    if (groups[0]) {
      setText(groups[0].querySelector(':scope > span'), 'Taxas atuais');
    }
    if (groups[1]) {
      setText(groups[1].querySelector(':scope > span'), 'CDI acumulado');

      const accumulatedCards = groups[1].querySelectorAll('.rates-clean-kpi-v745');
      if (accumulatedCards[0]) {
        setText(accumulatedCards[0].querySelector('small'), '2026');
      }
      if (accumulatedCards[1]) {
        setText(accumulatedCards[1].querySelector('small'), '12 meses');
      }
    }

    /* Copom. */
    const copom = clean.querySelector('.rates-clean-copom-v745');
    if (copom) {
      setText(copom.querySelector('header strong'), 'Agenda Copom 2026');
      setText(copom.querySelector('header small'), 'Decisões e próximas reuniões.');
    }

    /* CDI recente -> nomenclatura operacional mais específica. */
    const recent = clean.querySelector('.rates-clean-recent-v745');
    if (recent) {
      setText(recent.querySelector('header strong'), 'CDI mensal');
    }
  }

  function init() {
    applyDesktop();

    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', applyDesktop);
    } else if (typeof mq.addListener === 'function') {
      mq.addListener(applyDesktop);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }

  window.addEventListener('pageshow', applyDesktop);
})();

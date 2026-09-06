/* ============================================================
   V853 — JUROS DE REFERÊNCIA · FECHAMENTO DESKTOP
   - adiciona a unidade visual "a.a." somente a Selic meta e CDI;
   - mantém a unidade fora do valor dinâmico para não alterar cálculos;
   - restaura o DOM ao retornar para viewport mobile;
   - não altera valores, datas, APIs, calendário ou lógica do painel.
   ============================================================ */
(() => {
  'use strict';

  const MEDIA = '(min-width: 769px)';
  const mq = window.matchMedia(MEDIA);
  const UNIT_CLASS = 'rates-v853-aa';

  function getCurrentRateCards() {
    const clean = document.getElementById('ratesDesktopCleanV745');
    const group = clean?.querySelector('.rates-clean-group-v745:first-child');
    if (!group) return [];
    return [...group.querySelectorAll('.rates-clean-kpi-v745')].slice(0, 2);
  }

  function installUnit(card) {
    if (!card) return;

    const value = card.querySelector('strong');
    if (!value) return;

    let unit = card.querySelector(`.${UNIT_CLASS}`);
    if (!unit) {
      unit = document.createElement('span');
      unit.className = UNIT_CLASS;
      unit.textContent = 'a.a.';
      unit.setAttribute('aria-hidden', 'true');
      value.insertAdjacentElement('afterend', unit);
    }

    const numericText = value.textContent.trim();
    const label = card.querySelector('small')?.textContent.trim() || 'Taxa';
    card.setAttribute('aria-label', `${label}: ${numericText} ao ano`);
  }

  function removeUnits() {
    document.querySelectorAll(`#ratesDesktopCleanV745 .${UNIT_CLASS}`)
      .forEach(el => el.remove());

    getCurrentRateCards().forEach(card => {
      card.removeAttribute('aria-label');
    });

    document.documentElement.classList.remove('rates-v853-desktop');
  }

  function applyDesktop() {
    if (!mq.matches) {
      removeUnits();
      return;
    }

    const cards = getCurrentRateCards();
    if (cards.length < 2) return;

    cards.forEach(installUnit);
    document.documentElement.classList.add('rates-v853-desktop');

    /* Segunda passagem cobre renderizações tardias do bloco. */
    requestAnimationFrame(() => {
      getCurrentRateCards().forEach(installUnit);
    });
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

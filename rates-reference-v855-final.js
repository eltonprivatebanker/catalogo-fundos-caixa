/* ============================================================
   V855 — JUROS DE REFERÊNCIA · FAIXA EXECUTIVA DESKTOP
   - move a indicação anual para os rótulos: SELIC META · A.A. / CDI · A.A.;
   - remove unidades visuais antigas que possam ter sido inseridas em linha própria;
   - aplica somente no desktop (>= 769px) e restaura os rótulos no mobile;
   - resiste a re-renderizações tardias sem alterar valores dinâmicos;
   - não altera dados, cálculos, datas, APIs, calendário ou regras de negócio.
   ============================================================ */
(() => {
  'use strict';

  const MEDIA = '(min-width: 769px)';
  const mq = window.matchMedia(MEDIA);
  const ROOT_ID = 'ratesDesktopCleanV745';
  const ORIGINAL_ATTR = 'data-v855-original-label';

  let observer = null;
  let applying = false;
  let rafId = 0;

  function getRoot() {
    return document.getElementById(ROOT_ID);
  }

  function getCurrentCards(root = getRoot()) {
    const group = root?.querySelector('.rates-clean-group-v745:first-child');
    if (!group) return [];
    return [...group.querySelectorAll('.rates-clean-kpi-v745')].slice(0, 2);
  }

  function rememberLabel(label) {
    if (!label || label.hasAttribute(ORIGINAL_ATTR)) return;
    label.setAttribute(ORIGINAL_ATTR, label.textContent);
  }

  function cleanLegacyAnnualUnits(card, value, label) {
    if (!card) return;

    card.querySelectorAll('.rates-v853-aa, .v853-aa-inline')
      .forEach(el => el.remove());

    [...card.children].forEach(el => {
      if (el === label || el === value) return;
      if (el.textContent.trim().toLowerCase() === 'a.a.') el.remove();
    });
  }

  function applyLabels() {
    if (!mq.matches || applying) return;

    const root = getRoot();
    const cards = getCurrentCards(root);
    if (!root || cards.length < 2) return;

    applying = true;

    const specs = [
      { card: cards[0], text: 'SELIC META · A.A.', spoken: 'Selic meta' },
      { card: cards[1], text: 'CDI · A.A.', spoken: 'CDI' }
    ];

    specs.forEach(({ card, text, spoken }) => {
      const label = card.querySelector(':scope > small');
      const value = card.querySelector(':scope > strong');
      if (!label || !value) return;

      rememberLabel(label);
      cleanLegacyAnnualUnits(card, value, label);

      if (label.textContent !== text) label.textContent = text;

      const numericText = value.textContent.trim();
      card.setAttribute('aria-label', `${spoken}: ${numericText} ao ano`);
    });

    document.documentElement.classList.add('rates-v855-desktop');
    applying = false;
  }

  function restoreMobile() {
    applying = true;
    observer?.disconnect();
    observer = null;

    const root = getRoot();
    if (root) {
      root.querySelectorAll(`[${ORIGINAL_ATTR}]`).forEach(label => {
        label.textContent = label.getAttribute(ORIGINAL_ATTR) || label.textContent;
        label.removeAttribute(ORIGINAL_ATTR);
      });

      getCurrentCards(root).forEach(card => {
        const value = card.querySelector(':scope > strong');
        const label = card.querySelector(':scope > small');
        cleanLegacyAnnualUnits(card, value, label);
        card.removeAttribute('aria-label');
      });
    }

    document.documentElement.classList.remove('rates-v855-desktop');
    applying = false;
  }

  function scheduleApply() {
    if (!mq.matches) return;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        applyLabels();
      });
    });
  }

  function installObserver() {
    observer?.disconnect();
    const root = getRoot();
    if (!root || !('MutationObserver' in window) || !mq.matches) return;

    observer = new MutationObserver(() => {
      if (!applying) scheduleApply();
    });

    observer.observe(root, {
      childList: true,
      characterData: true,
      subtree: true
    });
  }

  function apply() {
    if (!mq.matches) {
      restoreMobile();
      return;
    }

    applyLabels();
    installObserver();
    scheduleApply();
  }

  function init() {
    apply();

    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', apply);
    } else if (typeof mq.addListener === 'function') {
      mq.addListener(apply);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }

  window.addEventListener('pageshow', apply);
})();

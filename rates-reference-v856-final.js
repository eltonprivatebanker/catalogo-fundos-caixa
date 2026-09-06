/* ============================================================
   V856 — JUROS DE REFERÊNCIA · FAIXA EXECUTIVA FINAL DESKTOP
   - mantém os quatro KPIs autoexplicativos no desktop;
   - usa SELIC META · A.A., CDI · A.A., CDI · <ano> e
     CDI · 12 MESES;
   - resiste a re-renderizações tardias dos scripts legados;
   - restaura os rótulos originais ao sair do breakpoint desktop;
   - não altera valores, cálculos, datas, APIs, Copom ou mobile.
   ============================================================ */
(() => {
  'use strict';

  const MEDIA = '(min-width: 769px)';
  const mq = window.matchMedia(MEDIA);
  const ROOT_ID = 'ratesDesktopCleanV745';
  const ORIGINAL_ATTR = 'data-v856-original-label';

  let observer = null;
  let applying = false;
  let rafId = 0;

  function getRoot() {
    return document.getElementById(ROOT_ID);
  }

  function getCards(root = getRoot()) {
    if (!root) return [];
    return [...root.querySelectorAll('.rates-clean-kpi-v745')].slice(0, 4);
  }

  function rememberRawLabel(label, raw) {
    if (!label || !raw) return;
    label.setAttribute(ORIGINAL_ATTR, raw);
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

  function rawLabelFor(label, index) {
    const current = label.textContent.trim();

    /* Se um script legado re-renderizou o texto cru, preserve-o para mobile. */
    if (index === 0 && !/A\.A\./i.test(current)) return current || 'Selic meta';
    if (index === 1 && !/A\.A\./i.test(current)) return current || 'CDI';
    if ((index === 2 || index === 3) && !/^CDI\s*·/i.test(current)) return current;

    return label.getAttribute(ORIGINAL_ATTR) || current
      .replace(/^CDI\s*·\s*/i, '')
      .replace(/\s*·\s*A\.A\.$/i, '');
  }

  function desiredLabel(index, raw) {
    if (index === 0) return 'SELIC META · A.A.';
    if (index === 1) return 'CDI · A.A.';
    if (index === 2) return `CDI · ${raw || '2026'}`;
    if (index === 3) return `CDI · ${raw || '12 MESES'}`;
    return raw;
  }

  function applyLabels() {
    if (!mq.matches || applying) return;

    const root = getRoot();
    const cards = getCards(root);
    if (!root || cards.length < 4) return;

    applying = true;

    cards.forEach((card, index) => {
      const label = card.querySelector(':scope > small');
      const value = card.querySelector(':scope > strong');
      if (!label || !value) return;

      const raw = rawLabelFor(label, index);
      rememberRawLabel(label, raw);

      if (index < 2) cleanLegacyAnnualUnits(card, value, label);

      const desired = desiredLabel(index, raw);
      if (label.textContent !== desired) label.textContent = desired;

      const numericText = value.textContent.trim();
      if (index === 0) {
        card.setAttribute('aria-label', `Selic meta: ${numericText} ao ano`);
      } else if (index === 1) {
        card.setAttribute('aria-label', `CDI: ${numericText} ao ano`);
      } else {
        card.setAttribute('aria-label', `${desired}: ${numericText}`);
      }
    });

    document.documentElement.classList.add('rates-v856-desktop');
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

      getCards(root).forEach(card => {
        const value = card.querySelector(':scope > strong');
        const label = card.querySelector(':scope > small');
        cleanLegacyAnnualUnits(card, value, label);
        card.removeAttribute('aria-label');
      });
    }

    document.documentElement.classList.remove('rates-v856-desktop');
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

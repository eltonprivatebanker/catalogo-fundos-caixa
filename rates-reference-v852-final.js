/* ============================================================
   V852 — JUROS DE REFERÊNCIA · AJUSTE FINAL DESKTOP
   - garante o subtítulo semântico aprovado na V851;
   - resiste a reescritas tardias de scripts legados;
   - atua somente no desktop (>= 769px);
   - não altera dados, valores, cálculos, datas ou APIs.
   ============================================================ */
(() => {
  'use strict';

  const MEDIA = '(min-width: 769px)';
  const DESKTOP_TEXT = 'Selic, CDI e agenda do Copom.';
  const mq = window.matchMedia(MEDIA);

  let subtitle = null;
  let originalText = null;
  let observer = null;
  let applying = false;

  function getSubtitle() {
    return document.querySelector(
      '.rates-reference-v167 .market-reference-head-v167 p'
    );
  }

  function enforceDesktopText() {
    if (!mq.matches) return;

    const current = getSubtitle();
    if (!current) return;

    if (subtitle !== current) {
      subtitle = current;
      if (originalText === null) originalText = current.textContent;
      installObserver();
    }

    if (subtitle.textContent !== DESKTOP_TEXT) {
      applying = true;
      subtitle.textContent = DESKTOP_TEXT;
      applying = false;
    }

    document.documentElement.classList.add('rates-v852-desktop');
  }

  function installObserver() {
    observer?.disconnect();
    if (!subtitle || !('MutationObserver' in window)) return;

    observer = new MutationObserver(() => {
      if (applying || !mq.matches) return;
      if (subtitle.textContent !== DESKTOP_TEXT) {
        enforceDesktopText();
      }
    });

    observer.observe(subtitle, {
      childList: true,
      characterData: true,
      subtree: true
    });
  }

  function restoreMobile() {
    observer?.disconnect();
    observer = null;

    const current = getSubtitle();
    if (current && originalText !== null) {
      current.textContent = originalText;
    }

    subtitle = null;
    originalText = null;
    document.documentElement.classList.remove('rates-v852-desktop');
  }

  function apply() {
    if (mq.matches) {
      enforceDesktopText();

      /* Uma segunda passagem cobre renderizações tardias dos dados. */
      requestAnimationFrame(() => {
        requestAnimationFrame(enforceDesktopText);
      });
    } else {
      restoreMobile();
    }
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

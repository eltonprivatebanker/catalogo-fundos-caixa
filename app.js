/*
 * Catálogo de Fundos CAIXA
 * TESTE PRONTO PARA GITHUB — v845
 *
 * Objetivo:
 *   Exibir a taxa REAL de administração na linha principal do Catálogo desktop:
 *   Categoria → CNPJ → Adm. 0,20% a.a. → Copiar
 *
 * Este arquivo preserva a versão atual do app.js do commit:
 *   b9d1051010da48d6c0ab5a26b2f721ed1ed2fa99
 * e aplica somente a melhoria visual da taxa de administração.
 */

(function catalogoV845Bootstrap() {
  'use strict';

  const CORE_URL = 'https://cdn.jsdelivr.net/gh/eltonprivatebanker/catalogo-fundos-caixa@b9d1051010da48d6c0ab5a26b2f721ed1ed2fa99/app.js';

  function carregarAplicacaoAtualV845() {
    const core = document.createElement('script');
    core.src = CORE_URL;
    core.async = false;
    core.dataset.catalogCoreV845 = '1';

    core.onload = function() {
      instalarTaxaAdministracaoV845();
    };

    core.onerror = function() {
      console.error(
        '[v845] Não foi possível carregar a versão-base do Catálogo.',
        CORE_URL
      );

      const aviso = document.createElement('div');
      aviso.style.cssText =
        'position:fixed;left:16px;right:16px;bottom:16px;z-index:999999;' +
        'padding:12px 16px;border:1px solid #8b5c2b;border-radius:10px;' +
        'background:#21170d;color:#f6d59d;font:600 13px system-ui;';
      aviso.textContent =
        'Não foi possível carregar a versão-base do Catálogo. ' +
        'Verifique a conexão e recarregue a página.';
      document.body.appendChild(aviso);
    };

    document.head.appendChild(core);
  }

  function instalarTaxaAdministracaoV845() {
    if (window.__catalogFeeV845Installed) return;
    window.__catalogFeeV845Installed = true;

    const STYLE_ID = 'catalog-fee-v845-style';

    function obterTaxaBrutaV845(row) {
      if (!row || typeof row !== 'object') return '';

      const campos = [
        'Taxa Adm (%)',
        'Taxa de Administração (%)',
        'Taxa de Administracao (%)',
        'Taxa Administração (%)',
        'Taxa Administracao (%)'
      ];

      for (const campo of campos) {
        const value = row[campo];
        if (
          value !== null &&
          value !== undefined &&
          String(value).trim() !== ''
        ) {
          return value;
        }
      }

      return '';
    }

    function formatarTaxaV845(value) {
      const raw = String(value ?? '').trim();
      if (!raw || raw === '—' || raw === '-') return '';

      let s = raw
        .replace(/a\.?\s*a\.?/ig, '')
        .replace(/ao\s+ano/ig, '')
        .replace(/%/g, '')
        .replace(/\s+/g, '')
        .trim();

      if (s.includes(',') && s.includes('.')) {
        const comma = s.lastIndexOf(',');
        const dot = s.lastIndexOf('.');

        if (comma > dot) {
          s = s.replace(/\./g, '').replace(',', '.');
        } else {
          s = s.replace(/,/g, '');
        }
      } else if (s.includes(',')) {
        s = s.replace(',', '.');
      }

      const n = Number(s);

      if (Number.isFinite(n)) {
        return n.toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }) + '% a.a.';
      }

      return /%/.test(raw) ? raw : raw + ' a.a.';
    }

    function instalarCssV845() {
      if (document.getElementById(STYLE_ID)) return;

      const style = document.createElement('style');
      style.id = STYLE_ID;
      style.textContent = `
        @media (min-width: 769px) {
          html.desktop-catalog-fee-v845 body
          #sec-fundos .fundo-adm-sub-v845 {
            display: inline-flex;
            align-items: baseline;
            gap: 4px;
            margin-left: 8px;
            margin-right: 4px;
            padding: 0;
            border: 0;
            background: transparent;
            white-space: nowrap;
            line-height: 1.15;
            vertical-align: middle;
            cursor: default;
          }

          html.desktop-catalog-fee-v845 body
          #sec-fundos .fundo-adm-label-v845 {
            color: #7f8da5;
            font-size: .70rem;
            font-weight: 600;
            letter-spacing: 0;
          }

          html.desktop-catalog-fee-v845 body
          #sec-fundos .fundo-adm-value-v845 {
            color: #d8e0ec;
            font-size: .70rem;
            font-weight: 700;
            letter-spacing: 0;
          }
        }

        @media (max-width: 768px) {
          .fundo-adm-sub-v845 {
            display: none !important;
          }
        }
      `;

      document.head.appendChild(style);
    }

    function obterLinhaFiltradaV845(index) {
      try {
        if (typeof filtered !== 'undefined' && Array.isArray(filtered)) {
          return filtered[index] || null;
        }
      } catch (_) {}

      return null;
    }

    function criarTaxaV845() {
      const badge = document.createElement('span');
      badge.className = 'fundo-adm-sub-v845';
      badge.dataset.v845Adm = '1';
      badge.innerHTML =
        '<span class="fundo-adm-label-v845">Adm.</span>' +
        '<span class="fundo-adm-value-v845"></span>';
      return badge;
    }

    function posicionarTaxaV845(meta, badge) {
      if (!meta || !badge) return;

      const cnpj = meta.querySelector('.fundo-cnpj-sub');
      const copy =
        meta.querySelector('.cnpj-copy-btn-v558') ||
        meta.querySelector('[data-copy-cnpj-v558]');

      // Ordem desejada:
      // Categoria → CNPJ → Adm. → Copiar
      if (cnpj) {
        if (cnpj.nextElementSibling !== badge) {
          cnpj.insertAdjacentElement('afterend', badge);
        }
        return;
      }

      if (copy) {
        if (copy.previousElementSibling !== badge) {
          meta.insertBefore(badge, copy);
        }
        return;
      }

      const category = meta.querySelector('.fundo-cat-badge');

      if (category) {
        if (category.nextElementSibling !== badge) {
          category.insertAdjacentElement('afterend', badge);
        }
        return;
      }

      if (badge.parentElement !== meta) {
        meta.appendChild(badge);
      }
    }

    function atualizarTaxasV845() {
      if (!window.matchMedia('(min-width: 769px)').matches) return;

      const tbody = document.getElementById('tableBody');
      if (!tbody) return;

      tbody.querySelectorAll('tr[data-idx]').forEach(function(tr) {
        const idx = Number(tr.dataset.idx);
        if (!Number.isFinite(idx)) return;

        const row = obterLinhaFiltradaV845(idx);
        if (!row) return;

        const taxa = formatarTaxaV845(obterTaxaBrutaV845(row));
        const meta = tr.querySelector('.fundo-cell-meta');

        if (!meta) return;

        let badge = meta.querySelector('.fundo-adm-sub-v845');

        if (!taxa) {
          if (badge) badge.remove();
          return;
        }

        if (!badge) {
          badge = criarTaxaV845();
        }

        const valueEl = badge.querySelector('.fundo-adm-value-v845');

        if (valueEl && valueEl.textContent !== taxa) {
          valueEl.textContent = taxa;
        }

        const aria =
          'Taxa de administração ' +
          taxa.replace('a.a.', 'ao ano');

        if (badge.getAttribute('aria-label') !== aria) {
          badge.setAttribute('aria-label', aria);
        }

        const title = 'Taxa de administração: ' + taxa;

        if (badge.title !== title) {
          badge.title = title;
        }

        posicionarTaxaV845(meta, badge);
      });
    }

    let timerV845 = null;

    function agendarV845(delay = 30) {
      clearTimeout(timerV845);
      timerV845 = setTimeout(atualizarTaxasV845, delay);
    }

    function observarTabelaV845() {
      const tbody = document.getElementById('tableBody');

      if (!tbody || tbody.dataset.v845Observed === '1') {
        return Boolean(tbody);
      }

      tbody.dataset.v845Observed = '1';

      const observer = new MutationObserver(function() {
        agendarV845(30);
      });

      observer.observe(tbody, {
        childList: true,
        subtree: true
      });

      return true;
    }

    function iniciarV845() {
      document.documentElement.classList.add(
        'desktop-catalog-fee-v845'
      );

      instalarCssV845();

      if (!observarTabelaV845()) {
        const domObserver = new MutationObserver(function() {
          if (observarTabelaV845()) {
            agendarV845(50);
            domObserver.disconnect();
          }
        });

        domObserver.observe(document.documentElement, {
          childList: true,
          subtree: true
        });
      }

      // Cobertura para a sequência:
      // dados → metadata → render → patch CNPJ/Copiar.
      [80, 250, 700, 1500, 3000, 6000].forEach(function(delay) {
        setTimeout(atualizarTaxasV845, delay);
      });

      window.addEventListener(
        'resize',
        function() {
          agendarV845(80);
        },
        { passive: true }
      );

      console.info(
        '[v845] Taxa de administração real ativada no Catálogo desktop.'
      );
    }

    if (document.readyState === 'loading') {
      document.addEventListener(
        'DOMContentLoaded',
        iniciarV845,
        { once: true }
      );
    } else {
      iniciarV845();
    }
  }

  carregarAplicacaoAtualV845();
})();

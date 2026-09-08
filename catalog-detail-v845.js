/*
 * CATÁLOGO DE FUNDOS CAIXA
 * catalog-detail-v845.js — V866
 *
 * V866:
 * - mantém o visual aprovado da Taxa Adm.;
 * - elimina o "piscar" no carregamento;
 * - usa debounce de estabilidade do DOM;
 * - evita reinserções desnecessárias;
 * - observa preferencialmente #sec-fundos, não a página inteira.
 */

(() => {
  'use strict';

  const ORIGINAL_V845_URL = 'https://cdn.jsdelivr.net/gh/eltonprivatebanker/catalogo-fundos-caixa@dab771a588e5d2b4b0cbf08a572d2691446db78e/catalog-detail-v845.js';

  function loadOriginalV845() {
    return new Promise((resolve, reject) => {
      if (window.__CATALOG_DETAIL_V845__) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = ORIGINAL_V845_URL;
      script.async = false;
      script.dataset.catalogDetailOriginalV845 = '1';
      script.onload = resolve;
      script.onerror = () => reject(
        new Error('Falha ao carregar catalog-detail-v845.js original.')
      );
      document.head.appendChild(script);
    });
  }

  const MARKER = '__CATALOG_ADMIN_FEE_V866__';

  function installAdminFeeV866() {
    if (window[MARKER]) return;
    window[MARKER] = true;

    const DESKTOP_QUERY = '(min-width:769px)';
    const CSV_URL = './dados_atuais.csv';

    // Aguarda esse tempo sem mutações antes de atualizar a linha.
    const DOM_SETTLE_MS = 140;

    const feeByCnpj = new Map();

    let csvReady = false;
    let updateTimer = null;
    let catalogObserver = null;
    let rootObserver = null;

    const normalizeCnpj = value =>
      String(value || '').replace(/\D/g, '');

    function normalizeHeader(value) {
      return String(value || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '');
    }

    function formatFee(value) {
      const raw = String(value ?? '').trim();

      if (!raw || raw === '-' || raw === '—') return '';

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
      if (!Number.isFinite(n)) return '';

      return n.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }) + '% a.a.';
    }

    function parseCsv(text) {
      text = String(text || '').replace(/^\uFEFF/, '');

      const rows = [];
      let row = [];
      let field = '';
      let quoted = false;

      for (let i = 0; i < text.length; i++) {
        const ch = text[i];

        if (quoted) {
          if (ch === '"') {
            if (text[i + 1] === '"') {
              field += '"';
              i++;
            } else {
              quoted = false;
            }
          } else {
            field += ch;
          }
          continue;
        }

        if (ch === '"') {
          quoted = true;
        } else if (ch === ',') {
          row.push(field);
          field = '';
        } else if (ch === '\n') {
          row.push(field);
          rows.push(row);
          row = [];
          field = '';
        } else if (ch !== '\r') {
          field += ch;
        }
      }

      if (field.length || row.length) {
        row.push(field);
        rows.push(row);
      }

      return rows;
    }

    function findFeeColumn(headers) {
      const normalized = headers.map(normalizeHeader);

      let index = normalized.findIndex(h =>
        h === 'taxaadm' ||
        h === 'taxaadmpercent' ||
        h === 'taxadeadministracao' ||
        h === 'taxadeadministracaopercent' ||
        h === 'taxaadministracao' ||
        h === 'taxaadministracaopercent'
      );

      if (index >= 0) return index;

      return normalized.findIndex(h =>
        h.includes('taxa') &&
        (h.includes('adm') || h.includes('administracao'))
      );
    }

    function buildFeeMap(csvText) {
      const rows = parseCsv(csvText);

      if (!rows.length) {
        throw new Error('dados_atuais.csv vazio.');
      }

      const headers = rows[0];
      const normalized = headers.map(normalizeHeader);

      const cnpjIndex = normalized.findIndex(h => h === 'cnpj');
      const feeIndex = findFeeColumn(headers);

      if (cnpjIndex < 0) {
        throw new Error('Coluna CNPJ não encontrada no dados_atuais.csv.');
      }

      if (feeIndex < 0) {
        throw new Error('Coluna Taxa Adm (%) não encontrada no dados_atuais.csv.');
      }

      feeByCnpj.clear();

      for (let i = 1; i < rows.length; i++) {
        const cols = rows[i];
        if (!cols || !cols.length) continue;

        const cnpj = normalizeCnpj(cols[cnpjIndex]);
        const fee = formatFee(cols[feeIndex]);

        if (cnpj.length === 14 && fee) {
          feeByCnpj.set(cnpj, fee);
        }
      }

      csvReady = true;

      console.info(
        `[Taxa Adm V866] base carregada: ${feeByCnpj.size} CNPJs com taxa.`
      );
    }

    async function loadFees() {
      try {
        const response = await fetch(
          CSV_URL + '?taxa-adm-v866=' + Date.now(),
          { cache: 'no-store' }
        );

        if (!response.ok) {
          throw new Error(`HTTP ${response.status} em dados_atuais.csv`);
        }

        const text = await response.text();
        buildFeeMap(text);

        // CSV chegou: aguarda o DOM estabilizar antes de inserir.
        scheduleUpdate(DOM_SETTLE_MS);
      } catch (error) {
        console.error('[Taxa Adm V866] erro ao carregar a base:', error);
      }
    }

    function installStyle() {
      if (document.getElementById('catalog-admin-fee-v866-style')) return;

      const style = document.createElement('style');
      style.id = 'catalog-admin-fee-v866-style';
      style.textContent = `
        @media (min-width:769px) {
          #sec-fundos .fundo-adm-sub-v866 {
            display:inline-flex !important;
            align-items:baseline;
            gap:4px;
            margin-left:8px;
            margin-right:4px;
            padding:0;
            border:0;
            background:transparent;
            white-space:nowrap;
            line-height:1.15;
            vertical-align:middle;
            cursor:default;

            /* evita qualquer animação/transition herdada */
            animation:none !important;
            transition:none !important;

            /* entra invisível e só é revelada após posicionar */
            visibility:hidden;
          }

          #sec-fundos .fundo-adm-sub-v866.is-ready {
            visibility:visible;
          }

          #sec-fundos .fundo-adm-label-v866 {
            color:#7f8da5 !important;
            font-size:.70rem !important;
            font-weight:600 !important;
            letter-spacing:0;
            animation:none !important;
            transition:none !important;
          }

          #sec-fundos .fundo-adm-value-v866 {
            color:#d8e0ec !important;
            font-size:.70rem !important;
            font-weight:700 !important;
            letter-spacing:0;
            animation:none !important;
            transition:none !important;
          }
        }

        @media (max-width:768px) {
          .fundo-adm-sub-v866 {
            display:none !important;
          }
        }
      `;

      document.head.appendChild(style);
    }

    function createBadge(fee) {
      const badge = document.createElement('span');
      badge.className = 'fundo-adm-sub-v866';
      badge.dataset.catalogAdminFeeV866 = '1';

      const label = document.createElement('span');
      label.className = 'fundo-adm-label-v866';
      label.textContent = 'Adm.';

      const value = document.createElement('span');
      value.className = 'fundo-adm-value-v866';
      value.textContent = fee;

      badge.append(label, value);
      badge.title = 'Taxa de administração: ' + fee;
      badge.setAttribute(
        'aria-label',
        'Taxa de administração ' + fee.replace('a.a.', 'ao ano')
      );

      return badge;
    }

    function visibleRows() {
      const main =
        document.querySelector('#mainTable tbody') ||
        document.getElementById('tableBody') ||
        document.querySelector('#sec-fundos tbody');

      return main ? [...main.querySelectorAll('tr')] : [];
    }

    function findCnpjElement(tr) {
      const direct = tr.querySelector('.fundo-cnpj-sub');

      if (direct) {
        const cnpj = normalizeCnpj(direct.textContent);

        if (cnpj.length === 14) {
          return { cnpj, element: direct };
        }
      }

      const leaves = [...tr.querySelectorAll(
        'span,small,div,p,a,button'
      )].filter(el => !el.children.length);

      for (const el of leaves) {
        const match = String(el.textContent || '').match(
          /\b\d{2}[.\s]?\d{3}[.\s]?\d{3}[\/\s]?\d{4}[-\s]?\d{2}\b/
        );

        if (!match) continue;

        const cnpj = normalizeCnpj(match[0]);

        if (cnpj.length === 14) {
          return { cnpj, element: el };
        }
      }

      return null;
    }

    function placeBadge(meta, cnpjEl, badge) {
      if (cnpjEl && cnpjEl.parentElement === meta) {
        if (cnpjEl.nextElementSibling !== badge) {
          cnpjEl.insertAdjacentElement('afterend', badge);
        }
        return;
      }

      const copyButton =
        meta.querySelector('.cnpj-copy-btn-v558') ||
        meta.querySelector('[data-copy-cnpj-v558]') ||
        [...meta.querySelectorAll('button')].find(btn =>
          /^copiar$/i.test(String(btn.textContent || '').trim())
        );

      if (copyButton) {
        if (copyButton.previousElementSibling !== badge) {
          meta.insertBefore(badge, copyButton);
        }
        return;
      }

      if (badge.parentElement !== meta) {
        meta.appendChild(badge);
      }
    }

    function revealBadge(badge) {
      if (!badge || badge.classList.contains('is-ready')) return;

      /*
       * Duplo requestAnimationFrame:
       * garante que o navegador tenha concluído o layout da linha
       * antes da taxa se tornar visível.
       */
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (badge.isConnected) {
            badge.classList.add('is-ready');
          }
        });
      });
    }

    function updateRows() {
      if (!csvReady || !feeByCnpj.size) return;
      if (!window.matchMedia(DESKTOP_QUERY).matches) return;

      let matched = 0;
      let inserted = 0;

      visibleRows().forEach(tr => {
        const info = findCnpjElement(tr);
        if (!info) return;

        const fee = feeByCnpj.get(info.cnpj);
        if (!fee) return;

        matched++;

        const meta =
          tr.querySelector('.fundo-cell-meta') ||
          info.element.parentElement;

        if (!meta) return;

        let badge = meta.querySelector('.fundo-adm-sub-v866');

        if (!badge) {
          badge = createBadge(fee);
          placeBadge(meta, info.element, badge);
          inserted++;
          revealBadge(badge);
          return;
        }

        const value = badge.querySelector('.fundo-adm-value-v866');

        if (value && value.textContent !== fee) {
          value.textContent = fee;
        }

        /*
         * Reposiciona apenas se necessário.
         * Evita remove/append repetidos que causavam microflicker.
         */
        placeBadge(meta, info.element, badge);

        if (!badge.classList.contains('is-ready')) {
          revealBadge(badge);
        }
      });

      if (inserted > 0) {
        console.info(
          `[Taxa Adm V866] linhas com taxa: ${matched} · inseridas: ${inserted}`
        );
      }
    }

    function scheduleUpdate(delay = DOM_SETTLE_MS) {
      clearTimeout(updateTimer);

      /*
       * Debounce real:
       * cada nova mutação reinicia o relógio.
       * A taxa só é atualizada quando a tabela fica quieta.
       */
      updateTimer = setTimeout(() => {
        updateTimer = null;
        updateRows();
      }, delay);
    }

    function connectCatalogObserver() {
      const root = document.getElementById('sec-fundos');
      if (!root) return false;

      if (catalogObserver) {
        catalogObserver.disconnect();
      }

      catalogObserver = new MutationObserver(() => {
        scheduleUpdate(DOM_SETTLE_MS);
      });

      catalogObserver.observe(root, {
        childList:true,
        subtree:true
      });

      return true;
    }

    function watchForCatalogRoot() {
      if (connectCatalogObserver()) return;

      rootObserver = new MutationObserver(() => {
        if (connectCatalogObserver()) {
          rootObserver.disconnect();
          rootObserver = null;
          scheduleUpdate(DOM_SETTLE_MS);
        }
      });

      rootObserver.observe(document.documentElement, {
        childList:true,
        subtree:true
      });
    }

    installStyle();
    watchForCatalogRoot();
    loadFees();

    /*
     * Apenas uma verificação tardia de segurança.
     * Não usamos mais a sequência agressiva 100/300/700/1500/...
     */
    setTimeout(() => scheduleUpdate(0), 1800);

    window.addEventListener(
      'resize',
      () => scheduleUpdate(DOM_SETTLE_MS),
      { passive:true }
    );

    console.info('[Taxa Adm V866] módulo inicializado.');
  }

  loadOriginalV845()
    .catch(error => {
      console.warn('[Catalog Detail V845] original não carregado:', error);
    })
    .finally(installAdminFeeV866);
})();

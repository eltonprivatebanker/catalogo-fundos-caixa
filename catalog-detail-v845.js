/*
 * CATÁLOGO DE FUNDOS CAIXA
 * catalog-detail-v845.js — V865
 *
 * Esta versão preserva o catalog-detail-v845.js original,
 * carregando-o do commit dab771a588e5d2b4b0cbf08a572d2691446db78e,
 * e acrescenta a Taxa de Administração na linha principal do Catálogo.
 *
 * Ordem visual:
 * Categoria → CNPJ → Adm. X,XX% a.a. → Copiar
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

  const FEE_MARKER = '__CATALOG_ADMIN_FEE_V865__';

  function installAdminFeeV865() {
    if (window[FEE_MARKER]) return;
    window[FEE_MARKER] = true;

    const DESKTOP_QUERY = '(min-width:769px)';
    const CSV_URL = './dados_atuais.csv';

    const feeByCnpj = new Map();
    let csvReady = false;
    let scheduled = false;
    let observer = null;

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

    /*
     * Parser CSV independente.
     * Suporta vírgulas, aspas escapadas e quebras de linha dentro de campos.
     */
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
        `[Taxa Adm V865] base carregada: ${feeByCnpj.size} CNPJs com taxa.`
      );
    }

    async function loadFees() {
      try {
        const response = await fetch(
          CSV_URL + '?taxa-adm-v865=' + Date.now(),
          { cache: 'no-store' }
        );

        if (!response.ok) {
          throw new Error(`HTTP ${response.status} em dados_atuais.csv`);
        }

        const text = await response.text();
        buildFeeMap(text);
        scheduleUpdate(0);
      } catch (error) {
        console.error('[Taxa Adm V865] erro ao carregar a base:', error);
      }
    }

    function installStyle() {
      if (document.getElementById('catalog-admin-fee-v865-style')) return;

      const style = document.createElement('style');
      style.id = 'catalog-admin-fee-v865-style';
      style.textContent = `
        @media (min-width:769px) {
          #sec-fundos .fundo-adm-sub-v865 {
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
          }

          #sec-fundos .fundo-adm-label-v865 {
            color:#7f8da5 !important;
            font-size:.70rem !important;
            font-weight:600 !important;
            letter-spacing:0;
          }

          #sec-fundos .fundo-adm-value-v865 {
            color:#d8e0ec !important;
            font-size:.70rem !important;
            font-weight:700 !important;
            letter-spacing:0;
          }
        }

        @media (max-width:768px) {
          .fundo-adm-sub-v865 {
            display:none !important;
          }
        }
      `;

      document.head.appendChild(style);
    }

    function createBadge(fee) {
      const badge = document.createElement('span');
      badge.className = 'fundo-adm-sub-v865';
      badge.dataset.catalogAdminFeeV865 = '1';

      const label = document.createElement('span');
      label.className = 'fundo-adm-label-v865';
      label.textContent = 'Adm.';

      const value = document.createElement('span');
      value.className = 'fundo-adm-value-v865';
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

      /*
       * Fallback para eventual alteração futura de classe:
       * encontra um elemento-folha contendo um CNPJ.
       */
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
        meta.insertBefore(badge, copyButton);
        return;
      }

      meta.appendChild(badge);
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

        let badge = meta.querySelector('.fundo-adm-sub-v865');

        if (!badge) {
          badge = createBadge(fee);
          inserted++;
        } else {
          const value = badge.querySelector('.fundo-adm-value-v865');
          if (value && value.textContent !== fee) {
            value.textContent = fee;
          }
        }

        placeBadge(meta, info.element, badge);
      });

      if (matched) {
        console.info(
          `[Taxa Adm V865] linhas com taxa: ${matched} · novas: ${inserted}`
        );
      }
    }

    function scheduleUpdate(delay = 40) {
      if (scheduled) return;
      scheduled = true;

      setTimeout(() => {
        scheduled = false;
        updateRows();
      }, delay);
    }

    function observeCatalog() {
      if (observer) return;

      observer = new MutationObserver(() => scheduleUpdate(40));

      observer.observe(document.documentElement, {
        childList: true,
        subtree: true
      });
    }

    installStyle();
    observeCatalog();
    loadFees();

    [100, 300, 700, 1500, 3000, 6000].forEach(delay => {
      setTimeout(updateRows, delay);
    });

    window.addEventListener(
      'resize',
      () => scheduleUpdate(80),
      { passive: true }
    );

    console.info('[Taxa Adm V865] módulo inicializado.');
  }

  loadOriginalV845()
    .catch(error => {
      /*
       * Se o CDN falhar, ainda instalamos a Taxa Adm.
       * A melhoria operacional original pode ficar ausente,
       * mas o Catálogo principal continua pertencendo ao app-v767.js.
       */
      console.warn('[Catalog Detail V845] original não carregado:', error);
    })
    .finally(installAdminFeeV865);
})();

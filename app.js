/*
 * Catálogo de Fundos CAIXA — v846
 * Correção da v845:
 *   - NÃO depende mais da variável interna `filtered`.
 *   - lê diretamente o arquivo dados_atuais.csv;
 *   - cruza a Taxa Adm (%) pelo CNPJ que já aparece em cada linha;
 *   - injeta "Adm. X,XX% a.a." entre o CNPJ e o botão Copiar.
 */

(function catalogoV846Bootstrap() {
  'use strict';

  const CORE_URL = 'https://cdn.jsdelivr.net/gh/eltonprivatebanker/catalogo-fundos-caixa@b9d1051010da48d6c0ab5a26b2f721ed1ed2fa99/app.js';
  const CSV_RELATIVE_URL = './dados_atuais.csv';
  const CSV_FALLBACK_URL =
    'https://raw.githubusercontent.com/eltonprivatebanker/' +
    'catalogo-fundos-caixa/Testes-da-vers%C3%A3o-01/dados_atuais.csv';

  const feeByCnpj = new Map();
  let csvReady = false;
  let observerInstalled = false;
  let updateTimer = null;

  function normalizarCnpj(value) {
    return String(value || '').replace(/\D/g, '');
  }

  function normalizarCabecalho(value) {
    return String(value || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '');
  }

  function formatarTaxa(value) {
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
      s = comma > dot
        ? s.replace(/\./g, '').replace(',', '.')
        : s.replace(/,/g, '');
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

  // Parser simples, mas compatível com campos CSV entre aspas e quebras de linha.
  function parseCSV(text) {
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

  function acharIndiceTaxa(headers) {
    const aliases = new Set([
      'taxaadm',
      'taxaadmpercent',
      'taxadeadministracao',
      'taxadeadministracaopercent',
      'taxaadministracao',
      'taxaadministracaopercent'
    ]);

    for (let i = 0; i < headers.length; i++) {
      const key = normalizarCabecalho(headers[i]);

      if (
        aliases.has(key) ||
        (key.includes('taxa') &&
         (key.includes('adm') || key.includes('administracao')))
      ) {
        return i;
      }
    }

    return -1;
  }

  function montarMapaTaxas(csvText) {
    const rows = parseCSV(csvText);
    if (!rows.length) throw new Error('CSV vazio.');

    const headers = rows[0];
    const normalized = headers.map(normalizarCabecalho);

    const cnpjIndex = normalized.findIndex(h => h === 'cnpj');
    const feeIndex = acharIndiceTaxa(headers);

    if (cnpjIndex < 0) {
      throw new Error('Coluna CNPJ não encontrada em dados_atuais.csv.');
    }

    if (feeIndex < 0) {
      throw new Error('Coluna Taxa Adm (%) não encontrada em dados_atuais.csv.');
    }

    feeByCnpj.clear();

    for (let i = 1; i < rows.length; i++) {
      const cols = rows[i];
      if (!cols || !cols.length) continue;

      const cnpj = normalizarCnpj(cols[cnpjIndex]);
      const fee = formatarTaxa(cols[feeIndex]);

      if (cnpj.length === 14 && fee) {
        feeByCnpj.set(cnpj, fee);
      }
    }

    console.info(
      `[v846] dados_atuais.csv lido: ${feeByCnpj.size} taxas por CNPJ.`
    );
  }

  async function carregarCSV() {
    const urls = [
      CSV_RELATIVE_URL + '?v846=' + Date.now(),
      CSV_FALLBACK_URL + '?v846=' + Date.now()
    ];

    let lastError = null;

    for (const url of urls) {
      try {
        const response = await fetch(url, { cache: 'no-store' });
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const text = await response.text();
        montarMapaTaxas(text);
        csvReady = true;
        agendarAtualizacao(0);
        return;
      } catch (err) {
        lastError = err;
        console.warn('[v846] Falha ao ler', url, err);
      }
    }

    console.error(
      '[v846] Não foi possível carregar a base de taxas.',
      lastError
    );
  }

  function instalarCSS() {
    if (document.getElementById('catalog-fee-v846-style')) return;

    const style = document.createElement('style');
    style.id = 'catalog-fee-v846-style';
    style.textContent = `
      @media (min-width: 769px) {
        #sec-fundos .fundo-adm-sub-v846 {
          display: inline-flex !important;
          align-items: center;
          gap: 4px;
          margin-left: 7px;
          margin-right: 2px;
          padding: 4px 8px;
          min-height: 23px;
          border: 1px solid rgba(148,163,184,.16);
          border-radius: 8px;
          background: rgba(148,163,184,.055);
          white-space: nowrap;
          line-height: 1;
          vertical-align: middle;
          cursor: default;
          box-sizing: border-box;
        }

        #sec-fundos .fundo-adm-label-v846 {
          color: #7f8da5 !important;
          font-size: .62rem !important;
          font-weight: 700 !important;
          letter-spacing: .02em;
        }

        #sec-fundos .fundo-adm-value-v846 {
          color: #d8e0ec !important;
          font-size: .66rem !important;
          font-weight: 800 !important;
          letter-spacing: 0;
        }
      }

      @media (max-width: 768px) {
        .fundo-adm-sub-v846 {
          display: none !important;
        }
      }
    `;

    document.head.appendChild(style);
  }

  function extrairCnpjDaLinha(tr) {
    const cnpjEl = tr.querySelector('.fundo-cnpj-sub');
    if (cnpjEl) {
      const cnpj = normalizarCnpj(cnpjEl.textContent);
      if (cnpj.length === 14) return { cnpj, cnpjEl };
    }

    const text = tr.textContent || '';
    const match = text.match(
      /\b\d{2}[.\s]?\d{3}[.\s]?\d{3}[\/\s]?\d{4}[-\s]?\d{2}\b/
    );

    if (!match) return null;

    const cnpj = normalizarCnpj(match[0]);
    if (cnpj.length !== 14) return null;

    // Fallback: procura o menor elemento que contém esse CNPJ.
    let found = null;
    const candidates = tr.querySelectorAll(
      'span,small,div,button,a'
    );

    for (const el of candidates) {
      if (normalizarCnpj(el.textContent).includes(cnpj)) {
        if (!found || el.children.length < found.children.length) {
          found = el;
        }
      }
    }

    return { cnpj, cnpjEl: found };
  }

  function criarBadge(fee) {
    const badge = document.createElement('span');
    badge.className = 'fundo-adm-sub-v846';
    badge.dataset.v846Adm = '1';
    badge.innerHTML =
      '<span class="fundo-adm-label-v846">Adm.</span>' +
      '<span class="fundo-adm-value-v846"></span>';

    badge.querySelector('.fundo-adm-value-v846').textContent = fee;
    badge.title = 'Taxa de administração: ' + fee;
    badge.setAttribute(
      'aria-label',
      'Taxa de administração ' + fee.replace('a.a.', 'ao ano')
    );

    return badge;
  }

  function atualizarTabela() {
    if (!csvReady || !feeByCnpj.size) return;
    if (!window.matchMedia('(min-width: 769px)').matches) return;

    const tbody =
      document.getElementById('tableBody') ||
      document.querySelector('#sec-fundos tbody');

    if (!tbody) return;

    let matched = 0;
    let inserted = 0;

    tbody.querySelectorAll('tr').forEach(tr => {
      const info = extrairCnpjDaLinha(tr);
      if (!info) return;

      const fee = feeByCnpj.get(info.cnpj);
      if (!fee) return;

      matched++;

      const meta =
        tr.querySelector('.fundo-cell-meta') ||
        (info.cnpjEl && info.cnpjEl.parentElement);

      if (!meta) return;

      let badge = meta.querySelector('.fundo-adm-sub-v846');

      if (!badge) {
        badge = criarBadge(fee);
        inserted++;
      } else {
        const value = badge.querySelector('.fundo-adm-value-v846');
        if (value && value.textContent !== fee) value.textContent = fee;
      }

      // Posição principal: imediatamente depois do CNPJ.
      if (info.cnpjEl && info.cnpjEl.parentElement === meta) {
        if (info.cnpjEl.nextElementSibling !== badge) {
          info.cnpjEl.insertAdjacentElement('afterend', badge);
        }
        return;
      }

      // Fallback: antes do botão "Copiar".
      const copy =
        meta.querySelector('.cnpj-copy-btn-v558') ||
        meta.querySelector('[data-copy-cnpj-v558]') ||
        [...meta.querySelectorAll('button')].find(
          b => /copiar/i.test(b.textContent || '')
        );

      if (copy) {
        meta.insertBefore(badge, copy);
      } else {
        meta.appendChild(badge);
      }
    });

    if (matched) {
      console.info(
        `[v846] CNPJs com taxa encontrados na tela: ${matched}` +
        ` | novos badges: ${inserted}`
      );
    }
  }

  function agendarAtualizacao(delay = 40) {
    clearTimeout(updateTimer);
    updateTimer = setTimeout(atualizarTabela, delay);
  }

  function instalarObserver() {
    if (observerInstalled) return;
    observerInstalled = true;

    const observer = new MutationObserver(() => {
      agendarAtualizacao(50);
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    });
  }

  function iniciarPatch() {
    instalarCSS();
    instalarObserver();

    carregarCSV();

    [100, 300, 800, 1500, 3000, 6000, 10000].forEach(delay => {
      setTimeout(atualizarTabela, delay);
    });

    window.addEventListener(
      'resize',
      () => agendarAtualizacao(100),
      { passive: true }
    );

    console.info(
      '[v846] Patch de Taxa de Administração inicializado.'
    );
  }

  function carregarAplicacaoBase() {
    const core = document.createElement('script');
    core.src = CORE_URL;
    core.async = false;
    core.dataset.catalogCoreV846 = '1';

    core.onload = function() {
      iniciarPatch();
    };

    core.onerror = function() {
      console.error(
        '[v846] Não foi possível carregar a versão-base do Catálogo.',
        CORE_URL
      );
    };

    document.head.appendChild(core);
  }

  carregarAplicacaoBase();
})();

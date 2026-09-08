/*
 * CATÁLOGO DE FUNDOS CAIXA
 * catalog-detail-v845.js — V867 NATIVA
 *
 * Objetivo:
 * A Taxa de Administração passa a fazer parte do HTML da linha ANTES
 * de o tbody receber o conteúdo.
 *
 * Não usa MutationObserver para a taxa.
 * Não busca dados_atuais.csv novamente.
 * Não injeta badge depois do render.
 *
 * Fonte do dado:
 *   r['Taxa Adm (%)']
 *
 * Ordem:
 *   Categoria → CNPJ → Adm. X,XX% a.a. → Copiar
 */

(() => {
  'use strict';

  const ORIGINAL_V845_URL = 'https://cdn.jsdelivr.net/gh/eltonprivatebanker/catalogo-fundos-caixa@dab771a588e5d2b4b0cbf08a572d2691446db78e/catalog-detail-v845.js';
  const FLAG = '__CATALOG_ADMIN_FEE_NATIVE_V867__';

  function formatFeeV867(value) {
    if (value === null || value === undefined) return '';

    const raw = String(value).trim();
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

  function installNativeFeeStyleV867() {
    if (document.getElementById('catalog-admin-fee-native-v867-style')) return;

    const style = document.createElement('style');
    style.id = 'catalog-admin-fee-native-v867-style';
    style.textContent = `
      @media (min-width:769px) {
        #sec-fundos .fundo-adm-native-v867 {
          display:inline-flex;
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
          animation:none !important;
          transition:none !important;
        }

        #sec-fundos .fundo-adm-native-label-v867 {
          color:#7f8da5 !important;
          font-size:.70rem !important;
          font-weight:600 !important;
          letter-spacing:0;
        }

        #sec-fundos .fundo-adm-native-value-v867 {
          color:#d8e0ec !important;
          font-size:.70rem !important;
          font-weight:700 !important;
          letter-spacing:0;
        }
      }

      @media (max-width:768px) {
        .fundo-adm-native-v867 {
          display:none !important;
        }
      }
    `;

    document.head.appendChild(style);
  }

  function feeHtmlV867(row) {
    const fee = formatFeeV867(row && row['Taxa Adm (%)']);
    if (!fee) return '';

    return (
      '<span class="fundo-adm-native-v867" ' +
      'title="Taxa de administração: ' + fee + '" ' +
      'aria-label="Taxa de administração ' + fee.replace('a.a.', 'ao ano') + '">' +
        '<span class="fundo-adm-native-label-v867">Adm.</span>' +
        '<span class="fundo-adm-native-value-v867">' + fee + '</span>' +
      '</span>'
    );
  }

  function injectFeeIntoRowHtmlV867(html, row) {
    if (!html || typeof html !== 'string') return html;
    if (html.includes('fundo-adm-native-v867')) return html;

    const feeHtml = feeHtmlV867(row);
    if (!feeHtml) return html;

    /*
     * O renderer nativo do app-v767 gera:
     * <span class="fundo-cnpj-sub">CNPJ ...</span>
     *
     * Inserimos a taxa NA STRING antes de ela virar DOM.
     */
    const cnpjPattern =
      /(<span class=["']fundo-cnpj-sub["']>CNPJ\s*[^<]*<\/span>)/i;

    if (cnpjPattern.test(html)) {
      return html.replace(cnpjPattern, '$1' + feeHtml);
    }

    /*
     * Fallback: se uma versão futura não tiver CNPJ visível,
     * coloca após o badge de categoria, ainda dentro do primeiro render.
     */
    const categoryPattern =
      /(<span class=["']fundo-cat-badge[^"']*["'][^>]*>[^<]*<\/span>)/i;

    if (categoryPattern.test(html)) {
      return html.replace(categoryPattern, '$1' + feeHtml);
    }

    return html;
  }

  function installBuildRowWrapperV867() {
    if (window[FLAG]) return true;

    if (typeof window.buildRowHTML !== 'function') {
      console.warn(
        '[Taxa Adm V867] buildRowHTML ainda não disponível.'
      );
      return false;
    }

    const originalBuildRowHTML = window.buildRowHTML;

    function buildRowHTMLV867(row, idx) {
      const html = originalBuildRowHTML.call(this, row, idx);
      return injectFeeIntoRowHtmlV867(html, row);
    }

    /*
     * O render() do app-v767 chama o binding global buildRowHTML.
     * Em script clássico, atualizar window.buildRowHTML atualiza esse binding.
     */
    window.buildRowHTML = buildRowHTMLV867;
    window[FLAG] = true;

    console.info(
      '[Taxa Adm V867] buildRowHTML interceptado — render nativo ativo.'
    );

    return true;
  }

  function refreshExistingRowsBeforePaintV867() {
    const tbody =
      document.getElementById('tableBody') ||
      document.querySelector('#sec-fundos tbody');

    if (!tbody || !tbody.children.length) return;
    if (tbody.querySelector('.fundo-adm-native-v867')) return;
    if (typeof window.render !== 'function') return;

    /*
     * Caso os dados tenham vindo absurdamente rápido e já exista uma linha,
     * refazemos a tabela de forma síncrona.
     *
     * visibility:hidden e render() ocorrem na MESMA tarefa, portanto não há
     * frame intermediário exposto ao usuário.
     */
    const oldVisibility = tbody.style.visibility;
    tbody.style.visibility = 'hidden';

    try {
      window.render();
    } catch (error) {
      console.warn('[Taxa Adm V867] refresh inicial não executado:', error);
    } finally {
      tbody.style.visibility = oldVisibility;
    }
  }

  function loadOriginalCatalogDetailV845() {
    /*
     * Mantém as funções originais de detalhe/documentos da V845.
     * Essa carga NÃO participa da Taxa Adm.
     */
    if (window.__CATALOG_DETAIL_V845__) return;

    const script = document.createElement('script');
    script.src = ORIGINAL_V845_URL;
    script.async = false;
    script.dataset.catalogDetailOriginalV845 = '1';

    script.onerror = () => {
      console.warn(
        '[Catalog Detail V845] não foi possível carregar a camada original.'
      );
    };

    document.head.appendChild(script);
  }

  installNativeFeeStyleV867();

  /*
   * Como index.html carrega app-v767.js antes deste arquivo (ambos defer),
   * buildRowHTML já existe aqui, mas a carga assíncrona dos fundos ainda
   * não concluiu na situação normal.
   */
  if (!installBuildRowWrapperV867()) {
    /*
     * Fallback curto apenas para eventual mudança na ordem dos scripts.
     * Não observa DOM e não injeta taxa pós-render.
     */
    let attempts = 0;
    const timer = setInterval(() => {
      attempts += 1;

      if (installBuildRowWrapperV867() || attempts >= 20) {
        clearInterval(timer);
        refreshExistingRowsBeforePaintV867();
      }
    }, 10);
  } else {
    refreshExistingRowsBeforePaintV867();
  }

  loadOriginalCatalogDetailV845();

  console.info(
    '[Taxa Adm V867] módulo carregado — sem MutationObserver para a taxa.'
  );
})();

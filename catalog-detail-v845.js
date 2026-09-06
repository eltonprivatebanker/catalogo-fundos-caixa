/* ============================================================
   V845 — CATÁLOGO · DETALHE OPERACIONAL MAIS ENXUTO
   Camada progressiva: apenas classifica o DOM já produzido pelo app.
   Não altera dados, seleção, filtros ou lógica do catálogo.
   ============================================================ */
(() => {
  'use strict';

  if (window.__CATALOG_DETAIL_V845__) return;
  window.__CATALOG_DETAIL_V845__ = true;

  const desktop = () => window.matchMedia?.('(min-width:769px)').matches;
  const norm = value => String(value || '').replace(/\s+/g, ' ').trim();
  const upper = value => norm(value).toLocaleUpperCase('pt-BR');

  document.documentElement.classList.add('desktop-catalog-detail-v845');

  const DETAIL_LABELS = new Set([
    'CAPTAÇÃO','ESTRATÉGIA','BENCHMARK','TAXA ADM.','TAXA ADM',
    'PERFIL DE RISCO','CÓDIGO SIART','CODIGO SIART','SALDO MÍNIMO','SALDO MINIMO',
    'TRIBUTAÇÃO','TRIBUTACAO','PÚBLICO-ALVO','PUBLICO-ALVO','DATA DE INÍCIO','DATA DE INICIO',
    'HORÁRIO MÁXIMO','HORARIO MAXIMO','CONVERSÃO DA COTA','CONVERSAO DA COTA',
    'APLICAÇÃO INICIAL','APLICACAO INICIAL','APLICAÇÃO ADICIONAL','APLICACAO ADICIONAL',
    'CRÉDITO EM CONTA','CREDITO EM CONTA','RESGATE MÍNIMO','RESGATE MINIMO'
  ]);

  function leafElements(root){
    return [...root.querySelectorAll('span,strong,small,div,p,h2,h3,h4,h5')]
      .filter(el => !el.children.length && norm(el.textContent));
  }

  function findLeaf(root, exact){
    const target = upper(exact);
    return leafElements(root).find(el => upper(el.textContent) === target) || null;
  }

  function findDetailPanel(heading){
    let el = heading;
    while (el && el !== document.body) {
      const text = upper(el.textContent);
      if (text.includes('DADOS OPERACIONAIS DO FUNDO') &&
          text.includes('APLICAÇÃO') && text.includes('RESGATE') &&
          (text.includes('PÁGINA DO FUNDO') || text.includes('PAGINA DO FUNDO'))) {
        return el;
      }
      el = el.parentElement;
    }
    return heading.parentElement;
  }

  function nearestCard(label, panel){
    let el = label.parentElement;
    while (el && el !== panel) {
      const text = norm(el.textContent);
      if (text.length > norm(label.textContent).length && el.children.length >= 2) {
        const rectChildren = el.children.length;
        if (rectChildren <= 5) return el;
      }
      el = el.parentElement;
    }
    return label.parentElement;
  }

  function findCommonGrid(cards, panel){
    if (cards.length < 4) return null;
    let candidate = cards[0]?.parentElement;
    while (candidate && candidate !== panel) {
      const inside = cards.filter(card => candidate.contains(card)).length;
      if (inside >= Math.min(5, cards.length)) return candidate;
      candidate = candidate.parentElement;
    }
    return null;
  }

  function classifyFlow(panel, titleText){
    const title = findLeaf(panel, titleText);
    if (!title) return null;

    let section = title.parentElement;
    while (section && section !== panel) {
      const text = upper(section.textContent);
      const enough = titleText === 'Aplicação'
        ? (text.includes('APLICAÇÃO INICIAL') || text.includes('APLICACAO INICIAL'))
        : (text.includes('RESGATE MÍNIMO') || text.includes('RESGATE MINIMO') || text.includes('CRÉDITO EM CONTA') || text.includes('CREDITO EM CONTA'));
      if (enough) break;
      section = section.parentElement;
    }
    if (!section || section === panel) return null;

    section.classList.add('v845-flow-section');
    title.classList.add('v845-flow-title');

    const cards = [];
    leafElements(section).forEach(leaf => {
      if (!DETAIL_LABELS.has(upper(leaf.textContent))) return;
      leaf.classList.add('v845-label');
      const card = nearestCard(leaf, section);
      if (card && card !== section) {
        card.classList.add('v845-detail-card');
        cards.push(card);
      }
    });

    const grid = findCommonGrid([...new Set(cards)], section);
    grid?.classList.add('v845-flow-grid');
    return section;
  }

  function enhanceDetail(panel){
    if (!panel || panel.dataset.v845Detail === '1') return;
    panel.dataset.v845Detail = '1';
    panel.classList.add('v845-fund-detail-panel');

    const heading = findLeaf(panel, 'Dados operacionais do fundo');
    if (heading) {
      let head = heading.parentElement;
      while (head && head !== panel) {
        const text = upper(head.textContent);
        if (text.includes('DADOS OPERACIONAIS DO FUNDO') &&
            (text.includes('PÁGINA DO FUNDO') || text.includes('PAGINA DO FUNDO'))) break;
        head = head.parentElement;
      }
      if (head && head !== panel) head.classList.add('v845-detail-head');
    }

    panel.querySelectorAll('a,button').forEach(el => {
      if (/página do fundo/i.test(norm(el.textContent))) el.classList.add('v845-page-link');
    });

    const topCards = [];
    leafElements(panel).forEach(leaf => {
      const key = upper(leaf.textContent);
      if (!DETAIL_LABELS.has(key)) return;
      leaf.classList.add('v845-label');
      const card = nearestCard(leaf, panel);
      if (card && card !== panel) {
        card.classList.add('v845-detail-card');
        topCards.push(card);
      }
    });

    const topOnly = [...new Set(topCards)].filter(card => {
      const t = upper(card.textContent);
      return !t.includes('APLICAÇÃO INICIAL') && !t.includes('APLICACAO INICIAL') &&
             !t.includes('RESGATE MÍNIMO') && !t.includes('RESGATE MINIMO');
    });
    findCommonGrid(topOnly, panel)?.classList.add('v845-facts-grid');

    const app = classifyFlow(panel, 'Aplicação');
    const res = classifyFlow(panel, 'Resgate');
    if (app && res && app.parentElement === res.parentElement) {
      app.parentElement.classList.add('v845-flow-wrap');
    }
  }

  function docIcon(text){
    const t = upper(text);
    if (t.includes('LÂMINA') || t.includes('LAMINA')) return '▤';
    if (t.includes('REGULAMENTO')) return '§';
    if (t.includes('INFORMAÇÕES') || t.includes('INFORMACOES')) return 'ⓘ';
    if (t.includes('COMUNICADO')) return '◈';
    if (t.includes('CARTA')) return '▥';
    if (t.includes('ADESÃO') || t.includes('ADESAO')) return '✓';
    return '↗';
  }

  function enhanceDocPopover(pop){
    if (!pop || pop.dataset.v845Docs === '1') return;
    pop.dataset.v845Docs = '1';
    pop.classList.add('v845-doc-popover');

    const items = [...pop.querySelectorAll('a')].filter(a => norm(a.textContent));
    items.forEach(a => {
      a.classList.add('v845-doc-item');
      if (!a.querySelector('.v845-doc-icon')) {
        const icon = document.createElement('span');
        icon.className = 'v845-doc-icon';
        icon.setAttribute('aria-hidden', 'true');
        icon.textContent = docIcon(a.textContent);
        a.prepend(icon);
      }
    });

    const title = leafElements(pop).find(el => upper(el.textContent) === 'DOCUMENTOS DO FUNDO');
    if (title) {
      let head = title.parentElement;
      while (head && head !== pop && !upper(head.textContent).includes('DOCUMENTOS OFICIAIS DISPONÍVEIS')) head = head.parentElement;
      if (!head || head === pop) head = title.parentElement;
      head?.classList.add('v845-doc-head');
      if (items.length && head && !head.querySelector('.v845-doc-count')) {
        const count = document.createElement('span');
        count.className = 'v845-doc-count';
        count.textContent = `${items.length} disponíveis`;
        head.appendChild(count);
      }
    }
  }

  function findDocPopovers(){
    const titles = [...document.querySelectorAll('body *')].filter(el =>
      !el.children.length && upper(el.textContent) === 'DOCUMENTOS DO FUNDO'
    );
    titles.forEach(title => {
      let el = title.parentElement;
      while (el && el !== document.body) {
        const links = el.querySelectorAll('a').length;
        const text = upper(el.textContent);
        if (links >= 3 && text.includes('DOCUMENTOS DO FUNDO')) {
          enhanceDocPopover(el);
          break;
        }
        el = el.parentElement;
      }
    });
  }

  function enhanceTableActions(){
    const table = document.querySelector('#mainTable');
    if (!table) return;

    table.querySelectorAll('button').forEach(btn => {
      const text = norm(btn.textContent);
      if (/^copiar$/i.test(text)) {
        btn.classList.add('v845-copy-cnpj');
        btn.title = 'Copiar CNPJ';
        btn.setAttribute('aria-label', 'Copiar CNPJ do fundo');
      }
      if (/^\+\d+$/.test(text) || btn.classList.contains('doc-more-button-v559')) {
        const n = Number(text.replace(/\D/g,'')) || null;
        btn.classList.add('v845-doc-more');
        if (n) {
          btn.title = `Ver ${n} outros documentos do fundo`;
          btn.setAttribute('aria-label', `Ver ${n} outros documentos do fundo`);
        }
      }
    });

    const headings = [...table.querySelectorAll('*')].filter(el =>
      !el.children.length && upper(el.textContent) === 'DADOS OPERACIONAIS DO FUNDO'
    );
    headings.forEach(heading => enhanceDetail(findDetailPanel(heading)));
  }

  let queued = false;
  function scan(){
    if (!desktop()) return;
    enhanceTableActions();
    findDocPopovers();
  }
  function schedule(){
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      scan();
    });
  }

  const observer = new MutationObserver(schedule);
  observer.observe(document.documentElement, {childList:true, subtree:true});

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scan, {once:true});
  } else scan();
  window.addEventListener('pageshow', schedule);
})();

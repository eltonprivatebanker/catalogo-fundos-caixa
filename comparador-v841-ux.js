/* ============================================================
   V841 — COMPARAÇÃO · BARRA CENTRALIZADA E ESTADO IMEDIATO
   ------------------------------------------------------------
   Objetivo:
   1) tornar evidente que o checkbox seleciona fundos para comparar;
   2) manter o usuário no Catálogo enquanto escolhe os fundos;
   3) centralizar a barra pela área útil real da tabela;
   4) mostrar a ação imediatamente após a seleção, sem depender de scroll;
   5) esconder a barra somente quando o usuário realmente entra no
      workspace do Comparador;
   6) preservar integralmente a estabilidade V838 no Edge.
   ============================================================ */
(() => {
  'use strict';

  const DESKTOP_QUERY = '(min-width:769px)';
  const TABLE_ID = 'mainTable';
  const CATALOG_ID = 'sec-fundos';
  const WORKSPACE_ID = 'comparWorkspaceV723';
  const OVERLAY_ID = 'comparOverlay';
  const WORKSPACE_COMPARE_ID = 'comparWorkspaceCompareV723';
  const NAV_COUNT_ID = 'comparNavCountV723';
  const ASIDE_COUNT_ID = 'comparWorkspaceAsideCountV758';
  const ACTION_BAR_ID = 'v841CompareActionBar';

  const byId = id => document.getElementById(id);
  const cleanText = value => String(value || '').replace(/\s+/g, ' ').trim();

  let updateQueued = false;
  let headerCell = null;
  let headerOriginal = null;

  function isDesktop(){
    return window.matchMedia(DESKTOP_QUERY).matches;
  }

  function table(){
    return byId(TABLE_ID);
  }

  function catalog(){
    return byId(CATALOG_ID);
  }

  function workspace(){
    return byId(WORKSPACE_ID);
  }

  function overlayOpen(){
    const overlay = byId(OVERLAY_ID);
    return Boolean(overlay && overlay.classList.contains('open'));
  }

  function rowCheckboxes(){
    const root = table();
    if(!root) return [];
    return [...root.querySelectorAll('tbody input[type="checkbox"]')];
  }

  function parseCount(value){
    const match = cleanText(value).match(/(\d+)/);
    return match ? Number(match[1]) : 0;
  }

  function selectedCount(){
    const aside = byId(ASIDE_COUNT_ID);
    const nav = byId(NAV_COUNT_ID);

    const asideCount = parseCount(aside?.textContent);
    if(asideCount > 0) return asideCount;

    const navCount = parseCount(nav?.textContent);
    if(navCount > 0) return navCount;

    return rowCheckboxes().filter(cb => cb.checked).length;
  }

  function checkboxColumnIndex(){
    const firstRow = table()?.querySelector('tbody tr');
    if(!firstRow) return -1;

    return [...firstRow.children].findIndex(cell =>
      cell.querySelector('input[type="checkbox"]')
    );
  }

  function headerForColumn(index){
    if(index < 0) return null;

    const rows = [...(table()?.querySelectorAll('thead tr') || [])];
    const row = rows[rows.length - 1];
    if(!row) return null;

    let logicalColumn = 0;

    for(const th of row.children){
      const span = Number(th.colSpan) || 1;
      if(index >= logicalColumn && index < logicalColumn + span){
        return th;
      }
      logicalColumn += span;
    }

    return null;
  }

  function installCompareHeader(){
    if(!isDesktop()) return;

    const th = headerForColumn(checkboxColumnIndex());
    if(!th) return;

    if(headerCell !== th){
      headerCell = th;
      headerOriginal = th.innerHTML;
    }

    if(th.querySelector('.v841-compare-label')) return;

    th.classList.add('v841-compare-header');
    th.innerHTML = `
      <span class="v841-compare-label"
            title="Marque de 2 a 6 fundos para comparar">
        ⚖️ Comparar
      </span>
    `;
  }

  function decorateCheckboxes(){
    if(!isDesktop()) return;

    rowCheckboxes().forEach(cb => {
      cb.classList.add('v841-compare-check');
      cb.title = 'Selecionar este fundo para comparar';
      cb.setAttribute('aria-label', 'Selecionar este fundo para comparar');
    });
  }

  function findLeafByText(regex){
    const root = workspace();
    if(!root) return null;

    return [...root.querySelectorAll('*')].find(el => {
      if(el.children.length) return false;
      return regex.test(cleanText(el.textContent));
    }) || null;
  }

  function updateWorkspaceState(total){
    const title = findLeafByText(
      /Localize um fundo para comparar|Selecione mais um fundo|Seleção pronta/i
    );

    const desc = findLeafByText(
      /Digite pelo menos 2 caracteres|São necessários pelo menos 2 fundos|Revise os \d+ fundos selecionados/i
    );

    if(title && desc){
      title.classList.toggle('v841-ready-title', total >= 2);

      if(total === 0){
        if(cleanText(title.textContent) !== 'Localize um fundo para comparar'){
          title.textContent = 'Localize um fundo para comparar';
        }
        const target = 'Digite pelo menos 2 caracteres na busca ou utilize Categoria ou Perfil de risco.';
        if(cleanText(desc.textContent) !== target) desc.textContent = target;
      }else if(total === 1){
        if(cleanText(title.textContent) !== 'Selecione mais um fundo'){
          title.textContent = 'Selecione mais um fundo';
        }
        const target = 'São necessários pelo menos 2 fundos para comparar lado a lado.';
        if(cleanText(desc.textContent) !== target) desc.textContent = target;
      }else{
        if(cleanText(title.textContent) !== 'Seleção pronta'){
          title.textContent = 'Seleção pronta';
        }
        const target = `Revise os ${total} fundos selecionados ou inicie a comparação.`;
        if(cleanText(desc.textContent) !== target) desc.textContent = target;
      }
    }

    const compareButton = byId(WORKSPACE_COMPARE_ID);
    if(compareButton){
      compareButton.classList.toggle('v841-ready-button', total >= 2);
    }
  }

  function getActionBar(){
    let bar = byId(ACTION_BAR_ID);
    if(bar) return bar;

    bar = document.createElement('div');
    bar.id = ACTION_BAR_ID;
    bar.setAttribute('role', 'status');
    bar.setAttribute('aria-live', 'polite');
    bar.innerHTML = `
      <div class="v841-action-count">
        <span aria-hidden="true">⚖️</span>
        <strong id="v841CompareCount"></strong>
        <span id="v841CompareHint"></span>
      </div>
      <button id="v841CompareReview" type="button">Revisar seleção</button>
      <button id="v841CompareNow" type="button">Comparar agora →</button>
    `;
    document.body.appendChild(bar);

    byId('v841CompareReview')?.addEventListener('click', reviewSelection);
    byId('v841CompareNow')?.addEventListener('click', compareNow);

    return bar;
  }

  function positionActionBar(){
    const bar = byId(ACTION_BAR_ID);
    if(!bar || !isDesktop()) return;

    const mainTable = table();
    const fallback = catalog();
    const target = mainTable && mainTable.getBoundingClientRect().width > 0
      ? mainTable
      : fallback;

    if(!target) return;

    const rect = target.getBoundingClientRect();
    const center = rect.left + (rect.width / 2);

    bar.style.setProperty('--v841-action-center', `${Math.round(center)}px`);
  }

  function userStillInCatalogRegion(){
    const mainTable = table();
    const targetWorkspace = workspace();

    if(!mainTable || !targetWorkspace) return true;

    const tableRect = mainTable.getBoundingClientRect();
    const workspaceRect = targetWorkspace.getBoundingClientRect();

    const tableStillVisible =
      tableRect.bottom > 80 &&
      tableRect.top < window.innerHeight - 40;

    const workspaceNotYetPrimary =
      workspaceRect.top > window.innerHeight * 0.35;

    return tableStillVisible || workspaceNotYetPrimary;
  }

  function actionBarShouldShow(total){
    return isDesktop() &&
      total > 0 &&
      !overlayOpen() &&
      userStillInCatalogRegion();
  }

  function updateActionBar(total){
    const bar = getActionBar();
    const count = byId('v841CompareCount');
    const hint = byId('v841CompareHint');
    const review = byId('v841CompareReview');
    const compare = byId('v841CompareNow');

    if(!bar || !count || !hint || !review || !compare) return;

    positionActionBar();

    if(total === 1){
      count.textContent = '1 selecionado';
      hint.textContent = '· marque mais 1';
      review.hidden = true;
      compare.hidden = true;
    }else if(total >= 2){
      count.textContent = `${total} selecionados`;
      hint.textContent = '';
      review.hidden = false;
      compare.hidden = false;
      compare.textContent = `Comparar ${total} agora →`;
      compare.setAttribute('aria-label', `Comparar agora os ${total} fundos selecionados`);
    }

    bar.classList.toggle('v841-show', actionBarShouldShow(total));
  }

  function reviewSelection(event){
    event?.preventDefault?.();
    const target = workspace();
    if(!target) return;

    target.scrollIntoView({
      behavior:'auto',
      block:'start',
      inline:'nearest'
    });
  }

  function compareNow(event){
    event?.preventDefault?.();

    const total = selectedCount();
    if(total < 2) return;

    const bar = byId(ACTION_BAR_ID);
    bar?.classList.remove('v841-show');

    const attempt = (remaining = 4) => {
      const button = byId(WORKSPACE_COMPARE_ID);
      const disabled = !button ||
        button.disabled === true ||
        button.getAttribute('aria-disabled') === 'true';

      if(!disabled){
        button.click();
        return;
      }

      if(remaining > 0){
        setTimeout(() => attempt(remaining - 1), 70);
        return;
      }

      reviewSelection();
    };

    attempt();
  }

  function update(){
    if(updateQueued) return;
    updateQueued = true;

    requestAnimationFrame(() => {
      updateQueued = false;
      const total = selectedCount();
      installCompareHeader();
      decorateCheckboxes();
      updateWorkspaceState(total);
      updateActionBar(total);
    });
  }

  function installMutationObservers(){
    if(!('MutationObserver' in window)) return;

    const mainTable = table();
    const targetWorkspace = workspace();
    const navCount = byId(NAV_COUNT_ID);
    const asideCount = byId(ASIDE_COUNT_ID);
    const overlay = byId(OVERLAY_ID);

    const observer = new MutationObserver(update);

    if(mainTable){
      observer.observe(mainTable, {
        childList:true,
        subtree:true,
        attributes:true,
        attributeFilter:['checked']
      });
    }

    if(targetWorkspace){
      observer.observe(targetWorkspace, {
        childList:true,
        subtree:true,
        characterData:true
      });
    }

    [navCount, asideCount].filter(Boolean).forEach(el => {
      observer.observe(el, {
        childList:true,
        subtree:true,
        characterData:true
      });
    });

    if(overlay){
      observer.observe(overlay, {
        attributes:true,
        attributeFilter:['class']
      });
    }
  }

  function installEvents(){
    document.addEventListener('change', event => {
      if(event.target.matches('#mainTable tbody input[type="checkbox"]')){
        setTimeout(update, 0);
      }
    }, true);

    window.addEventListener('scroll', update, {passive:true});
    window.addEventListener('resize', update, {passive:true});
    window.addEventListener('pageshow', update);
  }

  function init(){
    getActionBar();
    installMutationObservers();
    installEvents();
    update();

    // Cobre renderizações assíncronas do catálogo sem tocar em scrollY.
    setTimeout(update, 250);
    setTimeout(update, 900);
    setTimeout(update, 1600);
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init, {once:true});
  }else{
    init();
  }
})();

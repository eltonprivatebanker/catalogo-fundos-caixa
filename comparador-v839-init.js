/* ============================================================
   V839 — COMPARADOR · ESTADO INICIAL LIMPO + CATEGORIAS ESTÁVEIS
   ------------------------------------------------------------
   1) Não exibe "Carregando fundos..." enquanto o usuário ainda
      não usou busca/categoria/risco.
   2) Garante opções de Categoria mesmo se a inicialização legada
      deixar o select apenas com "Todas".
   3) Não altera rolagem. Preserva integralmente a V838 do Edge.
   ============================================================ */
(() => {
  'use strict';

  const TARGET_ID = 'comparWorkspaceCategoryV723';
  const RESULT_ID = 'comparWorkspaceResultV723';

  // Valores já usados pelo próprio catálogo mobile.
  const FALLBACK_CATEGORIES = [
    ['', 'Todas'],
    ['RENDA FIXA SIMPLES', 'RF Simples'],
    ['RENDA FIXA', 'Renda Fixa'],
    ['RENDA FIXA REFERENCIADO', 'RF Ref.'],
    ['RENDA FIXA CURTO PRAZO', 'RF Curto'],
    ['MULTIMERCADO', 'Multimercado'],
    ['CAMBIAL', 'Cambial'],
    ['ACOES', 'Ações'],
    ['FUNDO DE INDICE', 'Fundo de Índice'],
    ['FUNDOS MUTUOS DE PRIVATIZACAO', 'FMP / Privatização']
  ];

  const byId = id => document.getElementById(id);
  let rebuilding = false;

  function comparatorIsIdle(){
    const search = String(byId('comparWorkspaceSearchV723')?.value || '').trim();
    const category = String(byId(TARGET_ID)?.value || '').trim();
    const risk = String(byId('comparWorkspaceRiskV723')?.value || '').trim();
    return !search && !category && !risk;
  }

  function clearIdleLoading(){
    const result = byId(RESULT_ID);
    if(!result || !comparatorIsIdle()) return;

    const text = String(result.textContent || '').trim();
    if(/^carregando\s+fundos(?:\.{3}|…)?$/i.test(text)){
      result.textContent = '';
    }
  }

  function optionsFromSelect(select){
    if(!select) return [];
    return [...select.options]
      .map(option => [String(option.value || ''), String(option.textContent || '').trim()])
      .filter((item, index, arr) => {
        const [value, label] = item;
        if(!label) return false;
        return arr.findIndex(other => other[0] === value) === index;
      });
  }

  function categorySource(){
    // Se o seletor legado/modal já foi populado pelo core, ele é a fonte preferida.
    const picker = optionsFromSelect(byId('comparPickerCategory'));
    if(picker.filter(([value]) => value).length >= 2) return picker;

    // O catálogo mobile já traz a taxonomia completa no HTML.
    const mobile = optionsFromSelect(byId('mobileCategorySelectV74'));
    if(mobile.filter(([value]) => value).length >= 2){
      return mobile.map(([value, label]) => [value, value ? label : 'Todas']);
    }

    return FALLBACK_CATEGORIES;
  }

  function ensureCategories(){
    const target = byId(TARGET_ID);
    if(!target || rebuilding) return;

    const nonEmpty = [...target.options].filter(option => String(option.value || '').trim());

    // Se o core já montou uma lista real, não interferimos.
    if(nonEmpty.length >= 2) return;

    const source = categorySource();
    if(source.filter(([value]) => value).length < 2) return;

    const previousValue = String(target.value || '');
    rebuilding = true;

    const frag = document.createDocumentFragment();
    source.forEach(([value, label], index) => {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = value ? label : 'Todas';
      if(index === 0 && value !== '') option.value = '';
      frag.appendChild(option);
    });

    // Garante "Todas" como primeira opção.
    const sourceHasAll = source.some(([value]) => value === '');
    if(!sourceHasAll){
      const all = document.createElement('option');
      all.value = '';
      all.textContent = 'Todas';
      frag.prepend(all);
    }

    target.replaceChildren(frag);

    if([...target.options].some(option => option.value === previousValue)){
      target.value = previousValue;
    }else{
      target.value = '';
    }

    rebuilding = false;
  }

  function init(){
    ensureCategories();
    clearIdleLoading();

    const target = byId(TARGET_ID);
    const result = byId(RESULT_ID);
    const picker = byId('comparPickerCategory');

    if('MutationObserver' in window){
      if(target){
        const targetObserver = new MutationObserver(() => {
          if(!rebuilding) ensureCategories();
        });
        targetObserver.observe(target, {childList:true});
      }

      if(picker){
        const pickerObserver = new MutationObserver(ensureCategories);
        pickerObserver.observe(picker, {childList:true});
      }

      if(result){
        const resultObserver = new MutationObserver(clearIdleLoading);
        resultObserver.observe(result, {
          childList:true,
          characterData:true,
          subtree:true
        });
      }
    }

    ['comparWorkspaceSearchV723', TARGET_ID, 'comparWorkspaceRiskV723']
      .map(byId)
      .filter(Boolean)
      .forEach(el => {
        el.addEventListener('input', clearIdleLoading);
        el.addEventListener('change', clearIdleLoading);
      });

    // Cobre inicializações assíncronas do core sem tocar na rolagem.
    requestAnimationFrame(() => {
      ensureCategories();
      clearIdleLoading();
    });
    setTimeout(() => {
      ensureCategories();
      clearIdleLoading();
    }, 350);
    setTimeout(() => {
      ensureCategories();
      clearIdleLoading();
    }, 1200);
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init, {once:true});
  }else{
    init();
  }
})();

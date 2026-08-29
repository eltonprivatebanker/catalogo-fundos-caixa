/* ============================================================
   V810 — CATÁLOGO · PERFIL DE RISCO
   Cria um dropdown customizado acessível, sincronizado com o
   select original #catalogRiskSelectV198 para preservar a lógica.
   ============================================================ */
(function catalogRiskV810(){
  var WRAP_CLASS = 'catalog-risk-v810';

  function normalizeLabel(option){
    if(!option) return '';
    if(option.value === '') return 'Todos os perfis';
    if(option.value === 'Sem classificação') return 'Não classificado';
    return option.textContent.trim();
  }

  function enhance(){
    var select = document.getElementById('catalogRiskSelectV198');
    if(!select || select.dataset.v810Enhanced === '1') return;

    var wrap = select.closest('.catalog-risk-select-wrap-v198');
    if(!wrap) return;

    select.dataset.v810Enhanced = '1';
    wrap.classList.add(WRAP_CLASS);

    var legacyArrow = Array.from(wrap.children).find(function(el){
      return el !== select && el.tagName === 'SPAN';
    });
    if(legacyArrow) legacyArrow.setAttribute('hidden','');

    var menuId = 'catalogRiskMenuV810';
    var trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'catalog-risk-trigger-v810';
    trigger.setAttribute('aria-haspopup','listbox');
    trigger.setAttribute('aria-controls',menuId);
    trigger.setAttribute('aria-expanded','false');
    trigger.innerHTML = '<span class="catalog-risk-trigger-label-v810"></span><span class="catalog-risk-chevron-v810" aria-hidden="true">⌄</span>';

    var menu = document.createElement('div');
    menu.className = 'catalog-risk-menu-v810';
    menu.id = menuId;
    menu.setAttribute('role','listbox');
    menu.setAttribute('aria-label','Perfil de risco');

    Array.from(select.options).forEach(function(option, index){
      var item = document.createElement('div');
      item.className = 'catalog-risk-option-v810';
      item.setAttribute('role','option');
      item.setAttribute('tabindex','-1');
      item.dataset.value = option.value;
      item.dataset.index = String(index);
      if(option.value === '') item.dataset.empty = 'true';
      item.innerHTML = '<span>' + normalizeLabel(option) + '</span><span class="catalog-risk-option-check-v810" aria-hidden="true">✓</span>';
      menu.appendChild(item);
    });

    wrap.appendChild(trigger);
    wrap.appendChild(menu);

    var items = Array.from(menu.querySelectorAll('.catalog-risk-option-v810'));
    var activeIndex = 0;

    function setOpen(open){
      wrap.classList.toggle('is-open-v810', open);
      trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
      if(open){
        activeIndex = Math.max(0, select.selectedIndex);
        paintActive();
      }
    }

    function paintActive(){
      items.forEach(function(item, i){
        item.classList.toggle('is-active-v810', i === activeIndex);
      });
    }

    function syncFromSelect(){
      var option = select.options[select.selectedIndex] || select.options[0];
      trigger.querySelector('.catalog-risk-trigger-label-v810').textContent = normalizeLabel(option);
      wrap.classList.toggle('is-filtered-v810', !!select.value);
      items.forEach(function(item){
        item.setAttribute('aria-selected', item.dataset.value === select.value ? 'true' : 'false');
      });
    }

    function choose(index){
      var item = items[index];
      if(!item) return;
      if(select.value !== item.dataset.value){
        select.value = item.dataset.value;
        select.dispatchEvent(new Event('change', {bubbles:true}));
        select.dispatchEvent(new Event('input', {bubbles:true}));
      }
      syncFromSelect();
      setOpen(false);
      trigger.focus({preventScroll:true});
    }

    trigger.addEventListener('click', function(){
      setOpen(!wrap.classList.contains('is-open-v810'));
    });

    trigger.addEventListener('keydown', function(ev){
      if(ev.key === 'ArrowDown' || ev.key === 'ArrowUp'){
        ev.preventDefault();
        setOpen(true);
        activeIndex = select.selectedIndex;
        if(ev.key === 'ArrowDown') activeIndex = Math.min(items.length - 1, activeIndex + 1);
        else activeIndex = Math.max(0, activeIndex - 1);
        paintActive();
      }
      if(ev.key === 'Enter' || ev.key === ' '){
        if(wrap.classList.contains('is-open-v810')){
          ev.preventDefault();
          choose(activeIndex);
        }
      }
      if(ev.key === 'Escape'){
        setOpen(false);
      }
    });

    menu.addEventListener('mousemove', function(ev){
      var item = ev.target.closest('.catalog-risk-option-v810');
      if(!item) return;
      activeIndex = Number(item.dataset.index || 0);
      paintActive();
    });

    menu.addEventListener('click', function(ev){
      var item = ev.target.closest('.catalog-risk-option-v810');
      if(!item) return;
      choose(Number(item.dataset.index || 0));
    });

    document.addEventListener('click', function(ev){
      if(!wrap.contains(ev.target)) setOpen(false);
    });

    document.addEventListener('keydown', function(ev){
      if(ev.key === 'Escape' && wrap.classList.contains('is-open-v810')){
        setOpen(false);
        trigger.focus({preventScroll:true});
      }
    });

    select.addEventListener('change', syncFromSelect);
    syncFromSelect();
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', enhance, {once:true});
  }else{
    enhance();
  }
  window.addEventListener('load', enhance, {once:true});
})();

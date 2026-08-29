/* ============================================================
   V813 — CATÁLOGO · PERFIL DE RISCO
   O botão já nasce no HTML; este JS apenas sincroniza estado/menu.
   ============================================================ */
(function catalogRiskV813(){
  function normalizeLabel(option){
    if(!option) return '';
    if(option.value === '') return 'Todos os perfis';
    if(option.value === 'Sem classificação') return 'Não classificado';
    return option.textContent.trim();
  }

  function init(){
    if(window.matchMedia && window.matchMedia('(max-width: 768px)').matches) return;

    var select = document.getElementById('catalogRiskSelectV198');
    var wrap = select && select.closest('.catalog-risk-select-wrap-v198');
    var trigger = wrap && wrap.querySelector('.catalog-risk-trigger-v813');
    if(!select || !wrap || !trigger || select.dataset.v813Bound === '1') return;

    select.dataset.v813Bound = '1';
    wrap.classList.add('catalog-risk-v813');

    var legacyArrow = Array.from(wrap.children).find(function(el){
      return el !== select && el !== trigger && el.tagName === 'SPAN';
    });
    if(legacyArrow) legacyArrow.setAttribute('hidden','');

    var menu = document.getElementById('catalogRiskMenuV813');
    if(menu) menu.remove();

    menu = document.createElement('div');
    menu.id = 'catalogRiskMenuV813';
    menu.className = 'catalog-risk-menu-v813';
    menu.setAttribute('role','listbox');
    menu.setAttribute('aria-label','Perfil de risco');
    document.body.appendChild(menu);

    Array.from(select.options).forEach(function(option, index){
      var item = document.createElement('div');
      item.className = 'catalog-risk-option-v813';
      item.setAttribute('role','option');
      item.setAttribute('tabindex','-1');
      item.dataset.value = option.value;
      item.dataset.index = String(index);
      if(option.value === '') item.dataset.empty = 'true';
      item.innerHTML = '<span>' + normalizeLabel(option) + '</span><span class="catalog-risk-option-check-v813" aria-hidden="true">✓</span>';
      menu.appendChild(item);
    });

    var items = Array.from(menu.querySelectorAll('.catalog-risk-option-v813'));
    var activeIndex = Math.max(0, select.selectedIndex);

    function paintActive(){
      items.forEach(function(item, i){
        item.classList.toggle('is-active-v813', i === activeIndex);
      });
    }

    function sync(){
      var option = select.options[select.selectedIndex] || select.options[0];
      var label = trigger.querySelector('.catalog-risk-trigger-label-v813');
      if(label) label.textContent = normalizeLabel(option);
      wrap.classList.toggle('is-filtered-v813', !!select.value);
      items.forEach(function(item){
        item.setAttribute('aria-selected', item.dataset.value === select.value ? 'true' : 'false');
      });
    }

    function positionMenu(){
      if(!wrap.classList.contains('is-open-v813')) return;
      var rect = trigger.getBoundingClientRect();
      var width = rect.width;
      var gap = 5;
      var estimate = Math.min(220, items.length * 29 + 10);
      var below = window.innerHeight - rect.bottom;
      var above = rect.top;
      var top = (below >= estimate + gap || below >= above)
        ? rect.bottom + gap
        : Math.max(8, rect.top - estimate - gap);
      var left = Math.max(8, Math.min(rect.left, window.innerWidth - width - 8));

      menu.style.left = left + 'px';
      menu.style.top = top + 'px';
      menu.style.width = width + 'px';
      menu.style.minWidth = width + 'px';
      menu.style.maxWidth = width + 'px';
      menu.style.maxHeight = Math.max(110, Math.min(220, window.innerHeight - 16)) + 'px';
      menu.style.overflowY = 'auto';
    }

    function setOpen(open){
      wrap.classList.toggle('is-open-v813', open);
      menu.classList.toggle('is-open-v813', open);
      trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
      if(open){
        activeIndex = Math.max(0, select.selectedIndex);
        paintActive();
        positionMenu();
      }
    }

    function choose(index){
      var item = items[index];
      if(!item) return;
      if(select.value !== item.dataset.value){
        select.value = item.dataset.value;
        select.dispatchEvent(new Event('change', {bubbles:true}));
        select.dispatchEvent(new Event('input', {bubbles:true}));
      }
      sync();
      setOpen(false);
      trigger.focus({preventScroll:true});
    }

    trigger.addEventListener('click', function(ev){
      ev.preventDefault();
      ev.stopPropagation();
      setOpen(!wrap.classList.contains('is-open-v813'));
    });

    trigger.addEventListener('keydown', function(ev){
      if(ev.key === 'ArrowDown' || ev.key === 'ArrowUp'){
        ev.preventDefault();
        if(!wrap.classList.contains('is-open-v813')) setOpen(true);
        activeIndex = Math.max(0, select.selectedIndex);
        activeIndex += ev.key === 'ArrowDown' ? 1 : -1;
        activeIndex = Math.max(0, Math.min(items.length - 1, activeIndex));
        paintActive();
        items[activeIndex] && items[activeIndex].scrollIntoView({block:'nearest'});
      }else if((ev.key === 'Enter' || ev.key === ' ') && wrap.classList.contains('is-open-v813')){
        ev.preventDefault();
        choose(activeIndex);
      }else if(ev.key === 'Enter' || ev.key === ' '){
        ev.preventDefault();
        setOpen(true);
      }else if(ev.key === 'Escape'){
        ev.preventDefault();
        setOpen(false);
      }
    });

    menu.addEventListener('mousemove', function(ev){
      var item = ev.target.closest('.catalog-risk-option-v813');
      if(!item) return;
      activeIndex = Number(item.dataset.index || 0);
      paintActive();
    });

    menu.addEventListener('click', function(ev){
      var item = ev.target.closest('.catalog-risk-option-v813');
      if(!item) return;
      ev.preventDefault();
      ev.stopPropagation();
      choose(Number(item.dataset.index || 0));
    });

    document.addEventListener('click', function(ev){
      if(!wrap.contains(ev.target) && !menu.contains(ev.target)) setOpen(false);
    });

    window.addEventListener('resize', positionMenu);
    window.addEventListener('scroll', positionMenu, true);

    select.addEventListener('change', sync);
    select.addEventListener('input', sync);
    sync();
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init, {once:true});
  }else{
    init();
  }
  window.addEventListener('load', init, {once:true});
})();

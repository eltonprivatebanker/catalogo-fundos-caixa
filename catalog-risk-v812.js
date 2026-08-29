/* ============================================================
   V812 — CATÁLOGO · PERFIL DE RISCO
   Mantém o select original como fonte de estado e usa portal no body.
   ============================================================ */
(function catalogRiskV812(){
  function normalizeLabel(option){
    if(!option) return '';
    if(option.value === '') return 'Todos os perfis';
    if(option.value === 'Sem classificação') return 'Não classificado';
    return option.textContent.trim();
  }

  function enhance(){
    if(window.matchMedia && window.matchMedia('(max-width: 768px)').matches) return;

    var select = document.getElementById('catalogRiskSelectV198');
    if(!select || select.dataset.v812Enhanced === '1') return;

    var wrap = select.closest('.catalog-risk-select-wrap-v198');
    if(!wrap) return;

    /* Limpa camadas anteriores, inclusive em navegação/cache quente. */
    wrap.querySelectorAll('[class*="catalog-risk-trigger-v81"],[class*="catalog-risk-menu-v81"]').forEach(function(el){ el.remove(); });
    wrap.classList.remove('catalog-risk-v810','catalog-risk-v811','is-open-v810','is-open-v811','is-filtered-v810','is-filtered-v811');
    document.querySelectorAll('#catalogRiskMenuV810,#catalogRiskMenuV811').forEach(function(el){ el.remove(); });

    select.dataset.v812Enhanced = '1';
    wrap.classList.add('catalog-risk-v812');

    var legacyArrow = Array.from(wrap.children).find(function(el){
      return el !== select && el.tagName === 'SPAN';
    });
    if(legacyArrow) legacyArrow.setAttribute('hidden','');

    var trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'catalog-risk-trigger-v812';
    trigger.setAttribute('aria-haspopup','listbox');
    trigger.setAttribute('aria-controls','catalogRiskMenuV812');
    trigger.setAttribute('aria-expanded','false');
    trigger.innerHTML = '<span class="catalog-risk-trigger-label-v812"></span><span class="catalog-risk-chevron-v812" aria-hidden="true">⌄</span>';
    wrap.appendChild(trigger);

    var menu = document.getElementById('catalogRiskMenuV812');
    if(menu) menu.remove();
    menu = document.createElement('div');
    menu.id = 'catalogRiskMenuV812';
    menu.className = 'catalog-risk-menu-v812';
    menu.setAttribute('role','listbox');
    menu.setAttribute('aria-label','Perfil de risco');
    document.body.appendChild(menu);

    Array.from(select.options).forEach(function(option, index){
      var item = document.createElement('div');
      item.className = 'catalog-risk-option-v812';
      item.setAttribute('role','option');
      item.setAttribute('tabindex','-1');
      item.dataset.value = option.value;
      item.dataset.index = String(index);
      if(option.value === '') item.dataset.empty = 'true';
      item.innerHTML = '<span>' + normalizeLabel(option) + '</span><span class="catalog-risk-option-check-v812" aria-hidden="true">✓</span>';
      menu.appendChild(item);
    });

    var items = Array.from(menu.querySelectorAll('.catalog-risk-option-v812'));
    var activeIndex = Math.max(0, select.selectedIndex);

    function positionMenu(){
      if(!wrap.classList.contains('is-open-v812')) return;
      var rect = trigger.getBoundingClientRect();
      var gap = 4;
      var width = Math.max(220, rect.width);
      var estimatedHeight = Math.min(235, items.length * 31 + 10);
      var below = window.innerHeight - rect.bottom;
      var above = rect.top;
      var top = (below >= estimatedHeight + gap || below >= above)
        ? rect.bottom + gap
        : Math.max(8, rect.top - estimatedHeight - gap);
      var left = Math.max(8, Math.min(rect.left, window.innerWidth - width - 8));

      menu.style.left = left + 'px';
      menu.style.top = top + 'px';
      menu.style.width = width + 'px';
      menu.style.maxHeight = Math.max(120, Math.min(235, window.innerHeight - 16)) + 'px';
      menu.style.overflowY = 'auto';
    }

    function paintActive(){
      items.forEach(function(item, i){
        item.classList.toggle('is-active-v812', i === activeIndex);
      });
    }

    function syncFromSelect(){
      var option = select.options[select.selectedIndex] || select.options[0];
      trigger.querySelector('.catalog-risk-trigger-label-v812').textContent = normalizeLabel(option);
      wrap.classList.toggle('is-filtered-v812', !!select.value);
      items.forEach(function(item){
        item.setAttribute('aria-selected', item.dataset.value === select.value ? 'true' : 'false');
      });
    }

    function setOpen(open){
      wrap.classList.toggle('is-open-v812', open);
      menu.classList.toggle('is-open-v812', open);
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
      syncFromSelect();
      setOpen(false);
      trigger.focus({preventScroll:true});
    }

    trigger.addEventListener('click', function(ev){
      ev.preventDefault();
      ev.stopPropagation();
      setOpen(!wrap.classList.contains('is-open-v812'));
    });

    trigger.addEventListener('keydown', function(ev){
      if(ev.key === 'ArrowDown' || ev.key === 'ArrowUp'){
        ev.preventDefault();
        if(!wrap.classList.contains('is-open-v812')) setOpen(true);
        activeIndex = Math.max(0, select.selectedIndex);
        activeIndex = ev.key === 'ArrowDown'
          ? Math.min(items.length - 1, activeIndex + 1)
          : Math.max(0, activeIndex - 1);
        paintActive();
        items[activeIndex] && items[activeIndex].scrollIntoView({block:'nearest'});
        return;
      }
      if((ev.key === 'Enter' || ev.key === ' ') && wrap.classList.contains('is-open-v812')){
        ev.preventDefault();
        choose(activeIndex);
        return;
      }
      if(ev.key === 'Enter' || ev.key === ' '){
        ev.preventDefault();
        setOpen(true);
        return;
      }
      if(ev.key === 'Escape'){
        ev.preventDefault();
        setOpen(false);
      }
    });

    menu.addEventListener('mousemove', function(ev){
      var item = ev.target.closest('.catalog-risk-option-v812');
      if(!item) return;
      activeIndex = Number(item.dataset.index || 0);
      paintActive();
    });

    menu.addEventListener('click', function(ev){
      var item = ev.target.closest('.catalog-risk-option-v812');
      if(!item) return;
      ev.preventDefault();
      ev.stopPropagation();
      choose(Number(item.dataset.index || 0));
    });

    document.addEventListener('click', function(ev){
      if(!wrap.contains(ev.target) && !menu.contains(ev.target)) setOpen(false);
    });

    document.addEventListener('keydown', function(ev){
      if(ev.key === 'Escape' && wrap.classList.contains('is-open-v812')){
        setOpen(false);
        trigger.focus({preventScroll:true});
      }
    });

    window.addEventListener('resize', function(){
      if(wrap.classList.contains('is-open-v812')) positionMenu();
    });
    window.addEventListener('scroll', function(){
      if(wrap.classList.contains('is-open-v812')) positionMenu();
    }, true);

    select.addEventListener('change', syncFromSelect);
    select.addEventListener('input', syncFromSelect);
    syncFromSelect();
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', enhance, {once:true});
  }else{
    enhance();
  }
  window.addEventListener('load', enhance, {once:true});
})();

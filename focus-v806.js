/* V806 — acabamento final do Boletim Focus */
(function focusFinishV806(){
  function classForState(text){
    var t = String(text || '').trim().toLowerCase();
    if(t.indexOf('queda') !== -1) return 'is-queda';
    if(t.indexOf('alta') !== -1) return 'is-alta';
    if(t.indexOf('oscila') !== -1) return 'is-oscila';
    return '';
  }

  function normalizeDelta(text){
    var raw = String(text || '').replace(/\s+/g, ' ').trim();
    if(!raw) return '';
    if(raw.indexOf('Variação no horizonte') === 0) return raw;
    var parts = raw.split('·');
    var delta = parts.length > 1
      ? parts.slice(1).join('·').trim()
      : raw.replace(/^\d{4}\s*[→–-]\s*\d{4}\s*/, '').trim();
    return delta ? 'Variação no horizonte · ' + delta : raw;
  }

  function rebuildTrendBlocks(root){
    (root || document).querySelectorAll('#sec-focus .focus-trend-line-v802, #sec-focus .focus-trend-v805').forEach(function(oldBlock){
      if(oldBlock.classList.contains('focus-trend-v806')) return;

      var caption = oldBlock.querySelector('.focus-trend-caption-v802, .focus-trend-kicker-v805');
      var state = oldBlock.querySelector(':scope > strong, :scope > .focus-trend-state-v805');
      var delta = oldBlock.querySelector(':scope > em, :scope > .focus-trend-delta-v805');

      if(!state && !delta) return;

      var next = document.createElement('div');
      next.className = 'focus-trend-v806';

      var kicker = document.createElement('span');
      kicker.className = 'focus-trend-kicker-v806';
      kicker.textContent = caption && caption.textContent.trim() ? caption.textContent.trim() : 'TENDÊNCIA';

      var stateEl = document.createElement('strong');
      stateEl.className = 'focus-trend-state-v806 ' + classForState(state && state.textContent);
      stateEl.textContent = state ? state.textContent.trim() : '';

      var deltaEl = document.createElement('span');
      deltaEl.className = 'focus-trend-delta-v806';
      deltaEl.textContent = normalizeDelta(delta && delta.textContent);

      next.appendChild(kicker);
      next.appendChild(stateEl);
      next.appendChild(deltaEl);
      oldBlock.replaceWith(next);
    });
  }

  function fixEducationalTitle(root){
    (root || document).querySelectorAll('#sec-focus .focus-explain-header span').forEach(function(el){
      if((el.textContent || '').includes('Entenda o Boletim Focus')){
        el.textContent = (el.textContent || '').replace('Entenda o Boletim Focus','Como interpretar o Boletim Focus');
      }
    });
  }

  function cleanSummaryDecoration(root){
    (root || document).querySelectorAll('#sec-focus .focus-summary-copy-v802 > strong').forEach(function(el){
      el.style.setProperty('text-decoration', 'none', 'important');
      el.style.setProperty('border-bottom', '0', 'important');
      el.style.setProperty('box-shadow', 'none', 'important');
      el.style.setProperty('background-image', 'none', 'important');
    });
  }

  function apply(){
    rebuildTrendBlocks(document);
    fixEducationalTitle(document);
    cleanSummaryDecoration(document);
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply, {once:true});
  else apply();
  window.addEventListener('load', apply, {once:true});

  var section = document.getElementById('sec-focus');
  if(section && window.MutationObserver){
    new MutationObserver(function(){ apply(); }).observe(section,{childList:true,subtree:true});
  }
})();

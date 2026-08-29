/* V803 — acabamento semântico do Boletim Focus */
(function focusFinishV803(){
  function cleanTrendDelta(root){
    (root || document).querySelectorAll('#sec-focus .focus-trend-line-v802 > em').forEach(function(el){
      var text = String(el.textContent || '').replace(/\s+/g, ' ').trim();
      if(!text || text.indexOf('Variação no horizonte') === 0) return;
      var parts = text.split('·');
      var delta = parts.length > 1
        ? parts.slice(1).join('·').trim()
        : text.replace(/^\d{4}\s*[→–-]\s*\d{4}\s*/, '').trim();
      if(delta) el.textContent = 'Variação no horizonte · ' + delta;
    });
  }

  function fixEducationalTitle(root){
    (root || document).querySelectorAll('#sec-focus .focus-explain-header span').forEach(function(el){
      if((el.textContent || '').includes('Entenda o Boletim Focus')){
        el.textContent = (el.textContent || '').replace(
          'Entenda o Boletim Focus',
          'Como interpretar o Boletim Focus'
        );
      }
    });
  }

  function apply(){
    cleanTrendDelta(document);
    fixEducationalTitle(document);
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', apply, {once:true});
  }else{
    apply();
  }
  window.addEventListener('load', apply, {once:true});

  var section = document.getElementById('sec-focus');
  if(section && window.MutationObserver){
    new MutationObserver(function(){ apply(); }).observe(section, {
      childList:true,
      subtree:true
    });
  }
})();

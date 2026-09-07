/* ============================================================
   V864 — Boletim Focus: leitura executiva no desktop
   Altera apenas hierarquia/textos auxiliares e apresentação.
   Dados, anos, valores e sparklines permanecem sob o renderer original.
   ============================================================ */
(function focusExecutiveV864(){
  'use strict';

  var mq = window.matchMedia('(min-width:769px)');
  var observer = null;
  var scheduled = false;
  var section = null;

  function rememberText(el){
    if(!el || el.__v864OriginalText !== undefined) return;
    el.__v864OriginalText = el.textContent;
  }

  function rememberHTML(el){
    if(!el || el.__v864OriginalHTML !== undefined) return;
    el.__v864OriginalHTML = el.innerHTML;
  }

  function rememberTitle(el){
    if(!el || el.__v864OriginalTitle !== undefined) return;
    el.__v864OriginalTitle = el.getAttribute('title');
  }

  function setText(el, value){
    if(!el || !value || el.textContent === value) return;
    rememberText(el);
    el.textContent = value;
  }

  function extractYears(){
    var years = [];
    document.querySelectorAll('#sec-focus .focus-card-v802 .fcad-row').forEach(function(row){
      var match = String(row.textContent || '').match(/\b(20\d{2})\b/);
      if(match) years.push(Number(match[1]));
    });
    years = years.filter(function(v, i, arr){ return arr.indexOf(v) === i; }).sort();
    return years;
  }

  function compactReference(){
    var ref = document.getElementById('focusRef');
    if(!ref) return;

    var label = ref.querySelector('.focus-ref-v802');
    if(label){
      var dateStrong = label.querySelector('strong');
      var date = dateStrong ? dateStrong.textContent.trim() : '';
      if(date){
        rememberHTML(label);
        var desired = 'Atualização <strong>' + date + '</strong>';
        if(label.innerHTML !== desired) label.innerHTML = desired;
      }
    }

    if(!ref.querySelector('.focus-help-v864')){
      var help = document.createElement('button');
      help.type = 'button';
      help.className = 'focus-help-v864';
      help.setAttribute('aria-controls', 'focusExplainBody');
      help.setAttribute('aria-expanded', 'false');
      help.textContent = 'ⓘ Entenda o Focus';

      help.addEventListener('click', function(event){
        event.preventDefault();
        event.stopPropagation();

        var mainBody = document.getElementById('sec-focus-body');
        var explain = document.getElementById('focusExplainBody');

        if(mainBody && mainBody.hidden && typeof window.toggleSection === 'function'){
          window.toggleSection('sec-focus-body', 'sec-focus');
          setTimeout(function(){
            if(typeof window.toggleFocusExplain === 'function') window.toggleFocusExplain();
            syncHelpState(help, explain);
          }, 0);
          return;
        }

        if(typeof window.toggleFocusExplain === 'function') window.toggleFocusExplain();
        setTimeout(function(){ syncHelpState(help, explain); }, 0);
      });

      var pdf = ref.querySelector('.focus-pdf-v802');
      if(pdf && pdf.nextSibling) ref.insertBefore(help, pdf.nextSibling);
      else ref.appendChild(help);
    }
  }

  function syncHelpState(button, body){
    if(!button || !body) return;
    var visible = !body.hidden && getComputedStyle(body).display !== 'none' && body.getBoundingClientRect().height > 0;
    button.setAttribute('aria-expanded', visible ? 'true' : 'false');
  }

  function compactSummary(){
    var title = document.querySelector('#sec-focus .focus-summary-copy-v802 > strong');
    if(!title) return;

    var years = extractYears();
    if(years.length){
      setText(title, 'CENÁRIO ' + years[0] + '–' + years[years.length - 1]);
    }
  }

  function compactCards(){
    document.querySelectorAll('#sec-focus .focus-card-v802').forEach(function(card){
      var label = card.querySelector('.fcad-label');
      var sub = card.querySelector('.fcad-sub');
      if(label && sub && sub.textContent.trim()){
        rememberTitle(label);
        if(label.getAttribute('title') !== sub.textContent.trim()){
          label.setAttribute('title', sub.textContent.trim());
        }
      }

      var state = card.querySelector('.focus-trend-v806 .focus-trend-state-v806');
      var delta = card.querySelector('.focus-trend-v806 .focus-trend-delta-v806');

      if(state){
        var rawState = String(state.textContent || '').trim().replace(/^[↓↑↕]\s*/, '');
        var low = rawState.toLowerCase();
        var nextState = rawState;
        if(low.indexOf('queda') !== -1) nextState = '↓ Queda';
        else if(low.indexOf('leve alta') !== -1) nextState = '↑ Leve alta';
        else if(low.indexOf('alta') !== -1) nextState = '↑ Alta';
        else if(low.indexOf('oscila') !== -1) nextState = '↕ Oscila';
        setText(state, nextState);
      }

      if(delta){
        var rawDelta = String(delta.textContent || '').replace(/\s+/g, ' ').trim();
        var shortDelta = rawDelta.replace(/^Variação no horizonte\s*·\s*/i, '').trim();
        if(shortDelta){
          rememberTitle(delta);
          if(!delta.getAttribute('title')) delta.setAttribute('title', rawDelta);
          setText(delta, shortDelta);
        }
      }
    });
  }

  function apply(){
    scheduled = false;
    if(!mq.matches) return restore();

    section = document.getElementById('sec-focus');
    if(!section) return;

    if(observer) observer.disconnect();
    compactReference();
    compactSummary();
    compactCards();
    if(observer) observe();
  }

  function restore(){
    document.querySelectorAll('#sec-focus .focus-help-v864').forEach(function(el){ el.remove(); });

    document.querySelectorAll('#sec-focus *').forEach(function(el){
      if(el.__v864OriginalText !== undefined){
        el.textContent = el.__v864OriginalText;
        delete el.__v864OriginalText;
      }
      if(el.__v864OriginalHTML !== undefined){
        el.innerHTML = el.__v864OriginalHTML;
        delete el.__v864OriginalHTML;
      }
      if(el.__v864OriginalTitle !== undefined){
        if(el.__v864OriginalTitle === null) el.removeAttribute('title');
        else el.setAttribute('title', el.__v864OriginalTitle);
        delete el.__v864OriginalTitle;
      }
    });
  }

  function schedule(){
    if(scheduled) return;
    scheduled = true;
    requestAnimationFrame(apply);
  }

  function observe(){
    section = document.getElementById('sec-focus');
    if(!section || !window.MutationObserver) return;
    if(!observer){
      observer = new MutationObserver(schedule);
    }
    observer.observe(section, {
      childList:true,
      subtree:true,
      characterData:true
    });
  }

  function init(){
    section = document.getElementById('sec-focus');
    apply();
    observe();
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init, {once:true});
  }else{
    init();
  }

  window.addEventListener('load', schedule, {once:true});
  mq.addEventListener && mq.addEventListener('change', schedule);
})();

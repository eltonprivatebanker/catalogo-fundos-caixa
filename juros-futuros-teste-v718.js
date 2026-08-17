/* =========================================================
   DI FUTURO · TESTE v718
   Hierarquia otimizada + integração visual nativa.
   ========================================================= */
(function jurosFuturosTesteV718(){
  'use strict';

  const CURRENT_ID = 'diCurrentFrameV718';
  const HISTORY_ID = 'diHistoryFrameV718';

  function frameDoc(frame){
    try{
      return frame?.contentDocument || null;
    }catch(e){
      return null;
    }
  }

  function injectNativeSkin(frame, kind){
    const doc = frameDoc(frame);
    if(!doc || !doc.head || !doc.body) return false;
    if(doc.getElementById('catalogoNativeSkinV718')) return true;

    const style = doc.createElement('style');
    style.id = 'catalogoNativeSkinV718';
    style.textContent = `
      html,body{
        margin:0!important;
        padding:0!important;
        min-height:0!important;
        background:transparent!important;
        color-scheme:dark!important;
      }
      body{
        overflow:hidden!important;
      }
      .widget{
        width:100%!important;
        max-width:none!important;
        margin:0!important;
        padding:8px 9px 7px!important;
        border:0!important;
        border-radius:0!important;
        background:transparent!important;
        box-shadow:none!important;
      }
      .head,
      footer,
      .fundNote{
        display:none!important;
      }
      .insight{
        margin:0 0 8px!important;
      }
      .chart{
        margin-top:5px!important;
      }
      ${kind === 'current' ? `
        .moves{margin-top:7px!important;}
      ` : `
        .controls{margin:2px 0 7px!important;}
      `}
    `;
    doc.head.appendChild(style);
    doc.documentElement.style.background = 'transparent';
    doc.body.style.background = 'transparent';
    return true;
  }

  function measure(frame){
    const doc = frameDoc(frame);
    if(!doc) return null;
    const de = doc.documentElement;
    const body = doc.body;
    const vals = [
      de?.scrollHeight, de?.offsetHeight,
      body?.scrollHeight, body?.offsetHeight
    ].filter(v => Number.isFinite(v) && v > 0);
    if(!vals.length) return null;
    return Math.max(...vals);
  }

  function resize(frame){
    if(!frame) return;
    const h = measure(frame);
    if(!h) return;
    frame.style.height = `${Math.max(330, Math.min(h + 2, 900))}px`;
  }

  function prepare(frame, kind){
    if(!frame || frame.dataset.nativeV718 === '1') return;
    frame.dataset.nativeV718 = '1';

    const run = () => {
      injectNativeSkin(frame, kind);
      resize(frame);

      setTimeout(() => {
        injectNativeSkin(frame, kind);
        resize(frame);
      }, 100);

      setTimeout(() => resize(frame), 500);

      try{
        const doc = frameDoc(frame);
        const widget = doc?.querySelector('.widget') || doc?.body;
        if(widget && window.ResizeObserver && !frame.__nativeRoV718){
          const ro = new ResizeObserver(() => resize(frame));
          ro.observe(widget);
          frame.__nativeRoV718 = ro;
        }
      }catch(e){}
    };

    frame.addEventListener('load', run);
    if(frameDoc(frame)?.readyState === 'complete') run();
  }

  function ensureHistoryLoaded(){
    const frame = document.getElementById(HISTORY_ID);
    if(!frame) return;
    if(!frame.getAttribute('src')){
      const src = frame.dataset.src;
      if(src) frame.setAttribute('src', src);
    }
    prepare(frame, 'history');
  }

  function bind(){
    const current = document.getElementById(CURRENT_ID);
    prepare(current, 'current');

    const details = document.getElementById('diHistoryDetailsV718');
    if(details && details.dataset.boundV718 !== '1'){
      details.dataset.boundV718 = '1';
      details.addEventListener('toggle', () => {
        if(details.open){
          ensureHistoryLoaded();
          setTimeout(() => resize(document.getElementById(HISTORY_ID)), 120);
        }
      });
    }
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', bind, {once:true});
  }else{
    bind();
  }

  window.addEventListener('resize', () => {
    resize(document.getElementById(CURRENT_ID));
    const d = document.getElementById('diHistoryDetailsV718');
    if(d?.open) resize(document.getElementById(HISTORY_ID));
  }, {passive:true});

  window.__ELTAUM_DI_FUTURO_TESTE_V718__ = {
    build:'ELTAUM_DI_FUTURO_TESTE_V718',
    refresh(){
      const current = document.getElementById(CURRENT_ID);
      injectNativeSkin(current, 'current');
      resize(current);
      const history = document.getElementById(HISTORY_ID);
      if(history?.getAttribute('src')){
        injectNativeSkin(history, 'history');
        resize(history);
      }
    }
  };

  console.info('[Catálogo CAIXA] DI Futuro teste v718 nativo ativo');
})();

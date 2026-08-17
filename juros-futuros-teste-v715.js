/* =========================================================
   DI FUTURO / CURVA DE JUROS · TESTE v715
   Autoaltura dos widgets quando disponíveis no mesmo origin.
   ========================================================= */
(function jurosFuturosTesteV715(){
  'use strict';

  const FRAME_IDS = ['diCurrentFrameV715','diHistoryFrameV715'];

  function desiredHeight(frame){
    try{
      const doc = frame.contentDocument;
      if(!doc) return null;
      const de = doc.documentElement;
      const body = doc.body;
      const values = [
        de?.scrollHeight, de?.offsetHeight, de?.clientHeight,
        body?.scrollHeight, body?.offsetHeight, body?.clientHeight
      ].filter(Number.isFinite);
      if(!values.length) return null;
      return Math.max(...values);
    }catch(e){
      return null;
    }
  }

  function resize(frame){
    if(!frame) return;
    const h = desiredHeight(frame);
    if(!h) return;

    // Widget completo, sem barra de rolagem interna.
    const next = Math.max(470, Math.min(h + 4, 980));
    frame.style.height = `${next}px`;
  }

  function watch(frame){
    if(!frame || frame.dataset.diResizeV715 === '1') return;
    frame.dataset.diResizeV715 = '1';

    const run = () => {
      resize(frame);
      setTimeout(() => resize(frame), 120);
      setTimeout(() => resize(frame), 600);

      try{
        const body = frame.contentDocument?.body;
        if(body && window.ResizeObserver && !frame.__diResizeObserverV715){
          const ro = new ResizeObserver(() => resize(frame));
          ro.observe(body);
          frame.__diResizeObserverV715 = ro;
        }
      }catch(e){}
    };

    frame.addEventListener('load', run);
    if(frame.contentDocument?.readyState === 'complete') run();
  }

  function bind(){
    FRAME_IDS.forEach(id => watch(document.getElementById(id)));

    const details = document.getElementById('diHistoryDetailsV715');
    if(details && details.dataset.diToggleV715 !== '1'){
      details.dataset.diToggleV715 = '1';
      details.addEventListener('toggle', () => {
        if(details.open){
          const frame = document.getElementById('diHistoryFrameV715');
          setTimeout(() => resize(frame), 80);
          setTimeout(() => resize(frame), 450);
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
    FRAME_IDS.forEach(id => resize(document.getElementById(id)));
  }, {passive:true});

  window.__ELTAUM_DI_FUTURO_TESTE_V715__ = {
    build:'ELTAUM_DI_FUTURO_TESTE_V715',
    resizeAll(){
      FRAME_IDS.forEach(id => resize(document.getElementById(id)));
    }
  };

  console.info('[Catálogo CAIXA] DI Futuro teste v715 ativo');
})();

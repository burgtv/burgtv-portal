/* BurgTV · Cloudflare Turnstile caricato solo quando serve.
 * Lo script di Cloudflare (circa 1,4 MB scaricati) parte al primo focus, tocco o tasto dentro il modulo
 * che contiene .cf-turnstile, non al caricamento della pagina.
 * Uso nella pagina: const token = await BVTS.token();  // attende il token (max 20 s, poi null)
 *                   ... invio ...;  BVTS.consume();         // il token vale una volta sola: ne prepara uno nuovo
 */
(function () {
  'use strict';
  var API = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=__bvTsOnload';
  var st = { requested: false, id: null, token: null, waiters: [] };

  function box() { return document.querySelector('.cf-turnstile'); }
  function deliver(t) { st.token = t; var w = st.waiters; st.waiters = []; w.forEach(function (f) { f(t); }); }
  function render() {
    var c = box();
    if (!c || !window.turnstile || st.id !== null) return;
    try {
      st.id = window.turnstile.render(c, {
        sitekey: c.getAttribute('data-sitekey'),
        theme: 'dark',
        appearance: 'interaction-only', // visibile solo se Cloudflare chiede un'azione
        retry: 'auto',
        'refresh-expired': 'auto',
        callback: deliver,
        'error-callback': function () { st.token = null; },
        'expired-callback': function () { st.token = null; }
      });
    } catch (e) { /* riprova al prossimo token() */ }
  }
  window.__bvTsOnload = render;

  function load() {
    if (st.requested) { render(); return; }
    st.requested = true;
    var s = document.createElement('script');
    s.src = API; s.async = true; s.defer = true;
    s.onerror = function () { st.requested = false; };
    document.head.appendChild(s);
  }

  function token(ms) {
    load();
    if (st.token) return Promise.resolve(st.token);
    return new Promise(function (resolve) {
      var done = false;
      function f(t) { if (done) return; done = true; resolve(t); }
      st.waiters.push(f);
      setTimeout(function () { f(null); }, ms || 20000);
    });
  }

  function consume() {
    st.token = null;
    if (st.id !== null && window.turnstile) { try { window.turnstile.reset(st.id); } catch (e) {} }
  }

  function arm() {
    var c = box(); if (!c) return;
    var scope = c.closest('form') || document;
    var evs = ['focusin', 'pointerdown', 'keydown', 'touchstart'];
    function go() { evs.forEach(function (e) { scope.removeEventListener(e, go, true); }); load(); }
    evs.forEach(function (e) { scope.addEventListener(e, go, { capture: true, passive: true }); });
  }

  window.BVTS = { load: load, token: token, consume: consume };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', arm); else arm();
})();

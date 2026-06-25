/* BurgTV shared chrome (header + footer) — coerente su tutte le pagine.
 * Uso: <script src="/assets/js/bv-chrome.js" defer></script>
 * - Inietta header (logo->home + Funzioni/Download/FAQ) e footer (legal + ©).
 * - Ristruttura il body in colonna preservando il contenuto centrato delle pagine-form.
 * - i18n autonomo (11 lingue) sincronizzato con il cookie burgtv_lang + <html lang>.
 * - Nasconde l'eventuale freccia "indietro" (.burgtv-back-btn): la sostituisce il logo.
 */
(function () {
  "use strict";
  var T = {
    it:{f:'Funzioni',d:'Download',q:'FAQ',l:'Legal Hub',t:'Termini e Condizioni',p:'Privacy Policy',c:'Contatti'},
    en:{f:'Features',d:'Download',q:'FAQ',l:'Legal Hub',t:'Terms & Conditions',p:'Privacy Policy',c:'Contact'},
    de:{f:'Funktionen',d:'Download',q:'FAQ',l:'Legal Hub',t:'AGB',p:'Datenschutz',c:'Kontakt'},
    es:{f:'Funciones',d:'Descargar',q:'FAQ',l:'Legal Hub',t:'Términos y Condiciones',p:'Privacidad',c:'Contacto'},
    fr:{f:'Fonctions',d:'Télécharger',q:'FAQ',l:'Legal Hub',t:'Conditions',p:'Confidentialité',c:'Contact'},
    pt:{f:'Funções',d:'Baixar',q:'FAQ',l:'Legal Hub',t:'Termos e Condições',p:'Privacidade',c:'Contato'},
    tr:{f:'Özellikler',d:'İndir',q:'FAQ',l:'Legal Hub',t:'Şartlar ve Koşullar',p:'Gizlilik',c:'İletişim'},
    nl:{f:'Functies',d:'Downloaden',q:'FAQ',l:'Legal Hub',t:'Voorwaarden',p:'Privacy',c:'Contact'},
    pl:{f:'Funkcje',d:'Pobierz',q:'FAQ',l:'Legal Hub',t:'Regulamin',p:'Prywatność',c:'Kontakt'},
    ru:{f:'Функции',d:'Скачать',q:'FAQ',l:'Условия',t:'Условия',p:'Конфиденциальность',c:'Контакты'},
    ar:{f:'الميزات',d:'تحميل',q:'الأسئلة الشائعة',l:'Legal Hub',t:'الشروط والأحكام',p:'سياسة الخصوصية',c:'اتصل بنا'}
  };
  var HOME='https://burgtv.com', DL='https://download.burgtv.com', LOGO=HOME+'/assets/branding/logo.png';

  function lang(){
    var m=document.cookie.match(/burgtv_lang=([^;]+)/);
    if(m&&T[m[1]])return m[1];
    var d=(document.documentElement.lang||'').slice(0,2);
    if(T[d])return d;
    try{var s=localStorage.getItem('preferredLang')||localStorage.getItem('lang');if(T[s])return s;}catch(e){}
    return 'it';
  }
  function css(){
    if(document.getElementById('bv-chrome-css'))return;
    var s=document.createElement('style');s.id='bv-chrome-css';
    s.textContent=[
      '.burgtv-back-btn{display:none!important}',
      'body.bv-chrome{display:flex!important;flex-direction:column!important;min-height:100vh;margin:0;padding:0!important}',
      '.bv-main{flex:1 0 auto;display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%;padding:1.5rem 1rem;box-sizing:border-box}',
      '.bv-nav{flex:0 0 auto;background:rgba(10,10,20,.95);backdrop-filter:saturate(140%) blur(10px);-webkit-backdrop-filter:saturate(140%) blur(10px);border-bottom:1px solid rgba(255,255,255,.06)}',
      '.bv-nav-inner{display:flex;align-items:center;gap:24px;height:60px;max-width:1200px;margin:0 auto;padding:0 18px}',
      '.bv-brand{display:flex;align-items:center;text-decoration:none;flex-shrink:0}',
      '.bv-brand img{height:34px;width:auto;display:block}',
      '.bv-links{display:flex;align-items:center;gap:24px}',
      '.bv-links a{color:#d9def7;text-decoration:none;font-size:15px;font-weight:500;transition:color .2s;font-family:inherit}',
      '.bv-links a:hover{color:#B94A8E}',
      '.bv-footer{flex:0 0 auto;border-top:1px solid rgba(255,255,255,.06);padding:22px 18px;background:#0e0e18}',
      '.bv-foot-inner{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;max-width:1200px;margin:0 auto}',
      '.bv-foot-brand img{height:28px;width:auto;display:block}',
      '.bv-foot-links{display:flex;gap:18px;flex-wrap:wrap}',
      '.bv-foot-links a{color:#9ca3af;text-decoration:none;font-size:13px;transition:color .25s;font-family:inherit}',
      '.bv-foot-links a:hover{color:#B94A8E}',
      '.bv-foot-inner small{color:rgba(255,255,255,.45);font-size:13px}',
      '@media(max-width:720px){.bv-nav-inner{gap:14px;height:54px;padding:0 14px}.bv-links{gap:14px}.bv-links a{font-size:13px}.bv-foot-inner{flex-direction:column;text-align:center;justify-content:center}}',
      '@media(max-width:420px){.bv-links{gap:10px}.bv-links a{font-size:12px}.bv-brand img{height:28px}}'
    ].join('');
    document.head.appendChild(s);
  }
  function render(){
    var t=T[lang()]||T.it;
    var set=function(id,v){var e=document.getElementById(id);if(e)e.textContent=v;};
    set('bv-l-f',t.f);set('bv-l-d',t.d);set('bv-l-q',t.q);
    set('bv-f-l',t.l);set('bv-f-t',t.t);set('bv-f-p',t.p);set('bv-f-c',t.c);
  }
  function build(){
    if(document.getElementById('bv-chrome-header'))return;
    css();
    var main=document.createElement('main');main.className='bv-main';
    while(document.body.firstChild){main.appendChild(document.body.firstChild);}
    var head=document.createElement('header');head.className='bv-nav';head.id='bv-chrome-header';
    head.innerHTML='<div class="bv-nav-inner"><a class="bv-brand" href="'+HOME+'"><img src="'+LOGO+'" alt="BurgTV"></a>'+
      '<nav class="bv-links"><a id="bv-l-f" href="'+HOME+'/#features"></a><a id="bv-l-d" href="'+DL+'"></a><a id="bv-l-q" href="'+HOME+'/#faq"></a></nav></div>';
    var foot=document.createElement('footer');foot.className='bv-footer';foot.id='bv-chrome-footer';
    foot.innerHTML='<div class="bv-foot-inner"><a class="bv-foot-brand" href="'+HOME+'"><img src="'+LOGO+'" alt="BurgTV"></a>'+
      '<div class="bv-foot-links"><a id="bv-f-l" href="'+HOME+'/legal/"></a><a id="bv-f-t" href="'+HOME+'/legal/terms.html"></a><a id="bv-f-p" href="'+HOME+'/legal/privacy.html"></a><a id="bv-f-c" href="mailto:info@burgtv.com"></a></div>'+
      '<small>© '+(new Date().getFullYear())+' BurgTV – burgtv.com</small></div>';
    document.body.appendChild(head);
    document.body.appendChild(main);
    document.body.appendChild(foot);
    document.body.classList.add('bv-chrome');
    render();
    try{new MutationObserver(render).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});}catch(e){}
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',build);else build();
})();

"use strict";
// Pagina /accedi (SPEC BTVSYNC1 7.8, R2).
// PRIMA di qualunque altra cosa: togliamo il frammento (#c=...&k=...&s=...&m=...&fp=...) dall'indirizzo.
// La pagina NON legge il frammento: nessun valore (c, k, s, m, fp) viene copiato in variabili, salvato, inviato o registrato.
// I browser non mandano mai il frammento al server; qui lo togliamo anche dalla cronologia e dai preferiti.
// Questo script e' caricato in <head> senza defer/async, quindi gira prima di immagini, font e di ogni altro script.
try { if (location.hash) history.replaceState(null, "", location.pathname + location.search); } catch (_) {}
// Solo DOPO aver tolto il frammento si chiede altro al server: foglio di stile qui, logo in init() (il preload scanner
// del browser non vede questi indirizzi, quindi nessuna richiesta parte mentre il frammento e' ancora nell'indirizzo).
(function () { const l = document.createElement("link"); l.rel = "stylesheet"; l.href = "/accedi/accedi.css?v=20261113"; document.head.appendChild(l); })();

(function () {
  const T = {
    it: { pageTitle: "Accedi - BurgTV", title: "Apri questo QR con l'app BurgTV", sub: "L'accesso dal QR della TV si fa con l'app BurgTV sul telefono o sul tablet.",
      haveTitle: "Hai già l'app BurgTV?", haveText: "Aggiornala all'ultima versione, poi inquadra di nuovo il QR della TV con la fotocamera: si apre direttamente l'app.",
      getTitle: "Non hai ancora l'app?", getText: "Scaricala, aprila una volta e poi inquadra di nuovo il QR.",
      ios: "App Store (iPhone e iPad)", android: "Android (download.burgtv.com)",
      pcTitle: "Sei su un computer?", pcText: "Inquadra il QR della TV con il telefono: questa pagina da sola non può collegare la TV.",
      syncText: "La sincronizzazione tra dispositivi si attiva solo dall'app.",
      privacy: "Per sicurezza abbiamo tolto i dati del QR dall'indirizzo di questa pagina: non li leggiamo, non li inviamo e non li salviamo." },
    en: { pageTitle: "Sign in - BurgTV", title: "Open this QR code with the BurgTV app", sub: "Signing in from the TV's QR code works with the BurgTV app on your phone or tablet.",
      haveTitle: "Already have the BurgTV app?", haveText: "Update it to the latest version, then scan the TV's QR code again with your camera: the app opens directly.",
      getTitle: "Don't have the app yet?", getText: "Download it, open it once, then scan the QR code again.",
      ios: "App Store (iPhone and iPad)", android: "Android (download.burgtv.com)",
      pcTitle: "On a computer?", pcText: "Scan the TV's QR code with your phone: this page alone can't connect the TV.",
      syncText: "Sync between devices can only be turned on from the app.",
      privacy: "For your security we removed the QR data from this page's address: we don't read it, send it or store it." },
    de: { pageTitle: "Anmelden - BurgTV", title: "Öffne diesen QR-Code mit der BurgTV-App", sub: "Die Anmeldung über den QR-Code des Fernsehers funktioniert mit der BurgTV-App auf Smartphone oder Tablet.",
      haveTitle: "Du hast die BurgTV-App schon?", haveText: "Aktualisiere sie auf die neueste Version und scanne den QR-Code des Fernsehers erneut mit der Kamera: Die App öffnet sich direkt.",
      getTitle: "Du hast die App noch nicht?", getText: "Lade sie herunter, öffne sie einmal und scanne dann den QR-Code erneut.",
      ios: "App Store (iPhone und iPad)", android: "Android (download.burgtv.com)",
      pcTitle: "Du bist am Computer?", pcText: "Scanne den QR-Code des Fernsehers mit dem Smartphone: Diese Seite allein kann den Fernseher nicht verbinden.",
      syncText: "Die Synchronisierung zwischen Geräten lässt sich nur in der App einschalten.",
      privacy: "Zu deiner Sicherheit haben wir die Daten des QR-Codes aus der Adresse dieser Seite entfernt: Wir lesen, senden und speichern sie nicht." },
    es: { pageTitle: "Iniciar sesión - BurgTV", title: "Abre este código QR con la app BurgTV", sub: "El inicio de sesión con el código QR de la TV se hace con la app BurgTV en el móvil o la tableta.",
      haveTitle: "¿Ya tienes la app BurgTV?", haveText: "Actualízala a la última versión y vuelve a escanear el código QR de la TV con la cámara: la app se abre directamente.",
      getTitle: "¿Aún no tienes la app?", getText: "Descárgala, ábrela una vez y vuelve a escanear el código QR.",
      ios: "App Store (iPhone y iPad)", android: "Android (download.burgtv.com)",
      pcTitle: "¿Estás en un ordenador?", pcText: "Escanea el código QR de la TV con el móvil: esta página por sí sola no puede conectar la TV.",
      syncText: "La sincronización entre dispositivos solo se activa desde la app.",
      privacy: "Por tu seguridad hemos quitado los datos del código QR de la dirección de esta página: no los leemos, no los enviamos y no los guardamos." },
    fr: { pageTitle: "Connexion - BurgTV", title: "Ouvrez ce QR code avec l'app BurgTV", sub: "La connexion depuis le QR code de la TV se fait avec l'app BurgTV sur votre téléphone ou votre tablette.",
      haveTitle: "Vous avez déjà l'app BurgTV ?", haveText: "Mettez-la à jour, puis scannez de nouveau le QR code de la TV avec l'appareil photo : l'app s'ouvre directement.",
      getTitle: "Vous n'avez pas encore l'app ?", getText: "Téléchargez-la, ouvrez-la une fois, puis scannez de nouveau le QR code.",
      ios: "App Store (iPhone et iPad)", android: "Android (download.burgtv.com)",
      pcTitle: "Vous êtes sur un ordinateur ?", pcText: "Scannez le QR code de la TV avec votre téléphone : cette page seule ne peut pas connecter la TV.",
      syncText: "La synchronisation entre appareils s'active uniquement depuis l'app.",
      privacy: "Pour votre sécurité, nous avons retiré les données du QR code de l'adresse de cette page : nous ne les lisons pas, ne les envoyons pas et ne les enregistrons pas." },
    pt: { pageTitle: "Entrar - BurgTV", title: "Abra este QR code com o app BurgTV", sub: "O acesso pelo QR code da TV é feito com o app BurgTV no celular ou no tablet.",
      haveTitle: "Já tem o app BurgTV?", haveText: "Atualize para a versão mais recente e escaneie de novo o QR code da TV com a câmera: o app abre direto.",
      getTitle: "Ainda não tem o app?", getText: "Baixe, abra uma vez e escaneie o QR code de novo.",
      ios: "App Store (iPhone e iPad)", android: "Android (download.burgtv.com)",
      pcTitle: "Está no computador?", pcText: "Escaneie o QR code da TV com o celular: esta página sozinha não consegue conectar a TV.",
      syncText: "A sincronização entre dispositivos só pode ser ativada pelo app.",
      privacy: "Para sua segurança, removemos os dados do QR code do endereço desta página: não os lemos, não os enviamos e não os salvamos." },
    tr: { pageTitle: "Giriş - BurgTV", title: "Bu QR kodu BurgTV uygulamasıyla açın", sub: "TV'deki QR kodla giriş, telefon veya tabletteki BurgTV uygulamasıyla yapılır.",
      haveTitle: "BurgTV uygulaması zaten var mı?", haveText: "En son sürüme güncelleyin, ardından TV'deki QR kodu kamerayla yeniden tarayın: uygulama doğrudan açılır.",
      getTitle: "Uygulama henüz yok mu?", getText: "İndirin, bir kez açın ve QR kodu yeniden tarayın.",
      ios: "App Store (iPhone ve iPad)", android: "Android (download.burgtv.com)",
      pcTitle: "Bilgisayarda mısınız?", pcText: "TV'deki QR kodu telefonla tarayın: bu sayfa tek başına TV'yi bağlayamaz.",
      syncText: "Cihazlar arası senkronizasyon yalnızca uygulamadan açılabilir.",
      privacy: "Güvenliğiniz için QR kod verilerini bu sayfanın adresinden kaldırdık: bunları okumuyor, göndermiyor ve kaydetmiyoruz." },
    nl: { pageTitle: "Inloggen - BurgTV", title: "Open deze QR-code met de BurgTV-app", sub: "Inloggen via de QR-code van de tv gaat met de BurgTV-app op je telefoon of tablet.",
      haveTitle: "Heb je de BurgTV-app al?", haveText: "Werk hem bij naar de nieuwste versie en scan de QR-code van de tv opnieuw met je camera: de app opent meteen.",
      getTitle: "Heb je de app nog niet?", getText: "Download hem, open hem één keer en scan de QR-code opnieuw.",
      ios: "App Store (iPhone en iPad)", android: "Android (download.burgtv.com)",
      pcTitle: "Zit je achter een computer?", pcText: "Scan de QR-code van de tv met je telefoon: deze pagina alleen kan de tv niet koppelen.",
      syncText: "Synchronisatie tussen apparaten zet je alleen aan in de app.",
      privacy: "Voor je veiligheid hebben we de gegevens van de QR-code uit het adres van deze pagina gehaald: we lezen, versturen en bewaren ze niet." },
    pl: { pageTitle: "Logowanie - BurgTV", title: "Otwórz ten kod QR w aplikacji BurgTV", sub: "Logowanie kodem QR z telewizora odbywa się w aplikacji BurgTV na telefonie lub tablecie.",
      haveTitle: "Masz już aplikację BurgTV?", haveText: "Zaktualizuj ją do najnowszej wersji i ponownie zeskanuj kod QR z telewizora aparatem: aplikacja otworzy się od razu.",
      getTitle: "Nie masz jeszcze aplikacji?", getText: "Pobierz ją, otwórz raz, a potem ponownie zeskanuj kod QR.",
      ios: "App Store (iPhone i iPad)", android: "Android (download.burgtv.com)",
      pcTitle: "Jesteś przy komputerze?", pcText: "Zeskanuj kod QR z telewizora telefonem: ta strona sama nie połączy telewizora.",
      syncText: "Synchronizację między urządzeniami można włączyć tylko w aplikacji.",
      privacy: "Dla bezpieczeństwa usunęliśmy dane kodu QR z adresu tej strony: nie odczytujemy ich, nie wysyłamy i nie zapisujemy." },
    ru: { pageTitle: "Вход - BurgTV", title: "Откройте этот QR-код в приложении BurgTV", sub: "Вход по QR-коду с телевизора выполняется в приложении BurgTV на телефоне или планшете.",
      haveTitle: "Приложение BurgTV уже установлено?", haveText: "Обновите его до последней версии и снова отсканируйте QR-код с телевизора камерой: приложение откроется сразу.",
      getTitle: "Приложения ещё нет?", getText: "Скачайте его, откройте один раз и снова отсканируйте QR-код.",
      ios: "App Store (iPhone и iPad)", android: "Android (download.burgtv.com)",
      pcTitle: "Вы за компьютером?", pcText: "Отсканируйте QR-код с телевизора телефоном: эта страница сама по себе не может подключить телевизор.",
      syncText: "Синхронизацию между устройствами можно включить только в приложении.",
      privacy: "Ради вашей безопасности мы убрали данные QR-кода из адреса этой страницы: мы их не читаем, не отправляем и не сохраняем." },
    ar: { pageTitle: "تسجيل الدخول - BurgTV", title: "افتح رمز QR هذا بتطبيق BurgTV", sub: "يتم تسجيل الدخول من رمز QR الظاهر على التلفاز عبر تطبيق BurgTV على الهاتف أو الجهاز اللوحي.",
      haveTitle: "هل لديك تطبيق BurgTV؟", haveText: "حدّثه إلى أحدث إصدار، ثم امسح رمز QR الظاهر على التلفاز مرة أخرى بالكاميرا: سيفتح التطبيق مباشرة.",
      getTitle: "ليس لديك التطبيق بعد؟", getText: "نزّله وافتحه مرة واحدة، ثم امسح رمز QR مرة أخرى.",
      ios: "App Store (iPhone وiPad)", android: "Android (download.burgtv.com)",
      pcTitle: "هل تستخدم حاسوبًا؟", pcText: "امسح رمز QR الظاهر على التلفاز بهاتفك: لا تستطيع هذه الصفحة وحدها ربط التلفاز.",
      syncText: "لا يمكن تفعيل المزامنة بين الأجهزة إلا من التطبيق.",
      privacy: "حفاظًا على أمانك أزلنا بيانات رمز QR من عنوان هذه الصفحة: لا نقرأها ولا نرسلها ولا نحفظها." }
  };
  const LANGS = ["it", "en", "de", "es", "fr", "pt", "tr", "nl", "pl", "ru", "ar"];
  let lang = "en";
  try { const n = (navigator.language || "").slice(0, 2).toLowerCase(); if (LANGS.includes(n)) lang = n; } catch (_) {}
  try { const m = document.cookie.match(/burgtv_lang=([a-z]{2})/); if (m && LANGS.includes(m[1])) lang = m[1]; } catch (_) {}
  const t = (k) => (T[lang] && T[lang][k]) || T.en[k] || k;

  function applyLang() {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.title = t("pageTitle");
    document.querySelectorAll("[data-t]").forEach((el) => { el.textContent = t(el.dataset.t); });
    const sel = document.getElementById("lang"); if (sel) sel.value = lang;
  }

  function init() {
    const logo = document.getElementById("logo"); logo.src = logo.dataset.src;
    applyLang();
    document.getElementById("lang").addEventListener("change", (e) => { lang = e.target.value; applyLang(); });
    // Il pulsante del proprio sistema in evidenza (solo lo user-agent locale, nulla viene inviato).
    let os = "";
    try {
      const ua = navigator.userAgent || "";
      if (/iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)) os = "ios";
      else if (/Android/.test(ua)) os = "android";
    } catch (_) {}
    if (os) {
      const a = document.getElementById(os === "ios" ? "lnkIos" : "lnkAndroid");
      a.classList.add("primary");
      a.parentNode.insertBefore(a, a.parentNode.firstChild);
      document.getElementById("cardPc").classList.add("hidden");
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();

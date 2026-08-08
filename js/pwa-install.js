(() => {
  let deferredPrompt = null;

  const isStandalone = () =>
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true;

  const isIOS = () =>
    /iphone|ipad|ipod/i.test(navigator.userAgent);

  const button = document.getElementById("pwaInstallBtn");
  const iosSheet = document.getElementById("pwaIosSheet");
  const iosClose = document.getElementById("pwaIosClose");

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/service-worker.js").catch(() => {});
    });
  }

  if (!button || isStandalone()) return;

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    button.hidden = false;
  });

  window.addEventListener("appinstalled", () => {
    deferredPrompt = null;
    button.hidden = true;
    localStorage.setItem("zamnPwaInstalled", "1");
  });

  // iOS Safari لا يرسل beforeinstallprompt؛ نظهر الزر بإرشادات بسيطة.
  if (isIOS()) {
    button.hidden = false;
  }

  button.addEventListener("click", async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      try {
        await deferredPrompt.userChoice;
      } catch (_) {}
      deferredPrompt = null;
      button.hidden = true;
      return;
    }

    if (isIOS() && iosSheet) {
      iosSheet.hidden = false;
    }
  });

  if (iosClose && iosSheet) {
    iosClose.addEventListener("click", () => {
      iosSheet.hidden = true;
    });

    iosSheet.addEventListener("click", (e) => {
      if (e.target === iosSheet) iosSheet.hidden = true;
    });
  }
})();
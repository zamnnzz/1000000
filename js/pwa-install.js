(() => {
  let deferredPrompt = null;

  const board = document.getElementById("pwaInstallBoard");
  const helpSheet = document.getElementById("pwaIosSheet");
  const helpClose = document.getElementById("pwaIosClose");
  const helpText = document.getElementById("pwaInstallHelpText");
  const helpTitle = document.getElementById("pwaIosTitle");

  const ua = navigator.userAgent || "";

  const isIOS = () => /iphone|ipad|ipod/i.test(ua);

  const browserName = () => {
    if (/CriOS/i.test(ua)) return "Chrome";
    if (/FxiOS/i.test(ua)) return "Firefox";
    if (/EdgiOS/i.test(ua)) return "Edge";
    if (/OPiOS/i.test(ua)) return "Opera";
    if (isIOS() && /Safari/i.test(ua)) return "Safari";
    if (/Edg\//i.test(ua)) return "Edge";
    if (/OPR\//i.test(ua)) return "Opera";
    if (/Chrome\//i.test(ua)) return "Chrome";
    if (/Firefox\//i.test(ua)) return "Firefox";
    if (/Safari\//i.test(ua)) return "Safari";
    return "المتصفح";
  };

  const isStandalone = () =>
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true;

  const isHome = () => {
    const p = location.pathname.replace(/\/+$/, "") || "/";
    return p === "/";
  };

  const showBoard = () => {
    if (!board) return;
    if (isStandalone() || !isHome()) {
      board.classList.add("is-pwa-hidden");
      return;
    }
    board.classList.remove("is-pwa-hidden");
  };

  const hideBoard = () => {
    if (board) board.classList.add("is-pwa-hidden");
  };

  const setBrowserInstructions = () => {
    if (!helpText || !helpTitle) return;

    const b = browserName();
    helpTitle.textContent = "إضافة ألعاب زامن إلى الصفحة الرئيسية";

    if (isIOS()) {
      if (b === "Safari") {
        helpText.innerHTML =
          'في <strong>Safari</strong> اضغط زر <strong>المشاركة</strong> ثم اختر <strong>إضافة إلى الشاشة الرئيسية</strong>.';
      } else if (b === "Chrome") {
        helpText.innerHTML =
          'في <strong>Chrome</strong> اضغط زر <strong>المشاركة</strong> ثم اختر <strong>إضافة إلى الشاشة الرئيسية</strong>.';
      } else {
        helpText.innerHTML =
          `في <strong>${b}</strong> افتح قائمة المشاركة أو خيارات المتصفح ثم اختر <strong>إضافة إلى الشاشة الرئيسية</strong>.`;
      }
      return;
    }

    helpText.innerHTML =
      `في <strong>${b}</strong> اضغط على <strong>أضف الآن</strong>. إذا لم تظهر نافذة التثبيت، افتح قائمة المتصفح واختر <strong>تثبيت التطبيق</strong> أو <strong>إضافة إلى الشاشة الرئيسية</strong>.`;
  };

  const startInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      try { await deferredPrompt.userChoice; } catch (_) {}
      deferredPrompt = null;
      return;
    }

    if (helpSheet) {
      setBrowserInstructions();
      helpSheet.hidden = false;
    }
  };

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/service-worker.js").catch(() => {});
    });
  }

  window.addEventListener("beforeinstallprompt", e => {
    e.preventDefault();
    deferredPrompt = e;
    showBoard();
  });

  window.addEventListener("appinstalled", () => {
    deferredPrompt = null;
    hideBoard();
    localStorage.setItem("zamnPwaInstalled", "1");
  });

  window.addEventListener("load", () => {
    setBrowserInstructions();
    showBoard();
  });

  if (board) board.addEventListener("click", startInstall);

  if (helpClose && helpSheet) {
    helpClose.addEventListener("click", () => helpSheet.hidden = true);
    helpSheet.addEventListener("click", e => {
      if (e.target === helpSheet) helpSheet.hidden = true;
    });
  }

  let lastWasHome = isHome();

  const handleNavigation = () => {
    const nowHome = isHome();

    if (!nowHome) {
      hideBoard();
      lastWasHome = false;
      return;
    }

    if (!lastWasHome) showBoard();
    lastWasHome = true;
  };

  window.addEventListener("popstate", handleNavigation);

  const originalPushState = history.pushState.bind(history);
  history.pushState = (...args) => {
    originalPushState(...args);
    handleNavigation();
  };

  const originalReplaceState = history.replaceState.bind(history);
  history.replaceState = (...args) => {
    originalReplaceState(...args);
    handleNavigation();
  };

  document.addEventListener("zamn:home", showBoard);
})();
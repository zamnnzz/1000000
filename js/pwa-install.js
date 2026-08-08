(() => {
  let deferredPrompt = null;
  const MAX_SESSION_PROMPTS = 3;
  const COUNT_KEY = "zamnPwaPromptCountV2";
  const DISPLAY_LOCK_KEY = "zamnPwaDisplayLockedV2";

  const promptBox = document.getElementById("pwaInstallPrompt");
  const closeBtn = document.getElementById("pwaInstallClose");
  const actionBtn = document.getElementById("pwaInstallAction");
  const footerBtn = document.getElementById("pwaFooterInstallBtn");

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

  const getCount = () => {
    const n = parseInt(sessionStorage.getItem(COUNT_KEY) || "0", 10);
    return Number.isFinite(n) ? Math.max(0, Math.min(MAX_SESSION_PROMPTS, n)) : 0;
  };

  const setCount = (n) => {
    const value = Math.max(0, Math.min(MAX_SESSION_PROMPTS, n));
    sessionStorage.setItem(COUNT_KEY, String(value));
    if (value >= MAX_SESSION_PROMPTS) {
      sessionStorage.setItem(DISPLAY_LOCK_KEY, "1");
    }
  };

  const isLocked = () =>
    sessionStorage.getItem(DISPLAY_LOCK_KEY) === "1" ||
    getCount() >= MAX_SESSION_PROMPTS;

  const hidePrompt = () => {
    if (promptBox) promptBox.hidden = true;
  };

  const installationAvailable = () => isIOS() || !!deferredPrompt;

  const showPromptOnce = () => {
    if (!promptBox) return;
    if (isStandalone() || !isHome() || isLocked() || !installationAvailable()) {
      hidePrompt();
      return;
    }

    // Only count when changing from hidden -> visible.
    if (promptBox.hidden) {
      const before = getCount();
      if (before >= MAX_SESSION_PROMPTS) {
        sessionStorage.setItem(DISPLAY_LOCK_KEY, "1");
        hidePrompt();
        return;
      }

      promptBox.hidden = false;
      setCount(before + 1);
    }
  };

  const setBrowserInstructions = () => {
    if (!helpText || !helpTitle) return;

    const b = browserName();
    helpTitle.textContent = "أضف ألعاب زامن إلى الصفحة الرئيسية";

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
      `في <strong>${b}</strong> افتح قائمة المتصفح ثم اختر <strong>تثبيت التطبيق</strong> أو <strong>إضافة إلى الشاشة الرئيسية</strong>.`;
  };

  const startInstall = async (event) => {
    if (event) event.preventDefault();

    if (deferredPrompt) {
      deferredPrompt.prompt();
      try { await deferredPrompt.userChoice; } catch (_) {}
      deferredPrompt = null;
      hidePrompt();
      return;
    }

    if (isIOS() && helpSheet) {
      setBrowserInstructions();
      helpSheet.hidden = false;
      return;
    }

    // Browsers without beforeinstallprompt: give browser-aware fallback instructions.
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
    showPromptOnce();
  });

  window.addEventListener("appinstalled", () => {
    deferredPrompt = null;
    hidePrompt();
    localStorage.setItem("zamnPwaInstalled", "1");
    if (footerBtn) footerBtn.hidden = true;
  });

  window.addEventListener("load", () => {
    setBrowserInstructions();

    if (isStandalone()) {
      hidePrompt();
      if (footerBtn) footerBtn.hidden = true;
      return;
    }

    // iOS has no beforeinstallprompt.
    if (isIOS()) showPromptOnce();
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", hidePrompt);
  }

  if (actionBtn) actionBtn.addEventListener("click", startInstall);
  if (footerBtn) footerBtn.addEventListener("click", startInstall);

  if (helpClose && helpSheet) {
    helpClose.addEventListener("click", () => helpSheet.hidden = true);
    helpSheet.addEventListener("click", e => {
      if (e.target === helpSheet) helpSheet.hidden = true;
    });
  }

  // SPA / browser navigation:
  // Leaving home always hides it.
  // Returning home can show it only if the hard session cap is still < 3.
  let lastWasHome = isHome();

  const handleNavigation = () => {
    const nowHome = isHome();

    if (!nowHome) {
      hidePrompt();
      lastWasHome = false;
      return;
    }

    if (!lastWasHome) {
      setTimeout(showPromptOnce, 250);
    }

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

  document.addEventListener("zamn:home", () => {
    setTimeout(showPromptOnce, 150);
  });
})();
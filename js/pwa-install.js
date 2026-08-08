(() => {
  let deferredPrompt = null;
  let closedForCurrentHome = false;

  const promptBox = document.getElementById("pwaInstallPrompt");
  const closeBtn = document.getElementById("pwaInstallClose");
  const actionBtn = document.getElementById("pwaInstallAction");
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

  const hidePrompt = () => {
    if (promptBox) promptBox.hidden = true;
  };

  const canShow = () => {
    if (!promptBox || isStandalone() || !isHome() || closedForCurrentHome) return false;
    // Android/desktop: only when the browser actually offers install.
    // iOS: show because installation is manual from the browser share/menu.
    return isIOS() || !!deferredPrompt;
  };

  const showPrompt = () => {
    if (canShow()) promptBox.hidden = false;
    else hidePrompt();
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
      } else if (b === "Edge") {
        helpText.innerHTML =
          'في <strong>Edge</strong> افتح قائمة المشاركة أو القائمة الرئيسية ثم اختر <strong>إضافة إلى الشاشة الرئيسية</strong> إذا ظهرت.';
      } else {
        helpText.innerHTML =
          `في <strong>${b}</strong> افتح قائمة المشاركة أو خيارات المتصفح ثم اختر <strong>إضافة إلى الشاشة الرئيسية</strong>.`;
      }
      return;
    }

    helpText.innerHTML =
      `في <strong>${b}</strong> افتح قائمة المتصفح ثم اختر <strong>تثبيت التطبيق</strong> أو <strong>إضافة إلى الشاشة الرئيسية</strong>.`;
  };

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/service-worker.js").catch(() => {});
    });
  }

  window.addEventListener("beforeinstallprompt", e => {
    e.preventDefault();
    deferredPrompt = e;
    showPrompt();
  });

  window.addEventListener("appinstalled", () => {
    deferredPrompt = null;
    hidePrompt();
    localStorage.setItem("zamnPwaInstalled", "1");
  });

  window.addEventListener("load", () => {
    setBrowserInstructions();
    if (isIOS()) showPrompt();
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      closedForCurrentHome = true;
      hidePrompt();
    });
  }

  if (actionBtn) {
    actionBtn.addEventListener("click", async () => {
      // Android/Chrome and other supporting browsers: native install prompt.
      if (deferredPrompt) {
        deferredPrompt.prompt();
        try { await deferredPrompt.userChoice; } catch (_) {}
        deferredPrompt = null;
        hidePrompt();
        return;
      }

      // iPhone/iPad: browser-specific instructions.
      if (isIOS() && helpSheet) {
        setBrowserInstructions();
        helpSheet.hidden = false;
      }
    });
  }

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
      hidePrompt();
      lastWasHome = false;
      return;
    }

    if (!lastWasHome) {
      closedForCurrentHome = false;
      setTimeout(showPrompt, 250);
    } else {
      showPrompt();
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
    closedForCurrentHome = false;
    setTimeout(showPrompt, 150);
  });
})();
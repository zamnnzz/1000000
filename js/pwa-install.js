(() => {
  let deferredPrompt = null;
  let closedForCurrentHome = false;

  const promptBox = document.getElementById("pwaInstallPrompt");
  const closeBtn = document.getElementById("pwaInstallClose");
  const actionBtn = document.getElementById("pwaInstallAction");
  const iosSheet = document.getElementById("pwaIosSheet");
  const iosClose = document.getElementById("pwaIosClose");

  const isIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent);
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
    return isIOS() || !!deferredPrompt;
  };

  const showPrompt = () => {
    if (canShow()) promptBox.hidden = false;
    else hidePrompt();
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

  // iPhone: Safari لا يوفر beforeinstallprompt.
  window.addEventListener("load", () => {
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
      if (deferredPrompt) {
        deferredPrompt.prompt();
        try { await deferredPrompt.userChoice; } catch (_) {}
        deferredPrompt = null;
        hidePrompt();
        return;
      }

      if (isIOS() && iosSheet) {
        iosSheet.hidden = false;
      }
    });
  }

  if (iosClose && iosSheet) {
    iosClose.addEventListener("click", () => iosSheet.hidden = true);
    iosSheet.addEventListener("click", e => {
      if (e.target === iosSheet) iosSheet.hidden = true;
    });
  }

  // SPA navigation / browser navigation:
  // عند مغادرة الرئيسية نخفي التنبيه.
  // وعند الرجوع للرئيسية نسمح بظهوره مجددًا.
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

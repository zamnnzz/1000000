(() => {
  const firebaseConfig = {
    apiKey: "AIzaSyCzvg6chpSyNPGm_rS8F83Ig8WLhD3pxr8",
    authDomain: "zamn-games.firebaseapp.com",
    databaseURL: "https://zamn-games-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "zamn-games",
    storageBucket: "zamn-games.firebasestorage.app",
    messagingSenderId: "171536871956",
    appId: "1:171536871956:web:4a1a8c1986bf4ecd63ed01"
  };

  let readyPromise = null;
  const listeners = new Map();

  const loadScript = (src) => new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[data-lazy-firebase="${src}"]`);
    if (existing) {
      if (existing.dataset.loaded === "1") return resolve();
      existing.addEventListener("load", resolve, { once: true });
      existing.addEventListener("error", reject, { once: true });
      return;
    }

    const tag = document.createElement("script");
    tag.src = src;
    tag.async = true;
    tag.dataset.lazyFirebase = src;
    tag.onload = () => {
      tag.dataset.loaded = "1";
      resolve();
    };
    tag.onerror = reject;
    document.head.appendChild(tag);
  });

  const ensureFirebase = () => {
    if (window.firebase && window.firebase.database) {
      if (!window.firebase.apps || !window.firebase.apps.length) {
        window.firebase.initializeApp(firebaseConfig);
      }
      return Promise.resolve({ firebase: window.firebase, db: window.firebase.database() });
    }

    if (!readyPromise) {
      readyPromise = (async () => {
        await loadScript("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
        await loadScript("https://www.gstatic.com/firebasejs/10.12.2/firebase-database-compat.js");
        if (!window.firebase.apps || !window.firebase.apps.length) {
          window.firebase.initializeApp(firebaseConfig);
        }
        return { firebase: window.firebase, db: window.firebase.database() };
      })().catch((error) => {
        readyPromise = null;
        throw error;
      });
    }

    return readyPromise;
  };

  const makeKey = () =>
    `log_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 12)}`;

  const makeRef = (path = "", presetKey = null) => {
    const normalizedPath = path || "";
    const refId = `${normalizedPath}:${presetKey || ""}`;

    return {
      key: presetKey,
      async get() {
        const { db } = await ensureFirebase();
        return db.ref(normalizedPath).get();
      },
      async set(value) {
        const { db } = await ensureFirebase();
        return db.ref(normalizedPath).set(value);
      },
      async update(value) {
        const { db } = await ensureFirebase();
        return db.ref(normalizedPath).update(value);
      },
      on(event, callback) {
        const token = { cancelled: false, realRef: null, callback };
        listeners.set(refId + event + String(callback), token);
        ensureFirebase().then(({ db }) => {
          if (token.cancelled) return;
          token.realRef = db.ref(normalizedPath);
          token.realRef.on(event, callback);
        }).catch(console.error);
        return callback;
      },
      off(event, callback) {
        const matches = [];
        listeners.forEach((token, key) => {
          if (key.startsWith(refId) && (!callback || token.callback === callback)) matches.push([key, token]);
        });
        matches.forEach(([key, token]) => {
          token.cancelled = true;
          if (token.realRef) token.realRef.off(event, callback || token.callback);
          listeners.delete(key);
        });
        ensureFirebase().then(({ db }) => {
          if (!matches.length) db.ref(normalizedPath).off(event, callback);
        }).catch(() => {});
      },
      onDisconnect() {
        return {
          async remove() {
            const { db } = await ensureFirebase();
            return db.ref(normalizedPath).onDisconnect().remove();
          }
        };
      },
      push() {
        const key = makeKey();
        const childPath = normalizedPath ? `${normalizedPath}/${key}` : key;
        return makeRef(childPath, key);
      }
    };
  };

  const db = { ref: (path = "") => makeRef(path) };

  // نفس صيغة ServerValue التي يفهمها Realtime Database، بدون تحميل SDK مسبقًا.
  const firebaseCompat = {
    database: {
      ServerValue: {
        TIMESTAMP: { ".sv": "timestamp" },
        increment: (delta) => ({ ".sv": { increment: delta } })
      }
    }
  };

  window.ZAMN_FIREBASE = { ensureFirebase, db, firebaseCompat };
})();

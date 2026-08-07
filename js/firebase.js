

const firebaseConfig = {
  apiKey: "AIzaSyCzvg6chpSyNPGm_rS8F83Ig8WLhD3pxr8",
  authDomain: "zamn-games.firebaseapp.com",
  databaseURL: "https://zamn-games-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "zamn-games",
  storageBucket: "zamn-games.firebasestorage.app",
  messagingSenderId: "171536871956",
  appId: "1:171536871956:web:4a1a8c1986bf4ecd63ed01"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// معرّف ثابت للمتصفح لمعرفة الزائر بدون تخزين معلومات حساسة
const getVisitorId = () => {
  let visitorId = localStorage.getItem("zamnVisitorId");

  if (!visitorId) {
    visitorId =
      "visitor_" +
      Date.now() +
      "_" +
      Math.random().toString(36).slice(2, 12);

    localStorage.setItem("zamnVisitorId", visitorId);
  }

  return visitorId;
};

// معرّف مختلف لكل تبويب/جلسة مفتوحة
const getSessionId = () => {
  let sessionId = sessionStorage.getItem("zamnSessionId");

  if (!sessionId) {
    sessionId =
      "session_" +
      Date.now() +
      "_" +
      Math.random().toString(36).slice(2, 12);

    sessionStorage.setItem("zamnSessionId", sessionId);
  }

  return sessionId;
};

const visitorId = getVisitorId();
const sessionId = getSessionId();
const presenceRef = db.ref("analytics/online/" + sessionId);

// تسجيل زيارة واحدة في كل جلسة متصفح
const registerSiteVisit = async () => {
  if (sessionStorage.getItem("zamnVisitRegistered")) return;

  const updates = {};

  updates["analytics/totalVisits"] =
    firebase.database.ServerValue.increment(1);

  updates["analytics/visitors/" + visitorId + "/lastVisit"] =
    firebase.database.ServerValue.TIMESTAMP;

  updates["analytics/visitors/" + visitorId + "/visits"] =
    firebase.database.ServerValue.increment(1);

  await db.ref().update(updates);

  sessionStorage.setItem("zamnVisitRegistered", "yes");
};

// تسجيل المستخدم ضمن المتصلين الآن
const startPresenceTracking = () => {
  const connectedRef = db.ref(".info/connected");

  connectedRef.on("value", async snapshot => {
    if (snapshot.val() !== true) return;

    // يُحذف المستخدم تلقائياً عند انقطاع الإنترنت أو إغلاق الصفحة
    await presenceRef.onDisconnect().remove();

    await presenceRef.set({
      visitorId,
      phone: localStorage.getItem("playerPhone") || null,
      playerName: null,
      currentGameId: null,
      currentGameName: null,
      connectedAt: firebase.database.ServerValue.TIMESTAMP,
      lastActivity: firebase.database.ServerValue.TIMESTAMP
    });
  });
};

const updateOnlinePlayer = async ({
  phone = null,
  playerName = null,
  currentGameId = null,
  currentGameName = null
} = {}) => {
  try {
    await presenceRef.update({
      phone: phone || null,
      playerName: playerName || null,
      currentGameId: currentGameId || null,
      currentGameName: currentGameName || null,
      lastActivity: firebase.database.ServerValue.TIMESTAMP
    });
  } catch (error) {
    console.error("Presence update error:", error);
  }
};

const registerGameEntry = async (game, phone, playerName, entryType) => {
  if (!game) return;

  const logRef = db.ref("analytics/gameEntryLogs").push();

  const updates = {};

  updates[`analytics/gameEntries/${game.id}/name`] = game.name;

  updates[`analytics/gameEntries/${game.id}/count`] =
    firebase.database.ServerValue.increment(1);

  updates[`analytics/gameEntries/${game.id}/lastEntryAt`] =
    firebase.database.ServerValue.TIMESTAMP;

  updates[`analytics/gameEntries/${game.id}/players/${sessionId}`] = {
    phone: phone || null,
    playerName: playerName || null,
    entryType: entryType || "owned",
    enteredAt: firebase.database.ServerValue.TIMESTAMP
  };

  updates[`analytics/gameEntryLogs/${logRef.key}`] = {
    gameId: game.id,
    gameName: game.name,
    phone: phone || null,
    playerName: playerName || null,
    visitorId,
    sessionId,
    entryType: entryType || "owned",
    enteredAt: firebase.database.ServerValue.TIMESTAMP
  };

  await db.ref().update(updates);

  await updateOnlinePlayer({
    phone,
    playerName,
    currentGameId: game.id,
    currentGameName: game.name
  });
};

const startBackgroundAnalytics = () => {
  registerSiteVisit().catch(console.error);
  startPresenceTracking();
};

if ("requestIdleCallback" in window) {
  window.requestIdleCallback(startBackgroundAnalytics, { timeout: 3000 });
} else {
  window.setTimeout(startBackgroundAnalytics, 1500);
}

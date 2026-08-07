document.getElementById("browseBtn")?.addEventListener("click",()=>document.getElementById("games-list")?.scrollIntoView({behavior:"smooth"}));
document.querySelectorAll(".faq-question").forEach(btn=>btn.addEventListener("click",()=>{const item=btn.closest(".faq-item");const ans=item.querySelector(".faq-answer");const icon=item.querySelector(".faq-icon");const open=ans.classList.contains("open");document.querySelectorAll(".faq-answer.open").forEach(x=>x.classList.remove("open"));document.querySelectorAll(".faq-icon.open").forEach(x=>x.classList.remove("open"));if(!open){ans.classList.add("open");icon.classList.add("open")}}));

// V6: واجهة اللعبة
const gameView = document.getElementById("gameView");
const homeMain = document.getElementById("homeMain");
const detailTitle = document.getElementById("detailTitle");
const detailBreadcrumb = document.getElementById("detailBreadcrumb");
const detailDesc = document.getElementById("detailDesc");
const detailIcon = document.getElementById("detailIcon");

function openGameView(card, push = true){
  if(!card || !gameView) return;
  const id = card.dataset.gameId || "1";
  const title = card.dataset.gameTitle || card.querySelector(".game-title")?.textContent?.trim() || "اللعبة";
  const icon = card.dataset.gameIcon || card.querySelector(".empty-image")?.textContent?.trim() || "🎮";
  const desc = card.querySelector(".game-desc")?.textContent?.trim() || "واجهة اللعبة جاهزة.";
  detailTitle.textContent = title;
  detailBreadcrumb.textContent = title;
  detailIcon.textContent = icon;
  detailDesc.textContent = desc.replace("مكان", "واجهة").replace("بطاقة", "واجهة");
  document.body.classList.add("game-mode");
  gameView.hidden = false;
  window.scrollTo({top:0,behavior:"auto"});
  if(push) history.pushState({game:id}, "", `/game/game-${id}`);
}

function closeGameView(push = true){
  document.body.classList.remove("game-mode");
  if(gameView) gameView.hidden = true;
  window.scrollTo({top:0,behavior:"auto"});
  if(push) history.pushState({}, "", "/");
}

document.querySelectorAll(".game-card.empty-card").forEach(card=>{
  card.addEventListener("click",()=>openGameView(card));
  card.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();openGameView(card)}});
});

document.getElementById("gameBackBtn")?.addEventListener("click",()=>closeGameView());
document.querySelectorAll("[data-scroll-target]").forEach(btn=>btn.addEventListener("click",()=>document.getElementById(btn.dataset.scrollTarget)?.scrollIntoView({behavior:"smooth"})));

window.addEventListener("popstate",()=>{
  const m = location.pathname.match(/^\/game\/game-(\d+)\/?$/);
  if(m){
    const card = document.querySelector(`.game-card[data-game-id="${m[1]}"]`);
    if(card) openGameView(card,false);
  } else {
    closeGameView(false);
  }
});

const initialGame = location.pathname.match(/^\/game\/game-(\d+)\/?$/);
if(initialGame){
  const card = document.querySelector(`.game-card[data-game-id="${initialGame[1]}"]`);
  if(card) openGameView(card,false);
}

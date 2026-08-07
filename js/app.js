
const GAMES = window.ZAMN_GAMES || [];
const bySlug = slug => GAMES.find(g => g.slug === slug);
const homeTitle = document.title;
const pageDescription = document.getElementById("pageDescription");
const canonicalLink = document.getElementById("canonicalLink");
const gameView = document.getElementById("gameView");

document.getElementById("browseBtn")?.addEventListener("click",()=>document.getElementById("games-list")?.scrollIntoView({behavior:"smooth"}));
document.querySelectorAll(".faq-question").forEach(btn=>btn.addEventListener("click",()=>{
  const item=btn.closest(".faq-item"), ans=item.querySelector(".faq-answer"), icon=item.querySelector(".faq-icon");
  const open=ans.classList.contains("open");
  document.querySelectorAll(".faq-answer.open").forEach(x=>x.classList.remove("open"));
  document.querySelectorAll(".faq-icon.open").forEach(x=>x.classList.remove("open"));
  if(!open){ans.classList.add("open");icon.classList.add("open")}
}));

function setText(id, value){
  const el=document.getElementById(id);
  if(el) el.textContent=value || "";
}
function setSEO(game){
  document.title = game.seoTitle || `${game.name} | ألعاب زامن`;
  if(pageDescription) pageDescription.setAttribute("content", game.seoDescription || game.description || "");
  if(canonicalLink) canonicalLink.setAttribute("href", `https://zamn-games.vercel.app/game/${game.slug}`);
}
function resetSEO(){
  document.title=homeTitle;
  if(pageDescription) pageDescription.setAttribute("content","ألعاب زامن - ألعاب جماعية عربية");
  if(canonicalLink) canonicalLink.setAttribute("href","https://zamn-games.vercel.app/");
}
function renderShots(game){
  const grid=document.getElementById("retroShotsGrid");
  const section=grid?.closest(".screenshots-panel");
  if(!grid)return;
  grid.innerHTML="";
  const shots=(game.screenshots||[]).filter(Boolean);
  if(!shots.length){
    if(section) section.hidden=true;
    return;
  }
  if(section) section.hidden=false;
  shots.forEach((src,index)=>{
    const btn=document.createElement("button");
    btn.className="retro-shot";
    btn.type="button";
    btn.innerHTML=`<img src="${src}" alt="صورة ${index+1} من داخل ${game.name}" loading="lazy" decoding="async">`;
    btn.addEventListener("click",()=>openLightbox(src, game.name));
    grid.appendChild(btn);
  });
}
function renderReviews(game){
  const grid=document.getElementById("retroReviewsGrid");
  const section=grid?.closest(".reviews-panel");
  if(!grid)return;
  grid.innerHTML="";
  const reviews=(game.reviews||[]).filter(r=>r && r.name);
  if(!reviews.length){
    if(section) section.hidden=true;
    return;
  }
  if(section) section.hidden=false;
  reviews.forEach(r=>{
    const article=document.createElement("article");
    const safeComment=(r.comment||"").trim();
    article.innerHTML=`<div class="review-head"><strong></strong><span></span></div>${safeComment?`<p></p>`:""}`;
    article.querySelector("strong").textContent=r.name;
    article.querySelector("span").textContent=r.stars||"⭐⭐⭐⭐⭐";
    if(safeComment) article.querySelector("p").textContent=safeComment;
    grid.appendChild(article);
  });
}
function renderOtherGames(game){
  const grid=document.getElementById("otherGamesGrid");
  if(!grid)return;
  grid.innerHTML="";
  GAMES.filter(g=>g.slug!==game.slug).forEach(g=>{
    const a=document.createElement("a");
    a.className="other-game-card";
    a.href=`/game/${g.slug}`;
    a.dataset.slug=g.slug;
    a.innerHTML=`<div class="other-game-image"><img src="${g.image}" alt="${g.name}" loading="lazy" decoding="async"></div><h3></h3>`;
    a.querySelector("h3").textContent=g.name;
    grid.appendChild(a);
  });
}
function openGame(game,push=true){
  window.ZAMN_CURRENT_GAME = game;
  if(!game||!gameView)return;
  setText("detailTitle",game.name);
  setText("detailDesc",game.description);
  setText("detailPlayers",game.players || "٢+ لاعبين");
  setText("detailCategory",game.category || game.badge || "لعبة جماعية");
  setText("detailStatus",game.status || "متاحة الآن");
  const play=document.getElementById("gamePlayBtn");
  const buy=document.getElementById("gameBuyBtn");
  const trial=document.getElementById("gameTrialBtn");
  if(play){play.href="#"; play.removeAttribute("target"); play.textContent="▶ العب الآن"}
  if(buy){buy.href=game.buyLink||"#"; buy.target="_blank"; buy.rel="noopener"; buy.textContent=`💳 اشتر الآن - ${game.price||""}`}
  if(trial){trial.dataset.trialKey=game.trialKey||""}
  renderShots(game);
  renderReviews(game);
  renderOtherGames(game);

  const horofBellFaq = document.getElementById("horofBellFaq");
  const isHorofBell = game.slug === "horof-bell";
  if(horofBellFaq) horofBellFaq.hidden = !isHorofBell;
  document.body.classList.toggle("horof-bell-mode", isHorofBell);

  setSEO(game);
  document.body.classList.add("game-mode");
  gameView.hidden=false;
  window.scrollTo({top:0,behavior:"auto"});
  if(push) history.pushState({view:"game",slug:game.slug},"",`/game/${game.slug}`);
}
function closeGame(push=true){
  window.ZAMN_CURRENT_GAME = null;
  document.body.classList.remove("game-mode","horof-bell-mode");
  const horofBellFaq = document.getElementById("horofBellFaq");
  if(horofBellFaq) horofBellFaq.hidden = true;
  if(gameView) gameView.hidden=true;
  resetSEO();
  window.scrollTo({top:0,behavior:"auto"});
  if(push) history.pushState({view:"home"},"","/");
}
document.addEventListener("click",e=>{
  const link=e.target.closest('a[href^="/game/"]');
  if(!link)return;
  const slug=link.getAttribute("href").replace(/^\/game\//,"").replace(/\/$/,"");
  const game=bySlug(slug);
  if(!game)return;
  e.preventDefault();
  openGame(game,true);
});
document.getElementById("gameBackBtn")?.addEventListener("click",()=>closeGame(true));

window.addEventListener("popstate",(event)=>{
  const m=location.pathname.match(/^\/game\/([^/]+)\/?$/);
  if(m){
    const g=bySlug(decodeURIComponent(m[1]));
    if(g) openGame(g,false); else closeGame(false);
    return;
  }
  if(event.state && event.state.view==="game" && event.state.slug){
    const g=bySlug(event.state.slug);
    if(g){ openGame(g,false); return; }
  }
  closeGame(false);
});
const initial=location.pathname.match(/^\/game\/([^/]+)\/?$/);
if(initial){ const g=bySlug(decodeURIComponent(initial[1])); if(g) openGame(g,false); }

let lightbox;
function openLightbox(src,alt){
  if(!lightbox){
    lightbox=document.createElement("div");
    lightbox.className="zamn-lightbox";
    lightbox.innerHTML='<img alt="">';
    lightbox.addEventListener("click",()=>lightbox.classList.remove("open"));
    document.body.appendChild(lightbox);
  }
  const img=lightbox.querySelector("img");
  img.src=src; img.alt=alt||"صورة اللعبة";
  lightbox.classList.add("open");
}

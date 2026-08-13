(() => {
const $ = (id)=>document.getElementById(id);
const qs = new URLSearchParams(location.search);
const channel = new BroadcastChannel("tv-kharban");
const KEY="tv_kharban_state_v2";

const defaultState = ()=>({
  room:null, players:[], started:false, turn:0,
  entries:[], currentPrompt:null
});
const load=()=>{try{return JSON.parse(localStorage.getItem(KEY))||defaultState()}catch{return defaultState()}};
const save=(s)=>{localStorage.setItem(KEY,JSON.stringify(s));channel.postMessage("sync")};
const randCode=()=>Math.random().toString(36).slice(2,7).toUpperCase();
const go=(p)=>location.href=p;

if($("createRoom")){
  $("createRoom").onclick=()=>{
    const s=defaultState(); s.room=randCode(); save(s); go("/room.html?room="+s.room+"&host=1");
  };
  $("joinRoom").onclick=()=>{
    const code=prompt("اكتب كود الغرفة:");
    if(code) go("/room.html?room="+code.trim().toUpperCase());
  };
}

if($("roomCode")){
  const room=qs.get("room")||"-----"; $("roomCode").textContent="الكود: "+room;
  const joinBox=$("joinBox"), lobby=$("lobby");
  const render=()=>{
    const s=load();
    $("players").innerHTML=s.players.map(p=>`<div class="player">👤 ${p.name}</div>`).join("");
  };
  $("enterRoom").onclick=()=>{
    const name=$("playerName").value.trim();
    if(!name)return alert("اكتب اسمك");
    let s=load();
    if(!s.room || s.room!==room){s=defaultState(); s.room=room}
    if(!s.players.some(p=>p.name===name)) s.players.push({id:crypto.randomUUID(),name});
    save(s); sessionStorage.setItem("tv_player",name); joinBox.classList.add("hidden"); lobby.classList.remove("hidden"); render();
  };
  $("addBot").onclick=()=>{
    const names=["سعود","نورة","تركي","ريم","فيصل","جود","خالد","سارة"];
    let s=load(); const n=names.find(x=>!s.players.some(p=>p.name===x))||("لاعب "+(s.players.length+1));
    s.players.push({id:crypto.randomUUID(),name:n}); save(s); render();
  };
  $("startGame").onclick=()=>{
    let s=load();
    if(s.players.length<3)return alert("أقل شيء 3 لاعبين. أضف لاعبين تجريبيين.");
    s.started=true;s.turn=0;s.entries=[];s.currentPrompt=null;save(s);go("/game.html?room="+room);
  };
  channel.onmessage=render; render();
}

if($("stepLabel")){
  let s=load();
  if(!s.started) return go("/");
  const players=s.players;
  if(!players.length)return go("/");
  let activePlayer=players[s.turn % players.length];
  let stage = s.turn===0 ? "text" : (s.turn % 2 ? "draw":"text");
  $("turnLabel").textContent="دور: "+activePlayer.name;
  $("stepLabel").textContent=stage==="text" ? (s.turn===0?"اكتب جملة":"خمّن الرسم") : "ارسم";

  const last=s.entries[s.entries.length-1];
  if(last){
    const box=document.createElement("div"); box.className="entry";
    box.innerHTML=last.type==="text"
      ? `<div class="who">المحتوى السابق</div><div>${escapeHtml(last.content)}</div>`
      : `<div class="who">الرسم السابق</div><img src="${last.content}" alt="رسم">`;
    $("promptArea").appendChild(box);
  }

  if(stage==="text"){
    $("textStage").classList.remove("hidden");
    $("textTitle").textContent=s.turn===0?"اكتب جملة غريبة":"وش تتوقع الرسم يعني؟";
    $("submitText").onclick=()=>{
      const v=$("textInput").value.trim(); if(!v)return alert("اكتب شيء أول");
      s.entries.push({who:activePlayer.name,type:"text",content:v});
      next();
    };
  } else {
    $("drawStage").classList.remove("hidden");
    initCanvas();
    $("submitDrawing").onclick=()=>{
      const c=$("board"); s.entries.push({who:activePlayer.name,type:"drawing",content:c.toDataURL("image/png")});
      next();
    };
  }

  function next(){
    s.turn++;
    const maxTurns=Math.max(5, players.length);
    save(s);
    if(s.turn>=maxTurns) go("/results.html");
    else location.reload();
  }

  function initCanvas(){
    const c=$("board"), ctx=c.getContext("2d"); ctx.lineCap="round";ctx.lineJoin="round";ctx.strokeStyle="#111";
    let drawing=false, hist=[];
    const pos=(e)=>{
      const r=c.getBoundingClientRect(), t=e.touches?e.touches[0]:e;
      return {x:(t.clientX-r.left)*c.width/r.width,y:(t.clientY-r.top)*c.height/r.height}
    };
    const snap=()=>hist.push(c.toDataURL());
    const start=(e)=>{e.preventDefault();drawing=true;snap();const p=pos(e);ctx.beginPath();ctx.moveTo(p.x,p.y)};
    const move=(e)=>{if(!drawing)return;e.preventDefault();const p=pos(e);ctx.lineWidth=+$("brushSize").value;ctx.lineTo(p.x,p.y);ctx.stroke()};
    const end=()=>drawing=false;
    c.addEventListener("pointerdown",start);c.addEventListener("pointermove",move);window.addEventListener("pointerup",end);
    $("clearBtn").onclick=()=>{snap();ctx.clearRect(0,0,c.width,c.height)};
    $("undoBtn").onclick=()=>{const d=hist.pop();if(!d)return;const im=new Image();im.onload=()=>{ctx.clearRect(0,0,c.width,c.height);ctx.drawImage(im,0,0)};im.src=d};
  }
}

if($("results")){
  const s=load();
  $("results").innerHTML=s.entries.map((e,i)=>`
    <div class="entry">
      <div class="who">${i+1}. ${escapeHtml(e.who)} — ${e.type==="text"?"نص":"رسم"}</div>
      ${e.type==="text"?`<div>${escapeHtml(e.content)}</div>`:`<img src="${e.content}" alt="رسم">`}
    </div>`).join("");
  $("again").onclick=()=>{s.started=true;s.turn=0;s.entries=[];save(s);go("/game.html?room="+(s.room||""))};
}

function escapeHtml(str){return String(str).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))}
})();
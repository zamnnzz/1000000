(()=> {
const $=id=>document.getElementById(id);
const STORE="tvk_v3";
const COLORS=["a0","a1","a2","a3","a4"];
const get=()=>{try{return JSON.parse(localStorage.getItem(STORE))||{players:[],chains:[],turn:0}}catch{return {players:[],chains:[],turn:0}}};
const set=s=>localStorage.setItem(STORE,JSON.stringify(s));
const esc=s=>String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));

if($("howBtn")){
  $("howBtn").onclick=()=>$("howModal").classList.remove("hidden");
  $("closeHow").onclick=()=>$("howModal").classList.add("hidden");
  $("howModal").onclick=e=>{if(e.target===$("howModal"))$("howModal").classList.add("hidden")}
}

if($("playerForm")){
 let s=get();
 const render=()=>{
   $("playersList").innerHTML=s.players.map((p,i)=>`<div class="player-row"><div class="avatar ${COLORS[i%COLORS.length]}">${esc(p.name[0])}</div><strong>${esc(p.name)}</strong><button class="remove" data-i="${i}" aria-label="حذف">×</button></div>`).join("");
   $("playerCount").textContent=s.players.length;
   $("startBtn").disabled=s.players.length<3;
   document.querySelectorAll(".remove").forEach(b=>b.onclick=()=>{s.players.splice(+b.dataset.i,1);set(s);render()});
 };
 $("playerForm").onsubmit=e=>{
   e.preventDefault(); const v=$("playerInput").value.trim();
   if(!v)return; if(s.players.length>=8)return alert("الحد الأعلى 8 لاعبين");
   if(s.players.some(p=>p.name===v))return alert("الاسم موجود");
   s.players.push({id:crypto.randomUUID(),name:v}); $("playerInput").value=""; set(s);render();$("playerInput").focus();
 };
 $("startBtn").onclick=()=>{
   if(s.players.length<3)return;
   s.turn=0;s.chains=[];s.phase="seed";
   // One chain per player. Each chain receives every player once, rotating ownership.
   s.players.forEach((p,i)=>s.chains.push({owner:i,entries:[]}));
   set(s);location.href="/play/";
 };
 render();
}

if($("handoff")){
 let s=get();
 if(!s.players||s.players.length<3){location.href="/room/";return}
 const n=s.players.length;
 const totalTurns=n*n;
 if(s.turn>=totalTurns){location.href="/results/";return}
 const round=Math.floor(s.turn/n);           // 0..n-1
 const slot=s.turn%n;                        // active player index this step
 const activePlayer=slot;
 // Chain rotates one position per round so every player touches every chain.
 const chainIndex=(slot-round+n)%n;
 const chain=s.chains[chainIndex];
 const isText=round%2===0;
 const isSeed=round===0;
 $("roundText").textContent=`مرحلة ${round+1} من ${n}`;
 $("progressBar").style.width=`${Math.max(8,(s.turn/totalTurns)*100)}%`;
 $("handoffAvatar").textContent=s.players[activePlayer].name[0];
 $("handoffName").textContent=s.players[activePlayer].name;
 $("handoff").classList.remove("hidden");

 $("readyBtn").onclick=()=>{$("handoff").classList.add("hidden");$("task").classList.remove("hidden");setupTask()};
 $("quitBtn").onclick=()=>{if(confirm("تبغى تنهي الجولة؟"))location.href="/room/"};

 function setupTask(){
   $("taskType").textContent=isSeed?"ابدأ السالفة":(isText?"خمّن":"ارسم");
   $("taskTitle").textContent=isSeed?"اكتب جملة من راسك":(isText?"وش فهمت من الرسم؟":"ارسم الجملة");
   const prev=chain.entries[chain.entries.length-1];
   if(prev){
     $("previousBox").classList.remove("hidden");
     $("previousBox").innerHTML=prev.type==="text"
       ? `<div class="label">هذا اللي وصلك</div><div class="prev-text">${esc(prev.content)}</div>`
       : `<div class="label">وش يعني هذا الرسم؟</div><img src="${prev.content}" alt="الرسم السابق">`;
   }
   if(isText){
     $("textTask").classList.remove("hidden");
     const ta=$("answerInput");
     ta.oninput=()=>{$("charCount").textContent=ta.value.length};
     ta.focus();
     $("submitBtn").onclick=()=>{
       const v=ta.value.trim();if(!v)return alert("اكتب شيء أول");
       chain.entries.push({player:activePlayer,type:"text",content:v});
       advance();
     }
   }else{
     $("drawTask").classList.remove("hidden");
     initCanvas();
     $("submitBtn").onclick=()=>{
       chain.entries.push({player:activePlayer,type:"drawing",content:$("drawCanvas").toDataURL("image/webp",.75)});
       advance();
     }
   }
 }
 function advance(){s.turn++;set(s);location.reload()}
 function initCanvas(){
   const c=$("drawCanvas"),ctx=c.getContext("2d"),hist=[];let drawing=false,color="#202033";
   ctx.lineCap="round";ctx.lineJoin="round";
   const pt=e=>{const r=c.getBoundingClientRect();return{x:(e.clientX-r.left)*c.width/r.width,y:(e.clientY-r.top)*c.height/r.height}};
   c.onpointerdown=e=>{e.preventDefault();hist.push(c.toDataURL());drawing=true;const p=pt(e);ctx.beginPath();ctx.moveTo(p.x,p.y)};
   c.onpointermove=e=>{if(!drawing)return;e.preventDefault();const p=pt(e);ctx.strokeStyle=color;ctx.lineWidth=+$("brushSize").value;ctx.lineTo(p.x,p.y);ctx.stroke()};
   window.addEventListener("pointerup",()=>drawing=false);
   document.querySelectorAll(".color").forEach(b=>b.onclick=()=>{document.querySelectorAll(".color").forEach(x=>x.classList.remove("active"));b.classList.add("active");color=b.dataset.color});
   $("clearBtn").onclick=()=>{hist.push(c.toDataURL());ctx.clearRect(0,0,c.width,c.height)};
   $("undoBtn").onclick=()=>{const d=hist.pop();if(!d)return;let im=new Image;im.onload=()=>{ctx.clearRect(0,0,c.width,c.height);ctx.drawImage(im,0,0)};im.src=d}
 }
}

if($("chains")){
 const s=get();
 if(!s.chains?.length){location.href="/room/";return}
 $("chains").innerHTML=s.chains.map((ch,ci)=>{
   const owner=s.players[ch.owner]?.name||"";
   const items=ch.entries.map((e,i)=>{
     const p=s.players[e.player]?.name||"لاعب";
     return `<div class="story-item"><div class="story-dot">${e.type==="text"?"✍️":"🎨"}</div><div class="story-content"><div class="meta">${i===0?"بدأها":"وصلت إلى"} ${esc(p)}</div>${e.type==="text"?`<p>${esc(e.content)}</p>`:`<img src="${e.content}" alt="رسم">`}</div></div>`
   }).join("");
   return `<section class="chain"><div class="chain-head"><h2>سالفة ${esc(owner)}</h2><span>${ch.entries.length} انتقالات</span></div><div class="story">${items}</div></section>`
 }).join("");
 $("againBtn").onclick=()=>{s.turn=0;s.chains=s.players.map((_,i)=>({owner:i,entries:[]}));set(s);location.href="/play/"}
}
})();
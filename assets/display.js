import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { getDatabase, ref, set, update, onValue } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-database.js";
import { firebaseConfig } from "./firebase-config.js";
const app=initializeApp(firebaseConfig),db=getDatabase(app),$=id=>document.getElementById(id);

const cats=[
["ثقافة عامة","🧠"],["السعودية","💚"],["تاريخ","📜"],["سيارات","🚗"],["حيوانات","🐶"],["كرة قدم","⚽"],
["كأس العالم","🏆"],["جغرافيا","🌍"],["أديان وإسلاميات","☪️"],["أفلام ومسلسلات","🎬"],["أكل وطبخ","🍕"],
["تقنية","💻"],["ألعاب فيديو","🎮"],["مدرسة","🏫"],["أنمي","🍥"],["رياضة","🏃"],["موسيقى","🎵"],
["طب وصحة","🩺"],["ENGLISH","🔤"],["مشاهير","🎤"]
];
let s={team1:"",team2:"",roundCount:4,picks:[],pickTurn:1};
let sessionId=null,gameRef=null,lastReveal=null,lastWrong=null;
const screens=["setupScreen","categoryScreen","pairScreen","gameScreen","finishScreen"];
function show(id){screens.forEach(x=>$(x).classList.remove("active"));$(id).classList.add("active")}
document.querySelectorAll("#roundBtns button").forEach(b=>b.onclick=()=>{document.querySelectorAll("#roundBtns button").forEach(x=>x.classList.remove("active"));b.classList.add("active");s.roundCount=+b.dataset.n});
$("toCategories").onclick=()=>{s.team1=$("team1").value.trim();s.team2=$("team2").value.trim();if(!s.team1||!s.team2)return alert("اكتب اسم الفريقين");s.picks=[];s.pickTurn=1;$("p1Title").textContent=s.team1;$("p2Title").textContent=s.team2;renderDraft();show("categoryScreen")};
function renderDraft(){
 const who=s.pickTurn===1?s.team1:s.team2;
 $("pickTitle").textContent=s.picks.length>=s.roundCount?"المواضيع جاهزة!":`الدور على ${who}`;
 $("pickHint").textContent=s.picks.length>=s.roundCount?"كل شيء جاهز، الآن اربط جهاز الهوست.":`اختر فئة للجولة ${s.picks.length+1} من ${s.roundCount}`;
 $("pickProgress").style.width=`${s.picks.length/s.roundCount*100}%`;
 const used=s.picks.map(p=>p.category);
 $("categories").innerHTML=cats.map(([n,i])=>`<button class="category ${used.includes(n)?"used":""}" data-cat="${n}"><i>${i}</i><b>${n}</b></button>`).join("");
 document.querySelectorAll(".category:not(.used)").forEach(b=>b.onclick=()=>{if(s.picks.length>=s.roundCount)return;s.picks.push({category:b.dataset.cat,owner:s.pickTurn});if(s.picks.length<s.roundCount)s.pickTurn=s.pickTurn===1?2:1;renderDraft()});
 $("p1Picks").innerHTML=chips(s.picks.filter(p=>p.owner===1));$("p2Picks").innerHTML=chips(s.picks.filter(p=>p.owner===2));
 $("finishSetup").classList.toggle("hidden",s.picks.length<s.roundCount);
}
function chips(a){return a.length?a.map(p=>`<span>${p.category}</span>`).join(""):"<span>—</span>"}
function makeCode(){return Math.random().toString(36).slice(2,8).toUpperCase()}
$("finishSetup").onclick=async()=>{
 sessionId=makeCode();
 gameRef=ref(db,`top10/sessions/${sessionId}`);
 await set(gameRef,{...s,status:"pairing",hostConnected:false,currentRoundIndex:0,score1:0,score2:0,createdAt:Date.now()});
 const hostUrl=`${location.origin}/host/#session=${sessionId}`;
 $("sessionCode").textContent=sessionId;$("hostLink").textContent=hostUrl;
 $("qr").innerHTML="";
 new QRCode($("qr"),{text:hostUrl,width:260,height:260,colorDark:"#111111",colorLight:"#ffffff",correctLevel:QRCode.CorrectLevel.M});
 $("copyHostLink").onclick=async()=>{await navigator.clipboard.writeText(hostUrl);$("copyHostLink").textContent="✓ تم نسخ الرابط";setTimeout(()=>$("copyHostLink").textContent="📋 نسخ رابط الهوست",1500)};
 show("pairScreen");listen();
};
function listen(){
 onValue(gameRef,snap=>{
  const g=snap.val();if(!g)return;
  if(g.hostConnected&&g.status==="pairing"){$("pairStatus").textContent="✓ تم ربط الهوست — جاهز للبدء";$("pairStatus").classList.add("connected")}
  if(g.status==="game"){show("gameScreen");renderGame(g)}
  if(g.status==="finished"){show("finishScreen");$("winnerText").textContent=g.winner==="تعادل"?"تعادل!":`${g.winner} يفوز!`;$("finalScore").textContent=`${g.team1}: ${g.score1} — ${g.team2}: ${g.score2}`}
 });
}
function renderGame(g){
 $("name1").textContent=g.team1;$("name2").textContent=g.team2;$("score1").textContent=g.score1||0;$("score2").textContent=g.score2||0;
 $("roundCountText").textContent=`الجولة ${g.currentRoundIndex+1} من ${g.roundCount}`;$("categoryName").textContent=g.currentCategory;
 $("ownerLabel").textContent=`اختيار ${g.currentOwner===1?g.team1:g.team2}`;$("questionText").textContent=g.currentQuestion;
 $("turnName").textContent=g.answerTurn===1?g.team1:g.team2;$("scoreCard1").classList.toggle("active",g.answerTurn===1);$("scoreCard2").classList.toggle("active",g.answerTurn===2);
 $("answerBoard").innerHTML=(g.currentAnswers||[]).map((a,i)=>`<div class="answer ${a.revealed?"revealed":""}"><span class="n">${i+1}</span><span class="lock">${a.revealed?a.text:""}</span><span class="pts">${a.revealed?a.points:"?"}</span></div>`).join("");
 if(g.revealEvent?.id&&g.revealEvent.id!==lastReveal){lastReveal=g.revealEvent.id;$("revealAnswerText").textContent=g.revealEvent.text;$("revealAnswerPoints").textContent=`+${g.revealEvent.points} نقاط`;$("revealFx").classList.remove("hidden");setTimeout(()=>$("revealFx").classList.add("hidden"),1700)}
 if(g.wrongEvent?.id&&g.wrongEvent.id!==lastWrong){lastWrong=g.wrongEvent.id;$("wrongFx").classList.remove("hidden");setTimeout(()=>$("wrongFx").classList.add("hidden"),1200)}
}

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { getDatabase, ref, set, update, onValue } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-database.js";
import { firebaseConfig, GAME_PATH } from "./firebase-config.js";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const gameRef = ref(db, GAME_PATH);
const $ = id => document.getElementById(id);

const categories=[
["ثقافة عامة","🧠"],["السعودية","💚"],["تاريخ","📜"],["سيارات","🚗"],["حيوانات","🐶"],
["كرة قدم","⚽"],["كأس العالم","🏆"],["جغرافيا","🌍"],["أديان وإسلاميات","☪️"],["أفلام ومسلسلات","🎬"],
["أكل وطبخ","🍕"],["تقنية","💻"],["ألعاب فيديو","🎮"],["مدرسة","🏫"],["أنمي","🍥"],
["رياضة","🏃"],["موسيقى","🎵"],["طب وصحة","🩺"],["ENGLISH","🔤"],["مشاهير","🎤"]
];

const bank={
"سيارات":{question:"اذكر أشهر ماركات السيارات اليابانية",answers:[
["تويوتا",10],["نيسان",9],["هوندا",8],["مازدا",7],["سوبارو",6],["ميتسوبيشي",5],["سوزوكي",4],["لكزس",3],["إنفينيتي",2],["أكيورا",1]]},
"كرة قدم":{question:"اذكر أندية كرة قدم أوروبية مشهورة",answers:[
["ريال مدريد",10],["برشلونة",9],["مانشستر يونايتد",8],["ليفربول",7],["بايرن ميونخ",6],["مانشستر سيتي",5],["ميلان",4],["إنتر ميلان",3],["أرسنال",2],["باريس سان جيرمان",1]]},
"جغرافيا":{question:"اذكر دولاً عربية معروفة",answers:[
["السعودية",10],["مصر",9],["الإمارات",8],["المغرب",7],["العراق",6],["الأردن",5],["الكويت",4],["قطر",3],["عُمان",2],["البحرين",1]]},
"ثقافة عامة":{question:"اذكر أشياء نستخدمها يومياً",answers:[
["الجوال",10],["الماء",9],["السيارة",8],["الإنترنت",7],["الكهرباء",6],["المفتاح",5],["الساعة",4],["القلم",3],["الكرسي",2],["الكوب",1]]},
"السعودية":{question:"اذكر مدناً سعودية مشهورة",answers:[
["الرياض",10],["جدة",9],["مكة",8],["المدينة",7],["الدمام",6],["الطائف",5],["أبها",4],["تبوك",3],["الخبر",2],["حائل",1]]},
"أكل وطبخ":{question:"اذكر أكلات شعبية عربية مشهورة",answers:[
["كبسة",10],["مندي",9],["شاورما",8],["فلافل",7],["كشري",6],["مسخن",5],["مقلوبة",4],["كبة",3],["فتة",2],["محشي",1]]}
};

let local={
  team1:"",team2:"",roundCount:4,picks:[],pickTurn:1,currentRoundIndex:0,
  score1:0,score2:0,answerTurn:1,revealed:[],phase:"setup"
};

document.querySelectorAll("#roundBtns button").forEach(b=>b.onclick=()=>{
  document.querySelectorAll("#roundBtns button").forEach(x=>x.classList.remove("active"));
  b.classList.add("active");local.roundCount=+b.dataset.n;
});

$("toDraft").onclick=async()=>{
  const a=$("team1").value.trim(),b=$("team2").value.trim();
  if(!a||!b)return alert("اكتب اسم الفريقين");
  local.team1=a;local.team2=b;local.picks=[];local.pickTurn=1;local.phase="draft";
  await set(gameRef,{...local,status:"draft",updatedAt:Date.now()});
  $("setupStep").classList.add("hidden");$("draftStep").classList.remove("hidden");
  renderDraft();
};

function renderDraft(){
  const who=local.pickTurn===1?local.team1:local.team2;
  $("draftTurnTitle").textContent=`الدور على ${who}`;
  $("draftHint").textContent=`اختر فئة للجولة ${local.picks.length+1} من ${local.roundCount}`;
  $("draftMeter").style.width=`${local.picks.length/local.roundCount*100}%`;
  $("p1name").textContent=local.team1;$("p2name").textContent=local.team2;
  const used=local.picks.map(p=>p.category);
  $("hostCategories").innerHTML=categories.map(([name,icon])=>`<button class="host-category ${used.includes(name)?"used":""}" data-cat="${name}"><i>${icon}</i><b>${name}</b></button>`).join("");
  document.querySelectorAll(".host-category:not(.used)").forEach(btn=>btn.onclick=()=>pickCategory(btn.dataset.cat));
  $("p1picks").innerHTML=chips(local.picks.filter(p=>p.owner===1));
  $("p2picks").innerHTML=chips(local.picks.filter(p=>p.owner===2));
  if(local.picks.length>=local.roundCount){
    $("draftTurnTitle").textContent="المواضيع جاهزة!";
    $("draftHint").textContent="ابدأ اللعب عندما تكونون جاهزين.";
    $("startGame").classList.remove("hidden");
  }
}
function chips(items){return items.length?items.map(p=>`<span class="pick-chip">${p.category}</span>`).join(""):`<span class="muted">—</span>`}
async function pickCategory(cat){
  if(local.picks.length>=local.roundCount)return;
  local.picks.push({category:cat,owner:local.pickTurn});
  if(local.picks.length<local.roundCount)local.pickTurn=local.pickTurn===1?2:1;
  await update(gameRef,{picks:local.picks,pickTurn:local.pickTurn,updatedAt:Date.now()});
  renderDraft();
}

$("startGame").onclick=async()=>{
  local.currentRoundIndex=0;local.score1=0;local.score2=0;local.phase="game";
  await startRound();
  $("draftStep").classList.add("hidden");$("controlStep").classList.remove("hidden");
};

function getRound(cat){
  if(bank[cat])return structuredClone(bank[cat]);
  return {question:`اذكر 10 أشياء مرتبطة بفئة ${cat}`,answers:Array.from({length:10},(_,i)=>[`إجابة ${i+1}`,10-i])};
}
async function startRound(){
  const pick=local.picks[local.currentRoundIndex];
  const rd=getRound(pick.category);
  local.answerTurn=pick.owner;local.revealed=[];
  await update(gameRef,{
    status:"game",phase:"game",currentRoundIndex:local.currentRoundIndex,
    currentCategory:pick.category,currentOwner:pick.owner,currentQuestion:rd.question,
    currentAnswers:rd.answers.map(([text,points],i)=>({text,points,revealed:false,index:i})),
    score1:local.score1,score2:local.score2,answerTurn:local.answerTurn,
    revealEvent:null,wrongEvent:null,updatedAt:Date.now()
  });
  renderControl({...local,currentCategory:pick.category,currentOwner:pick.owner,currentQuestion:rd.question,currentAnswers:rd.answers.map(([text,points],i)=>({text,points,revealed:false,index:i}))});
}

function renderControl(s){
  $("hostRoundCounter").textContent=`الجولة ${s.currentRoundIndex+1} من ${s.roundCount}`;
  $("hostCategory").textContent=s.currentCategory;$("hostQuestion").textContent=s.currentQuestion;
  $("hostTeam1").textContent=s.team1;$("hostTeam2").textContent=s.team2;
  $("hostScore1").textContent=s.score1||0;$("hostScore2").textContent=s.score2||0;
  $("hostTurn").textContent=s.answerTurn===1?s.team1:s.team2;
  const answers=s.currentAnswers||[];
  $("hostAnswers").innerHTML=answers.map((a,i)=>`<button class="host-answer ${a.revealed?"revealed":""}" data-i="${i}"><span class="n">${i+1}</span><b>${a.text}</b><span class="pts">${a.points}</span></button>`).join("");
  document.querySelectorAll(".host-answer:not(.revealed)").forEach(b=>b.onclick=()=>revealAnswer(+b.dataset.i));
  const all=answers.length&&answers.every(a=>a.revealed);
  $("nextRoundBtn").classList.toggle("hidden",!all);
}

async function revealAnswer(i){
  const snapState=window.latestState;if(!snapState)return;
  const answers=[...(snapState.currentAnswers||[])];
  if(!answers[i]||answers[i].revealed)return;
  answers[i]={...answers[i],revealed:true};
  const pts=answers[i].points;
  const newScore1=snapState.score1+(snapState.answerTurn===1?pts:0);
  const newScore2=snapState.score2+(snapState.answerTurn===2?pts:0);
  const newTurn=snapState.answerTurn===1?2:1;
  await update(gameRef,{
    currentAnswers:answers,score1:newScore1,score2:newScore2,answerTurn:newTurn,
    revealEvent:{id:Date.now(),text:answers[i].text,points:pts},wrongEvent:null,updatedAt:Date.now()
  });
}
$("wrongBtn").onclick=async()=>{
  const s=window.latestState;if(!s)return;
  await update(gameRef,{answerTurn:s.answerTurn===1?2:1,wrongEvent:{id:Date.now()},revealEvent:null,updatedAt:Date.now()});
};
$("nextRoundBtn").onclick=async()=>{
  const s=window.latestState;if(!s)return;
  local={...local,...s,score1:s.score1,score2:s.score2,currentRoundIndex:s.currentRoundIndex+1};
  if(local.currentRoundIndex>=local.roundCount){await finishGame();return}
  await startRound();
};
async function finishGame(){
  const winner=local.score1>local.score2?local.team1:local.score2>local.score1?local.team2:"تعادل";
  await update(gameRef,{status:"finished",phase:"finished",winner,score1:local.score1,score2:local.score2,updatedAt:Date.now()});
}
$("restartHost").onclick=async()=>{await set(gameRef,{status:"waiting",phase:"setup",updatedAt:Date.now()});location.reload()};

onValue(gameRef,snap=>{
  const s=snap.val();if(!s)return;
  window.latestState=s;local={...local,...s};
  if(s.status==="game"){
    $("setupStep").classList.add("hidden");$("draftStep").classList.add("hidden");$("controlStep").classList.remove("hidden");$("finishStep").classList.add("hidden");
    renderControl(s);
  }else if(s.status==="finished"){
    $("controlStep").classList.add("hidden");$("finishStep").classList.remove("hidden");
    $("hostWinner").textContent=s.winner==="تعادل"?"تعادل!":`${s.winner} فاز!`;
    $("hostFinalScore").textContent=`${s.team1}: ${s.score1} — ${s.team2}: ${s.score2}`;
  }
});

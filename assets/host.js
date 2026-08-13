import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { getDatabase, ref, onValue, update } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-database.js";
import { firebaseConfig } from "./firebase-config.js";
const app=initializeApp(firebaseConfig),db=getDatabase(app),$=id=>document.getElementById(id);
const session=new URLSearchParams(location.hash.slice(1)).get("session");
let gameRef=null,state=null;
function applyTheme(theme){
  const t=theme||"night";
  document.body.dataset.theme=t;
  const names={night:"ليلي بنفسجي",sunset:"بيج وبرتقالي",mint:"نعناعي سماوي"};
  if($("themeSyncBadge")) $("themeSyncBadge").innerHTML=`<i></i><span>${names[t]||"الثيم متزامن"}</span>`;
}
const bank={
"سيارات":{question:"اذكر أشهر ماركات السيارات اليابانية",hint:"فكروا بالشركات التي تنتشر سياراتها بكثرة في الخليج واليابان.",answers:[["تويوتا",10],["نيسان",9],["هوندا",8],["مازدا",7],["سوبارو",6],["ميتسوبيشي",5],["سوزوكي",4],["لكزس",3],["إنفينيتي",2],["أكيورا",1]]},
"كرة قدم":{question:"اذكر أندية كرة قدم أوروبية مشهورة",hint:"ركزوا على أندية إنجلترا وإسبانيا وإيطاليا وألمانيا وفرنسا.",answers:[["ريال مدريد",10],["برشلونة",9],["مانشستر يونايتد",8],["ليفربول",7],["بايرن ميونخ",6],["مانشستر سيتي",5],["ميلان",4],["إنتر ميلان",3],["أرسنال",2],["باريس سان جيرمان",1]]},
"جغرافيا":{question:"اذكر دولاً عربية معروفة",hint:"فكروا بدول الخليج وشمال أفريقيا وبلاد الشام.",answers:[["السعودية",10],["مصر",9],["الإمارات",8],["المغرب",7],["العراق",6],["الأردن",5],["الكويت",4],["قطر",3],["عُمان",2],["البحرين",1]]},
"ثقافة عامة":{question:"اذكر أشياء نستخدمها يومياً",hint:"أغلب الإجابات أشياء تراها في البيت أو تستخدمها كل يوم.",answers:[["الجوال",10],["الماء",9],["السيارة",8],["الإنترنت",7],["الكهرباء",6],["المفتاح",5],["الساعة",4],["القلم",3],["الكرسي",2],["الكوب",1]]},
"السعودية":{question:"اذكر مدناً سعودية مشهورة",hint:"ابدؤوا بأكبر المدن ثم مدن المناطق المعروفة سياحياً.",answers:[["الرياض",10],["جدة",9],["مكة",8],["المدينة",7],["الدمام",6],["الطائف",5],["أبها",4],["تبوك",3],["الخبر",2],["حائل",1]]},
"أكل وطبخ":{question:"اذكر أكلات شعبية عربية مشهورة",hint:"فكروا بأكلات الأرز واللحوم والمقبلات المنتشرة في الدول العربية.",answers:[["كبسة",10],["مندي",9],["شاورما",8],["فلافل",7],["كشري",6],["مسخن",5],["مقلوبة",4],["كبة",3],["فتة",2],["محشي",1]]}
};
function getRound(cat){return bank[cat]||{question:`اذكر 10 أشياء مرتبطة بفئة ${cat}`,hint:`فكروا بأشهر الأشياء المرتبطة بفئة ${cat}.`,answers:Array.from({length:10},(_,i)=>[`إجابة ${i+1}`,10-i])}}
if(!session){$("badSession").classList.remove("hidden")}else{
 gameRef=ref(db,`top10/sessions/${session}`);
 onValue(gameRef,async snap=>{
  const g=snap.val();
  if(!g){$("badSession").classList.remove("hidden");return}
  state=g;applyTheme(g.theme);$("connectionBadge").textContent=`متصل — ${session}`;$("connectionBadge").classList.add("ok");
  if(!g.hostConnected)await update(gameRef,{hostConnected:true,hostConnectedAt:Date.now()});
  render(g);
 });
}
function render(g){
 ["readyHost","controlHost","finishHost","badSession"].forEach(id=>$(id).classList.add("hidden"));
 if(g.status==="pairing"){
  $("readyHost").classList.remove("hidden");$("readyTitle").textContent=`${g.team1} ضد ${g.team2}`;
  const p1=(g.picks||[]).filter(p=>p.owner===1),p2=(g.picks||[]).filter(p=>p.owner===2);
  $("readyPicks").innerHTML=`<div><b>${g.team1}</b><div>${chips(p1)}</div></div><div><b>${g.team2}</b><div>${chips(p2)}</div></div>`;
 }else if(g.status==="game"){
  $("controlHost").classList.remove("hidden");renderControl(g);
 }else if(g.status==="finished"){
  $("finishHost").classList.remove("hidden");$("hostWinner").textContent=g.winner==="تعادل"?"تعادل!":`${g.winner} فاز!`;$("hostFinalScore").textContent=`${g.team1}: ${g.score1} — ${g.team2}: ${g.score2}`;
 }
}
function chips(a){return a.length?a.map(x=>`<span>${x.category}</span>`).join(""):"—"}
$("startGameBtn").onclick=async()=>{await startRound({...state,currentRoundIndex:0,score1:0,score2:0})};
async function startRound(g){
 const pick=g.picks[g.currentRoundIndex],rd=getRound(pick.category);
 const reservations=g.hintReservations||{};
 const reserved=reservations[String(g.currentRoundIndex)]||null;
 const activeHint=reserved?.hint||null;
 const hintUsedEvent=reserved?{id:Date.now(),team:reserved.teamName,hint:reserved.hint,reserved:true}:null;
 await update(gameRef,{
   status:"game",
   currentRoundIndex:g.currentRoundIndex,
   currentCategory:pick.category,
   currentOwner:pick.owner,
   currentQuestion:rd.question,
   currentHint:rd.hint||"فكروا في أشهر الإجابات.",
   activeHint,
   currentAnswers:rd.answers.map(([text,points],i)=>({text,points,index:i,revealed:false})),
   score1:g.score1||0,score2:g.score2||0,
   hints1:g.hints1||0,hints2:g.hints2||0,
   streak1:g.streak1||0,streak2:g.streak2||0,
   hintReservations:reservations,
   answerTurn:pick.owner,
   revealEvent:null,wrongEvent:null,hintEarnedEvent:null,hintUsedEvent,
   updatedAt:Date.now()
 });
}
function renderControl(g){
 $("hostRoundLabel").textContent=`الجولة ${g.currentRoundIndex+1} من ${g.roundCount}`;$("hostCategory").textContent=g.currentCategory;$("hostQuestion").textContent=g.currentQuestion;
 $("hostName1").textContent=g.team1;$("hostName2").textContent=g.team2;$("hostScore1").textContent=g.score1||0;$("hostScore2").textContent=g.score2||0;$("hostTurnName").textContent=g.answerTurn===1?g.team1:g.team2;
 $("controlHost").dataset.turn=String(g.answerTurn||1);
 $("hintTeam1Name").textContent=g.team1;$("hintTeam2Name").textContent=g.team2;
 $("hintCount1").textContent=g.hints1||0;$("hintCount2").textContent=g.hints2||0;
 $("useHint1").disabled=!(g.hints1>0);
 $("useHint2").disabled=!(g.hints2>0);
 renderHintReservations(g);
 $("hostAnswers").innerHTML=(g.currentAnswers||[]).map((a,i)=>`<button class="host-answer ${a.revealed?"used":""}" data-i="${i}"><span class="n">${i+1}</span><b>${a.text}</b><span class="p">${a.points}</span></button>`).join("");
 document.querySelectorAll(".host-answer:not(.used)").forEach(b=>b.onclick=()=>reveal(+b.dataset.i));
 $("nextRoundBtn").classList.toggle("hidden",!(g.currentAnswers||[]).every(a=>a.revealed));
}
async function reveal(i){
 const a=[...(state.currentAnswers||[])];if(!a[i]||a[i].revealed)return;a[i]={...a[i],revealed:true};
 const pts=a[i].points,team=state.answerTurn,newTurn=team===1?2:1;
 const patch={
   currentAnswers:a,
   score1:(state.score1||0)+(team===1?pts:0),
   score2:(state.score2||0)+(team===2?pts:0),
   answerTurn:newTurn,revealEvent:{id:Date.now(),text:a[i].text,points:pts},
   wrongEvent:null,updatedAt:Date.now()
 };
 if(team===1){
   let streak=(state.streak1||0)+1,hints=state.hints1||0;
   if(streak>=2){hints++;streak=0;patch.hintEarnedEvent={id:Date.now(),team:state.team1}}
   patch.streak1=streak;patch.hints1=hints;
 }else{
   let streak=(state.streak2||0)+1,hints=state.hints2||0;
   if(streak>=2){hints++;streak=0;patch.hintEarnedEvent={id:Date.now(),team:state.team2}}
   patch.streak2=streak;patch.hints2=hints;
 }
 await update(gameRef,patch);
}
$("wrongBtn").onclick=async()=>{
 const team=state.answerTurn,patch={answerTurn:team===1?2:1,wrongEvent:{id:Date.now()},revealEvent:null,updatedAt:Date.now()};
 if(team===1)patch.streak1=0;else patch.streak2=0;
 await update(gameRef,patch);
};
let pendingHintTeam=null;

function renderHintReservations(g){
  document.querySelectorAll(".hint-reservations").forEach(x=>x.remove());
  const reservations=g.hintReservations||{};
  const byTeam=(team)=>Object.entries(reservations)
    .filter(([_,r])=>r.team===team)
    .map(([idx,r])=>`<span class="hint-reservation-chip">💡 الجولة ${Number(idx)+1}: ${r.category}</span>`)
    .join("");
  const c1=byTeam(1),c2=byTeam(2);
  const teams=document.querySelectorAll(".hint-team");
  if(teams[0]&&c1)teams[0].insertAdjacentHTML("beforeend",`<div class="hint-reservations">${c1}</div>`);
  if(teams[1]&&c2)teams[1].insertAdjacentHTML("beforeend",`<div class="hint-reservations">${c2}</div>`);
}

function openHintTargetPicker(team){
  if(!state)return;
  const count=team===1?(state.hints1||0):(state.hints2||0);
  if(count<1)return;
  pendingHintTeam=team;
  const reservations=state.hintReservations||{};
  const current=state.currentRoundIndex||0;
  const items=(state.picks||[]).map((pick,idx)=>{
    if(idx<current)return null;
    const rd=getRound(pick.category);
    const reserved=reservations[String(idx)];
    const isCurrent=idx===current;
    return {
      idx,
      category:pick.category,
      question:rd.question,
      reserved,
      isCurrent
    };
  }).filter(Boolean);

  $("hintTargetList").innerHTML=items.map(item=>{
    const disabled=!!item.reserved;
    const status=item.reserved
      ? `محجوز لـ ${item.reserved.teamName}`
      : item.isCurrent
        ? "السؤال الحالي"
        : "سؤال لاحق";
    return `<button class="hint-target-option" data-round="${item.idx}" ${disabled?"disabled":""}>
      <span class="hint-target-num">${item.idx+1}</span>
      <span class="hint-target-copy"><b>${item.category}</b><span>${item.question}</span></span>
      <span class="hint-target-status">${status}</span>
    </button>`;
  }).join("");

  document.querySelectorAll(".hint-target-option:not(:disabled)").forEach(b=>{
    b.onclick=()=>reserveHintForRound(team,+b.dataset.round);
  });
  $("hintTargetModal").classList.remove("hidden");
}

async function reserveHintForRound(team,roundIndex){
  if(!state)return;
  const count=team===1?(state.hints1||0):(state.hints2||0);
  if(count<1)return;
  const reservations={...(state.hintReservations||{})};
  if(reservations[String(roundIndex)])return;
  const pick=state.picks[roundIndex];
  const rd=getRound(pick.category);
  const teamName=team===1?state.team1:state.team2;

  reservations[String(roundIndex)]={
    team,
    teamName,
    category:pick.category,
    hint:rd.hint||`فكروا بأشهر الأشياء المرتبطة بفئة ${pick.category}.`,
    reservedAt:Date.now()
  };

  const patch={hintReservations:reservations,updatedAt:Date.now()};
  if(team===1)patch.hints1=count-1;else patch.hints2=count-1;

  // If they selected the current question, show the hint immediately.
  if(roundIndex===(state.currentRoundIndex||0)){
    patch.activeHint=reservations[String(roundIndex)].hint;
    patch.hintUsedEvent={
      id:Date.now(),
      team:teamName,
      hint:reservations[String(roundIndex)].hint,
      reserved:false
    };
  }

  await update(gameRef,patch);
  $("hintTargetModal").classList.add("hidden");
}

$("useHint1").onclick=()=>openHintTargetPicker(1);
$("useHint2").onclick=()=>openHintTargetPicker(2);
$("closeHintTarget").onclick=()=>$("hintTargetModal").classList.add("hidden");
$("hintTargetModal").addEventListener("click",e=>{if(e.target===$("hintTargetModal"))$("hintTargetModal").classList.add("hidden")});
$("nextRoundBtn").onclick=async()=>{
 const next=state.currentRoundIndex+1;
 if(next>=state.roundCount){const w=state.score1>state.score2?state.team1:state.score2>state.score1?state.team2:"تعادل";await update(gameRef,{status:"finished",winner:w,updatedAt:Date.now()});return}
 await startRound({...state,currentRoundIndex:next});
};

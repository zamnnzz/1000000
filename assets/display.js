import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-database.js";
import { firebaseConfig, GAME_PATH } from "./firebase-config.js";

const app=initializeApp(firebaseConfig);
const db=getDatabase(app);
const gameRef=ref(db,GAME_PATH);
const $=id=>document.getElementById(id);
let lastReveal=null,lastWrong=null;

function show(id){
  ["waitingDisplay","draftDisplay","gameDisplay","finishDisplay"].forEach(x=>$(x).classList.add("hidden"));
  $(id).classList.remove("hidden");
}
function chips(items){return items.length?items.map(p=>`<span>${p.category}</span>`).join(""):"<span>—</span>"}
onValue(gameRef,snap=>{
  const s=snap.val();
  if(!s||!s.status||s.status==="waiting"||s.status==="setup"){show("waitingDisplay");return}
  if(s.status==="draft"){
    show("draftDisplay");
    $("displayDraftTurn").textContent=`الدور على ${s.pickTurn===1?s.team1:s.team2}`;
    const p1=(s.picks||[]).filter(p=>p.owner===1),p2=(s.picks||[]).filter(p=>p.owner===2);
    $("displayPicks").innerHTML=`<div><b>${s.team1}</b><div>${chips(p1)}</div></div><div><b>${s.team2}</b><div>${chips(p2)}</div></div>`;
    return;
  }
  if(s.status==="game"){
    show("gameDisplay");
    $("displayTeam1").textContent=s.team1;$("displayTeam2").textContent=s.team2;
    $("displayScore1").textContent=s.score1||0;$("displayScore2").textContent=s.score2||0;
    $("displayRoundCounter").textContent=`الجولة ${s.currentRoundIndex+1} من ${s.roundCount}`;
    $("displayCategory").textContent=s.currentCategory;$("displayQuestion").textContent=s.currentQuestion;
    $("ownerChip").textContent=`اختيار ${s.currentOwner===1?s.team1:s.team2}`;
    $("displayTurn").textContent=s.answerTurn===1?s.team1:s.team2;
    $("displayTeam1Card").classList.toggle("active",s.answerTurn===1);
    $("displayTeam2Card").classList.toggle("active",s.answerTurn===2);
    $("displayAnswers").innerHTML=(s.currentAnswers||[]).map((a,i)=>`<div class="display-answer ${a.revealed?"revealed":""}"><span class="n">${i+1}</span><span class="lock">${a.revealed?a.text:""}</span><span class="pts">${a.revealed?a.points:"?"}</span></div>`).join("");
    if(s.revealEvent?.id && s.revealEvent.id!==lastReveal){
      lastReveal=s.revealEvent.id;
      $("revealText").textContent=s.revealEvent.text;$("revealPoints").textContent=`+${s.revealEvent.points} نقاط`;
      $("revealFx").classList.remove("hidden");setTimeout(()=>$("revealFx").classList.add("hidden"),1800);
    }
    if(s.wrongEvent?.id && s.wrongEvent.id!==lastWrong){
      lastWrong=s.wrongEvent.id;$("wrongFx").classList.remove("hidden");setTimeout(()=>$("wrongFx").classList.add("hidden"),1300);
    }
    return;
  }
  if(s.status==="finished"){
    show("finishDisplay");
    $("displayWinner").textContent=s.winner==="تعادل"?"تعادل!":`${s.winner} يفوز!`;
    $("displayFinalScore").textContent=`${s.team1}: ${s.score1} — ${s.team2}: ${s.score2}`;
  }
});

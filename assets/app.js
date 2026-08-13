(()=> {
const $=id=>document.getElementById(id);

const categories = [
  ["ثقافة عامة","🥫"],["السعودية","💚"],["تاريخ","📜"],["سيارات","🚗"],["حيوانات","🐶"],
  ["كرة قدم","⚽"],["كأس العالم","🏆"],["جغرافيا","🌍"],["أديان وإسلاميات","☪️"],["أفلام ومسلسلات","🎬"],
  ["أكل وطبخ","🍕"],["تقنية","💻"],["ألعاب فيديو","🎮"],["مدرسة","🏫"],["أنمي","🍥"],
  ["رياضة","🏃"],["موسيقى","🎵"],["طب وصحة","🩺"],["ENGLISH","🔤"],["مشاهير","🎤"]
];

const rounds = {
  "سيارات": {
    question:"اذكر أشهر ماركات السيارات اليابانية",
    answers:[
      ["تويوتا",10,["تويوتا","toyota"]],["نيسان",9,["نيسان","nissan"]],["هوندا",8,["هوندا","honda"]],
      ["مازدا",7,["مازدا","mazda"]],["سوبارو",6,["سوبارو","subaru"]],["ميتسوبيشي",5,["ميتسوبيشي","mitsubishi"]],
      ["سوزوكي",4,["سوزوكي","suzuki"]],["لكزس",3,["لكزس","lexus"]],["إنفينيتي",2,["انفينيتي","إنفينيتي","infiniti"]],
      ["أكيورا",1,["اكيورا","أكيورا","acura"]]
    ]
  },
  "كرة قدم": {
    question:"اذكر أندية كرة قدم أوروبية مشهورة",
    answers:[
      ["ريال مدريد",10,["ريال مدريد","ريال"]],["برشلونة",9,["برشلونة","برشلونه","بارسا"]],
      ["مانشستر يونايتد",8,["مانشستر يونايتد","اليونايتد"]],["ليفربول",7,["ليفربول"]],
      ["بايرن ميونخ",6,["بايرن ميونخ","بايرن"]],["مانشستر سيتي",5,["مانشستر سيتي","السيتي"]],
      ["ميلان",4,["ميلان","اي سي ميلان"]],["إنتر ميلان",3,["انتر ميلان","إنتر ميلان","انتر"]],
      ["أرسنال",2,["ارسنال","أرسنال"]],["باريس سان جيرمان",1,["باريس سان جيرمان","باريس"]]
    ]
  },
  "جغرافيا": {
    question:"اذكر دولاً عربية معروفة",
    answers:[
      ["السعودية",10,["السعودية","المملكة العربية السعودية"]],["مصر",9,["مصر"]],
      ["الإمارات",8,["الإمارات","الامارات","الإمارات العربية المتحدة"]],["المغرب",7,["المغرب"]],
      ["العراق",6,["العراق"]],["الأردن",5,["الأردن","الاردن"]],["الكويت",4,["الكويت"]],
      ["قطر",3,["قطر"]],["عُمان",2,["عمان","عُمان"]],["البحرين",1,["البحرين"]]
    ]
  },
  "ثقافة عامة": {
    question:"اذكر أشياء نستخدمها يومياً",
    answers:[
      ["الجوال",10,["الجوال","جوال","الهاتف","هاتف"]],["الماء",9,["الماء","ماء"]],
      ["السيارة",8,["السيارة","سيارة"]],["الإنترنت",7,["الانترنت","الإنترنت","نت"]],
      ["الكهرباء",6,["الكهرباء","كهرباء"]],["المفتاح",5,["المفتاح","مفتاح"]],
      ["الساعة",4,["الساعة","ساعة"]],["القلم",3,["القلم","قلم"]],
      ["الكرسي",2,["الكرسي","كرسي"]],["الكوب",1,["الكوب","كوب"]]
    ]
  }
};

let state={
  team1:"",team2:"",
  roundCount:4,
  picks:[],
  pickTurn:1,
  currentRoundIndex:0,
  score1:0,score2:0,
  answerTurn:1,
  revealed:[],
  currentRound:null,
  judgeTeam:null
};

function show(screen){
  document.querySelectorAll(".screen").forEach(x=>x.classList.remove("active"));
  $(screen).classList.add("active");
}
function norm(v){
  return String(v||"").toLowerCase().trim()
    .replace(/[ًٌٍَُِّْـ]/g,"").replace(/[أإآ]/g,"ا").replace(/ة/g,"ه").replace(/ى/g,"ي")
    .replace(/[^\u0600-\u06FFa-z0-9 ]/g,"").replace(/\s+/g," ");
}
function getRound(cat){
  if(rounds[cat]) return JSON.parse(JSON.stringify(rounds[cat]));
  return {
    question:`اذكر 10 أشياء مرتبطة بفئة: ${cat}`,
    answers:Array.from({length:10},(_,i)=>[
      `إجابة ${10-i}`,10-i,[`اجابة ${10-i}`,`إجابة ${10-i}`]
    ])
  };
}

/* STEP 1 */
document.querySelectorAll("#roundButtons button").forEach(b=>{
  b.onclick=()=>{
    document.querySelectorAll("#roundButtons button").forEach(x=>x.classList.remove("active"));
    b.classList.add("active");
    state.roundCount=+b.dataset.rounds;
  };
});

$("nextToCategories").onclick=()=>{
  const a=$("team1Input").value.trim();
  const b=$("team2Input").value.trim();
  if(!a||!b)return alert("اكتب اسم الفريقين");
  state.team1=a;state.team2=b;
  state.picks=[];state.pickTurn=1;
  $("pickedTeam1Title").textContent=a;
  $("pickedTeam2Title").textContent=b;
  renderDraft();
  show("categoryScreen");
};

document.querySelectorAll("[data-go]").forEach(b=>b.onclick=()=>show(b.dataset.go));

/* STEP 2 */
function renderDraft(){
  const pickerName=state.pickTurn===1?state.team1:state.team2;
  $("draftTitle").textContent=`الدور على ${pickerName}`;
  $("draftSub").textContent=`اختر كاتقري للجولة ${state.picks.length+1} من ${state.roundCount}`;
  $("draftProgressText").textContent=`تم اختيار ${state.picks.length} من ${state.roundCount}`;
  $("draftProgressBar").style.width=`${(state.picks.length/state.roundCount)*100}%`;

  const usedCats=state.picks.map(p=>p.category);

  $("categoryGrid").innerHTML=categories.map(([name,icon])=>`
    <button class="category ${usedCats.includes(name)?"selected":""}" data-cat="${name}">
      <span class="cat-check">${usedCats.includes(name)?"✓":"○"}</span>
      <span class="cat-icon">${icon}</span>
      <span class="cat-name">${name}</span>
    </button>
  `).join("");

  document.querySelectorAll(".category:not(.selected)").forEach(b=>{
    b.onclick=()=>{
      state.picks.push({
        category:b.dataset.cat,
        owner:state.pickTurn
      });

      if(state.picks.length>=state.roundCount){
        renderDraft();
        $("draftTitle").textContent="المواضيع جاهزة!";
        $("draftSub").textContent="هذه هي المواضيع المختارة للتحدي.";
        $("beginGameBtn").classList.remove("hidden");
        document.querySelectorAll(".category").forEach(x=>x.style.pointerEvents="none");
        return;
      }

      state.pickTurn=state.pickTurn===1?2:1;
      renderDraft();
    };
  });

  const p1=state.picks.filter(p=>p.owner===1);
  const p2=state.picks.filter(p=>p.owner===2);

  $("pickedTeam1").innerHTML=p1.length
    ? p1.map((p,i)=>`<span class="picked-chip">${i+1}. ${p.category}</span>`).join("")
    : `<span class="sub">ما اختار شيء بعد</span>`;

  $("pickedTeam2").innerHTML=p2.length
    ? p2.map((p,i)=>`<span class="picked-chip">${i+1}. ${p.category}</span>`).join("")
    : `<span class="sub">ما اختار شيء بعد</span>`;

  $("beginGameBtn").classList.toggle("hidden",state.picks.length<state.roundCount);
}

$("beginGameBtn").onclick=()=>{
  state.currentRoundIndex=0;
  state.score1=0;state.score2=0;
  loadRound();
  $("team1Name").textContent=state.team1;
  $("team2Name").textContent=state.team2;
  show("gameScreen");
};

/* STEP 3 */
function loadRound(){
  const pick=state.picks[state.currentRoundIndex];
  state.currentRound=getRound(pick.category);
  state.revealed=[];
  state.answerTurn=pick.owner; // الفريق الذي اختار الكاتقري يبدأ الجولة
  $("roundCounter").textContent=`الجولة ${state.currentRoundIndex+1} من ${state.roundCount}`;
  $("categoryName").textContent=pick.category;
  $("roundOwnerLabel").textContent=`اختيار ${pick.owner===1?state.team1:state.team2}`;
  $("questionText").textContent=state.currentRound.question;
  renderGame();
}

function renderGame(){
  $("team1Score").textContent=state.score1;
  $("team2Score").textContent=state.score2;

  $("team1ScoreCard").classList.toggle("active-turn",state.answerTurn===1);
  $("team2ScoreCard").classList.toggle("active-turn",state.answerTurn===2);
  $("turnTeamName").textContent=state.answerTurn===1?state.team1:state.team2;

  $("answersBoard").innerHTML=state.currentRound.answers.map((a,i)=>{
    const revealed=state.revealed.includes(i);
    return `
      <div class="answer-slot ${revealed?"revealed":""}">
        <span class="num">#${i+1}</span>
        <span class="locked-line">${revealed?a[0]:""}</span>
        <span class="points">${revealed?a[1]:"?"}</span>
      </div>
    `;
  }).join("");

  if(state.revealed.length===10){
    setTimeout(roundComplete,500);
  }
}

$("answerButton").onclick=()=>{
  $("answeringTeamTitle").textContent=state.answerTurn===1?state.team1:state.team2;
  $("hostAnswerInput").value="";
  $("answerModal").classList.remove("hidden");
  setTimeout(()=>$("hostAnswerInput").focus(),80);
};

$("submitHostAnswer").onclick=checkAnswer;
$("hostAnswerInput").addEventListener("keydown",e=>{if(e.key==="Enter")checkAnswer()});

function checkAnswer(){
  const typed=$("hostAnswerInput").value.trim();
  if(!typed)return;

  const foundIndex=state.currentRound.answers.findIndex((item,i)=>{
    if(state.revealed.includes(i))return false;
    return item[2].some(alias=>norm(alias)===norm(typed));
  });

  $("answerModal").classList.add("hidden");
  $("suspenseModal").classList.remove("hidden");
  $("suspenseText").textContent=Math.random()>.5?"نشوف الإجابة 👀":"هل هي ضمن التوب 10؟";

  setTimeout(()=>{
    $("suspenseModal").classList.add("hidden");

    if(foundIndex>=0){
      const pts=state.currentRound.answers[foundIndex][1];
      state.revealed.push(foundIndex);

      if(state.answerTurn===1) state.score1+=pts;
      else state.score2+=pts;

      state.answerTurn=state.answerTurn===1?2:1;
      renderGame();
    }else{
      $("wrongModal").classList.remove("hidden");
    }
  },1400);
}

$("continueWrong").onclick=()=>{
  $("wrongModal").classList.add("hidden");
  state.answerTurn=state.answerTurn===1?2:1;
  renderGame();
};

function roundComplete(){
  if(state.currentRoundIndex>=state.roundCount-1){
    finishGame();
    return;
  }

  const pick=state.picks[state.currentRoundIndex];
  $("roundDoneTitle").textContent=`خلصت جولة ${pick.category}`;
  $("roundDoneModal").classList.remove("hidden");
}

$("nextRoundBtn").onclick=()=>{
  $("roundDoneModal").classList.add("hidden");
  state.currentRoundIndex++;
  loadRound();
};

function finishGame(){
  const winner=
    state.score1>state.score2?state.team1:
    state.score2>state.score1?state.team2:
    "تعادل";

  $("winnerText").textContent=
    winner==="تعادل"
      ?`${state.team1} و ${state.team2} تعادلوا!`
      :`${winner} فاز!`;

  $("finalScoreText").textContent=`${state.team1}: ${state.score1} — ${state.team2}: ${state.score2}`;
  $("finishModal").classList.remove("hidden");
}

$("playAgainBtn").onclick=()=>{
  $("finishModal").classList.add("hidden");
  state.picks=[];state.pickTurn=1;
  $("beginGameBtn").classList.add("hidden");
  renderDraft();
  show("categoryScreen");
};

$("restartBtn").onclick=()=>location.reload();

document.querySelectorAll("[data-close]").forEach(b=>{
  b.onclick=()=>$(b.dataset.close).classList.add("hidden");
});
document.querySelectorAll(".modal").forEach(m=>{
  m.addEventListener("click",e=>{
    if(e.target===m && m.id!=="suspenseModal")m.classList.add("hidden");
  });
});
})();
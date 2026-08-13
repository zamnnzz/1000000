(()=> {
const $=id=>document.getElementById(id);

const categories = [
  ["ثقافة عامة","🥫"],
  ["السعودية","💚"],
  ["تاريخ","📜"],
  ["سيارات","🚗"],
  ["حيوانات","🐶"],
  ["كرة قدم","⚽"],
  ["كأس العالم","🏆"],
  ["جغرافيا","🌍"],
  ["أديان وإسلاميات","☪️"],
  ["أفلام ومسلسلات","🎬"],
  ["أكل وطبخ","🍕"],
  ["تقنية","💻"],
  ["ألعاب فيديو","🎮"],
  ["مدرسة","🏫"],
  ["أنمي","🍥"],
  ["رياضة","🏃"],
  ["موسيقى","🎵"],
  ["طب وصحة","🩺"],
  ["ENGLISH","🔤"],
  ["مشاهير","🎤"]
];

const rounds = {
  "سيارات": {
    question:"اذكر أشهر ماركات السيارات اليابانية",
    answers:[
      ["تويوتا",10,["تويوتا","toyota"]],
      ["نيسان",9,["نيسان","nissan"]],
      ["هوندا",8,["هوندا","honda"]],
      ["مازدا",7,["مازدا","mazda"]],
      ["سوبارو",6,["سوبارو","subaru"]],
      ["ميتسوبيشي",5,["ميتسوبيشي","mitsubishi"]],
      ["سوزوكي",4,["سوزوكي","suzuki"]],
      ["لكزس",3,["لكزس","lexus"]],
      ["إنفينيتي",2,["انفينيتي","إنفينيتي","infiniti"]],
      ["أكيورا",1,["اكيورا","أكيورا","acura"]]
    ]
  },
  "كرة قدم": {
    question:"اذكر أندية كرة قدم أوروبية مشهورة",
    answers:[
      ["ريال مدريد",10,["ريال مدريد","ريال"]],
      ["برشلونة",9,["برشلونة","برشلونه","بارسا"]],
      ["مانشستر يونايتد",8,["مانشستر يونايتد","اليونايتد"]],
      ["ليفربول",7,["ليفربول"]],
      ["بايرن ميونخ",6,["بايرن ميونخ","بايرن"]],
      ["مانشستر سيتي",5,["مانشستر سيتي","السيتي"]],
      ["ميلان",4,["ميلان","اي سي ميلان"]],
      ["إنتر ميلان",3,["انتر ميلان","إنتر ميلان","انتر"]],
      ["أرسنال",2,["ارسنال","أرسنال"]],
      ["باريس سان جيرمان",1,["باريس سان جيرمان","باريس"]]
    ]
  },
  "جغرافيا": {
    question:"اذكر دولاً عربية معروفة",
    answers:[
      ["السعودية",10,["السعودية","المملكة العربية السعودية"]],
      ["مصر",9,["مصر"]],
      ["الإمارات",8,["الإمارات","الامارات","الإمارات العربية المتحدة"]],
      ["المغرب",7,["المغرب"]],
      ["العراق",6,["العراق"]],
      ["الأردن",5,["الأردن","الاردن"]],
      ["الكويت",4,["الكويت"]],
      ["قطر",3,["قطر"]],
      ["عُمان",2,["عمان","عُمان"]],
      ["البحرين",1,["البحرين"]]
    ]
  },
  "ثقافة عامة": {
    question:"اذكر أشياء نستخدمها يومياً",
    answers:[
      ["الجوال",10,["الجوال","جوال","الهاتف","هاتف"]],
      ["الماء",9,["الماء","ماء"]],
      ["السيارة",8,["السيارة","سيارة"]],
      ["الإنترنت",7,["الانترنت","الإنترنت","نت"]],
      ["الكهرباء",6,["الكهرباء","كهرباء"]],
      ["المفتاح",5,["المفتاح","مفتاح"]],
      ["الساعة",4,["الساعة","ساعة"]],
      ["القلم",3,["القلم","قلم"]],
      ["الكرسي",2,["الكرسي","كرسي"]],
      ["الكوب",1,["الكوب","كوب"]]
    ]
  }
};

let state={
  team1:"",
  team2:"",
  category:"",
  score1:0,
  score2:0,
  turn:1,
  revealed:[],
  currentRound:null
};

function show(screen){
  document.querySelectorAll(".screen").forEach(x=>x.classList.remove("active"));
  $(screen).classList.add("active");
}

function norm(v){
  return String(v||"")
    .toLowerCase()
    .trim()
    .replace(/[ًٌٍَُِّْـ]/g,"")
    .replace(/[أإآ]/g,"ا")
    .replace(/ة/g,"ه")
    .replace(/ى/g,"ي")
    .replace(/[^\u0600-\u06FFa-z0-9 ]/g,"")
    .replace(/\s+/g," ");
}

function getRound(cat){
  if(rounds[cat]) return JSON.parse(JSON.stringify(rounds[cat]));
  return {
    question:`اذكر 10 أشياء مرتبطة بفئة: ${cat}`,
    answers:Array.from({length:10},(_,i)=>[
      `إجابة ${10-i}`,
      10-i,
      [`اجابة ${10-i}`,`إجابة ${10-i}`]
    ])
  };
}

$("nextToCategories").onclick=()=>{
  const a=$("team1Input").value.trim();
  const b=$("team2Input").value.trim();
  if(!a||!b)return alert("اكتب اسم الفريقين");
  state.team1=a;
  state.team2=b;
  renderCategories();
  show("categoryScreen");
};

document.querySelectorAll("[data-go]").forEach(b=>b.onclick=()=>show(b.dataset.go));

function renderCategories(){
  $("categoryGrid").innerHTML=categories.map(([name,icon])=>`
    <button class="category ${state.category===name?"active":""}" data-cat="${name}">
      <span class="cat-check">${state.category===name?"✓":"○"}</span>
      <span class="cat-icon">${icon}</span>
      <span class="cat-name">${name}</span>
    </button>
  `).join("");

  document.querySelectorAll(".category").forEach(b=>b.onclick=()=>{
    state.category=b.dataset.cat;
    $("startGame").disabled=false;
    renderCategories();
  });
}

$("startGame").onclick=()=>{
  state.score1=0;
  state.score2=0;
  state.turn=1;
  state.revealed=[];
  state.currentRound=getRound(state.category);

  $("team1Name").textContent=state.team1;
  $("team2Name").textContent=state.team2;
  $("categoryName").textContent=state.category;
  $("questionText").textContent=state.currentRound.question;

  renderGame();
  show("gameScreen");
};

function renderGame(){
  $("team1Score").textContent=state.score1;
  $("team2Score").textContent=state.score2;

  const t1=$("team1ScoreCard");
  const t2=$("team2ScoreCard");
  t1.classList.toggle("active-turn",state.turn===1);
  t2.classList.toggle("active-turn",state.turn===2);

  const turnName=state.turn===1?state.team1:state.team2;
  $("turnTeamName").textContent=turnName;

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
    setTimeout(finishRound,700);
  }
}

$("answerButton").onclick=()=>{
  $("answeringTeamTitle").textContent=state.turn===1?state.team1:state.team2;
  $("hostAnswerInput").value="";
  $("answerModal").classList.remove("hidden");
  setTimeout(()=>$("hostAnswerInput").focus(),80);
};

$("submitHostAnswer").onclick=checkAnswer;
$("hostAnswerInput").addEventListener("keydown",e=>{
  if(e.key==="Enter") checkAnswer();
});

function checkAnswer(){
  const typed=$("hostAnswerInput").value.trim();
  if(!typed)return;

  const foundIndex=state.currentRound.answers.findIndex((item,i)=>{
    if(state.revealed.includes(i))return false;
    return item[2].some(alias=>norm(alias)===norm(typed));
  });

  $("answerModal").classList.add("hidden");
  $("suspenseModal").classList.remove("hidden");

  $("suspenseText").textContent=
    Math.random()>.5?"نشوف الإجابة 👀":"هل هي ضمن التوب 10؟";

  setTimeout(()=>{
    $("suspenseModal").classList.add("hidden");

    if(foundIndex>=0){
      revealCorrect(foundIndex);
    }else{
      $("wrongModal").classList.remove("hidden");
    }
  },1400);
}

function revealCorrect(index){
  const points=state.currentRound.answers[index][1];

  state.revealed.push(index);
  if(state.turn===1) state.score1+=points;
  else state.score2+=points;

  renderGame();

  // بعد كل جواب صحيح ينتقل الدور أيضاً
  state.turn=state.turn===1?2:1;
  renderGame();
}

$("continueWrong").onclick=()=>{
  $("wrongModal").classList.add("hidden");
  state.turn=state.turn===1?2:1;
  renderGame();
};

function finishRound(){
  const winner=
    state.score1>state.score2?state.team1:
    state.score2>state.score1?state.team2:
    "تعادل!";

  $("winnerText").textContent=
    winner==="تعادل!"
      ?`تعادل بين ${state.team1} و ${state.team2}`
      :`${winner} فاز بالجولة!`;

  $("finishModal").classList.remove("hidden");
}

$("newRoundBtn").onclick=()=>{
  $("finishModal").classList.add("hidden");
  state.category="";
  $("startGame").disabled=true;
  renderCategories();
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
(()=> {
const $=id=>document.getElementById(id);
const STORE="top10_ar_v1";
const TEAM_COLORS=["#5671ff","#ff637a","#38d996","#ffc857","#8a64ff","#44d9ff","#ff8d4b","#d66dff"];

const DEFAULT_CATS = {
  "كرة القدم":[
    ["كم لاعبًا يكون داخل الملعب لكل فريق عند بداية مباراة كرة القدم؟","11"],
    ["أي منتخب فاز بكأس العالم 2022؟","الأرجنتين"],
    ["ما اسم البطولة الأوروبية للأندية التي تقام سنويًا وتُعد الأشهر؟","دوري أبطال أوروبا"],
    ["من هو الهداف التاريخي لكأس العالم حتى 2022؟","ميروسلاف كلوزه"],
    ["أي دولة استضافت كأس العالم 2010؟","جنوب أفريقيا"],
    ["كم دقيقة مدة المباراة الأصلية دون الوقت بدل الضائع؟","90 دقيقة"],
    ["أي نادٍ يُعرف بلقب الشياطين الحمر في إنجلترا؟","مانشستر يونايتد"],
    ["ما الدولة التي حققت أكبر عدد من بطولات كأس العالم للرجال؟","البرازيل"],
    ["من أول منتخب عربي وصل إلى نصف نهائي كأس العالم للرجال؟","المغرب"],
    ["ما اسم القانون الذي قد يلغي هدفًا بسبب تمركز المهاجم أمام آخر ثاني مدافع؟","التسلل"]
  ],
  "معلومات عامة":[
    ["كم عدد أيام الأسبوع؟","7"],
    ["ما أكبر كوكب في المجموعة الشمسية؟","المشتري"],
    ["ما عاصمة اليابان؟","طوكيو"],
    ["كم عدد قارات العالم المتعارف عليها؟","7"],
    ["ما العنصر الذي رمزه الكيميائي O؟","الأكسجين"],
    ["ما المحيط الأكبر على سطح الأرض؟","المحيط الهادئ"],
    ["ما اللغة الرسمية في البرازيل؟","البرتغالية"],
    ["أي كوكب يُعرف بالكوكب الأحمر؟","المريخ"],
    ["ما أكبر عضو في جسم الإنسان؟","الجلد"],
    ["كم ضلعًا للشكل العشاري؟","10"]
  ],
  "تاريخ":[
    ["في أي قرن بدأت الحرب العالمية الأولى؟","القرن العشرون"],
    ["أي حضارة بنت الأهرامات في الجيزة؟","الحضارة المصرية القديمة"],
    ["في أي سنة انتهت الحرب العالمية الثانية؟","1945"],
    ["من القائد الذي عبر جبال الألب مع الفيلة في العصور القديمة؟","هانيبال"],
    ["ما اسم المدينة الإيطالية التي دمرها ثوران فيزوف سنة 79م؟","بومبي"],
    ["أي إمبراطورية اتخذت القسطنطينية عاصمة لها؟","الإمبراطورية البيزنطية"],
    ["ما الاسم القديم لمدينة إسطنبول قبل القسطنطينية؟","بيزنطة"],
    ["من أول إنسان وطأت قدمه سطح القمر؟","نيل أرمسترونغ"],
    ["في أي سنة سقط جدار برلين؟","1989"],
    ["ما الحضارة التي اشتهرت بمدينة ماتشو بيتشو؟","الإنكا"]
  ],
  "علوم":[
    ["ما الغاز الذي نتنفسه ويحتاجه الجسم للبقاء؟","الأكسجين"],
    ["ما أقرب كوكب إلى الشمس؟","عطارد"],
    ["كم عدد حالات المادة الأساسية الشائعة؟","3"],
    ["ما العضو الذي يضخ الدم في جسم الإنسان؟","القلب"],
    ["ما الوحدة الأساسية لقياس شدة التيار الكهربائي؟","الأمبير"],
    ["ما اسم العملية التي تصنع فيها النباتات غذاءها باستخدام الضوء؟","البناء الضوئي"],
    ["ما أسرع شيء معروف في الفراغ؟","الضوء"],
    ["كم عدد الكروموسومات لدى الإنسان عادةً؟","46"],
    ["ما الجسيم ذو الشحنة السالبة في الذرة؟","الإلكترون"],
    ["ما اسم القوة التي تجذب الأجسام نحو الأرض؟","الجاذبية"]
  ],
  "جغرافيا":[
    ["ما أكبر قارة مساحةً؟","آسيا"],
    ["ما عاصمة فرنسا؟","باريس"],
    ["في أي قارة تقع البرازيل؟","أمريكا الجنوبية"],
    ["ما أكبر دولة في العالم من حيث المساحة؟","روسيا"],
    ["ما البحر الذي يفصل بين أوروبا وأفريقيا؟","البحر المتوسط"],
    ["ما عاصمة أستراليا؟","كانبرا"],
    ["ما النهر الذي يمر في مصر والسودان؟","النيل"],
    ["ما أعلى جبل في العالم فوق مستوى سطح البحر؟","إيفرست"],
    ["ما أصغر قارة من حيث المساحة؟","أستراليا"],
    ["أي دولة تضم مدينة مراكش؟","المغرب"]
  ],
  "ثقافة":[
    ["من مؤلف رواية البؤساء؟","فيكتور هوغو"],
    ["كم وترًا للغيتار الكلاسيكي عادة؟","6"],
    ["من رسم لوحة الموناليزا؟","ليوناردو دا فنشي"],
    ["ما اسم الفن الياباني لطي الورق؟","أوريغامي"],
    ["في أي مدينة يقع متحف اللوفر؟","باريس"],
    ["ما الفن الذي يستخدم الحركة والموسيقى والتعبير الجسدي؟","الرقص"],
    ["من مؤلف مسرحية هاملت؟","ويليام شكسبير"],
    ["ما اسم الخط العربي الذي يتميز باستدارته وكثرة استعماله في الكتب؟","خط النسخ"],
    ["أي آلة موسيقية تحتوي عادةً على 88 مفتاحًا؟","البيانو"],
    ["ما الاسم العام للعمل الأدبي المكتوب للتمثيل على المسرح؟","مسرحية"]
  ]
};

function state(){
  try{
    let s=JSON.parse(localStorage.getItem(STORE));
    if(s) return s;
  }catch{}
  return {teams:[], selectedCats:["كرة القدم","معلومات عامة","تاريخ"], customCats:{}, used:{}, scores:{}, activeCat:null, current:null};
}
function save(s){localStorage.setItem(STORE,JSON.stringify(s))}
let s=state();

function esc(v){return String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))}

// ---------- setup ----------
if($("teamForm")){
  function renderTeams(){
    $("teamsSetup").innerHTML=s.teams.map((t,i)=>`<div class="team-pill"><span style="width:10px;height:10px;border-radius:50%;background:${TEAM_COLORS[i%TEAM_COLORS.length]}"></span>${esc(t)}<button data-i="${i}" aria-label="حذف">×</button></div>`).join("");
    document.querySelectorAll(".team-pill button").forEach(b=>b.onclick=()=>{s.teams.splice(+b.dataset.i,1);save(s);renderTeams();checkStart()});
  }
  function renderCats(){
    const all=[...Object.keys(DEFAULT_CATS),...Object.keys(s.customCats||{})];
    $("presetCategories").innerHTML=all.map(c=>`<label class="category-pick ${s.selectedCats.includes(c)?"active":""}"><input type="checkbox" ${s.selectedCats.includes(c)?"checked":""} data-cat="${esc(c)}">${esc(c)}</label>`).join("");
    document.querySelectorAll(".category-pick input").forEach(cb=>cb.onchange=()=>{
      const cat=cb.dataset.cat;
      if(cb.checked){ if(!s.selectedCats.includes(cat))s.selectedCats.push(cat) }
      else s.selectedCats=s.selectedCats.filter(x=>x!==cat);
      save(s);renderCats();checkStart();
    });
  }
  function checkStart(){$("startGame").disabled=s.teams.length<2||s.selectedCats.length<1}
  $("teamForm").onsubmit=e=>{
    e.preventDefault(); const v=$("teamInput").value.trim();
    if(!v)return;if(s.teams.length>=8)return alert("الحد الأعلى 8 فرق");if(s.teams.includes(v))return alert("الفريق موجود");
    s.teams.push(v);s.scores[v]=s.scores[v]||0;$("teamInput").value="";save(s);renderTeams();checkStart();
  };
  $("categoryForm").onsubmit=e=>{
    e.preventDefault();const v=$("categoryInput").value.trim();if(!v)return;
    if(DEFAULT_CATS[v]||s.customCats[v])return alert("الفئة موجودة");
    s.customCats[v]=Array.from({length:10},(_,i)=>[`اكتب سؤال الفئة هنا — رقم ${i+1}`,"اكتب الإجابة هنا"]);
    s.selectedCats.push(v);$("categoryInput").value="";save(s);renderCats();checkStart();
  };
  $("startGame").onclick=()=>{
    s.used={};s.current=null;s.activeCat=s.selectedCats[0];
    s.teams.forEach(t=>{if(typeof s.scores[t]!=="number")s.scores[t]=0});
    save(s);$("setupView").classList.add("hidden");$("gameView").classList.remove("hidden");initGame();
  };
  renderTeams();renderCats();checkStart();
}

// auto-open game if setup hidden via action
if($("gameView") && !$("gameView").classList.contains("hidden")) initGame();

function getQuestions(cat){
  return (s.customCats&&s.customCats[cat]) || DEFAULT_CATS[cat] || Array.from({length:10},(_,i)=>[`سؤال ${i+1}`,"الإجابة"]);
}
function level(n){return n<=3?"easy":n<=7?"medium":"hard"}

function initGame(){
  if(!$("scoreboard")) return;
  renderScore();renderTabs();renderGrid();
  $("buzzerBtn").onclick=openBuzzer;
  $("fullscreenBtn").onclick=()=>document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen().catch(()=>{});
  $("resetBtn").onclick=()=>{if(confirm("إنهاء اللعبة والعودة للإعداد؟")){localStorage.removeItem(STORE);location.reload()}};
}
function renderScore(){
  const max=Math.max(...s.teams.map(t=>s.scores[t]||0),0);
  $("scoreboard").innerHTML=s.teams.map((t,i)=>`<div class="score-team ${(s.scores[t]||0)===max&&max>0?"leading":""}">
    <div class="team-avatar" style="--team:${TEAM_COLORS[i%TEAM_COLORS.length]}">${esc(t[0])}</div>
    <div><strong>${esc(t)}</strong><b>${s.scores[t]||0}</b></div>
  </div>`).join("");
}
function renderTabs(){
  $("categoryTabs").innerHTML=s.selectedCats.map(c=>`<button class="category-tab ${s.activeCat===c?"active":""}" data-cat="${esc(c)}">${esc(c)}</button>`).join("");
  document.querySelectorAll(".category-tab").forEach(b=>b.onclick=()=>{s.activeCat=b.dataset.cat;save(s);renderTabs();renderGrid()});
}
function renderGrid(){
  const q=getQuestions(s.activeCat);
  $("questionGrid").innerHTML=q.map((item,i)=>{
    const n=i+1, key=s.activeCat+"::"+n, used=!!s.used[key];
    return `<button class="qtile ${used?"used":""}" data-i="${i}" data-level="${level(n)}"><strong>${n}</strong><small>${n} ${n===1?"نقطة":"نقاط"}</small></button>`
  }).join("");
  document.querySelectorAll(".qtile:not(.used)").forEach(b=>{
    b.onclick=()=>openQuestion(+b.dataset.i);
    b.oncontextmenu=e=>{e.preventDefault();openEdit(+b.dataset.i)}
  });
}
function openQuestion(i){
  const q=getQuestions(s.activeCat)[i], n=i+1;
  s.current={cat:s.activeCat,index:i,points:n};save(s);
  $("modalCategory").textContent=s.activeCat;$("modalPoints").textContent=n+" "+(n===1?"نقطة":"نقاط");
  $("modalNumber").textContent=n;$("modalQuestion").textContent=q[0];$("modalAnswer").textContent=q[1];
  $("answerReveal").classList.add("hidden");$("questionModal").classList.remove("hidden");
}
if($("revealAnswer")) $("revealAnswer").onclick=()=>$("answerReveal").classList.remove("hidden");
if($("openJudge")) $("openJudge").onclick=()=>{$("questionModal").classList.add("hidden");openJudge()};

function openBuzzer(){
  $("buzzerTeams").innerHTML=s.teams.map((t,i)=>`<button class="buzzer-team" data-team="${esc(t)}">${i+1}. ${esc(t)}</button>`).join("");
  $("buzzerModal").classList.remove("hidden");
  document.querySelectorAll(".buzzer-team").forEach(b=>b.onclick=()=>{$("buzzerModal").classList.add("hidden");openJudge(b.dataset.team)});
}
function openJudge(prefill){
  if(!s.current)return alert("افتح سؤالًا أول");
  $("judgeTeams").innerHTML=s.teams.map(t=>`<button class="judge-team" data-team="${esc(t)}">${esc(t)}</button>`).join("");
  $("judgeDecision").classList.add("hidden");$("judgeModal").classList.remove("hidden");
  document.querySelectorAll(".judge-team").forEach(b=>b.onclick=()=>selectJudgeTeam(b.dataset.team));
  if(prefill)selectJudgeTeam(prefill);
}
let judgedTeam=null;
function selectJudgeTeam(team){
  judgedTeam=team;$("selectedTeamName").textContent=team;$("judgeDecision").classList.remove("hidden");
}
if($("correctBtn")) $("correctBtn").onclick=()=>finishJudge(true);
if($("wrongBtn")) $("wrongBtn").onclick=()=>finishJudge(false);
function finishJudge(correct){
  if(!judgedTeam||!s.current)return;
  if(correct)s.scores[judgedTeam]=(s.scores[judgedTeam]||0)+s.current.points;
  s.used[s.current.cat+"::"+(s.current.index+1)]=true;
  save(s);$("judgeModal").classList.add("hidden");judgedTeam=null;renderScore();renderGrid();
}

function openEdit(i){
  const arr=getQuestions(s.activeCat), q=arr[i];
  $("editTitle").textContent=`${s.activeCat} — السؤال رقم ${i+1}`;
  $("editQuestionText").value=q[0];$("editAnswerText").value=q[1];
  $("editQuestionModal").dataset.index=i;$("editQuestionModal").classList.remove("hidden");
}
if($("saveQuestion")) $("saveQuestion").onclick=()=>{
  const i=+$("editQuestionModal").dataset.index, cat=s.activeCat;
  if(!s.customCats[cat])s.customCats[cat]=getQuestions(cat).map(x=>[...x]);
  s.customCats[cat][i]=[$("editQuestionText").value.trim()||"سؤال", $("editAnswerText").value.trim()||"إجابة"];
  save(s);$("editQuestionModal").classList.add("hidden");
};

document.querySelectorAll("[data-close]").forEach(b=>b.onclick=()=>$((b.dataset.close)).classList.add("hidden"));
document.querySelectorAll(".modal").forEach(m=>m.addEventListener("click",e=>{if(e.target===m)m.classList.add("hidden")}));
window.addEventListener("keydown",e=>{
  if(!$("buzzerModal")||$("buzzerModal").classList.contains("hidden"))return;
  const n=parseInt(e.key,10);
  if(n>=1&&n<=s.teams.length){$("buzzerModal").classList.add("hidden");openJudge(s.teams[n-1])}
});
})();
(()=>{'use strict';const $=id=>document.getElementById(id),tones=['#efab78','#b992de','#f4dfb8','#bd9bdc','#eda674','#dbc3ed'],symbols=['؟','✦','!','؟','✧','!'];
function open(){window.openCategorySetup()} ['openPreview','openPreviewGuide','openPreviewScreen'].forEach(id=>$(id).onclick=open);document.querySelectorAll('[data-close]').forEach(n=>n.onclick=()=>$(n.dataset.close).close());})();

(()=>{const rail=document.querySelector('.category-peek-window');if(!rail)return;let drag=null;let railTouched=false;
const centerRail=()=>{
 if(railTouched)return;
 const overflow=rail.scrollWidth-rail.clientWidth;
 rail.scrollLeft=(getComputedStyle(rail).direction==='rtl'?-1:1)*overflow/2;
};
requestAnimationFrame(centerRail);
window.addEventListener('load',centerRail,{once:true});
new ResizeObserver(centerRail).observe(rail);
rail.addEventListener('pointerdown',()=>{railTouched=true},{passive:true});
rail.addEventListener('wheel',()=>{railTouched=true},{passive:true});
rail.addEventListener('keydown',()=>{railTouched=true});
rail.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse'||e.button!==0||e.target.closest('.category-info-button'))return;drag={x:e.clientX,left:rail.scrollLeft};rail.setPointerCapture(e.pointerId);rail.classList.add('is-dragging')});rail.addEventListener('pointermove',e=>{if(drag){rail.scrollLeft=drag.left-(e.clientX-drag.x);e.preventDefault()}});const stop=()=>{drag=null;rail.classList.remove('is-dragging')};rail.addEventListener('pointerup',stop);rail.addEventListener('pointercancel',stop);rail.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();rail.scrollBy({left:e.key==='ArrowRight'?220:-220,behavior:'smooth'})}})})();

document.querySelectorAll('.time-package-select').forEach(button=>button.addEventListener('click',()=>document.getElementById('packageDialog').showModal()));

(()=>{'use strict';const $=id=>document.getElementById(id),ar=n=>new Intl.NumberFormat('ar-SA').format(n);const categories=[
  {
    "id": 0,
    "name": "رياضة",
    "tone": "#d9c7e8",
    "art": "<img src=\"assets/categories/sports-portrait.webp?v=01f76c0bde39\" width=\"650\" height=\"850\" alt=\"رياضة\">"
  },
  {
    "id": 1,
    "name": "حول العالم",
    "tone": "#f1d2b0",
    "art": "<img src=\"assets/categories/world-portrait.webp?v=379cca9638e2\" width=\"650\" height=\"850\" alt=\"حول العالم\">"
  },
  {
    "id": 2,
    "name": "علوم",
    "tone": "#e9dcb5",
    "art": "<img src=\"assets/categories/science-portrait.webp?v=f5b590645f18\" width=\"650\" height=\"850\" alt=\"علوم\">"
  },
  {
    "id": 4,
    "name": "تاريخ",
    "tone": "#f1d2b0",
    "art": "<img src=\"assets/categories/history-portrait.webp?v=a6bb2cc04542\" width=\"650\" height=\"850\" alt=\"تاريخ\">"
  },
  {
    "id": 5,
    "name": "ثقافة عامة",
    "tone": "#e9dcb5",
    "art": "<img src=\"assets/categories/general-portrait.webp?v=3308e4dc3a4c\" width=\"650\" height=\"850\" alt=\"ثقافة عامة\">"
  },
  {
    "id": 6,
    "name": "لغة وأدب",
    "tone": "#d9c7e8",
    "art": "<img src=\"assets/categories/literature-portrait.webp?v=074102ecbbda\" width=\"650\" height=\"850\" alt=\"لغة وأدب\">"
  },
  {
    "id": 7,
    "name": "كرة القدم",
    "tone": "#f1d2b0",
    "art": "<img src=\"assets/categories/football-portrait.webp?v=61f80e556b65\" width=\"650\" height=\"850\" alt=\"كرة القدم\">"
  },
  {
    "id": 8,
    "name": "معالم ومدن",
    "tone": "#e9dcb5",
    "art": "<img src=\"assets/categories/landmarks-portrait.webp?v=6b51b074bb3b\" width=\"650\" height=\"850\" alt=\"معالم ومدن\">"
  },
  {
    "id": 9,
    "name": "أفلام ومسلسلات",
    "tone": "#d9c7e8",
    "art": "<img src=\"assets/categories/movies-portrait.webp?v=a86ee50c2a6d\" width=\"650\" height=\"850\" alt=\"أفلام ومسلسلات\">"
  },
  {
    "id": 10,
    "name": "وش اللوغو",
    "tone": "#d9c7e8",
    "art": "<img src=\"assets/categories/logo-cover-v2.webp\" width=\"640\" height=\"800\" alt=\"وش اللوغو\">"
  },
  {
    "id": 11,
    "name": "اسم الشخصية",
    "tone": "#f1d2b0",
    "art": "<img src=\"assets/categories/character-cover-v3.webp\" width=\"640\" height=\"800\" alt=\"اسم الشخصية\">"
  },
  {
    "id": 12,
    "name": "تحدي الصور",
    "tone": "#e9dcb5",
    "art": "<img src=\"assets/categories/picture-cover.webp\" width=\"640\" height=\"800\" alt=\"تحدي الصور\">"
  },
  {
    "id": 13,
    "name": "بلوت",
    "tone": "#f1d2b0",
    "art": "<img src=\"assets/categories/baloot-cover-v2.webp\" width=\"640\" height=\"800\" alt=\"بلوت\">"
  },
  {
    "id": 14,
    "name": "بوسترات رمضان",
    "tone": "#d9c7e8",
    "art": "<img src=\"assets/categories/ramadan-cover.webp\" width=\"640\" height=\"800\" alt=\"بوسترات رمضان\">"
  },
  {
    "id": 15,
    "name": "أعلام",
    "tone": "#e9dcb5",
    "art": "<img src=\"assets/categories/flags-cover.webp\" width=\"640\" height=\"800\" alt=\"أعلام\">"
  },
  {
    "id": 16,
    "name": "شعارات كروية",
    "tone": "#d9c7e8",
    "art": "<img src=\"assets/categories/football-crests.webp?v=3d1a6a776dae\" width=\"640\" height=\"800\" alt=\"شعارات كروية\">"
  },
  {
    "id": 17,
    "name": "جوازات سفر",
    "tone": "#d9c7e8",
    "art": "<img src=\"assets/categories/passports-final.webp?v=b462131a6a7c\" width=\"640\" height=\"800\" alt=\"جوازات سفر\">"
  },
  {
    "id": 18,
    "name": "وش الخطأ؟",
    "tone": "#fff0d3",
    "art": "<img src=\"assets/categories/spot-the-error-final.webp?v=2c8fa6175050\" width=\"640\" height=\"800\" alt=\"وش الخطأ؟\">"
  },
  {
    "id": 19,
    "name": "أتحداك تعرف اللون",
    "tone": "#fff0ce",
    "art": "<img src=\"assets/categories/guess-the-color-final.webp?v=a8a7dcdd0bea\" width=\"640\" height=\"800\" alt=\"أتحداك تعرف اللون\">"
  },
  {
    "id": 20,
    "name": "شخصيات سياسية",
    "tone": "#fff0d3",
    "art": "<img src=\"assets/categories/political-figures-fictional.webp?v=bd91dd543405\" width=\"640\" height=\"800\" alt=\"شخصيات سياسية\">"
  },
  {
    "id": 21,
    "name": "فوازير رمضان",
    "tone": "#fff0d3",
    "art": "<img src=\"assets/categories/ramadan-riddles-v2.webp?v=53cc6ea335f4\" width=\"640\" height=\"800\" alt=\"فوازير رمضان\">"
  },
  {
    "id": 22,
    "name": "لون العلم",
    "tone": "#fff0d3",
    "art": "<img src=\"assets/categories/flag-color-final.webp?v=47aee4d36b70\" width=\"640\" height=\"800\" alt=\"لون العلم\">"
  },
  {
    "id": 23,
    "name": "صوت المشهور",
    "tone": "#fff0d3",
    "art": "<img src=\"assets/categories/celebrity-voice-final.webp?v=2dfa1c0dc620\" width=\"640\" height=\"800\" alt=\"صوت المشهور\">"
  }
];
const aids=[['إجابتين','بعد السؤال','فرصتان للإجابة بدل إجابة واحدة.','✌'],['دبلها','قبل كشف الإجابة','ضاعف نقاط السؤال.','×٢'],['كلّم المطنوخ','بعد السؤال','دقيقة كاملة للاتصال وطلب المساعدة.','☎'],['بلوك','قبل كشف الإجابة','امنع الخصم من إجابة سؤال تختاره.','✋'],['تحايل','بعد السؤال','١٥ ثانية للبحث عن الإجابة من أي مكان.','☝']];let picks=[[],[]],selectedAids=new Set();
const categoryDescriptions = {
  'رياضة': ['أسئلة عن الرياضات المختلفة وأبرز نجومها.', 'تعرّف على البطولات والأرقام واللحظات الشهيرة.'],
  'حول العالم': ['سافر بين الدول والثقافات من شاشة التحدّي.', 'خمّن الأماكن والعادات من الأدلة.'],
  'علوم': ['اختبر معلوماتك عن الطبيعة والفضاء والاكتشافات.', 'جاوب عن ظواهر علمية من حياتنا اليومية.'],
  'تاريخ': ['ارجع لأحداث وشخصيات تركت أثرها.', 'اختبر ذاكرتك في ترتيب الأحداث ومعرفة أصحابها.'],
  'ثقافة عامة': ['أسئلة من مواضيع متنوعة في فئة واحدة.', 'كل سؤال يختبر معلومة من مجال مختلف.'],
  'لغة وأدب': ['تحدّوا معرفتكم بالكلمات والأمثال والنصوص.', 'خمّنوا المعاني أو تعرّفوا على أصحاب الأعمال.'],
  'كرة القدم': ['أسئلة عن اللاعبين والأندية والمنتخبات.', 'تذكّروا البطولات والأرقام الكروية الشهيرة.'],
  'معالم ومدن': ['تعرّفوا على معالم مشهورة ومدن من أنحاء العالم.', 'استخدموا تفاصيل الصورة أو الوصف لتحديد المكان.'],
  'أفلام ومسلسلات': ['استرجعوا أشهر الأعمال على الشاشة.', 'تعرّفوا على الفيلم أو المسلسل من مشهد أو تلميح.'],
  'وش اللوغو': ['قدّامك شعاران متشابهان وبينهما فرق بسيط.', 'ركّز على التفاصيل واختر الشعار الصحيح.'],
  'اسم الشخصية': ['تظهر لك شخصية من عمل معروف.', 'خمّن اسم الشخصية من ملامحها أو لبسها.'],
  'تحدي الصور': ['دقّق في الصورة وانتبه للتفاصيل الصغيرة.', 'خمّن الشيء أو المكان اللي تشير له الصورة.'],
  'بلوت': ['اختبر معرفتك بأوراق البلوت وقواعده.', 'تحدّ فريقك في المصطلحات ومواقف اللعب.'],
  'بوسترات رمضان': ['تعرّف على أعمال رمضان من بوستراتها.', 'ركّز على الألوان والوجوه لتخمّن اسم العمل.'],
  'أعلام': ['تعرّف على الدولة من شكل علمها.', 'لاحظ ترتيب الألوان والرموز قبل الإجابة.'],
  'شعارات كروية': ['خمّن النادي من شعاره.', 'انتبه للألوان والرموز اللي تميّز كل فريق.'],
  'جوازات سفر': ['جوازات من حول العالم! 🛂🌍', 'تعرّف على الدول من شكل جوازاتها وألوانها وتصاميمها، وشوف إذا تقدر تميّزها من أول نظرة.'],
  'وش الخطأ؟': ['معلومة غلط بين معلومات صحيحة! 🧠❌', 'اقرأ، ركّز، واكتشف الخطأ وصحّحه قبل ما ينكشف الجواب.'],
  'أتحداك تعرف اللون': ['لون واحد، وتحدي بسيط… أو يمكن مو بهالبساطة! 🎨👀', 'ركّز زين وحاول تحدد اللون الصحيح قبل ما ينكشف الجواب.'],
  'شخصيات سياسية': ['وجوه صنعت قرارات غيّرت مجرى الأحداث! 🌍🧠', 'تعرّف على أبرز الشخصيات السياسية حول العالم، من القادة والزعماء إلى الشخصيات المؤثرة في التاريخ والسياسة الحديثة.'],
  'فوازير رمضان': ['فوازير بطابع رمضاني.', 'ركّز في السؤال وتحدّ فريقك في معرفة الجواب.'],
  'لون العلم': ['شوف العلم وركّز بالمكان المشار إليه! 🎨🌍', 'هل تقدر تحدد اللون الصحيح قبل ما ينكشف الجواب؟'],
  'صوت المشهور': ['يحتوي على مقاطع صوتية للمشاهير.', 'ويعتمد على مدى معرفتك وتركيزك.']
};

const categoryInfoDialog = $('categoryInfoDialog');
categoryInfoDialog.addEventListener('click', event => {
  if (event.target !== categoryInfoDialog) return;
  const bounds = categoryInfoDialog.getBoundingClientRect();
  const outside = event.clientX < bounds.left || event.clientX > bounds.right ||
    event.clientY < bounds.top || event.clientY > bounds.bottom;
  if (outside) categoryInfoDialog.close();
});

function categoryInfoButton(name) {
  const info = document.createElement('button');
  info.type = 'button';
  info.className = 'category-info-button';
  info.textContent = '!';
  info.setAttribute('aria-label', 'عن فئة ' + name);
  info.setAttribute('aria-haspopup', 'dialog');
  info.addEventListener('click', () => {
    $('categoryInfoTitle').textContent = name;
    const lines = categoryDescriptions[name].map(line => {
      const paragraph = document.createElement('p');
      paragraph.textContent = line;
      return paragraph;
    });
    $('categoryInfoCopy').replaceChildren(...lines);
    categoryInfoDialog.showModal();
  });
  return info;
}

document.querySelectorAll('.category-peek-card').forEach(card => {
  const name = card.querySelector('h3').textContent;
  card.append(categoryInfoButton(name));
});

function render(){const total=picks[0].length+picks[1].length,team=picks[0].length<3?0:1,done=total===6,query=$('categorySearch').value.trim();$('selectionStatus').textContent=done?'اكتملت الفئات الست. جهّزوا الأسماء ووسائل المساعدة.':team===0?'دور الفريق الأول — فريق اليمين يختار ٣ فئات.':'دور الفريق الثاني — اختاروا ٣ فئات مختلفة.';document.querySelector('.team-pick-one').classList.toggle('is-turn',!done&&team===0);document.querySelector('.team-pick-two').classList.toggle('is-turn',!done&&team===1);
for(let t=0;t<2;t++){ $(t?'pickCountTwo':'pickCountOne').textContent=ar(picks[t].length)+' / ٣';const box=$(t?'picksTwo':'picksOne');box.replaceChildren();for(let i=0;i<3;i++){const chip=document.createElement('span');if(picks[t][i]!==undefined){const c=categories.find(category=>category.id===picks[t][i]);chip.innerHTML=c.art;chip.style.background=c.tone;chip.title=c.name;chip.setAttribute('aria-label',c.name)}else{chip.textContent='+';chip.setAttribute('aria-label','مكان فئة فارغ')}box.append(chip)}box.onclick=()=>{if(picks.flat().length===6)openNames()}}
const grid=$('setupCategories');grid.replaceChildren();for(const c of categories){if(query&&!c.name.includes(query))continue;const owner=picks[0].includes(c.id)?0:picks[1].includes(c.id)?1:-1;const button=document.createElement('button');button.type='button';button.className='setup-category'+(owner>=0?' selected team-'+owner:'');button.style.setProperty('--category-tone',c.tone);button.setAttribute('aria-pressed',String(owner>=0));button.setAttribute('aria-label',c.name+(owner>=0?' — اختارها الفريق '+(owner===0?'الأول':'الثاني'):''));button.disabled=done&&owner<0;const art=document.createElement('div');art.className='setup-category-art';art.innerHTML=c.art;const label=document.createElement('strong');label.textContent=c.name;button.append(art,label);if(owner>=0){const badge=document.createElement('span');badge.className='picked-badge';badge.textContent=owner===0?'الفريق الأول ✓':'الفريق الثاني ✓';button.append(badge)}button.onclick=()=>{const previous=picks.findIndex(ids=>ids.includes(c.id));if(previous>=0){picks[previous]=picks[previous].filter(id=>id!==c.id);render();return}if(picks.flat().length>=6)return;const t=picks[0].length<3?0:1;picks[t].push(c.id);render();if(picks.flat().length===6)openNames()};const card = document.createElement('div');
card.className = 'setup-category-frame';
card.append(button, categoryInfoButton(c.name));
grid.append(card);
}grid.classList.toggle('selection-complete',done);$('noCategoryResults').hidden=grid.children.length>0;}
function openNames(){const chips=$('chosenCategoryChips');chips.replaceChildren();for(const id of picks.flat()){const chip=document.createElement('span');chip.textContent=categories.find(category=>category.id===id).name;chips.append(chip)}if(!$('sessionSetupDialog').open)$('sessionSetupDialog').showModal()}
const aidArtwork=["<svg viewBox=\"0 0 80 84\" fill=\"#fff5df\" stroke=\"#2c1537\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m27 48-9-19q-2-6 3-7 4-1 6 4l8 15-2-27q0-6 5-6 4 0 5 5l2 23 4-22q1-6 6-4 4 1 3 6l-3 27 7-7q4-4 8 0 3 4-1 8L55 65v10H32V64L20 48q-4-6 1-8 4-1 8 5Z\"/></svg>", "<svg viewBox=\"0 0 80 84\" fill=\"#fff5df\" stroke=\"#2c1537\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M10 35h12v28H10Zm48 0h12v28H58ZM4 40h6v18H4Zm66 0h6v18h-6ZM22 44h36v10H22Z\"/><path d=\"m32 34 8-13 8 13M40 21v23\"/></svg>", "<svg viewBox=\"0 0 80 84\" fill=\"#fff5df\" stroke=\"#2c1537\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m27 55-10-8q-5-5-1-9 4-3 9 1l5 4-1-25q0-6 5-6t5 6v18l2-25q1-5 5-5 5 1 4 6l-1 24 5-22q1-5 5-4 5 1 3 7l-4 23 6-16q2-5 6-3 4 2 1 7l-10 29-9 10v10H29V64Z\"/></svg>", "<svg viewBox=\"0 0 80 84\" fill=\"#fff5df\" stroke=\"#2c1537\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M22 42V26q0-7 6-7 5 0 5 6v13-21q0-6 5-6t5 6v20-19q0-6 5-6t5 6v20-13q0-6 5-6t5 6v23q0 12-11 20v10H29V64L17 53q-6-7-1-10 4-3 10 4l7 5\"/></svg>", "<svg viewBox=\"0 0 80 84\" fill=\"#fff5df\" stroke=\"#2c1537\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M31 45V12q0-7 6-7t6 7v25l3-2q5-2 7 4 6-3 9 3 7 0 7 7v11l-12 10v8H31V65L18 52q-5-5-1-9 4-4 9 1l5 6Z\"/></svg>"];
window.BaynanaAidArtwork=aidArtwork;
function renderAids(){const root=$('setupAids');root.replaceChildren();aids.forEach((a,i)=>{const label=document.createElement('label');label.className='setup-aid';label.setAttribute('data-explanation',a[0]+' — '+a[1]+': '+a[2]);const input=document.createElement('input');input.type='checkbox';input.checked=selectedAids.has(i);input.disabled=selectedAids.size===3&&!input.checked;input.onchange=()=>{input.checked?selectedAids.add(i):selectedAids.delete(i);renderAids();const next=$('setupAids').children[i];if(next){next.classList.add('show-aid-tip');next.querySelector('input').focus()}};const icon=document.createElement('b');icon.innerHTML=aidArtwork[i];const name=document.createElement('strong');name.textContent=a[0];const when=document.createElement('small');when.textContent=a[1];const desc=document.createElement('span');desc.textContent=a[2];label.append(input,icon,name,when,desc);root.append(label)});$('aidCount').textContent=ar(selectedAids.size)+' / ٣'}
window.showBaynanaHistory = show => {
  $('selectionStatus').hidden = show;
  $('setupPageTitle').textContent = show ? 'ألعابي السابقة' : 'اختاروا ساحة التحدّي.';
  $('newGamePanel').hidden = show;
  $('previousGamesPanel').hidden = !show;
  $('newGameTab').setAttribute('aria-pressed', String(!show));
  $('previousGamesTab').setAttribute('aria-pressed', String(show));
  if (show) window.renderBaynanaHistory();
};
$('newGameTab').onclick = () => window.showBaynanaHistory(false);
$('previousGamesTab').onclick = () => window.showBaynanaHistory(true);
window.addEventListener('storage', event => {
  if (!$('previousGamesPanel').hidden &&
      (event.key === 'playerPhone' || event.key?.startsWith('baynana-history-v1:'))) {
    window.renderBaynanaHistory();
  }
});

window.openCategorySetup=({ fresh = false } = {})=>{
window.showBaynanaHistory(false);
if (fresh) {
  picks[0] = [];
  picks[1] = [];
  selectedAids.clear();
  $('categorySearch').value = '';
  $('sessionSetupForm').reset();
  $('sessionSetupError').textContent = '';
  renderAids();
}
$('landing').hidden=true;$('gamePreview').hidden=true;$('categorySetup').hidden=false;render();if(picks.flat().length===6)openNames();window.scrollTo({top:0,behavior:'instant'})};$('leaveSetup').onclick=()=>{$('categorySetup').hidden=true;$('landing').hidden=false;window.scrollTo({top:0,behavior:'instant'})};$('categorySearch').oninput=render;
$('sessionSetupForm').onsubmit=e=>{e.preventDefault();const a=$('sessionTeamOne').value.trim(),b=$('sessionTeamTwo').value.trim(),name=$('sessionGameName').value.trim();if(!a||!b||!name||a===b||selectedAids.size!==3){$('sessionSetupError').textContent='اكتب اسم اللعبة واسمين مختلفين للفريقين، واختر ٣ وسائل مساعدة.';return}$('sessionSetupError').textContent='';window.BaynanaSession={name,teams:[a,b],categories:picks.map(ids=>ids.map(id=>categories.find(category=>category.id===id).name)),aids:[...selectedAids].map(i=>aids[i][0])};$('sessionSetupDialog').close();$('categorySearch').value='';render();$('categorySetup').hidden=true;$('gamePreview').hidden=false;window.startBaynanaBoard(window.BaynanaSession);window.scrollTo({top:0,behavior:'instant'})};renderAids();render();})();

(()=>{const list=document.getElementById('aidShowcaseList');if(!list)return;const data=[{name:'إجابتين',when:'بعد السؤال',desc:'فرصتان للإجابة بدل إجابة واحدة.',tips:['عندما تكونون محتارين بين إجابتين.','عندما تحتاجون فرصة ثانية لحسم السؤال.']},{name:'دبلها',when:'قبل كشف الإجابة',desc:'ضاعف نقاط السؤال لفريقك.',tips:['عند اختيار فئة تثقون بمعرفتكم فيها.','عندما تحتاجون لتعويض فارق النقاط.']},{name:'كلّم المطنوخ',when:'بعد السؤال',desc:'دقيقة كاملة للاتصال بصديق وطلب المساعدة.',tips:['عندما يكون السؤال خارج معرفة الفريق.','إذا تعرفون شخصًا متمكنًا من موضوع السؤال.']},{name:'بلوك',when:'قبل كشف الإجابة',desc:'امنع الخصم من الإجابة على سؤال تختاره.',tips:['عند اختيار سؤال يتقنه الفريق المنافس.','عندما تحتاجون لحماية فرصة جمع النقاط.']},{name:'تحايل',when:'بعد السؤال',desc:'١٥ ثانية للبحث عن الإجابة من أي مكان.',tips:['عندما تحتاجون معلومة محددة بسرعة.','جهّزوا طريقة البحث قبل بدء الثواني.']}];function select(i){const item=data[i];document.getElementById('aidShowcaseName').textContent=item.name;document.getElementById('aidShowcaseIcon').innerHTML=window.BaynanaAidArtwork[i];const tips=document.getElementById('aidShowcaseTips');tips.replaceChildren(...item.tips.map(text=>{const li=document.createElement('li');li.textContent=text;return li}));[...list.children].forEach((button,j)=>button.setAttribute('aria-pressed',String(i===j)))}data.forEach((item,i)=>{const button=document.createElement('button');button.type='button';button.className='aid-showcase-option';button.setAttribute('aria-pressed','false');const icon=document.createElement('span');icon.className='aid-option-icon';icon.innerHTML=window.BaynanaAidArtwork[i];const body=document.createElement('span');body.className='aid-option-body';const top=document.createElement('span');top.className='aid-option-top';const name=document.createElement('strong');name.textContent=item.name;const badge=document.createElement('small');badge.textContent=item.when;top.append(name,badge);const desc=document.createElement('span');desc.className='aid-option-description';desc.textContent=item.desc;body.append(top,desc);button.append(icon,body);button.onclick=()=>select(i);button.addEventListener('pointerenter',()=>{if(matchMedia('(hover:hover)').matches)select(i)});button.addEventListener('focus',()=>select(i));list.append(button)});select(0)})();

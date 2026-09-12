import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js';
import { getDatabase, ref, set, get, update, onValue, remove, runTransaction, serverTimestamp } from 'https://www.gstatic.com/firebasejs/12.2.1/firebase-database.js';

const firebaseConfig={apiKey:'AIzaSyDOZNZp5F-t9AouL9xsthU3OiAyO_HQBBI',authDomain:'jawab-majhoo1.firebaseapp.com',databaseURL:'https://jawab-majhoo1-default-rtdb.europe-west1.firebasedatabase.app',projectId:'jawab-majhoo1',storageBucket:'jawab-majhoo1.firebasestorage.app',messagingSenderId:'314192717840',appId:'1:314192717840:web:688b94bbb5a8915098c295'};
const app=initializeApp(firebaseConfig),auth=getAuth(app),db=getDatabase(app);
const $=id=>document.getElementById(id); const screens=['home','howToScreen','nameScreen','lobby','game','finalScreen'];
let uid=null,roomCode=null,isHost=false,unsubRoom=null,joinMode='join',lastRoom=null,phaseTimer=null,selectedVoteKey=null,votePhaseKey='',voteUIReadyAt=0,answerPhaseKey='',interactionGuardUntil=0,selectedEmojiIndex=null,emojiRoomCode=null,unsubEmojiRoom=null;
const SESSION_KEY='jawabMajhoolSessionV1';
const AVATARS=[
  {name:'المحقق',body:'#ff684d',accent:'#ffd24a',face:'detective'},
  {name:'المقنّع',body:'#65d7ce',accent:'#171636',face:'mask'},
  {name:'العبقري',body:'#ffd24a',accent:'#ff684d',face:'glasses'},
  {name:'المشاغب',body:'#9d7bff',accent:'#ffd24a',face:'horns'},
  {name:'الهادئ',body:'#7ddc8a',accent:'#171636',face:'calm'},
  {name:'الفضولي',body:'#62a8ff',accent:'#fff4db',face:'wide'},
  {name:'المخادع',body:'#ff8bc2',accent:'#171636',face:'wink'},
  {name:'الشبح',body:'#fff4db',accent:'#ff684d',face:'ghost'},
  {name:'الروبوت',body:'#a7b0c0',accent:'#65d7ce',face:'robot'},
  {name:'المجهول',body:'#171636',accent:'#ff684d',face:'mystery'}
];
function avatarSvg(i,extra=''){
  const a=AVATARS[(Number(i)||0)%AVATARS.length];
  const skin=['#f2b58f','#d99368','#b86f4f','#f0bf9a','#cc8966'][i%5];
  const dark='#171636',cream='#fff4db';
  let hair='',face='',gear='';
  if(a.face==='detective'){
    hair=`<path d="M20 25c3-10 24-12 29 1-8-3-20-3-29-1z" fill="${dark}"/>`;
    gear=`<path d="M17 25h34l-5-8H25z" fill="${a.accent}" stroke="${dark}" stroke-width="2.4"/><path d="M13 25h42" stroke="${dark}" stroke-width="3.2" stroke-linecap="round"/>`;
    face=`<circle cx="28" cy="38" r="2.1"/><circle cx="40" cy="38" r="2.1"/><path d="M29 47c3 2 7 2 10 0" fill="none" stroke="${dark}" stroke-width="2.7" stroke-linecap="round"/><circle cx="28" cy="38" r="6" fill="none" stroke="${dark}" stroke-width="2.4"/><path d="M34 38h7" stroke="${dark}" stroke-width="2.4"/>`;
  }else if(a.face==='mask'){
    hair=`<path d="M20 28c2-12 25-13 29 0l-7-4-7 3-8-3z" fill="${dark}"/>`;
    gear=`<path d="M20 33c8-7 20-7 28 0l-4 11c-7 5-14 5-21 0z" fill="${a.accent}" stroke="${dark}" stroke-width="2.5"/>`;
    face=`<path d="M26 37h5M38 37h5" stroke="${cream}" stroke-width="3" stroke-linecap="round"/><path d="M31 49h7" stroke="${dark}" stroke-width="2.5" stroke-linecap="round"/>`;
  }else if(a.face==='glasses'){
    hair=`<path d="M19 28c4-14 28-14 31 0-9-5-21-5-31 0z" fill="${a.accent}" stroke="${dark}" stroke-width="2"/>`;
    gear=`<circle cx="27" cy="38" r="6.2" fill="none" stroke="${dark}" stroke-width="2.7"/><circle cx="41" cy="38" r="6.2" fill="none" stroke="${dark}" stroke-width="2.7"/><path d="M33 38h2" stroke="${dark}" stroke-width="2.7"/>`;
    face=`<circle cx="27" cy="38" r="1.6"/><circle cx="41" cy="38" r="1.6"/><path d="M30 48c3 2 6 2 9 0" fill="none" stroke="${dark}" stroke-width="2.6" stroke-linecap="round"/>`;
  }else if(a.face==='horns'){
    hair=`<path d="M20 28c2-11 26-13 29 1l-8-5-7 4-7-4z" fill="${dark}"/>`;
    gear=`<path d="M23 23l-7-10 12 5M45 23l7-10-12 5" fill="${a.accent}" stroke="${dark}" stroke-width="2.4"/>`;
    face=`<path d="M24 37l7 2M44 37l-7 2" stroke="${dark}" stroke-width="2.8" stroke-linecap="round"/><path d="M29 48c4 3 7 3 11 0" fill="none" stroke="${dark}" stroke-width="2.8" stroke-linecap="round"/>`;
  }else if(a.face==='calm'){
    hair=`<path d="M20 28c5-12 25-13 29 0-8-3-20-3-29 0z" fill="${dark}"/>`;
    face=`<path d="M24 39c2-2 5-2 7 0M37 39c2-2 5-2 7 0" fill="none" stroke="${dark}" stroke-width="2.8" stroke-linecap="round"/><path d="M30 48c3 1 6 1 9 0" fill="none" stroke="${dark}" stroke-width="2.6" stroke-linecap="round"/>`;
    gear=`<path d="M48 28c4 1 5 6 2 9" fill="none" stroke="${a.accent}" stroke-width="3" stroke-linecap="round"/>`;
  }else if(a.face==='wide'){
    hair=`<path d="M18 29c3-15 29-15 33 0l-9-6-8 4-8-4z" fill="${dark}"/>`;
    face=`<circle cx="27" cy="39" r="4.4" fill="#fff" stroke="${dark}" stroke-width="2.2"/><circle cx="41" cy="39" r="4.4" fill="#fff" stroke="${dark}" stroke-width="2.2"/><circle cx="28" cy="39" r="1.5"/><circle cx="40" cy="39" r="1.5"/><ellipse cx="34" cy="49" rx="3.7" ry="4.8" fill="${a.accent}" stroke="${dark}" stroke-width="2"/>`;
  }else if(a.face==='wink'){
    hair=`<path d="M19 29c5-13 27-13 31 0-10-5-20-3-31 0z" fill="${dark}"/>`;
    gear=`<path d="M47 26l5-4M48 31h5" stroke="${a.accent}" stroke-width="2.8" stroke-linecap="round"/>`;
    face=`<circle cx="27" cy="39" r="2.2"/><path d="M38 39c2-2 5-2 7 0" fill="none" stroke="${dark}" stroke-width="2.8" stroke-linecap="round"/><path d="M29 48c4 4 8 4 12 0" fill="none" stroke="${dark}" stroke-width="2.8" stroke-linecap="round"/>`;
  }else if(a.face==='ghost'){
    return `<span class="gameAvatar ${extra}" title="${a.name}"><svg viewBox="0 0 68 68" aria-hidden="true"><path d="M14 58V34c0-14 8-23 20-23s20 9 20 23v24l-7-5-6 5-7-5-7 5-6-5z" fill="${a.body}" stroke="${dark}" stroke-width="3" stroke-linejoin="round"/><circle cx="27" cy="35" r="2.5"/><circle cx="41" cy="35" r="2.5"/><ellipse cx="34" cy="46" rx="4" ry="5.5" fill="${a.accent}" stroke="${dark}" stroke-width="2"/></svg></span>`;
  }else if(a.face==='robot'){
    return `<span class="gameAvatar ${extra}" title="${a.name}"><svg viewBox="0 0 68 68" aria-hidden="true"><path d="M34 13v8" stroke="${dark}" stroke-width="3"/><circle cx="34" cy="11" r="3.5" fill="${a.accent}" stroke="${dark}" stroke-width="2"/><rect x="15" y="20" width="38" height="38" rx="11" fill="${a.body}" stroke="${dark}" stroke-width="3"/><path d="M20 31h28v18H20z" fill="#eef2f6" stroke="${dark}" stroke-width="2"/><circle cx="28" cy="39" r="3" fill="${a.accent}"/><circle cx="40" cy="39" r="3" fill="${a.accent}"/><path d="M28 46h12" stroke="${dark}" stroke-width="2.5" stroke-linecap="round"/><path d="M15 32h-5v13h5M53 32h5v13h-5" fill="${a.accent}" stroke="${dark}" stroke-width="2"/></svg></span>`;
  }else{
    hair=`<path d="M19 28c3-13 27-14 31 0l-8-5-8 4-8-4z" fill="#0d0c22"/>`;
    gear=`<path d="M18 33c10-8 23-8 32 0v17c-10 7-22 7-32 0z" fill="${dark}" opacity=".96"/><text x="34" y="47" text-anchor="middle" font-size="18" font-weight="900" fill="${a.accent}">?</text>`;
    face='';
  }
  return `<span class="gameAvatar ${extra}" title="${a.name}"><svg viewBox="0 0 68 68" aria-hidden="true"><path d="M15 58c1-11 8-17 19-17s18 6 19 17" fill="${a.body}" stroke="${dark}" stroke-width="3" stroke-linecap="round"/><circle cx="34" cy="36" r="18" fill="${skin}" stroke="${dark}" stroke-width="3"/>${hair}${gear}${face}<path d="M23 57c3-7 19-7 22 0" fill="${a.body}" stroke="${dark}" stroke-width="3" stroke-linecap="round"/></svg></span>`;
}
let pendingSession=null,booted=false;
const QUESTIONS=[
 {text:'ما اسم هذه الدولة؟',answer:'دومينيكا',accepted:['دومينيكا','dominica'],image:'1'},
 {text:'كم عدد أجزاء رزدنت إيفل، شامل الأجزاء الفرعية والأساسية والريميك؟',answer:'31',accepted:['31','٣١']},
 {text:'الدماغ البشري يستهلك حوالي ٪---- من طاقة الجسم.',answer:'20٪',accepted:['20٪','20%','٢٠٪','٢٠%','20','٢٠']}
];

function renderQuestionMedia(room){
  const box=$('questionMedia');
  if(!box)return;
  const imageId=room.questionImage;
  if(!imageId){box.innerHTML='';box.classList.add('hidden');return}
  const candidates=['png','jpg','jpeg','webp'];
  let i=0;
  const img=document.createElement('img');
  img.alt=`صورة السؤال ${imageId}`;
  img.className='questionImage';
  img.onload=()=>box.classList.remove('hidden');
  img.onerror=()=>{i++;if(i<candidates.length)img.src=`assets/questions/${imageId}.${candidates[i]}`;else{box.innerHTML='';box.classList.add('hidden')}};
  box.innerHTML='';box.classList.add('hidden');box.appendChild(img);
  img.src=`assets/questions/${imageId}.${candidates[0]}`;
}


/* التوب 12 — مؤثرات صوتية خفيفة مولدة داخل المتصفح (بدون ملفات خارجية) */
let audioCtx=null,lastFxPhaseKey='',lastFxPlayerCount=null,currentScreenId='';
function ensureAudio(){
  try{if(!audioCtx)audioCtx=new (window.AudioContext||window.webkitAudioContext)();if(audioCtx.state==='suspended')audioCtx.resume()}catch{}
}
function tone(freq=440,duration=.08,type='sine',gain=.035,delay=0){
  ensureAudio();if(!audioCtx)return;
  const t=audioCtx.currentTime+delay,o=audioCtx.createOscillator(),g=audioCtx.createGain();
  o.type=type;o.frequency.setValueAtTime(freq,t);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(gain,t+.012);g.gain.exponentialRampToValueAtTime(.0001,t+duration);
  o.connect(g);g.connect(audioCtx.destination);o.start(t);o.stop(t+duration+.02);
}
function sfx(kind='tap'){
  if(kind==='tap'){tone(520,.055,'sine',.022);tone(700,.045,'sine',.012,.025)}
  else if(kind==='join'){tone(420,.08,'triangle',.028);tone(620,.09,'triangle',.025,.065)}
  else if(kind==='start'){tone(330,.08,'triangle',.03);tone(495,.09,'triangle',.03,.07);tone(660,.12,'triangle',.035,.14)}
  else if(kind==='send'){tone(640,.06,'sine',.025);tone(820,.08,'sine',.02,.045)}
  else if(kind==='select'){tone(760,.055,'triangle',.022)}
  else if(kind==='phase'){tone(300,.07,'sine',.018);tone(520,.09,'sine',.025,.055)}
  else if(kind==='result'){tone(523,.1,'triangle',.03);tone(659,.11,'triangle',.03,.08);tone(784,.16,'triangle',.035,.16)}
  else if(kind==='win'){tone(392,.12,'triangle',.035);tone(523,.14,'triangle',.04,.10);tone(659,.16,'triangle',.045,.22);tone(784,.28,'triangle',.05,.36)}
  else if(kind==='error'){tone(180,.09,'sawtooth',.018);tone(145,.13,'sawtooth',.014,.07)}
}
function visualPop(el){if(!el)return;el.classList.remove('fx-pop');void el.offsetWidth;el.classList.add('fx-pop');setTimeout(()=>el.classList.remove('fx-pop'),320)}
window.addEventListener('pointerdown',ensureAudio,{once:true});
document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b||b.disabled)return;sfx('tap')});

function show(id){
  const changed=currentScreenId!==id;
  screens.forEach(s=>$(s).classList.toggle('hidden',s!==id));
  $('leaveBtn').classList.toggle('hidden',id==='home'||id==='nameScreen'||id==='howToScreen');
  if(changed){
    const el=$(id);
    document.querySelectorAll('.screen.entering').forEach(x=>x.classList.remove('entering'));
    if(el){void el.offsetWidth;el.classList.add('entering');setTimeout(()=>el.classList.remove('entering'),1150)}
    currentScreenId=id;
  }
}
function toast(t){$('toast').textContent=t;$('toast').classList.remove('hidden');setTimeout(()=>$('toast').classList.add('hidden'),2200)}
function esc(s=''){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':'&quot;',"'":"&#39;"}[m]))}
function norm(s=''){return String(s).trim().toLowerCase().normalize('NFD').replace(/[\u064B-\u065F\u0670]/g,'').replace(/[أإآ]/g,'ا').replace(/ى/g,'ي').replace(/ة/g,'ه').replace(/ؤ/g,'و').replace(/ئ/g,'ي').replace(/[^\p{L}\p{N}\s]/gu,'').replace(/\s+/g,' ')}
function correct(q,t){return [q.answer,...q.accepted].some(a=>norm(a)===norm(t))}
function code(){const c='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';return Array.from({length:5},()=>c[Math.floor(Math.random()*c.length)]).join('')}
function shuffle(a){return [...a].sort(()=>Math.random()-.5)}
async function ensureAuth(){if(auth.currentUser){uid=auth.currentUser.uid;return} await signInAnonymously(auth);uid=auth.currentUser.uid}
function saveSession(name=''){localStorage.setItem(SESSION_KEY,JSON.stringify({roomCode,isHost,name,uid,savedAt:Date.now()}))}
function clearSession(){localStorage.removeItem(SESSION_KEY);pendingSession=null}
function readSession(){try{return JSON.parse(localStorage.getItem(SESSION_KEY)||'null')}catch{return null}}
function renderEmojiPicker(room=null){
  const claims=room?.emojiClaims||{};
  const playerCount=Object.keys(room?.players||{}).length;
  // أول 10 لاعبين: كل شخصية تكون حصرية. من اللاعب 11 وما بعده نسمح بتكرار الشخصيات.
  const repeatsAllowed=playerCount>=AVATARS.length;
  $('emojiPicker').innerHTML=AVATARS.map((avatar,i)=>{
    const owner=claims[i];
    const mine=selectedEmojiIndex===i;
    const locked=!repeatsAllowed&&!!owner&&owner!==uid;
    return `<button type="button" class="emojiChoice ${mine?'selected':''} ${locked?'taken':''}" data-emoji-index="${i}" ${locked?'disabled':''} aria-label="${locked?'الشخصية محجوزة':`اختيار شخصية ${avatar.name}`}">${avatarSvg(i)}<span class="avatarName">${avatar.name}</span></button>`;
  }).join('');
  $('emojiHint').textContent=selectedEmojiIndex===null?(repeatsAllowed?'اختر شخصيتك — التكرار متاح الآن':'اختر شخصية واحدة'):`اختيارك: ${AVATARS[selectedEmojiIndex].name}`;
  document.querySelectorAll('.emojiChoice:not(.taken)').forEach(btn=>btn.onclick=()=>selectEmoji(Number(btn.dataset.emojiIndex)));
}
function stopEmojiWatch(){if(unsubEmojiRoom){unsubEmojiRoom();unsubEmojiRoom=null}emojiRoomCode=null}
async function releaseEmojiClaim(){
  if(joinMode!=='join'||selectedEmojiIndex===null||!emojiRoomCode||!uid)return;
  const claimRef=ref(db,`rooms/${emojiRoomCode}/emojiClaims/${selectedEmojiIndex}`);
  const snap=await get(claimRef);if(snap.val()===uid)await remove(claimRef);
}
async function watchEmojiRoom(c){
  c=(c||'').trim().toUpperCase();if(c.length!==5){stopEmojiWatch();renderEmojiPicker();return}
  if(emojiRoomCode===c&&unsubEmojiRoom)return;
  if(emojiRoomCode&&emojiRoomCode!==c){await releaseEmojiClaim();selectedEmojiIndex=null;stopEmojiWatch()}
  emojiRoomCode=c;
  unsubEmojiRoom=onValue(ref(db,`rooms/${c}`),snap=>renderEmojiPicker(snap.exists()?snap.val():null));
}
async function selectEmoji(i){
  await ensureAuth();
  if(joinMode==='create'){selectedEmojiIndex=i;renderEmojiPicker();return}
  const c=$('codeInput').value.trim().toUpperCase();
  if(c.length!==5)return toast('اكتب رقم الجلسة أول');
  const roomSnap=await get(ref(db,`rooms/${c}`));
  if(!roomSnap.exists())return toast('الغرفة غير موجودة');
  const room=roomSnap.val();
  if(room.phase!=='lobby')return toast('اللعبة بدأت بالفعل');
  const repeatsAllowed=Object.keys(room.players||{}).length>=AVATARS.length;
  const old=selectedEmojiIndex;
  if(repeatsAllowed){
    // بعد امتلاء الشخصيات العشر لا نحجز الشخصية حصريًا؛ يسمح بتكرارها.
    selectedEmojiIndex=i;emojiRoomCode=c;
    if(old!==null&&old!==i){const oldRef=ref(db,`rooms/${c}/emojiClaims/${old}`);const oldSnap=await get(oldRef);if(oldSnap.val()===uid)await remove(oldRef)}
  }else{
    const claimRef=ref(db,`rooms/${c}/emojiClaims/${i}`);
    const tx=await runTransaction(claimRef,current=>(!current||current===uid)?uid:undefined);
    if(!tx.committed)return toast('هذه الشخصية اختارها لاعب قبلك');
    selectedEmojiIndex=i;emojiRoomCode=c;
    if(old!==null&&old!==i){const oldRef=ref(db,`rooms/${c}/emojiClaims/${old}`);const oldSnap=await get(oldRef);if(oldSnap.val()===uid)await remove(oldRef)}
  }
  await watchEmojiRoom(c);renderEmojiPicker((await get(ref(db,`rooms/${c}`))).val());
}

async function openCreate(){await releaseEmojiClaim();stopEmojiWatch();joinMode='create';selectedEmojiIndex=null;$('nameTitle').textContent='اسم المضيف';$('codeInput').classList.add('hidden');$('codeInput').readOnly=false;$('codeInput').disabled=false;$('codeInput').classList.remove('lockedCode');$('confirmJoinBtn').textContent='إنشاء الغرفة';$('nameInput').value='';renderEmojiPicker();show('nameScreen')}
async function openJoin(){await releaseEmojiClaim();stopEmojiWatch();joinMode='join';selectedEmojiIndex=null;$('nameTitle').textContent='دخول الجلسة';$('codeInput').classList.remove('hidden');$('confirmJoinBtn').textContent='دخول';$('nameInput').value='';const linkedRoom=(new URL(location.href).searchParams.get('room')||'').toUpperCase();$('codeInput').value=linkedRoom;$('codeInput').readOnly=!!linkedRoom;$('codeInput').disabled=!!linkedRoom;$('codeInput').classList.toggle('lockedCode',!!linkedRoom);$('codeInput').placeholder='رقم الجلسة';$('codeInput').setAttribute('aria-label','رقم الجلسة');renderEmojiPicker();show('nameScreen');if(linkedRoom)await watchEmojiRoom(linkedRoom)}
async function offerExistingSession(){
  const session=readSession(); if(!session?.roomCode||session.uid!==uid)return false;
  const snap=await get(ref(db,`rooms/${session.roomCode}`));
  if(!snap.exists()||!snap.val().players?.[uid]){clearSession();return false}
  pendingSession={session,room:snap.val()};
  const role=snap.val().hostId===uid?'المضيف':'لاعب';
  $('sessionModalText').textContent=`عندك جلسة ${role} في الغرفة ${session.roomCode}. هل تريد الرجوع لها؟`;
  $('sessionModal').classList.remove('hidden'); return true;
}
function watchRoom(c){if(unsubRoom)unsubRoom();unsubRoom=onValue(ref(db,`rooms/${c}`),s=>{if(!s.exists()){toast('الغرفة أغلقت');setTimeout(()=>location.href=location.pathname,900);return} renderRoom(s.val())})}

$('createBtn').onclick=openCreate;
$('joinOpenBtn').onclick=openJoin;
let howStep=0;
function renderHowTo(){
  document.querySelectorAll('.howCard').forEach((card,i)=>card.classList.toggle('active',i===howStep));
  document.querySelectorAll('.howDot').forEach((dot,i)=>dot.classList.toggle('active',i===howStep));
  $('howPrevBtn').classList.toggle('hidden',howStep===0);
  $('howNextBtn').classList.toggle('hidden',howStep===3);
  $('howPlayBtn').classList.toggle('hidden',howStep!==3);
}
$('howToBtn').onclick=()=>{howStep=0;renderHowTo();show('howToScreen')};
$('howToBackBtn').onclick=()=>show('home');
$('howPrevBtn').onclick=()=>{if(howStep>0){howStep--;renderHowTo()}};
$('howNextBtn').onclick=()=>{if(howStep<3){howStep++;renderHowTo()}};
$('howPlayBtn').onclick=()=>show('home');
$('homeExitBtn').onclick=()=>{$('homeExitModal').classList.remove('hidden')};
$('cancelHomeExitBtn').onclick=()=>{$('homeExitModal').classList.add('hidden')};
$('confirmHomeExitBtn').onclick=()=>{location.href='https://zamn.games/'};
$('homeExitModal').addEventListener('click',e=>{if(e.target===$('homeExitModal'))$('homeExitModal').classList.add('hidden')});
$('nameBackBtn').onclick=async()=>{await releaseEmojiClaim();stopEmojiWatch();selectedEmojiIndex=null;show('home')};
$('codeInput').addEventListener('input',async()=>{if(joinMode!=='join'||$('codeInput').readOnly)return;const c=$('codeInput').value.trim().toUpperCase();$('codeInput').value=c;if(c.length===5)await watchEmojiRoom(c);else{await releaseEmojiClaim();selectedEmojiIndex=null;stopEmojiWatch();renderEmojiPicker()}});
$('confirmJoinBtn').onclick=async()=>{try{await ensureAuth();const name=$('nameInput').value.trim().slice(0,20);if(!name)return toast('اكتب اسمك');if(selectedEmojiIndex===null)return toast('اختر شخصيتك');if(joinMode==='create'){let c=code();while((await get(ref(db,`rooms/${c}`))).exists())c=code();roomCode=c;isHost=true;await set(ref(db,`rooms/${c}`),{code:c,hostId:uid,phase:'lobby',questionIndex:0,emojiClaims:{[selectedEmojiIndex]:uid},players:{[uid]:{name,avatarIndex:selectedEmojiIndex,emojiIndex:selectedEmojiIndex,score:0,host:true,submitted:false}}});saveSession(name);stopEmojiWatch();setQR();watchRoom(c);show('lobby')}else{const c=$('codeInput').value.trim().toUpperCase();const snap=await get(ref(db,`rooms/${c}`));if(!snap.exists())return toast('الغرفة غير موجودة');if(snap.val().phase!=='lobby')return toast('اللعبة بدأت بالفعل');const joiningRoom=snap.val();const repeatsAllowed=Object.keys(joiningRoom.players||{}).length>=AVATARS.length;if(!repeatsAllowed){const claimSnap=await get(ref(db,`rooms/${c}/emojiClaims/${selectedEmojiIndex}`));if(claimSnap.val()!==uid){selectedEmojiIndex=null;renderEmojiPicker(joiningRoom);return toast('اختر شخصية متاحة')}}roomCode=c;isHost=false;await set(ref(db,`rooms/${c}/players/${uid}`),{name,avatarIndex:selectedEmojiIndex,emojiIndex:selectedEmojiIndex,score:0,host:false,submitted:false});saveSession(name);stopEmojiWatch();watchRoom(c);show('lobby')}}catch(e){console.error(e);toast('تعذر الاتصال بـ Firebase — راجع Rules')}};
function setQR(){const url=`${location.origin}${location.pathname}?room=${roomCode}`;$('qrImg').innerHTML='';new QRCode($('qrImg'),{text:url,width:240,height:240,correctLevel:QRCode.CorrectLevel.M})}
$('copyBtn').onclick=async()=>{const url=`${location.origin}${location.pathname}?room=${roomCode}`;const text=`قاعدين نلعب الجواب المجهول حياك\n${url}`;try{if(navigator.share){await navigator.share({title:'الجواب المجهول',text:'قاعدين نلعب الجواب المجهول حياك',url});toast('تم فتح المشاركة')}else{await navigator.clipboard.writeText(text);toast('تم نسخ الدعوة')}}catch(e){if(e?.name==='AbortError')return;try{await navigator.clipboard.writeText(text);toast('تم نسخ الدعوة')}catch{toast('تعذر مشاركة الرابط')}}};
$('startBtn').onclick=async()=>{if(!isHost)return;sfx('start');const players=lastRoom?.players||{};if(Object.keys(players).length<2)return toast('الحد الأدنى لاعبين');await startRound(lastRoom.questionIndex||0)};
async function startRound(i){const q=QUESTIONS[i%QUESTIONS.length];const p=lastRoom.players||{};const changes={phase:'answer',phaseStartedAt:Date.now(),questionIndex:i,questionText:q.text,questionImage:q.image||null,answerKey:q.answer,accepted:q.accepted,answers:null,options:null,votes:null,results:null};Object.keys(p).forEach(id=>changes[`players/${id}/submitted`]=false);await update(ref(db,`rooms/${roomCode}`),changes)}
$('submitAnswerBtn').onclick=async(e)=>{e?.preventDefault();interactionGuardUntil=Date.now()+1200;$('submitAnswerBtn').blur();$('answerInput').blur();const text=$('answerInput').value.trim().slice(0,60);if(!text)return toast('اكتب إجابة');const q={answer:lastRoom.answerKey,accepted:lastRoom.accepted||[]};const isRight=correct(q,text);await set(ref(db,`rooms/${roomCode}/answers/${uid}`),{text,correct:isRight});await update(ref(db,`rooms/${roomCode}/players/${uid}`),{submitted:true});sfx('send');visualPop($('waiting'));toast(isRight?'الإجابة الصحيحة لا تُحسب كفخ — ستدخل التصويت مع الجميع':'تم تثبيت إجابتك');await maybeBuildOptions()};
async function maybeBuildOptions(force=false){if(!isHost)return;const s=(await get(ref(db,`rooms/${roomCode}`))).val();if(!s||s.phase!=='answer')return;const ids=Object.keys(s.players||{}),ans=s.answers||{};if(!force&&ids.some(id=>!ans[id]))return;
  // الإجابة الصحيحة خيار واحد ثابت. الفخاخ الخاطئة المتطابقة تُعرض مرة واحدة،
  // لكن نحفظ كل أصحابها لكي يحصل كل واحد منهم على نقطة عند وقوع لاعب فيها.
  const grouped=new Map();
  for(const [id,a] of Object.entries(ans)){
    if(a.correct)continue;
    const n=norm(a.text);if(!n)continue;
    if(!grouped.has(n))grouped.set(n,{id:`trap_${grouped.size}`,text:a.text,ownerIds:[],correct:false});
    grouped.get(n).ownerIds.push(id);
  }
  const opts=[{id:'correct',text:s.answerKey,ownerIds:[],correct:true},...grouped.values()];
  const options={};shuffle(opts).forEach((o,i)=>options[`o${i}`]=o);
  const changes={phase:'vote',phaseStartedAt:Date.now(),options,votes:null};ids.forEach(id=>changes[`players/${id}/submitted`]=false);await update(ref(db,`rooms/${roomCode}`),changes)}
async function submitVote(optionKey){sfx('send');const o=lastRoom.options?.[optionKey];if(!o||(o.ownerIds||[]).includes(uid))return;selectedVoteKey=null;$('confirmVoteBtn').disabled=true;await set(ref(db,`rooms/${roomCode}/votes/${uid}`),optionKey);await update(ref(db,`rooms/${roomCode}/players/${uid}`),{submitted:true});await maybeFinish()}
async function maybeFinish(force=false){if(!isHost)return;const s=(await get(ref(db,`rooms/${roomCode}`))).val();if(!s||s.phase!=='vote')return;const eligible=Object.keys(s.players||{});if(!force&&eligible.some(id=>!s.votes?.[id]))return;const gain={};Object.keys(s.players).forEach(id=>gain[id]=0);
  // كتابة الإجابة الصحيحة في مرحلة الفخ لا تمنح أي نقطة، وتُخفى من الفخاخ فقط. الجميع يشارك في التصويت.
  for(const [voter,k] of Object.entries(s.votes||{})){
    const o=s.options?.[k];if(!o)continue;
    if(o.correct){gain[voter]++;continue}
    for(const ownerId of (o.ownerIds||[]))if(ownerId!==voter)gain[ownerId]=(gain[ownerId]||0)+1;
  }
  const changes={phase:'results',phaseStartedAt:Date.now(),results:{answer:s.answerKey,roundGain:gain}};for(const id of Object.keys(s.players))changes[`players/${id}/score`]=(s.players[id].score||0)+(gain[id]||0);await update(ref(db,`rooms/${roomCode}`),changes)}
$('nextBtn').onclick=async()=>{if(!isHost)return;await update(ref(db,`rooms/${roomCode}`),{phase:'final',phaseStartedAt:Date.now()})};
$('leaveBtn').onclick=async()=>{if(roomCode&&uid){if(isHost)await remove(ref(db,`rooms/${roomCode}`));else{const idx=lastRoom?.players?.[uid]?.emojiIndex;await remove(ref(db,`rooms/${roomCode}/players/${uid}`));if(idx!==undefined&&idx!==null){const cr=ref(db,`rooms/${roomCode}/emojiClaims/${idx}`);const cs=await get(cr);if(cs.val()===uid)await remove(cr)}}}clearSession();location.href=location.pathname};
function stopPhaseTimer(){if(phaseTimer){clearInterval(phaseTimer);phaseTimer=null}$('timer').classList.add('hidden')}
function startPhaseTimer(room){
  if(!['answer','vote'].includes(room.phase)||!room.phaseStartedAt){stopPhaseTimer();return}
  if(phaseTimer)clearInterval(phaseTimer);
  $('timer').classList.remove('hidden');
  const duration=15000;
  const tick=async()=>{
    const left=Math.max(0,duration-(Date.now()-Number(room.phaseStartedAt)));
    const sec=Math.ceil(left/1000);
    $('timerNum').textContent=sec;
    $('timerFill').style.width=`${Math.max(0,left/duration*100)}%`;
    if(left<=0){
      clearInterval(phaseTimer);phaseTimer=null;
      if(isHost){
        if(room.phase==='answer')await maybeBuildOptions(true);
        else if(room.phase==='vote')await maybeFinish(true);
      }
    }
  };
  tick();phaseTimer=setInterval(tick,200);
}
$('confirmVoteBtn').onclick=()=>{if(selectedVoteKey)submitVote(selectedVoteKey)};

let lastFinalFxKey='';
function renderFinal(room,players){
  const ranked=[...players].sort((a,b)=>(b.score||0)-(a.score||0)||a.name.localeCompare(b.name,'ar'));
  const winner=ranked[0]||{name:'الفائز',score:0,avatarIndex:0};
  const top3=ranked.slice(0,3);
  const order=[top3[1],top3[0],top3[2]].filter(Boolean);
  const places={};top3.forEach((p,i)=>places[p.id]=i+1);
  $('championName').textContent=winner.name;
  $('championScore').textContent=`${winner.score||0} نقطة`;
  $('championAvatar').innerHTML=avatarSvg(winner.avatarIndex??winner.emojiIndex??0,'championAvatarSvg');
  $('podium').innerHTML=order.map(p=>{const place=places[p.id];return `<div class="podiumPlayer place${place}"><div class="podiumAvatar">${avatarSvg(p.avatarIndex??p.emojiIndex??0,'podiumAvatarSvg')}</div><div class="podiumName">${esc(p.name)}</div><div class="podiumScore">${p.score||0} نقطة</div><div class="podiumBlock"><span>${place}</span></div></div>`}).join('');
  $('finalAllScores').innerHTML=ranked.map((p,i)=>`<div class="finalScoreRow ${i===0?'winnerRow':''}"><span>${i+1}</span><span class="finalScoreIdentity">${avatarSvg(p.avatarIndex??p.emojiIndex??0,'finalMiniAvatar')}${esc(p.name)}</span><b>${p.score||0}</b></div>`).join('');
  const fxKey=`${room.code}:${room.phaseStartedAt||0}`;
  if(lastFinalFxKey!==fxKey){lastFinalFxKey=fxKey;runFinalCelebration()}
}
function runFinalCelebration(){
  const layer=$('confettiLayer');
  layer.innerHTML='';
  const colors=['#ff684d','#ffd24a','#65d7ce','#9d7bff','#fff4db'];
  for(let i=0;i<46;i++){
    const bit=document.createElement('i');
    bit.style.left=`${Math.random()*100}%`;
    bit.style.background=colors[i%colors.length];
    bit.style.animationDelay=`${Math.random()*.7}s`;
    bit.style.animationDuration=`${2.2+Math.random()*1.4}s`;
    bit.style.transform=`rotate(${Math.random()*180}deg)`;
    layer.appendChild(bit);
  }
  setTimeout(()=>{layer.innerHTML=''},4200);
}

function renderRoom(room){const fxPhaseKey=`${room.questionIndex??0}:${room.phase}:${room.phaseStartedAt??0}`;if(lastFxPhaseKey&&fxPhaseKey!==lastFxPhaseKey){sfx(room.phase==='final'?'win':room.phase==='results'?'result':room.phase==='answer'?'start':'phase')}lastFxPhaseKey=fxPhaseKey;lastRoom=room;startPhaseTimer(room);isHost=room.hostId===uid;const players=Object.entries(room.players||{}).map(([id,p])=>({id,...p}));if(lastFxPlayerCount!==null&&room.phase==='lobby'&&players.length>lastFxPlayerCount)sfx('join');lastFxPlayerCount=players.length;$('roomCode').textContent=room.code;$('countBadge').textContent=players.length;$('players').innerHTML=players.map(p=>`<div class="player"><span class="playerIdentity">${avatarSvg(p.avatarIndex??p.emojiIndex??0,'playerAvatar')}<span>${esc(p.name)}${p.host?' 👑':''}</span></span><b>${p.score||0}</b></div>`).join('');document.querySelectorAll('.hostOnlyInvite').forEach(el=>el.classList.toggle('hidden',!isHost));$('startBtn').classList.toggle('hidden',!(isHost&&room.phase==='lobby'));if(isHost&&room.phase==='lobby')setQR();if(room.phase==='lobby'){show('lobby');return}if(room.phase==='final'){show('finalScreen');renderFinal(room,players);return}show('game');renderGame(room,players);if(isHost&&room.phase==='answer')maybeBuildOptions();if(isHost&&room.phase==='vote')maybeFinish()}
function renderGame(room,players){$('scoreStrip').innerHTML=[...players].sort((a,b)=>(b.score||0)-(a.score||0)).map(p=>`<div class="score">${avatarSvg(p.avatarIndex??p.emojiIndex??0,'scoreAvatar')}${esc(p.name)} · ${p.score||0}</div>`).join('');$('questionText').textContent=room.questionText||'';renderQuestionMedia(room);['answerArea','voteArea','waiting','resultsArea'].forEach(x=>$(x).classList.add('hidden'));$('nextBtn').classList.add('hidden');const me=room.players?.[uid];const myAnswer=room.answers?.[uid]||null;const myVote=room.votes?.[uid]||null;if(room.phase==='answer'){votePhaseKey='';selectedVoteKey=null;const currentAnswerPhase=`${room.questionIndex}:${room.phaseStartedAt}`;if(answerPhaseKey!==currentAnswerPhase){answerPhaseKey=currentAnswerPhase;$('answerInput').value='';interactionGuardUntil=Date.now()+500}$('phaseLabel').textContent='اكتب إجابة مقنعة';if(myAnswer){$('waiting').textContent='تم إرسال إجابتك… ننتظر البقية';$('waiting').classList.remove('hidden')}else{$('answerArea').classList.remove('hidden')}}if(room.phase==='vote'){$('phaseLabel').textContent='اختر الإجابة الصحيحة';if(myVote){$('waiting').textContent='تم تأكيد اختيارك… ننتظر البقية';$('waiting').classList.remove('hidden')}else{$('voteArea').classList.remove('hidden');const currentVotePhase=`${room.questionIndex}:${room.phaseStartedAt}`;if(votePhaseKey!==currentVotePhase){votePhaseKey=currentVotePhase;selectedVoteKey=null;voteUIReadyAt=Math.max(Date.now()+1000,interactionGuardUntil)}$('options').innerHTML=Object.entries(room.options||{}).map(([k,o])=>`<button class="option ${(o.ownerIds||[]).includes(uid)?'mine':''} ${selectedVoteKey===k?'selected':''}" data-k="${k}" ${(o.ownerIds||[]).includes(uid)?'disabled':''}>${esc(o.text)}</button>`).join('');$('confirmVoteBtn').disabled=!selectedVoteKey;document.querySelectorAll('.option:not(.mine)').forEach(b=>{let armed=false;b.onpointerdown=(e)=>{if(Date.now()<voteUIReadyAt){armed=false;return}armed=true};b.onpointerup=(e)=>{e.preventDefault();if(!armed||Date.now()<voteUIReadyAt)return;armed=false;selectedVoteKey=b.dataset.k;sfx('select');visualPop(b);document.querySelectorAll('.option').forEach(x=>x.classList.remove('selected'));b.classList.add('selected');$('confirmVoteBtn').disabled=false};b.onpointercancel=()=>{armed=false};b.onclick=(e)=>e.preventDefault()})}}if(room.phase==='results'){votePhaseKey='';selectedVoteKey=null;$('phaseLabel').textContent='نتائج الجولة';$('resultsArea').classList.remove('hidden');const g=room.results?.roundGain||{};const names=Object.fromEntries(players.map(p=>[p.id,p.name]));const options=room.options||{};const votes=room.votes||{};const answers=room.answers||{};const playerCards=[...players].sort((a,b)=>(g[b.id]||0)-(g[a.id]||0)).map(p=>{const a=answers[p.id];const wroteCorrect=!!a?.correct;const voteKey=votes[p.id];const picked=voteKey?options[voteKey]:null;const voteCorrect=!!picked?.correct;const fooled=Object.entries(votes).filter(([voter,k])=>voter!==p.id&&(options[k]?.ownerIds||[]).includes(p.id)).map(([voter])=>names[voter]).filter(Boolean);let answerLine;if(picked){answerLine=voteCorrect?`<div class="resultLine good"><span class="resultIcon">✓</span><div><b>اختار الإجابة الصحيحة</b><small>${esc(picked.text||room.results?.answer||'')}</small></div></div>`:`<div class="resultLine bad"><span class="resultIcon">✕</span><div><b>جاوب غلط</b><small>اختار: ${esc(picked.text||'')}</small></div></div>`}else{answerLine=`<div class="resultLine neutral"><span class="resultIcon">—</span><div><b>ما اختار إجابة</b><small>انتهى الوقت قبل التصويت</small></div></div>`}const trapLine=wroteCorrect?`<div class="trapLine mutedResult">كتب الإجابة الصحيحة كفخ، لذلك لم تُعرض ولم يحصل عليها كنقطة</div>`:`<div class="trapBox"><div><b>إجابته للفخ:</b> ${esc(a?.text||'—')}</div><div>${fooled.length?`🎭 وقع في فخه: <b>${fooled.map(esc).join('، ')}</b>`:'لم يقع أحد في فخه'}</div></div>`;return `<div class="playerResultCard"><div class="playerResultHead"><div class="playerResultName">${avatarSvg(p.avatarIndex??p.emojiIndex??0,'resultAvatar')}${esc(p.name)}</div><div class="roundPoints">+${g[p.id]||0} نقطة</div></div>${answerLine}${trapLine}<div class="playerTotal">المجموع: <b>${p.score||0}</b></div></div>`}).join('');$('resultsArea').innerHTML=`<div class="resultBox playerResultsBox"><div class="correctAnswer">الإجابة الصحيحة: ${esc(room.results?.answer||'')}</div><div class="playerResultsGrid">${playerCards}</div></div>`;$('nextBtn').textContent='عرض الفائز';$('nextBtn').classList.toggle('hidden',!isHost)}}
$('resumeSessionBtn').onclick=()=>{if(!pendingSession)return;const {session,room}=pendingSession;roomCode=session.roomCode;isHost=room.hostId===uid;$('sessionModal').classList.add('hidden');selectedEmojiIndex=room.players?.[uid]?.emojiIndex??null;if(isHost)setQR();watchRoom(roomCode)};
$('discardSessionBtn').onclick=async()=>{if(!pendingSession)return;$('sessionModal').classList.add('hidden');const {session,room}=pendingSession;try{if(room.hostId===uid)await remove(ref(db,`rooms/${session.roomCode}`));else{const idx=room.players?.[uid]?.emojiIndex;await remove(ref(db,`rooms/${session.roomCode}/players/${uid}`));if(idx!==undefined&&idx!==null){const cr=ref(db,`rooms/${session.roomCode}/emojiClaims/${idx}`);const cs=await get(cr);if(cs.val()===uid)await remove(cr)}}}catch(e){console.error(e)}clearSession();roomCode=null;isHost=false;lastRoom=null;show('home');};
onAuthStateChanged(auth,async u=>{if(!u)return;uid=u.uid;if(booted)return;booted=true;try{const offered=await offerExistingSession();if(!offered&&new URL(location.href).searchParams.get('room'))openJoin()}catch(e){console.error(e);if(new URL(location.href).searchParams.get('room'))openJoin()}});
signInAnonymously(auth).catch(console.error);

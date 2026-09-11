import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js';
import { getDatabase, ref, set, get, update, onValue, remove, runTransaction, serverTimestamp } from 'https://www.gstatic.com/firebasejs/12.2.1/firebase-database.js';

const firebaseConfig={apiKey:'AIzaSyDOZNZp5F-t9AouL9xsthU3OiAyO_HQBBI',authDomain:'jawab-majhoo1.firebaseapp.com',databaseURL:'https://jawab-majhoo1-default-rtdb.europe-west1.firebasedatabase.app',projectId:'jawab-majhoo1',storageBucket:'jawab-majhoo1.firebasestorage.app',messagingSenderId:'314192717840',appId:'1:314192717840:web:688b94bbb5a8915098c295'};
const app=initializeApp(firebaseConfig),auth=getAuth(app),db=getDatabase(app);
const $=id=>document.getElementById(id); const screens=['home','nameScreen','lobby','game'];
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
  let face='';
  if(a.face==='detective')face=`<path d="M20 22h24l-3 6H23z" fill="${a.accent}"/><path d="M25 19c5-5 11-5 16 0" fill="none" stroke="#171636" stroke-width="3" stroke-linecap="round"/><circle cx="29" cy="34" r="2.4"/><circle cx="39" cy="34" r="2.4"/><path d="M29 42c3 2 7 2 10 0" fill="none" stroke="#171636" stroke-width="3" stroke-linecap="round"/>`;
  else if(a.face==='mask')face=`<path d="M22 29c7-5 17-5 24 0l-3 9c-6 4-12 4-18 0z" fill="${a.accent}"/><circle cx="29" cy="33" r="2" fill="#fff4db"/><circle cx="39" cy="33" r="2" fill="#fff4db"/><path d="M31 44h6" stroke="#171636" stroke-width="3" stroke-linecap="round"/>`;
  else if(a.face==='glasses')face=`<circle cx="28" cy="34" r="6" fill="none" stroke="#171636" stroke-width="3"/><circle cx="40" cy="34" r="6" fill="none" stroke="#171636" stroke-width="3"/><path d="M34 34h1" stroke="#171636" stroke-width="3"/><path d="M30 44c3 2 5 2 8 0" fill="none" stroke="#171636" stroke-width="3" stroke-linecap="round"/><path d="M34 17v-5M27 19l-3-5M41 19l3-5" stroke="${a.accent}" stroke-width="3" stroke-linecap="round"/>`;
  else if(a.face==='horns')face=`<path d="M22 22l-5-8 10 5M46 22l5-8-10 5" fill="${a.accent}" stroke="#171636" stroke-width="2"/><path d="M25 33l6 2M43 33l-6 2" stroke="#171636" stroke-width="3" stroke-linecap="round"/><path d="M29 44c4 3 7 3 11 0" fill="none" stroke="#171636" stroke-width="3" stroke-linecap="round"/>`;
  else if(a.face==='calm')face=`<path d="M25 34c2-2 4-2 6 0M37 34c2-2 4-2 6 0" fill="none" stroke="#171636" stroke-width="3" stroke-linecap="round"/><path d="M29 43c3 1 7 1 10 0" fill="none" stroke="#171636" stroke-width="3" stroke-linecap="round"/><circle cx="47" cy="27" r="3" fill="${a.accent}"/>`;
  else if(a.face==='wide')face=`<circle cx="28" cy="34" r="4" fill="#fff" stroke="#171636" stroke-width="2"/><circle cx="40" cy="34" r="4" fill="#fff" stroke="#171636" stroke-width="2"/><circle cx="29" cy="34" r="1.7"/><circle cx="39" cy="34" r="1.7"/><circle cx="34" cy="44" r="4" fill="${a.accent}" stroke="#171636" stroke-width="2"/>`;
  else if(a.face==='wink')face=`<circle cx="28" cy="34" r="2.5"/><path d="M37 34c2-2 4-2 6 0" fill="none" stroke="#171636" stroke-width="3" stroke-linecap="round"/><path d="M29 43c4 4 8 4 12 0" fill="none" stroke="#171636" stroke-width="3" stroke-linecap="round"/><path d="M46 23l4-3" stroke="${a.accent}" stroke-width="3" stroke-linecap="round"/>`;
  else if(a.face==='ghost')face=`<circle cx="28" cy="34" r="2.5"/><circle cx="40" cy="34" r="2.5"/><ellipse cx="34" cy="44" rx="4" ry="6" fill="${a.accent}"/><path d="M20 51l5-4 5 4 5-4 5 4 5-4 3 3" fill="none" stroke="#171636" stroke-width="2.5"/>`;
  else if(a.face==='robot')face=`<rect x="22" y="25" width="24" height="23" rx="6" fill="${a.body}" stroke="#171636" stroke-width="3"/><circle cx="29" cy="35" r="3" fill="${a.accent}"/><circle cx="39" cy="35" r="3" fill="${a.accent}"/><path d="M29 43h10" stroke="#171636" stroke-width="3"/><path d="M34 25v-7" stroke="#171636" stroke-width="3"/><circle cx="34" cy="16" r="3" fill="${a.accent}" stroke="#171636" stroke-width="2"/>`;
  else face=`<circle cx="28" cy="34" r="2.5" fill="#fff4db"/><circle cx="40" cy="34" r="2.5" fill="#fff4db"/><path d="M31 43h6" stroke="#fff4db" stroke-width="3" stroke-linecap="round"/><text x="34" y="22" text-anchor="middle" font-size="13" font-weight="900" fill="${a.accent}">?</text>`;
  return `<span class="gameAvatar ${extra}" title="${a.name}"><svg viewBox="0 0 68 68" aria-hidden="true"><path d="M13 37c0-16 8-25 21-25s21 9 21 25v13c0 6-5 10-11 10H24c-6 0-11-4-11-10z" fill="${a.body}" stroke="#171636" stroke-width="3" stroke-linejoin="round"/>${face}</svg></span>`;
}
let pendingSession=null,booted=false;
const QUESTIONS=[
 {text:'ما هذا العلم؟ 🇸🇦',answer:'السعودية',accepted:['السعودية','السعوديه','المملكة العربية السعودية','المملكه العربيه السعوديه','saudi arabia']},
 {text:'ما عاصمة اليابان؟',answer:'طوكيو',accepted:['طوكيو','tokyo']},
 {text:'ما الكوكب المعروف بالكوكب الأحمر؟',answer:'المريخ',accepted:['المريخ','mars']}
];
function show(id){screens.forEach(s=>$(s).classList.toggle('hidden',s!==id));$('leaveBtn').classList.toggle('hidden',id==='home'||id==='nameScreen')}
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
  $('emojiPicker').innerHTML=AVATARS.map((avatar,i)=>{
    const owner=claims[i];
    const mine=selectedEmojiIndex===i;
    const locked=!!owner&&owner!==uid;
    return `<button type="button" class="emojiChoice ${mine?'selected':''} ${locked?'taken':''}" data-emoji-index="${i}" ${locked?'disabled':''} aria-label="${locked?'الشخصية محجوزة':`اختيار شخصية ${avatar.name}`}">${avatarSvg(i)}<span class="avatarName">${avatar.name}</span></button>`;
  }).join('');
  $('emojiHint').textContent=selectedEmojiIndex===null?'اختر شخصية واحدة':`اختيارك: ${AVATARS[selectedEmojiIndex].name}`;
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
  if(roomSnap.val().phase!=='lobby')return toast('اللعبة بدأت بالفعل');
  const claimRef=ref(db,`rooms/${c}/emojiClaims/${i}`);
  const tx=await runTransaction(claimRef,current=>(!current||current===uid)?uid:undefined);
  if(!tx.committed)return toast('هذه الشخصية اختارها لاعب قبلك');
  const old=selectedEmojiIndex;selectedEmojiIndex=i;emojiRoomCode=c;
  if(old!==null&&old!==i){const oldRef=ref(db,`rooms/${c}/emojiClaims/${old}`);const oldSnap=await get(oldRef);if(oldSnap.val()===uid)await remove(oldRef)}
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
$('nameBackBtn').onclick=async()=>{await releaseEmojiClaim();stopEmojiWatch();selectedEmojiIndex=null;show('home')};
$('codeInput').addEventListener('input',async()=>{if(joinMode!=='join'||$('codeInput').readOnly)return;const c=$('codeInput').value.trim().toUpperCase();$('codeInput').value=c;if(c.length===5)await watchEmojiRoom(c);else{await releaseEmojiClaim();selectedEmojiIndex=null;stopEmojiWatch();renderEmojiPicker()}});
$('confirmJoinBtn').onclick=async()=>{try{await ensureAuth();const name=$('nameInput').value.trim().slice(0,20);if(!name)return toast('اكتب اسمك');if(selectedEmojiIndex===null)return toast('اختر شخصيتك');if(joinMode==='create'){let c=code();while((await get(ref(db,`rooms/${c}`))).exists())c=code();roomCode=c;isHost=true;await set(ref(db,`rooms/${c}`),{code:c,hostId:uid,phase:'lobby',questionIndex:0,emojiClaims:{[selectedEmojiIndex]:uid},players:{[uid]:{name,avatarIndex:selectedEmojiIndex,emojiIndex:selectedEmojiIndex,score:0,host:true,submitted:false}}});saveSession(name);stopEmojiWatch();setQR();watchRoom(c);show('lobby')}else{const c=$('codeInput').value.trim().toUpperCase();const snap=await get(ref(db,`rooms/${c}`));if(!snap.exists())return toast('الغرفة غير موجودة');if(snap.val().phase!=='lobby')return toast('اللعبة بدأت بالفعل');const claimSnap=await get(ref(db,`rooms/${c}/emojiClaims/${selectedEmojiIndex}`));if(claimSnap.val()!==uid){selectedEmojiIndex=null;renderEmojiPicker(snap.val());return toast('اختر شخصية متاحة')}roomCode=c;isHost=false;await set(ref(db,`rooms/${c}/players/${uid}`),{name,avatarIndex:selectedEmojiIndex,emojiIndex:selectedEmojiIndex,score:0,host:false,submitted:false});saveSession(name);stopEmojiWatch();watchRoom(c);show('lobby')}}catch(e){console.error(e);toast('تعذر الاتصال بـ Firebase — راجع Rules')}};
function setQR(){const url=`${location.origin}${location.pathname}?room=${roomCode}`;$('qrImg').innerHTML='';new QRCode($('qrImg'),{text:url,width:240,height:240,correctLevel:QRCode.CorrectLevel.M})}
$('copyBtn').onclick=async()=>{const url=`${location.origin}${location.pathname}?room=${roomCode}`;const text=`قاعدين نلعب الجواب المجهول حياك\n${url}`;try{if(navigator.share){await navigator.share({title:'الجواب المجهول',text:'قاعدين نلعب الجواب المجهول حياك',url});toast('تم فتح المشاركة')}else{await navigator.clipboard.writeText(text);toast('تم نسخ الدعوة')}}catch(e){if(e?.name==='AbortError')return;try{await navigator.clipboard.writeText(text);toast('تم نسخ الدعوة')}catch{toast('تعذر مشاركة الرابط')}}};
$('startBtn').onclick=async()=>{if(!isHost)return;const players=lastRoom?.players||{};if(Object.keys(players).length<2)return toast('الحد الأدنى لاعبين');await startRound(lastRoom.questionIndex||0)};
async function startRound(i){const q=QUESTIONS[i%QUESTIONS.length];const p=lastRoom.players||{};const changes={phase:'answer',phaseStartedAt:Date.now(),questionIndex:i,questionText:q.text,answerKey:q.answer,accepted:q.accepted,answers:null,options:null,votes:null,results:null};Object.keys(p).forEach(id=>changes[`players/${id}/submitted`]=false);await update(ref(db,`rooms/${roomCode}`),changes)}
$('submitAnswerBtn').onclick=async(e)=>{e?.preventDefault();interactionGuardUntil=Date.now()+1200;$('submitAnswerBtn').blur();$('answerInput').blur();const text=$('answerInput').value.trim().slice(0,60);if(!text)return toast('اكتب إجابة');const q={answer:lastRoom.answerKey,accepted:lastRoom.accepted||[]};const isRight=correct(q,text);await set(ref(db,`rooms/${roomCode}/answers/${uid}`),{text,correct:isRight});await update(ref(db,`rooms/${roomCode}/players/${uid}`),{submitted:true});toast(isRight?'إجابتك صحيحة وتم إخفاؤها من الخيارات':'تم تثبيت إجابتك');await maybeBuildOptions()};
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
  const changes={phase:'vote',phaseStartedAt:Date.now(),options,votes:null};ids.forEach(id=>changes[`players/${id}/submitted`]=!!ans[id]?.correct);await update(ref(db,`rooms/${roomCode}`),changes)}
async function submitVote(optionKey){const o=lastRoom.options?.[optionKey];if(!o||(o.ownerIds||[]).includes(uid))return;selectedVoteKey=null;$('confirmVoteBtn').disabled=true;await set(ref(db,`rooms/${roomCode}/votes/${uid}`),optionKey);await update(ref(db,`rooms/${roomCode}/players/${uid}`),{submitted:true});await maybeFinish()}
async function maybeFinish(force=false){if(!isHost)return;const s=(await get(ref(db,`rooms/${roomCode}`))).val();if(!s||s.phase!=='vote')return;const eligible=Object.keys(s.players||{}).filter(id=>!s.answers?.[id]?.correct);if(!force&&eligible.some(id=>!s.votes?.[id]))return;const gain={};Object.keys(s.players).forEach(id=>gain[id]=0);
  // من كتب الصحيح من البداية يأخذ نقطة الصحيح فقط ولا يشارك بفخ في هذه الجولة.
  for(const [id,a] of Object.entries(s.answers||{}))if(a.correct)gain[id]++;
  for(const [voter,k] of Object.entries(s.votes||{})){
    const o=s.options?.[k];if(!o)continue;
    if(o.correct){gain[voter]++;continue}
    for(const ownerId of (o.ownerIds||[]))if(ownerId!==voter)gain[ownerId]=(gain[ownerId]||0)+1;
  }
  const changes={phase:'results',phaseStartedAt:Date.now(),results:{answer:s.answerKey,roundGain:gain}};for(const id of Object.keys(s.players))changes[`players/${id}/score`]=(s.players[id].score||0)+(gain[id]||0);await update(ref(db,`rooms/${roomCode}`),changes)}
$('nextBtn').onclick=()=>isHost&&startRound((lastRoom.questionIndex||0)+1);
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
function renderRoom(room){lastRoom=room;startPhaseTimer(room);isHost=room.hostId===uid;const players=Object.entries(room.players||{}).map(([id,p])=>({id,...p}));$('roomCode').textContent=room.code;$('countBadge').textContent=players.length;$('players').innerHTML=players.map(p=>`<div class="player"><span class="playerIdentity">${avatarSvg(p.avatarIndex??p.emojiIndex??0,'playerAvatar')}<span>${esc(p.name)}${p.host?' 👑':''}</span></span><b>${p.score||0}</b></div>`).join('');document.querySelectorAll('.hostOnlyInvite').forEach(el=>el.classList.toggle('hidden',!isHost));$('startBtn').classList.toggle('hidden',!(isHost&&room.phase==='lobby'));if(isHost&&room.phase==='lobby')setQR();if(room.phase==='lobby'){show('lobby');return}show('game');renderGame(room,players);if(isHost&&room.phase==='answer')maybeBuildOptions();if(isHost&&room.phase==='vote')maybeFinish()}
function renderGame(room,players){$('scoreStrip').innerHTML=[...players].sort((a,b)=>(b.score||0)-(a.score||0)).map(p=>`<div class="score">${avatarSvg(p.avatarIndex??p.emojiIndex??0,'scoreAvatar')}${esc(p.name)} · ${p.score||0}</div>`).join('');$('questionText').textContent=room.questionText||'';['answerArea','voteArea','waiting','resultsArea'].forEach(x=>$(x).classList.add('hidden'));$('nextBtn').classList.add('hidden');const me=room.players?.[uid];const myAnswer=room.answers?.[uid]||null;const myVote=room.votes?.[uid]||null;if(room.phase==='answer'){votePhaseKey='';selectedVoteKey=null;const currentAnswerPhase=`${room.questionIndex}:${room.phaseStartedAt}`;if(answerPhaseKey!==currentAnswerPhase){answerPhaseKey=currentAnswerPhase;$('answerInput').value='';interactionGuardUntil=Date.now()+500}$('phaseLabel').textContent='اكتب إجابة مقنعة';if(myAnswer){$('waiting').textContent='تم إرسال إجابتك… ننتظر البقية';$('waiting').classList.remove('hidden')}else{$('answerArea').classList.remove('hidden')}}if(room.phase==='vote'){$('phaseLabel').textContent='اختر الإجابة الصحيحة';const wroteCorrect=!!myAnswer?.correct;if(wroteCorrect){$('waiting').textContent='إجابتك كانت صحيحة وتم إخفاؤها… ننتظر تصويت البقية';$('waiting').classList.remove('hidden')}else if(myVote){$('waiting').textContent='تم تأكيد اختيارك… ننتظر البقية';$('waiting').classList.remove('hidden')}else{$('voteArea').classList.remove('hidden');const currentVotePhase=`${room.questionIndex}:${room.phaseStartedAt}`;if(votePhaseKey!==currentVotePhase){votePhaseKey=currentVotePhase;selectedVoteKey=null;voteUIReadyAt=Math.max(Date.now()+1000,interactionGuardUntil)}$('options').innerHTML=Object.entries(room.options||{}).map(([k,o])=>`<button class="option ${(o.ownerIds||[]).includes(uid)?'mine':''} ${selectedVoteKey===k?'selected':''}" data-k="${k}" ${(o.ownerIds||[]).includes(uid)?'disabled':''}>${esc(o.text)}</button>`).join('');$('confirmVoteBtn').disabled=!selectedVoteKey;document.querySelectorAll('.option:not(.mine)').forEach(b=>{let armed=false;b.onpointerdown=(e)=>{if(Date.now()<voteUIReadyAt){armed=false;return}armed=true};b.onpointerup=(e)=>{e.preventDefault();if(!armed||Date.now()<voteUIReadyAt)return;armed=false;selectedVoteKey=b.dataset.k;document.querySelectorAll('.option').forEach(x=>x.classList.remove('selected'));b.classList.add('selected');$('confirmVoteBtn').disabled=false};b.onpointercancel=()=>{armed=false};b.onclick=(e)=>e.preventDefault()})}}if(room.phase==='results'){votePhaseKey='';selectedVoteKey=null;$('phaseLabel').textContent='نتائج الجولة';$('resultsArea').classList.remove('hidden');const g=room.results?.roundGain||{};const names=Object.fromEntries(players.map(p=>[p.id,p.name]));const options=room.options||{};const votes=room.votes||{};const answers=room.answers||{};const playerCards=[...players].sort((a,b)=>(g[b.id]||0)-(g[a.id]||0)).map(p=>{const a=answers[p.id];const wroteCorrect=!!a?.correct;const voteKey=votes[p.id];const picked=voteKey?options[voteKey]:null;const voteCorrect=!!picked?.correct;const fooled=Object.entries(votes).filter(([voter,k])=>voter!==p.id&&(options[k]?.ownerIds||[]).includes(p.id)).map(([voter])=>names[voter]).filter(Boolean);let answerLine;if(wroteCorrect){answerLine=`<div class="resultLine good"><span class="resultIcon">✓</span><div><b>جاوب صح من البداية</b><small>كتب: ${esc(a?.text||room.results?.answer||'')}</small></div></div>`}else if(picked){answerLine=voteCorrect?`<div class="resultLine good"><span class="resultIcon">✓</span><div><b>اختار الإجابة الصحيحة</b><small>${esc(picked.text||room.results?.answer||'')}</small></div></div>`:`<div class="resultLine bad"><span class="resultIcon">✕</span><div><b>جاوب غلط</b><small>اختار: ${esc(picked.text||'')}</small></div></div>`}else{answerLine=`<div class="resultLine neutral"><span class="resultIcon">—</span><div><b>ما اختار إجابة</b><small>انتهى الوقت قبل التصويت</small></div></div>`}const trapLine=wroteCorrect?`<div class="trapLine mutedResult">إجابته الصحيحة انخفت من الخيارات</div>`:`<div class="trapBox"><div><b>إجابته للفخ:</b> ${esc(a?.text||'—')}</div><div>${fooled.length?`🎭 وقع في فخه: <b>${fooled.map(esc).join('، ')}</b>`:'لم يقع أحد في فخه'}</div></div>`;return `<div class="playerResultCard"><div class="playerResultHead"><div class="playerResultName">${avatarSvg(p.avatarIndex??p.emojiIndex??0,'resultAvatar')}${esc(p.name)}</div><div class="roundPoints">+${g[p.id]||0} نقطة</div></div>${answerLine}${trapLine}<div class="playerTotal">المجموع: <b>${p.score||0}</b></div></div>`}).join('');$('resultsArea').innerHTML=`<div class="resultBox playerResultsBox"><div class="correctAnswer">الإجابة الصحيحة: ${esc(room.results?.answer||'')}</div><div class="playerResultsGrid">${playerCards}</div></div>`;$('nextBtn').classList.toggle('hidden',!isHost)}}
$('resumeSessionBtn').onclick=()=>{if(!pendingSession)return;const {session,room}=pendingSession;roomCode=session.roomCode;isHost=room.hostId===uid;$('sessionModal').classList.add('hidden');selectedEmojiIndex=room.players?.[uid]?.emojiIndex??null;if(isHost)setQR();watchRoom(roomCode)};
$('discardSessionBtn').onclick=async()=>{if(!pendingSession)return;$('sessionModal').classList.add('hidden');const {session,room}=pendingSession;try{if(room.hostId===uid)await remove(ref(db,`rooms/${session.roomCode}`));else{const idx=room.players?.[uid]?.emojiIndex;await remove(ref(db,`rooms/${session.roomCode}/players/${uid}`));if(idx!==undefined&&idx!==null){const cr=ref(db,`rooms/${session.roomCode}/emojiClaims/${idx}`);const cs=await get(cr);if(cs.val()===uid)await remove(cr)}}}catch(e){console.error(e)}clearSession();roomCode=null;isHost=false;lastRoom=null;show('home');};
onAuthStateChanged(auth,async u=>{if(!u)return;uid=u.uid;if(booted)return;booted=true;try{const offered=await offerExistingSession();if(!offered&&new URL(location.href).searchParams.get('room'))openJoin()}catch(e){console.error(e);if(new URL(location.href).searchParams.get('room'))openJoin()}});
signInAnonymously(auth).catch(console.error);

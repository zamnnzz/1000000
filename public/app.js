import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js';
import { getDatabase, ref, set, get, update, onValue, remove, runTransaction, serverTimestamp } from 'https://www.gstatic.com/firebasejs/12.2.1/firebase-database.js';

const firebaseConfig={apiKey:'AIzaSyDOZNZp5F-t9AouL9xsthU3OiAyO_HQBBI',authDomain:'jawab-majhoo1.firebaseapp.com',databaseURL:'https://jawab-majhoo1-default-rtdb.europe-west1.firebasedatabase.app',projectId:'jawab-majhoo1',storageBucket:'jawab-majhoo1.firebasestorage.app',messagingSenderId:'314192717840',appId:'1:314192717840:web:688b94bbb5a8915098c295'};
const app=initializeApp(firebaseConfig),auth=getAuth(app),db=getDatabase(app);
const $=id=>document.getElementById(id); const screens=['home','nameScreen','lobby','game'];
let uid=null,roomCode=null,isHost=false,unsubRoom=null,joinMode='join',lastRoom=null,phaseTimer=null,selectedVoteKey=null,votePhaseKey='',voteUIReadyAt=0,answerPhaseKey='',interactionGuardUntil=0;
const SESSION_KEY='jawabMajhoolSessionV1'; let pendingSession=null,booted=false;
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
function openCreate(){joinMode='create';$('nameTitle').textContent='اسم المضيف';$('codeInput').classList.add('hidden');$('codeInput').readOnly=false;$('codeInput').classList.remove('lockedCode');$('confirmJoinBtn').textContent='إنشاء الغرفة';$('nameInput').value='';show('nameScreen')}
function openJoin(){joinMode='join';$('nameTitle').textContent='دخول غرفة';$('codeInput').classList.remove('hidden');$('confirmJoinBtn').textContent='دخول';$('nameInput').value='';const linkedRoom=(new URL(location.href).searchParams.get('room')||'').toUpperCase();$('codeInput').value=linkedRoom;$('codeInput').readOnly=!!linkedRoom;$('codeInput').classList.toggle('lockedCode',!!linkedRoom);$('codeInput').placeholder=linkedRoom?'رقم الجلسة':'كود الغرفة';show('nameScreen')}
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
$('nameBackBtn').onclick=()=>show('home');
$('confirmJoinBtn').onclick=async()=>{try{await ensureAuth();const name=$('nameInput').value.trim().slice(0,20);if(!name)return toast('اكتب اسمك');if(joinMode==='create'){let c=code();while((await get(ref(db,`rooms/${c}`))).exists())c=code();roomCode=c;isHost=true;await set(ref(db,`rooms/${c}`),{code:c,hostId:uid,phase:'lobby',questionIndex:0,players:{[uid]:{name,score:0,host:true,submitted:false}}});saveSession(name);setQR();watchRoom(c);show('lobby')}else{const c=$('codeInput').value.trim().toUpperCase();const snap=await get(ref(db,`rooms/${c}`));if(!snap.exists())return toast('الغرفة غير موجودة');if(snap.val().phase!=='lobby')return toast('اللعبة بدأت بالفعل');roomCode=c;isHost=false;await set(ref(db,`rooms/${c}/players/${uid}`),{name,score:0,host:false,submitted:false});saveSession(name);watchRoom(c);show('lobby')}}catch(e){console.error(e);toast('تعذر الاتصال بـ Firebase — راجع Rules')}};
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
$('leaveBtn').onclick=async()=>{if(roomCode&&uid){if(isHost)await remove(ref(db,`rooms/${roomCode}`));else await remove(ref(db,`rooms/${roomCode}/players/${uid}`))}clearSession();location.href=location.pathname};
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
function renderRoom(room){lastRoom=room;startPhaseTimer(room);isHost=room.hostId===uid;const players=Object.entries(room.players||{}).map(([id,p])=>({id,...p}));$('roomCode').textContent=room.code;$('countBadge').textContent=players.length;$('players').innerHTML=players.map(p=>`<div class="player"><span>${esc(p.name)}${p.host?' 👑':''}</span><b>${p.score||0}</b></div>`).join('');$('startBtn').classList.toggle('hidden',!(isHost&&room.phase==='lobby'));if(isHost&&room.phase==='lobby')setQR();if(room.phase==='lobby'){show('lobby');return}show('game');renderGame(room,players);if(isHost&&room.phase==='answer')maybeBuildOptions();if(isHost&&room.phase==='vote')maybeFinish()}
function renderGame(room,players){$('scoreStrip').innerHTML=[...players].sort((a,b)=>(b.score||0)-(a.score||0)).map(p=>`<div class="score">${esc(p.name)} · ${p.score||0}</div>`).join('');$('questionText').textContent=room.questionText||'';['answerArea','voteArea','waiting','resultsArea'].forEach(x=>$(x).classList.add('hidden'));$('nextBtn').classList.add('hidden');const me=room.players?.[uid];const myAnswer=room.answers?.[uid]||null;const myVote=room.votes?.[uid]||null;if(room.phase==='answer'){votePhaseKey='';selectedVoteKey=null;const currentAnswerPhase=`${room.questionIndex}:${room.phaseStartedAt}`;if(answerPhaseKey!==currentAnswerPhase){answerPhaseKey=currentAnswerPhase;$('answerInput').value='';interactionGuardUntil=Date.now()+500}$('phaseLabel').textContent='اكتب إجابة مقنعة';if(myAnswer){$('waiting').textContent='تم إرسال إجابتك… ننتظر البقية';$('waiting').classList.remove('hidden')}else{$('answerArea').classList.remove('hidden')}}if(room.phase==='vote'){$('phaseLabel').textContent='اختر الإجابة الصحيحة';const wroteCorrect=!!myAnswer?.correct;if(wroteCorrect){$('waiting').textContent='إجابتك كانت صحيحة وتم إخفاؤها… ننتظر تصويت البقية';$('waiting').classList.remove('hidden')}else if(myVote){$('waiting').textContent='تم تأكيد اختيارك… ننتظر البقية';$('waiting').classList.remove('hidden')}else{$('voteArea').classList.remove('hidden');const currentVotePhase=`${room.questionIndex}:${room.phaseStartedAt}`;if(votePhaseKey!==currentVotePhase){votePhaseKey=currentVotePhase;selectedVoteKey=null;voteUIReadyAt=Math.max(Date.now()+1000,interactionGuardUntil)}$('options').innerHTML=Object.entries(room.options||{}).map(([k,o])=>`<button class="option ${(o.ownerIds||[]).includes(uid)?'mine':''} ${selectedVoteKey===k?'selected':''}" data-k="${k}" ${(o.ownerIds||[]).includes(uid)?'disabled':''}>${esc(o.text)}</button>`).join('');$('confirmVoteBtn').disabled=!selectedVoteKey;document.querySelectorAll('.option:not(.mine)').forEach(b=>{let armed=false;b.onpointerdown=(e)=>{if(Date.now()<voteUIReadyAt){armed=false;return}armed=true};b.onpointerup=(e)=>{e.preventDefault();if(!armed||Date.now()<voteUIReadyAt)return;armed=false;selectedVoteKey=b.dataset.k;document.querySelectorAll('.option').forEach(x=>x.classList.remove('selected'));b.classList.add('selected');$('confirmVoteBtn').disabled=false};b.onpointercancel=()=>{armed=false};b.onclick=(e)=>e.preventDefault()})}}if(room.phase==='results'){votePhaseKey='';selectedVoteKey=null;$('phaseLabel').textContent='نتائج الجولة';$('resultsArea').classList.remove('hidden');const g=room.results?.roundGain||{};const names=Object.fromEntries(players.map(p=>[p.id,p.name]));const options=room.options||{};const votes=room.votes||{};const answers=room.answers||{};const playerCards=[...players].sort((a,b)=>(g[b.id]||0)-(g[a.id]||0)).map(p=>{const a=answers[p.id];const wroteCorrect=!!a?.correct;const voteKey=votes[p.id];const picked=voteKey?options[voteKey]:null;const voteCorrect=!!picked?.correct;const fooled=Object.entries(votes).filter(([voter,k])=>voter!==p.id&&(options[k]?.ownerIds||[]).includes(p.id)).map(([voter])=>names[voter]).filter(Boolean);let answerLine;if(wroteCorrect){answerLine=`<div class="resultLine good"><span class="resultIcon">✓</span><div><b>جاوب صح من البداية</b><small>كتب: ${esc(a?.text||room.results?.answer||'')}</small></div></div>`}else if(picked){answerLine=voteCorrect?`<div class="resultLine good"><span class="resultIcon">✓</span><div><b>اختار الإجابة الصحيحة</b><small>${esc(picked.text||room.results?.answer||'')}</small></div></div>`:`<div class="resultLine bad"><span class="resultIcon">✕</span><div><b>جاوب غلط</b><small>اختار: ${esc(picked.text||'')}</small></div></div>`}else{answerLine=`<div class="resultLine neutral"><span class="resultIcon">—</span><div><b>ما اختار إجابة</b><small>انتهى الوقت قبل التصويت</small></div></div>`}const trapLine=wroteCorrect?`<div class="trapLine mutedResult">إجابته الصحيحة انخفت من الخيارات</div>`:`<div class="trapBox"><div><b>إجابته للفخ:</b> ${esc(a?.text||'—')}</div><div>${fooled.length?`🎭 وقع في فخه: <b>${fooled.map(esc).join('، ')}</b>`:'لم يقع أحد في فخه'}</div></div>`;return `<div class="playerResultCard"><div class="playerResultHead"><div class="playerResultName">${esc(p.name)}</div><div class="roundPoints">+${g[p.id]||0} نقطة</div></div>${answerLine}${trapLine}<div class="playerTotal">المجموع: <b>${p.score||0}</b></div></div>`}).join('');$('resultsArea').innerHTML=`<div class="resultBox playerResultsBox"><div class="correctAnswer">الإجابة الصحيحة: ${esc(room.results?.answer||'')}</div><div class="playerResultsGrid">${playerCards}</div></div>`;$('nextBtn').classList.toggle('hidden',!isHost)}}
$('resumeSessionBtn').onclick=()=>{if(!pendingSession)return;const {session,room}=pendingSession;roomCode=session.roomCode;isHost=room.hostId===uid;$('sessionModal').classList.add('hidden');if(isHost)setQR();watchRoom(roomCode)};
$('discardSessionBtn').onclick=async()=>{if(!pendingSession)return;$('sessionModal').classList.add('hidden');const {session,room}=pendingSession;try{if(room.hostId===uid)await remove(ref(db,`rooms/${session.roomCode}`));else await remove(ref(db,`rooms/${session.roomCode}/players/${uid}`))}catch(e){console.error(e)}clearSession();roomCode=null;isHost=false;lastRoom=null;show('home');};
onAuthStateChanged(auth,async u=>{if(!u)return;uid=u.uid;if(booted)return;booted=true;try{const offered=await offerExistingSession();if(!offered&&new URL(location.href).searchParams.get('room'))openJoin()}catch(e){console.error(e);if(new URL(location.href).searchParams.get('room'))openJoin()}});
signInAnonymously(auth).catch(console.error);

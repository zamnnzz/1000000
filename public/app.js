const socket = io();
const $ = id => document.getElementById(id);
let roomCode=null, inviteUrl=null, myId=null, isHost=false, lastRoom=null, joinMode='join';
const screens=['home','nameScreen','lobby','game'];
function show(id){screens.forEach(s=>$(s).classList.toggle('hidden',s!==id));$('leaveBtn').classList.toggle('hidden',id==='home'||id==='nameScreen')}
function toast(t){$('toast').textContent=t;$('toast').classList.remove('hidden');setTimeout(()=>$('toast').classList.add('hidden'),2200)}
function esc(s=''){return s.replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':'&quot;',"'":"&#39;"}[m]))}
myId = socket.id; socket.on('connect',()=>myId=socket.id);

$('createBtn').onclick=()=>{joinMode='create';$('nameTitle').textContent='اسم المضيف';$('codeInput').classList.add('hidden');$('confirmJoinBtn').textContent='إنشاء الغرفة';show('nameScreen')}
$('joinOpenBtn').onclick=()=>{joinMode='join';$('nameTitle').textContent='دخول غرفة';$('codeInput').classList.remove('hidden');$('confirmJoinBtn').textContent='دخول';const u=new URL(location.href);$('codeInput').value=(u.searchParams.get('room')||'').toUpperCase();show('nameScreen')}
$('confirmJoinBtn').onclick=()=>{const name=$('nameInput').value.trim();if(!name)return toast('اكتب اسمك');if(joinMode==='create'){socket.emit('room:create',{name},res=>{if(!res.ok)return toast(res.error);roomCode=res.code;inviteUrl=res.inviteUrl;isHost=true;$('qrImg').src=res.qr;show('lobby')})}else{const code=$('codeInput').value.trim().toUpperCase();socket.emit('room:join',{code,name},res=>{if(!res.ok)return toast(res.error);roomCode=code;isHost=false;show('lobby')})}}
$('copyBtn').onclick=async()=>{try{await navigator.clipboard.writeText(inviteUrl||location.origin+'/?room='+roomCode);toast('تم نسخ الرابط')}catch{toast('انسخ الرابط من شريط المتصفح')}}
$('startBtn').onclick=()=>socket.emit('game:start',{code:roomCode},res=>{if(!res.ok)toast(res.error)});
$('submitAnswerBtn').onclick=()=>{const text=$('answerInput').value.trim();if(!text)return toast('اكتب إجابة');socket.emit('answer:submit',{code:roomCode,text},res=>{if(!res.ok)return toast(res.error);$('answerArea').classList.add('hidden');$('waiting').classList.remove('hidden');toast(res.correct?'إجابتك صحيحة وتم إخفاؤها من الخيارات':'تم تثبيت إجابتك')})}
$('nextBtn').onclick=()=>socket.emit('game:next',{code:roomCode},res=>{if(!res.ok)toast(res.error)});
$('leaveBtn').onclick=()=>location.href='/';

socket.on('room:update',room=>{lastRoom=room;roomCode=room.code;isHost=room.hostId===socket.id;$('roomCode').textContent=room.code;$('countBadge').textContent=room.players.length;
 $('players').innerHTML=room.players.map(p=>`<div class="player"><span>${esc(p.name)}${p.host?' 👑':''}</span><b>${p.score}</b></div>`).join('');
 $('startBtn').classList.toggle('hidden',!(isHost&&room.phase==='lobby')); if(room.phase==='lobby'){show('lobby');return}
 show('game'); renderGame(room);
});

function renderGame(room){
 $('scoreStrip').innerHTML=room.players.sort((a,b)=>b.score-a.score).map(p=>`<div class="score">${esc(p.name)} · ${p.score}</div>`).join('');
 $('questionText').textContent=room.question||'';$('answerArea').classList.add('hidden');$('voteArea').classList.add('hidden');$('waiting').classList.add('hidden');$('resultsArea').classList.add('hidden');$('nextBtn').classList.add('hidden');
 const me=room.players.find(p=>p.id===socket.id);
 if(room.phase==='answer'){$('phaseLabel').textContent='اكتب إجابة مقنعة';$('answerInput').value='';if(me?.submitted){$('waiting').classList.remove('hidden')}else{$('answerArea').classList.remove('hidden')}}
 if(room.phase==='vote'){$('phaseLabel').textContent='اختر الإجابة الصحيحة';if(me?.submitted){$('waiting').classList.remove('hidden')}else{$('voteArea').classList.remove('hidden');$('options').innerHTML=room.options.map(o=>`<button class="option ${o.ownerId===socket.id?'mine':''}" data-id="${o.id}" ${o.ownerId===socket.id?'disabled':''}>${esc(o.text)}</button>`).join('');document.querySelectorAll('.option:not(.mine)').forEach(b=>b.onclick=()=>socket.emit('vote:submit',{code:roomCode,optionId:b.dataset.id},res=>{if(!res.ok)return toast(res.error);$('voteArea').classList.add('hidden');$('waiting').classList.remove('hidden')}))}}
 if(room.phase==='results'){$('phaseLabel').textContent='النتيجة';$('resultsArea').classList.remove('hidden');const gains=room.results.roundGain;$('resultsArea').innerHTML=`<div class="resultBox"><div class="correctAnswer">الإجابة الصحيحة: ${esc(room.results.answer)}</div>${room.players.sort((a,b)=>(gains[b.id]||0)-(gains[a.id]||0)).map(p=>`<div class="gain"><span>${esc(p.name)}</span><strong>+${gains[p.id]||0}</strong></div>`).join('')}</div>`;$('nextBtn').classList.toggle('hidden',!isHost)}
}

const u=new URL(location.href); if(u.searchParams.get('room')) $('joinOpenBtn').click();
socket.on('room:closed',()=>{toast('المضيف أغلق الغرفة');setTimeout(()=>location.href='/',1300)});

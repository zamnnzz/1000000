(()=>{'use strict';const $=id=>document.getElementById(id),ar=n=>new Intl.NumberFormat('ar-SA').format(n);let session,turn=0,scores=[0,0],used=new Set(),aidUsed=[new Set(),new Set()],active=null,stage='question',timer=null,seconds=0,paused=false,questionAids=new Map();const aidNames=['إجابتين','دبلها','كلّم المطنوخ','بلوك','تحايل'];const el=(tag,cls,text)=>{const n=document.createElement(tag);n.className=cls||'';if(text!==undefined)n.textContent=text;return n};
const legacyRoundKey = 'baynana-round-v1';
const totalQuestions = 36;
let roundId;
let roundHistoryKey;
let viewingHistory = false;

function historyKey() {
  const phone = localStorage.getItem('playerPhone');
  return 'baynana-history-v1:' + (phone || 'guest');
}

function readHistory(key) {
  try {
    const rounds = JSON.parse(localStorage.getItem(key));
    return Array.isArray(rounds) ? rounds : [];
  } catch {
    return [];
  }
}

function saveRound() {
  if (!roundId || viewingHistory) return;
  try {
    const rounds = readHistory(roundHistoryKey).filter(round => round.id !== roundId);
    rounds.unshift({
      id: roundId, updatedAt: Date.now(), session, turn, scores, used: [...used],
      aidUsed: aidUsed.map(set => [...set]), questionAids: [...questionAids]
    });
    localStorage.setItem(roundHistoryKey, JSON.stringify(rounds));
  } catch {
    // Continue the active round when browser storage is unavailable.
  }
}

function restoreRound(round, key) {
  roundId = round.id;
  roundHistoryKey = key;
  session = round.session;
  turn = round.turn;
  scores = round.scores;
  used = new Set(round.used);
  aidUsed = round.aidUsed.map(entries => new Set(entries));
  questionAids = new Map(round.questionAids);
}

const artwork = new Map([...document.querySelectorAll('#setupCategories .setup-category')]
    .map(button => [button.querySelector('strong').textContent, button.querySelector('img, svg')]));

let historyCardEvents;

function renderHistory() {
  historyCardEvents?.abort();
  historyCardEvents = new AbortController();
  const root = $('previousGamesList');
  root.replaceChildren();
  const key = historyKey();
  const rounds = readHistory(key);


  if (!rounds.length) {
    root.append(el('p', '', 'ما عندك ألعاب سابقة على هذا المتصفح.'));
    return;
  }
  for (const round of rounds) {
    const complete = round.used.length >= totalQuestions;
    const card = el('article', 'previous-game');
    const faces = el('div', 'previous-game-faces');
    const front = el('div', 'previous-game-front');
    const covers = el('div', 'previous-game-covers');
    covers.setAttribute('aria-hidden', 'true');
    for (const name of round.session.categories.flat()) {
      const tile = el('div', 'previous-game-tile');
      const art = artwork.get(name);
      if (art) tile.append(art.cloneNode(true));
      else tile.textContent = name;
      covers.append(tile);
    }
    const copy = el('div', 'previous-game-copy');
    const date = new Intl.DateTimeFormat('ar-SA', {
      dateStyle: 'medium', calendar: 'gregory'
    }).format(round.updatedAt);
    const flip = el('button', 'previous-game-toggle', 'خيارات اللعبة');
    flip.type = 'button';
    flip.onclick = () => {
      card.classList.add('is-flipped');
      action.focus();
    };
    copy.append(
      el('h2', '', round.session.name),
      el('p', '', date),
      el('span', 'previous-game-status', complete ? 'مكتملة' : 'غير مكتملة'),
      flip
    );
    front.append(covers, copy);

    const back = el('div', 'previous-game-back');
    const action = el('button', 'previous-game-action', complete ? 'عرض النتيجة' : 'استمر');
    action.type = 'button';
    const note = el('p', 'previous-game-note', ar(round.used.length) + ' من ٣٦ سؤال');
    note.setAttribute('role', 'status');
    action.onclick = () => {
      if (key !== historyKey()) { renderHistory(); return; }
      const current = readHistory(key).find(entry => entry.id === round.id);
      if (!current) { renderHistory(); return; }
      viewingHistory = current.used.length >= totalQuestions;
      restoreRound(current, key);
      renderRound();
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    card.addEventListener('keydown', event => {
      if (event.key !== 'Escape') return;
      card.classList.remove('is-flipped');
      flip.focus();
    });
    document.addEventListener('pointerdown', event => {
      if (!card.contains(event.target)) card.classList.remove('is-flipped');
    }, { signal: historyCardEvents.signal });
    card.addEventListener('pointerleave', event => {
      if (event.pointerType === 'mouse') card.classList.remove('is-flipped');
    });
    back.append(el('h2', '', round.session.name), el('p', '', round.session.teams.join(' ضد ')), note, action);
    faces.append(front, back);
    card.append(faces);
    root.append(card);
  }
}

function canUseAid(name, team) {
  return active && !$('liveQuestionView').hidden && stage === 'question' &&
    team === turn && !aidUsed[team].has(name);
}

function renderQuestionPoints() {
  const effect = questionAids.get(active.key);
  $('livePoints').textContent = ar(active.points * (effect?.doubleTeam === turn ? 2 : 1)) + ' نقطة';
}

function questionNotice() {
  const effect = active && questionAids.get(active.key);
  if (!effect || $('liveQuestionView').hidden) return '';
  const notes = [];
  if (effect.blockedTeam !== undefined) notes.push(session.teams[effect.blockedTeam] + ' ممنوع من الإجابة.');
  if (effect.secondChanceTeam === turn) notes.push('للفريق فرصتان للإجابة على هذا السؤال.');
  return notes.join(' ');
}

let switching=false;async function transitionTo(change){if(switching)return;switching=true;const layer=$('arenaTransition');layer.hidden=false;layer.classList.remove('is-writing');void layer.offsetWidth;layer.classList.add('is-writing');try{await new Promise(requestAnimationFrame);change();await document.fonts.ready;await new Promise(requestAnimationFrame);await new Promise(requestAnimationFrame);}finally{layer.hidden=true;layer.classList.remove('is-writing');switching=false}}
function stopTimer(){clearInterval(timer);timer=null;$('liveTimer').hidden=true}function tick(){$('timerValue').textContent=ar(Math.floor(seconds/60)).padStart(2,'٠')+':'+ar(seconds%60).padStart(2,'٠')}function startTimer(n){stopTimer();seconds=n;paused=false;$('timerPause').textContent='Ⅱ';$('liveTimer').hidden=false;tick();timer=setInterval(()=>{if(!paused&&seconds>0){seconds--;tick()}if(seconds===0){clearInterval(timer);timer=null}},1000)}
function teamCard(t,editable){const card=el('section','live-team-score live-team-'+t);card.append(el('h2','',session.teams[t]));const row=el('div','live-score-controls');if(editable){const minus=el('button','','−');minus.setAttribute('aria-label','إنقاص نقاط '+session.teams[t]);minus.onclick=()=>{scores[t]-=100;renderScores()};row.append(minus)}row.append(el('b','',ar(scores[t])));if(editable){const plus=el('button','','+');plus.setAttribute('aria-label','زيادة نقاط '+session.teams[t]);plus.onclick=()=>{scores[t]+=100;renderScores()};row.append(plus)}card.append(row);return card}
function teamAids(t,onBoard=false){const root=el('div','live-team-aids'+(t===turn?' is-active-turn':''));root.setAttribute('aria-label','مساعدات '+session.teams[t]);session.aids.forEach(name=>{const i=aidNames.indexOf(name),usedAid=aidUsed[t].has(name),button=el('button','live-team-aid'+(usedAid?' is-used':''));button.type='button';button.title=usedAid?name+' — مستخدمة':t!==turn?'متاحة في دور '+session.teams[t]:name;button.setAttribute('aria-label',name+' — '+session.teams[t]+(usedAid?' — مستخدمة':''));button.disabled=onBoard||!canUseAid(name,t);button.setAttribute('aria-pressed',String(usedAid));const icon=el('span','');icon.innerHTML=window.BaynanaAidArtwork[i]||'';button.append(icon,el('small','',name));button.onclick=()=>{if(onBoard||t!==turn||aidUsed[t].has(name))return;openAid(name,i,t)};root.append(button)});return root}
function teamDock(t){const group=el('div','live-team-dock live-team-dock-'+t+(t===turn?' is-turn':''));const card=teamCard(t,true);card.querySelector('h2').append(teamAids(t,true));group.append(card);return group}
function renderScores(){saveRound();$('liveTurn').disabled=Boolean(active);$('liveTurn').textContent='دور الفريق: '+session.teams[turn]+' ↻';const footer=$('liveBoardFooter');footer.replaceChildren(teamDock(0),el('b','live-dock-brand','بيننا تحدّي'),teamDock(1));const side=$('liveSidebar');side.replaceChildren(teamCard(0,false),teamAids(0),teamCard(1,false),teamAids(1));if(!$('liveAidNotice')){const notice=el('p','live-aid-notice');notice.id='liveAidNotice';notice.textContent=questionNotice();side.append(notice)}}
function renderBoard(){const grid=$('liveBoard');grid.replaceChildren();const categories=session.categories.flat(),sources=[...document.querySelectorAll('#setupCategories .setup-category')];categories.forEach((name,c)=>{const col=el('article','live-category');const match=sources.find(n=>n.querySelector('strong').textContent===name);const art=el('div','live-category-art');if(match){art.style.setProperty('--cover-tone',match.style.getPropertyValue('--category-tone'));art.innerHTML=match.querySelector('img,svg').outerHTML}art.append(el('h2','',name));col.append(art);const points=el('div','live-point-grid');for(let i=0;i<6;i++){const value=[200,200,400,400,600,600][i],key=c+'-'+i,button=el('button','live-point live-point-'+value,ar(value));button.disabled=used.has(key);button.setAttribute('aria-label',name+' — '+value+' نقطة — سؤال '+(i+1));button.onclick=()=>transitionTo(()=>openQuestion({name,points:value,key}));points.append(button)}col.append(points);grid.append(col)})}
function openQuestion(q){active=q;stage='question';stopTimer();$('liveExit').textContent='خروج من السؤال';$('liveBoardView').hidden=true;$('liveQuestionView').hidden=false;$('liveBackBoard').hidden=false;$('liveCategory').textContent=q.name;renderQuestionPoints();renderContent();renderScores();window.scrollTo({top:0,behavior:'instant'})}
function renderContent(){const content=$('liveQuestionContent');content.replaceChildren();$('liveReveal').hidden=stage!=='question';$('liveReturnQuestion').hidden=stage==='question';$('liveJudge').hidden=stage!=='answer';if(stage==='question'){content.append(el('span','live-demo-label','سؤال تجريبي للواجهة'),el('h2','','ما عاصمة المملكة العربية السعودية؟'));const art=el('div','live-question-illustration');art.innerHTML='<svg viewBox="0 0 240 180" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path fill="#bd9bdc" d="M20 156h200V97h-24V63h-22v93h-30V42h-23v114H91V83H68v73H44v-45H20Z"/><path d="M13 162h214M131 42V20m-10 0h20M54 53l5-12 5 12 12 5-12 5-5 12-5-12-12-5Z"/></svg>';content.append(art)}else if(stage==='answer'){content.append(el('span','live-demo-label','الإجابة'),el('h2','live-answer-title','الرياض'));}else{content.append(el('h2','','مين جاوب؟'));const choices=el('div','live-judge-choices');for(let t=0;t<2;t++){const button=el('button','live-primary live-choice-'+t,session.teams[t]);button.disabled=questionAids.get(active.key)?.blockedTeam===t;button.onclick=()=>finishQuestion(t);choices.append(button)}const none=el('button','live-none','ولا أحد');none.onclick=()=>finishQuestion(-1);choices.append(none);content.append(choices)}}
async function finishQuestion(winner) {
  if (!active || stage !== 'judge' || switching) return;
  const effect = questionAids.get(active.key);
  if (winner >= 0 && effect?.blockedTeam === winner) return;
  if (active.questionId) {
    switching = true;
    try {
      await window.BaynanaAvailability.consume(active.questionId);
    } catch {
      const notice = document.getElementById('liveAidNotice');
      if (notice) notice.textContent = 'تعذّر حفظ السؤال. حاول مرة أخرى.';
      return;
    } finally {
      switching = false;
    }
  }
  if (winner >= 0) scores[winner] += active.points * (effect?.doubleTeam === winner ? 2 : 1);
  used.add(active.key);
  questionAids.delete(active.key);
  turn = 1 - turn;
  showBoard();
  renderBoard();
  renderScores();
  if (used.size >= totalQuestions) endGame();
}

function showBoard() {
  active = null;
  $('liveTurn').disabled = false;
  stopTimer();
  $('liveExit').textContent = 'خروج';
  $('liveQuestionView').hidden = true;
  $('liveBoardView').hidden = false;
  $('liveBackBoard').hidden = true;
}

function endGame() {
  saveRound();
  stopTimer();
  $('liveBoardView').hidden = true;
  $('liveQuestionView').hidden = true;
  $('liveBackBoard').hidden = true;
  const root = $('liveResults');
  const winner = scores[0] === scores[1] ? -1 : scores[0] > scores[1] ? 0 : 1;

  const header = el('header', 'result-header');
  const leave = el('button', 'result-button result-secondary', 'خروج');
  leave.onclick = exit;
  const brand = document.querySelector('.live-session .arena-brand').cloneNode(true);
  brand.classList.add('result-brand');
  header.append(brand, leave);

  const content = el('div', 'result-content');
  const trophy = el('div', 'result-trophy');
  trophy.setAttribute('aria-hidden', 'true');
  const trophyImage = el('img');
  trophyImage.src = 'assets/results-trophy-branded.webp';
  trophyImage.alt = '';
  trophy.append(trophyImage);
  const title = el('h2', '', 'انتهت اللعبة!');
  title.tabIndex = -1;
  const outcome = el('p', 'result-outcome', winner < 0 ? 'تعادل الفريقان' : 'الفائز: ' + session.teams[winner]);
  const cards = el('div', 'result-cards');
  session.teams.forEach((name, index) => {
    const status = winner < 0 ? 'تعادل' : winner === index ? 'كفووو!' : 'جبت العيد';
    const card = el('article', 'result-card' + (winner === index ? ' result-winner' : ''));
    card.append(el('span', 'result-status', status), el('h3', '', name),
      el('strong', 'result-score', ar(scores[index]) + ' نقطة'));
    cards.append(card);
  });

  const actions = el('div', 'result-actions');
  const replay = el('button', 'result-button', 'العب مرة ثانية');
  const fresh = el('button', 'result-button result-secondary', 'لعبة جديدة');
  fresh.onclick = () => {
    document.body.classList.remove('baynana-playing');
    window.openCategorySetup({ fresh: true });
  };
  if (used.size < totalQuestions) {
    replay.textContent = 'إكمال اللعب';
    replay.onclick = renderRound;
    actions.append(replay);
  }
  actions.append(fresh);
  content.append(title, outcome, cards, actions);
  root.replaceChildren(trophy, header, content);
  root.hidden = false;
  window.scrollTo({ top: 0, behavior: 'instant' });
  title.focus({ preventScroll: true });
}
function exit(){stopTimer();if(viewingHistory){document.body.classList.remove('baynana-playing');window.openCategorySetup({fresh:true});window.showBaynanaHistory(true);return;}$('gamePreview').hidden=true;$('landing').hidden=false;document.body.classList.remove('baynana-playing');window.scrollTo({top:0,behavior:'instant'})}

let pendingAid=null,pendingAidTeam=null;const aidDescriptions={'إجابتين':'لديكم فرصتان للإجابة على السؤال بدل فرصة واحدة.','دبلها':'ضاعف نقاط هذا السؤال لفريقك.','كلّم المطنوخ':'لديك ٦٠ ثانية للاتصال بصديق ومساعدتك في الإجابة.','بلوك':'امنع الفريق المنافس من الإجابة على هذا السؤال.','تحايل':'لديك ١٥ ثانية للبحث عن الإجابة من أي مكان.'};
function openAid(name,index,team=turn){if(!canUseAid(name,team))return;pendingAid=name;pendingAidTeam=team;$('liveAidIcon').innerHTML=window.BaynanaAidArtwork[index]||'';$('liveAidTitle').textContent=name;$('liveAidDescription').textContent=aidDescriptions[name];const timed=name==='كلّم المطنوخ'||name==='تحايل';$('aidCountdown').hidden=!timed;$('aidCountdownValue').textContent=ar(name==='كلّم المطنوخ'?60:15);$('liveAidInstruction').textContent=timed?'اضغط ابدأ لما تكونون جاهزين':'تُستخدم هذه المساعدة مرة واحدة لفريقك';$('beginLiveAid').textContent=timed?'ابدأ':'استخدم المساعدة';$('liveAidDialog').showModal()}
$('closeLiveAid').onclick = () => $('liveAidDialog').close();
$('beginLiveAid').onclick = () => {
  const name = pendingAid;
  if (!name || !canUseAid(name, pendingAidTeam)) return;
  $('liveAidDialog').close();
  pendingAid = null;
  const effect = questionAids.get(active.key) || {};
  if (name === 'دبلها') effect.doubleTeam = turn;
  if (name === 'بلوك') effect.blockedTeam = 1 - turn;
  if (name === 'إجابتين') effect.secondChanceTeam = turn;
  questionAids.set(active.key, effect);
  aidUsed[turn].add(name);
  renderQuestionPoints();
  renderScores();
  if (name === 'كلّم المطنوخ') startTimer(60);
  if (name === 'تحايل') startTimer(15);
};
function requestExit(){if(!$('liveQuestionView').hidden){transitionTo(showBoard);return}$('leaveGameDialog').showModal()}
$('keepPlaying').onclick=()=>$('leaveGameDialog').close();$('confirmLeaveGame').onclick=()=>{$('leaveGameDialog').close();exit()};

function renderRound() {
  $('landing').hidden = true;
  $('categorySetup').hidden = true;
  $('gamePreview').hidden = false;
  document.body.classList.add('baynana-playing');
  $('liveSessionTitle').textContent = session.name;
  $('liveResults').hidden = true;
  showBoard();
  renderBoard();
  renderScores();
  if (used.size >= totalQuestions) endGame();
}

window.startBaynanaBoard = newSession => {
  session = newSession;
  turn = 0;
  scores = [0, 0];
  used = new Set();
  aidUsed = [new Set(), new Set()];
  questionAids = new Map();
  roundId = crypto.randomUUID();
  roundHistoryKey = historyKey();
  viewingHistory = false;
  renderRound();
  window.scrollTo({ top: 0, behavior: 'instant' });
};

$('liveTurn').onclick = () => {
  if (active || switching) return;
  turn = 1 - turn;
  renderScores();
};
$('liveBackBoard').onclick = () => transitionTo(showBoard);
$('liveReveal').onclick = () => { stopTimer(); stage = 'answer'; renderContent(); renderScores(); };
$('liveReturnQuestion').onclick = () => { stage = 'question'; renderContent(); renderScores(); };
$('liveJudge').onclick = () => { stage = 'judge'; renderContent(); };
$('liveExit').onclick = requestExit;
$('liveEnd').onclick = endGame;
$('timerPause').onclick = () => { paused = !paused; $('timerPause').textContent = paused ? '▶' : 'Ⅱ'; };
$('timerReset').onclick = () => { seconds = 0; tick(); stopTimer(); };

window.renderBaynanaHistory = renderHistory;

try {
  const saved = JSON.parse(sessionStorage.getItem(legacyRoundKey));
  if (saved?.session?.teams?.length === 2) {
    const key = historyKey();
    const id = crypto.randomUUID();
    const rounds = readHistory(key);
    rounds.unshift({ ...saved, id, updatedAt: Date.now() });
    localStorage.setItem(key, JSON.stringify(rounds));
    sessionStorage.removeItem(legacyRoundKey);
  }
} catch {
  // A legacy snapshot is optional.
}
})();

const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const QRCode = require('qrcode');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

const rooms = new Map();

const QUESTIONS = [
  {
    text: 'ما هذا العلم؟ 🇸🇦',
    answer: 'السعودية',
    accepted: ['السعودية','السعوديه','المملكة العربية السعودية','المملكه العربيه السعوديه','saudi arabia']
  },
  {
    text: 'ما عاصمة اليابان؟',
    answer: 'طوكيو',
    accepted: ['طوكيو','tokyo']
  },
  {
    text: 'ما الكوكب المعروف بالكوكب الأحمر؟',
    answer: 'المريخ',
    accepted: ['المريخ','mars']
  }
];

function normalizeArabic(s='') {
  return s
    .toString().trim().toLowerCase()
    .normalize('NFD').replace(/[\u064B-\u065F\u0670]/g, '')
    .replace(/[أإآ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/ؤ/g, 'و')
    .replace(/ئ/g, 'ي')
    .replace(/[^\p{L}\p{N}\s]/gu, '')
    .replace(/\s+/g, ' ');
}

function isCorrect(question, text) {
  const n = normalizeArabic(text);
  return [question.answer, ...question.accepted].some(a => normalizeArabic(a) === n);
}

function makeCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let c = '';
  do {
    c = Array.from({length: 5}, () => chars[Math.floor(Math.random()*chars.length)]).join('');
  } while (rooms.has(c));
  return c;
}

function publicRoom(room) {
  return {
    code: room.code,
    hostId: room.hostId,
    phase: room.phase,
    players: [...room.players.values()].map(p => ({ id:p.id, name:p.name, score:p.score, host:p.id===room.hostId, submitted:!!p.submitted })),
    questionIndex: room.questionIndex,
    question: room.phase === 'answer' || room.phase === 'vote' || room.phase === 'results' ? room.question.text : null,
    options: room.phase === 'vote' || room.phase === 'results' ? room.options : [],
    results: room.phase === 'results' ? room.results : null,
    minPlayers: 4
  };
}

function emitRoom(room) {
  io.to(room.code).emit('room:update', publicRoom(room));
}

function startRound(room) {
  room.phase = 'answer';
  room.question = QUESTIONS[room.questionIndex % QUESTIONS.length];
  room.answers = new Map();
  room.options = [];
  room.results = null;
  for (const p of room.players.values()) p.submitted = false;
  emitRoom(room);
}

function buildOptions(room) {
  const opts = [{ id:'correct', text:room.question.answer, ownerId:null, correct:true }];
  const seen = new Set([normalizeArabic(room.question.answer)]);
  for (const [playerId, a] of room.answers.entries()) {
    if (a.correct) continue;
    const n = normalizeArabic(a.text);
    if (!n || seen.has(n)) continue;
    seen.add(n);
    opts.push({ id:`p:${playerId}`, text:a.text, ownerId:playerId, correct:false });
  }
  room.options = opts.sort(() => Math.random() - 0.5);
  room.phase = 'vote';
  room.votes = new Map();
  for (const p of room.players.values()) p.submitted = !!room.answers.get(p.id)?.correct;
  emitRoom(room);
}

function finishResults(room) {
  const roundGain = {};
  for (const p of room.players.values()) roundGain[p.id] = 0;

  for (const [pid, a] of room.answers.entries()) {
    if (a.correct) roundGain[pid] += 1;
  }

  for (const [voterId, optionId] of room.votes.entries()) {
    const opt = room.options.find(o => o.id === optionId);
    if (!opt) continue;
    if (opt.correct) roundGain[voterId] += 1;
    else if (opt.ownerId && opt.ownerId !== voterId) roundGain[opt.ownerId] += 1;
  }

  for (const p of room.players.values()) p.score += roundGain[p.id] || 0;

  room.results = {
    answer: room.question.answer,
    roundGain,
    votes: [...room.votes.entries()],
    options: room.options
  };
  room.phase = 'results';
  emitRoom(room);
}

io.on('connection', socket => {
  socket.on('room:create', async ({name}, cb) => {
    const code = makeCode();
    const room = {
      code, hostId: socket.id, phase:'lobby', players:new Map(),
      questionIndex:0, question:null, answers:new Map(), options:[], votes:new Map(), results:null
    };
    room.players.set(socket.id, {id:socket.id, name:(name||'المضيف').slice(0,20), score:0, submitted:false});
    rooms.set(code, room);
    socket.join(code);
    socket.data.roomCode = code;
    const host = socket.handshake.headers.host || 'localhost';
    const proto = socket.handshake.headers['x-forwarded-proto'] || 'http';
    const inviteUrl = `${proto}://${host}/?room=${code}`;
    let qr = null;
    try { qr = await QRCode.toDataURL(inviteUrl, { margin:1, width:280 }); } catch(e) {}
    cb({ok:true, code, inviteUrl, qr});
    emitRoom(room);
  });

  socket.on('room:join', ({code,name}, cb) => {
    code = (code||'').toUpperCase().trim();
    const room = rooms.get(code);
    if (!room) return cb({ok:false,error:'الغرفة غير موجودة'});
    if (room.phase !== 'lobby') return cb({ok:false,error:'اللعبة بدأت بالفعل'});
    const clean = (name||'').trim().slice(0,20);
    if (!clean) return cb({ok:false,error:'اكتب اسمك'});
    room.players.set(socket.id, {id:socket.id,name:clean,score:0,submitted:false});
    socket.join(code); socket.data.roomCode = code;
    cb({ok:true}); emitRoom(room);
  });

  socket.on('game:start', ({code}, cb) => {
    const room = rooms.get(code);
    if (!room || room.hostId !== socket.id) return cb?.({ok:false,error:'للمضيف فقط'});
    if (room.players.size < 4) return cb?.({ok:false,error:'الحد الأدنى 4 لاعبين'});
    startRound(room); cb?.({ok:true});
  });

  socket.on('answer:submit', ({code,text}, cb) => {
    const room = rooms.get(code);
    if (!room || room.phase !== 'answer') return cb?.({ok:false,error:'مرحلة الإجابة غير متاحة'});
    const p = room.players.get(socket.id);
    if (!p) return cb?.({ok:false,error:'أنت لست في الغرفة'});
    const clean = (text||'').trim().slice(0,60);
    if (!clean) return cb?.({ok:false,error:'اكتب إجابة'});
    const correct = isCorrect(room.question, clean);
    room.answers.set(socket.id,{text:clean,correct});
    p.submitted = true;
    cb?.({ok:true,correct});
    emitRoom(room);
    if (room.answers.size === room.players.size) buildOptions(room);
  });

  socket.on('vote:submit', ({code,optionId}, cb) => {
    const room = rooms.get(code);
    if (!room || room.phase !== 'vote') return cb?.({ok:false,error:'مرحلة التصويت غير متاحة'});
    const a = room.answers.get(socket.id);
    if (a?.correct) return cb?.({ok:false,error:'أجبت بشكل صحيح من البداية ولا تحتاج للتصويت'});
    const opt = room.options.find(o => o.id===optionId);
    if (!opt) return cb?.({ok:false,error:'خيار غير صالح'});
    if (opt.ownerId === socket.id) return cb?.({ok:false,error:'لا يمكنك اختيار إجابتك'});
    room.votes.set(socket.id, optionId);
    room.players.get(socket.id).submitted = true;
    cb?.({ok:true}); emitRoom(room);

    const eligible = [...room.players.values()].filter(p => !room.answers.get(p.id)?.correct).length;
    if (room.votes.size >= eligible) finishResults(room);
  });

  socket.on('game:next', ({code}, cb) => {
    const room = rooms.get(code);
    if (!room || room.hostId !== socket.id) return cb?.({ok:false,error:'للمضيف فقط'});
    if (room.phase !== 'results') return cb?.({ok:false,error:'انتظر نهاية الجولة'});
    room.questionIndex++;
    startRound(room);
    cb?.({ok:true});
  });

  socket.on('disconnect', () => {
    const code = socket.data.roomCode;
    const room = rooms.get(code);
    if (!room) return;
    room.players.delete(socket.id);
    if (room.players.size === 0 || room.hostId === socket.id) {
      io.to(code).emit('room:closed');
      rooms.delete(code);
    } else emitRoom(room);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => console.log(`Game running on http://localhost:${PORT}`));

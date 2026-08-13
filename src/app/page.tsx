'use client'

import { FormEvent, PointerEvent as ReactPointerEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { supabase } from '@/lib/supabase'

type Room = {
  id: string
  code: string
  status: 'lobby' | 'playing' | 'results'
  step: number
  total_steps: number
  host_player_id: string | null
}

type Player = {
  id: string
  room_id: string
  name: string
  seat: number
  client_token: string
}

type Chain = {
  id: string
  room_id: string
  origin_player_id: string
}

type Entry = {
  id: string
  chain_id: string
  author_player_id: string
  step: number
  kind: 'text' | 'drawing'
  content: string
}

const TOKEN_KEY = 'kharban-client-token'

function token() {
  let value = localStorage.getItem(TOKEN_KEY)
  if (!value) {
    value = crypto.randomUUID()
    localStorage.setItem(TOKEN_KEY, value)
  }
  return value
}

export default function Home() {
  const [screen, setScreen] = useState<'home' | 'room'>('home')
  const [name, setName] = useState('')
  const [joinCode, setJoinCode] = useState('')
  const [room, setRoom] = useState<Room | null>(null)
  const [players, setPlayers] = useState<Player[]>([])
  const [chains, setChains] = useState<Chain[]>([])
  const [entries, setEntries] = useState<Entry[]>([])
  const [me, setMe] = useState<Player | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const refresh = useCallback(async (roomId: string, clientToken?: string) => {
    const [roomRes, playersRes, chainsRes, entriesRes] = await Promise.all([
      supabase.from('rooms').select('*').eq('id', roomId).single(),
      supabase.from('players').select('*').eq('room_id', roomId).order('seat'),
      supabase.from('chains').select('*').eq('room_id', roomId),
      supabase.from('entries').select('*').eq('room_id', roomId).order('step')
    ])
    if (roomRes.error) throw roomRes.error
    setRoom(roomRes.data as Room)
    setPlayers((playersRes.data ?? []) as Player[])
    setChains((chainsRes.data ?? []) as Chain[])
    setEntries((entriesRes.data ?? []) as Entry[])
    const t = clientToken ?? token()
    const current = (playersRes.data ?? []).find((p: any) => p.client_token === t) as Player | undefined
    if (current) setMe(current)
  }, [])

  useEffect(() => {
    if (!room) return
    const channel = supabase
      .channel(`room-${room.id}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'rooms', filter: `id=eq.${room.id}` }, () => refresh(room.id))
      .on('postgres_changes', { event: '*', schema: 'public', table: 'players', filter: `room_id=eq.${room.id}` }, () => refresh(room.id))
      .on('postgres_changes', { event: '*', schema: 'public', table: 'chains', filter: `room_id=eq.${room.id}` }, () => refresh(room.id))
      .on('postgres_changes', { event: '*', schema: 'public', table: 'entries', filter: `room_id=eq.${room.id}` }, () => refresh(room.id))
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [room?.id, refresh])

  async function createRoom(e: FormEvent) {
    e.preventDefault()
    if (name.trim().length < 2) return setError('اكتب اسمًا من حرفين على الأقل.')
    setBusy(true); setError('')
    try {
      const t = token()
      const { data, error } = await supabase.rpc('create_game_room', { p_name: name.trim(), p_client_token: t })
      if (error) throw error
      const created = Array.isArray(data) ? data[0] : data
      await refresh(created.room_id, t)
      setScreen('room')
    } catch (e: any) { setError(e.message ?? 'تعذر إنشاء الغرفة') }
    finally { setBusy(false) }
  }

  async function joinRoom(e: FormEvent) {
    e.preventDefault()
    if (name.trim().length < 2) return setError('اكتب اسمًا من حرفين على الأقل.')
    if (joinCode.trim().length !== 5) return setError('كود الغرفة يتكون من 5 خانات.')
    setBusy(true); setError('')
    try {
      const t = token()
      const { data, error } = await supabase.rpc('join_game_room', { p_code: joinCode.trim().toUpperCase(), p_name: name.trim(), p_client_token: t })
      if (error) throw error
      const joined = Array.isArray(data) ? data[0] : data
      await refresh(joined.room_id, t)
      setScreen('room')
    } catch (e: any) { setError(e.message ?? 'تعذر دخول الغرفة') }
    finally { setBusy(false) }
  }

  async function startGame() {
    if (!room || !me) return
    setBusy(true); setError('')
    const { error } = await supabase.rpc('start_game', { p_room_id: room.id, p_client_token: token() })
    if (error) setError(error.message)
    await refresh(room.id)
    setBusy(false)
  }

  async function newRound() {
    if (!room) return
    setBusy(true)
    const { error } = await supabase.rpc('restart_game', { p_room_id: room.id, p_client_token: token() })
    if (error) setError(error.message)
    await refresh(room.id)
    setBusy(false)
  }

  if (screen === 'home') {
    return <main className="shell">
      <section className="hero card">
        <span className="badge">لعبة جماعية</span>
        <h1>خربانة 📺</h1>
        <p>اكتب جملة، خلّ غيرك يرسمها، وبعدها يبدأ التخمين والخراب.</p>
      </section>
      <section className="homeGrid">
        <form className="card stack" onSubmit={createRoom}>
          <h2>أنشئ غرفة</h2>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="اسمك" maxLength={20} />
          <button disabled={busy}>إنشاء غرفة جديدة</button>
        </form>
        <form className="card stack" onSubmit={joinRoom}>
          <h2>ادخل غرفة</h2>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="اسمك" maxLength={20} />
          <input className="codeInput" value={joinCode} onChange={e => setJoinCode(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0,5))} placeholder="ABCDE" />
          <button className="secondary" disabled={busy}>دخول</button>
        </form>
      </section>
      {error && <p className="error">{error}</p>}
    </main>
  }

  if (!room || !me) return <main className="shell"><div className="card">جاري تحميل الغرفة...</div></main>

  const isHost = room.host_player_id === me.id
  return <main className="shell">
    <header className="topbar card">
      <div><small>كود الغرفة</small><strong className="roomCode">{room.code}</strong></div>
      <div><small>اللاعبون</small><strong>{players.length}</strong></div>
    </header>
    {room.status === 'lobby' && <Lobby players={players} isHost={isHost} busy={busy} onStart={startGame} />}
    {room.status === 'playing' && <Game room={room} players={players} chains={chains} entries={entries} me={me} refresh={refresh} />}
    {room.status === 'results' && <Results players={players} chains={chains} entries={entries} isHost={isHost} onRestart={newRound} />}
    {error && <p className="error">{error}</p>}
  </main>
}

function Lobby({ players, isHost, busy, onStart }: { players: Player[], isHost: boolean, busy: boolean, onStart: () => void }) {
  return <section className="card stack">
    <h2>غرفة الانتظار</h2>
    <div className="players">{players.map((p, i) => <div className="player" key={p.id}><span>{i + 1}</span><b>{p.name}</b></div>)}</div>
    {isHost ? <button disabled={busy || players.length < 3} onClick={onStart}>{players.length < 3 ? 'نحتاج 3 لاعبين على الأقل' : 'ابدأ اللعبة'}</button> : <p className="muted">بانتظار صاحب الغرفة يبدأ اللعبة...</p>}
  </section>
}

function Game({ room, players, chains, entries, me, refresh }: { room: Room, players: Player[], chains: Chain[], entries: Entry[], me: Player, refresh: (id: string) => Promise<void> }) {
  const [text, setText] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const submitted = entries.some(e => e.author_player_id === me.id && e.step === room.step)
  const assignedChain = useMemo(() => {
    const n = players.length
    const originSeat = ((me.seat - room.step) % n + n) % n
    const origin = players.find(p => p.seat === originSeat)
    return chains.find(c => c.origin_player_id === origin?.id)
  }, [players, chains, me.seat, room.step])
  const previous = assignedChain ? entries.find(e => e.chain_id === assignedChain.id && e.step === room.step - 1) : undefined
  const kind: 'text' | 'drawing' = room.step % 2 === 0 ? 'text' : 'drawing'

  async function submit(content: string) {
    if (!assignedChain) return setError('السلسلة غير جاهزة بعد.')
    setBusy(true); setError('')
    const { error } = await supabase.rpc('submit_game_entry', {
      p_room_id: room.id,
      p_chain_id: assignedChain.id,
      p_client_token: token(),
      p_step: room.step,
      p_kind: kind,
      p_content: content
    })
    if (error) setError(error.message)
    await refresh(room.id)
    setBusy(false)
  }

  if (submitted) return <section className="card waiting"><div className="spinner"/><h2>تم الإرسال ✅</h2><p>ننتظر باقي اللاعبين...</p></section>

  if (!assignedChain) return <section className="card">نجهز دورك...</section>

  if (kind === 'text') {
    return <section className="card stack gameCard">
      <div className="stepPill">المرحلة {room.step + 1} من {room.total_steps}</div>
      {room.step === 0 ? <><h2>اكتب جملة غريبة</h2><p className="muted">اكتب شيئًا يمكن رسمه، وكلما كان أغرب كان أفضل.</p></> : <><h2>وش هذا الرسم؟</h2>{previous?.content && <img className="drawingPreview" src={previous.content} alt="رسم لاعب" />}</>}
      <form onSubmit={e => { e.preventDefault(); if (text.trim().length >= 2) submit(text.trim()) }} className="stack">
        <input value={text} onChange={e => setText(e.target.value)} placeholder={room.step === 0 ? 'مثال: دجاجة تسوق دراجة...' : 'اكتب تخمينك...'} maxLength={120} />
        <button disabled={busy || text.trim().length < 2}>إرسال</button>
      </form>
      {error && <p className="error">{error}</p>}
    </section>
  }

  return <section className="card stack gameCard">
    <div className="stepPill">المرحلة {room.step + 1} من {room.total_steps}</div>
    <h2>ارسم الجملة</h2>
    <div className="promptBox">{previous?.content ?? '...'}</div>
    <DrawingBoard disabled={busy} onSubmit={submit} />
    {error && <p className="error">{error}</p>}
  </section>
}

function DrawingBoard({ onSubmit, disabled }: { onSubmit: (data: string) => void, disabled: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const drawing = useRef(false)
  const last = useRef<{x:number,y:number} | null>(null)

  useEffect(() => {
    const c = canvasRef.current
    if (!c) return
    const ctx = c.getContext('2d')!
    ctx.fillStyle = '#fff'
    ctx.fillRect(0,0,c.width,c.height)
    ctx.lineWidth = 6
    ctx.lineCap = 'round'
    ctx.strokeStyle = '#18181b'
  }, [])

  function point(e: ReactPointerEvent<HTMLCanvasElement>) {
    const c = canvasRef.current!
    const r = c.getBoundingClientRect()
    return { x: (e.clientX-r.left)*(c.width/r.width), y:(e.clientY-r.top)*(c.height/r.height) }
  }
  function down(e: ReactPointerEvent<HTMLCanvasElement>) { drawing.current = true; last.current = point(e); e.currentTarget.setPointerCapture(e.pointerId) }
  function move(e: ReactPointerEvent<HTMLCanvasElement>) {
    if (!drawing.current || !last.current) return
    const c = canvasRef.current!, ctx=c.getContext('2d')!, p=point(e)
    ctx.beginPath(); ctx.moveTo(last.current.x,last.current.y); ctx.lineTo(p.x,p.y); ctx.stroke(); last.current=p
  }
  function up() { drawing.current=false; last.current=null }
  function clear() { const c=canvasRef.current!,ctx=c.getContext('2d')!;ctx.fillStyle='#fff';ctx.fillRect(0,0,c.width,c.height) }
  function send() { const c=canvasRef.current; if(c) onSubmit(c.toDataURL('image/webp', .72)) }

  return <div className="stack">
    <canvas ref={canvasRef} width={900} height={600} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} />
    <div className="actions"><button type="button" className="ghost" onClick={clear}>مسح اللوحة</button><button type="button" disabled={disabled} onClick={send}>إرسال الرسم</button></div>
  </div>
}

function Results({ players, chains, entries, isHost, onRestart }: { players: Player[], chains: Chain[], entries: Entry[], isHost: boolean, onRestart: () => void }) {
  return <section className="stack">
    <div className="card resultsHead"><span className="badge">النتائج</span><h2>شوفوا كيف خربت السوالف 😂</h2></div>
    {chains.map(chain => {
      const origin = players.find(p => p.id === chain.origin_player_id)
      const chainEntries = entries.filter(e => e.chain_id === chain.id).sort((a,b)=>a.step-b.step)
      return <article className="card chain" key={chain.id}>
        <h3>بدأها {origin?.name}</h3>
        {chainEntries.map((e, i) => {
          const author = players.find(p => p.id === e.author_player_id)
          return <div className="resultItem" key={e.id}><div className="resultMeta">{i+1}. {author?.name} — {e.kind === 'drawing' ? 'رسم' : 'كتب'}</div>{e.kind === 'drawing' ? <img src={e.content} alt="رسم" /> : <p>{e.content}</p>}</div>
        })}
      </article>
    })}
    {isHost ? <button onClick={onRestart}>جولة جديدة</button> : <p className="muted center">بانتظار صاحب الغرفة...</p>}
  </section>
}

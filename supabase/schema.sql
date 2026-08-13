create extension if not exists pgcrypto;

create table if not exists public.rooms (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  status text not null default 'lobby' check (status in ('lobby','playing','results')),
  step int not null default 0,
  total_steps int not null default 0,
  host_player_id uuid null,
  created_at timestamptz not null default now()
);

create table if not exists public.players (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references public.rooms(id) on delete cascade,
  name text not null check (char_length(name) between 2 and 20),
  seat int not null,
  client_token uuid not null,
  created_at timestamptz not null default now(),
  unique(room_id, seat),
  unique(room_id, client_token)
);

alter table public.rooms drop constraint if exists rooms_host_player_id_fkey;
alter table public.rooms add constraint rooms_host_player_id_fkey foreign key (host_player_id) references public.players(id) on delete set null;

create table if not exists public.chains (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references public.rooms(id) on delete cascade,
  origin_player_id uuid not null references public.players(id) on delete cascade,
  unique(room_id, origin_player_id)
);

create table if not exists public.entries (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references public.rooms(id) on delete cascade,
  chain_id uuid not null references public.chains(id) on delete cascade,
  author_player_id uuid not null references public.players(id) on delete cascade,
  step int not null,
  kind text not null check (kind in ('text','drawing')),
  content text not null,
  created_at timestamptz not null default now(),
  unique(room_id, author_player_id, step),
  unique(chain_id, step)
);

create index if not exists players_room_idx on public.players(room_id);
create index if not exists chains_room_idx on public.chains(room_id);
create index if not exists entries_room_idx on public.entries(room_id);
create index if not exists entries_chain_step_idx on public.entries(chain_id, step);

alter table public.rooms enable row level security;
alter table public.players enable row level security;
alter table public.chains enable row level security;
alter table public.entries enable row level security;

-- القراءة متاحة للعميل في هذا الـMVP. الكتابة تتم فقط عبر الدوال أدناه.
drop policy if exists "read rooms" on public.rooms;
create policy "read rooms" on public.rooms for select using (true);
drop policy if exists "read players" on public.players;
create policy "read players" on public.players for select using (true);
drop policy if exists "read chains" on public.chains;
create policy "read chains" on public.chains for select using (true);
drop policy if exists "read entries" on public.entries;
create policy "read entries" on public.entries for select using (true);

create or replace function public.make_room_code()
returns text language plpgsql as $$
declare chars text := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; out_code text := '';
begin
  for i in 1..5 loop out_code := out_code || substr(chars, 1 + floor(random()*length(chars))::int, 1); end loop;
  return out_code;
end $$;

create or replace function public.create_game_room(p_name text, p_client_token uuid)
returns table(room_id uuid, room_code text)
language plpgsql security definer set search_path=public as $$
declare r rooms; p players; c text;
begin
  if char_length(trim(p_name)) < 2 then raise exception 'الاسم قصير'; end if;
  loop
    c := make_room_code();
    begin
      insert into rooms(code) values(c) returning * into r;
      exit;
    exception when unique_violation then null;
    end;
  end loop;
  insert into players(room_id,name,seat,client_token) values(r.id,trim(p_name),0,p_client_token) returning * into p;
  update rooms set host_player_id=p.id where id=r.id;
  return query select r.id,c;
end $$;

create or replace function public.join_game_room(p_code text, p_name text, p_client_token uuid)
returns table(room_id uuid)
language plpgsql security definer set search_path=public as $$
declare r rooms; s int; p players;
begin
  select * into r from rooms where code=upper(trim(p_code)) for update;
  if not found then raise exception 'الغرفة غير موجودة'; end if;
  if r.status <> 'lobby' then raise exception 'اللعبة بدأت بالفعل'; end if;
  select * into p from players where room_id=r.id and client_token=p_client_token;
  if found then return query select r.id; return; end if;
  if (select count(*) from players where room_id=r.id) >= 12 then raise exception 'الغرفة ممتلئة'; end if;
  select coalesce(max(seat),-1)+1 into s from players where room_id=r.id;
  insert into players(room_id,name,seat,client_token) values(r.id,trim(p_name),s,p_client_token);
  return query select r.id;
end $$;

create or replace function public.start_game(p_room_id uuid, p_client_token uuid)
returns void language plpgsql security definer set search_path=public as $$
declare r rooms; host_ok boolean; n int;
begin
  select * into r from rooms where id=p_room_id for update;
  select exists(select 1 from players where id=r.host_player_id and client_token=p_client_token) into host_ok;
  if not host_ok then raise exception 'فقط صاحب الغرفة يقدر يبدأ'; end if;
  if r.status <> 'lobby' then raise exception 'الغرفة ليست في الانتظار'; end if;
  select count(*) into n from players where room_id=p_room_id;
  if n < 3 then raise exception 'نحتاج 3 لاعبين على الأقل'; end if;
  delete from entries where room_id=p_room_id;
  delete from chains where room_id=p_room_id;
  insert into chains(room_id,origin_player_id) select p_room_id,id from players where room_id=p_room_id;
  update rooms set status='playing',step=0,total_steps=n where id=p_room_id;
end $$;

create or replace function public.submit_game_entry(
  p_room_id uuid,
  p_chain_id uuid,
  p_client_token uuid,
  p_step int,
  p_kind text,
  p_content text
)
returns void language plpgsql security definer set search_path=public as $$
declare r rooms; p players; expected_kind text; expected_origin uuid; submitted_count int; n int;
begin
  select * into r from rooms where id=p_room_id for update;
  if r.status <> 'playing' or r.step <> p_step then raise exception 'هذه المرحلة انتهت أو لم تبدأ'; end if;
  select * into p from players where room_id=p_room_id and client_token=p_client_token;
  if not found then raise exception 'اللاعب غير موجود'; end if;
  expected_kind := case when p_step % 2 = 0 then 'text' else 'drawing' end;
  if p_kind <> expected_kind then raise exception 'نوع الإجابة غير صحيح'; end if;
  select id into expected_origin from players where room_id=p_room_id and seat=((p.seat-p_step)%r.total_steps+r.total_steps)%r.total_steps;
  if not exists(select 1 from chains where id=p_chain_id and room_id=p_room_id and origin_player_id=expected_origin) then raise exception 'هذه السلسلة ليست دورك'; end if;
  if length(p_content) < 2 then raise exception 'المحتوى فارغ'; end if;
  insert into entries(room_id,chain_id,author_player_id,step,kind,content) values(p_room_id,p_chain_id,p.id,p_step,p_kind,p_content);
  select count(*) into n from players where room_id=p_room_id;
  select count(*) into submitted_count from entries where room_id=p_room_id and step=p_step;
  if submitted_count = n then
    if p_step + 1 >= r.total_steps then update rooms set status='results' where id=p_room_id;
    else update rooms set step=step+1 where id=p_room_id;
    end if;
  end if;
end $$;

create or replace function public.restart_game(p_room_id uuid, p_client_token uuid)
returns void language plpgsql security definer set search_path=public as $$
declare r rooms; host_ok boolean; n int;
begin
  select * into r from rooms where id=p_room_id for update;
  select exists(select 1 from players where id=r.host_player_id and client_token=p_client_token) into host_ok;
  if not host_ok then raise exception 'فقط صاحب الغرفة يقدر يعيد الجولة'; end if;
  select count(*) into n from players where room_id=p_room_id;
  delete from entries where room_id=p_room_id;
  delete from chains where room_id=p_room_id;
  insert into chains(room_id,origin_player_id) select p_room_id,id from players where room_id=p_room_id;
  update rooms set status='playing',step=0,total_steps=n where id=p_room_id;
end $$;

revoke all on function public.create_game_room(text,uuid) from public;
revoke all on function public.join_game_room(text,text,uuid) from public;
revoke all on function public.start_game(uuid,uuid) from public;
revoke all on function public.submit_game_entry(uuid,uuid,uuid,int,text,text) from public;
revoke all on function public.restart_game(uuid,uuid) from public;
grant execute on function public.create_game_room(text,uuid) to anon, authenticated;
grant execute on function public.join_game_room(text,text,uuid) to anon, authenticated;
grant execute on function public.start_game(uuid,uuid) to anon, authenticated;
grant execute on function public.submit_game_entry(uuid,uuid,uuid,int,text,text) to anon, authenticated;
grant execute on function public.restart_game(uuid,uuid) to anon, authenticated;

-- فعّل الجداول في Realtime.
do $$ begin
  alter publication supabase_realtime add table rooms;
exception when duplicate_object then null; end $$;
do $$ begin
  alter publication supabase_realtime add table players;
exception when duplicate_object then null; end $$;
do $$ begin
  alter publication supabase_realtime add table chains;
exception when duplicate_object then null; end $$;
do $$ begin
  alter publication supabase_realtime add table entries;
exception when duplicate_object then null; end $$;

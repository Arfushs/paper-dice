-- ═══════════════════════════════════════════════════════════════════════════
-- Paper & Dice — session schema
--
-- Paste this whole file into Supabase → SQL Editor → New query → Run.
-- Safe to run more than once.
-- ═══════════════════════════════════════════════════════════════════════════

-- ── Rooms ──────────────────────────────────────────────────────────────────
-- One row per table/session. `code` is what players type to join.
create table if not exists public.rooms (
  id          uuid primary key default gen_random_uuid(),
  code        text unique not null,
  title       text not null default 'A new table',
  -- What the Story God is currently showing the players.
  scene_id    text,
  scene_note  text,
  -- Whose turn it is: an index into the initiative order, or null when not in combat.
  turn_index  int,
  turn_order  jsonb not null default '[]'::jsonb,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists rooms_code_idx on public.rooms (code);

-- ── Participants ───────────────────────────────────────────────────────────
-- The Story God plus every player at the table. The character sheet travels
-- as jsonb so the client's Character type stays the single source of truth.
create table if not exists public.participants (
  id           uuid primary key default gen_random_uuid(),
  room_id      uuid not null references public.rooms(id) on delete cascade,
  -- Browser-generated id so a player can reclaim their seat after a refresh.
  client_id    text not null,
  name         text not null,
  role         text not null default 'player' check (role in ('sg', 'player')),
  character    jsonb,
  -- Live values the Story God can adjust during play.
  hp_current   int,
  energy_current int,
  conditions   jsonb not null default '[]'::jsonb,
  initiative   int,
  joined_at    timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  unique (room_id, client_id)
);

create index if not exists participants_room_idx on public.participants (room_id);

-- Added later: the Story God can show an uploaded picture instead of a preset
-- scene, and can wear a portrait of their own.
alter table public.rooms        add column if not exists scene_image_url text;
alter table public.participants add column if not exists avatar_url      text;

-- ── Story God image library ────────────────────────────────────────────────
-- Pictures a Story God uploads ahead of time and can show in any order during
-- play. Keyed by the browser's client_id since there are no accounts.
create table if not exists public.sg_images (
  id         uuid primary key default gen_random_uuid(),
  client_id  text not null,
  path       text not null,
  url        text not null,
  label      text,
  sort       int  not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists sg_images_client_idx on public.sg_images (client_id, sort);

-- ── Rolls ──────────────────────────────────────────────────────────────────
-- The shared dice log. `payload` holds the RollResult from lib/dice.ts, so the
-- breakdown everyone sees is exactly what was rolled.
create table if not exists public.rolls (
  id          uuid primary key default gen_random_uuid(),
  room_id     uuid not null references public.rooms(id) on delete cascade,
  actor_name  text not null,
  actor_role  text not null default 'player',
  payload     jsonb not null,
  -- A Story God roll nobody else should see the result of.
  hidden      boolean not null default false,
  created_at  timestamptz not null default now()
);

create index if not exists rolls_room_idx on public.rolls (room_id, created_at desc);

-- ── Realtime ───────────────────────────────────────────────────────────────
-- Push changes to every connected client. Postgres has no "add table if not
-- exists" for publications, so check membership first — otherwise re-running
-- this file aborts with "already member of publication".
do $$
declare t text;
begin
  foreach t in array array['rooms', 'participants', 'rolls'] loop
    if not exists (
      select 1 from pg_publication_tables
      where pubname = 'supabase_realtime'
        and schemaname = 'public'
        and tablename = t
    ) then
      execute format('alter publication supabase_realtime add table public.%I', t);
    end if;
  end loop;
end $$;

-- Send the full old row on updates/deletes so clients can diff.
alter table public.rooms replica identity full;
alter table public.participants replica identity full;
alter table public.rolls replica identity full;

-- ── Row Level Security ─────────────────────────────────────────────────────
-- There is no login: joining is by room code. Anyone holding the publishable
-- key and a room's id can read and write that room. The code is obscurity, not
-- security — fine for a game with friends, not for anything sensitive.
--
-- Note: Supabase renamed its browser key to "publishable" (sb_publishable_…),
-- but unauthenticated requests still arrive as the Postgres role `anon`, so
-- these policies are the right ones to write.
alter table public.rooms        enable row level security;
alter table public.participants enable row level security;
alter table public.rolls        enable row level security;
alter table public.sg_images    enable row level security;

drop policy if exists "anon full access rooms"        on public.rooms;
drop policy if exists "anon full access participants" on public.participants;
drop policy if exists "anon full access rolls"        on public.rolls;
drop policy if exists "anon full access sg_images"    on public.sg_images;

create policy "anon full access rooms"
  on public.rooms for all to anon using (true) with check (true);

create policy "anon full access participants"
  on public.participants for all to anon using (true) with check (true);

create policy "anon full access rolls"
  on public.rolls for all to anon using (true) with check (true);

create policy "anon full access sg_images"
  on public.sg_images for all to anon using (true) with check (true);

-- ── Storage ────────────────────────────────────────────────────────────────
-- A public bucket for Story God scene pictures. Public read so players can see
-- them; anon write because there are no accounts.
insert into storage.buckets (id, name, public)
values ('scene-images', 'scene-images', true)
on conflict (id) do nothing;

drop policy if exists "public read scene images"  on storage.objects;
drop policy if exists "anon write scene images"   on storage.objects;
drop policy if exists "anon delete scene images"  on storage.objects;

create policy "public read scene images"
  on storage.objects for select
  using (bucket_id = 'scene-images');

create policy "anon write scene images"
  on storage.objects for insert to anon
  with check (bucket_id = 'scene-images');

create policy "anon delete scene images"
  on storage.objects for delete to anon
  using (bucket_id = 'scene-images');

-- ── Housekeeping ───────────────────────────────────────────────────────────
-- Keep updated_at honest.
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists rooms_touch on public.rooms;
create trigger rooms_touch before update on public.rooms
  for each row execute function public.touch_updated_at();

drop trigger if exists participants_touch on public.participants;
create trigger participants_touch before update on public.participants
  for each row execute function public.touch_updated_at();

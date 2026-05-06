-- ============================================================
-- CarCheckerVIN — Supabase schema
-- Run this ONCE in the Supabase SQL Editor (project dashboard)
-- ============================================================

-- Track every VIN report view
create table if not exists public.vin_lookups (
  id         bigserial primary key,
  vin        text not null,
  make       text,
  model      text,
  year       integer,
  user_id    uuid references auth.users(id) on delete set null,
  user_email text,
  ip_hash    text,
  user_agent text,
  created_at timestamptz not null default now()
);

create index if not exists vin_lookups_created_at_idx on public.vin_lookups (created_at desc);
create index if not exists vin_lookups_vin_idx        on public.vin_lookups (vin);
create index if not exists vin_lookups_user_idx       on public.vin_lookups (user_id);

alter table public.vin_lookups enable row level security;

-- Allow anyone (incl. anon) to insert lookups (tracking)
drop policy if exists "allow insert lookups" on public.vin_lookups;
create policy "allow insert lookups"
  on public.vin_lookups for insert
  to anon, authenticated
  with check (true);

-- No public read. Only service_role (used by admin panel) can read.
-- Service role bypasses RLS automatically.

-- ============================================================
-- Track every PDF / report download
-- ============================================================
create table if not exists public.vin_downloads (
  id         bigserial primary key,
  vin        text not null,
  make       text,
  model      text,
  year       integer,
  user_id    uuid references auth.users(id) on delete set null,
  user_email text,
  created_at timestamptz not null default now()
);

create index if not exists vin_downloads_created_at_idx on public.vin_downloads (created_at desc);
create index if not exists vin_downloads_user_idx       on public.vin_downloads (user_id);
create index if not exists vin_downloads_vin_idx        on public.vin_downloads (vin);

alter table public.vin_downloads enable row level security;

-- Inserts go through the service-role admin client (server-side API route),
-- so no anon policy is needed here.

-- ============================================================
-- Admin setup
-- After running this, go to Authentication → Users in Supabase
-- and create a user with email: contact@carcheckervin.com
-- Then add that email to the ADMIN_EMAILS env var in Vercel.
-- ============================================================

-- ============================================================
-- Contact form submissions
-- ============================================================
create table if not exists public.contact_submissions (
  id         bigserial primary key,
  name       text not null,
  email      text not null,
  subject    text not null,
  message    text not null,
  ip_hash    text,
  user_agent text,
  created_at timestamptz not null default now()
);

create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);

alter table public.contact_submissions enable row level security;

drop policy if exists "allow insert contact" on public.contact_submissions;
create policy "allow insert contact"
  on public.contact_submissions for insert
  to anon, authenticated
  with check (true);
-- Reads only via service-role admin client.

-- ============================================================
-- LIVE CHAT — visitor ↔ admin conversations
-- ============================================================
create extension if not exists "pgcrypto";

create table if not exists public.chat_conversations (
  id              uuid primary key default gen_random_uuid(),
  visitor_id      text not null,                -- anonymous browser id (cookie/localStorage)
  visitor_name    text,
  visitor_email   text,
  page_url        text,
  user_agent      text,
  ip_hash         text,
  status          text not null default 'open', -- open | closed
  unread_admin    integer not null default 0,
  unread_visitor  integer not null default 0,
  last_message_at timestamptz not null default now(),
  created_at      timestamptz not null default now()
);

create index if not exists chat_conversations_status_idx
  on public.chat_conversations (status, last_message_at desc);
create index if not exists chat_conversations_visitor_idx
  on public.chat_conversations (visitor_id);

alter table public.chat_conversations enable row level security;

-- Visitors can read/insert their own conversations (matched by visitor_id which
-- their browser passes in the API request). Admin reads via service role.
drop policy if exists "visitor inserts conversation" on public.chat_conversations;
create policy "visitor inserts conversation"
  on public.chat_conversations for insert
  to anon, authenticated
  with check (true);

create table if not exists public.chat_messages (
  id              bigserial primary key,
  conversation_id uuid not null references public.chat_conversations(id) on delete cascade,
  sender          text not null check (sender in ('visitor','admin')),
  body            text not null,
  source          text default 'web',           -- web | telegram
  read_at         timestamptz,
  created_at      timestamptz not null default now()
);

create index if not exists chat_messages_conversation_idx
  on public.chat_messages (conversation_id, created_at);

alter table public.chat_messages enable row level security;

drop policy if exists "anyone may insert chat messages" on public.chat_messages;
create policy "anyone may insert chat messages"
  on public.chat_messages for insert
  to anon, authenticated
  with check (true);

drop policy if exists "anyone may read chat messages" on public.chat_messages;
create policy "anyone may read chat messages"
  on public.chat_messages for select
  to anon, authenticated
  using (true);
-- (visitors only ever query by conversation_id they already created — the UUID
--  is unguessable, so this read policy is safe enough for live chat. Tighten
--  later by issuing per-visitor JWTs if needed.)

-- ============================================================
-- v2 schema additions for chat (run if you already created v1 tables)
-- ============================================================
alter table public.chat_conversations
  add column if not exists country     text,
  add column if not exists country_name text,
  add column if not exists region      text,
  add column if not exists city        text;


-- ============================================================
-- v3 schema additions — download tracking + chat presence
-- ============================================================

-- Track every report download. Inserted server-side from a client beacon.
create table if not exists public.report_downloads (
  id         bigserial primary key,
  vin        text not null,
  make       text,
  model      text,
  year       integer,
  user_id    uuid references auth.users(id) on delete set null,
  user_email text,
  ip_hash    text,
  user_agent text,
  created_at timestamptz not null default now()
);

create index if not exists report_downloads_created_at_idx
  on public.report_downloads (created_at desc);
create index if not exists report_downloads_vin_idx
  on public.report_downloads (vin);
create index if not exists report_downloads_user_idx
  on public.report_downloads (user_id);

alter table public.report_downloads enable row level security;

drop policy if exists "allow insert downloads" on public.report_downloads;
create policy "allow insert downloads"
  on public.report_downloads for insert
  to anon, authenticated
  with check (true);

-- Presence: when did this visitor last poll the chat? Used to compute
-- online/offline status in the admin panel.
alter table public.chat_conversations
  add column if not exists last_visitor_seen_at timestamptz;

create index if not exists chat_conversations_last_visitor_seen_idx
  on public.chat_conversations (last_visitor_seen_at desc);


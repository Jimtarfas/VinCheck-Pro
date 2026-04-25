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

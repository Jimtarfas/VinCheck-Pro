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
  geo_country text,
  geo_region  text,
  geo_city    text,
  created_at timestamptz not null default now()
);

-- Migration for existing installs (safe to re-run): add coarse geo columns.
alter table public.vin_lookups add column if not exists geo_country text;
alter table public.vin_lookups add column if not exists geo_region  text;
alter table public.vin_lookups add column if not exists geo_city    text;

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


-- ============================================================
-- v4 schema additions — saved VIN reports
-- ============================================================
-- Persists the full decode payload per user+VIN so reports survive
-- the browser cache and follow the user across devices. One row per
-- (user, VIN) — re-pulling the same VIN updates the snapshot in place.
create table if not exists public.vin_reports (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  vin         text not null,
  make        text,
  model       text,
  year        integer,
  report_data jsonb not null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  unique (user_id, vin)
);

create index if not exists vin_reports_user_updated_idx
  on public.vin_reports (user_id, updated_at desc);

alter table public.vin_reports enable row level security;

-- Reads + deletes by the owning user (their own data). Inserts/updates
-- flow through the service-role admin client, which bypasses RLS.
drop policy if exists "users read own reports" on public.vin_reports;
create policy "users read own reports"
  on public.vin_reports for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "users delete own reports" on public.vin_reports;
create policy "users delete own reports"
  on public.vin_reports for delete
  to authenticated
  using (auth.uid() = user_id);


-- ============================================================
-- ORDERS — paid VIN report purchases (ClearVin integration)
-- Lives behind the isolated /order/* flow; never touches existing tables.
-- ============================================================
create table if not exists public.report_orders (
  id                         uuid primary key default gen_random_uuid(),
  user_id                    uuid references auth.users(id) on delete set null,
  user_email                 text not null,
  vin                        text not null,
  vehicle_label              text,        -- "2021 Toyota Camry" — cached for receipts/emails

  -- Pricing
  amount_cents               integer not null,
  currency                   text not null default 'usd',

  -- Payment provider (Stripe)
  stripe_session_id          text unique,
  stripe_payment_intent_id   text,

  -- ClearVin response
  clearvin_report            jsonb,        -- the FULL unmodified report payload
  clearvin_fetched_at        timestamptz,
  clearvin_error             text,         -- populated if the API call failed

  -- Generated artifacts
  pdf_url                    text,         -- signed Supabase Storage URL or similar

  -- Lifecycle
  status                     text not null default 'pending'
    check (status in ('pending','paid','delivered','failed','refunded')),
  paid_at                    timestamptz,
  delivered_at               timestamptz,
  refunded_at                timestamptz,

  -- Metadata
  ip_hash                    text,
  user_agent                 text,
  created_at                 timestamptz not null default now()
);

create index if not exists report_orders_user_idx        on public.report_orders (user_id);
create index if not exists report_orders_email_idx       on public.report_orders (user_email);
create index if not exists report_orders_vin_idx         on public.report_orders (vin);
create index if not exists report_orders_status_idx      on public.report_orders (status, created_at desc);
create index if not exists report_orders_stripe_session_idx
  on public.report_orders (stripe_session_id);
create index if not exists report_orders_created_at_idx  on public.report_orders (created_at desc);

alter table public.report_orders enable row level security;

-- A signed-in user can read their own orders (looked up by user_id OR email
-- for guest-checkout-style purchases where the user signs in later with the
-- same email used at Stripe).
drop policy if exists "users read own orders" on public.report_orders;
create policy "users read own orders"
  on public.report_orders for select
  to authenticated
  using (
    auth.uid() = user_id
    OR auth.jwt() ->> 'email' = user_email
  );

-- All writes go through service-role server routes (Stripe webhook + admin
-- panel). No anon/authenticated insert policy on purpose.

-- ============================================================
-- ClearVin API call log — debugging, cost tracking, rate-limit forensics
-- ============================================================
create table if not exists public.clearvin_calls (
  id            bigserial primary key,
  endpoint      text not null,        -- "preview" | "full_report"
  vin           text not null,
  order_id      uuid references public.report_orders(id) on delete set null,
  status_code   integer,
  duration_ms   integer,
  error         text,
  request_id    text,                 -- ClearVin's X-Request-ID if returned
  created_at    timestamptz not null default now()
);

create index if not exists clearvin_calls_created_idx  on public.clearvin_calls (created_at desc);
create index if not exists clearvin_calls_endpoint_idx on public.clearvin_calls (endpoint, created_at desc);
create index if not exists clearvin_calls_vin_idx      on public.clearvin_calls (vin);

alter table public.clearvin_calls enable row level security;
-- No anon access; only service-role reads from /admin.

-- ============================================================
-- Blog bot run log — telemetry for the auto-publishing pipeline
-- ============================================================
-- One row per scheduled cron run. The bot reads this to compute the
-- 50-post auto-pause budget (counts ok=true runs in the current cycle)
-- and to surface a "last N runs" table on the admin dashboard.
create table if not exists public.bot_runs (
  id              bigserial primary key,
  run_id          text unique not null,         -- uuid generated client-side per run
  ok              boolean not null,
  started_at      timestamptz not null,
  ended_at        timestamptz not null,
  duration_ms     integer,
  post_slug       text,                          -- populated only when ok=true
  topic_rationale text,
  voice           text,
  error           text,
  input_tokens    integer,
  output_tokens   integer,
  usd_estimate    numeric(8,4),
  created_at      timestamptz not null default now()
);

create index if not exists bot_runs_created_idx on public.bot_runs (created_at desc);
create index if not exists bot_runs_ok_idx     on public.bot_runs (ok, created_at desc);

alter table public.bot_runs enable row level security;
-- No anon access; only service-role reads/writes.

-- ============================================================
-- Report credits — prepaid bundle balance (3/5/10 packs)
-- ============================================================
-- A bundle purchase delivers one report immediately (for the previewed VIN)
-- and grants the remaining N-1 as account credits the buyer can redeem on
-- other VINs for up to 12 months. Credits are keyed on BOTH user_id and
-- user_email: a freshly auto-provisioned account may not have user_id stamped
-- on the source order yet, so redemption matches by either (mirrors the
-- report_orders read policy).
create table if not exists public.report_credits (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid references auth.users(id) on delete cascade,
  user_email      text not null,
  source_order_id uuid references public.report_orders(id) on delete set null,
  bundle_size     integer not null,        -- 3 | 5 | 10 (count purchased)
  remaining       integer not null,        -- decremented on each redemption
  expires_at      timestamptz not null,    -- purchase + 12 months
  created_at      timestamptz not null default now(),
  constraint report_credits_remaining_nonneg check (remaining >= 0)
);

create index if not exists report_credits_user_idx    on public.report_credits (user_id);
create index if not exists report_credits_email_idx    on public.report_credits (lower(user_email));
create index if not exists report_credits_expires_idx  on public.report_credits (expires_at);

alter table public.report_credits enable row level security;

-- A signed-in user can read their own credit rows (by id OR email), so the
-- account page can show "X credits remaining". All writes go through
-- service-role server routes (webhook grant + redeem spend).
drop policy if exists "users read own credits" on public.report_credits;
create policy "users read own credits"
  on public.report_credits for select
  to authenticated
  using (
    auth.uid() = user_id
    OR auth.jwt() ->> 'email' = user_email
  );

-- New columns on report_orders to mark credit-funded redemptions and tag the
-- bundle "anchor" order. Safe to re-run.
alter table public.report_orders add column if not exists paid_via_credit boolean not null default false;
alter table public.report_orders add column if not exists credit_id       uuid references public.report_credits(id) on delete set null;
alter table public.report_orders add column if not exists bundle_size     integer;

-- Atomically consume one credit for a user. Picks the soonest-to-expire
-- non-empty, unexpired credit, decrements `remaining`, and returns its id.
-- Returns NULL when the user has no spendable credit. SECURITY DEFINER so it
-- runs with the table owner's rights; callers are service-role server routes.
-- The `for update skip locked` makes concurrent redemptions safe (two tabs
-- can't double-spend the same credit row).
create or replace function public.consume_report_credit(p_user uuid, p_email text)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_id uuid;
begin
  select id into v_id
    from public.report_credits
   where remaining > 0
     and expires_at > now()
     and (
       (p_user is not null and user_id = p_user)
       or lower(user_email) = lower(p_email)
     )
   order by expires_at asc
   for update skip locked
   limit 1;

  if v_id is null then
    return null;
  end if;

  update public.report_credits
     set remaining = remaining - 1
   where id = v_id;

  return v_id;
end;
$$;

-- Refund one credit back to a specific credit row (used when a credit-funded
-- ClearVin fetch fails, so the buyer never loses a credit to an API error).
create or replace function public.refund_report_credit(p_credit_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.report_credits
     set remaining = remaining + 1
   where id = p_credit_id;
end;
$$;

-- ─────────────────────────────────────────────────────────────────────
-- v5 schema additions — order-confirmation email tracking
-- ─────────────────────────────────────────────────────────────────────
-- The Stripe webhook sends a confirmation email (via Resend) after a
-- successful purchase. These three columns let the admin panel see at
-- a glance which orders received their email, when, and why a failure
-- happened. All optional — orders predating this migration stay NULL
-- and surface as "—" in the admin UI.
--
-- email_status enum:
--   NULL     — email never attempted (e.g. RESEND_API_KEY missing, or
--              order predates Wave 12).
--   'sent'   — Resend accepted the message (returned 200 + a message id).
--   'failed' — Resend rejected the message OR the send threw. The
--              reason is stored in email_error.
--   'skipped' — Send was intentionally bypassed (e.g. no buyer email
--              on the order row — shouldn't happen but defensive).
--
-- email_sent_at is set on every terminal status (sent / failed /
-- skipped) so we can show "attempted X ago" even on failures.
alter table public.report_orders add column if not exists email_status   text;
alter table public.report_orders add column if not exists email_sent_at  timestamptz;
alter table public.report_orders add column if not exists email_error    text;

-- Filter constraint kept loose so we never block a webhook on a typo.
-- The admin UI only renders the three documented states; anything else
-- prints as "—".
do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'report_orders_email_status_check'
  ) then
    alter table public.report_orders
      add constraint report_orders_email_status_check
      check (email_status is null or email_status in ('sent','failed','skipped'));
  end if;
end;
$$;

-- Wave 18 i18n: persist the buyer's locale on the order so the
-- post-purchase paid report renders in the same language they checked
-- out in (en, es, fr). Defaults to 'en' for back-compatibility with rows
-- created before this column existed.
alter table public.report_orders add column if not exists locale text default 'en';

-- Wave 19 i18n: French (fr) is now a valid locale. If the constraint was
-- created when only en/es were supported, drop and recreate it so fr-locale
-- orders aren't rejected at insert time. Idempotent — safe to re-run.
do $$
begin
  if exists (
    select 1 from pg_constraint where conname = 'report_orders_locale_check'
  ) then
    alter table public.report_orders
      drop constraint report_orders_locale_check;
  end if;
  alter table public.report_orders
    add constraint report_orders_locale_check
    check (locale in ('en','es','fr'));
end;
$$;

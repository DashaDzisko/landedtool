-- Landed — initial schema
-- Models the objects in docs/OOUX.md (Application, Chat, Account) + their nested
-- content, and mirrors the TS types in types/application.ts and types/chat.ts.
--
-- Apply via: Supabase SQL editor (paste), or `supabase db push` (CLI).

-- ─── Extensions ──────────────────────────────────────────────────────────────
create extension if not exists pgcrypto; -- gen_random_uuid()

-- ─── Enums ───────────────────────────────────────────────────────────────────
do $$ begin
  create type application_status as enum (
    'saved', 'applied', 'screening', 'interview', 'offer', 'rejected', 'withdrawn'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type message_role as enum ('user', 'agent');
exception when duplicate_object then null; end $$;

-- ─── Account: profile (1:1 with auth.users) ──────────────────────────────────
create table if not exists public.profiles (
  id            uuid primary key references auth.users (id) on delete cascade,
  display_name  text,
  cv            text,                 -- CV / experience summary for the agent
  target_roles  text,                 -- comma-separated, helps the agent
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ─── Application (the center object) ──────────────────────────────────────────
create table if not exists public.applications (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references auth.users (id) on delete cascade,
  company         text not null,
  role            text not null,
  status          application_status not null default 'saved', -- #1 attribute
  location        text,
  url             text,               -- link to the opening
  description     text,               -- job opening text
  source          text,               -- e.g. LinkedIn
  applied_at      date,
  salary_min      integer,
  salary_max      integer,
  salary_currency text default 'GBP',
  cv_url          text,               -- storage path in the `cvs` bucket
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- ─── Status entry (Application *has many* — the timeline) ─────────────────────
create table if not exists public.status_entries (
  id              uuid primary key default gen_random_uuid(),
  application_id  uuid not null references public.applications (id) on delete cascade,
  status          application_status not null,
  note            text,
  created_at      timestamptz not null default now()
);

-- ─── Note (Application *has many*) ────────────────────────────────────────────
create table if not exists public.notes (
  id              uuid primary key default gen_random_uuid(),
  application_id  uuid not null references public.applications (id) on delete cascade,
  body            text not null,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- ─── Contact (Application *has many*) ─────────────────────────────────────────
create table if not exists public.contacts (
  id              uuid primary key default gen_random_uuid(),
  application_id  uuid not null references public.applications (id) on delete cascade,
  name            text not null,
  role            text,
  email           text,
  created_at      timestamptz not null default now()
);

-- ─── Chat thread (Account *has many*) ────────────────────────────────────────
create table if not exists public.chats (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users (id) on delete cascade,
  title       text not null default 'New chat',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ─── Chat message (Chat *has many*) ──────────────────────────────────────────
create table if not exists public.chat_messages (
  id          uuid primary key default gen_random_uuid(),
  chat_id     uuid not null references public.chats (id) on delete cascade,
  role        message_role not null,
  content     text not null default '',
  widget      jsonb,                  -- the ChatWidget union (types/chat.ts), optional
  created_at  timestamptz not null default now()
);

-- ─── Indexes (foreign keys + common filters) ─────────────────────────────────
create index if not exists applications_user_idx        on public.applications (user_id);
create index if not exists applications_user_status_idx on public.applications (user_id, status);
create index if not exists status_entries_app_idx       on public.status_entries (application_id);
create index if not exists notes_app_idx                on public.notes (application_id);
create index if not exists contacts_app_idx             on public.contacts (application_id);
create index if not exists chats_user_idx               on public.chats (user_id);
create index if not exists chat_messages_chat_idx       on public.chat_messages (chat_id);

-- ─── Triggers ────────────────────────────────────────────────────────────────

-- keep updated_at fresh
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();

drop trigger if exists applications_updated_at on public.applications;
create trigger applications_updated_at before update on public.applications
  for each row execute function public.set_updated_at();

drop trigger if exists notes_updated_at on public.notes;
create trigger notes_updated_at before update on public.notes
  for each row execute function public.set_updated_at();

drop trigger if exists chats_updated_at on public.chats;
create trigger chats_updated_at before update on public.chats
  for each row execute function public.set_updated_at();

-- auto-create a profile when a user signs up
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'display_name',
                           split_part(new.email, '@', 1)));
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- append a status_entry whenever an application is created or its status changes
-- (implements OOUX "Application has many Statuses" / the timeline)
create or replace function public.log_status_change()
returns trigger language plpgsql as $$
begin
  if (tg_op = 'INSERT') or (new.status is distinct from old.status) then
    insert into public.status_entries (application_id, status)
    values (new.id, new.status);
  end if;
  return new;
end $$;

drop trigger if exists applications_status_log on public.applications;
create trigger applications_status_log
  after insert or update of status on public.applications
  for each row execute function public.log_status_change();

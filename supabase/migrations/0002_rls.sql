-- Landed — Row Level Security
-- Every row is owned by a user; users can only see/modify their own data.
-- Child tables (status_entries / notes / contacts / chat_messages) derive
-- ownership from their parent.

-- ─── Enable RLS everywhere ───────────────────────────────────────────────────
alter table public.profiles       enable row level security;
alter table public.applications   enable row level security;
alter table public.status_entries enable row level security;
alter table public.notes          enable row level security;
alter table public.contacts       enable row level security;
alter table public.chats          enable row level security;
alter table public.chat_messages  enable row level security;

-- ─── profiles ────────────────────────────────────────────────────────────────
drop policy if exists "profiles: own" on public.profiles;
create policy "profiles: own" on public.profiles
  for all to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

-- ─── applications ────────────────────────────────────────────────────────────
drop policy if exists "applications: own" on public.applications;
create policy "applications: own" on public.applications
  for all to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- ─── child tables of applications (ownership via parent) ─────────────────────
-- helper predicate: the parent application belongs to the current user
--   exists (select 1 from applications a where a.id = <child>.application_id
--           and a.user_id = auth.uid())

drop policy if exists "status_entries: via application" on public.status_entries;
create policy "status_entries: via application" on public.status_entries
  for all to authenticated
  using (exists (select 1 from public.applications a
                 where a.id = status_entries.application_id and a.user_id = auth.uid()))
  with check (exists (select 1 from public.applications a
                      where a.id = status_entries.application_id and a.user_id = auth.uid()));

drop policy if exists "notes: via application" on public.notes;
create policy "notes: via application" on public.notes
  for all to authenticated
  using (exists (select 1 from public.applications a
                 where a.id = notes.application_id and a.user_id = auth.uid()))
  with check (exists (select 1 from public.applications a
                      where a.id = notes.application_id and a.user_id = auth.uid()));

drop policy if exists "contacts: via application" on public.contacts;
create policy "contacts: via application" on public.contacts
  for all to authenticated
  using (exists (select 1 from public.applications a
                 where a.id = contacts.application_id and a.user_id = auth.uid()))
  with check (exists (select 1 from public.applications a
                      where a.id = contacts.application_id and a.user_id = auth.uid()));

-- ─── chats ───────────────────────────────────────────────────────────────────
drop policy if exists "chats: own" on public.chats;
create policy "chats: own" on public.chats
  for all to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- ─── chat_messages (ownership via parent chat) ───────────────────────────────
drop policy if exists "chat_messages: via chat" on public.chat_messages;
create policy "chat_messages: via chat" on public.chat_messages
  for all to authenticated
  using (exists (select 1 from public.chats c
                 where c.id = chat_messages.chat_id and c.user_id = auth.uid()))
  with check (exists (select 1 from public.chats c
                      where c.id = chat_messages.chat_id and c.user_id = auth.uid()));

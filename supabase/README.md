# Landed — Supabase

Database schema, security, and storage for Landed. Modeled on [../docs/OOUX.md](../docs/OOUX.md) and the
TS types in `types/application.ts` / `types/chat.ts`.

## Files (apply in order)

| File | What it does |
|------|--------------|
| `migrations/0001_init.sql` | Extensions, enums, tables, indexes, triggers (updated_at, profile-on-signup, status-timeline). |
| `migrations/0002_rls.sql` | Enables Row Level Security + per-user ownership policies on every table. |
| `migrations/0003_storage.sql` | Private `cvs` bucket + per-user file policies. |

## Schema at a glance

```
auth.users ──1:1── profiles
     │
     ├──1:many── applications ──┬──1:many── status_entries   (the status timeline)
     │                          ├──1:many── notes
     │                          ├──1:many── contacts
     │                          └── cv_url → storage bucket `cvs`
     │
     └──1:many── chats ──1:many── chat_messages (content + optional `widget` jsonb)
```

- **Status** is the #1 attribute (`application_status` enum, 7 values). A trigger appends a `status_entries`
  row on insert and on every status change → the OOUX "Application *has many* Statuses" timeline is
  maintained automatically.
- A trigger auto-creates a `profiles` row when a user signs up.

## How to apply

**Option A — SQL editor (quickest):** open the Supabase dashboard → SQL editor → paste each file in order
(0001 → 0002 → 0003) and run.

**Option B — CLI:**

```bash
supabase init          # once, if not already initialized (creates config.toml)
supabase link --project-ref <your-ref>
supabase db push       # applies everything in migrations/
```

(Local dev: `supabase start` runs Postgres in Docker and auto-applies these migrations.)

## Env vars the app needs

Add to `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://<your-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
# server-only, for the agent / privileged tasks (never expose to the client):
# SUPABASE_SERVICE_ROLE_KEY=<service-role-key>
```

## Open decisions (confirm before wiring the app)

- **Notes / contacts** are their own tables here (recommended — add/edit/delete each). The current UI keeps
  them as local state; wiring to these tables makes them persist.
- **CV** is a file in the `cvs` bucket (`applications.cv_url`). If you'd rather keep CV as text only, drop
  `cv_url` and use `profiles.cv` / a text column.
- **Auth** is magic-link (`signInWithOtp`), no passwords — matches the existing auth screens.

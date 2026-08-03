

## Why file structure matters

AI reads your files to understand your project. If your files are organized, AI finds things fast. If your files are messy, AI gets confused. It creates duplicate files. It puts code in the wrong place. It forgets where things are.

A clean structure saves you hours of fixing mistakes.

## The Landed structure

Here is the real structure of our job tracker. It looks like a lot, but each folder has one clear job:

```
JobTracker/
  app/
    (app)/                 # the signed-in shell (chat + Kanban)
      layout.tsx  page.tsx  settings/  applications/
    (auth)/                # sign-in, sign-up, privacy, terms
    api/
      chats/route.ts       # create and list chats
      chats/[chatId]/      # the streaming chat agent endpoint
    design/page.tsx        # in-app design-system showcase (/design)
    promo/                 # marketing landing page
    layout.tsx  globals.css
  components/
    atoms/                 # smallest parts: button, input, badge, text
    molecules/             # small combos: status-badge, message-bubble
    organisms/             # big blocks: kanban-board, chat-panel
    providers/             # shared state (applications, search)
    ui/                    # Radix wrappers: dialog, select, dropdown
  lib/
    ai/                    # the chat agent: prompts, tools, streaming
    db/                    # database calls: applications, chats, notes
    supabase/              # Supabase clients (client, server)
  types/                   # shared types: application, chat, user
  supabase/migrations/     # SQL: tables, RLS, storage
  proxy.ts                 # refreshes the Supabase session
```

### What each top folder does

- **/app** — Your pages and API routes. Route groups like `(app)` and `(auth)` group pages without changing the URL. `api/` holds server code, like the chat agent endpoint.
- **/components** — Reusable UI, built bottom-up: **atoms -> molecules -> organisms**. Small parts combine into bigger ones. `providers/` holds shared state and `ui/` holds Radix wrappers.
- **/lib** — Logic that is not UI. `ai/` is the chat agent, `db/` talks to the database, `supabase/` sets up the Supabase clients.
- **/types** — Shared TypeScript types, like the `Application` type and its statuses.
- **/supabase** — Database setup as SQL migrations, including Row Level Security.

## How to describe your structure to AI

Put a short version of this in your `CLAUDE.md`. AI will read it and know where to put new files.

```markdown
## Project structure
- /app - pages, layouts, and API routes
- /components/atoms - smallest UI parts (button, badge, input)
- /components/molecules - small combos (status-badge, message-bubble)
- /components/organisms - big blocks (kanban-board, chat-panel)
- /lib/ai - the chat agent
- /lib/db - database calls
- /types - shared types
```

You can also add rules about where things go:

```markdown
## File rules
- New pages go in /app
- A reusable part starts as an atom, then moves up if it grows
- Each component has its own folder
- Database calls go in /lib/db, never inside a component
```

## What happens when AI gets lost

Signs that AI is confused about your structure:

- It creates a new file instead of editing an existing one.
- It puts an organism inside /atoms, or a database call inside a component.
- It imports from a path that does not exist.
- It creates duplicate files with slightly different names.

### How to fix it

1. Tell AI where the file is. "The status badge is in /components/molecules/status-badge."
2. Update your `CLAUDE.md` with clearer structure info.
3. If AI created files in the wrong place, ask it to move them. "Move this card from /atoms to /organisms/dashboard."

## Tips

- Keep it flat. Two or three levels is enough.
- One component per folder. Do not stuff several into one file.
- Follow the atomic order: atoms first, then molecules, then organisms.
- When your project grows, update your `CLAUDE.md` so AI stays in sync.

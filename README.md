# Landed — AI job application tracker

A chat-first job application tracker. A multi-thread AI **chat** agent (left) is paired with a
status **Kanban** canvas of your applications (right). The agent reads your profile and
applications and answers in the chat with rich widgets (pipeline stats, application cards,
shortlists, status-change and draft-email actions). There is no dashboard — the stats live in
the conversation.

Built with **Next.js 16** (App Router), **React 19**, **TypeScript**, **Tailwind CSS v4**,
**Supabase** (Postgres + magic-link auth + RLS) and the **OpenAI** API.

## Quick start

Prerequisites: **Node.js LTS**, **npm**, and **git**.

```bash
# 1. install dependencies
npm install

# 2. set up environment variables
cp .env.example .env.local   # then fill in the values (see below)

# 3. run the app
npm run dev
```

Open **http://localhost:3009**.

### Environment variables (`.env.local`)

| Variable | What it is |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL (browser-safe) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key (browser-safe; safety comes from RLS) |
| `OPENAI_API_KEY` | Powers the chat agent — **server-only**, never exposed to the client |
| `OPENAI_MODEL` | Optional. Defaults to `gpt-4o-mini` |

Without `OPENAI_API_KEY` the chat falls back to a built-in mock agent, so the app still runs.

### Database

The schema lives in [`supabase/migrations/`](supabase/migrations). Apply it with the Supabase
SQL editor (paste each file) or `supabase db push`. Row Level Security is enabled on every
table — users only ever see their own rows.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server at http://localhost:3009 |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm test` / `npm run test:watch` | Vitest unit tests |
| `npm run storybook` | Component workshop at http://localhost:6006 |
| `npm run build-storybook` | Build the static Storybook |

## Project structure

```
app/            Next.js App Router — (app) shell, (auth) routes, api/chats, promo, design
components/     Atomic design — atoms → molecules → organisms, plus providers & ui
lib/            ai/ (the agent), db/ (Supabase data access), supabase/ (clients), utils
types/          Shared TypeScript types (application, chat, user)
supabase/       SQL migrations (schema, RLS, storage)
docs/           Object model (OOUX), design system, and the Course/ teaching material
```

Design tokens (colors, type, spacing) are CSS variables in [`app/globals.css`](app/globals.css)
— Tailwind v4 is CSS-first, so there is no `tailwind.config.ts`. See the in-app showcase at
`/design`.

## Docs

- [docs/OOUX.md](docs/OOUX.md) — the object model the whole app is built on
- [docs/project.md](docs/project.md) — architecture and features
- [docs/Course/](docs/Course/) — a full vibecoding course based on this repo (EN + RU)
- [docs/security-check-prompt.md](docs/security-check-prompt.md) — ready-made security review prompt

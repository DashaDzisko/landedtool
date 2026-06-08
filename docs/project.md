# Landed — Project structure

AI-powered, **chat-first** job application tracker. A Google-Stitch-style shell pairs a multi-thread chat
agent (left) with a status **Kanban** canvas of applications (right). The agent analyses the user's
profile, applications, and notes.

Object model & IA: [OOUX.md](./OOUX.md) · Design system: [design.md](./design.md).

## Main features

| Feature | Purpose |
|--------|---------|
| **Chat (AI agent)** | The home surface. Multi-thread conversations (`Current` / `History`) that analyse the user's data and reply with **agentic widgets** (stats chart, application card, shortlist, status-change, draft email). |
| **Applications canvas** | Status **Kanban** of applications. Drag across columns to change status; open a card for detail; **top-bar search** live-filters the board (role / company / location / status, via `SearchProvider`). No dashboard. |
| **Settings** | Profile, preferences, data export, account. |
| **Sign in / Sign up** | Supabase Auth magic link (email only; no password, no OAuth). |

---

## UI map

Authenticated app is a single **Chat + Canvas** shell. Auth routes use a minimal layout (no shell).

```
┌──────────────────────────────────────────────────────────────┐
│  Landed                                        ⚙ account   │
├────────────────────────────┬─────────────────────────────────┤
│  CHAT  (left pane)         │  CANVAS — Kanban (right pane)    │
│  ┌ Current ┐ ┌ History ┐   │   SAVED  APPLIED  INTERVIEW  …   │
│  🔍 search chats           │   ┌────┐ ┌────┐  ┌────┐          │
│  messages (Current)        │   │card│ │card│  │card│          │
│   — or —                   │   └────┘ └────┘  └────┘          │
│  grouped chat list (Hist.) │          ┌────┐                  │
│  ┌──────────────────────┐  │          │card│  (drag across    │
│  │ ask anything…     ⏎  │  │          └────┘   status cols)   │
│  └─ floating composer ──┘  │                                  │
└────────────────────────────┴─────────────────────────────────┘

   Canvas modes:  Board (Kanban, default)  ⇄  Detail (one app)  ⇄  New / Edit (form)

┌─────────────────────────┐     ┌─────────────────────────┐
│  /sign-in               │     │  /sign-up               │
│  email → send link      │     │  email → send link      │
│  “Check your email”     │     │  “Check your email”     │
└─────────────────────────┘     └─────────────────────────┘
              └────────────┬────────────┘
                           ▼
              /auth/callback (Supabase session)  →  /
```

### Routes

| Route | Section | Key UI blocks |
|-------|---------|----------------|
| `/sign-in` | Auth | Email field, “Send magic link”, check-email state, link to sign-up |
| `/sign-up` | Auth | Email field, “Send magic link”, terms, check-email state, link to sign-in |
| `/auth/callback` | Auth | Supabase exchanges email link for session; redirects to `/` |
| `/` | Home | Chat + Canvas shell: chat panel (left) + Kanban board (right) |
| `/applications/[id]` | Detail | Application detail (timeline, contact, notes, CV, job link) |
| `/applications/new` | Form | Add / edit application form |
| `/settings` | Settings | Single-view (no tabs): Profile · Account · Data & privacy · Danger zone, in two columns |

> **No `/dashboard`** and **no `/applications` list**. The top bar has **no object nav tabs** — just the
> **Landed** wordmark, a **＋ New application** button, search, and the **account menu** (`Settings` ·
> `Sign out`). Chat is the always-present left panel (multi-thread via Current/History tabs — no `/chat`
> route). Detail/form are currently `/applications/*` routes, to migrate into in-canvas modes later.

---

## UI component architecture (Atomic Design)

Build UI bottom-up: **atoms** → **molecules** → **organisms** (feature blocks). Pages in `app/` compose
organisms only; they should not import atoms directly except for rare one-offs.

```
atoms  →  molecules  →  organisms  →  pages (app/)
  │           │              │
  │           │              └── layout/, chat/, canvas/, dashboard/, settings/, auth/
  │           └── form-field, status-badge, message-bubble, chat-row, tab-switch, model-pill, …
  └── button, input, badge, icon, label, … (incl. shadcn via components/ui)
```

### Atoms (`components/atoms/`)

Smallest, single-purpose UI pieces. No business logic. Often thin wrappers around shadcn primitives.

| Atom | Examples |
|------|----------|
| **Actions** | `Button`, `IconButton`, `Link` |
| **Form** | `Input`, `Textarea`, `Label`, `Checkbox` |
| **Feedback** | `Badge`, `Spinner`, `Skeleton`, `Alert` |
| **Media** | `Icon`, `Avatar` |
| **Typography** | `Heading`, `Text`, `Muted` |

`components/ui/` — shadcn/Radix primitives. Atoms import from `ui/` and apply project tokens.

### Molecules (`components/molecules/`)

| Molecule | Atoms used | Used in |
|----------|------------|---------|
| `form-field` | `Label` + `Input` + error `Text` | Auth, settings, application form |
| `search-input` | `Input` + `Icon` | Chat search, filters |
| `status-badge` | `Badge` + status color variant | Application card, Kanban, detail |
| `tab-switch` | segmented `Button`s | Chat `Current` / `History` |
| `model-pill` | `Badge` + `Icon` | Composer |
| `chat-row` | `Icon` (chat dot) + `Text` | History list |
| `message-bubble` | `Text` only — agent = plain text, user = bubble (no avatar/timestamp) | Chat |
| `message-list` | `message-bubble` + `renderWidget` hook | Chat |
| `prompt-chip` | `Button` (outline) | Suggested prompts |
| `empty-state` | `Icon` + `Heading` + `Text` + `Button` | Empty chat / empty board |
| `user-menu-trigger` | `Avatar` + `Icon` | Top bar |

### Organisms (`components/organisms/`)

Feature-level blocks built from molecules and atoms. May hold hooks, Supabase calls, or GSAP refs.

| Folder | Organisms | Route / area |
|--------|-----------|----------------|
| `layout/` | `app-shell` (two-pane, `gap-3 p-3`), `top-bar`, `page-container`, `page-header`, `user-menu` | All `(app)` routes |
| `chat/` | `chat-panel` (rounded column), `chat-provider`, **widgets:** `chat-stats`, `chat-application-card`, `chat-shortlist`, `chat-status-change`, `chat-draft-email` | Left pane |
| `canvas/` | `kanban-board`, `kanban-column` | Right pane (home) |
| `dashboard/` | `application-card` (reused by Kanban + chat), `application-detail`, `application-form`, `application-contacts` | Kanban cards, `/applications/*` |
| `settings/` | `settings-view` (2-column cards), `profile-form` | `/settings` |
| `auth/` | `auth-layout`, `magic-link-form`, `check-email-message` | `/sign-in`, `/sign-up` |

> **Retired (legacy, removed):** `sidebar`, `nav-item`, `session-list`, `session-row`, `stat-metric`,
> `application-list`, `filters-bar`, `stats-cards`, `chat-thread`, `application-timeline`, `application-interviews`,
> `settings-tabs`, `data-export` — superseded by the chat-first shell,
> Kanban, and Current/History chat.

### Agentic chat widgets

The agent can reply with a **rich widget** instead of plain text. The data model stays serializable:

- `ChatMessage.widget?: ChatWidget` — a discriminated union (`pipeline-stats`, `application-card`,
  `application-shortlist`, `change-status`, `draft-email`), each carrying its own data (ids, target
  status, draft text).
- `message-list` exposes a **`renderWidget`** hook; `chat-panel` maps each widget type to its organism
  via a `switch` — adding a widget = union case + component + one `case`.
- The mock agent (`chat-provider`) routes intent to a widget in `resolveAgentResponse`; the real OpenAI
  agent replaces this with tool-calling. `ChatProvider` reads `useApplications()` so widgets resolve to
  live applications.

### Import rules

| Layer | May import |
|-------|------------|
| **Atoms** | `components/ui`, utilities, types |
| **Molecules** | atoms, `components/ui` |
| **Organisms** | molecules, atoms, hooks, `lib/*` |
| **Pages** | organisms (preferred), shell |

### Motion

GSAP targets organism/molecule DOM refs: stagger `application-card` children on filter/board change,
animate `message-bubble` on insert, slide the detached composer, fade between canvas modes. Config in
`lib/animations/`; respect `prefers-reduced-motion`.

### Storybook (design system catalog)

[Storybook](https://storybook.js.org) documents **atoms** and **molecules** in isolation before they ship
in organisms and pages. Organisms get stories later with mocked data (Supabase/OpenAI stubbed).

| Concern | Approach |
|---------|----------|
| **Framework** | `@storybook/nextjs` (App Router + Tailwind) |
| **Story location** | Colocated: `button.tsx` + `button.stories.tsx` |
| **Story IDs** | `Atoms/Button`, `Molecules/StatusBadge`, `Molecules/ChatRow` |
| **Styles** | Import `app/globals.css` in `.storybook/preview.ts`; tokens from [design.md](./design.md) |
| **Addons** | `@storybook/addon-essentials`, `@storybook/addon-a11y` |

**Scripts:** `npm run storybook` (port 6006), `npm run build-storybook` (static catalog).

**What to story first:** all atoms (variants, disabled, loading), then molecules (`status-badge` across
all statuses, `tab-switch`, `chat-row`, `message-bubble`). Skip organisms until mocks exist.

---

## Recommended stack

- **Framework:** Next.js (App Router) + TypeScript
- **Styling:** Tailwind CSS + Atomic Design (`components/atoms|molecules|organisms`) + shadcn (`components/ui`) — tokens in [design.md](./design.md)
- **Design system docs:** [Storybook](https://storybook.js.org)
- **Backend & database:** [Supabase](https://supabase.com) — PostgreSQL, Row Level Security, typed client
- **Auth:** [Supabase Auth](https://supabase.com/docs/guides/auth) — magic link via `signInWithOtp`
- **Drag & drop:** Kanban card → column to change status — a **custom pointer-drag** (Pointer Events, no
  dependency). The grabbed card lifts into a floating ghost (portal) that **tilts with the swing velocity,
  pivoting from the grab point, and settles upright at rest** (rAF + transform). Columns are tagged
  `data-status` and hit-tested with `elementFromPoint`; the home page wires `onMove` →
  `updateApplication(id, { status })` so the move persists. Clicks (no drag past a 6px threshold) still
  open the detail. Works on touch too (`touch-none`). **Edge auto-scroll:** dragging near the board's
  left/right edge scrolls it horizontally (speed ramps with proximity) — so you can drag e.g. Saved → Offer
  across off-screen columns; the drop target re-hit-tests as columns slide by.
- **Animation:** [GSAP](https://gsap.com) — composer, card stagger, message reveals, canvas-mode transitions
- **AI:** [OpenAI](https://platform.openai.com) — chat completions + function calling; agent runs server-side in `app/api/chat`

---

## Folder structure

```
Landed/
├── app/                              # Next.js App Router — pages & API
│   ├── layout.tsx                    # Root HTML, fonts, providers
│   ├── globals.css
│   │
│   ├── (auth)/                       # Route group: no app shell
│   │   ├── layout.tsx                # Centered auth layout
│   │   ├── sign-in/page.tsx
│   │   └── sign-up/page.tsx
│   │
│   ├── auth/
│   │   └── callback/route.ts         # Supabase magic-link callback
│   │
│   ├── (app)/                        # Route group: Chat + Canvas shell
│   │   ├── layout.tsx                # Two-pane shell + auth guard
│   │   ├── page.tsx                  # Home: current chat + Kanban board
│   │   ├── chat/
│   │   │   └── [chatId]/page.tsx     # A specific conversation thread
│   │   └── settings/page.tsx
│   │
│   └── api/
│       ├── applications/
│       │   ├── route.ts              # GET list, POST create
│       │   └── [id]/route.ts         # GET, PATCH (incl. status), DELETE
│       ├── chats/
│       │   ├── route.ts              # GET list (History), POST new thread
│       │   └── [chatId]/route.ts     # GET messages, POST message (OpenAI stream)
│       └── user/route.ts             # Profile read/update for agent context
│
├── components/
│   ├── ui/                           # shadcn/Radix primitives (atom source)
│   ├── atoms/                        # Single-purpose UI + *.stories.tsx
│   ├── molecules/                    # status-badge, tab-switch, chat-row, … + *.stories.tsx
│   └── organisms/
│       ├── layout/                   # app-shell, top-bar, page-container, page-header, user-menu
│       ├── chat/                     # chat-panel, chat-provider, chat-stats + widgets (card/shortlist/status-change/draft-email)
│       ├── canvas/                   # kanban-board, kanban-column
│       ├── dashboard/                # application-card, application-detail, application-form, application-contacts
│       ├── settings/                 # settings-view, profile-form
│       └── auth/                     # auth-layout, magic-link-form, check-email-message
│
├── .storybook/                       # Storybook config
│   ├── main.ts
│   └── preview.ts                    # globals.css, decorators, parameters
│
├── lib/
│   ├── supabase/                     # client.ts, server.ts, middleware.ts
│   ├── db/queries/                   # applications.ts, chats.ts, user.ts (RLS-scoped)
│   ├── ai/                           # openai.ts, agent.ts, tools.ts, prompts.ts, context.ts
│   ├── animations/                   # gsap-config.ts, presets.ts
│   └── utils/                        # dates.ts, validation.ts, status.ts (labels, colors, order)
│
├── hooks/
│   ├── use-applications.ts
│   ├── use-chats.ts                  # threads + messages
│   ├── use-user.ts
│   └── use-canvas.ts                 # board ⇄ detail ⇄ form state
│
├── types/
│   ├── application.ts                # + Status entry
│   ├── chat.ts                       # Chat thread + Message
│   └── user.ts
│
├── supabase/
│   ├── config.toml
│   └── migrations/                   # SQL schema, RLS policies
│
├── middleware.ts                     # Supabase session refresh + auth redirects
├── public/
├── docs/
│   ├── OOUX.md                       # Object model & IA (source of truth)
│   ├── project.md                    # This file
│   ├── design.md                     # Tokens, Stitch shell, status colors, Kanban
│   ├── agents.md                     # Agent build guide (dos/don'ts for coding agents)
├── .env.example                      # SUPABASE_*, OPENAI_API_KEY
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

---

## Data model (high level)

Two primary objects + a system object, per [OOUX.md](./OOUX.md). **Company and Contact are attributes of
Application, not separate objects.** Interviews are represented as **Status entries** + **Notes**.

| Entity | Notes | Used by |
|--------|-------|---------|
| **User** (`auth.users` + `profiles`) | Email (magic link), profile | Auth, settings, agent context |
| **Application** | role, company (text), current status, `appliedAt`, `url` (link to opening), **`description`** (job text), `location`, `source`, `salary`, contacts, CV ref | Canvas (Kanban/detail/form), agent tools |
| **StatusEntry** | one row per status change → the timeline; latest = current status | Kanban moves, agent context |
| **Note** | free text attached to an application; **add / edit / delete on the detail page** | Application detail, agent context |
| **Contact** | name (+ role, email); **add via ghost row on the detail page** | Application detail right column |
| **Chat** (thread) | a conversation; many per user | Chat pane `Current` / `History` |
| **ChatMessage** | user/agent turns; optional `widget: ChatWidget` for agentic responses | Message list, streaming API |
| **UserProfile** (optional) | CV text, skills, target roles | Settings + agent |

Application statuses: `saved` → `applied` → `screening` → `interview` → `offer` → `rejected` →
`withdrawn`. **Status is the #1 attribute** — it leads the card and defines the Kanban columns. An
application *has many* status entries (history); the latest is the current status. Status labels, colors,
and ordering live in `lib/status-colors.ts` (colors in [design.md](./design.md)).

### Application detail page (`/applications/[id]`)

Breadcrumb (`Applications › Company`) + title **`[Role] @ [Company]`**, **no tabs**, two columns:
**left** = Notes (add / edit / delete) + CV upload; **right** = Job description (Add/Edit inline) · Link to
opening · Contact (with a ghost `+ Add contact` inline form). The **edit form** (`ApplicationForm`) covers
the scalar attributes **+ Job description** — **Notes are not in the form**.
**Job description** can be set in the form *or* added/edited later on the detail page; **both persist** to
`Application.description` via `updateApplication`. *Notes, CV, and contacts are still local UI state (not
yet persisted — a one-pass `updateApplication` wire-up when wanted).*

---

## Supabase Auth (magic link)

1. User submits email on `/sign-in` or `/sign-up` → `supabase.auth.signInWithOtp({ email, options: { emailRedirectTo } })`.
2. Supabase sends the magic link; UI shows `check-email-message`.
3. User clicks link → `/auth/callback` exchanges code for session (cookie via `@supabase/ssr`).
4. `middleware.ts` refreshes session; `(app)/layout` redirects unauthenticated users to `/sign-in`.

Env: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `OPENAI_API_KEY` (server only).

---

## GSAP animation

| Area | Animation |
|------|-----------|
| **Auth** | Fade + slide form; check-email success state |
| **Shell** | Dotted-grid fade-in; pane reveal on mount |
| **Chat** | New messages slide/fade in; composer focus lift; history row highlight |
| **Canvas** | Card stagger on board load / filter; card move between columns; fade between board ⇄ detail |
| **Route changes** | Optional shared layout timeline via a transition hook |

Respect `prefers-reduced-motion` in `lib/animations/gsap-config.ts`.

---

## AI agent integration (OpenAI)

- **Model:** OpenAI chat model (e.g. `gpt-4o` / `gpt-4o-mini`) via `lib/ai/openai.ts`.
- **Entry:** `POST /api/chats/[chatId]` from `chat-composer` — streaming responses to the message list.
- **Context:** `lib/ai/context.ts` loads profile + applications (scoped by `auth.uid()` / RLS).
- **Tools:** OpenAI function calling in `lib/ai/tools.ts` — read-only first (`listApplications`,
  `getApplication`, `summariseStats`); optional writes later (`changeStatus`, `addNote`) which the agent
  can use to drive the Kanban canvas.
- **In-app agent prompts/tools** live in `lib/ai/` (`prompts.ts`, `tools.ts`, `agent.ts`). Build-agent guidance is in [agents.md](./agents.md).

---

## Testing & resilience

- **Unit tests:** [Vitest](https://vitest.dev) + Testing Library (jsdom). Config in `vitest.config.mts`
  (excluded from app `tsconfig`); run with `npm test`. Seeded with `lib/status-colors.test.ts`,
  `lib/utils.test.ts` (a **regression guard** for the `cn`/tailwind-merge font-size gotcha), and
  `components/atoms/rich-text.test.tsx`.
- **Route boundaries:** `app/(app)/error.tsx` (reset), `app/(app)/loading.tsx` (spinner), and a global
  `app/not-found.tsx` (404 → back to board).

---

## Implementation order (suggested)

1. Scaffold Next.js + Supabase (`lib/supabase`, `middleware.ts`, migrations + RLS)
2. UI foundation: shadcn `ui/` → **atoms** → **molecules** + **Storybook** (`status-badge`, `tab-switch`, `chat-row`, `message-bubble`)
3. Auth: Supabase OTP magic link, `/auth/callback`, auth **organisms**, protected `(app)` layout
4. Shell: two-pane `app-shell`, `top-bar`, `dotted-grid` background
5. Canvas: `kanban-board` + `application-card` + drag-to-change-status (custom pointer-drag w/ swing ghost → `updateApplication`); detail + form
6. Chat: `chat-pane` (tabs + search + history), `message-list`, `chat-composer` (detached, pinned)
7. AI: OpenAI streaming API + agent + tools (read-only, then status/note writes that move cards)
8. Settings: `profiles` table + settings organisms
9. Motion: GSAP on canvas (card stagger/move), chat (message reveal), shell
10. Polish: empty states, loading skeletons, error boundaries, reduced-motion; expand Storybook coverage

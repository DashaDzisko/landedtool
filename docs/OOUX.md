# Landed — OOUX

The object model and information architecture for Landed, produced with the **ORCA** process
(**O**bjects → **R**elationships → **C**alls to action → **A**ttributes). This is the foundation that
[design.md](./design.md) and [project.md](./project.md) must agree with before we build.

> Method reference: `ooux.html` (interactive OOUX workbook). This file is the *output* of that method.

---

## 1. Core objects

The product has **2 primary objects** plus **1 system object**.

| Object | What it is | Where it surfaces |
|--------|-----------|-------------------|
| **Chat** | An AI agent conversation. **Multi-thread** — the user has many chats. Chat-first home. | **Left pane**, with `Current` / `History` tabs + search-chats |
| **Application** | One job application the user is tracking. The center of the product. | The **canvas** (right pane) — Kanban board ⇄ detail ⇄ form. Not a separate route. |
| **Account** *(system)* | The user's profile, preferences, and data. Singleton (one per user). | Settings route (outside the shell) |

**Nested objects** (live *inside* a primary object, no standalone page of their own):

| Nested object | Lives inside | Why it's not a top-level object |
|---------------|-------------|--------------------------------|
| **Status entry** | Application | A point on the status timeline. Counted/listed, but never opened on its own. |
| **Contact person** | Application | Shown as a small card on the application detail. |
| **Note** | Application | Free text attached to an application. |
| **CV file** | Application | An uploaded attachment. |
| **Message** *(chat bubble)* | Chat | One turn in the conversation. Content, not a standalone page. |

---

## 2. Attributes

Listed **in display priority order** (top = shown first / most prominent).

### Application

**Primary attributes** — shown on the card and list row:

| # | Attribute | Type | Answers |
|---|-----------|------|---------|
| 1 | **Status** | status (current = latest entry) | "What state is it in?" — the lead, most-glanceable attribute |
| 2 | **Role name** | short text | "What is it?" |
| 3 | **Company name** | short text | "Where?" |
| 4 | **Date applied** | date | "When?" |

**Secondary attributes / content** — shown inside the application detail, in this order:

| # | Attribute | Type |
|---|-----------|------|
| 5 | **Job opening link** | URL |
| 6 | **Job opening text** | long text (content) |
| 7 | **Contact person** | nested — name (+ role/email) |
| 8 | **Notes** | long text (content) |
| 9 | **CV** | uploaded file |

### Chat

| Attribute | Type | Notes |
|-----------|------|-------|
| **Statistics** | derived metrics | e.g. total applications, by-status counts, interview rate. The agent surfaces these. |
| **Messages** | content (chat bubbles) | The conversation itself — user + agent turns. *Content, not a scalar attribute.* |

### Account

| Attribute | Type |
|-----------|------|
| **Email** | from auth (magic link) |
| **Profile / preferences** | settings fields |
| **Data export** | action surface, not a value |

---

## 3. Calls to action (verbs)

What the user can **do** with each object.

### Application
- **Add application** (create)
- **Edit application** (modify)
- **Change status** — move along the status timeline (modify, repeatable → many statuses)
- **Add / edit note** (modify)
- **Add contact person** (modify)
- **Upload CV** (modify)
- **Open job link** (interact)
- **Archive / delete** (interact)

### Chat
- **Send message** (create a turn)
- **Ask about my applications** (the agent reads Applications)
- **View statistics** (interact)

### Account
- **Edit profile** (modify)
- **Export data** (interact)
- **Sign out** (interact)

---

## 4. Relationships

| Relationship | Cardinality | Required? |
|--------------|-------------|-----------|
| Account **has many** Applications | 1 → many | optional (can be empty) |
| Account **has many** Chats | 1 → many | optional (Current + History threads) |
| Application **has many** Status entries | 1 → many | required (≥1: created with a status) |
| Application **has many** Notes | 1 → many | optional |
| Application **has one** Contact person | 1 → 1 | optional |
| Application **has one** CV | 1 → 1 | optional |
| Chat **has many** Messages | 1 → many | optional |
| Chat **reads** Applications | reference | the agent analyses the user's applications for context |

> Each **"has many"** implies a list nested inside a detail screen (see §5).

---

## 5. Nesting (objects shown inside other objects)

**Application — list / card** (compact): status, role name, company name, date applied.

**Application — detail** nests:
- **Status timeline** — the many Status entries (date + label per entry), latest highlighted.
- **Contact card** — name, role/email.
- **Notes** — the note(s).
- **CV** — file chip (name, download).
- **Job opening** — link + text.

**Chat + Canvas (the home shell)** — a persistent two-pane split, **chat-first**, styled after Google
Stitch (dark canvas, dotted grid, a *detached* composer that stays pinned):

- **Chat pane** (left) nests:
  - Two tabs: **`Current`** (the active conversation) and **`History`** (all past chats).
  - **Search chats** field.
  - **Current tab** → **Messages** (chat bubbles, user right / agent left) + the **floating composer**
    (detached card, doesn't touch borders, pinned). The agent surfaces **Statistics** *in conversation*
    ("3 interviews this week") — no separate dashboard.
  - **History tab** → a scrollable, **time-grouped list of Chats** (Last 7 days / This year / …), each
    row = title + date; search filters it.
- **Canvas pane** (right) shows the Applications, in one of two modes:
  - **Board mode (default)** — a **status Kanban**: columns = statuses, Application cards flow across.
    Each card shows the primary attributes (status badge, role, company, date). Driven by the agent
    ("show rejected") and directly interactive (drag to change status, click to open).
  - **Detail mode** — one Application fully expanded (status timeline, contact, notes, CV, job opening),
    replacing the board until dismissed.

---

## 6. Attribute prioritisation (top-of-card)

For the most important object, **Application**, the three-then-four lead attributes:

1. **Status** — what state (the lead; rendered as a colored badge, most glanceable)
2. **Role name** — what it is
3. **Company name** — where
4. **Date applied** — when

This ordering drives every card, list row, and the dashboard.

---

## 7. Screens & information architecture

**Chat-first / agentic, Stitch-style.** There is **no dashboard**. The home screen is the **Chat + Canvas**
shell: a persistent split with the multi-thread chat on the left and the Applications Kanban on the right.
The "stats" a dashboard would have shown are surfaced *by the agent in conversation*. Applications are
**canvas modes**, not separate routes.

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
```

| Object | Where it lives | States |
|--------|----------------|--------|
| **Chat** | **Left pane.** Multi-thread. | `Current` (messages + floating composer) ⇄ `History` (search + grouped list of chats) |
| **Application** | The **canvas** (right pane) — not a route. | **Board mode** (status Kanban, default) ⇄ **Detail mode** (one application) ⇄ **New / Edit** (form, opens in canvas or as overlay) |
| **Account** | Its own route (chrome, not canvas). | Settings (profile, data export, sign out) |

### Navigation

No object tabs in the top bar. Chat-first means the shell *is* the home. The top bar holds the
**Landed** wordmark, a **＋ New application** button, search, and the **account menu** (`Settings` ·
`Sign out`). **Within the chat pane**, `Current` / `History` switch threads.

```
Landed          ＋ New application   🔍   account ▾ (Settings · Sign out)
```

The user moves between Applications **by talking to the agent or interacting with the Kanban** (filter,
open a card, drag across status columns) — and between conversations via `Current` / `History`.

### Full screen / state list

- **Home** — Chat + Canvas shell (the whole app)
  - Chat · **Current** — active conversation (messages + floating composer)
  - Chat · **History** — search + time-grouped list of past chats
  - Canvas · **Board mode** — status Kanban of Application cards (default)
  - Canvas · **Detail mode** — one Application (status timeline, contact, notes, CV, job opening)
  - Canvas · **New / Edit** — add or edit an Application
- **Settings** — profile, data export, account, sign out
- **Auth** — sign in / sign up (magic link)

---

## 8. Checklist

- [x] **2–3 core objects defined** — Application, Chat (+ Account). ✔ §1
- [x] **Each object has its attributes** — Application 9, Chat 2, Account 3. ✔ §2
- [x] **Each object has ≥3 actions** — verbs listed. ✔ §3
- [x] **Relationships described** — every "has many" → a nested list. ✔ §4
- [x] **Nested objects identified** — Status, Contact, Note, CV, Message. ✔ §5
- [x] **Top-of-card attributes ranked** — role, company, status, date. ✔ §6
- [x] **Top navigation defined** — Dashboard · Applications · Chat · Settings. ✔ §7
- [x] **Full screen list drafted** — ✔ §7

---

## Open questions (carry into design.md / project.md)

1. **Company & Contact as objects?** Currently **attributes**, not standalone objects (per your spec).
   `design.md` and `project.md` still reference Company / Interview / Contact as separate objects — those
   need to be reconciled *down* to this model.
2. **Interviews** — not a separate object here; they're represented as **Status entries** (e.g. status =
   "interview") and **Notes**. Confirm that's the intent.
3. **Chat sessions** — ✅ resolved: **multi-thread**. Account has many Chats; the left pane has
   `Current` / `History` tabs + search. (Stitch-style grouped history list.)

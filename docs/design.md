# Landed — Design system

**Aura Bento × Stitch** — deep charcoal canvas with a subtle **dotted grid**, pastel salmon + light blue
accents, and a **chat-first shell** styled after Google Stitch: a left **Chat** pane (Current / History
tabs + search + a *detached, pinned* composer) beside a right **Canvas** pane (status **Kanban** of
applications). No dashboard.

Object model & IA: [OOUX.md](./OOUX.md). Implementation: `app/globals.css`.

---

## Color palette

| Token | Hex | Use |
|-------|-----|-----|
| `--color-canvas` | `#0D0D0D` | Primary background (carries the dotted grid) |
| `--color-surface-1` | `#1A1A1A` | Panes, cards, chat composer, sidebar |
| `--color-surface-3` | `#242424` | Inputs, toggles, elevated controls |
| `--color-primary` | `#F4A988` | Primary CTAs, send button, active tab, salmon featured cards |
| `--color-on-primary` | `#1A1A1A` | Text on salmon surfaces |
| `--color-accent-blue` | `#C5D8E1` | Secondary highlights, blue featured cards |
| `--color-on-accent-blue` | `#1A1A1A` | Text on blue surfaces |
| `--color-ink` | `#FFFFFF` | Primary text |
| `--color-ink-subtle` | `#909090` | Labels, secondary text, group headers |
| `--color-border` | `#242424` | Hairline separators, input outlines |
| `--color-grid-dot` | `rgba(255,255,255,0.04)` | Dotted-grid dots on the **canvas pane** |
| `--color-grid-line` | `rgba(255,255,255,0.035)` | Squared "graph-paper" cells inside **Kanban columns** |
| `--color-scrollbar` | `rgba(255,255,255,0.16)` | Thin styled scrollbar thumb (hover `0.28`) |

Depth comes from color layering (black vs dark gray) and the grid textures, **not** heavy shadows.

### Status colors (drives the Kanban + status badge)

Status is the **#1 application attribute**. Pastel tints, dark text (`#1A1A1A`) on each:

| Status | Token | Hex | Feel |
|--------|-------|-----|------|
| Saved | `--status-saved` | `#909090` | neutral / parked |
| Applied | `--status-applied` | `#C5D8E1` | in motion (blue) |
| Screening | `--status-screening` | `#A9C7D6` | in motion (blue, deeper) |
| Interview | `--status-interview` | `#F4A988` | active / hot (salmon) |
| Offer | `--status-offer` | `#BFE3C8` | win (pastel green) |
| Rejected | `--status-rejected` | `#E7B6B6` | closed (pastel rose) |
| Withdrawn | `--status-withdrawn` | `#6E6E6E` | closed / dimmed |

---

## Radius scale

| Token | Value | Use |
|-------|-------|-----|
| `--radius-sm` | 6px | Badges, nav/list items |
| `--radius-md` | 8px | Buttons, inputs, chips, toggles |
| `--radius-bento` | 12px | Cards, Kanban cards, **Kanban columns**, **the chat panel** (rounded column) |
| `--radius-lg` | 10px | Large surfaces |
| `--radius-composer` | 16px | Reserved for large detached surfaces |
| `--radius-pill` | 9999px | Avatars, icon circles, status bars, model pill |

---

## Typography

**Font:** [Strichpunkt Sans](https://fonts.google.com/specimen/Strichpunkt+Sans) via Google Fonts.
Large, light-weight hero heading for empty/welcome states (Stitch-style "Welcome").

**Icons:** [Phosphor Icons](https://phosphoricons.com) via `@phosphor-icons/react` — default `regular`,
`fill` for the brand sparkle / active states.

| Style | Use |
|-------|-----|
| `text-hero` (light, ~48px) | Empty-state welcome heading |
| `text-chat` (12px) | Chat bubbles, dense rows |
| Body / labels | Per Strichpunkt defaults; `--color-ink-subtle` for group headers |

---

## Layout — the Stitch-style shell

Persistent **two-pane split** inside the authenticated app. The whole canvas sits on `--color-canvas`
with the dotted grid. Auth routes use a minimal centered layout (no shell).

```
┌──────────────────────────────────────────────────────────────┐
│  CHAT pane               │ Landed   ＋ New application 🔍 account ▾ │  top bar
├────────────────────────────┬─────────────────────────────────┤
│  CHAT pane (surface-1)     │  CANVAS pane (canvas + grid)     │
│  ┌ Current ┐ ┌ History ┐   │   SAVED  APPLIED  INTERVIEW  …   │  Kanban columns
│  🔍 search chats           │   ┌────┐ ┌────┐  ┌────┐          │
│  messages…                 │   │card│ │card│  │card│          │  application cards
│  ┌──────────────────────┐  │   └────┘ └────┘  └────┘          │
│  │ ask anything…     ⏎  │  │                                  │
│  └─ detached composer ──┘  │   (drag cards across columns)    │
└────────────────────────────┴─────────────────────────────────┘
```

The shell uses `gap-3 p-3` so both the chat panel and the canvas read as **floating rounded columns** on
the dotted canvas — visually consistent with each other.

**Responsive:** two panes side by side at **`lg`+** (chat fixed 360px). Below `lg` the panes don't fit, so
the shell shows **one at a time** — defaulting to the **Board** — with a floating **Board / Chat** toggle
pinned bottom-center (`max-lg:pb-16` reserves room for it). `AppShell` holds the `mobilePane` state.

- **Top bar** — spans the canvas pane. **"Landed" wordmark** left (its left edge aligns with the
  first Kanban column — top bar uses the same `px-2 md:px-4` gutter as the canvas). Right: **＋ New
  application** button → `/applications/new`, a **search** (icon toggles an inline field that live-filters
  the Kanban by role / company / location / status; X clears & closes), and the **account menu**
  (`Settings` · `Sign out`). **No object nav tabs** (Home/Settings live in the account menu).
- **Chat pane (left)** — a **rounded column** (`rounded-bento`, full hairline border, `surface-1`,
  `overflow-hidden`) — same treatment as a Kanban column. Top row = full-width `Current` / `History`
  **tabs** + a **＋** new-chat button (same height as the tabs).
  - **Current** → the conversation + a **composer** pinned at the bottom: an auto-growing input (matches
    the message text size, grows with content up to a cap then scrolls) beside a circular salmon **send
    button** — **no wrapper box** around them.
  - **History** → search-chats input + a scrollable list of `ChatRow`s (title + date), hover highlight.
- **Canvas pane (right)** — `--color-canvas` + dotted grid. Default = **Kanban**: status columns (rounded,
  squared-cell texture inside), each holding `ApplicationCard`s. Click a card → **detail mode**
  (timeline, contact, notes, CV, job link). **New / Edit** opens a form.
- **Messages** — **no timestamps, no avatars**. The agent replies as **plain text** (no bubble); the
  user's turn is a right-aligned salmon-tinted **bubble**. Same text size for both. Content renders
  **inline markdown** (`**bold**` · `*italic*` · `` `code` ``) via the `RichText` atom; line breaks/bullets
  preserved. *(For block markdown — lists, headings, links, tables — swap in `react-markdown` when the real
  OpenAI agent lands.)*

## Spacing

| Token / class | Value | Use |
|---------------|-------|-----|
| `--space-page` | 32px | Outer canvas padding, between major regions |
| `--space-section` | 20px | Section title → content; Kanban column gap |
| `--space-card` | 20px | Card padding (`p-5`) |
| `--space-block` | 16px | Forms, filters, composer inner padding |
| `--space-pane` | 0 | Panes meet on a 1px `--color-border` divider |

---

## Routes (chat-first, as built)

| Route | Purpose |
|-------|---------|
| `/` | Home — Chat + Canvas shell (chat panel + Kanban board) |
| `/applications/[id]` | Application detail |
| `/applications/new` | Add application form |
| `/settings` | Profile, data export, account |
| `/sign-in`, `/sign-up` | Auth (magic link) |

> **No `/dashboard`.** There are no object nav tabs — the only top-bar chrome is the **＋ New
> application** button and the **account menu** (`Settings` · `Sign out`). The Kanban board is the home
> canvas; chat is the always-present left panel (multi-thread via Current/History, no separate `/chat`
> route). Detail and form currently live as `/applications/*` routes (to migrate into canvas modes later).

---

## Components

**Textures & scrollbars** (utilities in `app/globals.css`)
- **`.bg-canvas-grid`** — dotted grid on the canvas pane.
- **`.bg-grid-cells`** — squared "graph-paper" cell texture; overlays the element's bg (Kanban columns).
- **`.scroll-styled`** — thin, rounded, subtle scrollbar (chat lists, Kanban, message list).
- **`.no-scrollbar`** — fully hidden scrollbar but still scrollable (the composer input).
- **`.animated-branded-border`** — wrap a control to give it a spinning salmon→blue gradient border
  (rotating `::before` conic-gradient; respects `prefers-reduced-motion`). Used on **Ask agent**.

**Shell & chat**
- **Chat panel** — a **rounded column** (`rounded-bento`, hairline border, `surface-1`, clipped), floating
  on the canvas. Header row = `Current`/`History` tabs + ＋ button.
- **Composer** — auto-growing input (no wrapper box) + circular salmon send button; input text size
  matches the conversation; scrollbar hidden.
- **Segmented tabs** (`Current` / `History`) — `surface-3` track, salmon active pill; `fluid` = full width.
- **Model pill** — `--radius-pill`, `surface-3`, sparkle icon (DS atom; not yet in the live composer).
- **Search-chats input** — `rounded-md`, `surface-3`, magnifier icon.
- **Chat history row** (`ChatRow`) — chat dot + title (`text-xs`) + date; grouped by time; hover highlight.
- **Message** — agent = plain text (no bubble/avatar/timestamp); user = right-aligned salmon-tinted bubble;
  both the same size.

**Agentic chat widgets** (rich responses rendered inline beneath an agent message)
- **Pipeline stats** — summary metrics + per-status bar chart (status colors).
- **Application card** — the real `ApplicationCard` rendered for a single application.
- **Shortlist** — ranked mini-cards (status badge · role · company · reason).
- **Change-status confirm** — `current → target` status with Confirm / Cancel (UI; wires to canvas later).
- **Draft email** — editable subject + body with Copy.
- Driven by a serializable **`ChatWidget`** union + a `renderWidget` hook (see project.md).

**Canvas (applications)**
- **Kanban board** — horizontal status columns; styled horizontal scrollbar.
- **Kanban column** — rounded (`rounded-bento`), hairline border; status-badge header + count; body carries
  the squared-cell texture + styled vertical scrollbar.
- **ApplicationCard** — `bento-card`, hugs content; company · role · location · date. **`statusDisplay`**
  prop: `"badge"` (default — the status pill, used in chat widget / standalone) or `"hidden"` (no pill;
  used **inside the Kanban**, where the column already states the status — the pastel statuses are too
  close to read as a card-level color cue, so the column is the single source of truth).
- **Status badge** — `rounded-sm`, status color fill, dark text.
- **Application detail** (`/applications/[id]`) — **breadcrumb** (`Applications › Company`) on the left,
  title **`[Role] @ [Company]`**, status row (status · location · source · applied date), and actions
  **Ask agent** (spinning branded-gradient border) · **Edit** · **Delete**. **No tabs** — a **two-column** body:
  - **Left:** **Notes** (list with add input + per-row **edit / delete**) and **CV** (upload button → file chip).
  - **Right:** **Job description** (Add/Edit inline → persists, + Salary divider), **Link to opening**, and
    **Contact** (list + a ghost `+ Add contact` row that opens an inline name/role/email form).
- **Application form** — New / Edit dialog: company, role, status, location, source, URL, applied date,
  **Job description**. **Notes are not in the form** — they're managed on the detail page. Job description
  can also be **added/edited later** on the detail page (both paths persist to `Application.description`).

**Primitives**
- **Buttons** — `rounded-md`, salmon primary with dark text; ghost variant for top-bar icons.
- **Inputs** — `rounded-md`, `surface-3` fill.
- **Cards** — `bento-card` (`#1A1A1A`), `bento-card-featured` (salmon), `bento-card-accent` (blue).

> **Gotchas (project conventions):**
> - `cn()` (in `lib/utils.ts`) extends tailwind-merge so the custom typographic utilities (`text-body`,
>   `text-chat`, …) are treated as font-sizes — otherwise they get stripped next to a color class.
> - **`.border-hairline` draws a full 1px border on all four sides** (it's a shorthand, not a color). For a
>   single-edge divider use `border-t border-white/5` (or a `Separator`), **not** `border-t border-hairline`.
> - The `size="icon"` button variant carries `min-h-10 min-w-10` (40px) — to make a smaller icon button,
>   override the mins too (`h-9 min-h-9 w-9 min-w-9`), not just `h-9 w-9`.

---

## Motion

No animation library — **CSS keyframes + Web Animations API + small rAF hooks**, all gated by
`prefers-reduced-motion: reduce`.

**Utilities** (`app/globals.css`)
- **`.anim-rise`** — fade + 10px rise (entrances). **`.anim-fade`** — opacity only (route template).
- **`.anim-stagger > *`** — children cascade in (nth-child delays).
- **`.anim-bar`** — `scaleX` grow from the left (stats bars). **`.anim-pop`** — scale settle.

**Where it's used (the six "starred" animations)**
1. **Card drop settle** — Kanban: dropped card slides from where you released it into its slot (FLIP via WAAPI).
2. **Column reflow** — other cards slide up/down to make room (FLIP, `kanban-board` layout effect).
3. **Agent message stream-in** — each message `anim-rise`s in on mount (`message-list`).
4. **Widget reveal** — agentic widgets `anim-rise`; stats bars `anim-bar` grow; numbers count up (`CountUp` atom).
5. **Detail page enter** — header `anim-rise`, the two columns `anim-stagger` their sections.
6. **Route transitions** — `app/(app)/template.tsx` fades each route change in.

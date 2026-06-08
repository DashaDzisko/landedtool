# Landed — Agent build guide

How to build Landed (or extend it) **exactly** the way it's built, for an AI coding agent working from
these docs. This is the hard-won "what worked / what bit us" layer on top of the specs.

> **Two kinds of "agent":** this file is for the **coding agent** building the app. The **in-app AI agent**
> (the chat assistant) is specced in [project.md](./project.md) → *AI agent integration*.

---

## 0. Read order (the docs are the source of truth)

Build top-down; each layer constrains the next, and they must agree:

1. **[OOUX.md](./OOUX.md)** — objects, attributes, CTAs, relationships, IA. *What exists and how it's
   structured.* Settle this first; it decides routes, components, data.
2. **[design.md](./design.md)** — tokens, layout, components, motion, and the **Gotchas** list. *How it
   looks.*
3. **[project.md](./project.md)** — stack, folder structure, routes, data model, build order. *How it's
   built.*

If a question isn't answered by the docs, prefer the **simplest option consistent with them**, state the
assumption, and keep going. Only stop to ask when a choice is genuinely the user's (e.g. deleting routes,
the object model, a product name).

---

## 1. The product in one breath

Chat-first, agentic job tracker. A two-pane shell: a **multi-thread chat** (left, rounded column) + a
**status Kanban canvas** (right). **No dashboard.** Status is the #1 attribute and defines the columns.
The agent replies with **rich widgets** (stats, application card, etc.), not just text. Dark "Aura Bento ×
Stitch" look, salmon accent.

---

## 2. Stack & conventions (match these exactly)

- **Next.js App Router + TypeScript + Tailwind v4 + shadcn/Radix + Phosphor icons.** Path alias `@/*`.
- **Atomic Design:** `atoms → molecules → organisms → pages`. Pages compose organisms; respect the import
  rules in project.md (atoms never import organisms, etc.).
- **Styling = tokens.** Colors/space/radius/status live as CSS vars in `app/globals.css` and Tailwind
  classes. Never hardcode hex — use the tokens (design.md).
- **`cn()`** from `@/lib/utils` for class merging (it's `clsx` + an **extended** tailwind-merge).
- **Storybook** for atoms/molecules in isolation; colocated `*.stories.tsx`.
- **UI-first with mocks:** `ApplicationsProvider`, `ChatProvider`, `SearchProvider` + `lib/mock-data.ts` +
  `localStorage`. Build the whole UX on mocks, wire Supabase/OpenAI later (project.md build order).

---

## 3. DOs

- **DO read before you write.** A lot is already scaffolded — open the file, match its conventions (cva
  variants, `cn`, token classes, `forwardRef`) instead of inventing a new style.
- **DO verify every change:** `npx tsc --noEmit` **and** `npx eslint <files>` after each edit. Keep both at
  zero before moving on.
- **DO run the real app and look at it.** `next dev`, then drive it in a browser (the preview tool).
  Storybook proves a component; only the running app proves the *integration*. Real bugs (a dropdown that
  never opens, a collapsed page gap) only show up here.
- **DO keep the three docs in sync** as you build — update them in the same turn you change behaviour.
- **DO prefer the platform over dependencies.** CSS keyframes + Web Animations API + a small `rAF` hook
  covered every animation; no GSAP/framer needed. Native pointer events covered drag.
- **DO persist real model fields** (e.g. `Application.description`) via `updateApplication`. Keep
  throwaway/derived UI (notes/CV/contacts today) as local state and **say so** until it's wired.
- **DO respect `prefers-reduced-motion`** for every animation.
- **DO clear `localStorage`** (`jobtracker-applications`) when you change the mock data shape — providers
  hydrate from it and serve stale data otherwise.
- **DO confirm scope before destructive moves** (deleting routes, retiring components, renaming the
  product). Map the dependency graph first.

## 4. DON'Ts

- **DON'T trust the preview harness's *synchronous* checks.** React re-renders are async — a `click`/`fill`
  then an immediate DOM read sees the *old* state. Act, then **wait/re-read** in a separate step.
- **DON'T expect harness `click`/`fill` to always trigger React.** Native form submit may need
  `form.requestSubmit()`; pointer drags need real `PointerEvent` dispatch (and waiting a tick for the
  re-render); controlled inputs may need the native value setter + an `input` event.
- **DON'T hardcode colors, sizes, or radii** — use tokens.
- **DON'T add a dependency** for something CSS/WAAPI/Radix already does.
- **DON'T overwrite existing scaffolding blind** — read it, extend it.
- **DON'T leave dead code** after a model change — retire the superseded components (and their stories +
  barrel exports), and check no live route imports them.

---

## 5. Gotchas (the landmines — these cost real time)

These are also in design.md → *Gotchas*; repeated here because they each broke something:

- **`.border-hairline` draws a FULL 1px border on all four sides** (it's a shorthand, not a color). For a
  single-edge divider use `border-t border-white/5` (or `Separator`), **not** `border-t border-hairline`.
- **`cn()`/tailwind-merge doesn't know custom typographic utilities** (`text-body`, `text-chat`, …) — it
  treats them as colors and **strips the size class** when it sits next to a color class. `lib/utils.ts`
  extends tailwind-merge to register them; **add any new custom `text-*` size there too.**
- **`size="icon"` buttons carry `min-h-10 min-w-10` (40px).** `h-9 w-9` alone won't shrink them — override
  the mins: `h-9 min-h-9 w-9 min-w-9`.
- **Radix `asChild` triggers must forward ref + spread props.** A custom trigger (e.g. `UserMenuTrigger`)
  that doesn't `forwardRef` and `{...props}` silently breaks the dropdown (Radix can't inject the handler).
- **A route `template.tsx` wrapper collapses the page-level gap.** It sits between the `app-page` flex
  column and the page children — give the wrapper the `app-page` class so the gap survives.
- **React 19 / strict react-hooks rules:** no reading `ref.current` during render (use **state** for render
  data, refs for live/animation values); no **synchronous** `setState` in an effect body (the rAF callback
  is fine; for intentional hydration/animation init use a targeted `// eslint-disable-next-line
  react-hooks/set-state-in-effect`); animation loops belong in an **effect** (define the loop *inside* it),
  not a self-referencing `useCallback`; keep window-listener handlers **stable** (`useCallback([])` + refs)
  so add/remove pair across the re-renders a drag causes.
- **`next build` runs ESLint and fails on errors** — keep lint clean, or it blocks production builds.

---

## 6. Signature patterns (reuse these)

- **Agentic widgets:** `ChatMessage.widget?: ChatWidget` (a **discriminated union** carrying data) →
  `message-list` exposes a `renderWidget` hook → `chat-panel` maps each type to an organism via `switch`.
  Add a widget = union case + component + one `case`. The mock router is `resolveAgentResponse`
  (`chat-provider`); the real OpenAI agent replaces it with tool-calling.
- **Kanban drag:** custom **pointer drag** (not native HTML5 — its ghost can't animate). A floating ghost
  (portal) tilts with swing velocity, pivots from the grab point; columns are `data-status` + hit-tested
  with `elementFromPoint`; **FLIP** (WAAPI) settles cards on drop; **edge auto-scroll** lives in the rAF
  loop. Drop reads the dragged id and persists via `onMove → updateApplication`.
- **Animation utilities** (`globals.css`): `.anim-rise`, `.anim-fade`, `.anim-stagger > *`, `.anim-bar`,
  `.anim-pop` — all reduced-motion-gated. `CountUp` atom for numbers. `RichText` atom for inline markdown
  in chat (swap to `react-markdown` when the agent emits block markdown).
- **Don't repeat what context conveys:** the Kanban hides the status badge on cards (`statusDisplay="hidden"`)
  because the column already states it; the badge stays where there's no column (chat widget / standalone).

---

## 7. Per-change checklist

1. Read the relevant doc(s) + the existing file(s).
2. Make the change, matching conventions + tokens.
3. `npx tsc --noEmit` → 0. `npx eslint <files>` → 0. `npm test` → green (add a test for new pure logic).
4. Run the app; verify the actual behaviour in the browser (wait for re-renders).
5. Update OOUX/design/project docs if behaviour changed.
6. Retire anything the change made dead.

Build in the order project.md lays out: scaffold → atoms/molecules + Storybook → auth → shell → canvas/Kanban
→ chat + agentic widgets → settings → motion → polish. Do the visible UX on mocks first; wire Supabase +
OpenAI last.

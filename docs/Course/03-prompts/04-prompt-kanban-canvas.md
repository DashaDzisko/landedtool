

## What this prompt does

This is the main screen of Landed. It is a two-pane shell: a chat agent on the left, and a canvas on the right. The canvas shows your job applications as cards on a status board (a Kanban board). You drag a card to a new column to change its status.

This is a big feature, so the prompt below is split into stages. Build one stage, check it works, then move to the next. In the real repo this lives in `components/organisms/canvas/` and `components/organisms/dashboard/application-card.tsx`.

## The prompt

---

```
Build the main app screen: a chat pane on the left and an applications canvas on the right. Focus this prompt on the canvas, which is a Kanban board. Dark theme, use the design system.

Build it in these stages.

## Stage 1 — Board and columns

Create a board with 7 columns, one per application status, in this order:
saved, applied, screening, interview, offer, rejected, withdrawn.

- Each column has a small header with the status name and a count of cards in it.
- The board scrolls sideways if the columns do not fit.
- Give each column a data-status attribute (e.g. data-status="applied") so we can find it later during drag.
- Use a subtle grid texture inside each column.

## Stage 2 — Application card

Each application is a card. Lead with the most glanceable info first, in this order:
1. Status badge (the colored pill)
2. Role
3. Company
4. Date applied

Also show a small company mark (the first letter in a square) and the location if there is one.
When a card sits inside a column, the column already shows the status, so you can hide the badge on the card in that view.

## Stage 3 — Detail view

Clicking a card opens the application detail at /applications/[id]. Show:
- Role, company, status
- The status timeline: every status change, newest first
- Contact person (name, role, email)
- Notes
- The CV file and a link to the original job posting

## Stage 4 — Drag to change status

Let the user drag a card from one column to another. When they drop it on a new column, change that application's status to the column it landed in.
- Use pointer events so it works on trackpad and touch.
- The dropped card should animate into place; the other cards reflow to make room.
- If the card is dropped back in the same column, do nothing.

## Left chat pane

On the left, keep a chat pane. This is the same agent that reads the user's applications. The board and the chat sit side by side and share the same data, so when the agent talks about a role, the user can see its card.

## Design

- Dark theme (#0d0d0d), salmon (#f4a988) for the primary accent.
- Cards use the surface color (#1a1a1a), 12px radius, a hairline border, and a soft shadow.
- Use the 7 status badge colors from the design system.
```

---

## How to use it

1. Build the design system (01) and auth (03) first, so the badges and the shell already exist.
2. Paste Stage 1 only. Check the 7 empty columns show up and scroll sideways.
3. Add Stage 2. Fill the columns with a few example applications and check the card order (status, role, company, date).
4. Add Stage 3, then open a card and check the detail page.
5. Add Stage 4 last. Drag a card from "applied" to "interview" and confirm the status sticks.

## Tips

- The column order is the real pipeline: saved → applied → screening → interview → offer, with rejected and withdrawn at the end. Keep that order.
- The card leads with status, role, company, date on purpose. That is the priority order from the OOUX object model (see `docs/OOUX.md`). It is what a person scans for first.
- Drag-and-drop is fiddly. Get the board and cards solid before you add it, so a bug in drag does not block everything else.
- The status timeline is not extra polish — every application must have at least one status entry. Moving a card should add a new entry, not overwrite the old one.

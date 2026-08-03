

## What is a Markdown (.md) file

A Markdown file is a plain text file with light formatting. The file ends in `.md`. You can open it in any editor.

Markdown uses a few simple marks:

- `#` for a big heading, `##` for a smaller one
- `-` for a bullet point
- `` ` `` around `code`, or three backticks for a code block
- `**text**` for bold

Here is a tiny example:

```markdown
# My notes

## Colors
- Primary: salmon
- Background: charcoal

Use `bg-canvas` for the page background.
```

That is the whole idea. It stays readable as plain text, but tools can turn the marks into nice formatting.

### Why we use it

Markdown is readable by **humans** and by **AI agents** at the same time. Your AI agent reads `.md` files the same way it reads code. So we write project specs, rules, and design notes in Markdown, and the agent follows them.

Look at the `docs/` folder in Landed. Almost everything there — `OOUX.md`, `design.md`, `project.md`, this course — is Markdown. It is the shared language between you and the AI.

## Why design and OOUX come before building

Here is the mistake most people make: they open the AI and say "build me a job tracker." The AI has no plan, so it **guesses**. It guesses the data — what a job application even contains. It guesses the screens. Every guess is different, so the app comes out messy and you keep fixing it.

The fix is to decide the important things first, write them in Markdown, and let the AI build from that plan.

### Start with the objects

Before screens or colors, ask: **what are the real things in this app?** These are your objects. For Landed, the objects are:

- **Application** — one job you are tracking. This is the center of the app.
- **Chat** — a conversation with the AI agent.
- **Account** — your profile and settings.

Some smaller things live *inside* those objects and never get their own page. In Landed those are: a **Status** entry, a **Contact** person, a **Note**, a **CV** file, and a **Message** in a chat.

### The ORCA order

There is a simple method for this called **OOUX** (Object-Oriented UX). It walks through four steps in order, remembered as **ORCA**:

1. **O**bjects — what the real things are (Application, Chat, Account)
2. **R**elationships — how they connect (an Account has many Applications; an Application has many Status entries)
3. **C**alls to action — what you can do (add application, change status, send a message)
4. **A**ttributes — what details each object holds, in priority order

That last step matters for the UI. For an Application, Landed ranks the attributes like this: **1) Status → 2) Role → 3) Company → 4) Date applied.** So every application card leads with a colored status badge, then the role, then the company, then the date. The most glanceable thing comes first.

You can read the whole thing in `docs/OOUX.md`. It was written **before** any screen was built.

### The plan and the code agree

Here is the payoff. Because the object model was written first, everything else lines up with it:

- The database in `supabase/migrations/` has tables for exactly these objects — `applications`, `status_entries`, `notes`, `contacts`, `chats`, `chat_messages`.
- The TypeScript shapes in `types/application.ts` describe the same Application, with the same fields.
- The application card in the UI shows the same four attributes in the same order.

Nothing drifted, because the AI built from one agreed plan instead of guessing three times.

### Then the design system

Design comes before pages for the same reason. If you do not tell the AI which colors to use, it picks random ones on every screen. So Landed defines its colors, fonts, and spacing as tokens in `app/globals.css` first. Then when the AI builds a page, it reaches for `bg-canvas` and `text-primary` instead of inventing a new blue.

### The brief the AI builds from

Put these together and you have your brief:

- **OOUX doc** (`docs/OOUX.md`) — what the things are and how they connect
- **Design doc / tokens** (`app/globals.css`) — how they should look

With both written down in Markdown, the AI is no longer guessing. It is following a plan you wrote. That is the whole "why before code" idea.

## Tips

- Write the objects down before you ask for a single screen. Ten minutes of OOUX saves hours of fixing.
- Keep your `.md` docs short and current. The AI reads whatever is there, including the stale parts.
- When the AI builds something that feels off, check whether your object model actually said what you wanted. Often the doc is what needs fixing, not the code.

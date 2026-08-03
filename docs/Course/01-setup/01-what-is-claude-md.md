

## The problem

AI does not remember anything. Every time you start a new chat, it forgets your project. It forgets your rules. It forgets what tech you use. You have to explain everything again.

This is slow and annoying.

## The solution

You create a special file and put it in your project folder. AI reads this file at the start of every conversation. Now it knows your project without asking.

Think of it like a short brief you give to a new team member on their first day.

Different tools use different file names:

- **Claude Code** uses `CLAUDE.md`
- **Cursor** uses `.cursorrules`
- **Windsurf** uses `.windsurfrules`
- **Bolt** lets you set rules in the project settings

The idea is the same. You write your project info and rules in a file. AI reads it and follows it.

In this guide we call it `CLAUDE.md`, but everything here works for any of these files. The format and content are the same. Only the file name changes.

## What to put inside

Your `CLAUDE.md` should answer these questions:

- **What is this project?** One or two sentences. What does the app do?
- **What tech do we use?** List your framework, language, and main tools.
- **How are files organized?** Describe your folder structure.
- **What style do we follow?** Your coding and design preferences.
- **What should AI avoid?** Things you do not want AI to do.

## Example

Here is a `CLAUDE.md` for Landed, our job tracker:

```markdown
# Landed — AI job tracker

Landed is a chat-first job application tracker. A chat agent sits on
the left, a status Kanban of applications sits on the right.

## Tech stack
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Supabase (database + auth)
- OpenAI (the chat agent)

## Project structure
- /app - pages, layouts, and API routes
- /components - atoms, molecules, organisms
- /lib - AI, database, and Supabase helpers
- /types - shared TypeScript types

## Rules
- Design tokens live in app/globals.css as CSS variables.
- Never hardcode hex colors in components.
- Primary color is salmon #f4a988. Do not change it.
- Build components bottom-up: atoms -> molecules -> organisms.

## Do not
- Do not add new packages without asking first.
- Do not expose OPENAI_API_KEY to the client. It is server-only.
- Every Supabase table must keep RLS enabled.
```

## Where to put it

Put `CLAUDE.md` in the root of your project folder. This is the main folder where all your code lives.

This repo already keeps its agent config in a `.claude/` folder (for example the dev-server settings in `.claude/launch.json`). A `CLAUDE.md` at the repo root is where the project rules above would live.

```
JobTracker/
  CLAUDE.md        <-- here
  .claude/
  package.json
  /app
  /components
  /lib
```

## Tips

- Keep it short. One page is enough.
- Update it when your project changes.
- Write in simple sentences. AI understands simple text better than long paragraphs.
- You can add new sections when you need them. Start small.

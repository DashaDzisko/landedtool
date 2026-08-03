

## Setting up this project

This lesson gets Landed running on your own computer. You are not creating a new app from scratch — the app already exists. You will copy it, install its tools, add your keys, and start it.

For the full list of commands (Storybook, tests, lint), see [11-running-the-project.md](./11-running-the-project.md). This page is the short path to a running app.

## What you need first

Install these before you start:

1. **Node.js** — this runs the app. Download it from nodejs.org and pick the **LTS** version (the one marked "Recommended").
2. **git** — this copies the project to your machine. Mac usually has it already. Type `git --version` to check.
3. **A code editor** — use Cursor or VS Code. Cursor has AI built in. VS Code is free and works with Claude Code.
4. **Claude Code** — the AI agent you will use to build. You can also let it run the setup steps below for you.

## Two ways to set up

You can run the steps yourself in the terminal. Or you can ask your AI agent to do them. Both work. If you are new, watch the agent do it once, then you understand what happened.

## Step 1: Get the project

Clone the repository and go into the folder:

```bash
git clone <the-repo-url> JobTracker
cd JobTracker
```

Then open it in your editor:

```bash
cursor .
```

Or with VS Code:

```bash
code .
```

## Step 2: Install the tools

The project lists all its tools in `package.json`. Install them with one command:

```bash
npm install
```

This reads `package.json`, downloads Next.js, React, Supabase, OpenAI, and everything else, and puts them in a `node_modules` folder. It can take a minute. You only do this once (and again when the tools change).

## Step 3: Add your keys

The app needs keys for Supabase and OpenAI. There is an example file that shows which keys are needed. Copy it:

```bash
cp .env.example .env.local
```

Now open `.env.local` and fill in your real values:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://<your-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
OPENAI_API_KEY=<your-openai-api-key>
# OPENAI_MODEL=gpt-4o-mini   # optional, this is the default
```

- The two `NEXT_PUBLIC_SUPABASE_*` values come from your Supabase project settings.
- `OPENAI_API_KEY` comes from your OpenAI account. It has **no** `NEXT_PUBLIC_` prefix on purpose — it stays on the server and never reaches the browser.
- `.env.local` is gitignored, so your keys never get pushed to GitHub. Never paste keys into any other file.

## Step 4: Set up the database

The database tables (applications, chats, profiles, and their rules) live as migration files in `supabase/migrations/`. You need to apply them to your Supabase project once.

Two ways:

- **SQL editor:** open your Supabase project, go to the SQL editor, and run the migration files in order (`0001_init.sql`, `0002_rls.sql`, `0003_storage.sql`).
- **CLI:** if you have the Supabase CLI, run:

```bash
supabase db push
```

This creates the tables and turns on the security rules that keep each user's data private.

## Step 5: Run the app

Start the dev server:

```bash
npm run dev -- -p 3009
```

Then open your browser to **http://localhost:3009**. You should see Landed. Every time you change a file, the page updates on its own.

## Or ask your AI agent

If you use Claude Code, you can hand most of this to the agent. Say something like:

"Install the dependencies, copy `.env.example` to `.env.local`, then start the dev server on port 3009."

The agent runs the commands and asks for permission along the way. You still have to paste your own secret keys into `.env.local` — the agent should not handle those for you.

## What just happened

You now have the full app running on your machine, connected to your own database and AI key. Nothing you do here touches other people's data. From here you can start building.

## Tips

- If the page will not load, check the terminal for a red error. Copy it and ask your AI agent what it means.
- If the chat agent does not answer, your `OPENAI_API_KEY` is probably missing or wrong in `.env.local`.
- If you see login or empty-data errors, the migrations in Step 4 were probably not applied.
- The port is **3009** for this project, not the usual 3000. If 3009 is busy, the terminal will tell you.

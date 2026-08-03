## Running JobTracker

This is the reference for actually running the project on your computer: the tools you use, what each one does, and what to do when something goes wrong.

## Prerequisites

You need a few things installed first:

- **Node.js** - the LTS version. This gives you `node` and `npm`.
- **npm** - comes with Node. It installs packages and runs the project's scripts.
- **git** - to save your work and push to GitHub.
- **A code editor** - VS Code is a good default.
- **Claude Code** (optional) - the AI assistant. Handy but not required to run the app.

Check that Node and npm are there:

```bash
node -v
npm -v
```

## First-time setup

Do these once, in order:

1. **Install the packages:**

   ```bash
   npm install
   ```

2. **Set up your keys.** Copy the example env file and fill it in:

   ```bash
   cp .env.example .env.local
   ```

   Then open `.env.local` and add your `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `OPENAI_API_KEY`. See the Supabase and OpenAI guides for where these come from.

3. **Apply the database migrations.** Run the SQL files in `supabase/migrations/` (0001, then 0002, then 0003) in the Supabase SQL editor, or run `supabase db push`. See the Supabase guide.

Now you are ready to run it.

## The commands

| Command | What it does | When to use it | What you should see |
|---------|--------------|----------------|---------------------|
| `npm run dev` | Starts the Next.js dev server | Day-to-day building. This is the one you use most. | The app at **http://localhost:3009**, reloading as you edit |
| `npm run build` | Makes a production build | Before deploying, or to check the app compiles cleanly | "Compiled successfully" and a list of built routes |
| `npm start` | Serves the production build | To test the built app locally (run `npm run build` first) | The built app running, no live reload |
| `npm run lint` | Runs ESLint | Before committing, to catch code problems | "No ESLint warnings or errors", or a list to fix |
| `npm test` | Runs the Vitest unit tests once | Before committing, in CI, to check logic still works | A green pass/fail summary |
| `npm run test:watch` | Runs Vitest and re-runs on save | While working on logic in `lib/` | Tests re-running each time you save |
| `npm run storybook` | Starts the component workshop | To view one component in isolation | Storybook at **http://localhost:6006** |
| `npm run build-storybook` | Builds static Storybook files | To host or share the workshop | A generated `storybook-static/` folder |

Note on the port: plain `npm run dev` uses Next's default port. This project is set up to run on **port 3009** (see `.claude/launch.json`), so the app lives at **http://localhost:3009**. To force it yourself, run:

```bash
npm run dev -- -p 3009
```

## Which tool proves what

Each command answers a different question:

- **dev** - "does it look and work right?" See it live in the browser.
- **test** - "does the logic still work?" The unit tests in `lib/` still pass.
- **lint and types** - "is the code clean?" No lint errors, no type errors.
- **build** - "will it deploy?" It compiles the way Vercel will build it.
- **storybook** - "does this one component look right on its own?" In isolation, all states.

A safe habit before you commit: run `npm run lint` and `npm test`, and `npm run build` before you deploy.

## Troubleshooting

**Port 3009 already in use.** Another process is holding the port. Either stop that process, or run the dev server on a different port: `npm run dev -- -p 3010`. On a Mac you can find what is using it with `lsof -i :3009`.

**The app runs but the data is empty.** This is almost always keys or auth, not a bug. Check that your Supabase keys in `.env.local` are correct, that you are **signed in** (the magic link, then click the email), and that the migrations - including the RLS policies in `0002_rls.sql` - were applied. Remember: with Row Level Security on, you only see your own rows, so an empty screen when signed out is expected.

**You changed `.env.local` but nothing changed.** Environment variables are read when the server starts. Stop the dev server and run `npm run dev` again.

**"Missing environment variable" errors.** A required key is not set. Make sure you copied `.env.example` to `.env.local` and filled in the values. The names must match exactly, including the `NEXT_PUBLIC_` prefix on the two Supabase keys.

## Tips

- Keep the dev server running in one terminal tab and use a second tab for `git`, `npm test`, or Storybook.
- If the app behaves strangely after pulling new code, run `npm install` again - the dependencies may have changed.
- Restart the dev server any time you touch `.env.local`.

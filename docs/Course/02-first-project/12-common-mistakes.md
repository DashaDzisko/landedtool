## Mistake 1: Starting too big

You want to build all of JobTracker at once. The chat agent, the Kanban board, auth, settings, CV uploads. All on day one.

This does not work. AI gets confused with big tasks. You get confused with big projects.

**Fix:** Build one feature at a time. Start with one atom. Make it work. Then the next thing. Atomic design is on your side here: atoms, then molecules, then organisms.

## Mistake 2: No claude.md file

You start coding without setting up your rules. AI picks random styles, random folder structures, and random tools. Every conversation starts from zero.

**Fix:** Set up your project rules before you write code. Point AI at the real structure: atoms/molecules/organisms, tokens in `app/globals.css`, and the OOUX object model in `docs/OOUX.md`. It saves hours later.

## Mistake 3: Sharing API keys

You push your code to GitHub and your `.env.local` file goes with it. Now anyone can see your `OPENAI_API_KEY` and use your credits.

**Fix:** Check that `.env.local` is in your `.gitignore`. It is by default in JobTracker, but double check. Never paste your keys in public places. If a key leaks, rotate it right away.

## Mistake 4: Not using Git

You make changes, something breaks, and you cannot go back. You lost your working version.

**Fix:** Use Git. JobTracker is already a Git repo, so just keep committing:
- `git add .` - save your changes
- `git commit -m "what you changed"` - name your changes
- `git push` - send to GitHub

Do this after every feature that works.

## Mistake 5: Too many packages

You ask AI to add a package for every small thing. A package for dates, a package for a dropdown, a package for a dialog. But JobTracker already has what it needs: Radix UI for dialogs and menus, `@phosphor-icons/react` for icons, `cn()` for classes.

**Fix:** Before adding a package, check what is already installed. Often the answer is already in the project.

## Mistake 6: Ignoring errors

You see a red error in the terminal or browser. You ignore it and keep building. The errors stack up. Now nothing works and you do not know why.

**Fix:** Stop and fix errors when you see them. Copy the error message and ask AI: "I got this error. What does it mean and how do I fix it?"

## Mistake 7: Editing colors in the wrong place

You want to change the salmon accent or a status color, so you go hunting for a `tailwind.config.ts`. There isn't one. JobTracker uses Tailwind v4, and the tokens live as CSS variables in `app/globals.css`.

**Fix:** Change colors, radius, spacing, and type scale in `app/globals.css`, inside the token block. For example the primary color is `--color-primary: #f4a988`. Do not hardcode hex values in components - use the tokens.

## Mistake 8: Forgetting environment variables on Vercel

The app works on your computer. You deploy to Vercel. It breaks. Your keys are in `.env.local` on your computer, but Vercel does not have them.

**Fix:** Add every key in the Vercel dashboard before you deploy: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `OPENAI_API_KEY`. Missing Supabase keys give you an empty app; a missing OpenAI key drops the agent to mock replies.

## Mistake 9: Forgetting Row Level Security

You add a new table and the app can read everyone's rows, or it reads nothing at all. You disable RLS to "make it work". Now every user's data is exposed.

**Fix:** RLS is what protects the data in JobTracker, because the Supabase anon key is public. Every table has an "own rows only" policy (`supabase/migrations/0002_rls.sql`). When you add a table, add a matching policy. Never turn RLS off to fix a bug - if you see no rows, you are probably just not signed in.

## Mistake 10: Not reading what AI wrote

AI generates code and you accept it without looking. Later you find out it changed things you did not ask for. It moved the OpenAI call into the browser. It hardcoded a color. It touched the RLS policies.

**Fix:** Read the changes before you accept them. You do not need to understand every line. But check it did not expose the API key, change your tokens, or weaken security.

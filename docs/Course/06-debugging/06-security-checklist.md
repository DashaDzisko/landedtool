
## A checklist you can actually use

You do not need to be a security expert to keep Landed safe. You need a short list you can walk through by hand before you show the app to real people. This matters because Landed holds real, private data: people's job applications, the companies they are talking to, their notes, their contacts. A single missing check, like Row Level Security left off one table, can leak every user's data at once. Go through this list before your first deploy, and again before every deploy after that.

Check each box only when you have actually looked and confirmed it. "AI probably did it" is not a check.

## Secrets

- [ ] `.env.local` is listed in `.gitignore` and is not committed to Git.
- [ ] No API keys, tokens, or passwords are hardcoded anywhere in the code. They all live in `.env.local`.
- [ ] `OPENAI_API_KEY` has NO `NEXT_PUBLIC_` prefix, so it stays server-only.
- [ ] `OPENAI_API_KEY` is only used inside the `app/api/chats` routes, never in a client component.
- [ ] If any key was ever pasted into a chat, a screenshot, or a public repo, you rotated it (generated a new one) and updated `.env.local`.

## Database (Supabase)

- [ ] Row Level Security is enabled on EVERY table: `profiles`, `applications`, `status_entries`, `notes`, `contacts`, `chats`, `chat_messages`.
- [ ] Each policy restricts rows to the current user with `auth.uid()` (own rows only).
- [ ] Child tables derive ownership from their parent: `status_entries`, `notes`, and `contacts` check their application; `chat_messages` checks its chat.
- [ ] You added the same RLS pattern to any NEW table you created.
- [ ] The service-role key, if you use one at all, is server-only and never shipped to the browser.

## Auth and routes

- [ ] Protected pages (the app shell, settings, application detail) redirect to sign-in when you are signed out.
- [ ] Every `/api` route that touches user data checks the session first, before reading or writing anything.
- [ ] The magic-link flow works: sign in, land back in the app, and see only your own data.

## Input

- [ ] Every form validates its input (required fields, sensible length and type): the magic-link form, the application form, the profile form, the chat composer.
- [ ] User input is sanitized before it is saved or shown, so nobody can inject HTML or JavaScript.
- [ ] You never trust form data as-is. The server checks it again, even if the browser already did.

## Vibecoding-specific rules

- [ ] You never paste real secrets or real user data into an AI prompt.
- [ ] You always read AI-generated SQL and migrations before running them. If a migration touches RLS or drops a policy, you understand what it does first.
- [ ] You run `npm audit` and review any new package before adding it. Unknown packages are a real risk.
- [ ] You re-run these security checks before every deploy, not just the first one.

## If you find a problem

Do not panic, and do not deploy. Fix the most dangerous items first: an exposed `OPENAI_API_KEY`, a missing session check on an API route, or RLS left off a table. If a key leaked, rotate it right away. When you are not sure how to fix something, paste the finding into Claude Code with the file path and ask for the smallest safe change. Then run the whole checklist again from the top. For a deeper, guided review, use the ready-made prompt in `docs/security-check-prompt.md`.

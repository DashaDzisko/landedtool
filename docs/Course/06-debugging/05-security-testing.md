
## Why you need to think about security

When you build an app with AI, the code works. But that does not mean it is safe. AI writes code that does the job, but it does not always think about security. Someone could steal your users' data, use your API keys, or break your app.

You are not a security expert and you do not need to be. But you should run basic checks before Landed goes live.

## The biggest risks for vibecoded apps

### Exposed API keys

Your API keys end up in your code or in a public place. In Landed the one to protect is `OPENAI_API_KEY`. If someone finds it, they can burn your OpenAI credits. The Supabase anon key is different: it is public by design, and your safety comes from RLS (more on that below).

### No input validation

Users can type anything into your forms. Without validation, someone could send harmful data that breaks your app or your database.

### Missing authentication checks

Pages that should be private are reachable without signing in. Someone opens the app shell or an API route by typing the URL directly.

### SQL injection

Someone types special code into a form field. If your database does not handle it properly, they can read, change, or delete data.

### Cross-site scripting (XSS)

Someone puts harmful JavaScript into a form field (a note, a company name). When it renders, the script runs in someone's browser.

## Security check prompts

Copy these prompts and run them with your AI tool. They check your project for common problems.

### Full security review

```
Review my entire project for security vulnerabilities. Check for:
1. Exposed API keys or secrets in the code (not in .env files)
2. Missing authentication checks on protected routes
3. Missing input validation on forms
4. SQL injection risks in database queries
5. Cross-site scripting (XSS) risks
6. CORS configuration problems
7. Missing rate limiting on API routes

For each problem you find, explain what the risk is and how to fix it.
```

### Check API keys

```
Search my entire project for any hardcoded API keys, tokens, or passwords.
Confirm OPENAI_API_KEY is only read on the server (no NEXT_PUBLIC_ prefix, only
used in app/api/chats routes). Confirm all secrets are in .env.local and not
committed to Git. Also check that .env.local is in .gitignore.
```

### Check authentication

```
Review all my pages and API routes. List which ones require authentication and
which ones are public. Landed uses magic-link auth. Are there any routes that
should be protected but are not? Make sure every /api route that touches user
data checks for a valid session first.
```

### Check forms and inputs

```
Review all forms in my project (the magic-link form, the application form, the
profile form, the chat composer). For each one, check:
1. Is there input validation (length, type, required fields)?
2. Are inputs sanitized before saving to the database?
3. Can someone submit harmful HTML or JavaScript through the form?
4. Is there rate limiting to prevent spam?

Fix any problems you find.
```

### Check database security

This is the most important one for Landed. It runs on Supabase, and the safety of every user's data depends on Row Level Security being correct.

```
Review the Supabase setup in supabase/migrations/0002_rls.sql and all queries in
lib/db. Confirm:
1. Row Level Security is enabled on EVERY table (profiles, applications,
   status_entries, notes, contacts, chats, chat_messages).
2. Users can only access their own rows. Parent tables restrict to auth.uid();
   child tables (status_entries, notes, contacts, chat_messages) derive ownership
   from their parent application or chat.
3. There are no queries vulnerable to SQL injection.
4. The Supabase service-role key, if used anywhere, is server-only and never
   shipped to the browser.
```

In Landed this is already set up correctly in `supabase/migrations/0002_rls.sql`: RLS is on for all seven tables, own-rows-only via `auth.uid()`, and child tables check their parent. Use the prompt to confirm nothing has drifted after your changes.

### A ready-made prompt already in this repo

This repo ships a longer, non-developer-friendly review prompt at `docs/security-check-prompt.md`. It walks through login and sessions, RLS, API routes, env vars, file uploads, security headers, and more, and asks AI to rank findings by how likely and how bad they are. When you want the deep version, paste that whole file into Claude Code instead of the short prompts above.

## After the checks

1. Fix the problems AI found. Start with the most serious ones (exposed keys, missing auth, RLS gaps).
2. If a key ever leaked, rotate it. Generate a new `OPENAI_API_KEY` in the OpenAI dashboard and update `.env.local`. The old one stays dangerous until you do.
3. Add security rules to your claude.md so AI does not make these mistakes again:

```markdown
## Security rules
- Never hardcode API keys. Always use environment variables.
- OPENAI_API_KEY is server-only. Never add a NEXT_PUBLIC_ prefix to it and never
  import it into a client component.
- All /api routes must check for a valid Supabase session before doing anything.
- Enable Supabase RLS on every new table, own-rows-only via auth.uid().
- All form inputs must be validated and sanitized before saving.
```

4. Run these checks again before every deployment. Make it a habit.

## Tips

- Do security checks before you share the app with real users. Not after.
- With Supabase, safety comes from RLS, not from hiding the anon key. The anon key is public; RLS is what keeps user A from reading user B's applications.
- `OPENAI_API_KEY` must never leave the server. It lives only in the `app/api/chats` routes.
- Never trust data from users. Always validate and sanitize it, even if it comes from a form you built.
- Run security checks after adding new features. New code means new potential problems.

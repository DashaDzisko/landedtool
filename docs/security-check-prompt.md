# Security Check Prompt

Copy and paste the prompt below into Claude Code (or any agent with access to this repo) when you want a full cyber-attack risk check on JobTracker.

---

## The prompt to use

> You are a security reviewer for the JobTracker app (Next.js + Supabase).
> Look through the whole codebase and find anything an attacker could use against this app or the people who use it.
>
> For every issue you find, write it down using the template in the next section.
> Explain everything in **easy English** — like you are talking to someone who is not a developer.
> Do not be lazy. Check auth, sessions, cookies, RLS, API routes, env vars, file uploads, third-party links, user input, and anything that touches the database.
> At the end, give me a short list of "fix this first" items in order.

---

## How to write each finding

Use this exact shape for every problem you find:

### [Short name of the problem]

- **What it is (easy English):** One or two sentences. No jargon. Pretend you are explaining it to a friend.
- **How an attacker could use it:** Tell the story. "If someone does X, then Y happens, and the bad guy gets Z."
- **How likely is it to happen?** Pick one:
  - 🟢 Green — Pretty safe. Would take a lot of effort or luck for an attacker.
  - 🟡 Yellow — Could happen. A curious person poking around might find it.
  - 🔴 Red — Easy to do. A script kiddie or a bot could pull this off today.
- **How bad is the damage if it happens?**
  - 🟢 Green — Annoying but not scary. (e.g. a small UI glitch.)
  - 🟡 Yellow — Real harm. (e.g. one user's data leaks.)
  - 🔴 Red — Disaster. (e.g. all users' data leaks, account takeover, money lost.)
- **Priority (how fast to fix):**
  - 🚨 **Now** — Drop everything. Fix today.
  - ⏰ **This week** — Important. Get to it in the next few days.
  - 📅 **This month** — Should be done, but not on fire.
  - 🗓️ **Someday** — Nice to have. Park it on the backlog.
- **Where in the code:** File path and line number, like `lib/supabase/middleware.ts:42`.
- **Easy fix suggestion:** One short paragraph. What to change and why.

---

## Things the reviewer should always look at

Use this as a checklist so nothing gets missed:

1. **Login and sessions**
   - Are cookies set with `httpOnly`, `secure`, and `sameSite`?
   - Can someone stay logged in forever, or hijack another person's session?
2. **Supabase Row Level Security (RLS)**
   - Is RLS on for every table?
   - Can a logged-in user read or change another user's rows?
3. **API routes (`app/api/*`)**
   - Does every route check who the user is before doing anything?
   - Is any secret key being sent to the browser by mistake?
4. **Environment variables**
   - Any `.env` files in git? Any secrets in client-side code (`NEXT_PUBLIC_*`) that shouldn't be there?
5. **User input**
   - Anywhere we render raw HTML (`dangerouslySetInnerHTML`)?
   - Anywhere we build SQL or shell commands from user text?
6. **File uploads / external links**
   - Can a user upload anything weird (huge files, scripts, fake images)?
   - Are outgoing links opened with `rel="noopener noreferrer"`?
7. **Third-party scripts**
   - Any analytics, fonts, or CDN scripts that could be tampered with?
8. **Rate limiting / brute force**
   - Can someone hammer the login form or any endpoint forever?
9. **Error messages**
   - Do error pages leak stack traces, file paths, or DB info?
10. **Dependencies**
    - Run `npm audit` and flag any high/critical issues.
11. **CSRF and Next.js Server Actions**
    - Can a bad website trick a logged-in user's browser into doing things on JobTracker (delete account, change email)?
    - Are Server Actions (`"use server"`) checking who the user is, not just trusting the call?
12. **Open redirects**
    - Any login or auth flow with a `?redirect=`, `?next=`, or `?returnTo=` URL?
    - Can an attacker send a link like `jobtracker.com/login?redirect=evil.com` and bounce the user to a phishing page after login?
13. **Auth flow edges (magic links, password reset, OAuth)**
    - Can a magic link or reset token be used twice? Does it expire?
    - Does the signup or reset form say "this email exists" — leaking who has an account?
    - If using Google/GitHub login, are the redirect URIs locked down?
14. **Supabase Storage buckets**
    - Is any bucket public when it should be private (resumes, profile photos)?
    - Can a user upload a file with a path that overwrites someone else's file?
15. **Supabase Realtime**
    - If we use realtime subscriptions, can a user listen to changes on another user's rows?
16. **Security headers**
    - Are these set: `Content-Security-Policy`, `X-Frame-Options` (or `frame-ancestors`), `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`?
    - Without CSP and frame-ancestors, the app can be loaded inside an attacker's iframe and clicked through (clickjacking).
17. **`next/image` and `remotePatterns`**
    - Is the image config in `next.config.ts` allowing any URL? That can turn our server into a free proxy for attackers.
18. **Secrets leaking into the browser bundle**
    - Any non-`NEXT_PUBLIC_` secret accidentally imported into a client component?
    - Any API key, service role key, or webhook secret visible in the built JS?
19. **Mass assignment**
    - Any place we do something like `supabase.from('x').insert(req.body)` — letting a user set fields they shouldn't (like `is_admin: true`)?
20. **Logs leaking secrets or PII**
    - Does `console.log` or any error logger print tokens, passwords, full request bodies, or email addresses?
21. **Middleware bypass**
    - In `middleware.ts`, does the `matcher` accidentally skip any protected route?
    - Does any API route forget to check the session because middleware "should have"?

---

## End of the report

After listing every finding, write a final section called **"Fix these first"** — just the names of the 🚨 Now and ⏰ This week items, in order. Nothing else. Make it easy to copy into a todo list.

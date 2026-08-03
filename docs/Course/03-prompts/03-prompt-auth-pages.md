

## What this prompt does

This prompt asks AI to build the sign-in and sign-up pages for Landed. Both use a magic link. That means there is no password. The user types their email, we send them a link, and clicking the link signs them in.

Landed already works this way. The form lives in `components/organisms/auth/magic-link-form.tsx` and the link comes back to `app/auth/callback/route.ts`.

## The prompt

---

```
Build authentication pages using Supabase magic links. No passwords, no social login. Email only.

We need two pages: sign in and sign up. Both work the same way — one email field and one button that sends a magic link.

## Sign in page at /sign-in

A centered card, max width 400px, on our dark canvas (#0d0d0d).

Inside:
- A short heading: "Sign in to Landed"
- One email input with a label "Email" and a hint "We'll send a sign-in link — no password needed"
- One full-width salmon button: "Send magic link"
- Below the form: "New here?" with a link to /sign-up

When the user submits:
1. Call Supabase auth signInWithOtp with their email.
2. Set the email redirect to /auth/callback.
3. Swap the form for a "check your email" state: a heading "Check your email" and text "We sent a sign-in link to your email. Open it on this device to continue."
4. If Supabase returns an error, show a short message below the form.

## Sign up page at /sign-up

Same layout and same behavior as sign in. Only the words change:
- Heading: "Create your Landed account"
- Button: "Send magic link"
- Below the form: "Already have an account?" linking to /sign-in
- After submit, show the same "check your email" state.

Supabase creates the account on first sign-in, so sign up and sign in share one flow.

## Auth callback route

Create a route at /auth/callback.
- Read the "code" from the URL.
- Exchange it for a session with Supabase (exchangeCodeForSession).
- On success, redirect to / (the app).
- On failure, redirect to /sign-in?error=auth.

## Protect the app

The main app lives in a route group (app)/ behind the shell.
- If a user is not signed in, redirect them to /sign-in.
- Do this check in the shell layout (or in middleware) using the Supabase server client and getUser.
- Signed-in users who open /sign-in should be sent to / instead.

## Design

- Use the design system for all styling. Dark theme.
- The card is centered, max width 400px.
- The input and the button are stacked with a small gap; the button is full width.
- Error text is small and muted-red. Mobile friendly with padding on the sides.
```

---

## How to use it

1. Make sure Supabase is set up and your keys are in `.env.local` (`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
2. Paste the prompt into your AI tool.
3. Go to `http://localhost:3009/sign-up` and enter your email.
4. Check your inbox for the magic link. Click it. You should land back in the app, signed in.
5. Sign out, then try opening the app directly. It should redirect you to `/sign-in`.

## Tips

- In the Supabase dashboard, add `http://localhost:3009/auth/callback` to the allowed redirect URLs, or the link will bounce.
- If the email does not arrive, check spam. Supabase's built-in email is fine for testing but slow.
- The magic link opens on the same device that started the flow. Tell the user that in the "check your email" text.
- No passwords means there is nothing to leak. That is the security win here.

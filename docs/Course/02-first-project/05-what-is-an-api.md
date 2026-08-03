

## A simple explanation

API stands for Application Programming Interface. That sounds complicated. It is not.

An API is a way for two apps to talk to each other.

Your app needs something it does not have. A list of applications. A logged-in user. An AI answer. So it asks another service, and the service sends it back. That conversation happens through an API.

## A real world example

Think of a restaurant. You sit at a table. You want food. But you cannot walk into the kitchen yourself.

The waiter takes your order to the kitchen. The kitchen makes the food. The waiter brings it back.

The waiter is the API. You are the app. The kitchen is the service.

## The APIs Landed uses

Landed talks to two outside services and to its own internal routes.

- **Supabase** — the database and login. When you save a job application or sign in with a magic link, the app talks to Supabase.
- **OpenAI** — the chat agent's brain. When you message the agent, your text and your application data go to OpenAI, and it replies.
- **Landed's own API routes** — small endpoints inside the app, under `app/api/chats`. The chat panel in the browser sends your message here first, and the server route then talks to OpenAI safely.

That last part matters. The browser never talks to OpenAI directly. It talks to Landed's own route, and the route talks to OpenAI. This keeps the OpenAI key on the server.

## How a chat message flows

Here is the OpenAI conversation in order:

1. You type "Which application should I prioritize?" in the chat.
2. The browser sends it to Landed's route: `app/api/chats/[chatId]/route.ts`.
3. That route adds your applications as context and calls the OpenAI API.
4. OpenAI generates a reply and streams it back to the route.
5. The route streams it to the browser, and the agent's answer appears.

This all happens in a couple of seconds.

## API keys

Most APIs need a key. An API key is like a password. It tells the service who you are and that you are allowed in.

You get your keys when you sign up for each service, and you put them in a special file called `.env.local`. Landed ships an example file, `.env.example`, that shows exactly which keys are needed:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://<your-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
OPENAI_API_KEY=<your-openai-api-key>
# OPENAI_MODEL=gpt-4o-mini   # optional
```

Copy `.env.example` to `.env.local` and fill in your real values. `.env.local` is gitignored, so it stays on your computer and never gets pushed to GitHub.

## Server-only vs browser-safe

Look closely at the names above. This is the most important rule on this page.

- **`NEXT_PUBLIC_SUPABASE_URL`** and **`NEXT_PUBLIC_SUPABASE_ANON_KEY`** start with `NEXT_PUBLIC_`. That prefix means "safe to send to the browser." These two are meant to be public — Supabase protects your data with security rules, not by hiding this key.
- **`OPENAI_API_KEY`** has **no** `NEXT_PUBLIC_` prefix. That is on purpose. It stays on the server, used only inside the API route. It is never shipped to the browser, because anyone who got it could spend your OpenAI money.

So the rule is simple: if a key should reach the browser, it gets `NEXT_PUBLIC_`. If it must stay secret, it does not. Never add `NEXT_PUBLIC_` to `OPENAI_API_KEY`.

## You don't need the deep details

You do not need to know how HTTP requests work, or what headers and status codes are. AI handles that part.

You need to know three things:

1. APIs let your app get data and answers from other services.
2. You need a key to use most APIs, and it goes in `.env.local`.
3. Some keys are browser-safe (`NEXT_PUBLIC_*`) and some must stay server-only (`OPENAI_API_KEY`). Keep the secret ones secret.

## Tips

- If the chat agent does not answer, your `OPENAI_API_KEY` is probably missing or wrong in `.env.local`.
- Never paste a key into a normal code file or a chat message. Only into `.env.local`.
- If you ever see `OPENAI_API_KEY` with a `NEXT_PUBLIC_` prefix, that is a bug — remove the prefix.

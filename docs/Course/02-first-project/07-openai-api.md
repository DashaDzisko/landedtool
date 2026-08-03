## What is it

OpenAI makes AI models like GPT-4o. The OpenAI API lets your app use these models. Your app can generate text, answer questions, or do other smart things.

This is different from using ChatGPT in a browser. When you use the API, the AI works inside your app. Your users talk to it through your interface, not through OpenAI's website.

In JobTracker, the OpenAI API powers the **chat agent** named "Landed" in the left pane. The user asks about their job search and the agent replies, using their real applications as context.

## What the agent does in JobTracker

The agent is not a plain chatbot. It has a job:

- It reads the user's profile and applications and helps them understand their pipeline.
- It has **read-only** access to the applications through **tools** (the tool schemas live in `lib/ai/tools.ts`). The model can call a tool like `list_applications` to get fresh data instead of guessing.
- When it makes sense, the model calls a `show_*` tool so the UI can render a rich widget under the reply (a stats chart, an application card, a shortlist, a status-change, a draft email).
- It cannot change a status or send an email yet. It suggests the next step in text instead.

The instructions that shape all of this - the **system prompt** - live in `lib/ai/prompts.ts`. That is the file to open if you want to change how the agent behaves.

## How it is wired up

The key setting to understand: the model is called **only from the server**, never from the browser.

- The API key is `OPENAI_API_KEY`. It has no `NEXT_PUBLIC_` prefix, so it stays on the server.
- The one place it is used is the API route `app/api/chats/[chatId]/route.ts`. That route loads the user's context, streams the model's reply back to the browser, and saves the message.
- The model is **gpt-4o-mini** by default. You can override it with the `OPENAI_MODEL` env var.
- If no key is set, the route falls back to a mock agent (`lib/ai/mock-agent.ts`) so the app still runs.

## How to set it up

### Step 1: Create an account

Go to platform.openai.com and sign up.

### Step 2: Add credits

The API is not free. You pay for what you use. Add some credits to start. $5 to $10 is enough for testing and building.

### Step 3: Get your API key

Go to API Keys in your dashboard. Click "Create new secret key". Copy it and save it somewhere safe. You will not see it again.

### Step 4: Add the key to your project

In your `.env.local` file, add:

```
OPENAI_API_KEY=sk-your-key-here

# Optional - defaults to gpt-4o-mini
# OPENAI_MODEL=gpt-4o-mini
```

**Important:** This key does NOT start with `NEXT_PUBLIC_`. This keeps it on the server side, so users cannot see it.

When you deploy to Vercel, you will also need to add this key there. See the Vercel guide.

## How pricing works

You pay per token. Tokens are pieces of text. One word is roughly one token. A short paragraph is about 50 to 100 tokens.

The agent sends the user's profile plus a summary of their applications with every message, so a chat costs a bit more than a one-line prompt. But `gpt-4o-mini` is cheap. For testing and building, the cost is usually less than a few dollars per month.

You can set spending limits in your OpenAI dashboard so you do not get surprised.

## Important: server side only

Your OpenAI API key must stay secret. If someone finds your key, they can use your credits.

JobTracker already does the right thing: the key is only read inside the server route. Never move the OpenAI call into a component that runs in the browser. AI knows this rule if you tell it:

"Call OpenAI from a server-side API route. Do not expose the API key to the client."

## Tips

- Keep the model at `gpt-4o-mini` while you build. It is cheap and fast enough for the agent.
- Set a spending limit in your OpenAI dashboard.
- Change the agent's behavior by editing the system prompt in `lib/ai/prompts.ts`, not by scattering instructions elsewhere.
- Add or change what the agent can do by editing the tool schemas in `lib/ai/tools.ts`.
- No key? The app still runs on the mock agent. Add a key when you want real replies.

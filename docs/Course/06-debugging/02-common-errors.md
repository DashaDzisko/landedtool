
## Module not found

```
Module not found: Can't resolve '@/components/organisms/chat/chat-panel'
```

**What it means:** The file does not exist at that path. Either the file was never created, it was renamed, or the path is wrong.

**How to fix:** Check that the file exists. Check for typos in the import path. Ask AI: "I get Module not found for @/components/organisms/chat/chat-panel. Can you check if the file exists and fix the import?"

## Cannot read properties of undefined

```
TypeError: Cannot read properties of undefined (reading 'map')
```

**What it means:** Your code tries to use something that does not exist yet. In Landed this often happens when the applications or chat messages have not loaded from Supabase yet.

**How to fix:** Ask AI: "I get 'Cannot read properties of undefined reading map'. The applications might not be loaded yet. Add a loading check before using the data."

## Hydration error

```
Hydration failed because the initial UI does not match what was rendered on the server
```

**What it means:** The page looks different on the server and in the browser. This often happens when you use browser-only things (like `window` or `localStorage`) during the first render.

**How to fix:** Ask AI: "I get a hydration error. Can you check if any code uses window or browser APIs during server rendering and wrap it in a useEffect?"

## Type error

```
Type 'string' is not assignable to type 'ApplicationStatus'
```

**What it means:** TypeScript expected one type of data but got another. In Landed the status must be one of `saved | applied | screening | interview | offer | rejected | withdrawn`. Passing any other text gives this error.

**How to fix:** Copy the error and ask AI to fix the type. These are usually quick fixes.

## 404 page not found

**What it means:** The page does not exist. Either the route is wrong or the file is in the wrong folder.

**How to fix:** In Next.js, pages go in the `app` folder. A page at `/settings` needs a file at `app/(app)/settings/page.tsx`. Check that the file is in the right place.

## Build failed

```
Build error occurred
```

**What it means:** Your app cannot compile. This happens when you run `npm run build` or deploy to Vercel. Something in your code is broken.

**How to fix:** Read the error below the "build failed" line. It usually points to the problem. Copy the full error and ask AI to fix it.

## CORS error

```
Access to fetch has been blocked by CORS policy
```

**What it means:** Your app tries to call an API from the browser that does not allow it. This is a security feature.

**How to fix:** Ask AI: "I get a CORS error when calling [API name]. How do I fix this? Should I call it from a server-side API route instead?"

In Landed the chat agent already works this way. The browser calls `app/api/chats/[chatId]/route.ts`, and that route talks to OpenAI on the server. The OpenAI key never touches the browser.

## Environment variable is undefined

```
Error: Missing environment variable NEXT_PUBLIC_SUPABASE_URL
```

**What it means:** Your app cannot find a key that it needs. Either the `.env.local` file is missing or the variable name is wrong.

**How to fix:** Check your `.env.local` file. It should have these three, copied from `.env.example`:

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
OPENAI_API_KEY=...
```

Make sure each name matches exactly. Then restart the dev server (stop it and run `npm run dev` again). Next.js only reads `.env.local` at startup, so changes need a restart.

## The app loads but my applications list is empty

This one has no red error. The Kanban board just shows nothing. Usually one of three things:

- **You are not signed in.** Landed uses magic-link sign-in. If there is no session, there is no user, so there is no data. Sign in first.
- **RLS is filtering the rows, and that is correct.** Supabase Row Level Security only lets you see your own applications. An empty board for a brand-new account is expected. It is not a bug.
- **Your Supabase keys are wrong.** If `NEXT_PUBLIC_SUPABASE_URL` or `NEXT_PUBLIC_SUPABASE_ANON_KEY` point at the wrong project, you connect to a database with none of your data. Double-check `.env.local`.

Ask AI: "The app loads but my applications board is empty. Help me check if I am signed in, if RLS is filtering my rows, and if my Supabase keys in .env.local are correct."

## Too many re-renders

```
Error: Too many re-renders. React limits the number of renders to prevent an infinite loop.
```

**What it means:** Something in your code keeps updating forever. Usually a state update inside a render or a missing dependency in `useEffect`.

**How to fix:** Copy the error and the component file. Ask AI: "This component causes too many re-renders. Can you find the loop and fix it?"

## Tips

- Most errors you will see are in this list. After a few weeks, you will recognize them without reading the full message.
- Always copy the full error for AI. Do not try to explain it in your own words.
- An empty board is usually about sign-in or RLS, not a crash. Check who you are logged in as first.
- If the same error keeps coming back, add a rule to your claude.md to prevent it.

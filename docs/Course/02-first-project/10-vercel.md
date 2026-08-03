## What is Vercel

Vercel is where your app lives on the internet. Right now JobTracker runs on your computer at localhost:3009. Only you can see it. Vercel puts it online so anyone with the link can use it.

This process is called deployment.

## Why Vercel

- It is made by the same team that makes Next.js. They work perfectly together, and JobTracker runs on Next.js 16.
- It has a free plan that is enough for most projects.
- Deployment is automatic. You push your code, and Vercel updates your app.
- It gives you a real URL you can share with people.

## What you need first

Your code needs to be on GitHub. Vercel connects to your GitHub repository and deploys your code from there. See the GitHub guide if the project is not on GitHub yet.

## How to set it up

### Step 1: Create a Vercel account

Go to vercel.com and sign up. Use your GitHub account to sign up. This makes the connection easier.

### Step 2: Import your project

Click "Add New" > "Project". Vercel shows your GitHub repositories. Find JobTracker and click "Import".

### Step 3: Add your environment variables

Before you deploy, add your keys. Go to "Environment Variables" and add each one. These are the same keys from your `.env.local` file:

- `NEXT_PUBLIC_SUPABASE_URL` = your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key
- `OPENAI_API_KEY` = your OpenAI key (server-only, powers the chat agent)
- `OPENAI_MODEL` = `gpt-4o-mini` (optional - leave it out to use the default)

If you skip the OpenAI key, the app still deploys, but the chat agent runs on the mock fallback instead of real replies.

### Step 4: Deploy

Click "Deploy". Wait a minute or two. Vercel builds your app and gives you a URL like `jobtracker.vercel.app`.

That is it. Your app is online.

## Analytics is already wired in

JobTracker already includes `@vercel/analytics`. Once the app is on Vercel, you get page-view analytics with no extra setup. Turn on "Web Analytics" in the Vercel dashboard and the data starts flowing.

## Automatic updates

Every time you push new code to GitHub, Vercel deploys it automatically. You do not need to click anything. Push your code, wait a minute, and your live app is updated.

## Custom domain

The free URL looks like `jobtracker.vercel.app`. If you want your own domain, you can buy one and connect it in Vercel settings. This is optional. The free URL works fine for testing and showing your project.

## Common problems

**Build fails:** Vercel shows an error log. Copy the error and ask AI to help you fix it. Most build errors are missing packages or wrong imports. It helps to run `npm run build` on your computer first - if it builds locally, it will almost always build on Vercel.

**Environment variables missing:** If the app works on your computer but not on Vercel, check that you added all four keys in the Vercel dashboard. This is the most common problem. A common symptom is the app loading but showing no data (missing Supabase keys) or the chat agent giving only mock replies (missing OpenAI key).

**Changes not showing:** Make sure you pushed your code to GitHub. Vercel only deploys code that is on GitHub, not code on your computer.

## Tips

- Run `npm run build` locally before you deploy. If it passes on your machine, it will deploy.
- Check the Vercel dashboard after each deploy. It shows if the build worked or failed.
- If a deploy breaks the app, you can roll back to a previous version in the Vercel dashboard.
- Add the `NEXT_PUBLIC_` keys and the `OPENAI_API_KEY` before the first deploy, not after.

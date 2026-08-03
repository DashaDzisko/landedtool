
## You finished the course. Now what?

This course gave you the basics. You know how to set up a project, write rules, use AI tools, and build features. You built a real app — Landed, a chat-first job tracker with a Kanban canvas. But there is more to learn. Here are paths you can take depending on what you want to get better at.

## Path 1: Get better at prompting

The better your prompts, the better the results. This is the highest value skill for vibecoding.

- Practice by rebuilding things you see online. Find a website or app you like and try to recreate it with AI.
- When AI gives you a bad result, think about why. Was your prompt too vague? Did you forget to mention something?
- Save your best prompts. Reuse them on future projects.

## Path 2: Learn more about your stack

You do not need to become an expert. But knowing a bit more about your tools helps you talk to AI better. This is the stack we used to build Landed.

**Next.js basics:**
- The Next.js docs at nextjs.org/docs are well written and have examples.
- We use Next.js 16 with the App Router. Focus on: the App Router, route groups, API routes, and data fetching.

**Tailwind CSS v4:**
- The Tailwind docs at tailwindcss.com are excellent. They show every class with examples.
- We use Tailwind v4. There is no `tailwind.config.ts` — the design tokens live as CSS variables in `app/globals.css`. You do not need to memorize classes. Just know where to look.

**TypeScript:**
- You do not need to learn TypeScript from scratch. AI writes it for you.
- If you want to understand the basics: learn what types are, what interfaces are, and what "string", "number", and "boolean" mean. Look at `types/` in the repo to see real ones.

**Supabase:**
- The Supabase docs at supabase.com/docs cover the database, auth, and storage.
- Focus on: tables, Row Level Security (RLS), and magic-link auth. Our whole security story is RLS, so it is worth understanding.

**OpenAI:**
- The OpenAI docs at platform.openai.com/docs cover the API that powers our chat agent.
- Focus on: chat completions, tool calling, and streaming. That is how the agent renders its widgets.

## Path 3: Build more projects

The best way to learn is to build. Here are project ideas for designers:

- **Personal portfolio** - show your work, add animations, deploy it.
- **Client project template** - a reusable starting point for client projects.
- **Design tool** - build a small tool that solves a design problem (color palette generator, font pairing tool, spacing calculator).
- **AI-powered app** - like Landed, add a chat agent that reads your data and answers with rich widgets.

Each project teaches you something new.

## Path 4: Learn about design engineering

Design engineering is the space between design and code. Designers who can build are very valuable.

Look for content about:
- Creative coding (animations, interactive experiences)
- Design systems in code (like our tokens in `app/globals.css` and the `/design` page)
- Interaction design with real code
- Performance and accessibility

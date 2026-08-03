

## What is a stack

A stack is the set of tools you use to build your app. Think of it like choosing materials before you build something. Wood or metal? Screws or glue?

For a web app, your stack includes a framework, a styling tool, a programming language, and the services that store your data and add smart features.

JobTracker (called **"Landed"** in the code) already has a stack. You do not have to pick one. But it helps to know what each piece is and why it is here.

## The stack Landed uses

- **Next.js 16** (App Router) — the framework that runs the app
- **React 19** — the library that builds the screens
- **TypeScript** — the programming language
- **Tailwind CSS v4** — the tool for styling and layout
- **Supabase** — the database and login system
- **OpenAI** — the AI that powers the chat agent
- **Radix UI** — ready-made building blocks like dialogs and dropdowns
- **Phosphor icons** — the icon set

You can see all of this in `package.json`. That file lists every tool the project installs.

## Why Next.js

Next.js is a framework built on React. It handles pages, routing, and the server side for you.

Why it is good for you:
- AI knows it very well. It has seen millions of Next.js examples.
- It runs both the screens and the small API routes in one project. Landed uses this for its chat agent (`app/api/chats`).
- It works with Vercel (where the app goes online) out of the box.

Landed uses the newer **App Router**, where each folder under `app/` is a route. Do not follow old tutorials that use a `pages/` folder — that is the older way.

## Why React

React is the most used tool for building web screens. You describe what the screen should look like, and React keeps it up to date when data changes.

You do not write React from scratch here. The app is built from small components in `components/` (atoms, molecules, organisms). AI is very comfortable editing these.

## Why TypeScript

TypeScript is JavaScript with extra safety. It tells you when something is wrong before the app breaks.

You do not need to learn it deeply. AI writes it for you. But it helps AI make fewer mistakes, because the rules are stricter. Landed even keeps its object shapes in `types/`, so the whole app agrees on what an "Application" is.

## Why Tailwind CSS v4

Tailwind lets you style things directly in your code. You add class names like `bg-canvas` or `text-primary` instead of writing separate CSS files.

Version 4 is a little different from older ones. There is **no `tailwind.config.ts` file**. Instead, the design tokens (colors, fonts, sizes) live as CSS variables in one file: `app/globals.css`, inside a block called `@theme inline`. You edit the tokens there, and the classes update everywhere.

Why this is good for you:
- If you know design, Tailwind maps to things you already know: padding, spacing, colors.
- AI is very good at writing Tailwind and almost never makes mistakes with it.

## Why Supabase

Supabase is the database plus the login system. It stores every application, chat, and profile. It also handles sign-in with a **magic link** — the user gets an email, clicks it, and is logged in. No passwords to remember.

Supabase also protects data with Row Level Security, so each user can only see their own rows. More on that in the API and security lessons.

## Why OpenAI

OpenAI is the brain behind the chat agent. When you talk to Landed, your message and your application data go to OpenAI, and it replies. The default model is `gpt-4o-mini`. All of this runs on the server, never in the browser, so your key stays private.

## Why Radix and Phosphor

- **Radix UI** gives you correct, accessible building blocks — dialogs, dropdowns, tabs, selects. Landed wraps them in `components/ui/` and styles them with its own tokens.
- **Phosphor** is the icon set used across the app.

You do not have to build these from scratch. That is the point — good defaults so you spend time on your product.

## What about other options

You might hear about other tools:

- **Vue, Svelte, Angular** — other frameworks. They work, but AI knows React and Next.js best.
- **Plain CSS, SCSS** — other styling options. They work, but Tailwind is faster with AI.
- **Firebase, plain SQL** — other database options. Supabase gives you a database, login, and security rules in one place.

Landed already made these choices. Your job is to build on them, not to swap them.

## Tips

- Do not fight the stack. Learn the few pieces above and you can follow the whole app.
- When AI suggests a tool that is not in `package.json`, ask why before adding it. Fewer tools means fewer things to break.
- If a tutorial mentions `tailwind.config.ts`, remember: v4 keeps tokens in `app/globals.css` instead.

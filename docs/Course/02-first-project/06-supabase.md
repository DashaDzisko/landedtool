## What is Supabase

Supabase is a service that gives you two things:

1. **A database** - a place to store your data (applications, chats, notes, contacts)
2. **Authentication** - a way for people to sign up and log in to your app

You do not need to build these yourself. Supabase does it for you. You just connect it to your app. In JobTracker, Supabase stores every job application, every chat with the AI, and every user's profile.

## Why Supabase

- It has a free plan that is enough for your first project.
- It works well with Next.js. JobTracker uses `@supabase/supabase-js` and `@supabase/ssr`.
- AI knows Supabase very well. It can write the connection code for you.
- You can see your data in a visual table, like a spreadsheet. This is nice if you are not used to databases.

## How to set it up

### Step 1: Create an account

Go to supabase.com and sign up. It is free.

### Step 2: Create a new project

Click "New project". Give it a name. Pick a password for the database (save this somewhere safe). Choose a region close to your users.

Wait a minute for it to set up.

### Step 3: Get your keys

Go to Project Settings > API. You need two things:

- **Project URL** - the address of your database
- **Anon key** - the public key for your app

### Step 4: Add keys to your project

Copy `.env.example` to `.env.local` in the root of the project. Fill in your keys:

```
NEXT_PUBLIC_SUPABASE_URL=https://<your-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
```

The `.env.local` file works on your computer. When you deploy to Vercel, you will also need to add these keys there. See the Vercel guide for how to do that.

The anon key is safe for the browser. Your data is not protected by hiding the key. It is protected by Row Level Security (more on that below).

## What is a database

If you have never used a database, think of it as a collection of spreadsheets. Each spreadsheet is called a table. Each row is one item. Each column is a property of that item.

JobTracker has these tables:

- `profiles` - one row per user (name, CV summary, target roles)
- `applications` - the job applications (company, role, status, salary...)
- `status_entries` - the timeline of status changes for each application
- `notes` - notes attached to an application
- `contacts` - a contact person for an application
- `chats` - each chat thread with the AI
- `chat_messages` - the messages inside a chat

Example: a few rows from the `applications` table

| id | company | role | status | applied_at |
|----|---------|------|--------|------------|
| a1 | Figma | Product Designer | applied | 2026-07-01 |
| a2 | Linear | Design Engineer | interview | 2026-07-10 |

You can view all of this in the Supabase dashboard. It looks like a spreadsheet editor.

## What is SQL

SQL is the language you use to talk to your database. It tells the database what to do: get data, add data, update data, delete data.

You do not need to learn SQL. But it helps to know what it looks like.

**Get data:**
```sql
select * from applications;
```
This means: give me all rows from the `applications` table.

**Add data:**
```sql
insert into applications (company, role) values ('Figma', 'Product Designer');
```

You will rarely write SQL by hand. In JobTracker the app reads and writes data for you through the helpers in `lib/db/`.

## Migrations: how the tables get created

The JobTracker tables are not clicked together by hand. They are defined in SQL files called **migrations**, in `supabase/migrations/`:

- `0001_init.sql` - creates the enums, all seven tables, indexes, and triggers (one trigger auto-creates a profile when a user signs up, another writes a `status_entries` row every time an application's status changes)
- `0002_rls.sql` - turns on Row Level Security and adds the "own rows only" rules
- `0003_storage.sql` - creates the `cvs` storage bucket for CV uploads

A migration is just a SQL file you run once against your database. Two ways to run them:

- **Paste them:** open the Supabase SQL editor, paste a file's contents, click "Run". Do them in order: 0001, then 0002, then 0003.
- **Push them with the CLI:** `supabase db push` applies every migration for you.

If you get an error, copy the error message and ask AI to fix it.

## Authentication: magic link

JobTracker does not use passwords. It uses a **magic link**. The user types their email, Supabase sends them a link, they click it, and they are signed in. That is the whole login.

- No password to choose, forget, or leak.
- The click lands on `app/auth/callback/route.ts`, which finishes the sign-in.
- `proxy.ts` and `lib/supabase/middleware.ts` keep the session fresh on every request.

## Row Level Security (RLS)

This is the most important part. RLS is a rule on each table that says "a user can only see and change their own rows".

In JobTracker, RLS is turned on for **every table** (`0002_rls.sql`). So even though the anon key is public:

- You only see your own applications, chats, notes, and contacts.
- Child tables like `status_entries` and `chat_messages` inherit ownership from their parent (the application or chat they belong to).
- The `cvs` storage bucket is private, and each user can only touch files inside their own folder.

Without RLS, anyone with the public key could read everyone's data. With RLS, the database refuses. Never turn it off.

## Tips

- Run the migrations in order (0001, 0002, 0003) the first time you set up the database.
- Use the Supabase dashboard to check your data. It is the fastest way to see if things work.
- If the app runs but shows no data, check your keys, check that you are signed in, and check that RLS policies were applied.
- Never disable Row Level Security to "make it work". If you see no rows, you are probably not signed in, not the wrong RLS.

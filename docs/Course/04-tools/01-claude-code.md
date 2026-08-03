
## What it is

Claude Code is an AI that works in your terminal. You give it instructions and it writes code, creates files, runs commands, and edits your project. It works directly with your files on your computer.

It is made by Anthropic, the same company that makes Claude.

## Two ways to use it

### Claude app (easiest way to start)

You can use Claude Code directly from the Claude app at claude.ai/code or the desktop app. No terminal needed.

What makes this great:
- It takes screenshots of your app and sees what it looks like.
- You can share screenshots with it and say "make it look like this."
- It has a visual interface. You chat, see changes, and preview results.
- It connects to your project the same way as the terminal version.

If you are a designer, start here. Being able to show Claude what you see on screen makes communication much easier.

### Terminal version

You can also use Claude Code in your terminal. You open your project folder and start it from the command line. This gives you more control and is faster for experienced users.

## How it works

You talk to Claude Code like you would talk to a developer. It reads your files, understands your project, and makes changes.

You approve or reject each change before it happens. You stay in control.

## What it is good for

- Building features from scratch. "Add a new column to the Kanban board for the 'offer' status."
- Fixing bugs. "I get this error when I open the chat panel. Fix it." Then paste the error.
- Refactoring code. "Move all the Supabase queries into a separate /lib/db file."
- Setting up projects. "Create a new Next.js project with TypeScript and Tailwind."
- Running commands. It can install packages, run tests, and start your app.

## What makes it different

- It works with your real files. It reads your code, understands the structure, and makes changes in place.
- It uses your terminal. It can run npm install, git commands, and other tools.
- It reads your project docs and rules. In this repo, Claude Code reads the docs in `docs/` and the config in `.claude/`. For example, `.claude/launch.json` tells it to run the dev server on port 3009. A `CLAUDE.md` at the repo root is where project rules would live, and Claude Code follows it at the start of every session.
- It asks for permission. Before it creates or edits a file, you see what it wants to do and you approve it.

## How to get started

Install it from the terminal:

```bash
npm install -g @anthropic-ai/claude-code
```

Go to your project folder and start it:

```bash
cd JobTracker
claude
```

Now type your instructions. For example:

"Read the project and tell me what this app does."

## Tips

- Start each session with a clear task. "Add a status badge to the application card."
- If Claude Code does something wrong, tell it. "That is not what I wanted. The badge should use the salmon color from globals.css."
- Use your `CLAUDE.md` file. Claude Code reads it at the start and follows your rules. It also reads the docs in `docs/`, so keep them up to date.
- For big features, break them into small steps. One step per message.

## When to use it

Use Claude Code when you want full control over your project and you are comfortable with the terminal. It is the most powerful option because it has direct access to all your files and tools.

If the terminal feels scary, start with Cursor instead. You can switch to Claude Code later.

## What is GitHub

GitHub is where your code lives online. Think of it as cloud storage for code. Like Google Drive, but for projects.

It does two important things:

1. **Backup.** If your computer breaks, your code is safe on GitHub.
2. **Version history.** You can go back to any previous version of your project. If you break something, you can undo it.

You also need GitHub to deploy your app on Vercel. Vercel reads your code from GitHub.

## What is Git

Git is the tool that tracks changes in your code. GitHub is the website where you store those changes.

You do not need to learn Git deeply. You need a few basic commands. Or you can ask AI to run them for you.

Good news: JobTracker is **already a Git repository**. The `.git` folder is there and there are commits already. So you do not need to run `git init`. You just keep committing on top of what exists.

## Push it to GitHub (if it is not already there)

If the project only lives on your computer, put it on GitHub once:

### Step 1: Create a GitHub account

Go to github.com and sign up. It is free.

### Step 2: Create a repository

A repository (or "repo") is your project's home on GitHub. Click the "+" button and select "New repository". Give it a name. Keep it public or private, your choice.

Or ask AI:

"Create a new GitHub repository called jobtracker and push my project to it."

### Step 3: Connect and push

Ask AI:

"Connect this project to my GitHub repository at github.com/your-username/jobtracker and push it."

AI runs the right Git commands for you.

## Basic Git workflow

Every time you finish a feature or fix something, save your changes to GitHub. Two ways to do this.

### Option A: Ask AI

Just say:

"Commit my changes and push to GitHub."

Or be more specific:

"Commit my changes with the message 'add kanban drag and drop' and push to GitHub."

### Option B: Do it yourself

Three commands in the terminal:

```bash
git add .
git commit -m "add kanban drag and drop"
git push
```

- `git add .` tells Git which files changed
- `git commit -m "message"` saves the changes with a short description
- `git push` sends them to GitHub

### How often should you commit

Commit after every feature that works. Not after every small change. Not once a week.

Good moments to commit:
- You finished a new page or component
- You fixed a bug
- You added a new agent tool that works
- You applied a database migration

## The .gitignore file

Some files should not go to GitHub. Your API keys, for example. The `.gitignore` file tells Git which files to skip.

In JobTracker, `.gitignore` already skips:

- `.env.local` - where your Supabase and OpenAI keys live
- `node_modules` - a large folder of packages
- `storybook-static/` - the generated Storybook output
- `.next` - the build output

Do not remove things from `.gitignore` unless you know what you are doing. In particular, never remove `.env.local`. If your keys reach GitHub, anyone can use them.

## Common problems

**"Permission denied":** You need to set up authentication. Ask AI: "Help me set up GitHub authentication on my computer."

**"Your branch is behind":** Someone (or you from another computer) changed the code on GitHub. Run `git pull` first, then try again.

**You committed something you should not have:** If you accidentally pushed your `.env.local` with real keys, rotate them immediately. Create a new Supabase anon key context and a new OpenAI key. The old keys stay in GitHub's history even after you delete the file.

## Tips

- Write short commit messages that say what you did. "add status badge colors" is better than "update".
- Do not commit broken code. If something is broken, fix it first or undo the change.
- Run `git status` before you commit. It shows exactly what will be saved.
- Check the GitHub website sometimes. It is a good way to see your project from the outside.

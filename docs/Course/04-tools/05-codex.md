
## What it is

Codex is OpenAI's coding agent. It connects to your GitHub repository and works on tasks in the background. You give it a task, it creates a branch, writes the code, and opens a pull request for you to review.

Think of it like hiring a junior developer. You give them a ticket, they do the work, and you review it before it goes live.

## How it works

1. You connect Codex to your GitHub repository.
2. You describe a task. "Add a withdrawn status filter to the Kanban board."
3. Codex works on it in the background. You do not need to wait.
4. When it is done, you get a pull request on GitHub.
5. You review the changes. If they look good, you merge them.

You can give it multiple tasks at the same time. It works on them in parallel.

## What it is good for

- Tasks you can describe clearly. "Add a 404 page." "Fix the broken link in the footer."
- Background work. You describe the task and continue doing other things.
- Small to medium features. Adding a page, fixing a bug, updating styles.
- Working with an existing project on GitHub.
- **Security checks.** You can ask Codex to review your code for security problems. "Check my project for security vulnerabilities." It looks at your code and finds things like an exposed OpenAI API key, missing input validation, or unsafe database queries. This is very useful because as a designer you might not know what makes code unsafe.

## What it is NOT good for

- Tasks that need back-and-forth conversation. Codex works alone, you cannot chat with it while it works.
- Very complex features that need many decisions along the way.
- Projects that are not on GitHub.

## How to get started

1. Go to chatgpt.com/codex (you need a ChatGPT Plus or Team plan).
2. Connect your GitHub account.
3. Select a repository.
4. Write a task and let it work.

## How it compares to other tools

| | Codex | Claude Code | Cursor |
|---|---|---|---|
| Where it works | In the cloud | Your terminal | Your editor |
| How you interact | Give a task, wait | Chat back and forth | Chat and inline edits |
| Needs GitHub | Yes | No | No |
| Good for | Background tasks | Complex features | Visual editing |
| Review method | Pull request | Approve in terminal | Accept diffs in editor |

## Tips

- Write clear tasks with specific details. "Add a contact form with name, email, and message fields to the application detail page" is better than "add a form."
- Review the pull request carefully. Check that Codex did not change files you did not ask about.
- Start with small tasks to see how it works. A bug fix or a simple page.
- Use Codex for the tasks you do not want to do yourself. Use Claude Code or Cursor for tasks where you want to be involved step by step.

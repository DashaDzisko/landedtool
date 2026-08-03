
## What it is

Cursor is a code editor with AI built in. It looks and feels like VS Code, but it has an AI assistant that can write code, edit files, and answer questions about your project.

If you are used to working in a visual editor, Cursor is a good starting point.

## How it works

You open your project in Cursor like you would in any code editor. Then you use the AI chat or inline commands to ask for help. The AI reads your code and makes changes in the editor.

You can see the changes before you accept them. Green lines are new code. Red lines are removed code.

## Main features

### Chat (Cmd+L or Ctrl+L)

Opens a chat panel on the side. You can ask questions or give instructions. The AI sees your project files and can make changes across multiple files.

"Add an empty state to the Kanban board when there are no applications."

### Inline edit (Cmd+K or Ctrl+K)

Select some code and press Cmd+K. Tell the AI what to change. It edits just that section.

"Make this button bigger and use the salmon primary color."

### Composer (Cmd+Shift+I or Ctrl+Shift+I)

A more powerful mode for bigger tasks. It can create and edit multiple files at once. Good for building a full feature.

"Build a settings page with a profile form."

### .cursorrules file

This is Cursor's version of CLAUDE.md. Put your project rules in this file and the AI follows them in every conversation.

## What it is good for

- Writing new components and pages.
- Editing existing code with inline suggestions.
- Asking questions about your code. "What does this function do?"
- Quick fixes. Select the broken code and say "fix this."
- Building features step by step with the chat.

## What makes it different

- It is a visual editor. You see your files, your folder structure, and your code. No terminal needed.
- You see changes as diffs. Green and red lines show you exactly what changed.
- It works with your existing VS Code extensions and settings.
- Multiple AI models. You can choose which AI model to use (Claude, GPT-4, etc.).

## How to get started

1. Download Cursor from cursor.com.
2. Install it. It looks like VS Code.
3. Open your project folder.
4. Create a `.cursorrules` file with your project rules.
5. Press Cmd+L to open the chat and start asking.

## Tips

- Use Cmd+K for small changes and Chat for bigger tasks.
- Add your design system to `.cursorrules`. The AI will use the right colors and fonts (the tokens live in `app/globals.css`).
- When the AI makes a change, read the diff before accepting. Check that it did not touch things you did not ask about.
- If a change is wrong, press Cmd+Z to undo.

## When to use it

Use Cursor if you want a visual editor and you prefer to see your code while you work. It is less powerful than Claude Code for complex tasks, but it is easier to start with. Good for designers who want to see everything in one place.

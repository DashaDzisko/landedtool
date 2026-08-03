

## Why rules matter

When you work with AI, it tries to help. But it guesses a lot. It picks random colors. It adds features you did not ask for. It writes code in a style you do not like.

Rules fix this. Rules tell AI exactly how you want things done. Every time.

## Types of rules

### Project rules

These describe your project. What it is, who it is for, what it should look like.

Examples:
- "Landed is a chat-first job application tracker."
- "The design is dark. Deep charcoal background, salmon accent."
- "There is no dashboard. Stats come from the chat agent."

### Coding rules

These tell AI how to write code. What tools to use. What patterns to follow.

Examples:
- "Use Tailwind CSS v4 for styling."
- "Components follow atomic design: atoms -> molecules -> organisms."
- "Use TypeScript, not JavaScript."
- "Never expose OPENAI_API_KEY to the client."

### Design rules

These protect your design decisions. Colors, fonts, spacing, layout.

Examples:
- "Primary color is #f4a988 (salmon). Do not change it."
- "Design tokens live in app/globals.css as CSS variables — never hardcode hex in components."
- "Fonts are Strichpunkt Sans for text and JetBrains Mono for code."
- "Use the spacing tokens (page, section, card, block). Do not invent new values."

## Where to put your rules

You have three places:

### 1. In your CLAUDE.md file

This is the best place for rules that always apply. AI reads this file at the start of every conversation.

```markdown
## Rules
- Design tokens live in app/globals.css. Never hardcode hex in components.
- Components follow atomic design: atoms -> molecules -> organisms.
- Every Supabase table must have RLS enabled.
```

### 2. In separate rule files

Some tools (like Cursor) let you create `.cursorrules` or other rule files. These work the same way. AI reads them and follows them.

### 3. In your prompt

You can also add rules directly in your message. This is good for one-time rules that only apply to one task.

"Build a status badge. Use the status color tokens from globals.css. No inline hex."

## Good rules vs bad rules

### Bad rules

- "Make it look nice." (Too vague. Nice how?)
- "Use best practices." (AI does not know your version of best practices.)
- "Be careful with the API key." (What does careful mean?)

### Good rules

- "Primary color is #f4a988 (salmon). Do not change it."
- "Never expose OPENAI_API_KEY to the client."
- "Every Supabase table must have RLS enabled."

## The pattern

Good rules follow this pattern:

**What** + **Where** + **How**

- "Use the salmon token (what) for primary buttons (where) via `bg-primary` (how)."
- "Add a typing indicator (what) inside the chat panel (where) while the agent is streaming (how)."

## Start small

You do not need 50 rules on day one. Start with 5 to 10 rules that matter most. Add more as you learn what AI gets wrong.

Every time AI does something you do not like, write a rule to prevent it next time.

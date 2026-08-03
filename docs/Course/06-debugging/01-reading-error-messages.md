
## Errors are normal

Your app will break. It will show red text in the terminal or in the browser. This is normal. Every developer sees errors every day. It does not mean you broke Landed for good.

The error message tells you what went wrong and where. You do not need to understand every word. You need to know what to look for and what to copy for AI.

## Where errors show up

### In the terminal

When you run `npm run dev`, Landed starts on http://localhost:3009. If something is wrong with your code, the error prints in that same terminal window: wrong imports, missing files, or syntax mistakes.

Keep that terminal visible while you work. It is the first place a problem shows up.

### On the page (the Next.js error overlay)

Next.js 16 shows a big overlay right on top of the page when something crashes while rendering. It gives you the error name, a short message, the file name, and the line number. There is often a "Call Stack" you can expand, but you rarely need it.

The overlay is your friend. It points straight at the file to look at.

### In the browser console

Open your browser dev tools (press F12, or right-click and choose Inspect). Click the "Console" tab. Red text here means something went wrong while the page was running in the browser: a click that failed, a chat message that did not send, a widget that did not draw.

## What to look for in an error

Most errors have three useful parts.

### 1. The error name

This is usually the first line. It tells you the type of problem.

- `TypeError` - you tried to use something the wrong way
- `ReferenceError` - you used a name that does not exist
- `SyntaxError` - something is written incorrectly (missing bracket, extra comma)
- `Module not found` - a file or package is missing
- `Build error` - the app cannot compile

### 2. The message

Right after the error name. It explains what happened in plainer English.

Examples:

- "Cannot read properties of undefined" - you tried to use data that is not there yet (often applications that have not loaded)
- "Module not found: Can't resolve '@/components/organisms/chat/chat-panel'" - the file at this path does not exist
- "Expected '}' but found 'EOF'" - you forgot to close a bracket somewhere

### 3. The file and line number

The error shows which file and which line caused the problem. It looks like this:

```
at app/(app)/page.tsx:15:8
```

This means the error is in `app/(app)/page.tsx`, line 15.

## How to copy an error for AI

When you get an error, copy the whole thing. Do not try to summarize it. AI understands error messages better than you do.

Good way to ask for help:

"I get this error when I send a message in the chat panel:"

Then paste the full error message from the overlay or the terminal.

If the error is very long (more than 30 lines), copy the first 10 to 15 lines. That usually has the important information.

## Tips

- Do not panic when you see red text. Read it slowly.
- Look for the file name and line number first. That tells you where to look.
- The first error matters most. If you see five errors, fix the first one. The others might go away.
- Terminal errors are usually about the code. Console errors are usually about what happens in the browser. Knowing which one you saw helps AI.
- If you do not understand the error, that is fine. Copy it and ask AI.

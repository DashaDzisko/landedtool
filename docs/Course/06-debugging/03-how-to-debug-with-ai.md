
## The basic workflow

1. Something breaks.
2. You copy the error message.
3. You tell AI what you were doing when it broke.
4. AI fixes it.

That is the short version. Here is how to do it well.

## Step 1: Describe what happened

Tell AI three things:

- **What you did.** "I typed my email into the magic-link form and clicked Send link."
- **What you expected.** "I expected the check-your-email screen to appear."
- **What actually happened.** "I got a red error in the console."

## Step 2: Copy the error

Copy the full error message. Do not screenshot it (AI reads text better than images for errors). Do not summarize it. Paste the whole thing, from the terminal or the Next.js overlay.

## Step 3: Send it to AI

Example prompt:

```
I typed my email into the magic-link form and clicked Send link, and got this error:

TypeError: Cannot read properties of undefined (reading 'email')
    at handleSubmit (components/organisms/auth/magic-link-form.tsx:23:15)

It should send the magic link and show the check-your-email screen. Can you fix this?
```

## Debugging prompts you can copy

### When something crashes

"I get this error when I [what you did]. Here is the full error: [paste error]. Can you find the problem and fix it?"

### When something looks wrong

"On the Kanban board, all my applications show up in one column instead of their status columns. They should be split into saved, applied, screening, interview, offer, rejected, and withdrawn. Can you check `components/organisms/canvas/kanban-board.tsx`?"

### When something does not work but there is no error

"I send a message in the chat panel but nothing streams back. No error in the console. The message just sits there. It should call `app/api/chats/[chatId]/route.ts` and stream the agent reply. Can you check what is wrong?"

### When AI's fix does not work

"Your last fix did not work. I still get the same error: [paste error]. Here is the current code: [paste the file or its path]. Try a different approach."

### When you are stuck in a loop

"We have been going back and forth on this chat streaming bug for a while. Let me describe the whole thing from the start: [describe everything]. Can you take a fresh look and suggest a different solution?"

## Tips for better debugging

### Give context

AI fixes bugs faster when it knows the full picture. Tell it which screen, which component, which action triggers the error.

**Bad:** "The chat does not work."

**Good:** "The chat panel shows an error toast when I send the first message. Here is the error from the terminal where `npm run dev` is running."

### Try one fix at a time

If AI suggests a fix, try it. If it does not work, say so. Do not try to fix three things at once.

### Use the browser dev tools

- **Console tab** (F12 > Console) - shows JavaScript errors
- **Network tab** (F12 > Network) - shows requests and their responses. When the chat does not reply, click the request to `/api/chats/...` and read the response. A 401 means you are not signed in. A 500 means the server crashed.
- **Elements tab** (F12 > Elements) - shows the HTML. Good for checking if something is on the page but hidden.

You do not need to understand everything in dev tools. But checking these tabs gives AI more information to work with.

### Keep a bug list

When you fix a bug, write it down. "Board was empty because I was signed out. Signed in and the applications appeared." After a few bugs you will start recognizing patterns.


## The trap

You have a bug. AI suggests a fix. The fix creates a new bug. You fix that one. Now two other things break. You fix those. An hour later, your code is a mess and nothing works.

This happens more than you think. It is not your fault. It is not AI's fault. Sometimes the approach is wrong and no amount of patching will save it.

## Signs you should undo instead of fix

- You have been going back and forth on the same bug for more than 15 to 20 minutes.
- AI keeps giving different solutions and none of them work.
- The code has changed so much that you do not recognize it anymore.
- New bugs appear every time you fix one.
- You feel lost and do not understand what the code is doing.

## How to undo

Landed already uses Git. That is your safety net. If you committed your code before the problem started, you can always go back.

### Save the broken changes for later

Ask AI: "Undo all changes since my last commit."

Or in the terminal:

```bash
git stash
```

This saves your broken changes and brings back the last working version. If you want the broken changes back later, run `git stash pop`. If not, they just stay stored and out of your way.

### Throw the broken changes away

If you are sure you do not want the broken changes:

```bash
git checkout .
```

This removes all uncommitted changes. Be careful. You cannot undo this.

### If only one file is broken

You do not need to undo everything. Say you only wrecked the Kanban board. Ask AI: "The kanban board is broken. Show me the version from the last commit."

Or in the terminal:

```bash
git checkout -- components/organisms/canvas/kanban-board.tsx
```

This resets just that one file and leaves everything else alone.

### Check what changed first

Before you undo, it helps to see exactly what is different from the last good version:

```bash
git status
git diff
```

`git status` lists the files you touched. `git diff` shows the actual changes. This tells you how deep the mess goes.

## Starting the feature over

Sometimes the best move is to delete what AI built and try again with a better prompt.

Before you try again:

1. Think about what went wrong. Was the prompt too vague? Too many things at once?
2. Write a clearer prompt. Break the feature into smaller steps.
3. Try a different approach. If AI built it one way and it did not work, tell it to try differently.

"Last time we built the whole chat panel and the streaming logic in one component and it got too complex. This time, keep the streaming in the `/api/chats/[chatId]` route and let the panel just show what streams back."

## The 20-minute rule

If you have been stuck on the same bug for 20 minutes, stop and ask yourself:

- Can I undo and try again with a better approach?
- Am I fixing the real problem or just patching symptoms?
- Should I break this into smaller steps?

Most of the time, starting fresh with a better prompt is faster than fixing a broken mess.

## Tips

- Commit your code before starting a new feature. Always. This gives you a safe point to go back to.
- Do not feel bad about starting over. Even experienced developers do this.
- Save your broken code before deleting it (use `git stash`). Sometimes parts of it are useful later.
- If a feature is too big, it will break. Split it into smaller pieces.

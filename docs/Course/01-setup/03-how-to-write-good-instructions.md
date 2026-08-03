

## Why this matters

AI builds what you ask for. Not what you mean. Not what you imagine. What you write.

If your instructions are vague, the result will be random. If your instructions are clear, the result will be close to what you want.

Writing good instructions is the most useful skill in vibecoding.

## Rule 1: Be specific

Say exactly what you want. Include details.

**Bad:** "Add an application card."

**Good:** "Add an application card. Show a colored status badge at the top, then the role, then the company, then the date applied. The status badge is the most glanceable thing, so it goes first."

## Rule 2: One task at a time

Do not ask for five things in one message. AI will try to do all of them and make mistakes.

**Bad:** "Build the whole Kanban board with all seven columns, drag and drop, the application cards, the empty states, and the chat panel next to it."

**Good:** "Build one Kanban column. It has a heading with the status name and a count, then a vertical list of application cards below it."

After AI finishes, move to the next part.

## Rule 3: Say what you want

AI works better with positive instructions.

**Bad:** "Don't use a random color for the badge."

**Good:** "Use the status color tokens from globals.css for the badge. For example `--status-interview-text` for the interview status."

## Rule 4: Give examples

If you have a reference, share it. A screenshot, a link, a sketch. AI understands examples faster than long descriptions.

"Make the chat message bubble similar to this screenshot. The agent's messages are on the left on a surface background. My messages are on the right."

## Rule 5: Describe the result

Tell AI what the final result should look like. This helps it check its own work.

"When this is done, I should see a status badge with a soft background and matching text color. It says the status name, like 'Interview', in small text with rounded pill corners."

## Before and after examples

### Example 1: Status badge

**Before:** "Add a status badge."

**After:** "Add a status badge that shows one of the seven statuses: saved, applied, screening, interview, offer, rejected, withdrawn. Each status uses its own token pair from globals.css, like `--status-applied-bg` and `--status-applied-text`. The badge is a small pill with rounded corners and the status label inside."

### Example 2: Kanban column

**Before:** "Make a column."

**After:** "Create one Kanban column for a single status. At the top is a header with the status name on the left and the number of applications on the right. Below it is a vertical stack of application cards with a small gap between them. If there are no cards, show an empty state message."

### Example 3: Chat message bubble

**Before:** "Build a chat bubble."

**After:** "Build a chat message bubble. Agent messages sit on the left with a surface background. My messages sit on the right with the salmon primary background and dark text. Text uses the chat type size. Corners are rounded. Long messages wrap and keep some padding inside."

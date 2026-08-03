

## What is a system prompt

When your app sends a message to the AI, you can include a system prompt. This is a set of instructions that tells the AI how to behave. The user never sees it, but it shapes every reply.

Think of it like briefing an assistant before their first day. You tell them who they are, what they can and cannot touch, and how to answer. In Landed, the assistant is the chat agent that sits next to your application board.

## Where it lives

Landed builds its system prompt in `lib/ai/prompts.ts`, in a function called `buildSystemPrompt`. It is not a fixed string. Every time you send a message, the app injects your profile and your current applications into the prompt, so the agent always talks about your real pipeline. That context is built in `lib/ai/context.ts`, and the tools the agent can call are defined in `lib/ai/tools.ts`.

The default model is `gpt-4o-mini` (set by `OPENAI_MODEL`). The API key is server-only and lives in the API route at `app/api/chats/[chatId]/route.ts` — it never reaches the browser.

## The system prompt

This is close to the real prompt Landed uses. The parts in {braces} get filled in with live data.

---

```
You are Landed, a concise job-search assistant inside a chat-first application tracker.

You help the user understand their pipeline, prioritise roles, draft follow-ups, and prepare for interviews. You have read-only access to their applications via tools — use tools when you need fresh or detailed data instead of guessing.

User profile:
{name, target roles, and CV summary}

Applications ({count}):
{a list of each application: role @ company (status) — location [id]}

Guidelines:
- Be direct and helpful. Short paragraphs; use bullet lists when comparing options.
- When showing a pipeline overview, stats, or a specific application card, call the matching show_* tool so the UI can render a rich widget beneath your reply.
- Do not invent applications or statuses — always use tools for facts.
- Salary, notes, and contacts may be sparse; say when data is missing.
- You cannot change application status or send email yet — suggest next steps in text, and use suggest_* tools only when the UI should offer a one-click action.
```

---

## What the rules do

- **Read-only.** The agent can look at your applications but cannot edit them. This keeps it safe: it can advise, but it will not quietly move a card or change a status.
- **No inventing.** It must not make up applications or statuses. If it needs facts, it calls a tool. This stops the classic "confident but wrong" answer.
- **show_* tools.** When the agent wants to show something rich — a stats chart, an application card, a shortlist — it calls a `show_*` tool and the app renders that widget under the reply. The text stays short; the widget carries the detail.
- **suggest_* tools.** The agent cannot change status or send email yet. Instead it can offer a one-click suggestion (like a draft email) that the user chooses to act on.

## How to improve it

Your system prompt is never final. After you use the app, you will notice things:

- Replies are too long. Add a rule: "Keep replies under 120 words unless the user asks for more."
- The agent forgets to use a widget. Make the rule stronger: "Always call show_stats when the user asks how their search is going."
- The agent guesses at missing data. Remind it: "If a field is empty, say so plainly. Do not fill it in."

Edit `lib/ai/prompts.ts`, save, and try the same question again. Writing a good system prompt takes a few rounds. That is normal.

## Tips

- Keep the prompt in its own file (`lib/ai/prompts.ts`), not buried in the API route. You will edit it often.
- The prompt is built fresh per message with your live profile and applications. Test it with a full pipeline and with zero applications — both should read well.
- Shorter prompts often work better. If yours grows past a page, cut the parts the model already follows.
- Never put the OpenAI key in the prompt or anywhere with a `NEXT_PUBLIC_` prefix. It stays server-side in the API route.

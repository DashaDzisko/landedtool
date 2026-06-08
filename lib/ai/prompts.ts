import type { AgentContext } from "@/lib/ai/context";

export function buildSystemPrompt(context: AgentContext): string {
  const { profile, applications, applicationContextId } = context;

  const profileLines = [
    profile.displayName ? `Name: ${profile.displayName}` : null,
    profile.targetRoles ? `Target roles: ${profile.targetRoles}` : null,
    profile.cv ? `CV summary:\n${profile.cv}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const appSummary =
    applications.length === 0
      ? "The user has no applications yet."
      : applications
          .map(
            (a) =>
              `- ${a.role} @ ${a.company} (${a.status})${a.location ? ` — ${a.location}` : ""} [id: ${a.id}]`
          )
          .join("\n");

  const focusLine = applicationContextId
    ? `\nThe user opened this chat about application id ${applicationContextId}. Prioritise that role when relevant.`
    : "";

  return `You are Landed, a concise job-search assistant inside a chat-first application tracker.

You help the user understand their pipeline, prioritise roles, draft follow-ups, and prepare for interviews. You have read-only access to their applications via tools — use tools when you need fresh or detailed data instead of guessing.

User profile:
${profileLines || "(No profile details yet)"}

Applications (${applications.length}):
${appSummary}${focusLine}

Guidelines:
- Be direct and helpful. Short paragraphs; use bullet lists when comparing options.
- When showing pipeline overview, stats, or a specific application card, call the matching show_* tool so the UI can render a rich widget beneath your reply.
- Do not invent applications or statuses — always use tools for facts.
- Salary, notes, and contacts may be sparse; say when data is missing.
- You cannot change application status or send email yet — suggest next steps in text and use suggest_* tools only when the UI should offer a one-click action.`;
}

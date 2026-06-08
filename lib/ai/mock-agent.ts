import type { Application, ApplicationStatus } from "@/types/application";
import type { ChatWidget } from "@/types/chat";

const STATUS_WORDS: ApplicationStatus[] = [
  "saved",
  "applied",
  "screening",
  "interview",
  "offer",
  "rejected",
  "withdrawn",
];

const CLOSED: ApplicationStatus[] = ["rejected", "withdrawn"];

/** Regex-based mock agent used when OPENAI_API_KEY is not set. */
export function resolveMockAgentResponse(
  content: string,
  applications: Application[]
): { text: string; widget?: ChatWidget } {
  const c = content.toLowerCase();
  const matchApp = () =>
    applications.find(
      (a) =>
        c.includes(a.company.toLowerCase()) || c.includes(a.role.toLowerCase())
    );

  if (/\b(stat|pipeline|summar|overview|progress|how many)\b/.test(c)) {
    return {
      text: "Here's your pipeline at a glance:",
      widget: { type: "pipeline-stats" },
    };
  }

  const targetStatus = STATUS_WORDS.find((s) => c.includes(s));
  if (/(move|change|mark|update|set|advance)/.test(c) && targetStatus) {
    const app = matchApp() ?? applications[0];
    if (app) {
      return {
        text: "Want me to update this?",
        widget: {
          type: "change-status",
          applicationId: app.id,
          toStatus: targetStatus,
        },
      };
    }
  }

  if (/(draft|write|follow.?up|email|reply|reach out|message)/.test(c)) {
    const app = matchApp() ?? applications[0];
    if (app) {
      return {
        text: `Here's a follow-up draft for ${app.company}:`,
        widget: {
          type: "draft-email",
          applicationId: app.id,
          subject: `Following up — ${app.role}`,
          body: `Hi,\n\nThanks again for considering me for the ${app.role} role at ${app.company}. I'm very excited about the opportunity and wanted to follow up on next steps.\n\nHappy to share anything that would help.\n\nBest,\nDaria`,
        },
      };
    }
  }

  if (/(priorit|shortlist|focus|which (one|role|should)|what.*next)/.test(c)) {
    const active = applications
      .filter((a) => !CLOSED.includes(a.status))
      .slice(0, 3);
    if (active.length) {
      return {
        text: "Here's where I'd focus:",
        widget: {
          type: "application-shortlist",
          items: active.map((a, i) => ({
            applicationId: a.id,
            reason: i === 0 ? "furthest along" : "active & worth a nudge",
          })),
        },
      };
    }
  }

  const app = matchApp();
  if (app) {
    return {
      text: `Here's ${app.company}:`,
      widget: { type: "application-card", applicationId: app.id },
    };
  }

  return {
    text: "I don't have enough context for that yet — try asking about a specific company or your pipeline.",
  };
}

import type { AgentContext } from "@/lib/ai/context";
import { statusLabels } from "@/lib/status-colors";
import type { Application, ApplicationStatus } from "@/types/application";
import type { ChatWidget } from "@/types/chat";
import type OpenAI from "openai";

const CLOSED: ApplicationStatus[] = ["rejected", "withdrawn"];

export const agentToolDefinitions: OpenAI.Chat.Completions.ChatCompletionTool[] =
  [
    {
      type: "function",
      function: {
        name: "list_applications",
        description:
          "List the user's job applications, optionally filtered by status or search text.",
        parameters: {
          type: "object",
          properties: {
            status: {
              type: "string",
              enum: [
                "saved",
                "applied",
                "screening",
                "interview",
                "offer",
                "rejected",
                "withdrawn",
              ],
            },
            query: {
              type: "string",
              description: "Optional search against company or role.",
            },
          },
        },
      },
    },
    {
      type: "function",
      function: {
        name: "get_application",
        description: "Get full details for one application by id.",
        parameters: {
          type: "object",
          properties: {
            applicationId: { type: "string" },
          },
          required: ["applicationId"],
        },
      },
    },
    {
      type: "function",
      function: {
        name: "summarise_stats",
        description:
          "Summarise pipeline counts by status. Also triggers a pipeline stats widget in the chat UI.",
        parameters: { type: "object", properties: {} },
      },
    },
    {
      type: "function",
      function: {
        name: "show_pipeline_stats",
        description:
          "Show the pipeline stats chart widget in chat. Call when the user asks for an overview or summary.",
        parameters: { type: "object", properties: {} },
      },
    },
    {
      type: "function",
      function: {
        name: "show_application_card",
        description:
          "Show an application card widget for a specific application id.",
        parameters: {
          type: "object",
          properties: {
            applicationId: { type: "string" },
          },
          required: ["applicationId"],
        },
      },
    },
    {
      type: "function",
      function: {
        name: "show_shortlist",
        description:
          "Show a shortlist widget of recommended applications to focus on.",
        parameters: {
          type: "object",
          properties: {
            applicationIds: {
              type: "array",
              items: { type: "string" },
              description: "Up to 3 application ids, in priority order.",
            },
            reasons: {
              type: "array",
              items: { type: "string" },
              description: "Short reason per id, same order as applicationIds.",
            },
          },
          required: ["applicationIds"],
        },
      },
    },
    {
      type: "function",
      function: {
        name: "suggest_status_change",
        description:
          "Suggest changing an application's status — renders a confirm widget in chat.",
        parameters: {
          type: "object",
          properties: {
            applicationId: { type: "string" },
            toStatus: {
              type: "string",
              enum: [
                "saved",
                "applied",
                "screening",
                "interview",
                "offer",
                "rejected",
                "withdrawn",
              ],
            },
          },
          required: ["applicationId", "toStatus"],
        },
      },
    },
    {
      type: "function",
      function: {
        name: "draft_follow_up_email",
        description:
          "Draft a follow-up email and show it in an editable widget.",
        parameters: {
          type: "object",
          properties: {
            applicationId: { type: "string" },
            subject: { type: "string" },
            body: { type: "string" },
          },
          required: ["applicationId", "subject", "body"],
        },
      },
    },
  ];

export interface ToolExecutionResult {
  data: unknown;
  widget?: ChatWidget;
}

function findApplication(
  context: AgentContext,
  applicationId: string
): Application | undefined {
  return context.applications.find((a) => a.id === applicationId);
}

function filterApplications(
  context: AgentContext,
  args: { status?: ApplicationStatus; query?: string }
): Application[] {
  let list = context.applications;
  if (args.status) {
    list = list.filter((a) => a.status === args.status);
  }
  if (args.query?.trim()) {
    const q = args.query.trim().toLowerCase();
    list = list.filter(
      (a) =>
        a.company.toLowerCase().includes(q) ||
        a.role.toLowerCase().includes(q)
    );
  }
  return list;
}

function summarise(context: AgentContext) {
  const counts = context.applications.reduce<Record<string, number>>(
    (acc, app) => {
      acc[app.status] = (acc[app.status] ?? 0) + 1;
      return acc;
    },
    {}
  );

  return {
    total: context.applications.length,
    byStatus: Object.entries(statusLabels).map(([status, label]) => ({
      status,
      label,
      count: counts[status] ?? 0,
    })),
  };
}

export async function executeAgentTool(
  name: string,
  args: Record<string, unknown>,
  context: AgentContext
): Promise<ToolExecutionResult> {
  switch (name) {
    case "list_applications": {
      const list = filterApplications(context, {
        status: args.status as ApplicationStatus | undefined,
        query: args.query as string | undefined,
      });
      return {
        data: list.map((a) => ({
          id: a.id,
          company: a.company,
          role: a.role,
          status: a.status,
          location: a.location,
          appliedAt: a.appliedAt,
        })),
      };
    }
    case "get_application": {
      const app = findApplication(context, String(args.applicationId));
      if (!app) return { data: { error: "Application not found" } };
      return { data: app };
    }
    case "summarise_stats":
    case "show_pipeline_stats":
      return {
        data: summarise(context),
        widget: { type: "pipeline-stats" },
      };
    case "show_application_card": {
      const app = findApplication(context, String(args.applicationId));
      if (!app) return { data: { error: "Application not found" } };
      return {
        data: { id: app.id, company: app.company, role: app.role },
        widget: { type: "application-card", applicationId: app.id },
      };
    }
    case "show_shortlist": {
      const ids = (args.applicationIds as string[] | undefined) ?? [];
      const reasons = (args.reasons as string[] | undefined) ?? [];
      const items = ids
        .map((id, index) => {
          const app = findApplication(context, id);
          if (!app) return null;
          return {
            applicationId: app.id,
            reason: reasons[index] ?? "worth focusing on",
          };
        })
        .filter(Boolean) as { applicationId: string; reason: string }[];

      if (items.length === 0) {
        const active = context.applications
          .filter((a) => !CLOSED.includes(a.status))
          .slice(0, 3);
        return {
          data: { items: active.map((a) => a.id) },
          widget: {
            type: "application-shortlist",
            items: active.map((a, i) => ({
              applicationId: a.id,
              reason: i === 0 ? "furthest along" : "active & worth a nudge",
            })),
          },
        };
      }

      return {
        data: { items },
        widget: { type: "application-shortlist", items },
      };
    }
    case "suggest_status_change": {
      const app = findApplication(context, String(args.applicationId));
      const toStatus = args.toStatus as ApplicationStatus;
      if (!app) return { data: { error: "Application not found" } };
      return {
        data: { applicationId: app.id, fromStatus: app.status, toStatus },
        widget: {
          type: "change-status",
          applicationId: app.id,
          toStatus,
        },
      };
    }
    case "draft_follow_up_email": {
      const app = findApplication(context, String(args.applicationId));
      if (!app) return { data: { error: "Application not found" } };
      const subject = String(args.subject);
      const body = String(args.body);
      return {
        data: { applicationId: app.id, subject },
        widget: {
          type: "draft-email",
          applicationId: app.id,
          subject,
          body,
        },
      };
    }
    default:
      return { data: { error: `Unknown tool: ${name}` } };
  }
}

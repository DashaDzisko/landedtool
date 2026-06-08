export interface ChatSession {
  id: string;
  title: string;
  preview: string;
  updatedAt: string;
}

import type { ApplicationStatus } from "@/types/application";

/** A rich response the agent can render inline instead of plain text. */
export type ChatWidget =
  | { type: "pipeline-stats" }
  | { type: "application-card"; applicationId: string }
  | {
      type: "application-shortlist";
      items: { applicationId: string; reason: string }[];
    }
  | { type: "change-status"; applicationId: string; toStatus: ApplicationStatus }
  | {
      type: "draft-email";
      applicationId: string;
      subject: string;
      body: string;
    };

export interface ChatMessage {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  isUser?: boolean;
  isStreaming?: boolean;
  /** Optional agentic widget rendered beneath the message text. */
  widget?: ChatWidget;
}

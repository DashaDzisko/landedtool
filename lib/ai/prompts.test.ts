import { describe, expect, it } from "vitest";
import { buildSystemPrompt } from "@/lib/ai/prompts";
import type { AgentContext } from "@/lib/ai/context";
import type { Application } from "@/types/application";

function ctx(overrides: Partial<AgentContext> = {}): AgentContext {
  return {
    profile: { id: "u1", displayName: "Daria", targetRoles: "Product Designer" },
    applications: [],
    applicationContextId: null,
    ...overrides,
  };
}

const apps: Application[] = [
  { id: "a1", company: "Acme", role: "Product Designer", status: "interview" },
  { id: "a2", company: "Globex", role: "Design Engineer", status: "applied" },
];

describe("buildSystemPrompt", () => {
  it("includes the profile details", () => {
    const p = buildSystemPrompt(ctx());
    expect(p).toContain("Daria");
    expect(p).toContain("Product Designer");
  });

  it("summarises each application with role, company and status", () => {
    const p = buildSystemPrompt(ctx({ applications: apps }));
    expect(p).toContain("Applications (2)");
    expect(p).toContain("Product Designer @ Acme (interview)");
    expect(p).toContain("Design Engineer @ Globex (applied)");
  });

  it("says so when there are no applications", () => {
    const p = buildSystemPrompt(ctx({ applications: [] }));
    expect(p).toContain("no applications yet");
  });

  it("focuses on the opened application when a context id is set", () => {
    const p = buildSystemPrompt(
      ctx({ applications: apps, applicationContextId: "a1" })
    );
    expect(p).toContain("application id a1");
  });

  it("tells the agent the action widgets need user confirmation", () => {
    const p = buildSystemPrompt(ctx({ applications: apps }));
    expect(p).toContain("suggest_status_change");
    expect(p).toContain("draft_follow_up_email");
    expect(p.toLowerCase()).toContain("confirm");
  });
});

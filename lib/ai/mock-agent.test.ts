import { describe, expect, it } from "vitest";
import { resolveMockAgentResponse } from "@/lib/ai/mock-agent";
import type { Application } from "@/types/application";

function app(overrides: Partial<Application> = {}): Application {
  return {
    id: "app-1",
    company: "Acme",
    role: "Product Designer",
    status: "applied",
    ...overrides,
  };
}

const apps: Application[] = [
  app({ id: "a1", company: "Acme", role: "Product Designer", status: "interview" }),
  app({ id: "a2", company: "Globex", role: "Design Engineer", status: "applied" }),
  app({ id: "a3", company: "Initech", role: "UX Lead", status: "rejected" }),
];

describe("resolveMockAgentResponse", () => {
  it("returns the pipeline-stats widget for overview questions", () => {
    const r = resolveMockAgentResponse("how many applications do I have?", apps);
    expect(r.widget).toEqual({ type: "pipeline-stats" });
  });

  it("proposes a status change for a matched application", () => {
    const r = resolveMockAgentResponse("move Globex to interview", apps);
    expect(r.widget).toEqual({
      type: "change-status",
      applicationId: "a2",
      toStatus: "interview",
    });
  });

  it("drafts a follow-up email for the matched company", () => {
    const r = resolveMockAgentResponse("draft a follow-up to Acme", apps);
    expect(r.widget?.type).toBe("draft-email");
    if (r.widget?.type === "draft-email") {
      expect(r.widget.applicationId).toBe("a1");
      expect(r.widget.subject).toContain("Product Designer");
    }
  });

  it("shortlists only active applications (excludes rejected/withdrawn)", () => {
    const r = resolveMockAgentResponse("what should I focus on?", apps);
    expect(r.widget?.type).toBe("application-shortlist");
    if (r.widget?.type === "application-shortlist") {
      const ids = r.widget.items.map((i) => i.applicationId);
      expect(ids).toContain("a1");
      expect(ids).toContain("a2");
      expect(ids).not.toContain("a3"); // rejected
    }
  });

  it("shows an application card when a company is named", () => {
    const r = resolveMockAgentResponse("how is Initech going", apps);
    expect(r.widget).toEqual({ type: "application-card", applicationId: "a3" });
  });

  it("falls back to text with no widget when nothing matches", () => {
    const r = resolveMockAgentResponse("tell me a joke", apps);
    expect(r.widget).toBeUndefined();
    expect(r.text.length).toBeGreaterThan(0);
  });

  it("prefers the stats widget even when a company is also mentioned", () => {
    const r = resolveMockAgentResponse("give me an overview of Acme", apps);
    expect(r.widget).toEqual({ type: "pipeline-stats" });
  });
});

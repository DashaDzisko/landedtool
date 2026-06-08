import { describe, expect, it } from "vitest";
import { statusColorClass, statusLabels } from "@/lib/status-colors";
import type { ApplicationStatus } from "@/types/application";

const STATUSES: ApplicationStatus[] = [
  "saved",
  "applied",
  "screening",
  "interview",
  "offer",
  "rejected",
  "withdrawn",
];

describe("status-colors", () => {
  it("has a human label for every status", () => {
    for (const s of STATUSES) {
      expect(statusLabels[s]).toBeTruthy();
    }
  });

  it("maps every status to its color tokens", () => {
    for (const s of STATUSES) {
      expect(statusColorClass[s]).toContain(`--status-${s}-bg`);
      expect(statusColorClass[s]).toContain(`--status-${s}-text`);
    }
  });
});

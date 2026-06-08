import { describe, expect, it } from "vitest";
import { cn } from "@/lib/utils";

describe("cn (extended tailwind-merge)", () => {
  // Regression guard for the gotcha: custom size utilities (text-body/text-chat)
  // must survive next to a color class instead of being treated as a color.
  it("keeps a custom font-size next to a color class", () => {
    const out = cn("text-body", "text-on-primary");
    expect(out).toContain("text-body");
    expect(out).toContain("text-on-primary");
  });

  it("dedupes conflicting custom sizes (last wins)", () => {
    expect(cn("text-body", "text-chat")).toBe("text-chat");
  });

  it("still dedupes standard conflicting utilities", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
  });
});

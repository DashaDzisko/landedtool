import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RichText } from "@/components/atoms/rich-text";

describe("RichText", () => {
  it("renders **bold** as <strong>", () => {
    render(
      <p>
        <RichText>{"ready for **Product Manager**"}</RichText>
      </p>
    );
    const strong = screen.getByText("Product Manager");
    expect(strong.tagName).toBe("STRONG");
  });

  it("renders `code` as <code>", () => {
    render(
      <p>
        <RichText>{"run `npm test`"}</RichText>
      </p>
    );
    expect(screen.getByText("npm test").tagName).toBe("CODE");
  });

  it("leaves plain text untouched (no stray asterisks)", () => {
    render(
      <p data-testid="msg">
        <RichText>{"just a plain message"}</RichText>
      </p>
    );
    expect(screen.getByTestId("msg").textContent).toBe("just a plain message");
  });
});

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ScrollReveal } from "./ScrollReveal";

describe("ScrollReveal", () => {
  it("renders its children", () => {
    render(
      <ScrollReveal>
        <p>revealed content</p>
      </ScrollReveal>
    );

    expect(screen.getByText("revealed content")).toBeInTheDocument();
  });

  it("applies the given class name to the wrapper", () => {
    render(<ScrollReveal className="mt-8">content</ScrollReveal>);

    expect(screen.getByText("content")).toHaveClass("mt-8");
  });

  it("accepts a reveal delay without changing the output", () => {
    render(<ScrollReveal delay={0.4}>content</ScrollReveal>);

    expect(screen.getByText("content")).toBeInTheDocument();
  });
});

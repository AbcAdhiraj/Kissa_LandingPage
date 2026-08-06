import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TimelineSection } from "./TimelineSection";

describe("TimelineSection", () => {
  it("renders the section heading anchored at #timeline", () => {
    const { container } = render(<TimelineSection />);

    expect(container.querySelector("section")).toHaveAttribute("id", "timeline");
    expect(
      screen.getByRole("heading", { name: "Your story comes to life" })
    ).toBeInTheDocument();
  });

  it("renders the four steps in order for both layouts", () => {
    render(<TimelineSection />);

    ["Gather", "Converse", "Weave", "Meet"].forEach((step) => {
      expect(screen.getAllByText(step).length).toBeGreaterThan(0);
    });
    expect(
      screen.getAllByText(/Upload photos, voice notes, videos, and memories/).length
    ).toBeGreaterThan(0);
  });
});

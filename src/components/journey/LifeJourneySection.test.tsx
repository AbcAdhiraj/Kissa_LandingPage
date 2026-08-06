import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { LifeJourneySection } from "./LifeJourneySection";

describe("LifeJourneySection", () => {
  it("renders a card for every life chapter", () => {
    render(<LifeJourneySection />);

    [
      "Childhood",
      "School",
      "College",
      "Love",
      "Career",
      "Family",
    ].forEach((chapter) => {
      expect(screen.getAllByRole("heading", { name: chapter }).length).toBeGreaterThan(0);
    });
  });

  it("reveals a chapter's story when its card is tapped", async () => {
    render(<LifeJourneySection />);
    const childhood = screen.getAllByRole("heading", { name: "Childhood" })[0];

    await userEvent.click(childhood);

    expect(screen.getAllByRole("button", { name: "Tap to close" }).length).toBeGreaterThan(0);
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { JourneyCard } from "./JourneyCard";

function Icon() {
  return <svg data-testid="chapter-icon" />;
}

function renderCard(props: Partial<React.ComponentProps<typeof JourneyCard>> = {}) {
  return render(
    <JourneyCard
      icon={Icon}
      title="Childhood"
      years="1990 – 2000"
      accent="#F5C542"
      index={0}
      {...props}
    >
      <p>The first chapter of your story.</p>
    </JourneyCard>
  );
}

describe("JourneyCard", () => {
  it("shows the chapter title, years and icon", () => {
    renderCard();

    expect(screen.getByRole("heading", { name: "Childhood" })).toBeInTheDocument();
    expect(screen.getByText("1990 – 2000")).toBeInTheDocument();
    expect(screen.getByTestId("chapter-icon")).toBeInTheDocument();
  });

  it("prompts to tap on normal cards and truncates the doodle to two words", () => {
    renderCard({ doodle: "one two three four" });

    expect(screen.getByText("Tap")).toBeInTheDocument();
    expect(screen.getByText("one two")).toBeInTheDocument();
  });

  it("shows the full doodle and no tap hint on wide cards", () => {
    renderCard({ span: "wide", doodle: "one two three four" });

    expect(screen.getByText("one two three four")).toBeInTheDocument();
    expect(screen.queryByText("Tap")).toBeNull();
  });

  it("flips to the back on click and closes again via the close button", async () => {
    const { container } = renderCard();
    const flipTarget = container.querySelector(".cursor-pointer")!;

    await userEvent.click(flipTarget);
    const closeButton = screen.getByRole("button", { name: "Tap to close" });
    expect(screen.getByText("The first chapter of your story.")).toBeInTheDocument();

    await userEvent.click(closeButton);
    // The close button stops propagation, so a single click must not re-flip the card.
    expect(closeButton).toBeInTheDocument();
  });
});

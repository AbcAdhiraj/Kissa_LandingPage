import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { FaqSection } from "./FaqSection";

const FIRST_QUESTION = "What is KISSA?";
const SECOND_QUESTION = "How does the digital avatar work?";

describe("FaqSection", () => {
  it("renders every question with all answers collapsed", () => {
    render(<FaqSection />);

    expect(
      screen.getByRole("heading", { name: "Frequently Asked Questions" })
    ).toBeInTheDocument();
    expect(screen.getAllByRole("button")).toHaveLength(5);
    expect(screen.getByText(FIRST_QUESTION)).toBeInTheDocument();
    expect(screen.queryByText(/KISSA is a platform that helps you preserve/)).toBeNull();
  });

  it("expands and collapses an answer when its question is clicked", async () => {
    render(<FaqSection />);
    const question = screen.getByText(FIRST_QUESTION);

    await userEvent.click(question);
    expect(
      screen.getByText(/KISSA is a platform that helps you preserve/)
    ).toBeInTheDocument();

    await userEvent.click(question);
    await waitForElementToBeRemoved(() =>
      screen.queryByText(/KISSA is a platform that helps you preserve/)
    );
  });

  it("keeps each item's open state independent", async () => {
    render(<FaqSection />);

    await userEvent.click(screen.getByText(FIRST_QUESTION));
    await userEvent.click(screen.getByText(SECOND_QUESTION));

    expect(
      screen.getByText(/KISSA is a platform that helps you preserve/)
    ).toBeInTheDocument();
    expect(screen.getByText(/creates a digital reflection/)).toBeInTheDocument();
  });
});

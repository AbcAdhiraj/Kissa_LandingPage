import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { RoadmapSection } from "./RoadmapSection";

describe("RoadmapSection", () => {
  it("renders the three MVP cards with their pricing", () => {
    render(<RoadmapSection />);

    expect(screen.getByRole("heading", { name: "The Road Ahead" })).toBeInTheDocument();
    ["Kahani", "Kathan", "Kirdaar"].forEach((title) => {
      expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();
    });
    ["$5–$10/month", "$10–$20/month", "$19–$29/month"].forEach((price) => {
      expect(screen.getByRole("heading", { name: price })).toBeInTheDocument();
    });
  });

  it("marks only the first MVP as in progress", () => {
    render(<RoadmapSection />);

    expect(screen.getAllByText("In Progress")).toHaveLength(1);
  });

  it("notes the free tier only for the chat and voice MVPs", () => {
    render(<RoadmapSection />);

    expect(screen.getAllByText("Free tier available with limited usage")).toHaveLength(2);
  });

  it("flips a card between its description and pricing side", async () => {
    const { container } = render(<RoadmapSection />);
    const card = container.querySelectorAll(".cursor-pointer")[0];
    const flipWrapper = card.querySelector<HTMLElement>("[style*='rotateY']")!;

    expect(flipWrapper.style.transform).toBe("rotateY(0deg)");

    await userEvent.click(screen.getByRole("heading", { name: "Kahani" }));
    expect(flipWrapper.style.transform).toBe("rotateY(180deg)");

    await userEvent.click(screen.getByRole("heading", { name: "Kahani" }));
    expect(flipWrapper.style.transform).toBe("rotateY(0deg)");
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { HeroSection } from "./HeroSection";

function addSection(id: string) {
  const section = document.createElement("div");
  section.id = id;
  section.scrollIntoView = vi.fn();
  document.body.appendChild(section);
  return section;
}

afterEach(() => {
  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

describe("HeroSection", () => {
  it("renders the headline and both calls to action", () => {
    render(<HeroSection />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Everybody has a"
    );
    expect(screen.getByRole("button", { name: /Get Early Access/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "See Our Vision" })).toBeInTheDocument();
  });

  it("scrolls to the early access section from the primary CTA", async () => {
    const section = addSection("early-access");
    render(<HeroSection />);

    await userEvent.click(screen.getByRole("button", { name: /Get Early Access/ }));

    expect(section.scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth" });
  });

  it("scrolls to the timeline section from the secondary CTA", async () => {
    const section = addSection("timeline");
    render(<HeroSection />);

    await userEvent.click(screen.getByRole("button", { name: "See Our Vision" }));

    expect(section.scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth" });
  });

  it("does not throw when the target section is missing", async () => {
    render(<HeroSection />);

    await expect(
      userEvent.click(screen.getByRole("button", { name: "See Our Vision" }))
    ).resolves.not.toThrow();
  });
});

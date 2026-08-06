import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Logo } from "./Logo";

describe("Logo", () => {
  it("renders the brand image with alt text", () => {
    render(<Logo />);

    const image = screen.getByAltText("Kissa");
    expect(image).toBeInTheDocument();
    expect(image.getAttribute("src")).toContain("hdlogo.png");
  });

  it("merges a custom class name into the wrapper", () => {
    const { container } = render(<Logo className="justify-center" />);

    expect(container.firstElementChild).toHaveClass("flex", "items-center", "justify-center");
  });
});

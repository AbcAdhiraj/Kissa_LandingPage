import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SquishyButton } from "./SquishyButton";

describe("SquishyButton", () => {
  it("renders children in a button of type button by default", () => {
    render(<SquishyButton>Plant It</SquishyButton>);

    const button = screen.getByRole("button", { name: "Plant It" });
    expect(button).toHaveAttribute("type", "button");
    expect(button).toBeEnabled();
  });

  it("applies primary styling by default and secondary on request", () => {
    const { rerender } = render(<SquishyButton>Join</SquishyButton>);
    expect(screen.getByRole("button")).toHaveClass("bg-[#1F4D3A]");

    rerender(<SquishyButton variant="secondary">Join</SquishyButton>);
    const button = screen.getByRole("button");
    expect(button).not.toHaveClass("bg-[#1F4D3A]");
    expect(button).toHaveClass("border-2");
  });

  it("appends custom class names", () => {
    render(<SquishyButton className="w-full">Join</SquishyButton>);
    expect(screen.getByRole("button")).toHaveClass("w-full");
  });

  it("supports submit buttons", () => {
    render(<SquishyButton type="submit">Send</SquishyButton>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });

  it("calls onClick when clicked", async () => {
    const onClick = vi.fn();
    render(<SquishyButton onClick={onClick}>Join</SquishyButton>);

    await userEvent.click(screen.getByRole("button"));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick while disabled", async () => {
    const onClick = vi.fn();
    render(
      <SquishyButton onClick={onClick} disabled>
        Join
      </SquishyButton>
    );

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    await userEvent.click(button);

    expect(onClick).not.toHaveBeenCalled();
  });
});

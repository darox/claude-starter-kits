import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "../app/page";

describe("Home", () => {
  it("renders the heading", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { level: 1, name: /starter app/i }),
    ).toBeInTheDocument();
  });

  it("renders the get started text", () => {
    render(<Home />);
    expect(screen.getByText(/edit/i)).toBeInTheDocument();
    expect(screen.getByText(/app\/page\.tsx/i)).toBeInTheDocument();
  });

  it("renders the greeting form", () => {
    render(<Home />);
    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /greet/i })).toBeInTheDocument();
  });
});

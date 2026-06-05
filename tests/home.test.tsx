import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home", () => {
  it("renders the primary booking CTA and launch sections", () => {
    render(<Home />);

    expect(screen.getAllByRole("button", { name: /book a service/i }).length).toBeGreaterThanOrEqual(1);
    const heroHeading = screen.getByRole("heading", { level: 1 });
    expect(heroHeading).toHaveTextContent("A Clean Space.");
    expect(heroHeading).toHaveTextContent("A Better Place.");
    expect(screen.getByRole("heading", { name: /complete cleaning solutions/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /excellence you can trust/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /before & after/i })).toBeInTheDocument();
  });
});

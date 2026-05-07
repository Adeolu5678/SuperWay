import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home", () => {
  it("renders the primary booking CTA", () => {
    render(<Home />);

    expect(screen.getAllByRole("button", { name: /book a service/i })).toHaveLength(2);
    const heroHeading = screen.getByRole("heading", { level: 1 });
    expect(heroHeading).toHaveTextContent("A Clean Space.");
    expect(heroHeading).toHaveTextContent("A Better Place.");
  });
});

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import App from "../App";

describe("Table Headers", () => {
  it("should render all table headers correctly", () => {
    render(<App />);

    // Check for each header
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Mobile")).toBeInTheDocument();
    expect(screen.getByText("Country")).toBeInTheDocument();
    expect(screen.getByText("Address")).toBeInTheDocument();
    expect(screen.getByText("Gender")).toBeInTheDocument();
  });
});

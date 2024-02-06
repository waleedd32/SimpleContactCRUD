import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import axios from "axios";

import App from "../App";

vi.mock("axios");

const mockData = {
  data: {
    success: true,
    data: [
      {
        name: "John Doe",
        email: "john@example.com",
        mobile: "1234567890",
        country: "USA",
        address: "123 Main St",
        gender: "male",
      },
    ],
  },
};

const mockedAxios = axios as any;

beforeEach(() => {
  mockedAxios.get.mockResolvedValue(mockData);
});

describe("App Component", () => {
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

  it("fetches data on mount and displays it", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("john@example.com")).toBeInTheDocument();
    });
  });
});

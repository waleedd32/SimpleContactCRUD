import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import axios from "axios";

import App from "../App";

// Mocking axios in order to simulate API requests
vi.mock("axios");
const mockedAxios = axios as any;

describe("App Component Tests", () => {
  beforeEach(() => {
    // Set up the default mock response for axios.get to return the initial data for each test
    mockedAxios.get.mockResolvedValue({
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
    });
  });

  // Testing to check if all table headers are rendered correctly
  it("should render all table headers correctly", async () => {
    render(<App />);
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Mobile")).toBeInTheDocument();
    expect(screen.getByText("Country")).toBeInTheDocument();
    expect(screen.getByText("Address")).toBeInTheDocument();
    expect(screen.getByText("Gender")).toBeInTheDocument();
  });

  it("fetches data on mount and displays it", async () => {
    render(<App />);
    // Testing to check that initial data is fetched and displayed
    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("john@example.com")).toBeInTheDocument();
      expect(screen.getByText("1234567890")).toBeInTheDocument();
      expect(screen.getByText("USA")).toBeInTheDocument();
      expect(screen.getByText("123 Main St")).toBeInTheDocument();
      expect(screen.getByText("male")).toBeInTheDocument();
    });
  });

  // Testing to check if adding a new entry works correctly
  it("allows adding a new entry and displays it", async () => {
    // Override mocks specifically for this test
    mockedAxios.post.mockResolvedValueOnce({
      data: { success: true, message: "Data added successfully" },
    });

    // Mocking axios.get to resolve with updated data after adding new entry
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        success: true,
        data: [
          {
            _id: "newId",
            name: "Jane Doe",
            email: "jane@example.com",
            mobile: "0987654321",
            country: "USA",
            address: "456 Elm St",
            gender: "female",
          },
        ],
      },
    });

    render(<App />);

    // Simulating user actions to add a new entry
    fireEvent.click(screen.getByText("Add"));
    fireEvent.change(screen.getByTestId("name-input"), {
      target: { value: "Jane Doe" },
    });
    fireEvent.change(screen.getByTestId("email-input"), {
      target: { value: "jane@example.com" },
    });
    fireEvent.change(screen.getByTestId("mobile-input"), {
      target: { value: "0987654321" },
    });
    fireEvent.change(screen.getByTestId("country-input"), {
      target: { value: "USA" },
    });
    fireEvent.change(screen.getByTestId("address-input"), {
      target: { value: "456 Elm St" },
    });
    fireEvent.change(screen.getByTestId("gender-select"), {
      target: { value: "female" },
    });
    fireEvent.click(screen.getByTestId("submit-button"));

    // Wait for the UI to update and verify the new entry is displayed
    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith("/create", {
        name: "Jane Doe",
        email: "jane@example.com",
        mobile: "0987654321",
        country: "USA",
        address: "456 Elm St",
        gender: "female",
      });

      // here expecting the newly added entry to be displayed
      expect(screen.getByText("Jane Doe")).toBeInTheDocument();
      expect(screen.getByText("jane@example.com")).toBeInTheDocument();
      expect(screen.getByText("0987654321")).toBeInTheDocument();
      expect(screen.getByText("USA")).toBeInTheDocument();
      expect(screen.getByText("456 Elm St")).toBeInTheDocument();
      expect(screen.getByText("female")).toBeInTheDocument();
    });
  });
});

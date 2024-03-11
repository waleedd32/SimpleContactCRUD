import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import axios from "axios";

import App from "../App";

// Mocking axios in order to simulate API requests
vi.mock("axios");
const mockedAxios = axios as any;

describe("App Component Tests", () => {
  afterEach(() => {
    // Clearing all mock setups and histories between tests to ensure isolation and consistent mock behavior.
    vi.resetAllMocks();

    // these if we need to reset specific mock implementations or return values, we can do so like this:
    // mockedAxios.get.mockReset();
    // mockedAxios.post.mockReset();
  });
  // Testing to check if all table headers are rendered correctly
  it("should render all table headers correctly", async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        success: true,
        data: [
          {
            _id: "1",
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
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("Name")).toBeInTheDocument();
      expect(screen.getByText("Email")).toBeInTheDocument();
      expect(screen.getByText("Mobile")).toBeInTheDocument();
      expect(screen.getByText("Country")).toBeInTheDocument();
      expect(screen.getByText("Address")).toBeInTheDocument();
      expect(screen.getByText("Gender")).toBeInTheDocument();
    });
  });

  it("fetches data on mount and displays it", async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        success: true,
        data: [
          {
            _id: "1",
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

  it("toggles the visibility of the Add section when the Add button is clicked", async () => {
    render(<App />);
    const addButton = screen.getByText("Add");

    // in the beginning, the form should not be visible
    let form = screen.queryByTestId("form-table");
    expect(form).not.toBeInTheDocument();

    // After the 'Add' button is clicked, form should be visible
    fireEvent.click(addButton);

    // here using waitFor to wait for the form to become visible
    await waitFor(() => {
      form = screen.queryByTestId("form-table");
      expect(form).toBeInTheDocument();
    });

    //  simulating closing the form to hide it again
    const closeButton = screen.getByTestId("close-button");
    fireEvent.click(closeButton);

    //  using waitFor to wait for the form to be removed from the document
    await waitFor(() => {
      form = screen.queryByTestId("form-table");
      expect(form).not.toBeInTheDocument();
    });
  });

  it("displays a validation error message when trying to submit an incomplete form", async () => {
    render(<App />);
    const addButton = screen.getByText("Add");

    // Open the form
    fireEvent.click(addButton);

    // Attempt to submit the form without filling out any fields
    const submitButton = screen.getByTestId("submit-button");
    fireEvent.click(submitButton);

    // here checking for the presence of a validation error message
    const errorMessage = await screen.findByText(/Please fill in all fields/i);

    expect(errorMessage).toBeInTheDocument();
  });

  it("displays an error message when fetching data fails", async () => {
    // Mocking axios.get to reject with an error
    mockedAxios.get.mockRejectedValueOnce(new Error("Error fetching data"));

    render(<App />);

    // Waiting for the component to update based on the rejected promise
    await waitFor(() => {
      expect(screen.getByText("Error fetching data")).toBeInTheDocument();
    });
  });

  it("allows editing an existing entry and displays the updated data", async () => {
    // Initial mock data for the GET request
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        success: true,
        data: [
          {
            _id: "2",
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

    // Mocking the PUT request response
    mockedAxios.put.mockResolvedValueOnce({
      data: { success: true, message: "Data updated successfully" },
    });

    // Mocking the GET request to return updated data after the edit
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        success: true,
        data: [
          {
            _id: "2",
            name: "John Updated",
            email: "johnupdated@example.com",

            mobile: "0987654321",
            country: "Canada",
            address: "456 Elm St",
            gender: "male",
          },
        ],
      },
    });

    render(<App />);

    // Waiting for the initial data to load
    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("john@example.com")).toBeInTheDocument();
      expect(screen.getByText("1234567890")).toBeInTheDocument();
      expect(screen.getByText("USA")).toBeInTheDocument();
      expect(screen.getByText("123 Main St")).toBeInTheDocument();
      expect(screen.getByText("male")).toBeInTheDocument();
    });
    // Simulate clicking the edit button
    fireEvent.click(screen.getByTestId("edit-button"));

    // Simulate editing the form fields
    fireEvent.change(screen.getByTestId("name-input"), {
      target: { value: "John Updated" },
    });
    fireEvent.change(screen.getByTestId("email-input"), {
      target: { value: "johnupdated@example.com" },
    });
    fireEvent.change(screen.getByTestId("mobile-input"), {
      target: { value: "0987654321" },
    });
    fireEvent.change(screen.getByTestId("country-input"), {
      target: { value: "Canada" },
    });
    fireEvent.change(screen.getByTestId("address-input"), {
      target: { value: "456 Elm St" },
    });
    fireEvent.change(screen.getByTestId("gender-select"), {
      target: { value: "male" },
    });

    // Simulating form submission
    fireEvent.click(screen.getByTestId("submit-button"));

    // Wait for the PUT request to be made and for the component to re-render with updated data
    await waitFor(() => expect(mockedAxios.put).toHaveBeenCalled());

    expect(mockedAxios.put).toHaveBeenCalledWith(
      "/update", // Our URL or endpoint
      {
        // This is the payload we expect to be sent in the update.
        _id: "2",
        name: "John Updated",
        email: "johnupdated@example.com",
        mobile: "0987654321",
        country: "Canada",
        address: "456 Elm St",
        gender: "male",
      }
    );
    // Checking that the updated data is displayed
    expect(screen.getByText("John Updated")).toBeInTheDocument();
    expect(screen.getByText("johnupdated@example.com")).toBeInTheDocument();
    expect(screen.getByText("0987654321")).toBeInTheDocument();
    expect(screen.getByText("Canada")).toBeInTheDocument();
    expect(screen.getByText("456 Elm St")).toBeInTheDocument();
    expect(screen.getByText("male")).toBeInTheDocument();
  });

  it("allows deleting an entry and updates the displayed list", async () => {
    // Initial mock data for the GET request
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        success: true,
        data: [
          {
            _id: "1",
            name: "John Doe",
            email: "john@example.com",
            mobile: "1234567890",
            country: "USA",
            address: "123 Main St",
            gender: "male",
          },
          // Here we add another entry to ensure we can test the deletion effect
          {
            _id: "2",
            name: "Jane Doe",
            email: "jane@example.com",
            mobile: "0987654321",
            country: "Canada",
            address: "456 Maple St",
            gender: "female",
          },
        ],
      },
    });

    // Mocking the DELETE request response
    mockedAxios.delete.mockResolvedValueOnce({
      data: { success: true, message: "Data deleted successfully" },
    });

    // Mocking the GET request to return updated data after deleting the entry
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        success: true,
        data: [
          // Here we are returning only one entry after deletion to simulate the entry being successfully deleted
          {
            _id: "2",
            name: "Jane Doe",
            email: "jane@example.com",
            mobile: "0987654321",
            country: "Canada",
            address: "456 Maple St",
            gender: "female",
          },
        ],
      },
    });

    render(<App />);

    // Waiting for the initial data to load
    await waitFor(() => screen.getByText("John Doe"));

    // Finding and clicking the delete button for the first entry
    const deleteButtons = screen.getAllByTestId("delete-button");
    fireEvent.click(deleteButtons[0]); //  John Doe

    // Waiting for the DELETE request to be made for id 1
    await waitFor(() =>
      expect(mockedAxios.delete).toHaveBeenCalledWith("/delete/1")
    );

    // Here we verify that list is updated and the deleted entry is no longer displayed
    await waitFor(() => {
      expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
      expect(screen.getByText("Jane Doe")).toBeInTheDocument(); // The other entry should still be present
    });
  });

  it("should display an error message when an attempt to delete an entry fails due to a network error", async () => {
    // Mocking the axios.get call to return some initial data
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        success: true,
        data: [
          {
            _id: "1",
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

    // Mocking the axios.delete call to reject with an error
    mockedAxios.delete.mockRejectedValueOnce(
      new Error("Error deleting data. Please try again.")
    );

    render(<App />);

    // Waiting for the initial data to load
    await waitFor(() => screen.getByText("John Doe"));

    fireEvent.click(screen.getByTestId("delete-button"));

    // Waiting for the error message to be displayed
    await waitFor(() => {
      expect(
        screen.getByText("Error deleting data. Please try again.")
      ).toBeInTheDocument();
    });
  });
});

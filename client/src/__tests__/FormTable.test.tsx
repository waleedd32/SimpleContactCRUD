import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import FormTable from "../components/FormTable";

// Mocking the props to pass into FormTable
const mockHandleSubmit = vi.fn();
const mockHandleInputChange = vi.fn();
const mockHandleClose = vi.fn();

const initialFormData = {
  name: "",
  email: "",
  mobile: "",
  country: "",
  address: "",
  gender: "",
};

describe("FormTable Component", () => {
  it("renders correctly and allows input", () => {
    render(
      <FormTable
        handleSubmit={mockHandleSubmit}
        handleInputChange={mockHandleInputChange}
        handleClose={mockHandleClose}
        formData={initialFormData}
        formError=""
      />
    );

    // Checking if all form fields are rendered
    expect(screen.getByTestId("name-input")).toBeInTheDocument();
    expect(screen.getByTestId("email-input")).toBeInTheDocument();
    expect(screen.getByTestId("mobile-input")).toBeInTheDocument();
    expect(screen.getByTestId("country-input")).toBeInTheDocument();
    expect(screen.getByTestId("address-input")).toBeInTheDocument();
    expect(screen.getByTestId("gender-select")).toBeInTheDocument();

    // Simulating that user types into the name input
    const nameInput = screen.getByTestId("name-input");
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    expect(mockHandleInputChange).toHaveBeenCalled();

    // Checking if the submit button is rendered and clickable
    const submitButton = screen.getByTestId("submit-button");
    expect(submitButton).toBeInTheDocument();
    fireEvent.click(submitButton);
    expect(mockHandleSubmit).toHaveBeenCalled();
  });

  it("displays the form error message when formError is not empty", () => {
    const formError = "Please fill in all fields.";
    render(
      <FormTable
        handleSubmit={() => {}}
        handleInputChange={() => {}}
        handleClose={() => {}}
        formData={{
          name: "",
          email: "",
          mobile: "",
          country: "",
          address: "",
          gender: "",
        }}
        formError={formError}
      />
    );

    // Verifying that the form error message is displayed
    const errorMessageElement = screen.getByText(formError);
    expect(errorMessageElement).toBeInTheDocument();
    expect(errorMessageElement).toHaveClass("form-error-message"); // here Optionally checking for the correct class
  });
});

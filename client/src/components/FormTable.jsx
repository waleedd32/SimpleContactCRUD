import React from "react";
import "../App.css";
import { MdClose } from "react-icons/md";

const FormTable = ({
  handleSubmit,
  handleInputChange,
  handleClose,
  formData,
  formError,
}) => {
  return (
    <div className="addContainer">
      <form onSubmit={handleSubmit}>
        <div className="close-btn" onClick={handleClose}>
          <MdClose />
        </div>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleInputChange}
            value={formData.name}
            data-testid="name-input"
          />
        </div>

        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleInputChange}
            value={formData.email}
            data-testid="email-input"
          />
        </div>

        <div>
          <label htmlFor="mobile">Mobile: </label>
          <input
            type="number"
            id="mobile"
            name="mobile"
            onChange={handleInputChange}
            value={formData.mobile}
            data-testid="mobile-input"
          />
        </div>

        <div>
          <label htmlFor="country">Country: </label>
          <input
            type="text"
            id="country"
            name="country"
            onChange={handleInputChange}
            value={formData.country}
            data-testid="country-input"
          />
        </div>

        <div>
          <label htmlFor="address">Address: </label>
          <input
            type="text"
            id="address"
            name="address"
            onChange={handleInputChange}
            value={formData.address}
            data-testid="address-input"
          />
        </div>

        <div>
          <label htmlFor="gender">Gender: </label>
          <select
            name="gender"
            onChange={handleInputChange}
            value={formData.gender}
            data-testid="gender-select"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {formError && <div className="form-error-message">{formError}</div>}
          <button className="btn" data-testid="submit-button">
            Submit
          </button>{" "}
        </div>
      </form>
    </div>
  );
};

export default FormTable;

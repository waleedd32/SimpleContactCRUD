import React from "react";
import "../App.css";
import { MdClose } from "react-icons/md";

const FormTable = ({
  handleSubmit,
  handleInputChange,
  handleClose,
  formData,
}) => {
  return (
    <div className="addContainer">
      <form onSubmit={handleSubmit}>
        <div className="close-btn" onClick={handleClose}>
          <MdClose />
        </div>
        <div>
          <label htmlFor="name">Name : </label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleInputChange}
            value={formData.name}
          />

          <label htmlFor="email">Email : </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleInputChange}
            value={formData.email}
          />

          <label htmlFor="mobile">Mobile : </label>
          <input
            type="number"
            id="mobile"
            name="mobile"
            onChange={handleInputChange}
            value={formData.mobile}
          />

          <button className="btn">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default FormTable;

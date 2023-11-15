import React from "react";
import "../App.css";
import { MdClose } from "react-icons/md";

const FormTable = ({ handleClose }) => {
  return (
    <div className="addContainer">
      <form>
        <div className="close-btn" onClick={handleClose}>
          <MdClose />
        </div>
        <div>
          <label htmlFor="name">Name : </label>
          <input type="text" id="name" name="name" />

          <label htmlFor="email">Email : </label>
          <input type="email" id="email" name="email" />

          <label htmlFor="mobile">Mobile : </label>
          <input type="number" id="mobile" name="mobile" />

          <button className="btn">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default FormTable;

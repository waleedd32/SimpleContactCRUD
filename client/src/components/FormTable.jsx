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
        <h1>Form Table </h1>
      </form>
    </div>
  );
};

export default FormTable;

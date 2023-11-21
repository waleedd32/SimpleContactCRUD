import { useState } from "react";

import "./App.css";
import FormTable from "./components/FormTable";

function App() {
  const [isAddSectionVisible, setIsAddSectionVisible] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  console.log("formdata", formData);
  return (
    <div className="container">
      <button onClick={() => setIsAddSectionVisible(true)}>Add</button>

      {isAddSectionVisible && (
        <FormTable
          handleInputChange={handleInputChange}
          handleClose={() => setIsAddSectionVisible(false)}
          formData={formData}
        />
      )}
      <div className="tableContainer">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th></th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";
import FormTable from "./components/FormTable";

function App() {
  const [isAddSectionVisible, setIsAddSectionVisible] = useState(false);
  const [isEditSectionVisible, setIsEditSectionVisible] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const [formDataEdit, setFormDataEdit] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const [dataList, setDataList] = useState([]);

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  console.log("datalist:", dataList);

  const fetchData = async () => {
    const data = await axios.get("http://localhost:8080");
    console.log(data);
    if (data.data.success) {
      setDataList(data.data.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/create",
        formData
      );
      if (response.data.success) {
        setIsAddSectionVisible(false);

        fetchData();
        setFormData({
          name: "",
          email: "",
          mobile: "",
        });
      }
    } catch (error) {
      console.error("Error submitting data", error);
    }
  };

  const handleDelete = async (email) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/delete/${email}`
      );
      if (response.data.success) {
        fetchData();
      }
    } catch (error) {
      console.error("Error deleting data", error);
    }
  };

  const handleEdit = (el) => {
    setFormDataEdit(el);
    setIsEditSectionVisible(true);
  };

  console.log("formdata", formData);

  return (
    <div className="container">
      <button onClick={() => setIsAddSectionVisible(true)}>Add</button>

      {isAddSectionVisible && (
        <FormTable
          handleSubmit={handleSubmit}
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
          <tbody>
            {dataList.length > 0 ? (
              dataList.map((el) => {
                console.log(el);
                return (
                  <tr key={el.name + el.email}>
                    <td>{el.name}</td>
                    <td>{el.email}</td>
                    <td>{el.mobile}</td>
                    <td>
                      <button
                        className="btn btn-edit"
                        onClick={() => handleEdit(el)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-delete"
                        onClick={() => handleDelete(el.email)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;

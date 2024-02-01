import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axios from "axios";

import "./App.css";
import FormTable from "./components/FormTable";

interface FormData {
  name: string;
  email: string;
  mobile: string;
  country: string;
  address: string;
  gender: string;
}

interface DataListEntry {
  name: string;
  email: string;
  mobile: string;
  country: string;
  address: string;
  gender: string;
}

const App: React.FC = () => {
  const [isAddSectionVisible, setIsAddSectionVisible] = useState(false);
  const [isEditSectionVisible, setIsEditSectionVisible] = useState(false);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    mobile: "",
    country: "",
    address: "",
    gender: "",
  });

  const [formDataEdit, setFormDataEdit] = useState({
    name: "",
    email: "",
    mobile: "",
    country: "",
    address: "",
    gender: "",
  });

  const [dataList, setDataList] = useState<DataListEntry[]>([]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
    try {
      const response = await axios.get("http://localhost:8080");
      if (response.data.success) {
        setDataList(response.data.data);
        setError("");
      } else {
        setError("Failed to fetch data");
      }
    } catch (error) {
      console.log("error:", (error as Error).message);
      setError((error as Error).message || "Error fetching data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const validateForm = () => {
    const { name, email, mobile, country, address, gender } = formData;
    // Check if any of the fields are empty
    return name && email && mobile && country && address && gender;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate the form
    if (!validateForm()) {
      // Update state to show an error message
      setFormError("Please fill in all fields.");
      return;
    }

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
          country: "",
          address: "",
          gender: "",
        });
        setFormError("");
      } else {
        setFormError("Failed to create entry. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting data", error);
      setFormError("Error submitting data");
    }
  };

  const handleDelete = async (email: string) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/delete/${email}`
      );
      if (response.data.success) {
        fetchData();
      } else {
        setError("Failed to delete the entry. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting data", error);
      setError("Error deleting data. Please try again.");
    }
  };

  const validateFormEdit = () => {
    const { name, email, mobile, country, address, gender } = formDataEdit;
    return name && email && mobile && country && address && gender;
  };

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate the form
    if (!validateFormEdit()) {
      // Update state to show an error message
      setFormError("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8080/update`,
        formDataEdit
      );
      if (response.data.success) {
        fetchData();
        setFormDataEdit({
          name: "",
          email: "",
          mobile: "",
          country: "",
          address: "",
          gender: "",
        });
        alert(response.data.message);
        setFormError("");
        setIsEditSectionVisible(false);
      } else {
        setFormError("Failed to update entry. Please try again.");
      }
    } catch (error) {
      console.error("Error updating data", error);
      setFormError("Error updating data. Please try again.");
    }
  };

  const handleEditInputChange = async (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value, name } = e.target;
    setFormDataEdit((prevDataEdit) => {
      return {
        ...prevDataEdit,
        [name]: value,
      };
    });
  };
  const handleEdit = (el: DataListEntry) => {
    setFormDataEdit(el);
    setIsEditSectionVisible(true);
  };

  console.log("formdata", formData);

  return (
    <div className="container">
      {error && <div className="error-message">{error}</div>}
      <button onClick={() => setIsAddSectionVisible(true)} className="btn-add ">
        Add
      </button>

      {isAddSectionVisible && (
        <FormTable
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          handleClose={() => setIsAddSectionVisible(false)}
          formData={formData}
          formError={formError}
        />
      )}

      {isEditSectionVisible && (
        <FormTable
          handleSubmit={handleUpdate}
          handleInputChange={handleEditInputChange}
          handleClose={() => setIsEditSectionVisible(false)}
          formData={formDataEdit}
          formError={formError}
        />
      )}

      <div className="tableContainer">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Country</th>
              <th>Address</th>
              <th>Gender</th>
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
                    <td>{el.country}</td>
                    <td>{el.address}</td>
                    <td>{el.gender}</td>
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
                <td colSpan={7} style={{ textAlign: "center" }}>
                  No data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;

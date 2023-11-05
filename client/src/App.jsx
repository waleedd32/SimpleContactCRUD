import { useState } from "react";

import "./App.css";
import FormTable from "./components/FormTable";

function App() {
  const [isAddSectionVisible, setIsAddSectionVisible] = useState(false);

  return (
    <div className="container">
      <button onClick={() => setIsAddSectionVisible(true)}>Add</button>

      {isAddSectionVisible && (
        <FormTable handleClose={() => setIsAddSectionVisible(false)} />
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

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080;

const dataStore = [];

app.get("/", async (req, res) => {
  res.json({ success: true, data: dataStore });
});

app.put("/update", async (req, res) => {
  const { name, email, mobile, country, address, gender } = req.body;
  const index = dataStore.findIndex((item) => item.email === email);
  if (index !== -1) {
    dataStore[index] = { name, email, mobile, country, address, gender };
    res.json({ success: true, message: "Data updated successfully" });
  } else {
    res.status(404).json({ success: false, message: "Data not found" });
  }
});

app.delete("/delete/:email", async (req, res) => {
  const { email } = req.params;
  const index = dataStore.findIndex((item) => item.email === email);
  if (index !== -1) {
    dataStore.splice(index, 1);
    res.json({ success: true, message: "Data deleted successfully" });
  } else {
    res.status(404).json({ success: false, message: "Data not found" });
  }
});

app.post("/create", async (req, res) => {
  dataStore.push(req.body);
  console.log("successfully sent to server", req.body);
  res.json({ success: true, message: "Data added successfully" });
});

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("connect to DB");
    app.listen(PORT, () => console.log("Server is runningon port:", PORT));
  })
  .catch((err) => console.log(err));

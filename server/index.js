import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080;

const dataStore = [];

app.get("/", async (req, res) => {
  res.json({ success: true, data: dataStore });
});

app.post("/create", async (req, res) => {
  dataStore.push(req.body);
  console.log("successfully sent to server", req.body);
  res.json({ success: true, message: "Data added successfully" });
});

app.listen(PORT, () => console.log("Server is runningon port:", PORT));

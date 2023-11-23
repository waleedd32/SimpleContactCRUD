import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080;

app.get("/", async (req, res) => {
  res.json({ message: "Server is running crud" });
});

app.post("/create", async (req, res) => {
  console.log("successfully sent to server", req.body);
});

app.listen(PORT, () => console.log("Server is runningon port:", PORT));

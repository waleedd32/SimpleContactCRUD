import express from "express";

const app = express();

const PORT = process.env.PORT || 8080;

app.get("/", async (req, res) => {
  res.json({ message: "Server is running crud" });
});

app.post("/create", async (req, res) => {
  console.log("successfully sent to server", req.body);
});

app.listen(PORT, () => console.log("Server is runningon port:", PORT));

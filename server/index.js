import express from "express";

const app = express();

const PORT = process.env.PORT || 8080;

app.get("/", async (req, res) => {
  res.json({ message: "Server is running crud" });
});

app.listen(PORT, () => console.log("Server is runningon port:", PORT));

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [process.env.CORS_ORIGIN],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

const PORT = process.env.PORT || 8080;

// Connecting to MongoDB
mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

//schema for user
const UserSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    mobile: String,
    country: String,
    address: String,
    gender: String,
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);

// Geting all users
app.get("/", async (req, res) => {
  const users = await UserModel.find({});
  res.json({ success: true, data: users });
});

// Creating a new user
app.post("/create", async (req, res) => {
  const user = new UserModel(req.body);
  await user.save();
  res.send({ success: true, message: "Data added successfully", data: user });
});

// Updating a user
app.put("/update", async (req, res) => {
  const { _id, ...updateData } = req.body;
  const updateResult = await UserModel.updateOne({ _id: _id }, updateData);
  if (updateResult.matchedCount > 0) {
    res.json({ success: true, message: "Data updated successfully" });
  } else {
    res.status(404).json({ success: false, message: "Data not found" });
  }
});

// Deleting a user
app.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const result = await UserModel.deleteOne({ _id: id });
  if (result.deletedCount > 0) {
    res.json({ success: true, message: "Data deleted successfully" });
  } else {
    res.status(404).json({ success: false, message: "Data not found" });
  }
});

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));

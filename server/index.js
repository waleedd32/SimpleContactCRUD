import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5174"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080;

//schema
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

const dataStore = [];

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

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("connect to DB");
    app.listen(PORT, () => console.log("Server is runningon port:", PORT));
  })
  .catch((err) => console.log(err));

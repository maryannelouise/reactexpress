import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import multer from "multer";

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/students")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

const { Schema, model } = mongoose;
const userSchema = new Schema({ username: String, email: String, birthdate: String, password: String });
const User = model("User", userSchema);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.post("/adduser", async (req, res) => {
  try {
    const user = new User({ username: req.body.username, email: req.body.email, birthdate: req.body.birthdate, password: req.body.password });
    await user.save();
    res.status(200).json({ message: "User created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/authenticate", async (req, res) => {
  try {
    const { username, password } = req.body;
    const userDetails = await User.findOne({ $or: [{ username }, { email: username }] });
    if (!userDetails) return res.status(404).json({ error: "User not found" });
    if (userDetails.password !== password) return res.status(401).json({ error: "Invalid password" });
    res.status(200).json({ message: "Authenticated", user: userDetails.username });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/form", upload.single("image"), (req, res) => {
  res.json({ message: "Image received", imagePath: req.file.path });
});

app.listen(3001, () => console.log("Server running at http://localhost:3001"));

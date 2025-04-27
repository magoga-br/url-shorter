import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const mongoUri = process.env.MONGO_URI;

await mongoose.connect(mongoUri);

// 1234 ->
const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, unique: true },
});

const Url = mongoose.model("Url", urlSchema);

// shorten API

// ZOD validation
// Error handling middleware
app.post("/api/shorten", async (req, res) => {
  const { originalUrl } = req.body;
  const shortUrl = Math.random().toString(36).substring(2, 8); // Generate a random short URL
  const url = new Url({ originalUrl, shortUrl });
  await url.save();
  res.status(201).json({ originalUrl, shortUrl });
});

// Redirect API to handle redirection of shortened URLs
app.get("/:shortUrl", async (req, res) => {
  const { shortUrl } = req.params;
  const url = await Url.findOne({ shortUrl });
  if (!url) {
    return res.status(404).json({ message: "URL not found" });
  }
  res.redirect(url.originalUrl);
});

app.listen(3000, () => console.log(`Server is running on port 3000`));

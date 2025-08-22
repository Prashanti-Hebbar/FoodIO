import express from 'express';
import mongoose from 'mongoose';
import { useRouter } from './routes/users.js';
import { recipeRouter } from './routes/recipes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import multer from 'multer';
import dotenv from 'dotenv';
import User from './models/Users.js';

dotenv.config();

const app = express(); 
const PORT = 3001;

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads"); // make sure the folder exists
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/auth", useRouter);
app.use("/recipes", recipeRouter);

// DB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection failed:", err));

// Profile upload route
app.post('/profile', upload.single('avatar'), async(req, res) => {
  try {
    const userId = req.body.userId;
    if (!req.file || !userId) {
      return res.status(400).json({ error: "Missing file or user ID" });
    }

    const avatarFilename = req.file.filename;

    // Save avatar to user
    await User.findByIdAndUpdate(userId, {
      avatar: avatarFilename,
    });

    res.status(200).json({
      message: "File uploaded successfully",
      filename: avatarFilename,
      url: `http://localhost:3001/uploads/${avatarFilename}`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 
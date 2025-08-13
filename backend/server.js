import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import { useRouter } from "./routes/users.js";
import { recipeRouter } from "./routes/recipes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS with credentials for cookies
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true, // important for cookies
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/auth", useRouter);
app.use("/recipes", recipeRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });

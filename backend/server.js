import express from 'express';
import mongoose from 'mongoose';
import {useRouter} from './routes/users.js';
import {recipeRouter} from './routes/recipes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express(); 
const PORT = 3001;

import dotenv from 'dotenv';
dotenv.config();
//credential true for cookies
app.use(cors(
  {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })); 
app.use(express.json()); 
app.use(cookieParser());

app.use("/auth", useRouter); 
app.use("/recipes", recipeRouter); 

mongoose.connect(process.env.MONGODB_URI);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

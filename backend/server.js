import express from 'express';
import mongoose from 'mongoose';
import {useRouter} from './routes/users.js';
import {recipeRouter} from './routes/recipes.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
// import dotenv from 'dotenv';
// import User from "./models/Users.js"; 
// import bcrypt from 'bcryptjs';

const app = express(); // Create an Express application
const PORT = process.env.PORT || 3001; // checks for personalised port preference, with default being 3001



app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON data
// app.use(cors()); // Enable CORS for all routes

app.use("/auth", useRouter); // Use the userRouter for routes starting with /auth
app.use("/recipes", recipeRouter); // Use the recipeRouter for routes starting with /recipes

mongoose.connect(process.env.MONGO_URL);

const db = mongoose.connection;


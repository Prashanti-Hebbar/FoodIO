import express from 'express';
import mongoose from 'mongoose';
import {useRouter} from './routes/users.js';
import {recipeRouter} from './routes/recipes.js';
import cors from 'cors';

const app = express(); 
const PORT = 3001;

import dotenv from 'dotenv';
dotenv.config();

app.use(cors()); 
app.use(express.json()); 

app.use("/auth", useRouter); 
app.use("/recipes", recipeRouter); 

mongoose.connect(process.env.MONGO_URI);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

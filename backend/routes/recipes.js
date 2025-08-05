import express from "express";
import mongoose from "mongoose";
import { RecipesModel } from "../models/Recipes.js";
import { UserModel } from "../models/Users.js";
import jwt from "jsonwebtoken";
import axios from "axios";

const router = express.Router();

// Middleware to verify user token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], "secret"); // Use your actual secret key
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

router.get("/", async (req, res) => {
  try {
    const response = await RecipesModel.find({});
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

router.post("/", async (req, res) => {
  const recipe = new RecipesModel(req.body);
  try {
    const response = await recipe.save();
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

// Save a recipe to user's saved recipes
router.put("/save", verifyToken, async (req, res) => {
  try {
    const { recipeId } = req.body;
    const userId = req.userId;
    
    // Check if recipe exists
    const recipe = await RecipesModel.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    
    // Add recipe to user's saved recipes if not already saved
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Check if recipe is already saved
    if (user.savedRecipes.includes(recipeId)) {
      return res.json({ message: "Recipe already saved" });
    }
    
    // Add recipe to saved recipes
    user.savedRecipes.push(recipeId);
    await user.save();
    
    res.json({ message: "Recipe saved successfully", savedRecipes: user.savedRecipes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user's saved recipes
router.get("/savedRecipes", verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const user = await UserModel.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    const savedRecipes = await RecipesModel.find({
      _id: { $in: user.savedRecipes }
    });
    
    res.json(savedRecipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove a recipe from saved recipes
router.delete("/savedRecipes/:recipeId", verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const { recipeId } = req.params;
    
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    user.savedRecipes = user.savedRecipes.filter(id => id.toString() !== recipeId);
    await user.save();
    
    res.json({ message: "Recipe removed from saved recipes", savedRecipes: user.savedRecipes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/api/get-recipe", async (req, res) => {
  const { diet, cuisine, time, ingredients } = req.body;

  const prompt = `Generate a clear, beginner-friendly recipe using:
Diet: ${diet}
Cuisine: ${cuisine}
Max preparation time: ${time} minutes
Available ingredients: ${ingredients}

Please provide:
- Recipe name
- Ingredients with quantities
- Step-by-step preparation instructions.`;

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'moonshotai/kimi-k2:free', 
        messages: [
          { role: 'system', content: 'You are a helpful AI recipe generator.' },
          { role: 'user', content: prompt }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`
        }
      }
    );

    const recipe = response.data.choices[0].message.content;
    res.json({ recipe });
  } catch (error) {
    console.error(error?.response?.data || error.message);
    res.status(500).json({ error: "Failed to generate recipe. Please try again later." });
  }
});

export { router as recipeRouter };

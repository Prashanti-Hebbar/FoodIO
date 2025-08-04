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

  const SPOON_KEY = "YOUR_SPOOnACULAR_API_KEY"; // Replace with your actual Spoonacular API key
  const GEMINI_KEY = "YOUR_GEMINI_API_KEY"; // Replace with your actual Gemini API key

  try {
    // Get base recipe from Spoonacular
    const spoonacularRes = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch`,
      {
        params: {
          apiKey: SPOON_KEY,
          diet: diet === "Any" ? "" : diet,
          cuisine: cuisine === "Any" ? "" : cuisine,
          includeIngredients: ingredients || "",
          maxReadyTime: time || "",
          number: 1,
          addRecipeInformation: true
        }
      }
    );

    let baseRecipeText;

    if (spoonacularRes.data.results.length) {
      const recipeData = spoonacularRes.data.results[0];
      baseRecipeText = `
Recipe Name: ${recipeData.title}
Ingredients: ${recipeData.extendedIngredients?.map(i => i.original).join(", ")}
Instructions: ${recipeData.analyzedInstructions?.[0]?.steps?.map(s => s.step).join(" ")}
`;
    } else {
      // Fallback: let Gemini create from scratch
      baseRecipeText = `
Generate a ${diet} ${cuisine} recipe.
Max preparation time: ${time} minutes.
Ingredients: ${ingredients}.
Include instructions, tips, and nutrition info.
`;
    }

    // Enhance with Gemini
    const geminiRes = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `Format the following recipe into clean Markdown with:
# Recipe Name
## Ingredients
- List all ingredients with quantities
## Instructions
1. Step-by-step instructions
## Cooking Tips
- Helpful tips
## Nutritional Info
- Basic nutritional highlights

Here’s the recipe:
${baseRecipeText}`
              }
            ]
          }
        ]
      },
      { headers: { "Content-Type": "application/json" }, timeout: 10000 }
    );

    const recipe =
      geminiRes.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No recipe generated.";

    res.json({ recipe });
  } catch (error) {
    console.error("Error in get-recipe:", error?.response?.data || error.message);

    if (["ENOTFOUND", "ECONNABORTED", "ECONNREFUSED"].includes(error.code)) {
      return res.status(503).json({
        error: "No internet connection. Please check your network and try again."
      });
    }

    res.status(500).json({
      error: "Failed to generate recipe. Please try again later."
    });
  }
});

export { router as recipeRouter };
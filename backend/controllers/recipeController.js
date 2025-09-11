import User from "../models/Users.js";
import jwt from "jsonwebtoken";
import axios from "axios";
import { RecipesModel } from "../models/Recipes.js";

// Middleware to verify user token
export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token.split(" ")[1], "secret"); // Replace with actual secret
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Get all recipes
export const getAllRecipes = async (req, res) => {
  try {
    const response = await RecipesModel.find({});
    res.json(response);
  } catch (err) {
    res.json(err);
  }
};

// Create a new recipe
export const createRecipe = async (req, res) => {
  const recipe = new RecipesModel(req.body);
  try {
    const response = await recipe.save();
    res.json(response);
  } catch (err) {
    res.json(err);
  }
};

// Save a recipe to user's saved recipes
export const saveRecipe = async (req, res) => {
  try {
    const { recipeId } = req.body;
    const userId = req.userId;

    const recipe = await RecipesModel.findById(recipeId);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.savedRecipes.includes(recipeId)) {
      return res.json({ message: "Recipe already saved" });
    }

    user.savedRecipes.push(recipeId);
    await user.save();

    res.json({ message: "Recipe saved successfully", savedRecipes: user.savedRecipes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get user's saved recipes
export const getSavedRecipes = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const savedRecipes = await RecipesModel.find({ _id: { $in: user.savedRecipes } });
    res.json(savedRecipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Remove a recipe from saved recipes
export const removeSavedRecipe = async (req, res) => {
  try {
    const userId = req.userId;
    const { recipeId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.savedRecipes = user.savedRecipes.filter(id => id.toString() !== recipeId);
    await user.save();

    res.json({ message: "Recipe removed from saved recipes", savedRecipes: user.savedRecipes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Generate a recipe using AI
export const generateRecipe = async (req, res) => {
  const { diet, cuisine, time, ingredients } = req.body;

  const SPOON_KEY = "YOUR_SPOOnACULAR_API_KEY";
  const GEMINI_KEY = "YOUR_GEMINI_API_KEY";

  try {
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
      baseRecipeText = `
Generate a ${diet} ${cuisine} recipe.
Max preparation time: ${time} minutes.
Ingredients: ${ingredients}.
Include instructions, tips, and nutrition info.
`;
    }

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

    const recipe = geminiRes.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No recipe generated.";

    res.json({ recipe });
  } catch (error) {
    console.error("Error in get-recipe:", error?.response?.data || error.message);

    if (["ENOTFOUND", "ECONNABORTED", "ECONNREFUSED"].includes(error.code)) {
      return res.status(503).json({ error: "No internet connection. Please check your network and try again." });
    }

    res.status(500).json({ error: "Failed to generate recipe. Please try again later." });
  }
};

// Delete a recipe from the database
export const deleteRecipe = async (req, res) => {
  try {
    const { recipeId } = req.params;

    const deletedRecipe = await RecipesModel.findByIdAndDelete(recipeId);
    if (!deletedRecipe) return res.status(404).json({ message: "Recipe not found" });

    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete recipe" });
  }
};

export const getRecipeById = async (req, res) => {
  try {
    const { recipeId } = req.params;

    const recipe = await RecipesModel.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(200).json(recipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateRecipe = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const updatedData = req.body;

    const updatedRecipe = await RecipesModel.findByIdAndUpdate(
      recipeId,
      updatedData,
      { new: true, runValidators: true } // new:true => updated doc return karega
    );

    if (!updatedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(200).json({
      message: "Recipe updated successfully",
      recipe: updatedRecipe,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --- Top Rated ---
export const getTopRecipes = async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit, 10) || 5, 20);
    const recipes = await RecipesModel.find()
      .sort({ rating: -1, ratingsCount: -1 })
      .limit(limit)
      .select("title photo description rating ratingsCount");
    res.json(recipes);
  } catch (err) {
    console.error("Error fetching top recipes:", err);
    res.status(500).json({ message: "Failed to fetch top recipes" });
  }
};

// --- Trending ---
export const getTrendingRecipes = async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit, 10) || 5, 20);
    const recipes = await RecipesModel.find()
      .sort({ views: -1 })
      .limit(limit)
      .select("title photo description views");
    res.json(recipes);
  } catch (err) {
    console.error("Error fetching trending recipes:", err);
    res.status(500).json({ message: "Failed to fetch trending recipes" });
  }
};

// --- Newest ---
export const getNewestRecipes = async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit, 10) || 5, 20);
    const recipes = await RecipesModel.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .select("title photo description createdAt");
    res.json(recipes);
  } catch (err) {
    console.error("Error fetching newest recipes:", err);
    res.status(500).json({ message: "Failed to fetch newest recipes" });
  }
};


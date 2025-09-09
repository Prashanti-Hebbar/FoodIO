import express from "express";
import {
  getAllRecipes,
  createRecipe,
  saveRecipe,
  getSavedRecipes,
  removeSavedRecipe,
  generateRecipe,
  deleteRecipe,
  verifyToken,
  getRecipeById,
  updateRecipe,
  getTopRecipes,        // ✅ already added earlier
  getTrendingRecipes,   // 👇 new
  getNewestRecipes,     // 👇 new
} from "../controllers/recipeController.js";

// backend/routes/recipe.js

const router = express.Router();

router.get("/", getAllRecipes);
router.post("/", createRecipe);
router.put("/save", verifyToken, saveRecipe);
router.get("/savedRecipes", verifyToken, getSavedRecipes);
router.delete("/savedRecipes/:recipeId", verifyToken, removeSavedRecipe);
router.post("/api/get-recipe", generateRecipe);
router.get("/top", getTopRecipes);
router.get("/trending", getTrendingRecipes);
router.get("/newest", getNewestRecipes);
router.delete("/:recipeId", deleteRecipe);
router.get("/:recipeId", verifyToken, getRecipeById);
router.put("/:recipeId", verifyToken, updateRecipe);


export { router as recipeRouter };
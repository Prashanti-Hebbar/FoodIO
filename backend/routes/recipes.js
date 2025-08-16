import express from "express";

import {
  getAllRecipes,
  createRecipe,
  saveRecipe,
  getSavedRecipes,
  removeSavedRecipe,
  generateRecipe,
  deleteRecipe,
  verifyToken
} from "../controllers/recipeController.js";

const router = express.Router();

router.get("/", getAllRecipes);
router.post("/", createRecipe);
router.put("/save", verifyToken, saveRecipe);
router.get("/savedRecipes", verifyToken, getSavedRecipes);
router.delete("/savedRecipes/:recipeId", verifyToken, removeSavedRecipe);
router.post("/api/get-recipe", generateRecipe);
router.delete("/:recipeId", deleteRecipe);


export { router as recipeRouter };
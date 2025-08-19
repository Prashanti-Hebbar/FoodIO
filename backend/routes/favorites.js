import express from "express";
import {
  addToFavorites,
  removeFromFavorites,
  getUserFavorites,
  checkIfFavorited
} from "../controllers/favoritesController.js";
import { verifyToken } from "../controllers/recipeController.js";

const router = express.Router();

// All routes require authentication
router.use(verifyToken);

// Add recipe to favorites
router.post("/", addToFavorites);

// Remove recipe from favorites
router.delete("/:recipeId", removeFromFavorites);

// Get user's favorites
router.get("/", getUserFavorites);

// Check if recipe is favorited
router.get("/check/:recipeId", checkIfFavorited);

export { router as favoritesRouter }; 
import { FavoriteModel } from "../models/Favorites.js";
import { RecipesModel } from "../models/Recipes.js";
import mongoose from "mongoose";

// Add recipe to favorites
export const addToFavorites = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { recipeId } = req.body;
    const userId = req.userId;

    // Check if recipe exists
    const recipe = await RecipesModel.findById(recipeId);
    if (!recipe) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Check if already favorited
    const existingFavorite = await FavoriteModel.findOne({ userId, recipeId });
    if (existingFavorite) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: "Recipe already in favorites" });
    }

    // Add to favorites
    const newFavorite = new FavoriteModel({ userId, recipeId });
    await newFavorite.save({ session });

    // Also store in user's favorites array for quick lookup
    await (await (await import('../models/Users.js')).default).findByIdAndUpdate(
      userId,
      { $addToSet: { favorites: recipeId } },
      { session }
    );

    // Update recipe favorites count
    recipe.favoritesCount += 1;
    await recipe.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.json({ message: "Recipe added to favorites", favoritesCount: recipe.favoritesCount });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ error: err.message });
  }
};

// Remove recipe from favorites
export const removeFromFavorites = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { recipeId } = req.params;
    const userId = req.userId;

    // Remove from favorites
    const deletedFavorite = await FavoriteModel.findOneAndDelete({ userId, recipeId });
    if (!deletedFavorite) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Favorite not found" });
    }

    // Update recipe favorites count
    const recipe = await RecipesModel.findById(recipeId);
    if (recipe) {
      recipe.favoritesCount = Math.max(0, recipe.favoritesCount - 1);
      await recipe.save({ session });
    }

    // Remove from user's favorites array
    await (await (await import('../models/Users.js')).default).findByIdAndUpdate(
      userId,
      { $pull: { favorites: recipeId } },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.json({ message: "Recipe removed from favorites", favoritesCount: recipe?.favoritesCount || 0 });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ error: err.message });
  }
};

// Get user's favorites
export const getUserFavorites = async (req, res) => {
  try {
    const userId = req.userId;

    const favorites = await FavoriteModel.find({ userId })
      .populate({
        path: 'recipeId',
        select: 'title photo description prepTime cookTime averageRating totalRatings favoritesCount'
      });

    const favoriteRecipes = favorites.map(fav => fav.recipeId).filter(Boolean);
    res.json(favoriteRecipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Check if recipe is favorited by user
export const checkIfFavorited = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const userId = req.userId;

    const favorite = await FavoriteModel.findOne({ userId, recipeId });
    res.json({ isFavorited: !!favorite });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 
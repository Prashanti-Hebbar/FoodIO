import { RecipesModel } from "../models/Recipes.js";
import User from "../models/Users.js";
import mongoose from "mongoose";

// Add or update rating
export const addRating = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { recipeId } = req.params;
    const { rating } = req.body;
    const userId = req.userId;

    // Validate rating
    if (rating < 1 || rating > 5) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    // Check if recipe exists
    const recipe = await RecipesModel.findById(recipeId);
    if (!recipe) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Check if user already rated
    const existingRatingIndex = recipe.ratings.findIndex(r => r.userId.toString() === userId);
    
    if (existingRatingIndex !== -1) {
      // Update existing rating
      recipe.ratings[existingRatingIndex].rating = rating;
    } else {
      // Add new rating
      recipe.ratings.push({ userId, rating });
    }

    await recipe.save({ session });
    await session.commitTransaction();
    session.endSession();

    res.json({ 
      message: existingRatingIndex !== -1 ? "Rating updated" : "Rating added",
      averageRating: recipe.averageRating,
      totalRatings: recipe.totalRatings
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ error: err.message });
  }
};

// Get user's rating for a recipe
export const getUserRating = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const userId = req.userId;

    const recipe = await RecipesModel.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const userRating = recipe.ratings.find(r => r.userId.toString() === userId);
    res.json({ rating: userRating ? userRating.rating : null });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add comment
export const addComment = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { recipeId } = req.params;
    const { text, rating } = req.body;
    const userId = req.userId;

    if (!text || text.trim().length === 0) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: "Comment text is required" });
    }

    // Get user info
    const user = await User.findById(userId);
    if (!user) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "User not found" });
    }

    // Check if recipe exists
    const recipe = await RecipesModel.findById(recipeId);
    if (!recipe) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Add comment
    const newComment = {
      userId,
      username: user.username,
      text: text.trim(),
      rating: rating && rating >= 1 && rating <= 5 ? rating : undefined,
      createdAt: new Date()
    };

    recipe.comments.push(newComment);
    await recipe.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.json({ 
      message: "Comment added successfully",
      comment: newComment
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ error: err.message });
  }
};

// Get comments for a recipe
export const getComments = async (req, res) => {
  try {
    const { recipeId } = req.params;

    const recipe = await RecipesModel.findById(recipeId)
      .populate('comments.userId', 'username');

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.json(recipe.comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete comment (only by comment author)
export const deleteComment = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { recipeId, commentId } = req.params;
    const userId = req.userId;

    const recipe = await RecipesModel.findById(recipeId);
    if (!recipe) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Recipe not found" });
    }

    const commentIndex = recipe.comments.findIndex(
      c => c._id.toString() === commentId && c.userId.toString() === userId
    );

    if (commentIndex === -1) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Comment not found or unauthorized" });
    }

    recipe.comments.splice(commentIndex, 1);
    await recipe.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.json({ message: "Comment deleted successfully" });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ error: err.message });
  }
}; 

// Edit comment (author only)
export const updateComment = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { recipeId, commentId } = req.params;
    const { text, rating } = req.body;
    const userId = req.userId;

    const recipe = await RecipesModel.findById(recipeId);
    if (!recipe) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Recipe not found" });
    }

    const comment = recipe.comments.id(commentId);
    if (!comment || comment.userId.toString() !== userId) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Comment not found or unauthorized" });
    }

    if (text !== undefined) comment.text = String(text).trim();
    if (rating !== undefined) comment.rating = Math.max(1, Math.min(5, Number(rating)));

    await recipe.save({ session });

    await session.commitTransaction();
    session.endSession();
    res.json({ message: "Comment updated" });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ error: err.message });
  }
};
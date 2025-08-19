import mongoose from "mongoose";

const FavoriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  recipeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "recipes",
    required: true
  }
}, {
  timestamps: true
});

// Ensure a user can only favorite a recipe once
FavoriteSchema.index({ userId: 1, recipeId: 1 }, { unique: true });

export const FavoriteModel = mongoose.model("Favorite", FavoriteSchema); 
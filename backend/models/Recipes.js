import mongoose from "mongoose";
const RecipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  photo: { type: String, required: true },
  description: { type: String, required: true },
  ingredients: { type: [String], required: true },
  instructions: { type: String, required: true },
  prepTime: { type: Number, required: true },
  cookTime: { type: Number, required: true },

  // 👇 add these
  rating: { type: Number, default: 0 },         // average rating
  ratingsCount: { type: Number, default: 0 },   // how many people rated
  views: { type: Number, default: 0 },          // page views (for trending)
}, { timestamps: true });

export const RecipesModel = mongoose.model("recipes", RecipeSchema);

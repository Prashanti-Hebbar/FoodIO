import express from "express";
import {
  addRating,
  getUserRating,
  addComment,
  getComments,
  deleteComment,
  updateComment
} from "../controllers/ratingsController.js";
import { verifyToken } from "../controllers/recipeController.js";

const router = express.Router();

// Rating routes
router.post("/:recipeId", verifyToken, addRating);
router.get("/:recipeId/user", verifyToken, getUserRating);

// Comment routes
router.post("/:recipeId/comments", verifyToken, addComment);
router.get("/:recipeId/comments", getComments);
router.delete("/:recipeId/comments/:commentId", verifyToken, deleteComment);
router.put("/:recipeId/comments/:commentId", verifyToken, updateComment);

export { router as ratingsRouter }; 
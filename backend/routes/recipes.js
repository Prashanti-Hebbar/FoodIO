import express from "express";
import mongoose from "mongoose";
import { RecipesModel } from "../models/Recipes.js";
import { UserModel } from "../models/Users.js";
import axios from "axios";

const router = express.Router();

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

router.put("/", async (req, res) => {
  try {
    const recipe = await RecipesModel.findById(req.body.recipeID);
    const user = await UserModel.findById(req.body.userID);
    user.savedRecipes.push(recipe); 
    await user.save();
    res.json({ savedRecipes: user.savedRecipes });
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});


router.get("/savedRecipes/ids/:userId", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    res.json({ savedRecipes: user?.savedRecipes });
  } catch (err) {
    res.json(err);
  }
});

router.get("/savedRecipes", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    const savedRecipes = await RecipesModel.find({
      _id: { $in: user.savedRecipes },
    });
    res.json({ savedRecipes});
  } catch (err) {
    res.json(err);
  }
});

router.post("/api/get-recipe", async (req, res) => {
  const { diet, cuisine, time, ingredients } = req.body;

  const prompt = `Generate a clear, beginner-friendly recipe using:
Diet: ${diet}
Cuisine: ${cuisine}
Max preparation time: ${time} minutes
Available ingredients: ${ingredients}

Please provide:
- Recipe name
- Ingredients with quantities
- Step-by-step preparation instructions.`;

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'moonshotai/kimi-k2:free', // adjust to your preferred model
        messages: [
          { role: 'system', content: 'You are a helpful AI recipe generator.' },
          { role: 'user', content: prompt }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`
        }
      }
    );

    const recipe = response.data.choices[0].message.content;
    res.json({ recipe });
  } catch (error) {
    console.error(error?.response?.data || error.message);
    res.status(500).json({ error: "Failed to generate recipe. Please try again later." });
  }
});

router.post("/:id/favourite", async (req,res)=>{
  try{
    const userId = req.user.id;
    const recipeId = req.params.id;
    const response = await UserModel.findByIdAndUpdate(userId, {$addToSet: {favourites: recipeId}});
    console.log("Added to favourites");
    res.status(200).json(response);
  } catch(err){
    console.log(err);
    res.status(500).json({error: "Failed to add to favourites"});
  }
})

export { router as recipeRouter };

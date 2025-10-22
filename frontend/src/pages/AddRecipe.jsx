
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useCookies } from "react-cookie";
import { useGetUserID } from "../hooks/useGetUserID";

const AddRecipe = () => {
  const [cookies] = useCookies(["access_token"]);
  const userID = useGetUserID();

  const [recipe, setRecipe] = useState({
    title: "",
    imageUrl: "",
    description: "",
    ingredients: [],
    instructions: "",
    prepTime: 0,
    cookTime: 0,
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    const ingredients = [...recipe.ingredients];
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const handleAddIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://foodio-backend-cgsj.onrender.com/recipes",
        recipe,
        { headers: { authorization: cookies.access_token } }
      );
      toast.success("Recipe saved successfully! 🎉");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Failed to save recipe. Please try again.");
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-pink-300 via-orange-300 to-yellow-200">
      {/* Left Side Image */}
{/* Left Side Image */}
<div className="hidden md:flex flex-1 justify-center items-center">
  <img
    src="/cup.webp"  // 👈 directly reference public file
    alt="Coffee Cup"
    className="h-full max-h-[500px] w-auto rounded-2xl shadow-lg object-cover ml-8 "
  />
</div>


      {/* Right Side Form */}
     <div className="flex-1 flex justify-center items-center p-6">
  <div className="bg-white w-full max-w-lg h-[90%] rounded-2xl shadow-2xl border dark:text-black border-gray-300 p-6 overflow-y-auto">
    <h1 className="text-2xl font-bold text-orange-600 text-center mb-4 ">
      🍲 Add a New Recipe
    </h1>

    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Title */}
      <div>
        <label className="block font-semibold mb-1 dark:text-black">Recipe Title</label>
        <input
          type="text"
          name="title"
          value={recipe.title}
          onChange={handleChange}
          placeholder="Enter recipe title..."
          required
          className="w-full px-3 py-2 border rounded-lg bg-gray-100 shadow-sm focus:ring-2 focus:ring-orange-400"
        />
      </div>

      {/* Photo */}
      <div>
        <label className="block font-semibold mb-1 dark:text-black">Upload Photo</label>
        <input
          type="text"
          name="imageUrl"
          value={recipe.imageUrl}
          onChange={handleChange}
          placeholder="Paste image URL..."
          required
          className="w-full px-3 py-2 border rounded-lg bg-gray-100 shadow-sm focus:ring-2 focus:ring-orange-400"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block font-semibold mb-1 dark:text-black">Description</label>
        <textarea
          name="description"
          value={recipe.description}
          onChange={handleChange}
          placeholder="Write a short description..."
          required
          className="w-full px-3 py-2 border rounded-lg bg-gray-100 shadow-sm focus:ring-2 focus:ring-orange-400"
        />
      </div>

      {/* Ingredients */}
      <div>
        <label className="block font-semibold mb-1 dark:text-black">Ingredients</label>
        {recipe.ingredients.map((ingredient, index) => (
          <input
            key={index}
            type="text"
            value={ingredient}
            onChange={(e) => handleIngredientChange(e, index)}
            placeholder="List an ingredient..."
            required
            className="w-full px-3 py-2 border rounded-lg mb-2 bg-gray-100 shadow-sm focus:ring-2 focus:ring-orange-400"
          />
        ))}
        <button
          type="button"
          onClick={handleAddIngredient}
          className="text-sm bg-orange-100 px-3 py-1 rounded-lg hover:bg-orange-200 dark:text-black"
        >
          ➕ Add Ingredient
        </button>
      </div>

      {/* Instructions */}
      <div>
        <label className="block font-semibold mb-1 dark:text-black">Instructions</label>
        <textarea
          name="instructions"
          value={recipe.instructions}
          onChange={handleChange}
          placeholder="Step by step instructions..."
          required
          className="w-full px-3 py-2 border rounded-lg bg-gray-100 shadow-sm focus:ring-2 focus:ring-orange-400"
        />
      </div>

      {/* Prep + Cook Time */}
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block font-semibold mb-1 dark:text-black">
            Prep Time (mins)
          </label>
          <input
            type="number"
            name="prepTime"
            value={recipe.prepTime}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg bg-gray-100 shadow-sm focus:ring-2 focus:ring-orange-400"
          />
        </div>
        <div className="flex-1">
          <label className="block font-semibold mb-1 dark:text-black">
            Cook Time (mins)
          </label>
          <input
            type="number"
            name="cookTime"
            value={recipe.cookTime}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg bg-gray-100 shadow-sm focus:ring-2 focus:ring-orange-400"
          />
        </div>
      </div>

      {/* Save Button */}
      <button
        type="submit"
        className="w-full mt-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-3 rounded-xl hover:opacity-90 transition"
      >
        SAVE RECIPE
      </button>
    </form>
  </div>
</div>

    </div>
  );
};

export default AddRecipe;

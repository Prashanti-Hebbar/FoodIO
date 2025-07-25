import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../AddRecipe.css";
import axios from "axios";
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
      await axios.post("https://foodio-backend-cgsj.onrender.com/recipes", recipe, {
        headers: { authorization: cookies.access_token },
      });
      alert("Recipe saved successfully! 🎉");
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="page-container">
      <div className="header">
        <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
        <h1>Create New Recipe</h1>
      </div>

      <div className="content-container">
        <form onSubmit={handleSubmit} className="recipe-form">
          <label>Recipe Title:</label>
          <input 
            type="text" 
            name="title"
            value={recipe.title} 
            onChange={handleChange} 
            required 
          />

          <label>Upload Photo:</label>
          <input 
            type="text"
            name="imageUrl" 
            value={recipe.imageUrl}
            onChange={handleChange}
            placeholder="Enter image URL"
            required 
          />

          <label>Description:</label>
          <textarea 
            name="description"
            value={recipe.description} 
            onChange={handleChange} 
            required 
          />

          <label>Ingredients:</label>
          {recipe.ingredients.map((ingredient, index) => (
            <input
              key={index}
              type="text"
              value={ingredient}
              onChange={(e) => handleIngredientChange(e, index)}
              required
            />
          ))}
          <button type="button" onClick={handleAddIngredient}>Add Ingredient</button>

          <label>Instructions:</label>
          <textarea 
            name="instructions"
            value={recipe.instructions} 
            onChange={handleChange} 
            required 
          />

          <div className="time-inputs">
            <div>
              <label>Prep Time (mins):</label>
              <input 
                type="number" 
                name="prepTime"
                value={recipe.prepTime} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div>
              <label>Cook Time (mins):</label>
              <input 
                type="number" 
                name="cookTime"
                value={recipe.cookTime} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>

          <button type="submit" className="save-btn">Save Recipe</button>
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;

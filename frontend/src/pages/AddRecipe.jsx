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
    photo: "",
    description: "",
    ingredients: [],
    instructions: "",
    prepTime: 0,
    cookTime: 0,
    userOwner: userID,
  });

  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    // Map imageUrl input to photo field for backward compatibility
    if (name === "imageUrl" || name === "photo") {
      setRecipe({ ...recipe, photo: value });
    } else {
      setRecipe({ ...recipe, [name]: value });
    }
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
      alert("Recipe saved successfully! 🎉"); // Alert logic for successful save
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  // Drag and drop handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await handleImageUpload(e.dataTransfer.files[0]);
    }
  };

  const handleImageChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      await handleImageUpload(e.target.files[0]);
    }
  };

  // Upload image to imgbb (or similar)
  const handleImageUpload = async (file) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);
    try {
      const apiKey = process.env.REACT_APP_IMGBB_API_KEY;
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setRecipe((prev) => ({ ...prev, photo: data.data.url }));
      } else {
        alert("Image upload failed");
      }
    } catch (err) {
      alert("Image upload error");
    }
    setUploading(false);
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
          <div
            className={`drag-drop-zone${dragActive ? " active" : ""}`}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            style={{ border: "2px dashed #aaa", padding: 20, textAlign: "center", marginBottom: 10 }}
          >
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              id="photo-upload-input"
              onChange={handleImageChange}
            />
            <label htmlFor="photo-upload-input" style={{ cursor: "pointer" }}>
              {uploading ? "Uploading..." : recipe.photo ? (
                <img src={recipe.photo} alt="Preview" style={{ maxWidth: 200, maxHeight: 200 }} />
              ) : (
                <>
                  Drag & drop an image here, or <span style={{ color: "#007bff" }}>click to select</span>
                </>
              )}
            </label>
          </div>

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

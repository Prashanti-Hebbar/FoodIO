import React, { useState } from 'react';
import '../../styles/AllCat.css';

const Dinner = () => {
    const [setSelectedRecipe] = useState(null);

    const dinnerRecipes = [
        {
          id: 1,
          title: "Palak Paneer",
          image: "../dinner/palak_paneer.jpg",
          rating: 4.9,
          prepTime: "35 minutes",
          description: "Soft paneer cubes cooked in a creamy spinach gravy",
          ingredients: [
            { quantity: "250g", name: "paneer", notes: "cubed" },
            { quantity: "2 cups", name: "spinach", notes: "blanched and pureed" },
            { quantity: "1", name: "onion", notes: "finely chopped" },
            { quantity: "1 teaspoon", name: "garam masala" },
            { quantity: "1 teaspoon", name: "ginger garlic paste" },
            { quantity: "1/2 cup", name: "cream" },
            { quantity: "1 teaspoon", name: "salt" }
          ]
        },
        {
          id: 2,
          title: "Chicken Curry",
          image: "../dinner/chicken_curry.jpg",
          rating: 4.8,
          prepTime: "40 minutes",
          description: "Spicy and flavorful Indian-style chicken curry",
          ingredients: [
            { quantity: "500g", name: "chicken", notes: "bone-in pieces" },
            { quantity: "2", name: "onions", notes: "finely chopped" },
            { quantity: "2", name: "tomatoes", notes: "pureed" },
            { quantity: "1 teaspoon", name: "turmeric powder" },
            { quantity: "1 teaspoon", name: "garam masala" },
            { quantity: "1 teaspoon", name: "ginger garlic paste" },
            { quantity: "1/2 teaspoon", name: "salt" }
          ]
        },
        {
          id: 3,
          title: "Aloo Gobi",
          image: "../dinner/aloo_gobi.jpg",
          rating: 4.7,
          prepTime: "30 minutes",
          description: "Potatoes and cauliflower cooked with aromatic spices",
          ingredients: [
            { quantity: "2", name: "potatoes", notes: "cubed" },
            { quantity: "1 cup", name: "cauliflower florets" },
            { quantity: "1", name: "onion", notes: "chopped" },
            { quantity: "1 teaspoon", name: "cumin seeds" },
            { quantity: "1 teaspoon", name: "turmeric powder" },
            { quantity: "1 teaspoon", name: "red chili powder" },
            { quantity: "1 teaspoon", name: "salt" }
          ]
        },
        {
          id: 4,
          title: "Matar Paneer",
          image: "../dinner/matar_paneer.jpg",
          rating: 4.8,
          prepTime: "35 minutes",
          description: "Cottage cheese and green peas cooked in a spiced tomato gravy",
          ingredients: [
            { quantity: "250g", name: "paneer", notes: "cubed" },
            { quantity: "1 cup", name: "green peas" },
            { quantity: "2", name: "tomatoes", notes: "pureed" },
            { quantity: "1", name: "onion", notes: "chopped" },
            { quantity: "1 teaspoon", name: "cumin seeds" },
            { quantity: "1 teaspoon", name: "garam masala" },
            { quantity: "1 teaspoon", name: "salt" }
          ]
        },
        {
          id: 5,
          title: "Baingan Bharta",
          image: "../dinner/baingan_bharta.jpg",
          rating: 4.7,
          prepTime: "30 minutes",
          description: "Roasted eggplant mashed and cooked with spices",
          ingredients: [
            { quantity: "1 large", name: "eggplant", notes: "roasted and mashed" },
            { quantity: "1", name: "onion", notes: "chopped" },
            { quantity: "2", name: "tomatoes", notes: "chopped" },
            { quantity: "1 teaspoon", name: "garlic", notes: "minced" },
            { quantity: "1 teaspoon", name: "coriander powder" },
            { quantity: "1 teaspoon", name: "red chili powder" },
            { quantity: "1 teaspoon", name: "salt" }
          ]
        },
        {
          id: 6,
          title: "Masoor Dal",
          image: "../dinner/masoor_dal.jpg",
          rating: 4.8,
          prepTime: "30 minutes",
          description: "Red lentils cooked with garlic and Indian spices",
          ingredients: [
            { quantity: "1 cup", name: "masoor dal (red lentils)" },
            { quantity: "2 cups", name: "water" },
            { quantity: "1 teaspoon", name: "turmeric powder" },
            { quantity: "1 teaspoon", name: "mustard seeds" },
            { quantity: "2 cloves", name: "garlic", notes: "minced" },
            { quantity: "1 teaspoon", name: "ghee" },
            { quantity: "1", name: "green chili", notes: "chopped" }
          ]
        }
      ];
    
      return (
        <div className="desserts-wrapper">
          <div className="hero-section">
            <div className="hero-overlay">
              <h1 className="hero-title">Evening Delights</h1>
              <p className="hero-subtitle">Discover perfect dinner recipes for a memorable evening</p>
              <div className="hero-highlights">
                <div className="highlight-box">
                  <span className="highlight-number">25+</span>
                  <span className="highlight-text">Sweet Treats</span>
                </div>
                <div className="highlight-box">
                  <span className="highlight-number">30min</span>
                  <span className="highlight-text">Quick Desserts</span>
                </div>
                <div className="highlight-box">
                  <span className="highlight-number">4.9</span>
                  <span className="highlight-text">Avg Rating</span>
                </div>
              </div>
            </div>
          </div>
    
          <div className="recipes-showcase">
            {dinnerRecipes.map(recipe => (
              <div key={recipe.id} className="recipe-card">
                <div className="card-media">
                  <img src={recipe.image} alt={recipe.title} />
                  <div className="card-badges">
                    <span className="time-badge">⏱️ {recipe.prepTime}</span>
                    <span className="rating-badge">★ {recipe.rating}</span>
                  </div>
                  <div className="card-overlay">
                    <button 
                      className="view-recipe-btn"
                      onClick={() => setSelectedRecipe(recipe)}
                    >
                      View Recipe
                    </button>
                  </div>
                </div>
                <div className="card-content">
                  <h3>{recipe.title}</h3>
                  <div className="recipe-tags">
                    {recipe.tags?.map(tag => (
                      <span key={tag} className="recipe-tag">{tag}</span>
                    ))}
                  </div>
                  <p className="recipe-description">{recipe.description}</p>
                  <div className="recipe-footer">
                    <span className="servings">🍽️ {recipe.servings} servings</span>
                    <span className="sweetness">🍯 {recipe.sweetness || 'Medium'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    };
export default Dinner;

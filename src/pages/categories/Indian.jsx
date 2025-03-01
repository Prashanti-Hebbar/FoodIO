import React, { useState } from 'react';
import '../../styles/AllCat.css';

const Indian = () => {
    const [setSelectedRecipe] = useState(null);

    const indianRecipes = [
      {
        id: 1,
        title: "Butter Chicken",
        image: "../indian/butter_chicken.jpg",
        rating: 4.9,
        prepTime: "45 minutes",
        description: "Creamy and rich butter chicken cooked in a spiced tomato-based curry",
        ingredients: [
          { quantity: "500g", name: "chicken", notes: "boneless, cubed" },
          { quantity: "1 cup", name: "tomato puree" },
          { quantity: "1/2 cup", name: "heavy cream" },
          { quantity: "1 tablespoon", name: "butter" },
          { quantity: "1 teaspoon", name: "garam masala" },
          { quantity: "1 teaspoon", name: "turmeric" },
          { quantity: "1 teaspoon", name: "cumin powder" }
        ]
      },
      {
        id: 2,
        title: "Palak Paneer",
        image: "../indian/palak_paneer.jpg",
        rating: 4.8,
        prepTime: "30 minutes",
        description: "Soft paneer cubes cooked in a flavorful spinach gravy",
        ingredients: [
          { quantity: "200g", name: "paneer", notes: "cubed" },
          { quantity: "2 cups", name: "spinach", notes: "blanched and pureed" },
          { quantity: "1", name: "onion", notes: "chopped" },
          { quantity: "1", name: "tomato", notes: "chopped" },
          { quantity: "1 teaspoon", name: "garlic", notes: "minced" },
          { quantity: "1/2 teaspoon", name: "garam masala" },
          { quantity: "1 tablespoon", name: "butter" }
        ]
      },
      {
        id: 3,
        title: "Chole (Chickpea Curry)",
        image: "../indian/chole.jpg",
        rating: 4.7,
        prepTime: "40 minutes",
        description: "Spicy and tangy chickpea curry cooked with Indian spices",
        ingredients: [
          { quantity: "2 cups", name: "chickpeas", notes: "soaked overnight" },
          { quantity: "1", name: "onion", notes: "chopped" },
          { quantity: "2", name: "tomatoes", notes: "pureed" },
          { quantity: "1 teaspoon", name: "ginger-garlic paste" },
          { quantity: "1 teaspoon", name: "chole masala" },
          { quantity: "1/2 teaspoon", name: "turmeric" },
          { quantity: "1 tablespoon", name: "oil" }
        ]
      },
      {
        id: 4,
        title: "Masala Dosa",
        image: "../indian/masala_dosa.jpg",
        rating: 4.9,
        prepTime: "1 hour",
        description: "Crispy fermented rice crepes stuffed with spicy potato filling",
        ingredients: [
          { quantity: "2 cups", name: "rice" },
          { quantity: "1 cup", name: "urad dal" },
          { quantity: "1 teaspoon", name: "salt" },
          { quantity: "2", name: "potatoes", notes: "boiled and mashed" },
          { quantity: "1", name: "onion", notes: "sliced" },
          { quantity: "1 teaspoon", name: "mustard seeds" },
          { quantity: "1 teaspoon", name: "turmeric" }
        ]
      },
      {
        id: 5,
        title: "Biryani",
        image: "../indian/biryani.jpg",
        rating: 5.0,
        prepTime: "1 hour",
        description: "Aromatic basmati rice cooked with spices, meat, and saffron",
        ingredients: [
          { quantity: "2 cups", name: "basmati rice" },
          { quantity: "500g", name: "chicken/mutton" },
          { quantity: "1 cup", name: "yogurt" },
          { quantity: "2", name: "onions", notes: "sliced" },
          { quantity: "1 tablespoon", name: "biryani masala" },
          { quantity: "1 teaspoon", name: "ginger-garlic paste" },
          { quantity: "1 teaspoon", name: "saffron", notes: "soaked in warm milk" }
        ]
      },
      {
        id: 6,
        title: "Rasgulla",
        image: "../indian/rasgulla.jpg",
        rating: 4.8,
        prepTime: "50 minutes",
        description: "Soft and spongy cheese balls soaked in sugar syrup",
        ingredients: [
          { quantity: "1 liter", name: "milk" },
          { quantity: "2 tablespoons", name: "lemon juice" },
          { quantity: "1 cup", name: "sugar" },
          { quantity: "3 cups", name: "water" },
          { quantity: "1 teaspoon", name: "rose water" }
        ]
      }
    ];
    
      return (
        <div className="desserts-wrapper">
          <div className="hero-section">
            <div className="hero-overlay">
              <h1 className="hero-title">Delightful Starters</h1>
              <p className="hero-subtitle">Explore perfect appetizers to kickstart your meal</p>
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
            {indianRecipes.map(recipe => (
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
export default Indian;

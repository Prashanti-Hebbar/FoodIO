import React, { useState } from 'react';
import '../../styles/AllCat.css';

const Appetizer = () => {
    const [setSelectedRecipe] = useState(null);

    const appetizerRecipes = [
        {
          id: 1,
          title: "Samosa",
          image: "../appetizers/samosa.jpg",
          rating: 4.9,
          prepTime: "45 minutes",
          description: "Crispy, deep-fried pastry filled with spiced potatoes and peas",
          ingredients: [
            { quantity: "2 cups", name: "all-purpose flour" },
            { quantity: "4 tablespoons", name: "oil" },
            { quantity: "1/2 teaspoon", name: "salt" },
            { quantity: "3", name: "potatoes", notes: "boiled and mashed" },
            { quantity: "1/2 cup", name: "peas" },
            { quantity: "1 teaspoon", name: "cumin seeds" },
            { quantity: "1 teaspoon", name: "garam masala" }
          ]
        },
        {
          id: 2,
          title: "Paneer Tikka",
          image: "../appetizers/paneer_tikka.jpg",
          rating: 4.8,
          prepTime: "30 minutes",
          description: "Grilled spiced paneer cubes with bell peppers and onions",
          ingredients: [
            { quantity: "250 grams", name: "paneer", notes: "cubed" },
            { quantity: "1/2 cup", name: "yogurt" },
            { quantity: "1 teaspoon", name: "red chili powder" },
            { quantity: "1 teaspoon", name: "garam masala" },
            { quantity: "1 teaspoon", name: "lemon juice" },
            { quantity: "1 tablespoon", name: "ginger-garlic paste" },
            { quantity: "1", name: "bell pepper", notes: "cubed" }
          ]
        },
        {
          id: 3,
          title: "Vegetable Pakora",
          image: "../appetizers/vegetable_pakora.jpg",
          rating: 4.7,
          prepTime: "20 minutes",
          description: "Crispy deep-fried vegetable fritters made with gram flour",
          ingredients: [
            { quantity: "1 cup", name: "gram flour (besan)" },
            { quantity: "1", name: "potato", notes: "thinly sliced" },
            { quantity: "1", name: "onion", notes: "sliced" },
            { quantity: "1/2 teaspoon", name: "turmeric powder" },
            { quantity: "1 teaspoon", name: "red chili powder" },
            { quantity: "1 teaspoon", name: "cumin seeds" },
            { quantity: "1/2 cup", name: "water" }
          ]
        },
        {
          id: 4,
          title: "Dahi Puri",
          image: "../appetizers/dahi_puri.jpg",
          rating: 4.9,
          prepTime: "25 minutes",
          description: "Crispy puris filled with yogurt, chutneys, and spiced potatoes",
          ingredients: [
            { quantity: "10", name: "pani puris" },
            { quantity: "1 cup", name: "yogurt", notes: "whisked" },
            { quantity: "1", name: "potato", notes: "boiled and mashed" },
            { quantity: "2 tablespoons", name: "tamarind chutney" },
            { quantity: "2 tablespoons", name: "mint chutney" },
            { quantity: "1/2 teaspoon", name: "chaat masala" },
            { quantity: "1 tablespoon", name: "sev" }
          ]
        },
        {
          id: 5,
          title: "Hara Bhara Kabab",
          image: "../appetizers/hara_bhara_kabab.jpg",
          rating: 4.8,
          prepTime: "30 minutes",
          description: "Healthy pan-fried spinach and pea patties with spices",
          ingredients: [
            { quantity: "1 cup", name: "spinach", notes: "blanched" },
            { quantity: "1/2 cup", name: "peas", notes: "boiled" },
            { quantity: "1", name: "potato", notes: "boiled and mashed" },
            { quantity: "1 tablespoon", name: "ginger-garlic paste" },
            { quantity: "1 teaspoon", name: "coriander powder" },
            { quantity: "1 teaspoon", name: "green chili", notes: "chopped" },
            { quantity: "2 tablespoons", name: "gram flour" }
          ]
        },
        {
          id: 6,
          title: "Masala Papad",
          image: "../appetizers/masala_papad.jpg",
          rating: 4.7,
          prepTime: "10 minutes",
          description: "Crispy roasted papad topped with spicy onions and tomatoes",
          ingredients: [
            { quantity: "2", name: "papads", notes: "roasted" },
            { quantity: "1", name: "onion", notes: "finely chopped" },
            { quantity: "1", name: "tomato", notes: "finely chopped" },
            { quantity: "1/2 teaspoon", name: "red chili powder" },
            { quantity: "1 teaspoon", name: "lemon juice" },
            { quantity: "1 tablespoon", name: "coriander leaves", notes: "chopped" }
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
            {appetizerRecipes.map(recipe => (
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
export default Appetizer;

import React, { useState } from 'react';
import '../../styles/AllCat.css';

const Desserts = () => {
    const [setSelectedRecipe] = useState(null);

    const dessertRecipes = [
        {
          id: 1,
          title: "Gulab Jamun",
          image: "../dessert/gulab_jamun.jpg",
          rating: 4.9,
          prepTime: "45 minutes",
          description: "Soft, fried milk-based dumplings soaked in sugar syrup",
          ingredients: [
            { quantity: "1 cup", name: "milk powder" },
            { quantity: "1/4 cup", name: "all-purpose flour" },
            { quantity: "2 tablespoons", name: "ghee", notes: "melted" },
            { quantity: "1/4 teaspoon", name: "baking soda" },
            { quantity: "1/4 cup", name: "milk", notes: "warm" },
            { quantity: "1 cup", name: "sugar" },
            { quantity: "1/2 teaspoon", name: "cardamom powder" }
          ]
        },
        {
          id: 2,
          title: "Rasgulla",
          image: "../dessert/rasgulla.jpg",
          rating: 4.8,
          prepTime: "50 minutes",
          description: "Soft and spongy cheese balls soaked in light sugar syrup",
          ingredients: [
            { quantity: "1 liter", name: "milk" },
            { quantity: "2 tablespoons", name: "lemon juice" },
            { quantity: "1 cup", name: "sugar" },
            { quantity: "4 cups", name: "water" },
            { quantity: "1/2 teaspoon", name: "cardamom powder" }
          ]
        },
        {
          id: 3,
          title: "Kheer",
          image: "../dessert/kheer.jpg",
          rating: 4.9,
          prepTime: "40 minutes",
          description: "Traditional Indian rice pudding with nuts and saffron",
          ingredients: [
            { quantity: "1/4 cup", name: "basmati rice", notes: "soaked" },
            { quantity: "1 liter", name: "milk" },
            { quantity: "1/2 cup", name: "sugar" },
            { quantity: "1/4 teaspoon", name: "cardamom powder" },
            { quantity: "10", name: "almonds", notes: "sliced" },
            { quantity: "10", name: "cashews", notes: "chopped" },
            { quantity: "1 pinch", name: "saffron strands" }
          ]
        },
        {
          id: 4,
          title: "Jalebi",
          image: "../dessert/jalebi.jpg",
          rating: 4.7,
          prepTime: "1 hour",
          description: "Crispy, deep-fried spirals soaked in sugar syrup",
          ingredients: [
            { quantity: "1 cup", name: "all-purpose flour" },
            { quantity: "1 tablespoon", name: "cornflour" },
            { quantity: "1/2 teaspoon", name: "baking powder" },
            { quantity: "1 cup", name: "yogurt" },
            { quantity: "1 cup", name: "sugar" },
            { quantity: "1/2 teaspoon", name: "cardamom powder" },
            { quantity: "1 teaspoon", name: "lemon juice" }
          ]
        },
        {
          id: 5,
          title: "Besan Ladoo",
          image: "../dessert/besan_ladoo.jpg",
          rating: 4.8,
          prepTime: "30 minutes",
          description: "Sweet gram flour balls flavored with ghee and cardamom",
          ingredients: [
            { quantity: "2 cups", name: "besan (gram flour)" },
            { quantity: "1/2 cup", name: "ghee" },
            { quantity: "3/4 cup", name: "powdered sugar" },
            { quantity: "1/2 teaspoon", name: "cardamom powder" },
            { quantity: "10", name: "almonds", notes: "chopped" }
          ]
        },
        {
          id: 6,
          title: "Gajar Ka Halwa",
          image: "../dessert/gajar_halwa.jpg",
          rating: 4.9,
          prepTime: "45 minutes",
          description: "Rich carrot pudding made with milk, ghee, and nuts",
          ingredients: [
            { quantity: "4 cups", name: "grated carrots" },
            { quantity: "2 cups", name: "milk" },
            { quantity: "1/2 cup", name: "sugar" },
            { quantity: "1/4 cup", name: "ghee" },
            { quantity: "1/2 teaspoon", name: "cardamom powder" },
            { quantity: "10", name: "cashews", notes: "chopped" },
            { quantity: "10", name: "raisins" }
          ]
        }
      ];
    
      return (
        <div className="desserts-wrapper">
          <div className="hero-section">
            <div className="hero-overlay">
              <h1 className="hero-title">Sweet Indulgences</h1>
              <p className="hero-subtitle">Discover delightful desserts to satisfy your sweet cravings</p>
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
            {dessertRecipes.map(recipe => (
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
export default Desserts;

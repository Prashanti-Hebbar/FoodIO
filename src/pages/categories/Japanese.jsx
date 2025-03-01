import React, { useState } from 'react';
import '../../styles/AllCat.css';

const Japanese = () => {
    const [setSelectedRecipe] = useState(null);

    const japaneseRecipes = [
        {
          id: 1,
          title: "Sushi Rolls",
          image: "../japanese/sushi_rolls.jpg",
          rating: 4.9,
          prepTime: "40 minutes",
          description: "Traditional Japanese sushi rolls with rice, seaweed, and fresh fillings",
          ingredients: [
            { quantity: "2 cups", name: "sushi rice", notes: "cooked" },
            { quantity: "4 sheets", name: "nori" },
            { quantity: "1/2 cup", name: "rice vinegar" },
            { quantity: "100g", name: "salmon", notes: "sliced" },
            { quantity: "1/2", name: "cucumber", notes: "julienned" }
          ]
        },
        {
          id: 2,
          title: "Miso Soup",
          image: "../japanese/miso_soup.jpg",
          rating: 4.8,
          prepTime: "15 minutes",
          description: "A light and healthy soup made with miso paste, tofu, and seaweed",
          ingredients: [
            { quantity: "3 cups", name: "dashi broth" },
            { quantity: "2 tablespoons", name: "miso paste" },
            { quantity: "1/2 cup", name: "tofu", notes: "cubed" },
            { quantity: "1 tablespoon", name: "wakame seaweed", notes: "dried" },
            { quantity: "1", name: "green onion", notes: "chopped" }
          ]
        },
        {
          id: 3,
          title: "Ramen",
          image: "../japanese/ramen.jpg",
          rating: 4.9,
          prepTime: "45 minutes",
          description: "Flavorful Japanese noodle soup with broth, toppings, and soft-boiled eggs",
          ingredients: [
            { quantity: "2 packs", name: "ramen noodles" },
            { quantity: "3 cups", name: "chicken broth" },
            { quantity: "2 tablespoons", name: "soy sauce" },
            { quantity: "1", name: "soft-boiled egg", notes: "halved" },
            { quantity: "1/2 cup", name: "sliced mushrooms" }
          ]
        },
        {
          id: 4,
          title: "Teriyaki Chicken",
          image: "../japanese/teriyaki_chicken.jpg",
          rating: 4.7,
          prepTime: "30 minutes",
          description: "Juicy chicken glazed with a sweet and savory teriyaki sauce",
          ingredients: [
            { quantity: "2", name: "chicken breasts", notes: "sliced" },
            { quantity: "1/4 cup", name: "soy sauce" },
            { quantity: "2 tablespoons", name: "mirin" },
            { quantity: "2 tablespoons", name: "sugar" },
            { quantity: "1 teaspoon", name: "ginger", notes: "grated" }
          ]
        },
        {
          id: 5,
          title: "Tempura",
          image: "../japanese/tempura.jpg",
          rating: 4.8,
          prepTime: "35 minutes",
          description: "Light and crispy battered vegetables and shrimp",
          ingredients: [
            { quantity: "1/2 cup", name: "flour" },
            { quantity: "1/2 cup", name: "ice-cold water" },
            { quantity: "1", name: "egg" },
            { quantity: "100g", name: "shrimp", notes: "peeled" },
            { quantity: "1/2 cup", name: "assorted vegetables", notes: "sliced" }
          ]
        },
        {
          id: 6,
          title: "Matcha Ice Cream",
          image: "../japanese/matcha_ice_cream.jpg",
          rating: 5.0,
          prepTime: "20 minutes + freezing time",
          description: "Creamy and rich green tea-flavored ice cream",
          ingredients: [
            { quantity: "2 cups", name: "heavy cream" },
            { quantity: "1 cup", name: "milk" },
            { quantity: "1/2 cup", name: "sugar" },
            { quantity: "2 tablespoons", name: "matcha powder" },
            { quantity: "2", name: "egg yolks" }
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
            {japaneseRecipes.map(recipe => (
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
export default Japanese;


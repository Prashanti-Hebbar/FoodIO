import React, { useState } from 'react';
import '../../styles/AllCat.css';

const LowCarb = () => {
    const [setSelectedRecipe] = useState(null);
    
    const lowCarbRecipes = [
        {
          id: 1,
          title: "Grilled Chicken Salad",
          image: "../lowcarb/grilled_chicken_salad.jpg",
          rating: 4.8,
          prepTime: "20 minutes",
          description: "Fresh salad with grilled chicken, avocado, and a light dressing",
          ingredients: [
            { quantity: "1", name: "chicken breast", notes: "grilled and sliced" },
            { quantity: "2 cups", name: "mixed greens" },
            { quantity: "1/2", name: "avocado", notes: "sliced" },
            { quantity: "1/4 cup", name: "cherry tomatoes", notes: "halved" },
            { quantity: "2 tablespoons", name: "olive oil" },
            { quantity: "1 tablespoon", name: "lemon juice" },
            { quantity: "1/2 teaspoon", name: "black pepper" },
            { quantity: "1/2 teaspoon", name: "salt" }
          ]
        },
        {
          id: 2,
          title: "Zucchini Noodles with Pesto",
          image: "../lowcarb/zucchini_noodles.jpg",
          rating: 4.7,
          prepTime: "15 minutes",
          description: "Light and flavorful zucchini noodles tossed in homemade pesto",
          ingredients: [
            { quantity: "2", name: "zucchini", notes: "spiralized" },
            { quantity: "1/4 cup", name: "basil leaves" },
            { quantity: "2 tablespoons", name: "parmesan cheese" },
            { quantity: "1 tablespoon", name: "pine nuts" },
            { quantity: "1 clove", name: "garlic" },
            { quantity: "2 tablespoons", name: "olive oil" },
            { quantity: "1/2 teaspoon", name: "salt" },
            { quantity: "1/2 teaspoon", name: "black pepper" }
          ]
        },
        {
          id: 3,
          title: "Cauliflower Fried Rice",
          image: "../lowcarb/cauliflower_fried_rice.jpg",
          rating: 4.9,
          prepTime: "20 minutes",
          description: "Low-carb alternative to fried rice using cauliflower",
          ingredients: [
            { quantity: "2 cups", name: "cauliflower rice" },
            { quantity: "1/2 cup", name: "bell peppers", notes: "chopped" },
            { quantity: "1/2 cup", name: "carrots", notes: "chopped" },
            { quantity: "1", name: "egg", notes: "beaten" },
            { quantity: "2 tablespoons", name: "soy sauce" },
            { quantity: "1 teaspoon", name: "ginger", notes: "grated" },
            { quantity: "1 clove", name: "garlic", notes: "minced" },
            { quantity: "2 tablespoons", name: "olive oil" }
          ]
        },
        {
          id: 4,
          title: "Keto Avocado Egg Salad",
          image: "../lowcarb/avocado_egg_salad.jpg",
          rating: 4.8,
          prepTime: "10 minutes",
          description: "Creamy avocado and egg salad with a hint of lime",
          ingredients: [
            { quantity: "2", name: "hard-boiled eggs", notes: "chopped" },
            { quantity: "1", name: "avocado", notes: "mashed" },
            { quantity: "1 tablespoon", name: "mayonnaise" },
            { quantity: "1 teaspoon", name: "lime juice" },
            { quantity: "1/2 teaspoon", name: "salt" },
            { quantity: "1/4 teaspoon", name: "black pepper" },
            { quantity: "1 tablespoon", name: "chopped parsley" }
          ]
        },
        {
          id: 5,
          title: "Garlic Butter Shrimp",
          image: "../lowcarb/garlic_butter_shrimp.jpg",
          rating: 4.9,
          prepTime: "15 minutes",
          description: "Juicy shrimp cooked in garlic butter and lemon juice",
          ingredients: [
            { quantity: "1 lb", name: "shrimp", notes: "peeled and deveined" },
            { quantity: "2 tablespoons", name: "butter" },
            { quantity: "3 cloves", name: "garlic", notes: "minced" },
            { quantity: "1 tablespoon", name: "lemon juice" },
            { quantity: "1/2 teaspoon", name: "salt" },
            { quantity: "1/4 teaspoon", name: "black pepper" },
            { quantity: "1 tablespoon", name: "chopped parsley" }
          ]
        },
        {
          id: 6,
          title: "Stuffed Bell Peppers",
          image: "../lowcarb/stuffed_bell_peppers.jpg",
          rating: 4.7,
          prepTime: "30 minutes",
          description: "Bell peppers stuffed with a flavorful mix of ground meat and vegetables",
          ingredients: [
            { quantity: "3", name: "bell peppers", notes: "halved and deseeded" },
            { quantity: "1/2 lb", name: "ground turkey" },
            { quantity: "1/2 cup", name: "chopped spinach" },
            { quantity: "1/4 cup", name: "cheese", notes: "grated" },
            { quantity: "1 teaspoon", name: "garlic powder" },
            { quantity: "1 teaspoon", name: "paprika" },
            { quantity: "1/2 teaspoon", name: "salt" },
            { quantity: "1/2 teaspoon", name: "black pepper" }
          ]
        }
      ];
    
      return (
        <div className="desserts-wrapper">
          <div className="hero-section">
            <div className="hero-overlay">
              <h1 className="hero-title">Low Carb Delights</h1>
              <p className="hero-subtitle">Discover healthy and delicious low carb recipes</p>
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
            {lowCarbRecipes.map(recipe => (
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
export default LowCarb;
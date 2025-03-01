import React, { useState } from 'react';
import '../../styles/AllCat.css';

const Drinks = () => {
    const [setSelectedRecipe] = useState(null);

    const drinkRecipes = [
        {
          id: 1,
          title: "Mango Lassi",
          image: "../drinks/mango_lassi.jpg",
          rating: 4.9,
          prepTime: "10 minutes",
          description: "Refreshing Indian mango yogurt smoothie",
          ingredients: [
            { quantity: "1 cup", name: "mango pulp" },
            { quantity: "1 cup", name: "yogurt" },
            { quantity: "1/2 cup", name: "milk" },
            { quantity: "2 tablespoons", name: "sugar" },
            { quantity: "1/4 teaspoon", name: "cardamom powder" },
            { quantity: "4-5", name: "ice cubes" }
          ]
        },
        {
          id: 2,
          title: "Masala Chai",
          image: "../drinks/masala_chai.jpg",
          rating: 4.8,
          prepTime: "15 minutes",
          description: "Spiced Indian tea made with milk and aromatic spices",
          ingredients: [
            { quantity: "2 cups", name: "water" },
            { quantity: "1 cup", name: "milk" },
            { quantity: "2 teaspoons", name: "black tea leaves" },
            { quantity: "1", name: "cinnamon stick" },
            { quantity: "2", name: "cardamom pods", notes: "crushed" },
            { quantity: "1", name: "clove" },
            { quantity: "1/2 inch", name: "ginger", notes: "grated" },
            { quantity: "2 teaspoons", name: "sugar" }
          ]
        },
        {
          id: 3,
          title: "Jaljeera",
          image: "../drinks/jaljeera.jpg",
          rating: 4.7,
          prepTime: "10 minutes",
          description: "Tangy and spicy Indian cumin-flavored drink",
          ingredients: [
            { quantity: "2 cups", name: "water" },
            { quantity: "1/2 cup", name: "mint leaves" },
            { quantity: "1/2 teaspoon", name: "cumin powder" },
            { quantity: "1/2 teaspoon", name: "black salt" },
            { quantity: "1/4 teaspoon", name: "chili powder" },
            { quantity: "2 tablespoons", name: "lemon juice" },
            { quantity: "4-5", name: "ice cubes" }
          ]
        },
        {
          id: 4,
          title: "Cold Coffee",
          image: "../drinks/cold_coffee.jpg",
          rating: 4.8,
          prepTime: "5 minutes",
          description: "Chilled coffee blended with milk and sugar",
          ingredients: [
            { quantity: "1 cup", name: "milk" },
            { quantity: "1 tablespoon", name: "instant coffee" },
            { quantity: "2 tablespoons", name: "sugar" },
            { quantity: "4-5", name: "ice cubes" },
            { quantity: "as needed", name: "whipped cream", notes: "optional" },
            { quantity: "1 teaspoon", name: "chocolate syrup", notes: "optional" }
          ]
        },
        {
          id: 5,
          title: "Aam Panna",
          image: "../drinks/aam_panna.jpg",
          rating: 4.7,
          prepTime: "20 minutes",
          description: "Refreshing summer drink made with raw mango and spices",
          ingredients: [
            { quantity: "2", name: "raw mangoes" },
            { quantity: "2 tablespoons", name: "sugar" },
            { quantity: "1 teaspoon", name: "black salt" },
            { quantity: "1 teaspoon", name: "cumin powder" },
            { quantity: "2 tablespoons", name: "mint leaves", notes: "chopped" },
            { quantity: "2 cups", name: "water" },
            { quantity: "4-5", name: "ice cubes" }
          ]
        },
        {
          id: 6,
          title: "Thandai",
          image: "../drinks/thandai.jpg",
          rating: 4.9,
          prepTime: "30 minutes",
          description: "Traditional Indian spiced milk drink",
          ingredients: [
            { quantity: "2 cups", name: "milk" },
            { quantity: "10", name: "almonds", notes: "soaked" },
            { quantity: "5", name: "cashews", notes: "soaked" },
            { quantity: "1 teaspoon", name: "poppy seeds" },
            { quantity: "1 teaspoon", name: "fennel seeds" },
            { quantity: "1/4 teaspoon", name: "cardamom powder" },
            { quantity: "2 tablespoons", name: "sugar" },
            { quantity: "4-5", name: "ice cubes" }
          ]
        }
      ];
    
      return (
        <div className="desserts-wrapper">
          <div className="hero-section">
            <div className="hero-overlay">
              <h1 className="hero-title">Refreshing Beverages</h1>
              <p className="hero-subtitle">Quench your thirst with our handcrafted drink collection</p>
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
            {drinkRecipes.map(recipe => (
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
export default Drinks;

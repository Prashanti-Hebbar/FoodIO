import React, { useState } from 'react';
import '../../styles/AllCat.css';

const Snacks = () => {
    const [setSelectedRecipe] = useState(null);

    const snackRecipes = [
        {
          id: 1,
          title: "Samosa",
          image: "../snacks/samosa.jpg",
          rating: 4.9,
          prepTime: "40 minutes",
          description: "Crispy, deep-fried pastry filled with spiced potatoes and peas",
          ingredients: [
            { quantity: "2 cups", name: "all-purpose flour" },
            { quantity: "2", name: "potatoes", notes: "boiled and mashed" },
            { quantity: "1/2 cup", name: "green peas", notes: "boiled" },
            { quantity: "1 teaspoon", name: "cumin seeds" },
            { quantity: "1 teaspoon", name: "garam masala" },
            { quantity: "1/2 teaspoon", name: "red chili powder" },
            { quantity: "1/4 cup", name: "oil", notes: "for kneading" },
            { quantity: "as needed", name: "oil", notes: "for deep frying" }
          ]
        },
        {
          id: 2,
          title: "Pakora",
          image: "../snacks/pakora.jpg",
          rating: 4.8,
          prepTime: "25 minutes",
          description: "Crunchy fritters made with chickpea flour and vegetables",
          ingredients: [
            { quantity: "1 cup", name: "chickpea flour (besan)" },
            { quantity: "1", name: "onion", notes: "sliced" },
            { quantity: "1", name: "potato", notes: "sliced" },
            { quantity: "1 teaspoon", name: "cumin seeds" },
            { quantity: "1/2 teaspoon", name: "turmeric powder" },
            { quantity: "1/2 teaspoon", name: "red chili powder" },
            { quantity: "as needed", name: "water" },
            { quantity: "as needed", name: "oil", notes: "for deep frying" }
          ]
        },
        {
          id: 3,
          title: "Aloo Tikki",
          image: "../snacks/aloo_tikki.jpg",
          rating: 4.7,
          prepTime: "30 minutes",
          description: "Crispy potato patties with Indian spices",
          ingredients: [
            { quantity: "3", name: "potatoes", notes: "boiled and mashed" },
            { quantity: "1/2 teaspoon", name: "red chili powder" },
            { quantity: "1 teaspoon", name: "garam masala" },
            { quantity: "1/2 teaspoon", name: "chaat masala" },
            { quantity: "1/4 cup", name: "bread crumbs" },
            { quantity: "2 tablespoons", name: "corn flour" },
            { quantity: "as needed", name: "oil", notes: "for shallow frying" }
          ]
        },
        {
          id: 4,
          title: "Dahi Puri",
          image: "../snacks/dahi_puri.jpg",
          rating: 4.9,
          prepTime: "20 minutes",
          description: "Mini puris stuffed with potatoes, chutneys, and yogurt",
          ingredients: [
            { quantity: "10", name: "mini puris" },
            { quantity: "1", name: "potato", notes: "boiled and mashed" },
            { quantity: "1/2 cup", name: "yogurt", notes: "whisked" },
            { quantity: "2 tablespoons", name: "tamarind chutney" },
            { quantity: "2 tablespoons", name: "green chutney" },
            { quantity: "1/2 teaspoon", name: "chaat masala" },
            { quantity: "1/4 cup", name: "sev" }
          ]
        },
        {
          id: 5,
          title: "Masala Corn",
          image: "../snacks/masala_corn.jpg",
          rating: 4.7,
          prepTime: "10 minutes",
          description: "Spicy and buttery sweet corn with lemon and chaat masala",
          ingredients: [
            { quantity: "1 cup", name: "sweet corn", notes: "boiled" },
            { quantity: "1 teaspoon", name: "butter" },
            { quantity: "1/2 teaspoon", name: "chaat masala" },
            { quantity: "1/4 teaspoon", name: "red chili powder" },
            { quantity: "1 teaspoon", name: "lemon juice" },
            { quantity: "to taste", name: "salt" }
          ]
        },
        {
          id: 6,
          title: "Bread Pizza",
          image: "../snacks/bread_pizza.jpg",
          rating: 4.8,
          prepTime: "15 minutes",
          description: "Quick and easy pizza made on bread slices with veggies and cheese",
          ingredients: [
            { quantity: "4", name: "bread slices" },
            { quantity: "1/2 cup", name: "pizza sauce" },
            { quantity: "1/2 cup", name: "mozzarella cheese", notes: "grated" },
            { quantity: "1/2", name: "capsicum", notes: "chopped" },
            { quantity: "1/2", name: "tomato", notes: "chopped" },
            { quantity: "1/2 teaspoon", name: "oregano" },
            { quantity: "1/4 teaspoon", name: "chili flakes" }
          ]
        }
      ];
    
      return (
        <div className="desserts-wrapper">
          <div className="hero-section">
            <div className="hero-overlay">
              <h1 className="hero-title">Tasty Bites</h1>
              <p className="hero-subtitle">Discover quick and delicious snacks for any time of day</p>
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
            {snackRecipes.map(recipe => (
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
export default Snacks;

import React, { useState } from 'react';
import '../../styles/AllCat.css';

const Lunch = () => {
    const [setSelectedRecipe] = useState(null);

    const Lunch = [
      {
        id: 1,
        title: "Butter Chicken",
        image: "../lunch/butter_chicken.jpg",
        rating: 4.9,
        prepTime: "40 minutes",
        description: "Rich and creamy tomato-based chicken curry",
        ingredients: [
          { quantity: "500g", name: "chicken", notes: "boneless, diced" },
          { quantity: "2 tablespoons", name: "butter" },
          { quantity: "1 cup", name: "tomato puree" },
          { quantity: "1/2 cup", name: "cream" },
          { quantity: "1 teaspoon", name: "garam masala" },
          { quantity: "1 teaspoon", name: "ginger garlic paste" },
          { quantity: "1 teaspoon", name: "salt" }
        ]
      },
      {
        id: 2,
        title: "Paneer Tikka Masala",
        image: "../lunch/paneer_tikka.jpg",
        rating: 4.8,
        prepTime: "35 minutes",
        description: "Grilled paneer cubes cooked in a spiced tomato gravy",
        ingredients: [
          { quantity: "250g", name: "paneer", notes: "cubed" },
          { quantity: "1 cup", name: "yogurt" },
          { quantity: "1 teaspoon", name: "red chili powder" },
          { quantity: "1 teaspoon", name: "turmeric powder" },
          { quantity: "1/2 cup", name: "tomato puree" },
          { quantity: "1 teaspoon", name: "cumin powder" },
          { quantity: "1/2 cup", name: "cream" }
        ]
      },
      {
        id: 3,
        title: "Vegetable Biryani",
        image: "../lunch/vegetable_biryani.jpg",
        rating: 4.7,
        prepTime: "45 minutes",
        description: "Fragrant rice cooked with mixed vegetables and spices",
        ingredients: [
          { quantity: "2 cups", name: "basmati rice" },
          { quantity: "1 cup", name: "mixed vegetables", notes: "chopped" },
          { quantity: "1", name: "onion", notes: "sliced" },
          { quantity: "1 teaspoon", name: "garam masala" },
          { quantity: "1 teaspoon", name: "cumin seeds" },
          { quantity: "1/2 teaspoon", name: "turmeric powder" },
          { quantity: "1 cup", name: "water" }
        ]
      },
      {
        id: 4,
        title: "Dal Tadka",
        image: "../lunch/dal_tadka.jpg",
        rating: 4.8,
        prepTime: "30 minutes",
        description: "Yellow lentils tempered with garlic and spices",
        ingredients: [
          { quantity: "1 cup", name: "toor dal (pigeon peas)" },
          { quantity: "2 cups", name: "water" },
          { quantity: "1 teaspoon", name: "turmeric powder" },
          { quantity: "1 teaspoon", name: "mustard seeds" },
          { quantity: "2 cloves", name: "garlic", notes: "minced" },
          { quantity: "1 teaspoon", name: "ghee" },
          { quantity: "1", name: "green chili", notes: "chopped" }
        ]
      },
      {
        id: 5,
        title: "Chole (Chickpea Curry)",
        image: "../lunch/chole.jpg",
        rating: 4.9,
        prepTime: "40 minutes",
        description: "Spiced chickpea curry cooked in a tomato-based gravy",
        ingredients: [
          { quantity: "2 cups", name: "chickpeas", notes: "soaked overnight" },
          { quantity: "1", name: "onion", notes: "chopped" },
          { quantity: "2", name: "tomatoes", notes: "pureed" },
          { quantity: "1 teaspoon", name: "garam masala" },
          { quantity: "1 teaspoon", name: "cumin powder" },
          { quantity: "1 teaspoon", name: "ginger garlic paste" },
          { quantity: "1/2 teaspoon", name: "salt" }
        ]
      },
      {
        id: 6,
        title: "Rajma (Kidney Bean Curry)",
        image: "../lunch/rajma.jpg",
        rating: 4.8,
        prepTime: "45 minutes",
        description: "Slow-cooked kidney beans in a spiced tomato curry",
        ingredients: [
          { quantity: "2 cups", name: "kidney beans", notes: "soaked overnight" },
          { quantity: "1", name: "onion", notes: "chopped" },
          { quantity: "2", name: "tomatoes", notes: "pureed" },
          { quantity: "1 teaspoon", name: "garam masala" },
          { quantity: "1 teaspoon", name: "coriander powder" },
          { quantity: "1 teaspoon", name: "ginger garlic paste" },
          { quantity: "1/2 teaspoon", name: "salt" }
        ]
      }
    ];
    
    return (
        <div className="lunch-wrapper">
          <div className="hero-section">
            <div className="hero-overlay">
              <h1 className="hero-title">Midday Feasts</h1>
              <p className="hero-subtitle">Discover perfect lunch recipes for your afternoon delight</p>
              <div className="hero-highlights">
                <div className="highlight-box">
                  <span className="highlight-number">30+</span>
                  <span className="highlight-text">Main Courses</span>
                </div>
                <div className="highlight-box">
                  <span className="highlight-number">20min</span>
                  <span className="highlight-text">Quick Lunches</span>
                </div>
                <div className="highlight-box">
                  <span className="highlight-number">4.8</span>
                  <span className="highlight-text">Avg Rating</span>
                </div>
              </div>
            </div>
          </div>
    
          {/* <div className="filter-bar">
            <div className="search-box">
              <input type="text" placeholder="Find your perfect lunch..." />
              <span className="search-icon">🔍</span>
            </div>
            <div className="filter-tags">
              <span className="filter-tag active">All</span>
              <span className="filter-tag">Indian Thali</span>
              <span className="filter-tag">Quick Lunch</span>
              <span className="filter-tag">Vegetarian</span>
              <span className="filter-tag">Non-Vegetarian</span>
            </div>
          </div> */}
    
          <div className="recipes-showcase">
            {Lunch.map(recipe => (
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
                    <span className="spice-level">🌶️ {recipe.spiceLevel || 'Mild'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    };

export default Lunch;

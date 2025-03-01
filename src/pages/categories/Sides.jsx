import React, { useState } from 'react';
import '../../styles/AllCat.css';

const Sides = () => {
    const [setSelectedRecipe] = useState(null);

    const sideRecipes = [
        {
          id: 1,
          title: "Garlic Naan",
          image: "../sides/garlic_naan.jpg",
          rating: 4.9,
          prepTime: "25 minutes",
          description: "Soft and fluffy naan bread flavored with garlic and butter",
          ingredients: [
            { quantity: "2 cups", name: "all-purpose flour" },
            { quantity: "1 teaspoon", name: "baking powder" },
            { quantity: "1/2 teaspoon", name: "salt" },
            { quantity: "1/2 cup", name: "yogurt" },
            { quantity: "1/2 cup", name: "warm water" },
            { quantity: "1 tablespoon", name: "garlic", notes: "minced" },
            { quantity: "2 tablespoons", name: "butter", notes: "melted" }
          ]
        },
        {
          id: 2,
          title: "Jeera Rice",
          image: "../sides/jeera_rice.jpg",
          rating: 4.8,
          prepTime: "20 minutes",
          description: "Aromatic basmati rice flavored with cumin seeds",
          ingredients: [
            { quantity: "1 cup", name: "basmati rice", notes: "soaked" },
            { quantity: "2 cups", name: "water" },
            { quantity: "1 tablespoon", name: "ghee" },
            { quantity: "1 teaspoon", name: "cumin seeds" },
            { quantity: "1/2 teaspoon", name: "salt" },
            { quantity: "1", name: "bay leaf" },
            { quantity: "1", name: "clove" }
          ]
        },
        {
          id: 3,
          title: "Boondi Raita",
          image: "../sides/boondi_raita.jpg",
          rating: 4.7,
          prepTime: "10 minutes",
          description: "Refreshing yogurt dip with crispy boondi and spices",
          ingredients: [
            { quantity: "1 cup", name: "yogurt", notes: "whisked" },
            { quantity: "1/2 cup", name: "boondi" },
            { quantity: "1/2 teaspoon", name: "roasted cumin powder" },
            { quantity: "1/4 teaspoon", name: "black salt" },
            { quantity: "1/2 teaspoon", name: "sugar" },
            { quantity: "1 tablespoon", name: "coriander leaves", notes: "chopped" }
          ]
        },
        {
          id: 4,
          title: "Aloo Gobi",
          image: "../sides/aloo_gobi.jpg",
          rating: 4.9,
          prepTime: "30 minutes",
          description: "Classic dry curry made with potatoes, cauliflower, and spices",
          ingredients: [
            { quantity: "2", name: "potatoes", notes: "diced" },
            { quantity: "1/2", name: "cauliflower", notes: "florets" },
            { quantity: "1", name: "onion", notes: "chopped" },
            { quantity: "1", name: "tomato", notes: "pureed" },
            { quantity: "1 teaspoon", name: "turmeric powder" },
            { quantity: "1 teaspoon", name: "garam masala" },
            { quantity: "1 teaspoon", name: "coriander powder" }
          ]
        },
        {
          id: 5,
          title: "Masala Papad",
          image: "../sides/masala_papad.jpg",
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
        },
        {
          id: 6,
          title: "Mango Chutney",
          image: "../sides/mango_chutney.jpg",
          rating: 4.8,
          prepTime: "15 minutes",
          description: "Sweet and tangy mango chutney with Indian spices",
          ingredients: [
            { quantity: "2", name: "raw mangoes", notes: "peeled and chopped" },
            { quantity: "1/2 cup", name: "sugar" },
            { quantity: "1/2 teaspoon", name: "salt" },
            { quantity: "1 teaspoon", name: "red chili powder" },
            { quantity: "1 teaspoon", name: "mustard seeds" },
            { quantity: "1 tablespoon", name: "vinegar" },
            { quantity: "1/2 teaspoon", name: "cumin powder" }
          ]
        }
      ];
    
      return (
        <div className="desserts-wrapper">
          <div className="hero-section">
            <div className="hero-overlay">
              <h1 className="hero-title">Perfect Accompaniments</h1>
              <p className="hero-subtitle">Elevate your meals with these delightful side dishes</p>
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
            {sideRecipes.map(recipe => (
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
export default Sides;

import React, { useState } from 'react';
import '../../styles/AllCat.css';

const Paleo = () => {
    const [setSelectedRecipe] = useState(null);

    const paleoRecipes = [
        {
          id: 1,
          title: "Grilled Chicken with Roasted Vegetables",
          image: "../paleo/grilled_chicken.jpg",
          rating: 4.9,
          prepTime: "30 minutes",
          description: "Juicy grilled chicken with a side of roasted veggies",
          ingredients: [
            { quantity: "2", name: "chicken breasts", notes: "boneless, skinless" },
            { quantity: "2 tablespoons", name: "olive oil" },
            { quantity: "1 teaspoon", name: "garlic powder" },
            { quantity: "1 teaspoon", name: "paprika" },
            { quantity: "1/2 teaspoon", name: "salt" },
            { quantity: "1/2 teaspoon", name: "black pepper" },
            { quantity: "1 cup", name: "mixed vegetables", notes: "zucchini, bell peppers, carrots" }
          ]
        },
        {
          id: 2,
          title: "Cauliflower Fried Rice",
          image: "../paleo/cauliflower_fried_rice.jpg",
          rating: 4.8,
          prepTime: "20 minutes",
          description: "A delicious paleo-friendly alternative to classic fried rice",
          ingredients: [
            { quantity: "2 cups", name: "cauliflower rice" },
            { quantity: "1/2 cup", name: "carrots", notes: "diced" },
            { quantity: "1/2 cup", name: "green onions", notes: "chopped" },
            { quantity: "2", name: "eggs", notes: "beaten" },
            { quantity: "1 tablespoon", name: "coconut aminos" },
            { quantity: "1 tablespoon", name: "olive oil" },
            { quantity: "1 teaspoon", name: "ginger", notes: "grated" }
          ]
        },
        {
          id: 3,
          title: "Zucchini Noodles with Meatballs",
          image: "../paleo/zucchini_noodles_meatballs.jpg",
          rating: 4.9,
          prepTime: "35 minutes",
          description: "Savory meatballs served with zucchini noodles and marinara sauce",
          ingredients: [
            { quantity: "2", name: "zucchinis", notes: "spiralized" },
            { quantity: "1/2 pound", name: "ground beef" },
            { quantity: "1", name: "egg" },
            { quantity: "1/4 cup", name: "almond flour" },
            { quantity: "1 teaspoon", name: "garlic powder" },
            { quantity: "1 teaspoon", name: "oregano" },
            { quantity: "1 cup", name: "marinara sauce", notes: "sugar-free" }
          ]
        },
        {
          id: 4,
          title: "Baked Salmon with Lemon and Dill",
          image: "../paleo/baked_salmon.jpg",
          rating: 5.0,
          prepTime: "25 minutes",
          description: "Oven-baked salmon fillets with fresh lemon and dill",
          ingredients: [
            { quantity: "2", name: "salmon fillets" },
            { quantity: "1 tablespoon", name: "olive oil" },
            { quantity: "1 teaspoon", name: "lemon juice" },
            { quantity: "1 teaspoon", name: "dill", notes: "fresh, chopped" },
            { quantity: "1/2 teaspoon", name: "salt" },
            { quantity: "1/2 teaspoon", name: "black pepper" },
            { quantity: "1", name: "lemon", notes: "sliced for garnish" }
          ]
        },
        {
          id: 5,
          title: "Sweet Potato and Avocado Breakfast Hash",
          image: "../paleo/sweet_potato_hash.jpg",
          rating: 4.8,
          prepTime: "30 minutes",
          description: "A hearty sweet potato hash with avocado and eggs",
          ingredients: [
            { quantity: "1", name: "sweet potato", notes: "diced" },
            { quantity: "1/2 cup", name: "onion", notes: "chopped" },
            { quantity: "1/2 cup", name: "bell peppers", notes: "chopped" },
            { quantity: "1 tablespoon", name: "olive oil" },
            { quantity: "2", name: "eggs" },
            { quantity: "1", name: "avocado", notes: "sliced" },
            { quantity: "1/2 teaspoon", name: "salt" }
          ]
        },
        {
          id: 6,
          title: "Coconut Chicken Curry",
          image: "../paleo/coconut_curry.jpg",
          rating: 4.9,
          prepTime: "35 minutes",
          description: "A rich and creamy coconut curry with chicken and spices",
          ingredients: [
            { quantity: "2", name: "chicken breasts", notes: "cubed" },
            { quantity: "1 cup", name: "coconut milk" },
            { quantity: "1/2 cup", name: "tomato puree" },
            { quantity: "1 tablespoon", name: "curry powder" },
            { quantity: "1/2 teaspoon", name: "turmeric" },
            { quantity: "1/2 teaspoon", name: "salt" },
            { quantity: "1 tablespoon", name: "olive oil" }
          ]
        }
      ];
    
      return (
        <div className="desserts-wrapper">
          <div className="hero-section">
            <div className="hero-overlay">
              <h1 className="hero-title">Primal & Pure: Paleo Perfection</h1>
              <p className="hero-subtitle">Discover ancestral eating with modern flair</p>
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
            {paleoRecipes.map(recipe => (
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
export default Paleo;

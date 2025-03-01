import React, { useState } from 'react';
import '../../styles/AllCat.css';

const Whole30 = () => {
    const [setSelectedRecipe] = useState(null);

    const whole30Recipes = [
        {
          id: 1,
          title: "Grilled Lemon Garlic Chicken",
          image: "../whole30/lemon_garlic_chicken.jpg",
          rating: 4.9,
          prepTime: "25 minutes",
          description: "Juicy grilled chicken with lemon and garlic seasoning",
          ingredients: [
            { quantity: "2", name: "chicken breasts", notes: "boneless, skinless" },
            { quantity: "2 tablespoons", name: "olive oil" },
            { quantity: "2 cloves", name: "garlic", notes: "minced" },
            { quantity: "1", name: "lemon", notes: "juiced" },
            { quantity: "1 teaspoon", name: "paprika" },
            { quantity: "1/2 teaspoon", name: "salt" },
            { quantity: "1/2 teaspoon", name: "black pepper" }
          ]
        },
        {
          id: 2,
          title: "Cauliflower Rice Stir-Fry",
          image: "../whole30/cauliflower_rice_stir_fry.jpg",
          rating: 4.8,
          prepTime: "20 minutes",
          description: "A delicious, low-carb stir-fry with cauliflower rice",
          ingredients: [
            { quantity: "2 cups", name: "cauliflower rice" },
            { quantity: "1/2 cup", name: "carrots", notes: "diced" },
            { quantity: "1/2 cup", name: "bell peppers", notes: "sliced" },
            { quantity: "1/4 cup", name: "onion", notes: "chopped" },
            { quantity: "1 tablespoon", name: "coconut aminos" },
            { quantity: "1 tablespoon", name: "olive oil" },
            { quantity: "1 teaspoon", name: "ginger", notes: "grated" }
          ]
        },
        {
          id: 3,
          title: "Zucchini Noodles with Avocado Pesto",
          image: "../whole30/zucchini_pesto_noodles.jpg",
          rating: 4.9,
          prepTime: "15 minutes",
          description: "Healthy zucchini noodles tossed in creamy avocado pesto",
          ingredients: [
            { quantity: "2", name: "zucchinis", notes: "spiralized" },
            { quantity: "1", name: "avocado" },
            { quantity: "1/4 cup", name: "fresh basil" },
            { quantity: "2 tablespoons", name: "olive oil" },
            { quantity: "1", name: "garlic clove", notes: "minced" },
            { quantity: "1/2 teaspoon", name: "salt" },
            { quantity: "1/2 teaspoon", name: "lemon juice" }
          ]
        },
        {
          id: 4,
          title: "Sweet Potato Hash with Eggs",
          image: "../whole30/sweet_potato_hash.jpg",
          rating: 5.0,
          prepTime: "30 minutes",
          description: "A nutritious sweet potato and egg breakfast hash",
          ingredients: [
            { quantity: "1", name: "sweet potato", notes: "diced" },
            { quantity: "1/2 cup", name: "onion", notes: "chopped" },
            { quantity: "1/2 cup", name: "bell peppers", notes: "chopped" },
            { quantity: "1 tablespoon", name: "olive oil" },
            { quantity: "2", name: "eggs" },
            { quantity: "1/2 teaspoon", name: "salt" },
            { quantity: "1/2 teaspoon", name: "black pepper" }
          ]
        },
        {
          id: 5,
          title: "Baked Salmon with Garlic and Herbs",
          image: "../whole30/baked_salmon.jpg",
          rating: 4.8,
          prepTime: "25 minutes",
          description: "Oven-baked salmon with a flavorful herb crust",
          ingredients: [
            { quantity: "2", name: "salmon fillets" },
            { quantity: "1 tablespoon", name: "olive oil" },
            { quantity: "2 cloves", name: "garlic", notes: "minced" },
            { quantity: "1 teaspoon", name: "dried oregano" },
            { quantity: "1/2 teaspoon", name: "salt" },
            { quantity: "1/2 teaspoon", name: "black pepper" },
            { quantity: "1", name: "lemon", notes: "sliced" }
          ]
        },
        {
          id: 6,
          title: "Coconut Curry Chicken",
          image: "../whole30/coconut_curry_chicken.jpg",
          rating: 4.9,
          prepTime: "35 minutes",
          description: "Rich and creamy coconut curry chicken",
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
              <h1 className="hero-title">30 Days to a Better You</h1>
              <p className="hero-subtitle">Clean, wholesome recipes that nourish body and soul</p>
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
            {whole30Recipes.map(recipe => (
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
export default Whole30;

import React, { useState } from 'react';
import '../../styles/AllCat.css';

const Keto = () => {
    const [setSelectedRecipe] = useState(null);

    const ketoRecipes = [
        {
          id: 1,
          title: "Keto Butter Chicken",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRSOBfEag9GHFrxriO65pEs5vA9HO_N0itnQ&s",
          rating: 4.9,
          prepTime: "30 minutes",
          description: "Creamy and rich butter chicken with a keto-friendly sauce",
          ingredients: [
            { quantity: "1 lb", name: "chicken breast", notes: "cubed" },
            { quantity: "1/2 cup", name: "heavy cream" },
            { quantity: "2 tablespoons", name: "butter" },
            { quantity: "1/2 cup", name: "tomato puree" },
            { quantity: "1 teaspoon", name: "garam masala" },
            { quantity: "1 teaspoon", name: "turmeric" },
            { quantity: "1 teaspoon", name: "garlic", notes: "minced" },
            { quantity: "1/2 teaspoon", name: "salt" }
          ]
        },
        {
          id: 2,
          title: "Keto Cauliflower Mac and Cheese",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxr8TBUNTO6rrHitYox4Wfv9yxsCLVC9-xTg&s",
          rating: 4.8,
          prepTime: "20 minutes",
          description: "Cheesy and creamy mac and cheese made with cauliflower",
          ingredients: [
            { quantity: "2 cups", name: "cauliflower", notes: "chopped" },
            { quantity: "1 cup", name: "cheddar cheese", notes: "shredded" },
            { quantity: "1/2 cup", name: "heavy cream" },
            { quantity: "2 tablespoons", name: "butter" },
            { quantity: "1/2 teaspoon", name: "salt" },
            { quantity: "1/4 teaspoon", name: "black pepper" },
            { quantity: "1/2 teaspoon", name: "paprika" }
          ]
        },
        {
          id: 3,
          title: "Keto Avocado Bacon Salad",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE2ccLXdd9BXwJd7bn1N7yl0G4VtD2FS_48w&s",
          rating: 4.9,
          prepTime: "10 minutes",
          description: "Fresh salad with crispy bacon and creamy avocado",
          ingredients: [
            { quantity: "2", name: "avocados", notes: "diced" },
            { quantity: "4 slices", name: "bacon", notes: "cooked and crumbled" },
            { quantity: "2 cups", name: "lettuce", notes: "chopped" },
            { quantity: "1/4 cup", name: "olive oil" },
            { quantity: "1 tablespoon", name: "lemon juice" },
            { quantity: "1/2 teaspoon", name: "salt" },
            { quantity: "1/2 teaspoon", name: "black pepper" }
          ]
        },
        {
          id: 4,
          title: "Keto Garlic Butter Steak",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU7nmUNRez4x9qQ2psMchj2NvST7IJ43Ksag&s",
          rating: 5.0,
          prepTime: "20 minutes",
          description: "Juicy steak cooked in garlic butter for maximum flavor",
          ingredients: [
            { quantity: "1 lb", name: "ribeye steak" },
            { quantity: "3 tablespoons", name: "butter" },
            { quantity: "3 cloves", name: "garlic", notes: "minced" },
            { quantity: "1 teaspoon", name: "salt" },
            { quantity: "1/2 teaspoon", name: "black pepper" },
            { quantity: "1 teaspoon", name: "fresh rosemary" }
          ]
        },
        {
          id: 5,
          title: "Keto Zucchini Lasagna",
          image: "https://www.allrecipes.com/thmb/kuPeHUeeKvxJjV6pLel-AFi016M=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/261026_UltimateLowCarbZucchiniLasagne_MFS_182-1-2x1-dec427f468f24181b1c2778ccae13735.jpg",
          rating: 4.7,
          prepTime: "40 minutes",
          description: "Delicious lasagna made with zucchini instead of pasta",
          ingredients: [
            { quantity: "2", name: "zucchini", notes: "sliced lengthwise" },
            { quantity: "1/2 lb", name: "ground beef" },
            { quantity: "1/2 cup", name: "ricotta cheese" },
            { quantity: "1/2 cup", name: "mozzarella cheese", notes: "shredded" },
            { quantity: "1/2 cup", name: "tomato sauce" },
            { quantity: "1/2 teaspoon", name: "oregano" },
            { quantity: "1/2 teaspoon", name: "garlic powder" }
          ]
        },
        {
          id: 6,
          title: "Keto Chocolate Mousse",
          image: "https://healthyrecipesblogs.com/wp-content/uploads/2019/10/keto-chocolate-mousse-featured-2021.jpg",
          rating: 4.9,
          prepTime: "10 minutes",
          description: "Creamy chocolate mousse with no added sugar",
          ingredients: [
            { quantity: "1/2 cup", name: "heavy cream" },
            { quantity: "2 tablespoons", name: "cocoa powder" },
            { quantity: "1 tablespoon", name: "erythritol" },
            { quantity: "1/2 teaspoon", name: "vanilla extract" },
            { quantity: "1/4 teaspoon", name: "salt" }
          ]
        }
      ];
    
      return (
        <div className="desserts-wrapper">
          <div className="hero-section">
            <div className="hero-overlay">
              <h1 className="hero-title">Keto Kitchen Magic</h1>
              <p className="hero-subtitle">Transform Your Meals with Fat-Fueled Flavors</p>
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
            {ketoRecipes.map(recipe => (
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
export default Keto;

import React, { useState } from 'react';
import '../../styles/AllCat.css';

const Veg = () => {
    const [setSelectedRecipe] = useState(null);

    const vegetarianRecipes = [
        {
          id: 1,
          title: "Vegetable Stir-Fry",
          image: "../vegetarian/vegetable_stir_fry.jpg",
          rating: 4.8,
          prepTime: "20 minutes",
          description: "Colorful stir-fried vegetables in a savory garlic sauce",
          ingredients: [
            { quantity: "1 cup", name: "broccoli", notes: "chopped" },
            { quantity: "1 cup", name: "carrots", notes: "sliced" },
            { quantity: "1 cup", name: "bell peppers", notes: "sliced" },
            { quantity: "2 tablespoons", name: "soy sauce" },
            { quantity: "1 tablespoon", name: "olive oil" },
            { quantity: "2 cloves", name: "garlic", notes: "minced" },
            { quantity: "1/2 teaspoon", name: "black pepper" }
          ]
        },
        {
          id: 2,
          title: "Chickpea Salad",
          image: "../vegetarian/chickpea_salad.jpg",
          rating: 4.9,
          prepTime: "10 minutes",
          description: "Refreshing and protein-packed chickpea salad",
          ingredients: [
            { quantity: "1 can", name: "chickpeas", notes: "drained and rinsed" },
            { quantity: "1/2 cup", name: "cucumber", notes: "diced" },
            { quantity: "1/2 cup", name: "tomatoes", notes: "diced" },
            { quantity: "1/4 cup", name: "red onion", notes: "chopped" },
            { quantity: "1 tablespoon", name: "olive oil" },
            { quantity: "1 tablespoon", name: "lemon juice" },
            { quantity: "1/2 teaspoon", name: "salt" }
          ]
        },
        {
          id: 3,
          title: "Spinach and Paneer Curry",
          image: "../vegetarian/spinach_paneer_curry.jpg",
          rating: 4.9,
          prepTime: "30 minutes",
          description: "Creamy spinach curry with soft paneer cubes",
          ingredients: [
            { quantity: "2 cups", name: "spinach", notes: "chopped" },
            { quantity: "1 cup", name: "paneer", notes: "cubed" },
            { quantity: "1/2 cup", name: "tomatoes", notes: "pureed" },
            { quantity: "1/2 teaspoon", name: "turmeric" },
            { quantity: "1 teaspoon", name: "garam masala" },
            { quantity: "1 tablespoon", name: "butter" },
            { quantity: "1/2 teaspoon", name: "salt" }
          ]
        },
        {
          id: 4,
          title: "Lentil Soup",
          image: "../vegetarian/lentil_soup.jpg",
          rating: 5.0,
          prepTime: "35 minutes",
          description: "Hearty and nutritious lentil soup with aromatic spices",
          ingredients: [
            { quantity: "1 cup", name: "red lentils", notes: "rinsed" },
            { quantity: "1/2 cup", name: "carrots", notes: "diced" },
            { quantity: "1/2 cup", name: "onion", notes: "chopped" },
            { quantity: "2 cloves", name: "garlic", notes: "minced" },
            { quantity: "1 teaspoon", name: "cumin powder" },
            { quantity: "1/2 teaspoon", name: "turmeric" },
            { quantity: "4 cups", name: "vegetable broth" }
          ]
        },
        {
          id: 5,
          title: "Stuffed Bell Peppers",
          image: "../vegetarian/stuffed_bell_peppers.jpg",
          rating: 4.7,
          prepTime: "40 minutes",
          description: "Bell peppers filled with a savory rice and veggie mixture",
          ingredients: [
            { quantity: "3", name: "bell peppers", notes: "halved and deseeded" },
            { quantity: "1 cup", name: "cooked rice" },
            { quantity: "1/2 cup", name: "black beans" },
            { quantity: "1/2 cup", name: "corn kernels" },
            { quantity: "1/2 teaspoon", name: "cumin" },
            { quantity: "1/2 teaspoon", name: "paprika" },
            { quantity: "1/4 cup", name: "cheese", notes: "shredded" }
          ]
        },
        {
          id: 6,
          title: "Vegetable Pasta",
          image: "../vegetarian/vegetable_pasta.jpg",
          rating: 4.9,
          prepTime: "25 minutes",
          description: "Delicious pasta tossed with fresh vegetables and herbs",
          ingredients: [
            { quantity: "2 cups", name: "pasta", notes: "cooked" },
            { quantity: "1/2 cup", name: "zucchini", notes: "sliced" },
            { quantity: "1/2 cup", name: "mushrooms", notes: "sliced" },
            { quantity: "1/2 cup", name: "tomatoes", notes: "diced" },
            { quantity: "2 tablespoons", name: "olive oil" },
            { quantity: "1/2 teaspoon", name: "basil" },
            { quantity: "1/2 teaspoon", name: "salt" }
          ]
        }
      ];
    
      return (
        <div className="desserts-wrapper">
          <div className="hero-section">
            <div className="hero-overlay">
              <h1 className="hero-title">Veggie Paradise</h1>
              <p className="hero-subtitle">Discover the Art of Meatless Magic</p>
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
            {vegetarianRecipes.map(recipe => (
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
export default Veg;

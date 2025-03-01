import React, { useState } from 'react';
import '../../styles/AllCat.css';

const Italian = () => {
    const [setSelectedRecipe] = useState(null);

    const italianRecipes = [
        {
          id: 1,
          title: "Margherita Pizza",
          image: "../italian/margherita_pizza.jpg",
          rating: 4.8,
          prepTime: "30 minutes",
          description: "Classic Italian pizza topped with fresh tomatoes, basil, and mozzarella",
          ingredients: [
            { quantity: "1", name: "pizza dough" },
            { quantity: "1/2 cup", name: "tomato sauce" },
            { quantity: "1 cup", name: "mozzarella", notes: "sliced" },
            { quantity: "1 teaspoon", name: "olive oil" },
            { quantity: "5-6", name: "fresh basil leaves" }
          ]
        },
        {
          id: 2,
          title: "Spaghetti Carbonara",
          image: "../italian/spaghetti_carbonara.jpg",
          rating: 4.9,
          prepTime: "25 minutes",
          description: "Creamy pasta with pancetta, eggs, Parmesan, and black pepper",
          ingredients: [
            { quantity: "200g", name: "spaghetti" },
            { quantity: "100g", name: "pancetta", notes: "diced" },
            { quantity: "2", name: "eggs" },
            { quantity: "1/2 cup", name: "Parmesan cheese", notes: "grated" },
            { quantity: "1 teaspoon", name: "black pepper" }
          ]
        },
        {
          id: 3,
          title: "Lasagna",
          image: "../italian/lasagna.jpg",
          rating: 4.7,
          prepTime: "1 hour",
          description: "Layers of pasta, meat sauce, ricotta, and cheese baked to perfection",
          ingredients: [
            { quantity: "12", name: "lasagna noodles" },
            { quantity: "500g", name: "ground beef" },
            { quantity: "2 cups", name: "tomato sauce" },
            { quantity: "1 cup", name: "ricotta cheese" },
            { quantity: "1 cup", name: "mozzarella", notes: "shredded" }
          ]
        },
        {
          id: 4,
          title: "Minestrone Soup",
          image: "../italian/minestrone_soup.jpg",
          rating: 4.6,
          prepTime: "40 minutes",
          description: "Hearty vegetable soup with beans, pasta, and Italian herbs",
          ingredients: [
            { quantity: "1", name: "onion", notes: "chopped" },
            { quantity: "2", name: "carrots", notes: "diced" },
            { quantity: "1 cup", name: "kidney beans" },
            { quantity: "1/2 cup", name: "small pasta" },
            { quantity: "1 teaspoon", name: "Italian seasoning" }
          ]
        },
        {
          id: 5,
          title: "Risotto alla Milanese",
          image: "../italian/risotto_milanese.jpg",
          rating: 4.8,
          prepTime: "35 minutes",
          description: "Creamy saffron-infused risotto with Parmesan and butter",
          ingredients: [
            { quantity: "1 cup", name: "Arborio rice" },
            { quantity: "4 cups", name: "chicken broth" },
            { quantity: "1/2 teaspoon", name: "saffron" },
            { quantity: "1/2 cup", name: "Parmesan cheese", notes: "grated" },
            { quantity: "2 tablespoons", name: "butter" }
          ]
        },
        {
          id: 6,
          title: "Tiramisu",
          image: "../italian/tiramisu.jpg",
          rating: 5.0,
          prepTime: "20 minutes + chilling time",
          description: "Classic Italian dessert made with layers of coffee-soaked ladyfingers and mascarpone cream",
          ingredients: [
            { quantity: "200g", name: "ladyfingers" },
            { quantity: "1 cup", name: "espresso" },
            { quantity: "250g", name: "mascarpone cheese" },
            { quantity: "2", name: "eggs" },
            { quantity: "2 tablespoons", name: "cocoa powder" }
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
            {italianRecipes.map(recipe => (
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
export default Italian;


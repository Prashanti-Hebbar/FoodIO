import React, { useState } from 'react';
import '../../styles/AllCat.css';

const Mexican = () => {
    const [setSelectedRecipe] = useState(null);

    const mexicanRecipes = [
        {
          id: 1,
          title: "Tacos al Pastor",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXiNsnnAfPLpQdWnxXVBCSpen0f_Prp31lig&s",
          rating: 4.9,
          prepTime: "30 minutes",
          description: "Traditional Mexican tacos with marinated pork, pineapple, and onions",
          ingredients: [
            { quantity: "500g", name: "pork", notes: "thinly sliced" },
            { quantity: "1/2 cup", name: "pineapple", notes: "diced" },
            { quantity: "1 teaspoon", name: "cumin" },
            { quantity: "1 teaspoon", name: "paprika" },
            { quantity: "8", name: "corn tortillas" }
          ]
        },
        {
          id: 2,
          title: "Guacamole",
          image: "https://www.allrecipes.com/thmb/6RyFPH5N4KKmZhNY0Giob_Jj3wc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-14231-guacamole-4x3-f7a3b5752c7f4f3fb934d03a8b548826.jpg",
          rating: 4.8,
          prepTime: "10 minutes",
          description: "Creamy avocado dip with lime, tomatoes, and cilantro",
          ingredients: [
            { quantity: "2", name: "avocados", notes: "mashed" },
            { quantity: "1", name: "lime", notes: "juiced" },
            { quantity: "1", name: "tomato", notes: "diced" },
            { quantity: "1/4 cup", name: "onion", notes: "chopped" },
            { quantity: "1 tablespoon", name: "cilantro", notes: "chopped" }
          ]
        },
        {
          id: 3,
          title: "Chiles Rellenos",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2NdusYL2SpEF52z1TEihwWUM6A9JHmAoNPg&s",
          rating: 4.7,
          prepTime: "40 minutes",
          description: "Poblano peppers stuffed with cheese and coated in a light egg batter",
          ingredients: [
            { quantity: "4", name: "poblano peppers" },
            { quantity: "1 cup", name: "cheese", notes: "shredded" },
            { quantity: "2", name: "eggs", notes: "separated" },
            { quantity: "1/2 cup", name: "flour" },
            { quantity: "1/2 cup", name: "tomato sauce" }
          ]
        },
        {
          id: 4,
          title: "Enchiladas Verdes",
          image: "https://hips.hearstapps.com/hmg-prod/images/enchiladas-verdes-recipe-2-1659537049.jpg?crop=0.6666666666666667xw:1xh;center,top&resize=1200:*",
          rating: 4.9,
          prepTime: "35 minutes",
          description: "Corn tortillas filled with chicken and topped with green tomatillo sauce",
          ingredients: [
            { quantity: "8", name: "corn tortillas" },
            { quantity: "2 cups", name: "chicken", notes: "shredded" },
            { quantity: "1 cup", name: "tomatillo sauce" },
            { quantity: "1/2 cup", name: "sour cream" },
            { quantity: "1/2 cup", name: "cheese", notes: "grated" }
          ]
        },
        {
          id: 5,
          title: "Tamales",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwjPNq42hUDYUlC8C-MpbVMjaAG9UO7PZ-1Q&s",
          rating: 4.8,
          prepTime: "1 hour",
          description: "Corn masa filled with meat or cheese, wrapped in corn husks and steamed",
          ingredients: [
            { quantity: "2 cups", name: "masa harina" },
            { quantity: "1 cup", name: "chicken broth" },
            { quantity: "1/2 cup", name: "lard" },
            { quantity: "1 cup", name: "chicken", notes: "shredded" },
            { quantity: "10", name: "corn husks", notes: "soaked" }
          ]
        },
        {
          id: 6,
          title: "Churros",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZpJgGjJcAB2M9aWSUPMFFC4ZGsYZrS7GKqw&s",
          rating: 5.0,
          prepTime: "25 minutes",
          description: "Crispy fried dough coated in cinnamon sugar, served with chocolate sauce",
          ingredients: [
            { quantity: "1 cup", name: "flour" },
            { quantity: "1 cup", name: "water" },
            { quantity: "2 tablespoons", name: "butter" },
            { quantity: "1/2 cup", name: "sugar" },
            { quantity: "1 teaspoon", name: "cinnamon" }
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
            {mexicanRecipes.map(recipe => (
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
export default Mexican;


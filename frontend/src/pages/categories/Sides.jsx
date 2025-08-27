import React, { useState } from 'react';
import '../../styles/AllCat.css';
import recipes from '../../data/recipes';

const Sides = () => {
    const [setSelectedRecipe] = useState(null);
    
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
            {recipes["sides"].map(recipe => (
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

import React, { useState } from 'react';
import '../../styles/AllCat.css';
import recipes from '../../data/recipes';

const Lunch = () => {
    const [setSelectedRecipe] = useState(null);

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
            {recipes["lunch"].map(recipe => (
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

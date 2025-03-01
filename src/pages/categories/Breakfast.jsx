import React, { useState } from "react";
import "../../styles/AllCat.css";

const Breakfast = () => {
  const [setSelectedRecipe] = useState(null);

  const breakfastRecipes = [
    { id: 19, title: "Poha", image: "../ban.jpg", rating: 4.6 },
    {id: 20,title: "Aloo Paratha",image: "../aloo_paratha.jpg",rating: 4.7},
    { id: 21, title: "Upma", image: "../upma.jpg", rating: 4.5 },
    { id: 22, title: "Dosa", image: "../dosa.jpg", rating: 4.8 },
    { id: 23, title: "Idli", image: "../idli.jpg", rating: 4.6 },
    {id: 24,title: "Besan Chilla",image: "../besan_chilla.jpg",rating: 4.4},
  ];

  return (
    <div className="breakfast-wrapper">
      {/* Stylish Hero Section */}
      <div className="hero-section">
        <div className="hero-overlay">
          <h1 className="hero-title">Morning Delights</h1>
          <p className="hero-subtitle">
            Curated breakfast recipes for a perfect start
          </p>
          <div className="hero-highlights">
            <div className="highlight-box">
              <span className="highlight-number">25+</span>
              <span className="highlight-text">Recipes</span>
            </div>
            <div className="highlight-box">
              <span className="highlight-number">15min</span>
              <span className="highlight-text">Quick Meals</span>
            </div>
            <div className="highlight-box">
              <span className="highlight-number">4.9</span>
              <span className="highlight-text">Avg Rating</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Filter Bar */}
      {/* <div className="filter-bar">
        <div className="search-box">
          <input type="text" placeholder="Search recipes..." />
          <span className="search-icon">🔍</span>
        </div>
        <div className="filter-tags">
          <span className="filter-tag active">All</span>
          <span className="filter-tag">Quick & Easy</span>
          <span className="filter-tag">Indian</span>
          <span className="filter-tag">Healthy</span>
          <span className="filter-tag">Continental</span>
        </div>
      </div> */}

      {/* Recipe Grid */}
      <div className="recipes-showcase">
        {breakfastRecipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <div className="card-media">
              <img src={recipe.image} alt={recipe.title} />
              <div className="card-badges">
                <span className="time-badge">⏱️ {recipe.prepTime}</span>
                <span className="rating-badge">★ {recipe.rating}</span>
              </div>
              <div className="card-overlay">
                <a
                  href={`/ViewRecipe?id=${recipe.id}`}
                  className="btn btn-primary"
                >
                  View Recipe
                </a>
              </div>
            </div>
            <div className="card-content">
              <h3>{recipe.title}</h3>
              <div className="recipe-tags">
                {recipe.tags?.map((tag) => (
                  <span key={tag} className="recipe-tag">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="recipe-description">{recipe.description}</p>
              <div className="recipe-footer">
                <span className="servings">🍽️ {recipe.servings} servings</span>
                <span className="difficulty">
                  {recipe.difficulty || "Easy"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Breakfast;

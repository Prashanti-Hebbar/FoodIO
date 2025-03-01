import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/AllCat.css";

const Breakfast = () => {
  const navigate = useNavigate();
  const [setSelectedRecipe] = useState(null);

  const breakfastRecipes = [
    { id: 19, title: "Poha", image: "../ban.jpg", rating: 4.6 },
    {id: 20,title: "Aloo Paratha",image: "../aloo_paratha.jpg",rating: 4.7},
    { id: 21, title: "Upma", image: "../upma.jpg", rating: 4.5 },
    { id: 22, title: "Dosa", image: "../dosa.jpg", rating: 4.8 },
    { id: 23, title: "Idli", image: "../idli.jpg", rating: 4.6 },
    {id: 24,title: "Besan Chilla",image: "../besan_chilla.jpg",rating: 4.4},
  ];

  const handleFavorite = (recipeId) => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    const recipeToAdd = breakfastRecipes.find(r => r.id === recipeId);
    
    if (!favoriteRecipes.some(r => r.id === recipeId)) {
        favoriteRecipes.push(recipeToAdd);
    } else {
        const index = favoriteRecipes.findIndex(r => r.id === recipeId);
        favoriteRecipes.splice(index, 1);
    }
    
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  };

  const handleSave = (recipeId) => {
    const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
    const recipeToAdd = breakfastRecipes.find(r => r.id === recipeId);
    
    if (!savedRecipes.some(r => r.id === recipeId)) {
        savedRecipes.push(recipeToAdd);
    } else {
        const index = savedRecipes.findIndex(r => r.id === recipeId);
        savedRecipes.splice(index, 1);
    }
    
    localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
  };

  const handleShare = (recipe) => {
    if (navigator.share) {
        navigator.share({
            title: recipe.title,
            text: `Check out this recipe for ${recipe.title}!`,
            url: window.location.href
        });
    } else {
        const shareDialog = document.createElement('dialog');
        shareDialog.innerHTML = `
            <div class="share-options p-3">
                <h5>Share Recipe</h5>
                <button onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${window.location.href}')">
                    <i class="fab fa-facebook"></i> Facebook
                </button>
                <button onclick="window.open('https://twitter.com/intent/tweet?text=${recipe.title}&url=${window.location.href}')">
                    <i class="fab fa-twitter"></i> Twitter
                </button>
                <button onclick="window.open('https://wa.me/?text=${recipe.title} ${window.location.href}')">
                    <i class="fab fa-whatsapp"></i> WhatsApp
                </button>
            </div>
        `;
        document.body.appendChild(shareDialog);
        shareDialog.showModal();
    }
  };

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
              <div className="card-actions position-absolute end-0 m-2">
                <button 
                    className={`btn btn-link ${recipe.isFavorite ? 'text-danger' : 'text-white'}`}
                    onClick={() => handleFavorite(recipe.id)}
                >
                    <i className="fas fa-star"></i>
                </button>
                <button 
                    className={`btn btn-link ${recipe.isSaved ? 'text-primary' : 'text-white'}`}
                    onClick={() => handleSave(recipe.id)}
                >
                    <i className="fas fa-bookmark"></i>
                </button>
                <button 
                    className="btn btn-link text-white"
                    onClick={() => handleShare(recipe)}
                >
                    <i className="fas fa-share-alt"></i>
                </button>
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
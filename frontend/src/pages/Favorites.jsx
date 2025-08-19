import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useGetUserID } from '../hooks/useGetUserID';
import '../styles/Favorites.css';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const userID = useGetUserID();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userID) {
      navigate('/login');
      return;
    }
    fetchFavorites();
  }, [userID, navigate]);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3001/favorites', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setFavorites(response.data);
    } catch (err) {
      setError('Failed to load favorites');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const removeFromFavorites = async (recipeId) => {
    try {
      await axios.delete(`http://localhost:3001/favorites/${recipeId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      // Remove from local state
      setFavorites(favorites.filter(recipe => recipe._id !== recipeId));
    } catch (err) {
      console.error('Failed to remove from favorites:', err);
    }
  };

  const handleRecipeClick = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
  };

  if (loading) {
    return (
      <div className="favorites-container">
        <div className="loading">Loading your favorites...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="favorites-container">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="favorites-container">
      <h1>My Favorites</h1>
      {favorites.length === 0 ? (
        <div className="no-favorites">
          <p>You haven't added any recipes to your favorites yet.</p>
          <button onClick={() => navigate('/')} className="browse-btn">
            Browse Recipes
          </button>
        </div>
      ) : (
        <div className="favorites-grid">
          {favorites.map((recipe) => (
            <div key={recipe._id} className="favorite-card">
              <div className="recipe-image" onClick={() => handleRecipeClick(recipe._id)}>
                <img src={recipe.photo} alt={recipe.title} />
                <div className="recipe-overlay">
                  <h3>{recipe.title}</h3>
                </div>
              </div>
              <div className="recipe-info">
                <div className="recipe-stats">
                  <span className="rating">
                    ⭐ {recipe.averageRating.toFixed(1)} ({recipe.totalRatings})
                  </span>
                  <span className="favorites">
                    ❤️ {recipe.favoritesCount}
                  </span>
                </div>
                <div className="recipe-time">
                  <span>Prep: {recipe.prepTime}min</span>
                  <span>Cook: {recipe.cookTime}min</span>
                </div>
                <button
                  onClick={() => removeFromFavorites(recipe._id)}
                  className="remove-favorite-btn"
                >
                  Remove from Favorites
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites; 
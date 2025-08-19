import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useGetUserID } from '../hooks/useGetUserID';
import '../styles/FavoriteButton.css';

const FavoriteButton = ({ recipeId, onFavoriteChange }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [loading, setLoading] = useState(false);
  const userID = useGetUserID();

  useEffect(() => {
    if (!recipeId) return;

    // Prefer backend when logged in, otherwise fall back to localStorage
    if (userID) {
      checkFavoriteStatus();
    } else {
      const local = JSON.parse(localStorage.getItem('localFavorites') || '{}');
      setIsFavorited(!!local[recipeId]);
    }
  }, [userID, recipeId]);

  const checkFavoriteStatus = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/favorites/check/${recipeId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setIsFavorited(response.data.isFavorited);
    } catch (err) {
      console.error('Failed to check favorite status:', err);
    }
  };

  const toggleFavorite = async () => {
    try {
      setLoading(true);

      // If logged in, try backend first
      if (userID) {
        if (isFavorited) {
          await axios.delete(`http://localhost:3001/favorites/${recipeId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
        } else {
          await axios.post('http://localhost:3001/favorites', 
            { recipeId },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            }
          );
        }
        setIsFavorited(!isFavorited);
      } else {
        // Local fallback when not logged in
        const local = JSON.parse(localStorage.getItem('localFavorites') || '{}');
        if (local[recipeId]) {
          delete local[recipeId];
        } else {
          local[recipeId] = true;
        }
        localStorage.setItem('localFavorites', JSON.stringify(local));
        setIsFavorited(!!local[recipeId]);
      }

      if (onFavoriteChange) {
        onFavoriteChange(!isFavorited);
      }
    } catch (err) {
      console.error('Failed to toggle favorite:', err);
      // Graceful local fallback if backend fails
      const local = JSON.parse(localStorage.getItem('localFavorites') || '{}');
      if (local[recipeId]) {
        delete local[recipeId];
      } else {
        local[recipeId] = true;
      }
      localStorage.setItem('localFavorites', JSON.stringify(local));
      setIsFavorited(!!local[recipeId]);
      if (onFavoriteChange) onFavoriteChange(!!local[recipeId]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={`favorite-btn ${isFavorited ? 'favorited' : ''} ${loading ? 'loading' : ''}`}
      onClick={toggleFavorite}
      disabled={loading}
      title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isFavorited ? '❤️' : '🤍'}
    </button>
  );
};

export default FavoriteButton; 
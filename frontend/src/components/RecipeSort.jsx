import React from 'react';
import '../styles/RecipeSort.css';

const RecipeSort = ({ sortBy, sortOrder, onSortChange }) => {
  const handleSortChange = (newSortBy) => {
    let newSortOrder = 'desc';
    
    // If clicking the same sort option, toggle order
    if (sortBy === newSortBy) {
      newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    }
    
    onSortChange(newSortBy, newSortOrder);
  };

  const getSortIcon = (option) => {
    if (sortBy !== option) return '↕️';
    return sortOrder === 'asc' ? '↑' : '↓';
  };

  return (
    <div className="recipe-sort">
      <span className="sort-label">Sort by:</span>
      <div className="sort-options">
        <button
          className={`sort-btn ${sortBy === 'createdAt' ? 'active' : ''}`}
          onClick={() => handleSortChange('createdAt')}
        >
          Latest {getSortIcon('createdAt')}
        </button>
        <button
          className={`sort-btn ${sortBy === 'rating' ? 'active' : ''}`}
          onClick={() => handleSortChange('rating')}
        >
          Rating {getSortIcon('rating')}
        </button>
        <button
          className={`sort-btn ${sortBy === 'favorites' ? 'active' : ''}`}
          onClick={() => handleSortChange('favorites')}
        >
          Favorites {getSortIcon('favorites')}
        </button>
        <button
          className={`sort-btn ${sortBy === 'reviews' ? 'active' : ''}`}
          onClick={() => handleSortChange('reviews')}
        >
          Reviews {getSortIcon('reviews')}
        </button>
      </div>
    </div>
  );
};

export default RecipeSort; 
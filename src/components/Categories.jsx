import React from 'react';
import { Link } from 'react-router-dom';
import '../Categories.css';
// import { title } from 'process';

const Categories = () => {
  const categoryGroups = [
    {
      title: 'Meal Type',
      items: ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Appetizers', 'Sides', 'Snacks', 'Drinks'],
      icon: '🍽️',
      color: '#FF6B6B'
    },
    {
      title: 'Diet',
      items: ['LowCarb', 'Keto', 'Vegetarian', 'Whole30', 'Paleo'],
      icon: '🥗',
      color: '#4ECDC4'
    },
    {
      title: 'Cuisine',
      items: ['Indian', 'Italian', 'Mexican','Japanese'],
      icon: '🌎',
      color: '#45B7D1'
    },
    {
      title: 'Main Ingredient',
      items: ['Chicken', 'Beef', 'Pasta', 'Fish'],
      icon: '🥩',
      color: '#96CEB4'
    },
    {
      title: 'Cooking Method',
      items: ['InstantPot', 'AirFryer', 'SlowCooker'],
      icon: '👨‍🍳',
      color: '#D4A5A5'
    },
    {
        title: 'Time to prepare or difficulty',
        items: ['30minutemeals', 'onepotmeals'],
        icon: '⏱️',
        color: '#FF6B6B'
    }
  ];
  

  return (
    <div className="categories-wrapper">
      <div className="categories-hero">
        <h1>Foodio Collections</h1>
        <p>Explore our handpicked recipe categories</p>
      </div>
      
      <div className="categories-container">
        {categoryGroups.map((group) => (
          <div 
            className="category-card" 
            key={group.title}
            style={{'--card-color': group.color}}
          >
            <div className="card-header">
              <span className="card-icon">{group.icon}</span>
              <h2>{group.title}</h2>
            </div>
            <div className="card-content">
              {group.items.map((item) => (
                <Link 
                  to={`/recipes/${item.toLowerCase()}`} 
                  className="category-tag"
                  key={item}
                >
                  <span>{item}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;

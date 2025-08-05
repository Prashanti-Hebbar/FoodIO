import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Categories.css';

const Categories = () => {
  const [isLoading, setIsLoading] = useState(null);

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
      items: ['Indian', 'Italian', 'Mexican', 'Japanese'],
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
      title: 'Time to Prepare or Difficulty',
      items: ['30 minute meals', 'one pot meals'],
      icon: '⏱️',
      color: '#FF6B6B'
    }
  ];

  return (
    <div className="categories-wrapper">
      <div className="categories-hero">
        <div className="row" style={{ display: "flex", alignItems: "center" }}>
          <div className="col-8">
            <h1 style={{ fontSize: "4.5rem", fontWeight: "bold", color: "#fa5a4a" }}>
              Foodio Collections
            </h1>
            <p style={{ fontSize: "1.2rem", color: "#6c7a89" }}>
              Explore Curated Collections. Experience Endless Flavor!
            </p>
          </div>
          <div className="col-4">
            <img src="/menu.jpg" alt="menu-img" style={{ height: "200px"}} />
          </div>
        </div>
      </div>

      <div className="categories-container">
        {categoryGroups.map((group) => (
          <div
            className="category-card"
            key={group.title}
            style={{ '--card-color': group.color }}
          >
            <div className="card-header">
              <span className="card-icon">{group.icon}</span>
              <h2>{group.title}</h2>
            </div>

            <div className="wrapper">
              <div className="collapsible">
                <input type="checkbox" id={`collapsible-${group.title}`} />
                <label htmlFor={`collapsible-${group.title}`}>
                  What's on your mind?
                </label>
                <div className="collapsible-text">
                  {group.items.map((item) => (
                    <Link
                      to={`/recipes/${item.toLowerCase()}`}
                      key={item}
                    >
                      <span>{item}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;

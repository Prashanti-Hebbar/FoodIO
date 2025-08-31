import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../Categories.css';

const Categories = () => {

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100,
    });
  }, []);

  const categoryGroups = [
    {
      title: 'Meal Type',
      items: ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Appetizers', 'Sides', 'Snacks', 'Drinks'],
      icon: '🍽️',
      color: '#FF6B6B'
    },
    {
      title: 'Diet',
      items: ['LowCarb', 'Keto', 'Vegetarian', 'Whole30', 'Paleo', 'GlutenFree', 'Vegan'],
      icon: '🥗',
      color: '#4ECDC4'
    },
    {
      title: 'Cuisine',
      items: ['Italian', 'Mexican', 'Japanese'],
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
  <div className="relative min-h-screen overflow-hidden">
    {/* Blurred background image */}
    <div
      className="absolute inset-0 bg-cover bg-center  blur-sm bg-white/20 z-0"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    />


    {/* Your original content */}
    <div className="relative z-10 categories-wrapper">
      <div className="categories-hero">
        <div className="row" style={{ display: "flex", alignItems: "center" }}>
          <div className="col-8" data-aos="fade-right" data-aos-delay="100">
            <h1 style={{ fontSize: "4.5rem", fontWeight: "bold", color: "#fa5a4a" }}>
              Foodio Collections
            </h1>
            <p style={{ fontSize: "1.2rem", color: "#4375aaff" }}>
              Explore Curated Collections. Experience Endless Flavor!
            </p>
          </div>
          <div className="col-4" data-aos="fade-left" data-aos-delay="200">
            <img src="/menu.jpg" alt="menu-img" style={{ height: "200px" }} />
          </div>
        </div>
      </div>

      <div className="categories-container">
        {categoryGroups.map((group, index) => (
          <div
            className="category-card"
            key={group.title}
            style={{ '--card-color': group.color }}
            data-aos="fade-up"
            data-aos-delay={index * 100}
            data-aos-anchor-placement="top-bottom"
          >
            <div className="card-header" data-aos="zoom-in" data-aos-delay={index * 100 + 200}>
              <span className="card-icon">{group.icon}</span>
              <h2>{group.title}</h2>
            </div>

            <div className="wrapper" data-aos="fade-in" data-aos-delay={index * 100 + 300}>
              <div className="collapsible">
                <input type="checkbox" id={`collapsible-${group.title}`} />
                <label htmlFor={`collapsible-${group.title}`}>
                  What's on your mind?
                </label>
                <div className="collapsible-text">
                  {group.items.map((item, itemIndex) => (
                    <Link
                      to={`/recipes/${item.toLowerCase()}`}
                      key={item}
                      data-aos="slide-up"
                      data-aos-delay={itemIndex * 50}
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
  </div>
);

};

export default Categories;


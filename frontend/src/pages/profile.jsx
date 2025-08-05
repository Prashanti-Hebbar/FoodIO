
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useGetUserID } from '../hooks/useGetUserID';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EditProfile from '../components/EditProfile';
import axios from 'axios';

const Profile = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [activeSection, setActiveSection] = useState('myRecipes');
  const [userRecipes, setUserRecipes] = useState([]);
  const [cookies] = useCookies(["access_token"]);
  const userID = useGetUserID();

  useEffect(() => {
    setUsername(window.localStorage.getItem("username") || "");
    const fetchUserRecipes = async () => {
      try {
        // Fetch all recipes, then filter by userOwner
        const res = await axios.get("https://foodio-backend-cgsj.onrender.com/recipes", {
          headers: { authorization: cookies.access_token },
        });
        const allRecipes = res.data;
        const myRecipes = allRecipes.filter(r => r.userOwner === userID);
        setUserRecipes(myRecipes);
      } catch (err) {
        console.error("Failed to fetch user recipes", err);
      }
    };
    fetchUserRecipes();
  }, [userID, cookies]);

  const [favoriteRecipes, setFavoriteRecipes] = useState([
    { id: 4, title: "Pizza Margherita", image: "ban.jpg" },
    { id: 5, title: "Chocolate Cake", image: "ban.jpg" },
  ]);

  const [savedRecipes, setSavedRecipes] = useState([
    { id: 6, title: "Sushi Roll", image: "ban.jpg" },
    { id: 7, title: "Greek Salad", image: "ban.jpg" },
  ]);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/auth/user`,
          {
            withCredentials: true
          }
        );
        // Assuming response.data contains user data
        setUserData(response.data.user);
        console.log(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("Failed to load user data. Please try again.");
      }
    };
    if(userData === null) {
      fetchUserData();
    }
  },[]);
  const handleDelete = (recipeId, section) => {
    switch (section) {
      case "My Recipes":
  setUserRecipes(userRecipes.filter((recipe) => recipe._id !== recipeId));
        break;
      case "Favorite Recipes":
        setFavoriteRecipes(favoriteRecipes.filter((recipe) => recipe.id !== recipeId));
        break;
      case "Saved Recipes":
        setSavedRecipes(savedRecipes.filter((recipe) => recipe.id !== recipeId));
        break;
      default:
        break;
    }
  };

  const RecipeGrid = ({ title, recipes, setRecipes }) => (
    <div className="recipes-grid">
      <div className="recipes-container">
        {recipes.map((recipe) => (
         <div key={recipe._id || recipe.id} className="recipe-card">
            <img src={recipe.photo || recipe.image} alt={recipe.title} />
            <div className="recipe-info">
              <h3>{recipe.title}</h3>
              <div className="recipe-actions">
                {title === "My Recipes" && (
                  <>
                    <Link className="edit-btn" to="/AddRecipe">Edit</Link>
                    <button className="delete-btn" onClick={() => handleDelete(recipe.id, title)}>Delete</button>
                  </>
                )}
                {(title === "Favorite Recipes" || title === "Saved Recipes") && (
                  <button className="remove-btn" onClick={() => handleDelete(recipe.id, title)}>Remove</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="profile-page">
      <div className="banner">
        <img src="ban.jpg" alt="Profile Banner" />
      </div>
    
      <div className="profile-content">
        <div className="profile-header">
          <img src="ban.jpg" alt="Profile" className="profile-image" />
          <h1 className="username">{username ? username : "User"}</h1>
          <button 
            className="edit-profile-btn"
            onClick={() => setShowEditProfile(true)}
          >
            Edit Profile
          </button>
        </div>
        
        <div className="recipe-buttons">
          <button 
            className={`recipe-btn ${activeSection === 'myRecipes' ? 'active' : ''}`}
            onClick={() => setActiveSection('myRecipes')}
          >
            My Recipes
          </button>
          <button 
            className={`recipe-btn ${activeSection === 'favoriteRecipes' ? 'active' : ''}`}
            onClick={() => setActiveSection('favoriteRecipes')}
          >
            Favorite Recipes
          </button>
          <button 
            className={`recipe-btn ${activeSection === 'savedRecipes' ? 'active' : ''}`}
            onClick={() => setActiveSection('savedRecipes')}
          >
            Saved Recipes
          </button>
        </div>

  {activeSection === 'myRecipes' && <RecipeGrid title="My Recipes" recipes={userRecipes} />}
        {activeSection === 'favoriteRecipes' && <RecipeGrid title="Favorite Recipes" recipes={favoriteRecipes} />}
        {activeSection === 'savedRecipes' && <RecipeGrid title="Saved Recipes" recipes={savedRecipes} />}
      </div>
      
      {showEditProfile && (
        <EditProfile onClose={() => setShowEditProfile(false)} />
      )}
    </div>
  );
};

export default Profile;
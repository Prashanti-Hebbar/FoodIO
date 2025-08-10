import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EditProfile from '../components/EditProfile';
import axios from 'axios';
import "../profile.css";
import { useUserContext } from '../context/userContext';

const Profile = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('myRecipes');
  const { userData, setUserData } = useUserContext();
  const [showEditProfile, setShowEditProfile] = useState(false);

  const [userRecipes, setUserRecipes] = useState([
    { id: 1, title: "Pasta Carbonara", image: "ban.jpg" },
    { id: 2, title: "Chicken Curry", image: "ban.jpg" },
    { id: 3, title: "Berry Smoothie", image: "ban.jpg" },
  ]);

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
        setUserData(response.data.user);
        console.log(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("Failed to load user data. Please try again.");
      }
    };
    if (userData === null) {
      fetchUserData();
    }
  }, []);

  const handleDelete = async (recipeId, section) => {
    try {
      if (section === "My Recipes") {
        await fetch(`http://localhost:3001/recipes/${recipeId}`, {
          method: "DELETE",
        });
        setUserRecipes(userRecipes.filter((recipe) => recipe.id !== recipeId));
      } else if (section === "Favorite Recipes") {
        setFavoriteRecipes(
          favoriteRecipes.filter((recipe) => recipe.id !== recipeId)
        );
      } else if (section === "Saved Recipes") {
        setSavedRecipes(
          savedRecipes.filter((recipe) => recipe.id !== recipeId)
        );
      }
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  const handleLogout = () => {
    navigate("/");
  };

  const RecipeGrid = ({ title, recipes }) => (
    <div className="recipes-grid">
      <div className="recipes-container">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <img src={recipe.image} alt={recipe.title} />
            <div className="recipe-info">
              <h3>{recipe.title}</h3>
              <div className="recipe-actions">
                {title === "My Recipes" && (
                  <>
                    <Link className="edit-btn" to="/AddRecipe">Edit</Link>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(recipe.id, title)}
                    >
                      Delete
                    </button>
                  </>
                )}
                {(title === "Favorite Recipes" ||
                  title === "Saved Recipes") && (
                  <button
                    className="remove-btn"
                    onClick={() => handleDelete(recipe.id, title)}
                  >
                    Remove
                  </button>
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
        <button className="banner-logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="profile-content">
        <div className="profile-header">
          <img src="ban.jpg" alt="Profile" className="profile-image" />
          <h1 className="username">{userData?.username || "Prashanti Hebbar"} </h1>
          <button 
            className="edit-profile-btn"
            onClick={() => setShowEditProfile(true)}
          >
            Edit Profile
          </button>
        </div>

        <div className="recipe-buttons">
          <button
            className={`recipe-btn ${activeSection === "myRecipes" ? "active" : ""}`}
            onClick={() => setActiveSection("myRecipes")}
          >
            My Recipes
          </button>
          <button
            className={`recipe-btn ${activeSection === "favoriteRecipes" ? "active" : ""}`}
            onClick={() => setActiveSection("favoriteRecipes")}
          >
            Favorite Recipes
          </button>
          <button
            className={`recipe-btn ${activeSection === "savedRecipes" ? "active" : ""}`}
            onClick={() => setActiveSection("savedRecipes")}
          >
            Saved Recipes
          </button>
        </div>

        {activeSection === "myRecipes" && (
          <RecipeGrid title="My Recipes" recipes={userRecipes} />
        )}
        {activeSection === "favoriteRecipes" && (
          <RecipeGrid title="Favorite Recipes" recipes={favoriteRecipes} />
        )}
        {activeSection === "savedRecipes" && (
          <RecipeGrid title="Saved Recipes" recipes={savedRecipes} />
        )}
      </div>
      
      {showEditProfile && (
        <EditProfile onClose={() => setShowEditProfile(false)} />
      )}
    </div>
  );
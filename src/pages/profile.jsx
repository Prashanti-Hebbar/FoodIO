import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../profile.css";
  const Profile = () => {
    const navigate = useNavigate();

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

    const handleDelete = (recipeId, section) => {
      switch (section) {
        case "My Recipes":
          setUserRecipes(userRecipes.filter((recipe) => recipe.id !== recipeId));
          break;
        case "Favorite Recipes":
          setFavoriteRecipes(
            favoriteRecipes.filter((recipe) => recipe.id !== recipeId)
          );
          break;
        case "Saved Recipes":
          setSavedRecipes(
            savedRecipes.filter((recipe) => recipe.id !== recipeId)
          );
          break;
        default:
          break;
      }
    };

    const handleLogout = () => {
      navigate('/');
    };

    const RecipeGrid = ({ title, recipes, setRecipes }) => (
      <div className="recipes-grid">
        <h2>{title}</h2>
        <div className="recipes-container">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <img src={recipe.image} alt={recipe.title} />
              <div className="recipe-info">
                <h3>{recipe.title}</h3>
                <div className="recipe-actions">
                  {title === "My Recipes" && (
                    <>
                      <a className="edit-btn" href="/AddRecipe">
                        Edit
                      </a>

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
            <h1 className="username">Prashanti Hebbar</h1>
          </div>
          <br />
          <RecipeGrid title="My Recipes" recipes={userRecipes} />
          <RecipeGrid title="Favorite Recipes" recipes={favoriteRecipes} />
          <RecipeGrid title="Saved Recipes" recipes={savedRecipes} />
        </div>
      </div>
    );
  };
export default Profile;
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import EditProfile from "../components/EditProfile";
import axios from "axios";
import toast from "react-hot-toast";
import "../profile.css";
import { useUserContext } from "../context/userContext";

const Profile = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("myRecipes");
  const [showEditProfile, setShowEditProfile] = useState(false);

  const { userData, setUserData, avatarUrl, setAvatarUrl } = useUserContext();

  // My Recipes - dummy (can later fetch from API)
  const [userRecipes, setUserRecipes] = useState([
    { id: 1, title: "Pasta Carbonara", image: "ban.jpg" },
    { id: 2, title: "Chicken Curry", image: "ban.jpg" },
    { id: 3, title: "Berry Smoothie", image: "ban.jpg" },
  ]);

  // 🔹 Favorites & Saved (persistent in localStorage)
  const [favoriteRecipes, setFavoriteRecipes] = useState(() => {
    return JSON.parse(localStorage.getItem("favList")) || [];
  });

  const [savedRecipes, setSavedRecipes] = useState(() => {
    return JSON.parse(localStorage.getItem("saveList")) || [];
  });

  // 🔹 Fetch User Data & Avatar
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://foodio-backend-cgsj.onrender.com/auth/user`,
          { withCredentials: true }
        );

        setUserData(response.data.user);

        if (response.data.user.avatar) {
          setAvatarUrl(
            `https://foodio-backend-cgsj.onrender.com/${response.data.user.avatar}`
          );
        } else {
          setAvatarUrl("ban.jpg"); // fallback avatar
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to load user data. Please try again.");
      }
    };

    if (userData === null) {
      fetchUserData();
    }
  }, []);

  // 🔹 Delete/Remove Recipe
  const handleDelete = async (recipeId, section) => {
    toast((t) => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <span style={{ fontWeight: '600' }}>
          {section === "My Recipes" 
            ? "Delete this recipe permanently?" 
            : `Remove from ${section.toLowerCase()}?`}
        </span>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <button
            onClick={() => toast.dismiss(t.id)}
            style={{
              padding: '6px 16px',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              background: 'white',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Cancel
          </button>
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              try {
                if (section === "My Recipes") {
                  await fetch(
                    `https://foodio-backend-cgsj.onrender.com/recipes/${recipeId}`,
                    {
                      method: "DELETE",
                    }
                  );
                  setUserRecipes(userRecipes.filter((recipe) => recipe.id !== recipeId));
                  toast.success("Recipe deleted successfully!");
                } else if (section === "Favorite Recipes") {
                  const updated = favoriteRecipes.filter((r) => r.id !== recipeId);
                  setFavoriteRecipes(updated);
                  localStorage.setItem("favList", JSON.stringify(updated));
                  toast.success("Removed from favorites!");
                } else if (section === "Saved Recipes") {
                  const updated = savedRecipes.filter((r) => r.id !== recipeId);
                  setSavedRecipes(updated);
                  localStorage.setItem("saveList", JSON.stringify(updated));
                  toast.success("Removed from saved recipes!");
                }
              } catch (error) {
                console.error("Error deleting recipe:", error);
                toast.error("Failed to delete recipe. Please try again.");
              }
            }}
            style={{
              padding: '6px 16px',
              border: 'none',
              borderRadius: '6px',
              background: '#ef4444',
              color: 'white',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            {section === "My Recipes" ? "Delete" : "Remove"}
          </button>
        </div>
      </div>
    ), {
      duration: 5000,
      position: 'top-center',
    });
  };

  // 🔹 Avatar Upload
  const handleAvatarUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);
    formData.append("userId", userData._id);

    try {
      const res = await axios.post("https://foodio-backend-cgsj.onrender.com/profile", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      setAvatarUrl(`https://foodio-backend-cgsj.onrender.com/uploads/${res.data.filename}`);
      setUserData((prev) => ({ ...prev, avatar: res.data.filename }));

      toast.success("Profile picture uploaded successfully!");
    } catch (err) {
      console.error("Upload failed", err);
      toast.error("Upload failed.");
    }
  };

  // 🔹 Logout
  const handleLogout = () => {
    navigate("/");
  };

  // 🔹 RecipeGrid Component
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
                    <Link className="edit-btn" to="/AddRecipe">
                      Edit
                    </Link>
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
      </div>

      <div className="profile-content ">
        <div className="profile-header display:flex">
          <img src={avatarUrl} alt="Profile" className="profile-image" />
          <h1 className="username">{userData?.username || "Username"}</h1>

          <button
            className="edit-profile-btn"
            onClick={() => setShowEditProfile(true)}
          >
            Edit Profile
          </button>
        </div>

        <div className="recipe-buttons">
          <button
            className={`recipe-btn ${
              activeSection === "myRecipes" ? "active" : ""
            }`}
            onClick={() => setActiveSection("myRecipes")}
          >
            My Recipes
          </button>
          <button
            className={`recipe-btn ${
              activeSection === "favoriteRecipes" ? "active" : ""
            }`}
            onClick={() => setActiveSection("favoriteRecipes")}
          >
            Favorite Recipes
          </button>
          <button
            className={`recipe-btn ${
              activeSection === "savedRecipes" ? "active" : ""
            }`}
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
};

export default Profile;

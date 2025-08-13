import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import recipes from "../pages/recipes";
import "../navbar.css";
import { toast } from "react-toastify";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  // Check if user is logged in on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.setItem("logoutToast", "true");
    setIsLoggedIn(false); // <-- update App state immediately
    navigate("/login"); // redirect
  };

  // Search logic
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim()) {
      const results = Object.values(recipes)
        .flat()
        .filter((recipe) =>
          recipe.title.toLowerCase().includes(term.toLowerCase())
        );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleRecipeClick = (id) => {
    navigate(`/viewRecipe?id=${id}`);
    setSearchTerm("");
    setSearchResults([]);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-custom">
        <Link className="navbar-brand" to="/home">
          FoodIO
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/home">
                Home
              </Link>
            </li>

            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
              >
                Dashboard
              </button>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/Categories">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/AddRecipe">
                    Add New Recipe
                  </Link>
                </li>
              </ul>
            </div>

            <li className="nav-item">
              <Link className="nav-link" to="/About">
                About
              </Link>
            </li>
          </ul>

          <Link className="ChatButton" to="/ai-chat">
            Chat with AI
          </Link>

          <form className="form-inline d-flex align-items-center position-relative">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
            />
            {searchResults.length > 0 && (
              <div className="search-results">
                {searchResults.map((recipe) => (
                  <div
                    key={recipe.id}
                    className="search-item"
                    onClick={() => handleRecipeClick(recipe.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="search-result-img"
                    />
                    <span className="search-result-title">{recipe.title}</span>
                  </div>
                ))}
              </div>
            )}
          </form>

          <div className="auth-buttons">
            {isLoggedIn ? (
              <>
                <button className="btn btn-danger ms-2" onClick={handleLogout}>
                  Logout
                </button>
                <Link className="myprofile" to="/profile">
                  <i className="fas fa-user"></i>
                </Link>
              </>
            ) : (
              <Link className="reglink" to="/register">
                Register
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

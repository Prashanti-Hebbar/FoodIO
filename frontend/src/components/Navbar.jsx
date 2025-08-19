import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../navbar.css";
import axios from 'axios';
import { useUserContext } from '../context/userContext';

const Navbar = ({ isLoggedIn, setIsLoggedIn, recipes = [] }) => {
  const { setUserData } = useUserContext();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleLogout = async () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      try {
        await axios.post("https://foodio-backend-cgsj.onrender.com/auth/logout", {}, { withCredentials: true });
        localStorage.clear();
        setIsLoggedIn(false);
        setUserData(null);
        navigate("/home");
      } catch (err) {
        console.log('Error during logout:', err);
      }
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim()) {
      const results = Object.values(recipes)
        .flat()
        .filter((recipe) =>
          recipe.title.toLowerCase().includes(term.toLowerCase())
        )
        .sort((a, b) => {
          const aTitle = a.title.toLowerCase();
          const bTitle = b.title.toLowerCase();
          const aStarts = aTitle.startsWith(term);
          const bStarts = bTitle.startsWith(term);
          if (aStarts && !bStarts) return -1;
          if (!aStarts && bStarts) return 1;
          return aTitle.localeCompare(bTitle);
        });
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleRecipeClick = (id) => {
    navigate(`/viewRecipe?id=${id}`);
    setSearchTerm('');
    setSearchResults([]);
    setIsNavCollapsed(true);
  };

  const handleNavToggle = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  const handleNavLinkClick = () => {
    setIsNavCollapsed(true);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-custom">
        <a className="navbar-brand" href="/Home" onClick={handleNavLinkClick}>
          FoodIO
        </a>
        <button
          className="navbar-toggler"
          type="button"
          onClick={handleNavToggle}
          aria-controls="navbarSupportedContent"
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${!isNavCollapsed ? 'show' : ''}`} id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/Home" onClick={handleNavLinkClick}>
                Home
              </a>
            </li>
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dashboard
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a
                    className="dropdown-item"
                    href="/Categories"
                    onClick={handleNavLinkClick}
                  >
                    Categories
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="/AddRecipe"
                    onClick={handleNavLinkClick}
                  >
                    Add New Recipe
                  </a>
                </li>
              </ul>
            </div>
            <li className="nav-item">
              <a className="nav-link" href="/About" onClick={handleNavLinkClick}>
                About
              </a>
            </li>
          </ul>
          <a className="ChatButton" href="/ai-chat" onClick={handleNavLinkClick}>
            Chat with AI
          </a>
          <form className="form-inline d-flex align-items-center position-relative">
            <input
              className="form-control mr-sm-2 w-full px-4 py-2 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-yellow-300"
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
                    className="search-item px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleRecipeClick(recipe.id)}
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
              <button
                className="btn btn-danger ms-2"
                onClick={() => {
                  handleLogout();
                  handleNavLinkClick();
                }}
              >
                Logout
              </button>
            ) : (
              <>
                <Link className="loginlink" to="/login" onClick={handleNavLinkClick}>
                  Login
                </Link>
                <Link className="reglink" to="/register" onClick={handleNavLinkClick}>
                  Register
                </Link>
              </>
            )}
            <a className="myprofile" href="/profile" onClick={handleNavLinkClick}>
              <i className="fas fa-user"></i>
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
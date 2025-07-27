import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import recipes from '../pages/recipes';
import '../navbar.css';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate('/home');
  };

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

        <div
          className={`collapse navbar-collapse ${!isNavCollapsed ? 'show' : ''}`}
          id="navbarSupportedContent"
        >
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
                    style={{ cursor: 'pointer' }}
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
                <a className="loginlink" href="/login" onClick={handleNavLinkClick}>
                  Login
                </a>
                <a className="reglink" href="/register" onClick={handleNavLinkClick}>
                  Register
                </a>
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

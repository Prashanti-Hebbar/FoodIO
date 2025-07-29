import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import recipes from '../pages/recipes'
import "../navbar.css"

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const navigate = useNavigate()

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      localStorage.clear();
      setIsLoggedIn(false);
      navigate("/home");
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value
    setSearchTerm(term)

    if (term.trim()) {
      const results = Object.values(recipes)
        .flat()
        .filter(recipe => 
          recipe.title.toLowerCase().includes(term.toLowerCase())
        )
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }

  const handleRecipeClick = (id) => {
    navigate(`/viewRecipe?id=${id}`)
    setSearchTerm('')
    setSearchResults([])
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-custom">
        <Link className="navbar-brand" to="/Home">FoodIO</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/Home">Home</Link>
            </li>

            <div className="dropdown">
              <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dashboard
              </button>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/Categories">Categories</Link></li>
                <li><Link className="dropdown-item" to="/AddRecipe">Add New Recipe</Link></li>
              </ul>
            </div>

            <li className="nav-item">
              <Link className="nav-link" to="/About">About</Link>
            </li>
          </ul>
        {/* add chat button */}
              <Link className='ChatButton' to='/ai-chat'>Chat with AI</Link>

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
                {searchResults.map(recipe => (
                  <div 
                    key={recipe.id} 
                    className="search-item"
                    onClick={() => handleRecipeClick(recipe.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <img src={recipe.image} alt={recipe.title} className="search-result-img" />
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
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <>
                <Link className="loginlink" to="/login">Login </Link>
                <Link className="reglink" to="/register"> Register</Link>
              </>
            )}
            <Link className="myprofile" to="/profile"><i className="fas fa-user"></i></Link>
          </div>

          
        </div>
      </nav>
    </div>
  )
};

export default Navbar;
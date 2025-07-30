import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import recipes from '../pages/recipes'
import "../navbar.css"
import axios from 'axios'

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const navigate = useNavigate()


  // **** your previous logout***
  // const handleLogout = () => {
  //   // Clear all user data
  //   localStorage.clear();
  //   setIsLoggedIn(false);
  //   navigate("/home");
  // };

    const handleLogout = async() => {
    console.log(process.env.REACT_APP_BACKEND_URL)
    try
          {
            //*** Your render url here ***
            let res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/logout`,
            {
              withCredentials:true
            });
            console.log(res);
            console.log(res.data);
            setIsLoggedIn(false);
 
          }catch(err)
          {
            console.log("there's some issue",err);
          }
    navigate('/');
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
        <a className="navbar-brand" href="/Home">FoodIO</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/Home">Home</a>
            </li>

            <div className="dropdown">
              <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dashboard
              </button>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="/Categories">Categories</a></li>
                <li><a className="dropdown-item" href="/AddRecipe">Add New Recipe</a></li>
              </ul>
            </div>

            <li className="nav-item">
              <a className="nav-link" href="/About">About</a>
            </li>
          </ul>
        {/* add chat button */}
              <a className='ChatButton' href='/ai-chat'>Chat with AI</a>

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
                <a className="loginlink" href="/login">Login </a>
                <a className="reglink" href="/register"> Register</a>
              </>
            )}
            <a className="myprofile" href="/profile"><i className="fas fa-user"></i></a>
          </div>

          
        </div>
      </nav>
    </div>
  )
};

export default Navbar;
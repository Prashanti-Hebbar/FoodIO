import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import recipes from '../pages/recipes'
import "../navbar.css"
import axios from 'axios';
import { useUserContext } from '../context/userContext';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const {setUserData} = useUserContext();
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const navigate = useNavigate()

  const handleLogout = async () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      try {
        // Perform logout logic here
        let res = await axios.post("http://localhost:3001/auth/logout",{}, {
          withCredentials: true
        });
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
		const term = e.target.value
		setSearchTerm(term)
		if (term.trim()) {
			const results = Object.values(recipes)
				.flat()
				.filter((recipe) =>
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
			<nav className='navbar navbar-expand-lg navbar-custom'>
				<a className='navbar-brand' href='/Home'>
					FoodIO
				</a>
				<button
					className='navbar-toggler'
					type='button'
					data-toggle='collapse'
					data-target='#navbarSupportedContent'
					aria-controls='navbarSupportedContent'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span className='navbar-toggler-icon'></span>
				</button>


				<div className='collapse navbar-collapse' id='navbarSupportedContent'>
					<ul className='navbar-nav me-auto'>
						<li className='nav-item active'>
							<a className='nav-link' href='/Home'>
								Home
							</a>
						</li>
						<div className='dropdown'>
							<button
								className='btn btn-secondary dropdown-toggle'
								type='button'
								data-bs-toggle='dropdown'
								aria-expanded='false'
							>
								Dashboard
							</button>
							<ul className='dropdown-menu'>
								<li>
									<a className='dropdown-item' href='/Categories'>
										Categories
									</a>
								</li>
								<li>
									<a className='dropdown-item' href='/AddRecipe'>
										Add New Recipe
									</a>
								</li>
							</ul>
						</div>
						<li className='nav-item'>
							<a className='nav-link' href='/About'>
								About
							</a>
						</li>
					</ul>

					{/* Chat button */}
					<a className='ChatButton me-3' href='/ai-chat'>
						Chat with AI
					</a>

					{/* Search form with constrained width */}
					<form
						className='d-flex align-items-center position-relative me-3'
						style={{ width: '300px' }}
					>
						<input
							className='form-control'
							type='search'
							placeholder='Search'
							value={searchTerm}
							onChange={handleSearch}
							style={{ width: '100%' }}
						/>
						{searchResults.length > 0 && (
							<div
								className='search-results position-absolute'
								style={{ top: '100%', left: '0', right: '0', zIndex: 1000 }}
							>
								{searchResults.map((recipe) => (
									<div
										key={recipe.id}
										className='search-item bg-white border p-2 d-flex align-items-center'
										onClick={() => handleRecipeClick(recipe.id)}
										style={{ cursor: 'pointer' }}
									>
										<img
											src={recipe.image}
											alt={recipe.title}
											className='search-result-img me-2'
											style={{
												width: '40px',
												height: '40px',
												objectFit: 'cover',
											}}
										/>
										<span className='search-result-title'>{recipe.title}</span>
									</div>
								))}
							</div>
						)}
					</form>

					{/* Auth buttons */}
					<div className='auth-buttons d-flex align-items-center'>
						{isLoggedIn ? (
							<button className='btn btn-danger' onClick={handleLogout}>
								Logout
							</button>
						) : (
							<>
								<a className='loginlink me-2' href='/login'>
									LOGIN
								</a>
								<a className='reglink me-2' href='/register'>
									REGISTER
								</a>
							</>
						)}
						<a className='myprofile ms-2' href='/profile'>
							<i className='fas fa-user'></i>
						</a>
					</div>
				</div>
			</nav>
		</div>
	)
}

export default Navbar
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
                {/* <Link className="loginlink" to="/login">Login </Link> */}
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


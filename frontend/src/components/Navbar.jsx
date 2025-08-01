import { useState, useRef } from "react";
import { Link} from "react-router-dom";
import { UserIcon } from "lucide-react";
import axios from 'axios';
import { useUserContext } from '../context/userContext';

const Navbar = ({ isLoggedIn, setIsLoggedIn, isHomeScreen }) => {
  const {setUserData} = useUserContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const dropdownTimeout = useRef(null);

  // Dashboard dropdown handlers
  const handleDashboardEnter = () => {
    clearTimeout(dropdownTimeout.current);
    setIsDropdownOpen(true);
  };

  const handleDashboardLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 200);
  };

  // User dropdown handlers
  const handleUserEnter = () => {
    clearTimeout(dropdownTimeout.current);
    setUserMenuOpen(true);
  };

  const handleUserLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setUserMenuOpen(false);
    }, 200);
  };

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
    <nav
      className={`w-full z-50 text-white ${
        isHomeScreen ? "fixed top-0" : "relative"
      } backdrop-blur-md shadow-[rgba(0,0,0,0.2)_0px_4px_20px,rgba(255,204,0,0.05)_0px_0px_30px_inset] bg-black/60`}
    >
      <div className="max-w-7xl lg:mx-16 mx-auto px-2 sm:px-4 lg:px-8">
        <div className="py-4 flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-yellow-400">
            FOODIO
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="hover:text-yellow-400">Home</Link>

            <div
              className="relative"
              onMouseEnter={handleDashboardEnter}
              onMouseLeave={handleDashboardLeave}
            >
              <button
                className="text-white hover:text-yellow-400 px-2 py-1 focus:outline-none"
                aria-haspopup="true"
                aria-expanded={isDropdownOpen}
                aria-controls="dashboard-menu"
              >
                Dashboard ▾
              </button>
              {isDropdownOpen && (
                <div
                  id="dashboard-menu"
                  className="absolute bg-black/90 text-white mt-2 rounded shadow-lg p-2 w-44"
                >
                  <Link
                    to="/Categories"
                    className="block px-4 py-2 hover:bg-white/10 focus:bg-white/10 focus:outline-none"
                  >
                    Categories
                  </Link>
                  <Link
                    to="/AddRecipe"
                    className="block px-4 py-2 hover:bg-white/10 focus:bg-white/10 focus:outline-none"
                  >
                    Add New Recipe
                  </Link>
                </div>
              )}
            </div>

            <Link to="/About" className="hover:text-yellow-400">About</Link>
            <Link to="/ai-chat" className="hover:text-yellow-400">Chat with AI</Link>
          </div>

          {/* Search Bar */}
          <div className="flex-grow mx-4 max-w-md hidden md:block">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-4 py-2 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
          </div>

          {/* Auth Buttons or Profile */}
          <div className="flex items-center space-x-2 relative">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className="px-4 py-1 border border-yellow-400 text-yellow-400 rounded hover:bg-yellow-500 hover:text-black"
                >
                  LOGIN
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-1 bg-yellow-400 text-black rounded hover:bg-yellow-300 font-semibold"
                >
                  REGISTER
                </Link>
              </>
            ) : (
              <div
                className="relative"
                onMouseEnter={handleUserEnter}
                onMouseLeave={handleUserLeave}
              >
                <div className="bg-black/20 rounded p-1 cursor-pointer">
                  <UserIcon className="h-6 w-6" />
                </div>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 bg-black/90 text-white rounded shadow-lg w-32">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-white/10"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-white/10"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
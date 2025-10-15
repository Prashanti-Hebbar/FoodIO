
import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserIcon, Menu, X, ChevronDown, Sun as SunIcon } from "lucide-react";
import axios from "axios";
import { useUserContext } from "../context/userContext";
import "../navbar.css";
import { useTheme } from "../context/ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";
import toast from "react-hot-toast";

const Navbar = ({ isLoggedIn, setIsLoggedIn, isHomeScreen, recipes = [] }) => {
  const { setUserData } = useUserContext();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const dropdownTimeout = useRef(null);

  const handleDashboardEnter = () => {
    clearTimeout(dropdownTimeout.current);
    setIsDropdownOpen(true);
  };
  const handleDashboardLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 200);
  };
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
    toast((t) => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <span style={{ fontWeight: '600' }}>Are you sure you want to logout?</span>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <button
            onClick={() => toast.dismiss(t.id)}
            style={{
              padding: '6px 16px',
              border: '1px solid #e5e7eb',
              borderRadius: '15px',
              background: 'white',
              color: 'black',
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
                await axios.post(
                  "https://foodio-backend-cgsj.onrender.com/auth/logout",
                  {},
                  { withCredentials: true }
                );
                localStorage.clear();
                toast.success("Logged out successfully!");
                setIsLoggedIn(false);
                setUserData(null);
                navigate("/home");
              } catch (err) {
                console.log("Error during logout:", err);
                toast.error("Logout failed. Please try again.");
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
            Logout
          </button>
        </div>
      </div>
    ), {
      duration: 5000,
      position: 'top-center',
    });
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.trim()) {
      const results = recipes
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
    setSearchTerm("");
    setSearchResults([]);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`
        sticky top-0 w-full z-50 backdrop-blur-md
        ${
          theme === "dark"
            ? "bg-black/80 text-gray-100 shadow-lg"
            : "bg-white text-gray-800 shadow-md"
        }
      `}
    >
      <div className="lg:mx-16 mx-auto px-4 sm:px-6 lg:px-8 ">
        <div
          className={`py-3 flex justify-between items-center h-16 
          after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-1
    after:rounded-full after:shadow-[0_0_10px_2px_rgba(255,255,255,0.7)] 
    after:bg-white`}
        >
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className={`font-sans font-bold tracking-wide hover:scale-105 transition-transform text-2xl sm:text-3xl md:text-4xl
                ${theme === "dark" ? "text-orange-400" : "text-yellow-400"}`}
            >
              FOODIO
            </Link>
          </div>

          {/* Desktop Menu */}
        {/* Desktop Menu */}
<div className="hidden md:flex space-x-6 lg:space-x-8 items-center font-medium">
  <Link
    to="/"
    className={`px-3 py-2 border rounded-md text-sm lg:text-base font-medium tracking-wide transition-all duration-200 shadow-sm
      ${theme === "dark"
        ? "border-gray-700 text-gray-100 hover:bg-gray-800 hover:text-orange-400"
        : "border-gray-300 text-gray-800 hover:border-orange-400 hover:text-orange-500 hover:bg-gray-200"
      }`}
  >
    Home
  </Link>

  {/* Dashboard with Dropdown */}
  <div
    className="relative"
    onMouseEnter={handleDashboardEnter}
    onMouseLeave={handleDashboardLeave}
  >
    <div
    typeof="button"
    tabIndex={0}
      className={`flex items-center gap-1 px-3 py-2 border rounded-md text-sm lg:text-base font-medium tracking-wide transition-all duration-200 shadow-sm
        ${theme === "dark"
          ? "border-gray-700 text-gray-100 hover:bg-gray-800 hover:text-orange-400"
          : "border-gray-300 text-gray-800 hover:border-orange-400 hover:text-orange-500 hover:bg-gray-200"
        }`}
      aria-haspopup="true"
      aria-expanded={isDropdownOpen}
    >
      Dashboard <ChevronDown size={15} />
  </div>

    {isDropdownOpen && (
      <div
        className={`absolute mt-2 rounded-lg shadow-lg w-48 lg:w-52 py-2 z-50
          ${theme === "dark"
            ? "bg-black/90 border border-gray-700 text-gray-100 backdrop-blur-md"
            : "bg-white border border-gray-200 text-gray-800"
          }`}
      >
        <Link
          to="/Categories"
          className={`block px-4 py-2 text-sm font-medium rounded-md transition
            ${theme === "dark"
              ? "hover:bg-gray-800 hover:text-orange-400"
              : "hover:bg-orange-50 hover:text-orange-600"
            }`}
        >
          Categories
        </Link>
        <Link
          to="/AddRecipe"
          className={`block px-4 py-2 text-sm font-medium rounded-md transition
            ${theme === "dark"
              ? "hover:bg-gray-800 hover:text-orange-400"
              : "hover:bg-orange-50 hover:text-orange-600"
            }`}
        >
          Add New Recipe
        </Link>
      </div>
    )}
  </div>

  <Link
    to="/About"
    className={`px-3 py-2 border rounded-md text-sm lg:text-base font-medium tracking-wide transition-all duration-200 shadow-sm
      ${theme === "dark"
        ? "border-gray-700 text-gray-100 hover:bg-gray-800 hover:text-orange-400"
        : "border-gray-300 text-gray-800 hover:border-orange-400 hover:text-orange-500 hover:bg-gray-200"
      }`}
  >
    About
  </Link>

  <Link
    to="/ai-chat"
    className={`px-3 py-2 border rounded-md text-sm lg:text-base font-medium tracking-wide transition-all duration-200 shadow-sm
      ${theme === "dark"
        ? "border-gray-700 text-gray-100 hover:bg-gray-800 hover:text-orange-400"
        : "border-gray-300 text-gray-800 hover:border-orange-400 hover:text-orange-500 hover:bg-gray-200"
      }`}
  >
    Chat with AI
  </Link>
</div>


          {/* Search Bar */}
          <div className="flex-grow mx-2 sm:mx-4 max-w-xs sm:max-w-md  md:hidden relative hidden sm:block lg:block">
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={handleSearch}
              className={`w-full px-4 py-2 rounded-full focus:outline-none focus:ring-2 transition-all text-sm sm:text-base
                ${
                  theme === "dark"
                    ? "bg-black/80 text-gray-100 placeholder-gray-400 focus:ring-orange-400"
                    : "bg-white text-black placeholder-gray-500 focus:ring-blue-400"
                }`}
            />
            {searchResults.length > 0 && (
              <div
                className={`absolute mt-1 w-full rounded-lg shadow-xl z-50 max-h-60 overflow-auto
                  ${
                    theme === "dark"
                      ? "bg-black/90 text-gray-100 backdrop-blur-md"
                      : "bg-white text-black"
                  }`}
              >
                {searchResults.map((recipe) => (
                  <div
                    key={recipe.id}
                    onClick={() => handleRecipeClick(recipe.id)}
                    className={`px-4 py-2 cursor-pointer transition-colors text-sm
                      ${
                        theme === "dark"
                          ? "hover:bg-gray-800"
                          : "hover:bg-gray-100"
                      }`}
                  >
                    {recipe.title}
                  </div>
                ))}
              </div>
            )}
          </div>


          {/* Desktop Auth/Profile (hidden on mobile) */}
          <div className="hidden md:flex items-center space-x-2 relative">
            {!isLoggedIn ? (
              <Link
              to="/register"
              className={`flex items-center gap-1 px-3 py-2 border rounded-md text-sm lg:text-base font-medium tracking-wide transition-all duration-200 shadow-sm
                ${
                  theme === "dark"
                    ? "border-gray-700 text-gray-100 hover:bg-gray-800 hover:text-orange-400"
                    : "border-gray-300 text-gray-800 hover:border-orange-400 hover:bg-gray-200"
                }`}
            >
              REGISTER
            </Link>

            ) : (
              <div
              className="relative"
              onMouseEnter={handleUserEnter}
              onMouseLeave={handleUserLeave}
            >
              <Link to="/profile">
                <div
                  className={`rounded-full p-2 cursor-pointer transition-colors
                    ${
                      theme === "dark"
                        ? "hover:bg-gray-800"
                        : "hover:bg-gray-200"
                    }`}
                >
                  <UserIcon className="h-5 w-5 lg:h-6 lg:w-6" />
                </div>
              </Link>

              {userMenuOpen && (
                <div
                  className={`absolute right-0 mt-2 rounded-md shadow-xl w-28 overflow-hidden
                    ${
                      theme === "dark"
                        ? "bg-black/90 border border-gray-700 text-gray-100 backdrop-blur-md"
                        : "bg-black/95 border border-yellow-400/20 text-white"
                    }`}
                >
                  <div
                    onClick={handleLogout}
                    className={`w-full text-left px-4 py-2 rounded-md cursor-pointer font-medium select-none
                      ${
                        theme === "dark"
                          ? "bg-gray-800 hover:bg-gray-700 text-gray-100"
                          : "bg-white hover:bg-gray-200 text-gray-800"
                      }`}
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>

            )}

            {/* Dark/Light Toggle Button */} 
            <button
              onClick={toggleTheme}
              className={`flex items-center justify-center w-9 h-9 lg:w-10 lg:h-10 cursor-pointer rounded-full transition-colors shadow-sm
                ${
                  theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-200"
                }`}
            >
              {theme === "light" ? (
                <FaMoon className="text-black" size={16} />
              ) : (
                <FaSun className="text-orange-400" size={18} />
              )}
            </button>
          </div>

          {/* Mobile Hamburger */}
          <div className="flex items-center md:hidden">
            <div
              tabIndex={0}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 focus:outline-none transition-colors
                ${
                  theme === "dark"
                    ? "hover:text-orange-400"
                    : "hover:text-black"
                }`}
            >
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className={`md:hidden px-6 py-5 space-y-5 flex flex-col justify-center items-center transition-all duration-300 rounded-xl shadow-xl
            ${
              theme === "dark"
                ? "bg-black/90 text-gray-100 border border-gray-700 backdrop-blur-md"
                : "bg-white text-gray-900 border border-gray-200"
            }`}
        >

          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block hover:text-yellow-400">Home</Link>
          <Link to="/Categories" onClick={() => setIsMobileMenuOpen(false)} className="block hover:text-yellow-400">Categories</Link>
          <Link to="/AddRecipe" onClick={() => setIsMobileMenuOpen(false)} className="block hover:text-yellow-400">Add New Recipe</Link>
          <Link to="/About" onClick={() => setIsMobileMenuOpen(false)} className="block hover:text-yellow-400">About</Link>
          <Link to="/ai-chat" onClick={() => setIsMobileMenuOpen(false)} className="block hover:text-yellow-400">Chat with AI</Link>

 {!isLoggedIn ? (
    <Link
      to="/register"
      onClick={() => setIsMobileMenuOpen(false)}
      className="block px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-300 font-semibold text-center"
    >
      REGISTER
    </Link>
    ) : (
         <button
      onClick={() => {
        handleLogout();
        setIsMobileMenuOpen(false);
      }}
      className="block w-full px-4 py-2 hover:bg-white/10 rounded text-center font-bold"
    >
      Logout
    </button>
    )}


          {/* Dark/Light Toggle Button */}
          <button
            onClick={toggleTheme}
            className={`flex items-center justify-center w-full px-4 py-2 mt-3 rounded-lg shadow-md border transition-colors duration-200
              ${
                theme === "dark"
                  ? "border-gray-700 hover:bg-gray-800"
                  : "border-yellow-300 hover:bg-gray-200"
              }`}
          >
            {theme === "light" ? (
              <FaMoon size={18} />
            ) : (
              <FaSun className="text-orange-400" size={18} />
            )}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

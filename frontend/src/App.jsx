import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Categories from "./components/Categories";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AddRecipe from "./pages/AddRecipe";
import About from "./pages/About";
import ViewRecipe from "./pages/ViewRecipe";
import Profile from "./pages/profile";
import { SavedRecipesProvider } from "./pages/savedRecipes";
import AIChatPage from "./pages/AIChatPage";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";
import Blog from "./pages/Blog";
import Community from "./pages/Community";
import HelpCenter from "./pages/HelpCenter";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Careers from "./pages/Careers";
import { FaMoon, FaSun } from "react-icons/fa";
import CategoryRenderer from "./pages/CategoryRenderer";
import Chatbot from "./components/Chatbot/Chatbot";

// Custom component to handle scroll to top on route changes
function ScrollToTopOnRouteChange() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [recipes, setRecipes] = useState([
    { id: 1, title: "Delicious Pasta" },
    { id: 2, title: "Spicy Tacos" },
    { id: 3, title: "Pumpkin Cupcakes" },
    { id: 4, title: "Apple Pie" },
    { id: 5, title: "Best Lasagna" },
    { id: 6, title: "Harira" },
    { id: 7, title: "Vegan Curry" },
    { id: 8, title: "Chocolate Cake" },
    { id: 9, title: "Corn Fritters" },
    { id: 10, title: "Bread Cheese Lollipop" },
    { id: 11, title: "Sweet Potato Boats" },
    { id: 12, title: "Walnut Chikki" },
    { id: 13, title: "Summer Salad" },
    { id: 14, title: "Grilled Salmon" },
    { id: 15, title: "Loco Moco" },
    { id: 16, title: "Cinnamon Roll Casserole" },
    { id: 17, title: "Frikadellen" },
    { id: 18, title: "Coffee Jelly" },
  ]);
  
  useEffect(() => {
    const checkLogin = () => {
      const user = localStorage.getItem("loggedIn");
      setIsLoggedIn(user === "true");
    };

    checkLogin();

    window.addEventListener("storage", checkLogin);

    return () => {
      window.removeEventListener("storage", checkLogin);
    };
  }, []);

  return (
    <Router>
      <Toaster/>
      <ScrollToTop />
      {/* Scroll to top on route change */}
      <ScrollToTopOnRouteChange />

      

      <Navbar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        recipes={recipes}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/"
          element={!isLoggedIn ? <Navigate to="/login" /> : <Home />}
        />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/register"
          element={<Register setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/home" element={<Home />} />
        <Route path="/AddRecipe" element={<AddRecipe />} />
        <Route path="/About" element={<About />} />
        <Route path="/ViewRecipe" element={<ViewRecipe />} />
        <Route path="/recipe/:id" element={<ViewRecipe />} />
        <Route path="/Categories" element={<Categories />} />
        <Route path="/recipes/:category" element={<CategoryRenderer />} /> 
        <Route path="/profile" element={<Profile />} />
        <Route path="/pages/savedRecipes" element={<SavedRecipesProvider />} />
        <Route path="/ai-chat" element={<AIChatPage />} />
        <Route path="/Blog" element={<Blog />} />
        <Route path="/Careers" element={<Careers />} />
        <Route path="/Community" element={<Community />} />
        <Route path="/HelpCenter" element={<HelpCenter />} />
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/TermsOfService" element={<TermsOfService />} />
      </Routes>
      <Footer />
      <Chatbot />
    </Router>
  );
}

export default App;
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
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
import Breakfast from './pages/categories/Breakfast';
import Lunch from "./pages/categories/Lunch";
import Desserts from "./pages/categories/Desserts";
import Dinner from "./pages/categories/Dinner";
import Appetizer from "./pages/categories/Appetizer";
import Sides from "./pages/categories/Sides";
import Snacks from "./pages/categories/Snacks";
import Drinks from "./pages/categories/Drinks";
import LowCarb from "./pages/categories/LowCarb";
import Keto from "./pages/categories/keto";
import Vegetarian from "./pages/categories/vegetarian";
import Whole30 from "./pages/categories/whole30";
import Paleo from "./pages/categories/Paleo";
import Indian from "./pages/categories/Indian";
import Italian from "./pages/categories/Itallian";
import Japanese from "./pages/categories/Japanese";
import Mexican from "./pages/categories/Mexican";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("username");
    setIsLoggedIn(!!user);
  }, []);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} />
      <Routes>
        {/* Redirect to Login if not logged in */}
        <Route path="/" element={<Home /> } />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/home" element={ <Home /> } />
        <Route path="/AddRecipe" element={ <AddRecipe /> } />
        <Route path="/About" element={ <About /> } />
        <Route path="/ViewRecipe" element={<ViewRecipe />}/>
        <Route path="/recipe/:id" element={<ViewRecipe />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Categories" element={<Categories />} />
        <Route path="/recipes/breakfast" element={<Breakfast />} />
        <Route path="/recipes/Lunch" element={<Lunch />} />
        <Route path="/recipes/dessert" element={<Desserts />} />
        <Route path="/recipes/dinner" element={<Dinner />} />
        <Route path="/recipes/appetizers" element={<Appetizer />} />
        <Route path="/recipes/sides" element={<Sides />} />
        <Route path="/recipes/snacks" element={<Snacks />} />
        <Route path="/recipes/drinks" element={<Drinks />} />
        <Route path="/recipes/lowcarb" element={<LowCarb />} />
        <Route path="/recipes/keto" element={<Keto />} />
        <Route path="/recipes/Vegetarian" element={<Vegetarian />} />
        <Route path="/recipes/whole30" element={<Whole30 />} />
        <Route path="/recipes/paleo" element={<Paleo />} />
        <Route path="/recipes/indian" element={<Indian />} />
        <Route path="/recipes/italian" element={<Italian />} />
        <Route path="/recipes/japanese" element={<Japanese />} />
        <Route path="/recipes/mexican" element={<Mexican />} />

      </Routes>
    </Router>
  );
}

export default App;
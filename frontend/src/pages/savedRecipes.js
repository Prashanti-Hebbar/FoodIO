import { createContext, useState, useEffect } from "react";

// Create Context
export const SavedRecipesContext = createContext();

<<<<<<< HEAD
export const SavedRecipesProvider = ({ children }) => {
    const [savedRecipes, setSavedRecipes] = useState([]);

    // Load saved recipes from localStorage on component mount
    useEffect(() => {
        const storedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
        setSavedRecipes(storedRecipes);
    }, []);

    // Save recipes to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
    }, [savedRecipes]);

    const saveRecipe = (recipe) => {
        setSavedRecipes((prevRecipes) => [...prevRecipes, recipe]);
=======
  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(`https://foodio-backend-cgsj.onrender.com/recipes/savedRecipes/${userID}`);
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
>>>>>>> 7ffc97ebed7da6598f67a09bd0fede85a9d30486
    };

    const removeRecipe = (recipeId) => {
        setSavedRecipes((prevRecipes) => prevRecipes.filter((r) => r.id !== recipeId));
    };

    return (
        <SavedRecipesContext.Provider value={{ savedRecipes, saveRecipe, removeRecipe }}>
            {children}
        </SavedRecipesContext.Provider>
    );
};


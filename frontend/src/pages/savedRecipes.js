import { createContext, useState, useEffect } from "react";

// Create Context
export const SavedRecipesContext = createContext();

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


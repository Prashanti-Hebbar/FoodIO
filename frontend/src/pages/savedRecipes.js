import { createContext, useState, useEffect } from "react";

// Create Context
export const SavedRecipesContext = createContext();

export const SavedRecipesProvider = ({ children }) => {
    const [savedRecipes, setSavedRecipes] = useState([]);

    // Load saved recipes on component mount
    useEffect(() => {
        const fetchSavedRecipes = async () => {
            const userID = localStorage.getItem("username");
            if (userID) {
                try {
                    // Try to fetch from API if user is logged in
                    const response = await fetch(`https://foodio-backend-cgsj.onrender.com/recipes/savedRecipes/${userID}`);
                    if (response.ok) {
                        const data = await response.json();
                        setSavedRecipes(data.savedRecipes || []);
                    } else {
                        // Fallback to localStorage
                        const storedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
                        setSavedRecipes(storedRecipes);
                    }
                } catch (err) {
                    console.log("API failed, using localStorage:", err);
                    // Fallback to localStorage
                    const storedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
                    setSavedRecipes(storedRecipes);
                }
            } else {
                // No user logged in, use localStorage
                const storedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
                setSavedRecipes(storedRecipes);
            }
        };

        fetchSavedRecipes();
    }, []);

    // Save recipes to localStorage whenever it changes (backup)
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


import { createContext, useReducer, useState } from "react";

const globalContext = {
  favList : [],
  saveList : [],
  favDispatch : () => {},
  saveDispatch : () => {},
}

//Creating global Recipe Context with init state
export const RecipeContext = createContext(globalContext);

//Add Recipe to Reducer State
const addRecipe=(state, recipe) => { 
    const newState=[...state, recipe];
    return newState;
}

//Remove Recipe from Reducer State
const removeRecipe=(state, recipe) => { 
    const newState=state.filter((r) => { return recipe.id!=r.id });
    return newState;
}

//Switch to add and remove from favList Reducer State
const favReducer = (state, action) => {
    switch (action.type) {
        case "ADD": {
        const newFavList= addRecipe(state, action.payload);
        localStorage.setItem("favList", JSON.stringify(newFavList));
        return newFavList;
        }
        case "REMOVE": {
        const newFavList= removeRecipe(state, action.payload);
        localStorage.setItem("favList", JSON.stringify(newFavList));
        return newFavList;
        }
    }
};

//Switch to add and remove from saveList Reducer State
const saveReducer = (state, action) => {
    switch (action.type) {
      case "ADD": {
        const newSaveList= addRecipe(state, action.payload);
        localStorage.setItem("saveList", JSON.stringify(newSaveList));
        return newSaveList;
      }
      case "REMOVE": {
        const newSaveList=removeRecipe(state, action.payload);
        localStorage.setItem("saveList", JSON.stringify(newSaveList));
        return newSaveList;
      }
      default:
      return state; 
      }
}

const RecipeContextProvider = ({ children }) => {

  const [favList, favDispatch] = useReducer(favReducer, JSON.parse(localStorage.getItem("favList")) || []);
  const [saveList, saveDispatch] = useReducer(saveReducer, JSON.parse(localStorage.getItem("saveList")) || []);

  return (
    <RecipeContext.Provider
      value={{ favList, saveList, favDispatch, saveDispatch }}
    >
      {children}
    </RecipeContext.Provider>
  );
}

export default RecipeContextProvider;

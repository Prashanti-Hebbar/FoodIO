import { createContext, useReducer, useState } from "react";

const globalContext = {
  favList: [],
  saveList: [],
  favDispatch: () => {},
  saveDispatch: () => {},
};

//Creating global Recipe Context with init state
export const RecipeContext = createContext(globalContext);

//Add Recipe to Reducer State
const addRecipe = (state, recipe, caller) => {
  const newState = [...state, recipe];
  localStorage.setItem("favList", JSON.stringify(newState));

  const list=(caller == "fav") ? "Favourites" : "Saved List"
  alert(`${recipe.title} was added to ${list}`);

  return newState;
};

//Remove Recipe from Reducer State
const removeRecipe = (state, recipe, caller) => {
  const newState = state.filter((r) => {
    return recipe.id != r.id;
  });
  localStorage.setItem("favList", JSON.stringify(newState));

  const list=(caller == "fav") ? "Favourites" : "Saved List"
  alert(`${recipe.title} was removed from ${list}`);
  return newState;
};

//Switch to add and remove from favList Reducer State
const favReducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      return addRecipe(state, action.payload, "fav");
    }
    case "REMOVE": {
      return removeRecipe(state, action.payload, "fav");
    }
  }
};

//Switch to add and remove from saveList Reducer State
const saveReducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      return addRecipe(state, action.payload, "save");
    }
    case "REMOVE": {
      return removeRecipe(state, action.payload, "save");
    }
    default:
      return state;
  }
};

const RecipeContextProvider = ({ children }) => {
  const [favList, favDispatch] = useReducer(
    favReducer,
    JSON.parse(localStorage.getItem("favList")) || []
  );
  const [saveList, saveDispatch] = useReducer(
    saveReducer,
    JSON.parse(localStorage.getItem("saveList")) || []
  );

  return (
    <RecipeContext.Provider
      value={{ favList, saveList, favDispatch, saveDispatch }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export default RecipeContextProvider;

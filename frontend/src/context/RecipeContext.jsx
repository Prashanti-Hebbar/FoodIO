import { createContext, useReducer, useState } from "react";
import toast from "react-hot-toast";

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

  //Add to favList or saveList in local storage based on caller
  localStorage.setItem(caller, JSON.stringify(newState));

  //Show toast message based on caller
  toast.success(`${recipe.title} was added to ${caller === 'favList' ? 'favorites' : 'saved recipes'}`);

  return newState;
};

//Remove Recipe from Reducer State
const removeRecipe = (state, recipe, caller) => {
  const newState = state.filter((r) => {
    return recipe.id != r.id;
  });
  

  //Remove from favList or saveList in local storage based on caller
  localStorage.setItem(caller, JSON.stringify(newState));

  toast.success(`${recipe.title} was removed from ${caller === 'favList' ? 'favorites' : 'saved recipes'}`);
  return newState;
};

//Switch to add and remove from favList Reducer State
const favReducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      return addRecipe(state, action.payload, "favList");
    }
    case "REMOVE": {
      return removeRecipe(state, action.payload, "favList");
    }
  }
};

//Switch to add and remove from saveList Reducer State
const saveReducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      return addRecipe(state, action.payload, "saveList");
    }
    case "REMOVE": {
      return removeRecipe(state, action.payload, "saveList");
    }
    default:
      return state;
  }
};

const RecipeContextProvider = ({ children }) => {

  //Reducers
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

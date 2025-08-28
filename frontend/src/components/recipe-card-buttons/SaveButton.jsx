import React, { useContext } from "react";
import { RecipeContext } from "../../context/RecipeContext";
import { handleSave } from "../../utils/RecipeFunctions";

const SaveButton = ({ recipe }) => {
  const { saveList, saveDispatch } = useContext(RecipeContext);

  // check if this recipe is in favList
  const isSaved = saveList.some((r) => r.id === recipe.id);

  return (
    <button
      className="btn btn-link"
      onClick={() => handleSave(recipe, saveList, saveDispatch)}
    >
      <i
        className={`fas fa-bookmark  ${
          isSaved ? "text-warning" : "text-white"
        }`}
      ></i>
    </button>
  );
};

export default SaveButton;

import { useContext } from "react";
import { handleFav } from "../../utils/RecipeFunctions";
import { RecipeContext } from "../../context/RecipeContext";

const FavouriteButton = ({ recipe }) => {
  const { favList, favDispatch } = useContext(RecipeContext);

  // check if this recipe is in favList
  const isFav = favList.some((r) => r.id === recipe.id);

  return (
    <button
      className="btn btn-link"
      onClick={() => handleFav(recipe, favList, favDispatch)}
    >
      <i
        className={`fas fa-star ${
          isFav ? "text-warning" : "text-white"
        }`}
      ></i>
    </button>
  );
};

export default FavouriteButton;

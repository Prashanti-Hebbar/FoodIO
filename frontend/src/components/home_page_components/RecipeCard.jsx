import { Link, useNavigate } from "react-router-dom";
import FavouriteButton from "../recipe-card-buttons/FavouriteButton";
import SaveButton from "../recipe-card-buttons/SaveButton";
import ShareButton from "../recipe-card-buttons/ShareButton";
import ViewRecipeButton from "../recipe-card-buttons/ViewRecipeButton";

//Reusable card that can be rendered in multiple places.
const RecipeCard = ({ recipe }) => {

  return (
    <div key={recipe.id} className="flex-shrink-0 mb-4 me-3 custom-recipe-card">
      <div className="card">
        <div className="card-actions position-absolute end-0 m-2">
          {/* Favourite Button calls handleFav */}
          <FavouriteButton recipe={recipe}></FavouriteButton>

          {/* Save Button calls handleSave */}
          <SaveButton recipe={recipe}></SaveButton>

          {/* Share Button calls handleShare */}
          <ShareButton recipe={recipe}></ShareButton>
        </div>
        <img src={recipe.image} className="card-img-top" alt={recipe.title} />
        <div className="card-body">
          <h5 className="card-title">{recipe.title}</h5>
          <p className="card-text">Rating: {recipe.rating}</p>
          <ViewRecipeButton recipe_id={recipe.id}></ViewRecipeButton>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;

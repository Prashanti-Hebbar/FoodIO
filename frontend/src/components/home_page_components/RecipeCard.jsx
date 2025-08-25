import { useContext } from 'react';
import {Link} from 'react-router-dom';
import { RecipeContext } from '../../context/RecipeContext';
import { handleFav, handleSave, handleShare } from '../../utils/RecipeFunctions';

const RecipeCard = ({recipe}) => {
  const {favList, saveList, favDispatch, saveDispatch}=useContext(RecipeContext);

  return (
    <div key={recipe.id} className="flex-shrink-0 mb-4 me-3 custom-recipe-card">
      <div className="card">
        <div className="card-actions position-absolute end-0 m-2">
          {/* Favourite Button calls handleFav */}
          <button
            className={`btn btn-link ${
              recipe.isFavorite ? "text-warning" : "text-white"
            }`}
            onClick={() => handleFav(recipe, favList, favDispatch)}
          >
            <i className="fas fa-star"></i>
          </button>

          {/* Save Button calls handleSave */}
          <button
            className={`btn btn-link ${
              recipe.isSaved ? "text-primary" : "text-white"
            }`}
            onClick={() => handleSave(recipe, saveList, saveDispatch)}
          >
            <i className="fas fa-bookmark"></i>
          </button>

          {/* Share Button calls handleShare */}
          <button
            className="btn btn-link text-white"
            onClick={() => handleShare(recipe)}
          >
            <i className="fas fa-share-alt"></i>
          </button>
        </div>
        <img src={recipe.image} className="card-img-top" alt={recipe.title} />
        <div className="card-body">
          <h5 className="card-title">{recipe.title}</h5>
          <p className="card-text">Rating: {recipe.rating}</p>
          <Link to={`/ViewRecipe?id=${recipe.id}`} className="btn btn-primary">
            View Recipe
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;

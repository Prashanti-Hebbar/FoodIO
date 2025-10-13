import ButtonList from "../recipe-card-buttons/ButtonList";
import ViewRecipeButton from "../recipe-card-buttons/ViewRecipeButton";


const RecipeCard = ({ recipe }) => {
  return (
    <div
      key={recipe.id}
      className="flex-shrink-0 mb-4 me-3 custom-recipe-card w-75"
    >
      <div
        className="card h-full w-70 rounded-lg shadow-md overflow-hidden flex flex-col" 
      >
        <ButtonList recipe={recipe}></ButtonList>

        <img
          src={recipe.image}
          className="card-img-top w-full h-40 object-cover"
          alt={recipe.title}
        />

        <div className="p-4 bg-white dark:bg-black text-black dark:text-white transition-colors duration-300 flex flex-col flex-grow">
          <h5 className="card-title dark:text-gray-200 line-clamp-2">
            {recipe.title}
          </h5>

          <p className="card-text dark:text-gray-200 mb-3">
            Rating: {recipe.rating}
          </p>

          <div className="mt-auto">
            <ViewRecipeButton recipe_id={recipe.id}></ViewRecipeButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;

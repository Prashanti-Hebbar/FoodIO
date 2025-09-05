import ButtonList from "../recipe-card-buttons/ButtonList";
import ViewRecipeButton from "../recipe-card-buttons/ViewRecipeButton";

//Reusable card that can be rendered in multiple places.
const RecipeCard = ({ recipe }) => {

  return (
    <div key={recipe.id} className="flex-shrink-0 mb-4 me-3 custom-recipe-card ">
      <div className="card">
        <ButtonList recipe={recipe}></ButtonList>
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

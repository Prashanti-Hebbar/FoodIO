import recipes from "../../data/recipes";
import RecipeCard from "./RecipeCard";

//Maps over the list of recipeType like trending, newest, top-rated and calls RecipeCard
const RecipeListRenderer = ({ recipeType}) => {
  return (
    <div className="d-flex flex-nowrap overflow-auto">
      {recipes[recipeType].map((recipe) => (
        <RecipeCard recipe={recipe} key={recipe.id}></RecipeCard>
      ))}
    </div>
  );
};

export default RecipeListRenderer;


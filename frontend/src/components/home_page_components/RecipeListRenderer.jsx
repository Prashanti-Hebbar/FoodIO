import recipes from "../../pages/recipes";
import RecipeCard from "./RecipeCard";

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

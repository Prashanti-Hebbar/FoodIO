import { useNavigate } from "react-router-dom";

const ViewRecipeButton = ({ recipe_id }) => {
  const navigate = useNavigate();

  return (
    <button
      className="btn btn-primary"
      onClick={() => navigate(`/ViewRecipe?id=${recipe_id}`)}
    >
      View Recipe
    </button>
  );
};

export default ViewRecipeButton;

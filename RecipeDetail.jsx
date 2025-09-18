import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`/api/recipes/${id}`);
        setRecipe(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRecipe();
  }, [id]);

  if (!recipe) return <p className="p-4">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <img
        src={recipe.image || "/default-image.jpg"}
        alt={recipe.title}
        className="w-full h-96 object-cover rounded mb-4"
      />
      <h1 className="text-3xl font-bold mb-2">{recipe.title}</h1>
      <h2 className="text-xl font-semibold mb-1">Ingredients:</h2>
      <p className="mb-4">{recipe.ingredients}</p>
      <h2 className="text-xl font-semibold mb-1">Instructions:</h2>
      <p>{recipe.instructions}</p>
    </div>
  );
}

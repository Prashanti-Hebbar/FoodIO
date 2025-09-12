import { useEffect, useState } from "react";
import axios from "axios";

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get("/api/recipes"); // your API to get recipes
        setRecipes(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRecipes();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {recipes.map((recipe) => (
        <div key={recipe._id} className="border rounded shadow overflow-hidden">
          <img
            src={recipe.image || "/default-image.jpg"}
            alt={recipe.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-2">
            <h3 className="text-lg font-bold">{recipe.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}

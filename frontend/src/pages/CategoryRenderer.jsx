import { useParams } from "react-router-dom";
import recipes from "../data/recipes";
import "../styles/AllCat.css";
import CategoryCard from "../components/CategoryCard";

const CategoryRenderer = () => {
  const { category } = useParams();
  return (
    <div className="m-4 grid grid-cols-3 gap-4">
      {recipes[category].map((recipe) => (
        <CategoryCard recipe={recipe}></CategoryCard>
      ))}
    </div>
  );
};

export default CategoryRenderer;

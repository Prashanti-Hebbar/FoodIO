import { useRef, useState, useEffect } from "react";
import recipes from "../../data/recipes";
import RecipeCard from "./RecipeCard";

const RecipeListRenderer = ({ recipeType }) => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.8;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="position-relative">
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="position-absolute top-50 start-0 translate-middle-y btn btn-light shadow rounded-circle h-14 w-14"
          style={{ zIndex: 50, backgroundColor: "rgba(255,255,255,0.8)" }}
        >
          ◀
        </button>
      )}
      <div
        ref={scrollRef}
        className="d-flex flex-nowrap hide-scrollbar"
        style={{ overflowX: "auto", scrollBehavior: "smooth" }}
      >
        {recipes[recipeType] && recipes[recipeType].length > 0 ? (
          recipes[recipeType].map((recipe) => (
            <RecipeCard recipe={recipe} key={recipe.id} />
          ))
        ) : (
          <p className="text-gray-500">No recipes found</p>
        )}
      </div>
      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="position-absolute top-50 end-0 translate-middle-y btn btn-light shadow rounded-circle h-14 w-14 "
          style={{ zIndex: 10 }}
        >
          ▶
        </button>
      )}
    </div>
  );
};

export default RecipeListRenderer;

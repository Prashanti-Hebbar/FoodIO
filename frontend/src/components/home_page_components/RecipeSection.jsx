import RecipeListRenderer from './RecipeListRenderer'

//Sets the list to be rendered by RecipeListRenderer
const RecipeSection = () => {
  return (
    <div className="container mt-4 p-5  ">
        <h2 id="top-rated" className="mt-5"><b>Top Rated Recipes</b></h2>
        <RecipeListRenderer recipeType={"topRated"}></RecipeListRenderer>

        {/* <h2 className="mt-5"><b>Popular Recipes</b></h2>
        <RecipeListRenderer recipeType={"popular"}></RecipeListRenderer> */}

        <h2 id="trending" className="mt-5"><b>Trending Recipes</b></h2>
        <RecipeListRenderer recipeType={"trending"}></RecipeListRenderer>

        <h2 className="mt-5"><b>Newest Recipes</b></h2>
        <RecipeListRenderer recipeType={"newest"}></RecipeListRenderer>
    </div>
  )
}


export default RecipeSection

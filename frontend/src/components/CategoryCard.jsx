import ViewRecipeButton from './recipe-card-buttons/ViewRecipeButton'
import ButtonList from './recipe-card-buttons/ButtonList'

const CategoryCard = ({recipe}) => {
  return (
    <div key={recipe.id} className="recipe-card">
          <ButtonList recipe={recipe}></ButtonList>
          <img src={recipe.image} alt={recipe.title} />
          <div className="card-body">
            <div className="flex justify-between p-1 items-center">
              <h5 className="card-title">{recipe.title}</h5>
              <p className="card-title">{recipe.rating}⭐</p>
            </div>
            <p>{recipe.description}</p>
            <p className="text-black">🍽️ {recipe.servings} servings</p>
            <p className="text-black">⏱️ {recipe.cookTime}</p>

            <ViewRecipeButton recipe_id={recipe.id}></ViewRecipeButton>
          </div>
        </div>
  )
}

export default CategoryCard;
import FavouriteButton from "./FavouriteButton";
import SaveButton from "./SaveButton";
import ShareButton from "./ShareButton";

const ButtonList = ({recipe}) => {
  return (
    <div className="card-actions position-absolute end-0 m-2">
      {/* Favourite Button calls handleFav */}
      <FavouriteButton recipe={recipe}></FavouriteButton>

      {/* Save Button calls handleSave */}
      <SaveButton recipe={recipe}></SaveButton>

      {/* Share Button calls handleShare */}
      <ShareButton recipe={recipe}></ShareButton>
    </div>
  );
};

export default ButtonList;

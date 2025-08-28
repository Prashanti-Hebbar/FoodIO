import { handleShare } from "../../utils/RecipeFunctions";

export const ShareButton = ({ recipe }) => {
  return (
    <button
      className="btn btn-link text-white"
      onClick={() => handleShare(recipe)}
    >
      <i className="fas fa-share-alt"></i>
    </button>
  );
};

export default ShareButton;

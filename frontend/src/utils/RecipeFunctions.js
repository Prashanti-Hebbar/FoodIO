export const handleShare = (recipe) => {
  if (navigator.share) {
    navigator.share({
      title: recipe.title,
      text: `Check out this recipe for ${recipe.title}!`,
      url: window.location.href,
    });
  } else {
    const shareData = {
      title: recipe.title,
      url: window.location.href,
    };

    const shareDialog = document.createElement("dialog");
    document.body.style.overflow = "hidden";

    shareDialog.innerHTML = `
        <div class="share-options p-3">
          <h5>Share Recipe</h5>
          <button onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${shareData.url}')">
            <i class="fab fa-facebook"></i> Facebook
          </button>
          <button onclick="window.open('https://twitter.com/intent/tweet?text=${shareData.title}&url=${shareData.url}')">
            <i class="fab fa-twitter"></i> Twitter
          </button>
          <button onclick="window.open('https://wa.me/?text=${shareData.title} ${shareData.url}')">
            <i class="fab fa-whatsapp"></i> WhatsApp
          </button>
          <button id="closeDialog">Close</button>
        </div>
      `;

    shareDialog.querySelector("#closeDialog").addEventListener("click", () => {
      shareDialog.close();
      document.body.removeChild(shareDialog);
      document.body.style.overflow = "auto";
      document.removeEventListener("click", handleOutsideClick);
    });

    document.body.appendChild(shareDialog);
    shareDialog.showModal();

    const handleOutsideClick = (e) => {
      if (!shareDialog.contains(e.target)) {
        shareDialog.close();
        document.body.removeChild(shareDialog);
        document.body.style.overflow = "auto";
        document.removeEventListener("click", handleOutsideClick);
      }
    };

    setTimeout(() => {
      document.addEventListener("click", handleOutsideClick);
    }, 10);
  }
};

//If recipe exists in saveList, then call Reducer dispatch func to remove it
//If recipe does not exist in saveList, then call Reducer dispatch func to add it
export const handleFav = (r, favList, favDispatch) => {
  const recipe = check(r, favList);
  if (recipe) favDispatch({ type: "REMOVE", payload: recipe });
  else favDispatch({ type: "ADD", payload: r });
};

//If recipe exists in favList, then call Reducer dispatch func to remove it
//If recipe does not exist in favList, then call Reducer dispatch func to add it
export const handleSave = (r, saveList, saveDispatch) => {
  const recipe = check(r, saveList);
  if (recipe) saveDispatch({ type: "REMOVE", payload: recipe });
  else saveDispatch({ type: "ADD", payload: r });
};

//Check if recipe is already existing in favList or saveList
const check = (r, list) => {
  if (list.length!=0) {
    return list.find((recipe) => r.id === recipe.id);
  }
};

import React, { useState } from "react";

const AddRecipe = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div>
      <h1>Add Recipe</h1>
      <input type="file" accept="image/png, image/jpeg" onChange={handleImageChange} />
      {image && <img src={image} alt="Preview" style={{ width: "200px" }} />}
    </div>
  );
};

export default AddRecipe;

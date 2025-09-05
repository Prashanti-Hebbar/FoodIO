import { useState } from "react";
import axios from "axios";

export default function RecipeForm() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        alert("Only JPEG or PNG files are allowed");
        return;
      }
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        alert("Image size must be less than 2MB");
        return;
      }
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("ingredients", ingredients);
    formData.append("instructions", instructions);
    if (image) formData.append("image", image);

    try {
      const res = await axios.post("/api/recipes/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Recipe added successfully!");
      setTitle("");
      setIngredients("");
      setInstructions("");
      setImage(null);
    } catch (err) {
      console.error(err);
      alert("Error uploading recipe");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-4 border rounded shadow">
      <h2 className="text-2xl font-bold text-center">Add a Recipe</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full rounded"
        required
      />

      <textarea
        placeholder="Ingredients"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        className="border p-2 w-full rounded"
        rows={4}
        required
      />

      <textarea
        placeholder="Instructions"
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        className="border p-2 w-full rounded"
        rows={4}
        required
      />

      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleImageChange}
        className="border p-2 w-full rounded"
      />

      {/* Image Preview */}
      {image && (
        <img
          src={URL.createObjectURL(image)}
          alt="Preview"
          className="w-32 h-32 object-cover rounded mt-2"
        />
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? "Uploading..." : "Add Recipe"}
      </button>
    </form>
  );
}

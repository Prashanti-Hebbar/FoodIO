import React, { useState } from 'react';
import axios from 'axios';
import '../styles/aichat.css';

function AIChat() {
    const [diet, setDiet] = useState('');
    const [cuisine, setCuisine] = useState('');
    const [time, setTime] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [recipe, setRecipe] = useState('');
    const [loading, setLoading] = useState(false);
    const [downloadUrl,setDownloadUrl] = useState('');    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setRecipe('');

        try {
            const response = await axios.post('http://localhost:3001/recipes/api/get-recipe', {
                diet,
                cuisine,
                time,
                ingredients,
            });
            setRecipe(response.data.recipe);
            const blob = new Blob([response.data.recipe], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            setDownloadUrl(url);

        } catch (error) {
            console.error(error);
            alert('Failed to get recipe. Please try again.');
        }

        setLoading(false);
    };
    const handleCloseRecipe = () => {
        setRecipe('');
        setDownloadUrl('');
    };

    return (
        <div className="container">
            <h2>🍳 Chat with AI: Get Recipe Suggestions</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Diet Preference</label>
                    <select
                        value={diet}
                        onChange={(e) => setDiet(e.target.value)}
                        required
                    >
                        <option value="">Select Diet</option>
                        <option value="Vegetarian">Vegetarian</option>
                        <option value="Vegan">Vegan</option>
                        <option value="Non-Vegetarian">Non-Vegetarian</option>
                        <option value="Gluten-Free">Gluten-Free</option>
                        <option value="Any">Any</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Cuisine Preference</label>
                    <select
                        value={cuisine}
                        onChange={(e) => setCuisine(e.target.value)}
                        required
                    >
                        <option value="">Select Cuisine</option>
                        <option value="Indian">Indian</option>
                        <option value="Italian">Italian</option>
                        <option value="Chinese">Chinese</option>
                        <option value="Mexican">Mexican</option>
                        <option value="Any">Any</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Max Preparation Time (minutes)</label>
                    <input
                        type="number"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                        min="1"
                        placeholder="e.g., 30"
                    />
                </div>

                <div className="form-group">
                    <label>Available Ingredients</label>
                    <textarea
                        rows="4"
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                        placeholder="e.g., rice, tomatoes, spinach, paneer"
                        required
                    ></textarea>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="button"
                >
                    {loading ? 'Generating Recipe...' : 'Get Recipe'}
                </button>
            </form>

            {recipe && (
    <div className="recipe-card">
        <button
            onClick={handleCloseRecipe}
            className="close-button"
            aria-label="Close recipe"
        >
            ✖
        </button>
        <h3>✨ Your AI-Generated Recipe</h3>
        <p>{recipe}</p>

        {downloadUrl && (
            <a
                href={downloadUrl}
                download="ai_recipe.txt"
                className="button download-button"
                style={{ marginTop: '1rem', display: 'block', textAlign: 'center' }}
            >
                Download Recipe
            </a>
        )}
    </div>
)}


        </div>
    );
}

export default AIChat;

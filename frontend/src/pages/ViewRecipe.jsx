import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import "../ViewRecipe.css";
import recipes from './recipes';
import axios from 'axios';
// Removed FavoriteButton usage on this page header
import RatingComment from '../components/RatingComment';

const ViewRecipe = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const recipeId = parseInt(searchParams.get('id'), 10); // Get the ID from the URL

    const [recipe, setRecipe] = useState(null); // State to hold recipe data
    const [averageRating, setAverageRating] = useState(0);
    const [totalRatings, setTotalRatings] = useState(0);
    const pdfRef = useRef();

    useEffect(() => {
        const selectedRecipe = Object.values(recipes).flat().find(recipe => recipe.id === recipeId);

        if (selectedRecipe) {
            setRecipe(selectedRecipe);
        } else {
            console.error("Recipe not found!");
        }

        // Try to fetch dynamic stats from backend if a mapped DB id exists
        const dbId = localStorage.getItem(`recipeDbId:${recipeId}`);
        if (dbId) {
            axios.get(`http://localhost:3001/recipes/${dbId}`)
                .then(r => {
                    const data = r.data || {};
                    setAverageRating(data.averageRating || 0);
                    setTotalRatings(data.totalRatings || 0);
                })
                .catch(() => {
                    // fallback to static defaults if backend not available
                    setAverageRating(selectedRecipe?.rating || 0);
                    setTotalRatings(selectedRecipe?.ratingCount || 0);
                });
        } else {
            setAverageRating(selectedRecipe?.rating || 0);
            setTotalRatings(selectedRecipe?.ratingCount || 0);
        }
    }, [recipeId]);

    const handleRatingUpdate = (newAverageRating, newTotalRatings) => {
        setAverageRating(newAverageRating);
        setTotalRatings(newTotalRatings);
    };

    // Favorites count removed from header for this page


    const generatePDF = () => {
        const doc = new jsPDF('p', 'pt', 'a4');
        
        const content = `
            ${recipe.title}
            
            Description:
            ${recipe.description}
            
            Preparation Time: ${recipe.prepTime}
            Cooking Time: ${recipe.cookTime}
            Servings: ${recipe.servings}
            
            Ingredients:
            ${recipe.ingredients.map(ing => 
                `• ${ing.quantity} ${ing.name} ${ing.notes ? `(${ing.notes})` : ''}`
            ).join('\n')}
            
            Instructions:
            ${recipe.instructions.map((inst, index) => 
                `${index + 1}. ${inst}`
            ).join('\n')}
            
            Nutritional Information (per serving):
            ${Object.entries(recipe.nutritionalInfo || {})
                .map(([key, value]) => `${key}: ${value}`)
                .join('\n')}
        `;

        doc.setFontSize(12);
        doc.text(content, 40, 40, { 
            maxWidth: 500,
            lineHeight: 1.5
        });

        doc.save(`${recipe.title.toLowerCase().replace(/\s+/g, '-')}-recipe.pdf`);
    };

    if (!recipe) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-4" ref={pdfRef}>
            <div className="row">
                {/* Left Section - Fixed Image */}
                <div className="col-md-6 recipe-left">
                    <div className="recipe-image-container">
                        <img src={recipe.image} className="img-fluid rounded recipe-image" alt={recipe.title} />
                    </div>
                </div>

                {/* Right Section - Scrollable */}
                <div className="col-md-6 recipe-right">
                    <h1 id='h1'>{recipe.title}</h1>
                    
                    {/* Recipe Stats */}
                    {/* Header ratings and heart removed by request. Rating stars are available in the Rate this Recipe section below. */}
                    
                    <p className="mt-2">{recipe.description}</p>

                    <div className="row">
                        <div className="col-md-4">
                            <p><strong>Prep Time:</strong> {recipe.prepTime}</p>
                        </div>
                        <div className="col-md-4">
                            <p><strong>Cook Time:</strong> {recipe.cookTime}</p>
                        </div>
                        <div className="col-md-4">
                            <p><strong>Servings:</strong> {recipe.servings}</p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <p><strong>Cuisine:</strong> {recipe.cuisine}</p>
                        </div>
                        <div className="col-md-4">
                            <p><strong>Category:</strong> {recipe.category}</p>
                        </div>
                        <div className="col-md-4">
                            {recipe.dietaryInfo && (
                                <p><strong>Dietary Info:</strong> {recipe.dietaryInfo.join(", ")}</p>
                            )}
                        </div>
                    </div>

                    <h2 id='h2'>Ingredients</h2>
                    <ul className="ingredients-list">
                        {recipe.ingredients.map((ingredient, index) => (
                            <li key={index}>
                                {ingredient.quantity} {ingredient.name}
                                {ingredient.notes && ` (${ingredient.notes})`}
                            </li>
                        ))}
                    </ul>

                    <h2>Instructions</h2>
                    <ol className="instructions-list">
                        {recipe.instructions.map((instruction, index) => (
                            <li key={index}>{instruction}</li>
                        ))}
                    </ol>

                    {recipe.nutritionalInfo && (
                        <div className="nutritional-info">
                            <h2>Nutritional Information (per serving)</h2>
                            <ul>
                                {Object.entries(recipe.nutritionalInfo).map(([key, value]) => (
                                    <li key={key}>{key}: {value}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <button 
                        className="btn btn-primary mt-3" 
                        onClick={generatePDF}
                    >
                        Download Recipe
                    </button>
                </div>
            </div>

            {/* Ratings and Comments Section */}
            <RatingComment 
                recipeId={localStorage.getItem(`recipeDbId:${recipeId}`) || recipeId}
                onRatingUpdate={handleRatingUpdate}
            />
        </div>
    );
};

export default ViewRecipe;

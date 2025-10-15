import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import "../ViewRecipe.css";
import recipes from "../data/recipes";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ViewRecipe = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(window.location.search);
    const recipeId = parseInt(params.get("id"), 10);

    const [recipe, setRecipe] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [likes, setLikes] = useState(0);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const pdfRef = useRef();

    useEffect(() => {
        setIsLoading(true);
        const selectedRecipe = Object.values(recipes).flat().find(r => r.id === recipeId);
        if (selectedRecipe) {
            setRecipe(selectedRecipe);
        } else {
            setRecipe(null);
        }
        setIsLoading(false);
    }, [recipeId]); // ✅ Runs whenever recipeId changes

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
            ${recipe.ingredients.map(ing => `• ${ing.quantity} ${ing.name} ${ing.notes ? `(${ing.notes})` : ''}`).join('\n')}
            Instructions:
            ${recipe.instructions.map((inst, i) => `${i + 1}. ${inst}`).join('\n')}
        `;
        doc.setFontSize(12);
        doc.text(content, 40, 40, { maxWidth: 500, lineHeight: 1.5 });
        doc.save(`${recipe.title.toLowerCase().replace(/\s+/g, '-')}-recipe.pdf`);
    };

    const addComment = () => {
        if (newComment.trim()) {
            setComments([{ text: newComment, date: new Date().toLocaleString() }, ...comments]);
            setNewComment("");
        }
    };

    const suggestedRecipes = Object.values(recipes).flat().filter(r => r.id !== recipeId).slice(0, 3);

    if (isLoading) {
        return (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <p>Loading...</p>
            </div>
        );
    }

    if (!recipe) {
        return (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <p>Recipe not found. Please try again.</p>
                <button className="btn btn-secondary" onClick={() => navigate('/home')}>
                    Clear / Go Back
                </button>
            </div>
        );
    }

    const nutritionData = {
        labels: Object.keys(recipe.nutritionalInfo || {}),
        datasets: [
            {
                label: 'Nutritional Info per Serving',
                data: Object.values(recipe.nutritionalInfo || {}),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    return (
        <div className="container mt-4" ref={pdfRef}>
            <div className="row">
                {/* Left - Large Featured Image */}
                <div className="col-md-6 recipe-left position-relative">
                    <img src={recipe.image} className="img-fluid rounded recipe-image" alt={recipe.title} />
                    <div className="image-actions position-absolute top-0 end-0 p-3">
                        <button className="btn btn-light me-2" onClick={() => setLikes(likes + 1)}><i className="fas fa-heart"></i></button>
                        <button className="btn btn-light me-2"><i className="fas fa-share-alt"></i></button>
                        <button className="btn btn-light"><i className="fas fa-bookmark"></i></button>
                    </div>
                </div>

                {/* Right - Details */}
                <div className="col-md-6 recipe-right">
                    <h1 id='h1'>{recipe.title}</h1>
                    <div className="rating mb-2">
                        {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < recipe.rating ? "text-warning" : "text-secondary"}>★</span>
                        ))}
                        <span className="ms-2">({recipe.ratingCount} ratings)</span>
                    </div>
                    <p>{recipe.description}</p>

                    <div className="row mb-3">
                        <div className="col-md-4"><strong>Prep Time:</strong> {recipe.prepTime}</div>
                        <div className="col-md-4"><strong>Cook Time:</strong> {recipe.cookTime}</div>
                        <div className="col-md-4"><strong>Servings:</strong> {recipe.servings}</div>
                    </div>

                    <h2 id='h2'>Ingredients</h2>
                    <ul className="ingredients-list">
                        {recipe.ingredients.map((ing, i) => (
                            <li key={i}>{ing.quantity} {ing.name} {ing.notes && `(${ing.notes})`}</li>
                        ))}
                    </ul>

                    <h2>Instructions</h2>
                    <div className="instruction-steps">
                        {recipe.instructions.map((step, i) => (
                            <div key={i} className="card mb-2 p-2">
                                <strong>Step {i + 1}:</strong> {step}
                            </div>
                        ))}
                    </div>

                    {recipe.nutritionalInfo && (
                        <div className="mt-4">
                            <h2>Nutritional Info</h2>
                            <Bar data={nutritionData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
                        </div>
                    )}

                    <button className="btn btn-primary mt-3" onClick={generatePDF}>Download Recipe</button>
                </div>
            </div>

            <div className="mt-5">
                <h3>Comments</h3>
                <div className="d-flex mb-2">
                    <input 
                        type="text" 
                        value={newComment} 
                        onChange={(e) => setNewComment(e.target.value)} 
                        className="form-control me-2" 
                        placeholder="Leave a comment..." 
                    />
                    <button className="btn btn-success" onClick={addComment}>Post</button>
                </div>
                <ul className="list-group">
                    {comments.map((c, i) => (
                        <li key={i} className="list-group-item">
                            <small className="text-muted">{c.date}</small><br />
                            {c.text}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mt-5">
                <h3>Suggested Recipes</h3>
                <div className="row">
                    {suggestedRecipes.map(s => (
                        <div className="col-md-4" key={s.id}>
                            <div 
                                className="card" 
                                style={{ cursor: 'pointer' }}
                                onClick={() => navigate(`/recipe/${s.id}`)}
                            >
                                <img src={s.image} className="card-img-top" alt={s.title} />
                                <div className="card-body">
                                    <h5>{s.title}</h5>
                                    <p>{s.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ViewRecipe;

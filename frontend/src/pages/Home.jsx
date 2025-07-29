import React, { useState, useEffect } from 'react'
import "../App.css"
import "./recipes";
import { Link } from 'react-router-dom';


const Home = () => {
    const [activeTestimonial, setActiveTestimonial] = useState(2);
    const MAX_VISIBILITY = 3;

    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "Home Chef",
            avatar: "../user1.jpg",
            content: "Foodio has completely transformed my cooking experience! The recipes are easy to follow and the community is so supportive. I've discovered so many amazing dishes!"
        },
        {
            name: "Michael Chen",
            role: "Professional Chef",
            avatar: "../user2.jpg",
            content: "As a professional chef, I love how Foodio allows me to share my creations with food enthusiasts. The platform is intuitive and the feedback from users is invaluable."
        },
        {
            name: "Emily Rodriguez",
            role: "Food Blogger",
            avatar: "../user3.jpg",
            content: "I'm a busy mom and Foodio has been a lifesaver! The quick and easy recipes help me prepare delicious meals for my family without spending hours in the kitchen."
        },
        {
            name: "David Kim",
            role: "Tech Enthusiast",
            avatar: "../user4.jpg",
            content: "The AI recipe suggestions are incredible! It's like having a personal chef who knows exactly what I love to cook. Foodio has revolutionized my meal planning."
        },
        {
            name: "Maria Santos",
            role: "Cooking Beginner",
            avatar: "../user5.jpg",
            content: "Perfect for beginners like me! The step-by-step instructions and video tutorials make cooking feel approachable and fun. I've gained so much confidence!"
        },
        {
            name: "James Wilson",
            role: "Food Explorer",
            avatar: "../user6.jpg",
            content: "Love the diverse recipe collection! From authentic international dishes to modern fusion, Foodio has expanded my culinary horizons tremendously."
        }
    ];

    const [recipes, setRecipes] = useState({
        topRated: [
            { id: 1, title: 'Delicious Pasta', image: '../pasta.jpg', rating: 4.5 },
            { id: 2, title: 'Spicy Tacos', image: '../tacos.jpg', rating: 4.2 },
            { id: 3, title: 'Pumpkin Cupcakes', image: '../cakes.jpg', rating: 4.5 },
            { id: 4, title: 'Apple Pie', image: '../pie.jpg', rating: 4.2 },
            { id: 5, title: 'Best Lasagna', image: '../lasagna.jpg', rating: 4.5 },
            { id: 6, title: 'Harira', image: '../harira.jpg', rating: 4.2 }
        ],
        trending: [
            { id: 7, title: 'Vegan Curry', image: '../curry.jpg', rating: 4.8 },
            { id: 8, title: 'Chocolate Cake', image: '../choco.jpg', rating: 4.7 },
            { id: 9, title: 'corn fritters', image: '../corn.jpg', rating: 4.8 },
            { id: 10, title: 'Bread Cheese Lollipop', image: '../lollipop.jpg', rating: 4.7 },
            { id: 11, title: 'Sweet Potato Boats', image: '../boats.jpg', rating: 4.8 },
            { id: 12, title: 'Walnut Chikki', image: '../chikki.jpg', rating: 4.7 }
        ],
        newest: [
            { id: 13, title: 'Summer Salad', image: '../salad.jpg', rating: 4.0 },
            { id: 14, title: 'Grilled Salmon', image: '../salmon.jpg', rating: 4.3 },
            { id: 15, title: 'Loco Moco', image: '../loco.jpg', rating: 4.0 },
            { id: 16, title: 'Cinnamon Roll Casserole', image: '../toast.jpg', rating: 4.3 },
            { id: 17, title: 'Frikadellen', image: '../Frikadellen.jpg', rating: 4.0 },
            { id: 18, title: 'coffe jelly', image: '../jelly.jpg', rating: 4.3 }
        ]
    });

    const findRecipeById = (recipeId, recipeList) => {
        for (let category in recipeList) {
            const recipe = recipeList[category].find(r => r.id === recipeId);
            if (recipe) return recipe;
        }
        return null;
    };

    const renderRecipes = (recipeType) => (        <div className="d-flex flex-nowrap overflow-auto">
            {recipes[recipeType].map((recipe) => (
                <div key={recipe.id} className="col-md-3 mb-4 me-4">
                    <div className="card">
                        <div className="card-actions position-absolute end-0 m-2">
                            <button 
                                className={`btn btn-link ${recipe.isFavorite ? 'text-warning' : 'text-white'}`}
                                onClick={() => handleFavorite(recipe.id)}
                            >
                                <i className="fas fa-star"></i>
                            </button>
                            <button 
                                className={`btn btn-link ${recipe.isSaved ? 'text-primary' : 'text-white'}`}
                                onClick={() => handleSave(recipe.id)}
                            >
                                <i className="fas fa-bookmark"></i>
                            </button>
                            <button 
                                className="btn btn-link text-white"
                                onClick={() => handleShare(recipe)}
                            >
                                <i className="fas fa-share-alt"></i>
                            </button>
                        </div>
                        <img src={recipe.image} className="card-img-top" alt={recipe.title} />
                        <div className="card-body">
                            <h5 className="card-title">{recipe.title}</h5>
                            <p className="card-text">Rating: {recipe.rating}</p>
                            <Link to={`/ViewRecipe?id=${recipe.id}`} className="btn btn-primary">View Recipe</Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    // Add these handler functions
    const handleFavorite = (recipeId) => {
        // Add to favorites list in user profile
        const updatedRecipes = {...recipes};
        const recipe = findRecipeById(recipeId, updatedRecipes);
        recipe.isFavorite = !recipe.isFavorite;
        setRecipes(updatedRecipes);
    };

    const handleSave = (recipeId) => {
        // Add to saved recipes list in user profile
        const updatedRecipes = {...recipes};
        const recipe = findRecipeById(recipeId, updatedRecipes);
        recipe.isSaved = !recipe.isSaved;
        setRecipes(updatedRecipes);
    };

    const handleShare = (recipe) => {
        if (navigator.share) {
            navigator.share({
                title: recipe.title,
                text: `Check out this recipe for ${recipe.title}!`,
                url: window.location.href
            });
        } else {
            // Fallback sharing options
            const shareData = {
                title: recipe.title,
                url: window.location.href
            };
        
            // Create share dialog
            const shareDialog = document.createElement('dialog');
            
            //fixing the position
            document.body.style.overflow = 'hidden';

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
            shareDialog.querySelector('#closeDialog').addEventListener('click', () => {
                shareDialog.close();
                document.body.removeChild(shareDialog);
                document.removeEventListener('click', handleOutsideClick);
            });

            document.body.appendChild(shareDialog);
            shareDialog.showModal();
            const handleOutsideClick = (e) => {
                if (!shareDialog.contains(e.target)) {
                        shareDialog.close();
                        document.body.removeChild(shareDialog);
                        document.removeEventListener('click', handleOutsideClick);
                    }           
            };

        setTimeout(() => {
            document.addEventListener('click', handleOutsideClick);
        }, 10);
    }
};


    return (
      <div>
        <div id="recipeCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="../carousel1.jpg" className="d-block w-100" alt="Recipe 1" style={{objectFit:"cover", height:"550px"}}/>
              <div className="carousel-caption d-none d-md-block">
                <h5>Delicious Dishes</h5>
                <p>Explore a world of culinary delights.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src="../carousel2.jpg" className="d-block w-100" alt="Recipe 2" style={{objectFit:"cover", height:"550px"}}/>
              <div className="carousel-caption d-none d-md-block">
                <h5>Healthy & Nutritious</h5>
                <p>Discover recipes that nourish your body and soul.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src="../carousel3.jpg" className="d-block w-100" alt="Recipe 2" style={{objectFit:"cover", height:"550px"}}/>
              <div className="carousel-caption d-none d-md-block">
                <h5>Quick & Easy</h5>
                <p>Whip up delicious meals in minutes.</p>
              </div>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#recipeCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#recipeCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        <div className="container mt-4 p-5">
                <h2 className='mt-5'><b>Top Rated Recipes</b></h2>
                {renderRecipes('topRated')}

                <h2 className='mt-5'><b>Trending Recipes</b></h2>
                {renderRecipes('trending')}

                <h2 className='mt-5'><b>Newest Recipes</b></h2>
                {renderRecipes('newest')}

                {/* Testimonials Section */}
                <div className="testimonials-section">
                    <h2><b>What Our Users Say</b></h2>
                    <div className="testimonials-carousel-container">
                        <div className="testimonials-carousel">
                            {activeTestimonial > 0 && (
                                <button className="carousel-nav left" onClick={() => setActiveTestimonial(i => i - 1)}>
                                    <i className="fas fa-chevron-left"></i>
                                </button>
                            )}
                            {testimonials.map((testimonial, i) => (
                                <div key={i} className="testimonial-card-container" style={{
                                    '--active': i === activeTestimonial ? 1 : 0,
                                    '--offset': (activeTestimonial - i) / 3,
                                    '--direction': Math.sign(activeTestimonial - i),
                                    '--abs-offset': Math.abs(activeTestimonial - i) / 3,
                                    'pointerEvents': activeTestimonial === i ? 'auto' : 'none',
                                    'opacity': Math.abs(activeTestimonial - i) >= MAX_VISIBILITY ? '0' : '1',
                                    'display': Math.abs(activeTestimonial - i) > MAX_VISIBILITY ? 'none' : 'block',
                                }}>
                                    <div className="testimonial-card">
                                        <div className="testimonial-rating">
                                            {[...Array(5)].map((_, starIndex) => (
                                                <i key={starIndex} className="fas fa-star"></i>
                                            ))}
                                        </div>
                                        <p className="testimonial-text">
                                            {testimonial.content}
                                        </p>
                                        <div className="testimonial-author">
                                            <img src={testimonial.avatar} alt={testimonial.name} className="testimonial-avatar" />
                                            <h6>{testimonial.name}</h6>
                                            <small>{testimonial.role}</small>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {activeTestimonial < testimonials.length - 1 && (
                                <button className="carousel-nav right" onClick={() => setActiveTestimonial(i => i + 1)}>
                                    <i className="fas fa-chevron-right"></i>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
        </div>

      </div>
    );
};

export default Home;

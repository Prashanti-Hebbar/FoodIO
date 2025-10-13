import React, { useEffect } from 'react';
import "../About.css";

const About = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          // Once animated, we don't need to observe anymore to prevent conflicts
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.animate-on-scroll, .feature-card, .faq-section, .section-title');
    
    animateElements.forEach((el) => {
      observer.observe(el);
    });

    // Handle FAQ items separately to avoid conflicts with Bootstrap collapse
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('animate');
      }, index * 100);
    });

    return () => {
      animateElements.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="container-fluid p-5">
      <div className='row mb-4 p-3'>
        <h1 className="text-center">Welcome to FoodIO👩‍🍳🍽️</h1>
        <p className="mt-2 text-center">
          Welcome to <strong>Foodio</strong> — your premier destination for exploring, sharing, and savoring exquisite recipes from every corner of the globe! At <strong>Foodio</strong>, we believe that food is much more than mere nourishment; it's a universal language that brings people together, celebrates diverse cultures, and ignites creativity in every kitchen. Join us on this flavorful journey where inspiration meets community, and every dish tells a story.
        </p>
      </div>

      <div className='row mt-5 p-5'>
        <h2 className="text-center mb-4 section-title">Why Choose FoodIO?</h2>

        <div className="row justify-content-center ">
          <div className="col-md-4 col-sm-6 mb-4 feature-card   ">
            <div className="card h-100 ">
              <div className="card-body text-center ">
                <h5 className="card-title">Endless Recipes</h5>
                <p className="card-text">Discover thousands of dishes across various cuisines, from traditional to modern, catering to every taste and skill level.</p>
              </div>
            </div>
          </div>

          <div className="col-md-4 col-sm-6 mb-4 feature-card">
            <div className="card h-100">
              <div className="card-body text-center">
                <h5 className="card-title">Community-Driven</h5>
                <p className="card-text">Share your culinary creations, get inspired by home chefs worldwide, and connect with a passionate community of food lovers.</p>
              </div>
            </div>
          </div>

          <div className="col-md-4 col-sm-6 mb-4 feature-card">
            <div className="card h-100">
              <div className="card-body text-center">
                <h5 className="card-title">Easy-to-Follow Guides</h5>
                <p className="card-text">Access step-by-step instructions, helpful tips, and detailed ingredient lists that make even complex recipes approachable.</p>
              </div>
            </div>
          </div>

          <div className="col-md-4 col-sm-6 mb-4 feature-card">
            <div className="card h-100">
              <div className="card-body text-center">
                <h5 className="card-title">Save & Share</h5>
                <p className="card-text">Bookmark your favorite recipes for quick access and easily share your culinary discoveries with friends and family.</p>
              </div>
            </div>
          </div>

          <div className="col-md-4 col-sm-6 mb-4 feature-card">
            <div className="card h-100">
              <div className="card-body text-center">
                <h5 className="card-title">Interactive & Fun</h5>
                <p className="card-text">Rate recipes, leave insightful reviews, and join lively discussions to enhance your cooking and connect with others.</p>
              </div>
            </div>
          </div>

          <div className="col-md-4 col-sm-6 mb-4 feature-card">
            <div className="card h-100">
              <div className="card-body text-center">
                <h5 className="card-title">Fresh Content Always</h5>
                <p className="card-text">Discover new recipes and seasonal favorites added regularly to keep your cooking inspiring and exciting.</p>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="row mt-5 p-5 text-center faq-section">
        <h2 className="section-title">Frequently Asked Questions (FAQs)</h2>

        <div className="accordion" id="faqAccordion">
        {/* Question 1 */}
        <div className="mb-3 faq-item">
          <button
            className="btn btn-outline-warning w-100 text-start"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#faq1"
            aria-expanded="false"
            aria-controls="faq1"
            style={{
              backgroundColor: "transparent",
              borderWidth: "1.5px",
              borderColor: "#e76f51",
              borderStyle: "solid",
              lineHeight: "40px",
              fontSize: "20px",
              color: "#e76f51",
            }}
          >
            How do I submit a recipe on Foodio?
          </button>
          <div className="collapse mt-2" id="faq1" data-bs-parent="#faqAccordion">
            <div className="card card-body" style={{ backgroundColor: "#eeeeee" }}>
              After registering and logging in, navigate to the "Submit Recipe" section, fill in your recipe details, upload photos, and hit submit. Your recipe will then be shared with our community!
            </div>
          </div>
        </div>

        {/* Question 2 */}
        <div className="mb-3 faq-item">
          <button
            className="btn btn-outline-warning w-100 text-start"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#faq2"
            aria-expanded="false"
            aria-controls="faq2"
            style={{
              backgroundColor: "transparent",
              borderWidth: "1.5px",
              borderColor: "#e76f51",
              borderStyle: "solid",
              lineHeight: "40px",
              fontSize: "20px",
              color: "#e76f51",
            }}
          >
            Is Foodio free to use?
          </button>
          <div className="collapse mt-2" id="faq2" data-bs-parent="#faqAccordion">
            <div className="card card-body" style={{ backgroundColor: "#eeeeee" }}>
              Yes! Foodio is completely free for all users. You can browse, share, and interact with recipes without any subscription fees.
            </div>
          </div>
        </div>

        {/* Question 3 */}
        <div className="mb-3 faq-item">
          <button
            className="btn btn-outline-warning w-100 text-start"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#faq3"
            aria-expanded="false"
            aria-controls="faq3"
            style={{
              backgroundColor: "transparent",
              borderWidth: "1.5px",
              borderColor: "#e76f51",
              borderStyle: "solid",
              lineHeight: "40px",
              fontSize: "20px",
              color: "#e76f51",
            }}
          >
            Can I save recipes to view later?
          </button>
          <div className="collapse mt-2" id="faq3" data-bs-parent="#faqAccordion">
            <div className="card card-body" style={{ backgroundColor: "#eeeeee" }}>
              Absolutely! Use the "Bookmark" feature on any recipe to save it to your personal collection for easy access anytime.
            </div>
          </div>
        </div>

        {/* Question 4 */}
        <div className="mb-3 faq-item">
          <button
            className="btn btn-outline-warning w-100 text-start"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#faq4"
            aria-expanded="false"
            aria-controls="faq4"
            style={{
              backgroundColor: "transparent",
              borderWidth: "1.5px",
              borderColor: "#e76f51",
              borderStyle: "solid",
              lineHeight: "40px",
              fontSize: "20px",
              color: "#e76f51",
            }}
          >
            How do the rating and review system work?
          </button>
          <div className="collapse mt-2" id="faq4" data-bs-parent="#faqAccordion">
            <div className="card card-body" style={{ backgroundColor: "#eeeeee" }}>
              After trying a recipe, you can rate it from 1 to 5 stars and leave a review to share your feedback with the community.
            </div>
          </div>
        </div>

        {/* Question 5 */}
        <div className="mb-3 faq-item">
          <button
            className="btn btn-outline-warning w-100 text-start"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#faq5"
            aria-expanded="false"
            aria-controls="faq5"
            style={{
              backgroundColor: "transparent",
              borderWidth: "1.5px",
              borderColor: "#e76f51",
              borderStyle: "solid",
              lineHeight: "40px",
              fontSize: "20px",
              color: "#e76f51",
            }}
          >
            Is there a mobile app for Foodio?
          </button>
          <div className="collapse mt-2" id="faq5" data-bs-parent="#faqAccordion">
            <div className="card card-body" style={{ backgroundColor: "#eeeeee" }}>
              We are currently working on mobile apps for iOS and Android! Meanwhile, you can use Foodio through any mobile browser with our fully responsive design.
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};
export default About;
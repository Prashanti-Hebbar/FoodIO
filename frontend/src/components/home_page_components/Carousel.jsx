import React from "react";
import "../../App.css";

const Carousel = () => {
  return (
    <div>
      <div
        id="recipeCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="../carousel1.jpg"
              className="d-block w-100"
              alt="Recipe 1"
              style={{ objectFit: "cover", height: "550px" }}
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Delicious Dishes</h5>
              <p>Explore a world of culinary delights.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="../carousel2.jpg"
              className="d-block w-100"
              alt="Recipe 2"
              style={{ objectFit: "cover", height: "550px" }}
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Healthy & Nutritious</h5>
              <p>Discover recipes that nourish your body and soul.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="../carousel3.jpg"
              className="d-block w-100"
              alt="Recipe 3"
              style={{ objectFit: "cover", height: "550px" }}
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Quick & Easy</h5>
              <p>Whip up delicious meals in minutes.</p>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#recipeCarousel"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#recipeCarousel"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Carousel;

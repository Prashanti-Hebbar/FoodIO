import { useState } from "react";
import testimonials from "../../data/Testimonials";

const Testimonial = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(2);
  const MAX_VISIBILITY = 3;

  return (
    <div className="container mt-4 p-5">
      <div className="testimonials-section">
        <h2>
          <b>What Our Users Say</b>
        </h2>
        <div className="testimonials-carousel-container">
          <div className="testimonials-carousel">
            {activeTestimonial > 0 && (
              <button
                className="carousel-nav left"
                onClick={() => setActiveTestimonial((i) => i - 1)}
              >
                <i className="fas fa-chevron-left"></i>
              </button>
            )}
            {testimonials.map((testimonial, i) => (
              <div
                key={i}
                className="testimonial-card-container"
                style={{
                  "--active": i === activeTestimonial ? 1 : 0,
                  "--offset": (activeTestimonial - i) / 3,
                  "--direction": Math.sign(activeTestimonial - i),
                  "--abs-offset": Math.abs(activeTestimonial - i) / 3,
                  pointerEvents: activeTestimonial === i ? "auto" : "none",
                  opacity:
                    Math.abs(activeTestimonial - i) >= MAX_VISIBILITY
                      ? "0"
                      : "1",
                  display:
                    Math.abs(activeTestimonial - i) > MAX_VISIBILITY
                      ? "none"
                      : "block",
                }}
              >
                <div className="testimonial-card">
                  <div className="testimonial-rating">
                    {[...Array(5)].map((_, starIndex) => (
                      <i key={starIndex} className="fas fa-star"></i>
                    ))}
                  </div>
                  <p className="testimonial-text">{testimonial.content}</p>
                  <div className="testimonial-author">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="testimonial-avatar"
                    />
                    <h6>{testimonial.name}</h6>
                    <small>{testimonial.role}</small>
                  </div>
                </div>
              </div>
            ))}
            {activeTestimonial < testimonials.length - 1 && (
              <button
                className="carousel-nav right"
                onClick={() => setActiveTestimonial((i) => i + 1)}
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;

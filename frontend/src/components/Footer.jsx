import React from 'react';
import { Link } from "react-router-dom";

function Footer() {
    return (
        <div className="container-fluid mt-5 p-5 border-top" style={{ backgroundColor: "#eeeeee", width: "100%" }}>
            <div className="row">
                <div className="col-md-4">
                    <h5>FoodIO</h5>
                    <p className='text-muted'>
                        Foodio is a collaborative recipe sharing platform designed to transform cooking into a vibrant social experience. It allows food enthusiasts to discover, share, and engage with diverse recipes from a global community, fostering interaction through features such as user profiles, recipe creation, commenting, and personalized recommendations. Foodio emphasizes community building by enabling users to connect with fellow food lovers, exchange cooking tips, and celebrate culinary creativity together.
                    </p>
                </div>
                <div className='col-1'></div>
                <div className="col-md-2 mb-4">
                    <h5>Quick Links</h5>
                    <ul className="list-unstyled">
                        <li><Link to="/Home#top-rated" className="text-muted" style={{ textDecoration: "none" }}>Top Rated</Link></li>
                        <li><Link to="/Home#trending" className="text-muted" style={{ textDecoration: "none" }}>Trending</Link></li>
                        <li><Link to="/AddRecipe" className="text-muted" style={{ textDecoration: "none" }}>Submit Recipe</Link></li>
                        <li><Link to="/Community" className="text-muted" style={{ textDecoration: "none" }}>Community</Link></li>
                        <li><Link to="/Blog" className="text-muted" style={{ textDecoration: "none" }}>Blog</Link></li>
                        <li><Link to="/HelpCenter" className="text-muted" style={{ textDecoration: "none" }}>Help Center</Link></li>
                    </ul>
                </div>

                <div className="col-md-3 mb-4">
                    <h5>Connect With Us</h5>
                    <div className="d-flex gap-3 mb-3">
                        <a href="https://www.facebook.com" className="text-dark text-muted" aria-label="Facebook"><i className="bi bi-facebook fs-4"></i></a>
                        <a href="https://www.instagram.com" className="text-dark text-muted" aria-label="Instagram"><i className="bi bi-instagram fs-4"></i></a>
                        <a href="https://www.twitter.com" className="text-dark text-muted" aria-label="Twitter"><i className="bi bi-twitter fs-4"></i></a>
                        <a href="https://www.pinterest.com" className="text-dark text-muted" aria-label="Pinterest"><i className="bi bi-pinterest fs-4"></i></a>
                    </div>

                    <h6>Download Our App</h6>
                    <div className="d-flex gap-2">
                        <a href="https://www.pinterest.com" className="btn btn-outline-dark btn-sm">App Store</a>
                        <a href="https://www.pinterest.com" className="btn btn-outline-dark btn-sm">Google Play</a>
                    </div>
                </div>

                <div className="col-md-2 mb-4">
                    <h5>Contact Info</h5>
                    <p className="mb-1  text-muted"><i className="bi bi-envelope-fill me-2"></i>support@foodio.com</p>
                    <p className="mb-1  text-muted"><i className="bi bi-telephone-fill me-2"></i>+1 (555) 123-4567</p>
                    <p className="mb-1 text-muted"><i className="bi bi-geo-alt-fill me-2"></i>123 Foodio St, Flavor City</p>
                </div>
            </div>

            <hr className="bg-light" />
            <div className="d-flex justify-content-between align-items-center flex-wrap">
                <p>&copy; 2024 Foodio. All rights reserved.</p>
                <div>
                    <Link to="/PrivacyPolicy" className="text-muted me-3" style={{ textDecoration: "none" }}>Privacy Policy</Link>
                    <Link to="/TermsOfService" className="text-muted" style={{ textDecoration: "none" }}>Terms of Service</Link>
                </div>
            </div>
        </div>
    );
}

export default Footer;

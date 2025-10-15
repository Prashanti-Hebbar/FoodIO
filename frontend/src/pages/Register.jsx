import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { GoogleLogin } from "@react-oauth/google"; 

const Register = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [focusedField, setFocusedField] = useState(null);
  const [particles, setParticles] = useState([]);
  const navigate = useNavigate();

  // Create animated particles for background (same as login)
  useEffect(() => {
    const newParticles = [];
    for (let i = 0; i < 20; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 5
      });
    }
    setParticles(newParticles);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (errorMessage) setErrorMessage("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    if (!formData.username || !formData.email || !formData.password) {
      setErrorMessage("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://foodio-backend-cgsj.onrender.com/auth/register",
        {
          username: formData.username,
          email: formData.email,
          password: formData.password
        },
        { withCredentials: true }
      );

      console.log("Register response:", response.data);

      localStorage.setItem("loggedIn", "true");
      setIsLoggedIn(true);
      toast.success("Registration successful!");
      navigate("/");
    } catch (error) {
      console.log("Register error:", error);
      setErrorMessage(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

   const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post(
        "https://foodio-backend-cgsj.onrender.com/auth/google",
        { token: credentialResponse.credential },
        { withCredentials: true }
      );

      console.log("Google login response:", response.data);

      localStorage.setItem("loggedIn", "true");
      setIsLoggedIn(true);
      navigate("/");
    } catch (err) {
      console.error("Google login failed:", err);
      setErrorMessage("Google login failed. Please try again.");
    }
  };

  const handleGoogleError = () => {
    setErrorMessage("Google login was cancelled or failed.");
  };


  return (
    <div
      className="login-futuristic-container"
      style={{ backgroundColor: "#f5d0dc" }}// baby pink
    >
      {/* Animated background particles */}
      <div className="particles-background">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`
            }}
          ></div>
        ))}
      </div>

      <div className="holographic-line"></div>

      <div className="login-futuristic-card">
        {/* Header */}
        <div className="login-futuristic-header">
          <div className="logo-hologram">
            <div className="hologram-effect"></div>
            <img src="/hat.jpg" id="chef-holographic" alt="chef hat" />
            <h1 id="futuristic-heading">
              <span className="flicker">F</span>
              <span className="flicker">o</span>
              <span className="flicker">o</span>
              <span className="flicker">d</span>
              <span className="flicker">i</span>
              <span className="flicker">o</span>
            </h1>
          </div>
          <p className="futuristic-tagline">
            <span className="typewriter">Join the journey, cook with us!</span>
          </p>
        </div>

        {/* Register Form */}
        <form onSubmit={handleRegister} className="futuristic-form">
          {errorMessage && (
            <div className="error-hologram">
              <div className="hologram-alert"></div>
              {errorMessage}
            </div>
          )}

          <div
            className={`input-holographic ${
              focusedField === "username" ? "focused" : ""
            }`}
          >
            <label htmlFor="username" className="futuristic-label">
              <i className="hologram-icon">👤</i>
              <span>Username</span>
            </label>
            <div className="input-with-hologram">
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Choose a Username"
                value={formData.username}
                onChange={handleInputChange}
                onFocus={() => setFocusedField("username")}
                onBlur={() => setFocusedField(null)}
                required
                disabled={isLoading}
              />
              <div className="hologram-input-effect"></div>
            </div>
          </div>

          <div
            className={`input-holographic ${
              focusedField === "email" ? "focused" : ""
            }`}
          >
            <label htmlFor="email" className="futuristic-label">
              <i className="hologram-icon">📧</i>
              <span>Email</span>
            </label>
            <div className="input-with-hologram">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your E-mail"
                value={formData.email}
                onChange={handleInputChange}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                required
                disabled={isLoading}
              />
              <div className="hologram-input-effect"></div>
            </div>
          </div>

          <div
            className={`input-holographic ${
              focusedField === "password" ? "focused" : ""
            }`}
          >
            <label htmlFor="password" className="futuristic-label">
              <i className="hologram-icon">🔒</i>
              <span>Password</span>
            </label>
            <div className="input-with-hologram">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Create a Password"
                value={formData.password}
                onChange={handleInputChange}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                required
                disabled={isLoading}
              />
              <div className="hologram-input-effect"></div>
            </div>
          </div>

          <button
            type="submit"
            className="futuristic-login-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="hologram-spinner"></div>
                <span>Registering...</span>
              </>
            ) : (
              <>
                <i className="btn-hologram-effect"></i>
                <span>Join Foodio</span>
              </>
            )}
          </button>
        </form>

        
        {/* ⭐ Google Login Button */}
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
          />
        </div>

        <div className="futuristic-footer">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="hologram-register-link">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://foodio-backend-cgsj.onrender.com";
const Login = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [focusedField, setFocusedField] = useState(null);
  const [particles, setParticles] = useState([]);
  const navigate = useNavigate();

  // Create animated particles for background
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

  // Check for remembered user on component mount
  useEffect(() => {
    const rememberedUser = localStorage.getItem("rememberedUser");
    if (rememberedUser) {
      setFormData(prev => ({ ...prev, username: rememberedUser }));
      setRememberMe(true);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    if (!formData.username || !formData.password) {
      setErrorMessage("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${BACKEND_URL}/auth/login`,
        {
          username: formData.username,
          password: formData.password
        },
        {
          withCredentials: true
        }
      );

      console.log("Login response:", response.data);
      // After login success
localStorage.setItem("user", JSON.stringify(response.data.user)); // user object with _id, username, email
localStorage.setItem("loggedIn", "true");


      if (rememberMe) {
        localStorage.setItem("rememberedUser", formData.username);
      } else {
        localStorage.removeItem("rememberedUser");
      }

      localStorage.setItem("loggedIn", "true");
      toast.success("Login successful!");
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      console.log("Login error:", error);
      setErrorMessage(
        error.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setIsLoading(false);
    }
  };

 const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post(
       `${BACKEND_URL}/auth/google`,
        { token: credentialResponse.credential },
        { withCredentials: true }
      );
      console.log("Google login response:", res.data);

      localStorage.setItem("loggedIn", "true");
      toast.success("Google login successful");
      setIsLoggedIn(true);
      navigate("/");
    } catch (err) {
      console.error("Google Login Error:", err);
      setErrorMessage("Google authentication failed");
    }
  };



  return (
    <div className="login-futuristic-container" style={{ backgroundColor: "#f5d0dc" }}>
      {/* Animated background particles */}
      <div className="particles-background">
        {particles.map(particle => (
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
      
      {/* Holographic effect container */}
      <div className="holographic-line"></div>
      
      <div className="login-futuristic-card">
        {/* Header with animated elements */}
        <div className="login-futuristic-header">
          <div className="logo-hologram">
            <div className="hologram-effect"></div>
            <img src="/cheftools.jpg" id="chef-holographic" alt="chef tools" />
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
            <span className="typewriter">Savor the flavor, one recipe at a time</span>
          </p>
        </div>

        {/* Login form with futuristic styling */}
        <form onSubmit={handleSubmit} className="futuristic-form">
          {errorMessage && (
            <div className="error-hologram">
              <div className="hologram-alert"></div>
              {errorMessage}
            </div>
          )}

          <div className={`input-holographic ${focusedField === 'username' ? 'focused' : ''}`}>
            <label htmlFor="username" className="futuristic-label">
              <i className="hologram-icon">👤</i>
              <span>Username</span>
            </label>
            <div className="input-with-hologram">
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Enter your Username"
                value={formData.username}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('username')}
                onBlur={() => setFocusedField(null)}
                required
                disabled={isLoading}
              />
              <div className="hologram-input-effect"></div>
            </div>
          </div>

          <div className={`input-holographic ${focusedField === 'password' ? 'focused' : ''}`}>
            <label htmlFor="password" className="futuristic-label">
              <i className="hologram-icon">🔒</i>
              <span>Password</span>
            </label>
            <div className="input-with-hologram">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your Password"
                value={formData.password}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                required
                disabled={isLoading}
              />
              <div className="hologram-input-effect"></div>
              <button
                type="button"
                className="hologram-toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                <i className={showPassword ? "hologram-eye-off" : "hologram-eye"}>
                  {showPassword ? "👁️" : "🔍"}
                </i>
              </button>
            </div>
          </div>

          <div className="futuristic-options">
            <label className="hologram-checkbox">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                disabled={isLoading}
              />
              <span className="check-hologram"></span>
              Remember me
            </label>
            <Link to="/forgot-password" className="hologram-link">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="futuristic-login-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="hologram-spinner"></div>
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <i className="btn-hologram-effect"></i>
                <span>Access Portal</span>
              </>
            )}
          </button>
        </form>

        <div className="futuristic-footer">
          <p>
            New user?{" "}
            <Link to="/register" className="hologram-register-link">
              Create an account
            </Link>
          </p>
          
          <div className="hologram-social-login">
            <div className="divider-hologram">
              <span>Or access with</span>
            </div>

            <div className="social-hologram-buttons">

 {/* ✅ Google Login button */}
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => {
                  console.log("Login Failed");
                  setErrorMessage("Google authentication failed");
                }}
              />

              <button className="social-hologram-btn google-hologram" disabled={isLoading}>
                <i className="hologram-social-icon">G</i>
                <span>Google</span>
              </button>
              <button className="social-hologram-btn facebook-hologram" disabled={isLoading}>
                <i className="hologram-social-icon">f</i>
                <span>Facebook</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Background food elements with futuristic styling */}
      <div className="futuristic-food-background">
        <div className="hologram-food-item pasta-hologram"></div>
        <div className="hologram-food-item pizza-hologram"></div>
        <div className="hologram-food-item burger-hologram"></div>
      </div>
    </div>
  );
};

export default Login;
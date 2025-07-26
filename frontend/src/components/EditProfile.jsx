import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/EditProfile.css";

const EditProfile = ({ onClose }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const userID = localStorage.getItem("userID");
        const response = await axios.get(
          `https://foodio-backend-cgsj.onrender.com/auth/user/${userID}`,
          { 
            headers: { 
              Authorization: `Bearer ${token}` 
            }
          }
        );
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("Failed to load user data. Please try again.");
      }
    };

    fetchUserData();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters long";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");
        const userID = localStorage.getItem("userID");
        
        await axios.put(
          `https://foodio-backend-cgsj.onrender.com/auth/user/${userID}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        alert("Profile updated successfully!");
        onClose();
      } catch (error) {
        console.error("Update error:", error);
        alert("Failed to update profile. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  return (
    <div className="edit-profile-overlay" onClick={(e) => {
      if (e.target.className === "edit-profile-overlay") onClose();
    }}>
      <div className="edit-profile-modal">
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={errors.username ? "error-input" : ""}
            />
            {errors.username && (
              <span className="error-message">{errors.username}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "error-input" : ""}
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          <div className="form-group">
            {errors.bio && (
              <span className="error-message">{errors.bio}</span>
            )}
          </div>

          <div className="button-group">
            <button 
              type="button" 
              onClick={onClose}
              className="cancel-button"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="save-button"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;

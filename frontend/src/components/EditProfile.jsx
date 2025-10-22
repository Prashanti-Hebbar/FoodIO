import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useUserContext } from "../context/userContext";
import "../styles/EditProfile.css";

const EditProfile = ({ onClose }) => {
  const { userData, setUserData, avatarUrl, setAvatarUrl } = useUserContext();

  const [formData, setFormData] = useState({
    username: userData?.username || "",
    email: userData?.email || "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAvatarUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);
    formData.append("userId", userData._id);

    try {
      const res = await axios.post("https://foodio-backend-cgsj.onrender.com/profile", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setAvatarUrl(`https://foodio-backend-cgsj.onrender.com/uploads/${res.data.filename}`);
      setUserData(prev => ({ ...prev, avatar: res.data.filename }));
      toast.success("Profile picture updated!");
    } catch (err) {
      console.error("Avatar upload error:", err);
      toast.error("Failed to upload profile picture.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await axios.put(
        `https://foodio-backend-cgsj.onrender.com/auth/updateUser`,
        formData,
        { withCredentials: true }
      );
      setUserData(prev => ({ ...prev, ...formData }));
      toast.success("Profile updated!");
      onClose();
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("Failed to update profile.");
    } finally {
      setIsLoading(false);

    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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

          {/* Avatar Preview + Upload */}
          <div className="form-group avatar-upload">
            <label>Profile Picture</label>
            <img 
              src={avatarUrl} 
              alt="Avatar Preview" 
              className="avatar-preview"
              style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover", marginBottom: 10 }}
            />
            <input type="file" accept="image/*" onChange={handleAvatarUpload} />
          </div>

          {/* Username */}
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
            {errors.username && <span className="error-message">{errors.username}</span>}
          </div>

          {/* Email */}
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
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          {/* Buttons */}
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

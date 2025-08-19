import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";  // Import CSS
// import Login from "./Login";

const Register = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    // Basic validation
    if (!username || !email || !password) {
      return;
    }
    try {
      await axios.post(
        "http://localhost:3001/auth/register", 
        { username, email, password },
        { withCredentials: true }
      );
      // Immediately log in to get token and userID
      const loginRes = await axios.post(
        "http://localhost:3001/auth/login",
        { username, password },
        { withCredentials: true }
      );
      const { token, userID } = loginRes.data || {};
      if (token && userID) {
        localStorage.setItem("token", token);
        localStorage.setItem("userID", userID);
        localStorage.setItem("username", username);
      }
      localStorage.setItem("loggedIn", "true");
      setIsLoggedIn(true);
      alert("Registration successful!");
      navigate("/");
      } catch (error) {
      if (error.response) {
        // Server responded with error status
        console.log("Error response:", error.response.data);
      }
    }
  };

  return (
    <div className="register">
      <h1 id="register-heading">Foodio</h1>
      <img src="/hat.jpg" id="tools" alt="..." />
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button id="regbutton" onClick={handleRegister}>Register</button>
      <br /><br />
      <p>Already have an account? <Link to="/login" style={{ color: '#15467F' }}>Login</Link></p>
    </div>
  );
};

export default Register;

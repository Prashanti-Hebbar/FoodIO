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
      const response = await axios.post(
        "https://foodio-backend-cgsj.onrender.com/auth/register", 
        { username, email, password },
        { withCredentials: true }
      );
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

  return (    <div className="flex h-screen  bg-gradient-to-r from-pink-200 via-pink-100 to-purple-200">
    <div className="hidden md:flex flex-1 justify-center items-center">
      <img
        src="/coffee.jpg"  // 👈 directly reference public file
        alt="Coffee Cup"
        className="h-full max-h-[500px] w-auto rounded-2xl shadow-lg object-cover ml-8 "
      />
    </div>
    <div className ="flex-1 flex justify-center items-center p-6">
    <div className=" register">
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
    </div>
    </div>
  );
};

export default Register;

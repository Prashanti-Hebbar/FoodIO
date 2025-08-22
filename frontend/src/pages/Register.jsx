
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";  // Import CSS
import { GoogleLogin } from "@react-oauth/google";
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

  return (
    <div className="register">
      <h1 id="register-heading">Foodio</h1>
      <img src="/hat.jpg" id="tools" alt="..." />
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button id="regbutton" onClick={handleRegister}>Register</button>
      
      
{/* --- OR Divider --- */}
<div style={{ display: "flex", alignItems: "center", margin: "20px 0" }}>
  <hr style={{ flex: 1, border: "none", height: "1px", background: "#ccc" }} />
  <span style={{ margin: "0 10px", color: "#666" }}>OR</span>
  <hr style={{ flex: 1, border: "none", height: "1px", background: "#ccc" }} />
</div>
     
    {/*google register*/}
    <div style={{ marginTop: "20px" }}>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log("Google Register Success:", credentialResponse);
            // here you should send credentialResponse.credential to backend 
            // to register or login user with Google
            localStorage.setItem("loggedIn", "true");
            setIsLoggedIn(true);
            navigate("/");
          }}
          onError={() => {
            console.log("Google Register Failed");
          }}
        />
      </div>
       <br /><br />
       <p>Already have an account? <Link to="/login" style={{ color: '#15467F' }}>Login</Link></p>
    </div>
  );
};

export default Register;

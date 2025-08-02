import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        username,
        password
      },
      {
        withCredentials:true
      });

      console.log('Login response:', response.data);

      // if (response.data.token) {
        // localStorage.setItem("username", username);
        // localStorage.setItem("token", response.data.token);
        localStorage.setItem("loggedIn", 'true');
        setIsLoggedIn(true);
        alert("Login successful!");
        navigate("/");
      // } else {
      //   alert(response.data.message);
      // }
    } catch (error) {
      console.log('Login error:', error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login">
      <h1 id="login-heading">Foodio</h1>
      <img src="/cheftools.jpg" id="hat" alt="chefhat" />
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Username" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
        />
        <br />
        <button id="loginbutton" type="submit">Login</button>
      </form>
      <br /><br />
      <p>New user? <Link to="/register" style={{ color: '#3b73af' }}>Register</Link></p>
    </div>
  );
};

export default Login;

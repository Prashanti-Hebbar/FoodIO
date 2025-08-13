import { useState,useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { toast } from "react-toastify";
const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
    useEffect(() => {
      const logoutToast = localStorage.getItem("logoutToast");
      if (logoutToast === "true") {
        toast.info("Logged Out");
        localStorage.removeItem("logoutToast");
      }
    }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:3001/auth/login",
      {
        username: username,
        password: password,
      },
      { withCredentials: true }
    );
    const success = response.data.success;
    const userData = response.data.userData;
    console.log(userData);
    if (success) {
      localStorage.setItem("token", userData.token);
      localStorage.setItem("username", userData.username);
      localStorage.setItem("email", userData.email);
      toast.success(response.data.message);
      setIsLoggedIn(true); // <-- update App state immediately
      navigate("/home");
    }
    if (!success) {
      toast.error(response.data.message, { position: "top-right" });
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!username || !password) {
  //     alert("Please fill in all fields");
  //     return;
  //   }

  //   try {
  //     const response = await axios.post(
  //       "http://localhost:3001/auth/login",
  //       { username, password },
  //       { withCredentials: true } // important for cookie
  //     );

  //     console.log("Login response:", response.data);

  //     // Cookie is automatically set; no token needed in localStorage
  //     localStorage.setItem("loggedIn", "true");
  //     setIsLoggedIn(true);
  //     alert("Login successful!");
  //     navigate("/");
  //   } catch (error) {
  //     console.log("Login error:", error);
  //     alert("Login failed. Please check your credentials.");
  //   }
  // };

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
        <button id="loginbutton" type="submit">
          Login
        </button>
      </form>
      <br />
      <br />
      <p>
        New user?{" "}
        <Link to="/register" style={{ color: "#3b73af" }}>
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;

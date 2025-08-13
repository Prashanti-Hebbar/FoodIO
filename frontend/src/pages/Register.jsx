import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { toast } from "react-toastify";
const Register = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // const handleRegister = async () => {
  //   if (!username || !email || !password) {
  //     alert("Please fill in all fields");
  //     return;
  //   }

  //   try {
  //     await axios.post(
  //       "http://localhost:3001/auth/register",
  //       { username, email, password },
  //       { withCredentials: true } // included for future cookie use
  //     );

  //     // Do not set loggedIn yet; user must log in
  //     alert("Registration successful! Please log in.");
  //     navigate("/login");
  //   } catch (error) {
  //     console.error("Register error:", error);
  //     alert("Registration failed. Try a different username.");
  //   }
  // };
  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:3001/auth/register",
      {
        username: username,
        email: email,
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
  return (
    <div className="register">
      <h1 id="register-heading">Foodio</h1>
      <img src="/hat.jpg" id="tools" alt="..." />
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button id="regbutton" onClick={handleRegister}>
        Register
      </button>
      <br />
      <br />
      <p>
        Already have an account?{" "}
        <Link to="/login" style={{ color: "#15467F" }}>
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;

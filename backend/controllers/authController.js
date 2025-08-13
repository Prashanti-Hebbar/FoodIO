// import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js";
import { createSecretToken } from "../middleware/secretToken.js";
// // Helper to set cookie
// const setAuthCookie = (res, token) => {
//   res.cookie("token", token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production", // true only in production
//     sameSite: "lax", // allows localhost requests
//     maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//   });
// };
const register = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(username);
  if (!username || !email || !password) {
    return res.json({
      message: "Fill the details",
      success: false,
      error: true,
    });
  }

  const existingUser = await UserModel.findOne({ username });
  try {
    if (existingUser) {
      return res.json({ message: "User already exists", success: false });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
    });
    const ans = await newUser.save();
    console.log("done", ans);
    const token = createSecretToken(newUser._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true only in production https
      sameSite: "lax",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    const userData = {
      username: username,
      email: email,
      password: password,
      token: token,
    };
    res.json({ message: "Welcome to FOODIO", success: true, userData });
  } catch (err) {
    res.json({ message: `something went wrong please try again ${err}` });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  if ((!username, !password)) {
    return res.json({
      message: "Fill the details",
      success: false,
      error: true,
    });
  }
  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.json({ message: "User not exists", success: false });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (isPasswordCorrect) {
      const token = createSecretToken(user._id);
      res.cookie("token", token, {
        httpOnly: true,
        secure: false, // true only in production https
        sameSite: "lax",
        maxAge: 3 * 24 * 60 * 60 * 1000,
      });
      console.log("Username", user);
      const userData = {
        username: username,
        token: token,
        email: user.email,
      };
      res.json({
        message: "Welcome back",
        success: true,
        userData,
      });
    }
    if(!isPasswordCorrect){
      res.json({
        message:"Incorrect password. Please try again.",
        success:false
      })
    }
  } catch (err) {
    console.log("Something went wrong", err);
    res.json({ message: `Something went wrong ${err}` });
  }
};

export { register, login };

// // Register Controller
// const register = async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     const existingUser = await UserModel.findOne({ username });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new UserModel({
//       username,
//       email,
//       password: hashedPassword,
//     });

//     await newUser.save();

//     // No cookie set here — user will log in after registering
//     res
//       .status(201)
//       .json({ message: "User registered successfully. Please log in." });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// // Login Controller
// const login = async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const user = await UserModel.findOne({ username });
//     if (!user) return res.status(400).json({ message: "Invalid username or password" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid username or password" });

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "secret", { expiresIn: "7d" });

//     setAuthCookie(res, token);

//     res.status(200).json({ message: "Logged in successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// // Logout Controller
// const logout = async (req, res) => {
//   try {
//     res.clearCookie("token", {
//       httpOnly: true,
//       secure: process.env.PRODUCTION === "true",
//       sameSite: "strict",
//     });

//     res.status(200).json({ message: "Logged out successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
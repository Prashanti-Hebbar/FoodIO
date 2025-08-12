import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js";

// Helper to set cookie
const setAuthCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.PRODUCTION === "true",
    sameSite: "strict",
  });
};

// Register Controller
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // No cookie set here — user will log in after registering
    res.status(201).json({ message: "User registered successfully. Please log in." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Login Controller
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "7d" }
    );

    setAuthCookie(res, token);

    res.status(200).json({ message: "Logged in successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Logout Controller
const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.PRODUCTION === "true",
      sameSite: "strict",
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { register, login, logout };

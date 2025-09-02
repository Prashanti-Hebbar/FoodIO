
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { OAuth2Client } from "google-auth-library";
import mongoose from "mongoose";
import User from "../models/Users.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Helper to set cookie
const setAuthCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.PRODUCTION === "true",
    sameSite: "strict",
  });
};

// =====================
// Google Login Controller
// =====================
export const googleLogin = async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      // Sign up new Google user
      user = new User({
        username: name,
        email,
        password: null, // Google users don’t need password
        picture,
      });
      await user.save();
    }

    // Create JWT
    const myToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "7d" }
    );

    setAuthCookie(res, myToken);
    return res.json({ token: myToken, userID: user._id });
  } catch (error) {
    console.error("Google Auth Error:", error);
    return res.status(400).json({ message: "Google authentication failed" });
  }
};

// =====================
// Register Controller
// =====================
const register = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ message: "User registered successfully. Please log in." });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// =====================
// Login Controller
// =====================
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "Invalid username or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid username or password" });

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

// =====================
// Logout Controller
// =====================
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

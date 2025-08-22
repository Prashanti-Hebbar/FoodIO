import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
<<<<<<< HEAD
import { UserModel } from "../models/Users.js";
import {OAuth2Client} from "google-auth-library";

const client=new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
//google auth controller
export const googleLogin=async(req,res)=>{
  const{token}=req.body;
  try{
    const ticket=await client.verifyIdToken({
      idToken:token,
      audience:process.env.GOOGLE_CLIENT_ID,
    });
    const payload=ticket.getPayload();
    const{email,name,picture}=payload;
    //checking if user already exist
    let user=await UserModel.findOne({email});

    if(!user){
      //signup using google
      user=new UserModel({
        username:name,
        email,
        password:null,//google users will not have password
        picture,
      });
      await user.save();
    }

    //creating jwt for session
    const myToken=jwt.sign(
      {
        id:user._id},
        process.env.JWT_SECRET||"secret",
       { expiresIn:"7d"
      }
      
    );
    return res.json({token:myToken,userID:user._id});


  }
  catch(error){
    console.error("Google Auth Error:",error);
    return res.status(400).json({message:"Google authentication failed"});
  }
}
=======
import User from "../models/Users.js";
import mongoose from "mongoose";
>>>>>>> d6ebae959b2794d8ac6e70405a027f554626a54f

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
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
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

// Login Controller
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
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
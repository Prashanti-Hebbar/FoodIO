import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/Users.js";
import { login, register,logout } from "../controllers/authController.js";
import { getProfile,updatedUser } from "../controllers/userController.js";
import { verifyJWT } from "../middleware/verifyJWT.js";
const router = express.Router();

router.post('/register',register);
router.post('/login',login);
router.post('/logout',logout);
router.put('/updateUser',verifyJWT, updatedUser);
router.get('/user',verifyJWT,getProfile);

// router.post("/register", async (req, res) => {
//   const { username, email, password } = req.body; 
//   const user = await User.findOne({ username }); 

//   if (user) {
//     return res.json({ message: "User already exists" }); 
//   }

//   const hashedPassword = await bcrypt.hash(password, 10); 

//   const newUser = new User({ username, email, password: hashedPassword }); 
//   await newUser.save(); 

//   res.json({ message: "User Registered Successfully!" }); 
// });

// router.post("/login", async (req, res) => {
//   const { username, password } = req.body; 
//   const user = await User.findOne({ username }); 
//   if (!user) {
//     return res.json({ message: "User doesn't exist" }); 
//   }
//   const isPasswordValid = await bcrypt.compare(password, user.password); 

//   if (!isPasswordValid) {
//     return res.json({ message: "Username or password is incorrect" }); 
//   }
//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "secret"); 
//   res.json({ token, userID: user._id }); 
// });

// // Get user information
// router.get("/user/:id", async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id).select("-password");
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching user data" });
//   }
// });

// // Update user profile
// router.put("/user/:id", async (req, res) => {
//   try {
//     const { username, email } = req.body;
    
//     // Check if username is already taken by another user
//     const existingUser = await User.findOne({ 
//       username, 
//       _id: { $ne: req.params.id } 
//     });
    
//     if (existingUser) {
//       return res.status(400).json({ message: "Username already taken" });
//     }
    
//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.id,
//       { username, email },
//       { new: true }
//     ).select("-password");
    
//     if (!updatedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }
    
//     res.json(updatedUser);
//   } catch (error) {
//     res.status(500).json({ message: "Error updating user profile" });
//   }
// });

export { router as useRouter };
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js";
import {firebaseAuth,Authlogin,Authregister,getProfile,logout} from "../controllers/authController.js";
import verifyIdToken from "../middleware/verifyJwt.js";
const router = express.Router();

// these funtions are imported from controllers/autController.js (MVC pattern)
router.post('/firebaseAuth',firebaseAuth);
router.post('/register',Authregister);
router.post('/login',Authlogin);
router.get('/getProfile',verifyIdToken,getProfile);
router.get('/logout',logout);

// ### *** Your previous register handler ***

// router.post("/register", async (req, res) => {
//   const { username, email, password } = req.body; // get the data from the request body
//   const user = await UserModel.findOne({ username }); // check if user already exists

//   if (user) {
//     return res.json({ message: "User already exists" }); // if user already exists, return an error message
//   }

//   const hashedPassword = await bcrypt.hash(password, 10); // hash the password

//   const newUser = new UserModel({ username, email, password: hashedPassword,authProvider:'local' }); // create a new user
//   await newUser.save(); // save the user to the database

  res.json({ message: "User Registered Successfully!" }); // send the user data to the client

router.post("/login", async (req, res) => {
  const { username, password } = req.body; // get the data from the request body
  const user = await UserModel.findOne({ username }); // check if user already exists
  if (!user) {
    return res.json({ message: "User doesn't exist" }); // if user doesn't exist, return an error message
  }
  const isPasswordValid = await bcrypt.compare(password, user.password); // compare the password

  if (!isPasswordValid) {
    return res.json({ message: "Username or password is incorrect" }); // if password is incorrect, return an error message
  }
  const token = jwt.sign({ id: user._id }, "secret"); // create a token
  res.json({ token, userID: user._id }); // send the token to the client)
});

export { router as useRouter };

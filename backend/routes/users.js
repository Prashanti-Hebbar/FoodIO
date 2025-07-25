import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body; // get the data from the request body
  const user = await UserModel.findOne({ username }); // check if user already exists

  if (user) {
    return res.json({ message: "User already exists" }); // if user already exists, return an error message
  }

  const hashedPassword = await bcrypt.hash(password, 10); // hash the password

  const newUser = new UserModel({ username, email, password: hashedPassword }); // create a new user
  await newUser.save(); // save the user to the database

  res.json({ message: "User Registered Successfully!" }); // send the user data to the client
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });
  
  if (!user) {
    return res.json({ message: "User doesn't exist" });
  }
  
  const isPasswordValid = await bcrypt.compare(password, user.password);
  
  if (!isPasswordValid) {
    return res.json({ message: "Username or Password is incorrect" });
  }
  
  const token = jwt.sign({ id: user._id }, "secret"); // Use a proper secret key
  res.json({ token, userID: user._id, username: user.username });
});
export { router as useRouter };

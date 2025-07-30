import admin from "../config/firebaseAuth.js";
import { UserModel } from "../models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import tokenGenerator from "../utils/jwtTokenGen.js";
const firebaseAuth = async (req, res) => {   // *** firebase authentication *** (handle both login and register)
  const { idtoken } = req.body;

  if (!idtoken) {
    console.log("token not found");
    res.status(400).json({ mess: "no token found" });
    return;
  }
  try {
    const decoded = await admin.auth().verifyIdToken(idtoken);

    const { email, name, uid, picture } = decoded;

    let user = await UserModel.findOne({ email });
    if (user) {

        if (user.authProvider != "firebase" && user.authProvider != "both") {     //connecting user to both firebase and local
            user.profilePhoto = user.profilePhoto || picture ;
            user.authProvider = "both";
            await user.save();
        }
        
        tokenGenerator(user.email,user._id,res);
        res.status(200).json({ mess: "user already exist, updated the cookie" });
        return
      } else {
        let newUser = await UserModel.create({       //creating new user
          
          email,
          username: name,
          authProvider: "firebase",
          profilePhoto: picture,
          uid,
        });
        tokenGenerator(newUser.email,newUser._id,res);
       
      res.status(200).json({ mess: "user registered successfully" ,newUser});
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ mess: "Theres some issue wiht auth provider" });
    return;
  }
};




const Authregister = async (req, res) => {         // *** Register funtion *** 

  const { username, email, password } = req.body; // get the data from the request body
  const user = await UserModel.findOne({ email }); // check if user already exists

  if (user) {
    if(user.authProvider != 'firebase' ) // user exist with local or both authprovider
      {
        return res.json({ message: "User already exists" }); // if user already exists, return an error message
      }
      else // user exist with firebase authPRovider
        {
          const hashedPassword = await bcrypt.hash(password, 10); // hash the password
          const updatedUser = await UserModel.findByIdAndUpdate(
            user._id,
            { 
              password: hashedPassword,
              authProvider: 'both' //  Both fields in the update object
            },
            { new: true } 
            );
            tokenGenerator(updatedUser.email,updatedUser._id,res);
            res.json({ message: "User Registered Successfully!" }); // send the user data to the client
            return;
        }
      }
      const hashedPassword = await bcrypt.hash(password, 10); // hash the password


  const newUser = new UserModel({ username, email, password: hashedPassword,authProvider:'local' }); // create a new user
  await newUser.save(); // save the user to the database
  tokenGenerator(newUser.email,newUser._id,res);
  res.json({ message: "User Registered Successfully!" }); // send the user data to the client
};

const Authlogin = async (req, res) => {    // *** Login funtion *** 

  const { username, password } = req.body; // get the data from the request body
  const user = await UserModel.findOne({ username }); // check if user already exists
  if (!user) {
    return res.json({ message: "User doesn't exist" }); // if user doesn't exist, return an error message
  }
  const isPasswordValid = await bcrypt.compare(password, user.password); // compare the password

  if (!isPasswordValid) {
    return res.json({ message: "Username or password is incorrect" }); // if password is incorrect, return an error message
  }

  tokenGenerator(user.email,user._id,res);
  res.json({ userID: user._id }); // send the token to the client)
};


const logout = async(req,res)=>    // logging out the user (removing jwt token or cookie)
  {
    try {
      // Clear the cookie with matching options
      res.clearCookie("token", {
        httpOnly: true,
      });

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Logout failed', error: error.message });
  }
  }


const getProfile = async(req,res)=>    // geting user data (only userName and profile picture ,You can furthur add recipices or other data stored in th database)
  {
    try
    {
      let user = await UserModel.findOne({_id:req.user.id})
      if(user)
        {

          res.status(200).json({username:user.username,pfp:user.profilePhoto})
          return;
        }
        res.status(400).json({mess:"theres some error ,user not found"})
      }catch(err)
      {
        console.log(err);
        res.status(400).json({mess:"theres some error ",err});
    }
  }

export {firebaseAuth ,Authlogin,Authregister,getProfile,logout } ;

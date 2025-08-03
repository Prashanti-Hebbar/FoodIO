import { UserModel } from "../models/Users.js";
const getProfile = async (req, res) => {

      try {

        const user = await UserModel.findOne({_id:req.user.id});
        if (!user) {

        return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({user});
} catch (error) {

    res.status(500).json({ message: "Error fetching user data" });
  }
}
const updatedUser = async (req,res) =>
  {
    try {
    const { username, email } = req.body;
    // Check if username is already taken by another user
    const existingUser = await UserModel.findOne({ 
      username, 
      _id: { $ne: req.user.id } 
    });
    
    if (existingUser) {
      return res.status(400).json({ message: "Username already taken" });
    }
    
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.user.id,
      { username, email },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating user profile" });
  }
  }
export { getProfile,updatedUser };
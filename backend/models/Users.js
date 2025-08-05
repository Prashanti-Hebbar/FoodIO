import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({ 
  username: {
    type: String,
    required: true,
    unique:true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type :String,
    default:""
  },
  savedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "recipes" }]
});

export default mongoose.model("User", userSchema);  

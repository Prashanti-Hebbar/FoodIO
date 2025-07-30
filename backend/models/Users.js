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
    uid:
    {
        type:String,
        require:false,
        sparse: true,
    },
    password: {
        type: String,
        required: false
    },
    authProvider:
    {
        type:String,
        required:true
    },
    profilePhoto:
    {
        type:String,
        require:false
    },
    savedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "recipes" }]
});

export const UserModel = mongoose.model('User', userSchema); // Export the User model... We use this name as table name in database.
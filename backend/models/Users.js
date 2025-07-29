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
    savedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "recipes" }],
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "recipes" }]
});

export const UserModel = mongoose.model('User', userSchema); // Export the User model we use this name as table name in our database 

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
    savedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "recipes" }]
});

export const UserModel = mongoose.model('User', userSchema);
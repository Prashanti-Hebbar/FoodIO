import mongoose from "mongoose";

const NewsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
      "Please enter a valid email address",
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Ensure global uniqueness of email
NewsletterSchema.index({ email: 1 }, { unique: true });

const Newsletter = mongoose.model("Newsletter", NewsletterSchema);

export default Newsletter;

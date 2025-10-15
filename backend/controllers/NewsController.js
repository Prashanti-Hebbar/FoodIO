import Newsletter from "../models/Subscriber.js";
import { verifyEmail, sendSubscriptionEmail } from "../utils/emailVerifier.js";

export const subscribe = async (req, res) => {
  try {
    const { email } = req.body; // no userId

    // Regex Validation
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
    if (!emailRegex.test(email)) 
      return res.status(400).json({ message: "Invalid email format" });

    // Check if the email already exists in the newsletter
    const existingEmail = await Newsletter.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already subscribed" });
    }

    // Optional: Verify email
    const isValid = await verifyEmail(email);
    if (!isValid) return res.status(400).json({ message: "Email verification failed" });

    // Save subscription (no userId)
    const subscription = new Newsletter({ email });
    await subscription.save();

    // Send confirmation email
    await sendSubscriptionEmail(email);

    res.status(201).json({ message: "Subscription successful!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

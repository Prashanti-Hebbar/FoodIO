import dotenv from "dotenv";
import nodemailer from "nodemailer";

// Load environment variables
dotenv.config();

export async function verifyEmail(email) {
  const url = `https://api.zerobounce.net/v2/validate?api_key=${process.env.ZEROBOUNCE_API_KEY}&email=${encodeURIComponent(email)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Check for invalid email status and mailbox_not_found sub-status
    if (data.status === "invalid" && data.sub_status === "mailbox_not_found") {
      console.log(`The email ${email} is invalid: mailbox not found.`);
      return false; // Invalid email
    }

    // If the status is valid
    if (data.status === "valid") {
      console.log(`The email ${email} is valid.`);
      return true; // Valid email
    }

    // Other invalid statuses
    console.log(`The email ${email} is invalid.`);
    return false;
  } catch (error) {
    console.error("Error verifying email:", error);
    return false;
  }
}

export async function sendSubscriptionEmail(email) {
  try {
    // Setup transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Newsletter Subscription Confirmation",
      html: `
        <h2>Thank you for subscribing!</h2>
        <p>You have successfully subscribed to our newsletter.</p>
        <p>Stay tuned for updates and announcements. 💌</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log(`✅ Subscription email sent to ${email}`);
    return true;
  } catch (error) {
    console.error("⚠️ Error sending subscription email:", error);
    return false;
  }
}

import express from "express";
const router = express.Router();

router.post("/", (req, res) => {
  const { message } = req.body;

  let reply;
  if (message?.toLowerCase().includes("hello")) {
    reply = "Hey! Welcome to Foodio 🍴 What would you like to order?";
  } else if (message?.toLowerCase().includes("pizza")) {
    reply = "Great choice! We have Margherita, Farmhouse, and Pepperoni.";
  } else {
    reply = "I’m still learning! Can you try asking something else?";
  }

  res.json({ reply });
});

export default router;

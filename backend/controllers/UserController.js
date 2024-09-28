const User = require("../models/User");
const jwt = require("jsonwebtoken");
const express = require("express");

const router = express.Router();

// Signup Route
router.post("/signup", async function (req, res) {
  console.log(req.body);
  const { firstname, lastname, email, password } = req.body;

  // Validation
  if (!firstname || !lastname || !email || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Create new user
  const user = await User.create({
    firstname,
    lastname,
    email,
    password, // bcrypt will handle encryption
  });

  // Generate JWT
  const token = jwt.sign({ id: user._id }, "jwt_secret_key", {
    expiresIn: "1h",
  });

  res.status(201).json({ token });
});

// Login Route
router.post("/signin", async function (req, res) {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide email and password" });
  }

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(400)
      .json({ message: "Invalid Credentials! User not found." });
  }

  // Match password
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return res
      .status(400)
      .json({ message: "Invalid credentials! Password Mismatch" });
  }

  // Generate JWT
  const token = jwt.sign({ id: user._id }, "jwt_secret_key", {
    expiresIn: "1h",
  });

  res.json({ token });
});

module.exports = router;

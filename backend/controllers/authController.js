const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

exports.registerUser = async (req, res) => {
  const { fullName, email, password, profileImageUrl } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json({ message: "Please enter a valid email address" });
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: "Password must be at least 8 characters" });
  }

  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!strongPasswordRegex.test(password)) {
    return res.status(400).json({
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    });
  }

  const sanitizedName = fullName.trim().replace(/<[^>]*>/g, "");
  if (!sanitizedName || sanitizedName.length < 2) {
    return res
      .status(400)
      .json({ message: "Please enter a valid name (at least 2 characters)" });
  }

  try {
    const existingUser = await User.findOne({
      email: email.toLowerCase().trim(),
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "An account with this email already exists" });
    }

    await User.create({
      fullName: sanitizedName,
      email: email.toLowerCase().trim(),
      password,
      profileImageUrl,
    });

    res.status(201).json({
      message: "Account created successfully. Please log in.",
    });
  } catch (err) {
    console.error("Register Error:", err);
    if (err.code === 11000) {
      return res
        .status(400)
        .json({ message: "An account with this email already exists" });
    }
    res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res
        .status(404)
        .json({
          message: "No account found with this email. Please sign up first.",
        });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Incorrect password. Please try again." });
    }

    const userData = user.toObject();
    delete userData.password;

    res.status(200).json({
      id: user._id,
      user: userData,
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error("Login Error:", err);
    res
      .status(500)
      .json({ message: "Server error. Please check your connection." });
  }
};

exports.getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again." });
  }
};

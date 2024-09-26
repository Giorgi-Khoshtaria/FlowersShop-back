/* eslint-disable no-undef */
import bcrypt from "bcrypt";
// Ensure the file extension is included
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../modules/auth.modules.js";
dotenv.config();

const JWT_SECRET = process.env.REACT_APP_TOKEN_URL;

// console.log("jwt", JWT_SECRET);

export const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create a new user object with hashed password
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();

    // Generate a JWT token
    const token = jwt.sign(
      { id: newUser._id, username: newUser.username },
      JWT_SECRET, // Use your environment variable for the secret
      { expiresIn: "7d" } // Set expiration to 1 week
    );

    // Respond with the token and user data (excluding password)
    res.status(201).json({
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        password: newUser.password,
        // Add any other user fields you want to include
      },
      message: "User created successfully!",
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username },

      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Include user details in the response, excluding sensitive information like the password
    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        password: user.password,
        role: user.role,
        // Add any other user fields you want to include
      },
      message: "Login successful!",
    });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req, res) => {
  const { username, newPassword, confirmPassword } = req.body;

  if (!username || !newPassword || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match." });
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully." });
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

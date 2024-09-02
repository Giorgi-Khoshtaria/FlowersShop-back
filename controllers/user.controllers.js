import bcrypt from "bcrypt";
// Ensure the file extension is included
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../modules/auth.modules.js";
dotenv.config();

// eslint-disable-next-line no-undef
const JWT_SECRET = process.env.REACT_APP_TOKEN_URL;

console.log("jwt", JWT_SECRET);

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
    const newUser = new User({ username, email, password: hashedPassword });

    console.log(`req body from signup ${req.body.User}`);

    // Save the new user to the database
    await newUser.save();
    res.status(201).json({ message: "User created successfully!" });
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
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    next(error);
  }
};

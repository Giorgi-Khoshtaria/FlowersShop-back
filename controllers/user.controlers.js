import dotenv from "dotenv";
// import jwt from "jsonwebtoken";
import User from "../modules/auth.modules.js";
import bcrypt from "bcrypt";

dotenv.config();
// const JWT_SECRET = process.env.REACT_APP_TOKEN_URL;

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    // Return the users as a response
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const delateUser = async (req, res) => {
  try {
    const { userId } = req.params; // Extract the userId
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getUserProfileData = async (req, res) => {
  try {
    const userId = req.params.userId;

    const userProfile = await User.findById(userId, "-password");
    if (!userProfile) {
      return res
        .status(404)
        .json({ status: "error", message: "User profile not found" });
    }

    res.json(userProfile);
  } catch (error) {
    console.error("Error fetching profile data:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    if (req.user.id !== req.params.userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized to update this profile" });
    }

    const {
      username,
      email,
      fullName,
      contactNumber,
      age,
      fullAddress,
      profilePicture,
    } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username,
          email,
          fullName,
          contactNumber,
          age,
          fullAddress,
          profilePicture,
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUserForAdmin = async (req, res) => {
  const { id } = req.params;
  const {
    fullName,
    username,
    email,
    age,
    contactNumber,
    fullAddress,
    password,
  } = req.body;

  try {
    // Find the user by ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user fields
    user.fullName = fullName || user.fullName;
    user.username = username || user.username;
    user.email = email || user.email;
    user.age = age || user.age;
    user.contactNumber = contactNumber || user.contactNumber;
    user.fullAddress = fullAddress || user.fullAddress;

    // If password is provided, hash it and update
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    // Save the updated user
    const updatedUser = await user.save();

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserProfileDetailsData = async (req, res) => {
  try {
    const blogUserId = req.params.blogUserId;

    const userProfile = await User.findById(blogUserId, "-password");
    if (!userProfile) {
      return res
        .status(404)
        .json({ status: "error", message: "User profile not found" });
    }

    res.json(userProfile);
  } catch (error) {
    console.error("Error fetching profile data:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

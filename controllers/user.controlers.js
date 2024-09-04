import dotenv from "dotenv";
// import jwt from "jsonwebtoken";
import User from "../modules/auth.modules.js";

dotenv.config();
// const JWT_SECRET = process.env.REACT_APP_TOKEN_URL;

export const getUserProfileData = async (req, res) => {
  try {
    const userId = req.params.userId;

    const userProfile = await User.findById(userId, "-password");
    if (!userProfile) {
      return res
        .status(404)
        .json({ status: "error", message: "User profile not found" });
    }

    // Optionally generate a token here if needed
    // const token = jwt.sign(
    //   { id: userProfile._id, username: userProfile.username },
    //   JWT_SECRET,
    //   { expiresIn: "1h" }
    // );

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
      fullAddreess,
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
          fullAddreess,
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

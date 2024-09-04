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

import express from "express";
import {
  delateUser,
  getAllUsers,
  getUserProfileData,
  getUserProfileDetailsData,
  updateUser,
} from "../controllers/user.controlers.js";
import { verifyToken } from "../utils/verifytoken.js";

const router = express.Router();

// Existing route
router.get("/getUserProfile/:userId", verifyToken, getUserProfileData);
// Update the route to include 'api/user' in the path
router.post("/updateProfile/:userId", verifyToken, updateUser);
router.get(
  "/getUserDetails/:blogUserId",
  verifyToken,
  getUserProfileDetailsData
);
router.get("/getAllUser", verifyToken, getAllUsers);
router.delete("/delateUser/:userId", verifyToken, delateUser);
export default router;

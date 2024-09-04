import express from "express";
import {
  getUserProfileData,
  updateUser,
} from "../controllers/user.controlers.js";
import { verifyToken } from "../utils/verifytoken.js";

const router = express.Router();

// Existing route
router.get("/getUserProfile/:userId", verifyToken, getUserProfileData);
// Update the route to include 'api/user' in the path
router.post("/updateProfile/:userId", verifyToken, updateUser);

export default router;

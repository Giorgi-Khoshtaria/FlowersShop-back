import express from "express";
import { getUserProfileData } from "../controllers/user.controlers.js";
import { verifyToken, refreshToken } from "../utils/verifytoken.js";

const router = express.Router();

// Existing route
router.get("/getUserProfile/:userId", verifyToken, getUserProfileData);

// New route for refreshing tokens
router.post("/refresh-token", refreshToken);

export default router;

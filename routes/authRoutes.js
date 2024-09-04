import express from "express";
const router = express.Router();
import {
  forgotPassword,
  login,
  signUp,
} from "../controllers/auth.controllers.js";
import { verifyToken } from "../utils/verifytoken.js";

// Route to handle user sign up
router.post("/signUp", verifyToken, signUp);
router.post("/login", verifyToken, login);
router.post("/forgot-password", verifyToken, forgotPassword);

export default router;

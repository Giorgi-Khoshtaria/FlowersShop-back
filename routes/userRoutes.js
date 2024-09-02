import express from "express";
const router = express.Router();
import {
  forgotPassword,
  login,
  signUp,
} from "../controllers/user.controllers.js";

// Route to handle user sign up
router.post("/signUp", signUp);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);

export default router;

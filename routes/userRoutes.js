import express from "express";
const router = express.Router();
import { login, signUp } from "../controllers/user.controllers.js";

// Route to handle user sign up
router.post("/signUp", signUp);
router.post("/login", login);

export default router;

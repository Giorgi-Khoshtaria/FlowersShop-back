import express from "express";
import { addCheckout } from "../controllers/checkout.controllers.js";
import { verifyToken } from "../utils/verifytoken.js";

const router = express.Router();

// Route to handle adding a new checkout
router.post("/addcheckout", verifyToken, addCheckout);

export default router;

import express from "express";
import {
  addCheckout,
  getOrdersByUserId,
} from "../controllers/checkout.controllers.js";
import { verifyToken } from "../utils/verifytoken.js";

const router = express.Router();

// Route to handle adding a new checkout
router.post("/addcheckout", verifyToken, addCheckout);
router.get("/getOrdersByUserId/:userId", verifyToken, getOrdersByUserId);

export default router;

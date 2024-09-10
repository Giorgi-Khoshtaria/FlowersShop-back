import express from "express";
import { addFlower, getFlowers } from "../controllers/flowers.controllers.js";
const router = express.Router();
import { verifyToken } from "../utils/verifytoken.js";

router.post("/addFlowers", verifyToken, addFlower);
router.get("/getFlowers", verifyToken, getFlowers);

export default router;

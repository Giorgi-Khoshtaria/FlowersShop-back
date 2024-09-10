import express from "express";
import { addFlower } from "../controllers/flowers.controllers.js";
const router = express.Router();

router.post("/addFlowers", addFlower);

export default router;

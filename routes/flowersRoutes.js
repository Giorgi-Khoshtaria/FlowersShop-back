import express from "express";
import {
  addFlower,
  getFlowers,
  getFlowersById,
} from "../controllers/flowers.controllers.js";
const router = express.Router();
import { verifyToken } from "../utils/verifytoken.js";

router.post("/addFlowers", verifyToken, addFlower);
router.get("/getFlowers", verifyToken, getFlowers);
router.get("/getFlowersById/:flowersId", verifyToken, getFlowersById);

export default router;

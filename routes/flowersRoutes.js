import express from "express";
import {
  addFlower,
  deleteflowers,
  getFlowers,
  getFlowersById,
} from "../controllers/flowers.controllers.js";
const router = express.Router();
import { verifyToken } from "../utils/verifytoken.js";

router.post("/addFlowers", verifyToken, addFlower);
router.get("/getFlowers", verifyToken, getFlowers);
router.get("/getFlowersById/:flowersId", verifyToken, getFlowersById);
router.delete("/deleteFlowers/:id", verifyToken, deleteflowers);

export default router;

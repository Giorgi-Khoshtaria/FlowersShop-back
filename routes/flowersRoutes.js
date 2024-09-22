import express from "express";
import {
  addFlower,
  deleteflowers,
  getFlowers,
  getFlowersById,
  updateFlower,
} from "../controllers/flowers.controllers.js";
const router = express.Router();
import { verifyToken } from "../utils/verifytoken.js";

router.post("/addFlowers", verifyToken, addFlower);
router.get("/getFlowers", verifyToken, getFlowers);
router.get("/getFlowersById/:flowersId", verifyToken, getFlowersById);
router.delete("/deleteFlowers/:id", verifyToken, deleteflowers);
router.put("/updateFlower/:id", verifyToken, updateFlower);

export default router;

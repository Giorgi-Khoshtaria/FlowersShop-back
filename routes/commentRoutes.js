import express from "express";
import { verifyToken } from "../utils/verifytoken.js";
import {
  addComment,
  getComments,
  getCommentsByFlowersId,
} from "../controllers/comment.controllers.js";
const router = express.Router();

router.post("/addComment", verifyToken, addComment);
router.get(
  "/getCommentsByFlowerId/:flowersId",
  verifyToken,
  getCommentsByFlowersId
);
router.get("/getCommets", verifyToken, getComments);

export default router;

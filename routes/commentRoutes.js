import express from "express";
import { verifyToken } from "../utils/verifytoken.js";
import {
  addComment,
  deleteComment,
  getCommentById,
  getComments,
  getCommentsByFlowersId,
  updateComment,
} from "../controllers/comment.controllers.js";
const router = express.Router();

router.post("/addComment", verifyToken, addComment);
router.get(
  "/getCommentsByFlowerId/:flowersId",
  verifyToken,
  getCommentsByFlowersId
);
router.get("/getCommets", verifyToken, getComments);
router.delete("/deleteComment/:id", verifyToken, deleteComment);
router.get("/getCommentById/:id", verifyToken, getCommentById);
router.put("/updateComment/:id", verifyToken, updateComment);

export default router;

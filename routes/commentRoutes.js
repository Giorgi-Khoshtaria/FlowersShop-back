import express from "express";
import { verifyToken } from "../utils/verifytoken.js";
import {
  addComment,
  deleteComment,
  deleteCommentsByUserId,
  getCommentById,
  getCommentByUserId,
  getComments,
  getCommentsByFlowersId,
  updateComment,
} from "../controllers/comment.controllers.js";
const router = express.Router();

router.post("/addComment", verifyToken, addComment);
router.get("/getCommentsByFlowerId/:flowersId", getCommentsByFlowersId);
router.get("/getCommets", verifyToken, getComments);
router.delete("/deleteComment/:id", verifyToken, deleteComment);
router.delete(
  "/deleteCommentByUserId/:userId",
  verifyToken,
  deleteCommentsByUserId
);
router.get("/getCommentById/:id", getCommentById);
router.put("/updateComment/:id", verifyToken, updateComment);
router.get("/getCommentByUserId/:id", verifyToken, getCommentByUserId);
export default router;

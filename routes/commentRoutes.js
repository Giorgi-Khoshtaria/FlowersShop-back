import express from "express";
import { verifyToken } from "../utils/verifytoken.js";
import { addComment } from "../controllers/comment.controllers.js";
const router = express.Router();

router.post("/addComment", verifyToken, addComment);

export default router;

// routes/blogs.js
import express from "express";
import { addBlog } from "../controllers/Blog.controllers.js";
import { verifyToken } from "../utils/verifytoken.js";

const router = express.Router();

// POST route for creating a blog
router.post("/addBlog", verifyToken, addBlog);

export default router;

// routes/blogs.js
import express from "express";
import {
  addBlog,
  getBlogById,
  getBlogs,
} from "../controllers/Blog.controllers.js";
import { verifyToken } from "../utils/verifytoken.js";

const router = express.Router();

// POST route for creating a blog
router.post("/addBlog", verifyToken, addBlog);
router.get("/getBlogs", verifyToken, getBlogs);
router.get("/getBlog/:blogid", verifyToken, getBlogById);

export default router;

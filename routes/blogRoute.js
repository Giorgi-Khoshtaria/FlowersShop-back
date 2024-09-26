// routes/blogs.js
import express from "express";
import {
  addBlog,
  delateBlog,
  getBlogById,
  getBlogByUserId,
  getBlogs,
  updateBlog,
} from "../controllers/Blog.controllers.js";
import { verifyToken } from "../utils/verifytoken.js";

const router = express.Router();

// POST route for creating a blog
router.post("/addBlog", verifyToken, addBlog);
router.get("/getBlogs", getBlogs);
router.get("/getBlog/:blogid", getBlogById);

router.get("/getBlogByUserId/:blogUserId", getBlogByUserId);
router.put("/updateBlog/:blogId", verifyToken, updateBlog);
router.delete("/deleteBlog/:blogId", verifyToken, delateBlog);

export default router;

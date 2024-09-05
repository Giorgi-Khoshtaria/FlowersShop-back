// controllers/blogController.js
import Blog from "../modules/blog.modules.js";

// Controller function to add a new blog
export const addBlog = async (req, res) => {
  try {
    const { blogName, blogDescription, blogImage, blogUserId } = req.body;

    console.log("Received data:", req.body); // Debugging line

    if (!blogName || !blogDescription || !blogImage || !blogUserId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newBlog = new Blog({
      blogName,
      blogDescription,
      blogImage,
      blogUserId,
    });

    await newBlog.save();

    res
      .status(201)
      .json({ message: "Blog created successfully", blog: newBlog });
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ error: "Server error" });
  }
};

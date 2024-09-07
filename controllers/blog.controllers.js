// controllers/blogController.js
import Blog from "../modules/blog.modules.js";

// Controller function to add a new blog
export const addBlog = async (req, res) => {
  try {
    const {
      blogName,
      blogDescription,
      blogImage,
      blogUserId,
      blogUserImage,
      blogUserName,
    } = req.body;

    console.log("Received data:", req.body); // Debugging line

    if (!blogName || !blogDescription || !blogImage || !blogUserId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newBlog = new Blog({
      blogName,
      blogDescription,
      blogImage,
      blogUserId,
      blogUserImage,
      blogUserName,
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

export const getBlogs = async (req, res) => {
  try {
    // Fetch all blogs from the database
    const blogs = await Blog.find();

    // If no blogs are found, return an empty array
    if (!blogs) {
      return res.status(404).json({ message: "No blogs found" });
    }

    // Return the blogs in the response
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { blogid } = req.params;

    // Find the blog by ID
    const blog = await Blog.findById(blogid);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Increment views
    blog.views += 1;
    await blog.save();

    // Send blog details
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

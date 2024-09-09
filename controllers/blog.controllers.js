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

export const getBlogByUserId = async (req, res) => {
  try {
    const { blogUserId } = req.params; // Get the user ID from params
    console.log(blogUserId, ":userId");

    // Find all blogs where blogUserId matches the userId from the params
    const blogByUser = await Blog.find({ blogUserId }); // Correct query

    if (!blogByUser || blogByUser.length === 0) {
      return res.status(404).json({ message: "No blogs found for this user" });
    }

    res.status(200).json(blogByUser); // Return the list of blogs
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update blog by ID
export const updateBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { blogName, blogDescription, blogImage } = req.body; // Add other fields as needed

    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      {
        blogName,
        blogDescription,
        blogImage, // Assuming the image is in base64 format or URL
      },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: "Error updating blog", error });
  }
};

export const delateBlog = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    console.log(blogId);

    // Find and delete the blog by ID
    const deletedBlog = await Blog.findByIdAndDelete(blogId);

    if (!deletedBlog) {
      return res.status(404).json({ msg: "Blog not found" });
    }

    res.status(200).json({ msg: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating blog", error });
  }
};

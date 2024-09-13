import Flower from "../modules/flower.modules.js";
import Comment from "../modules/comment.modules.js";

export const addComment = async (req, res) => {
  const { userId, userImage, userName, flowersId, comment, rating } = req.body;

  try {
    if (!userId || !flowersId || !comment || !rating) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const flower = await Flower.findById(flowersId);
    if (!flower) {
      return res.status(404).json({ error: "Flower not found." });
    }

    // Create a new comment
    const newComment = new Comment({
      userId,
      userImage,
      userName,
      flowersId,
      comment,
      rating,
    });

    const savedComment = await newComment.save();

    flower.comments.push(savedComment);
    await flower.save();

    return res
      .status(201)
      .json({ message: "Comment added successfully.", savedComment });
  } catch (error) {
    console.error("Error adding comment:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const getCommentsByFlowersId = async (req, res) => {
  try {
    const { flowersId } = req.params;

    // Find all comments where the flowersId matches
    const comments = await Comment.find({ flowersId });

    if (!comments || comments.length === 0) {
      return res
        .status(201)
        .json({ message: "No comments found for this flower" });
    }

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

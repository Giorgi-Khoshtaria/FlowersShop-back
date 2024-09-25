// models/Blog.js
import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  blogName: {
    type: String,
    required: true,
  },
  blogDescription: {
    type: String,
    required: true,
  },
  blogPhrase: { type: String, required: true },
  blogImage: {
    type: String, // store base64 string
    required: true,
  },
  blogUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  blogUserImage: {
    type: String,
    ref: "User",
  },
  blogUserName: { type: String, ref: "User" },
  likes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Blog", BlogSchema);

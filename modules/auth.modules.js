import mongoose from "mongoose";

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    avatar: {
      type: String,
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt timestamps
);

// Create User model based on user schema
const User = mongoose.model("User", userSchema);

export default User;

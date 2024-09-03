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
    fullname: {
      type: String,
    },
    contactNumber: {
      type: String,
    },
    age: {
      type: String,
    },
    fullAddreess: {
      type: String,
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

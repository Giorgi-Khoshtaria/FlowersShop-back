import mongoose from "mongoose";

const CheckoutSchema = new mongoose.Schema({
  flowerId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  flowerImage: {
    type: String,
    required: true,
  },
  flowerName: {
    type: String,
    required: true,
  },
  flowerPrice: {
    type: Number,
    required: true,
  },
  flowerQuantity: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("checkout", CheckoutSchema);

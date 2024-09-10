import mongoose from "mongoose";

const FlowersSchema = new mongoose.Schema({
  flowersPhoto: {
    type: String, // Store base64 string
    required: true,
  },
  flowersName: {
    type: String,
    required: true,
  },
  flowersDescription: {
    type: String,
    required: true,
  },
  flowersPrice: {
    type: String,
    required: true,
  },
  flowersRating: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Flower", FlowersSchema);

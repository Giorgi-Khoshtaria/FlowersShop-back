import mongoose from "mongoose";

const FlowersSchema = new mongoose.Schema({
  flowersNmae: {
    type: String,
    require: true,
  },
  flowersDescription: {
    type: String,
    require: true,
  },
  flowersPrice: {
    type: String,
    require: true,
  },
});

export default mongoose.model("Flower", FlowersSchema);

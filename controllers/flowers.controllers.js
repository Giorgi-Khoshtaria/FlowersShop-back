import Flower from "../modules/flower.modules.js";

export const addFlower = async (req, res) => {
  const {
    flowersName,
    flowersDescription,
    flowersPrice,
    flowersRating,
    flowersPhoto,
  } = req.body;

  try {
    // Create and save a new flower
    const newFlower = new Flower({
      flowersName,
      flowersDescription,
      flowersPrice,
      flowersRating,
      flowersPhoto,
    });

    await newFlower.save();
    // Send a single response after successfully saving the flower
    return res
      .status(201)
      .json({ message: "Flower added successfully!", flower: newFlower });
  } catch (error) {
    // Handle errors and send an error response
    return res.status(500).json({ message: "Failed to add flower", error });
  }
};

export const getFlowers = async (req, res) => {
  try {
    const flowers = await Flower.find();
    if (!flowers) {
      return res.status(404).json({ message: "No blogs found" });
    }
    res.status(200).json(flowers);
  } catch (error) {
    console.error("Error fetching flowers:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getFlowersById = async (req, res) => {
  try {
    const { flowersId } = req.params;

    // Find the blog by ID
    const flowers = await Flower.findById(flowersId);

    if (!flowers) {
      return res.status(404).json({ message: "Blog not found" });
    }
    await flowers.save();
    // Send blog details
    res.status(200).json(flowers);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteflowers = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteflower = await Flower.findByIdAndDelete(id);

    if (!deleteflower) {
      return res.status(404).json({ message: "flower not found" });
    }

    res.status(200).json({ message: "delete flower successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting flower", error });
  }
};

// Update Flower
export const updateFlower = async (req, res) => {
  const {
    flowersPhoto,
    flowersName,
    flowersDescription,
    flowersPrice,
    flowersRating,
  } = req.body;

  try {
    const updatedFlower = await Flower.findByIdAndUpdate(
      req.params.id,
      {
        flowersPhoto,
        flowersName,
        flowersDescription,
        flowersPrice,
        flowersRating,
      },
      { new: true } // Return updated document
    );
    if (!updatedFlower)
      return res.status(404).json({ message: "Flower not found." });
    res.json(updatedFlower);
  } catch (error) {
    res.status(500).json({ message: "Error updating flower.", error });
  }
};

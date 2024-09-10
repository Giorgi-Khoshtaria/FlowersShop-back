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

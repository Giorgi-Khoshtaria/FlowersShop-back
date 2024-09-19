import Checkout from "../modules/checkout.modules.js";

export const addCheckout = async (req, res) => {
  const { cartItems, userId } = req.body; // Get cartItems and userId from the request body

  try {
    // Calculate the total for each item
    const checkoutItems = cartItems.map((item) => ({
      flowerId: item.flowerId,
      userId: userId,
      flowerImage: item.flowerImage,
      flowerName: item.flowerName,
      flowerPrice: item.flowerPrice,
      flowerQuantity: item.flowerQuantity,
      total: item.flowerPrice * item.flowerQuantity, // Calculate total for each item
    }));

    // Save all checkout items to the database
    await Checkout.insertMany(checkoutItems);

    return res.status(201).json({
      message: "Checkout items added successfully!",
      checkoutItems,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error adding checkout items.",
      error: error.message,
    });
  }
};

export const getOrdersByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Checkout.find({ userId });
    if (!orders || orders.length === 0) {
      return res.status(201).json({ message: "No Orders Found" });
    }
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const delateOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Checkout.findByIdAndDelete(orderId);
    if (!order) {
      return res.status(201).json({ message: "No Orders Found" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

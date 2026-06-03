import { Order } from "../models/order.model.js";

export const createOrder = async (req, res) => {

  try {

    const {
      items,
      totalAmount
    } = req.body;

    const order = await Order.create({

      user: req.user._id,

      items,

      totalAmount,

      paymentStatus: "Paid"
    });

    res.status(201).json({

      message: "Order Saved Successfully",

      order
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: error.message
    });
  }
};
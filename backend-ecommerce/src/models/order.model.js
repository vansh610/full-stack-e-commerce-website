import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

  user: {

    type: mongoose.Schema.Types.ObjectId,

    ref: "User"
  },

  items: [

    {

      id: String,

      name: String,

      image: String,

      price: Number
    }
  ],

  totalAmount: Number,

  paymentStatus: {

    type: String,

    default: "Paid"
  }

}, { timestamps: true });

export const Order =
mongoose.model("Order", orderSchema);
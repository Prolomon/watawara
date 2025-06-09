import mongoose from "mongoose";

const ordersSchema = mongoose.Schema(
  {
    userId: { type: String },
    orderId: { type: String },
    delivery: { type: String },
    date: { type: Date },
    status: { type: String, default: "processing" },
    subTotal: { type: String },
    tax: { type: String },
    shipping: { type: String },
    total: { type: String },
    timeline: {
      orderPlaced: { type: Boolean },
      paymentConfirmed: { type: Boolean },
      orderProcessing: { type: Boolean },
      orderShipped: { type: Boolean },
      ready: { type: Boolean },
    },
    products: [
      {
        storeId: { type: String },
        productId: { type: String },
        quantity: { type: Number },
        color: { type: String },
        size: { type: String },
      },
    ],
  },
  { timestamps: true }
);


  let Orders;
if (mongoose && mongoose.models && mongoose.models.Orders) {
Orders = mongoose.models.Orders;
} else if (mongoose) {
Orders = mongoose.model("Orders", ordersSchema);
} else {
  console.error("Mongoose is not available to define the orders model.");
  throw new Error("Mongoose instance is required to define the orders model.");
}

export { Orders };
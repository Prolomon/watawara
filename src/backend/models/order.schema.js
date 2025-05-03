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

export const Orders =
  mongoose.models.Orders || mongoose.model("Orders", ordersSchema);

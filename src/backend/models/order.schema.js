import mongoose from "mongoose";

const ordersSchema = mongoose.Schema(
    {
      userId: { type: String },
        productId: { type: String },
        storeId: { type: String },
        orderId: { type: String },
        quantity: { type: String },
        color: { type: String },
        size: { type: String },
        delivery: { type: String },
        date: { type: Date },
        status: { type: String, default: "processing" },
        timeline: {
          orderPlaced: { type: Boolean },
          paymentConfirmed: { type: Boolean },
          orderProcessing: { type: Boolean },
          orderShipped: { type: Boolean },
          ready: { type: Boolean },
        },
    },
    { timestamps: true }
);

export const Orders = mongoose.models.Orders || mongoose.model("Orders", ordersSchema);

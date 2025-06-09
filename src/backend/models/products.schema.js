import mongoose from "mongoose";
import { nanoid } from "nanoid";

const productSchema = new mongoose.Schema(
  {
    id: { type: String, default: nanoid() },
    status: { type: Boolean, default: true },
    store: { type: String, default: "Watawara" },
    sku: { type: String },
    storeId: { type: String },
    name: { type: String },
    price: { type: Number },
    quantity: { type: Number },
    stock: { type: Number },
    category: { type: String },
    subCategory: { type: String },
    tag: [{ type: String, default: "none" }],
    discount: {
      type: { type: String, default: "none" },
      amount: { type: Number, default: 0 },
    },
    deliveryInfo: {
      weight: { type: String },
      dimension: {
        length: { type: String },
        width: { type: String },
        height: { type: String },
      },
    },
    brand: { type: String },
    color: [{ type: String, default: "none" }],
    material: [{ type: String, default: "none" }],
    size: [{ type: String, default: "none" }],
    description: { type: String },
    content: { type: String },
    promotion: {
      start: { type: String },
      end: { type: String },
      type: { type: String },
    },
    likes: [{ type: String }],
    specifications: [Object],
    images: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

const Products =
  mongoose.models?.products || mongoose.model("products", productSchema);

export { Products };

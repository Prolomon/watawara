import mongoose from "mongoose"
import { v4 as uuidv4 } from 'uuid';

const productsSchema = mongoose.Schema(
  {
    id: { type: String, default: uuidv4 },
    status: { type: Boolean, default: true },
    store: { type: String, default: "Watawara" },
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
      width: { type: String },
      dimension: {
        length: { type: String },
        weight: { type: String },
        height: { type: String },
      },
    },
    brand: { type: String },
    colors: [{ type: String }],
    description: { type: String },
    likes: [{ type: String }],
    specifications: [
      {
        key: { type: String },
        value: { type: String },
      },
    ],
    images: [{ type: String }],
    reviews: [
      {
        userId: { type: String },
        date: { type: Date, default: new Date().toDateString() },
        comment: { type: String },
        rating: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);
export const Products = mongoose.models.Products || mongoose.model('Products', productsSchema);
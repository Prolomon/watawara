import mongoose from "mongoose";
import { nanoid } from "nanoid";

const reviewSchema = new mongoose.Schema(
  {
    id: { type: String },
    userId: { type: String },
    date: { type: Date, default: new Date().toDateString() },
    comment: { type: String },
    rating: { type: String },
  },
  {
    timestamps: true,
  }
);

const Reviews =
  mongoose.models?.reviews || mongoose.model("reviews", reviewSchema);

export { Reviews };

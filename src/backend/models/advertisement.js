import mongoose from "mongoose";

const advertisementSchema = mongoose.Schema(
  {
    advertisement: {
      large: [{ type: String }],
      small: [{ type: String }],
    },
    default: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);
export const Advertisement =
  mongoose.models.Advertisement ||
  mongoose.model("Advertisement", advertisementSchema);

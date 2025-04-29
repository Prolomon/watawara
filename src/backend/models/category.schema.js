import mongoose from "mongoose"

const categoriesSchema = mongoose.Schema(
  {
    status: { type: Boolean, default: true },
    category: { type: String },
    subCategory: [{ type: String, default: "" }]
  },
  {
    timestamps: true,
  }
);
export const Categories = mongoose.models.Categories || mongoose.model('Categories', categoriesSchema);
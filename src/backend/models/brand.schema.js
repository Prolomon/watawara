import mongoose from "mongoose";

const brandSchema = mongoose.Schema(
    {
        brand: {type: String }
    }
    ,
    {
        timestamps: true,
    }
);
export const Brand =
  mongoose.models.Brand || mongoose.model("Brand", brandSchema);

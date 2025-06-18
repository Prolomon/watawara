import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const purchaseSchema = mongoose.Schema(
  {
    purchase: { type: String },
    author: { type: String },
    status: { type: Boolean, default: false, enum: [true, false] },
    id: { type: String, default: uuidv4 },
  },
  { timestamps: true }
);

// export const Purchase = mongoose.models.Purchase || mongoose.model("Purchase", purchaseSchema);

let Purchase;
if (mongoose && mongoose.models && mongoose.models.Purchase) {
  Purchase = mongoose.models.Purchase;
} else if (mongoose) {
  Purchase = mongoose.model("Purchase", purchaseSchema);
} else {
  console.error("Mongoose is not available to define the purchase model.");
  throw new Error(
    "Mongoose instance is required to define the purchase model."
  );
}

export { Purchase };

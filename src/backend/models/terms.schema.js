import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const termsSchema = mongoose.Schema(
  {
    terms: { type: String },
    author: { type: String },
    status: { type: Boolean, default: false, enum: [true, false] },
    id: { type: String, default: uuidv4 },
  },
  { timestamps: true }
);

// export const Terms = mongoose.models.Terms || mongoose.model("Terms", termsSchema);

let Terms;
if (mongoose && mongoose.models && mongoose.models.Terms) {
  Terms = mongoose.models.Terms;
} else if (mongoose) {
  Terms = mongoose.model("Terms", termsSchema);
} else {
  console.error("Mongoose is not available to define the terms model.");
  throw new Error(
    "Mongoose instance is required to define the terms model."
  );
}

export { Terms };

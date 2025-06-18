import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const legalSchema = mongoose.Schema(
  {
    legal: { type: String },
    author: { type: String },
    status: { type: Boolean, default: false, enum: [true, false] },
    id: { type: String, default: uuidv4 },
  },
  { timestamps: true }
);

// export const Legal = mongoose.models.Legal || mongoose.model("Legal", legalSchema);

let Legal;
if (mongoose && mongoose.models && mongoose.models.Legal) {
  Legal = mongoose.models.Legal;
} else if (mongoose) {
  Legal = mongoose.model("Legal", legalSchema);
} else {
  console.error("Mongoose is not available to define the legal model.");
  throw new Error(
    "Mongoose instance is required to define the legal model."
  );
}

export { Legal };

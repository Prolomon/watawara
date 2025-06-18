import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const intellectualSchema = mongoose.Schema(
  {
    intellectual: { type: String },
    author: { type: String },
    status: { type: Boolean, default: false, enum: [true, false] },
    id: { type: String, default: uuidv4 },
  },
  { timestamps: true }
);

// export const Intellectual = mongoose.models.Intellectual || mongoose.model("Intellectual", intellectualSchema);

let Intellectual;
if (mongoose && mongoose.models && mongoose.models.Intellectual) {
  Intellectual = mongoose.models.Intellectual;
} else if (mongoose) {
  Intellectual = mongoose.model("Intellectual", intellectualSchema);
} else {
  console.error("Mongoose is not available to define the intellectual model.");
  throw new Error("Mongoose instance is required to define the intellectual model.");
}

export { Intellectual };

import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const privacySchema = mongoose.Schema(
  {
    privacy: { type: String },
    author: { type: String },
    status: { type: Boolean, default: false, enum: [true, false] },
    id: { type: String, default: uuidv4 },
  },
  { timestamps: true }
);

// export const Privacy = mongoose.models.Privacy || mongoose.model("Privacy", privacySchema);

let Privacy;
if (mongoose && mongoose.models && mongoose.models.Privacy) {
  Privacy = mongoose.models.Privacy;
} else if (mongoose) {
  Privacy = mongoose.model("Privacy", privacySchema);
} else {
  console.error("Mongoose is not available to define the privacy model.");
  throw new Error(
    "Mongoose instance is required to define the privacy model."
  );
}

export { Privacy };

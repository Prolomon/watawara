import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const aboutSchema = mongoose.Schema(
  {
    about: { type: String },
    author: { type: String },
    status: { type: Boolean, default: false, enum: [true, false] },
    id: { type: String, default: uuidv4 }
  },
  { timestamps: true }
);

// export const About = mongoose.models.About || mongoose.model("About", aboutSchema);

let About;
if (mongoose && mongoose.models && mongoose.models.About) {
  About = mongoose.models.About;
} else if (mongoose) {
  About = mongoose.model("About", aboutSchema);
} else {
  console.error("Mongoose is not available to define the about model.");
  throw new Error(
    "Mongoose instance is required to define the about model."
  );
}

export { About };

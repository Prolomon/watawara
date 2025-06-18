import mongoose from "mongoose";

const socialSchema = mongoose.Schema(
  {
    handle: { type: String },
    url: { type: String },
    name: { type: String },
  },
  { timestamps: true }
);

// export const Social = mongoose.models.Social || mongoose.model("Social", socialSchema);

let Social;
if (mongoose && mongoose.models && mongoose.models.Social) {
  Social = mongoose.models.Social;
} else if (mongoose) {
  Social = mongoose.model("Social", socialSchema);
} else {
  console.error("Mongoose is not available to define the social model.");
  throw new Error("Mongoose instance is required to define the social model.");
}

export { Social };
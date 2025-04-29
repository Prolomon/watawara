import mongoose from "mongoose";

const announcementsSchema = mongoose.Schema(
  {
    message: { type: String },
    current: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);
export const Announcements =
  mongoose.models.Announcements || mongoose.model("Announcements", announcementsSchema);

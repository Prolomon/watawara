"use server";
import { User } from "../models/user.schema";
import { auth } from "../../../auth";
import { dbConnect } from "../server/server";
import { redirect } from "next/navigation";

export const addAddress = async (formData) => {
  // Get database connection
  await dbConnect();

  // Get user session?
  const session = await auth();
  if (!session?.user?._id) {
    throw new Error("User not authenticated");
  }

  const address = {
    country: formData.get("country"),
    state: formData.get("state"),
    city: formData.get("city"),
    landmark: formData.get("landmark"),
    postalCode: formData.get("postal"),
    address: formData.get("address"),
  };
  const id = session?.user._id;

  // Update user with timeout settings
  const result = await User.findByIdAndUpdate(
    id,
    { $set: { address: { ...address } } },
    {
      new: true,
      runValidators: true,
      maxTimeMS: 5000, // 5 second timeout
    }
  );

  if (!result) {
    redirect("/auth/login");
  }
  return { success: true };
};

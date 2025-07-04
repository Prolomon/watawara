"use server";
import { User } from "../models/user.schema";
import { dbConnect } from "../server/server";
import { redirect } from "next/navigation";
import { authCookie } from "../authCookie";

export const addAddress = async (formData) => {
  // Get database connection
  await dbConnect();

  // Get user session?
  const session = await authCookie();
  if (!session?.id) {
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
  const id = session?.id;

  // Update user with timeout settings
  const result = await User.updateOne(
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

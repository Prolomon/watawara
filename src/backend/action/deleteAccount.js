"use server";
import { User } from "../models/user.schema";
import { auth } from "../../../auth";

export async function deleteAccount(formData) {
  try {
    const session = await auth();
    const email = formData.get("email");

    if (!email) {
      return { error: "Email is required" };
    }

    const curUser = await User.findOne({ email, _id: session?.user.id });

    if (!curUser) {
      return { error: "Invalid User Email" };
    }

    await User.findOneAndDelete({ email, _id: session?.user.id });
    return { success: true };
  } catch (error) {
    console.error("Delete account error:", error);
    return { error: "Failed to delete account" };
  }
}

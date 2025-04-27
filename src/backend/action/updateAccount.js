"use server";
import { auth } from "../../../auth";
import { User } from "../models/user.schema";
import { NextResponse } from "next/server";
import { dbConnect } from "../server/server";

export const updateAccount = async (formData) => {
  try {
    const data = {
      // avatar: formData.get("avatar"),
      fullname: formData.get("fullname"),
      email: formData.get("email"),
      dob: formData.get("dob"),
      gender: formData.get("gender"),
      phoneNo: formData.get("phoneNo"),
    };

    await dbConnect();

    // Get user session?
    const session = await auth();
    if (!session?.user?._id) {
      throw new Error("User not authenticated");
    }

    const id = session?.user._id;

    // Update user with dob and wallet details
    const result = await User.findByIdAndUpdate(
      id,
      { ...data },
      {
        new: true,
        runValidators: true,
        maxTimeMS: 5000, // 5 second timeout
      }
    ).lean(); // Convert the result to a plain object

    if (!result) {
      throw new Error("User not found");
    }

    console.log("User data successfully");

    // Return a redirect response
    return;
  } catch (error) {
    console.error("Error updating identity:", error);
    return NextResponse.json({
      success: false,
      error: error.message || "Failed to update identity",
    });
  }
};

"use server";
import { auth } from "../../../auth";
import { dbConnect } from "../server/server";
import { Wallet } from "../models/wallet.schema";
import { User } from "../models/user.schema";
import { redirect } from "next/navigation";

export const verifyIdentity = async (formData) => {
  const idType = formData.get("idType");
  const idNumber = formData.get("idNumber");
  const dob = formData.get("dob");

  if (!idNumber || !dob) {
    redirect("/identity/verify-self?message=all-fields-required");
    return; // Terminate execution
  }

  await dbConnect();

  // Get user session
  const session = await auth();
  if (!session?.user?._id) {
    redirect("/auth/login");
    return; // Terminate execution
  }

  // Fetch user and convert to plain object
  const user = await User.findById(session.user._id).lean();
  if (!user) {
    redirect("/auth/login");
    return; // Terminate execution
  }

  const walletExist = await Wallet.findOne({ userId: session.user._id }).lean();
  if (walletExist) {
    redirect("/wallet");
    return; // Terminate execution
  }

  const dataExist = await Wallet.findOne({ idNumber, idType }).lean();
  if (dataExist) {
    redirect("/identity/verify-self?message=id-exist");
    return; // Terminate execution
  }

  // Update wallet and convert to plain object
  await Wallet.create(
    { userId: session.user._id }, // Query by userId
    { $set: { idType, idNumber, isActive: true, isVerified: true } }, // Update fields
    {
      new: true,
      runValidators: true,
      maxTimeMS: 5000,
    }
  ).lean(); // Convert result to plain object

  await User.findByIdAndUpdate(
    { _id: session.user._id },
    { $set: { dob } },
    {
      new: true,
      runValidators: true,
      maxTimeMS: 5000,
    }
  ).lean();

  redirect("/wallet");
  return; // Terminate execution
};

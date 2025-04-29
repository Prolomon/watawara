"use server";
import { signIn, signOut } from "../../../auth";
import { AuthError } from "next-auth"; 
import { redirect } from "next/navigation"; 
import { auth } from "../../../auth";
import { User } from "../models/user.schema";
import { NextResponse } from "next/server";
import { dbConnect } from "../server/server";
import { put } from "@vercel/blob";
import { hash } from "bcryptjs";


export async function login(formData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      return { error: "Email and password are required." };
    }
    await signIn("credentials", {
      email,
      password,
      redirect: false, // Prevent NextAuth from automatically redirecting on error
    });

    return { success: true };

  } catch (error) {
    // Catch specific NextAuth errors
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          // error.message should contain the specific message from authorize
          return { error: error.message || 'Invalid email or password.' };
        // Add cases for other AuthError types if needed
        default:
          console.error("Auth Error:", error);
          return { error: 'An authentication error occurred.' };
      }
    } else {
      // Handle non-AuthError errors
      console.error("Login Action Error:", error);
      return { error: "An unexpected server error occurred." };
    }
  }
}

export const logout = async () => {
  // Use the server-side signOut from auth.js
  await signOut({ redirect: true }); // Perform sign out without automatic redirect first
  redirect("/auth/login"); // Manually redirect after sign out is complete
};

export const updateAccount = async (formData) => {
  
  try {

    await dbConnect();

    // Get user session?
    const session = await auth();
    if (!session?.user?.email) {
      throw new Error("User not authenticated");
    }

    const email = session?.user.email;

    const avatarFile = formData.get("avatar");
    let avatarUrl = null; // Initialize avatarUrl

    if (avatarFile instanceof File && avatarFile.size > 0) {
      const blob = await put(`avatar/${email}-${avatarFile.name}`, avatarFile, {
        access: "public", 
      });
      avatarUrl = blob.url;
    }


    const data = {
      avatar: avatarUrl,
      fullname: formData.get("fullname"),
      email: formData.get("email"),
      dob: formData.get("dob"),
      gender: formData.get("gender"),
      phoneNo: formData.get("phoneNo"),
    };

    const result = await User.updateOne(
      {email},
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

export async function resetPassword(formData) {
  const resetPasswordCredentials = {
    otp: formData.get("otp"),
    password: formData.get("password"),
  };

  console.log(resetPasswordCredentials);
}

export async function forgottenPassword(e) {
  await dbConnect();

  const email = e.get("email");

  const user = await User.findOne({ email });

  // if(!user) redirect("/auth/forgotten-password?validate=true");
}

export async function deleteAccount(formData) {
    const session = await auth();
    const email = formData.get("email");

    const curUser = await User.findOne({ email });

    if (!email || !curUser || session.user.email !== curUser) {
      redirect("/settings?validate=failed");
    }

    await User.findOneAndDelete({ email: session.user.email  })

    await signOut({ redirect: false });

    redirect("/");

}

export const createAccount = async (formData) => {
  const fullname = formData.get("fullname").toLowerCase();
  const email = formData.get("email").toLowerCase();
  const phoneNo = formData.get("phone_no").toLowerCase();
  const dob = formData.get("dob").toLowerCase();
  const gender = formData.get("gender").toLowerCase();
  const password = formData.get("password");

  if (!fullname || !email || !phoneNo || !password)
    redirect("/auth/signup?message=all-fields-required");

  await dbConnect();

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) redirect("/auth/signup?message=email-exists");

  // Hash password with proper salt rounds
  const saltRounds = 10;
  const hashPassword = await hash(password, saltRounds);

  // Create new user with hashed password
  const newUser = await User.create({
    fullname,
    email,
    phoneNo,
    dob,
    gender,
    password: hashPassword,
  });

  if (!newUser) redirect("/auth/signup?message=error");

  redirect("/auth/login");
};

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
import { Mailer } from "../mailer";

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

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
        case "CredentialsSignin":
          // error.message should contain the specific message from authorize
          return { error: error.message || "Invalid email or password." };
        // Add cases for other AuthError types if needed
        default:
          console.error("Auth Error:", error);
          return { error: "An authentication error occurred." };
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
      const blob = await put(
        `customers/avatars/${email}-${avatarFile.name}`,
        avatarFile,
        {
          access: "public",
        }
      );
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
      { email },
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
  await dbConnect();
  const otp = formData.get("otp"),
    password = formData.get("password"),
    email = formData.get("email");
  const user = await User.findOne({ email });
  console.log(user, user.otp == otp);
  if (user.otp != otp) {
    redirect(
      "/auth/forgotten-password/reset?status=Invalid OTP code provided&email=" +
        email
    );
  }
  const saltRounds = 12;
  const hashPassword = await hash(password, saltRounds);
  await User.updateOne({ email }, { password: hashPassword });
  await User.updateOne({ email }, { otp: null });
  
  await Mailer(email, "reset");

  redirect("/auth/login");
}

export async function forgottenPassword(e) {
  await dbConnect();
  const email = e.get("email");
  const user = await User.findOne({ email });

  if (!user)
    redirect(
      "/auth/forgotten-password?message=eEmail does not exist in database"
    );

  const otp = generateOtp();
  const result = await User.updateOne({ email }, { otp });

  await Mailer(email, "otp");

  redirect(
    "/auth/forgotten-password/reset?authCode=werygre37er327r323rhr3hr237r32gqr7g23rg3yeg3ryg73748rdndnwirurr&email=" +
      email
  );
}

export async function deleteAccount(formData) {
  const session = await auth();
  const email = formData.get("email");

  const curUser = await User.findOne({ email });

  if (!email || !curUser || session.user.email !== curUser) {
    redirect("/settings?validate=failed");
  }

  await User.findOneAndDelete({ email: session.user.email });

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
  const existingUser = await User.findOne({ email });
  if (existingUser) redirect("/auth/signup?message=email-exists");
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
    otp: generateOtp(),
    status: "inactive",
  });

  if (!newUser) redirect("/auth/signup?message=user-creation-error");

  await Mailer(email, "welcome");

  redirect("/auth/otp?email=" + email);
};

export const userOtp = async (formData) => {
  const email = formData.get("email");
  const otp = formData.get("otp");
  await dbConnect();

  if (!otp) redirect("/auth/login?message=all-fields-required");

  // Check if user already exists
  const user = await User.findOne({ email });

  if (user.status === "active") redirect("/auth/login");

  if (user.otp != otp) redirect(`/auth/otp?email=${email}&message=invalid-otp`);

  await User.updateOne({ email }, { status: "active", otp: null });

  redirect("/auth/login");
};

"use server";
import { signOut } from "../../../auth";
import { redirect } from "next/navigation";
import { auth } from "../../../auth";
import { User } from "../models/user.schema";
import { NextResponse } from "next/server";
import { dbConnect } from "../server/server";
import { put } from "@vercel/blob";
import { hash, compare } from "bcryptjs";
import { Mailer } from "../mailer";
import { Otp } from "@/utilities/currency/Otp";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { authCookie } from "../authCookie";

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "");

export async function login(formData) {
  try {
    await dbConnect();
    const email = formData.get("email");
    const password = formData.get("password");

    console.log(email, password);

    if (!email || !password) {
      return {
        success: false,
        message: "User Email and Password needed to authenticate.",
      };
    }

    const user = await User.findOne({ email });

    if (!user) {
      return {
        success: false,
        message: "Invalid user Email and Password provided to authenticate.",
      };
    }

    // The compare function needs to be awaited as it returns a Promise
    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      return {
        success: false,
        message: "Invalid user Email and Password provided to authenticate.",
      };
    }

    // Ensure JWT_SECRET is not empty
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not configured");
    }

    const jwt = await new SignJWT({
      id: user._id.toString(), // Convert ObjectId to string
      email: user.email,
      role: user.role,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt() // Add issued at time
      .setExpirationTime("7d")
      .sign(secret);

    const cookieStore = cookies();
    cookieStore.set("auth.watawara.session", jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
    });

    // if (user.status === "inactive") {
    //   return {
    //     success: false,
    //     message: "User account is not active. Please activate your account.",
    //   };
    // }

    return {
      success: true,
      message: "User authentication successful.",
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      message: error.message,
    };
  }
}

export const logout = async () => {
  // Use the server-side signOut from auth.js
 (await cookies())?.delete("auth.watawara.session");
  await signOut();
};

export const updateAccount = async (formData) => {
  try {
    await dbConnect();

    // Get user session?
    const session = await authCookie();
    if (!session?.email) {
      throw new Error("User not authenticated");
    }

    const email = session?.email;

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
    email = formData.get("email"),
    hashOtp = cookies().get("_watawara_otp")?.value;

  console.log(hashOtp);

  const isMatch = await compare(String(otp), hashOtp);
  console.log(isMatch);
  if (!isMatch) {
    redirect(
      "/auth/forgotten-password/reset?status=Invalid OTP code provided&email=" +
        email
    );
  }
  const saltRounds = 12;
  const hashPassword = await hash(password, saltRounds);
  await User.updateOne({ email }, { password: hashPassword, otp: null });
  await Mailer(email, "reset");
  redirect("/auth/login");
}

export async function forgottenPassword(e) {
  await dbConnect();
  const email = e.get("email");
  const user = await User.findOne({ email });

  if (!user)
    redirect(
      "/auth/forgotten-password?message=Email does not exist in database"
    );
  const otp = await Otp();
  (await cookies()).set("_watawara_otp", await hash(String(otp), 10), {
    expires: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes expiry
  });

  await Mailer(email, "otp", otp);

  redirect("/auth/forgotten-password/reset?authCode=kwt&email=" + email);
}

export async function deleteAccount(formData) {
  const session = await authCookie();
  const email = formData.get("email");
  const curUser = await User.findOne({ email });
  if (!email || !curUser || session?.email != curUser.email) redirect("/settings?validate=failed");
  const otp = await Otp();
  (await cookies()).set("_watawara_otp", await hash(String(otp), 10), {
    expires: new Date(Date.now() + 10 * 60 * 1000),
  });
  (await cookies())?.delete("auth.watawara.session");
  await signOut();
  await Mailer(email, "deleteOtp", otp);
  redirect("/auth/otp?email=" + email + "&authType=deletion");
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
  const saltRounds = 16;
  const hashPassword = await hash(password, saltRounds);
  const otp = await Otp();
  await cookies().set("_watawara_otp", await hash(String(otp), 10), {
    expires: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes expiry
  });

  const newUser = await User.create({
    fullname,
    email,
    phoneNo,
    dob,
    gender,
    password: hashPassword,
    status: "inactive",
  });

  if (!newUser) redirect("/auth/signup?message=user-creation-error");

  await Mailer(email, "welcome", otp);

  redirect("/auth/otp?email=" + email + "&authType=authenticate");
};

export const userOtp = async (formData) => {
  const email = formData.get("email");
  const otp = formData.get("otp");
  const authType = formData.get("authType");
  await dbConnect();

  if (!otp) redirect("/auth/login?message=all-fields-required");

  // Check if user already exists
  const user = await User.findOne({ email }),
  hashOtp = cookies().get("_watawara_otp")?.value;

  if (user.status === "active") redirect("/auth/login");
  const isMatch = await compare(String(otp), hashOtp);

  if (!isMatch) redirect(`/auth/otp?email=${email}&message=invalid-otp`);

  if (authType === "authenticate") {
    await Mailer(email, "login");
    await User.updateOne({ email }, { status: "active", otp: null });
  } else {
    await Mailer(email, "delete");
    await User.deleteOne({ email });
  }

  redirect("/auth/login");
};

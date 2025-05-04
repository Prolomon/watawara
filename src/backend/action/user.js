"use server";
import { signIn, signOut } from "../../../auth";
import { AuthError } from "next-auth";
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

export async function login(formData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      return { error: "Email and password are required." };
    }
    await Mailer(email, "login");

    // await cookies.set("_watawara_otp", await hashPassword(Otp(), 12), {
    //   expires: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes expiry
    // });

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
  await signOut({ redirect: true });

  redirect("/auth/login");
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
  const session = await auth();
  const email = formData.get("email");
  const curUser = await User.findOne({ email });
  if (!email || !curUser || session.user.email != curUser.email) redirect("/settings?validate=failed");
  const otp = await Otp();
  (await cookies()).set("_watawara_otp", await hash(String(otp), 10), {
    expires: new Date(Date.now() + 10 * 60 * 1000),
  });
  await signOut({ redirect: true });
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
  const saltRounds = 10;
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

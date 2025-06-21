"use server";
import { signOut, signIn } from "../../../auth";
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
import { Login } from "@/utilities/mails/Login";
import { Mail } from "@/utilities/mails/Mail";
import { Otp as PasswordOtp } from "@/utilities/mails/Otp";
import { Password } from "@/utilities/mails/Password";
import { Deleted } from "@/utilities/mails/Delete";

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "");

export async function login(formData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      return {
        success: false,
        message: "User Email and Password needed to authenticate.",
      };
    }

    // Use NextAuth credentials provider for login
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      return {
        success: false,
        message:
          result.error ||
          "Invalid user Email and Password provided to authenticate.",
      };
    }

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
  redirect("/auth/login");
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
  try {
    await dbConnect();
    const otp = formData.get("otp"),
      password = formData.get("password"),
      email = formData.get("email"),
      hashOtp = (await cookies()).get("auth.watawara.otp")?.value;

    const isMatch = await compare(String(otp), hashOtp);
    if (!isMatch) {
      return {
        success: false,
        message: "Wrong OTP provided",
      };
    }
    const saltRounds = 12;
    const hashPassword = await hash(password, saltRounds);
    const result = await User.updateOne(
      { email },
      { password: hashPassword, otp: null }
    );

    if (!result) {
      return {
        success: false,
        message: "Failed to Reset User Password",
      };
    }

    // await Mailer(email, Password, "Password Change Successful");
    return {
      success: true,
      message: "Wrong OTP provided",
    };
  } catch (error) {
    return {
      success: false,
      message: e.message,
    };
  }
}

export async function forgottenPassword(e) {
  try {
    await dbConnect();
    const email = e.get("email");
    const user = await User.findOne({ email });

    if (!email)
      return {
        success: false,
        message: "Input field cannot be empty",
      };

    if (!user)
      return {
        success: false,
        message: "User does not exist",
      };

    const otp = await Otp();

    (await cookies()).set("auth.watawara.otp", await hash(String(otp), 10), {
      expires: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes expiry
    });

    (await cookies()).set("auth.watawara.email", email, {
      expires: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes expiry
    });

    // await Mailer(email, PasswordOtp, "Password Reset OTP");

    return {
      success: true,
      message: "Reset mail has been sent to your mail" + email,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

export async function deleteAccount(formData) {
  const session = await authCookie();
  const email = formData.get("email");
  const curUser = await User.findOne({ email });
  if (!email || !curUser || session?.email != curUser.email)
    redirect("/settings?validate=failed");
  const otp = await Otp();
  (await cookies()).set("auth.watawara.otp", await hash(String(otp), 10), {
    expires: new Date(Date.now() + 10 * 60 * 1000),
  });
  (await cookies())?.delete("auth.watawara.session");

  // await Mailer(email, Deleted, "Login Security Alert");

  (await cookies()).set("auth.watawara.otp", await hash(String(otp), 10), {
    expires: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes expiry
  });

  (await cookies()).set("auth.watawara.email", email, {
    expires: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes expiry
  });
  redirect("/auth/otp?email=" + email + "&authType=deletion");
}

export const createAccount = async (formData) => {
  try {
    const fullname = formData.get("fullname").toLowerCase();
    const email = formData.get("email").toLowerCase();
    const phoneNo = formData.get("phone_no").toLowerCase();
    const dob = formData.get("dob").toLowerCase();
    const gender = formData.get("gender").toLowerCase();
    const password = formData.get("password");

    if (!fullname || !email || !phoneNo || !password) {
      return {
        success: false,
        message: "All fields are required.",
      };
    }

    await dbConnect();
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return {
        success: false,
        message: "User already exist",
      };
    }

    const saltRounds = 16;
    const hashPassword = await hash(password, saltRounds);

    const otp = await Otp();
    console.log(otp);
    (await cookies()).set("auth.watawara.otp", await hash(String(otp), 10), {
      expires: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes expiry
    });
    (await cookies()).set("auth.watawara.email", email, {
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

    if (!newUser) {
      return {
        success: false,
        message: "Unable to create user account",
      };
    }

    // await Mailer(email, Mail, "Account Creation Successful");

    return {
      success: true,
      message: "Account creation successful, redirecting...",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const userOtp = async (formData) => {
  try {
    const otp = formData.get("otp");
    await dbConnect();

    if (!otp)
      return {
        success: false,
        message: "Please provide the otp.",
      };

    const optObj = {
      otp: (await cookies()).get("auth.watawara.obj")?.value,
      email: (await cookies()).get("auth.watawara.email")?.value,
    };
    // Check if user already exists
    const user = await User.findOne({ email: optObj.email });

    if (user.status === "active")
      return {
        success: false,
        message: "active",
      };
    const isMatch = await compare(String(otp), optObj?.hashOtp);

    if (!isMatch)
      return {
        success: false,
        message: "Invalid OTP code provided.",
      };

    const result = await User.updateOne(
      { email: optObj.email },

      { status: "active", otp: null }
    );

    if (result)
      return {
        success: true,
        message: "User account activated",
      };

    return {
      success: false,
      message: "Unable to activate user account.",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

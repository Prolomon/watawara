"use server";
import { dbConnect } from "../server/server";
import { User } from "../models/user.schema";
import { hash } from "bcryptjs";
import { redirect } from "next/navigation";

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


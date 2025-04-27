"use client";
import { signIn } from "next-auth/react";

export async function login(formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const result = await signIn("credentials", {
    redirect: false, // Prevent automatic redirection
    callbackUrl: "/", // Redirect to the main page after login
    email,
    password,
  });

  if (result.ok) {
    window.location.href = result.url || "/";
  } else {
    throw new Error(result.error || "Login failed");
  }
}

export const googleLogAuth = async () => {
  const result = await signIn("google", {
    redirect: false,
    callbackUrl: "/",
  });

  if (result.ok) {
    window.location.href = result.url || "/";
  } else {
    throw new Error(result.error || "Google login failed");
  }
};

export const facebookLogAuth = async () => {
  const result = await signIn("facebook", {
    redirect: false,
    callbackUrl: "/",
  });

  if (result.ok) {
    window.location.href = result.url || "/";
  } else {
    throw new Error(result.error || "Facebook login failed");
  }
};
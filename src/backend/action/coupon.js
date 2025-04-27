"use server";
import { cookies } from "next/headers";

export const coupon = async (code) => {
  if (!code) {
    return;
  }
  await cookies().set("watawara_cookie", code);
};

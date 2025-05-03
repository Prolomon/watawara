"use server";

import { headers } from "next/headers";

export async function getIpAddress() {
  try {
    const headersList = headers();
    let clientIp = headersList.has("x-forwarded-for")
      ? headersList.get("x-forwarded-for")
      : headersList.has("x-real-ip")
        ? headersList.get("x-real-ip")
        : null;

    if (clientIp?.includes(",")) {
      clientIp = clientIp.split(",")[0].trim();
    }

    if (!clientIp) {
      console.warn(
        "getClientIpAddress: Could not determine client IP from standard headers."
      );
      return null;
    }

    return clientIp;
  } catch (error) {
    console.error("getClientIpAddress: Error retrieving headers:", error);
    return null;
  }
}

import { jwtVerify } from "jose";
import { cookies } from "next/headers";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function authCookie() {
  try {
    const token = (await cookies()).get("auth.watawara.session")?.value;
    if (!token) return null;

    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    console.error("Auth Error:", error);
    return null;
  }
}

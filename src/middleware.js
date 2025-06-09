import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
export default async function middleware(req) {
  const token = req.cookies?.get("auth.watawara.session")?.value;

  if (!token && req.nextUrl.pathname !== "/") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Validate JWT token
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);
  } catch (error) {
    // If token is invalid, redirect to login
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};

// import { NextResponse } from "next/server";
// import { jwtVerify } from "jose";
// export default async function middleware(req) {
//   const token = req.cookies?.get("auth.watawara.session")?.value;

//   // Validate JWT token
//   try {
//     const secret = new TextEncoder().encode(process.env.JWT_SECRET);
//     await jwtVerify(token, secret);
//   } catch (error) {
//     return NextResponse.redirect(new URL("/?error=" + error.message, req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/account/:path*",
//     "/cart/:path*",
//     "/checkout/:path*",
//     "/orders/:path*",
//     "/profile/:path*",
//     "/dashboard/:path*",
//     "/seller/:path*"
//   ],
// };

export { auth as middleware } from "./auth.js";
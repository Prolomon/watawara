import { NextResponse } from "next/server";
import { dbConnect } from "@/backend/server/server";
import { User } from "@/backend/models/user.schema";
import { auth } from "../../../../auth";

export const GET = async () => {
  const session = await auth();

  try {
    await dbConnect();

    const user = await User.findOne({ email: session.user.email });
    const cart = user.cart;
    return new NextResponse(JSON.stringify(cart), { status: 200 });
  } catch (e) {
    return new NextResponse("Error in fetching users ", e.message, {
      status: 500,
    });
  }
};

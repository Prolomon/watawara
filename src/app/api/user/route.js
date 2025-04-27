import { NextResponse } from "next/server";
import { dbConnect } from "@/backend/server/server";
import { User } from "@/backend/models/user.schema";
import { auth } from "../../../../auth";

export const GET = async () => {
  try {
    await dbConnect();
    const session = await auth();

    const user = await User.findOne({ email: session.user.email }).sort({
      createdAt: -1,
    });
    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (e) {
    return new NextResponse("Error in fetching users ", e.message, {
      status: 500,
    });
  }
};

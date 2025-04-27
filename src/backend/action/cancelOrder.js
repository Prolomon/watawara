"use server";
import { dbConnect } from "@/backend/server/server";
import { auth } from "../../../auth";
import { User } from "../models/user.schema";
import { redirect } from "next/navigation";

export const cancelOrder = async (orderId) => {
    const session = await auth();
    const userId = session?.user?._id;

    await dbConnect();

    // Update the specific order's status
    const result = await User.updateOne(
      {
        _id: userId,
        "orders.orderId": orderId,
      },
      {
        $set: { "orders.$.status": "cancelled" },
      }
    );

    if (result.modifiedCount === 0) {
      throw new Error("Failed to cancel order or order not found");
    }

    // Redirect to orders page with success state
    redirect(`/cart/orders`);
};

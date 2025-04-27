"use server";
import { dbConnect } from "@/backend/server/server";
import { auth } from "../../../auth";
import { User } from "@/backend/models/user.schema";
import { Products } from "../models/products.schema";
import { redirect } from "next/navigation";

export const wishlist
 = async (id) => {
  // Get form data
  const session = await auth();
  const userId = session?.user?._id;
  const productId = id;

  await dbConnect();

  const user = await User.findOne({ _id: userId });

  if (!session || !user) {
    redirect("/auth/login");
  }

  const isChecked = user.wishlist.find((_s) => _s.productId === productId);

  if (isChecked) {
    redirect(
      `/cart/wishlist?message=wished`
    );
  }

  // Corrected update operation
  await User.updateOne(
    { _id: userId },
    {
      $push: {
        wishlist: { productId },
      },
    },
    { new: true } // Return the updated document (optional)
  );

  redirect(
    `${process.env.NEXT_PUBLIC_WATAWARA_BASE_URL}/cart/wishlist?message=wish`
  );
};

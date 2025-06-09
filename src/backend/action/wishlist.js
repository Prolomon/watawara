"use server";
import { dbConnect } from "@/backend/server/server";
import { auth } from "../../../auth";
import { User } from "@/backend/models/user.schema";
import { redirect } from "next/navigation";

export const wishlist = async (id) => {
  // Get form data
  const session = await auth();
  const userId = session?.user?.id;
  const productId = id;

  await dbConnect();

  const user = await User.findOne({ _id: userId });

  if (!session || !user) {
    redirect("/auth/login");
  }

  const isChecked = user.wishlist.find((_s) => _s.productId === productId);

  if (isChecked) {
    redirect(`/cart/wishlist?message=wished`);
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

export const removeWishlist = async (id) => {
  // Get form data
  const session = await auth();
  const email = session?.user?.email;
  const productId = id;

  await dbConnect();

  const user = await User.findOne({ email });

  if (!session ||!user) {
    redirect("/auth/login");
  }
  await User.updateOne(
    { email },
    {
      $pull: {
        wishlist: { productId },
      }
    }
  )
}

"use server";
import { dbConnect } from "@/backend/server/server";
import { auth } from "../../../auth";
import { User } from "../models/user.schema";
import { redirect } from "next/navigation";

export const add2Cart = async (quantity, productId, color, size) => {
  const session = await auth();
  const email = session?.user?.email;
  await dbConnect();

  const user = await User.findOne({email});
  const isProductInCart = user.cart.some(
    (item) => item.productId === productId
  );

  if (isProductInCart) return null;
  await User.updateOne(
    { email },
    { $push: { cart: { productId, quantity, color, size } } },
    { new: true }
  );
};

export const add2CartBtn = async (id) => {
  const session = await auth();
  const email = session?.user?.email;
  if (!session) redirect("/auth/login")
  await dbConnect();

  const user = await User.findOne({email});

  const isProductInCart = user.cart.some(
    (item) => item.productId === id
  );

  if (isProductInCart) return null;

  await User.updateOne(
    { email },
    { $push: { cart: { productId: id } } },
    { new: true }
  );
};

export const delete4cart = async (id) => {
  const session = await auth();
  const email = session?.user?.email;

  if (!email) {
    redirect("/auth/login?callbackUrl=/cart");
  }

  await dbConnect();

  // Remove the product from the cart
  await User.updateOne(
    {email},
    {
      $pull: {
        cart: {
          productId: id, // Match productId in the cart
        },
      },
    },
    { new: true } // Return the updated document (optional)
  );
};

"use server";
import { redirect } from "next/navigation";
import { dbConnect } from "@/backend/server/server";
import { auth } from "../../../auth";
import { User } from "../models/user.schema";
import { nanoid } from "nanoid";
import { Products } from "../models/products.schema";

export const checkRedirect = async (subTotal, tax, shipping, total) => {
  const session = await auth();
  const userId = session?.user?._id;

  if (!session || !userId) {
    redirect("/auth/login");
  }

  await dbConnect();
  const user = await User.findOne({ _id: userId });

  if (!user) {
    redirect("/auth/login");
  }

  // Get existing checkout products if they exist
  const existingProducts = user.checkout?.products || [];

  if (existingProducts.subTotal === subTotal) {
    return;
  }


  // Update operation - preserves existing products
 await User.updateOne(
   { _id: userId },
   {
     $set: {
       checkout: {
         userId: session.user._id,
         payment: false,
         delivery: "delivery",
         subTotal: subTotal,
         tax,
         date: new Date().toString(),
         shipping: shipping,
         total,
         status: "active",
         products: existingProducts, // Include products directly
       },
     },
   }
 );

  redirect("/checkout");
};

export const add2Checkout = async (productId, quantity, color, size, price) => {
  // Get form data
  // const productId 
  const session = await auth();
  const userId = session?.user?._id;

  await dbConnect();
  const user = await User.findOne({ _id: userId });

  if (!user || !session || !userId) {
    redirect("/auth/login");
  }

  // Corrected update operation
  await User.findByIdAndUpdate(
    userId,
    {
      $push: {
        "checkout.products": { productId, quantity, color, size },
      },
      $pull: {
        cart: { productId: productId },
      },
    },
    { new: true }
  );
};

export const checkoutNow = async (quantity, id, color, size) => {
  const session = await auth();
  const userId = session?.user?._id;

  await dbConnect();
  const user = await User.findOne({ _id: userId });
  const product = await Products.findOne({id})
  const storeId = product.storeId

  if (!user || !session || !userId) {
    redirect("/auth/login");
  }

  const isChecked = user.orders.find((_s) => _s.productId === id);

  if (isChecked) {
    return;
  }
  const orderId = nanoid();
  const newOrder = {
    productId: id,
    storeId,
    quantity,
    color,
    orderId,
    size,
    delivery: "delivery",
    date: new Date(),
    status: "processing",
    timeline: {
      orderPlaced: true,
      paymentConfirmed: false,
      orderProcessing: false,
      orderShipped: false,
      ready: false,
    },
  };

  // Corrected update operation
  await User.updateOne(
    { _id: userId },
    {
      $push: { orders: newOrder },
    },
    { new: true } // Return the updated document (optional)
  );

  redirect(`/cart/orders/${orderId}`);
};

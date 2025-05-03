"use server";
import { redirect } from "next/navigation";
import { dbConnect } from "@/backend/server/server";
import { auth } from "../../../auth";
import { User } from "../models/user.schema";
import { nanoid } from "nanoid";
import { Products } from "../models/products.schema";
import { Orders } from "../models/order.schema";
import { Mailer } from "../mailer";

export const checkRedirect = async (subTotal, tax, shipping, total) => {
  const session = await auth();
  const userId = session?.user?._id;

  if (!session || !userId) redirect("/auth/login")
  await dbConnect();
  const user = await User.findOne({ _id: userId });
  if (!user) redirect("/auth/login");

  
  const existingProducts = user.checkout?.products || [];

  if (existingProducts.subTotal === subTotal) return;
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
         products: existingProducts
       },
     },
   }
 );

  redirect("/checkout");
};

export const add2Checkout = async (productId, quantity, color, size) => {
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
        "checkout.products": { productId, quantity, color, size }
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
  const email = session?.user?.email;

  await dbConnect();
  const user = await User.findOne({ email });
  const product = await Products.findOne({id})
  const storeId = product.storeId

  if (!user || !session || !email) {
    redirect("/auth/login");
  }
  const orderId = nanoid();
  const newOrder = {
    userId: session?.user?._id,
    orderId,
    size,
    subTotal: product.price * quantity,
    tax: (product.price * quantity * 0.075).toFixed(2),
    shipping: 0,
    total: (product.price * quantity + product.price * quantity * 0.075).toFixed(2),
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
    products: [
      {
        productId: id,
        storeId,
        quantity,
        color,
        size,
      },
    ],
  };

  // Corrected update operation
  await Orders.create(newOrder);
  await Mailer(email, newOrder.orderId, "order");

  redirect(`/cart/orders/${orderId}`);
};

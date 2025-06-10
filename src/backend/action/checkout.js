"use server";
import { redirect } from "next/navigation";
import { dbConnect } from "@/backend/server/server";
import { User } from "../models/user.schema";
import { nanoid } from "nanoid";
import { Products } from "../models/products.schema";
import { Orders } from "../models/order.schema";
import { authCookie } from "../authCookie";

export const checkRedirect = async (subTotal, tax, shipping, total) => {
  const session = await authCookie();
  const userId = session?.id;

  if (!session || !userId) redirect("/auth/login")
  await dbConnect();
  const user = await User.findOne({ email: session?.email });
  if (!user) redirect("/auth/login");

  
  const existingProducts = user.checkout?.products || [];

  if (existingProducts.subTotal === subTotal) return;
  // Update operation - preserves existing products
 await User.updateOne(
   { id: userId },
   {
     $set: {
       checkout: {
         userId: session?.id.toString(),
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

  const session = await authCookie();
  const email = session?.email;

  await dbConnect();
  const user = await User.findOne({ email: email });

  if (!user || !session || !email) {
    redirect("/auth/login");
  }

  // Corrected update operation
  await User.updateOne(
    {email},
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
  return {
    success: true,
    message: "Product added to checkout",
  };
};

export const checkoutNow = async (quantity, id, color, size) => {
  const session = await authCookie();
  const email = session?.email;

  await dbConnect();
  const user = await User.findOne({ email });
  const product = await Products.findOne({id})
  const storeId = product.storeId

  if (!user || !session || !email) {
    redirect("/auth/login");
  }
  const orderId = nanoid();
  const newOrder = {
    userId: session?.id.toString(),
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
  // await Mailer(email, newOrder.orderId, "order");

  redirect(`/cart/orders/${orderId}`);
};

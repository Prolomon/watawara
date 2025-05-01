"use server";
import { dbConnect } from "@/backend/server/server";
import { auth } from "../../../auth";
import { Orders } from "../models/order.schema";
import { redirect } from "next/navigation";
import { User } from "../models/user.schema";
// import { generateOrderId } from "../generateOrderId";
import { Products } from "../models/products.schema";
import { cookies } from "next/headers";
import { nanoid } from "nanoid";

export const cancelOrder = async (orderId) => {
  const session = await auth();
  const userId = session?.user?._id;

  await dbConnect();

  // Update the specific order's status
  const result = await Orders.updateOne(
    {
      userId,
      orderId,
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

export const orderAction = async () => {
  const session = await auth();
  const userId = session?.user?._id;
  const stored = (await cookies()).get("wata_delivery")?.value || 0;
  const delivery = (await cookies()).get("wata_delivery_type")?.value || 0;

  if (!session || !userId) {
    redirect("/auth/login");
  }

  await dbConnect();
  const user = await User.findOne({ _id: userId });

  if (!user) {
    redirect("/auth/login");
  }

  const products = await Products.find({});

  // Extract product IDs from the user's checkout
  const checkoutProductIds =
    user?.checkout?.products?.map((item) => item.productId) || [];

  // Filter products based on the checkout product IDs
  const checkoutProducts = products.filter((product) =>
    checkoutProductIds.includes(product.id)
  );

  //for loop the products and its information's
  const checkoutProductDetails = checkoutProducts.map((product) => {
    const checkoutProduct = user.checkout.products.find(
      (item) => item.productId === product.id
    );
    return {
      ...product.toObject(),
      quantity: checkoutProduct?.quantity || 1,
      color: checkoutProduct?.color || null,
      size: checkoutProduct?.size || null,
    };
  });

  const subTotal = checkoutProducts.reduce(
    (acc, product) =>
      acc + Number(product.price) * Number(product.quantity || 1),
    0
  );

  const tax = (subTotal * 0.075).toFixed(2); // Assuming a tax rate of 7.5%
  const shipping = 0; // Assuming free shipping for now

  const total = subTotal + Number(tax) + shipping + Number(stored.value);

  const orderId = nanoid();

  const productData = checkoutProductDetails.reduce(
    (acc, { id: productId, quantity, color, size, storeId }) => {
      acc.push({
        userId,
        productId,
        storeId,
        quantity,
        color,
        size,
        orderId,
        delivery,
        date: new Date(),
        status: "processing",
        timeline: {
          orderPlaced: true,
          paymentConfirmed: false,
          orderProcessing: false,
          orderShipped: false,
          ready: false,
        },
      });
      return acc;
    },
    []
  );

  if (user?.checkout?.products?.length > 0) {
    // Create multiple orders using insertMany
    await Orders.insertMany(productData);
    
    // Clear the user's checkout
    await User.findByIdAndUpdate(userId, { checkout: [] });
    
    redirect(`/cart/orders`);
  }
  redirect(`/`);
};



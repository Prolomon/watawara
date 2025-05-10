import Currency from "@/utilities/currency/Currency";
import Delivery from "./Delivery";
import { auth } from "../../../../../../auth";
import { User } from "@/backend/models/user.schema";
import { redirect } from "next/navigation";
import { Products } from "@/backend/models/products.schema";
import CheckList from "./CheckList";
import { cookies } from "next/headers";
import CheckButton from "./CheckButton";
import { dbConnect } from "@/backend/server/server";

export default async function Checkout() {
  await dbConnect()
  const session = await auth();
  const stored = (await cookies()).get("wata_delivery") || 0;
  const user = await User.findOne({ email: session?.user?.email})

  if (!user || !session) {
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

  const total = subTotal + Number(tax) + shipping;
  const express = 2500

  return (
    <>
      <h2 className="text-lg font-bold my-2 text-gray-800">
        Checkout Summary ({checkoutProductDetails.length})
      </h2>
      <ul className="grid gap-2">
        {checkoutProductDetails.length === 0
          ? null
          : checkoutProductDetails.map((_c) => (
              <CheckList key={_c.id} {..._c} />
            ))}
        <hr className="border-gray-600" />
        <li className="w-full flex justify-between">
          <span className="font-normal text-base text-gray-500">Subtotal</span>
          <span className="font-semibold text-base">{Currency(subTotal)}</span>
        </li>
        <li className="w-full flex justify-between">
          <span className="font-normal text-base text-gray-500">Shipping</span>
          <span className="font-semibold text-base">{Currency(shipping)}</span>
        </li>
        <li className="w-full flex justify-between">
          <span className="font-normal text-base text-gray-500">Tax</span>
          <span className="font-semibold text-base">{Currency(tax)}</span>
        </li>
        <Delivery express={express} />
        <hr className="border-gray-600" />
        <li className="w-full flex justify-between">
          <span className="font-normal text-base text-gray-500">Total</span>
          <span className="font-semibold text-base">{Currency(total)}</span>
        </li>
      </ul>
      <CheckButton />
    </>
  );
}

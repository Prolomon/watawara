import Currency from "@/utilities/currency/Currency";
import { dbConnect } from "@/backend/server/server";
import { auth } from "../../../../auth";
import { User } from "@/backend/models/user.schema";
import { redirect } from "next/dist/server/api-utils";
import { Products } from "@/backend/models/products.schema";
import CheckButton from "./CheckButton";

export default async function Checkout() {
  const session = await auth();
  await dbConnect();
  const email = session?.user?.email;

  const user = await User.findOne({ email });

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
  const coupon = 0

  return (
    <div className="w-full p-2 bg-white border border-gray-200 rounded-md">
      <h2 className="text-lg font-bold mb-3 text-black">Order Summary</h2>
      <ul className="grid gap-2">
        <li className="w-full flex justify-between">
          <span className="font-semibold text-base">Sub Total</span>
          <span className="font-semibold text-base">{Currency(subTotal)}</span>
        </li>
        <li className="w-full flex justify-between">
          <span className="font-semibold text-base">Tax</span>
          <span className="font-semibold text-base">{Currency(tax)}</span>
        </li>
        <li className="w-full flex justify-between">
          <span className="font-semibold text-base">Coupon</span>
          <span className="font-semibold text-base">{Currency(coupon)}</span>
        </li>
        <hr className="border-gray-800" />
        <li className="w-full flex justify-between">
          <span className="font-semibold text-base">Total</span>
          <span className="font-semibold text-base">{Currency(total)}</span>
        </li>
      </ul>
      <CheckButton subTotal={subTotal} tax={tax} shipping={shipping} total={total} length={checkoutProducts.length} />
    </div>
  );
}

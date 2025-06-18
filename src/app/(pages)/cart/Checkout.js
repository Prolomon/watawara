import Currency from "@/utilities/currency/Currency";
import { dbConnect } from "@/backend/server/server";
import { authCookie } from "@/backend/authCookie";
import { User } from "@/backend/models/user.schema";
import { Products } from "@/backend/models/products.schema";
import CheckButton from "./CheckButton";

export default async function Checkout() {
  const session = await authCookie();
  await dbConnect();
  const email = session?.email;

  const user = await User.findOne({ email });

  const products = await Products.find({});

  // Extract product IDs from the user's checkout
  const checkoutProductIds =
    user?.checkout?.products?.map((item) => item.productId) || [];

  // Filter products based on the checkout product IDs
  const checkoutProducts = products.filter((product) =>
    checkoutProductIds.includes(product.id)
  );

  // const checkoutProductDetails = checkoutProducts.map((product) => {
  //   const checkoutProduct = user.checkout.products.find(
  //     (item) => item.productId === product.id
  //   );
  //   return {
  //     ...product.toObject(),
  //     quantity: checkoutProduct?.quantity || 1,
  //     color: checkoutProduct?.color || null,
  //     size: checkoutProduct?.size || null,
  //   };
  // });

  const subTotal = checkoutProducts.reduce(
    (acc, product) =>
      acc + Number(product.price) * Number(product.quantity || 1),
    0
  );

  const tax = (subTotal * 0.075).toFixed(2); // Assuming a tax rate of 7.5%
  const shipping = 0; // Assuming free shipping for now

  const total = subTotal + Number(tax) + shipping;

  return (
    <div className="w-full z-100 sticky bottom-3 left-0">
      <CheckButton
      active={checkoutProductIds}
        subTotal={subTotal}
        tax={tax}
        shipping={shipping}
        total={total}
        length={checkoutProducts.length}
      />
    </div>
  );
}

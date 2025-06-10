"use server";
import Product from "@/components/product/Product";
import { dbConnect } from "@/backend/server/server";
import { User } from "@/backend/models/user.schema";
import { authCookie } from "@/backend/authCookie";

export default async function WishProduct() {
  const session = await authCookie();

  await dbConnect();

  const user = await User.findOne({ email: session?.email });

  const wishlist = user.wishlist;

  const products = await fetch(
    `${process.env.WATAWARA_BASE_URL}/api/products`
  );
  const product = await products.json();

  return (
    <div
      className={`w-full flex flex-wrap h-auto ${
        wishlist.length !== 0 ? null : "items-center justify-center h-36"
      }`}
    >
      {wishlist.length !== 0 ? (
        wishlist.map((_p) => {
          const ip = product.find((item) => item.id === _p.productId);
          return <Product key={ip.id} {...ip} />;
        })
      ) : (
        <h4 className="text-sm text-center text-gray-400">
          You have nothing in your wishlist
        </h4>
      )}
    </div>
  );
}

"use server";
import Link from "next/link";
import Account from "./Account";
import { WalletIcon } from "lucide-react";
import Cart from "./Cart";
import Language from "./Language";
import { authCookie } from "@/backend/authCookie";
import { User } from "@/backend/models/user.schema";
import { Orders } from "@/backend/models/order.schema";
import { dbConnect } from "@/backend/server/server";
import { Wallet } from "@/backend/models/wallet.schema";

export default async function Accessibility({ quantity }) {
  const session = await authCookie();
  await dbConnect();

  const user = await User.findOne({ email: session?.email });
  const orders = await Orders.find({ userId: user?.id });
  const wallet = await Wallet.findOne({ userId: session?.id });

  return (
    <div className="w-auto flex items-center gap-3 h-auto relative">
      {/* wallet */}
      {session ? (
        <>
          {/* shopping cart */}
          <Cart
            carts={user?.cart.length}
            orders={orders?.length}
            wishlists={user?.wishlist.length}
            checkout={user?.checkout.products.length}
          />
          {/* /wallet/${wallet.uniqueId ? wallet?.uniqueId : "sign-up"} */}
          <Link
            href={`#`}
            className="bg-gray-200 text-gray-800 hover:text-primary rounded-full p-2.5 shadow-sm"
          >
            <WalletIcon size={17} />
          </Link>
        </>
      ) : null}
      {/* language */}
      <Language />
      {/* customer account */}
      <Account avatar={user?.avatar} fullname={user?.fullname} />
    </div>
  );
}

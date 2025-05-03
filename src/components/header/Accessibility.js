"use server";
import Link from "next/link";
import Account from "./Account";
import { Wallet } from "lucide-react";
import Cart from "./Cart";
import Language from "./Language";
import { auth } from "../../../auth";
import { User } from "@/backend/models/user.schema";
import { Orders } from "@/backend/models/order.schema";

export default async function Accessibility({ quantity }) {
  const session = await auth();

  const user = await User.findOne({ email: session?.user?.email });
  const orders = await Orders.find({ userId: user?._id });

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
          />
          <Link
            href="/wallet"
            className="bg-gray-200 text-gray-800 hover:text-primary rounded-full p-2.5 shadow-sm"
          >
            <Wallet size={17} />
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

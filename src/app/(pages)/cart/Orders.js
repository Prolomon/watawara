import OrderCard from "./OrderCard";
import { Box } from "lucide-react";
import Link from "next/link";
import { authCookie } from "@/backend/authCookie";
import { dbConnect } from "@/backend/server/server";
import { User } from "@/backend/models/user.schema";
import Popover from "./Popover";

export default async function Orders({ search }) {
  await dbConnect();
  const session = await authCookie();

  const user = await User.findOne({ email: session?.email });

  const order = user?.cart;

  return (
    <>
      <ul
        className={`w-full relative}`}
      >
        {search.delete && <Popover message={`Product Deleted from Cart`} />}
        {search.checkout && <Popover message={`Product Added to Checkout`} />}
        {order?.length ? (
          <>
            {order.map((_o) => (
              <OrderCard
                key={_o?.productId}
                color={"red"}
                size={34}
                quantity={_o?.quantity}
                productId={_o?.productId}
              />
            ))}
          </>
        ) : (
          <div className="h-64 text-base text-gray-500 grid place-content-center text-center">
            <Box size={50} className="text-center mx-auto" />
            You have nothing in your cart.{" "}
            <Link href={`/`} className="font-semibold  underline">
              Click to add items to your cart.
            </Link>
          </div>
        )}
      </ul>
    </>
  );
}

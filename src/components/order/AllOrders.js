import OrderCard from "./OrderCard"
import { Box } from "lucide-react"
import Link from "next/link"
import { auth } from "../../../auth";
import { dbConnect } from "@/backend/server/server";
import { User } from "@/backend/models/user.schema"
import { Orders } from "@/backend/models/order.schema"
import { ChevronsUpDown } from "lucide-react";

export default async function AllOrders () {
    await dbConnect()
    const session = await auth()
    const user = await User.findOne({ email: session?.user?.email })
    const order = await Orders.find({userId: user._id})
    return (
      <ul className={`w-3/5 max-md:w-full ${order ? null : "w-full"}`}>
        {order.length !== 0 ? (
          <>
            {order.map((_o, index) => (
              <details
                key={index}
                className="w-full list-none rounded-md border border-gray-300 shadow-sm p-4 mb-1.5"
              >
                <summary className="list-none font-semibold flex w-full justify-between text-base items-center text-gray-700">
                  <h3 className="inline-block text-sm rounded-full uppercase text-gray-600 font-semibold">
                    Order ID: {_o.orderId}
                  </h3>
                  <h3
                    className={`inline-block text-sm capitalize rounded-sm px-1.5 ${
                      _o.status === "processing"
                        ? "text-amber-400 bg-amber-100"
                        : _o.status === "returned"
                          ? "text-red-600 bg-red-100"
                          : _o.status === "cancelled"
                            ? "text-gray-500 bg-gray-200"
                            : "text-green-600 bg-green-100"
                    } font-semibold`}
                  >
                    {_o.status}
                  </h3>
                </summary>
                <div className="w-full mt-4 text-gray-600 font-normal text-sm">
                  {_o.products.map((o, index) => (
                    <OrderCard
                      key={index}
                      orderId={_o.orderId}
                      productId={o.productId}
                      date={_o.date}
                      quantity={o.quantity}
                      delivery={_o.delivery}
                    />
                  ))}
                </div>
              </details>
            ))}
          </>
        ) : (
          <div className="h-64 text-base text-gray-500 grid place-content-center text-center">
            <Box size={50} className="text-center mx-auto" />
            You do not have any order. Click here to place an order.{" "}
            <Link href={`/`} className="font-semibold  text-primary">
              Order now
            </Link>
          </div>
        )}
      </ul>
    );
}
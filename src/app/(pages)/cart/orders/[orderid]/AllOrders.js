import OrderCard from "./OrderCard"
import { Box } from "lucide-react"
import Link from "next/link"

export default async function AllOrders({ products, status, delivery, date }) {
  return (
    <ul
      className={`w-full my-4 ${!products || products.length !== 0 ? null : "w-full"}`}
    >
      {products.length !== 0 || !products ? (
        <>
          {products.map((_o) => (
            <OrderCard
              key={_o._id}
              orderId={_o.orderId}
              productId={_o.productId}
              date={date}
              quantity={_o.quantity}
              status={status}
              delivery={delivery}
            />
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
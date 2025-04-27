import OrderCard from "./OrderCard"
import { Box } from "lucide-react"
import Link from "next/link"
import { auth } from "../../../auth";
import { dbConnect } from "@/backend/server/server";
import { User } from "@/backend/models/user.schema";

export default async function Orders () {
    await dbConnect()
    const session = await auth()
    const user = await User.findOne({_id: session.user._id})

    const order = user.orders
    
    return (
        <ul className={`w-3/5 max-md:w-full ${order ? null : "w-full"}`}>
            {order.length !== 0 ? <>
            {order.map(_o => (
               <OrderCard key={_o._id} orderId={_o.orderId} productId={_o.productId} date={_o.date} quantity={_o.quantity} status={_o.status} delivery={_o.delivery} /> 
            ))}
            </> : <div className="h-64 text-base text-gray-500 grid place-content-center text-center">
                <Box size={50} className="text-center mx-auto" />
                You do not have any order. Click here to place an order. <Link href={`/`} className="font-semibold  text-primary">Order now</Link>
            </div> }
        </ul>
    )
}
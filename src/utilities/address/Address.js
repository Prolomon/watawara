import Link from "next/link"
import { auth } from "../../../auth"
import { dbConnect } from "@/backend/server/server"
import { User } from "@/backend/models/user.schema"

export default async function Address () {

    await dbConnect()
    const session = await auth()
    const user = await User.findOne({_id: session.user._id})

    return (
      <div className="w-full p-3 bg-white border border-gray-200 rounded-md">
        <div className="flex items-center justify-between mb-1">
          <h2 className="font-bold text-lg text-black">Shipping Address</h2>
          <Link href="/address" className="text-base text-gray-500 underline">
            Update Address
          </Link>
        </div>
        <ul className="text-base capitalize text-black">
          <li className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900">Street Address:</h3>
            <p className="text-base text-gray-700">{user.address.address}</p>
          </li>
          <li className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900">Landmark:</h3>
            <p className="text-base text-gray-700">{user.address.landmark}</p>
          </li>
          <li className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900">City:</h3>
            <p className="text-base text-gray-700">{user.address.city}</p>
          </li>
          <li className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900">State:</h3>
            <p className="text-base text-gray-700">{user.address.state}</p>
          </li>
          <li className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900">Country:</h3>
            <p className="text-base text-gray-700">{user.address.country}</p>
          </li>
          <li className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900">Phone Number:</h3>
            <p className="text-base text-gray-700">{user.phoneNo}</p>
          </li>
          <li className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900">Postal Code:</h3>
            <p className="text-base text-gray-700">{user.address.postalCode}</p>
          </li>
        </ul>
        {/*name, mobile-no, email, address, city, state, country*/}
      </div>
    );
}
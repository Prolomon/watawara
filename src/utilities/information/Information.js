import Link from "next/link"
import { auth } from "../../../auth"
import { dbConnect } from "@/backend/server/server"
import { User } from "@/backend/models/user.schema"

export default async function Information () {

    await dbConnect()
    const session = await auth()
    const user = await User.findOne({ email: session?.user?.email})

    return (
      <div className="w-full p-3 bg-white border border-gray-200 rounded-md">
        <div className="flex items-center justify-between mb-1">
          <h2 className="font-bold text-lg text-black">General Information</h2>
          <Link
            href={`/account/${user.fullname
              .toLowerCase()
              .slice(0, session?.user.fullname.indexOf(" "))}`}
            className="text-base text-gray-500 underline"
          >
            View Profile
          </Link>
        </div>
        <ul className="text-sm capitalize text-black">
          <li className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900">Name:</h3>
            <p className="text-gray-800">{user.fullname}</p>
          </li>
          <li className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900">Mobile Number:</h3>
            <p className="text-gray-800">{user.phoneNo}</p>
          </li>
          <li className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900">Email:</h3>
            <p className="text-gray-800">{user.email}</p>
          </li>
        </ul>
      </div>
    );
}
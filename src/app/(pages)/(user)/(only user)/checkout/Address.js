"use server";
import Link from "next/link";
import { authCookie } from "@/backend/authCookie";
import { User } from "@/backend/models/user.schema";
import { dbConnect } from "@/backend/server/server";

export default async function Address() {
  await dbConnect()
  const session = await authCookie();
  const u = await User.find({});

  const user = await User.findOne({ email: session?.email });

  const address = user?.address;

  return (
    <div className="w-full p-3 bg-white border border-gray-200 rounded-md">
      <div className="flex items-center justify-between mb-1">
        <h2 className="font-bold text-base text-black">Shipping Address</h2>
        <Link href="/address" className="text-sm text-gray-500 underline">
          Update Address
        </Link>
      </div>
      {!address.address ? (
        <p className="w-full text-center grid place-content-center h-64 text-sm text-gray-600">
          You have not set up a shipping address
        </p>
      ) : (
        <ul className="text-base capitalize text-black">
          <li className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-base text-gray-700">
              Street Address:
            </h3>
            <p className="text-gray-600 text-sm">{address.address}</p>
          </li>
          <li className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-base text-gray-700">Landmark:</h3>
            <p className="text-gray-600 text-sm">{address.landmark}</p>
          </li>
          <li className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-base text-gray-700">City:</h3>
            <p className="text-gray-600 text-sm">{address.city}</p>
          </li>
          <li className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-base text-gray-700">State:</h3>
            <p className="text-gray-600 text-sm">{address.state}</p>
          </li>
          <li className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-base text-gray-700">Country:</h3>
            <p className="text-gray-600 text-sm">{address.country}</p>
          </li>
          <li className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-base text-gray-700">
              Postal Code:
            </h3>
            <p className="text-gray-600 text-sm">{address.postal}</p>
          </li>
        </ul>
      )}
      {/*name, mobile-no, email, address, city, state, country*/}
    </div>
  );
}

"use server";
import Image from "next/image";
import { User } from "@/backend/models/user.schema";
import { auth } from "../../../../../../../auth";
import { dbConnect } from "@/backend/server/server";
import { Orders } from "@/backend/models/order.schema";

export default async function Profile() {
  await dbConnect();
  const session = await auth();
  const orders = await Orders.find({ userId: String(session?.user?.id) });

  const user = await User.findOne({ email: session?.user?.email });

  return (
    <form className="">
      <h3 className="text-lg font-semibold text-gray-700 text-left">
        My Profile
      </h3>
      <div className="w-full my-3 h-32 rounded-md relative overflow-hidden">
        <Image
          src={`/images/userBg.avif`}
          alt="background image"
          className="aspect-video w-full h-full"
          width={100}
          height={100}
        />
        <div className="w-full h-full p-4 flex gap-3 absolute top-0 left-0 bg-black bg-opacity-30 items-end">
          <div className="relative w-auto max-md:w-16 max-md:h-16 h-full aspect-square">
            <Image
              alt={user.fullname}
              width={100}
              height={100}
              priority
              src={user.avatar ? user.avatar : "/images/avatar.jpg"}
              className="w-auto h-full rounded-full"
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white capitalize">
              {user.fullname}
            </h2>
            <ul className="w-64 max-md:w-full flex">
              <li className="w-full flex flex-col place-content-center text-center border-r border-gray-300">
                <h2 className="text-sm text-gray-200">
                  {user.followed.length}
                </h2>
                <h6 className="text-[12px] text-gray-300 font-semibold">
                  Following
                </h6>
              </li>
              <li className="w-full flex flex-col place-content-center text-center border-r border-gray-300">
                <h2 className="text-sm text-gray-200">{user.reviews.length}</h2>
                <h6 className="text-[12px] text-gray-300 font-semibold">
                  Reviews
                </h6>
              </li>
              <li className="w-full flex flex-col place-content-center text-center">
                <h2 className="text-sm text-gray-200">{orders.length}</h2>
                <h6 className="text-[12px] text-gray-300 font-semibold">
                  Orders
                </h6>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-md font-semibold">Wallets Information</h3>
        {/* <div className="grid gap-x-3 grid-cols-2 max-md:grid-cols-1 mt-2">
                    <Input type={`email`} title="email" name="email" defaultValue={user.email} />
                    <Input type={`text`} title="phone no" name="phoneNo" defaultValue={user.phoneNo} />
                    <Input type={`text`} title="Date of Birth" name="dob" defaultValue={new Date(user.dob).toDateString()} />
                    <Input type={`text`} title="Gender" name="gender" defaultValue={user.gender} />
                </div> */}
      </div>
    </form>
  );
}

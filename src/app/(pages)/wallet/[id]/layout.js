import { dbConnect } from "@/backend/server/server";
import Sidebar from "./Sidebar";
import { auth } from "../../../../../auth";
import { Wallet } from "@/backend/models/wallet.schema";
import { redirect } from "next/navigation";
import { User } from "@/backend/models/user.schema";

export default async function RootLayout({ children }) {
  const session = await auth();
  await dbConnect();
  const wallet = await Wallet.findOne({ userId: session.user.id });
  const user = await User.findOne({ email: session?.user?.email })
  if (!wallet) redirect("/identity/verify-self")
  
  return (
    <div className="w-10/12 max-md:w-11/12 mx-auto flex gap-2">
      <Sidebar unique={wallet.uniqueId} />
      <div className="w-9/12 max-md:w-full">{children}</div>
    </div>
  );
}

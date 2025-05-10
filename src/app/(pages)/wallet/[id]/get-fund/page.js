import Back from "@/utilities/back/Back";
import ShareUserId from "./ShareUserId";
import { dbConnect } from "@/backend/server/server";
import { auth } from "../../../../../../auth";
import { Wallet } from "@/backend/models/wallet.schema";
import BankFund from "./BankFund";
import { User } from "@/backend/models/user.schema";
import PayWithCard from "./PayWithCard";

export const metadata = {
  title: `Watawara | Wallet - Fund Wallet`,
  description: `Jump in to an amazing world of sales and marketing.`,
};

export default async function Home({ params }) {
  await dbConnect()
  const session = await auth()

  const wallet = await Wallet.findOne({ userId: session?.user?.id })
  const user = await User.findOne({ email: session?.user?.email })

  return (
    <section className="w-full h-full relative object-fit overflow-hidden py-4 block">
      <div className="flex items-center justify-center relative mb-3">
        <Back />
        <h1 className="text-base font-semibold text-gray-800 text-center">
          Fund Wallet
        </h1>
      </div>
      <ShareUserId unique={wallet.uniqueId} />
      <BankFund accountNo={wallet.accountNo} bankName={wallet.bankName} fullname={user.fullname} />
      <PayWithCard />
    </section>
  );
}

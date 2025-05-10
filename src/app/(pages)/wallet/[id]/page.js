import BalanceCard from "./BalanceCard";
import Pay from "./Pay";
import History from "./History";
import { auth } from "../../../../../auth";
import { Wallet } from "@/backend/models/wallet.schema";
import { dbConnect } from "@/backend/server/server";
import Currency from "@/utilities/currency/Currency";

export const metadata = {
  title: `Watawara | Wallet - History`,
  description: `Jump in to an amazing world of sales and marketing.`,
};

export default async function Home({ params }) {
  await dbConnect();
  const session = await auth();

  const wallet = await Wallet.findOne({ userId: session.user.id });
  return (
    <section className="w-full h-full relative object-fit overflow-hidden py-4">
      <BalanceCard
        balance={Currency(Number(wallet.balance))}
        point={String(wallet.points)}
        unique={wallet.uniqueId}
      />
      <div className="hidden max-md:block">
        <br />
        <Pay unique={wallet.uniqueId} />
      </div>
      <br />
      <History />
    </section>
  );
}

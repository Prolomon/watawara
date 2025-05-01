import BalanceCard from "./BalanceCard"
import Pay from "./Pay"
import History from "./History"

export const metadata = {
  title: `Jumora | Wallet - History`,
  description: `Jump in to an amazing world of sales and marketing.`,
}

export default function Home({params}) {
  return (
    <section className="w-full h-full relative object-fit overflow-hidden py-4">
      <BalanceCard />
      <br />
      <Pay />
      <br />
      <History />
    </section>
  );
}

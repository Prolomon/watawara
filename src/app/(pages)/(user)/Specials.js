import Limited from "@/components/limited/Limited";
import { CalendarClock } from "lucide-react";
import {dbConnect} from "@/backend/server/server";
import { Products } from "@/backend/models/products.schema";

export default async function Specials() {
  await dbConnect();
  const products = await Products.find({}).lean(); // Use lean() for better performance

  return (
    <Limited
      icon={<CalendarClock size={22} />}
      title="limited offer"
      path="/category/limited"
      option="70% off"
      products={products}
    />
  );
}

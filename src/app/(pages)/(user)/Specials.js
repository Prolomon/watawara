import Limited from "@/components/limited/Limited";
import { CalendarClock } from "lucide-react";
import {dbConnect} from "@/backend/server/server";
import { Products } from "@/backend/models/products.schema";

export default async function Specials() {
  await dbConnect();
  const productsData = await Products.aggregate([
    { $sample: { size: 10 } },
    { $project: { __v: 0, _id: 0 } } // Keep your projection
  ]);

  // Convert the potentially complex Mongoose aggregation result to plain objects
  const plainProducts = JSON.parse(JSON.stringify(productsData));

  return (
    <Limited
      icon={<CalendarClock size={22} />}
      title="limited offer"
      path="/category/limited"
      option="70% off"
      products={plainProducts} // Pass the plain objects
    />
  );
}

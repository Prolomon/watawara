import Image from "next/image";
import Link from "next/link";
import { Square } from "lucide-react";
import Currency from "@/utilities/currency/Currency";
import { dbConnect } from "@/backend/server/server";
import { Products } from "@/backend/models/products.schema";

export default async function OrderCard({
  orderId,
  productId,
  date,
  quantity,
  delivery,
}) {
  await dbConnect();
  const product = await Products.findOne({ id: productId });

  return (
    <li className="w-full h-auto max-md:h-auto rounded-md relative mb-2.5">
      <Link href={`/cart/orders/${orderId}`}>
        {/* product name, quantity and brand */}
        <div className="flex gap-2 h-[7.5rem]">
          <Image
            className="aspect-square w-auto h-full border border-gray-300 rounded-md"
            alt="order id"
            width={100}
            height={100}
            src={product.images[0]}
          />
          <div className="w-full flex flex-col place-content-between">
            <div>
              <h2 className="text-sm font-semibold text-gray-600 line-clamp-1">
                {product.name}
              </h2>
              <div className="flex gap-3 justify-between py-1">
                <h3 className="text-sm text-primary font-semibold capitalize">
                  {product.brand}
                </h3>
                <div className="inline-flex gap-2 items-center">
                  <div className="border  max-sm:hidden rounded-md text-sm bg-gray-100 border-gray-400 px-2 py-1 text-gray-600 inline-flex gap-2 items-center">
                    {quantity} x {Currency(product.price)}
                  </div>
                  <h2 className="text-xl font-semibold text-gray-600">
                    {Currency(Number(product.price) * Number(quantity))}
                  </h2>
                </div>
              </div>
            </div>
            <div className="w-auto hidden text-sm text-gray-600 max-sm:block">
              {quantity} x {Currency(product.price)}
            </div>
            <div className="w-full flex items-center justify-start text-sm font-semibold text-gray-600 text-left gap-3 capitalize">
              <span>
                {new Date(date).toISOString().split("T")[0].replace(/\//g, "-")}
              </span>
              <Square size={13} className="text-gray-400 fill-gray-400" />
              <span>{delivery}</span>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}

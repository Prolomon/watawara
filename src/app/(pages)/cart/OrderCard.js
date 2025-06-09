import Image from "next/image";
import Link from "next/link";
import Currency from "@/utilities/currency/Currency";
import AddCheckout from "./AddCheckout";
import { dbConnect } from "@/backend/server/server";
import ActionButton from "./ActionButton";
import { Products } from "@/backend/models/products.schema";

export default async function OrderCard({ productId, quantity, color, size }) {
  try {
    await dbConnect();

    const product = await Products.findOne({id: productId}, { _id: 0 });

    return (
      <li className="w-full h-auto max-md:h-auto rounded-md border border-gray-200 relative mb-2.5">
        {/* product name, quantity and brand */}
        <div className="flex gap-2 p-3 h-[7.5rem] max-md:h-auto">
          <Link
            href={`/category/${product?.category?.replace(
              /\s+/g,
              "-"
            )}/product/${product?.name?.replace(/\s+/g, "-")}`}
          >
            <Image
              className="aspect-square w-auto h-full border border-gray-300 rounded-md"
              alt="order id"
              width={100}
              height={100}
              src={product?.images[0]}
            />
          </Link>
          <div className="w-full flex flex-col place-content-between">
            <div>
              <div className="flex justify-between items-start gap-3">
                <h2 className="text-sm font-semibold text-black line-clamp-2">
                  {product.name}
                </h2>
                <AddCheckout
                  productId={product.id}
                  quantity={quantity}
                  color={color}
                  size={size}
                  price={productId.price}
                  name={product.title}
                />
              </div>
              {/* section for brand and price */}
              <div className="flex gap-3 justify-between">
                <h3 className="text-sm text-primary font-semibold capitalize">
                  {product.brand}
                </h3>
                <h2 className="text-xl font-semibold text-black">
                  {Currency(product.price * JSON.parse(quantity))}
                </h2>
              </div>
              <h3 className="text-sm pb-1 text-gray-500 font-semibold capitalize">
                {product.current_stock} of {product.stock} in Stock
              </h3>
              {/* section for crud and quantity */}
              <div className="flex gap-3 justify-between items-center">
                <div className="inline-flex items-center gap-3">
                  <p className="text-base text-gray-500 max-md:hidden">
                    Quantity:
                  </p>
                  <input
                    type="text"
                    name="quantity"
                    className="text-center bg-transparent outline-none border-none w-6"
                    defaultValue={quantity}
                    disabled
                    readOnly
                  />
                </div>
                <ActionButton id={productId} />
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  } catch (error) {
    console.error("Error in Discover component:", error);
    return (
      <section className="w-11/12 mx-auto object-fit overflow-hidden mb-10">
        <p className="text-center text-red-500">
          Failed to load product. Please Refresh to continue.
        </p>
      </section>
    );
  }
}

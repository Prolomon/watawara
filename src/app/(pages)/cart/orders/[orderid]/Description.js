import Currency from "@/utilities/currency/Currency";
import Image from "next/image";
import { dbConnect } from "@/backend/server/server";

export default async function Description({ productId, quantity }) {
  try {
    await dbConnect();

    const allProducts = await fetch(
      `${process.env.WATAWARA_BASE_URL}/api/products`
    );

    if (!allProducts.ok) {
      throw new Error(`Failed to fetch products: ${allProducts.status}`);
    }
    const p = await allProducts.json();

    const product = p.find((_p) => _p.id === productId);

    return (
      <div className="w-full flex gap-3 max-md:flex-col mt-3">
        {/* product image */}
        <div className="w-4/12 max-md:w-full">
          <Image
            priority
            width={100}
            height={100}
            alt={`current image`}
            src={product.images[0]}
            className="w-full h-auto aspect-square border border-gray-200 rounded-md"
          />
        </div>
        {/* product description */}
        <div className="w-8/12 max-md:w-full">
          <h3 className="text-gray-600 text-base font-semibold capitalize">
            {product.name}
          </h3>
          <h1 className="font-semibold text-gray-800 text-2xl">
            {Currency(product.price)}
          </h1>
          <h3 className="text-gray-600 text-base font-semibold capitalize">
            Quantity: {quantity}
          </h3>
          <div>
            <span className="font-semibold text-sm">Description</span>
            <p className="text-base text-gray-600">{product.description}</p>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error in Discover component:", error);
    return (
      <section className="w-11/12 mx-auto object-fit overflow-hidden mb-10">
        <p className="text-center text-red-500">
          Network Error. Check your Internet Connection and refresh the page.
        </p>
      </section>
    );
  }
}

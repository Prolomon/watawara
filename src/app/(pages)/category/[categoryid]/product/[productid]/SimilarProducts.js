import Product from "@/components/product/Product";
import { dbConnect } from "@/backend/server/server";
import { Products } from "@/backend/models/products.schema";

export default async function SimilarProducts() {
  try {
    await dbConnect()

    const products = await Products.find({}).lean()

    return (
      <section className="mx-auto mt-4 object-fit overflow-hidden mb-10">
        <h1 className="font-bold text-xl capitalize text-gray-800 text-center mb-4 mt-1">
          Explore other Products
        </h1>
        <div className="w-full flex flex-wrap">
          {products.map((p) => (
            <Product
              key={p._id}
              images={p.images}
              name={p.name}
              price={p.price}
              reviews={p.reviews}
              brand={p.brand}
              category={p.category}
              id={p._id.toString()}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="mx-auto rounded-full text-gray-800 bg-primary hover:bg-secondary shadow-sm py-3 px-4 text-base mt-6"
          >
            See More amazing products
          </button>
        </div>
      </section>
    );
  } catch (error) {
    console.error("Error in Discover component:", error);
    return (
      <section className="w-11/12 mx-auto object-fit overflow-hidden mb-10">
        <h1 className="font-bold text-xl capitalize text-gray-800 text-center mb-6 mt-4">
          Discover Your Favorites
        </h1>
        <p className="text-center text-red-500">
          Failed to load products. Please try again later.
        </p>
      </section>
    );
  }
}

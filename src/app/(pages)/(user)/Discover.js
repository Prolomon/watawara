import Product from "@/components/product/Product";
import { dbConnect } from "@/backend/server/server";
import { Products } from "@/backend/models/products.schema";

export default async function Discover() {
    await dbConnect();
    const products = await Products.find({}).lean();
    return (
      <section className="w-11/12 max-md:w-full mx-auto object-fit overflow-hidden mb-10">
        <h1 className="font-bold text-xl capitalize text-gray-800 text-center mb-6 mt-4">
          Discover Your Favorites
        </h1>

        {products.length > 0 ? (
          <div className="w-full flex flex-wrap">
            {products.map((p) => (
              <Product
                key={p.id}
                images={p.images}
                name={p.name}
                price={p.price}
                reviews={p.reviews}
                brand={p.brand}
                category={p.category}
                id={p.id}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No products found</p>
        )}

        {products.length === 20 && (
          <div className="grid place-content-center">
            <button
              type="button"
              className="mx-auto text-gray-600 text-base mt-6"
            >
              Load More
            </button>
          </div>
        )}
      </section>
    );
}

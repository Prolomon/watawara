"use client";
import Product from "@/components/product/Product";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function SimilarProducts() {
  const [limit, setLimit] = useState(10);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        fetch(
          `${process.env.WATAWARA_BASE_URL}/api/products/limit?limit=${limit}`
        )
          .then((res) => res.json())
          .then((data) => {
            setProducts(data.p);
          })
          .catch((e) => {
            console.error("Error fetching products:", e);
            setProducts([]);
          });
      } catch (error) {
        throw new Error("Error fetching products:", error); // Throw the error her
      }
    };

    fetchProducts();
  }, [limit]); // Add dependency array to prevent infinite loop

  const handleClick = () => {
    setLimit((prevLimit) => prevLimit + 10);
  };

  if (!products || products.length === 0) {
    return (
      <section className="w-11/12 mx-auto object-fit overflow-hidden mb-10">
        <h1 className="font-bold text-xl capitalize text-gray-800 text-center mb-6 mt-4">
          Discover Amazing Products That Match Your Style
        </h1>
        <p className="text-center">
          <Image
            src="/loader.gif"
            alt="Error"
            width={100}
            height={100}
            className="mx-auto"
          />
          Loading. Check your internet connection and try again.
        </p>
      </section>
    );
  }

  return (
    <section className="w-11/12 max-md:w-full mx-auto mt-4 object-fit overflow-hidden mb-10">
      <h1 className="font-bold text-xl capitalize text-gray-800 text-center mb-6 mt-4">
        Discover Amazing Products That Match Your Style
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
          onClick={handleClick}
          className="mx-auto rounded-full text-gray-800 bg-primary hover:bg-secondary shadow-sm py-3 px-4 text-base mt-6"
        >
          Load More
        </button>
      </div>
    </section>
  );
}

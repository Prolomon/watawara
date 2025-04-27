import SearchData from "./SearchData";

export default async function Home({ searchParams }) {
  const search = await searchParams;
  try {
    const ps = await fetch(
      `${process.env.WATAWARA_BASE_URL}/api/products`
    );

    if (!ps.ok) {
      throw new Error(`Failed to fetch products: ${ps.status}`);
    }

    const p = await ps.json();
    const s = search.query;
    const filter = Object.keys(search)[1];
    const f = Object.values(search)[1];
    let searchResult = [];

    if (filter === "category") {
      searchResult = p.filter((product) => {
        return (
          product.name.toLowerCase().includes(s?.toLowerCase()) &&
          product.category.toLowerCase().includes(f?.toLowerCase())
        );
      });
    } else if (filter === "brand") {
      searchResult = p.filter((product) => {
        return (
          product.name.toLowerCase().includes(s?.toLowerCase()) &&
          product.brand.toLowerCase().includes(f?.toLowerCase())
        );
      });
    } else if (filter === "store") {
      searchResult = p.filter((product) => {
        return (
          product.name.toLowerCase().includes(s?.toLowerCase()) &&
          product.brand.toLowerCase().includes(f?.toLowerCase())
        );
      });
    } else if (filter === "size") {
      searchResult = p.filter((product) => {
        return (
          product.name.toLowerCase().includes(s?.toLowerCase()) &&
          product.size.toLowerCase().includes(f?.toLowerCase())
        );
      });
    } else if (filter === "price") {
      const [min, max] = f.split("-").map(Number);
      searchResult = p.filter((product) => {
        const price = Number(product.price);
        return (
          product.name.toLowerCase().includes(s?.toLowerCase()) &&
          price >= min &&
          price <= max
        );
      });
    } else {
      searchResult = p.filter((product) => {
        return product.name.toLowerCase().includes(s?.toLowerCase());
      });
    }

    return (
      <div className="w-9/12 max-md:w-full h-dvh pl-4 max-md:pl-0 relative">
        <h3 className="text-lg text-gray-700 font-semibold mb-2">
          Search Result for &apos; {s} &apos;{" "}
          <span className="text-gray-500 text-sm italic font-normal ">
            ({searchResult.length} Products found)
          </span>
        </h3>
        <SearchData searchResult={searchResult} />
      </div>
    );
  } catch (error) {
    console.error("Error in Discover component:", error);
    return (
      <section className="w-11/12 mx-auto object-fit overflow-hidden mb-10">
        <p className="text-center text-red-500">
          Network Connection Broken. Please Check your internet connection
          reload your browser.
        </p>
      </section>
    );
  }
}

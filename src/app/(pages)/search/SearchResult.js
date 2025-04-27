import SearchCard from "./SearchCard";

export default function SearchResult({ products }) {
  
  return (
    <div className="w-full">
      {
        products.length === 0 ? (
          <div className="w-full h-[50vh] flex items-center justify-center text-gray-500 text-lg font-semibold">
            No products found for your search;
          </div>
        ) : <div className="w-full grid grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2 mt-3">
          {products.map(product => (
            <SearchCard key={product._id} {...product} />
          ))}
        </div>
      }
    </div>
  );
}

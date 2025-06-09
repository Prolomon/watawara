import Rating from "@/utilities/rating/Rating";
import Currency from "@/utilities/currency/Currency";
import ProductData from "./ProductData";

export default async function Description({
  id,
  name,
  price,
  discount,
  reviews,
  brand,
  material,
  colors,
  tags,
  stock,
  size,
}) {
  const rate = reviews.reduce((acc, r) => acc + Number(r.rating), 0);
  const rating = rate / reviews.length / 5;
  return (
    <div className="w-full max-md:mt-3">
      <h3 className="text-gray-600 text-base font-semibold capitalize">
        {name}
      </h3>
      <div className="flex items-center gap-2">
        <h1 className="font-semibold text-gray-800 text-2xl">
          {discount.type === "percentage"
            ? Currency(((100 - discount.amount) * price) / 100)
            : discount.type === "none"
              ? Currency(price)
              : Currency(price - discount.amount)}
        </h1>
        <span className="text-base text-gray-400 line-through">
          {discount.type === "none" ? null : Currency(price)}
        </span>
        <span className="text-base font-semibold text-red-500">
          {discount.type === "percentage"
            ? discount.amount + "%"
            : discount.type === "none"
              ? null
              : Currency(discount.amount)}
        </span>
      </div>
      <div className="flex gap-2">
        <button className="text-white bg-green-700 rounded-sm shadow-sm text-xs px-1.5 py-[0.15rem] border-none outline-none cursor-pointer">
          {brand}
        </button>
        {tags?.map((_) => (
          <button
            key={_}
            className="text-white bg-green-700 rounded-sm shadow-sm text-xs px-1.5 py-[0.15rem] border-none outline-none cursor-pointer capitalize"
          >
            {_}
          </button>
        ))}
      </div>
      {/* rating */}
      <div className="-ml-2.5 flex gap-2 items-center justify-start">
        <Rating rating={rating} size={24} />
        <span className="text-gray-600 text-sm font-semibold">{rating}</span>
        <span className="text-gray-400 text-sm font-semibold">|</span>
        <span className="text-gray-400 text-sm font-semibold">
          {reviews.length} Reviews
        </span>
      </div>
      {/* section for selecting products color */}
      <ProductData
        colors={colors}
        material={material}
        stock={stock}
        size={size}
        id={id}
      />
    </div>
  );
}

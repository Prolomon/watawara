import Currency from "@/utilities/currency/Currency";
import Image from "next/image";

export default async function CheckList({ images, name, price, quantity }) {
  return (
    <li className="w-full flex justify-between">
      <div className="inline-flex gap-2 items-center">
        <Image
          alt={name}
          src={images[0]}
          width={100}
          height={100}
          className="aspect-square w-10 h-10 rounded-md"
        />
        <div>
          <h3 className="font-semibold text-base text-gray-600">{name}</h3>
          <h5 className="text-sm text-gray-500">
            ({quantity} x {Currency(price)})
          </h5>
        </div>
      </div>
      <span className="font-semibold text-base">
        {Currency(price * quantity)}
      </span>
    </li>
  );
}

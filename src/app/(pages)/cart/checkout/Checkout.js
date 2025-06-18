import CheckData from "./CheckData";

export default function Checkout() {

  return (
    <div className="w-full mb-3">
      <div className="text-gray-500 text-sm p-2 border border-gray-500 rounded-md">
        <span className="text-base font-semibold text-gray-600">
          Important Notice:{" "}
        </span>
        <span>
          Make sure to have selected the color or the quantity of the product
          you are about to check out as it will be impossible to do that after
          checkout.
        </span>
      </div>
      <CheckData />
    </div>
  );
}

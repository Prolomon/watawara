import { MapPin, Info, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Address() {
  return (
    <div className="w-full py-6 px-8 flex gap-4 rounded-lg shadow-lg bg-white items-center border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <div className="aspect-square bg-primary text-white grid place-content-center rounded-full w-14 h-14 shadow-md transform hover:scale-110 transition-transform duration-300">
        <MapPin size={24} fill="#ffffff" strokeWidth={2.5} />
      </div>
      <div className="flex-1">
        <h3 className="font-bold capitalize text-lg text-black/80 mb-1">
          Office Address
        </h3>
        <p className="text-md text-black/70 font-medium mb-3">
          Abeokuta, Ogun State, NIGERIA (Postal 110281)
        </p>
        <Link
          href="#"
          className="group inline-flex items-center gap-2 text-primary text-sm py-2 px-3 rounded-md hover:bg-primary/10 transition-colors duration-300"
        >
          <Info size={20} className="shrink-0" />
          <p className="flex-1">
            For product returns, this location cannot accept items. Visit our
            returns portal to process your return.
          </p>
          <ChevronRight size={20} className="shrink-0 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </div>
  );
}

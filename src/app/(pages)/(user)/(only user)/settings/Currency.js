"use client"
import { useState } from "react";
import { ChevronDown, Currency} from "lucide-react";

export default function Currencies ({curCurrency}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [search, setSearch] = useState("");

    const changeCurrency = (e) => {
        setSearch(e.target.value)
        setSearchTerm(e.target.value.toLowerCase());
    }

    const currencies = [
        "Naira"
    ];

    const filteredCurrencies = currencies.filter(country =>
        country.toLowerCase().includes(searchTerm)
    );

    return (
        <details className="w-full list-none rounded-md border border-gray-300 shadow-sm p-4">
          <summary className="w-full list-none text-sm flex justify-between items-center font-semibold text-gray-600">
            <div className="inline-flex gap-2 items-center">
                <Currency size={20} />
                <span>Currency</span>
            </div>
            <div className="inline-flex gap-2 items-center">
                <span className="text-gray-400 uppercase">{curCurrency}</span>
                <ChevronDown size={20} />
            </div>
          </summary>
          <div className="mt-4">
                <input type="search" onChange={changeCurrency} placeholder="Search for a currency" className="w-full p-2 text0-sm border bg-transparent hover:border-primary border-gray-300 rounded-md outline-none" value={search} />
          </div>
          <ul className="w-full list-none">
            {filteredCurrencies.map((_c, index) => (
                <li key={index} className="w-full list-none py-2 text-sm text-gray-600">{_c}</li>
            ))}
          </ul>
        </details>
    )
}
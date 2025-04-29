"use client"
import { useState } from "react";
import { ChevronDown, Globe2} from "lucide-react";

export default function Country ({curCountry}) {
    const [searchTerm, setSearchTerm] = useState("");

    const changeCountry = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    }

    const countries = [
        "Nigeria"
    ];

    const filteredCountries = countries.filter(country =>
        country.toLowerCase().includes(searchTerm)
    );

    return (
        <details className="w-full list-none rounded-md border border-gray-300 shadow-sm p-4">
          <summary className="w-full list-none text-sm flex justify-between items-center font-semibold text-gray-600">
            <div className="inline-flex gap-2 items-center">
                <Globe2 size={20} />
                <span>Country & Region</span>
            </div>
            <div className="inline-flex gap-2 items-center">
                <span className="text-gray-400">{curCountry}</span>
                <ChevronDown size={20} />
            </div>
          </summary>
          <div className="mt-4">
                <input type="search" onChange={changeCountry} placeholder="Search for a country" className="w-full p-2 border bg-transparent hover:border-primary outline-none border-gray-300 rounded-md" />
          </div>
          <ul className="w-full list-none">
            {filteredCountries.map((country, index) => (
                <li key={index} className="w-full list-none py-2 text-sm text-gray-600">{country}</li>
            ))}
          </ul>
        </details>
    )
}
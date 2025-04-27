"use client"
import { useState } from "react";
import { ChevronDown, Globe} from "lucide-react";

export default function Language ({curLanguage}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [search, setSearch] = useState("");

    const changeLanguage = (e) => {
        setSearch(e.target.value)
        setSearchTerm(e.target.value.toLowerCase());
    }

    const language = ["English", "French"];

    const filteredLanguage = language.filter(country =>
        country.toLowerCase().includes(searchTerm)
    );

    return (
        <details className="w-full list-none rounded-md border border-gray-300 shadow-sm p-4">
          <summary className="w-full list-none text-sm flex justify-between items-center font-semibold text-gray-600">
            <div className="inline-flex gap-2 items-center">
                <Globe size={20} />
                <span>Language</span>
            </div>
            <div className="inline-flex gap-2 items-center">
                <span className="text-gray-400">{curLanguage}</span>
                <ChevronDown size={20} />
            </div>
          </summary>
          <div className="mt-4">
                <input type="search" onChange={changeLanguage} placeholder="Search for a country" className="w-full p-2 border bg-transparent hover:border-primary border-gray-300 rounded-md" value={search} />
          </div>
          <ul className="w-full list-none">
            {filteredLanguage.map((_c, index) => (
                <li key={index} className="w-full list-none py-2 text-sm text-gray-600">{_c}</li>
            ))}
          </ul>
        </details>
    )
}
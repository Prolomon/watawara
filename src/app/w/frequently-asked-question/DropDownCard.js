"use client"
import { ChevronsUpDown } from "lucide-react"
import { useState } from "react"
export default function DropDownCard({title, body}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className="my-1">
      <details 
        className="w-full list-none rounded-lg border shadow-sm p-5 border-muted-foreground transition-all duration-300"
        open={isOpen}
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
      >
        <summary className="list-none font-bold flex w-full justify-between text-sm items-center cursor-pointer hover:text-amber-500 transition-colors">
          <span className="hover:translate-x-1 transition-transform">{title}</span>
          <ChevronsUpDown 
            size={20} 
            className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          />
        </summary>
        <div className={`w-full mt-4 text-gray-700 font-normal text-base leading-relaxed transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
          <p className="px-2">{body}</p>
        </div>
      </details>
    </li>
  );
}

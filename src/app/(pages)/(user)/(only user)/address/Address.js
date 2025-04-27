import { MapPin, ChevronDown, Trash2, PenSquare } from "lucide-react";

export default function Address ({title, phoneNumber, email, country, state, city, landmark, postalCode, address}) {
    return (
        <details className="w-full list-none rounded-md border mt-3 mb-4 border-gray-300 shadow-sm p-4">
          <summary className="w-full list-none text-sm flex justify-between items-center font-semibold text-gray-600">
            <div className="inline-flex gap-2 items-center">
                <MapPin size={20} />
                <span>{title}</span>
            </div>
            <ChevronDown size={20} />
          </summary>
          {/* form goes here */}
          <div className="my-2 p-2.5">
            <div className="text-sm text-gray-500 my-2 gap-2 justify-between rounded-md flex flex-wrap capitalize items-center">
              <p><span className="font-semibold text-gray-600">Country: </span>{country}</p>
              <p><span className="font-semibold text-gray-600">State: </span>{state}</p>
              <p><span className="font-semibold text-gray-600">City: </span>{city}</p>
              <p><span className="font-semibold text-gray-600">Nearest Landmark: </span>{landmark}</p>
              <p><span className="font-semibold text-gray-600">Postal Code: </span>{postalCode}</p>
              <p><span className="font-semibold text-gray-600">Address: </span>{address}</p>
            </div>
            <div className="w-full flex items-center justify-end gap-2">
              <button type="button" className="w-auto py-1.5 text-sm rounded-md bg-gray-200 hover:bg-gray-300 border border-gray-500 text-gray-500 px-3">Make Default Address</button>
              {/* <button type="button" className="w-auto p-2 rounded-md bg-amber-400 hover:bg-amber-300 text-black"><PenSquare size={14} /></button>
              <button type="button" className="w-auto p-2 rounded-md bg-red-600 hover:bg-red-500 text-white"><Trash2 size={14} /></button> */}
            </div>
          </div>
        </details>
    )
}
  
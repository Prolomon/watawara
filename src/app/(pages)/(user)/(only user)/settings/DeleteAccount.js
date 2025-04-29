"use client"
import { UserX, ChevronDown } from "lucide-react";
import { deleteAccount } from "@/backend/action/user";
import { useState } from "react";


export default function DeleteAccount() {
    const [email, setEmail] = useState("")
    return (
        <details className="w-full list-none rounded-md border border-gray-300 shadow-sm p-4">
          <summary className="w-full list-none text-sm flex justify-between items-center font-semibold text-gray-600">
            <div className="inline-flex gap-2 items-center">
                <UserX size={20} />
                <span>Delete Account</span>
            </div>
            <ChevronDown size={20} />
          </summary>
          {/* form goes here */}
            <form action={deleteAccount} className="mt-3 flex max-md:flex-col items-end gap-2">
                {/* user email address */}
                <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    className="w-full rounded-md border border-gray-300 outline-none text-gray-800 text-sm px-2 py-1.5 bg-transparent" 
                    placeholder="Enter email address" 
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input 
                    type="submit" 
                    className="w-auto h-fit rounded-md border-none outline-none text-white text-sm px-4 py-2 bg-red-600 capitalize hover:bg-red-600" 
                    value="Delete my account" 
                />
            </form>
        </details>
    );
}
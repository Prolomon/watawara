"use server"
import { ChevronDown, Settings2 } from "lucide-react";
import { auth } from "../../../../../../auth";
import { updateAccount } from "@/backend/action/user";

export default async function Preference () {
  const session = await auth()
  const user = session?.user
    return (
        <details className="w-full list-none rounded-md border border-gray-300 shadow-sm p-4">
          <summary className="w-full list-none text-sm flex justify-between items-center font-semibold text-gray-600">
            <div className="inline-flex gap-2 items-center">
                <Settings2 size={20} />
                <span>Preference</span>
            </div>
            <ChevronDown size={20} />
          </summary>
          {/* form goes here */}
            <form action={updateAccount} className="my-2">
                <div className="w-full flex items-center justify-between mb-3">
                  <label className="text-base text-gray-600">Subscribe to our newsletter</label>
                  <input type="checkbox" className="w-4 h-4 accent-primary" />
                </div>
                <div className="w-full flex items-center justify-between mb-3">
                  <label className="text-base text-gray-600">Receive a mail on Login</label>
                  <input type="checkbox" className="w-4 h-4 accent-primary" />
                </div>
                <div className="w-full flex items-center justify-between mb-3">
                  <label className="text-base text-gray-600">Get an update for any new offer</label>
                  <input type="checkbox" className="w-4 h-4 accent-primary" />
                </div>
                <input type="submit" className="w-auto rounded-md border-none outline-none text-gray-800 text-sm my-1 px-3 py-1.5 bg-primary capitalize hover:bg-amber-300" value="Save" />
            </form>
        </details>
    )
}
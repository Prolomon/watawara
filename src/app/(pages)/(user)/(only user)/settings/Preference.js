"use server";
import { ChevronDown, Settings2 } from "lucide-react";
import { auth } from "../../../../../../auth";
import { updateAccount } from "@/backend/action/user";

export default async function Preference() {
  const session = await auth();
  const user = session?.user;
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
          <label className="text-sm text-gray-600">
            Subscribe to our newsletter
          </label>
          <label class="inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" class="sr-only peer" />
            <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-primary rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-secondary dark:peer-checked:bg-secondary"></div>
          </label>
        </div>
        <div className="w-full flex items-center justify-between mb-3">
          <label className="text-sm text-gray-600">
            Receive a mail on Login
          </label>
          <label class="inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" class="sr-only peer" />
            <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-primary rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-secondary dark:peer-checked:bg-secondary"></div>
          </label>
        </div>
        <div className="w-full flex items-center justify-between mb-3">
          <label className="text-sm text-gray-600">
            Get an update for any new offer
          </label>
          <label class="inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" class="sr-only peer" />
            <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-primary rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-secondary dark:peer-checked:bg-secondary"></div>
          </label>
        </div>
        <hr />
        <input
          type="submit"
          className="w-auto rounded-md border-none outline-none text-gray-800 text-sm mt-2 px-4 py-1.5 bg-primary capitalize hover:bg-amber-300 float-right"
          value="Save"
        />
      </form>
    </details>
  );
}

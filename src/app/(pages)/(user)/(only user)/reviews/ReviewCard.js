import { ChevronsUpDown } from "lucide-react"

export default function ReviewCard({title, body}) {
  return (
    <li>
      <details className="w-full list-none rounded-md border border-gray-300 shadow-sm p-4">
        <summary className="list-none font-semibold flex w-full justify-between text-base items-center text-gray-700">
          <span>{title}</span>
          <ChevronsUpDown size={18} />
        </summary>
        <div className="w-full mt-4 text-gray-600 font-normal text-sm">
          <p>{body}</p>
        </div>
      </details>
    </li>
  );
}

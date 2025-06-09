import Link from "next/link"

export default function QuickLink ({title, path, ref}) {
    return (
      <div className="">
        <h2 className="text-white font-bold text-base mb-2 capitalize">
          {title}
        </h2>
        <div className="grid gap-2">
          {path?.map((_p) => (
            <Link
              key={_p}
              className="capitalize text-gray-200 text-sm"
              href={`/w/${_p.toLowerCase().replaceAll(" ", "-")}`}
            >
              {_p}
            </Link>
          ))}
        </div>
      </div>
    );
}
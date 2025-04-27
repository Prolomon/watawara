import Link from "next/link"

export default function QuickLink ({title, path, ref}) {
    return (
        <div className="">
            <h2 className="text-white font-bold text-base mb-2 capitalize">{title}</h2>
            <ul className="grid gap-1.5">
                {path?.map(_p => (
                    <li key={_p}><p className="capitalize text-gray-200 text-sm" href={`/w/a/t/a/${_p.toLowerCase().replaceAll(" ", "-")}`}>{_p}</p></li>
                ))}
            </ul>
        </div>
    )
}


export default function Input ({title, id, name, type, value}) {
    return (
        <div className="mb-1.5">
            <label htmlFor={title?.replace(/\s+/g, "-")} className="text-sm font-semibold text-gray-700 capitalize">{title}</label>
            <input type={type} name={name} id={title?.replace(/\s+/g, "-")} className="w-full rounded-md border border-gray-400 outline-none text-gray-800 text-sm mt-1 px-2 py-1.5 bg-transparent" defaultValue={value} />
        </div>
    )
}
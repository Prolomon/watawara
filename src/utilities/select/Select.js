

export default function Select ({title, options, name, value}) {
    return (
        <div className="mb-1.5">
            <label htmlFor={title?.replace(/\s+/g, "-")} className="text-sm font-semibold text-gray-700 capitalize">{title}</label>
            <div className="w-full rounded-md border border-gray-400 text-gray-800 text-sm mt-1 px-2 py-1.5">
                <select name={name} id={title?.replace(/\s+/g, "-")} className="capitalize w-full border-none outline-none bg-transparent" defaultValue={value}>
                    {options?.map(_o => (
                        <option key={_o} value={_o} className="capitalize">{_o}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}
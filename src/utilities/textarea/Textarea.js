

export default function Textarea ({title, id, name, value}) {
    return (
        <div className="mb-1.5">
            <label htmlFor={title?.replace(/\s+/g, "-")} className="text-sm font-semibold text-gray-700 capitalize">{title}</label>
            <textarea name={name} id={title?.replace(/\s+/g, "-")} className="w-full field-content rounded-md border border-gray-400 outline-none text-gray-800 text-sm mt-1 px-2 py-1.5 bg-transparent resize-none" defaultValue={value}></textarea>
        </div>
    )
}
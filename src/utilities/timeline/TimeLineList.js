
export default function TimeLineList ({title, state, value, icon}) {
    return (
        <li className="mb-2">
            <div className={`flex gap-2 items-center text-base font-semibold text-gray-500 ${state? "text-green-700" : null}`}>
                {icon}
                <p className="capitalize">{title}</p>
            </div>
            <progress type="range" min={0} max={100} readOnly className={`progress w-full ${state? "progress-active" : null}`} value={value} />
        </li>
    )
}
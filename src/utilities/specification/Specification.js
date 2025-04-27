

export default function Specification ({specification}) {
    return (
        <div>
            <h4 className={`font-semibold my-2 text-black text-lg`}>Specification</h4>
            <table className="border border-gray-400 border-collapse w-full">
                <thead>
                    <tr>
                        <th className={`w-1/5 text-left text-gray-900 px-2 border border-gray-500 font-semibold bg-gray-400 text-base`}>Key</th>
                        <th className={`w-4/5 text-left text-gray-900 px-2 border border-gray-500 font-semibold bg-gray-400 text-base`}>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(specification).map(([key, value]) => (
                        <tr key={key}>
                            <th className={`w-1/5 text-left text-gray-900 font-semibold p-2 border border-gray-500 bg-gray-400 text-base`}>{key}</th>
                            <td className={`w-4/5 text-left text-gray-900 p-2 border border-gray-500 text-[14px]`}>{value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
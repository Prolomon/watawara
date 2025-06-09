

export default function Specification ({specifications}) {
    return (
      <div>
        <h3
          className={`font-semibold my-2 text-slate-900 text-2xl max-md:text-lg`}
        >
          Specification
        </h3>
        <table className="border border-gray-400 border-collapse w-full rounded-md">
          <thead>
            <tr>
              <th
                className={`w-1/5 text-left text-gray-900 p-2 border border-gray-500 font-semibold bg-gray-400 text-base`}
              >
                Specs
              </th>
              <th
                className={`w-4/5 text-left text-gray-900 p-2 border border-gray-500 font-semibold bg-gray-400 text-base`}
              >
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            {specifications.map((s, index) => (
              <tr key={index}>
                <th
                  className={`w-1/5 text-left text-gray-900 font-semibold p-2 border border-gray-500 bg-gray-400 text-sm text-wrap`}
                >
                  {s.key}
                </th>
                <td
                  className={`w-4/5 text-left text-gray-900 p-2 border border-gray-500 text-sm text-wrap`}
                >
                  {s.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}
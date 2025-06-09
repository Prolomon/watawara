

export default function Preference({colors, material, size}) {
  return (
    <>
      <div className="my-2 py-3 border-y border-gray-300 relative">
        <h5 className="text-gray-800 text-sm font-semibold mb-2">Color</h5>
        <div className="flex gap-2">
          {colors?.map((_i, index) => (
            <button
              key={index}
              className={`aspect-square rounded-md border hover:border-primary w-10 h-10`}
              style={{ background: _i }}
              title={_i}
            ></button>
          ))}
        </div>
      </div>
      {size == null && (
        <div className="my-2 py-3 border-y border-gray-300 relative">
          <h5 className="text-gray-800 text-sm font-semibold mb-2">
            Sizes
          </h5>
          <div className="flex gap-2">
            {size?.map((_i, index) => (
              <button
                key={index}
                className="text-gray-800 rounded-full text-xs px-3 py-1.5 border border-gray-800 outline-none cursor-pointer uppercase hover:text-primary hover:border-primary"
              >
                {_i}
              </button>
            ))}
          </div>
        </div>
      )}
      {material == null && (
        <div className="my-2 py-3 border-y border-gray-300 relative">
          <h5 className="text-gray-800 text-sm font-semibold mb-2">
            Materials
          </h5>
          <div className="flex gap-2">
            {material?.map((_i, index) => (
              <button
                key={index}
                className="text-white bg-primary rounded-sm shadow-sm text-xs px-1.5 py-[0.15rem] border-none outline-none cursor-pointer"
              >
                {_i}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

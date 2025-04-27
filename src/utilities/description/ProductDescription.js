

export default function ProductDescription ({description}) {
    return (
      <div className="w-full my-4">
        <h5 className="font-semibold text-lg text-slate-900">Description</h5>
        <p className="text-base text-gray-500">{description}</p>
      </div>
    );
}
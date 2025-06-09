

export default function ProductDescription ({body, title}) {
    return (
      <div className="w-full my-4">
        <h5 className="font-semibold text-lg capitalize text-slate-900">{title}</h5>
        <p className="text-base text-gray-500">{body}</p>
      </div>
    );
}
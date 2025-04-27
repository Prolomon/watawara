import Product from "@/components/product/Product"
import { Products } from "@/backend/models/products.schema"

export default async function Explore () {
    const products = await Products.findOne({}) 
    return (
        <section className="w-full mx-auto object-fit overflow-hidden mb-10">
            <h1 className="font-bold text-xl capitalize text-gray-800 text-center mb-6 mt-4">Discover Your Favorites</h1>
            <div className="w-full flex flex-wrap">
                {products.map(_p => (
                    <Product key={_p.id} {..._p} />
                ))}
            </div>
            <div className="grid place-content-center">
                <button type="button" className="mx-auto rounded-full text-gray-800 bg-primary shadow-sm py-3 px-4 text-base mt-8">See More</button>
            </div>
        </section>
    )
}
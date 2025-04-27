import Image from "next/image"
import {Earth, CircleCheck, Star} from "lucide-react"

export default function Seller ({store, store_avatar, store_following, store_location}) {
    return (
        <div className="w-full flex gap-2 items-center p-3 border border-gray-300 shadow-sm rounded-md">
            <Image priority alt={`sellers logo image`} width={100} height={100} className="rounded-full border border-gray-100 shadow-md w-14 h-14" src={store_avatar ? store_avatar : "/images/avatar.jpg" } />
            <div className="w-full">
                <h3 className="font-bold text-base text-black flex-nowrap items-center inline-flex gap-1">{store}<CircleCheck size={18} fill="#fbbf24" className="text-white" /></h3>
                <div className="w-full flex justify-between gap-3 text-gray-500">
                    <div className="inline-flex items-center gap-1"><Earth size={14} /><span className="text-sm">{store_location}</span></div>
                    {store_following ? 
                        null: 
                        <button type="button" className="text-sm px-2.5 py-0.5 bg-primary text-gray-800 rounded-full">Follow</button> 
                    }
                </div>
            </div>
        </div>
    )
}
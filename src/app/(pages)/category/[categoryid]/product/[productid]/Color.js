"use client"
import {useState} from "react"
import Image from "next/image"

export default function Color ({images}) {
    const [src, setSrc] = useState(images[0])
    const handleClick = (e) => {
        setSrc(e.target.id)
    }
    return (
        <div className="my-2 py-4 pb-4 border-y border-gray-300 relative">
            <h5 className="text-gray-800 text-sm font-semibold mb-2">Color</h5>
            <div className="flex gap-2">
                {images?.map((_i, index) => (
                    <Image key={index} id={_i} onClick={handleClick} priority width={100} height={100} alt={index} src={_i} className={`aspect-square rounded-md border hover:border-primary w-14 h-14 ${src === _i ? "border-primary" : "border-gray-200"}`} />
                ))}
            </div>
        </div>
    )
}
"use client"
import {useState} from "react"
import {Minus, Plus} from "lucide-react"

export default function Quantity () {
    const [quantity, setQuantity] = useState(1)
    const decre = () => {
        if (quantity >= 2) {
            setQuantity(quantity - 1)
        } else {
            setQuantity(1)
        }
        
    }
    const incre = () => {
        setQuantity(quantity + 1)
    }
    return (
        <div className="w-full">
            <h5 className="text-gray-800 text-base font-semibold mb-2">Quantity</h5>
           <div className="w-full flex gap-2 border border-gray-200 p-1 rounded-md">
                <button type="button" onClick={decre} className="rounded-md px-2.5 py-2 text-gray-800 bg-primary"><Minus size={16} /></button>
                <input type="text" className="rounded-md text-center px-2.5 w-full py-1 text-gray-800" name="quantity" value={quantity} onChange={e => setQuantity(e.target.value)} />
                <button type="button" onClick={incre} className="rounded-md px-2.5 py-2 text-gray-800 bg-primary"><Plus size={16} /></button>
            </div> 
        </div> 
    )
}
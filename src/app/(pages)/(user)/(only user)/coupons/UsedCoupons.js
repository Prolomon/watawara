"use server"
import Coupon from "./Coupon"
import { auth } from "../../../../../../auth"

export default async function UsedCoupons () {
    const session = await auth()
    return (
        <section className="w-full mt-2">
            <h3 className="text-md font-semibold text-gray-800">Used Coupons</h3>
            {session?.user.coupons.length === 0 ? 
            null : 
                <div className="w-full grid grid-cols-2 max-md:grid-cols-1 gap-2 mt-2">
                    {
                        session?.user.coupons?.map(_c => (
                            <Coupon key={_c} />
                        ))
                    }
                </div>
            }
            
        </section>
    )
}
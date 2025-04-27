

export default function VerifyCoupon () {
    const verify = false
    return (
        <form className="w-full flex gap-2 mt-2 items-center">
            <input type="text" name="coupon" placeholder="Enter Coupon Code" aria-placeholder="Enter Coupon Code" className="w-5/12 max-md:w-full border border-gray-300 outline-primary p-2 rounded-full text-sm" />
            <input type="submit" className="border-none outline-none hover:bg-secondary bg-primary py-2 px-4 rounded-full text-sm" value="Apply" />
            {/* {verify ? <h4 className="text-green-600 font-semibold p-2 bg-green-200 rounded-md">Coupon code verified and read to use.</h4> : <h4 className="text-red-600 font-semibold p-2 bg-red-200 rounded-md">This coupon has been used by another user.</h4>} */}
        </form>
    )
}
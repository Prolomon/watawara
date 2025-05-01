import { orderAction } from "@/backend/action/order";

export default async function CheckButton () {
    return (
        <form action={orderAction}>
            <button type="submit" className="w-full mt-3 text-sm bg-primary hover:bg-secondary rounded-ms py-1 rounded-md text-black">Order Now</button>
        </form>
    )
}

import { signOut } from "../../../auth"
import { redirect } from "next/navigation"
import { DoorOpen } from "lucide-react"

export function Logout () {
    return (
        <form action={async () => {
            await signOut()
            redirect("/auth/login")
        }}>
            <button type="submit" className="text-sm hover:bg-gray-200 w-full rounded-md font-semibold flex items-center p-2 gap-2 hover:text-primary">
                <DoorOpen size={20} />
                <span>Logout</span>
            </button>
        </form>
    )
}
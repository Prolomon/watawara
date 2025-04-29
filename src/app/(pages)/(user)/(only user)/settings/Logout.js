"use client";
import { logout } from "@/backend/action/user";
import { DoorOpen} from "lucide-react";

export default function Logout () {
    return (
        <button type="button" onClick={() => logout()} className="w-full rounded-md border border-gray-300 shadow-sm p-4 text-sm font-semibold text-gray-600 inline-flex gap-2 items-center">
            <DoorOpen size={20} />
            <span>Logout</span>
        </button>
    )
}
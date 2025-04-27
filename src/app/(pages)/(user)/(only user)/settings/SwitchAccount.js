import Link from "next/link";
import { ChevronRight, SwitchCamera} from "lucide-react";

export default function SwitchAccount () {
    return (
        <Link href="/auth/login" className="w-full rounded-md border border-gray-300 shadow-sm p-4 text-sm flex justify-between items-center font-semibold text-gray-600">
            <div className="inline-flex gap-2 items-center">
                <SwitchCamera size={20} />
                <span>Switch Account</span>
            </div>
            <ChevronRight size={20} />
        </Link>
    )
}
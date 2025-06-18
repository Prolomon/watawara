import Link from "next/link"

export default function Copyright () {
    return (
      <ul className="py-6 border-t border-gray-400 text-xs flex flex-wrap items-center justify-center gap-x-4 text-gray-400">
        <li>
          &copy; 2025{" "}
          <Link href="/w/tri3g" className="text-nowrap">
            Tri3G Innovative Limited
          </Link>
        </li>
        <li>
          <Link
            href="/w/terms-and-conditions"
            className="underline text-nowrap"
          >
            Terms and Conditions
          </Link>
        </li>
        <li>
          <Link href="/w/privacy-policy" className="underline text-nowrap">
            Privacy Policy
          </Link>
        </li>
        <li>
          <Link href="/w/cookies" className="underline text-nowrap">
            Cookies
          </Link>
        </li>
      </ul>
    );
}
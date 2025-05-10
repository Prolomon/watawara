"use client";
import Link from "next/link";
import {
  History,
  Smartphone,
  ArrowUpDown,
  Tv,
  Volleyball,
  SendHorizontal,
  BookOpenText,
  PiggyBank,
  Zap,
  HandHeart,
  ShoppingBag,
  GraduationCap,
  Megaphone,
} from "lucide-react";
import { usePathname } from "next/navigation";

export default function Sidebar({unique}) {
    const pathname = usePathname();
    const pay = [
      {
        title: "history",
        icon: <History size={20} />,
        link: `/wallet/${unique}`,
      },
      {
        title: "airtime",
        icon: <Smartphone size={20} />,
        link: `/wallet/${unique}/airtime`,
      },
      {
        title: "transfer",
        icon: <SendHorizontal size={20} />,
        link: `/wallet/${unique}/transfer`,
      },
      {
        title: "internet",
        icon: <ArrowUpDown size={20} />,
        link: `/wallet/${unique}/internet`,
      },
      {
        title: "cable tv",
        icon: <Tv size={20} />,
        link: `/wallet/${unique}/cable-tv`,
      },
      {
        title: "betting",
        icon: <Volleyball size={20} />,
        link: `/wallet/${unique}/betting`,
      },
      {
        title: "electricity",
        icon: <Zap size={20} />,
        link: `/wallet/${unique}/electricity`,
      },
      {
        title: "referral ",
        icon: <Megaphone size={20} />,
        link: `/wallet/${unique}/referral`,
      },
      {
        title: "jamb",
        icon: <GraduationCap size={20} />,
        link: `/wallet/${unique}/jamb`,
      },
    ];
    return (
      <div className={`w-3/12 max-md:hidden my-2 border rounded-md border-gray-300 p-2 grid h-fit gap-1`}>
        {pay.map((_p) => (
          <Link
            key={_p.title}
            href={`${_p.link?.replace(/\s+/g, "-")}`}
            className={`rounded-md gap-2 flex items-center p-3 hover:border-gray-600 hover:bg-primary ${pathname === _p.link && "bg-primary border-gray-600"}`}
          >
            {_p.icon}
            <h6 className="text-sm font-semibold capitalize">{_p.title}</h6>
          </Link>
        ))}
      </div>
    );
}

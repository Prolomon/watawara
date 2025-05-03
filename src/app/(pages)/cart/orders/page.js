import { images } from "@/constants";
import AllOrders from "@/components/order/AllOrders";
import Address from "@/utilities/address/Address";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Information from "@/utilities/information/Information";

export const metadata = {
  metadataBase: new URL(`${process.env.WATAWARA_BASE_URL}`),
  title: `Watawara | Orders`,
  description: `Check out the list of all amazing orders you have from .`,
  icons: {
    icon: images.logo,
    shortcut: images.logo,
    apple: images.logo,
    other: {
      rel: "apple-touch-icon-precomposed",
      url: images.openGraph,
    },
  },
  manifest: "/manifest.json",
  openGraph: {
    title: `Watawara | Orders`,
    description: `Check out the list of all amazing orders you have from .`,
    url: `${process.env.WATAWARA_BASE_URL}/orders`,
    siteName: "Watawara",
    images: [
      {
        url: images.openGraph, // Must be an absolute URL
        width: 800,
        height: 600,
      },
      {
        url: images.openGraph, // Must be an absolute URL
        width: 1800,
        height: 1600,
        alt: `Watawara | Orders`,
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Watawara | Orders`,
    description: `Check out the list of all amazing orders you have from .`,
    siteId: "/",
    creator: "Tri3G Innovative Limited",
    creatorId: "/",
    images: {
      url: images.openGraph,
      alt: `Watawara | Orders`,
    },
    // app: {
    //   name: "Watawara",
    //   id: {
    //     iphone: "Watawara://iphone",
    //     ipad: "Watawara://ipad",
    //     googleplay: "Watawara://googleplay",
    //   },
    //   url: {
    //     iphone: "https://iphone_url",
    //     ipad: "https://ipad_url",
    //   },
    // },
  },
};

export default async function Home() {
  return (
    <div className="w-full max-md:w-11/12 mx-auto h-full relative">
      <h1 className="text-xl font-bold text-black mb-3">Your Orders</h1>
      <div className="mx-auto w-full mb-6 flex max-md:flex-col gap-3">
        <AllOrders />
        <div className={`w-2/5 max-md:w-full inline-flex flex-col gap-3`}>
          <Address />
          <Information />
          {/* policies cards */}
          <div>
            <Link
              href="#"
              className="p-3 border text-gray-600 font-semibold text-base border-gray-200 rounded-md shadow-sm flex items-center justify-between mt-1.5"
            >
              <span>Return Policy</span>
              <ChevronRight size={18} />
            </Link>
            <Link
              href="#"
              className="p-3 border text-gray-600 font-semibold text-base border-gray-200 rounded-md shadow-sm flex items-center justify-between mt-1.5"
            >
              <span>Fraud Penalty</span>
              <ChevronRight size={18} />
            </Link>
            <Link
              href="#"
              className="p-3 border text-gray-600 font-semibold text-base border-gray-200 rounded-md shadow-sm flex items-center justify-between mt-1.5"
            >
              <span>Customer&apos;s Agreement</span>
              <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

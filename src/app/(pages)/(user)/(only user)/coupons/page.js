import VerifyCoupon from "./VerifyCoupon";
import UsedCoupons from "./UsedCoupons";
import { images } from "@/constants";

export const metadata = {
  metadataBase: new URL(`${process.env.WATAWARA_BASE_URL}`),
  title: `Watawara | Coupons`,
  description: `Discover amazing discounts and deals with our exclusive coupons on Watawara.`,
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
    title: `Watawara | Coupons`,
    description: `Discover amazing discounts and deals with our exclusive coupons on Watawara.`,
    url: `${process.env.WATAWARA_BASE_URL}/coupons`,
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
        alt: `Watawara | Coupons`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Watawara | Coupons`,
    description: `Discover amazing discounts and deals with our exclusive coupons on Watawara.`,
    siteId: "/",
    creator: "Tri3G Innovative Limited",
    creatorId: "/",
    images: {
      url: images.openGraph,
      alt: `Watawara | Coupons`,
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

export default function Home({ params }) {
  return (
    <div className="w-full mx-auto h-full relative object-fit overflow-hidden mt-4 mb-10">
      <h1 className="text-lg font-semibold text-gray-800">Coupons</h1>
      <VerifyCoupon />
      <UsedCoupons />
    </div>
  );
}

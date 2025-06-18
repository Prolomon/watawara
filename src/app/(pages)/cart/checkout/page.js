export const dynamic = "force-dynamic";
import Coupon from "./Coupon";
import Address from "@/utilities/address/Address";
import Checkout from "./Checkout";
import { images } from "@/constants";

export const metadata = {
  metadataBase: new URL("https://watawara.vercel.app/"),
  title: `Watawara | Checkout`,
  description: `Unlock incredible savings with exclusive coupons and discounts on Watawara. Shop now and enjoy unbeatable prices on your favorite products!`,
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
    title: `Watawara | Checkout`,
    description: `Unlock incredible savings with exclusive coupons and discounts on Watawara. Shop now and enjoy unbeatable prices on your favorite products!`,
    url: `${process.env.WATAWARA_BASE_URL}/checkout`,
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
        alt: `Watawara | Checkout`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Watawara | Checkout`,
    description: `Unlock incredible savings with exclusive coupons and discounts on Watawara. Shop now and enjoy unbeatable prices on your favorite products!`,
    siteId: "/",
    creator: "Tri3G Innovative Limited",
    creatorId: "/",
    images: {
      url: images.openGraph,
      alt: `Watawara | Checkout`,
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
    <div className="w-full my-4 relative mx-auto flex max-md:flex-col gap-3 bg-white">
      <div className="w-4/6">
        <Checkout />
      </div>
      <div className="w-2/6 grid gap-2">
        <Coupon />
        <Address />
      </div>
    </div>
  );
}

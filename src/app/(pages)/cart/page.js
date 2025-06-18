export const dynamic = "force-dynamic";
import Orders from "./Orders";
import Checkout from "./Checkout";
import { images } from "@/constants";

export const metadata = {
  metadataBase: new URL(`${process.env.WATAWARA_BASE_URL}`),
  title: `Watawara | Cart`,
  description: `Review and manage your items in the cart on our e-commerce platform. Easily update quantities, apply promo codes, and proceed to checkout for fast, reliable delivery. shop with confidence today!`,
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
    title: `Watawara | Cart`,
    description: `Review and manage your items in the cart on our e-commerce platform. Easily update quantities, apply promo codes, and proceed to checkout for fast, reliable delivery. shop with confidence today!`,
    url: `${process.env.WATAWARA_BASE_URL}/cart`,
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
        alt: `Watawara | Cart`,
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Watawara | Cart`,
    description: `Review and manage your items in the cart on our e-commerce platform. Easily update quantities, apply promo codes, and proceed to checkout for fast, reliable delivery. shop with confidence today!`,
    siteId: "/",
    creator: "Tri3G Innovative Limited",
    creatorId: "/",
    images: {
      url: images.openGraph,
      alt: `Watawara | Cart`,
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

export default async function Home({ searchParams }) {
  const search = await searchParams;

  return (
    <div className="w-full h-full relative bg-white mt-6">
      <h1 className="text-xl font-bold text-black mb-3">Your Cart</h1>
      <div className="w-full mx-auto mb-6 flex max-md:flex-col gap-3 relative">
        <div className="w-3/5 max-md:w-full">
          <Orders search={search} />
          <Checkout />
        </div>
        <div className="w-2/5 max-md:w-full inline-flex flex-col gap-3"></div>
      </div>
    </div>
  );
}

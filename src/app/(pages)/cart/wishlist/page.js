import WishProduct from "./WishProduct";
import { images } from "@/constants";

export const metadata = {
  metadataBase: new URL(`${process.env.WATAWARA_BASE_URL}`),
  title: `Watawara | Wishlist`,
  description: `Save your favorite product on your wishlist. Organize items, track price drops, and shop later with ease. Start building your dream collection`,
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
    title: `Watawara | Wishlist`,
    description: `Save your favorite product on your wishlist. Organize items, track price drops, and shop later with ease. Start building your dream collection`,
    url: `${process.env.WATAWARA_BASE_URL}/wishlist`,
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
        alt: `Watawara | Wishlist`,
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Watawara | Wishlist`,
    description: `Save your favorite product on your wishlist. Organize items, track price drops, and shop later with ease. Start building your dream collection`,
    siteId: "/",
    creator: "Tri3G Innovative Limited",
    creatorId: "/",
    images: {
      url: images.openGraph,
      alt: `Watawara | Wishlist`,
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
export default async function Home({ params }) {
  return (
    <div className="w-full h-full relative object-fit overflow-hidden mt-4 mb-10">
      <WishProduct />
    </div>
  );
}

import Banner from "@/components/banner/Banner";
import Discover from "./Discover";
import { images } from "@/constants";
import Specials from "./Specials";
import { dbConnect } from "@/backend/server/server";
import { Advertisement } from "@/backend/models/advertisement";

// metadata function
export const metadata = {
  metadataBase: new URL(`${process.env.WATAWARA_BASE_URL}`),
  title: `Watawara | What you order is what you get!!!!`,
  description: `Stay updated with the latest products and offers from your favorite categories on Watawara. Follow your preferred categories and never miss out on exclusive deals.`,
  icons: {
    icon: images.logo,
    shortcut: images.logo,
    apple: images.logo,
    other: {
      rel: "apple-touch-icon-precomposed",
      url: images.openGraph, // Ensure this is an absolute URL
    },
  },
  manifest: "/manifest.json",
  openGraph: {
    title: `Watawara | What you order is what you get!!!!`,
    description: `Stay updated with the latest products and offers from your favorite categories on Watawara. Follow your preferred categories and never miss out on exclusive deals.`,
    url: `${process.env.NEXT_PUBLIC_WATAWARA_BASE_URL}`, // Ensure this is an absolute URL
    siteName: "Watawara",
    images: [
      {
        url: images.openGraph, // Ensure this is an absolute URL
        width: 800,
        height: 600,
      },
      {
        url: images.openGraph, // Ensure this is an absolute URL
        width: 1800,
        height: 1600,
        alt: `Watawara | What you order is what you get!!!!`,
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image", // Use "summary_large_image" for better display
    title: `Watawara | What you order is what you get!!!!`,
    description: `Stay updated with the latest products and offers from your favorite categories on Watawara. Follow your preferred categories and never miss out on exclusive deals.`,
    siteId: "/",
    creator: "Tri3G Innovative Limited",
    creatorId: "/",
    images: {
      url: images.openGraph, // Ensure this is an absolute URL
      alt: `Watawara | What you order is what you get!!!!`,
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
  await dbConnect()
  const advertisements = await Advertisement.find({})
  const _a = advertisements.map((a) => ({
    advertisement: a.advertisement,
    default: a.default,
  }));

  const advertisement = _a.find(a => a.default == true)

  return (
    <div className="w-full h-full relative bg-white">
      <Banner large={advertisement.advertisement.large} small={advertisement.advertisement.small} />
      <Specials />
      <Discover />
    </div>
  );
}

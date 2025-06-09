import Faq from "./Faq";
import { images } from "@/constants";

export const metadata = {
  metadataBase: new URL(`${process.env.WATAWARA_BASE_URL}`),
  title: `Watawara | Frequently Asked Questions`,
  description: `Check out the list of all amazing frequently asked questions you have about shopping on Watawara.`,
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
    title: `Watawara | Frequently Asked Questions`,
    description: `Check out the list of all amazing frequently asked questions you have about shopping on Watawara.`,
    url: `${process.env.WATAWARA_BASE_URL}/faq`,
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
        alt: `Watawara | Frequently Asked Questions`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Watawara | Frequently Asked Questions`,
    description: `Check out the list of all amazing frequently asked questions you have about shopping on Watawara.`,
    siteId: "/",
    creator: "Tri3G Innovative Limited",
    creatorId: "/",
    images: {
      url: images.openGraph,
      alt: `Watawara | Frequently Asked Questions`,
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
    <div className="w-11/12 mx-auto h-full relative object-fit overflow-hidden mt-4 mb-10">
      <Faq />
    </div>
  );
}

"use server";
import Profile from "./Profile";
import { images } from "@/constants";

export async function generateMetadata({ params }) {
  // read route params
  const {profileid} = await params;

  return {
    metadataBase: new URL("https://watawara.vercel.app/"),
    title: profileid,
    description: profileid,
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
      title: profileid,
      description: profileid,
      url: `${process.env.WATAWARA_BASE_URL}/${profileid
        ?.toLowerCase()
        .replace(/\s+/g, "-")}`,
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
          alt: profileid,
        },
      ],
      locale: "en_NG",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: profileid,
      description: profileid,
      siteId: profileid,
      creator: "Tri3G Innovative Limited",
      creatorId: profileid,
      images: {
        url: images.openGraph,
        alt: profileid,
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
}

export default async function Home({ params }) {
  return (
    <div className="w-full mx-auto h-full relative object-fit">
      <Profile />
    </div>
  );
}

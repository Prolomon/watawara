"use server";
import { dbConnect } from "@/backend/server/server";
import Profile from "./Profile";
import { images } from "@/constants";
import { User } from "@/backend/models/user.schema";
import { authCookie } from "@/backend/authCookie";

export async function generateMetadata({  }) {
  // read route params
  const session = await authCookie()
  await dbConnect()
  const user = await User.findOne({
    email: session?.email,
  });

  return {
    metadataBase: new URL("https://watawara.vercel.app/"),
    title: user?.fullname?.toUpperCase(),
    description: user?.fullname?.toUpperCase(),
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
      title: user?.fullname?.toUpperCase(),
      description: user?.fullname?.toUpperCase(),
      url: `${process.env.NEXT_PUBLIC_WATAWARA_BASE_URL}/${user?.fullname?.toUpperCase()
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
          alt: user?.fullname?.toUpperCase(),
        },
      ],
      locale: "en_NG",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: user?.fullname?.toUpperCase(),
      description: user?.fullname?.toUpperCase(),
      siteId: user?.fullname?.toUpperCase(),
      creator: "Tri3G Innovative Limited",
      creatorId: user?.fullname?.toUpperCase(),
      images: {
        url: images.openGraph,
        alt: user?.fullname?.toUpperCase(),
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

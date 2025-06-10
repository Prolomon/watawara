import Merchant from "./Merchant";
import { images } from "@/constants";
import { User } from "@/backend/models/user.schema";
import { authCookie } from "@/backend/authCookie";
import { dbConnect } from "@/backend/server/server";

export const metadata = {
  metadataBase: new URL(`${process.env.WATAWARA_BASE_URL}`),
  title: `Watawara | Followed Merchant`,
  description: `Stay updated with the latest products and offers from your favorite merchants on Watawara. Follow your preferred sellers and never miss out on exclusive deals.`,
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
    title: `Watawara | Followed Merchant`,
    description: `Stay updated with the latest products and offers from your favorite merchants on Watawara. Follow your preferred sellers and never miss out on exclusive deals.`,
    url: `${process.env.WATAWARA_BASE_URL}/followed-stores`,
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
        alt: `Watawara | Followed Merchant`,
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Watawara | Followed Merchant`,
    description: `Stay updated with the latest products and offers from your favorite merchants on Watawara. Follow your preferred sellers and never miss out on exclusive deals.`,
    siteId: "/",
    creator: "Tri3G Innovative Limited",
    creatorId: "/",
    images: {
      url: images.openGraph,
      alt: `Watawara | Followed Merchant`,
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
  const session = await authCookie();
  const user = await User.findOne({ email: session?.email });

  return (
    <div className="w-full mx-auto h-full relative object-fit overflow-hidden mt-4 mb-10">
      {user.followed.length !== 0 ? (
        <div className="w-full flex flex-wrap">
          {user.followed ? (
            user.followed.map((_m, index) => <Merchant key={index} {..._m} />)
          ) : (
            <div className="w-full h-full text-gray-500 grid place-content-center">
              No merchant found
            </div>
          )}
        </div>
      ) : (
        <div className="w-full h-full grid place-content-center">
          You have not followed any merchant
        </div>
      )}
    </div>
  );
}

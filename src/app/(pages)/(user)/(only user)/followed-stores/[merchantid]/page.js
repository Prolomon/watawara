"use server";
import MerchantProfile from "./MerchantProfile";
import Explore from "./Explore";
// import { merchant } from "@/backend/merchant";

// export async function generateMetadata({ params }) {
//   // read route params
//   const {merchantid} = await params;
//   const m = merchant.find(_m => _m.name.toLowerCase()?.replace(/\s+/g, "-") === merchantid)

//   return {
//     metadataBase: new URL('https://watawara.vercel.app/'),
//     title: m.name,
//     description: m.description,
//     icons: {
//       icon: m.image,
//       shortcut: m.image,
//       apple: m.image,
//       other: {
//         rel: "apple-touch-icon-precomposed",
//         url: m.image,
//       },
//     },
//     manifest: "/manifest.json",
//     openGraph: {
//       title: m.name,
//       description: m.description,
//       url: `${process.env.NEXT_PUBLIC_WATAWARA_BASE_URL}/followed-stores/${m.name?.toLowerCase().replace(/\s+/g, "-")}`,
//       siteName: "Watawara",
//       images: [
//         {
//           url: m.image, // Must be an absolute URL
//           width: 800,
//           height: 600,
//         },
//         {
//           url: m.image, // Must be an absolute URL
//           width: 1800,
//           height: 1600,
//           alt: m.name,
//         },
//       ],
//       locale: "en_NG",
//       type: "website",
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: m.name,
//       description: m.description,
//       siteId: "/",
//       creator: "Tri3G Innovative Limited",
//       creatorId: "/",
//       images: {
//         url: m.image,
//         alt: m.name,
//       },
//       // app: {
//       //   name: "Watawara",
//       //   id: {
//       //     iphone: "Watawara://iphone",
//       //     ipad: "Watawara://ipad",
//       //     googleplay: "Watawara://googleplay",
//       //   },
//       //   url: {
//       //     iphone: "https://iphone_url",
//       //     ipad: "https://ipad_url",
//       //   },
//       // },
//     },
//   };
// }

export default async function Home({ params }) {
  const { merchantid } = await params;
  // const m = merchant.find(_m => _m.name.toLowerCase()?.replace(/\s+/g, "-") === merchantid)
  return (
    <div className="w-full mx-auto h-full relative object-fit overflow-hidden mt-4 mb-10">
      {/* <MerchantProfile {...m} /> */}
      <Explore />
    </div>
  );
}

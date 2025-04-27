import { images } from "@/constants";
import Address from "./Address";
import AddAddress from "./AddAddress";
import { auth } from "../../../../../../auth";
import { User } from "@/backend/models/user.schema";
import { dbConnect } from "@/backend/server/server";

export const dynamic = "force-dynamic";

export const metadata = {
  metadataBase: new URL(`${process.env.WATAWARA_BASE_URL}`),
  title: `Watawara | Address`,
  description: `Manage and update your saved addresses on Watawara. Ensure your orders are delivered to the right place by keeping your address book up to date.`,
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
    title: `Watawara | Address`,
    description: `Manage and update your saved addresses on Watawara. Ensure your orders are delivered to the right place by keeping your address book up to date.`,
    url: `${process.env.WATAWARA_BASE_URL}/address`,
    siteName: "Watawara",
    images: [
      {
        url: images.openGraph,
        width: 800,
        height: 600,
      },
      {
        url: images.openGraph,
        width: 1800,
        height: 1600,
        alt: `Watawara | Address`,
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Watawara | Address`,
    description: `Manage and update your saved addresses on Watawara. Ensure your orders are delivered to the right place by keeping your address book up to date.`,
    siteId: "/",
    creator: "Tri3G Innovative Limited",
    creatorId: "/",
    images: {
      url: images.openGraph,
      alt: `Watawara | Address`,
    },
  },
};

export default async function Home() {
  try {
    await dbConnect();
    const session = await auth();
    const user = await User.findOne({ _id: session?.user._id });

    return (
      <div className="w-full mx-auto h-full relative object-fit overflow-hidden mt-4 mb-10">
        <h1 className="text-lg font-semibold text-gray-800">
          Delivery Address
        </h1>
        <div>
          <AddAddress />
          {/* other address */}
          {!user.address ? (
            <p className="text-sm text-gray-500 mb-3">
              You Do not have any address.
            </p>
          ) : (
            <div>
              <h5 className="text-sm font-semibold text-gray-800 mb-3">
                Other Address
              </h5>
              {<Address {...user.address} title={`My Address`} />}
            </div>
          )}
        </div>
      </div>
    );
  } catch (e) {
    console.log(e);
  }
}

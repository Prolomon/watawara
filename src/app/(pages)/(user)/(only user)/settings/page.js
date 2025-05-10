import EditProfile from "./EditProfile";
import Country from "./Country";
import Currencies from "./Currency";
import Language from "./Language";
import Logout from "./Logout";
import SwitchAccount from "./SwitchAccount";
import { images } from "@/constants";
import DeleteAccount from "./DeleteAccount";
import { auth } from "../../../../../../auth";
import { User } from "@/backend/models/user.schema";
import Preference from "./Preference";
import { redirect } from "next/navigation";
import { dbConnect } from "@/backend/server/server";
export const dynamic = "force-dynamic";
export const metadata = {
  metadataBase: new URL(`${process.env.WATAWARA_BASE_URL}`),
  title: `Watawara | Settings`,
  description: `Configure your account with us to your taste and enjoy out amazing offer.`,
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
    title: `Watawara | Settings`,
    description: `Configure your account with us to your taste and enjoy out amazing offer.`,
    url: `${process.env.WATAWARA_BASE_URL}/settings`,
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
        alt: `Watawara | Settings`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Watawara | Settings`,
    description: `Configure your account with us to your taste and enjoy out amazing offer.`,
    siteId: "/",
    creator: "Tri3G Innovative Limited",
    creatorId: "/",
    images: {
      url: images.openGraph,
      alt: `Watawara | Settings`,
    },
  },
};

export default async function Home() {
    await dbConnect();
    const session = await auth();
    const user = await User.findOne({ email: session?.user?.email });

    return (
      <div className="w-full mx-auto h-full relative object-fit overflow-hidden mt-4 mb-10">
        <section className="grid gap-2">
          <EditProfile />
          <Country curCountry={user?.country} />
          <Currencies curCurrency={user?.currency} />
          <Language curLanguage={user?.language} />
          <Preference />
          <SwitchAccount />
          <Logout />
          {/* <DeleteAccount /> */}
        </section>
      </div>
    );
}

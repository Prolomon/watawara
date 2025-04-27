"use server";
import Seller from "@/utilities/seller/Seller";
import Timeline from "@/utilities/timeline/Timeline";
import CreateReview from "@/utilities/review/CreateReview";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Map from "./Map";
import Description from "./Description";
import { dbConnect } from "@/backend/server/server";
import { User } from "@/backend/models/user.schema";
import { auth } from "../../../../../../auth";
import { Products } from "@/backend/models/products.schema";

export async function generateMetadata({ params }) {
  const { orderid } = await params;
  const session = await auth();
  await dbConnect();
  const user = await User.findOne({ email: session.user.email });
  // fetch data
  const ord = user.orders.find((o) => o.orderId === orderid);

  const product = await Products.findOne({ id: ord.productId });

  // read route params

  return {
    metadataBase: new URL(`${process.env.WATAWARA_BASE_URL}`),
    title: product.name,
    description: product.description,
    icons: {
      icon: product.images[0],
      shortcut: product.images[0],
      apple: product.images[0],
      other: {
        rel: "apple-touch-icon-precomposed",
        url: product.images[0],
      },
    },
    manifest: "/manifest.json",
    openGraph: {
      title: product.name,
      description: product.description,
      url: `${process.env.WATAWARA_BASE_URL}/cart/orders/${orderid}`,
      siteName: "Watawara",
      image: [
        {
          url: product.images[0], // Must be an absolute URL
          width: 800,
          height: 600,
        },
        {
          url: product.images[0], // Must be an absolute URL
          width: 1800,
          height: 1600,
          alt: product.name,
        },
      ],
      locale: "en_NG",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
      siteId: product.id,
      creator: "Tri3G Innovative Limited",
      creatorId: product.id,
      image: {
        url: product.images[0],
        alt: product.name,
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
  const session = await auth();
  await dbConnect();
  const user = await User.findOne({ email: session.user.email });
  const { orderid } = await params;
  // fetch data
  const ord = user.orders.find((o) => o.orderId === orderid);
  return (
    <div className="w-full mx-auto h-full relative object-fit overflow-hidden">
      <div className="w-full flex max-md:flex-col gap-3 mt-8">
        <Map />
        <Timeline order={ord} />
      </div>
      <div className="w-full flex max-md:flex-col gap-3 mb-10">
        <div className="w-8/12 max-md:w-full max-md:mb-3">
          <Description productId={ord.productId} quantity={ord.quantity} />
        </div>
        <div className="w-4/12 max-md:w-full mt-3">
          <Seller {...ord} />
          {/* various security links */}
          <div>
            <Link
              href="#"
              className="p-3 border text-gray-600 font-semibold text-base border-gray-200 rounded-md shadow-sm flex items-center justify-between mt-1.5"
            >
              <span>Return Policy</span>
              <ChevronRight size={18} />
            </Link>
            <Link
              href="#"
              className="p-3 border text-gray-600 font-semibold text-base border-gray-200 rounded-md shadow-sm flex items-center justify-between mt-1.5"
            >
              <span>Fraud Penalty</span>
              <ChevronRight size={18} />
            </Link>
            <Link
              href="#"
              className="p-3 border text-gray-600 font-semibold text-base border-gray-200 rounded-md shadow-sm flex items-center justify-between mt-1.5"
            >
              <span>Customer&apos;s Agreement</span>
              <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </div>
      <CreateReview status={ord.status} />
    </div>
  );
}

"use server";
import Seller from "@/utilities/seller/Seller";
import Timeline from "@/utilities/timeline/Timeline";
import CreateReview from "@/utilities/review/CreateReview";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Map from "./Map";
import { images } from "@/constants";
import { dbConnect } from "@/backend/server/server";
import { User } from "@/backend/models/user.schema";
import { auth } from "../../../../../../auth";
import { Orders } from "@/backend/models/order.schema";
import AllOrders from "./AllOrders";
import Currency from "@/utilities/currency/Currency";

export async function generateMetadata({ params }) {
  const { orderid } = await params;

  return {
    metadataBase: new URL(`${process.env.WATAWARA_BASE_URL}`),
    title: "Orders Page",
    description: `"Track your order status, manage deliveries, and stay updated on your purchases from Watawara - Your trusted marketplace for quality products"`,
    icons: {
      icon: images.logo,
      shortcut: images.logo,
      apple: images.logo,
      other: {
        rel: "apple-touch-icon-precomposed",
        url: images.logo,
      },
    },
    manifest: "/manifest.json",
    openGraph: {
      title: "Orders Page",
      description:
        "Track your order status, manage deliveries, and stay updated on your purchases from Watawara - Your trusted marketplace for quality products",
      url: `${process.env.WATAWARA_BASE_URL}/cart/orders/${orderid}`,
      siteName: "Watawara",
      image: [
        {
          url: images.logo, // Must be an absolute URL
          width: 800,
          height: 600,
        },
        {
          url: images.logo, // Must be an absolute URL
          width: 1800,
          height: 1600,
          alt: "Orders Page",
        },
      ],
      locale: "en_NG",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Orders Page",
      description:
        "Track your order status, manage deliveries, and stay updated on your purchases from Watawara - Your trusted marketplace for quality products",
      siteId: orderid,
      creator: "Tri3G Innovative Limited",
      creatorId: orderid,
      image: {
        url: images.logo,
        alt: "Orders Page",
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
  const ord = await Orders.findOne({ userId: user?.id, orderId: orderid });
  return (
    <div className="w-full mx-auto h-full relative object-fit overflow-hidden">
      <div className="w-full flex max-md:flex-col gap-3 mt-8">
        <Map />
        <Timeline order={ord} />
      </div>
      <div className="w-full flex max-md:flex-col gap-3 mb-10">
        <div className="w-8/12 max-md:w-full max-md:mb-3">
          <AllOrders
            products={ord.products}
            date={ord.date}
            status={ord.status}
            delivery={ord.delivery}
          />
          <div className="w-full">
            <div className="w-full flex items-center justify-between">
              <h1 className="text-xl font-semibold">Order Summary</h1>
            </div>
            <div className="w-full flex items-center justify-between mt-3">
              <span className="text-sm text-gray-600">Subtotal</span>
              <span className="text-sm text-gray-600">
                {Currency(ord.subTotal)}
              </span>
            </div>
            <div className="w-full flex items-center justify-between mt-3">
              <span className="text-sm text-gray-600">Tax</span>
              <span className="text-sm text-gray-600">{Currency(ord.tax)}</span>
            </div>
            <div className="w-full flex items-center justify-between mt-3">
              <span className="text-sm text-gray-600">Shipping</span>
              <span className="text-sm text-gray-600">
                {Currency(ord.shipping)}
              </span>
            </div>
            <div className="w-full flex items-center justify-between mt-3 font-semibold border-t border-gray-600 pt-2">
              <span className="text-base text-gray-600">Total</span>
              <span className="text-base text-gray-600">
                {Currency(ord.total)}
              </span>
            </div>
          </div>
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

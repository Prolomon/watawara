"use server";
import Gallery from "@/components/gallery/Gallery";
import Rating from "@/utilities/rating/Rating";
import Description from "./Description";
import Seller from "@/utilities/seller/Seller";
import ProductDescription from "@/utilities/description/ProductDescription";
import Reviews from "@/utilities/review/Reviews";
import SimilarProducts from "./SimilarProducts";
import Specification from "./Specification";
import ReviewChart from "@/utilities/review/ReviewChart";
import Safety from "./Safety";
import { dbConnect } from "@/backend/server/server";

export async function generateMetadata({ params }) {
  const { productid } = await params;

  const ps = await fetch(
    `${process.env.WATAWARA_BASE_URL}/api/products/${productid}`
  );

  if (!ps.ok) {
    throw new Error(`Failed to fetch products: ${ps.status}`);
  }

  const product = await ps.json();

  return {
    metadataBase: new URL(`${process.env.WATAWARA_BASE_URL}`),
    name: product.name,
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
      url: `${process.env.WATAWARA_BASE_URL}/${product.name
        ?.toLowerCase()
        .replace(/\s+/g, "-")}`,
      siteName: "Watawara",
      images: [
        {
          url: product.images[0], // Must be an absolute URL
          width: 800,
          height: 600,
        },
        {
          url: product.images[2], // Must be an absolute URL
          width: 1800,
          height: 1600,
          alt: product.title,
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
      images: {
        url: product.images[0],
        alt: product.name,
      },
      app: {
        name: "Watawara",
        id: {
          iphone: "Watawara://iphone",
          ipad: "Watawara://ipad",
          googleplay: "Watawara://googleplay",
        },
        url: {
          iphone: "https://iphone_url",
          ipad: "https://ipad_url",
        },
      },
    },
  };
}

export default async function Home({ params }) {
  try {
    const { productid } = await params;
    await dbConnect();

    const ps = await fetch(
      `${process.env.WATAWARA_BASE_URL}/api/products/${productid}`
    );

    if (!ps.ok) {
      throw new Error(`Failed to fetch products: ${ps.status}`);
    }

    const product = await ps.json();

    const rate = product.reviews.reduce((acc, r) => acc + Number(r.rating), 0);
    const rating = rate / product.reviews.length / 5;

    return (
      <div className="w-11/12 max-md:w-full mx-auto h-full relative object-fit overflow-hidden mt-4 mb-10">
        <div className="w-full flex max-md:flex-col gap-3">
          <div className="w-9/12 max-md:w-full max-md:mb-3">
            {/* product gallery and product details */}
            <div className="flex w-full max-md:w-full max-md:flex-col">
              <Gallery {...product} />
              <Description {...product} />
            </div>
            {/* product description and product specification */}
            <div>
              <ProductDescription {...product} />
              <Specification {...product} />
            </div>
          </div>
          <div className="w-3/12 max-md:w-full">
            <Seller {...product} />
            <Safety />
          </div>
        </div>
        {/* customers review section */}
        <div className="w-full flex gap-8 py-8 max-md:flex-col">
          <div className="w-4/12 max-md:w-full">
            <h4 className="text-slate-900 font-bold text-lg">
              Customer&apos;s Review
            </h4>
            <div className="w-full gap-2 flex items-center">
              <Rating rating={rating} size={20} />
              <span>Based on {product.reviews.length} reviews</span>
            </div>
            <ReviewChart {...product} />
            <button className="text-center py-2 w-full border border-gray-400 text-gray-950 rounded-md font-semibold text-base">
              Write a Review
            </button>
          </div>
          <div className="w-8/12 max-md:w-full">
            <Reviews {...product} />
          </div>
        </div>
        {/* List of all similar products */}
        <SimilarProducts />
      </div>
    );
  } catch (error) {
    console.error("Error in Discover component:", error);
    return (
      <section className="w-11/12 mx-auto object-fit overflow-hidden mb-10">
        <h1 className="font-bold text-xl capitalize text-gray-800 text-center mb-6 mt-4">
          Connection Broken. Check your Internet Connection and reload the Page
        </h1>
      </section>
    );
  }
}

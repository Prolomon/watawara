"use server";
import Product from "./_product/Product";
import { dbConnect } from "@/backend/server/server";
import { images } from "@/constants";
import { Products } from "@/backend/models/products.schema";

export async function generateMetadata({ params }) {
  // read route params
  const { categoryid } = await params;

  return {
    metadataBase: new URL(`${process.env.WATAWARA_BASE_URL}`),
    title: categoryid,
    description: categoryid,
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
      title: categoryid,
      description: categoryid,
      url: `${process.env.WATAWARA_BASE_URL}/${categoryid
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
          alt: categoryid,
        },
      ],
      locale: "en_NG",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: categoryid,
      description: categoryid,
      siteId: categoryid,
      creator: "Tri3G Innovative Limited",
      creatorId: categoryid,
      images: {
        url: images.openGraph,
        alt: categoryid,
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
  const { categoryid } = await params;
  // fetch data
  try {
    await dbConnect();
    const products = await Products.find({}).lean();
    const p = products.filter(_p => _p.category.toLowerCase() == categoryid?.toLowerCase().replace(/\s+/g, "-"))
    return (
      <section className="w-full mx-auto object-fit">
        <h1 className="font-bold text-xl capitalize text-gray-800 mb-3">
          {categoryid?.replace(/-/g, ' ')}
        </h1>

        {products || products.length > 0 ? (
          <div className="w-full flex flex-wrap">
            {p.map((_p) => (
              <Product
                key={_p.id}
                images={_p.images}
                name={_p.name}
                price={_p.price}
                reviews={_p.reviews}
                brand={_p.brand}
                category={_p.category}
                id={_p.id}
              />
            ))}
          </div>
        ) : (
          <div className="w-full h-full text-center text-gray-800">No Products found</div>
        )}

        {products.length === 20 && (
          <div className="grid place-content-center">
            <button
              type="button"
              className="mx-auto text-gray-600 text-base mt-6"
            >
              Load More
            </button>
          </div>
        )}
      </section>
    );
  } catch (e) {
    console.log(e);
  }
}

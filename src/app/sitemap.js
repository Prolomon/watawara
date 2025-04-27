"use server";
const wallet = [
  "airtime",
  "betting",
  "cable-tv",
  "electricity",
  "internet",
  "jamb",
  "referal",
  "transfer",
];

export default async function sitemap() {
  const wallets = wallet.map((_w) => ({
    url: `${process.env.NEXT_PUBLIC_WATAWARA_BASE_URL}/wallet/${_w
      ?.toLowerCase()
      .replace(/\s+/g, "-")
      .replace("&", "and")}`,
    changeFrequency: "weekly",
    lastModified: new Date(),
  }));

  return [
    {
      url: `${process.env.NEXT_PUBLIC_WATAWARA_BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
    },
    {
      url: `${process.env.NEXT_PUBLIC_WATAWARA_BASE_URL}/account`,
      lastModified: new Date(),
      changeFrequency: "yearly",
    },
    {
      url: `${process.env.NEXT_PUBLIC_WATAWARA_BASE_URL}/address`,
      lastModified: new Date(),
      changeFrequency: "yearly",
    },
    {
      url: `${process.env.NEXT_PUBLIC_WATAWARA_BASE_URL}/cart`,
      lastModified: new Date(),
      changeFrequency: "yearly",
    },
    {
      url: `${process.env.NEXT_PUBLIC_WATAWARA_BASE_URL}/cart/orders`,
      lastModified: new Date(),
      changeFrequency: "yearly",
    },
    {
      url: `${process.env.NEXT_PUBLIC_WATAWARA_BASE_URL}/cart/wishlist`,
      lastModified: new Date(),
      changeFrequency: "yearly",
    },
    {
      url: `${process.env.NEXT_PUBLIC_WATAWARA_BASE_URL}/checkout`,
      lastModified: new Date(),
      changeFrequency: "yearly",
    },
    {
      url: `${process.env.NEXT_PUBLIC_WATAWARA_BASE_URL}/coupons`,
      lastModified: new Date(),
      changeFrequency: "yearly",
    },
    {
      url: `${process.env.NEXT_PUBLIC_WATAWARA_BASE_URL}/faq`,
      lastModified: new Date(),
      changeFrequency: "yearly",
    },
    {
      url: `${process.env.NEXT_PUBLIC_WATAWARA_BASE_URL}/search`,
      lastModified: new Date(),
      changeFrequency: "yearly",
    },
    {
      url: `${process.env.NEXT_PUBLIC_WATAWARA_BASE_URL}settings`,
      lastModified: new Date(),
      changeFrequency: "yearly",
    },
    {
      url: `${process.env.NEXT_PUBLIC_WATAWARA_BASE_URL}/wallet`,
      lastModified: new Date(),
      changeFrequency: "yearly",
    },
    ...wallets,
  ];
}

import { userAgent } from "next/server";
import sitemap from "./sitemap";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/"],
        disallow: ["/wallet"],
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_WATAWARA_BASE_URL}/sitemap.xml`,
  };
}

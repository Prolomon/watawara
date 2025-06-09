/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gonf7za2h5pl262h.public.blob.vercel-storage.com",
        port: "",
        pathname: "/products/**", // Adjust if your path prefix is different
      },
      {
        protocol: "https",
        hostname: "gonf7za2h5pl262h.public.blob.vercel-storage.com",
        port: "",
        pathname: "/advertisements/**", // Adjust if your path prefix is different
      },
      {
        protocol: "https",
        hostname: "gonf7za2h5pl262h.public.blob.vercel-storage.com",
        port: "",
        pathname: "/customers/**", // Adjust if your path prefix is different
      },
      {
        protocol: "https",
        hostname: "gonf7za2h5pl262h.public.blob.vercel-storage.com",
        port: "", // Optional: specify port if needed, otherwise leave empty
        pathname: "/avatar/**", // Optional: be more specific about the path if needed
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "", // Optional: specify port if needed, otherwise leave empty
        pathname: "/a/**", // Optional: be more specific about the path if needed
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // Increase the limit (e.g., 10MB)
    },
  },
  env: {
    WATAWARA_BASE_URL: process.env.WATAWARA_BASE_URL,
  },
};

export default nextConfig;

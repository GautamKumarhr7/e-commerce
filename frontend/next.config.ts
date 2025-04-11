/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  },
  images: {
    domains: ["localhost"],
  },
};

export default nextConfig;

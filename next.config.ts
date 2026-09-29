import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.abbio.ru" }],
        destination: "https://abbio.ru/:path*",
        permanent: true,
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 100],
  }
};

export default nextConfig;

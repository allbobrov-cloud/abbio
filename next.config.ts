import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  experimental: { inlineCss: true },
  async redirects() {
    return [
      {
        source: "/",
        has: [{ type: "host", value: "www.abbio.ru" }],
        destination: "https://abbio.ru/",
        statusCode: 301,
      },
      {
        source: "/:path+",
        has: [{ type: "host", value: "www.abbio.ru" }],
        destination: "https://abbio.ru/:path*",
        statusCode: 301,
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 100],
  }
};

export default nextConfig;

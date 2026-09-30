import type { NextConfig } from "next";

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "script-src 'self' 'unsafe-inline' https://mc.yandex.ru https://mc.yandex.com https://yastatic.net",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://mc.yandex.ru https://mc.yandex.com",
  "font-src 'self' data:",
  "connect-src 'self' https://mc.yandex.ru https://mc.yandex.com https://mc.webvisor.com https://mc.webvisor.org wss://mc.yandex.ru",
  "child-src 'self' blob: https://mc.yandex.ru",
  "frame-src 'self' blob: https://mc.yandex.ru",
  "media-src 'self'",
  "manifest-src 'self'",
].join("; ");

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  experimental: { inlineCss: true },
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=604800" },
          { key: "Content-Security-Policy", value: contentSecurityPolicy },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
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
    // WebP is substantially faster to encode on the production server for cold image requests.
    formats: ["image/webp"],
    qualities: [75, 100],
  }
};

export default nextConfig;

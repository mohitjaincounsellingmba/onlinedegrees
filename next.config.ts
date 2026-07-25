import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  reactStrictMode: true,

  compress: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'www.google.com' },
      { protocol: 'https', hostname: 't0.gstatic.com' },
      { protocol: 'https', hostname: 'unavatar.io' },
    ]
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'www.google.com' },
      { protocol: 'https', hostname: 't0.gstatic.com' },
      { protocol: 'https', hostname: 'unavatar.io' },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/robots.txt',
        destination: '/api/seo/robots',
      },
      {
        source: '/sitemap.xml',
        destination: '/api/seo/sitemap',
      },
    ];
  },
};

export default nextConfig;

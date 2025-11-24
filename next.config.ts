import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
      },
      {
        protocol: 'https',
        hostname: 'localhost',
        port: '1337',
      },
      // Add your production Strapi domain here when deployed
      // {
      //   protocol: 'https',
      //   hostname: 'your-strapi-domain.com',
      // },
    ],
    // Allow unoptimized images from private IPs in development
    unoptimized: process.env.NODE_ENV === 'development',
  },
};

export default nextConfig;

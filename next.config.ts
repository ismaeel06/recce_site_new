import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: (() => {
    // Build remotePatterns safely. Avoid calling `new URL('')` when env is unset.
    const patterns: any[] = [
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
    ];

    const raw = process.env.NEXT_PUBLIC_STRAPI_URL;
    if (raw) {
      try {
        const host = new URL(raw).hostname;
        if (host) {
          patterns.push({ protocol: 'https', hostname: host });
        }
      } catch (e) {
        // If NEXT_PUBLIC_STRAPI_URL is not a valid URL, skip adding it.
        // This avoids crashing the build when the env variable is empty or malformed.
        console.warn('NEXT_PUBLIC_STRAPI_URL is not a valid URL, skipping image remotePattern');
      }
    }

    return {
      remotePatterns: patterns,
      // Allow unoptimized images from private IPs in development
      unoptimized: process.env.NODE_ENV === 'development',
    };
  })(),
};

export default nextConfig;

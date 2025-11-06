import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.data.gov.sg',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;

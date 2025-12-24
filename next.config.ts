import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Redirect root to default locale
  async redirects() {
    return [
      {
        source: '/',
        destination: '/ro',
        permanent: true,
      },
    ]
  },
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'emamut.ro',
      },
    ],
  },
};

export default nextConfig;

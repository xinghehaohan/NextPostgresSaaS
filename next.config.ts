import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // experimental: {
  //   ppr: true,
  // },
  // 
  images: {
    domains: [
      'rc-cdn.seekingalpha.com'
    ],
  },
  experimental: {
    serverActions: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

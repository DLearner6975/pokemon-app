import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    // Remote allowlist: only PokeAPI sprites are optimized (limits transformations & cache writes)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/PokeAPI/sprites/**',
        search: '',
      },
    ],
    // Local allowlist: only public folder images are optimized
    localPatterns: [
      {
        pathname: '/**',
        search: '',
      },
    ],
    // Quality allowlist: fewer variants = less cache, smaller outputs (default quality is 75)
    qualities: [70, 75, 85],
    // Image sizes: match Pokemon app (cards ~150–400px; no 4K needs)
    imageSizes: [64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
};

export default nextConfig;

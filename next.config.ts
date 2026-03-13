import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
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
  },
};

export default nextConfig;

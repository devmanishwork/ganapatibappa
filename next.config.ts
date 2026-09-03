import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    // Allow images served from any hostname (covers Render, localhost, custom domain)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: '**',
        pathname: '/uploads/**',
      },
    ],
  },
  // Required for Render — output the app as a standalone Node.js server
  output: 'standalone',
}

export default nextConfig

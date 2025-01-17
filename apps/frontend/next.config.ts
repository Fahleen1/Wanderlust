//import 'dotenv/config';
import type { NextConfig } from 'next';

// const API_URL = process.env.BACKEND_URL;

// if (!API_URL) {
//   throw new Error('BACKEND_URL environment variable is not defined.');
// }

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `http://localhost:3001/api/:path*`,
      },
    ];
  },
  images: {
    domains: ['images.unsplash.com', 'plus.unsplash.com'],
  },
};

export default nextConfig;

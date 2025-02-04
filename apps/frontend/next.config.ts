/** @type {import('next').NextConfig} */
import 'dotenv/config';

const API_URL = process.env.BACKEND_URL;
if (!API_URL) {
  throw new Error('BACKEND_URL environment variable is not defined.');
}
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: '/api/users/:path*',
        destination: `${API_URL}/api/user/:path*`,
      },
      {
        source: '/api/listings/:path*',
        destination: `http://localhost:3001/api/listings/:path*`,
      },
    ];
  },
  images: {
    domains: ['images.unsplash.com', 'plus.unsplash.com'],
  },
};

module.exports = nextConfig;

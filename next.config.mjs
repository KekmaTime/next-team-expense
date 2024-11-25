/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.giphy.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: '*.convex.cloud',
        pathname: '**',
      }
    ],
  },
};

export default nextConfig;

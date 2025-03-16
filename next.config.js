/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['randomuser.me', 'images.unsplash.com'],
    unoptimized: true,
  },
  output: 'export',
  distDir: 'out',
};

module.exports = nextConfig;
